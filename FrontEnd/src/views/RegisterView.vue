<template>
  <div class="wapperaccount">
    <div class="js-center">
      <div id="login">
        <h2 class="titleAccount">Tạo Tài Khoản</h2>
        <Form
          class="login"
          :validation-schema="accountFormSchema"
          @submit="handleRegister(account)"
        >
          <ul>
            <li>
              <Field
                name="username"
                type="text"
                placeholder="Tên tài khoản"
                class="text"
                v-model="account.username"
              />
              <ErrorMessage name="username" class="error-feedback" />
            </li>
            <li>
              <Field
                name="phone"
                type="text"
                placeholder="Số điện thoại"
                class="text"
                v-model="account.phone"
              />
              <ErrorMessage name="phone" class="error-feedback" />
            </li>
            <li>
              <Field
                name="address"
                type="text"
                placeholder="Địa chỉ"
                class="text"
                v-model="account.address"
              />
              <ErrorMessage name="address" class="error-feedback" />
            </li>
            <li>
              <Field
                name="password"
                type="password"
                placeholder="Mật khẩu"
                class="text"
                v-model="account.password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </li>
            <li>
              <Field
                name="isConfirmed"
                type="password"
                placeholder="Nhập lại mật khẩu"
                v-model="account.isConfirmed"
                class="text"
              />
              <ErrorMessage name="isConfirmed" class="error-feedback" />
            </li>
            <div class="form-login">
              <button type="submit" class="login btn">Đăng ký</button>
            </div>
          </ul>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// import AccountUser from "@/services/account.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Vui lòng nhập trường này.")
        .min(2, "Vui lòng tối thiểu 2 kí tự.")
        .max(250, "Tên có nhiều nhất 250 ký tự."),
      phone: yup
        .string()
        .required("Vui lòng nhập trường này.")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      address: yup.string().required("Vui lòng nhập trường này."),
      password: yup
        .string()
        .required("Vui lòng nhập trường này.")
        .min(4, "Mật khẩu phải dài tối thiểu 4 kí tự.")
        .max(8, "Mật khẩu dài tối đa 8 kí tự."),
      isConfirmed: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });
    return {
      accountFormSchema,
      account: {
        type: Object,
        require: true,
      },
      err: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["register"]),

    async handleRegister(user) {
      //   console.log("hello");

      try {
        await this.register(user);
        // console.log("hello");
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/fromLoginRegister.css";
</style>
