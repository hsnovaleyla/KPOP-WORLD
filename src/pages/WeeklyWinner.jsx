
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './WeeklyWinner.css'

export default function WeeklyWinner() {
  const navigate = useNavigate()
  const [winner, setWinner] = useState(null)
  const [groups, setGroups] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadWinnerAndGroups()
  }, [])

  async function loadWinnerAndGroups() {
    setLoading(true)

    const { data: profiles, error: profileError } = await supabase
      .from('member_profiles')
      .select('user_id, display_name')

    const { data: scores, error: scoreError } = await supabase
      .from('game_scores')
      .select('user_id, score')

    if (profileError || scoreError) {
      setMessage('Could not load the winner.')
      setLoading(false)
      return
    }

    const totals = {}

    scores?.forEach((item) => {
      totals[item.user_id] =
        (totals[item.user_id] || 0) + Number(item.score || 0)
    })

    const ranking = (profiles || [])
      .map((profile) => ({
        ...profile,
        points: totals[profile.user_id] || 0
      }))
      .sort((a, b) => b.points - a.points)

    setWinner(ranking[0] || null)

    const { data: authData } = await supabase.auth.getUser()
    const user = authData?.user

    if (user) {
      const { data: memberships } = await supabase
        .from('fan_group_members')
        .select('group_id')
        .eq('user_id', user.id)

      const { data: ownedGroups } = await supabase
        .from('fan_groups')
        .select('id, name')
        .eq('owner_id', user.id)

      const groupIds = new Set([
        ...(memberships || []).map((item) => item.group_id),
        ...(ownedGroups || []).map((item) => item.id)
      ])

      const { data: allGroups } = await supabase
        .from('fan_groups')
        .select('id, name')

      setGroups(
        (allGroups || []).filter((group) => groupIds.has(group.id))
      )
    }

    setLoading(false)
  }

  function toggleGroup(groupId) {
    setSelectedGroups((previous) =>
      previous.includes(groupId)
        ? previous.filter((id) => id !== groupId)
        : [...previous, groupId]
    )
  }

  async function shareWinner() {
    if (selectedGroups.length === 0 || !winner) return

    setSharing(true)
    setMessage('')

    const { data: authData } = await supabase.auth.getUser()
    const user = authData?.user

    if (!user) {
      setMessage('Please log in first.')
      setSharing(false)
      return
    }

    const winnerName = winner.display_name || 'Community member'
    const postText = `🏆 Weekly Winner: ${winnerName}! Congratulations! 🎉`

    const messages = selectedGroups.map((groupId) => ({
      group_id: groupId,
      user_id: user.id,
      content: postText
    }))

    const { error } = await supabase
      .from('fan_group_messages')
      .insert(messages)

    if (error) {
      setMessage(`Could not share the winner: ${error.message}`)
    } else {
      setMessage(
        `Winner shared successfully in ${selectedGroups.length} fan group(s)!`
      )
      setSelectedGroups([])
      setDropdownOpen(false)
    }

    setSharing(false)
  }

  const selectedGroupNames = groups
    .filter((group) => selectedGroups.includes(group.id))
    .map((group) => group.name)

  return (
    <div className="weekly-winner-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>🏆 Weekly Winner</h1>

      {loading ? (
        <p>Loading...</p>
      ) : winner ? (
        <div className="winner-card">
          <h2>{winner.display_name || 'Community member'}</h2>
          <h3>Congratulations!</h3>
          <p>Share with Fan Discussions</p>

          <div className="winner-group-dropdown">
            <button
              type="button"
              className="winner-group-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <span>
                {selectedGroupNames.length > 0
                  ? selectedGroupNames.join(', ')
                  : 'Choose fan groups'}
              </span>
              <span className="winner-dropdown-arrow">
                {dropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {dropdownOpen && (
              <div className="winner-group-menu">
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <label
                      key={group.id}
                      className="winner-group-option"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroup(group.id)}
                      />
                      <span>{group.name}</span>
                    </label>
                  ))
                ) : (
                  <p>No fan groups available.</p>
                )}
              </div>
            )}
          </div>

          <p className="winner-selection-count">
            {selectedGroups.length} group(s) selected
          </p>

          <button
            onClick={shareWinner}
            disabled={selectedGroups.length === 0 || sharing}
          >
            {sharing ? 'Sharing...' : 'Share'}
          </button>
        </div>
      ) : (
        <p>No winner found yet.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}
