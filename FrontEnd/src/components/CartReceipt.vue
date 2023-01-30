<template>
  <div class="bill">
    <h3>Tóm Tắt Đơn Hàng</h3>
    <div class="inner_bill">
      <span class="text_content_bill prices_text">
        <i class="fas fa-map-marker-alt"></i>
        Giao tới
      </span>
      <div class="location">
        <div class="location_address">
          {{ User.address }}
        </div>
      </div>
    </div>
    <ul class="prices_items">
      <li class="prices_item">
        <span class="prices_text">Tạm tính</span>
        <span class="prices_value">{{ formatter(`${totalPriceCart}`) }}</span>
      </li>
      <li class="prices_item">
        <span class="prices_text">Phí ship</span>
        <span class="prices_value">{{ formatter(30000) }}</span>
      </li>
    </ul>
    <div class="prices_total">
      <span class="prices_text">Tổng tiền</span>
      <span class="prices_value prices_value--final">{{
        formatter(`${moneyTotalFinal}`)
      }}</span>
    </div>
    <button class="buy">
      <span> Mua Hàng </span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";

export default {
  props: {
    totalPriceCart: {
      type: Number,
    },
  },
  computed: {
    ...mapState(useAppStore, {
      User: "user",
    }),
    moneyTotalFinal() {
      return this.totalPriceCart + 30000;
    },
  },
  methods: {
    ...mapActions(useAppStore, ["formatter"]),
  },
};
</script>

<style scoped>
.bill {
  background-color: #fff;
  padding: 12px;
  line-height: 2rem;
  border-radius: 4px;
}

.prices_items {
  margin: 0px;
  padding: 0px;
  border-bottom: 1px solid rgb(244, 244, 244);
}

.prices_item {
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 6px 0;
}

.prices_text {
  font-weight: 300;
  color: #555;
  display: inline-block;
}

.prices_value {
  font-size: 1.2rem;
}

.prices_total {
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 24px 0;
}

.prices_value--final {
  color: rgb(254, 56, 52);
  font-size: 1.6rem;
  font-weight: 400;
  text-align: right;
}

.inner_bill {
  padding: 6px 0;
  line-height: 2.2rem;
  border-bottom: 1px solid rgb(244, 244, 244);
  border-top: 1px solid rgb(244, 244, 244);
}

.text_content_bill {
  cursor: pointer;
}

.buy {
  border: none;
  width: 100%;
  height: 45px;
  background-color: #0000ff;
}

.buy span {
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
}

.buy:hover {
  opacity: 0.7;
}
</style>
