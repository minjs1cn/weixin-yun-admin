const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const { init: initDB, Counter } = require('./db');
const request = require('request');
const qs = require('qs');

const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// 首页
router.get('/', async (ctx) => {
	ctx.body = homePage;
});

// 获取广告收益明细

router.get('/ad/publisher_adunit_general', async (ctx) => {
	const { request } = ctx;
	const {
		start_date = '20201030',
		end_date = '20201030',
		page = 1,
		page_size = 10,
	} = request;

	const params = qs.stringify({
		page,
		page_size,
		start_date,
		end_date,
	});

	const res = await new Promise((resolve, reject) => {
		request(
			{
				method: 'get',
				url: `https://api.weixin.qq.com/publisher/stat?action=publisher_adunit_general&${params}`,
			},
			function (error, response) {
				resolve(JSON.parse(response.body));
			},
		);
	});
	ctx.body = {
		res,
	};
});

// 更新计数
router.post('/api/count', async (ctx) => {
	const { request } = ctx;
	const { action } = request.body;
	if (action === 'inc') {
		await Counter.create();
	} else if (action === 'clear') {
		await Counter.destroy({
			truncate: true,
		});
	}

	ctx.body = {
		code: 0,
		data: await Counter.count(),
	};
});

// 获取计数
router.get('/api/count', async (ctx) => {
	const result = await Counter.count();

	ctx.body = {
		code: 0,
		data: result,
	};
});

// 小程序调用，获取微信 Open ID
router.get('/api/wx_openid', async (ctx) => {
	if (ctx.request.headers['x-wx-source']) {
		ctx.body = ctx.request.headers['x-wx-openid'];
	}
});

const app = new Koa();
app
	.use(logger())
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods());

const port = process.env.PORT || 80;
async function bootstrap() {
	await initDB();
	app.listen(port, () => {
		console.log('启动成功', port);
	});
}
bootstrap();
