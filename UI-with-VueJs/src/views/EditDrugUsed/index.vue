<template>
  <section
    class="hero is-white is-fullheight-with-navbar"
    style="border-radius: 60px 60px 0 0; margin-top: 1rem"
  >
    <div class="container" style="margin: 0 45px">
      <div class="content">
        <br />
        <h2>แก้ไขรายการยาปัจจุบัน</h2>
      </div>
      <div>
        <b-image
          id="currentlyDrugImageStyle"
          :src="`https://senior-project-api-gl8ig.ondigitalocean.app/api/storage?key=${this.currentlyDrug.pic}`"
          alt="The Buefy Logo"
        >
        </b-image>
      </div>

      <div>
        <div class="content has-text-black">
          <br />
          <br />
          <strong><h3>ชื่อยาสามัญ</h3></strong>
          <strong
            ><h5>{{ currentlyDrug.genericName }}</h5></strong
          >
          <hr />
          <div style="margin-top: 1rem; padding: 0rem">
            <b-field label="วันที่ได้รับยา" label-position="on-border">
              <b-datepicker
                v-model="currentlyDrug.receiveDate"
                placeholder="Click to select..."
                icon="calendar-today"
                rounded
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="สถานที่ได้รับ" label-position="on-border">
              <b-input v-model="currentlyDrug.receivePlace" placeholder="XXXXXXXXX" rounded>
              </b-input>
            </b-field>
            <b-field label="บันทึกเพิ่มเติม" label-position="on-border">
              <b-input v-model="currentlyDrug.more" placeholder="ตัวอย่าง มีผื่นแดงรอบปาก" rounded>
              </b-input>
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
                </div>
                <!-- <b-field label="ทุกๆ">
                  <b-input placeholder="6 ชั่วโมง (ใส่แค่ตัวเลข)" rounded trap-focus></b-input>
                </b-field> -->
                <br />
              </div>
              <br />
            </div>
          </section>

          <div class="fixedbuttons" style="justify-content: center">
              <b-button
                @click="updateDrug1()"
                type="is-primary is-light"
                size="is-medium"
                rounded
                expanded
              >
                บันทึก</b-button
              >
            <br />
            <b-button
                @click="deleteDrug()"
                type="is-danger is-light"
                size="is-medium"
                rounded
                expanded
              >
                ลบรายการยานี้</b-button
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
  name: 'EditDrugUsed',
  data: () => ({
    isHide: false,
    currentlyDrug: {},
    drugAlert: [],
    tabs: Number(),
    takesGroup: '',
    timeGroup: '',
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getEditDrugUSedAPI();
      console.warn(to, from);
    });
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.currentlyDrug = null;
  //   // this.name = null;
  //   this.getEditDrugUSedAPI();
  //   next();
  // },
  // mounted() {
  //   axios
  //     .get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.$store.getters.editdrug.id}`)
  //     .then((response) => {
  //       this.currentlyDrug = response.data;
  //       this.currentlyDrug.pic = this.$store.getters.editdrug.pic;
  //       this.currentlyDrug.receiveDate = new Date(this.currentlyDrug.receiveDate);
  //       this.takesGroup.push(this.currentlyDrug.drugAlert.take);
  //       this.timeGroup.push(this.currentlyDrug.drugAlert.time);
  //       //
  //       this.tabs = this.currentlyDrug.drugAlert.tabs;
  //       if (this.currentlyDrug.drugAlert === null) {
  //         this.isHide = false;
  //       } else {
  //         this.isHide = true;
  //       }
  //       console.log(this.currentlyDrug.receiveDate);
  //     });
  // },
  methods: {
    getEditDrugUSedAPI() {
      axios
        .get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.$store.getters.editdrug.id}`)
        .then((response) => {
          this.currentlyDrug = response.data;
          this.currentlyDrug.pic = this.$store.getters.editdrug.pic;
          this.currentlyDrug.receiveDate = new Date(this.currentlyDrug.receiveDate);
          this.isHide = this.currentlyDrug.alertStatus;
          if (response.data.drugAlert !== null && response.data.alertStatus === false) {
            // this.takesGroup.push(this.currentlyDrug.drugAlert.take);
            this.takesGroup = '';
            this.timeGroup = '';
            this.tabs = Number();
          } else {
            this.takesGroup = this.currentlyDrug.drugAlert.take;
            this.timeGroup = this.currentlyDrug.drugAlert.time;
            this.tabs = this.currentlyDrug.drugAlert.tabs;
          }
          // this.takesGroup.push(this.currentlyDrug.drugAlert.take);
          // this.timeGroup.push(this.currentlyDrug.drugAlert.time);
          // this.tabs = this.currentlyDrug.drugAlert.tabs;
          // this.takesGroup = this.currentlyDrug.drugAlert.take;
          // this.timeGroup = this.currentlyDrug.drugAlert.time;
          // if (this.currentlyDrug.drugAlert === null) {
          //   this.isHide = false;
          // } else {
          //   this.isHide = true;
          // }
          // console.log(this.currentlyDrug.receiveDate);
        });
    },
    async updateDrug1() {
      if (this.currentlyDrug.alertStatus === false) {
        if (this.isHide === false) {
          console.warn('a', this.currentlyDrug);
          // eslint-disable-next-line no-unused-vars
          const result = await axios.patch(
            `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
            {
              more: this.currentlyDrug.more,
              receiveDate: this.currentlyDrug.receiveDate,
              receivePlace: this.currentlyDrug.receivePlace,
              alertStatus: this.isHide,
            },
          ).then((response) => {
            this.$router.push('/currently-drug');
            console.log(response);
          })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error.response.data.message);
              console.log(error.response.data.message);
            });
        } else if (this.isHide !== false) {
          if (this.currentlyDrug.drugAlert !== null) {
            console.warn('x', this.currentlyDrug, this.takesGroup);
            // eslint-disable-next-line no-unused-vars
            const result2 = await axios.patch(
              `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/update`,
              {
                tabs: this.tabs,
                take: this.takesGroup,
                time: this.timeGroup,
              },
            );
            // eslint-disable-next-line no-unused-vars
            const result = await axios.patch(
              `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
              {
                more: this.currentlyDrug.more,
                receiveDate: this.currentlyDrug.receiveDate,
                receivePlace: this.currentlyDrug.receivePlace,
                alertStatus: this.isHide,
              },
            ).then((response) => {
              this.$router.push('/currently-drug');
              console.log(response);
            })
              .catch((error) => {
                // eslint-disable-next-line no-alert
                alert(error.response.data.message);
                console.log(error.response.data.message);
              });
          } else {
            console.warn('b', this.currentlyDrug, this.takesGroup);
            await axios
              .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert', {
                drugCurrentlyUsedId: this.currentlyDrug.id,
                tabs: this.tabs,
                take: this.takesGroup,
                time: this.timeGroup,
              });
            // eslint-disable-next-line no-unused-vars
            const result = await axios.patch(
              `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
              {
                more: this.currentlyDrug.more,
                receiveDate: this.currentlyDrug.receiveDate,
                receivePlace: this.currentlyDrug.receivePlace,
                alertStatus: this.isHide,
              },
            ).then((response) => {
              this.$router.push('/currently-drug');
              console.log(response);
            })
              .catch((error) => {
                // eslint-disable-next-line no-alert
                alert(error.response.data.message);
                console.log(error.response.data.message);
              });
          }
        }
      } else if (this.currentlyDrug.alertStatus === true) {
        if (this.isHide === false) {
          console.warn('c', this.currentlyDrug, this.isHide);
          // eslint-disable-next-line no-unused-vars
          // const result2 = await axios.delete(
          //   `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/delete`,
          //   {},
          // );
          // eslint-disable-next-line no-unused-vars
          const result = await axios.patch(
            `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
            {
              more: this.currentlyDrug.more,
              receiveDate: this.currentlyDrug.receiveDate,
              receivePlace: this.currentlyDrug.receivePlace,
              alertStatus: this.isHide,
            },
          ).then((response) => {
            this.$router.push('/currently-drug');
            console.log(response.data.alertStatus);
          })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error.response.data.message);
              console.log(error.response.data.message);
            });
          // eslint-disable-next-line no-unused-vars
          // const result2 = await axios.delete(
          //   `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/delete`,
          //   {},
          // ).then((response) => {
          //   this.$router.push('/currently-drug');
          //   console.log(response);
          // })
          //   .catch((error) => {
          //     // eslint-disable-next-line no-alert
          //     alert(error.response.data.message);
          //     console.log(error.response.data.message);
          //   });
        } else {
          console.warn('d', this.currentlyDrug, this.takesGroup);
          // eslint-disable-next-line no-unused-vars
          const result2 = await axios.patch(
            `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/update`,
            {
              tabs: this.tabs,
              take: this.takesGroup,
              time: this.timeGroup,
            },
          );
          // eslint-disable-next-line no-unused-vars
          const result = await axios.patch(
            `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
            {
              more: this.currentlyDrug.more,
              receiveDate: this.currentlyDrug.receiveDate,
              receivePlace: this.currentlyDrug.receivePlace,
              alertStatus: this.isHide,
            },
          ).then((response) => {
            this.$router.push('/currently-drug');
            console.log(response);
          })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error.response.data.message);
              console.log(error.response.data.message);
            });
        }
      }
    },
    // async updateDrug() {
    //   if (this.isHide === true && this.currentlyDrug.drugAlert === null) {
    //     console.warn('a', this.currentlyDrug.drugAlert.id);
    //     await axios
    //       .post('https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert', {
    //         drugCurrentlyUsedId: this.currentlyDrug.id,
    //         tabs: this.tabs,
    //         take: this.takesGroup[0],
    //         time: this.timeGroup[0],
    //       });
    //   } else if (this.isHide === true && this.currentlyDrug.drugAlert !== null) {
    //     console.warn('b', this.currentlyDrug.drugAlert.id);
    //     // eslint-disable-next-line no-unused-vars
    //     const result2 = await axios.patch(
    //       `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/update`,
    //       {
    //         tabs: this.tabs,
    //         take: this.takesGroup[0],
    //         time: this.timeGroup[0],
    //       },
    //     );
    //   } else {
    //     console.warn('c', this.currentlyDrug.drugAlert.id);
    //     // eslint-disable-next-line no-unused-vars
    //     const result2 = await axios.delete(
    //       `https://senior-project-api-gl8ig.ondigitalocean.app/api/drug-alert/${this.currentlyDrug.drugAlert.id}/delete`,
    //       {},
    //     );
    //   }
    //   // eslint-disable-next-line no-unused-vars
    //   const result = await axios.patch(
    //     `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/update`,
    //     {
    //       more: this.currentlyDrug.more,
    //       receiveDate: this.currentlyDrug.receiveDate,
    //       receivePlace: this.currentlyDrug.receivePlace,
    //       alertStatus: this.isHide,
    //     },
    //   ).then((response) => {
    //     this.$router.push('/currently-drug');
    //     console.log(response);
    //   })
    //     .catch((error) => {
    //       // eslint-disable-next-line no-alert
    //       alert(error.response.data.message);
    //       console.log(error.response.data.message);
    //     });
    // },
    async deleteDrug() {
      await axios.delete(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/delete`,
        {},
      // eslint-disable-next-line no-unused-vars
      ).then((response) => {
        this.$router.push('/currently-drug');
        // window.location.reload();
        // this.$router.push('/currently-drug');
        // console.log(response);
      })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          // console.log(error.response.data.message);
        });
      // eslint-disable-next-line no-unused-vars
      // const result = await axios.delete(
      //   `https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug/${this.currentlyDrug.id}/delete`,
      //   {},
      // ).then((response) => {
      //   this.$router.push('/currently-drug');
      //   console.log(response);
      // })
      //   .catch((error) => {
      //     // eslint-disable-next-line no-alert
      //     alert(error.response.data.message);
      //     console.log(error.response.data.message);
      //   });
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
/* .figure {
  text-align: -webkit-center;
} */
#currentlyDrugImageStyle > img {
  height: auto;
  width: auto;
}
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
