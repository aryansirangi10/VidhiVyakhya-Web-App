/**
 * @typedef {Object} ProfileData
 * @property {number} annual_income - Rupee income value
 * @property {number} age - Age number
 * @property {string} tax_regime - new or old
 * @property {string} state - E.g. Telangana
 * @property {string} employment_category - salaried or business etc
 * @property {number} [equity_ltsg] - Capital gains long term
 *
 * @typedef {Object} Profile
 * @property {number} [id] - DB index
 * @property {string} name - Name tag
 * @property {ProfileData} profile_data - Financial details
 * @property {string} [display_name] - Visual name string
 * @property {string} [avatar] - Avatar key string
 * @property {string} [color] - Hex visual tag
 * @property {boolean} [default_profile] - Main profile indicator
 */
export default {};
