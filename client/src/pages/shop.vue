<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useOffsetPagination } from '@vueuse/core';
import { Table } from 'ant-design-vue';

const page = ref(1);
const pageSize = ref(10);
const total = ref(100);

fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
});

const data = ref<any>([]);

function fetchData({ currentPage, currentPageSize }: { currentPage: number; currentPageSize: number; }) {
  axios.get(`/ad/shop?page=${currentPage}&page_size=${currentPageSize}`).then(({ data: { total, data } }) => {
    data.value = data;
    total.value = total;
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
  total,
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
});

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

function change(p: any) {
  console.log(p);
  currentPage.value = p.current;
}
</script>

<template>
  <div class="shop">
    <Table :dataSource="data" :columns="columns" :pagination="{ current: currentPage, total, pageSizeOptions: [10] }"
      @change="change">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <router-link :to="`/shop/${record.id}`">数据</router-link>
        </template>
        <template v-else>
          <span>
            {{ record.name }}
          </span>
        </template>
      </template>
    </Table>
  </div>
</template>

<style scoped lang="less">
.shop {
  height: 100%;
}
</style>