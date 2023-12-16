<template>
  <div id="error-pages">
    <div>
      <div>
        <div class="image-404">
          <img src="@/static/images/backgrounds/error404.webp">
        </div>
      </div>
      <div class="text-center">
        <nuxt-link to="/">
          <button class="button">
            TRỞ VỀ TRANG CHỦ
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error.vue"
}
</script>

<style>
.image-404 {
  object-fit: fill;
}
.image-403 {
  object-fit: fill;
}
</style>
