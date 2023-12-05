<template>
  <div id="error-pages">
    <div>
      <div>
        <div class="image-404">
          <img src="@/static/images/backgrounds/error404.webp">
        </div>
        <div class="notify-404">
          <p class="medium-text">
            KHÔNG TÌM THẤY TRANG
          </p>
          <p>Không tìm thấy URL được yêu cầu trên máy chủ này.</p>
        </div>
      </div>
      <div >
        <div class="image-403">
          <img src="static/images/backgrounds/error403.jpg@/">
        </div>
        <div class="notify-404">
          <p class="medium-text">
            LỖI BỊ CẤM 403
          </p>
          <p>
            Bạn không có quyền truy cập vào tài nguyên này trên máy chủ.
          </p>
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
    <div >
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
        <path
          d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
        />
      </svg>
      <div class="title">
        h1
      </div>
      <p>
        <nuxt-link to="/">
          Return to homepage
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "error.vue"
}
</script>

<style lang="scss">
</style>
