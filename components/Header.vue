<template>
  <header class="header">
    <nuxt-link to="/">
      <div class="logo-container">
        <img src="@/static/images/backgrounds/HufiLogo.png" alt="HUIT Logo" class="logo" />
        <div class="university-info">
        </div>
      </div>
    </nuxt-link>
    <div class="search-container">
      <input type="text" placeholder="Nhập Tên sách" class="search-input" v-model="searchData"
        @keyup.enter="handleEnterKey" />
      <button class="search-btn">
        <i class="search-icon" @click="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
            <path
              d="M7.73631 11.8166L8.21846 11.4551L7.77419 11.0479C6.54136 9.91812 5.83675 8.50892 5.83675 6.99844C5.83675 5.26295 6.77788 3.64948 8.37371 2.45265C9.96944 1.2559 12.1947 0.5 14.6684 0.5C17.142 0.5 19.3673 1.2559 20.963 2.45265C22.5589 3.64948 23.5 5.26295 23.5 6.99844C23.5 8.73394 22.5589 10.3474 20.963 11.5442C19.3673 12.741 17.142 13.4969 14.6684 13.4969L14.6676 13.4969C12.6032 13.5002 10.6138 12.9646 9.04014 11.997L8.75037 11.8188L8.47824 12.023L1.34291 17.3749L0.833236 16.9924L7.73631 11.8166ZM8.77826 12.4229C10.4389 13.444 12.521 14.0004 14.6684 13.9969L8.77826 12.4229ZM22.6337 6.99844C22.6337 5.25643 21.6963 3.72022 20.2512 2.63644C18.8067 1.55305 16.8325 0.899689 14.6684 0.899689C12.5043 0.899689 10.5301 1.55305 9.08552 2.63644C7.64043 3.72022 6.70308 5.25643 6.70308 6.99844C6.70308 8.74046 7.64043 10.2767 9.08552 11.3604C10.5301 12.4438 12.5043 13.0972 14.6684 13.0972C16.8325 13.0972 18.8067 12.4438 20.2512 11.3604C21.6963 10.2767 22.6337 8.74046 22.6337 6.99844Z"
              fill="#111111" stroke="#868484" />
          </svg>
        </i>
      </button>
    </div>
    <div class="user-interactions">
      <nuxt-link v-if="isNotLogin" to="/loginkeycloak" class="account-link">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.45078 0C3.964 0 1.93523 1.85841 1.93523 4.13636C1.93523 5.56045 2.72868 6.825 3.9311 7.57132C1.63011 8.47541 0 10.5672 0 13H1.29016C1.29016 10.3823 3.59308 8.27273 6.45078 8.27273C9.30847 8.27273 11.6114 10.3823 11.6114 13H12.9016C12.9016 10.5672 11.2714 8.476 8.97045 7.57073C9.58414 7.19123 10.087 6.67975 10.4349 6.08104C10.7828 5.48233 10.9653 4.81463 10.9663 4.13636C10.9663 1.85841 8.93755 0 6.45078 0ZM6.45078 1.18182C8.23958 1.18182 9.67617 2.49777 9.67617 4.13636C9.67617 5.77495 8.23958 7.09091 6.45078 7.09091C4.66198 7.09091 3.22539 5.77495 3.22539 4.13636C3.22539 2.49777 4.66198 1.18182 6.45078 1.18182Z"
              fill="#2C7ECA" />
          </svg>
        </i>
        TÀI KHOẢN
      </nuxt-link>
      <div v-else>
        <button @click="LogOut" class="account-link">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M6.45078 0C3.964 0 1.93523 1.85841 1.93523 4.13636C1.93523 5.56045 2.72868 6.825 3.9311 7.57132C1.63011 8.47541 0 10.5672 0 13H1.29016C1.29016 10.3823 3.59308 8.27273 6.45078 8.27273C9.30847 8.27273 11.6114 10.3823 11.6114 13H12.9016C12.9016 10.5672 11.2714 8.476 8.97045 7.57073C9.58414 7.19123 10.087 6.67975 10.4349 6.08104C10.7828 5.48233 10.9653 4.81463 10.9663 4.13636C10.9663 1.85841 8.93755 0 6.45078 0ZM6.45078 1.18182C8.23958 1.18182 9.67617 2.49777 9.67617 4.13636C9.67617 5.77495 8.23958 7.09091 6.45078 7.09091C4.66198 7.09091 3.22539 5.77495 3.22539 4.13636C3.22539 2.49777 4.66198 1.18182 6.45078 1.18182Z"
                fill="#2C7ECA" />
            </svg>
          </i>
          Log out
        </button>
        <button @click="DoiMatKhau" class="account-link">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M6.45078 0C3.964 0 1.93523 1.85841 1.93523 4.13636C1.93523 5.56045 2.72868 6.825 3.9311 7.57132C1.63011 8.47541 0 10.5672 0 13H1.29016C1.29016 10.3823 3.59308 8.27273 6.45078 8.27273C9.30847 8.27273 11.6114 10.3823 11.6114 13H12.9016C12.9016 10.5672 11.2714 8.476 8.97045 7.57073C9.58414 7.19123 10.087 6.67975 10.4349 6.08104C10.7828 5.48233 10.9653 4.81463 10.9663 4.13636C10.9663 1.85841 8.93755 0 6.45078 0ZM6.45078 1.18182C8.23958 1.18182 9.67617 2.49777 9.67617 4.13636C9.67617 5.77495 8.23958 7.09091 6.45078 7.09091C4.66198 7.09091 3.22539 5.77495 3.22539 4.13636C3.22539 2.49777 4.66198 1.18182 6.45078 1.18182Z"
                fill="#2C7ECA" />
            </svg>
          </i>
          Đổi mật khẩu
        </button>
      </div>
      <nuxt-link to="/ShoppingCart" class="cart-link">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.38909 0C4.91327 0 3.70188 1.12675 3.70188 2.49943V2.99932H1.04798L1.01466 3.46822L0.477218 12.4662L0.443359 12.9971H12.3343L12.301 12.4657L11.7635 3.46772L11.7297 2.99932H9.07631V2.49943C9.07631 1.12675 7.86491 0 6.38909 0ZM6.38909 0.999774C6.81671 0.999774 7.22681 1.15777 7.52918 1.43901C7.83155 1.72026 8.00142 2.1017 8.00142 2.49943V2.99932H4.77676V2.49943C4.77676 2.1017 4.94663 1.72026 5.249 1.43901C5.55138 1.15777 5.96148 0.999774 6.38909 0.999774ZM2.05569 3.9991H3.70188V5.49876H4.77676V3.9991H8.00142V5.49876H9.07631V3.9991H10.7225L11.1928 11.9973H1.58596L2.05569 3.9991Z"
              fill="#2C7ECA" />
          </svg>
        </i>
        GIỎ HÀNG: ({{ CartQuantity }})
      </nuxt-link>
      <a href="#" class="wishlist-link">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
            <path
              d="M2.09256 7.64435C0.348151 5.5258 0.929619 2.34797 3.83696 1.2887C6.7443 0.229422 8.4887 2.34797 9.07017 3.40725C9.65164 2.34797 11.9775 0.229422 14.8849 1.2887C17.7922 2.34797 17.7922 5.5258 16.0478 7.64435C14.3034 9.7629 9.07017 14 9.07017 14C9.07017 14 3.83696 9.7629 2.09256 7.64435Z"
              stroke="#2C7ECA" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </i>
        YÊU THÍCH
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  // Your Vue component data and methods here
  data() {
    return {
      CartQuantity: 0,
      isNotLogin: true,
      searchData: "",
    };
  },
  mounted() {
    this.getCartTotalQuantity();
    this.fetch();
  },
  computed: {
    cartTotalQuantity() {
      return this.getCartTotalQuantity();
    }
  },
  methods: {
    getCartTotalQuantity() {
      const response = this.$cart.getCart();
      const totalQuantity = response.reduce((total, item) => total + item.stock, 0);
      this.CartQuantity = totalQuantity;
      return totalQuantity;
    },
    fetch() {
      const response = this.$login.getLogin();
      this.isNotLogin = response.length === 0 ? true : false;
    },
    LogOut() {
      try {
        this.$login.clearLogin();
        console.log(this.$login.getLogin());
        this.$router.push('/loginkeycloak');
      } catch (error) {
        console.error(error);
      }
    },
    search() {
      this.$router.push(`/TimKiem/` + this.searchData);
    },
    handleEnterKey() {
      this.search();
    },
    DoiMatKhau() {
      try {
        const response = this.$login.getLogin();
        this.$router.push('/user/DoiMatKhau/' + response[0].id);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eaeaea;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 385px;
  height: 86px;
  /* Adjust as per your logo's aspect ratio */
  margin-right: 1rem;
  margin-left: 1rem;
}

.university-info h1 {
  font-size: 0.9rem;
  margin: 0;
  color: #003366;
  /* Dark blue color */
}

.account-link {
  color: #2C7ECA;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.68px;
  text-transform: uppercase;
}

.cart-link {
  color: #2C7ECA;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.68px;
  text-transform: uppercase;
}

.wishlist-link {
  color: #2C7ECA;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.68px;
  text-transform: uppercase;
}

.university-info p {
  font-size: 0.8rem;
  margin: 0;
  color: #666666;
  /* Grey color */
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 80px;
}

.search-icon {
  width: 24px;
  height: 18px;
  flex-shrink: 0;
  fill: #111;
  stroke-width: 1px;
  stroke: #868484;
}

.search-input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #cccccc;
  width: 432px;
  height: 45px;
  border-radius: 20px;
}

.search-btn {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #333333;
}

.user-interactions {
  display: flex;
  align-items: center;
  margin-right: 50px;
}

.user-interactions a {
  text-decoration: none;
  margin-left: 1rem;
  font-size: 0.9rem;
}

.user-interactions a:hover {
  text-decoration: underline;
}
</style>
