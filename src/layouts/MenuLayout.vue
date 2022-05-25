<template>
  <Navbar />
  <!--
    Don't do this -- swup won't find the ids as the pages
    won't be built, and you will get highly bogus sounding error.
    Swup is not for present times....

      <slot :id="swup">

    with, in slot child,

      <MenuLayout v-slot="slotProps" client:load>
	    <main id="slotProps.swup">
  -->
  <slot>
  </slot>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<script>
import Swup from 'swup';
import SwupScriptsPlugin from '@swup/scripts-plugin';

if (typeof window !== 'undefined') {
  const swup = new Swup({
    plugins: [
      new SwupScriptsPlugin({
        head: true, // hmm
        body: true
      })]
  });
}

export default {
  name: "MenuLayout"
}
</script>

<style scoped>

</style>