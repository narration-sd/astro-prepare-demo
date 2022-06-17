<template>
  <div>
    <NoLibs />
    <Mkdown :source="source" breaks />
  </div>
  <div>
    <p>last date we had: {{theDate}}</p>
      <Datepicker v-model="theDate" />
    <h4>...and we're done</h4>
  </div>
</template>

<script setup>
import Mkdown from 'vue3-markdown-it'
import Datepicker from 'vue3-datepicker'
import NoLibs from "../components/NoLibs.vue";
</script>

<script>
import { ref } from 'vue' // *todo* here?

export default {
  name: 'MdMine',
  props: {
    source: {
      type: String,
      default: 'no source prop yet!'
    },
    date: {
      type: Object,
      // default: function () { return  ref(new Date()) }
      default: function () { return  new Date() }
    }
  },
  data: function () {
    return {
      // date: ref(new Date()),
      baseDate: this.date,
      theDate: this.date, // ref(this.baseDate),
      // theDate: ref(new Date("2022-05-01T19:28:17.736Z")),
    }
  },
  created() {
    console.log('source prop is: '+ this.source)
    console.log('date prop is: '+ JSON.stringify(this.date))
    console.log('typeof date prop is: '+ typeof this.date)
    console.log('theDate data is: '+ JSON.stringify(this.theDate))
    console.log('typeof theDate data is: '+ typeof this.theDate)
  },
}
</script>
