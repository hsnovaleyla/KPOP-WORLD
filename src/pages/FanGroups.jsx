
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import './FanGroups.css'

const translations = {
  en: {
    title: 'Fan Groups',
    subtitle: 'Find your community and connect with K-pop fans.',
    search: 'Search groups...',
    create: 'Create Group',
    createTitle: 'Create a New Group',
    editTitle: 'Edit Group',
    groupName: 'Group name',
    description: 'Description',
    private: 'Make this group private',
    save: 'Create',
    update: 'Save Changes',
    cancel: 'Cancel',
    all: 'All Groups',
    mine: 'My Groups',
    join: 'Join Group',
    joined: 'Joined',
    leave: 'Leave Group',
    public: 'Public',
    privateLabel: 'Private',
    delete: 'Delete Group',
    edit: 'Edit Group',
    members: 'members',
    confirmDelete: 'Are you sure you want to delete this group?',
    confirmLeave: 'Are you sure you want to leave this group?',
    deleted: 'Group deleted successfully!',
    updated: 'Group updated successfully!',
    left: 'You left the group.',
    created: 'Group created successfully!',
    empty: 'No groups found.',
    login: 'Please log in to use Fan Groups.',
    error: 'Something went wrong.',
    owner: 'Group Owner'
  },
  az: {
    title: 'Fan Qrupları',
    subtitle: 'Öz icmanı tap və K-pop fanları ilə əlaqə qur.',
    search: 'Qruplarda axtar...',
    create: 'Qrup yarat',
    createTitle: 'Yeni qrup yarat',
    editTitle: 'Qrupu redaktə et',
    groupName: 'Qrupun adı',
    description: 'Təsvir',
    private: 'Bu qrupu gizli et',
    save: 'Yarat',
    update: 'Dəyişiklikləri yadda saxla',
    cancel: 'Ləğv et',
    all: 'Bütün qruplar',
    mine: 'Qruplarım',
    join: 'Qrupa qoşul',
    joined: 'Qoşulmusan',
    leave: 'Qrupdan çıx',
    public: 'Açıq',
    privateLabel: 'Gizli',
    delete: 'Qrupu sil',
    edit: 'Redaktə et',
    members: 'üzv',
    confirmDelete: 'Bu qrupu silmək istədiyinə əminsən?',
    confirmLeave: 'Bu qrupdan çıxmaq istədiyinə əminsən?',
    deleted: 'Qrup uğurla silindi!',
    updated: 'Qrup yeniləndi!',
    left: 'Qrupdan çıxdın.',
    created: 'Qrup uğurla yaradıldı!',
    empty: 'Heç bir qrup tapılmadı.',
    login: 'Fan Qruplarından istifadə etmək üçün daxil ol.',
    error: 'Xəta baş verdi.',
    owner: 'Qrupun yaradıcısı'
  },
  ko: {
    title: '팬 그룹',
    subtitle: '케이팝 팬들과 소통하고 커뮤니티를 찾아보세요.',
    search: '그룹 검색...',
    create: '그룹 만들기',
    createTitle: '새 그룹 만들기',
    editTitle: '그룹 수정',
    groupName: '그룹 이름',
    description: '설명',
    private: '비공개 그룹으로 만들기',
    save: '만들기',
    update: '변경 사항 저장',
    cancel: '취소',
    all: '모든 그룹',
    mine: '내 그룹',
    join: '가입하기',
    joined: '가입 완료',
    leave: '그룹 나가기',
    public: '공개',
    privateLabel: '비공개',
    delete: '그룹 삭제',
    edit: '그룹 수정',
    members: '명',
    confirmDelete: '이 그룹을 삭제하시겠습니까?',
    confirmLeave: '그룹에서 나가시겠습니까?',
    deleted: '그룹이 삭제되었습니다!',
    updated: '그룹이 수정되었습니다!',
    left: '그룹에서 나갔습니다.',
    created: '그룹이 생성되었습니다!',
    empty: '그룹이 없습니다.',
    login: '로그인해 주세요.',
    error: '오류가 발생했습니다.',
    owner: '그룹 관리자'
  },
  es: {
    title: 'Grupos de Fans',
    subtitle: 'Encuentra tu comunidad y conecta con fans del K-pop.',
    search: 'Buscar grupos...',
    create: 'Crear grupo',
    createTitle: 'Crear un nuevo grupo',
    editTitle: 'Editar grupo',
    groupName: 'Nombre del grupo',
    description: 'Descripción',
    private: 'Hacer este grupo privado',
    save: 'Crear',
    update: 'Guardar cambios',
    cancel: 'Cancelar',
    all: 'Todos los grupos',
    mine: 'Mis grupos',
    join: 'Unirse',
    joined: 'Unido',
    leave: 'Salir del grupo',
    public: 'Público',
    privateLabel: 'Privado',
    delete: 'Eliminar grupo',
    edit: 'Editar grupo',
    members: 'miembros',
    confirmDelete: '¿Seguro que quieres eliminar este grupo?',
    confirmLeave: '¿Seguro que quieres salir de este grupo?',
    deleted: '¡Grupo eliminado!',
    updated: '¡Grupo actualizado!',
    left: 'Has salido del grupo.',
    created: '¡Grupo creado!',
    empty: 'No se encontraron grupos.',
    login: 'Inicia sesión para continuar.',
    error: 'Ha ocurrido un error.',
    owner: 'Propietario del grupo'
  },
  ru: {
    title: 'Фан-группы',
    subtitle: 'Найди своё сообщество и общайся с фанатами K-pop.',
    search: 'Поиск групп...',
    create: 'Создать группу',
    createTitle: 'Создать новую группу',
    editTitle: 'Редактировать группу',
    groupName: 'Название группы',
    description: 'Описание',
    private: 'Сделать группу закрытой',
    save: 'Создать',
    update: 'Сохранить изменения',
    cancel: 'Отмена',
    all: 'Все группы',
    mine: 'Мои группы',
    join: 'Вступить',
    joined: 'Вы участник',
    leave: 'Покинуть группу',
    public: 'Открытая',
    privateLabel: 'Закрытая',
    delete: 'Удалить группу',
    edit: 'Редактировать',
    members: 'участников',
    confirmDelete: 'Вы уверены, что хотите удалить эту группу?',
    confirmLeave: 'Вы уверены, что хотите покинуть эту группу?',
    deleted: 'Группа успешно удалена!',
    updated: 'Группа обновлена!',
    left: 'Вы покинули группу.',
    created: 'Группа создана!',
    empty: 'Группы не найдены.',
    login: 'Пожалуйста, войдите в аккаунт.',
    error: 'Произошла ошибка.',
    owner: 'Создатель группы'
  }
}

function FanGroups() {
  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])
  const [myGroups, setMyGroups] = useState([])
  const [memberCounts, setMemberCounts] = useState({})
  const [language, setLanguage] = useState('en')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const [showForm, setShowForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

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

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!error) {
        setUser(data?.user || null)
      } else {
        setLoading(false)
      }
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const loadGroups = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError('')

    const { data: groupData, error: groupError } = await supabase
      .from('fan_groups')
      .select('*')
      .order('created_at', { ascending: false })

    if (groupError) {
      setError(groupError.message)
      setLoading(false)
      return
    }

    const { data: membershipData, error: membershipError } = await supabase
      .from('fan_group_members')
      .select('group_id')
      .eq('user_id', user.id)

    if (membershipError) {
      setError(membershipError.message)
      setLoading(false)
      return
    }

    const { data: countData, error: countError } = await supabase.rpc(
      'get_group_member_counts'
    )

    if (countError) {
      setError(countError.message)
      setLoading(false)
      return
    }

    const counts = {}
    ;(countData || []).forEach((item) => {
      counts[item.group_id] = Number(item.member_count)
    })

    setGroups(groupData || [])
    setMyGroups(
      (membershipData || []).map((membership) => membership.group_id)
    )
    setMemberCounts(counts)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (user) {
      loadGroups()
    } else {
      setGroups([])
      setMyGroups([])
      setMemberCounts({})
      setLoading(false)
    }
  }, [user, loadGroups])

  const resetForm = () => {
    setShowForm(false)
    setEditingGroup(null)
    setGroupName('')
    setDescription('')
    setIsPrivate(false)
  }

  const openCreateForm = () => {
    setEditingGroup(null)
    setGroupName('')
    setDescription('')
    setIsPrivate(false)
    setShowForm(true)
    setMessage('')
    setError('')
  }

  const openEditForm = (group) => {
    setEditingGroup(group)
    setGroupName(group.name || '')
    setDescription(group.description || '')
    setIsPrivate(Boolean(group.is_private))
    setShowForm(true)
    setMessage('')
    setError('')
  }

  const createGroup = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!user || !groupName.trim()) {
      setError(!user ? t.login : t.groupName)
      return
    }

    setSaving(true)

    const { error: insertError } = await supabase
      .from('fan_groups')
      .insert({
        name: groupName.trim(),
        description: description.trim(),
        is_private: isPrivate,
        created_by: user.id
      })

    if (insertError) {
      setError(insertError.message)
    } else {
      setMessage(t.created)
      resetForm()
      setActiveTab('mine')
      await loadGroups()
    }

    setSaving(false)
  }

  const updateGroup = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!user || !editingGroup || !groupName.trim()) {
      setError(t.error)
      return
    }

    setSaving(true)

    const { error: updateError } = await supabase
      .from('fan_groups')
      .update({
        name: groupName.trim(),
        description: description.trim(),
        is_private: isPrivate
      })
      .eq('id', editingGroup.id)
      .eq('created_by', user.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setMessage(t.updated)
      resetForm()
      await loadGroups()
    }

    setSaving(false)
  }

  const joinGroup = async (groupId) => {
    setMessage('')
    setError('')

    if (!user) {
      setError(t.login)
      return
    }

    if (myGroups.includes(groupId)) return

    const { error: joinError } = await supabase
      .from('fan_group_members')
      .insert({
        group_id: groupId,
        user_id: user.id,
        role: 'member'
      })

    if (joinError) {
      setError(joinError.message)
      return
    }

    setMessage('You joined the group!')
    await loadGroups()
  }

  const leaveGroup = async (group) => {
    const isOwner = group.created_by === user?.id

    if (isOwner) return
    if (!myGroups.includes(group.id)) return
    if (!window.confirm(t.confirmLeave)) return

    setMessage('')
    setError('')

    const { error: leaveError } = await supabase
      .from('fan_group_members')
      .delete()
      .eq('group_id', group.id)
      .eq('user_id', user.id)
      .eq('role', 'member')

    if (leaveError) {
      setError(leaveError.message)
      return
    }

    setMessage(t.left)
    await loadGroups()
  }

  const deleteGroup = async (group) => {
    const isOwner = group.created_by === user?.id

    if (!isOwner) return
    if (!window.confirm(t.confirmDelete)) return

    setMessage('')
    setError('')

    const { error: deleteError } = await supabase
      .from('fan_groups')
      .delete()
      .eq('id', group.id)
      .eq('created_by', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage(t.deleted)
    await loadGroups()
  }

  const filteredGroups = groups.filter((group) => {
    const name = (group.name || '').toLowerCase()
    const details = (group.description || '').toLowerCase()
    const searchText = search.toLowerCase()

    const matchesSearch =
      name.includes(searchText) || details.includes(searchText)

    const isMine =
      myGroups.includes(group.id) || group.created_by === user?.id

    return matchesSearch && (activeTab === 'all' || isMine)
  })

  if (!user) {
    return (
      <div className="fan-groups-page">
        <div className="fan-groups-header">
          <h1>{t.title}</h1>
          <p>{t.login}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="fan-groups-page">
      <header className="fan-groups-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <div className="fan-groups-toolbar">
        <input
          type="search"
          placeholder={t.search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button onClick={openCreateForm}>
          {t.create}
        </button>
      </div>

      {showForm && (
        <form
          className="fan-group-form"
          onSubmit={editingGroup ? updateGroup : createGroup}
        >
          <h2>{editingGroup ? t.editTitle : t.createTitle}</h2>

          <input
            type="text"
            placeholder={t.groupName}
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            required
          />

          <textarea
            placeholder={t.description}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
          />

          <label className="fan-group-private">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(event) => setIsPrivate(event.target.checked)}
            />
            {t.private}
          </label>

          <div className="fan-group-form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? '...'
                : editingGroup
                  ? t.update
                  : t.save}
            </button>

            <button
              type="button"
              className="fan-group-cancel"
              onClick={resetForm}
            >
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      {message && <div className="fan-group-message">{message}</div>}
      {error && <div className="fan-group-error">{error}</div>}

      <div className="fan-groups-tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          {t.all}
        </button>

        <button
          className={activeTab === 'mine' ? 'active' : ''}
          onClick={() => setActiveTab('mine')}
        >
          {t.mine}
        </button>
      </div>

      {loading ? (
        <p className="fan-groups-empty">Loading...</p>
      ) : filteredGroups.length === 0 ? (
        <p className="fan-groups-empty">{t.empty}</p>
      ) : (
        <div className="fan-groups-grid">
          {filteredGroups.map((group) => {
            const isOwner = group.created_by === user.id
            const joined = myGroups.includes(group.id) || isOwner

            return (
              <article className="fan-group-card" key={group.id}>
                <div className="fan-group-card-top">
                  <div className="fan-group-icon">💚</div>

                  <span className="fan-group-visibility">
                    {group.is_private ? t.privateLabel : t.public}
                  </span>
                </div>

                <h2>{group.name}</h2>

                <p className="fan-group-description">
                  {group.description || ''}
                </p>

                <p className="fan-group-member-count">
                  {memberCounts[group.id] ?? 0} {t.members}
                </p>

                {isOwner && (
                  <p className="fan-group-owner">
                    {t.owner}
                  </p>
                )}

                <div className="fan-group-card-actions">
                  {isOwner ? (
                    <>
                      <button
                        className="fan-group-edit"
                        onClick={() => openEditForm(group)}
                      >
                        {t.edit}
                      </button>

                      <button
                        className="fan-group-delete"
                        onClick={() => deleteGroup(group)}
                      >
                        {t.delete}
                      </button>
                    </>
                  ) : joined ? (
                    <>
                      <button disabled>
                        {t.joined}
                      </button>

                      <button
                        className="fan-group-leave"
                        onClick={() => leaveGroup(group)}
                      >
                        {t.leave}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => joinGroup(group.id)}
                      disabled={group.is_private}
                    >
                      {group.is_private ? t.privateLabel : t.join}
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default FanGroups
