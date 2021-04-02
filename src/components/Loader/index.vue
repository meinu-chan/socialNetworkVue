<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="css" scoped>
.lds-dual-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(219, 99, 0);
  border-color: rgb(219, 99, 0) transparent rgb(219, 99, 0) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
