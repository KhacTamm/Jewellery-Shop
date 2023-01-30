<template>
  <div class="header_product">
    <h2>Kết quả tìm kiếm</h2>
    <i class="fa-solid fa-magnifying-glass"></i>
  </div>
  <div class="sp" v-if="filteredProductsCount > 0">
    <products :mountproduct="filteredProducts"> </products>
  </div>
  <not-found-search v-else> </not-found-search>
</template>

<script>
import { useAppStore } from "@/stores/app.store";
import Products from "../components/ProductWape.vue";
import NotFoundSearch from "@/components/NotFoundSearch.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    Products,
    NotFoundSearch,
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: useAppStore(),
    };
  },
  computed: {
    productStrings() {
      return this.products.map((product) => {
        const { name, material } = product;
        return [name, material].join("").trim().toLowerCase();
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredProducts() {
      return this.products.filter((contact, index) =>
        this.productStrings[index].includes(this.searchText.SearchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.products[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style>
.SearchEmpty {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.textSearchEmpty {
  text-align: center;
}

.header_product {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.header_product i {
  padding-left: 12px;
  font-size: 1.6rem;
}

.sp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 25px;
  justify-content: space-evenly;
}
</style>
