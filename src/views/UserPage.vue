<template>
  <div>
    <router-view />
    <Header />
    <div class="user-page-body">
      <div class="user-page-body-data">
        <UserData :nickname="userData.nickname" :userId="userData.userId" />
        <Friends :friends="friends" :userId="userData.userId" />
      </div>
      <Publications :publications="publications" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "@/components/Header";
import UserData from "@/components/UserData";
import Publications from "@/components/Publications";
import Friends from "@/components/Friends";

export default {
  name: "UserPage",
  methods: {
    ...mapActions(["setUserById", "setToken"])
  },
  mounted() {
    !this.getToken && this.setToken(sessionStorage.getItem("token"));
    this.setUserById(window.location.href.split("/").pop());
  },
  computed: {
    ...mapGetters(["getUser", "getToken"]),
    friends() {
      return this.getUser ? this.getUser.friends : [];
    },
    publications() {
      return this.getUser ? this.getUser.publications : [];
    },
    userData() {
      return this.getUser
        ? {
            requests: this.getUser.requests,
            waitingForResponse: this.getUser.waitingForResponse,
            userId: this.getUser._id,
            nickname: this.getUser.nickname
          }
        : null;
    }
  },

  components: {
    Header,
    UserData,
    Friends,
    Publications
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  &-body-data {
    justify-content: space-between;
    display: flex;
  }
}
</style>
