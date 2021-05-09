<template>
  <header class="header">
    <div class="header-body">
      <h2>Social Network</h2>
      <div class="header-body-main">
        <div class="header-body-search">
          <input type="text" placeholder="Search user..." v-model="nickname" />
          <button class="search-btn" @click="searchUser">Search</button>
        </div>
        <font-awesome-icon
          @click="backToMyPage"
          icon="user-circle"
          class="user-icon"
          :class="{ inviseable: myPage, 'user-icon': !myPage }"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    ...mapActions(["searchUserByName"]),
    searchUser() {
      this.searchUserByName({
        name: this.nickname,
        token: sessionStorage.getItem("token")
      }).then(() =>
        this.$router.push({
          name: "UserPage",
          params: { id: this.getUser._id }
        })
      );
    },
    backToMyPage() {
      this.$router.push({
        name: "UserPage",
        params: { id: sessionStorage.getItem("userId") }
      });
    }
  },
  computed: {
    ...mapGetters(["getToken", "getUser"]),
    myPage() {
      if (this.getUser)
        return (
          sessionStorage.getItem("userId") === this.getUser._id &&
          this.$router.currentRoute.name === "UserPage"
        );
      return false;
    }
  }
};
</script>

<style lang="css" scoped>
.user-icon {
  cursor: pointer;
  margin: 0 10px 0 40px;
  font-size: 30px;
}

.inviseable {
  display: none;
}

.user-icon:hover {
  color: #415b75;
  transition: 0.2s;
}
.header {
  background: #cfcfcf;
  width: 80%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10%;
  height: 8%;
}

h2 {
  color: rgb(66, 66, 66);
}

.header-body {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.header-body-search {
  display: flex;
  min-height: 100%;
  align-items: center;
  width: fit-content;
}

input {
  padding: 2px 10px;
  font-size: 20px;
  border: 1px solid rgb(219, 99, 0);
  border-radius: 10px 0 0 10px;
}

input:focus {
  outline: none;
}

.search-btn {
  color: #747474;
  padding: 2px 10px;
  margin-left: 2px;
  font-size: 20px;
  background: #fff;
  border: 1px solid rgb(219, 99, 0);
  border-radius: 0 10px 10px 0;
}

.search-btn:focus {
  outline: none;
}

.search-btn:hover {
  background: rgb(219, 99, 0);
  color: #fff;
  transition: 0.5s;
}

.header-body-main {
  display: flex;
}
</style>
