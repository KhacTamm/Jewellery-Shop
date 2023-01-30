<template>
  <div class="titileAdminView">
    <h3>Tất cả sản phẩm</h3>
  </div>
  <div class="wapperAdmin">
    <div class="NoEmpty" v-if="filteredProductsCount > 0">
      <div class="mb-3 type">
        <div class="totalP_row1">
          <div class="totalP">
            <span class="lable_totalP" @click="retrieveProducts"
              >Tất cả sản phẩm:</span
            >
            <span>{{ filteredProductsCount }}</span>
          </div>
          <select
            class="form-select checkbox-select-all-options"
            name="action"
            required
            ref="type"
            @click="renderType"
          >
            <option value="-1">Lọc sản phẩm</option>
            <option
              v-for="(item, index) in filteredTypeT"
              :key="index"
              :value="`${item._id}`"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <router-link :to="{ name: 'AdminAdd' }" class="totalP_row2">
          <i class="fa-solid fa-plus"></i>
          <span>Thêm mới</span>
        </router-link>
      </div>
      <form class="mt-4" name="container-form">
        <table class="table">
          <thead>
            <tr class="header_allProduct">
              <th scope="col" class="allProduct_sp">Sản phẩm</th>
              <th scope="col">Kho</th>
              <th scope="col">Giá Gốc</th>
              <th scope="col">Giá Khuyết Mãi</th>
              <th scope="col">Sửa</th>
              <th scope="col">Xóa</th>
            </tr>
          </thead>
          <tbody class="body_allProduct">
            <tr v-for="(product, item) in filteredProducts" :key="item">
              <td class="titleProduct">
                <img
                  class="imgProductAdmin"
                  :src="`${require('@/assets/img/product/' + product.img[0])}`"
                />
                <div>
                  <router-link
                    :to="{
                      name: 'productdetail',
                      params: { id: product._id },
                    }"
                  >
                    {{ product.name }}
                  </router-link>
                </div>
              </td>
              <td>{{ product.quantity }}</td>
              <td>{{ formatter(`${product.BaPrice}`) }}</td>
              <td>{{ formatter(`${product.PrPrice}`) }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'AdminEditProduct',
                    params: { id: product._id },
                  }"
                >
                  <button class="btns button_update">Sửa</button>
                </router-link>
              </td>
              <td>
                <button
                  class="btns button_delete"
                  @mousedown="deleteProduct(`${product._id}`)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="deleteAll">
          <div
            class="btns button_delete_all"
            data-bs-toggle="modal"
            data-bs-target="#delete-productAll-Modal"
            v-on:click.prevent
          >
            Xóa tất cả sản phẩm
          </div>
          <!-- {{!-- comfirm delete course--}} -->
          <div
            class="modal fade"
            id="delete-productAll-Modal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Xóa sản phẩm
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">Bạn có muốn xóa tất cả sản phẩm?</div>
                <div class="modal-footer">
                  <button
                    ref="form"
                    id="btn-delete-course"
                    class="btns button_comfirm"
                    @click="deleteAllProduct"
                  >
                    Xác nhận
                  </button>
                  <button
                    type="button"
                    class="btns button_update"
                    data-bs-dismiss="modal"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-else class="emptyProduct">
      Bạn chưa có sản phẩm nào.
      <router-link :to="{ name: 'AdminAdd' }">
        <span class="textGoToAdminAdd">Thêm sản phẩm</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      products: [],
      typeProducts: [],
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
    ...mapActions(useAppStore, ["formatter"]),

    async renderType() {
      try {
        if (
          this.$refs.type.options[this.$refs.type.selectedIndex].value != -1
        ) {
          const id =
            this.$refs.type.options[this.$refs.type.selectedIndex].value;
          const data = await AdminService.getTypeProducts(id);
          this.products = data.products;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAllProduct() {
      try {
        this.$router.push({ name: "AdminAllProduct" });
        await AdminService.deleteAll();
        this.$refs.form.$el.submit();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteProduct(id) {
      try {
        await AdminService.forceDelete(id);
        this.$router.push({ name: "AdminAllProduct" });
        this.$refs.form.$el.submit();
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveProducts() {
      try {
        this.products = await AdminService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveTypeP() {
      try {
        this.typeProducts = await AdminService.getAllTypeProducts();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveProducts();
    this.retrieveTypeP();
  },
};
</script>

<style scoped>
@import "@/assets/css/formProducts.css";
.type {
  justify-content: space-between;
}

.totalP_row1 {
  display: flex;
  align-items: center;
}

.totalP {
  padding-right: 24px;
  font-size: 1.1rem;
}

.lable_totalP {
  cursor: pointer;
  padding-right: 12px;
}

.lable_totalP:hover {
  color: var(--text-color);
}

.totalP span {
  padding-left: 4px;
  font-weight: 600;
}

.totalP_row2 {
  cursor: pointer;
  font-weight: 600;
}

.totalP_row2 i {
  padding-right: 8px;
}

.typeP_item:hover {
  opacity: 0.6;
}
.header_allProduct th {
  text-align: center;
}

.body_allProduct tr {
  /* display: table-cell; */
  vertical-align: middle;
}

.body_allProduct td:not(td:first-child) {
  text-align: center;
}

.titleProduct {
  display: flex;
  align-items: center;
}

.imgProductAdmin {
  width: 120px;
  object-fit: cover;
  padding-right: 12px;
}

.allProduct_sp {
  width: 480px;
}

.btns {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-weight: 600;
}

.btns.button_delete {
  border: 2px solid crimson;
  background-color: crimson;
  color: white;
}

.btns.button_update {
  border: 2px solid var(--backg);
  color: #000;
  background-color: var(--backg);
}

.btns.button_comfirm {
  border: 3px solid var(--backg);
  background-color: transparent;
}

.btns:hover {
  opacity: 0.8;
}

.modal.show .modal-dialog {
  display: flex;
  justify-content: center;
  top: 35%;
}

.modal-content {
  width: 360px;
}

.deleteAll {
  width: 100%;
  margin-top: 24px;
  text-align: right;
}

.fade {
  text-align: center;
}

.button_delete_all {
  float: right;
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
  color: var(--text-color);
  text-decoration: underline;
}

.emptyProduct {
  font-size: 1.2rem;
  padding: 24px 0;
}

.textGoToAdminAdd {
  font-weight: 600;
  color: var(--text-color);
  text-decoration: underline;
}
</style>
