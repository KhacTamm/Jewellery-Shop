<template>
  <div class="container">
    <div class="header_product">
      <h2>Tất cả sản phẩm</h2>
    </div>
    <div class="tab-result">
      <div class="listP">
        <div class="listP_title">
          <i class="fa-solid fa-list"></i>
          <span> Danh mục </span>
        </div>
        <div
          class="listP_item_title"
          v-for="(item, index) in filteredTypeT"
          :key="index"
          @click="renderType(item._id)"
          @mousdown="displayicon"
        >
          <div class="listP-item" :class="{ icon: isdisplay }">
            <i class="fa-solid fa-caret-right"> </i>
            {{ item.name }}
          </div>
        </div>
      </div>
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
// import AdminService from "@/services/admin.service";

export default {
  components: {
    Products,
  },
  data() {
    return {
      products: [],
      typeProducts: [],
      isdisplay: false,
    };
  },
  computed: {
    filteredProducts() {
      return this.products;
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
    filteredTypeT() {
      return this.typeProducts;
    },
  },
  methods: {
    async renderType(id) {
      try {
        const data = await ProductService.getTypeProducts(id);
        this.products = data.products;
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveTypeP() {
      try {
        this.typeProducts = await ProductService.getAllTypeProducts();
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    displayicon() {
      this.isdisplay = !this.isdisplay;
    },
  },
  mounted() {
    this.retrieveProducts();
    this.retrieveTypeP();
  },
};
</script>

<style scoped>
.tab-result {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 0.8fr 4fr;
  justify-content: space-evenly;
}

.listP_title {
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
}

.listP_title i {
  font-size: 1.2rem;
}

.listP_title span {
  font-size: 1.4rem;
  padding: 0 6px;
}

.listP_item_title {
  line-height: 2.6rem;
  padding-left: 18px;
  cursor: pointer;
}

.listP-item {
  font-size: 1.1rem;
}

.listP-item .fa-caret-right {
  display: none;
}

.listP-item.icon .fa-caret-right {
  display: inline-block;
  color: #255525;
}

.listP-item.icon {
  color: #255525;
}

.sp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 25px;
  justify-content: space-evenly;
  padding-left: 35px;
}
</style>
