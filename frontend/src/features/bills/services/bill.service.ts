import { Bill, AnonymousProfile } from "../types/bill.types";
import { SEEDED_BILLS } from "../utils/constants";
import { api } from "../../../services/api";

const ANONYMOUS_PROFILE_KEY = "vidhivyakhya_anonymous_profile";

export const billService = {
  async getBills(): Promise<Bill[]> {
    try {
      const response = await api.get<Bill[]>("/bills");
      return response.data.length > 0 ? response.data : SEEDED_BILLS;
    } catch {
      return SEEDED_BILLS;
    }
  },

  async getBillById(id: number): Promise<Bill | undefined> {
    try {
      const response = await api.get<Bill>(`/bills/${id}`);
      return response.data;
    } catch {
      return SEEDED_BILLS.find((b) => b.id === id);
    }
  },

  // Anonymous Profile (Stored strictly in sessionStorage, NOT database)
  getAnonymousProfile(): AnonymousProfile | null {
    const data = sessionStorage.getItem(ANONYMOUS_PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveAnonymousProfile(profile: AnonymousProfile): void {
    sessionStorage.setItem(ANONYMOUS_PROFILE_KEY, JSON.stringify(profile));
  },

  clearAnonymousProfile(): void {
    sessionStorage.removeItem(ANONYMOUS_PROFILE_KEY);
  },
};

export default billService;
