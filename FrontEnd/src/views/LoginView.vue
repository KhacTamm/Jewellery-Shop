<template>
  <div class="wapperaccount">
    <div class="js-center">
      <div id="login">
        <h2 class="titleAccount">Đăng Nhập</h2>
        <Form
          class="login"
          :validation-schema="accountFormSchema"
          @submit="handleLogin(account)"
        >
          <ul>
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
                name="password"
                type="password"
                placeholder="Mật khẩu"
                class="text"
                v-model="account.password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </li>
            <div class="err" v-if="err">
              Tên đăng nhập hoặc mật khẩu không khớp, vui lòng nhập lại.
            </div>
            <div class="form-login">
              <button type="submit" class="login btn">Đăng nhập</button>
            </div>
            <div class="rep_pas">
              <a href="#">Quên mật khẩu?</a>
            </div>
          </ul>
        </Form>
        <div class="page-login__thirdPartLogin_line">
          <span>Hoặc</span>
        </div>
        <div class="register">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng ký</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object().shape({
      phone: yup
        .string()
        .required("Vui lòng nhập trường này.")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      password: yup
        .string()
        .required("Vui lòng nhập trường này.")
        .min(4, "Mật khẩu phải dài tối thiểu 4 kí tự.")
        .max(8, "Mật khẩu dài tối đa 8 kí tự."),
    });
    return {
      accountFormSchema,
      account: {
        type: Object,
        require: true,
      },
      err: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["login"]),

    async handleLogin(user) {
      this.loading = true;

      try {
        await this.login(user);

        const redirectPath = this.$route.query.redirect || {
          name: "home", //profile
        };

        this.$router.push(redirectPath);
      } catch (error) {
        console.log(error);

        this.err = true;
        this.loading = false;
        this.message = "Đã có lỗi xảy ra.";
      }
    },
  },
};
</script>

<style cope>
@import "@/assets/css/fromLoginRegister.css";
</style>
