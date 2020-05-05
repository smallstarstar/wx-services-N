import * as  os from 'os';
import * as md5 from 'md5';
/**
 * 获取32位随机数字
 */
export const getRandom32 = () => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqretuvwxyz0123456789';
  let result = '';
  for (let i = 1; i <= 32; i++) {
    const random = Math.floor(Math.random() * str.length);
    result += str[random];
  }
  return result;
};

/**
 * 获取当前时间戳
 */
export const getTimeStamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

/**
 * 获取服务器地址
 */
export const getIPAdress = () => {
  const interfaces = os.networkInterfaces();
  // tslint:disable-next-line:forin
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

/**
 * 订单号
 */
export const getTradeNum = () => {
  const data = new Date();
  const add = [
    data.getFullYear(),
    (data.getMonth() + 1),
    data.getDate(),
    data.getHours(),
    data.getMinutes(),
    data.getSeconds(),
    Math.floor(Math.random() * 1000),
  ];
  return add.join('');
};

/**
 * 排序字符串
 */
export const getWXSign = (params: any, shopKey) => {
  // 签名
  let str: any = [];
  // tslint:disable-next-line:forin
  for (const key in params) {
    str.push(key + '=' + params[key]);
  }
  str.sort((a, b) => {
    return a.localeCompare(b);
  });
  str.push('key=' + shopKey);
  str = str.join('&');
  // 签名秘钥
  str = md5(str);
  return str;
};
