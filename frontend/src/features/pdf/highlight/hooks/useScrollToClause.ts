import { useCallback } from "react";

export function useScrollToClause() {
  const scrollToClause = useCallback((elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return { scrollToClause };
}

export default useScrollToClause;
