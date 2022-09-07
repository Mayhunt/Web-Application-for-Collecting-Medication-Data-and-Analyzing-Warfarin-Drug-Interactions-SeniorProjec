/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    // log-in -> sign-in
    path: '/sign-in',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LogIn/index.vue'),
  },
  {
    path: '/allergic-pic',
    name: 'AllergicPic',
    component: () => import(/* webpackChunkName: "AllergicPic" */ '../views/AllergicPic/index.vue'),
  },
  {
    // allergic-used -> allergic-drug
    path: '/allergic-drug',
    name: 'AllergicUsed',
    component: () => import(/* webpackChunkName: "AllergicUsed" */ '../views/AllergicUsed/index.vue'),
  },
  {
    // drug-used -> currently-drug
    path: '/currently-drug',
    name: 'DrugUsed',
    component: () => import(/* webpackChunkName: "DrugUsed" */ '../views/DrugUsed/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index.vue'),
    // beforeEnter: (to, from) => {
    //   // this.$router.go('/home');
    //   console.warn(to, from, window.location);
    //   // window.location.reload();
    //   // to.reload();
    //   // reject the navigation
    //   return false;
    // },
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "Question" */ '../views/Question/index.vue'),
  },
  {
    // question2 -> hint
    path: '/hint',
    name: 'Question2',
    component: () => import(/* webpackChunkName: "Question" */ '../views/Question2/index.vue'),
  },
  {
    path: '/register1',
    name: 'Register1',
    component: () => import(/* webpackChunkName: "Register1" */ '../views/Register1/index.vue'),
  },
  {
    path: '/register2',
    name: 'Register2',
    component: () => import(/* webpackChunkName: "Register2" */ '../views/Register2/index.vue'),
  },
  {
    path: '/register3',
    name: 'Register3',
    component: () => import(/* webpackChunkName: "Register3" */ '../views/Register3/index.vue'),
  },
  {
    path: '/save-allergic',
    name: 'SaveAllergic',
    component: () => import(/* webpackChunkName: "SaveAllergic" */ '../views/SaveAllergic/index.vue'),
  },
  {
    path: '/save-drug',
    name: 'SaveDrug',
    component: () => import(/* webpackChunkName: "SaveDrug" */ '../views/SaveDrug/index.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search/index.vue'),
  },
  {
    path: '/for-test',
    name: 'ForTest',
    component: () => import(/* webpackChunkName: "ForTest" */ '../views/ForTest/index.vue'),
  },
  {
    // profile ->  me
    path: '/me',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "ForTest" */ '../views/Profile/index.vue'),
  },
  {
    path: '/edit-allergic',
    name: 'EditAllergic',
    component: () => import(/* webpackChunkName: "ForTest" */ '../views/EditAllergic/index.vue'),
  },
  {
    path: '/edit-drugused',
    name: 'EditDrugUsed',
    component: () => import(/* webpackChunkName: "ForTest" */ '../views/EditDrugUsed/index.vue'),
  },
  {
    path: '/update-me',
    name: 'UpdateMe',
    component: () => import(/* webpackChunkName: "UpdateMe" */ '../views/UpdateMe/index.vue'),
  },
  {
    path: '/confirm-password',
    name: 'ConfirmPassword',
    component: () => import(/* webpackChunkName: "ConfirmPassword" */ '../views/ConfirmPassword/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next('/sign-in');
//   else next();
//   console.warn('success');
// });
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line consistent-return
// router.beforeEach(async (to, from) => {
//   if (
//     // make sure the user is authenticated
//     !isAuthenticated
//     // ❗️ Avoid an infinite redirect
//     && to.name !== 'Login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' };
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.getters.loggedIn) {
//       next({
//         name: 'Login ',
//       });
//     }
//   }
// });
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

// router.beforeEach(async (to, from) => {
//   // canUserAccess() returns `true` or `false`
//   const canAccess = await canUserAccess(to);
//   if (!canAccess) return '/login';
// });

export default router;
