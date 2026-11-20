const RAW_BASE = import.meta.env.VITE_API_BASE_URL || 'https://piyushstudio-api.onrender.com/api/v1';
export const API_BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export async function fetchPortfolioOverview() {
  const url = `${API_BASE}/public/portfolio/overview`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Backend overview fetch warning (using fallback data):', err.message || err);
    return null;
  }
}

