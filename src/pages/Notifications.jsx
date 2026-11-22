
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Notifications.css'

function Notifications() {
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNotifications()
  }, [])

  async function loadNotifications() {
    setLoading(true)
    setError('')

    const { data: { user }, error: userError } =
      await supabase.auth.getUser()

    if (userError || !user) {
      setError('Please log in to view your notifications.')
      setLoading(false)
      return
    }

    const { data, error: fetchError } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setNotifications(data || [])
    }

    setLoading(false)
  }

  async function markAsRead(notificationId) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)

    if (error) {
      setError(error.message)
      return
    }

    setNotifications(previous =>
      previous.map(notification =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      )
    )
  }

  async function markAllAsRead() {
    const unreadIds = notifications
      .filter(notification => !notification.is_read)
      .map(notification => notification.id)

    if (unreadIds.length === 0) return

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', unreadIds)

    if (error) {
      setError(error.message)
      return
    }

    setNotifications(previous =>
      previous.map(notification => ({
        ...notification,
        is_read: true
      }))
    )
  }

  const unreadCount = notifications.filter(
    notification => !notification.is_read
  ).length

  function formatDate(date) {
    return new Date(date).toLocaleString()
  }

  return (
    <main className="notifications-page">
      <div className="notifications-container">

        <button
          className="notifications-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <header className="notifications-header">
          <div>
            <span className="notifications-label">
              K-POP WORLD COMMUNITY
            </span>

            <h1>Notifications</h1>

            <p>
              Stay updated with your fan community and activities.
            </p>
          </div>

          <div className="notifications-count">
            <span>🔔</span>
            <strong>{unreadCount}</strong>
            <small>Unread</small>
          </div>
        </header>

        <div className="notifications-toolbar">
          <h2>Your Notifications</h2>

          <div className="notifications-actions">
            <button onClick={loadNotifications}>
              ↻ Refresh
            </button>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </button>
          </div>
        </div>

        {error && (
          <div className="notifications-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="notifications-empty">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="notifications-empty">
            <span>🔔</span>
            <h3>No notifications yet</h3>
            <p>
              New community updates and activities will appear here.
            </p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => (
              <article
                className={`notification-card ${
                  notification.is_read ? 'read' : 'unread'
                }`}
                key={notification.id}
              >
                <div className="notification-icon">
                  {notification.notification_type === 'weekly_winner'
                    ? '🏆'
                    : notification.notification_type === 'fan_group'
                    ? '👥'
                    : notification.notification_type === 'fan_discussion'
                    ? '💬'
                    : notification.notification_type === 'fan_post'
                    ? '📝'
                    : '🔔'}
                </div>

                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <small>{formatDate(notification.created_at)}</small>
                </div>

                {!notification.is_read && (
                  <button
                    className="notification-read-button"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}

                {!notification.is_read && (
                  <span className="notification-unread-dot" />
                )}
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default Notifications
