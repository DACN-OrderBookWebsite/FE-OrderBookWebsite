<template>
  <div id="app">
    <Header>

    </Header>
    <hero-section></hero-section>
    <Login></Login>
    <Footer>

    </Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "./user";
import Login from "./loginkeycloak";
import HeroSection from "../components/HeroSection";

export default {
  name: 'IndexPage',
  components: {HeroSection, Login, User, Footer, Header, Error}
}
</script>
<style>
body, html {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1; /* This allows the content to expand and push the footer down */
}
</style>
