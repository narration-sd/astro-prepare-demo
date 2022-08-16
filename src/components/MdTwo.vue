<template>
  <div>
    <NoLibs msg="though I do have a message, that I and this Date Picker are client-only..."/>
    <div class="espace">
      <h2>Last, we have a date, pinia persisted, per page:</h2>
<!--      <p>date in store: {{ dateStoreDate }}</p>-->
    </div>
    <div v-if="isMounted">
      <Datepicker v-model="dateStore.date" />
    </div>
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
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import NoLibs from "../components/NoLibs.vue";
import { useDateStore } from "../stores/dateStore.ts"
import { ref, onMounted } from 'vue'

const dateStore = useDateStore()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

</script>

<script>

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
  // *todo* see MdThree about formatted out completely tbd
  // data: function () {
  //   return {
  //     // *todd* n.b. doc why we use toString(), that the Date and String mismatch warns
  //     // or is that actually it?
  //     dateStore: (this.formatted ? useDateStore() : { date: new Date ().toString()} ),
  //   }
  // },
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
