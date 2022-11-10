const cloudbase = require('@cloudbase/node-sdk');
const { query } = require('./utils');

const cloud = cloudbase.init({
	env: 'test-3139ac',
});

const db = cloud.database();

exports.getShopList = async function (page = 1, size = 10) {
	const {
		pager: { Total },
		data,
	} = await query(
		`db.collection('shop').skip(${(page - 1) * size}).limit(${size}).get()`,
	);
	return {
		total: Total,
		data: data.map((item) => JSON.parse(item)),
	};
};
exports.getShopById = async function (id) {
	const data = await query(`db.collection('shop').dov(${id}).get()`);

	try {
		return JSON.parse(data);
	} catch (error) {
		return data;
	}
};
