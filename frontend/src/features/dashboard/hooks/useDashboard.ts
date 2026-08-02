import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboard.api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: () => dashboardApi.getDashboard(),
  });
}

export default useDashboard;
