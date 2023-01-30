<template>
  <div class="emptyCart">
    <img
      :src="`${require('@/assets/img/imgLocal/shopping-basket-add-icon-removebg-preview.png')}`"
      alt=""
      class="imgEmptyCart"
    />
    <p class="empty__note">Không có sản phẩm nào trong giỏ hàng của bạn</p>
    <router-link class="empty__btn" :to="{ name: 'home' }"
      >Tiếp tục mua sắm</router-link
    >
  </div>
</template>

<style scoped>
.emptyCart {
  margin: 80px;
  text-align: center;
}

.imgEmptyCart {
  width: 280px;
}

.empty__note {
  font-size: 1.3rem;
  margin-bottom: 30px;
  font-weight: 500;
}

.empty__btn {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;
  background-color: var(--hover);
  cursor: pointer;
  padding: 10px 55px;
  display: inline-block;
  border-radius: 4px;
  align-items: center;
}

.empty__btn:hover {
  background-color: #cd5c5c;
}
</style>
