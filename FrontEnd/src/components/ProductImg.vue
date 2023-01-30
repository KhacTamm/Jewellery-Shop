<template>
  <div class="cl1">
    <div class="hcl1">
      <img
        :src="`${require('@/assets/img/product/' + imgMain)}`"
        alt=""
        class="imgp"
      />
    </div>
    <div class="fcl1">
      <img-item
        v-for="(img, item) in imgCard"
        :key="item"
        :imgBackFaceUrl="img"
        @onFlip="change(img)"
      />
    </div>
  </div>
</template>
<script>
import imgItem from "./imgItem.vue";

export default {
  components: {
    imgItem,
  },
  props: {
    img: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imgCard: this.img,
      imgMain: this.img[0],
    };
  },
  methods: {
    change(img) {
      this.imgMain = img;
      // console.log(img);
    },
  },
};
</script>
<style scoped>
.cl1 {
  width: 500px;
}

.hcl1 {
  width: 500px;
  padding: 16px 16px 0 16px;
}

.fcl1 {
  /* height: 10px; */
  display: flex;
  padding: 6px 10px;
  overflow-x: scroll;
}

.imgp {
  width: 100%;
  height: 530px;
  object-fit: cover;
}
</style>
