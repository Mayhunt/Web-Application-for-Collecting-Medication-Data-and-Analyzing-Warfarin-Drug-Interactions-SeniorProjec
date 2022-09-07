// import axios from 'axios';
// // import { attempt } from 'lodash';

// export default {
//   namespaced: true,
//   state: {
//     token: null,
//     user: null,
//   },
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token;
//     },
//   },
//   actions: {
//     async logIn(_, credentials) {
//       await axios.post('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/sign-in', credentials);
//       console.log(credentials);
//     //   dispatch('attempt', response.data.accessToken);
//     },
//     // async attempt({ commit }) {
//     //   commit('SET_TOKEN, token');
//     //   try {
//     //     const response = await axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me');
//     //     commit('SET_USER', response.data);
//     //   } catch (e) {
//     //     console.log('failed');
//     //   }
//     // },
//   },
//   getters: {
//     // username: (state) => state.username,
//     // password: (state) => state.password,
//     // searchdrugs: (state) => state.searchdrugs,
//     // editdrug: (state) => state.editdrug,
//     // user: (state) => state.user,
//     // genericname: (state) => state.username,
//     // caution: (state) => state.caution,
//     // picdrug: (state) => state.picdrug,
//   },
//   modules: {},
// };
