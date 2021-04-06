<template>
  <div class="friends-page">
    <div v-if="loaded && user">
      <h2 class="friends-page-header">
        <span class="link-user-page" @click="userNicknameClick">
          {{ user.nickname }}
        </span>
        <span> 's friends:</span>
      </h2>
      <div class="friends-page-search">
        <input
          type="text"
          class="friends-page-input"
          placeholder="Start typing..."
          v-model="nicknameFriend"
          :disabled="!getFriends.length"
        />
      </div>
      <ul v-if="getFriends.length">
        <Friend
          v-for="friend in searchingFriends"
          :key="friend._id"
          :nickname="friend.nickname"
          :friendId="friend._id"
        />
      </ul>
      <div class="empty-friends-list" v-else>
        <span>List is empty.</span>
      </div>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Friend from "@/components/Friend";
import Loader from "@/components/Loader";

export default {
  name: "FriendsPage",
  data() {
    return {
      userId: "",
      nicknameFriend: ""
    };
  },
  computed: {
    ...mapGetters(["getFriends", "getUser", "getLoading"]),
    loaded() {
      return !this.getLoading;
    },
    user() {
      return this.getUser ? { nickname: this.getUser.nickname } : null;
    },
    searchingFriends() {
      if (this.nicknameFriend.trim()) {
        return this.getFriends.filter(friend =>
          friend.nickname
            .toLowerCase()
            .includes(this.nicknameFriend.toLowerCase())
        );
      }
      return this.getFriends;
    }
  },
  methods: {
    ...mapActions(["setFriends", "setUserById"]),
    userNicknameClick() {
      this.$router.push({
        name: "UserPage",
        params: this.userId
      });
    }
  },
  mounted() {
    this.userId = window.location.href.split("/")[4];
    this.setUserById(this.userId);
    this.setFriends(this.userId);
  },
  components: {
    Friend,
    Loader
  }
};
</script>

<style lang="scss" scoped>
$orange: rgb(219, 99, 0);

.empty-friends-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  font-size: 40px;
}

span {
  display: inline-block;
}

.link-user-page {
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: $orange;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.friends-page {
  height: 100%;
  width: 100%;

  &-header {
    padding: 1.5% 1%;
    border-bottom: 1px solid $orange;
  }

  &-search {
    padding: 10px;
    border-bottom: 1px solid $orange;
  }

  &-input {
    width: 50%;
    font-size: 20px;
    padding: 0.5%;

    &:disabled::placeholder {
      color: #ccc;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
