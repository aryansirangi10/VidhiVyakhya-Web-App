const API_BASE_URL = '';

export const simulationService = {
  async getHistory(token, profileId = null) {
    let url = `${API_BASE_URL}/api/history`;
    if (profileId) {
      url += `?profile_id=${profileId}`;
    }
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load calculation history logs.");
    return res.json();
  },

  async saveHistory(token, historyData) {
    const res = await fetch(`${API_BASE_URL}/api/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(historyData)
    });
    if (!res.ok) throw new Error("Failed to save simulation history log.");
    return res.json();
  }
};
export default simulationService;
