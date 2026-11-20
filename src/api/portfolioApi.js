const RAW_BASE = import.meta.env.VITE_API_BASE_URL || 'https://piyushstudio-api.onrender.com/api/v1';
export const API_BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export async function fetchPortfolioOverview() {
  const url = `${API_BASE}/public/portfolio/overview`;
  const controller = new AbortController();
  // 25s timeout to handle free-tier Render container cold-start spin-up
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    console.log(`[Portfolio API] Priority 1: Fetching live data from DB via ${url}...`);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const json = await res.json();
    console.log('[Portfolio API] Successfully loaded live DB overview:', json.data);
    return json.data || null;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[Portfolio API] Live DB fetch error or timeout (activating constants.js fallback):', err.message || err);
    return null;
  }
}
