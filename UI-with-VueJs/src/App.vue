<template>
  <div id="app" style="font-family: 'Kanit'">
    <section class="hero">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head is-white">
        <NavBar
          v-if="
            isLogin & isQuestion & isQuestion2 & isRegister1 & isRegister2 & isRegister3 & isConfirm
          "
        />
      </div>
      <!-- Hero content: will be in the middle -->
      <section class="hero is-primary is-fullheight-with-navbar">
        <router-view />
      </section>
    </section>
  </div>
</template>

<script>
// import axios from 'axios';
import NavBar from './components/NavBar.vue';
import Store from './store/index';

export default {
  name: 'App',
  Store,
  components: {
    NavBar,
  },
  // async created() {
  //   const response = await axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me');
  //   this.$store.dispatch('user', response.data);
  // },
  computed: {
    isLogin() {
      return this.$route.name !== 'Login';
    },
    isQuestion() {
      return this.$route.name !== 'Question';
    },
    isQuestion2() {
      return this.$route.name !== 'Question2';
    },
    isRegister1() {
      return this.$route.name !== 'Register1';
    },
    isRegister2() {
      return this.$route.name !== 'Register2';
    },
    isRegister3() {
      return this.$route.name !== 'Register3';
    },
    isConfirm() {
      return this.$route.name !== 'ConfirmPassword';
    },
  },
};
</script>

<style>
.hero .navbar {
  background: rgb(121, 87, 213) !important;
}
.button {
  font-family: 'Kanit';
}
.input {
  font-family: 'Kanit';
}
</style>
