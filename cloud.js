const cloudbase = require('@cloudbase/node-sdk');

const cloud = cloudbase.init({
	env: 'test-3139ac',
});

exports.db = cloud.database();

exports.getShopList = function () {
	return db.collection('shop').get();
};
