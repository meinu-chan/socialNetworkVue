<template>
  <div id="app" class="container">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  cursor: default;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 4%;
}

.container {
  margin: 0 10%;
}

h2 {
  margin: 0;
  padding: 0;
}
</style>
