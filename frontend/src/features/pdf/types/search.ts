export interface SearchResultItem {
  id: string;
  clauseId: string;
  section: string;
  page: number;
  snippet: string;
  matchScore: number;
}

export interface SearchState {
  query: string;
  results: SearchResultItem[];
  recentSearches: string[];
  isSearching: boolean;
  selectedIndex: number;
}
