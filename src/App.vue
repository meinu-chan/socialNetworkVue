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

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
span {
  display: inline-block;
}

#app {
  cursor: default;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: fit-content;
}

.container {
  margin: 0 10%;
  height: 100%;
  border: {
    color: rgb(219, 99, 0);
    width: 0 1px;
    style: solid;
  }
}

h1,
h2,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

span {
  display: inline-block;
}

@font-face {
  font-family: Poppins;
  src: url("./assets/fonts/Poppins-Light.ttf");
}
</style>
