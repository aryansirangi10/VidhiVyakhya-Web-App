import os
from sqlalchemy.orm import Session
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from app.models.models import Bill, Rule
from app.database import engine, Base

UPLOADS_DIR = "/app/uploads"

def create_pdf(filename: str, title: str, pages_content: list):
    os.makedirs(UPLOADS_DIR, exist_ok=True)
    pdf_path = os.path.join(UPLOADS_DIR, filename)
    
    if os.path.exists(pdf_path):
        return pdf_path

    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter # 612 x 792

    for page_idx, lines in enumerate(pages_content):
        c.setFont("Helvetica-Bold", 16)
        c.drawString(72, height - 80, title)
        
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(72, height - 100, f"Official Gazette of India - Page {page_idx + 1}")
        c.line(72, height - 110, width - 72, height - 110)
        
        c.setFont("Helvetica", 11)
        y = height - 160
        for line in lines:
            if line.startswith("Clause") or line.startswith("Section"):
                c.setFont("Helvetica-Bold", 12)
                y -= 10
            else:
                c.setFont("Helvetica", 11)
                
            c.drawString(72, y, line)
            y -= 22
            
        c.setFont("Helvetica", 9)
        c.drawCentredString(width / 2.0, 40, f"Page {page_idx + 1} of {len(pages_content)}")
        c.showPage()
        
    c.save()
    return pdf_path

def seed_bills_and_rules(db: Session):
    # 1. Create seed PDFs
    
    # Bill 1: Finance Bill 2024
    bill1_pages = [
        [
            "THE FINANCE BILL, 2024",
            "A Bill to give effect to the financial proposals of the Central Government for",
            "the financial year 2024-2025.",
            "",
            "BE it enacted by Parliament in the Seventy-fifth Year of the Republic of India as follows:",
            "1. Short title and commencement.",
            "(1) This Act may be called the Finance Act, 2024.",
            "(2) Save as otherwise provided in this Act, the provisions of this Act shall be",
            "deemed to have come into force on the 1st day of April, 2024."
        ],
        [
            "CHAPTER II: DIRECT TAXES",
            "Clause 3: Amendment of section 115BAC.",
            "In section 115BAC of the Income-tax Act, 1961, with effect from the 1st day of April, 2025:",
            "(a) in sub-section (1A), for the table, the following table shall be substituted, namely:-",
            "",
            "   Sl. No.    Total Income Bracket (in Rupees)           Proposed Tax Rate",
            "   1.         Up to 3,00,000                             Nil",
            "   2.         From 3,00,001 to 7,00,000                  5 per cent.",
            "   3.         From 7,00,001 to 10,00,000                 10 per cent.",
            "   4.         From 10,00,001 to 12,00,000                15 per cent.",
            "   5.         From 12,00,001 to 15,00,000                20 per cent.",
            "   6.         Above 15,00,000                            30 per cent.",
            "",
            "Clause 4: Standard Deduction.",
            "In section 115BAC of the Income-tax Act, in sub-section (2), in clause (ii), the standard",
            "deduction is raised from fifty thousand rupees to seventy-five thousand rupees for salaried employees."
        ]
    ]
    create_pdf("finance_bill_2024.pdf", "The Finance Bill, 2024", bill1_pages)

    # Bill 2: DPDP Act 2023
    bill2_pages = [
        [
            "THE DIGITAL PERSONAL DATA PROTECTION ACT, 2023",
            "An Act to provide for the processing of digital personal data in a manner that",
            "recognises both the right of individuals to protect their personal data and the need",
            "to process such personal data for lawful purposes.",
            "",
            "CHAPTER VIII: PENALTIES AND ADJUDICATION",
            "Section 33: Penalties for non-compliance.",
            "(1) If the Board determines on inquiry that a Data Fiduciary has committed a significant",
            "breach of any provision of this Act, it may impose a monetary penalty.",
            "(2) For failure to take reasonable security safeguards to prevent personal data breach",
            "referred to in Section 8, a penalty of up to two hundred and fifty crore rupees may be imposed."
        ]
    ]
    create_pdf("dpdp_act_2023.pdf", "Digital Personal Data Protection Act, 2023", bill2_pages)

    # Bill 3: Capital Gains 2024
    bill3_pages = [
        [
            "BUDGET AMENDMENT: SIMPLIFICATION OF CAPITAL GAINS",
            "Proposals to simplify and rationalize the taxation of capital gains with effect from",
            "the 23rd day of July, 2024.",
            "",
            "Clause 22: Rates of Long-Term Capital Gains.",
            "In section 112A of the Income-tax Act, with effect from the 23rd day of July, 2024:",
            "(a) the rate of tax on long-term capital gains arising from the transfer of equity shares,",
            "units of equity oriented funds, or units of business trusts is increased from 10 percent",
            "to 12.5 percent.",
            "(b) the exemption limit for long-term capital gains on such assets is proposed to be",
            "raised from one lakh rupees to one lakh twenty-five thousand rupees (INR 1,25,000)."
        ]
    ]
    create_pdf("capital_gains_2024.pdf", "Budget Amendment: Capital Gains 2024", bill3_pages)

    if db.query(Bill).count() > 0:
        return

    # Finance Bill 2024
    bill1 = Bill(
        title="Finance Bill 2024",
        summary="Revises tax slabs and increases the standard deduction to ₹75,000 for salaried employees under the new tax regime.",
        source_url="https://www.indiabudget.gov.in/doc/Finance_Bill.pdf",
        pdf_path="finance_bill_2024.pdf",
        status="Implemented",
        current_stage="Implemented",
        introduced_date="2024-07-23",
        effective_date="2025-04-01",
        reading_time=4,
        pages=412,
        ministry="Ministry of Finance",
        bill_number="Bill No. 78",
        category="Income Tax",
        pdf_size="1.2 MB",
        sponsor="Nirmala Sitharaman (Finance Minister)",
        parliamentary_session="Monsoon Session 2024",
        document_language="English",
        amendment_count=12
    )
    db.add(bill1)
    db.commit()
    db.refresh(bill1)

    rule1_1 = Rule(
        bill_id=bill1.id,
        clause_number="Clause 4",
        clause_text="In section 115BAC of the Income-tax Act, in sub-section (2), in clause (ii), the standard deduction is raised from fifty thousand rupees to seventy-five thousand rupees for salaried employees.",
        rule_type="standard_deduction",
        condition_json={"tax_regime": "new", "employment_category": "salaried"},
        formula_json={"old_deduction": 50000, "new_deduction": 75000},
        source_span={
            "page": 2,
            "snippet": "Clause 4: Standard Deduction.",
            "x0": 70.0,
            "top": 580.0,
            "x1": 540.0,
            "bottom": 640.0,
            "page_width": 612.0,
            "page_height": 792.0
        },
        confidence=0.98,
        reviewed=True,
        reviewed_by="Aditi Sharma (Senior Auditor)",
        reviewed_at=db.query(Bill).first().created_at, # just use current time
        rule_version=1,
        is_demo_rule=False,
        page=2,
        paragraph="Clause 4: Standard Deduction increase under Direct Taxes.",
        checksum="fb2024_clause4_checksum_demo"
    )
    rule1_2 = Rule(
        bill_id=bill1.id,
        clause_number="Clause 3",
        clause_text="Clause 3: Amendment of section 115BAC. Slabs are adjusted to: Up to 3,00,000 Nil, 3,00,001 to 7,00,000 5%, 7,00,001 to 10,00,000 10%, 10,00,001 to 12,00,000 15%, 12,00,001 to 15,00,000 20%, Above 15,00,000 30%.",
        rule_type="tax_slab",
        condition_json={"tax_regime": "new"},
        formula_json={
            "old_slabs": [
                [300000, 0.0],
                [600000, 0.05],
                [900000, 0.10],
                [1200000, 0.15],
                [1500000, 0.20],
                [None, 0.30]
            ],
            "new_slabs": [
                [300000, 0.0],
                [700000, 0.05],
                [1000000, 0.10],
                [1200000, 0.15],
                [1500000, 0.20],
                [None, 0.30]
            ]
        },
        source_span={
            "page": 2,
            "snippet": "Clause 3: Amendment of section 115BAC.",
            "x0": 70.0,
            "top": 150.0,
            "x1": 540.0,
            "bottom": 420.0,
            "page_width": 612.0,
            "page_height": 792.0
        },
        confidence=0.99,
        reviewed=True,
        reviewed_by="Aditi Sharma (Senior Auditor)",
        reviewed_at=db.query(Bill).first().created_at,
        rule_version=1,
        is_demo_rule=False,
        page=2,
        paragraph="Clause 3: Slabs expansion revision under Section 115BAC.",
        checksum="fb2024_clause3_checksum_demo"
    )
    db.add_all([rule1_1, rule1_2])

    # DPDP Act 2023
    bill2 = Bill(
        title="DPDP Act 2023 (Data Protection)",
        summary="Sets personal data protection obligations and mandates penalties up to ₹250 Cr for data breaches and compliance failures.",
        source_url="https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
        pdf_path="dpdp_act_2023.pdf",
        status="Implemented",
        current_stage="Implemented",
        introduced_date="2023-08-03",
        effective_date="2023-08-11",
        reading_time=6,
        pages=24,
        ministry="Ministry of Electronics & IT",
        bill_number="Act No. 40",
        category="Data Privacy",
        pdf_size="450 KB",
        sponsor="Ashwini Vaishnaw (IT Minister)",
        parliamentary_session="Monsoon Session 2023",
        document_language="English",
        amendment_count=0
    )
    db.add(bill2)
    db.commit()
    db.refresh(bill2)

    rule2_1 = Rule(
        bill_id=bill2.id,
        clause_number="Section 33",
        clause_text="For failure to take reasonable security safeguards to prevent personal data breach referred to in Section 8, a penalty of up to two hundred and fifty crore rupees may be imposed.",
        rule_type="dpdp_compliance",
        condition_json={"employment_category": "business"},
        formula_json={"max_penalty_crores": 250},
        source_span={
            "page": 1,
            "snippet": "Section 33: Penalties for non-compliance.",
            "x0": 70.0,
            "top": 240.0,
            "x1": 540.0,
            "bottom": 380.0,
            "page_width": 612.0,
            "page_height": 792.0
        },
        confidence=0.95,
        reviewed=True,
        reviewed_by="Rohan Gupta (Compliance Lead)",
        reviewed_at=db.query(Bill).first().created_at,
        rule_version=1,
        is_demo_rule=False,
        page=1,
        paragraph="Section 33: Data safeguards penalties guidelines.",
        checksum="dpdp2023_sec33_checksum_demo"
    )
    db.add(rule2_1)

    # Budget 2024 Capital Gains
    bill3 = Bill(
        title="Budget 2024 (Capital Gains Amendment)",
        summary="Increases standard Equity Long-Term Capital Gains (LTCG) tax rate to 12.5% and expands the tax exemption limit to ₹1.25 Lakhs.",
        source_url="https://www.indiabudget.gov.in",
        pdf_path="capital_gains_2024.pdf",
        status="Implemented",
        current_stage="Implemented",
        introduced_date="2024-07-23",
        effective_date="2024-07-23",
        reading_time=3,
        pages=8,
        ministry="Ministry of Finance",
        bill_number="Bill No. 79",
        category="Capital Gains",
        pdf_size="210 KB",
        sponsor="Nirmala Sitharaman (Finance Minister)",
        parliamentary_session="Monsoon Session 2024",
        document_language="English",
        amendment_count=4
    )
    db.add(bill3)
    db.commit()
    db.refresh(bill3)

    rule3_1 = Rule(
        bill_id=bill3.id,
        clause_number="Clause 22",
        clause_text="the rate of tax on long-term capital gains arising from the transfer of equity shares... is increased from 10 percent to 12.5 percent. The exemption limit is raised to one lakh twenty-five thousand rupees.",
        rule_type="capital_gains",
        condition_json={},
        formula_json={
            "old_rate": 0.10,
            "new_rate": 0.125,
            "old_exemption": 100000,
            "new_exemption": 125000
        },
        source_span={
            "page": 1,
            "snippet": "Clause 22: Rates of Long-Term Capital Gains.",
            "x0": 70.0,
            "top": 160.0,
            "x1": 540.0,
            "bottom": 380.0,
            "page_width": 612.0,
            "page_height": 792.0
        },
        confidence=0.97,
        reviewed=True,
        reviewed_by="Aditi Sharma (Senior Auditor)",
        reviewed_at=db.query(Bill).first().created_at,
        rule_version=1,
        is_demo_rule=False,
        page=1,
        paragraph="Clause 22: Capital gains rates updates under Section 112A.",
        checksum="cg2024_clause22_checksum_demo"
    )
    db.add(rule3_1)
    db.commit()
