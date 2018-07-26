
require('./env');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const koaBody = require('koa-body');
const unzip = require('./lib/unzip');
const router = new Router();

const URLSafeBase64 = function(str) {
    return new Buffer(str, 'base64').toString('utf-8');
};
// response

app.use(koaBody());

router.post('/unzip', async (ctx, next) => {
    const body = ctx.request.body;
    const zip = body.url;
    const bucket = body.bucket;
    const prefix = body.prefix || '';

    if(process.env.IP_WHITELIST.indexOf(ctx.ip) || (body.token && body.token === process.env.ACCESS_TION)) {
        if(!zip || ! bucket) {
            ctx.throw(400, 'zip url and bucket reqired');
        }
        try {
            const result = await unzip(URLSafeBase64(bucket), URLSafeBase64(prefix), URLSafeBase64(zip))
            ctx.body = result;
        }
        catch(err) {
            console.log(err);
            ctx.throw(400, '解压失败' + JSON.stringify(err));
        }
    }
    else {
        ctx.throw(400, 'unauthorized')
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