<template>
  <div style="background-color: rgb(121, 87, 213)">
    <div style="background-color: #f2effb; border-radius: 60px 60px 0 0; margin-top: 1rem">
      <!-- <section>
            <b-image
                :src="require('@/assets/logo.png')"
                alt="The Buefy Logo"
                ratio="601by200"
                :rounded="rounded">
            </b-image>
        </section> -->
      <section
        class="hero is-white is-fullheight"
        style="border-radius: 60px 60px 0 0; padding: 1rem"
      >
        <div>
          <!-- <div class="content is-medium">
                <h1 style="margin-top:0; text-align:center; margin-bottom:0.25rem">Create Account</h1>
            </div> -->
          <div class="media-body" align="center">
            <!-- <figure class="image is-128x128 ">
            <img center class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
          </figure> -->
            <figure>
              <p class="image is-128x128">
                <img
                  v-if="me.pic === '-' || me.pic === ''"
                  class="image is-128x128"
                  src="https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=Ac_YXsmD.png"
                />
                <img
                  v-else
                  class="image is-128x128"
                  :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${me.pic}`"
                />
              </p>
            </figure>
          </div>
          <form class="box">
            <b-field label="ชื่อ*" label-position="on-border">
              <b-input :value="me.firstName" rounded disabled> </b-input>
            </b-field>
            <b-field label="นามสกุล*" label-position="on-border">
              <b-input :value="me.lastName" rounded disabled> </b-input>
            </b-field>
            <b-field label="เลขประจำตัวประชาชน" label-position="on-border">
              <b-input :value="me.idCardNumber" rounded disabled> </b-input>
            </b-field>
            <b-field label="วันเกิด" label-position="on-border">
              <b-datepicker
                :value="me.birthDate"
                :locale="ES"
                placeholder="กดเลือกวันเกิด"
                icon="calendar-today"
                rounded
                trap-focus
                disabled
              >
              </b-datepicker>
            </b-field>
            <b-field label="หมู่เลือด" label-position="on-border">
              <b-input :value="me.bloodGroup" placeholder="B+" rounded disabled> </b-input>
            </b-field>
            <b-field label="โรคประจำตัว" label-position="on-border">
              <b-input :value="me.medicationCondition" rounded disabled> </b-input>
            </b-field>
            <b-field label="น้ำหนัก" label-position="on-border">
              <b-input :value="me.weight" rounded expanded disabled> </b-input>
              <p class="control">
                <span class="button is-static is-rounded">กิโลกรัม</span>
              </p>
            </b-field>
            <b-field label="ส่วนสูง" label-position="on-border">
              <b-input :value="me.height" rounded expanded disabled> </b-input>
              <p class="control">
                <span class="button is-static is-rounded">เซนติเมตร</span>
              </p>
            </b-field>
            <b-field label="BMI" label-position="on-border">
              <b-input :value="me.bmi" rounded disabled> </b-input>
            </b-field>
            <b-field label="เบอร์โทร" label-position="on-border">
              <b-input :value="me.phoneNum" disabled rounded> </b-input>
            </b-field>
            <hr />
            <h4>ผู้ติดต่อฉุกเฉิน</h4>
            <br />
            <b-field label="ชื่อ" label-position="on-border">
              <b-input :value="me.emergencyContact" rounded disabled> </b-input>
            </b-field>
            <b-field label="เบอร์โทร" label-position="on-border">
              <b-input :value="me.emergencyPhoneNum" rounded disabled> </b-input>
            </b-field>
            <div
              class="fixedbuttons"
              style="justify-content: center; margin-top: 2.5rem; margin-bottom: 4rem"
            >
              <!-- <div class="fixedbutton" style="justify-content: center"> -->
              <router-link to="update-me">
                <b-button
                  @click="sendData()"
                  rounded
                  type="is-primary is-light"
                  size="is-medium"
                  expanded
                  >แก้ไขข้อมูล</b-button
                ></router-link
              >
              <!-- </div> -->
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
// import dayjs from 'dayjs';

export default {
  name: 'Profile',
  data: () => ({
    me: {},
  }),
  computed: {
    ...mapGetters(['user']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getProfileAPI();
      console.warn(to, from);
    });
  },
  // mounted() {
  //   axios
  //     .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me')
  //     .then((response) => {
  //       this.me = response.data;
  //       this.me.birthDate = new Date(this.me.birthDate);
  //       console.warn(this.me.birthDate);
  //     });
  // },
  methods: {
    getProfileAPI() {
      axios
        .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me')
        .then((response) => {
          this.me = response.data;
          this.me.birthDate = new Date(this.me.birthDate);
          console.warn(this.me.birthDate);
        });
    },
    sendData() {
      this.$store.commit('getId', this.me.id);
    },
  },
};
</script>

<style>
.input {
  margin-bottom: 0.5rem;
}
</style>
