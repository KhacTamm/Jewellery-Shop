<template>
  <header class="header">
    <img :src="Logo" alt="" />
    <div class="tkh" :class="{ ds: isdisplay }">
      <div v-if="!currentUser" class="tkcdn">
        <router-link to="/register" class="dk tk">Đăng Ký</router-link>
        <router-link to="/login" class="tk">Đăng Nhập</router-link>
      </div>
      <div v-if="currentUser" class="tkddn">
        <div class="accountName">
          {{ currentUser.username }}
        </div>
        <div class="btn" @click="displayMenuAccount">
          <i class="fas fa-caret-down btn-ac"></i>
          <i class="fas fa-caret-up btn-ac"></i>
          <ul class="content__account">
            <!-- <li class="item_account">
              <router-link :to="{ name: 'home' }"> Tài Khoản </router-link>
            </li> -->
            <a class="item_account" href="" @click="handleLogout">Đăng xuất</a>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import { useProductStore } from "@/stores/products.store";
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app.store";

export default {
  data() {
    return {
      Logo: require("../assets/img/imgLocal/logo.png"),
      isdisplay: false,
    };
  },
  computed: {
    ...mapState(useAppStore, {
      currentUser: "user",
    }),
  },
  methods: {
    ...mapActions(useAppStore, ["logout", "loadAuthState"]),

    handleLogout() {
      this.logout();
      this.$router.push({ name: "login" });
    },
    displayMenuAccount() {
      this.isdisplay = !this.isdisplay;
    },
  },
  created() {
    this.loadAuthState();
  },
};
</script>

<style scoped>
.header img {
  width: 100%;
  height: 300px;
}

.tkh {
  position: absolute;
  right: 180px;
  top: 10px;
  font-weight: 500;
  font-size: 1.1rem;
}

.tk {
  text-decoration: none;
  color: #fff;
  padding: 0px 8px;
}

.tk:hover {
  color: #000;
}

.dk {
  border-right: #dddddd 1px solid;
}

.tkddn {
  display: flex;
  color: #fff;
  text-shadow: 2px 2px 2px var(--hover);
}

.fas {
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
}

.tkh .fa-caret-up {
  display: none;
}

.tkh.ds .fa-caret-up {
  display: inline-block;
}

.tkh.ds .fa-caret-down {
  display: none;
}

.content__account {
  position: absolute;
  width: 100%;
  background-color: rgba(154, 181, 200, 0.8);
  right: -2px;
  top: 95%;
  display: none;
  cursor: pointer;
  color: #fff;
  text-align: center;
  text-shadow: none;
  padding: 6px 0;
  border-radius: 6px;
}

.item_account {
  padding: 8px;
  font-weight: 650;
  color: #000;
}

.content__account:hover {
  opacity: 0.8;
}

.tkh.ds .content__account {
  display: block;
}

.accountName {
  font-size: 1.3rem;
}
</style>
