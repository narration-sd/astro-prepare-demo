<template>
  <Navbar>  </Navbar>
    <div id="navslot">
      <slot></slot>
    </div>
  <!--
    Don't do this -- swup won't find the ids as the pages
    won't be built, and you will get highly bogus sounding error.
    Swup is not for present times....

      <slot :id="swup">

    with, in slot child,

      <MenuLayout v-slot="slotProps" client:load>
	    <main id="slotProps.swup">
  -->

</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<script>
// N.B. left for reference - actually this doesn't work - easy to get fooled, need better test pages
// import Swup from 'swup';
// import SwupScriptsPlugin from '@swup/scripts-plugin';
// import SwupDebugPlugin from '@swup/debug-plugin';
//
// if (typeof window !== 'undefined') {
//
//   // this constant is used, it's just not apparent...if not an artifact that it is...
//   const swup = new Swup({
//     debugMode: true,
//     containers: [ "#myswup" ],
//     plugins: [
//       new SwupDebugPlugin(),
//       new SwupScriptsPlugin({
//         head: true, // hmm
//         body: true
//       })]
//   });
// }

export default {
  name: "MenuLayout"
}
</script>

<style scoped>

</style>