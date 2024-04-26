<script>
import AppHeader from "@/components/admin/AppHeader.vue";
import AppFooter from "./components/admin/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter
  },
};
</script>

<template>
  <div id="app">
    <AppHeader v-if="$route.path.includes('/admin')" />
    <div class="container mt-3 d-flex justify-content-center align-items-center">
      <router-view />
    </div>
    <AppFooter v-if="$route.path.includes('/admin')" />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>