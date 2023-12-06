<template>
  <div id="app">
    <Header> </Header>
    <HeroSection></HeroSection>
    
    <Footer> </Footer>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";

export default {
  name: "IndexPage",
  components: { HeroSection, Footer, Header },
};
</script>
<style>
</style>
