import { useActiveClause } from "./useActiveClause";
import { usePage } from "./usePage";
import { RuleItem } from "../types/rule";

export function useRuleNavigation() {
  const { jumpToClause, activeClause } = useActiveClause();
  const { setPage } = usePage();

  const navigateToRule = (rule: RuleItem) => {
    jumpToClause(
      rule.id,
      rule.page,
      rule.clause,
      rule.paragraph,
      rule.summary,
      rule.confidence
    );
    setPage(rule.page);
  };

  return { navigateToRule, activeClause };
}

export default useRuleNavigation;
