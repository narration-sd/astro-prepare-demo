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
  color: darkblue;
}
.indenta {
  margin-left: 15px;
}
@media (prefers-color-scheme: dark) {
  body {
    color: darkgray !important;
  }
  h2, h3 {
    color: #61b9e8;
  }
  li ul li {
    color: #fd04fd;
  }
  button {
    background-color: #bdbcbc;
  }
}
</style>
