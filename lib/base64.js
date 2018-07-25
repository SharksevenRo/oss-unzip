module.exports = (base64str, file) => {
    const buf = new Buffer(base64str, 'base64');
    return buf.toString('utf-8');
}