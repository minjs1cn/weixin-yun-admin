<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useOffsetPagination } from '@vueuse/core';

const data = ref<any>({
  total: 0,
  data: []
});
const pageSize = 1;

function fetchData({ currentPage, currentPageSize }: { currentPage: number; currentPageSize: number; }) {
  axios.get(`/ad/shop?page=${currentPage}&page_size=${currentPageSize}`).then((responseData) => {
    data.value = responseData;
  }).catch(() => { });
}

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: data.value.total,
  page: 1,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
});

onMounted(() => {
  fetchData({
    currentPage: 1,
    currentPageSize: 10,
  });
})

</script>

<template>
  <div>
    <div class="pagination">
      <div @click="prev">pre</div>
      <div v-for="item in pageCount" @click="() => { currentPage = item; }">{{ item }}</div>
      <div @click="next">next</div>
    </div>
    <div v-for="item in data.data">{{ item.name }}</div>
  </div>
</template>

<style scoped>
.pagination {
  width: 100vw;
  display: flex;
  justify-content: space-around;
}

.pagination>div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  background-color: rgb(71, 146, 121);
  color: #fff;
  cursor: pointer;
}
</style>
