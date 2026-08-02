/**
 * Tax Calculator - Pure stateless tax functions
 */

export function calculateIncomeTax(taxableIncome, slabs) {
  let tax = 0;
  let remaining = taxableIncome;
  let previousLimit = 0;

  for (let i = 0; i < slabs.length; i++) {
    const bracket = slabs[i];
    const limit = bracket[0];
    const rate = bracket[1];

    if (limit === null) {
      // Upper bound slab (Above 15,00,000)
      if (remaining > 0) {
        tax += remaining * rate;
      }
      break;
    }

    const slabSize = limit - previousLimit;
    const taxableInSlab = Math.min(remaining, slabSize);
    
    if (taxableInSlab <= 0) {
      break;
    }

    tax += taxableInSlab * rate;
    remaining -= taxableInSlab;
    previousLimit = limit;
  }

  return tax;
}

export function calculateSlabsDiff(income, oldSlabs, newSlabs) {
  const oldTax = calculateIncomeTax(income, oldSlabs);
  const newTax = calculateIncomeTax(income, newSlabs);
  const diff = oldTax - newTax; // positive = savings, negative = cost
  return {
    oldTax,
    newTax,
    diff,
    cessOld: oldTax * 0.04,
    cessNew: newTax * 0.04,
    netDiff: diff * 1.04
  };
}

export function calculateStandardDeduction(employment, oldDeduction = 50000, newDeduction = 75000, marginalRate = 0.10) {
  if (employment !== 'salaried') {
    return { savings: 0, oldDeduction: 0, newDeduction: 0 };
  }
  const deductionIncrease = newDeduction - oldDeduction;
  const netSavings = deductionIncrease * marginalRate * 1.04; // including 4% cess
  return {
    savings: netSavings,
    oldDeduction,
    newDeduction,
    taxSavings: deductionIncrease * marginalRate,
    cessSavings: deductionIncrease * marginalRate * 0.04
  };
}

export function calculateCapitalGains(ltsgAmount, oldRate = 0.10, newRate = 0.125, oldExemption = 100000, newExemption = 125000) {
  if (!ltsgAmount || ltsgAmount <= 0) {
    return { oldTax: 0, newTax: 0, diff: 0 };
  }
  const oldTaxable = Math.max(0, ltsgAmount - oldExemption);
  const oldTax = oldTaxable * oldRate;
  
  const newTaxable = Math.max(0, ltsgAmount - newExemption);
  const newTax = newTaxable * newRate;
  
  const diff = oldTax - newTax; // positive = savings, negative = cost
  return {
    oldTax,
    newTax,
    diff,
    cessOld: oldTax * 0.04,
    cessNew: newTax * 0.04,
    netDiff: diff * 1.04
  };
}

export function getMarginalRate(income, slabs) {
  for (let i = 0; i < slabs.length; i++) {
    const bracket = slabs[i];
    const limit = bracket[0];
    const rate = bracket[1];
    if (limit === null || income <= limit) {
      return rate;
    }
  }
  return 0.30;
}
