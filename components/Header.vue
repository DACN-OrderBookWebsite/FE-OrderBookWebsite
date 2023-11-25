<template>
  <header>
    <img src="@/static/images/backgrounds/banner.jpg" alt="Header Image" class="centered-image" />
  </header>
</template>

<script>
export default {
  name: "Header.vue"
}
</script>

<style scoped>
.centered-image {
  display: block;
  margin: 0 auto; /* Căn giữa hình ảnh */
  height: 134px;
  width: 1140px;
}
</style>
