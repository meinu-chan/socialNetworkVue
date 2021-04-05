<template>
  <div class="user-data-root">
    <div class="user-data">
      <div class="user-data-img"></div>
      <div class="user-data-nickname">
        <span>{{ nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserData",
  props: {
    nickname: {
      type: String,
      default: ""
    },
    userId: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
$size: 200px;
$font-size: 35px;
$mr-l: 20px;
$border-img: 1px solid rgb(117, 117, 117);

.user-data {
  display: flex;
  &-img {
    height: $size;
    width: $size;
    background-image: url("../../assets/default-user-image.png");
    background-size: 100% 100%;
    border: $border-img;
  }
  &-nickname {
    height: fit-content;
    font-size: $font-size;
    margin-left: $mr-l;
  }
}
</style>
