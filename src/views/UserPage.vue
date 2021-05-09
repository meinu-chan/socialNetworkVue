<template>
  <div class="user-page">
    <slot></slot>
    <div class="user-page-body">
      <div class="user-page-body-data" v-if="userData">
        <UserData :nickname="userData.nickname" :userId="userData.userId" />
        <div class="user-page-func">
          <Friends :friends="friends" :userId="userData.userId" />
        </div>
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

import UserData from "@/components/UserData";
import Publications from "@/components/Publications";
import Friends from "@/components/Friends";
import AddPublcation from "@/components/AddPublication";

export default {
  name: "UserPage",
  data() {
    return {
      status: "Send"
    };
  },
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

.user-page-func {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  button {
    margin-bottom: 20px;
    padding: 10%;
    width: 100%;
    color: #747474;
    font-size: 18px;
    background: #fff;
    border: 1px solid rgb(219, 99, 0);
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(219, 99, 0);
      color: #fff;
      transition: 0.5s;
    }
  }
}
</style>
