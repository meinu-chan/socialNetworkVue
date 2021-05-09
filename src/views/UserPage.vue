<template>
  <div class="user-page">
    <Header />
    <div class="user-page-body">
      <div class="user-page-body-data" v-if="userData">
        <UserData :nickname="userData.nickname" :userId="userData.userId" />
        <Friends :friends="friends" :userId="userData.userId" />
      </div>
      <AddPublcation v-if="myPage" />
      <Publications
        v-if="userData"
        :publications="publications"
        :userId="userData.userId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "@/components/Header";
import UserData from "@/components/UserData";
import Publications from "@/components/Publications";
import Friends from "@/components/Friends";
import AddPublcation from "@/components/AddPublication";

export default {
  name: "UserPage",
  methods: {
    ...mapActions(["setUserById", "setToken", "getAllPublications"])
  },
  async mounted() {
    !this.getToken && this.setToken(sessionStorage.getItem("token"));
    await this.setUserById(window.location.href.split("/").pop());
    this.getAllPublications(this.getUser._id);
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
    },
    myPage() {
      return this.getUser
        ? sessionStorage.getItem("userId") === this.getUser._id
        : false;
    }
  },

  components: {
    Header,
    UserData,
    Friends,
    Publications,
    AddPublcation
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  padding: 6% 3% 0;
  &-body-data {
    justify-content: space-between;
    display: flex;
  }
}
</style>
