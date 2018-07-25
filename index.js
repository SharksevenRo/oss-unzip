
require('./env');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const koaBody = require('koa-body');
const unzip = require('./lib/unzip');
const router = new Router();
const base64 = require('./lib/base64');

// response

app.use(koaBody());

router.post('/unzip', async (ctx, next) => {
    const zip = this.request.body.url;
    const bucket = this.request.body.bucket;
    const prefix = this.request.body.prefix || '';

    if(!zip || ! bucket) {
        this.throw(400, 'zip url and bucket reqired');
    }
    try {
        const result = await unzip(URLSafeBase64.decode(bucket), URLSafeBase64.decode(prefix), URLSafeBase64.decode(zip))
        this.body = result;
    }
    catch (err) {
       this.throw(400, '解压失败' + JSON.stringify(err));
    }
});

router.get('/health', async (ctx) => {
    ctx.body = 'health';
});

app
.use(router.routes())
.use(router.allowedMethods());


app.listen(9100, function() {
    console.log('unzip start on 9100');
});

app.on('error', function(err) {
    console.log(err)
});