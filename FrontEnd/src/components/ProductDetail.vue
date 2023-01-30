<template>
  <div class="cl2">
    <div class="tensp">
      {{ product.name }}
    </div>
    <div class="product_detail_gia">
      <div class="product_detail_giakm">
        {{ formatter(`${product.PrPrice}`) }}
      </div>
      <div class="product_detail_giagoc">
        {{ formatter(`${product.BaPrice}`) }}
      </div>
    </div>
    <div class="mt" ref="mtev">
      <div class="ct">
        <div class="ms">Chi tiết sản phẩm</div>
      </div>
      <div class="ndct">
        <div class="ndcct">
          <label class="ctcct">Danh mục</label>
          <div>{{ product.type.name }}</div>
        </div>
        <div class="ndcct">
          <label class="ctcct">Thương hiệu</label>
          <div>{{ product.brand }}</div>
        </div>
        <div class="ndcct">
          <label class="ctcct">Chất liệu</label>
          <div>{{ product.material }}</div>
        </div>
        <div class="ndcct">
          <label class="ctcct">Phong cách</label>
          <div>{{ product.style }}</div>
        </div>
        <div class="ndcct">
          <label class="ctcct">Kho hàng</label>
          <div>{{ product.quantity }}</div>
        </div>
      </div>
    </div>
    <div class="mt" @click="displaymt" ref="mtev">
      <div class="ct">
        <div class="ms">Mô tả sản phẩm</div>
        <i class="fa-solid fa-angle-down"></i>
        <i class="fa-solid fa-chevron-up"></i>
      </div>
      <div class="ndmt">
        <pre class="ndcct textmt">
          {{ product.description }}
        </pre>
      </div>
    </div>
    <div class="warpkt">
      <div class="ms">Số lượng</div>
      <div class="wsl">
        <button class="btsl btgiam" @click="reduce">
          <i class="fa-solid fa-minus"></i>
        </button>
        <input
          type="text"
          role="spinbutton"
          :value="valueSl"
          class="ipsl"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
        />
        <button class="btsl bttang" @click="increase">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="warpkt">
      <div class="cart">
        <button class="tgh gh" @click="AddCart(`${product._id}`)">
          <i class="fa-solid fa-cart-plus"></i>
          Thêm vào giỏ hàng
        </button>
        <router-link :to="{ name: 'cart' }">
          <button class="tgh mn" @click="AddCart(`${product._id}`)">
            Mua ngay
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";
// import CartService from "@/services/cart.service";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: this.product.color,
      valueSl: 1,
      dl: true,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["formatter", "isUserLoggedIn", "AddCartStore"]),

    active() {
      console.log(this.colors.length);
    },

    reduce() {
      if (this.valueSl > 1) {
        this.valueSl--;
      }
    },

    increase() {
      if (this.valueSl < 100) {
        this.valueSl++;
      }
    },

    displaymt() {
      if (this.$refs.mtev.classList.contains("active")) {
        this.$refs.mtev.classList.remove("active");
      } else {
        this.$refs.mtev.classList.add("active");
      }
    },

    formatter(data) {
      const fm = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      data = fm.format(data);
      return data;
    },

    async AddCart(id) {
      if (useAppStore().isUserLoggedIn) {
        await this.AddCartStore(id);
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style scoped>
.cl2 {
  padding: 20px;
}

.tensp {
  font-size: 1.2rem;
  line-height: 2rem;
}

.product_detail_gia {
  font-size: 1.6rem;
  line-height: 2.8rem;
  margin: 20px 0;
  padding: 25px;
  background: #f5f5f5;
  font-weight: bold;
}

.product_detail_giakm {
  color: #ff0000;
}

.product_detail_giagoc {
  color: #9e9e9e;
  padding: 2px 0px;
  text-decoration: line-through;
}

.warpkt {
  padding: 24px 0;
  display: flex;
  align-items: center;
}

.ms {
  width: 260px;
  font-size: 1.2rem;
  text-transform: capitalize;
  flex-shrink: 0;
  align-items: center;
}

.btms button {
  overflow: visible;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 28px;
  margin: 0 8px 8px 0;
  color: rgba(0, 0, 0, 0.8);
  text-align: left;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  position: relative;
  background: #fff;
  outline: 0;
  text-align: center;
  font-size: 1.2rem;
}

.mt {
  position: relative;
  padding: 6px 0;
  z-index: 100;
  width: 600px;
}

.mt::after {
  content: "";
  width: 150px;
  height: 1px;
  background: #000;
  position: absolute;
  top: 35px;
  /* left: 15px; */
}

.ct {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
}

.ndct {
  padding-top: 12px;
}

.hmt {
  font-size: 1.2rem;
}

.ndmt {
  display: none;
  width: 100%;
  top: 45px;
  font-size: 1rem;
  line-height: 1.8rem;
  background-color: #ffff;
  white-space: wrap;
  text-overflow: ellipsis;
  /* box-shadow: 0px 0px 4px 0.5px #999999; */
}

.mt.active .ndmt {
  display: block;
}

.ctcct {
  color: #757575;
  width: 45%;
  font-weight: 600;
}

.ndcct {
  display: flex;
  text-align: start;
  padding: 12px 0;
  white-space: wrap;
}

.textmt {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  display: block;
  white-space: pre-line;
  overflow: hidden;
  text-indent: 0%;
}

.fa-chevron-up {
  display: none;
}

.mt.active .fa-chevron-up {
  display: block;
}

.mt.active .fa-angle-down {
  display: none;
}

.wsl {
  display: flex;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.09);
}

.ipsl {
  width: 60px;
  text-align: center;
  border-radius: 0px;
  border: none;
  outline: none;
}

.btsl {
  width: 45px;
  border-radius: 0px;
  text-align: center;
  border-radius: 0px;
  border: none;
  background: #fff;
  cursor: pointer;
}

.btgiam {
  border-right: rgba(0, 0, 0, 0.09) 1px solid;
}

.bttang {
  border-left: rgba(0, 0, 0, 0.09) 1px solid;
}

.tgh {
  height: 50px;
  text-transform: capitalize;
  padding: 6px 14px;
  overflow: hidden;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

.gh {
  margin-right: 45px;
  background-color: var(--backg);
  border: var(--backg);
}

.tgh:hover {
  opacity: 0.8;
}

.mn {
  background: #cd5c5c;
  border: #cd5c5c 1px solid;
}

.mn a {
  color: #fff;
  text-decoration: none;
}

.btms button:hover {
  border: #cd5c5c 1px solid;
  color: #cd5c5c;
}
</style>
