<template>
<h3>NoLibs: I'm a Vue subcomponent, I just don't have active js,</h3>
  <p class="indenta">{{ msg }}</p>
</template>

<script setup>
let msg = 'though I do have a message...'
</script>

<script>
export default {
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
