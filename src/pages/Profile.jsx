
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Profile.css'

function Profile({ user }) {
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [username, setUsername] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(true)

  const [profile, setProfile] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    favouriteGroups: user?.user_metadata?.favourite_groups || '',
    favouriteArtists: user?.user_metadata?.favourite_artists || '',
    bio: user?.user_metadata?.bio || ''
  })

  const age = user?.user_metadata?.age || 'Not provided'

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return

      setUsernameLoading(true)

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('auth_user_id', user.id)
        .maybeSingle()

      if (error) {
        setMessage(error.message)
      } else if (data) {
        setUsername(data.username || '')
      }

      setUsernameLoading(false)
    }

    const loadProfilePhoto = async () => {
      const photoPath = user?.user_metadata?.profile_photo_path

      if (!photoPath) return

      const { data, error } = await supabase.storage
        .from('profile-photos')
        .createSignedUrl(photoPath, 3600)

      if (!error && data?.signedUrl) {
        setAvatarUrl(data.signedUrl)
      }
    }

    loadProfile()
    loadProfilePhoto()
  }, [user])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      setMessage('Please select a JPG, PNG, or WEBP image.')
      e.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage('Image size must be 2 MB or less.')
      e.target.value = ''
      return
    }

    setUploading(true)
    setMessage('')

    const extension = file.type === 'image/jpeg'
      ? 'jpg'
      : file.type === 'image/png'
        ? 'png'
        : 'webp'

    const filePath = `${user.id}/avatar.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: '3600'
      })

    if (uploadError) {
      setMessage(uploadError.message)
      setUploading(false)
      e.target.value = ''
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        profile_photo_path: filePath
      }
    })

    if (updateError) {
      setMessage(updateError.message)
      setUploading(false)
      e.target.value = ''
      return
    }

    const { data, error: urlError } = await supabase.storage
      .from('profile-photos')
      .createSignedUrl(filePath, 3600)

    if (urlError) {
      setMessage(urlError.message)
    } else {
      setAvatarUrl(data.signedUrl)
      setMessage('Profile photo updated successfully!')
    }

    setUploading(false)
    e.target.value = ''
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const cleanUsername = username.trim()

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanUsername)) {
      setMessage('Username must be 3–20 characters and contain only letters, numbers, or underscores.')
      return
    }

    setSaving(true)
    setMessage('')

    const { error: usernameError } = await supabase
      .from('profiles')
      .update({ username: cleanUsername })
      .eq('auth_user_id', user.id)

    if (usernameError) {
      if (usernameError.code === '23505') {
        setMessage('This username is already taken. Please choose another one.')
      } else {
        setMessage(usernameError.message)
      }

      setSaving(false)
      return
    }

    const { error: profileError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        first_name: profile.firstName,
        last_name: profile.lastName,
        favourite_groups: profile.favouriteGroups,
        favourite_artists: profile.favouriteArtists,
        bio: profile.bio
      }
    })

    setSaving(false)

    if (profileError) {
      setMessage(profileError.message)
      return
    }

    setUsername(cleanUsername)
    setEditing(false)
    setMessage('Your profile has been updated successfully!')
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>♡ KPOP WORLD</h1>
        <button onClick={handleLogout}>Log Out</button>
      </header>

      <main className="profile-container">
        <h2>My Profile</h2>
        <p>Welcome to your personal K-pop space!</p>

        <div className="profile-card">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="profile-photo"
              />
            ) : (
              '♡'
            )}
          </div>

          <label className="photo-upload-label">
            {uploading ? 'Uploading...' : 'Change Profile Photo'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
          </label>

          <h3>{profile.firstName} {profile.lastName}</h3>
          <p>K-pop Fan</p>

          <div className="profile-username">
            <span>Username</span>
            <strong>
              {usernameLoading ? 'Loading...' : username || 'Not available'}
            </strong>
          </div>

          {editing ? (
            <form className="profile-edit-form" onSubmit={handleSave}>
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose your username"
                minLength="3"
                maxLength="20"
                required
              />
              <small>
                3–20 characters. Letters, numbers and underscores only.
              </small>

              <label>First Name</label>
              <input
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />

              <label>Last Name</label>
              <input
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />

              <label>Favourite K-pop Groups</label>
              <input
                name="favouriteGroups"
                placeholder="Example: BTS, BLACKPINK"
                value={profile.favouriteGroups}
                onChange={handleChange}
              />

              <label>Favourite Artists</label>
              <input
                name="favouriteArtists"
                placeholder="Example: Jungkook, IU"
                value={profile.favouriteArtists}
                onChange={handleChange}
              />

              <label>About Me</label>
              <textarea
                name="bio"
                placeholder="Tell other fans about yourself..."
                value={profile.bio}
                onChange={handleChange}
                rows="4"
              />

              {message && <p role="status">{message}</p>}

              <button
                type="submit"
                className="edit-profile"
                disabled={saving || usernameLoading}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type="button"
                className="cancel-edit"
                onClick={() => {
                  setEditing(false)
                  setMessage('')
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <div className="profile-details">
                <div>
                  <strong>Age</strong>
                  <p>{age}</p>
                </div>

                <div>
                  <strong>Favourite Groups</strong>
                  <p>{profile.favouriteGroups || 'Not added yet'}</p>
                </div>

                <div>
                  <strong>Favourite Artists</strong>
                  <p>{profile.favouriteArtists || 'Not added yet'}</p>
                </div>

                <div>
                  <strong>About Me</strong>
                  <p>{profile.bio || 'Tell other fans about yourself'}</p>
                </div>
              </div>

              {message && <p role="status">{message}</p>}

              <button
                className="edit-profile"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Profile
