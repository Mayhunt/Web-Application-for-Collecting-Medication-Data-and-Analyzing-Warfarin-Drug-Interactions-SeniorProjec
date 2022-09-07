<template>
  <section
    class="hero is-white is-fullheight-with-navbar"
    style="border-radius: 60px 60px 0 0; margin-top: 1rem"
  >
    <div class="container" style="margin: 0 45px">
      <div class="content">
        <br />
        <h2>บันทึกรายการยาปัจจุบัน</h2>
      </div>
      <div>
        <b-image
          :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${this.$store.getters.searchdrugs.pic}`"
          alt="The Buefy Logo"
          :rounded="rounded"
        >
        </b-image>
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
          <div style="margin-top: 1rem; padding: 0rem">
            <b-field label="วันที่ได้รับยา" label-position="on-border">
              <b-datepicker
                v-model="selectedDate"
                placeholder="Click to select..."
                icon="calendar-today"
                rounded
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="สถานที่ได้รับ" label-position="on-border">
              <b-input v-model="receive_place" placeholder="ตัวอย่าง โรงพยาบาลจุฬาภรณ์" rounded>
              </b-input>
            </b-field>
            <b-field label="บันทึกเพิ่มเติม" label-position="on-border">
              <b-input v-model="more" placeholder="ตัวอย่าง มีผื่นแดงรอบปาก" rounded> </b-input>
            </b-field>
            <hr />
          </div>

          <section>
            <div class="control">
              <b-field>
                <b-switch size="is-medium" type="is-success" v-model="isHide"
                  >การตั้งแจ้งเตือนเวลาทานยา</b-switch
                >
              </b-field>
              <br />

              <div v-if="isHide">
                <b-field label="จำนวนยา" label-position="on-border">
                  <b-input v-model.number="tabs" placeholder=" 2 เม็ด" rounded> </b-input>
                </b-field>
                <b-field grouped position="is-center">
                  <b-radio-button
                    class="takes"
                    v-model="takesGroup"
                    native-value="before meal"
                    type="is-primary is-light"
                  >
                    <span>ก่อนอาหาร</span>
                  </b-radio-button>
                  <b-radio-button
                    class="takes"
                    v-model="takesGroup"
                    native-value="after meal"
                    type="is-primary is-light"
                  >
                    <span>หลังอาหาร</span>
                  </b-radio-button>
                </b-field>
                <!-- <div class="buttons">
                  <b-button rounded type="is-primary" outlined>ก่อนอาหาร</b-button>
                  <b-button rounded type="is-primary" outlined>หลังอาหาร</b-button>
                </div> -->
                <p>เวลา</p>
                <div>
                  <b-field grouped group-multiline position="is-center">
                    <b-radio-button
                      class="choose"
                      v-model="timeGroup"
                      native-value="Breakfast"
                      type="is-primary is-light"
                    >
                      <b-icon pack="mdi" icon="weather-partly-cloudy"></b-icon>
                      <span>เช้า</span>
                    </b-radio-button>
                    <b-radio-button
                      class="choose"
                      v-model="timeGroup"
                      native-value="Lunch"
                      type="is-primary is-light"
                    >
                      <b-icon pack="mdi" icon="weather-sunny"></b-icon>
                      <span>กลางวัน</span>
                    </b-radio-button>
                    <b-radio-button
                      class="choose"
                      v-model="timeGroup"
                      native-value="Dinner"
                      type="is-primary is-light"
                    >
                      <b-icon pack="mdi" icon="weather-night"></b-icon>
                      <span>เย็น</span>
                    </b-radio-button>
                    <b-radio-button
                      class="choose"
                      v-model="timeGroup"
                      native-value="Before Bed"
                      type="is-primary is-light"
                    >
                      <b-icon pack="mdi" icon="bed"></b-icon>
                      <span>ก่อนนอน</span>
                    </b-radio-button>
                  </b-field>
                  <!-- <b-field>
                    <b-checkbox size="is-medium" :value="false"> เช้า </b-checkbox>
                  </b-field>
                  <b-field>
                    <b-checkbox size="is-medium" :value="false"> กลางวัน </b-checkbox>
                  </b-field>
                  <b-field>
                    <b-checkbox size="is-medium" :value="false"> เย็น </b-checkbox>
                  </b-field>
                  <b-field>
                    <b-checkbox size="is-medium" :value="false"> ก่อนนอน</b-checkbox>
                  </b-field>
                </div>
                <b-field label="ทุกๆ">
                  <b-input placeholder="6 ชั่วโมง (ใส่แค่ตัวเลข)" rounded trap-focus></b-input>
                </b-field> -->
                </div>
              </div>
            </div>
          </section>
          <div class="pb-5 pt-5"></div>
          <div class="fixedbuttons" style="justify-content: center">
            <b-button
              @click="addCurrentlyDrug()"
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
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SaveDrug',
  data: () => ({
    isHide: false,
    selectedDate: new Date(),
    receive_place: '',
    more: '',
    tabs: Number(),
    takesGroup: '',
    timeGroup: '',
  }),
  methods: {
    async addCurrentlyDrug() {
      await axios
        .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug', {
          drugId: this.$store.getters.searchdrugs.id,
          receiveDate: this.selectedDate,
          receivePlace: this.receive_place,
          more: this.more,
          alertStatus: this.isHide,
        })
        .then((response) => {
          this.$router.push('/currently-drug');
          this.successCurrentlyDrugId = response.data.id;
          // console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
      // console.warn(this.successCurrentlyDrug);
      if (this.isHide === true) {
        await axios
          .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert', {
            drugCurrentlyUsedId: this.successCurrentlyDrugId,
            tabs: this.tabs,
            take: this.takesGroup,
            time: this.timeGroup,
          })
          .then((response) => {
            this.$router.push('/currently-drug');
            console.log(response);
          })
          .catch((error) => {
            // eslint-disable-next-line no-alert
            alert(error.response.data.message);
            console.log(error.response.data.message);
          });
      }
    },
  },
};
</script>

<style>
.option {
  font-family: 'Kanit';
}
.choose {
  /* margin-left: 10px; */
  width: 135px;
}
.takes {
  /* margin-left: 10px; */
  width: 140px;
}
.control-label {
  font-size: large;
}
</style>
