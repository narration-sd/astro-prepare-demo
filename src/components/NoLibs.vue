<template>
<h3>NoLibs: I'm a Vue subcomponent, I just don't have active js,</h3>
  <p class="indenta">{{ msg }}</p>
</template>

<script setup>
</script>

<script>
export default {
  props: {
    msg: { type: String, default: 'though I do have a message...' }
  },
  name: "NoLibs"
}
</script>

<style scoped>
h3 {
  color: darkblue !important;
}
.indenta {
  margin-left: 15px;
}
</style>
