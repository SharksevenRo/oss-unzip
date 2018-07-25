/**
 * services/oss
 * by ali-oss
 *
 * 扩展部分方法
 *
 * upload
 * imageInfo
 */

const lodash = require('lodash');
const Promise = require('bluebird');
const OSS = require('ali-oss').Wrapper;

const env = process.env;

const oss = new OSS({
    internal: env.OSS_INTERNAL === 'true',
    accessKeySecret: env.OSS_SECRET_KEY,
    accessKeyId: env.OSS_ACCESS_KEY,
    region: `oss-${env.OSS_REGION}`,
    bucket: env.OSS_BUCKET,
    secure: false
});

// extend methods
lodash.assign(oss, {
    url(key, protocol = 'https') {
        const baseUrl = `${protocol}://${process.env.OSS_HOST}/`;

        return baseUrl + key;
    },
    upload(file, key, bucket = env.OSS_BUCKET) {
        const isBuffer = Buffer.isBuffer(file);

        return Promise.try(() => {
            oss.useBucket(bucket);

            return oss.put(key, file);
        })
        .then(ret => {
            // Ext props
            ret.innerUrl = ret.url;
            ret.url = this.url(ret.name);

            return ret;
        });
    },
});

module.exports = oss;

// // test
// oss.imageInfo('game/splash.png')
// // oss.upload(new Buffer(['133']), 'test/t.txt')
// .then(res => {
//     console.log(11, res);
// })
// .catch(err => {
//     console.error(err);
// });
