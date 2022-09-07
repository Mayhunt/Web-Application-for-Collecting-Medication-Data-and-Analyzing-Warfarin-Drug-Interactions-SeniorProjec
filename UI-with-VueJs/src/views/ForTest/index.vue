<template>
  <section class="hero is-white is-fullheight">
    <div style="background-color: rgb(121, 87, 213)">
      <section>
        <b-image
          :src="require('@/assets/logo2.jpeg')"
          alt="The Buefy Logo"
          ratio="5by3"
          :rounded="rounded"
        >
        </b-image>
      </section>
      <section
        class="hero is-white"
        style="border-radius: 60px 60px 0 0; margin-top: 1rem; padding: 1rem"
      >
        <div>
          <b-modal v-model="isImageModalActive">
            <b-carousel :arrow="arrow" :repeat="arrowBoth">
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide1.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide2.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide3.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide4.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide5.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide6.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide7.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide8.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide9.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide10.png')"> </b-image>
              </b-carousel-item>
              <!-- <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                  <section :class="`hero is-medium is-${carousel.color}`">
                      <div class="hero-body has-text-centered">
                          <h1 class="title">{{carousel.text}}</h1>
                      </div>
                  </section>
              </b-carousel-item> -->
            </b-carousel>
          </b-modal>
          <div class="content is-medium">
            <!-- <br> -->
            <h1 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
              สร้างบัญชีผู้ใช้งาน
            </h1>
            <!-- <h6 style="font-size:1rem; text-align:center">Welcome back you've been missed</h6> -->
          </div>
          <form class="box">
            <b-field label="ชื่อผู้ใช้">
              <b-input
                v-model="username"
                placeholder="ชื่อผู้ใช้"
                type="user"
                icon="account-circle"
                icon-clickable
                required
                rounded
                @icon-click="userIconClick"
              >
              </b-input>
            </b-field>
            <b-field label="รหัสผ่าน">
              <b-input
                v-model="password"
                placeholder="รหัสผ่าน"
                type="password"
                icon="lock-question"
                required
                icon-clickable
                password-reveal
                rounded
                @icon-click="passwordIconClick"
              >
              </b-input>
            </b-field>
            <!-- <b-field label="ConfirmPassword">
              <b-input
                placeholder="Confirm Password"
                type="password"
                icon="lock-check"
                icon-clickable
                password-reveal
                rounded
                @icon-click="passwordIconClick"
              >
              </b-input> -->
            <!-- </b-field> -->
            <!-- <div class="buttons" style="justify-content: right"><b-button type="is-text" size="is-small">Forget Password</b-button></div> -->
            <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
              <b-button @click="sendData" type="is-primary" size="is-medium" rounded expanded>
                ถัดไป</b-button
              >
              <div class="buttons" style="justify-content: center">
                <router-link to="/sign-in"
                  ><b-button type="is-text">ย้อนกลับ</b-button></router-link
                >
              </div>

              <!-- <button class="button is-text">Register</button> -->
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Store from '../../store/index';

export default {
  name: 'RegisterPage1',
  Store,
  data() {
    return {
      username: '',
      password: '',
      isImageModalActive: true,
    };
  },
  methods: {
    sendData() {
      if (this.username !== '' && this.password !== '') {
        this.$store.commit('setUsername', this.username);
        this.$store.commit('setPassword', this.password);
        this.$router.push('/register2');
      } else {
        // eslint-disable-next-line no-alert
        alert('โปรดกรอก username และ password ให้ครบถ้วน');
      }
    },
  },
};
</script>

<style></style>
