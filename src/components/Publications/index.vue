<template>
  <div>
    publications
    <pre>{{ publications }}</pre>
  </div>
</template>

<script>
export default {
  name: "Publications",
  props: {
    publications: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped></style>
