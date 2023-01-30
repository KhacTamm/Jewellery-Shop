<template>
  <div class="product">
    <div class="img">
      <router-link
        :to="{ name: 'productdetail', params: { id: _id } }"
        class="sp_link"
      >
        <img
          :src="`${require('@/assets/img/product/' + img[0])}`"
          alt=""
          class="imgproduct"
        />
      </router-link>
    </div>
    <div class="ttsp">
      <div class="tensp">
        <router-link :to="{ name: 'productdetail', params: { id: _id } }">
          {{ name }}
        </router-link>
      </div>
      <div class="ttg">
        <div class="gia">
          <div class="giakm">{{ formatter(`${PrPrice}`) }}</div>
          <div class="giagoc">{{ formatter(`${BaPrice}`) }}</div>
        </div>
        <a href="./cart" @click.prevent="AddCart(_id)">
          <i class="fa-solid fa-cart-plus"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";

export default {
  props: {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    PrPrice: {
      type: Number,
      required: true,
    },
    BaPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState(useAppStore, {
      products: "products",
    }),
  },
  methods: {
    ...mapActions(useAppStore, ["formatter", "isUserLoggedIn", "AddCartStore"]),

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
.product {
  background: #fff;
  position: relative;
  overflow: visible;
  cursor: pointer;
}

.img {
  /* position: relative; */
  height: 250px;
  width: 100%;
  margin-bottom: 12px;
  overflow: hidden;
}

.imgproduct {
  /* position: absolute; */
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  transition: all 0.5s ease-in-out;
}

.imgproduct:hover {
  filter: brightness(95%);
  transform: scale(1.2);
}

.tensp {
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding: 0 6px;
  line-height: 1.6rem;
  font-size: 0.9rem;
  height: 55px;
}

.gia {
  padding: 6px;
  font-weight: 700;
}

.giakm {
  color: #ff0000;
}

.giagoc {
  color: #9e9e9e;
  padding: 2px 0px;
  text-decoration: line-through;
}

.ttg {
  display: flex;
  justify-content: space-between;
}

.fa-cart-plus {
  padding: 30px 20px 0px 4px;
  font-size: 1.4rem;
}
</style>
