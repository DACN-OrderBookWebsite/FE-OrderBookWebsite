<template>
  <div>
    <b-button variant="outline-primary" v-b-toggle.sidebar-no-header
      >Open Sidebar</b-button
    >
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Admin</h4>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="/admin/users" @click="hide"
                >Quản Lý Người Dùng</b-nav-item
              >
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide"
            >Close Sidebar</b-button
          >
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
  <script>
import BootstrapSidebar from "vue-bootstrap-sidebar";
export default {
  name: "AdminSidebar",
  components: {
    BootstrapSidebar,
  },
  data() {
    return {
      initialShow: true,
    };
  },
  methods: {},
};
</script>
<style lang="scss">
/* @import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss"; */
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme.scss";
</style>

<style>
body {
  padding: 0;
}
</style>