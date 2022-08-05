<template>
  <div>
    <NoLibs />
    <div class="espace">
      <Mkdown :source="source" breaks />
    </div>
    <div class="espace">
      <h2>Last, we have a date, pinia persisted, per page:</h2>
      <p>date in store: {{ dateStoreDate }}</p>
    </div>
    <Datepicker v-model="dateStore.date" />
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
// import { useDateStore } from "../stores/dateStore.ts"
import {ref} from "vue";

// const dateStore = useDateStore()

</script>

<script>

// *todo* anyway, how/why two imports of this?
import { useDateStore } from "../stores/dateStore";

export default {
  name: 'MdTwo',
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
      // *todd* n.b. doc why we use toString(), that the Date and String mismatch warns
      // or is that actually it?
      dateStore: (this.formatted ? useDateStore() : { date: new Date ().toString()} ),
    }
  },
  methods: {
  },
  computed: {
    dateStoreDate: function () {
      return new Date(this.dateStore.date).toString()
    }
  },
  created: function () {

  },
  mounted() {
  }
}
</script>
