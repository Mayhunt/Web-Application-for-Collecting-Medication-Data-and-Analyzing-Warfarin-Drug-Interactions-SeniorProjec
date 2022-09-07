/* eslint-disable operator-linebreak */ /* eslint-disable no-constant-condition */
<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div
      class="hero is-fullheight-with-navbar"
      style="background-color: #f2effb; border-radius: 60px 60px 0 0; margin-top: 1rem"
    >
      <div class="container" style="margin: 0 20px">
        <div class="content is-medium">
          <div class="mt-1"></div>
          <h2>รายการยาที่ใช้ปัจจุบัน</h2>
        </div>
        <div
          class="box is-clickable"
          @click="
            isCardModalActive = true;
            sendData(Currently);
          "
          v-for="(Currently, index) in drugcurrently"
          :key="index"
          style="border-radius: 30px 30px 30px 30px"
        >
          <article v-if="Currently.pic !== 'undefined'" class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  v-if="Currently.pic !== '-'"
                  :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${Currently.pic}`"
                  alt="Image"
                />
                <img
                  v-else
                  src="https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=Ac_YXsmD.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>ชื่อยาสามัญ</strong>
                  <br />
                  {{ Currently.genericName }}
                  <br />
                  <strong>บันทึกเพิ่มเติม</strong>
                  <br />
                  {{ Currently.more }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="pb-3 pt-3"></div>
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
                  <div class="media-content" style="text-align: -webkit-center">
                    <figure class="image">
                      <b-image
                        :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${this.details.pic}`"
                      >
                      </b-image>
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
                    <strong><h5>บันทึกเพิ่มเติม</h5></strong>
                    <h4>{{ this.details.more }}</h4>
                  </div>
                  <b-field label="วันที่ได้รับยา" label-position="on-border">
                    <b-datepicker
                      :value="new Date(this.details.receiveDate)"
                      :locale="ES"
                      placeholder="กดเลือกวันที่ได้รับยา"
                      icon="calendar-today"
                      rounded
                      trap-focus
                      disabled
                    >
                    </b-datepicker>
                  </b-field>
                  <!-- </b-field>
                  <b-field label="วันที่ได้รับยา" label-position="on-border">
                    <b-input placeholder="" rounded Disabled> </b-input>
                  </b-field> -->
                  <b-field label="สถานที่ได้รับ" label-position="on-border">
                    <b-input
                      :value="this.details.receivePlace"
                      placeholder="ตัวอย่าง โรงพยาบาลจุฬาภรณ์"
                      Disabled
                      rounded
                    >
                    </b-input>
                  </b-field>
                  <b-field label="บันทึกเพิ่มเติม" label-position="on-border">
                    <b-input v-model="more" placeholder="ตัวอย่าง มีผื่นแดงรอบปาก" rounded Disabled>
                    </b-input>
                  </b-field>
                </div>
                <div class="fixedbutton" style="justify-content: center; margin-top: 2rem">
                  <router-link to="/edit-drugused">
                    <b-button
                      @click="sendEditDrug()"
                      class="button"
                      type="is-primary"
                      size="is-medium"
                      rounded
                      expanded
                    >
                      แก้ไขรายการยานี้</b-button
                    >
                  </router-link>
                  <div class="pb-1 pt-1"></div>
                  <b-button
                    @click="deleteDrug()"
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
      <b-notification
        style="margin-top: 25px; background-color: #ffbf00; color: black"
        v-model="isNotification"
        role="alert"
        has-icon
        position="is-top"
        aria-close-label="Close notification"
      >
        <!-- <div v-for="(noti) in this.druginteracts"> -->
        <div>
          <strong
            >พบรายการยาที่อาจก่อให้เกิดอันตรกิริยากับยาวาร์ฟาริน ทั้งหมด
            {{ this.druginteracts.length }} รายการ</strong
          >
          <br />
          <div v-for="(noti, index) in this.druginteracts" :key="index">
            <strong>- รายการยา {{ noti.genericName }}</strong>
            <br />
            อาจก่อให้เกิด{{ noti.criteria }} และอาจ{{ noti.effectInr }}
          </div>
          <br />
          <strong style="font-size: small">*ผู้ใช้งานควรปรึกษาแพทย์ก่อนการใช้งาน</strong>
          <!-- <strong>บันทึกเพิ่มเติม</strong>
                  <br />
                  {{ Currently.more }} -->
        </div>
      </b-notification>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'drug-currenly',
  data: () => ({
    details: {},
    allDrug: [],
    drugcurrently: [],
    druginteract: [],
    druginteracts: [
      // {
      //   createAt: '2022-05-05T19:52:23.671Z',
      //   criteria: 'ความรุนแรงของปฎิกิริยาระดับสูงหรือปานกลาง (Major or Moderate)',
      //   effectInr: 'มีผลกระทบให้ค่า INR เพิ่มขึ้น ',
      //   genericName: 'acarbose',
      //   id: 'fd1ca17e-eef7-4ac3-95c7-fb3cfefb4975',
      //   updateAt: '2022-05-05T19:52:23.671Z',
      // },
    ],
    isCardModalActive: false,
    isNotification: false,
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getEditDrugUSedAPI();
      vm.getDrugInteractAPI();
      console.warn(to, from);
    });
  },
  // mounted() {
  //   axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
  //     this.allDrug = response.data;
  //     axios
  //       .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug')
  //       .then((res) => {
  //         this.drugcurrently = res.data;
  //         this.picAllergicUsed();
  //         this.drugcurrently.receiveDate = new Date(this.drugcurrently.receiveDate);
  //         // eslint-disable-next-line consistent-return
  //         // eslint-disable-next-line no-restricted-syntax
  //         for (const element of this.drugcurrently) {
  //           // eslint-disable-next-line space-in-parens
  //           // eslint-disable-next-line no-constant-condition
  //           /* eslint-disable */
  //           if (
  //             element.genericName === 'Warfarin (ชมพู) tab 5 mg ' ||
  //             'Warfarin (ฟ้า) tab 3 mg' ||
  //             'Warfarin (ส้ม) tab 2 mg '
  //           ) {
  //             this.interact();
  //             break;
  //           }
  //         }
  //       });
  //     this.getActivities();
  //     // console.log(this.allDrug);
  //   });
  //   axios
  //     .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/interact')
  //     .then((response) => {
  //       this.druginteract = response.data;
  //       // console.log(this.druginteract);
  //     });
  // },
  methods: {
    getDrugInteractAPI() {
      axios
        .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/interact')
        .then((response) => {
          this.druginteract = response.data;
          // console.log(this.druginteract);
        });
    },
    getEditDrugUSedAPI() {
      axios.get('https://senior-project-api-gl8ig.ondigitalocean.app/api/search').then((response) => {
        this.allDrug = response.data;
        axios
          .get('https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug')
          .then((res) => {
            this.drugcurrently = res.data;
            this.picAllergicUsed();
            this.drugcurrently.receiveDate = new Date(this.drugcurrently.receiveDate);
            // eslint-disable-next-line consistent-return
            // eslint-disable-next-line no-restricted-syntax
            for (const element of this.drugcurrently) {
            // eslint-disable-next-line space-in-parens
            // eslint-disable-next-line no-constant-condition
            /* eslint-disable */
              if (
                element.genericName === 'Warfarin (ชมพู) tab 5 mg ' ||
                element.genericName === 'Warfarin (ฟ้า) tab 3 mg' ||
                element.genericName === 'Warfarin (ส้ม) tab 2 mg '
              ) {
                // console.log(element.genericName)
                this.interact();
                break;
              }
          }
        });
      this.getActivities();
      // console.log(this.allDrug);
    });
    },
    getActivities() {
      if (this.allDrug.length === 0 || this.drugcurrently.length === 0) {
        return;
      }
      this.picAllergicUsed();
    },
    interact() {
      // console.warn(this.druginteracts);
      this.drugcurrently.forEach((b) => {
        // eslint-disable-next-line consistent-return
        this.druginteract.forEach((c) => {
          if (b.genericName.toString().toLowerCase() === c.genericName.toString().toLowerCase()) {
            // console.warn(c, b);
            this.druginteracts.push(c);
            // this.isNotification = true;
            // return this.isNotification;
          }
        });
        // return console.warn(b.id);
      });
      if (this.druginteracts.length > 0) {
        this.isNotification = true;
      }
      // console.warn(this.druginteracts);
    },
    picAllergicUsed() {
      this.drugcurrently.forEach((b) => {
        // eslint-disable-next-line no-param-reassign
        b.pic = '-';
        // console.warn(this.allDrug);
        this.allDrug.forEach((c) => {
          // console.warn('aaa');
          if (b.genericName === c.genericName) {
            // eslint-disable-next-line no-param-reassign
            b.pic = c.pic;
            // console.warn(b);
          }
        });
        // return console.warn(b);
      });
    },
    getImgUrl(pic) {
      if (pic !== '-') {
        // eslint-disable-next-line no-unused-vars
        return `https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${pic}`;
      }
      return 'https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=Ac_YXsmD.png';
    },
    sendData(detail) {
      this.details = detail;
      return this.details;
    },
    sendEditDrug() {
      this.$store.commit('setEditDrug', { id: this.details.id, pic: this.details.pic });
    },
    async deleteDrug() {
      const result = await axios.delete(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.details.id}/delete`
      ).then((response) => {
        window.location.reload();
        // this.$router.push('/currently-drug');
        // console.log(response);
      })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          // console.log(error.response.data.message);
        });
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style></style>
