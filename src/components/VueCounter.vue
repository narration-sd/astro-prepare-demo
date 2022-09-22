<template>
  <div>
    <br>
    <h3>Do notice, that there's something different about this counter...</h3>
    <p>(when you go to another page, and come back to see its value)</p>
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
