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
          <div class="content is-medium">
            <!-- <br> -->
            <h1 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
              คำถามรักษาความปลอดภัย
            </h1>
            <p></p>
            <!-- <h6 style="font-size:1rem; text-align:center">Welcome back you've been missed</h6> -->
          </div>
          <form class="box">
            <b-field label="คำใบ้">
              <b-input v-model="hint" rounded expanded placeholder="เพิ่มคำใบ้"></b-input>
            </b-field>
            <p style="margin-left: 10px"><strong>ตัวอย่าง</strong></p>
            <p style="margin-left: 20px">คำถาม สัตว์์เลี้ยงตัวแรกแรกชื่อว่าอะไร</p>
            <p style="margin-left: 20px">คำตอบ บัวลอย</p>
            <p style="margin-left: 20px">คำใบ้ ขนมไทยในน้ำกะทิ</p>

            <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
              <router-link to="/register3"
                ><b-button @click="addHint()" rounded type="is-primary" size="is-medium" expanded>
                  บันทึก</b-button
                ></router-link
              >
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuestionPage2',
  data() {
    return {
      hint: '',
    };
  },
  methods: {
    async addHint() {
      const result = await axios.post('https://senior-project-api-gl8ig.ondigitalocean.app/hint', {
        hint: this.hint,
      });
      console.warn(result);
    },
  },
};
</script>

<style></style>
