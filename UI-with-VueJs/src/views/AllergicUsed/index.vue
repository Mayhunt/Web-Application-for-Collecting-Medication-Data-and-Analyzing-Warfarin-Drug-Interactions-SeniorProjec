<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div
      class="hero is-fullheight-with-navbar"
      style="background-color: #f2effb; border-radius: 60px 60px 0 0; margin-top: 1rem"
    >
      <div class="container" style="margin: 0 20px">
        <div class="content is-medium">
          <div class="mt-1"></div>
          <h1>รายการยาที่แพ้</h1>
        </div>
        <div
          class="box is-clickable"
          @click="
            isCardModalActive = true;
            sendData(AllergicAll);
          "
          v-for="(AllergicAll, index) in allergicDrug"
          :key="index"
          style="border-radius: 30px 30px 30px 30px"
        >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="getImgUrl(AllergicAll.pic)" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Generic Name</strong>
                  <br />
                  {{ AllergicAll.genericName }}
                  <br />
                  <strong>Symptoms</strong>
                  <br />
                  {{ AllergicAll.symptom }}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="pb-5 pt-5"></div>
        <div class="pb-5 pt-5"></div>
        <div class="fixedbutton">
          <router-link to="/allergic-pic"
            ><b-button class="mt-4" rounded type="is-primary" size="is-medium" expanded>
              รูปใบแพ้ยา</b-button
            ></router-link
          >
        </div>
        <div class="pb-5 pt-5"></div>
      </div>
      <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
          <div>
            <section
              class="hero is-white"
              style="border-radius: 60px 60px 0 0; margin-top: 1rem; padding: 1rem"
            >
              <div>
                <div class="content is-medium">
                  <h3 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
                    แก้ไขรายการยานี้
                  </h3>
                </div>
                <div>
                  <div class="media-content">
                    <figure class="image">
                      <img
                        :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${this.details.pic}`"
                      />
                    </figure>
                  </div>
                </div>
                <div class="media-content">
                  <div class="content">
                    <br />
                    <strong><h5>ชื่อยาสามัญ</h5></strong>
                    <strong
                      ><h5>{{ this.details.genericName }}</h5></strong
                    >
                  </div>
                  <b-field label="อาการที่แพ้" label-position="on-border">
                    <b-input :value="this.details.symptom" Disabled rounded> </b-input>
                  </b-field>
                  <b-field label="สถานที่ได้รับ" label-position="on-border">
                    <b-input
                      :value="this.details.place"
                      placeholder="ตัวอย่าง โรงพยาบาลจุฬาภรณ์"
                      Disabled
                      rounded
                    >
                    </b-input>
                  </b-field>
                  <b-field label="บันทึกเพิ่มเติม" label-position="on-border">
                    <b-input
                      :value="this.details.more"
                      placeholder="ตัวอย่าง มีผื่นแดงรอบปาก"
                      rounded
                      Disabled
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
                  <router-link to="/edit-allergic"
                    ><b-button
                      @click="sendEditDrug()"
                      type="is-primary"
                      size="is-medium"
                      rounded
                      expanded
                    >
                      แก้ไขรายการยานี้</b-button
                    ></router-link
                  >
                  <div class="pb-1 pt-1"></div>
                  <b-button
                    @click="
                      deleteDrug();
                    "
                    type="is-danger"
                    size="is-medium"
                    rounded
                    expanded
                  >
                    ลบรายการยานี้
                  </b-button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AllergicAll',
  data: () => ({
    allergicDrug: [],
    isCardModalActive: false,
    allDrug: [],
    details: {},
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getDrugAPI();
      console.warn(to, from);
    });
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.data = null;
  //   // this.name = null;
  //   this.getDrugAPI();
  //   next();
  // },
  // mounted() {
  //   axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
  //     this.allDrug = response.data;
  //     axios
  //       .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/allergic-drug')
  //       .then((res) => {
  //         this.allergicDrug = res.data;
  //         console.warn(this.allergicDrug);
  //         this.picAllergicUsed();
  //         // console.log(this.allDrug);
  //       });
  //   });
  // },
  methods: {
    getDrugAPI() {
      axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
        this.allDrug = response.data;
        axios
          .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/allergic-drug')
          .then((res) => {
            this.allergicDrug = res.data;
            console.warn(this.allergicDrug);
            this.picAllergicUsed();
            // console.log(this.allDrug);
          });
      });
    },
    picAllergicUsed() {
      this.allergicDrug.forEach((b) => {
        this.allDrug.forEach((c) => {
          if (b.genericName === c.genericName) {
            // eslint-disable-next-line no-param-reassign
            b.pic = c.pic;
            console.warn(b);
          }
        });
        // return console.warn(b.id);
      });
    },
    sendData(detail) {
      this.details = detail;
      return this.details;
      // console.warn(detail);
    },
    getImgUrl(pic) {
      if (pic !== '-') {
        // eslint-disable-next-line no-unused-vars
        return `https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${pic}`;
      }
      return 'https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=Ac_YXsmD.png';
    },
    sendEditDrug() {
      this.$store.commit('setEditDrug', { id: this.details.id, pic: this.details.pic });
    },
    async deleteDrug() {
      // eslint-disable-next-line no-unused-vars
      const result = await axios.delete(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/allergic-drug/${this.details.id}/delete`,
      ).then((response) => {
        this.reloadPage();
        console.log(response);
      })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
.fixedbutton {
  position: fixed;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 80px;
  left: 0%;
  bottom: 0px;
  background-color: #f2effb;
  width: 100%;
  height: 10%;
}
</style>
