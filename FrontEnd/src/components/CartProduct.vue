<template>
  <div class="body__cl1">
    <div class="spcl1" v-for="(product, index) in products" :key="index">
      <div class="inf4_product">
        <div class="imgsp">
          <img
            :src="`${require('@/assets/img/product/' + product.item.img[0])}`"
            alt=""
            class="img"
          />
        </div>
        <div class="spbcl_2">
          <router-link
            :to="{ name: 'productdetail', params: { id: product.item._id } }"
            class="product_link"
          >
            <div class="product_name">{{ product.item.name }}</div>
          </router-link>
          <a href="" class="trash" @click="removeCart(`${product.item._id}`)">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
      <div class="dg body_cl1_item">
        <p class="giakm">{{ formatter(`${product.item.PrPrice}`) }}</p>
        <p class="giagoc">{{ formatter(`${product.item.BaPrice}`) }}</p>
      </div>
      <div class="sl body_cl1_item">
        <span>{{ product.qty }}</span>
      </div>
      <div class="tt body_cl1_item">
        {{ formatter(`${product.totalPrice}`) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
import CartService from "@/services/cart.service";

export default {
  props: {
    products: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(useAppStore, [
      "formatter",
      "AddCartStore",
      "removeCartStore",
    ]),

    async removeCart(id) {
      await CartService.removeCart(id);
    },

    async AddCart(id) {
      await this.AddCartStore(id);
    },
  },
};
</script>

<style scoped>
.spcl1 {
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.inf4_product {
  display: flex;
  width: 65%;
  padding: 12px 0;
}

.imgsp img {
  width: 140px;
  object-fit: contain;
  padding: 6px;
}

.spbcl_2 {
  margin: 0 12px;
  width: 280px;
}

.product_link {
  padding: 12px;
}

.product_name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  line-height: 2rem;
}

.product_name:hover {
  color: var(--text-color);
}

.trash {
  font-size: 1.4rem;
  margin-right: 50px;
  cursor: pointer;
}

.trash:hover {
  opacity: 0.8;
}

.fa-trash-alt {
  float: right;
}
.pl {
  position: relative;
}

.pl_title {
  color: #7f7f7f;
  text-transform: capitalize;
  cursor: pointer;
}
.warp_sub_pl {
  position: absolute;
  background: #fff;
  box-shadow: 0 0 3px 0.3px rgba(0, 0, 0, 0.6);
  padding: 12px;
  left: -60px;
  /* top: 35px; */
}

.sub_pl_item::before {
  content: "";
  border-width: 20px 30px;
  border-style: solid;
  border-color: transparent transparent #fff #0000;
  border-bottom-color: rgba(0, 0, 0, 0.09);
  position: absolute;
  right: 0px;
  top: -30px;
}
.sub_pl_item {
  width: 220px;
}

.product_variation {
  overflow: visible;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 8px;
  margin: 0 8px 8px 0;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  outline: 0;
  text-align: center;
  background-color: #fff;
}

.dg,
.tt,
.sl {
  width: 20%;
  padding: 12px;
  text-align: center;
}

.giakm {
  color: #ff0000;
}

.giagoc {
  color: #9e9e9e;
  padding: 2px 0px;
  text-decoration: line-through;
}

.wsl {
  display: flex;
  height: 32px;
  width: 110px;
  border: 1px solid rgba(0, 0, 0, 0.09);
}

/* .ipsl {
  width: 40px;
  text-align: center;
  border-radius: 0px;
  border: none;
  outline: none;
} */

/* .btsl {
  width: 50px;
  text-align: center;
  border-radius: 0px;
  border: none;
  background: #fff;
  cursor: pointer;
}

.bttang {
  border-right: rgba(0, 0, 0, 0.09) 1px solid;
}

.btgiam {
  border-left: rgba(0, 0, 0, 0.09) 1px solid;
} */
</style>
