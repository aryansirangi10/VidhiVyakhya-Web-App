/**
 * @typedef {Object} BreakdownDetails
 * @property {number} tax - Base tax savings portion
 * @property {number} cess - 4% Education & Health Cess savings
 * @property {number} surcharge - Surcharge difference
 *
 * @typedef {Object} ImpactResult
 * @property {number} impact - Total net savings (positive) or costs (negative)
 * @property {Array<Object>} matchedRules - Triggered clauses rules list
 * @property {boolean} hasComplianceAlert - Compliance risk flag
 * @property {BreakdownDetails} breakdown - Slab divisions
 * @property {Array<string>} trace - Calculation step-by-step trace strings list
 */
export default {};
