const API_BASE_URL = ''; // Mapped relatively through Vite proxy to http://localhost:8000

export const billService = {
  async getBills() {
    const res = await fetch(`${API_BASE_URL}/api/bills`);
    if (!res.ok) throw new Error("Failed to fetch parliamentary bills.");
    return res.json();
  },

  async getBillById(id) {
    const res = await fetch(`${API_BASE_URL}/api/bills/${id}`);
    if (!res.ok) throw new Error("Failed to fetch bill clauses details.");
    return res.json();
  },

  async getBillTimeline(id) {
    const res = await fetch(`${API_BASE_URL}/api/bills/${id}/timeline`);
    if (!res.ok) throw new Error("Failed to load legislative progress stages.");
    return res.json();
  },

  async getBillMetadata(id) {
    const res = await fetch(`${API_BASE_URL}/api/bills/${id}/metadata`);
    if (!res.ok) throw new Error("Failed to load bill metadata card parameters.");
    return res.json();
  },

  async uploadBill(formData, userApiKey = "") {
    const headers = {};
    if (userApiKey) {
      headers["X-Gemini-API-Key"] = userApiKey;
    }
    const res = await fetch(`${API_BASE_URL}/api/bills/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Ingestion parsing failed.");
    }
    return res.json();
  }
};
export default billService;
