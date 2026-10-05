const codespace = import.meta.env.VITE_CODESPACE_NAME

export const API_ORIGIN = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiUrl = (path) => `${API_ORIGIN}${path}`

// Accepts either a plain array or a paginated { results: [] } response.
export const normalizeList = (data) =>
  Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []

export async function parseList(response) {
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return normalizeList(await response.json())
}
