<template>
<!--
<template lang="pug">
  v-container(grid-list-md fill-height)
    v-layout(column justify-center)
      a(href="/")
        v-layout.mini-box(row align-center nowrap justify-start)
          v-img.micro-logo(alt="logo" :src="iconUrl")
          v-flex.title-box(column justify-space-evenly)
            h1.logo-title.mini-title {{ title }}
            h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
-->
<!-- Let's just see if the rest will run, before Vuetify... -->
<img :src="iconUrl">
</template>

<script setup>
import iconUrl from '../static/avatar100.png'
</script>

<script>

export default {
  name: 'NsdMicroLogo',
  props: {
    title: {
      type: String,
      default: 'Narration SDz'
    },
    catchline: {
      type: String,
      default: null
    },
    heading: {
      type: String,
      default: null
    }
  },
  // data () {
  //   return {
  //     iconUrl: './static/avatar100.png',
  //   }
  // }
}
</script>

<style lang="sass" scoped>

a
  text-decoration: none

.mini-box
  flex-wrap: nowrap
  margin-left: 0px
  width: fit-content

.title-box
  padding-left: 10% !important
  white-space: nowrap

.logo-title
  font-size: 3.5rem
  white-space: nowrap
  color: darkblue
  font-weight: 600
  padding-left: 10%
  padding-bottom: 1rem
  line-height: 1.25

.micro-logo
  width: 40px
  max-width: 40px
  @media(max-width: 960px)
    width: 35px
    max-width: 35px

.mini-title
  font-size: 1.75em
  @media(max-width: 960px)
    font-size: 1.6rem
  margin-bottom: 0.15em
  padding-bottom: 0
  padding-left: 0
  color: darkblue

.logo-subtitle
  font-size: 1.5rem
  font-weight: 400
  color: #8b0000
  margin-top: 1em
  margin-left: auto
  margin-right: auto

.mini-subtitle
  margin-top: 0

@media (max-width: 640px)
  .logo-box
    margin-left: auto
  .logo-title
    font-size: 2em
  .logo-subtitle
    font-size: 1.25em
  .mini-title
    font-size: 1.5em

</style>
