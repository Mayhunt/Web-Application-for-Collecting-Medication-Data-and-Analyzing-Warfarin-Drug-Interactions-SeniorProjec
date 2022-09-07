<template>
  <div style="background-color: rgb(121, 87, 213)">
    <div style="background-color: rgb(121, 87, 213); max-height: 56px">
      <router-link to="/register1">
        <b-icon
          class="is-clickable"
          pack="fas"
          icon="arrow-left"
          size="is-medium"
          type="is-white"
          style="margin: 12px"
        >
        </b-icon>
      </router-link>
    </div>
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
          <figure v-if="preview" class="image is-128x128">
            <b-image :src="preview" class="image is-128x128" />
          </figure>
          <figure v-else class="image is-128x128">
            <img class="image is-128x128" src="https://bulma.io/images/placeholders/128x128.png" />
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
        <!-- <b-field
          class="file is-white"
          :class="{ 'has-name': !!file }"
          style="justify-content: center"
        >
          <b-upload v-model="file" class="file-label" rounded>
            <span class="file-cta">
              <b-icon class="file-icon" icon="camera"></b-icon>
              <span class="file-label">เพิ่มรูปภาพ</span>
            </span>
            <span class="file-name" v-if="file">
              {{ file.name }}
            </span>
          </b-upload>
        </b-field> -->
        <!--  -->
        <br />
        <form class="box">
          <b-field label="ชื่อ*" label-position="on-border">
            <b-input v-model="first_name" placeholder="ชื่อ" rounded> </b-input>
          </b-field>
          <b-field label="นามสกุล*" label-position="on-border">
            <b-input v-model="last_name" placeholder="นามสกุล" rounded> </b-input>
          </b-field>
          <b-field label="เลขประจำตัวประชาชน" label-position="on-border">
            <b-input v-model="id_card_number" placeholder="เลขประจำตัวประชาชน 13 หลัก" rounded>
            </b-input>
          </b-field>
          <b-field label="วันเกิด" label-position="on-border">
            <b-datepicker
              v-model="selected_date"
              placeholder="Click to select..."
              icon="calendar-today"
              :icon-right="selected ? 'close-circle' : ''"
              icon-right-clickable
              @icon-right-click="clearDate"
              rounded
              trap-focus
            >
            </b-datepicker>
          </b-field>
          <b-field label="หมู่เลือด" label-position="on-border">
            <b-input v-model="blood_group" placeholder="ตัวอย่าง B+" rounded> </b-input>
          </b-field>
          <b-field label="โรคประจำตัว" label-position="on-border">
            <b-input v-model="medication_condition" placeholder="โรคหัวใจ,โรคเบาหวาน" rounded>
            </b-input>
          </b-field>
          <b-field label="น้ำหนัก" label-position="on-border">
            <b-input v-model.number="weight" placeholder="XX " rounded expanded> </b-input>
            <p class="control">
              <span class="button is-static is-rounded">กิโลกรัม</span>
            </p>
          </b-field>
          <b-field label="ส่วนสูง" label-position="on-border">
            <b-input v-model.number="height" placeholder="XXX " rounded expanded> </b-input>
            <p class="control">
              <span class="button is-static is-rounded">เซนติเมตร </span>
            </p>
          </b-field>
          <b-field label="BMI" label-position="on-border">
            <b-input v-model.number="calBMI" rounded disabled> </b-input>
          </b-field>
          <b-field label="เบอร์โทร" label-position="on-border">
            <b-input v-model="phone_num" placeholder="XXX-XXXXXXX" rounded> </b-input>
          </b-field>
          <hr />
          <h4>ผู้ติดต่อฉุกเฉิน</h4>
          <br />
          <b-field label="ชื่อ" label-position="on-border">
            <b-input v-model="emergency_contact" placeholder="ชื่อ" rounded> </b-input>
          </b-field>
          <b-field label="เบอร์โทร" label-position="on-border">
            <b-input v-model="emergency_phone_num" placeholder="XXX-XXXXXXX" rounded> </b-input>
          </b-field>
          <div
            class="fixedbuttons"
            style="justify-content: center; margin-top: 2.5rem; margin-bottom: 4rem"
          >
            <b-button @click="addProfile()" rounded type="is-primary" size="is-medium" expanded>
              ถัดไป</b-button
            >
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Store from '../../store/index';

export default {
  name: 'RegisterContinuePage',
  Store,
  data() {
    return {
      weight: 0,
      height: 0,
      first_name: '',
      last_name: '',
      id_card_number: '',
      selected_date: new Date(),
      blood_group: '',
      medication_condition: '',
      phone_num: '',
      emergency_contact: '',
      emergency_phone_num: '',
      pic: '',
      modifyDate: dayjs(this.selected_date).toISOString(),
      file: null,
      preview: null,
      image: null,
    };
  },
  methods: {
    async addProfile() {
      // const user =  this.$store.getters.username,
      // eslint-disable-next-line no-unused-vars
      const result = await axios
        .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/register', {
          username: this.$store.getters.username,
          password: this.$store.getters.password,
          firstName: this.first_name,
          lastName: this.last_name,
          idCardNumber: this.id_card_number,
          birthDate: this.selected_date,
          bloodGroup: this.blood_group,
          medicationCondition: this.medication_condition,
          weight: this.weight,
          height: this.height,
          bmi: this.calBMI,
          phoneNum: this.phone_num,
          emergencyContact: this.emergency_contact,
          emergencyPhoneNum: this.emergency_phone_num,
          pic: this.pic,
        })
        .then(() =>
          // eslint-disable-next-line no-shadow
          // eslint-disable-next-line no-unused-vars
          // eslint-disable-next-line implicit-arrow-linebreak
          axios.post('https://senior-project-api-gl8ig.ondigitalocean.app/api/auth/sign-in', {
            // console.log(result.data);
            username: this.$store.getters.username,
            password: this.$store.getters.password,
          })).then((res) => {
          localStorage.setItem('token', res.data.accessToken);
          this.$store.dispatch('user', res.data);
          console.warn(localStorage.getItem('token'));
          this.$router.push('/question');
          // console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
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
      this.pic = result.data;
      console.warn(result);
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
  },
  computed: {
    calBMI() {
      const bmi = parseFloat(this.weight / (this.height / 100) ** 2).toFixed(2);
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
  },
  // watch: {
  //   $data: {
  //     // This will let Vue know to look inside the array
  //     deep: true,
  //     // We have to move our method to a handler field
  //     handler(val) {
  //       this.debounceInput(val);
  //       console.log('The form has changed!');
  //     },
  //   },
  // },
};
</script>

<style>
.input {
  margin-bottom: 0.5rem;
}
</style>
