<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Table } from 'ant-design-vue';

const { params } = useRoute();
const shop = ref<any>({});
const id = computed<string>(() => params.id as string);
const ad_banner_id = computed(() => shop.ad_banner_id);
const ad_jili_id = computed(() => shop.ad_banner_id);

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const data = ref<any>([]);
const startData = ref('20221001');
const endDate = ref('20221031');

function fetchShopData(id: string): Promise<any> {
  return axios.get(`/api/ad/shop?id=${id}`).then((res) => {
    return res.data;
  }).catch(() => { });
}

function fetchAdData({ currentPage, currentPageSize, startDate, endDate }: any): Promise<{ total: number; data: any[]; }> {
  return axios.get(`/api/ad/publisher_adunit_general?page=${currentPage}&page_size=${currentPageSize}&start_date=${startDate}&end_date=${endDate}`).then((res) => {
    return res.data;
  }).catch(() => { });
}


watch(id, (cur, pre) => {
  console.log(cur, pre);
  fetchShopData(cur).then(res => shop.value = res[0]);
}, {
  immediate: true
});

watch([
  ad_banner_id,
  ad_jili_id,
  startData,
  endDate,
  page,
], (cur, pre) => {
  if (cur) {
    fetchAdData({
      currentPage: page.value,
      currentPageSize: pageSize.value,
      startData: startData.value,
      endDate: endDate.value
    }).then(res => {
      data.value = res.data;
      total.value = res.total;
    });
  }
});

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
</script>

<template>
  <div>
    <div class="header">
      <a-time-range-picker />
    </div>
    <Table :data-source="data" :row-key="record => record._id" :columns="columns"
      :pagination="{ current: page, total, pageSizeOptions: [pageSize] }" @change="change">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <router-link v-if="record.ad_banner_id || record.ad_jili_id" :to="`/shop/data/${record._id}`">数据</router-link>
          <router-link v-else :to="`/shop`">没有数据</router-link>
        </template>
      </template>
    </Table>
  </div>
</template>

<style scoped lang="less">
.header {
  padding: 20px 0;
}
</style>