<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-column">
        <h4>Thông tin</h4>
        <ul>
          <li>Thông tin tuyển dụng</li>
          <li>Ba công khai</li>
          <li>Cơ sở vật chất</li>
          <!-- ... other list items ... -->
        </ul>
      </div>
      <div class="footer-column">
        <h4>Media</h4>
        <ul>
          <li>Bản tin HUIT</li>
          <li>Thư điện tử</li>
          <!-- ... other list items ... -->
        </ul>
      </div>
      <div class="footer-column contact-info">
        <h4>THÔNG TIN LIÊN HỆ</h4>
        <p><strong>Đơn vị:</strong> Trường Đại học Công Thương TP. Hồ Chí Minh</p>
        <p><strong>Địa chỉ:</strong> 140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, TP.HCM</p>
        <p><strong>Điện thoại:</strong> 0283 8163 318</p>
        <p><strong>Email:</strong> infor@hufi.edu.vn</p>
      </div>
      <div class="footer-column">
        <h4>Kết nối với chúng tôi</h4>
        <ul class="social-icons">
          <li><a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
          <li><a href="https://www.tiktok.com" target="_blank"><i class="fab fa-tiktok"></i></a></li>
          <li><a href="https://www.youtube.com" target="_blank"><i class="fab fa-youtube"></i></a></li>
          <li><a href="https://zalo.me" target="_blank"><i class="fab fa-twitter"></i></a></li> <!-- Note: Zalo doesn't have an official Font Awesome icon -->
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <!-- Any additional footer content -->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  // Vue component logic
};
</script>

<style scoped>
.footer {
  background-color: #00467F; /* Adjust based on your brand color */
  color: #fff;
  padding: 20px 0;
  margin-top: 100px;
  flex-shrink: 0;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 20px;
}

.footer-column {
  margin: 10px;
  flex: 1;
  min-width: 200px;
}

.footer-column h4 {
  color: #FFD700; /* or any other color based on your design */
}

.contact-info strong {
  color: #FFD700;
}

.social-icons {
  list-style: none;
  padding: 0;
}

.social-icons li {
  display: inline;
  margin-right: 10px;
}

.social-icons li a {
  color: #fff; /* White color for the icons */
  font-size: 24px; /* Size of the icons */
}

.social-icons li a:hover {
  color: #FFD700; /* Gold color on hover, or choose another color */
}

.map-container {
  /* Styles for Google Map container */
  height: 200px; /* Adjust as necessary */
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    align-items: center;
  }

  .footer-column {
    width: 100%;
    margin-bottom: 20px;
  }

  .map-container {
    height: 250px; /* Adjust as necessary */
  }
}

/* Additional custom styles */
</style>
