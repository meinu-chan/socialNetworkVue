<template>
  <div class="root-publication">
    <div v-for="publication in publicationsData" :key="publication._id">
      <publication
        v-if="publication"
        :_id="publication._id"
        :userId="userId"
        :nickname="getUser.nickname"
        :date="publication.date"
        :value="publication.value"
        :comments="publication.comments"
        :likedUsers="publication.likedUsers"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Publication from "./components/Publication/index";

library.add(faComment);
library.add(faHeart);

export default {
  name: "Publications",
  props: {
    publications: {
      type: Array
    },
    userId: {
      type: String
    }
  },
  methods: {
    ...mapActions(["getAllPublications"])
  },
  mounted() {
    if (this.userId) this.getAllPublications(this.userId);
  },
  computed: {
    ...mapGetters(["getPublications", "getUser"]),
    publicationsData() {
      return this.getPublications.length ? this.getPublications : [];
    }
  },
  components: {
    Publication
  }
};
</script>

<style lang="scss" scoped>
.root-publication {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
