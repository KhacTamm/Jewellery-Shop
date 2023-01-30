<template>
  <div class="wape">
    <div class="content_about">
      <div class="cl1">
        <div class="content_cl1" v-for="(img, item) in imgAbout1" :key="item">
          <div class="img_cl1">
            <img :src="`${require('@/assets/img/about' + img)}`" alt="" />
          </div>
        </div>
      </div>
      <div class="cl2">
        <div class="content_c2">
          <div class="text_about">
            <h2>
              Velastro là local brand được thành lập và xuất hiện lần đầu tiên
              vào đầu tháng 12-2022.
            </h2>
            <p>
              Với nổ lực không ngừng Velastro đã mang đến một góc nhìn khác hơn
              về giá thành của thương hiệu VIỆT Bước ngoặc lớn nhất vào tháng
              05-2021 Velastro tự hào là local đầu tiên đưa sản phẩm về mức giá
              #SALE 99K nhưng vẫn đảm bảo tuyệt đối chất lượng đầu ra của thương
              hiệu với tiêu chí : “ rẻ - đẹp - chất lượng “
            </p>
            <p>
              Và hứa hẹn trong tương lai chúng ta sẽ cùng bùng nổ hơn nữa chứ
              không phải chỉ riêng khoảnh khắc này Hãy cùng nhau đón chờ những
              sản phẩm mới nhất từ Velastro nhé. Cảm ơn các bạn rất nhiều!
            </p>
          </div>
          <div class="cl2_bottom">
            <div class="text">
              <span>08:00 AM - 22:00 PM</span>
              <p>59A Âu cơ, Phường 14, Quận 11, TP. HCM</p>
              <ul class="about_item">
                <h2>More Info</h2>
                <li>
                  <i class="fa-solid fa-phone"></i>
                  0999999999
                </li>
                <li>
                  <i class="fa-solid fa-envelope"></i>
                  Velastro@gmail.com
                </li>
                <li>
                  <a href="">
                    <i class="fa-brands fa-facebook"></i>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-brands fa-instagram"></i>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-brands fa-twitter"></i>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-brands fa-tiktok"></i>
                    Tiktok
                  </a>
                </li>
              </ul>
            </div>
            <div class="img_cl2">
              <img
                :src="`${require('@/assets/img/about' + imgAbout2)}`"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgAbout1: ["/hinh1.1.png", "/hinh1.3.png"],
      imgAbout2: "/hinh2.3.png",
    };
  },
};
</script>

<style>
.wape {
  margin: 24px auto;
}

.content_about {
  display: flex;
  justify-content: space-between;
}

.img_cl1 {
  width: 300px;
}

.img_cl1 img {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

.cl2 {
  width: 72%;
  height: 100%;
}
/* 
.text_about {
  height: 532px;
  line-height: 2rem;
} */

.text_about h2 {
  font-size: 1.6rem;
}

.cl2_bottom {
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
}

.text {
  padding: 0 30px;
}

.text span {
  font-size: 1.8rem;
}

.about_item {
  margin-top: 24px;
}

.text h2 {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 8px 0;
  color: #00007f;
  text-decoration: underline;
}

.img_cl2 img {
  width: 330px;
}

/* stype footer */
.item-footer {
  line-height: 2rem;
}

.about_item li {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 3rem;
}

.about_item li i {
  margin-right: 8px;
}

.about_item li,
.about_item li a {
  color: #4c4c4c;
}
.about_item li:hover,
.about_item li a:hover {
  color: var(--hover);
}
</style>
