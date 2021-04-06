<template>
  <div class="add-publication">
    <div class="add-publication header">Add publication</div>
    <div class="add-publication body">
      <textarea-autosize
        placeholder="Tell world about your day..."
        class="body textarea"
      />
      <button class="body btn">Publicate</button>
    </div>
    <div class="add-publication bottom"></div>
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
  align-items: center;
  margin: 0 auto;
  &.body {
    width: 100%;
  }

  &.header {
    width: fit-content;
  }
}

.body {
  display: flex;
  flex-direction: row;
  &.textarea {
    width: 100%;
  }
}

textarea {
  &:focus {
    outline: none;
  }
}
</style>
