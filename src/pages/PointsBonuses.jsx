
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import './PointsBonuses.css'

function PointsBonuses() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setLoading(true)
    setError('')

    const { data: profiles, error: profileError } = await supabase
      .from('member_profiles')
      .select('user_id, display_name')

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    const { data: scores, error: scoreError } = await supabase
      .from('game_scores')
      .select('user_id, score')

    if (scoreError) {
      setError(scoreError.message)
      setLoading(false)
      return
    }

    const { data: badges, error: badgeError } = await supabase
      .from('member_rewards')
      .select('user_id, badge_name')

    if (badgeError) {
      setError(badgeError.message)
      setLoading(false)
      return
    }

    const result = (profiles || []).map((profile) => {
      const memberScores = (scores || []).filter(
        (item) => item.user_id === profile.user_id
      )

      const memberBadges = (badges || []).filter(
        (item) => item.user_id === profile.user_id
      )

      return {
        user_id: profile.user_id,
        name: profile.display_name || 'K-pop Fan',
        points: memberScores.reduce(
          (total, item) => total + Number(item.score || 0),
          0
        ),
        badges: memberBadges
          .map((item) => item.badge_name)
          .filter(Boolean)
      }
    })

    result.sort((a, b) => b.points - a.points)
    setMembers(result)
    setLoading(false)
  }

  return (
    <main className="points-page">
      <button
        className="points-back"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <header className="points-header">
        <span>⭐ KPOP WORLD COMMUNITY</span>
        <h1>Points & Bonuses</h1>
        <p>Discover the points and badges earned by our fan community.</p>
      </header>

      {loading && <p className="points-status">Loading members...</p>}

      {error && (
        <div className="points-error">
          {error}
          <button onClick={loadMembers}>Try again</button>
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <p className="points-status">No members found yet.</p>
      )}

      {!loading && !error && members.length > 0 && (
        <section className="points-list">
          {members.map((member, index) => (
            <article className="points-member" key={member.user_id}>
              <div className="points-rank">
                {index < 3 ? ['👑', '🥈', '🥉'][index] : `#${index + 1}`}
              </div>

              <div className="points-member-info">
                <h2>
                  {member.name}
                  {index < 3 && <span className="big-fan">Big Fan</span>}
                </h2>

                <p className="points-total">
                  ⭐ {member.points} points
                </p>

                <div className="points-rewards">
                  <span>
                    🏅 Badges: {member.badges.length
                      ? member.badges.join(', ')
                      : 'No badges yet'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default PointsBonuses
