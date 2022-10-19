<template>
  <div>
    <br>
    <div class="mention">
      <h3>Do notice, that there's something different about this counter...</h3>
      <p>(when you go to another page, and come back to see its value)</p>
    </div>
    <div id="vue" class="counter">
      <button @click="dataStore.decrement()">-</button>
      <pre>{{ dataStore.count }}</pre>
      <button @click="dataStore.increment()">+</button>
    </div>
  </div>
</template>

<script>

import { useDateStore } from "../stores/dateStore.ts"
import {onBeforeMount, onBeforeUnmount, onMounted, onUnmounted} from "vue";

export default {
  setup() {
    const dataStore = useDateStore()

    return {
      dataStore
    }
  },
  name: 'VueCounter-plus',
}
</script>

<style scoped>
.mentioo {
}
@media(max-width: 639px) {
  .mention {
    margin: 0 11% 5%;
  }
}
</style>
