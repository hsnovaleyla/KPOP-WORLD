
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const question = (question, options, answer) => ({
  question,
  options,
  answer
})

const games = [
  {
    id: 'quiz',
    title: 'K-pop Quiz',
    description: 'Test your knowledge about K-pop groups.',
    weeklyQuestions: [
      [
        question('Which group released "Dynamite"?', ['BTS', 'BLACKPINK', 'TWICE', 'EXO'], 'BTS'),
        question('Which company manages BLACKPINK?', ['JYP', 'SM', 'YG', 'HYBE'], 'YG'),
        question('How many members are in Stray Kids?', ['6', '7', '8', '9'], '8'),
        question('What is BTS fandom called?', ['BLINK', 'ARMY', 'STAY', 'ONCE'], 'ARMY'),
        question('Which group debuted in 2016?', ['BTS', 'BLACKPINK', 'ATEEZ', 'TXT'], 'BLACKPINK')
      ],
      [
        question('Which group released "Feel Special"?', ['TWICE', 'IVE', 'aespa', 'ITZY'], 'TWICE'),
        question('What is the fandom name of Stray Kids?', ['MOA', 'STAY', 'ENGENE', 'CARAT'], 'STAY'),
        question('Which group debuted with "Crown"?', ['ENHYPEN', 'TXT', 'TREASURE', 'RIIZE'], 'TXT'),
        question('Which group has a member named Karina?', ['IVE', 'aespa', 'ITZY', 'NMIXX'], 'aespa'),
        question('What is BLACKPINK fandom called?', ['BLINK', 'ARMY', 'ONCE', 'MIDZY'], 'BLINK')
      ],
      [
        question('Which group released "Super Shy"?', ['NewJeans', 'IVE', 'TWICE', 'LE SSERAFIM'], 'NewJeans'),
        question('Which group has a member named Felix?', ['ATEEZ', 'TXT', 'Stray Kids', 'EXO'], 'Stray Kids'),
        question('What is the fandom name of TWICE?', ['BLINK', 'ONCE', 'STAY', 'MOA'], 'ONCE'),
        question('Which group debuted in 2018?', ['BTS', 'Stray Kids', 'BLACKPINK', 'EXO'], 'Stray Kids'),
        question('Which group released "Love Dive"?', ['IVE', 'aespa', 'ITZY', 'NewJeans'], 'IVE')
      ]
    ]
  },
  {
    id: 'guess',
    title: 'Guess the Group',
    description: 'Read the clues and identify the K-pop group.',
    weeklyQuestions: [
      [
        question('RM, Jin, SUGA, j-hope, Jimin, V and Jung Kook belong to which group?', ['EXO', 'BTS', 'NCT', 'SEVENTEEN'], 'BTS'),
        question('Jisoo, Jennie, Rosé and Lisa are members of which group?', ['aespa', 'IVE', 'BLACKPINK', 'ITZY'], 'BLACKPINK'),
        question('Bang Chan, Lee Know, Changbin and Hyunjin belong to which group?', ['ATEEZ', 'TXT', 'Stray Kids', 'ENHYPEN'], 'Stray Kids'),
        question('Nayeon, Sana, Jihyo and Tzuyu belong to which group?', ['Red Velvet', 'TWICE', 'IVE', 'LE SSERAFIM'], 'TWICE'),
        question('This group debuted with "Crown" in 2019.', ['TXT', 'ENHYPEN', 'TREASURE', 'RIIZE'], 'TXT')
      ],
      [
        question('This group has members Karina, Giselle, Winter and Ningning.', ['IVE', 'aespa', 'ITZY', 'NMIXX'], 'aespa'),
        question('This group includes members Wonyoung and Yujin.', ['IVE', 'TWICE', 'BLACKPINK', 'NewJeans'], 'IVE'),
        question('This group has members Yeonjun, Soobin, Beomgyu, Taehyun and Huening Kai.', ['BTS', 'TXT', 'EXO', 'NCT'], 'TXT'),
        question('This girl group debuted in 2022 and has five members.', ['NewJeans', 'TWICE', 'Red Velvet', 'ITZY'], 'NewJeans'),
        question('This group has a member named Hongjoong.', ['ATEEZ', 'Stray Kids', 'ENHYPEN', 'SEVENTEEN'], 'ATEEZ')
      ],
      [
        question('This group has members S.Coups, Hoshi and Woozi.', ['NCT', 'SEVENTEEN', 'EXO', 'BTS'], 'SEVENTEEN'),
        question('This group includes members Jungwon and Sunghoon.', ['TXT', 'ENHYPEN', 'ATEEZ', 'RIIZE'], 'ENHYPEN'),
        question('This group has members Irene, Seulgi and Wendy.', ['TWICE', 'Red Velvet', 'IVE', 'aespa'], 'Red Velvet'),
        question('This group includes members Yeji and Ryujin.', ['ITZY', 'NMIXX', 'IVE', 'BLACKPINK'], 'ITZY'),
        question('This group has members Mark and Taeyong.', ['EXO', 'NCT', 'BTS', 'TXT'], 'NCT')
      ]
    ]
  },
  {
    id: 'match',
    title: 'Member Match',
    description: 'Choose the correct group for each K-pop member.',
    weeklyQuestions: [
      [
        question('Which group is Jung Kook a member of?', ['BTS', 'EXO', 'TXT', 'NCT'], 'BTS'),
        question('Which group is Lisa a member of?', ['TWICE', 'BLACKPINK', 'ITZY', 'IVE'], 'BLACKPINK'),
        question('Which group is Felix a member of?', ['ATEEZ', 'ENHYPEN', 'Stray Kids', 'TXT'], 'Stray Kids'),
        question('Which group is Wonyoung a member of?', ['IVE', 'aespa', 'LE SSERAFIM', 'NewJeans'], 'IVE'),
        question('Which group is Yeonjun a member of?', ['BTS', 'TXT', 'SEVENTEEN', 'NCT'], 'TXT')
      ],
      [
        question('Which group is Karina a member of?', ['IVE', 'aespa', 'ITZY', 'NMIXX'], 'aespa'),
        question('Which group is Nayeon a member of?', ['BLACKPINK', 'TWICE', 'Red Velvet', 'IVE'], 'TWICE'),
        question('Which group is Bang Chan a member of?', ['ATEEZ', 'TXT', 'Stray Kids', 'ENHYPEN'], 'Stray Kids'),
        question('Which group is Hanni a member of?', ['NewJeans', 'IVE', 'LE SSERAFIM', 'aespa'], 'NewJeans'),
        question('Which group is Hongjoong a member of?', ['EXO', 'ATEEZ', 'NCT', 'BTS'], 'ATEEZ')
      ],
      [
        question('Which group is Hoshi a member of?', ['SEVENTEEN', 'EXO', 'BTS', 'NCT'], 'SEVENTEEN'),
        question('Which group is Sunghoon a member of?', ['TXT', 'ENHYPEN', 'ATEEZ', 'RIIZE'], 'ENHYPEN'),
        question('Which group is Irene a member of?', ['TWICE', 'Red Velvet', 'IVE', 'aespa'], 'Red Velvet'),
        question('Which group is Yeji a member of?', ['ITZY', 'NMIXX', 'IVE', 'BLACKPINK'], 'ITZY'),
        question('Which group is Taeyong a member of?', ['EXO', 'NCT', 'BTS', 'TXT'], 'NCT')
      ]
    ]
  }
]

const getWeekInfo = () => {
  const now = new Date()
  const monday = new Date(now)
  const day = monday.getDay()

  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1))
  monday.setHours(0, 0, 0, 0)

  const year = monday.getFullYear()
  const month = String(monday.getMonth() + 1).padStart(2, '0')
  const date = String(monday.getDate()).padStart(2, '0')
  const weekKey = `${year}-${month}-${date}`

  const anchor = new Date(2026, 10, 16)
  const weekNumber = Math.floor(
    (monday.getTime() - anchor.getTime()) / (7 * 24 * 60 * 60 * 1000)
  )

  const setIndex = ((weekNumber % 3) + 3) % 3

  return { weekKey, setIndex }
}

const buildGameData = (rows) => {
  const data = {
    totalPoints: 0,
    bestScores: {},
    weeklyAttempts: {}
  }

  ;(rows || []).forEach(row => {
    const points = Number(row.score) || 0

    data.totalPoints += points

    data.bestScores[row.game_id] = Math.max(
      data.bestScores[row.game_id] || 0,
      points
    )

    if (!data.weeklyAttempts[row.week_key]) {
      data.weeklyAttempts[row.week_key] = {}
    }

    data.weeklyAttempts[row.week_key][row.game_id] = points
  })

  return data
}

const styles = `
.games-page {
  min-height: 100vh;
  padding: 55px 7%;
  background: #f7f3fc;
  color: #354c42;
}
.games-container {
  max-width: 1050px;
  margin: 0 auto;
}
.games-header {
  text-align: center;
  margin-bottom: 35px;
}
.games-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #354c42;
}
.games-header p {
  color: #68776e;
  font-size: 16px;
}
.games-panel {
  background: white;
  border-radius: 18px;
  padding: 28px;
  margin-bottom: 25px;
  box-shadow: 0 5px 20px rgba(70, 50, 90, 0.07);
}
.games-panel h2 { margin-top: 0; }
.games-select {
  width: 100%;
  padding: 14px;
  border: 1px solid #d9cbea;
  border-radius: 10px;
  background: #fff;
  color: #354c42;
  font-size: 16px;
  margin-top: 12px;
}
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  margin-top: 25px;
}
.game-card {
  background: white;
  border: 1px solid #e8def2;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(70, 50, 90, 0.05);
}
.game-card h3 { margin-top: 0; color: #354c42; }
.game-card p { color: #718078; line-height: 1.5; }
.game-button {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 13px 18px;
  margin-top: 12px;
  background: #285943;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.game-button:hover { background: #1d4532; }
.game-button:disabled { opacity: 0.5; cursor: not-allowed; }
.games-score {
  background: #edf5ee;
  border-radius: 12px;
  padding: 18px;
  margin-top: 18px;
}
.games-score strong { color: #285943; }
.game-question {
  font-size: 21px;
  line-height: 1.5;
  margin: 22px 0;
}
.game-option {
  display: block;
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: 1px solid #ded3eb;
  border-radius: 10px;
  background: white;
  color: #354c42;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
}
.game-option:hover { background: #f2edf9; }
.game-option.selected {
  border: 2px solid #285943;
  background: #edf5ee;
}
.games-back {
  border: none;
  background: transparent;
  color: #285943;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 15px;
  padding: 5px 0;
}
.games-message {
  padding: 18px;
  background: white;
  border-radius: 12px;
  color: #6b5b79;
  margin: 20px 0;
}
@media (max-width: 600px) {
  .games-page { padding: 35px 5%; }
  .games-header h1 { font-size: 28px; }
  .games-panel { padding: 20px; }
}
`

function Games() {
  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [scoreError, setScoreError] = useState('')
  const [scoresLoading, setScoresLoading] = useState(false)
  const [savingScore, setSavingScore] = useState(false)
  const [activeGame, setActiveGame] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [gameData, setGameData] = useState({
    totalPoints: 0,
    bestScores: {},
    weeklyAttempts: {}
  })

  const { weekKey, setIndex } = getWeekInfo()

  useEffect(() => {
    let mounted = true

    const loadAccess = async () => {
      setLoading(true)
      setError('')

      try {
        const {
          data: { user: currentUser },
          error: authError
        } = await supabase.auth.getUser()

        if (authError) throw authError

        if (!currentUser) {
          if (mounted) {
            setUser(null)
            setGroups([])
          }
          return
        }

        const { data: allGroups, error: groupsError } = await supabase
          .from('fan_groups')
          .select('id, name, created_by')

        if (groupsError) throw groupsError

        const { data: memberships, error: membersError } = await supabase
          .from('fan_group_members')
          .select('group_id')
          .eq('user_id', currentUser.id)

        if (membersError) throw membersError

        const memberGroupIds = (memberships || []).map(item => item.group_id)

        const accessibleGroups = (allGroups || []).filter(group =>
          memberGroupIds.includes(group.id) ||
          group.created_by === currentUser.id
        )

        if (mounted) {
          setUser(currentUser)
          setGroups(accessibleGroups)
        }
      } catch (err) {
        console.error('Games access error:', err)

        if (mounted) {
          setError('Could not load your fan groups. Please try again.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadAccess()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const loadScores = async () => {
      if (!user || !selectedGroup) {
        setGameData({
          totalPoints: 0,
          bestScores: {},
          weeklyAttempts: {}
        })
        return
      }

      setScoresLoading(true)
      setScoreError('')

      try {
        const { data, error: scoresError } = await supabase
          .from('game_scores')
          .select('game_id, week_key, score')
          .eq('user_id', user.id)
          .eq('group_id', selectedGroup)

        if (scoresError) throw scoresError

        if (mounted) {
          setGameData(buildGameData(data))
        }
      } catch (err) {
        console.error('Loading game scores error:', err)

        if (mounted) {
          setScoreError('Could not load your points. Please refresh the page.')
        }
      } finally {
        if (mounted) setScoresLoading(false)
      }
    }

    loadScores()

    return () => {
      mounted = false
    }
  }, [user, selectedGroup])

  const currentWeekAttempts = gameData.weeklyAttempts[weekKey] || {}

  const saveGameScore = async (gameId, newScore) => {
    if (!user || !selectedGroup) return false

    setSavingScore(true)
    setScoreError('')

    try {
      const { error: insertError } = await supabase
        .from('game_scores')
        .insert({
          user_id: user.id,
          group_id: selectedGroup,
          game_id: gameId,
          week_key: weekKey,
          score: newScore
        })

      if (insertError) throw insertError

      const { data, error: reloadError } = await supabase
        .from('game_scores')
        .select('game_id, week_key, score')
        .eq('user_id', user.id)
        .eq('group_id', selectedGroup)

      if (reloadError) throw reloadError

      setGameData(buildGameData(data))
      return true
    } catch (err) {
      console.error('Saving game score error:', err)

      if (err.code === '23505') {
        setScoreError('You have already completed this game this week.')
      } else {
        setScoreError('Your score could not be saved. Please try again.')
      }

      return false
    } finally {
      setSavingScore(false)
    }
  }

  const startGame = game => {
    if (
      currentWeekAttempts[game.id] !== undefined ||
      scoresLoading
    ) return

    const weeklyGame = {
      ...game,
      questions: game.weeklyQuestions[setIndex]
    }

    setScoreError('')
    setActiveGame(weeklyGame)
    setQuestionIndex(0)
    setSelectedAnswer('')
    setScore(0)
    setFinished(false)
  }

  const submitAnswer = async () => {
    if (!selectedAnswer || !activeGame || savingScore) return

    const currentQuestion = activeGame.questions[questionIndex]
    const updatedScore = score +
      (selectedAnswer === currentQuestion.answer ? 10 : 0)

    if (questionIndex === activeGame.questions.length - 1) {
      const saved = await saveGameScore(activeGame.id, updatedScore)

      if (saved) {
        setScore(updatedScore)
        setFinished(true)
      }

      return
    }

    setScore(updatedScore)
    setQuestionIndex(questionIndex + 1)
    setSelectedAnswer('')
  }

  const totalScore = gameData.totalPoints
  const weeklyScore = Object.values(currentWeekAttempts).reduce(
    (total, value) => total + value,
    0
  )

  if (loading) {
    return (
      <div className="games-page">
        <style>{styles}</style>
        <div className="games-container">
          <div className="games-message">Loading your fan groups...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="games-page">
        <style>{styles}</style>
        <div className="games-container">
          <h1>K-pop Games</h1>
          <div className="games-message">
            Please log in to access K-pop Games.
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="games-page">
        <style>{styles}</style>
        <div className="games-container">
          <h1>K-pop Games</h1>
          <div className="games-message">{error}</div>
        </div>
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="games-page">
        <style>{styles}</style>
        <div className="games-container">
          <div className="games-header">
            <h1>🎮 K-pop Games</h1>
            <p>Play games with your fan community.</p>
          </div>
          <div className="games-message">
            You need to join a fan group before accessing the games.
            Visit Fan Groups and become a member first.
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = activeGame?.questions[questionIndex]

  return (
    <div className="games-page">
      <style>{styles}</style>

      <div className="games-container">
        <div className="games-header">
          <h1>🎮 K-pop Games</h1>
          <p>Choose your fan group and enjoy three K-pop games.</p>
          <p><strong>Weekly question set:</strong> {setIndex + 1} of 3</p>
        </div>

        {!activeGame ? (
          <>
            <div className="games-panel">
              <h2>Select Your Fan Group</h2>
              <p>Games are available only to members of a fan group.</p>

              <select
                className="games-select"
                value={selectedGroup}
                onChange={event => setSelectedGroup(event.target.value)}
              >
                <option value="">-- Choose your fan group --</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>

              {selectedGroup && (
                <div className="games-score">
                  {scoresLoading ? (
                    <p>Loading your points...</p>
                  ) : (
                    <>
                      <p><strong>Your total points: {totalScore}</strong></p>
                      <p><strong>This week's points: {weeklyScore}/150</strong></p>
                      <p>Each game can be played once per week.</p>
                    </>
                  )}
                </div>
              )}

              {scoreError && (
                <div className="games-message">{scoreError}</div>
              )}
            </div>

            {selectedGroup && (
              <>
                <h2>Choose a Game</h2>

                <div className="games-grid">
                  {games.map(game => {
                    const alreadyPlayed =
                      currentWeekAttempts[game.id] !== undefined

                    return (
                      <div className="game-card" key={game.id}>
                        <h3>{game.title}</h3>
                        <p>{game.description}</p>
                        <p>
                          Best score: <strong>{gameData.bestScores[game.id] || 0}/50</strong>
                        </p>

                        {alreadyPlayed ? (
                          <div className="games-score">
                            <strong>Completed this week</strong>
                            <p>Your score: {currentWeekAttempts[game.id]}/50</p>
                          </div>
                        ) : (
                          <button
                            className="game-button"
                            disabled={scoresLoading || Boolean(scoreError)}
                            onClick={() => startGame(game)}
                          >
                            Play Game
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="games-panel">
            <button
              className="games-back"
              disabled={savingScore}
              onClick={() => setActiveGame(null)}
            >
              ← Back to Games
            </button>

            <h2>{activeGame.title}</h2>

            {!finished ? (
              <>
                <p>
                  Question {questionIndex + 1} of {activeGame.questions.length}
                </p>

                <div className="games-score">
                  Current score: <strong>{score} points</strong>
                </div>

                <h3 className="game-question">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.options.map(option => (
                  <button
                    key={option}
                    className={`game-option ${
                      selectedAnswer === option ? 'selected' : ''
                    }`}
                    disabled={savingScore}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    {option}
                  </button>
                ))}

                {scoreError && (
                  <div className="games-message">{scoreError}</div>
                )}

                <button
                  className="game-button"
                  disabled={!selectedAnswer || savingScore}
                  onClick={submitAnswer}
                >
                  {savingScore
                    ? 'Saving score...'
                    : questionIndex === activeGame.questions.length - 1
                      ? 'Finish Game'
                      : 'Next Question'}
                </button>
              </>
            ) : (
              <div className="games-score">
                <h2>Game Completed!</h2>
                <p>Your score: <strong>{score}/50 points</strong></p>
                <p>
                  Your best score: <strong>{gameData.bestScores[activeGame.id] || score}/50</strong>
                </p>
                <p>You have completed this game for the current week.</p>
                <button
                  className="game-button"
                  onClick={() => setActiveGame(null)}
                >
                  Back to Games
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Games
