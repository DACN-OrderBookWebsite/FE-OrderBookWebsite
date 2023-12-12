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
    { src: '~/plugins/client-only.js', mode: 'client' },
    '~/plugins/cart.js',
    '~/plugins/login.js',
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
    '@nuxtjs/auth',
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
      {
        path: '/generalCurriculum',
        name: 'GiaoTrinhDaiCuong',
        component: '~/pages/GiaoTrinhDaiCuong/index.vue'
      },
      {
        path: '/GiaoTrinhTheoKhoa',
        name: 'GiaoTrinhTheoKhoa',
        component: '~/pages/GiaoTrinhTheoKhoa/index.vue'
      },
      {
        path: '/examSyllabus',
        name: 'ExamSyllabus',
        component: '~/pages/GiaoTrinhDeThi/index.vue'
      },
      {
        path: '/contactUs',
        name: 'ContactUs',
        component: '~/pages/contactUs/index.vue'
      },
      {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: '~/pages/ShoppingCart'
      },
      // Các route khác

    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Đặt cơ sở URL của API
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true, // Quan trọng để gửi cookie qua các domain khác nhau
    // Cấu hình tiêu đề mặc định (ví dụ: token xác thực)
    headers: {
      common: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiNTZlZWZhMGI5ZmE0MTQzNTQ2OTgzMWY0YTVlNWRhYjYxYTU3MGJmMzViM2NkMDM3Zjc1NGU3OTEyOWQxZmEzOGUwMzZmOGI2MDNlMDM5OGYiLCJpYXQiOjE3MDIxNDQ5NjAuNjM1MTk1LCJuYmYiOjE3MDIxNDQ5NjAuNjM1MTk5LCJleHAiOjE3MzM3NjczNjAuNjI3NTk3LCJzdWIiOiI1MyIsInNjb3BlcyI6W119.vnknSXIIFfvkpTRjQ79O7POtlNx1bAiaL5AD9NE1-KVU5ykfjsFKTBL6gRbXmNWBO9YyXsmKJDxnpQOx4grUVoyEp_qIbiBAClyMU6hSHveN4AplKiLR7mdkOMk2APKeviG3tEyYbVCnTtx-RRKUsdX1IbYbGwf96Hxm0pfzrnmeu7fPGrNSqbA6A6-vBjxVHy0nFCjerO4rgt5hDIhoMIRLJQ9upMX7goUjetrsX2Gzy9XgmwDjWr2rxakSmvMbuyq3x3uy8p-IIuQOtABFWM-kX_HkE9HdA0yVI4sgtkwQlS-zrKM7F1UAoXQy2WRiPsije-G__PVWSQRBKU6ACAphbs3IxG4M4fzogXW29bACcIhSm7_M7bcsgvvMJ5z2_youTjIUKXjKZr2YWRChkPJBM8zPIeJkuGST2OKPR4WWyCnpVv2LGPnzMpuFU4Z5L5xV-knvSB2EIoizn3ZsupCDg3jCH1FbRZGc2BktekRevpcWoiSpeXKeeeBJ_VEE4gwFVCXrIKUfkWT0ZLAfAeWeFsfX8GyIZhss9wuJ92XHoAbW35-Yatu8A42MWqIil8eGvHw7z6-u-e0NJewW4vO81pH52easbHdDyp73qvyvPUQQacrWzDYfDeSgR8TDgy_id-6Mch6HHaiZfHHh153puRx_7y2rz9iqMieqKS0'
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
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/logout', method: 'post' },
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/loginkeycloak',
      logout: '/',
      home: '/'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
