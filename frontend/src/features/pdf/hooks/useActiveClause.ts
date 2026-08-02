import { useActiveClauseContext } from "../context/ActiveClauseContext";

export function useActiveClause() {
  const { activeClause, setActiveClause, jumpToClause } = useActiveClauseContext();
  return { activeClause, setActiveClause, jumpToClause };
}

export default useActiveClause;
