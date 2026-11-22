
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import './FeedbackWidget.css'

function FeedbackWidget({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const submitFeedback = async (event) => {
    event.preventDefault()

    if (!user) {
      setMessage('Please log in before submitting feedback.')
      setMessageType('error')
      return
    }

    if (rating === 0) {
      setMessage('Please select a rating.')
      setMessageType('error')
      return
    }

    if (!comment.trim()) {
      setMessage('Please write your feedback.')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const feedbackComment = comment.trim()

      const { error: insertError } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          email: user.email,
          rating,
          comment: feedbackComment
        })

      if (insertError) throw insertError

      const { error: emailError } = await supabase.functions.invoke(
        'resend-email',
        {
          body: {
            email: user.email,
            rating,
            comment: feedbackComment
          }
        }
      )

      if (emailError) {
        console.error('Email notification error:', emailError)
        setMessage('Feedback saved, but email notification could not be sent.')
        setMessageType('error')
      } else {
        setMessage('Thank you! Your feedback has been submitted successfully.')
        setMessageType('success')
      }

      setRating(0)
      setComment('')
    } catch (error) {
      console.error('Feedback submission error:', error)
      setMessage('Your feedback could not be submitted. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feedback-widget">
      <button
        type="button"
        className="feedback-floating-button"
        onClick={() => {
          setIsOpen(!isOpen)
          setMessage('')
        }}
      >
        <span>✉</span>
        Feedback
      </button>

      {isOpen && (
        <section className="feedback-panel">
          <div className="feedback-panel-header">
            <div>
              <span className="feedback-small-label">KPOP WORLD</span>
              <h2>Share Your Feedback</h2>
              <p>We would love to hear your thoughts!</p>
            </div>

            <button
              type="button"
              className="feedback-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close feedback"
            >
              ×
            </button>
          </div>

          <form onSubmit={submitFeedback}>
            <label className="feedback-rating-label">
              How would you rate your experience?
            </label>

            <div className="feedback-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= rating
                      ? 'feedback-star active'
                      : 'feedback-star'
                  }
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>

            <label htmlFor="feedback-comment">
              Your comments
            </label>

            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Tell us what you think about KPOP WORLD..."
              rows={5}
              maxLength={2000}
            />

            <p className="feedback-character-count">
              {comment.length}/2000
            </p>

            {message && (
              <p className={`feedback-message ${messageType}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="feedback-submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          <p className="feedback-privacy-note">
            Your feedback and account email will only be used to respond to your message.
          </p>
        </section>
      )}
    </div>
  )
}

export default FeedbackWidget
