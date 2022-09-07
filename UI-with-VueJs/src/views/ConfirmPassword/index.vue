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
            <h1 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem; padding: 1rem">
              ยืนยันคำตอบเพื่อยืนยันตัวตน
            </h1>
            <p
              style="
                margin-top: 0;
                text-align: center;
                margin-bottom: 0.25rem;
                padding-left: 2rem;
                padding-right: 2rem;
              "
            >
              กรุณาใส่คำตอบของคำถามที่ท่านได้เคยได้ตั้งไว้
            </p>
            <!-- <h6 style="font-size:1rem; text-align:center">Welcome back you've been missed</h6> -->
          </div>
          <form class="box">
            <b-field label="คำถาม">
              <b-input rounded trap-focus disabled=""></b-input>
            </b-field>
            <b-field label="คำตอบ">
              <b-input v-model="answer" rounded expanded required placeholder="คำตอบ"></b-input>
            </b-field>

            <!-- <div class="buttons" style="justify-content: right"><b-button type="is-text" size="is-small">Forget Password</b-button></div> -->
            <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
              <router-link to="/sign-in"
                ><b-button type="is-primary" size="is-medium" rounded expanded>
                  ยืนยันคำตอบ</b-button
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
export default {
  name: 'ConfirmPassword',
};
</script>

<style></style>
