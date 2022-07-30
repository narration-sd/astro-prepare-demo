<template>
  <div>
    <br>
    <h3>Do notice there's something different about this counter...</h3>
    <p>(when you go to another page, and come back to see its value)</p>
    <div id="vue" class="counter">
      <button @click="dataStore.decrement()">-</button>
      <pre>{{ dataStore.count }}</pre>
      <button @click="dataStore.increment()">+</button>
    </div> to
  </div>
</template>

<script>

import { useDateStore } from "../stores/dateStore.ts"
import {onBeforeMount, onBeforeUnmount, onMounted, onUnmounted} from "vue";

export default {
  setup() {
    console.log('setup() VueCounter')
    // beforeCreate (() =>{
    //   console.log('beforeCreate VueCounter')
    // })
    onBeforeMount (() =>{
      console.log('onBeforeMount VueCounter')
    })
    onMounted (() =>{
      console.log('onMounted VueCounter')
    })
    onBeforeUnmount (() =>{
      console.log('onBeforeUnmount VueCounter')
    })
    onUnmounted (() =>{
      console.log('onUnmounted VueCounter')
    })

    const dataStore = useDateStore()

    return {
      dataStore
    }
  },
  name: 'VueCounter-plus',
  created: function () {
    console.log('created VueCounter')
  }
}
</script>
