const codespace = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

// Accepts either a plain array or a paginated { results: [] } response.
export const normalizeList = (data) =>
  Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []

export async function fetchList(resource, signal) {
  const url = `${API_BASE}/${resource}/`
  console.log('Fetching from:', url)
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  const data = await response.json()
  console.log(`Fetched ${resource}:`, data)
  return normalizeList(data)
}
