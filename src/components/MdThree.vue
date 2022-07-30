<template>
  <div>
    <NoLibs />
    <div class="espace">
      <Mkdown :source="source" breaks />
    </div>
    <div class="espace">
      <h2>Last, we have a date, pinia persisted, also per page:</h2>
      <p>date in store: {{ dateStore.date3 }}</p>
    </div>
    <Datepicker v-model="dateStore.date3" />
    <h4>...and we're done</h4>
  </div>
</template>

<style scoped>
.espace {
  margin: 10px 0;
  color: d
}
</style>

<script setup>
import Mkdown from 'vue3-markdown-it'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import NoLibs from "../components/NoLibs.vue";
import { useDateStore } from "../stores/dateStore.ts"
import {ref} from "vue";

const dateStore = useDateStore()

</script>

<script>

export default {
  name: 'MdThree',
  props: {
    source: {
      type: String,
      default: 'no source prop yet!'
    },
    date: {
      type: Object,
      // default: function () { return  ref(new Date()) }
      default: function () { return  new Date() }
    },
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created: function () {
  },
  mounted() {
  }
}
</script>
