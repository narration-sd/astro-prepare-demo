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
<!--
<template>
  <div v-if="formatted">
    <v-container grid-list-md fill-height>
      <h2>HelloWorld NsdMicroLogo, before any v-anything but with presence of vuetify</h2>
    </v-container>
  </div>
  <div v-else>
    <h2>HelloWorld NsdMicroLogo, just on its own, with no presence of vuetify</h2>
  </div>
</template>
-->
<!--<template>-->
<!--  <v-app>-->
<!--    <v-main>-->
<!--      <h2>HelloWorld NsdMicroLogo</h2>-->
<!--    </v-main>-->
<!--  </v-app>-->
<!--</template>-->
<!--
<template lang="pug">
div(v-if="formatted")
  v-app
    v-main
      v-container(grid-list-md fill-height)
        v-layout(column justify-center)
          a(href="/")
            v-layout.mini-box(row align-center nowrap justify-start)
              v-img.micro-logo(alt="logo" :src="iconUrl")
              v-flex.title-box(column justify-space-evenly)
                h1.logo-title.mini-title {{ title }}
                h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
                h6(style="font-size: 8pt;") A little thing about me, is that I am all vuetify...and pug...
div(v-else)
  h1 I'm just a free agent here...
&lt;!&ndash; Let's just see if the rest will run, before Vuetify... &ndash;&gt;
</template>
-->
<!--
<template>

  <div v-if="formatted">
    <v-container grid-list-md fill-height>
      <v-layout column justify-center>
        <a href="/">
          <v-layout class="mini-box" row align-center nowrap justify-start>
&lt;!&ndash;            <v-img class="micro-logo" alt="logo" :src="iconUrl" />&ndash;&gt;
            <img class="micro-logo" alt="logo" :src="iconUrl" />
            <v-flex class="title-box" column justify-space-evenly>
              <h1 class="logo-title.mini-title">{{ title }}</h1>
              <h3 class="logo-subtitle.mini-subtitle">{{ catchline }}</h3>
              <h6 style="font-size: 8pt;">A little thing about me, is that I am all vuetify...</h6>
            </v-flex>
          </v-layout>
        </a>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <h2> I'm just a free agent here...</h2>
  </div>
  &lt;!&ndash; Let's just see if the rest will run, before Vuetify... &ndash;&gt;
</template>
-->
<template lang="pug">
div.fill-height.stamp-box(v-if="formatted")
  a(:href="href")
    div.title-row
      img.logo-mini-img(alt="logo" :src="iconUrl")
      div.title-box
        h1.logo-title.mini-title {{ title }}
        h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
        h6(style="font-size: 8pt;") A little thing about me, is that I am all pug...
div(v-else)
  h3 What are we doing here?
</template>

<script setup>
import urlPath from '../static/avatar100.png'
const iconUrl = urlPath

import {onBeforeMount} from "vue";
onBeforeMount(() => {
  // console.log('onBeforeMount:formaatted: ' + formatted)
  console.log('iconUrl is: '+ iconUrl)
})
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
    },
    formatted: {
      type: Boolean,
      default: false
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
    font-size: 0.7em
  .mini-title
    font-size: 1.5em

</style>
