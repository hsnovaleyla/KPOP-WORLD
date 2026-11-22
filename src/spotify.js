export async function searchSpotify(query) {
  const searchText = query.trim()

  if (!searchText) return

  window.open(
    `https://open.spotify.com/search/${encodeURIComponent(searchText)}`,
    '_blank',
    'noopener,noreferrer'
  )
}