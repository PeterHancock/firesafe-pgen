//Password generation
// copied from keepr2 on bitbucket with refactoring
const crypto = require('crypto')

function urlEncode(str) {
  return str.replace('+', '-').replace('/', '_')
}
module.exports = function(key, secret) {
  const sha512 = Array(1000)
    .fill(0)
    .reduce((acc, i) => {
      const hmac = crypto.createHmac('sha512', secret)
      hmac.update(acc)
      return hmac.digest('hex')
    }, key)

  return urlEncode(new Buffer(sha512).toString('base64')).substring(0, 16)
}
