<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const data = ref<any>([]);


fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
}).then(res => {
  data.value = res.data;
  total.value = res.total;
});


function fetchData({ currentPage, currentPageSize }: { currentPage: number; currentPageSize: number; }): Promise<{ total: number; data: any[]; }> {
  return axios.get(`/api/ad/shop?page=${currentPage}&page_size=${currentPageSize}`).then((res) => {
    return res.data;
  }).catch(() => { });
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
    width: '20%',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: '20%',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

function change(p: any) {
  console.log(p);
  page.value = p.current;
}

watch(page, () => {
  fetchData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  }).then(res => {
    data.value = res.data;
    total.value = res.total;
  });
});
</script>

<template>
  <div class="shop">
    <a-table :data-source="data" row-key="_id" :columns="columns"
      :pagination="{ current: page, total, pageSizeOptions: [pageSize] }" @change="change">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <router-link v-if="record.ad_banner_id || record.ad_jili_id" :to="`/shop/${record._id}/data`">数据</router-link>
          <router-link v-else :to="`/shop`">没有数据</router-link>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="less">
.shop {
  height: 100%;
}
</style>