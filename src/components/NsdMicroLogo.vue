<template lang="pug">
v-app.logo-spaced
  v-main
    v-container(grid-list-md fill-height)
      v-layout(column justify-center)
        a(href="/")
          v-layout.mini-box(row align-center nowrap justify-start)
            v-img.mini-logo(alt="logo" :src="iconUrl")
            v-flex.title-box(column justify-space-evenly)
              h1.logo-title.mini-title {{ title }}
              h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
              h6.mini-note A little thing about me, is that I'm pug...and vuetify...
</template>
<!--
<template lang="pug">
&lt;!&ndash; Only need this if having vuetify build problems &ndash;&gt;
&lt;!&ndash;div.fill-height.stamp-box(v-if="formatted")&ndash;&gt;
div.fill-height.stamp-box
  a(:href="href")
    div.title-row
      img.mini-logo(alt="logo" :src="iconUrl")
      div.title-box
        h1.logo-title.mini-title {{ title }}
        h3.logo-subtitle.mini-subtitle(v-if="catchline") {{ catchline }}
        h6.mini-note A little thing about me, so far, is that I'm sass, and all pug...
&lt;!&ndash;div(v-else)&ndash;&gt;
&lt;!&ndash;  h3 What are we doing here?&ndash;&gt;
</template>
-->

<script setup>
import { defineProps } from "vue";
import urlPath from '../static/avatar100.png'
const iconUrl = urlPath
// *todo* use this later, but must define all props. Match then question on formatted in client.js
// defineProps ({
//   thisWay: { type: Boolean, required: false, default: false },
// })
import {onBeforeMount} from "vue";
onBeforeMount(() => {
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
      default: true // *todo* true disables this feature while considering Vuetify further needs
    }
  },
}
</script>

<style lang="sass">

.v-application__wrap
  min-height: unset !important

//body
//  font-size: 16px !important

</style>

<style lang="sass">

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
  margin-bottom: 1rem

.title-box
  white-space: nowrap

.logo-spaced
  margin-bottom: 15px

.logo-title
  font-size: 1.3rem
  white-space: nowrap
  color: darkblue
  font-weight: 600
  padding-top: 1%
  padding-left: 10%
  padding-bottom: 1rem
  line-height: 1.25

.mini-logo
  width: 100px
  height: 100px
  max-width: 100px
  margin-right: 20px
  @media(max-width: 640px)
    width: 65px
    height: 65px
    max-width: 65px
    margin-right: 12px

.micro-logo
  width: 40px
  max-width: 40px
  @media(max-width: 960px)
    width: 35px
    max-width: 35px

.mini-title
  font-size: 1.75rem !important
  @media(max-width: 640px)
    font-size: 1.2rem !important
    padding-top: 0
  margin-bottom: 0.15em
  padding-bottom: 0
  padding-left: 0
  color: darkblue

.logo-mini-img
  width: 100px !important
  height: 100px !important
  margin-right: 15px

.stamp-box
  margin: 1.2% 20px 4% 20px

.logo-subtitle
  font-size: 1.3rem
  font-weight: 400
  color: #8b0000
  margin-top: 1em
  margin-left: auto
  margin-right: auto
  @media(max-width: 640px)
    font-size: 1.1rem !important
    margin-top: 0

.mini-subtitle
  margin-top: 0

.mini-note
  font-size: 8pt !important
  @media (max-width: 640px)
    font-size: 6pt !important

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
