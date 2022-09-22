<template>
<!--  this nasty thing you do _only_ if you can be sure what's passed in prop is safe... -->
<div v-html="formattedMd"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from "markdown-it";

const md = new MarkdownIt()
const props = defineProps({
  source: { type: String, default: '# NsdMarkdown,\n   ***at your service***'}
})

const formattedMd = computed (() => {
    return md.render(props.source)
  })
</script>

<script>
export default {
  name: "NsdMarkdown"
}
</script>