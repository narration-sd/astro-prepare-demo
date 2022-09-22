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
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
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
})

const dateStore = useDateStore()
const isMounted = ref(false)

const dateStoreDate = computed (() => {
  return new Date(dateStore.date).toString()
})

onMounted(() => {
  isMounted.value = true
})

</script>

<script>

export default {
  name: 'MdTwo',
}
</script>
