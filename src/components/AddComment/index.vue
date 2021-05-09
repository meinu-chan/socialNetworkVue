<template>
  <div class="add_comment-root">
    <div class="add-comemnt">
      <textarea-autosize
        v-model="commentValue"
        placeholder="Comment..."
        class="body-textarea"
      />
      <button class="body-btn" @click="createComment">
        Comment
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "AddComment",
  props: {
    publicId: String
  },
  data() {
    return {
      commentValue: ""
    };
  },
  methods: {
    ...mapActions(["getPublication"]),
    async createComment() {
      await axios.put(
        "https://pure-hollows-15090.herokuapp.com/api/".concat(
          `comment/addComment`
        ),
        { value: this.commentValue, publicId: this.publicId },
        {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        }
      );

      this.commentValue = "";

      await this.getPublication(this.publicId);
    }
  }
};
</script>

<style lang="scss" scoped>
.add_comment-root {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.add-comemnt {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.body {
  display: flex;
  &-textarea {
    width: 570px;
    border: 1px solid rgb(219, 99, 0);
    border-radius: 10px 10px 0 10px;
    padding: 3px;
    font-family: Poppins;
    font-size: 20px;
  }

  &-btn {
    margin-top: 4px;
    padding: 1%;
    color: #747474;
    font-size: 20px;
    background: #fff;
    border: 1px solid rgb(219, 99, 0);
    border-radius: 0 0 10px 10px;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      background: rgb(219, 99, 0);
      color: #fff;
      transition: 0.5s;
    }
  }
}

textarea {
  &:focus {
    outline: none;
  }
}
</style>
