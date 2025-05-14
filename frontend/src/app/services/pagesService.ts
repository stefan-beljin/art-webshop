const API_BASE = process.env.API_ENDPOINT;

const fetchPages = async () => {
  try {
    const response = await fetch(`${API_BASE}/pages`);
    const data = response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to load pages");
  }
};

export default { fetchPages };
