<template>
  <div>
    <Line v-bind:lables="labels" v-bind:datasets="datasets" v-bind:option="option"></Line>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  components: {
    Line,
  },
  data() {
    return {
      labels: ['inr'],
      datasets: [
        {
          data: [1, 2, 2.5, 2, 1.5],
        },
      ],
      option: {
        title: {
          display: true,
          position: 'buttom',
          text: 'inr graph',
        },
      },
    };
  },
};
</script>

<style></style>
