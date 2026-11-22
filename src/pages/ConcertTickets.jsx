
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConcertTickets.css'

const ConcertTickets = () => {
  const navigate = useNavigate()
  const [artist, setArtist] = useState('')
  const [error, setError] = useState('')

  const searchOfficialTickets = () => {
    const artistName = artist.trim()

    if (!artistName) {
      setError('Please enter a K-pop group or artist name.')
      return
    }

    const ticketUrl = `https://www.ticketmaster.com/search?q=${encodeURIComponent(artistName)}`

    window.open(ticketUrl, '_blank', 'noopener,noreferrer')
    setError('')
  }

  return (
    <main className="concert-tickets-page">
      <button
        className="concert-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <header className="concert-hero">
        <span className="concert-eyebrow">KPOP WORLD • LIVE EVENTS</span>
        <h1>Concert Tickets</h1>
        <p>
          Your favourite K-pop artists. Their live stages. Your next unforgettable experience.
        </p>
      </header>

      <section className="concert-search-section">
        <h2>Find Your Favourite Artist</h2>
        <p>
          Search for any K-pop group or solo artist and explore their concert tickets.
        </p>

        <div className="concert-search-box">
          <span>⌕</span>
          <input
            type="search"
            value={artist}
            onChange={(event) => {
              setArtist(event.target.value)
              setError('')
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchOfficialTickets()
              }
            }}
            placeholder="Enter BTS, BLACKPINK, Stray Kids or any artist..."
          />
        </div>

        {error && (
          <p className="concert-error">{error}</p>
        )}

        <button
          className="concert-search-button"
          onClick={searchOfficialTickets}
        >
          Search Official Tickets →
        </button>
      </section>

      <section className="concert-information">
        <div className="concert-info-icon">🎤</div>
        <h2>Your Next K-pop Concert Could Be Just One Search Away!</h2>
        <p>
          Looking forward to seeing your favourite idols live?
          Search for your favourite artist and explore concert announcements,
          upcoming dates and ticket information on the official ticket website.
        </p>
      </section>

      <section className="concert-fan-message">
        <span>💜</span>
        <h2>Every Fan Deserves a Moment to Remember</h2>
        <p>
          From the first announcement to the final encore, make every concert
          dream count. Discover events, check ticket availability and get ready
          for an unforgettable K-pop experience!
        </p>
      </section>

      <footer className="concert-footer">
        <p>♡ KPOP WORLD — Feel the Music. Live the Moment.</p>
        <small>
          Ticket searches and purchases are handled by the external ticketing website.
        </small>
      </footer>
    </main>
  )
}

export default ConcertTickets
