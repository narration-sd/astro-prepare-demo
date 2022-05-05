<template>
  <nav>
    <menu>
      <li v-for="nav in navs" :class="{ menuitem: true, active: nav.name === name }">
        <a :href="nav.path">{{ nav.name }}</a>
      </li>
    </menu>
    <br>
  </nav>
  <hr>
  <br>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    name: { type: String, default: 'one'}
  },
  data: function () {
    return {
      navs: [
        { name:'home', path: '/' },
        { name:'one', path: '/one' },
        { name:'two', path: '/two' },
        // { name:'framer', path: '/framer' },
        // { name:'framer2', path: '/framer2' },
      ],
    }
  },
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
