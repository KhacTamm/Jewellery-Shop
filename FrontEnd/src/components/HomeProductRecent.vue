<template>
  <div class="container">
    <div class="top-title">
      <h2 class="title-section">
        <span>Sản phẩm mới nhất</span>
      </h2>
      <p></p>
    </div>
    <div class="tab-result">
      <div class="sp">
        <products
          v-if="filteredProductsCount > 0"
          :mountproduct="filteredProducts"
        >
        </products>
      </div>
    </div>
  </div>
</template>

<script>
import Products from "../components/ProductWape.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    Products,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products;
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style scoped>
.container {
  margin: 30px 0;
}
.top-title {
  text-align: center;
}
.top-title .title-section {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

p {
  margin: 0 0 10px 0;
  line-height: 20px;
}

.top-title p {
  margin: 0;
  display: inline-block;
  padding-top: 15px;
  position: relative;
  min-width: 180px;
}

.top-title p:before {
  content: "///";
  color: #000;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  text-align: center;
  background: #f5f5f5;
  z-index: 9;
  font-size: 20px;
}

.top-title p:after {
  content: "";
  width: 150px;
  height: 1px;
  background: #000;
  position: absolute;
  top: 5px;
  left: 15px;
}

.tab-result {
  margin-top: 18px;
}

.sp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  justify-content: space-evenly;
}
</style>
