<template>
  <div id="app">
    <div class="wide">
      <app-header> </app-header>
      <app-navbar> </app-navbar>
      <div class="content_app">
        <router-view />
      </div>
    </div>
    <app-footer> </app-footer>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppNavbar,
    AppFooter,
  },
};
</script>

<style scoped>
.content_app {
  margin: 40px 0;
}
</style>
