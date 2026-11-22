
import { useState } from 'react'
import './SpotifyMusic.css'

const kpopGroups = [
  {
    name: 'BTS',
    debut: 'June 13, 2013',
    members: ['RM', 'Jin', 'SUGA', 'j-hope', 'Jimin', 'V', 'Jungkook'],
    fact: 'BTS is a South Korean group known for its music, powerful performances and meaningful messages. The group has a worldwide fanbase called ARMY.'
  },
  {
    name: 'BLACKPINK',
    debut: 'August 8, 2016',
    members: ['Jisoo', 'Jennie', 'Rosé', 'Lisa'],
    fact: 'BLACKPINK is a globally popular girl group known for its distinctive music, fashion influence and energetic performances. Their fans are called BLINKs.'
  },
  {
    name: 'Stray Kids',
    debut: 'March 25, 2018',
    members: ['Bang Chan', 'Lee Know', 'Changbin', 'Hyunjin', 'HAN', 'Felix', 'Seungmin', 'I.N'],
    fact: 'Stray Kids are known for their powerful performances and involvement in producing and writing their music. Their fan community is called STAY.'
  }
]

export default function SpotifyMusic() {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState(null)

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('kpop-music-searches') || '[]'
      )
    } catch {
      return []
    }
  })

  const searchSpotify = (searchText) => {
    const value = searchText.trim()

    if (!value) return

    const updated = [
      value,
      ...recentSearches.filter(
        item => item.toLowerCase() !== value.toLowerCase()
      )
    ].slice(0, 8)

    setRecentSearches(updated)

    localStorage.setItem(
      'kpop-music-searches',
      JSON.stringify(updated)
    )

    window.open(
      `https://open.spotify.com/search/${encodeURIComponent(value)}`,
      '_blank',
      'noopener,noreferrer'
    )

    setQuery(value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchSpotify(query)
  }

  return (
    <section className="home-section music-section" id="music">
      <span className="section-label">YOUR MUSIC WORLD</span>

      <h2>Discover K-pop Music</h2>

      <p className="section-description">
        Discover popular K-pop groups and search for any artist,
        song or album directly on Spotify.
      </p>

      <div className="music-featured-groups">
        <h3>Top 3 K-pop Groups</h3>

        <div className="music-group-cards">
          {kpopGroups.map(group => (
            <article className="music-group-card" key={group.name}>
              <h4>{group.name}</h4>

              <button
                type="button"
                onClick={() =>
                  setActiveGroup(
                    activeGroup === group.name ? null : group.name
                  )
                }
              >
                {activeGroup === group.name ? 'Close About' : 'About'}
              </button>

              {activeGroup === group.name && (
                <div className="music-group-about">
                  <p>
                    <strong>Debut:</strong> {group.debut}
                  </p>

                  <p>
                    <strong>Number of members:</strong>{' '}
                    {group.members.length}
                  </p>

                  <h5>Members</h5>

                  <ul>
                    {group.members.map(member => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>

                  <h5>About the group</h5>

                  <p>{group.fact}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="music-search-section">
        <h3>Search on Spotify</h3>

        <p>
          Search for any K-pop group, artist, song or album.
        </p>

        <form className="music-search" onSubmit={handleSearch}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any song, artist or group..."
            maxLength={100}
          />

          <button type="submit">
            Search Music
          </button>
        </form>
      </div>

      {recentSearches.length > 0 && (
        <div className="music-recent-searches">
          <h3>Recently Searched</h3>

          <div className="music-group-list">
            {recentSearches.map((item, index) => (
              <button
                type="button"
                key={`${item}-${index}`}
                onClick={() => searchSpotify(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="music-clear-history"
            onClick={() => {
              setRecentSearches([])
              localStorage.removeItem('kpop-music-searches')
            }}
          >
            Clear History
          </button>
        </div>
      )}

      <div className="spotify-player">
        <h3>Listen through Spotify</h3>

        <p>
          Open Spotify to discover and listen to your favorite music.
        </p>

        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open Spotify
        </a>
      </div>
    </section>
  )
}
