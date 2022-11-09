const rt = require('request');
const qs = require('qs');

exports.getHtml = function getHtml() {
	return new Promise((resolve, reject) => {
		rt(
			{
				method: 'GET',
				url: 'https://prod-4gi3v8l421dd2dd2-1257367018.tcloudbaseapp.com/index.html',
			},
			function (error, response) {
				if (error) {
					reject('<h1>error</h1>');
				} else {
					resolve(response.body);
				}
			},
		);
	});
};

function get(url) {
	return new Promise((resolve, reject) => {
		rt(
			{
				method: 'GET',
				url,
			},
			function (error, response) {
				if (error) {
					reject(error);
				} else {
					resolve(JSON.parse(response.body));
				}
			},
		);
	});
}

function post(url, data) {
	return new Promise((resolve, reject) => {
		rt(
			{
				method: 'POST',
				url,
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(data),
			},
			function (error, response) {
				if (error) {
					reject(error);
				} else {
					resolve(JSON.parse(response.body));
				}
			},
		);
	});
}

exports.getPublisherStat = function getPublisherStat(query) {
	const queryString = qs.stringify(query);

	return get(`https://api.weixin.qq.com/publisher/stat?${queryString}`);
};

exports.query = function (query) {
	return post(`https://api.weixin.qq.com/tcb/databasequery`, {
		env: 'test-3139ac',
		query,
	});
};
