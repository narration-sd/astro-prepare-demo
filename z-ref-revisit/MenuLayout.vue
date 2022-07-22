<template>
  <div>
    <Navbar></Navbar>
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
// import Navbar from '../components/Navbar.astro'
import Navbar from '../src/components/Buttons.astro'
</script>

<script>

export default {
  name: "MenuLayout"
}
</script>

<style scoped>

</style>