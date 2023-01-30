<template>
  <div class="container">
    <div class="product_detail">
      <product-img :img="product.img"> </product-img>
      <product-detail :product="product"> </product-detail>
    </div>
  </div>
</template>

<script>
import ProductImg from "../components/ProductImg.vue";
import ProductDetail from "../components/ProductDetail.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ProductImg,
    ProductDetail,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: {
        type: Object,
        require: true,
      },
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.product = await ProductService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
  },
  created() {
    this.getProduct(this.id);
    this.message = "";
  },
};
</script>

<style scoped>
.container {
  border-radius: 3px;
  margin-top: 20px;
}

.product_detail {
  display: flex;
  background-color: #fff;
  margin-bottom: 50px;
}
</style>
