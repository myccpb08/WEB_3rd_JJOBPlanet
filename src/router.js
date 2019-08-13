import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PostWriter from './views/PostWriter.vue'
import PostDetail from './views/PostDetail.vue'
import PostUpdate from './views/PostUpdate.vue'
import BackOffice from './views/BackOffice.vue'
import BoardPage from './views/BoardPage.vue'
import BoardWriter from './views/BoardWriter.vue'
import BoardDetail from './views/BoardDetail.vue'
import BoardUpdate from './views/BoardUpdate.vue'
import NoticePage from './views/NoticePage.vue'
import NoticeWriter from './views/NoticeWriter.vue'
import NoticeDetail from './views/NoticeDetail.vue'
import NoticeUpdate from './views/NoticeUpdate.vue'
import MentorPage from './views/MentorPage.vue'
import MentorWriter from './views/MentorWriter.vue'
import MentorDetail from './views/MentorDetail.vue'
import MentorUpdate from './views/MentorUpdate.vue'
import CalendarPage from './views/CalendarPage.vue'
import Chat from './views/Chat.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/post',
      name: 'post',
      component: PostPage
    },
    {
      path: '/postwriter',
      name: 'postwriter',
      component: PostWriter
    },
    {
      path: '/postDetail/:postId',
      name: 'postDetail',
      component: PostDetail,
      props: true
    },
    {
      path: '/postUpdate/:postId',
      name: 'postUpdate',
      component: PostUpdate,
      props: true
    },
    {
      path: '/backoffice',
      name: 'backoffice',
      component: BackOffice
    },
    {
      path: '/board',
      name: 'board',
      component: BoardPage
    },
    {
      path: '/boardwriter',
      name: 'boardwriter',
      component: BoardWriter
    },
    {
      path: '/boardDetail/:boardId',
      name: 'boardDetail',
      component: BoardDetail,
      props: true
    },
    {
      path: '/boardUpdate/:boardId',
      name: 'boardUpdate',
      component: BoardUpdate,
      props: true
    },
    {
      path: '/notice',
      name: 'notice',
      component: NoticePage
    },
    {
      path: '/noticewriter',
      name: 'noticewriter',
      component: NoticeWriter
    },
    {
      path: '/noticeDetail/:noticeId',
      name: 'noticeDetail',
      component: NoticeDetail,
      props: true
    },
    {
      path: '/noticeUpdate/:noticeId',
      name: 'noticeUpdate',
      component: NoticeUpdate,
      props: true
    },
    {
      path: '/mentor',
      name: 'mentor',
      component: MentorPage
    },
    {
      path: '/mentorwriter',
      name: 'mentorwriter',
      component: MentorWriter
    },
    {
      path: '/mentorDetail/:mentorId',
      name: 'mentorDetail',
      component: MentorDetail,
      props: true
    },
    {
      path: '/mentorUpdate/:mentorId',
      name: 'mentorUpdate',
      component: MentorUpdate,
      props: true
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }

  ]
})
