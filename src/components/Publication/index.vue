<template>
  <div class="publication">
    <div class="publication-header">
      <div class="publication-user-data" @click="authorPublication(userId)">
        <div class="image"></div>
        <span class="publication-user-nickname">{{ nickname }}</span>
      </div>
      <span>{{ publicatedDate(date) }}</span>
    </div>
    <div class="publication-value">
      {{ value }}
    </div>
    <div class="publication-footer">
      <div class="comments-count">
        {{ comments.length }}
        <font-awesome-icon icon="comment" />
      </div>
      <div class="likes-count" @click="setLikes">
        <span :class="{ liked }">{{ likes.length }}</span>
        <font-awesome-icon icon="heart" :class="{ liked }" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Publication",
  props: {
    allPublics: Array,
    _id: String,
    userId: {
      type: String
    },
    nickname: {
      type: String
    },
    date: {
      type: String
    },
    value: {
      type: String
    },
    comments: {
      type: Array,
      default: () => []
    },
    likedUsers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      likes: this.likedUsers,
      liked: this.likedUsers.includes(sessionStorage.getItem("userId"))
    };
  },
  methods: {
    ...mapActions(["ratePublication"]),
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
    authorPublication(id) {
      this.$router.push({ name: "UserPage", params: { id } });
    },
    async setLikes() {
      await this.ratePublication(this._id);

      const [publication] = this.getPublications.filter(p => p._id == this._id);

      this.likes = publication.likedUsers;
      this.liked = publication.likedUsers.includes(
        sessionStorage.getItem("userId")
      );
    }
  },
  computed: {
    ...mapGetters(["getPublications"])
  }
};
</script>

<style lang="scss" scoped>
$border-img: 1px solid rgb(117, 117, 117);

.liked {
  color: rgb(255, 83, 83);
}

.publication-user-nickname {
  display: inline-block;
  margin-left: 5%;
  &:hover {
    text-decoration: underline;
  }
}

.publication-user-data {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.image {
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background-image: url("../../../../assets/default-user-image.png");
  background-size: 100% 100%;
  border: $border-img;
}

.root-publication {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.publication {
  display: flex;
  flex-direction: column;
  width: 600px;
  border: 1px solid rgb(219, 99, 0);
  margin: 10px 0;
}

.publication-header {
  padding: 2%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(219, 99, 0);
}

.publication-value {
  padding: 2%;
  word-break: break-all;
  border-bottom: 1px solid rgb(219, 99, 0);
}

.publication-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  .comments-count {
    cursor: pointer;
    margin: 10px;
    color: rgb(75, 75, 75);
    &:hover {
      color: rgba(75, 75, 75, 0.438);
      transition: 0.2s;
    }
  }

  .likes-count {
    cursor: pointer;
    margin: 10px;
    color: rgb(75, 75, 75);
    &:hover {
      color: rgba(255, 66, 66, 0.438);
      transition: 0.2s;
    }
  }
}
</style>
