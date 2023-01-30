<template>
  <div class="home">
    <home-product-recent />
  </div>
</template>

<script>
import HomeProductRecent from "../components/HomeProductRecent.vue";

export default {
  name: "HomeView",
  components: {
    HomeProductRecent,
  },
};
</script>
