<template>
  <div>
    <router-view />
    <Header />
    <pre>{{ getUser }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "@/components/Header";

export default {
  name: "UserPage",
  methods: {
    ...mapActions(["setUserById", "setToken"])
  },
  computed: {
    ...mapGetters(["getUser", "getToken"])
  },
  mounted() {
    !this.getToken && this.setToken(sessionStorage.getItem("token"));
    this.setUserById(window.location.href.split("/").pop());
  },
  components: {
    Header
  }
};
</script>

<style lang="css" scoped></style>
