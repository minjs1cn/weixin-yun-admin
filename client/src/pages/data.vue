<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
type RangeValue = [Dayjs, Dayjs];
type Income = {
  ad_slot: string;
  click_count: number;
  click_rate: number;
  date: string;
  ecpm: number;
  exposure_count: number;
  exposure_rate: number;
  income: number;
  req_succ_count: number;
  slot_str: number;
};

const { params } = useRoute();
const shop = ref<any>({});
const id = computed<string>(() => params.id as string);
const ad_banner_id = computed(() => shop.ad_banner_id);
const ad_jili_id = computed(() => shop.ad_banner_id);
const date = ref<RangeValue>([dayjs().startOf('month'), dayjs()]);

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const data = ref<Income[]>([]);

function fetchShopData(id: string): Promise<any> {
  return axios.get(`/api/ad/shop?id=${id}`).then((res) => {
    return res.data;
  }).catch(() => { });
}

function fetchAdData({ currentPage, startDate, endDate, pageSize }: any): Promise<{ total_num: number; list: any[]; }> {
  return axios.get(`/api/ad/data?page=${currentPage}&page_size=${pageSize}&start_date=${startDate}&end_date=${endDate}`).then((res) => {
    return res.data;
  }).catch(() => { });
}


watch(id, (cur, pre) => {
  fetchShopData(cur).then(res => shop.value = res);
}, {
  immediate: true
});


watch([
  shop,
  date,
  page,
  pageSize,
], (cur, pre) => {
  console.log(cur);
  if (cur[0]) {
    fetchAdData({
      currentPage: cur[2],
      startDate: cur[1][0].format('YYYY-MM-DD'),
      endDate: cur[1][1].format('YYYY-MM-DD'),
      pageSize: cur[3],
    }).then(res => {
      data.value = res.list.filter(item => item.ad_unit_id === cur[0].ad_banner_id || item.ad_unit_id === cur[0].ad_jili_id).map(item => item.stat_item);
      total.value = res.total_num;
    });
  }
}, {
  immediate: true,
});

/**
 * ad_slot: string;
  click_count: number;
  click_rate: number;
  date: string;
  ecpm: number;
  exposure_count: number;
  exposure_rate: number;
  income: number;
  req_succ_count: number;
  slot_str: number;
 */
const adTypes = {
  SLOT_ID_WEAPP_BANNER: 'banner',
  SLOT_ID_WEAPP_REWARD_VIDEO: '激励视频'
};
const columns = [
  {
    title: '类型',
    dataIndex: 'ad_slot',
    key: 'ad_slot',
    customRender: ({ value }: { value: keyof typeof adTypes; }) => adTypes[value]
  },
  {
    title: '点击量',
    dataIndex: 'click_count',
    key: 'click_count',
  },
  {
    title: '点击率',
    dataIndex: 'click_rate',
    key: 'click_rate',
  },
  {
    title: 'ecpm',
    dataIndex: 'ecpm',
    key: 'ecpm',
  },
  {
    title: '曝光',
    dataIndex: 'exposure_count',
    key: 'exposure_count',
  },
  {
    title: '曝光率',
    dataIndex: 'exposure_rate',
    key: 'exposure_rate',
  },
  {
    title: '收益',
    dataIndex: 'income',
    key: 'income',
  },
  {
    title: '请求量',
    dataIndex: 'req_succ_count',
    key: 'req_succ_count',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

function change(p: any) {
  console.log(p);
  page.value = p.current;
  pageSize.value = p.pageSize;
}

const pageSizeOptions = ['10', '50', '100'];
</script>

<template>
  <div>
    <div class="header">
      <a-range-picker v-model:value="date" :locale="locale" />
    </div>
    <div class="header">
      <h1>总收益: {{ data.reduce((pre, cur) => pre + cur.income, 0) }}</h1>
    </div>
    <a-table :data-source="data" row-key="slot_str" :columns="columns"
      :pagination="{ current: page, total, pageSizeOptions }" @change="change">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <router-link v-if="record.ad_banner_id || record.ad_jili_id" :to="`/shop/data/${record._id}`">数据</router-link>
          <router-link v-else :to="`/shop`">没有数据</router-link>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="less">
.header {
  padding: 20px 0;
}
</style>