import os
import json
import pdfplumber
import google.generativeai as genai
from typing import List, Optional

def extract_pdf_text(pdf_path: str) -> List[dict]:
    """
    Extracts text from a PDF, page by page.
    Returns a list of dicts: [{"page": page_num, "text": page_text}]
    """
    pages_data = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for idx, page in enumerate(pdf.pages):
                text = page.extract_text() or ""
                pages_data.append({
                    "page": idx + 1,
                    "text": text
                })
    except Exception as e:
        print(f"Error parsing PDF: {e}")
    return pages_data

def find_text_coordinates(pdf_path: str, page_number: int, snippet: str) -> dict:
    """
    Finds the visual bounding box of a snippet on a specific page of the PDF.
    Returns: {"x0": float, "top": float, "x1": float, "bottom": float, "page_width": float, "page_height": float}
    """
    default_coords = {
        "x0": 50.0,
        "top": 150.0,
        "x1": 550.0,
        "bottom": 220.0,
        "page_width": 612.0,
        "page_height": 792.0
    }
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            if page_number <= 0 or page_number > len(pdf.pages):
                return default_coords
            
            page = pdf.pages[page_number - 1]
            page_width = float(page.width)
            page_height = float(page.height)
            
            default_coords["page_width"] = page_width
            default_coords["page_height"] = page_height
            
            # Clean snippet for searching
            words = [w.strip() for w in snippet.split() if len(w.strip()) > 1]
            if not words:
                return default_coords
            
            # Try to search using progressive word chunks to make search robust to spaces/hyphens
            search_str = " ".join(words[:4])
            if hasattr(page, "search") and search_str:
                matches = page.search(search_str)
                if matches:
                    m = matches[0]
                    # We expand bottom slightly to cover the paragraph if we only searched the prefix
                    return {
                        "x0": float(m["x0"]),
                        "top": float(m["top"]),
                        "x1": float(m["x1"]),
                        "bottom": float(m["bottom"] + 40.0),
                        "page_width": page_width,
                        "page_height": page_height
                    }
                    
            # Fallback word-matching scan
            chars = page.chars
            first_word = words[0].lower()
            matching_chars = [c for c in chars if c["text"].lower() == first_word[0]]
            
            if matching_chars:
                first_char = matching_chars[0]
                return {
                    "x0": float(first_char["x0"]),
                    "top": float(first_char["top"] - 5),
                    "x1": float(first_char["x1"] + 300),
                    "bottom": float(first_char["bottom"] + 50),
                    "page_width": page_width,
                    "page_height": page_height
                }
                
            return default_coords
    except Exception as e:
        print(f"Error locating coordinates: {e}")
        return default_coords

def run_gemini_extraction(pdf_text_pages: List[dict], api_key: str) -> List[dict]:
    """
    Executes rule extraction via Gemini API.
    """
    genai.configure(api_key=api_key)
    
    # Combine first 5 pages of text for rules extraction to avoid token overflow
    combined_text = ""
    for p in pdf_text_pages[:6]:
        combined_text += f"--- PAGE {p['page']} ---\n{p['text']}\n\n"
        
    prompt = f"""
    You are an expert Indian legal scholar and tax actuary. Analyze the following legislative text from a parliamentary bill or budget amendment.
    Extract all rules that impact personal finance (income tax slabs, standard deductions, capital gains rates, exemptions, penalties, or compliance fees for businesses/individuals).
    
    For each rule, extract:
    1. Clause number/section identifier (e.g. "Section 115BAC" or "Clause 3")
    2. Exact clause text snippet (up to 3-4 sentences containing the text)
    3. Page number where it was found (1-indexed integer)
    4. Rule Type (must be one of: 'tax_slab', 'deduction', 'capital_gains', 'dpdp_compliance', or 'other')
    5. Condition JSON object:
       - 'tax_regime': 'new' or 'old' (if specified)
       - 'employment_category': 'salaried', 'business', 'professional' (if specified)
       - 'income_gt': numeric lower bound of income in INR (if specified)
       - 'income_lte': numeric upper bound of income in INR (if specified)
    6. Formula JSON object:
       - For 'tax_slab': must contain 'new_slabs' and 'old_slabs' in the format [[limit, rate], ...] where limit is a number or null (for infinite).
         Example: "new_slabs": [[300000, 0.00], [700000, 0.05], [1000000, 0.10], [1200000, 0.15], [1500000, 0.20], [null, 0.30]]
       - For 'deduction': must contain 'old_deduction' and 'new_deduction' amounts (e.g. 50000 and 75000).
       - For 'capital_gains': must contain 'old_rate', 'new_rate', 'old_exemption', 'new_exemption' (e.g., old_rate: 0.10, new_rate: 0.125).
       - For 'dpdp_compliance': must contain 'max_penalty_crores' (e.g., 250).
    7. Confidence score: float between 0.0 and 1.0.

    Return a JSON array of objects representing these rules.
    Format your response EXACTLY as a JSON array of objects. Do not include markdown wraps like ```json.
    
    Example response structure:
    [
      {{
        "clause_number": "Clause 3",
        "clause_text": "In section 115BAC of the Income-tax Act, standard deduction is raised to seventy-five thousand rupees.",
        "page": 2,
        "rule_type": "deduction",
        "condition_json": {{"tax_regime": "new", "employment_category": "salaried"}},
        "formula_json": {{"old_deduction": 50000, "new_deduction": 75000}},
        "confidence": 0.95
      }}
    ]

    Here is the legislative text:
    {combined_text}
    """
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )
    
    try:
        rules = json.loads(response.text)
        if isinstance(rules, list):
            return rules
        elif isinstance(rules, dict) and "rules" in rules:
            return rules["rules"]
    except Exception as e:
        print(f"Failed to parse Gemini JSON output: {e}. Output was:\n{response.text}")
        
    return []

def get_mock_rules(pdf_text_pages: List[dict], filename: str) -> List[dict]:
    """
    Generate mock rules based on the contents or filename of the uploaded PDF,
    ensuring a fallback so that the application doesn't fail.
    """
    filename_lower = filename.lower()
    full_text = " ".join([p["text"] for p in pdf_text_pages]).lower()
    
    # 1. Check for standard deduction keywords
    if "deduction" in filename_lower or "deduction" in full_text:
        return [
            {
                "clause_number": "Clause 3 (MOCK)",
                "clause_text": "[DEMO MOCK RULE] The standard deduction under the new tax regime is proposed to be increased from fifty thousand rupees to seventy-five thousand rupees for salaried individuals.",
                "page": 1,
                "rule_type": "deduction",
                "condition_json": {"tax_regime": "new", "employment_category": "salaried"},
                "formula_json": {"old_deduction": 50000, "new_deduction": 75000},
                "confidence": 0.5
            }
        ]
        
    # 2. Check for capital gains
    if "gains" in filename_lower or "capital" in full_text:
        return [
            {
                "clause_number": "Clause 22 (MOCK)",
                "clause_text": "[DEMO MOCK RULE] Long-term capital gains tax on equity assets is increased from 10 percent to 12.5 percent. The exemption limit is raised from 1 lakh to 1.25 lakhs.",
                "page": 1,
                "rule_type": "capital_gains",
                "condition_json": {},
                "formula_json": {"old_rate": 0.10, "new_rate": 0.125, "old_exemption": 100000, "new_exemption": 125000},
                "confidence": 0.5
            }
        ]
        
    # 3. Check for DPDP
    if "data" in filename_lower or "dpdp" in full_text or "privacy" in full_text:
        return [
            {
                "clause_number": "Section 33 (MOCK)",
                "clause_text": "[DEMO MOCK RULE] Where a data fiduciary fails to implement security safeguards, a penalty of up to two hundred and fifty crore rupees may be imposed.",
                "page": 1,
                "rule_type": "dpdp_compliance",
                "condition_json": {"employment_category": "business"},
                "formula_json": {"max_penalty_crores": 250},
                "confidence": 0.5
            }
        ]
        
    # Default mock tax rule
    return [
        {
            "clause_number": "Clause 5 (MOCK)",
            "clause_text": "[DEMO MOCK RULE] Income tax rates under Section 115BAC are revised. Slabs are adjusted to: 0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, Above 15L 30%.",
            "page": 1,
            "rule_type": "tax_slab",
            "condition_json": {"tax_regime": "new"},
            "formula_json": {
                "old_slabs": [[300000, 0.0], [600000, 0.05], [900000, 0.10], [1200000, 0.15], [1500000, 0.20], [None, 0.30]],
                "new_slabs": [[300000, 0.0], [700000, 0.05], [1000000, 0.10], [1200000, 0.15], [1500000, 0.20], [None, 0.30]]
            },
            "confidence": 0.5
        }
    ]

def extract_rules(pdf_path: str, filename: str, api_key: Optional[str] = None) -> List[dict]:
    """
    Primary orchestration function: Parses PDF text, runs Gemini or Mock extraction,
    and resolves visual highlights (bounding box coordinates) for every rule.
    """
    # 1. Parse text page by page
    pages_data = extract_pdf_text(pdf_path)
    if not pages_data:
        return []
        
    # 2. Extract rules (Gemini vs Mock)
    extracted_rules = []
    effective_api_key = api_key or os.getenv("GEMINI_API_KEY")
    
    if effective_api_key:
        try:
            extracted_rules = run_gemini_extraction(pages_data, effective_api_key)
        except Exception as e:
            print(f"Gemini API invocation failed: {e}. Falling back to mock rules.")
            
    if not extracted_rules:
        extracted_rules = get_mock_rules(pages_data, filename)
        
    # 3. Add visual coordinates mapping (bbox) to source_span
    final_rules = []
    for r in extracted_rules:
        page_num = r.get("page", 1)
        clause_text = r.get("clause_text", "")
        
        # Calculate visual coordinates
        coords = find_text_coordinates(pdf_path, page_num, clause_text)
        
        # Compile source span
        r["source_span"] = {
            "page": page_num,
            "snippet": clause_text,
            "x0": coords["x0"],
            "top": coords["top"],
            "x1": coords["x1"],
            "bottom": coords["bottom"],
            "page_width": coords["page_width"],
            "page_height": coords["page_height"]
        }
        final_rules.append(r)
        
    return final_rules
