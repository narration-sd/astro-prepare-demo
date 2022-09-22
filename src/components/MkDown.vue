<template>
  <Mrkdown :source="source" breaks />
</template>

<script setup>
import Mrkdown from 'vue3-markdown-it'
</script>
<script>

export default {
  setup (props, attrs) {
    console.log ('Mkdown props: ' + JSON.stringify(props))
    console.log ('Mkdown attrs: ' + JSON.stringify(attrs))
  },
  props: {
    source: { type: String, default: 'Mkdown, at your service...'},
  },
  name: "MkDown"
}
</script>

<style scoped>

</style>