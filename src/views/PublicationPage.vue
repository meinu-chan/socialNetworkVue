<template>
  <div class="root">
    <big-publication
      v-if="publication"
      :_id="publicId"
      :likedUsers="publication.likedUsers"
      :nickname="publication.nickname"
      :value="publication.value"
      :date="publication.date"
      :userId="publication.userId"
    />
    <add-comment :publicId="publicId" />
    <div v-if="publication" class="publications">
      <div v-for="comment in publication.comments" :key="comment._id">
        <comment :commentId="comment._id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BigPublication from "../components/BigPublication/index";
import AddComment from "../components/AddComment/index";
import Comment from "../components/Comment/index";

export default {
  name: "PublicationPage",
  methods: {
    ...mapActions(["getPublication"])
  },
  async mounted() {
    await this.getPublication(this.publicId);
  },
  computed: {
    ...mapGetters(["publication"]),
    publicId() {
      return window.location.href.split("/").pop();
    }
  },
  components: {
    BigPublication,
    AddComment,
    Comment
  }
};
</script>

<style lang="scss" scoped>
.publications {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
}
</style>
