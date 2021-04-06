<template>
  <li class="friend" @click="moveTo">
    <div class="friend-data">
      <div class="friend-avatar"></div>
      <span class="friend-nickname">{{ nickname }}</span>
    </div>
    <button class="delete-button">Delete</button>
  </li>
</template>

<script>
// import {mapGetters,mapActions} from 'vuex'

export default {
  name: "Friend",
  props: {
    nickname: {
      type: String
    },
    friendId: {
      type: String
    }
  },
  methods: {
    deleteFriend() {
      console.log("delete");
    },
    moveTo() {
      this.$router.push({ name: "UserPage", params: { id: this.friendId } });
    }
  }
};
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
}

.friend {
  cursor: pointer;
  display: flex;
  transition: 0.2s;
  padding: 20px;
  justify-content: space-between;

  &-avatar {
    background: {
      size: 100% 100%;
      image: url("../../assets/default-user-image.png");
    }
    border: 1px solid rgb(226, 226, 226);
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  &-data {
    display: flex;
  }

  &-nickname {
    font-size: 20px;
    margin-left: 10px;
  }

  .delete-button {
    cursor: pointer;
    align-self: center;
    height: fit-content;
    display: none;
    padding: 10px;
    font-size: 20px;
    background: {
      color: #fff;
    }
    color: rgb(122, 122, 122);
    border: 1px solid rgb(219, 99, 0);
    border-radius: 10px;
    transition: 0.2s;

    &:hover {
      background-color: rgb(219, 99, 0);
      color: rgb(255, 255, 255);
    }

    &:focus {
      outline: none;
    }
  }

  &:hover {
    background: {
      color: #ccc;
    }
  }
  &:hover .delete-button {
    display: inline-block;
  }
}
</style>
