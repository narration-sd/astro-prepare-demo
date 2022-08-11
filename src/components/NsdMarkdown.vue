<template>
<div v-html="formattedMd"></div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt()
</script>

<script>
export default {
  props: {
    source: { type: String, default: '# NsdMarkdown,\n   ***at your service***'}
  },
  computed: {
    formattedMd: function () {
      return this.md.render(this.source)
    }
  },
  name: "NsdMarkdown"
}
</script>

<style scoped>

</style>