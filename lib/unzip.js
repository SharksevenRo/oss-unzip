/**
 * 解压 zip包
 */

const Promise = require('bluebird');
const zip = require('jszip');
const path = require('path');
const https = require('https');
const oss = require('./oss')

module.exports = function(bucket, prefix, url) {
    console.log(bucket, prefix, url);
    const data = [];
    return Promise.try(() => {
        // https读取
        return new Promise((resolve, reject) => {
            https.get(url, function(res) {
                res.on('data', (chunk) => {
                    data.push(chunk);
                });
                res.on('end', resolve);
                res.on('err', reject);
            });
        });
    })
    .then(() => {
        // 加载zip包
        const buf = Buffer.concat(data);
        return zip.loadAsync(buf);
    })
    .then(zip => {
        return Promise.try(() => {
            const files = [];
            for(let key in zip.files) {
                // console.log(key);
                if(zip.files.hasOwnProperty(key)) {
                    files.push(zip.files[key]);
                }
            }
            return files;
        })
        .map(file => {
            // 获取文件内容
            return zip.file(file.name).async('nodebuffer')
            .then(buf => {
                // oss上传
                return oss.upload(buf, path.join(prefix, file.name), bucket)
                .then((ret) => {
                    return ret.name;
                });
            });
        })
        .then(files => {
            return files;
        });
    });

};


// module.exports('https://st0.dancf.com/xsb/h5/20180711-152408-bWD12.zip')
// .then(zip => {
//     console.log(zip);
// })