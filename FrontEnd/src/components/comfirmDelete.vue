<template>
  <!-- {{!-- comfirm delete course--}} -->
  <div
    class="modal fade"
    id="delete-Modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Xóa sản phẩm {{ id }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Bạn có muốn xóa sản phẩm đang chọn?</div>
        <div class="modal-footer">
          <button
            ref="form"
            id="btn-delete-course"
            class="btns button_comfirm"
            @mousedown="comfirmDelete"
            v-on:click.prevent
          >
            Xác nhận
          </button>
          <button
            type="button"
            class="btns button_update"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    comfirmDelete() {
      console.log(this.id);
      this.$emit("delete:product");
    },
  },
  //   emits: "delete:product",
};
</script>

<style></style>
