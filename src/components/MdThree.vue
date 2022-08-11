<template>
  <div>
    <NoLibs msg="but you can know the markdown is within in a client:only component this time..."/>
    <div class="espace">
      <NsdMarkdown :source="source" breaks />
    </div>
    <div class="espace">
      <h2>Last, we have a date, pinia persisted, also per page:</h2>
      <p>date in store: {{ dateStoreDate }}</p>
    </div>
    <Datepicker v-model="dateStore.date3" />
    <h4>...and we're done here also 🌿</h4>
  </div>
</template>

<style scoped>
.espace {
  margin: 10px 0;
  color: d
}
</style>

<script setup>
// import Mkdown from 'vue3-markdown-it'
import NsdMarkdown from '../components/NsdMarkdown.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import NoLibs from "../components/NoLibs.vue";
// import { useDateStore } from "../stores/dateStore.ts"
import {ref} from "vue";

// const dateStore = useDateStore()

</script>

<script>

import { useDateStore } from "../stores/dateStore";

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
    formatted: {
      type: Boolean,
      default: false,
    }
},
  data: function () {
    return {
      dateStore: (this.formatted ? useDateStore() : { date3: new Date ().toString() }),
    }
  },
  methods: {
  },
  computed: {
    dateStoreDate: function () {
      return new Date(this.dateStore.date3).toString()
    }
  },
  created: function () {
  },
  mounted() {
  }
}
</script>
