<template>
  <div>
    <Header>

    </Header>
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

export default {
  name: 'IndexPage',
  components: {Login, User, Footer, Header, Error}
}
</script>
