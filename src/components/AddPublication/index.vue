<template>
  <div class="add-publication">
    <textarea-autosize
      placeholder="Tell world about your day..."
      class="body-textarea"
    />
    <button class="body-btn">Publicate</button>
  </div>
</template>

<script>
export default {
  name: "AddPublication"
};
</script>

<style lang="scss" scoped>
.add-publication {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: 2% auto;
  &.body {
    width: 100%;
  }

  &.header {
    width: fit-content;
  }
}

.body {
  display: flex;
  &-textarea {
    width: 100%;
    border: 1px solid rgb(219, 99, 0);
    border-radius: 10px 10px 0 10px;
    padding: 1.5%;
    font-family: Poppins;
    font-size: 20px;
  }

  &-btn {
    margin-top: 4px;
    padding: 2.6%;
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
