const API_BASE_URL = '';

// Local in-memory glossary cache
const glossaryCache = {};

export const glossaryService = {
  async getTermDefinition(term) {
    const normTerm = term.toLowerCase().trim();
    
    // Check local memory cache first
    if (glossaryCache[normTerm]) {
      return glossaryCache[normTerm];
    }
    
    // If not cached, fetch all glossary items
    const res = await fetch(`${API_BASE_URL}/api/glossary`);
    if (!res.ok) throw new Error("Failed to fetch legal glossary.");
    
    const allItems = await res.json();
    
    // Cache all returned definitions for future quick access
    allItems.forEach(item => {
      glossaryCache[item.term.toLowerCase().trim()] = item;
    });
    
    // Check if the term exists in the populated cache
    if (glossaryCache[normTerm]) {
      return glossaryCache[normTerm];
    }
    
    // Fallback if term not found in glossary database
    return {
      term: term,
      definition: "Definition not yet compiled in official gazette sources.",
      example: "No example compiled.",
      related: [],
      source: "Draft documentation"
    };
  }
};
export default glossaryService;
