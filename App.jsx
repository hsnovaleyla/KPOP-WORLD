
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Profile from './pages/Profile'
import FanGroups from './pages/FanGroups'
import FanDiscussions from './pages/FanDiscussions'
import FanPosts from './pages/FanPosts'
import Games from './pages/Games'
import PointsBonuses from './pages/PointsBonuses'
import WeeklyWinner from './pages/WeeklyWinner'
import Notifications from './pages/Notifications'
import ConcertTickets from './pages/ConcertTickets'
import SpotifyMusic from './SpotifyMusic.jsx'
import FeedbackWidget from './pages/FeedbackWidget'
import './App.css'

const translations = {
  az: {
    home: 'Ana səhifə',
    groups: 'K-pop qrupları',
    fanGroups: 'Fan qrupları',
    music: 'Musiqi',
    services: 'Əlavə xidmətlər',
    apps: 'Rəsmi tətbiqlər',
    profile: 'Profilim',
    welcomeLabel: 'SƏNİN K-POP KAINATIN',
    heroTitle1: 'Sevimli artistlərin.',
    heroTitle2: 'Sevimli dünyan.',
    heroText: 'K-pop qruplarını kəşf et, musiqidən zövq al, fanlarla ünsiyyət qur və öz K-pop dünyanı yarat.',
    welcome: 'KPOP WORLD-ə xoş gəlmisən!',
    howEnter: 'Sayta necə daxil olmaq istəyirsən?',
    oldFan: 'Mən artıq fanam',
    newFan: 'Mən ilk dəfə daxil oluram',
    findFavourites: 'SEVİMLİLƏRİNİ TAP',
    groupQuestion: 'Hansı K-pop qrupunu sevirsən?',
    groupDescription: 'Sevimli K-pop qrupunu axtar.',
    searchPlaceholder: 'K-pop qrupu və ya artist axtar...',
    searchNote: 'Axtarış nəticələri Wikipedia-dan əldə edilir. Məqaləni oxumaq üçün nəticəyə kliklə.',
    searching: 'Axtarılır...',
    noResults: 'Uyğun nəticə tapılmadı. Başqa adla axtarmağa çalış.',
    searchError: 'Wikipedia məlumatlarını yükləmək mümkün olmadı. Bir az sonra yenidən yoxla.',
    readWikipedia: 'Wikipedia-da oxu',
    weverseNote: 'Artistlərin rəsmi paylaşımları və fan icmaları üçün Weverse platformasına keç.',
    visitWeverse: 'Weverse-ə keç',
    community: 'İCMAANI TAP',
    fanTitle: 'Fan qrupları',
    fanDescription: 'Sevdiyin artistləri və maraqları bölüşən fanlarla tanış ol.',
    joinGroups: 'Fan qruplarına qoşul',
    joinGroupsDesc: 'Sevimli K-pop artistlərin üçün icmalar tap.',
    discussions: 'Fan müzakirələri',
    discussionsDesc: 'Fikirlərini bölüş və digər fanlarla söhbət et.',
    sharePosts: 'Paylaşımlarını et',
    sharePostsDesc: 'Paylaşımlar yarat və K-pop maraqlarını bölüş.',
    explore: 'Kəşf et',
    moreExplore: 'DAHA ÇOX KƏŞF ET',
    servicesTitle: 'Əlavə xidmətlər',
    servicesDescription: 'KPOP WORLD-də daha çox fəaliyyət və imkanlardan yararlan.',
    games: 'K-pop oyunları',
    gamesDesc: 'Viktorinalar və əyləncəli K-pop oyunları oyna.',
    points: 'Xallar və bonuslar',
    pointsDesc: 'Xallar topla, nişanlar və mükafatlar qazan.',
    winners: 'Həftənin qalibləri',
    winnersDesc: 'Həftənin ən aktiv fanlarını kəşf et.',
    notifications: 'Bildirişlər',
    notificationsDesc: 'Yenilikləri və fəaliyyət bildirişlərini idarə et.',
    tickets: 'Konsert biletləri',
    ticketsDesc: 'Rəsmi satıcılar vasitəsilə konsert biletlərini tap.',
    officialPlatforms: 'RƏSMİ PLATFORMLAR',
    officialApps: 'Rəsmi K-pop tətbiqlərini kəşf et',
    appsDescription: 'Artist yenilikləri, paylaşımlar və digər məzmunlar üçün rəsmi platformalara keç.',
    weverseDesc: 'Artist icmaları, rəsmi paylaşımlar və canlı yayımlar üçün Weverse-i ziyarət et.',
    mubeatDesc: 'K-pop məzmunları və fan fəaliyyətləri üçün Mubeat platformasını ziyarət et.',
    visitMubeat: 'Mubeat-ə keç',
    footerText: 'Dünyanın hər yerindəki K-pop fanları üçün yaradılıb.',
    loginWelcome: 'Yenidən xoş gəlmisən!',
    signupTitle: 'KPOP WORLD-ə qoşul',
    loginDescription: 'Mövcud hesabına daxil ol.',
    signupDescription: 'Öz fan hesabını yarat.',
    firstName: 'Ad',
    lastName: 'Soyad',
    age: 'Yaş',
    email: 'E-poçt ünvanı',
    password: 'Şifrə',
    pleaseWait: 'Zəhmət olmasa gözlə...',
    login: 'Daxil ol',
    createAccount: 'Hesab yarat',
    noAccount: 'Hesabın yoxdur?',
    haveAccount: 'Artıq hesabın var?',
    signUp: 'Qeydiyyatdan keç',
    close: 'Bağla',
    featurePreparing: 'Bu funksiya hazırlanır və hazırda aktiv deyil.',
    featureClose: 'Bağla',
    loginError: 'Giriş uğursuz oldu. İlk dəfə daxil olursansa, zəhmət olmasa hesab yarat.',
    emailConfirm: 'Hesabın yaradıldı. Daxil olmamışdan əvvəl e-poçt ünvanını təsdiqlə.',
    wikiDisclaimer: 'Wikipedia istifadəçilər tərəfindən redaktə olunan ensiklopediyadır. Məlumatlar artistin rəsmi açıqlaması hesab edilmir.'
  },

  en: {
    home: 'Home',
    groups: 'K-pop Groups',
    fanGroups: 'Fan Groups',
    music: 'Music',
    services: 'Additional Services',
    apps: 'Official Apps',
    profile: 'My Profile',
    welcomeLabel: 'YOUR K-POP UNIVERSE',
    heroTitle1: 'Your Favourite Artists.',
    heroTitle2: 'Your Favourite World.',
    heroText: 'Discover K-pop groups, enjoy music, connect with fans and explore your own K-pop world.',
    welcome: 'Welcome to KPOP WORLD!',
    howEnter: 'How would you like to enter?',
    oldFan: "I'm a long-time fan",
    newFan: "I'm a first-time visitor",
    findFavourites: 'FIND YOUR FAVOURITES',
    groupQuestion: 'Which K-pop Group Do You Love?',
    groupDescription: 'Search for your favourite K-pop group.',
    searchPlaceholder: 'Search any K-pop group or artist...',
    searchNote: 'Search results come from Wikipedia. Select a result to read the article.',
    searching: 'Searching...',
    noResults: 'No matching results found. Try another name.',
    searchError: 'Could not load Wikipedia information. Please try again later.',
    readWikipedia: 'Read on Wikipedia',
    weverseNote: 'Visit Weverse for official artist posts and fan communities.',
    visitWeverse: 'Visit Weverse',
    community: 'FIND YOUR COMMUNITY',
    fanTitle: 'Fan Groups',
    fanDescription: 'Meet fans who share your favourite artists and interests.',
    joinGroups: 'Join Fan Groups',
    joinGroupsDesc: 'Find communities for your favourite K-pop artists.',
    discussions: 'Fan Discussions',
    discussionsDesc: 'Share your thoughts and talk with other fans.',
    sharePosts: 'Share Your Posts',
    sharePostsDesc: 'Create posts and share your K-pop interests.',
    explore: 'Explore',
    moreExplore: 'MORE TO EXPLORE',
    servicesTitle: 'Additional Services',
    servicesDescription: 'Enjoy more activities and opportunities in KPOP WORLD.',
    games: 'K-pop Games',
    gamesDesc: 'Play quizzes and fun K-pop games.',
    points: 'Points & Bonuses',
    pointsDesc: 'Collect points, earn badges and rewards.',
    winners: 'Weekly Winners',
    winnersDesc: 'Discover the most active fans of the week.',
    notifications: 'Notifications',
    notificationsDesc: 'Manage updates and activity notifications.',
    tickets: 'Concert Tickets',
    ticketsDesc: 'Find concert tickets through official sellers.',
    officialPlatforms: 'OFFICIAL PLATFORMS',
    officialApps: 'Explore Official K-pop Apps',
    appsDescription: 'Visit official platforms for artist updates, posts and other content.',
    weverseDesc: 'Visit Weverse for artist communities, official posts and available live content.',
    mubeatDesc: 'Visit Mubeat for K-pop content and fan activities available on its platform.',
    visitMubeat: 'Visit Mubeat',
    footerText: 'Made for K-pop fans, around the world.',
    loginWelcome: 'Welcome Back!',
    signupTitle: 'Join KPOP WORLD',
    loginDescription: 'Sign in to your existing account.',
    signupDescription: 'Create your personal fan account.',
    firstName: 'First Name',
    lastName: 'Last Name',
    age: 'Age',
    email: 'Email Address',
    password: 'Password',
    pleaseWait: 'Please wait...',
    login: 'Log In',
    createAccount: 'Create Account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signUp: 'Sign Up',
    close: 'Close',
    featurePreparing: 'This feature is being prepared and is not active yet.',
    featureClose: 'Close',
    loginError: 'Login unsuccessful. If this is your first visit, please create an account.',
    emailConfirm: 'Your account has been created. Please confirm your email before logging in.',
    wikiDisclaimer: 'Wikipedia is an encyclopedia edited by its users. Its content should not be considered an official artist statement.'
  },

  ko: {
    home: '홈',
    groups: '케이팝 그룹',
    fanGroups: '팬 그룹',
    music: '음악',
    services: '추가 서비스',
    apps: '공식 앱',
    profile: '내 프로필',
    welcomeLabel: '나만의 케이팝 세계',
    heroTitle1: '좋아하는 아티스트.',
    heroTitle2: '좋아하는 세상.',
    heroText: '케이팝 그룹을 발견하고, 음악을 즐기고, 팬들과 소통하며 나만의 케이팝 세계를 만나보세요.',
    welcome: 'KPOP WORLD에 오신 것을 환영합니다!',
    howEnter: '어떻게 입장하시겠어요?',
    oldFan: '오랫동안 팬이었어요',
    newFan: '처음 방문했어요',
    findFavourites: '좋아하는 그룹 찾기',
    groupQuestion: '어떤 케이팝 그룹을 좋아하세요?',
    groupDescription: '좋아하는 케이팝 그룹을 검색하세요.',
    searchPlaceholder: '케이팝 그룹 또는 아티스트 검색...',
    searchNote: '검색 결과는 Wikipedia에서 제공됩니다. 결과를 선택하면 문서를 읽을 수 있습니다.',
    searching: '검색 중...',
    noResults: '검색 결과가 없습니다. 다른 이름으로 검색해 보세요.',
    searchError: 'Wikipedia 정보를 불러올 수 없습니다. 나중에 다시 시도해 주세요.',
    readWikipedia: 'Wikipedia에서 읽기',
    weverseNote: '아티스트의 공식 게시물과 팬 커뮤니티를 보려면 Weverse를 방문하세요.',
    visitWeverse: 'Weverse 방문',
    community: '팬 커뮤니티 찾기',
    fanTitle: '팬 그룹',
    fanDescription: '좋아하는 케이팝 아티스트와 관심사를 공유하는 팬들을 만나보세요.',
    joinGroups: '팬 그룹 가입',
    joinGroupsDesc: '좋아하는 케이팝 아티스트의 커뮤니티를 찾아보세요.',
    discussions: '팬 토론',
    discussionsDesc: '생각을 공유하고 다른 팬들과 이야기하세요.',
    sharePosts: '게시물 공유',
    sharePostsDesc: '게시물을 만들고 케이팝에 대한 관심사를 공유하세요.',
    explore: '둘러보기',
    moreExplore: '더 알아보기',
    servicesTitle: '추가 서비스',
    servicesDescription: 'KPOP WORLD에서 더 많은 활동과 기회를 즐겨보세요.',
    games: '케이팝 게임',
    gamesDesc: '퀴즈와 재미있는 케이팝 게임을 즐겨보세요.',
    points: '포인트 및 보너스',
    pointsDesc: '포인트를 모으고 배지와 보상을 받아보세요.',
    winners: '이번 주의 우승자',
    winnersDesc: '이번 주 가장 활발한 팬들을 만나보세요.',
    notifications: '알림',
    notificationsDesc: '업데이트 및 활동 알림을 관리하세요.',
    tickets: '콘서트 티켓',
    ticketsDesc: '공식 판매처에서 콘서트 티켓을 찾아보세요.',
    officialPlatforms: '공식 플랫폼',
    officialApps: '공식 케이팝 앱 둘러보기',
    appsDescription: '아티스트 소식과 게시물 및 다양한 콘텐츠를 공식 플랫폼에서 확인하세요.',
    weverseDesc: '아티스트 커뮤니티, 공식 게시물 및 라이브 콘텐츠를 Weverse에서 확인하세요.',
    mubeatDesc: '케이팝 콘텐츠와 팬 활동을 Mubeat에서 확인하세요.',
    visitMubeat: 'Mubeat 방문',
    footerText: '전 세계 케이팝 팬들을 위해 만들었습니다.',
    loginWelcome: '다시 오신 것을 환영합니다!',
    signupTitle: 'KPOP WORLD 가입하기',
    loginDescription: '기존 계정에 로그인하세요.',
    signupDescription: '나만의 팬 계정을 만드세요.',
    firstName: '이름',
    lastName: '성',
    age: '나이',
    email: '이메일 주소',
    password: '비밀번호',
    pleaseWait: '잠시만 기다려 주세요...',
    login: '로그인',
    createAccount: '계정 만들기',
    noAccount: '계정이 없으신가요?',
    haveAccount: '이미 계정이 있으신가요?',
    signUp: '가입하기',
    close: '닫기',
    featurePreparing: '이 기능은 준비 중이며 아직 사용할 수 없습니다.',
    featureClose: '닫기',
    loginError: '로그인에 실패했습니다. 처음 방문하셨다면 계정을 만들어 주세요.',
    emailConfirm: '계정이 생성되었습니다. 로그인하기 전에 이메일을 확인해 주세요.',
    wikiDisclaimer: 'Wikipedia는 사용자가 편집하는 백과사전입니다. 공식 아티스트 발표로 간주해서는 안 됩니다.'
  },

  es: {
    home: 'Inicio',
    groups: 'Grupos de K-pop',
    fanGroups: 'Grupos de fans',
    music: 'Música',
    services: 'Servicios adicionales',
    apps: 'Aplicaciones oficiales',
    profile: 'Mi perfil',
    welcomeLabel: 'TU UNIVERSO K-POP',
    heroTitle1: 'Tus artistas favoritos.',
    heroTitle2: 'Tu mundo favorito.',
    heroText: 'Descubre grupos de K-pop, disfruta de la música, conecta con otros fans y explora tu propio mundo K-pop.',
    welcome: '¡Bienvenido a KPOP WORLD!',
    howEnter: '¿Cómo te gustaría entrar?',
    oldFan: 'Soy fan desde hace tiempo',
    newFan: 'Es mi primera visita',
    findFavourites: 'ENCUENTRA TUS FAVORITOS',
    groupQuestion: '¿Qué grupo de K-pop te gusta?',
    groupDescription: 'Busca tu grupo de K-pop favorito.',
    searchPlaceholder: 'Busca un grupo o artista de K-pop...',
    searchNote: 'Los resultados proceden de Wikipedia. Selecciona un resultado para leer el artículo.',
    searching: 'Buscando...',
    noResults: 'No se encontraron resultados. Prueba con otro nombre.',
    searchError: 'No se pudo cargar la información de Wikipedia. Inténtalo más tarde.',
    readWikipedia: 'Leer en Wikipedia',
    weverseNote: 'Visita Weverse para ver publicaciones oficiales y comunidades de fans.',
    visitWeverse: 'Visitar Weverse',
    community: 'ENCUENTRA TU COMUNIDAD',
    fanTitle: 'Grupos de fans',
    fanDescription: 'Conoce a fans que comparten tus artistas e intereses favoritos.',
    joinGroups: 'Unirse a grupos de fans',
    joinGroupsDesc: 'Encuentra comunidades de tus artistas favoritos.',
    discussions: 'Debates de fans',
    discussionsDesc: 'Comparte tus opiniones y habla con otros fans.',
    sharePosts: 'Compartir publicaciones',
    sharePostsDesc: 'Crea publicaciones y comparte tus intereses de K-pop.',
    explore: 'Explorar',
    moreExplore: 'MÁS POR DESCUBRIR',
    servicesTitle: 'Servicios adicionales',
    servicesDescription: 'Disfruta de más actividades y oportunidades en KPOP WORLD.',
    games: 'Juegos de K-pop',
    gamesDesc: 'Juega a concursos y divertidos juegos de K-pop.',
    points: 'Puntos y bonificaciones',
    pointsDesc: 'Consigue puntos, insignias y recompensas.',
    winners: 'Ganadores de la semana',
    winnersDesc: 'Descubre a los fans más activos de la semana.',
    notifications: 'Notificaciones',
    notificationsDesc: 'Gestiona las novedades y notificaciones de actividad.',
    tickets: 'Entradas para conciertos',
    ticketsDesc: 'Encuentra entradas a través de vendedores oficiales.',
    officialPlatforms: 'PLATAFORMAS OFICIALES',
    officialApps: 'Explora aplicaciones oficiales de K-pop',
    appsDescription: 'Visita plataformas oficiales para ver noticias, publicaciones y otros contenidos.',
    weverseDesc: 'Visita Weverse para comunidades de artistas, publicaciones oficiales y contenido en directo.',
    mubeatDesc: 'Visita Mubeat para contenido de K-pop y actividades de fans.',
    visitMubeat: 'Visitar Mubeat',
    footerText: 'Creado para fans del K-pop de todo el mundo.',
    loginWelcome: '¡Bienvenido de nuevo!',
    signupTitle: 'Únete a KPOP WORLD',
    loginDescription: 'Inicia sesión en tu cuenta.',
    signupDescription: 'Crea tu cuenta personal de fan.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    age: 'Edad',
    email: 'Correo electrónico',
    password: 'Contraseña',
    pleaseWait: 'Espera, por favor...',
    login: 'Iniciar sesión',
    createAccount: 'Crear cuenta',
    noAccount: '¿No tienes una cuenta?',
    haveAccount: '¿Ya tienes una cuenta?',
    signUp: 'Registrarse',
    close: 'Cerrar',
    featurePreparing: 'Esta función está en preparación y todavía no está activa.',
    featureClose: 'Cerrar',
    loginError: 'No se pudo iniciar sesión. Si es tu primera visita, crea una cuenta.',
    emailConfirm: 'Tu cuenta ha sido creada. Confirma tu correo antes de iniciar sesión.',
    wikiDisclaimer: 'Wikipedia es una enciclopedia editada por sus usuarios. Su contenido no es una declaración oficial del artista.'
  },

  ru: {
    home: 'Главная',
    groups: 'K-pop группы',
    fanGroups: 'Фан-группы',
    music: 'Музыка',
    services: 'Дополнительные услуги',
    apps: 'Официальные приложения',
    profile: 'Мой профиль',
    welcomeLabel: 'ТВОЯ ВСЕЛЕННАЯ K-POP',
    heroTitle1: 'Твои любимые артисты.',
    heroTitle2: 'Твой любимый мир.',
    heroText: 'Открывай K-pop группы, наслаждайся музыкой, общайся с фанатами и создавай свой мир K-pop.',
    welcome: 'Добро пожаловать в KPOP WORLD!',
    howEnter: 'Как ты хочешь войти?',
    oldFan: 'Я давно являюсь фанатом',
    newFan: 'Я здесь впервые',
    findFavourites: 'НАЙДИ СВОИХ ФАВОРИТОВ',
    groupQuestion: 'Какую K-pop группу ты любишь?',
    groupDescription: 'Найди свою любимую K-pop группу.',
    searchPlaceholder: 'Поиск K-pop группы или артиста...',
    searchNote: 'Результаты поиска получены из Wikipedia. Нажми на результат, чтобы прочитать статью.',
    searching: 'Поиск...',
    noResults: 'Ничего не найдено. Попробуй другое название.',
    searchError: 'Не удалось загрузить информацию из Wikipedia. Попробуй позже.',
    readWikipedia: 'Читать в Wikipedia',
    weverseNote: 'Посети Weverse, чтобы увидеть официальные публикации и фан-сообщества.',
    visitWeverse: 'Перейти в Weverse',
    community: 'НАЙДИ СВОЁ СООБЩЕСТВО',
    fanTitle: 'Фан-группы',
    fanDescription: 'Знакомься с фанатами, которые разделяют твои интересы и любовь к артистам.',
    joinGroups: 'Вступить в фан-группы',
    joinGroupsDesc: 'Найди сообщества поклонников любимых K-pop артистов.',
    discussions: 'Обсуждения фанатов',
    discussionsDesc: 'Делись мыслями и общайся с другими фанатами.',
    sharePosts: 'Публикуй свои посты',
    sharePostsDesc: 'Создавай публикации и делись интересом к K-pop.',
    explore: 'Открыть',
    moreExplore: 'БОЛЬШЕ ВОЗМОЖНОСТЕЙ',
    servicesTitle: 'Дополнительные услуги',
    servicesDescription: 'Открывай новые занятия и возможности в KPOP WORLD.',
    games: 'K-pop игры',
    gamesDesc: 'Играй в викторины и другие K-pop игры.',
    points: 'Баллы и бонусы',
    pointsDesc: 'Собирай баллы, значки и награды.',
    winners: 'Победители недели',
    winnersDesc: 'Узнай, кто самые активные фанаты недели.',
    notifications: 'Уведомления',
    notificationsDesc: 'Управляй обновлениями и уведомлениями.',
    tickets: 'Билеты на концерты',
    ticketsDesc: 'Ищи билеты у официальных продавцов.',
    officialPlatforms: 'ОФИЦИАЛЬНЫЕ ПЛАТФОРМЫ',
    officialApps: 'Официальные K-pop приложения',
    appsDescription: 'Посещай официальные платформы, чтобы следить за новостями и публикациями артистов.',
    weverseDesc: 'Посети Weverse для общения в сообществах артистов, официальных публикаций и прямых эфиров.',
    mubeatDesc: 'Посети Mubeat, чтобы найти K-pop контент и активности для фанатов.',
    visitMubeat: 'Перейти в Mubeat',
    footerText: 'Создано для поклонников K-pop по всему миру.',
    loginWelcome: 'С возвращением!',
    signupTitle: 'Присоединяйся к KPOP WORLD',
    loginDescription: 'Войди в свой аккаунт.',
    signupDescription: 'Создай личный аккаунт фаната.',
    firstName: 'Имя',
    lastName: 'Фамилия',
    age: 'Возраст',
    email: 'Электронная почта',
    password: 'Пароль',
    pleaseWait: 'Пожалуйста, подожди...',
    login: 'Войти',
    createAccount: 'Создать аккаунт',
    noAccount: 'Нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',
    signUp: 'Регистрация',
    close: 'Закрыть',
    featurePreparing: 'Эта функция находится в разработке и пока недоступна.',
    featureClose: 'Закрыть',
    loginError: 'Не удалось войти. Если ты здесь впервые, создай аккаунт.',
    emailConfirm: 'Аккаунт создан. Подтверди электронную почту перед входом.',
    wikiDisclaimer: 'Wikipedia — энциклопедия, которую редактируют пользователи. Её материалы не являются официальным заявлением артиста.'
  }
}

const languageOptions = [
  { code: 'az', label: 'AZ', name: 'Azərbaycan' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ko', label: 'KO', name: '한국어' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ru', label: 'RU', name: 'Русский' }
]

const wikipediaDomains = {
  az: 'https://az.wikipedia.org',
  en: 'https://en.wikipedia.org',
  ko: 'https://ko.wikipedia.org',
  es: 'https://es.wikipedia.org',
  ru: 'https://ru.wikipedia.org'
}

function HomePage({
  user,
  openPage,
  page,
  setPage,
  form,
  message,
  loading,
  handleChange,
  handleLogin,
  handleSignUp,
  navigate,
  language,
  setLanguage
}) {
  const [search, setSearch] = useState('')
  const [wikiResults, setWikiResults] = useState([])
  const [wikiLoading, setWikiLoading] = useState(false)
  const [wikiError, setWikiError] = useState('')
  const [selectedFeature, setSelectedFeature] = useState(null)

  const t = translations[language]
  const wikiDomain = wikipediaDomains[language]

  useEffect(() => {
    const query = search.trim()

    if (query.length < 2) {
      setWikiResults([])
      setWikiError('')
      setWikiLoading(false)
      return
    }

    const controller = new AbortController()

    const timeout = setTimeout(async () => {
      setWikiLoading(true)
      setWikiError('')

      try {
        const url = `${wikiDomain}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`

        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Wikipedia request failed')
        }

        const data = await response.json()
        setWikiResults(data?.query?.search || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setWikiError(t.searchError)
          setWikiResults([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setWikiLoading(false)
        }
      }
    }, 350)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [search, wikiDomain, t.searchError])

  const menuItems = [
    { label: t.home, href: '#home' },
    { label: t.groups, href: '#groups' },
    { label: t.fanGroups, href: '#fan-groups' },
    { label: t.music, href: '#music' },
    { label: t.services, href: '#services' },
    { label: t.apps, href: '#official-apps' }
  ]

  const fanFeatures = [
    { icon: '♡', title: t.joinGroups, description: t.joinGroupsDesc },
    { icon: '💬', title: t.discussions, description: t.discussionsDesc },
    { icon: '✦', title: t.sharePosts, description: t.sharePostsDesc }
  ]

  const services = [
    { icon: '🎮', title: t.games, description: t.gamesDesc },
    { icon: '⭐', title: t.points, description: t.pointsDesc },
    { icon: '🏆', title: t.winners, description: t.winnersDesc },
    { icon: '🔔', title: t.notifications, description: t.notificationsDesc },
    { icon: '🎟️', title: t.tickets, description: t.ticketsDesc }
  ]

  const showFeature = (title, description) => {
    setSelectedFeature({ title, description })
  }

  const cleanSnippet = (snippet) => {
    const temporaryElement = document.createElement('div')
    temporaryElement.innerHTML = snippet || ''
    return temporaryElement.textContent || temporaryElement.innerText || ''
  }

  return (
    <>
      <header
        className="navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <a href="#home" className="logo">♡ KPOP WORLD</a>

        <nav>
          {menuItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="navbar-actions">
          <label className="language-select-wrap">
            <span className="language-icon">文</span>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Choose language"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label} — {option.name}
                </option>
              ))}
            </select>
          </label>

          <button
            className="login-btn"
            onClick={() => user ? navigate('/profile') : openPage('login')}
          >
            {t.profile}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="welcome-label">{t.welcomeLabel}</span>

            <h1>
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
            </h1>

            <p>{t.heroText}</p>
          </div>

          <div className="welcome-card">
            <div className="music-icon">♫</div>

            <h2>{t.welcome}</h2>
            <p>{t.howEnter}</p>

            <button onClick={() => openPage('login')}>
              {t.oldFan}
            </button>

            <button
              className="secondary-btn"
              onClick={() => openPage('signup')}
            >
              {t.newFan}
            </button>
          </div>
        </section>

        <section className="home-section groups-section" id="groups">
          <span className="section-label">{t.findFavourites}</span>
          <h2>{t.groupQuestion}</h2>

          <p className="section-description">{t.groupDescription}</p>

          <div className="large-search">
            <span>⌕</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
            />
          </div>

          <p className="search-note">
            {search.trim().length < 2 ? t.searchNote : ''}
          </p>

          {wikiLoading && <p className="wiki-status">{t.searching}</p>}
          {wikiError && <p className="wiki-status wiki-error">{wikiError}</p>}

          {!wikiLoading && !wikiError && search.trim().length >= 2 && wikiResults.length === 0 && (
            <p className="wiki-status">{t.noResults}</p>
          )}

          {wikiResults.length > 0 && (
            <div className="wiki-results">
              {wikiResults.slice(0, 6).map((result) => (
                <article className="wiki-result-card" key={result.pageid}>
                  <h3>{result.title}</h3>
                  <p>{cleanSnippet(result.snippet)}</p>
                  <a
                    href={`${wikiDomain}/?curid=${result.pageid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.readWikipedia}
                  </a>
                </article>
              ))}
            </div>
          )}

          <p className="wiki-disclaimer">{t.wikiDisclaimer}</p>

          <div className="weverse-search-link">
            <p>{t.weverseNote}</p>
            <a href="https://weverse.io/" target="_blank" rel="noopener noreferrer">
              {t.visitWeverse}
            </a>
          </div>
        </section>

        <section className="home-section fan-section" id="fan-groups">
          <span className="section-label">{t.community}</span>
          <h2>{t.fanTitle}</h2>

          <p className="section-description">{t.fanDescription}</p>

          <div className="feature-grid">
            {fanFeatures.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button
                  className="card-action"
                  onClick={() => {
                    if (index === 0) {
                      navigate('/fan-groups')
                    } else if (index === 1) {
                      navigate('/fan-discussions')
                    } else {
                      navigate('/fan-posts')
                    }
                  }}
                >
                  {t.explore}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="music">
          <SpotifyMusic language={language} />
        </section>

        <section className="home-section services-section" id="services">
          <span className="section-label">{t.moreExplore}</span>
          <h2>{t.servicesTitle}</h2>

          <p className="section-description">{t.servicesDescription}</p>

          <div className="feature-grid services-grid">
            {services.map((service, index) => (
              <article className="feature-card service-card" key={service.title}>
                <div className="feature-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  className="card-action"
                  onClick={() => {
                    if (index === 0) {
                      navigate('/games')
                    } else if (index === 1) {
                      navigate('/points-bonuses')
                    } else if (index === 2) {
                      navigate('/weekly-winner')
                    } else if (index === 3) {
                      navigate('/notifications')
                    } else if (index === 4) {
                      navigate('/concert-tickets')
                    }
                  }}
                >
                  {t.explore}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section apps-section" id="official-apps">
          <span className="section-label">{t.officialPlatforms}</span>
          <h2>{t.officialApps}</h2>

          <p className="section-description">{t.appsDescription}</p>

          <div className="feature-grid apps-grid">
            <article className="feature-card app-card">
              <div className="app-symbol">W</div>
              <h3>Weverse</h3>
              <p>{t.weverseDesc}</p>
              <a href="https://weverse.io/" target="_blank" rel="noopener noreferrer">
                {t.visitWeverse}
              </a>
            </article>

            <article className="feature-card app-card">
              <div className="app-symbol">M</div>
              <h3>Mubeat</h3>
              <p>{t.mubeatDesc}</p>
              <a href="https://www.mubeat.tv/" target="_blank" rel="noopener noreferrer">
                {t.visitMubeat}
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <h2>♡ KPOP WORLD</h2>
        <p>{t.footerText}</p>
        <span>© 2026 KPOP WORLD</span>
      </footer>

      {selectedFeature && (
        <div className="feature-modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div
            className="feature-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-modal-title"
          >
            <button
              className="close-btn"
              onClick={() => setSelectedFeature(null)}
              aria-label={t.close}
            >
              ×
            </button>
            <div className="feature-modal-icon">✦</div>
            <h2 id="feature-modal-title">{selectedFeature.title}</h2>
            <p>{selectedFeature.description}</p>
            <button className="card-action" onClick={() => setSelectedFeature(null)}>
              {t.featureClose}
            </button>
          </div>
        </div>
      )}

      {page !== 'welcome' && (
        <div className="auth-overlay">
          <div className="auth-card">
            <button
              className="close-btn"
              onClick={() => setPage('welcome')}
              aria-label={t.close}
            >
              ×
            </button>

            <h2>
              {page === 'login' ? t.loginWelcome : t.signupTitle}
            </h2>

            <p>
              {page === 'login' ? t.loginDescription : t.signupDescription}
            </p>

            <form onSubmit={page === 'login' ? handleLogin : handleSignUp}>
              {page === 'signup' && (
                <>
                  <input
                    name="firstName"
                    placeholder={t.firstName}
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="lastName"
                    placeholder={t.lastName}
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="age"
                    type="number"
                    placeholder={t.age}
                    min="13"
                    max="120"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder={t.email}
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder={t.password}
                minLength={8}
                value={form.password}
                onChange={handleChange}
                required
              />

              {message && <p className="auth-message">{message}</p>}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? t.pleaseWait
                  : page === 'login'
                    ? t.login
                    : t.createAccount}
              </button>
            </form>

            <p className="auth-switch">
              {page === 'login' ? t.noAccount : t.haveAccount}
              {' '}
              <button
                type="button"
                onClick={() => openPage(page === 'login' ? 'signup' : 'login')}
              >
                {page === 'login' ? t.signUp : t.login}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  const navigate = useNavigate()

  const [page, setPage] = useState('welcome')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('kpop-world-language')
    return translations[savedLanguage] ? savedLanguage : 'az'
  })

  useEffect(() => {
    localStorage.setItem('kpop-world-language', language)
  }, [language])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          age: Number(form.age)
        }
      }
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (data.session) {
      setUser(data.user)
      setPage('welcome')
      navigate('/')
    } else {
      setMessage(translations[language].emailConfirm)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    setLoading(false)

    if (error) {
      setMessage(translations[language].loginError)
      return
    }

    setUser(data.user)
    setPage('welcome')
    navigate('/')
  }

  const openPage = (selectedPage) => {
    setForm({
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: ''
    })

    setMessage('')
    setPage(selectedPage)
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              openPage={openPage}
              page={page}
              setPage={setPage}
              form={form}
              message={message}
              loading={loading}
              handleChange={handleChange}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              navigate={navigate}
              language={language}
              setLanguage={setLanguage}
            />
          }
        />

        <Route
          path="/profile"
          element={
            user
              ? <Profile user={user} />
              : <Navigate to="/" replace />
          }
        />

        <Route path="/fan-groups" element={<FanGroups />} />
        <Route path="/fan-discussions" element={<FanDiscussions />} />
        <Route path="/fan-posts" element={<FanPosts />} />
        <Route path="/games" element={<Games />} />
        <Route path="/points-bonuses" element={<PointsBonuses />} />
        <Route path="/weekly-winner" element={<WeeklyWinner />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/concert-tickets" element={<ConcertTickets />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FeedbackWidget user={user} />
    </div>
  )
}

export default App
