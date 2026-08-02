import React, { useState, useCallback } from 'react';
import { glossaryService } from '../services/glossaryService';

const GLOSSARY_TERMS = [
  'assessment year',
  'standard deduction',
  'ltcg',
  'section 80c',
  'data principal',
  'taxable income',
  'huf',
  'indexation',
  'financial year'
];

export function useGlossary() {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null);

  const fetchTerm = useCallback((term) => {
    if (!term) return;
    setLoading(true);
    setActiveTerm(term);
    
    glossaryService.getTermDefinition(term)
      .then(def => {
        setDefinition(def);
        setLoading(false);
      })
      .catch(() => {
        setDefinition({
          term,
          definition: "Failed to load definition.",
          example: "Please check your network connection.",
          related: [],
          source: "Glossary service"
        });
        setLoading(false);
      });
  }, []);

  const clearTerm = useCallback(() => {
    setActiveTerm(null);
    setDefinition(null);
  }, []);

  // Highlights terms inside text by wrapping them in custom hover nodes
  const highlightTerms = useCallback((text, renderTrigger) => {
    if (!text || typeof text !== 'string') return text;
    
    // Sort terms by length descending to match longest terms first (e.g. standard deduction vs deduction)
    const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.length - a.length);
    const regexPattern = `\\b(${sortedTerms.join('|')})\\b`;
    const regex = new RegExp(regexPattern, 'gi');
    
    const parts = text.split(regex);
    if (parts.length <= 1) return text;
    
    return parts.map((part, index) => {
      const isTerm = GLOSSARY_TERMS.includes(part.toLowerCase());
      if (isTerm) {
        return renderTrigger(part, index);
      }
      return part;
    });
  }, []);

  return {
    definition,
    loading,
    activeTerm,
    fetchTerm,
    clearTerm,
    highlightTerms
  };
}

export default useGlossary;
