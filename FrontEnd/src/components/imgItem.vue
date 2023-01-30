<template>
  <div class="wrapfcl1">
    <div
      class="imgfcl1"
      :style="{
        backgroundImage: `url(${require('@/assets/img/product/' +
          imgBackFaceUrl)})`,
      }"
      @click="evenImg"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    imgBackFaceUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    evenImg() {
      this.$emit("onFlip", this.imgBackFaceUrl);
    },
  },
};
</script>

<style scoped>
.wrapfcl1 {
  box-sizing: border-box;
  /* height: 160px; */
  padding: 3px;
  padding-top: 14px;
  cursor: pointer;
}
.imgfcl1 {
  width: 80px;
  padding-top: 100%;
  background-position: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  /* box-shadow: 0 0 2px 2px #999999; */
}

.imgfcl1:hover {
  border: 2px solid var(--hover);
}
</style>
