<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div style="background-color: rgb(121, 87, 213)">
      <b-collapse
        class="card"
        animation="slide"
        v-model="isOpen"
        aria-id="contentIdForA11y3"
        style="background-color: rgb(121, 87, 213)"
      >
        <template #trigger="props">
          <div
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
            :aria-expanded ="isOpen"
            style="font-family: 'Kanit'"
          >
            <p class="card-header-title" style="color: white">
              <font size="6">รายการยาวันนี้&ensp;<b-icon pack="fas" icon="tablets"></b-icon></font>
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>

        <div class="card-content" style="padding: 18px">
          <div class="content" style="font-family: 'Kanit'; color: white">
            <strong
              >เช้า&emsp;<b-icon type="is-warning" pack="mdi" icon="weather-partly-cloudy"></b-icon>
            </strong>
            <div v-for="(schedule, index) in drugSchedule" :key="index">
              <p v-if="schedule.drugAlert.time === 'Breakfast'">
                &emsp;-&ensp;{{ schedule.genericName }}
              </p>
            </div>
            <br />
            <strong
              >กลางวัน&emsp;<b-icon type="is-warning" pack="mdi" icon="weather-sunny"></b-icon>
            </strong>
            <div v-for="(schedule, index) in drugSchedule" :key="index">
              <p v-if="schedule.drugAlert.time === 'Lunch'">
                &emsp;-&ensp;{{ schedule.genericName }}
              </p>
            </div>
            <br />
            <strong
              >เย็น&emsp;<b-icon type="is-warning" pack="mdi" icon="weather-night"></b-icon>
            </strong>
            <div v-for="(schedule, index) in drugSchedule" :key="index">
              <p v-if="schedule.drugAlert.time === 'Dinner'">
                &emsp;-&ensp;{{ schedule.genericName }}
              </p>
            </div>
            <br />
            <strong>ก่อนนอน&emsp;<b-icon type="is-warning" pack="mdi" icon="bed"></b-icon> </strong>
            <div v-for="(schedule, index) in drugSchedule" :key="index">
              <p v-if="schedule.drugAlert.time === 'Before Bed'">
                &emsp;-&ensp;{{ schedule.genericName }}
              </p>
            </div>
          </div>
        </div>
      </b-collapse>

      <section
        class="hero is-white is-fullheight-with-navbar"
        style="border-radius: 60px 60px 0 0; margin-top: 1rem"
      >
        <div class="container" style="margin: 0 20px">
          <div class="content is-medium" style="font-family: 'Kanit'">
            <br />
            <h2 style="margin-top: 0">INR</h2>
          </div>
          <div class="INRChart">
            <GChart
              type="LineChart"
              :options="options"
              style="justify-content:center"
              :data="chartData"
              @ready="onChartReady"
            />
          </div>

          <div class="media-content" style="margin-top: 12px">
            <b-table
              :data="data"
              :narrowed="isNarrowed"
              :hoverable="isHoverable"
              :loading="isLoading"
              :selected.sync="selected"
              :mobile-cards="hasMobileCards"
              style="table-cell-border: 0"
            >
              <b-table-column
                field="date"
                label="วันที่"
                :th-attrs="dateThAttrs"
                :td-attrs="columnTdAttrs"
                centered
                v-slot="props"
              >
                <span class="tag is-primary is-light">
                  {{ new Date(props.row.followDate).toLocaleDateString() }}
                </span>
              </b-table-column>

              <b-table-column
                field="expectedINR"
                label="ค่า INR ที่คาดหวัง"
                :td-attrs="columnTdAttrs"
                centered
                v-slot="props"
              >
                {{ props.row.inrExpect }}
              </b-table-column>

              <b-table-column
                field="actualINR"
                label="ค่า INR ที่วัดได้"
                :td-attrs="columnTdAttrs"
                centered
                v-slot="props"
              >
                {{ props.row.inrMeasure }}
              </b-table-column>
            </b-table>
          </div>
          <div class="buttons" style="justify-content: center,font-family: 'Kanit'">
            <b-button
              rounded
              label="บันทึกค่า INR"
              type="is-primary"
              size="is-medium"
              @click="isCardModalActive = true"
              expanded
              style="margin-top: 20px"
            />
            <!-- popup-add inr -->
            <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
              <div class="card">
                <div>
                  <section
                    class="hero is-white"
                    style="border-radius: 60px 60px 0 0; margin-top: 1rem; padding: 1rem"
                  >
                    <div>
                      <div class="content is-medium">
                        <h1 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
                          บันทึกค่า INR
                        </h1>
                      </div>
                      <form class="box">
                        <b-field label="วันที่">
                          <b-datepicker
                            v-model="selectedDate"
                            placeholder="เลือกวันที่."
                            icon="calendar-today"
                            rounded
                            trap-focus
                          >
                          </b-datepicker>
                        </b-field>

                        <b-field label="ค่า INR ที่คาดหวัง">
                          <b-input
                            v-model.number="inrExpect"
                            placeholder="ใส่ค่า INR ที่คาดหวัง"
                            rounded
                            trap-focus
                          ></b-input>
                        </b-field>

                        <b-field label="ค่า INR ที่วัดได้จริง">
                          <b-input
                            placeholder="ใส่ค่า INR ที่วัดได้จริง"
                            rounded
                            trap-focus
                            v-model.number="inrMeasure"
                          ></b-input>
                        </b-field>
                        <div class="fixedbuttons" style="justify-content: center; margin-top: 2rem">
                          <b-button
                            @click="addInr()"
                            rounded
                            type="is-primary"
                            size="is-medium"
                            expanded
                            >บันทึก</b-button
                          >
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </b-modal>

            <!-- popup edit inr -->
            <b-modal v-model="isCardModalActive2" :width="640" scroll="keep">
              <div class="card">
                <div>
                  <section
                    class="hero is-white"
                    style="border-radius: 60px 60px 0 0; margin-top: 1rem; padding: 1rem"
                  >
                    <div>
                      <div class="content is-medium">
                        <h1 style="margin-top: 0; text-align: center; margin-bottom: 0.25rem">
                          แก้ไขค่า INR
                        </h1>
                      </div>
                      <form class="box">
                        <b-field label="วันที่">
                          <b-datepicker
                            v-model="selected.followDate"
                            placeholder="เลือกวันที่."
                            icon="calendar-today"
                            rounded
                            trap-focus
                          >
                          </b-datepicker>
                        </b-field>

                        <b-field label="ค่า INR ที่คาดหวัง">
                          <b-input v-model="selected.inrExpect" rounded trap-focus></b-input>
                        </b-field>

                        <b-field label="ค่า INR ที่วัดได้จริง">
                          <b-input
                            v-model="selected.inrMeasure"
                            placeholder="ใส่ค่า INR ที่วัดได้จริง"
                            rounded
                            trap-focus
                          ></b-input>
                        </b-field>
                        <div class="buttons" style="justify-content: center; margin-top: 2rem">
                          <b-button
                            class="button"
                            @click="
                              isCardModalActive2 = false;
                              updateInr();
                            "
                            type="is-primary"
                            size="is-medium"
                            rounded
                            expanded
                            >บันทึก
                          </b-button>
                          <b-button
                            class="button"
                            @click="
                              isCardModalActive2 = false;
                              deleteInr();
                            "
                            type="is-danger"
                            size="is-medium"
                            rounded
                            expanded
                            >ลบรายการนี้</b-button
                          >
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script>
import { GChart } from 'vue-google-charts';
// import axios from 'axios';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: 'HomePage',
  components: {
    GChart,
  },
  data() {
    return {
      // tox = '',
      // fromx = '',
      c: '',
      // chartData: new google.visualization.DataTable(),
      drugSchedule: [],
      selectedDate: new Date(),
      inrMeasure: Number(),
      inrExpect: Number(),
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: false,
      isCardModalActive: false,
      isCardModalActive2: false,
      isOpen: false,
      selected: { id: '', inrMeasure: Number(), inrExpect: Number(), followDate: new Date() },
      data: [],
      finalData: [],
      chartData: [],
      options: {
        // title: ''
        // width: 350,
        // height: 300,
        curveType: 'function', // curve
        lineWidth: 4,
        legend: { position: 'bottom' },
        // colors: ['#F1E065,#FF89E2'],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getINRAPI();
      vm.getCurrentlyAPI();
      vm.route(to,from);
      // const fromx = from;
      // const tox = to;
      console.warn(to, '...' , from)
      // vm.drawData();
      // console.warn(a);
    });
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.getINRAPI();
  //   this.getCurrentlyAPI();
  //   // this.name = null;
  //   // this.getEditDrugUSedAPI();
  //   next();
  // },
  computed: {
    ...mapGetters(['user']),
    // sampleFormat() {
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   this.data.followDate = new Date(this.data.followDate);
    //   return this.data.followDate
    // },
  },
  methods: {
    route(to,from) {
      this.tox = to.name;
      this.fromx = from.name;
      console.warn(this.tox);
      this.c = 'change';
    },
    getINRAPI() {
      console.warn(localStorage.getItem('token'));
      axios.get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/inr`).then((response) => {
      this.data = response.data;
      // console.warn(this.data[0].followDate)
      // this.data[0].followDate = new Date(this.data[0].followDate);
      // console.warn(this.data[0].followDate)
      var round = 1;
      var roundDate = 0;
      this.finalData =[],
      this.data.forEach((item) => {
        this.data[roundDate].followDate = new Date(this.data[roundDate].followDate);
        this.finalData.push([round, Number(item.inrMeasure), Number(item.inrExpect)]);
        round = round + 1;
        roundDate = roundDate + 1;
      });
      this.chartData = new google.visualization.DataTable();
      this.chartData.addColumn('number', 'round');
      this.chartData.addColumn('number', 'ค่า INR ที่วัดได้');
      this.chartData.addColumn('number', 'ค่า INR ที่คาดหวัง');
      this.chartData.addRows(this.finalData);
      // console.warn(to);
    });
    },
    getCurrentlyAPI() {
      axios
      .get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug`)
      .then((response) => {
        for (const i of response.data) {
          if (i.alertStatus === true) {
            this.drugSchedule.push(i);
          }
        }
        // console.warn(this.drugSchedule);
      });
    },
    async addInr() {
      const result = await axios
        .post(`https://senior-project-api-gl8ig.ondigitalocean.app/api/inr`, {
          followDate: this.selectedDate,
          inrExpect: this.inrExpect,
          inrMeasure: this.inrMeasure,
        })
        .then((response) => {
          window.location.reload();
          // this.$router.push('/currently-dru');
          console.log(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.response.data.message);
          console.log(error.response.data.message);
        });
      // console.warn(result);
    },
    async updateInr() {
      const result = await axios.patch(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/inr/${this.selected.id}/update`,
        {
          followDate: this.selected.followDate,
          inrExpect: this.selected.inrExpect,
          inrMeasure: this.selected.inrMeasure,
        },
      ).then((response) => {
        window.location.reload();
            // this.$router.push('/currently-drug');
            console.log(response);
          })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error.response.data.message);
              console.log(error.response.data.message);
            });
      console.warn(result);
    },
    async deleteInr() {
      const result = await axios.delete(
        `https://senior-project-api-gl8ig.ondigitalocean.app/api/inr/${this.selected.id}/delete`,
        {},
      ).then((response) => {
        window.location.reload();
            // this.$router.push('/currently-drug');
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
    // testData() {
    //   var round = 1;
    //   this.data.forEach((item) => {
    //     this.finalData.push([round, item.id, item.inrMeasure, inrExpect]);
    //     round = round + 1;
    //     // console.warn(this.finalData)
    //   });
    //   console.warn(this.finalData);
    //   // this.data.forEach((item) => this.finalData.push([item.id,item.genericName]));
    //   // console.warn(this.finalData)
    // },
    drawData() {
      console.warn('a');
      // var round = 1;
      // this.data.forEach((item) => {
      //   this.finalData.push([round, Number(item.inrMeasure), Number(item.inrExpect)]);
      //   round = round + 1;
      // });
      console.warn(this.finalData);
      // this.chartData = new google.visualization.DataTable();
      // this.chartData.addColumn('number', 'round');
      // this.chartData.addColumn('number', 'ค่า INR ที่วัดได้');
      // this.chartData.addColumn('number', 'ค่า INR ที่คาดหวัง');
      // this.chartData.addRows(this.finalData);
      console.warn(this.chartData)
    },
  },
  watch: {
    // whenever question changes, this function will run
    selected() {
      console.warn(this.selected)
      // this.selected = new Date(this.selected.followDate)
      // selected.followDate = new Date(selected.followDate)
      return (this.isCardModalActive2 = true);
      // console.warn(this.selected)
    },
    c() {
       console.warn('bbbb')
        if (this.tox ==='Home' && (this.fromx === 'Login' || this.fromx === 'Register3' || this.fromx === 'Question' || this.fromx === 'Question2')) {
          console.warn(this.tox.name,this.fromx.name);
          window.location.reload();
        }
    },
    // '$route' (to, from) {
    //   console.warn('aaaa')
    //     if (to.name === 'Home' && from.name === 'Login') {
    //       window.location.reload();
    //     }
    //   }
  },
  // mounted() {
  //   axios.get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/inr`).then((response) => {
  //     this.data = response.data;
  //     console.warn(response);
  //   });
  //   axios
  //     .get(`https://senior-project-api-gl8ig.ondigitalocean.app/api/currently-drug`)
  //     .then((response) => {
  //       for (const i of response.data) {
  //         if (i.drugAlert !== null) {
  //           this.drugSchedule.push(i);
  //         }
  //       }
  //       // console.warn(this.drugSchedule);
  //     });
  // },
};
</script>

<style>
.fixedbutton {
  position: fixed;
  padding-left: 15px;
  padding-right: 15px;
  left: 0%;
  bottom: 0px;
  width: 100%;
  height: 15%;
}
.table tr.is-selected td,
.table tr.is-selected th {
  color: rgb(121, 87, 213);
  border: 0;
  border-color: transparent;
  background-color: #f2effb;
  text-decoration-style: solid;
}
.INRChart {
  height: 100%;
  width: auto;
  align-content: center !important;
}
</style>
