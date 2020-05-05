import { Injectable, HttpService, Inject, HttpServer } from '@nestjs/common';
import WxConfigData from 'src/config/wx-config';
import { getIPAdress, getTradeNum, getRandom32, getTimeStamp, getWXSign } from 'src/utils/pay';
import * as md5 from 'md5';
// tslint:disable-next-line:no-var-requires
const parser = require('fast-xml-parser');
const JsonParse: any = parser.j2xParser;
@Injectable()
export class PayService {
  constructor(
    @Inject(HttpService) private readonly httpClientService: HttpServer,
  ) { }
  async order() {
    const url: any = WxConfigData.wxOrder;
    // 参数
    const timeStamp = getTimeStamp() + '';
    const nonceStr: any = getRandom32();
    const params: any = {
      appid: WxConfigData.wxAppid,
      mch_id: WxConfigData.mch_id,
      total_fee: 100, // 参数
      openid: '12345612345', // 参数
      body: '{[{id:123,name:123}]}', // 参数
      notify_url: 'http://localhost:8666/wx/notice',
      trade_type: 'JSAPI',
      spbill_create_ip: getIPAdress(),
      out_trade_no: getTradeNum(),
      nonce_str: nonceStr,
    };
    const str: any = getWXSign(params, WxConfigData.wxAppid);
    params.sign = str;
    // 转成xml格式
    const jsonparse = new JsonParse();
    const obj: any = {
      xml: params,
    };
    const xml = jsonparse.parse(obj);
    // 调用微信的接口获取订单号id;prepayId
    const data: any = await this.httpClientService.post(url, xml);
    // return xml; ===进行解析
    if (parser.validate(data) === true) {
      const jsonObj = parser.parse(data);
      // 返回 订单号
      const result: any = {
        appId: WxConfigData.wxAppid,
         // 时间戳 ===字符串形式
        timeStamp,
        // 随机字符串
        nonceStr,
        // 类型
        signType: 'MD5',
         // 订单号
        package: 'prepay_id' + jsonObj.xml.prepayid,
      };
      // 签名
      result.paySign = getWXSign(result, WxConfigData.wxAppid);
      return result;
      // return {
      //   // 订单号
      //   prepayid: jsonObj.xml.prepayid,
      //   // 随机字符串
      //   nonceStr,
      //   // 时间戳
      //   timeStamp,
      //   // 签名
      //   sign,
      //   // 类型
      //   signType: result.signType,
      // };
    } else {
      return { data };
    }
  }
}
