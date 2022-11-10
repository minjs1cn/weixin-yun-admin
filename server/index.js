const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
// const { init: initDB, Counter } = require('./db');
const { getPublisherStat, getHtml } = require('./utils');

const { getShopList, getShopById } = require('./cloud');

const router = new Router();

// 首页
router.get('/', async (ctx) => {
	const homePage = await getHtml();
	ctx.body = homePage;
});

// 获取所有商家
router.get('/ad/shop', async (ctx) => {
	const { request } = ctx;
	const { page = 1, page_size = 10, id } = request.query;

	if (id) {
		return await getShopById(id);
	}

	try {
		const res = await getShopList(page, page_size);
		ctx.body = res;
	} catch (error) {
		ctx.body = 'error';
	}
});

// 获取广告收益

router.get('/ad/publisher_adunit_general', async (ctx) => {
	const { request } = ctx;
	const {
		start_date = '2020-10-30',
		end_date = '2020-10-30',
		action = 'publisher_adunit_general',
		page = 1,
		page_size = 10,
		ad_slot,
		ad_unit_id,
	} = request.query;

	const query = {
		page,
		page_size,
		start_date,
		end_date,
		action,
	};

	if (ad_slot) {
		query.ad_slot = ad_slot;
	}

	if (ad_unit_id) {
		query.ad_unit_id = ad_unit_id;
	}

	const res = await getPublisherStat(query);
	ctx.body = res;
});

// // 更新计数
// router.post('/api/count', async (ctx) => {
// 	const { request } = ctx;
// 	const { action } = request.body;
// 	if (action === 'inc') {
// 		await Counter.create();
// 	} else if (action === 'clear') {
// 		await Counter.destroy({
// 			truncate: true,
// 		});
// 	}

// 	ctx.body = {
// 		code: 0,
// 		data: await Counter.count(),
// 	};
// });

// // 获取计数
// router.get('/api/count', async (ctx) => {
// 	const result = await Counter.count();

// 	ctx.body = {
// 		code: 0,
// 		data: result,
// 	};
// });

// 小程序调用，获取微信 Open ID
router.get('/api/wx_openid', async (ctx) => {
	if (ctx.request.headers['x-wx-source']) {
		ctx.body = ctx.request.headers['x-wx-openid'];
	}
});

const app = new Koa();
app
	.use(cors())
	.use(logger())
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods());

const port = process.env.PORT || 80;
async function bootstrap() {
	// await initDB();
	app.listen(port, () => {
		console.log('启动成功', port);
	});
}
bootstrap();
