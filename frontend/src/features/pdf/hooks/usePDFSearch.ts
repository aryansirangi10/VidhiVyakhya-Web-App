import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search.service";
import { SearchResultItem } from "../types/search";

export function usePDFSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim() && !recentSearches.includes(query)) {
        setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Shortcut Cmd+F / Ctrl+F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { data: results = [], isLoading } = useQuery<SearchResultItem[]>({
    queryKey: ["pdf-search", debouncedQuery],
    queryFn: () => searchService.searchBill(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
  });

  return {
    query,
    setQuery,
    results,
    isLoading,
    recentSearches,
    isOpen,
    setIsOpen,
  };
}

export default usePDFSearch;
