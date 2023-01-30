<template>
  <div class="titileAdminView">
    <h3>Sửa sản phẩm</h3>
  </div>
  <div class="wapperAdmin">
    <Form
      @submit="updateProduct(product)"
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
          <option value="-1">{{ product.type.name }}</option>
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
      <div class="mb-3">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <Field
          type="text"
          class="form-control"
          v-model="product.name"
          id="name"
          name="name"
        />
      </div>
      <div class="mb-3">
        <label for="img" class="form-label">Hình Ảnh</label>
        <Field
          id="img"
          name="img"
          type="file"
          @change="handleFileUpload"
          @click="handleFileName"
          ref="file"
          class="form-control"
          multiple
        />
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
        <button type="submit" class="btn btn-primary">Lưu lại</button>
      </div>
    </Form>
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
  props: {
    id: { type: String, required: true },
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
      quantitys: [],
      previousNameFile: [],
      imgLenght: [],
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
    async getProduct(id) {
      try {
        this.product = await AdminService.get(id);
        console.log(this.product);
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(data) {
      try {
        await AdminService.update(this.product._id, data);
        this.$router.push({ name: "AdminAllProduct" });
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
  created() {
    this.getProduct(this.id);
  },
  mounted() {
    this.retrieveTypeP();
  },
};
</script>

<style cope>
@import "@/assets/css/formProducts.css";
</style>
