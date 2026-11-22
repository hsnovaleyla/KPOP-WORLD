import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './FanDiscussions.css'

const translations = {
  en: {
    title: 'Fan Discussions',
    subtitle: 'Choose your group and chat with other K-pop fans.',
    active: 'Active Groups',
    myGroups: 'My Groups',
    openChat: 'Open Chat',
    noGroups: 'You have not joined any groups yet.',
    joinFirst: 'Join a Fan Group first to participate in discussions.',
    findGroups: 'Find Fan Groups',
    noActive: 'No active discussions right now.',
    chat: 'Group Chat',
    online: 'Group discussion',
    placeholder: 'Write a message...',
    send: 'Send',
    back: 'Back to Groups',
    empty: 'No messages yet. Start the conversation!',
    login: 'Please log in to use Fan Discussions.',
    loading: 'Loading...',
    memberOnly: 'Only members of this group can enter the chat.',
    error: 'Something went wrong.',
    you: 'You',
    fan: 'Fan',
    sending: 'Sending...',
    minute: 'Active now',
    edit: 'Edit message',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete message',
    pin: 'Pin message',
    unpin: 'Unpin message',
    pinned: 'Pinned messages',
    typing: 'is typing...',
    unread: 'unread',
    edited: 'edited',
    more: 'Message options'
  },
  az: {
    title: 'Fan Müzakirələri',
    subtitle: 'Qrupunu seç və digər K-pop fanları ilə söhbət et.',
    active: 'Aktiv qruplar',
    myGroups: 'Qruplarım',
    openChat: 'Çata daxil ol',
    noGroups: 'Hələ heç bir qrupa qoşulmamısan.',
    joinFirst: 'Müzakirələrə qoşulmaq üçün əvvəlcə Fan Qruplarına üzv ol.',
    findGroups: 'Fan Qruplarını tap',
    noActive: 'Hazırda aktiv müzakirə yoxdur.',
    chat: 'Qrup çatı',
    online: 'Qrup müzakirəsi',
    placeholder: 'Mesajını yaz...',
    send: 'Göndər',
    back: 'Qruplara qayıt',
    empty: 'Hələ mesaj yoxdur. İlk mesajı sən yaz!',
    login: 'Fan Müzakirələrindən istifadə etmək üçün hesaba daxil ol.',
    loading: 'Yüklənir...',
    memberOnly: 'Çata yalnız bu qrupun üzvləri daxil ola bilər.',
    error: 'Xəta baş verdi.',
    you: 'Sən',
    fan: 'Fan',
    sending: 'Göndərilir...',
    minute: 'Hazırda aktivdir',
    edit: 'Mesajı redaktə et',
    save: 'Yadda saxla',
    cancel: 'Ləğv et',
    delete: 'Mesajı sil',
    pin: 'Mesajı sabitlə',
    unpin: 'Sabitləməni ləğv et',
    pinned: 'Sabitlənmiş mesajlar',
    typing: 'yazır...',
    unread: 'oxunmamış',
    edited: 'redaktə edilib',
    more: 'Mesaj seçimləri'
  },
  ko: {
    title: '팬 토론',
    subtitle: '그룹을 선택하고 다른 K-pop 팬들과 대화하세요.',
    active: '활성 그룹',
    myGroups: '내 그룹',
    openChat: '채팅 참여',
    noGroups: '아직 가입한 그룹이 없습니다.',
    joinFirst: '먼저 팬 그룹에 가입하세요.',
    findGroups: '팬 그룹 찾기',
    noActive: '현재 활성 토론이 없습니다.',
    chat: '그룹 채팅',
    online: '그룹 토론',
    placeholder: '메시지를 입력하세요...',
    send: '보내기',
    back: '그룹으로 돌아가기',
    empty: '아직 메시지가 없습니다.',
    login: '로그인해 주세요.',
    loading: '불러오는 중...',
    memberOnly: '그룹 회원만 채팅에 참여할 수 있습니다.',
    error: '오류가 발생했습니다.',
    you: '나',
    fan: '팬',
    sending: '전송 중...',
    minute: '현재 활동 중',
    edit: '수정',
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    pin: '고정',
    unpin: '고정 해제',
    pinned: '고정된 메시지',
    typing: '입력 중...',
    unread: '읽지 않음',
    edited: '수정됨',
    more: '메시지 옵션'
  },
  es: {
    title: 'Debates de Fans',
    subtitle: 'Elige tu grupo y habla con otros fans de K-pop.',
    active: 'Grupos activos',
    myGroups: 'Mis grupos',
    openChat: 'Abrir chat',
    noGroups: 'Todavía no te has unido a ningún grupo.',
    joinFirst: 'Únete primero a un grupo de fans.',
    findGroups: 'Buscar grupos',
    noActive: 'No hay debates activos ahora.',
    chat: 'Chat del grupo',
    online: 'Debate del grupo',
    placeholder: 'Escribe un mensaje...',
    send: 'Enviar',
    back: 'Volver a grupos',
    empty: 'Todavía no hay mensajes.',
    login: 'Inicia sesión para continuar.',
    loading: 'Cargando...',
    memberOnly: 'Solo los miembros pueden entrar al chat.',
    error: 'Ha ocurrido un error.',
    you: 'Tú',
    fan: 'Fan',
    sending: 'Enviando...',
    minute: 'Activo ahora',
    edit: 'Editar mensaje',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar mensaje',
    pin: 'Fijar mensaje',
    unpin: 'Desfijar mensaje',
    pinned: 'Mensajes fijados',
    typing: 'está escribiendo...',
    unread: 'sin leer',
    edited: 'editado',
    more: 'Opciones del mensaje'
  },
  ru: {
    title: 'Обсуждения фанатов',
    subtitle: 'Выберите группу и общайтесь с другими фанатами K-pop.',
    active: 'Активные группы',
    myGroups: 'Мои группы',
    openChat: 'Открыть чат',
    noGroups: 'Вы ещё не вступили ни в одну группу.',
    joinFirst: 'Сначала вступите в фан-группу.',
    findGroups: 'Найти группы',
    noActive: 'Сейчас нет активных обсуждений.',
    chat: 'Групповой чат',
    online: 'Обсуждение группы',
    placeholder: 'Напишите сообщение...',
    send: 'Отправить',
    back: 'Назад к группам',
    empty: 'Сообщений пока нет.',
    login: 'Войдите в аккаунт.',
    loading: 'Загрузка...',
    memberOnly: 'Только участники группы могут войти в чат.',
    error: 'Произошла ошибка.',
    you: 'Вы',
    fan: 'Фанат',
    sending: 'Отправка...',
    minute: 'Активна сейчас',
    edit: 'Изменить сообщение',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить сообщение',
    pin: 'Закрепить сообщение',
    unpin: 'Открепить сообщение',
    pinned: 'Закреплённые сообщения',
    typing: 'печатает...',
    unread: 'непрочитанных',
    edited: 'изменено',
    more: 'Параметры сообщения'
  }
}

function FanDiscussions() {
  const navigate = useNavigate()
  const typingChannelRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])
  const [activeGroups, setActiveGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [typingUsers, setTypingUsers] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({})
  const [openMenuId, setOpenMenuId] = useState(null)

  const t = translations[language] || translations.en

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem('kpop-world-language') ||
      localStorage.getItem('kpopLanguage')

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.message-menu-container')) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const loadGroups = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError('')

    const { data: membershipData, error: membershipError } =
      await supabase
        .from('fan_group_members')
        .select('group_id')
        .eq('user_id', user.id)

    if (membershipError) {
      setError(membershipError.message)
      setLoading(false)
      return
    }

    const memberIds = (membershipData || []).map(
      (item) => item.group_id
    )

    const { data: groupData, error: groupError } = await supabase
      .from('fan_groups')
      .select('*')
      .order('created_at', { ascending: false })

    if (groupError) {
      setError(groupError.message)
      setLoading(false)
      return
    }

    const availableGroups = (groupData || []).filter(
      (group) =>
        memberIds.includes(group.id) ||
        group.created_by === user.id
    )

    setGroups(availableGroups)
    setLoading(false)
  }, [user])

  const loadActiveGroups = useCallback(async () => {
    if (!user || groups.length === 0) {
      setActiveGroups([])
      return
    }

    const groupIds = groups.map((group) => group.id)
    const fiveMinutesAgo = new Date(
      Date.now() - 5 * 60 * 1000
    ).toISOString()

    const { data, error: activeError } = await supabase
      .from('fan_group_messages')
      .select('group_id, created_at')
      .in('group_id', groupIds)
      .gte('created_at', fiveMinutesAgo)
      .order('created_at', { ascending: false })
      .limit(100)

    if (activeError) {
      setError(activeError.message)
      return
    }

    const latestByGroup = {}

    ;(data || []).forEach((item) => {
      if (!latestByGroup[item.group_id]) {
        latestByGroup[item.group_id] = item.created_at
      }
    })

    const active = groups
      .filter((group) => latestByGroup[group.id])
      .map((group) => ({
        ...group,
        lastMessageAt: latestByGroup[group.id]
      }))
      .sort(
        (a, b) =>
          new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
      )

    setActiveGroups(active)
  }, [user, groups])

  const loadUnreadCounts = useCallback(async () => {
    if (!user || groups.length === 0) {
      setUnreadCounts({})
      return
    }

    const counts = {}

    for (const group of groups) {
      const { data: readData, error: readError } = await supabase
        .from('fan_group_reads')
        .select('last_read_at')
        .eq('group_id', group.id)
        .eq('user_id', user.id)
        .maybeSingle()

      if (readError) {
        setError(readError.message)
        continue
      }

      let query = supabase
        .from('fan_group_messages')
        .select('id', { count: 'exact', head: true })
        .eq('group_id', group.id)
        .neq('user_id', user.id)

      if (readData?.last_read_at) {
        query = query.gt('created_at', readData.last_read_at)
      }

      const { count, error: countError } = await query

      if (countError) {
        setError(countError.message)
        continue
      }

      counts[group.id] = count || 0
    }

    setUnreadCounts(counts)
  }, [user, groups])

  const markGroupAsRead = useCallback(async (groupId) => {
    if (!user || !groupId) return

    const { error: readError } = await supabase
      .from('fan_group_reads')
      .upsert(
        {
          group_id: groupId,
          user_id: user.id,
          last_read_at: new Date().toISOString()
        },
        { onConflict: 'group_id,user_id' }
      )

    if (readError) {
      setError(readError.message)
    } else {
      setUnreadCounts((previous) => ({
        ...previous,
        [groupId]: 0
      }))
    }
  }, [user])

  const loadMessages = useCallback(async (group) => {
    if (!user || !group) return

    setMessagesLoading(true)
    setError('')

    const { data: membership, error: membershipError } =
      await supabase
        .from('fan_group_members')
        .select('group_id')
        .eq('group_id', group.id)
        .eq('user_id', user.id)
        .maybeSingle()

    if (membershipError) {
      setError(membershipError.message)
      setMessagesLoading(false)
      return
    }

    const isOwner = group.created_by === user.id

    if (!membership && !isOwner) {
      setSelectedGroup(null)
      setMessages([])
      setError(t.memberOnly)
      setMessagesLoading(false)
      return
    }

    const { data, error: fetchError } = await supabase
      .from('fan_group_messages')
      .select('*')
      .eq('group_id', group.id)
      .order('created_at', { ascending: true })
      .limit(200)

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setMessages(data || [])
      await markGroupAsRead(group.id)
    }

    setMessagesLoading(false)
  }, [user, t.memberOnly, markGroupAsRead])

  useEffect(() => {
    if (user) {
      loadGroups()
    } else {
      setGroups([])
      setActiveGroups([])
      setSelectedGroup(null)
      setMessages([])
      setUnreadCounts({})
      setLoading(false)
    }
  }, [user, loadGroups])

  useEffect(() => {
    loadActiveGroups()
    loadUnreadCounts()
  }, [loadActiveGroups, loadUnreadCounts])

  // Real-time listener for messages in ALL groups the user belongs to.
  useEffect(() => {
    if (!user || groups.length === 0) return

    const groupIds = new Set(groups.map((group) => group.id))

    const channel = supabase
      .channel(`fan-discussions-unread-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fan_group_messages'
        },
        async (payload) => {
          const changedGroupId =
            payload.new?.group_id || payload.old?.group_id

          if (changedGroupId && groupIds.has(changedGroupId)) {
            await loadActiveGroups()
            await loadUnreadCounts()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, groups, loadActiveGroups, loadUnreadCounts])

  // Real-time listener for the currently selected group's chat and typing status.
  useEffect(() => {
    if (!user || !selectedGroup) return

    const channel = supabase
      .channel(`fan-discussions-${selectedGroup.id}`, {
        config: {
          presence: {
            key: user.id
          }
        }
      })
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fan_group_messages',
          filter: `group_id=eq.${selectedGroup.id}`
        },
        async () => {
          await loadMessages(selectedGroup)
          await loadActiveGroups()
          await loadUnreadCounts()
        }
      )
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const activeTypingUsers = []

        Object.values(state).forEach((entries) => {
          entries.forEach((entry) => {
            if (
              entry.user_id &&
              entry.user_id !== user.id &&
              entry.typing
            ) {
              activeTypingUsers.push(entry.user_id)
            }
          })
        })

        setTypingUsers([...new Set(activeTypingUsers)])
      })
      .subscribe()

    typingChannelRef.current = channel

    return () => {
      typingChannelRef.current = null

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      supabase.removeChannel(channel)
      setTypingUsers([])
    }
  }, [
    user,
    selectedGroup,
    loadMessages,
    loadActiveGroups,
    loadUnreadCounts
  ])

  const openGroup = async (group) => {
    setError('')
    setMessages([])
    setOpenMenuId(null)
    setSelectedGroup(group)
    await loadMessages(group)
  }

  const handleTyping = async (value) => {
    setNewMessage(value)

    const channel = typingChannelRef.current

    if (!channel || !user) return

    await channel.track({
      user_id: user.id,
      typing: Boolean(value.trim())
    })

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(async () => {
      if (typingChannelRef.current) {
        await typingChannelRef.current.track({
          user_id: user.id,
          typing: false
        })
      }
    }, 2000)
  }

  const sendMessage = async (event) => {
    event.preventDefault()

    if (!user || !selectedGroup || !newMessage.trim()) return

    setSending(true)
    setError('')

    const { data: membership, error: membershipError } =
      await supabase
        .from('fan_group_members')
        .select('group_id')
        .eq('group_id', selectedGroup.id)
        .eq('user_id', user.id)
        .maybeSingle()

    if (membershipError) {
      setError(membershipError.message)
      setSending(false)
      return
    }

    const isOwner = selectedGroup.created_by === user.id

    if (!membership && !isOwner) {
      setError(t.memberOnly)
      setSelectedGroup(null)
      setMessages([])
      setSending(false)
      return
    }

    const { error: insertError } = await supabase
      .from('fan_group_messages')
      .insert({
        group_id: selectedGroup.id,
        user_id: user.id,
        content: newMessage.trim()
      })

    if (insertError) {
      setError(insertError.message)
    } else {
      setNewMessage('')

      if (typingChannelRef.current) {
        await typingChannelRef.current.track({
          user_id: user.id,
          typing: false
        })
      }

      await loadMessages(selectedGroup)
      await loadActiveGroups()
      await loadUnreadCounts()
    }

    setSending(false)
  }

  const deleteMessage = async (message) => {
    if (message.user_id !== user?.id) return

    setOpenMenuId(null)

    const { error: deleteError } = await supabase
      .from('fan_group_messages')
      .delete()
      .eq('id', message.id)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
    } else {
      await loadMessages(selectedGroup)
      await loadActiveGroups()
      await loadUnreadCounts()
    }
  }

  const startEditing = (message) => {
    setOpenMenuId(null)
    setEditingMessageId(message.id)
    setEditingText(message.content)
  }

  const saveEditedMessage = async (message) => {
    if (!editingText.trim()) return

    const { error: updateError } = await supabase
      .from('fan_group_messages')
      .update({ content: editingText.trim() })
      .eq('id', message.id)
      .eq('user_id', user.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setEditingMessageId(null)
      setEditingText('')
      await loadMessages(selectedGroup)
    }
  }

  const togglePin = async (message) => {
    setOpenMenuId(null)

    const { error: pinError } = await supabase.rpc(
      'set_group_message_pin',
      {
        p_message_id: message.id,
        p_is_pinned: !message.is_pinned
      }
    )

    if (pinError) {
      setError(pinError.message)
    } else {
      await loadMessages(selectedGroup)
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const pinnedMessages = messages.filter(
    (message) => message.is_pinned
  )

  if (!user) {
    return (
      <main className="fan-discussions-page">
        <header className="fan-discussions-header">
          <h1>{t.title}</h1>
          <p>{t.login}</p>
        </header>
      </main>
    )
  }

  return (
    <main className="fan-discussions-page">
      <header className="fan-discussions-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      {error && (
        <div className="discussion-error">
          {error}
        </div>
      )}

      {selectedGroup ? (
        <section className="group-chat">
          <div className="group-chat-header">
            <div>
              <h2>{selectedGroup.name}</h2>
              <p>{t.online}</p>
            </div>

            <button
              className="chat-back-button"
              onClick={() => {
                setSelectedGroup(null)
                setMessages([])
                setError('')
                setTypingUsers([])
                setEditingMessageId(null)
                setOpenMenuId(null)
              }}
            >
              {t.back}
            </button>
          </div>

          {pinnedMessages.length > 0 && (
            <section className="pinned-messages-section">
              <h3>📌 {t.pinned}</h3>

              {pinnedMessages.map((message) => (
                <div className="pinned-message-item" key={message.id}>
                  <span>
                    {message.user_id === user.id
                      ? t.you
                      : `${t.fan} ${message.user_id.slice(0, 6)}`}
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}
            </section>
          )}

          <div className="chat-messages">
            {messagesLoading ? (
              <p className="discussion-empty">{t.loading}</p>
            ) : messages.length === 0 ? (
              <p className="discussion-empty">{t.empty}</p>
            ) : (
              messages.map((message) => {
                const isMine = message.user_id === user.id
                const isEditing = editingMessageId === message.id
                const menuIsOpen = openMenuId === message.id

                return (
                  <div
                    className={`chat-message-row ${
                      isMine ? 'my-message-row' : ''
                    }`}
                    key={message.id}
                  >
                    <div
                      className={`chat-message ${
                        isMine ? 'my-message' : 'other-message'
                      }`}
                    >
                      <div className="chat-message-top">
                        <div className="chat-message-meta">
                          <span>
                            {isMine
                              ? t.you
                              : `${t.fan} ${message.user_id.slice(0, 6)}`}
                          </span>

                          <span>
                            {formatTime(message.created_at)}
                            {message.updated_at &&
                              message.updated_at !== message.created_at &&
                              ` · ${t.edited}`}
                          </span>
                        </div>

                        {!isEditing && (
                          <div className="message-menu-container">
                            <button
                              type="button"
                              className="message-menu-trigger"
                              aria-label={t.more}
                              aria-expanded={menuIsOpen}
                              title={t.more}
                              onClick={(event) => {
                                event.stopPropagation()
                                setOpenMenuId(
                                  menuIsOpen ? null : message.id
                                )
                              }}
                            >
                              ⋮
                            </button>

                            {menuIsOpen && (
                              <div
                                className="message-options-menu"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {isMine && (
                                  <button
                                    type="button"
                                    onClick={() => startEditing(message)}
                                  >
                                    <span>✏️</span>
                                    {t.edit}
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => togglePin(message)}
                                >
                                  <span>📌</span>
                                  {message.is_pinned ? t.unpin : t.pin}
                                </button>

                                {isMine && (
                                  <button
                                    type="button"
                                    className="delete-menu-option"
                                    onClick={() => deleteMessage(message)}
                                  >
                                    <span>🗑️</span>
                                    {t.delete}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="edit-message-area">
                          <textarea
                            value={editingText}
                            onChange={(event) =>
                              setEditingText(event.target.value)
                            }
                            maxLength="2000"
                            rows="3"
                          />

                          <div className="message-action-buttons">
                            <button
                              onClick={() => saveEditedMessage(message)}
                              disabled={!editingText.trim()}
                            >
                              {t.save}
                            </button>

                            <button
                              onClick={() => {
                                setEditingMessageId(null)
                                setEditingText('')
                              }}
                            >
                              {t.cancel}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}

                      {message.is_pinned && (
                        <span className="message-pinned-label">
                          📌 {t.pinned}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {t.fan} {typingUsers.length === 1 ? '' : `(${typingUsers.length})`}
              {' '}{t.typing}
            </div>
          )}

          <form className="chat-input-area" onSubmit={sendMessage}>
            <textarea
              value={newMessage}
              onChange={(event) => handleTyping(event.target.value)}
              placeholder={t.placeholder}
              rows="2"
              maxLength="2000"
              required
            />

            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
            >
              {sending ? t.sending : t.send}
            </button>
          </form>
        </section>
      ) : (
        <>
          <section className="active-groups-section">
            <div className="discussion-section-heading">
              <h2>
                <span className="active-indicator"></span>
                {t.active}
              </h2>
            </div>

            {activeGroups.length === 0 ? (
              <p className="discussion-empty">{t.noActive}</p>
            ) : (
              <div className="discussion-groups-grid">
                {activeGroups.map((group) => (
                  <article
                    className="discussion-group-card active-group-card"
                    key={group.id}
                  >
                    <div className="discussion-group-icon">💬</div>
                    <span className="active-group-label">
                      {t.minute}
                    </span>
                    <h3>{group.name}</h3>
                    <p>{group.description || ''}</p>

                    {unreadCounts[group.id] > 0 && (
                      <span className="unread-count">
                        {unreadCounts[group.id]} {t.unread}
                      </span>
                    )}

                    <button onClick={() => openGroup(group)}>
                      {t.openChat}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="my-discussion-groups">
            <div className="discussion-section-heading">
              <h2>{t.myGroups}</h2>
            </div>

            {loading ? (
              <p className="discussion-empty">{t.loading}</p>
            ) : groups.length === 0 ? (
              <div className="no-discussion-groups">
                <p>{t.noGroups}</p>
                <p>{t.joinFirst}</p>
                <button onClick={() => navigate('/fan-groups')}>
                  {t.findGroups}
                </button>
              </div>
            ) : (
              <div className="discussion-groups-grid">
                {groups.map((group) => (
                  <article
                    className="discussion-group-card"
                    key={group.id}
                  >
                    <div className="discussion-group-icon">💚</div>
                    <h3>{group.name}</h3>
                    <p>{group.description || ''}</p>

                    {unreadCounts[group.id] > 0 && (
                      <span className="unread-count">
                        {unreadCounts[group.id]} {t.unread}
                      </span>
                    )}

                    <button onClick={() => openGroup(group)}>
                      {t.openChat}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default FanDiscussions