<template>
  <div class="add-publication-root">
    <div class="add-publication">
      <textarea-autosize
        v-model="publicationValue"
        placeholder="Tell world about your day..."
        class="body-textarea"
      />
      <button class="body-btn" @click="createPublication">
        Publicate
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "AddPublication",
  data() {
    return {
      publicationValue: ""
    };
  },
  methods: {
    ...mapActions(["getAllPublications"]),
    async createPublication() {
      await axios.put(
        "https://pure-hollows-15090.herokuapp.com/api/".concat(`publication`),
        { value: this.publicationValue },
        {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        }
      );

      this.publicationValue = "";

      await this.getAllPublications(this.getUser._id);
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style lang="scss" scoped>
.add-publication-root {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.add-publication {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.body {
  display: flex;
  &-textarea {
    width: 600px;
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
