<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();

watch(params, (pre, cur) => {
  console.log(pre, cur);
}, {
  immediate: true
});
</script>

<template>
  <div>data.vue</div>
</template>