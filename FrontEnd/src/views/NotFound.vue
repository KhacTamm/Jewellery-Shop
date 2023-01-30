<template>
  <div class="container">
    <div class="wapper">
      <h1 class="NotFound_number">404</h1>
      <div class="NotFound_text">
        <h2>RẤT TIẾC, TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI</h2>
        <p>Trang đã bị xóa hoặc địa chỉ url không đúng!!!</p>
      </div>
      <router-link to="/" class="NotFound_back">Trang chủ</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  margin: 50px 0 160px 0;
}

.wapper {
  text-align: center;
}

.container .NotFound_number {
  font-size: 12rem;
  font-weight: 600;
  text-shadow: 5px 2px 4px grey;
  color: var(--backg);
}

.NotFound_text {
  margin-bottom: 50px;
}

.NotFound_text h2 {
  font-size: 1.6rem;
  font-weight: 500;
  padding: 16px;
}

.NotFound_text p {
  font-size: 1.2rem;
}

.NotFound_back {
  padding: 12px 24px;
  background-color: var(--hover);
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 6px;
}

.NotFound_back:hover {
  opacity: 0.8;
}
</style>
