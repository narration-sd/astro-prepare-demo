<template>
<!--  <p>Source is: {{ source }}</p>-->
  <Mkdown :source="source" breaks />
</template>

<!--<script setup>-->
<!--const propsy = defineProps({-->
<!--  foo: String,-->
<!--  source: String-->
<!--})-->
<!--// &lt;!&ndash;import Mkdown from 'vue3-markdown-it'&ndash;&gt;-->
<!--</script>-->
<script>
import Mkdown from 'vue3-markdown-it'

export default {
  setup (props, attrs) {
    console.log ('Mkdown props: ' + JSON.stringify(props))
    console.log ('Mkdown attrs: ' + JSON.stringify(attrs))
    // const source = '## Here we ***are***'
    // return {
    //   source
    // }
  },
  props: {
    source: { type: String, default: 'Mkdown, at your service...'},
    // extra: { type: String, default: 'Mkdown, at your service...'}
  },
  components: {
    Mkdown // abso necessary if import from here, not <script setup>
  },
  name: "MkDown"
}
</script>

<style scoped>

</style>