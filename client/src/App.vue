<script setup lang="ts">
import { useRoute } from 'vue-router';

const { path } = useRoute()

</script>

<template>
  <div class="container">
    <aside>
      <router-link to="/" active-class="active">首页</router-link>
      <router-link to="/shop" active-class="active">店铺</router-link>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  height: 100%;
}

aside {
  width: 220px;
  height: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    padding: 8px;
    color: #333;

    :global(.active) {
      color: #fff !important;
      background-color: rgb(39, 38, 38);
    }


    &:hover {
      color: #666;
    }
  }
}


main {
  flex: 1;
  padding: 8px;
}
</style>
