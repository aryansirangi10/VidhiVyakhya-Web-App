/**
 * @typedef {Object} Bill
 * @property {number} id - Unique identifier
 * @property {string} title - Bill title
 * @property {string} summary - Plain English description
 * @property {string} [source_url] - External official link
 * @property {string} pdf_path - Local pdf volume path
 * @property {string} status - Introduced, Lok Sabha, implemented etc.
 * @property {string} current_stage - Stage progress
 * @property {string} introduced_date - Introduced date
 * @property {string} [effective_date] - Implemented date
 * @property {string} last_updated - ISO date string
 * @property {number} reading_time - In minutes
 * @property {number} pages - Total pages count
 * @property {string} ministry - Sponsoring ministry
 * @property {string} [bill_number] - Act / Bill number
 * @property {string} category - Income Tax, Privacy etc.
 * @property {string} pdf_size - Formatted file size
 * @property {string} [sponsor] - Cabinet sponsor name
 * @property {string} [parliamentary_session] - Monsoon session etc.
 * @property {string} [document_language] - Primary language
 * @property {number} [amendment_count] - Revision numbers count
 */
export default {};
