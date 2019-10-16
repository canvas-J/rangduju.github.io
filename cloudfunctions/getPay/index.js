const key = "rangdujuRangdujurangdujuRangduju"//这是商户的key，不是小程序的密钥，32位。
const mch_id = "1544496641" //你的商户号

//将以上的两个参数换成你的，然后以下可以不用改一个字照抄

const rp = require('request-promise')
const crypto = require('crypto')

function paysign({ ...args }) {
  let sa = []
  for (let k in args) sa.push(k + '=' + args[k])
  sa.push('key=' + key)
  return crypto.createHash('md5').update(sa.join('&'), 'utf8').digest('hex').toUpperCase()
}

exports.main = async (event, context) => {
  const appid = event.userInfo.appId
  const openid = event.userInfo.openId
  const attach = event.attach
  const body = event.body
  const total_fee = event.total_fee
  const notify_url = "https://rangduju.com/notify" //最好填上自己服务器的url
  const spbill_create_ip = "49.234.214.140"
  const nonce_str = Math.random().toString(36).substr(2, 15)
  const timeStamp = parseInt(Date.now() / 1000) + ''
  const out_trade_no = "otn" + nonce_str + timeStamp

  let formData = "<xml>"
  formData += "<appid>" + appid + "</appid>"
  formData += "<attach>" + attach + "</attach>"
  formData += "<body>" + body + "</body>"
  formData += "<mch_id>" + mch_id + "</mch_id>"
  formData += "<nonce_str>" + nonce_str + "</nonce_str>"
  formData += "<notify_url>" + notify_url + "</notify_url>"
  formData += "<openid>" + openid + "</openid>"
  formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"
  formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
  formData += "<total_fee>" + total_fee + "</total_fee>"
  formData += "<trade_type>JSAPI</trade_type>"
  formData += "<sign>" + paysign({ appid, attach, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type: 'JSAPI' }) + "</sign>"
  formData += "</xml>"

  let res = await rp({ url: "https://api.mch.weixin.qq.com/pay/unifiedorder", method: 'POST', body: formData })
  let xml = res.toString("utf-8")
  if (xml.indexOf('prepay_id') < 0) return xml
  let prepay_id = xml.split("<prepay_id>")[1].split("</prepay_id>")[0].split('[')[2].split(']')[0]
  let paySign = paysign({ appId: appid, nonceStr: nonce_str, package: ('prepay_id=' + prepay_id), signType: 'MD5', timeStamp: timeStamp })
  return { appid, nonce_str, timeStamp, prepay_id, paySign}
}