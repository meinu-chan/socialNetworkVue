<template>
  <div class="comment">
    <div v-if="comment" class="comment-header">
      <div class="comment-user-data" @click="commentAuthor(userId)">
        <div class="image"></div>
        <span class="comment-user-nickname">{{ comment.nickname }}</span>
      </div>
      <span>{{ commentDate(comment.date) }}</span>
    </div>
    <div class="comment-value">
      {{ comment.value }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comment",
  props: {
    commentId: String
  },
  data() {
    return {
      comment: null
    };
  },
  async mounted() {
    const { data } = await axios.get(
      "https://pure-hollows-15090.herokuapp.com/api/".concat(
        `comment/getComment/${this.commentId}`
      )
    );

    this.comment = data;
  },
  methods: {
    commentDate(date) {
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
    authorComment(id) {
      this.$router.push({ name: "UserPage", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
$border-img: 1px solid rgb(117, 117, 117);

.comment-user-nickname {
  display: inline-block;
  margin-left: 5%;
  &:hover {
    text-decoration: underline;
  }
}

.comment-user-data {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.image {
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background-image: url("../../assets/default-user-image.png");
  background-size: 100% 100%;
  border: $border-img;
}

.root-commen.comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment {
  display: flex;
  flex-direction: column;
  width: 600px;
  border: 1px solid rgb(219, 99, 0);
  margin: 10px 0;
}

.comment-header {
  padding: 2%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(219, 99, 0);
}

.comment-value {
  padding: 2%;
  word-break: break-all;
  //   border-bottom: 1px solid rgb(219, 99, 0);
}
</style>
