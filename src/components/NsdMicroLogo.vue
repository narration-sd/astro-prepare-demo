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
&lt;!&ndash; Let's just see if the rest will run, before Vuetify... &ndash;&gt;
</template>
-->
<template>
  <v-container grid-list-md fill-height>
    <h2>HelloWorld NsdMicroLogo, before any v-anything but with presence of vuetify</h2>
  </v-container>
</template>
<!--<template>-->
<!--  <v-app>-->
<!--    <v-main>-->
<!--      <h2>HelloWorld NsdMicroLogo</h2>-->
<!--    </v-main>-->
<!--  </v-app>-->
<!--</template>-->
<!--<template>-->
<!--<v-container grid-list-md fill-height>-->
<!--  v-layout(column justify-center)-->
<!--    a(href="/")-->
<!--      v-layout.mini-box(row align-center nowrap justify-start)-->
<!--        v-img.micro-logo(alt="logo" :src="iconUrl")-->
<!--        v-flex.title-box(column justify-space-evenly)-->
<!--          h1.logo-title.mini-title {{ title }}-->
<!--          h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}-->
<!--&lt;!&ndash; Let's just see if the rest will run, before Vuetify... &ndash;&gt;-->
<!--</template>-->
<!--
<template lang="pug">
div.fill-height.stamp-box
  a(:href="href")
    div.title-row
      img.logo-mini-img(alt="logo" :src="iconUrl")
      div.title-box
        h1.logo-title.mini-title {{ title }}
        h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
</template>
-->

<script setup>
import iconUrl from '../static/avatar100.png'
</script>

<script>

export default {
  name: 'NsdMicroLogo',
  props: {
    title: {
      type: String,
      default: 'Narration SD'
    },
    catchline: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: '/'
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

h1
  font-size: larger !important

a
  text-decoration: none

.mini-box
  flex-wrap: nowrap
  margin-left: 0px
  width: fit-content

.title-row
  display: flex
  flex-direction: row
  justify-content: center
  align-content: center

.title-box
  padding-left: 10% !important
  white-space: nowrap

.logo-title
  font-size: 1.3rem
  white-space: nowrap
  color: darkblue
  font-weight: 600
  padding-top: 4%
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
  font-size: 1.75rem !important
  @media(max-width: 960px)
    font-size: 1.6rem
  margin-bottom: 0.15em
  padding-bottom: 0
  padding-left: 0
  color: darkblue

.logo-mini-img
  width: 100px !important
  height: 100px !important

.stamp-box
  margin: 1.2% 20px 4% 20px

.logo-subtitle
  font-size: 1.3rem
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
    //font-size: 1.2em !important
  .logo-subtitle
    font-size: 0,7em
  .mini-title
    font-size: 1.5em

</style>
