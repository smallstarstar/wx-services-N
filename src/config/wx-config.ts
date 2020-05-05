/*
 * @Author: shichaoxin
 * @Date: 2020-04-27 19:51:41
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-05-04 23:21:36
 */
const WxConfigData = {
  // 请求微信登录获取open_id以及app_serect;
  wxLoginUrl: 'https://api.weixin.qq.com/sns/jscode2session',
  wxOrder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  // key为商户平台设置的密钥key
  WX_SHOP_KEY: 'zzzzxxxxccccvvvvbbbbmmmm11112222',
  wxAppid: 'wx558806d044728f84',
  wxAppSecret: 'de09dd141eb6ed387d456c1d96d59c47',
  grant_type: 'authorization_code',
  // 商务号
  mch_id: '1547030511',
};

export default WxConfigData;
