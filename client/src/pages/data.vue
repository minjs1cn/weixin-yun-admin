<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();

const id = computed(() => params.id);
watch(id, (cur, pre) => {
  console.log(pre, cur);
}, {
  immediate: true
});
</script>

<template>
  <div>data.vue</div>
</template>