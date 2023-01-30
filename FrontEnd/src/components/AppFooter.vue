<template>
  <div class="top-ft-wanda">
    <div class="container">
      <div class="d-flex">
        <div class="item-footer">
          <h3>Velastros Fashion</h3>
          <ul class="bottom-icon">
            <li>
              <i class="fa-solid fa-location-dot"></i>
              59A Âu cơ, Phường 14, Quận 11, TP. HCM
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              0999999999
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i>
              Eleastro@gmail.com
            </li>
          </ul>
        </div>
        <div class="item-footer">
          <h3>Thông tin</h3>
          <ul class="bottom-icon">
            <li>
              <router-link to="/about">Về chúng tôi</router-link>
            </li>
            <li>
              <router-link to="#">Thông tin vân chuyển</router-link>
            </li>
            <li>
              <router-link to="#"> Chính sách đổi trả </router-link>
            </li>
            <li>
              <router-link to="#"> Chính sách bảo mật </router-link>
            </li>
          </ul>
        </div>
        <div class="item-footer">
          <h3>Theo dõi chúng tôi trên</h3>
          <ul class="bottom-icon">
            <li>
              <router-link to="#">
                <i class="fa-brands fa-facebook"></i>
                Facebook
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <i class="fa-brands fa-instagram"></i>
                Instagram
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <i class="fa-brands fa-twitter"></i>
                Twitter
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <i class="fa-brands fa-tiktok"></i>
                Tiktok
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-ft-wanda {
  margin-top: 20px;
  background-color: #282828;
}

.container {
  padding: 18px;
}

.d-flex {
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.item-footer {
  line-height: 2rem;
}

.bottom-icon li i {
  margin-right: 8px;
}

.bottom-icon {
  color: #cccccc;
}

.bottom-icon li,
.bottom-icon li a {
  color: #fff;
}
.bottom-icon li a:hover {
  color: var(--hover);
}
</style>
