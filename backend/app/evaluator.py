import json

def calculate_slab_tax(taxable_income: float, slabs: list) -> float:
    """
    Slabs are list of lists: [[upper_limit, rate], ...]
    e.g., [[300000, 0.0], [700000, 0.05], [None, 0.30]]
    """
    tax = 0.0
    prev_limit = 0.0
    for limit, rate in slabs:
        if limit is None or limit < 0:
            if taxable_income > prev_limit:
                tax += (taxable_income - prev_limit) * rate
            break
        if taxable_income > limit:
            tax += (limit - prev_limit) * rate
            prev_limit = limit
        else:
            if taxable_income > prev_limit:
                tax += (taxable_income - prev_limit) * rate
            break
    return tax

def get_marginal_rate(taxable_income: float, slabs: list) -> float:
    """Returns the marginal tax rate for a given income level."""
    for limit, rate in slabs:
        if limit is None or limit < 0:
            return rate
        if taxable_income <= limit:
            return rate
    return 0.0

def evaluate_bill_impact(profile: dict, rules: list) -> dict:
    """
    Evaluates rules against a user's financial profile.
    Returns:
    {
        "total_impact": float (positive is savings, negative is cost),
        "explanation": str,
        "triggered_rules": list of dicts with citations
    }
    """
    income = float(profile.get("annual_income", 0))
    age = int(profile.get("age", 30))
    regime = profile.get("tax_regime", "new").lower()
    employment = profile.get("employment_category", "salaried").lower()
    state = profile.get("state", "Maharashtra").lower()

    # Get optional profile fields for specific bills
    equity_ltsg = float(profile.get("equity_ltsg", 0))  # Long-term capital gains

    total_impact = 0.0
    triggered_rules = []
    explanations = []

    for rule in rules:
        cond = rule.condition_json or {}
        formula = rule.formula_json or {}

        # 1. Evaluate Condition
        applies = True
        
        # Check regime
        if "tax_regime" in cond and cond["tax_regime"].lower() != regime:
            applies = False
        
        # Check employment category
        if "employment_category" in cond and cond["employment_category"].lower() != employment:
            applies = False
            
        # Check income brackets
        if "income_gt" in cond and income <= float(cond["income_gt"]):
            applies = False
        if "income_lte" in cond and income > float(cond["income_lte"]):
            applies = False

        if not applies:
            continue

        # 2. Evaluate Formula
        rule_impact = 0.0
        rule_explanation = ""

        rule_type = rule.rule_type
        
        if rule_type == "tax_slab":
            # Direct slab comparison
            old_slabs = formula.get("old_slabs")
            new_slabs = formula.get("new_slabs")
            
            if old_slabs and new_slabs:
                # Standard deduction might apply before slab tax
                # We calculate tax on the base income
                old_tax = calculate_slab_tax(income, old_slabs)
                new_tax = calculate_slab_tax(income, new_slabs)
                
                # Surcharge & Cess are generally 4%
                old_tax_with_cess = old_tax * 1.04
                new_tax_with_cess = new_tax * 1.04
                
                # Savings = Old Tax - New Tax
                rule_impact = old_tax_with_cess - new_tax_with_cess
                
                if rule_impact > 0:
                    rule_explanation = f"You save ₹{abs(rule_impact):,.0f} due to revised tax slabs under the {regime} regime."
                elif rule_impact < 0:
                    rule_explanation = f"Revised tax slabs cost you an additional ₹{abs(rule_impact):,.0f} under the {regime} regime."
                else:
                    rule_explanation = "The revised tax slabs have zero net impact on your income bracket."

        elif rule_type == "standard_deduction":
            # Salaried standard deduction differential
            old_ded = float(formula.get("old_deduction", 50000))
            new_ded = float(formula.get("new_deduction", 75000))
            
            # Impact is standard deduction increase * marginal rate
            # Let's check which slabs are active to get marginal rate
            # In Budget 2024, new regime slabs apply standard deduction increase
            slabs = [
                [300000, 0.00],
                [700000, 0.05],
                [1000000, 0.10],
                [1200000, 0.15],
                [1500000, 0.20],
                [None, 0.30]
            ]
            marginal_rate = get_marginal_rate(income, slabs)
            
            # Tax savings = (new_ded - old_ded) * marginal_rate
            diff = new_ded - old_ded
            tax_savings = diff * marginal_rate * 1.04  # including 4% cess
            rule_impact = tax_savings
            
            rule_explanation = f"Increased standard deduction from ₹{old_ded:,.0f} to ₹{new_ded:,.0f} saves you ₹{rule_impact:,.0f} (at marginal tax rate {(marginal_rate * 100):.1f}% + cess)."

        elif rule_type == "capital_gains":
            # Long-term capital gains tax change
            old_rate = float(formula.get("old_rate", 0.10))
            new_rate = float(formula.get("new_rate", 0.125))
            old_exemption = float(formula.get("old_exemption", 100000))
            new_exemption = float(formula.get("new_exemption", 125000))

            if equity_ltsg > 0:
                # Old tax: max(0, gains - old_exemption) * old_rate
                old_gains_tax = max(0.0, equity_ltsg - old_exemption) * old_rate
                # New tax: max(0, gains - new_exemption) * new_rate
                new_gains_tax = max(0.0, equity_ltsg - new_exemption) * new_rate
                
                # Impact is old tax - new tax
                rule_impact = (old_gains_tax - new_gains_tax) * 1.04 # with cess
                
                if rule_impact > 0:
                    rule_explanation = f"Higher exemption limit of ₹{new_exemption:,.0f} saves you ₹{rule_impact:,.0f} on your capital gains of ₹{equity_ltsg:,.0f}."
                elif rule_impact < 0:
                    rule_explanation = f"Increased LTSG rate from {(old_rate*100):.1f}% to {(new_rate*100):.1f}% costs you ₹{abs(rule_impact):,.0f} on capital gains of ₹{equity_ltsg:,.0f} (net of new ₹{new_exemption:,.0f} exemption)."
                else:
                    rule_explanation = "Capital gains changes have no impact on your current level of LTCG."
            else:
                rule_impact = 0.0
                rule_explanation = f"LTSG tax rate increased from {(old_rate*100):.1f}% to {(new_rate*100):.1f}%, but exemption raised to ₹{new_exemption:,.0f}. No impact since you reported zero capital gains."

        elif rule_type == "dpdp_compliance":
            # Business compliance risk
            if employment == "business":
                penalty_cap = formula.get("max_penalty_crores", 250)
                rule_impact = -10000.0  # Assumed cost of compliance / risk weight
                rule_explanation = f"As a business owner, you are subject to the DPDP compliance rules with penalties up to ₹{penalty_cap} Cr for data breaches."
            else:
                rule_impact = 0.0
                rule_explanation = "As an individual data principal, DPDP grants you data control rights and does not cost you penalties."

        total_impact += rule_impact
        
        triggered_rules.append({
            "id": rule.id,
            "clause_number": rule.clause_number,
            "clause_text": rule.clause_text,
            "rule_type": rule.rule_type,
            "source_span": rule.source_span,
            "impact": rule_impact,
            "explanation": rule_explanation
        })
        
        if rule_impact != 0.0 or rule_type == "dpdp_compliance":
            explanations.append(rule_explanation)

    # Compile explanations
    if not explanations:
        if regime == "old":
            summary_explanation = "The selected bill changes target the new tax regime. Since you are on the old regime, your net impact is ₹0."
        else:
            summary_explanation = "Your financial profile does not trigger any specific clauses in this bill, resulting in ₹0 net impact."
    else:
        summary_explanation = " ".join(explanations)

    return {
        "total_impact": round(total_impact, 2),
        "explanation": summary_explanation,
        "triggered_rules": triggered_rules
    }
