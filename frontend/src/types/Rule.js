/**
 * @typedef {Object} Rule
 * @property {number} id
 * @property {number} bill_id
 * @property {string} clause_number - E.g. Clause 4
 * @property {string} clause_text - Text paragraph
 * @property {string} rule_type - tax_slab, standard_deduction, etc.
 * @property {Object} condition_json - Match criteria parameters
 * @property {Object} formula_json - Calculation slabs and rates
 * @property {Object} source_span - Highlighting box coordinates
 * @property {number} confidence - Rating score between 0.0 and 1.0
 * @property {boolean} reviewed - Verified indicator flag
 * @property {string} [reviewed_by] - Reviewer username
 * @property {string} [reviewed_at] - Review datetime
 * @property {number} rule_version - Rule edit count
 * @property {boolean} is_demo_rule - Mock flag indicator
 * @property {number} page - Source page number
 * @property {string} [paragraph] - Source text summary
 * @property {string} [checksum] - Unique hash identifier
 */
export default {};
