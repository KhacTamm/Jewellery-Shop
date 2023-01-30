<template>
  <div class="search_iteam">
    <input
      type="text"
      class="search_iteam_input"
      name="input"
      autocomplete="off"
      placeholder="Tìm kiếm sản phẩm..."
      :value="modelValue"
      @keyup.enter="updateModelValue"
      @input="updateText"
    />
    <button
      class="buttonSearch"
      type="button"
      :value="modelValue"
      @keyup.enter="submit"
      @click="updateModelValue"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    <div class="history__search">
      <h4 class="history__search-heading">Lịch sử tìm kiếm</h4>
      <ul class="history__search-list">
        <li class="history__search-item">
          <i class="fas fa-history"></i>
          <router-link to="#" class="history__search-item_text"
            >Top Tik Tok is a nonprofit channel for the only purpose of
            promoting music and artwork and learning english together, if you as
            an Artist/Producer/Label feels unhappy and would like to have your
            music/artwork taken down, please contact us via the email
            (toptiktok.sp@gmail.com) directly before doing anything and we will
            respectfully delete it immediately.</router-link
          >
        </li>
        <li class="history__search-item">
          <i class="fas fa-history"></i>
          <router-link to="#" class="history__search-item_text"
            >see you agin</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", this.text);
      console.log(e.target.value);
      if (this.text) {
        this.$router.push({ name: "SearchView" });
      }
    },
    submit() {
      this.$emit("submit");
      this.$router.push({ name: "SearchView" });
    },
    updateText(e) {
      this.text = e.target.value;
    },
  },
};
</script>

<style scope>
.search_iteam {
  height: 44px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
}

.search_iteam_input,
.buttonSearch {
  border: none;
  outline: none;
  height: 100%;
}

.search_iteam_input {
  width: 85%;
  font-size: 1rem;
  padding-left: 8px;
}

.buttonSearch {
  position: absolute;
  width: 66px;
  cursor: pointer;
  right: 0;
  top: 0;
}

.buttonSearch:hover {
  color: #fff;
  background-color: var(--backg);
}

.buttonSearch:hover i {
  transform: scale(1.5);
}

.search_iteam_input:focus ~ .history__search {
  display: block;
}

.history__search {
  position: absolute;
  display: none;
  top: calc(100% + 8px);
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 8px rgb(111, 158, 197);
  border-radius: 3px;
  z-index: 1;
}

.history__search-item:hover {
  background-color: rgba(211, 211, 211, 0.4);
  color: #000;
}

.input__search:focus ~ .history__search {
  display: block;
}

.history__search-heading {
  padding: 18px 12px 0px 12px;
  font-size: 1.2rem;
}

.history__search-item {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;
}

.fa-history {
  color: #4c4c4c;
}

.history__search-item_text {
  font-size: 1.2rem;
  margin-bottom: 6px;
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
