<template>
  <div>
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
h2 {
  font-weight: normal;
}
</style>
