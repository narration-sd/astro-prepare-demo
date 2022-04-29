<template>
  <div>
    <NoLibs />
<!--    <h2>Here from MD</h2>-->
    <MD :source="source" breaks />
<!--    <h2>Datapicker</h2>-->
<!--    <Datepicker v-model="picked" />-->
  </div>
</template>
<script setup>
import MD from 'vue3-markdown-it'
import Datepicker from 'vue3-datepicker'
import NoLibs from "../components/NoLibs.vue";

import { ref } from 'vue'
</script>

<script>

// const picked = ref(new Date())

export default {
  name: 'MdMine',
  props: {
    source: {
      type: String,
      default: 'no source prop yet!'
    },
  },
  data: function () {
    return {
      picked: ref(new Date())
    }
  },
  created() {
    console.log('source prop is: '+ this.source)
  },
}
</script>
