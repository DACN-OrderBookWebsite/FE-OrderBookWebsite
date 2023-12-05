export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FE-OrderBookWebsite',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  router: {
    routes: [
      {
        path: '/user/edit/:id',
        name: 'UserEdit',
        component: '~/pages/user/_id.vue'
      },
      {
        name: 'UserList',
        path: '/loginkeycloak',
        component: '~/pages/loginkeycloak/index.vue'
      },
      {
        name: 'UserCreate',
        path: '/user/create',
        component: '~/pages/user/create.vue'
      },
      // Các route Admin
      {
        name: 'Admin',
        path: '/admin',
        component: '~/pages/admin/index.vue'
      },
      {
        path: '/admin/product',
        component: '~/pages/admin/product.vue'
      },
      {
        path: '/admin/users',
        component: '~/pages/admin/users.vue'
      },
      {
        path: '/admin/importproduct',
        component: '~/pages/admin/importproduct.vue'
      },
      {
        path: '/admin/ordermanagement',
        component: '~/pages/admin/ordermanagement.vue'
      },
      {
        name: 'UserCreate',
        path: '/admin/users/create',
        component: '~/pages/admin/users/create.vue'
      },
      {
        path: '/admin/users/edit/:id',
        name: 'UserEdit',
        component: '~/pages/admin/users/_id.vue'
      },
      // Các route khác

    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Đặt cơ sở URL của API
    baseURL: 'http://127.0.0.1:8000',

    // Cấu hình tiêu đề mặc định (ví dụ: token xác thực)
    headers: {
      common: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
      }
    },
    // Cấu hình interceptors nếu cần
    requestInterceptor: (config, { store }) => {
      // Thêm mã xác thực vào mọi request nếu cần
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`;
      return config;
    },

    responseInterceptor: (response) => {
      // Xử lý mọi phản hồi từ API
      return response;
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
