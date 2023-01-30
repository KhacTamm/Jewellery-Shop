<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="titlesidebar">
        <h2 @click="even">Quản Trị</h2>
      </div>
      <ul>
        <li @click="goToAllProduct">
          <i class="fa-solid fa-list"></i>
          Tất cả sản phẩm
        </li>
        <li @click="goToTypeProduct">
          <i class="fa-solid fa-layer-group"></i>
          Loại sản phẩm
        </li>
        <li @click="goToAddProduct">
          <i class="fa-solid fa-circle-plus"></i>
          Thêm sản phẩm
        </li>
      </ul>
    </div>
    <div class="main_content">
      <!-- <div v-if="!ishandler" class="contentAdminView">
        <div class="titileAdminView">
          <h3>Chào mừng bạn đến trang Quản lý</h3>
        </div>
      </div> -->
      <div class="contentAdminView">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ishandler: false,
    };
  },
  methods: {
    goToAllProduct() {
      // this.ishandler = true;
      this.$router.push({ name: "AdminAllProduct" });
    },
    goToAddProduct() {
      // this.ishandler = true;
      this.$router.push({ name: "AdminAdd" });
    },
    goToTypeProduct() {
      // this.ishandler = true;
      this.$router.push({ name: "AdminTypeProduct" });
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapper .sidebar {
  width: 300px;
  background: rgba(154, 181, 200, 0.8);
  position: sticky;
  top: 0rem;
  display: block !important;
  height: calc(100vh);
  overflow-y: auto;
}

.titlesidebar {
  background: rgb(154, 181, 200);
  /* margin-bottom: 15px; */
}

.titlesidebar h2 {
  padding: 32px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
}

.wrapper .sidebar ul li {
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #bdb8d7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.wrapper .sidebar ul li a {
  color: #333333;
  display: block;
  font-size: 1.1rem;
}

.fa-solid {
  padding-right: 6px;
}

.wrapper .sidebar ul li:hover {
  background-color: rgb(154, 181, 200);
}

.wrapper .sidebar ul li:hover a {
  color: #fff;
}

.wrapper .main_content .info {
  color: #717171;
  line-height: 25px;
  height: 100%;
}

.wrapper .main_content .info div {
  margin-bottom: 20px;
}

.main_content {
  margin-top: 20px;
}

/* .titileAdminView {
  margin-top: 20px;
} */

.wrapper .main_content {
  width: 100%;
  /* padding: 0 24px; */
}

.titileAdminView h3 {
  background-color: rgba(216, 216, 216, 0.8);
  padding: 12px 24px;
}
</style>
