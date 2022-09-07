/* eslint-disable no-restricted-syntax */
<template>
  <section>
    <!-- b modal infomation picture -->
    <b-modal v-model="isImageModalActive">
      <b-carousel :arrow="arrow" :repeat="arrowBoth">
              <b-carousel-item>
                <b-image :src="require('@/assets/Slide0.png')"> </b-image>
              </b-carousel-item>
              <b-carousel-item>
                <b-image :src="require('@/assets/info.png')"> </b-image>
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
    <!--  -->
    <b-navbar :fixed-top="true">
      <template #brand>
        <b-navbar-item href="#">
          <router-link to="/home">
            <b-icon pack="fas" size="is-large" icon="home" type="is-white"> </b-icon>
          </router-link>
        </b-navbar-item>
        <b-navbar-item>
          <b-autocomplete
            rounded
            placeholder="ค้นหาด้วยชื่อยาสามัญ"
            icon="magnify"
            v-model="name"
            clearable
            :data="filteredDataArray"
            field="genericName"
            @select="(option) => ((selected = option), searchDrug())"
            confirm-keys="Select"
            style="padding-left: 1px"
          >
            <template #empty>No results found</template>
          </b-autocomplete>
          <!-- infomation -->
          <b-icon
            pack="fas"
            icon="info"
            type="is-grey-lighter"
            @click.native="isImageModalActive = true"
            style="padding-left: 5px"
          >
          </b-icon>
          <!--  -->
        </b-navbar-item>
      </template>
      <template #start>
        <router-link to="/currently-drug">
          <b-navbar-item href="#">
            <b-icon pack="mdi" icon="pill" type="is-primary" size="is-medium"> </b-icon>
            <span style="padding-left: 16px"></span><span>รายการยาที่ใช้ปัจจุบัน</span>
          </b-navbar-item>
        </router-link>
        <router-link to="/allergic-drug">
          <b-navbar-item>
            <b-icon pack="mdi" icon="exclamation" type="is-primary" size="is-medium"> </b-icon>
            <span style="padding-left: 16px"></span><span>รายการยาที่แพ้</span>
          </b-navbar-item>
        </router-link>
        <router-link to="/allergic-pic">
          <b-navbar-item>
            <b-icon pack="fas" icon="fa-solid fa-file-image" type="is-primary" size="is-medium">
            </b-icon>
            <span style="padding-left: 16px"></span><span>รูปภาพใบแพ้ยา</span>
          </b-navbar-item>
        </router-link>
        <hr />
        <router-link to="/me">
          <b-navbar-item>
            <b-icon pack="mdi" icon="account" type="is-primary" size="is-medium"> </b-icon>
            <span style="padding-left: 16px"></span><span>ข้อมูลส่วนตัว</span>
          </b-navbar-item>
        </router-link>
        <hr />
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div
            class="buttons"
            @click="logout()"
            style="justify-content: right; padding-right: 20px"
          >
              <b-icon pack="mdi" icon="logout" type="is-primary" size="is-medium"></b-icon>
              <span style="padding-right: 10px"></span><span>ออกจากระบบ</span>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import router from '../router/index';

// import Store from '../store/index';

export default {
  name: 'NavBar',
  data() {
    return {
      data: [],
      name: '',
      selected: 'Bisacodyl',
      // allData: [],
      isImageModalActive: false,
    };
  },
  computed: {
    filteredDataArray() {
      // eslint-disable-next-line arrow-body-style
      return this.data.filter((option) => {
        return option.genericName.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0;
      });
    },
  },
  mounted() {
    axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
      this.data = response.data;
      // this.allData = data.data;
      // data.data.forEach((item) => this.data.push(item.genericName));
    });
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getDrugAPI();
  //     console.warn(to, from);
  //   });
  // },
  // beforeRouteUpdate(to, from, next) {
  //   this.data = null;
  //   // this.name = null;
  //   this.getDrugAPI();
  //   next();
  // },
  methods: {
    // getDrugAPI() {
    //   axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
    //     this.data = response.data;
    //     console.warn(this.data);
    //     // this.allData = data.data;
    //     // data.data.forEach((item) => this.data.push(item.genericName));
    //   });
    // },
    searchDrug() {
      console.warn(this.selected);
      if (this.selected != null) {
        router.push({ name: 'Search' });
        this.$store.commit('setsearchdrugs', this.selected);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/sign-in');
      console.log(localStorage.getItem('token'));
    },
  },
  // reloadPage() {
  //   window.location.reload();
  // },
  // sendData(option) {
  //   this.$store.commit('setCaution', option.caution);
  // eslint-disable-next-line no-restricted-syntax
  // this.allData.forEach((item) => {
  //   if (item.genericName === this.selected) {
  //     console.warn(item.genericName);
  //   }
  // });
  // (item in this.allData) {
  //   if (item.genericName === this.selected) {
  //     console.log(item.caution);
  //   }
  // }
  // this.allData.forEach((item) => item.genericName === this.selected);
  // return console.log(item.caution);
  // this.$store.commit('setUsername', this.username);
  // this.$store.commit('setPassword', this.password);
  // },

  // watch: {
  //   // whenever question changes, this function will run
  //   selected() {
  //     console.warn(this.selected);
  //     router.push({ name: 'Search' });
  //     this.$store.commit('setsearchdrugs', this.selected);
  //   },
  // },
};
</script>
