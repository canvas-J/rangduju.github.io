// miniprogram/pages/home/home.js
// Created by: Liuting Chen
// 让渡居首页以及入口页面
const db = wx.cloud.database();
let demoNoSdk = require('../../utils/test.js');

var app = getApp()

Page({
  data: {
    disabled:false,
    openid:'',
    nowTime: '',
    someTime: null,
    list: [{
      id: 'tenant',
      name: '我是房客',
      open: false,
    },{
        id: 'landlord',
        name: '我是房东',
        open: false,

      },
      // {
      //   id: 'predict',
      //   name: '短租潜力预测',
      //   open: false,

      // },
      {
        id: 'service',
        name: '我是保洁方',
        open: false,
      },
      // {
      //   id: 'management',
      //   name: '我是管理员',
      //   open: false,

      // },
      // {
      //   id: 'contact',
      //   name: '我是管理员',
      //   open: false,
      // }
    ]
  },
  onLoad: function (options) {
    this.getOpenid();
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // wx.getUserInfo({
          //   success: res => {
          //     wx.setStorageSync("auth", res.userInfo); //把用户信息存入缓存
          //     console.log(res.userInfo, 'auth')
          //   }
          // })
          // wx.reLaunch({
          //   url: '../home/home',
          // })
          app.globalData.logon=true;
          this.setData({
            disabled: true
          })
        }
      }
    })
    
  },

  kindToggle: function(e) {
    var id = e.currentTarget.id
    console.log(id)

    // if (id === "management") {
    //   console.log(id)
    //   wx.navigateTo({
    //     url: '../management/management' //管理员页面跳转
    //   })
    // } else 
    if (id === "tenant") {
      console.log(id)
      wx.navigateTo({
        url: '../tenant/tenant' //房客页面跳转
      })
    } else if (id === "landlord") {
      console.log(id)
      wx.navigateTo({
        url: '../landlordMain/landlordMain' //房东页面跳转
      })
    } else if (id === "service") {
      console.log(id)
      wx.navigateTo({
        url: '../service/service' //保洁房页面跳转
      })
    }
  },
  //获取用户信息
  userInfoHandler(res) {
    if (res.detail['userInfo']) {
      let data = res.detail.userInfo;
      wx.setStorageSync("auth", data); //把用户信息存入缓存
      let openid = this.data.openid;
      db.collection('viewers').where({
        _openid: openid
      }).get()
        .then(res => {
          console.log(res)
          if (res.data[0]) {
            db.collection('viewers').doc(res.data[0]._id).update({
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                user: data
              }
            })
              .then(res => {
                console.log(res)
                app.globalData.logon = true;
                this.setData({
                  disabled: true
                })
              })
              .catch(console.error)
          } else {
            db.collection('viewers').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                user: data
              }
            })
              .then(res => {
                console.log(res)
                app.globalData.logon = true;
                this.setData({
                  disabled: true
                })
              })
              .catch(console.error)
          }
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      wx.showToast({
        title: '您点击了取消',
        icon: 'none',
        duration: 2000
      })
      app.globalData.logon = false;
    }
    console.log(res)
  },
  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },
  upimg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //临时文件路径
        var tempFilePath = res.tempFilePaths[0];

        //定义上传图片成功后的回调函数
        var callback = function (url) {
        //url为上传至对象存储成功后返回的云存储文件路径
        //do other something
        console.log(url)
      };
      //调用对象存储SDK，实现文件上传
      //传递参数临时文件路径及上传成功后的回调函数，若不需要回调可不传此参数
      demoNoSdk.uploadFile(tempFilePath, callback);
    },
})
  }
});

