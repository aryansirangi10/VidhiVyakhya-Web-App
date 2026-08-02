import { useQuery } from "@tanstack/react-query";
import { highlightService } from "../services/highlight.service";

export function useHighlight(clauseId: string) {
  return useQuery({
    queryKey: ["highlight", clauseId],
    queryFn: () => highlightService.getClauseCoordinate(clauseId),
    enabled: !!clauseId,
    staleTime: 1000 * 60 * 30, // 30 min cache
  });
}

export default useHighlight;
