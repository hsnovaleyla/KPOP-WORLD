
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import './FanPosts.css'

const translations = {
  az: {
    title: 'Paylaşımlarını et',
    subtitle: 'Fan icmanla fikirlərini, şəkillərini və K-pop maraqlarını bölüş.',
    create: 'Yeni paylaşım',
    chooseGroup: 'Fan qrupunu seç',
    content: 'Nə paylaşmaq istəyirsən?',
    image: 'Şəkil əlavə et',
    publish: 'Paylaş',
    update: 'Yadda saxla',
    cancel: 'Ləğv et',
    all: 'Bütün paylaşımlar',
    likes: 'Bəyənmə',
    comments: 'Şərhlər',
    writeComment: 'Şərh yaz...',
    send: 'Göndər',
    edit: 'Redaktə et',
    delete: 'Sil',
    confirmDelete: 'Bu paylaşımı silmək istəyirsən?',
    empty: 'Hələ heç bir paylaşım yoxdur.',
    noGroups: 'Paylaşım etmək üçün əvvəlcə bir fan qrupuna qoşul.',
    login: 'Paylaşımları görmək üçün hesabına daxil ol.',
    loading: 'Yüklənir...',
    error: 'Xəta baş verdi.',
    success: 'Paylaşım uğurla yaradıldı!',
    updated: 'Paylaşım yeniləndi!',
    deleted: 'Paylaşım silindi!',
    imageError: 'Şəkil yüklənmədi. Yenidən yoxla.',
    groupRequired: 'Zəhmət olmasa fan qrupu seç.',
    contentRequired: 'Mətn və ya şəkil əlavə et.',
    removeImage: 'Şəkli sil',
    noComments: 'Hələ şərh yoxdur.',
    group: 'Qrup',
    deleteComment: 'Şərhi sil',
    commentError: 'Şərh boş ola bilməz.'
  },
  en: {
    title: 'Share Your Posts',
    subtitle: 'Share your thoughts, photos and K-pop interests with your fan community.',
    create: 'Create Post',
    chooseGroup: 'Choose a fan group',
    content: 'What would you like to share?',
    image: 'Add Image',
    publish: 'Publish',
    update: 'Save Changes',
    cancel: 'Cancel',
    all: 'All Posts',
    likes: 'Likes',
    comments: 'Comments',
    writeComment: 'Write a comment...',
    send: 'Send',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this post?',
    empty: 'There are no posts yet.',
    noGroups: 'Join a fan group before creating a post.',
    login: 'Please log in to view posts.',
    loading: 'Loading...',
    error: 'Something went wrong.',
    success: 'Post published successfully!',
    updated: 'Post updated!',
    deleted: 'Post deleted!',
    imageError: 'Image upload failed. Please try again.',
    groupRequired: 'Please choose a fan group.',
    contentRequired: 'Please add text or an image.',
    removeImage: 'Remove image',
    noComments: 'No comments yet.',
    group: 'Group',
    deleteComment: 'Delete comment',
    commentError: 'Comment cannot be empty.'
  },
  ko: {
    title: '게시물 공유',
    subtitle: '팬 커뮤니티와 생각과 사진을 공유하세요.',
    create: '게시물 작성',
    chooseGroup: '팬 그룹 선택',
    content: '무엇을 공유하고 싶으세요?',
    image: '사진 추가',
    publish: '게시',
    update: '저장',
    cancel: '취소',
    all: '모든 게시물',
    likes: '좋아요',
    comments: '댓글',
    writeComment: '댓글 작성...',
    send: '보내기',
    edit: '수정',
    delete: '삭제',
    confirmDelete: '게시물을 삭제하시겠습니까?',
    empty: '아직 게시물이 없습니다.',
    noGroups: '게시물을 작성하려면 팬 그룹에 가입하세요.',
    login: '로그인해 주세요.',
    loading: '불러오는 중...',
    error: '오류가 발생했습니다.',
    success: '게시물이 게시되었습니다!',
    updated: '게시물이 수정되었습니다!',
    deleted: '게시물이 삭제되었습니다!',
    imageError: '사진 업로드에 실패했습니다.',
    groupRequired: '팬 그룹을 선택하세요.',
    contentRequired: '텍스트나 사진을 추가하세요.',
    removeImage: '사진 삭제',
    noComments: '아직 댓글이 없습니다.',
    group: '그룹',
    deleteComment: '댓글 삭제',
    commentError: '댓글을 입력하세요.'
  },
  es: {
    title: 'Comparte tus publicaciones',
    subtitle: 'Comparte tus ideas y fotos con tu comunidad de fans.',
    create: 'Crear publicación',
    chooseGroup: 'Elige un grupo de fans',
    content: '¿Qué quieres compartir?',
    image: 'Añadir imagen',
    publish: 'Publicar',
    update: 'Guardar cambios',
    cancel: 'Cancelar',
    all: 'Todas las publicaciones',
    likes: 'Me gusta',
    comments: 'Comentarios',
    writeComment: 'Escribe un comentario...',
    send: 'Enviar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirmDelete: '¿Quieres eliminar esta publicación?',
    empty: 'Todavía no hay publicaciones.',
    noGroups: 'Únete a un grupo antes de publicar.',
    login: 'Inicia sesión para ver las publicaciones.',
    loading: 'Cargando...',
    error: 'Ha ocurrido un error.',
    success: '¡Publicación creada!',
    updated: '¡Publicación actualizada!',
    deleted: '¡Publicación eliminada!',
    imageError: 'No se pudo subir la imagen.',
    groupRequired: 'Elige un grupo.',
    contentRequired: 'Añade texto o una imagen.',
    removeImage: 'Eliminar imagen',
    noComments: 'Todavía no hay comentarios.',
    group: 'Grupo',
    deleteComment: 'Eliminar comentario',
    commentError: 'El comentario no puede estar vacío.'
  },
  ru: {
    title: 'Поделись публикацией',
    subtitle: 'Делись мыслями и фотографиями со своим фан-сообществом.',
    create: 'Создать публикацию',
    chooseGroup: 'Выбери фан-группу',
    content: 'Чем хочешь поделиться?',
    image: 'Добавить фото',
    publish: 'Опубликовать',
    update: 'Сохранить',
    cancel: 'Отмена',
    all: 'Все публикации',
    likes: 'Нравится',
    comments: 'Комментарии',
    writeComment: 'Написать комментарий...',
    send: 'Отправить',
    edit: 'Изменить',
    delete: 'Удалить',
    confirmDelete: 'Удалить эту публикацию?',
    empty: 'Публикаций пока нет.',
    noGroups: 'Сначала вступи в фан-группу.',
    login: 'Войди в аккаунт.',
    loading: 'Загрузка...',
    error: 'Произошла ошибка.',
    success: 'Публикация создана!',
    updated: 'Публикация обновлена!',
    deleted: 'Публикация удалена!',
    imageError: 'Не удалось загрузить изображение.',
    groupRequired: 'Выбери фан-группу.',
    contentRequired: 'Добавь текст или изображение.',
    removeImage: 'Удалить фото',
    noComments: 'Комментариев пока нет.',
    group: 'Группа',
    deleteComment: 'Удалить комментарий',
    commentError: 'Комментарий не может быть пустым.'
  }
}

function FanPosts() {
  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const [authorNames, setAuthorNames] = useState({})
  const [language, setLanguage] = useState('en')
  const [selectedGroup, setSelectedGroup] = useState('all')

  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [existingImage, setExistingImage] = useState(null)
  const [removeExistingImage, setRemoveExistingImage] = useState(false)

  const [commentInputs, setCommentInputs] = useState({})
  const [expandedComments, setExpandedComments] = useState({})

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const t = translations[language] || translations.en

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem('kpop-world-language') ||
      localStorage.getItem('kpopLanguage')

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const loadData = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data: memberships, error: membershipError } = await supabase
        .from('fan_group_members')
        .select('group_id')
        .eq('user_id', user.id)

      if (membershipError) throw membershipError

      const { data: ownedGroups, error: ownedError } = await supabase
        .from('fan_groups')
        .select('id, name, created_by')
        .eq('created_by', user.id)

      if (ownedError) throw ownedError

      const groupIds = [
        ...new Set([
          ...(memberships || []).map((item) => item.group_id),
          ...(ownedGroups || []).map((item) => item.id)
        ])
      ]

      if (groupIds.length === 0) {
        setGroups([])
        setPosts([])
        setLikes([])
        setComments([])
        setAuthorNames({})
        setLoading(false)
        return
      }

      const { data: groupData, error: groupError } = await supabase
        .from('fan_groups')
        .select('id, name, created_by')
        .in('id', groupIds)

      if (groupError) throw groupError

      setGroups(groupData || [])

      const { data: postData, error: postError } = await supabase
        .from('fan_posts')
        .select('*')
        .in('group_id', groupIds)
        .order('created_at', { ascending: false })

      if (postError) throw postError

      const postIds = (postData || []).map((post) => post.id)

      const [likeResult, commentResult] = await Promise.all([
        postIds.length
          ? supabase.from('fan_post_likes').select('*').in('post_id', postIds)
          : Promise.resolve({ data: [], error: null }),
        postIds.length
          ? supabase.from('fan_post_comments').select('*').in('post_id', postIds).order('created_at')
          : Promise.resolve({ data: [], error: null })
      ])

      if (likeResult.error) throw likeResult.error
      if (commentResult.error) throw commentResult.error

      const authorIds = [
        ...new Set([
          ...(postData || []).map((post) => post.user_id),
          ...(commentResult.data || []).map((comment) => comment.user_id)
        ].filter(Boolean))
      ]

      if (authorIds.length > 0) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('auth_user_id, username')
          .in('auth_user_id', authorIds)

        if (profileError) throw profileError

        const names = {}
        ;(profileData || []).forEach((profile) => {
          names[profile.auth_user_id] = profile.username
        })

        setAuthorNames(names)
      } else {
        setAuthorNames({})
      }

      const postsWithImages = await Promise.all(
        (postData || []).map(async (post) => {
          if (!post.image_url) return { ...post, imageDisplayUrl: null }

          const { data } = await supabase.storage
            .from('fan-post-images')
            .createSignedUrl(post.image_url, 3600)

          return {
            ...post,
            imageDisplayUrl: data?.signedUrl || null
          }
        })
      )

      setPosts(postsWithImages)
      setLikes(likeResult.data || [])
      setComments(commentResult.data || [])
    } catch (loadError) {
      setError(loadError.message || t.error)
    } finally {
      setLoading(false)
    }
  }, [user, t.error])

  useEffect(() => {
    if (user) {
      loadData()
    } else {
      setGroups([])
      setPosts([])
      setLikes([])
      setComments([])
      setAuthorNames({})
      setLoading(false)
    }
  }, [user, loadData])

  const resetForm = () => {
    setShowForm(false)
    setEditingPost(null)
    setPostText('')
    setSelectedImage(null)
    setExistingImage(null)
    setRemoveExistingImage(false)
  }

  const openCreateForm = () => {
    setEditingPost(null)
    setPostText('')
    setSelectedImage(null)
    setExistingImage(null)
    setRemoveExistingImage(false)
    setShowForm(true)
    setMessage('')
    setError('')
  }

  const openEditForm = (post) => {
    setEditingPost(post)
    setPostText(post.content || '')
    setExistingImage(post.image_url || null)
    setSelectedImage(null)
    setRemoveExistingImage(false)
    setShowForm(true)
    setMessage('')
    setError('')
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError(t.imageError)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB.')
      return
    }

    setSelectedImage(file)
    setRemoveExistingImage(false)
    setError('')
  }

  const savePost = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!user) {
      setError(t.login)
      return
    }

    const groupId = editingPost?.group_id || selectedGroup
    if (!groupId || groupId === 'all') {
      setError(t.groupRequired)
      return
    }

    if (!postText.trim() && !selectedImage && (!existingImage || removeExistingImage)) {
      setError(t.contentRequired)
      return
    }

    setSaving(true)

    try {
      const postId = editingPost?.id || crypto.randomUUID()
      let imagePath = editingPost?.image_url || null
      let uploadedPath = null

      if (selectedImage) {
        const extension = selectedImage.name.split('.').pop()?.toLowerCase() || 'jpg'
        const path = `${user.id}/${postId}/${crypto.randomUUID()}.${extension}`

        const { error: uploadError } = await supabase.storage
          .from('fan-post-images')
          .upload(path, selectedImage, {
            contentType: selectedImage.type,
            upsert: false
          })

        if (uploadError) throw uploadError

        uploadedPath = path
        imagePath = path
      }

      if (removeExistingImage && !selectedImage) {
        imagePath = null
      }

      if (editingPost) {
        const { error: updateError } = await supabase
          .from('fan_posts')
          .update({
            content: postText.trim() || null,
            image_url: imagePath,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPost.id)
          .eq('user_id', user.id)

        if (updateError) {
          if (uploadedPath) {
            await supabase.storage.from('fan-post-images').remove([uploadedPath])
          }
          throw updateError
        }

        if (removeExistingImage && editingPost.image_url) {
          await supabase.storage
            .from('fan-post-images')
            .remove([editingPost.image_url])
        }

        if (selectedImage && editingPost.image_url) {
          await supabase.storage
            .from('fan-post-images')
            .remove([editingPost.image_url])
        }

        setMessage(t.updated)
      } else {
        const { error: insertError } = await supabase
          .from('fan_posts')
          .insert({
            id: postId,
            group_id: groupId,
            user_id: user.id,
            content: postText.trim() || null,
            image_url: imagePath
          })

        if (insertError) {
          if (uploadedPath) {
            await supabase.storage.from('fan-post-images').remove([uploadedPath])
          }
          throw insertError
        }

        setMessage(t.success)
      }

      resetForm()
      await loadData()
    } catch (saveError) {
      setError(saveError.message || t.error)
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async (post) => {
    if (post.user_id !== user?.id) return
    if (!window.confirm(t.confirmDelete)) return

    setMessage('')
    setError('')

    if (post.image_url) {
      await supabase.storage
        .from('fan-post-images')
        .remove([post.image_url])
    }

    const { error: deleteError } = await supabase
      .from('fan_posts')
      .delete()
      .eq('id', post.id)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage(t.deleted)
    await loadData()
  }

  const toggleLike = async (post) => {
    const existingLike = likes.find(
      (like) => like.post_id === post.id && like.user_id === user.id
    )

    setError('')

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('fan_post_likes')
        .delete()
        .eq('id', existingLike.id)
        .eq('user_id', user.id)

      if (deleteError) {
        setError(deleteError.message)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from('fan_post_likes')
        .insert({
          post_id: post.id,
          user_id: user.id
        })

      if (insertError) {
        setError(insertError.message)
        return
      }
    }

    await loadData()
  }

  const addComment = async (postId) => {
    const content = (commentInputs[postId] || '').trim()

    if (!content) {
      setError(t.commentError)
      return
    }

    const { error: insertError } = await supabase
      .from('fan_post_comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content
      })

    if (insertError) {
      setError(insertError.message)
      return
    }

    setCommentInputs((previous) => ({ ...previous, [postId]: '' }))
    setError('')
    await loadData()
  }

  const deleteComment = async (comment) => {
    if (comment.user_id !== user?.id) return

    const { error: deleteError } = await supabase
      .from('fan_post_comments')
      .delete()
      .eq('id', comment.id)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    await loadData()
  }

  const visiblePosts = selectedGroup === 'all'
    ? posts
    : posts.filter((post) => post.group_id === selectedGroup)

  if (!user) {
    return (
      <main className="fan-posts-page">
        <header className="fan-posts-header">
          <h1>{t.title}</h1>
          <p>{t.login}</p>
        </header>
      </main>
    )
  }

  return (
    <main className="fan-posts-page">
      <header className="fan-posts-header">
        <span className="fan-posts-label">KPOP WORLD COMMUNITY</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      {groups.length > 0 && (
        <div className="fan-posts-toolbar">
          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
          >
            <option value="all">{t.all}</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <button className="fan-post-create-button" onClick={openCreateForm}>
            + {t.create}
          </button>
        </div>
      )}

      {showForm && (
        <form className="fan-post-form" onSubmit={savePost}>
          <h2>{editingPost ? t.edit : t.create}</h2>

          {!editingPost && (
            <label>
              <span>{t.chooseGroup}</span>
              <select
                value={selectedGroup === 'all' ? '' : selectedGroup}
                onChange={(event) => setSelectedGroup(event.target.value)}
                required
              >
                <option value="">-- {t.chooseGroup} --</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <textarea
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            placeholder={t.content}
            rows="5"
          />

          {existingImage && !removeExistingImage && !selectedImage && (
            <div className="fan-post-existing-image">
              <span>Current image</span>
              <button
                type="button"
                onClick={() => setRemoveExistingImage(true)}
              >
                {t.removeImage}
              </button>
            </div>
          )}

          {selectedImage && (
            <p className="fan-post-selected-file">
              {selectedImage.name}
              <button type="button" onClick={() => setSelectedImage(null)}>
                ×
              </button>
            </p>
          )}

          <label className="fan-post-image-picker">
            <span>＋ {t.image}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <div className="fan-post-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? '...' : editingPost ? t.update : t.publish}
            </button>
            <button type="button" className="fan-post-cancel" onClick={resetForm}>
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      {message && <div className="fan-post-message">{message}</div>}
      {error && <div className="fan-post-error">{error}</div>}

      {loading ? (
        <p className="fan-post-empty">{t.loading}</p>
      ) : groups.length === 0 ? (
        <p className="fan-post-empty">{t.noGroups}</p>
      ) : visiblePosts.length === 0 ? (
        <p className="fan-post-empty">{t.empty}</p>
      ) : (
        <section className="fan-post-feed">
          {visiblePosts.map((post) => {
            const group = groups.find((item) => item.id === post.group_id)
            const postLikes = likes.filter((like) => like.post_id === post.id)
            const postComments = comments.filter((comment) => comment.post_id === post.id)
            const liked = postLikes.some((like) => like.user_id === user.id)
            const ownPost = post.user_id === user.id
            const postOwner = authorNames[post.user_id] || 'K-pop Fan'

            return (
              <article className="fan-post-card" key={post.id}>
                <div className="fan-post-card-header">
                  <div className="fan-post-avatar">♡</div>
                  <div className="fan-post-author">
                    <strong>{postOwner}</strong>
                    <span>{group?.name || t.group}</span>
                    <small>{new Date(post.created_at).toLocaleString()}</small>
                  </div>

                  {ownPost && (
                    <div className="fan-post-owner-actions">
                      <button onClick={() => openEditForm(post)}>{t.edit}</button>
                      <button onClick={() => deletePost(post)}>{t.delete}</button>
                    </div>
                  )}
                </div>

                {post.content && <p className="fan-post-content">{post.content}</p>}

                {post.imageDisplayUrl && (
                  <img
                    className="fan-post-image"
                    src={post.imageDisplayUrl}
                    alt="Fan post"
                  />
                )}

                <div className="fan-post-actions">
                  <button
                    className={liked ? 'liked' : ''}
                    onClick={() => toggleLike(post)}
                  >
                    {liked ? '♥' : '♡'} {postLikes.length} {t.likes}
                  </button>

                  <button
                    onClick={() => setExpandedComments((previous) => ({
                      ...previous,
                      [post.id]: !previous[post.id]
                    }))}
                  >
                    ◌ {postComments.length} {t.comments}
                  </button>
                </div>

                {expandedComments[post.id] && (
                  <div className="fan-post-comments">
                    {postComments.length === 0 ? (
                      <p className="fan-post-no-comments">{t.noComments}</p>
                    ) : (
                      postComments.map((comment) => (
                        <div className="fan-post-comment" key={comment.id}>
                          <div>
                            <strong>
                              {authorNames[comment.user_id] || 'K-pop Fan'}
                            </strong>
                            <p>{comment.content}</p>
                            <small>{new Date(comment.created_at).toLocaleString()}</small>
                          </div>

                          {comment.user_id === user.id && (
                            <button onClick={() => deleteComment(comment)}>
                              {t.deleteComment}
                            </button>
                          )}
                        </div>
                      ))
                    )}

                    <div className="fan-post-comment-form">
                      <input
                        value={commentInputs[post.id] || ''}
                        onChange={(event) => setCommentInputs((previous) => ({
                          ...previous,
                          [post.id]: event.target.value
                        }))}
                        placeholder={t.writeComment}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            addComment(post.id)
                          }
                        }}
                      />
                      <button onClick={() => addComment(post.id)}>
                        {t.send}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </section>
      )}
    </main>
  )
}

export default FanPosts
