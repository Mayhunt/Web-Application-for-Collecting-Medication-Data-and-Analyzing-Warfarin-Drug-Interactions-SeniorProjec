<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div style="background-color: #f2effb; border-radius: 60px 60px 0 0; margin-top: 1rem">
      <section
        class="hero is-white is-fullheight-with-navbar"
        style="border-radius: 60px 60px 0 0; padding: 1rem"
      >
        <div>
          <!-- <div class="content is-medium">
                <h1 style="margin-top:0; text-align:center; margin-bottom:0.25rem">Create Account</h1>
            </div> -->
          <div class="media-body" align="center">
            <figure v-if="preview" class="image is-128x128">
              <b-image :src="preview" class="image is-128x128" />
            </figure>
            <figure v-else class="image is-128x128">
              <img
                v-if="me.pic"
                class="image is-128x128"
                :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${me.pic}`"
              />
              <img
                v-else
                class="image is-128x128"
                src="https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=Ac_YXsmD.png"
              />
            </figure>
          </div>
          <div>
            <!-- <div class="col-md-6"> -->
            <!-- add image icon -->
            <div class="pb-1 pt-1"></div>
            <input type="file" accept="image/*" @change="previewImage" id="my-file" style="padding-left:100px"/>
            <!-- </div> -->
            <div align="right">
              <span
                ><b-button
                  type="is-success"
                  @click="addImage"
                  class="file-icon"
                  pack="mdi"
                  icon-right="cloud-upload"
                ></b-button
              ></span>
            </div>
            <p class="has-text-danger is-size-7" style="text-align: center;">โปรดคลิกไอคอนเพื่ออัพโหลด</p>
          </div>
          <!--  -->

          <form class="box">
            <b-field label="ชื่อ*" label-position="on-border">
              <b-input v-model="me.firstName" placeholder="ชื่อ" rounded> </b-input>
            </b-field>
            <b-field label="นามสกุล*" label-position="on-border">
              <b-input v-model="me.lastName" placeholder="นามสกุล" rounded> </b-input>
            </b-field>
            <b-field label="เลขประจำตัวประชาชน" label-position="on-border">
              <b-input v-model="me.idCardNumber" placeholder="เลขประจำตัวประชาชน 13 หลัก" rounded>
              </b-input>
            </b-field>
            <b-field label="วันเกิด" label-position="on-border">
              <b-datepicker
                v-model="me.birthDate"
                locale="es-ES"
                placeholder="กดเลือกวันเกิด"
                icon="calendar-today"
                rounded
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="หมู่เลือด" label-position="on-border">
              <b-input v-model="me.bloodGroup" placeholder="B+" rounded> </b-input>
            </b-field>
            <b-field label="โรคประจำตัว" label-position="on-border">
              <b-input v-model="me.medicationCondition" placeholder="โรคหัวใจ,โรคเบาหวาน" rounded>
              </b-input>
            </b-field>
            <b-field label="น้ำหนัก" label-position="on-border">
              <b-input v-model.number="me.weight" placeholder="XX " rounded expanded> </b-input>
              <p class="control">
                <span class="button is-static is-rounded">กิโลกรัม</span>
              </p>
            </b-field>
            <b-field label="ส่วนสูง" label-position="on-border">
              <b-input v-model.number="me.height" placeholder="XXX " rounded expanded> </b-input>
              <p class="control">
                <span class="button is-static is-rounded">เซนติเมตร</span>
              </p>
            </b-field>
            <b-field label="BMI" label-position="on-border">
              <b-input v-model.number="calBMI" placeholder="ดัชนีมวลกาย" rounded disabled>
              </b-input>
            </b-field>
            <b-field label="เบอร์โทร" label-position="on-border">
              <b-input v-model="me.phoneNum" placeholder="XXX-XXXXXXX" rounded> </b-input>
            </b-field>
            <hr />
            <h4>ผู้ติดต่อฉุกเฉิน</h4>
            <br />
            <b-field label="ชื่อ" label-position="on-border">
              <b-input v-model="me.emergencyContact" placeholder="ชื่อ" rounded> </b-input>
            </b-field>
            <b-field label="เบอร์โทร" label-position="on-border">
              <b-input v-model="me.emergencyPhoneNum" placeholder="XXX-XXXXXXX" rounded> </b-input>
            </b-field>
            <div
              class="fixedbuttons"
              style="justify-content: center; margin-top: 2.5rem; margin-bottom: 4rem"
            >
              <div class="fixedbuttons" style="justify-content: center">
                <b-button
                  @click="updateProfile()"
                  rounded
                  type="is-primary is-light"
                  size="is-medium"
                  expanded
                  >บันทึก</b-button
                >
                <br />
                  <b-button @click="deleteProfile()" type="is-danger is-light" size="is-medium" rounded expanded>
                    ลบบัญชีผู้ใช้นี้ </b-button
                  >
              </div>
            </div>
          </form>
          <!-- popup add/remove image -->
          <b-modal v-model="isAddImage" :width="640" scroll="keep">
            <div class="card">
              <div>
                <section
                  class="hero is-white"
                  style="border-radius: 60px 60px 60px 60px; margin-top: 1rem; padding: 1rem"
                >
                  <div>
                    <div class="content is-medium">
                      <h4 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
                        แก้ไขรูปภาพประจำตัว
                      </h4>
                      <br />
                      <div class="columns is-mobile is-centered">
                        ท่านต้องการแก้ไขรูปภาพประจำตัว
                      </div>
                    </div>

                    <div class="buttons" style="justify-content: center; margin-top: 2rem">
                      <b-button
                        class="button"
                        @click="isAddImage = false"
                        type="is-primary"
                        size="is-medium"
                        rounded
                        expanded
                        >เพิ่มรูปภาพ</b-button
                      >
                      <b-button
                        class="button"
                        @click="isAddImage = false"
                        type="is-danger"
                        size="is-medium"
                        rounded
                        expanded
                        >ลบรูปภาพ</b-button
                      >
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </b-modal>
          <!--  -->
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
// import dayjs from 'dayjs';

export default {
  name: 'UpdateMe',
  components: {},
  data() {
    return {
      file: null,
      me: {},
      pic: '',
      preview: null,
      image: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getProfileAPI();
      console.warn(to, from);
    });
  },
  // mounted() {
  //   axios
  //     .get(
  //       `https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me?id=${this.$store.getters.id}`,
  //     )
  //     .then((response) => {
  //       this.me = response.data;
  //       this.me.birthDate = new Date(this.me.birthDate);
  //       console.log(response);
  //     });
  // },
  computed: {
    ...mapGetters(['user']),
    calBMI() {
      const bmi = parseFloat(this.me.weight / (this.me.height / 100) ** 2).toFixed(2);
      // eslint-disable-next-line use-isnan
      if (bmi === 'NaN') {
        console.warn(bmi);
        return 0;
        // eslint-disable-next-line no-else-return
      } else {
        // console.warn(bmi);
        return Number(bmi);
      }
    },
    sampleFormat() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.me.birthDate = new Date(this.me.birthDate);
      return this.me.birthDate;
    },
  },
  methods: {
    getProfileAPI() {
      axios
        .get(
          `https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/me?id=${this.$store.getters.id}`,
        )
        .then((response) => {
          this.me = response.data;
          console.log(this.me.birthDate);
          this.me.birthDate = new Date(this.me.birthDate);
          console.log(this.me.birthDate);
        });
    },
    async deleteProfile() {
      // eslint-disable-next-line no-unused-vars
      const result = await axios.delete(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/${this.$store.getters.id}/delete`,
        {},
      ).then((response) => {
        this.$router.push('/sign-in');
        localStorage.removeItem('token');
        console.log(response);
      })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
    },
    async updateProfile() {
      console.warn(this.me.phoneNum);
      const result = await axios
        .patch(
          `https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/${this.$store.getters.id}/update`,
          {
            username: this.me.username,
            password: this.me.password,
            firstName: this.me.firstName,
            lastName: this.me.lastName,
            idCardNumber: this.me.idCardNumber,
            birthDate: this.me.birthDate,
            bloodGroup: this.me.bloodGroup,
            medicationCondition: this.me.medicationCondition,
            weight: this.me.weight,
            height: this.me.height,
            bmi: this.calBMI,
            phoneNum: this.me.phoneNum,
            emergencyContact: this.me.emergencyContact,
            emergencyPhoneNum: this.me.emergencyPhoneNum,
            pic: this.me.pic,
          },
        )
        .then((response) => {
          this.$router.push('/me');
          console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
      // eslint-disable-next-line no-restricted-globals
      // if (result.status === 200) {
      //   this.$router.push('/me');
      // } else {
      //   // eslint-disable-next-line no-alert
      //   alert(result.message);
      //   console.warn(result.status);
      // }
      console.warn(result.status);
    },
    previewImage(event) {
      const input = event.target;
      console.warn(event.target.files[0]);
      if (input.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        // eslint-disable-next-line prefer-destructuring
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      console.warn(this.preview);
    },
    async addImage() {
      // const user =  this.$store.getters.username,
      const fd = new FormData();
      fd.append('file', this.image);
      const result = await axios.post(
        'https://senior-project-api-gl8ig.ondigitalocean.app/api/storage',
        fd,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      this.me.pic = result.data;
      console.warn(this.me.pic);
    },
  },
};
</script>

<style>
.input {
  margin-bottom: 0.5rem;
}
</style>
