<!-- eslint-disable vue/return-in-computed-property -->
<template>
  <nav class="navheader">
    <div class="list">
      <router-link to="/admin" class="list-item" v-if="currentUser === 'admin'"
        >Quản lý</router-link
      >
      <router-link to="/" class="list-item">Trang chủ</router-link>
      <router-link to="/about" class="list-item">Giới thiệu</router-link>
      <router-link to="/product" class="list-item">Sản phẩm</router-link>
      <router-link to="/cart" class="list-item"
        ><i class="fa-solid fa-basket-shopping"></i> ({{ totalCart }})
      </router-link>
    </div>
    <div class="search" @change="test">
      <input-search v-model="searchText.SearchText"> </input-search>
    </div>
  </nav>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "@/stores/app.store";
import InputSearch from "./InputSearch.vue";

export default {
  components: {
    InputSearch,
  },
  data() {
    // ...mapState(useAppStore, {
    //   currentUser: "user",
    // }),
    return {
      searchText: useAppStore(),
    };
  },
  computed: {
    ...mapState(useAppStore, {
      currentUser: "role",
      totalCart: "totalCart",
    }),
  },
  methods: {},
};
</script>

<style scope>
.navheader {
  background-color: var(--backg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 50px;
  padding: 0 4px 0 40px;
}
.list {
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item {
  text-decoration: none;
  font-weight: 800;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
}

.list-item:hover {
  color: var(--hover);
}

.fa-basket-shopping {
  font-size: 1.6rem;
}

.search {
  position: relative;
  width: 40%;
}
</style>
