import { api } from "../../../services/api";

export const dashboardApi = {
  async getDashboard() {
    try {
      const res = await api.get("/v1/dashboard");
      return res.data;
    } catch {
      return {
        summary: {
          userName: "Aryan",
          billsTrackedCount: 14,
          estimatedAnnualSavings: 18450,
          billsUpdatedThisWeek: 3,
          rulesChangedCount: 7,
        },
        savingsTrend: [
          { month: "Jan", savings: 8000 },
          { month: "Feb", savings: 10500 },
          { month: "Mar", savings: 12000 },
          { month: "Apr", savings: 15000 },
          { month: "May", savings: 18450 },
        ],
        watchlistTopics: ["Income Tax", "GST", "Privacy", "Digital India"],
      };
    }
  },
};

export default dashboardApi;
