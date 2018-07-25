/**
 * utils/hmac
 */

const crypto = require('crypto');

module.exports = (key = '', input = '', digestType = 'hex', hash = 'sha1') => {
    const hmac = crypto.createHmac(hash, key);

    hmac.update(input);

    if(digestType) {
        return hmac.digest(digestType);
    }

    return hmac.digest();
};
