<template>
  <product-card
    v-for="item in mountproduct"
    :key="item.id"
    :_id="item._id"
    :name="item.name"
    :img="item.img"
    :BaPrice="item.BaPrice"
    :PrPrice="item.PrPrice"
  >
  </product-card>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  props: {
    mountproduct: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    ProductCard,
  },
};
</script>

<style scoped>
/* .sp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  justify-content: space-evenly;
} */
</style>
