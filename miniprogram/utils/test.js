var CosAuth = require('../cos-auth');//引入对象存储SDK
var Bucket = 'rangduju-xiaochengxu-1257675361';
var Region = 'ap-beijing';//定义了项目的一些配置内容，例如存储桶名称、地区、请求域名等
var stsCache; //存储临时秘钥及秘钥过期时间内容

//定义上传接口
var uploadFile = function (filePath, cb) {
  // 请求用到的参数
  var prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/';

  // 对更多字符编码的 url encode 格式
  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  };

  // 获取临时密钥
  // 全局变量stsCache 存储临时秘钥及过期时间内容
  var getCredentials = function (callback) {
    //判断临时秘钥未过期
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
      callback(stsCache && stsCache.credentials);
      return;
    }
    //过期，服务器重新请求获取临时秘钥
    wx.request({
      method: 'GET',
      url: 'https://baidu.com/Api/Cos/getCosTempKeys', // 服务端签名，参考 server 目录下的两个签名例子
      dataType: 'json',
      success: function (result) {
        var data = result.data.result;
        console.log(result,123456798)
        var credentials = data.credentials;
        if (credentials) {
          stsCache = data
        } else {
          wx.showModal({
            title: '临时密钥获取失败',
            content: JSON.stringify(data),
            showCancel: false
          });
        }
        callback(stsCache && stsCache.credentials);
      },
      error: function (err) {
        wx.showModal({
          title: '临时密钥获取失败',
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
  };

  // 计算签名
  var getAuthorization = function (options, callback) {
    getCredentials(function (credentials) {
      callback({
        XCosSecurityToken: credentials.sessionToken,
        Authorization: CosAuth({
          SecretId: credentials.tmpSecretId,
          SecretKey: credentials.tmpSecretKey,
          Method: options.Method,
          Pathname: options.Pathname,
        })
      });
    });
  };

  // 上传文件
  var uploadFile = function (filePath, cb) {
    var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
    getAuthorization({
      Method: 'POST',
      Pathname: '/'
    }, function (AuthData) {
      var requestTask = wx.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: {
          'key': Key,
          'success_action_status': 200,
          'Signature': AuthData.Authorization,
          'x-cos-security-token': AuthData.XCosSecurityToken,
          'Content-Type': '',
        },
        success: function (res) {
          var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
          if (res.statusCode === 200) {
            if (cb) {
              cb(url);
            }
          } else {
            wx.showModal({
              title: '上传失败',
              content: JSON.stringify(res),
              showCancel: false
            });
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '上传失败',
            content: JSON.stringify(res),
            showCancel: false
          });
        }
      });
      requestTask.onProgressUpdate(function (res) {
      });
    });
  };

  // 触发上传文件方法，按步骤调用执行
  uploadFile(filePath, cb);
};
module.exports = {
  uploadFile
};