import { useQuery } from "@tanstack/react-query";
import { glossaryService } from "../services/glossary.service";
import { GlossaryTerm } from "../types/glossary";

export function useGlossary() {
  return useQuery<GlossaryTerm[]>({
    queryKey: ["glossary-terms"],
    queryFn: () => glossaryService.getTerms(),
  });
}

export default useGlossary;
