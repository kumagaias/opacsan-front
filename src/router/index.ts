import Vue from 'vue'
import VueRouter from 'vue-router'

function loadView(view: string) {
  return (): Promise<object> => import(`@/views/${view}.vue`)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/books',
    component: loadView('books'),
  },
  {
    path: '/password',
    component: loadView('password'),
  },
  {
    path: '/users/:action',
    component: loadView('user'),
    meta: { isPublic: true },
    props: true,
  },
  {
    path: '/login',
    component: loadView('login'),
    meta: { isPublic: true },
  },
  {
    path: '/signup',
    component: loadView('signup'),
    meta: { isPublic: true },
  },
  {
    path: '/users/:userId/activation/:activationCode/',
    component: loadView('steps'),
    props: true,
  },
  {
    path: '/users',
    component: loadView('users'),
  },
  {
    path: '/',
    component: loadView('home'),
    meta: { isPublic: true },
  },
]

export default new VueRouter({ routes })
