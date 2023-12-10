<template>
  <div id="app">
    <Header> </Header>
    <HeroSection></HeroSection>
    <ProductDetails></ProductDetails>
    <Footer> </Footer>
  </div>
</template>
    
    <script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetails from "../../components/ProductDetails";
import HeroSection from "../../components/HeroSection";

export default {
  name: "GiaoTrinhDaiCuong",
  components: { ProductDetails, HeroSection, Footer, Header },
};
</script>
    <style>
</style>
    