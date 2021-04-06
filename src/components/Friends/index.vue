<template>
  <div class="friend-page-link">
    <router-link :to="{ name: 'FriendsPage' }">
      Friends: {{ friendsCount }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Friends",
  props: {
    friends: {
      type: Array
    },
    userId: {
      type: String
    }
  },
  computed: {
    friendsCount() {
      return this.friends.length;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin link($color) {
  text-decoration: none;
  color: $color;
  cursor: pointer;
  display: block;
  &::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background-color: $color;
    transition: all 0.2s;
    transform: scaleX(0);
  }
  &:hover::after {
    transform: scaleX(1);
  }
}

.friend-page-link {
  align-self: flex-end;
  margin-bottom: 2%;
  a {
    font-size: 20px;
    @include link(#2c3e50);
  }
}

h2 {
  font-weight: normal;
}
</style>
