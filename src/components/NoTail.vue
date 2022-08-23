<template>
<h3>NoTail: I'm a Vue subcomponent, this time with some Tailwind...</h3>
<!--  <p class="indenta">{{ msg }}</p>-->
  <div class="indenta dark:bg-green-800 bg-blue-800 dark:text-amber-400 text-yellow-300 border-red-600 border-b p-4 m-4 rounded">
    Hello World, {{ msg }}.
  </div>
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
