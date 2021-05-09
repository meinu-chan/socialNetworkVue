<template>
  <div class="root">
    <div class="big-p">
      <div class="big-p-header">
        <div class="big-p-data">
          <div class="image"></div>
          <div class="nickname">{{ nickname }}</div>
        </div>
        <div class="big-p-date">{{ publicatedDate(date) }}</div>
      </div>
      <div class="big-p-value">{{ value }}</div>
      <div class="big-p-footer">
        <div class="likes-count" @click="setLikes">
          <span :class="{ liked }">{{ likes.length }}</span>
          <font-awesome-icon icon="heart" :class="{ liked }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BigPublication",
  props: {
    _id: String,
    likedUsers: {
      type: Array,
      default: () => []
    },
    nickname: String,
    value: String,
    date: String,
    userId: String
  },
  methods: {
    ...mapActions(["ratePublication", "getPublication"]),
    publicatedDate(date) {
      const formatedDate = new Date(date);
      const month = this.numFormatter(formatedDate.getMonth());
      const day = this.numFormatter(formatedDate.getDay());
      const hours = this.numFormatter(formatedDate.getHours());
      const minutes = this.numFormatter(formatedDate.getMinutes());
      return `${formatedDate.getFullYear()}.${month}.${day}\t${hours}:${minutes}`;
    },
    numFormatter(number) {
      return number > 9 ? number : `0${number}`;
    },
    async setLikes() {
      await this.ratePublication(this._id);

      await this.getPublication(this._id);

      this.likes = this.publication.likedUsers;
      this.liked = this.publication.likedUsers.includes(
        sessionStorage.getItem("userId")
      );
    }
  },
  data() {
    return {
      likes: this.likedUsers,
      liked: this.likedUsers.includes(sessionStorage.getItem("userId"))
    };
  },
  computed: {
    ...mapGetters(["publication", "getUser"])
  }
};
</script>

<style lang="scss" scoped>
$border-img: 1px solid rgb(117, 117, 117);

.root {
  padding-top: 70px;
  display: flex;
  justify-content: center;
}

.liked {
  color: rgb(255, 83, 83);
}

.likes-count {
  margin: 10px;
  font-size: 20px;
  &:hover {
    color: rgba(255, 66, 66, 0.438);
    transition: 0.2s;
  }
}

.image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url("../../assets/default-user-image.png");
  background-size: 100% 100%;
  border: $border-img;
}

.nickname {
  padding-left: 1%;
  font-size: 30px;
}

.likes-count {
  cursor: pointer;
}

.big-p {
  margin-top: 10px;
  width: 50%;
  border: 1px solid rgb(219, 99, 0);
  border-radius: 10px;
}

.big-p-data {
  display: flex;
  align-items: center;
}

.big-p-date {
  font-size: 20px;
}

.big-p-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgb(219, 99, 0);
}

.big-p-value {
  font-size: 20px;
  margin: 20px;
}

.big-p-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid rgb(219, 99, 0);
}
</style>
