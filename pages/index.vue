<template>
  <UserList></UserList>
</template>

<script>

import UserList from "./user/UserList";
export default {
  name: 'IndexPage',
  components: {UserList, Error}
}
</script>
