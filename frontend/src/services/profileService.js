const API_BASE_URL = '';

export const profileService = {
  async getProfiles(token) {
    const res = await fetch(`${API_BASE_URL}/api/profiles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch saved profiles.");
    return res.json();
  },

  async createProfile(token, profileData) {
    const res = await fetch(`${API_BASE_URL}/api/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error("Failed to secure save profile.");
    return res.json();
  },

  async deleteProfile(token, profileId) {
    const res = await fetch(`${API_BASE_URL}/api/profiles/${profileId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete profile.");
    return res.json();
  },

  async compareProfiles(token, billId) {
    const res = await fetch(`${API_BASE_URL}/api/profiles/compare?bill_id=${billId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to generate profiles comparison card deck.");
    return res.json();
  }
};
export default profileService;
