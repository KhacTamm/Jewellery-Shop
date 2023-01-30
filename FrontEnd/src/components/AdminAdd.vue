<template>
  <div class="titileAdminView">
    <h3>Thêm sản phẩm</h3>
  </div>
  <div class="wapperAdmin" v-if="filteredTypePCount > 0">
    <Form
      @submit="createProduct(product, product.type._id)"
      :validation-schema="productFormSchema"
    >
      <div class="mb-3 type">
        <label for="type" class="form-label">Phân loại</label>
        <select
          class="form-select checkbox-select-all-options"
          name="action"
          required
          ref="type"
          @click="addType"
        >
          <option value="-1">Chọn loại sản phẩm</option>
          <option
            v-for="(item, index) in filteredTypeT"
            :key="index"
            :value="`${item._id}`"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <!-- Thương hiệu -->
      <div class="mb-3">
        <label for="brand" class="form-label">Tên thương hiệu</label>
        <Field
          id="brand"
          name="brand"
          type="text"
          class="form-control"
          v-model="product.brand"
        />
        <ErrorMessage name="brand" class="error-feedback" />
      </div>
      <!-- Tên sản phẩm -->
      <div class="mb-3">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <Field
          id="name"
          name="name"
          type="text"
          class="form-control"
          v-model="product.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <!-- Hình -->
      <div class="mb-3">
        <label for="img" class="form-label">Hình Ảnh</label>
        <input
          id="img"
          name="img"
          type="file"
          @change="handleFileUpload"
          @click="handleFileName"
          ref="file"
          class="form-control"
          multiple
        />
        <div class="sumImg" v-if="previousNameFile.length > 0">
          <div
            class="FileNameItem"
            v-for="(FileName, index) in previousNameFile"
            :key="index"
          >
            <img
              class="imgProduct"
              :src="`${require('@/assets/img/product/' + FileName)}`"
            />
            <!-- {{ FileName }} -->
          </div>
        </div>
        <ErrorMessage name="img" class="error-feedback" />
      </div>
      <!-- Chất Liệu < -->
      <div class="mb-3">
        <label for="material" class="form-label">Chất Liệu</label>
        <Field
          id="material"
          name="material"
          type="text"
          class="form-control"
          v-model="product.material"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <!-- Phong cách -->
      <div class="mb-3">
        <label for="name" class="form-label">Phong cách</label>
        <Field
          id="style"
          name="style"
          type="text"
          class="form-control"
          v-model="product.style"
        />
        <ErrorMessage name="style" class="error-feedback" />
      </div>
      <!-- Số lượng -->
      <div class="mb-3">
        <label for="quantity" class="form-label">Số lượng</label>
        <Field
          id="quantity"
          name="quantity"
          type="text"
          class="form-control"
          v-model="product.quantity"
        />
        <ErrorMessage name="quantity" class="error-feedback" />
      </div>
      <!-- Giá -->
      <div class="mb-3">
        <label for="BaPrice" class="form-label">Giá Gốc</label>
        <Field
          id="BaPrice"
          name="BaPrice"
          type="text"
          class="form-control"
          v-model="product.BaPrice"
        />
        <ErrorMessage name="BaPrice" class="error-feedback" />
      </div>
      <div class="mb-3">
        <label for="PrPrice" class="form-label">Giá Khuyến Mãi</label>
        <Field
          id="PrPrice"
          name="PrPrice"
          type="text"
          class="form-control"
          v-model="product.PrPrice"
        />
        <ErrorMessage name="PrPrice" class="error-feedback" />
      </div>
      <!-- Mô tả -->
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          id="description"
          name="description"
          type="tex"
          class="form-control description"
          v-model="product.description"
        >
        </textarea>
        <ErrorMessage name="description" class="error-feedback" />
      </div>
      <div class="btnSM">
        <button ref="form" type="submit" class="btn btn-primary">Lưu</button>
      </div>
    </Form>
  </div>
  <div v-else class="emptyType">
    Bạn chưa có loại sản phẩm nào. Vui lòng thêm loại sản phẩm trước khi thêm
    sản phẩm vào cửa hàng!!!
    <router-link :to="{ name: 'AdminTypeProduct' }">
      <span class="textGoToAdminAdd">Thêm loại sản phẩm</span>
    </router-link>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AdminService from "@/services/admin.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(250, "Tên có nhiều nhất 250 ký tự."),
      img: yup.array(),
      quantity: yup.string().required("Tên phải có giá trị."),
      BaPrice: yup
        .string()
        .required("Không được để trống trường này.")
        .min(4, "Giá của sản phẩm phải tối thiểu 4 chữ số.")
        .max(50, "E-mail tối đa 50 ký tự."),
      PrPrice: yup
        .string()
        .required("Không được để trống trường này.")
        .min(4, "Giá của sản phẩm phải tối thiểu 4 chữ số.")
        .max(50, "E-mail tối đa 50 ký tự."),
    });
    return {
      product: {
        type: Object,
        require: true,
      },
      productFormSchema,
      file: [],
      quantity: [],
      previousNameFile: [],
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
    handleFileUpload() {
      this.file.push(this.$refs.file.files[0].name);
      this.product.img = this.file;
      this.previousNameFile = this.file;
    },

    addType() {
      if (this.$refs.type.options[this.$refs.type.selectedIndex].value != -1) {
        this.product.type = {
          _id: this.$refs.type.options[this.$refs.type.selectedIndex].value,
          name: this.$refs.type.options[this.$refs.type.selectedIndex].text,
        };
        console.log(this.product.type);
      }
    },
    async createProduct(data, id) {
      try {
        this.$router.push({ name: "AdminAllProduct" });
        await AdminService.create(data, id);
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

<style cope>
@import "@/assets/css/formProducts.css";

.emptyType {
  padding: 24px;
  font-size: 1.2rem;
}

.textGoToAdminAdd {
  font-weight: 600;
  color: var(--text-color);
  text-decoration: underline;
}
</style>
