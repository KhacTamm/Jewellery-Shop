<template>
  <div class="cart">
    <div v-if="products.totalPriceCart > 0" class="CartNp">
      <div class="wrap_cl1">
        <div class="cl1">
          <div class="header_cl1">
            <h2 class="title_header">Giỏ Hàng Của Bạn</h2>
            <ul>
              <li class="checkboxAll">
                <span class="Namesp">Sản Phẩm</span>
                <a href="">
                  <i @click="removeCartAll" class="fas fa-trash-alt trash"></i>
                </a>
              </li>
              <li class="header_cl1_item item dg">Đơn Giá</li>
              <li class="header_cl1_item sl">Số Lượng</li>
              <li class="header_cl1_item tt">Thành Tiền</li>
            </ul>
          </div>
          <cart-product :products="products.products"> </cart-product>
        </div>
      </div>
      <div class="cl2">
        <cart-receipt :totalPriceCart="products.totalPriceCart"></cart-receipt>
      </div>
    </div>
    <div v-else class="Cartp">
      <cart-empty> </cart-empty>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
import CartProduct from "@/components/CartProduct.vue";
import CartReceipt from "@/components/CartReceipt.vue";
import CartEmpty from "@/components/CartEmpty.vue";
import CartService from "@/services/cart.service";

export default {
  components: {
    CartProduct,
    CartReceipt,
    CartEmpty,
  },
  computed: {
    ...mapState(useAppStore, {
      products: "products",
    }),
  },
  methods: {
    ...mapActions(useAppStore, [
      "formatter",
      "getCartStore",
      "removeCartAllStore",
    ]),

    async getCart() {
      await this.getCartStore();
    },

    async removeCartAll() {
      await CartService.removeCartAll();
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped>
.cart {
  margin: 12px 0;
}

.CartNp {
  display: flex;
  justify-content: space-between;
}

.wrap_cl1 {
  width: 75%;
}

.header_cl1 {
  display: table;
  width: 100%;
}

.header_cl1 ul {
  display: table-row;
  padding: 0;
}

ul li {
  display: table-cell;
}

.Namesp {
  padding-left: 8px;
}

.checkboxAll {
  width: 480px;
}

.header_cl1_item {
  padding: 12px;
}

ul .sl {
  padding-left: 38px;
}

.trash {
  font-size: 1.4rem;
  cursor: pointer;
  float: right;
  margin-right: 50px;
}

.trash:hover {
  opacity: 0.8;
}

.cl1 {
  background-color: #fff;
  border-radius: 4px;
  padding: 12px;
}

.cl2 {
  width: calc(100% - 76%);
}
</style>
