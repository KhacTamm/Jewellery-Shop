<template>
  <div class="SearchEmpty">
    <div>
      <img :src="imge" />
      <h5 class="textSearchEmpty">
        Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imge: require("@/assets/img/imgLocal/404.png"),
    };
  },
};
</script>

<style>
.SearchEmpty {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  text-align: center;
}

.textSearchEmpty {
  text-align: center;
}
</style>
