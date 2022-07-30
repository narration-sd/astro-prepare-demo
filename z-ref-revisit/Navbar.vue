---
---
<template>
  <nav>
    <menu>
      <li v-for="(nav, index) in navs" :class="{ menuitem: true, active: cactive(nav.path) }">
        <a :href="nav.path"
           v-on:click="pageNow(nav.name)"
           data-turbo-action="advance">{{ nav.name }}{{ index }} </a>
      </li>
    </menu>
    <br>
  </nav>
  <hr>
</template>

<!--<script setup>-->
<!--import {onBeforeMount, ref, reactive} from "vue";-->

<!--const aPath = ref('nope')-->
<!--const thePath = reactive(aPath)-->

<!--onBeforeMount( () => {-->
<!--  console.log('onPath: ' + ((typeof window === 'undefined') ? '/' : window.location.pathname))-->
<!--  aPath.value = ((typeof window === 'undefined') ? '/' : window.location.pathname)-->
<!--})-->
<!--</script>-->

<script>
import { nextTick } from 'vue'
import {onBeforeMount, ref, reactive} from "vue";

export default {
  name: "Navbar",
  props: {
    // *todo* have to change this to computed pulled from window path
    name: { type: String, default: 'home'}
  },
  setup () {
    const aPath = ref('nope')
    const thePath = reactive(aPath)
    const pathname = new URL(Astro.request.url).pathname;
    const currentPath = pathname.slice(1); // remove the first "/"
    const menuClass = (path) => { return (path === pathname) ? "menuitem active" : "menuitem" }

    onBeforeMount( () => {
      console.log('onPath: ' + ((typeof window === 'undefined') ? '/' : window.location.pathname))
      aPath.value = ((typeof window === 'undefined') ? '/' : window.location.pathname)
    })

    return {
      // *todo* except, how do we do this in a <script setup>, as commented out above??
      thePath,
      pathname
    }
  },
  data: function () {
    return {
      currentPagename: this.name,
      currentPath: '/two',
      navs: [
        { name:'home', path: '/' },
        { name:'one', path: '/one' },
        { name:'two', path: '/two' },
        { name:'three', path: '/threewrap' },
      ],
    }
  },
  methods: {
    menuActive: function (path) { return { menuitem: true, active: this.active(path) }},
    active: function (path) { return path === this.thePath /*this.currentPath*/ },
    cactive: function (path) { return path === this.pathname },
    pathNow: function () { return (typeof window === 'undefined') ? '/' : window.location.pathname },
    pageNow: function (pagename) {
      console.log('setting page: ' + pagename)
      this.currentPagename = pagename;
      // this.$nextTick(() => { this.currentPath = this.pathNow() })
    },
  },
  computed: {
    pathActive: function () { return { menuitem: true, active: true } }
  }
}
</script>

<style scoped>
.active.menuitem {
  color: lightgoldenrodyellow;
}
li.menuitem {
  color: blue;
  padding: 0 25px;
}
li a {
  text-decoration: none;
}
nav {
  display: flex;
}
menu {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 20px 40px;
  width: 100%;
}
li {
  flex-grow: 1;
  text-align: center;
  text-decoration: none;
}
hr {
  border: none;
  height: 2px;
  background-color: blue;
  color: blue;
}
</style>
