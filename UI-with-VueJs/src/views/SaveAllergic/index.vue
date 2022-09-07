<template>
  <section
    class="hero is-white is-fullheight-with-navbar"
    style="border-radius: 60px 60px 0 0; margin-top: 1rem"
  >
    <div class="container" style="margin: 0 50px">
      <div class="content">
        <br />
        <h2>บันทึกรายการยาที่แพ้</h2>
      </div>
      <div>
        <b-image
          :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${this.$store.getters.searchdrugs.pic}`"
          alt="The Buefy Logo"
          :rounded="rounded"
        ></b-image>
      </div>

      <div>
        <div class="content has-text-black">
          <br />
          <br />
          <strong><h3>ชื่อยาสามัญ</h3></strong>
          <strong
            ><h5>{{ this.$store.getters.searchdrugs.genericName }}</h5></strong
          >
          <hr />
          <!-- <div class="box"> -->
          <b-field label="อาการที่แพ้" label-position="on-border">
            <b-input v-model="symptom" placeholder="มีผื่นแดงรอบปาก" rounded> </b-input>
          </b-field>
          <b-field label="สถานที่ได้รับ" label-position="on-border">
            <b-input v-model="place" placeholder="โรงพยาบาลจุฬาภรณ์" rounded> </b-input>
          </b-field>
          <b-field label="บันทึกเพิ่มเติม" label-position="on-border">
            <b-input v-model="more" placeholder="ตัวอย่าง มีผื่นแดงรอบปาก" rounded> </b-input>
          </b-field>
          <br />
          <br />
          <!-- </div> -->
          <!-- <div class="buttons has-addons is-centered">
            <b-button class="button" size="is-medium" type="is-primary is-light">บันทึก</b-button>
          </div> -->
          <div class="fixedbuttons" style="justify-content: center">
            <b-button
              @click="addAllergicDrug()"
              rounded
              type="is-primary"
              size="is-medium"
              expanded
            >
              บันทึก</b-button
            >
            <div class="pb-5 pt-5"></div>
          </div>
        </div>
      </div>

      <!-- </div> -->
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SaveAllergic',
  data() {
    return {
      symptom: '',
      place: '',
      more: '',
    };
  },
  methods: {
    async addAllergicDrug() {
      await axios
        .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/allergic-drug', {
          drugId: this.$store.getters.searchdrugs.id,
          symptom: this.symptom,
          place: this.place,
          more: this.more,
        })
        .then((response) => {
          this.$router.push('/allergic-drug');
          console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
    },
  },
};
</script>

<style></style>
