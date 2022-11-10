import axios from 'axios';

axios.defaults.baseURL = import.meta.env.DEV ? '/api' : '';

export function fetchShopData({
	currentPage,
	currentPageSize,
}: {
	currentPage: number;
	currentPageSize: number;
}): Promise<{ total: number; data: any[] }> {
	return axios
		.get(`/ad/shop?page=${currentPage}&page_size=${currentPageSize}`)
		.then((res) => {
			return res.data;
		})
		.catch(() => {});
}

export function fetchShopDataById(id: string): Promise<any> {
	return axios
		.get(`/ad/shop?id=${id}`)
		.then((res) => {
			return res.data;
		})
		.catch(() => {});
}

export function fetchAdData({
	currentPage,
	startDate,
	endDate,
	pageSize,
}: any): Promise<{ total_num: number; list: any[] }> {
	return axios
		.get(
			`/ad/data?page=${currentPage}&page_size=${pageSize}&start_date=${startDate}&end_date=${endDate}`,
		)
		.then((res) => {
			return res.data;
		})
		.catch(() => {});
}
