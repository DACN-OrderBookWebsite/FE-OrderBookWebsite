<template>
  <b-container fluid class="hero-section">
    <b-row class="hero-section-col" cols="1" cols-sm="2" cols-md="4" cols-lg="6">
      <b-col class="text-hero">TRANG CHỦ</b-col>
      <b-col class="text-hero-support">|</b-col>
      <b-col class="text-hero">GIÁO TRÌNH ĐẠI CƯƠNG</b-col>
      <b-col class="text-hero-support">|</b-col>
      <b-col class="text-hero">GIÁO TRÌNH THEO KHOA</b-col>
      <b-col class="text-hero-support">|</b-col>
      <b-col class="text-hero">GIÁO TRÌNH ĐỀ THI</b-col>
      <b-col class="text-hero-support">|</b-col>
      <b-col class="text-hero">LIÊN HỆ</b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="text-section">
        <h1>HUITZone EDU</h1>
        <p class="subtitle">Góc giáo trình HUIT</p>
        <p>Trọn bộ giáo trình Tân sinh viên Đại học không khó cùng HUITZone</p>
        <b-button variant="primary" class="mt-3">Tìm hiểu thêm</b-button>
        <b-carousel id="carousel-1" :interval="4000" controls indicators>
          <!-- Slides with image content -->
          <b-carousel-slide caption="Slide 1" img-src="path-to-your-image-1.jpg"></b-carousel-slide>
          <!-- Add more slides as needed -->
        </b-carousel>
      </b-col>
      <b-col md="6" class="image-section">
        <!-- Image goes here, adjust path accordingly -->
        <b-img src="path-to-your-building-image.jpg" alt="HUIT Building"></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'HeroSection',
  // You can add your script here if needed
};
</script>

<style scoped>
.hero-section {
  padding: 40px 0;
  justify-content: center;
  background-color: #f8f9fa; /* Or any other background color you prefer */
}
.text-hero {
  color: #111;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.16px;
  text-transform: capitalize;
}
.text-section h1 {
  color: #004085; /* Or any other color you prefer */
  margin-bottom: 0.5rem;
}
.hero-section-col {
  justify-content: center;
}
.text-hero-support {
  color: #D1D1D1;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.16px;
  text-transform: capitalize;
}
.text-section .subtitle {
  font-size: 1.25rem;
  color: #007bff; /* Or any other color you prefer */
}

.text-section p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Customize Bootstrap button styles if needed */
.btn-primary {
  background-color: #007bff; /* Or use your brand primary color */
  border-color: #007bff; /* Or use your brand primary color */
}

/* Customize the carousel indicators */
.carousel-indicators li {
  background-color: #007bff; /* Or use your brand primary color */
}

/* Ensure your images in the carousel are displayed correctly */
.b-carousel-slide {
  text-align: center;
}
.b-carousel-slide img {
  width: auto;
  max-height: 500px; /* Adjust this value based on your design */
  margin: 0 auto;
}

/* Additional responsive styles if needed */
@media (max-width: 768px) {
  .hero-section {
    padding: 20px 0;
  }

  .text-section, .image-section {
    text-align: center;
  }

  .image-section {
    margin-top: 20px;
  }
}
</style>
