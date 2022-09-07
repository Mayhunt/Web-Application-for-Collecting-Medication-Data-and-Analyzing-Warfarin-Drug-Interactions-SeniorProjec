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
            <h1 style="text-align: center; margin-bottom: 0.25rem; padding: 1rem">
              คำถามรักษาความปลอดภัย
            </h1>
            <p
              style="
                text-align: center;
                margin-bottom: 0.25rem;
                padding-left: 2rem;
                padding-right: 2rem;
              "
            >
              คำถามรักษาความปลอดภัยตั้งขึ้นเพื่อใช้ในการยืนยันตัวตนในกรณีที่ผู้ใช้งานลืมรหัสผ่านในการเข้าใช้งาน
            </p>
            <!-- <h6 style="font-size:1rem; text-align:center">Welcome back you've been missed</h6> -->
          </div>
          <form class="box">
            <b-field label="คำถาม">
              <b-select
                v-model="question"
                rounded
                expanded
                required
                placeholder="Select a Question"
                icon="question"
                icon-pack="fas"
              >
                <option value="question1">สัตว์เลี้ยงตัวแรกชื่อว่าอะไร</option>
                <option value="question2">บ้านเกิดของคุณคือที่ไหน</option>
                <option value="question3">อาหารที่คุณชอบรับประทานที่สุดคือเมนูใด</option>
                <option value="question4">เพื่อนสนิทของคุณชื่ออะไร</option>
                <option value="question5">รถคันแรกของคุณสีอะไร</option>
              </b-select>
            </b-field>
            <b-field label="คำตอบ">
              <b-input v-model="answer" rounded expanded required placeholder="ใส่คำตอบ"></b-input>
            </b-field>

            <div class="buttons" style="justify-content: center">
              <b-button type="is-text"><router-link to="/hint">เพิ่มคำใบ้</router-link></b-button>
            </div>

            <!-- <div class="buttons" style="justify-content: right"><b-button type="is-text" size="is-small">Forget Password</b-button></div> -->
            <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
              <router-link to="/register3"
                ><b-button
                  @click="addQuestion()"
                  type="is-primary"
                  size="is-medium"
                  rounded
                  expanded
                >
                  ถัดไป</b-button
                ></router-link
              >
              <!-- <button class="button is-text">Register</button> -->
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
  name: 'QuestionPage',
  data() {
    return {
      question: '',
      answer: '',
      xxx: 'xxx',
    };
  },
  methods: {
    async addQuestion() {
      console.warn(localStorage.getItem('token'));
      // console.warn(localStorage.getItem('user'));
      console.warn(this.question, this.answer);
      const result = await axios.post(
        'https://senior-project-api-gl8ig.ondigitalocean.app/api/question',
        {
          question: this.xxx,
          answer: this.answer,
        },
      );
      console.warn(result);
      // console.warn(localStorage.getItem('token'));
    },
  },
};
</script>

<style></style>
