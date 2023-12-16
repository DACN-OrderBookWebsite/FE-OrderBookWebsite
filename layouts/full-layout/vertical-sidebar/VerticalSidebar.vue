<template>
  <aside class="left-sidebar">
    <div class="scrlbar">
      <ul class="nav flex-column mb-0">
        <template v-for="(route, i) in routes">
          <!--Single Menu with children (Dropdown)-->
          <li
            v-if="route.children"
            :key="`dropdown-${route.id}`"
            class="nav-item nav-item-ul"
          >
            <a
              class="nav-link nav-link-ul d-flex mt-3"
              @click="toggleDropdown(i)"
            >
              <i :class="route.icon"></i>
              <span class="hide-text">{{ route.title }}</span>
              <i :class="route.iconsecond"></i>
            </a>
            <ul
              v-if="activeDropdownIndex === i"
              class="nav flex-column nav-children-item"
            >
              <li
                class="nav-item"
                v-for="(child, index) in route.children"
                :key="`child-${index}`"
              >
                <nuxt-link
                  :to="child.to"
                  class="nav-link"
                  @click.native="navigateTo(child)"
                  >{{ child.title }}</nuxt-link
                >
              </li>
            </ul>
          </li>
          <!--Single Menu without children-->
          <li class="nav-item nav-link-ul mt-3" :key="i" v-else>
            <router-link :to="route.to" class="nav-link d-flex">
              <i :class="route.icon"></i>
              <span class="hide-text">{{ route.title }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>

<script>
import SidebarData from "./SidebarData";

export default {
  name: "VerticalSidebar",
  data: () => ({
    routes: SidebarData,
    activeDropdownIndex: null,
  }),
  methods: {
    toggleDropdown(index) {
      this.activeDropdownIndex =
        this.activeDropdownIndex === index ? null : index;
    },
    navigateTo(route) {
      this.$router.push(route.to);
      console.log(`Navigating to: ${route.to}`);
    },
  },
};
</script>
<style scoped>
.nav-children-item {
  margin-left: 15px;
}
.nav-link-ul {
  background: linear-gradient(
    92deg,
    rgba(44, 126, 202, 0.3) 32.43%,
    rgba(44, 126, 202, 0) 97.38%
  ) !important;
}
.fas {
  font-size: 20px;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  color: #0D6EFD;
}
.far {
  font-size: 20px;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  color: #0D6EFD;
}
.second {
  margin-left: 25px;
}
</style>
