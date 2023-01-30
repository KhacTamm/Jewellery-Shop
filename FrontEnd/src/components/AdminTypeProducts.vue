<template>
  <div class="titileAdminView">
    <h3>Loại sản phẩm</h3>
  </div>
  <div class="header_type">
    <div class="totalP">
      Tổng loại sản phẩm: <span>{{ filteredTypePCount }}</span>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-create"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Thêm loại sản phẩm
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Thêm mới loại sản phẩm
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit="createTypeProduct(typeProduct)">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Mã loại</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    autocomplete="off"
                    v-model="typeProduct.MaL"
                  />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Tên loại</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    autocomplete="off"
                    v-model="typeProduct.name"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btns button_update"
                    data-bs-dismiss="modal"
                  >
                    Thoát
                  </button>
                  <button type="submit" class="btns button_comfirm">
                    Thêm mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wapperAdmin">
    <div class="NoEmpty" v-if="filteredTypePCount > 0">
      <form class="mt-4" name="container-form">
        <table class="table">
          <thead>
            <tr class="header_allProduct">
              <th scope="col">Mã</th>
              <th scope="col">Loại sản phẩm</th>
              <th scope="col">Ngày khởi tạo</th>
              <th scope="col">Xóa</th>
            </tr>
          </thead>
          <tbody class="body_allProduct">
            <tr v-for="(type, item) in filteredTypeT" :key="item">
              <td>
                {{ type.MaL }}
              </td>
              <td>
                {{ type.name }}
              </td>
              <td>{{ formatDate(`${type.createdAt}`) }}</td>
              <td>
                <button
                  class="btns button_delete"
                  @mousedown="deleteTypeP(`${type._id}`)"
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
            Xóa tất loại cả sản phẩm
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
                    Xóa loại sản phẩm
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Bạn có muốn xóa tất cả loại sản phẩm?
                </div>
                <div class="modal-footer">
                  <button
                    ref="form"
                    id="btn-delete-course"
                    class="btns button_comfirm"
                    @click="deleteAllTypeP"
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
    <!-- <div v-else class="emptyProduct">Bạn chưa có loại sản phẩm nào.</div> -->
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      product: {
        type: Object,
        require: true,
      },
      typeProduct: {
        type: Object,
      },
      typeProducts: [],
    };
  },
  computed: {
    filteredTypeT() {
      return this.typeProducts;
    },
    filteredTypePCount() {
      return this.filteredTypeT.length;
    },
  },
  methods: {
    formatDate(date) {
      const dt = new Date(date);
      return dt.toLocaleString();
    },

    async createTypeProduct(data) {
      try {
        await AdminService.createTypeProducts(data);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAllTypeP() {
      try {
        await AdminService.deleteAllTypeP();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTypeP(id) {
      try {
        await AdminService.deleteTypeProducts(id);
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
    this.retrieveTypeP();
  },
};
</script>

<style scoped>
.titileAdminView h3 {
  background-color: rgba(216, 216, 216, 0.8);
  padding: 12px 24px;
}

.header_type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.totalP {
  padding-right: 24px;
  font-size: 1.1rem;
}

.totalP span {
  padding-left: 4px;
  font-weight: 600;
}

.mt-4 {
  width: 100%;
}

.btn-create {
  float: right;
}

.tm {
  height: 40px;
  margin-bottom: 24px;
  align-items: center;
}

.checkbox-select-all-options {
  width: 150px;
  margin: 24px;
}

.header_allProduct th {
  text-align: center;
}

.body_allProduct tr {
  /* display: table-cell; */
  vertical-align: middle;
}

.body_allProduct {
  text-align: center;
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

.btn-primary {
  padding: 12px;
}

.btn-create {
  margin: 12px 0;
}
</style>
