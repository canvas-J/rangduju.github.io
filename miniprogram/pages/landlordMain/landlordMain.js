// miniprogram/pages/landlordMain/landlordMain.js
// Created by: Liuting Chen
// 房东登陆页面

var app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/util.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    notInDB: true,
    requestResult: '',
    message: '',
    curUser: '',
    inCode: 'init',
    topButtom: '获取我的头像昵称',
    notification: false,
    duration: 0,
    isLandlord: false,
    showWelcome: false,
    hideaskCode: true,
    checkProfit: false,
    profit: null,
    noNotification: false,
    signDate: null,
    notificationWaitMessage: false,
    profitWaitMessage: false,
    buttonClicked: false,
  },

  inCodeInput: function(e) {
    this.setData({
      inCode: e.detail.value
    })
  },
  onShow: function() {

    this.setData({
      inCode: app.globalData.inCode
    })
    this.checkUserIDbegin()
  },

  onLoad: function() {
    this.setData({
      inCode: app.globalData.inCode
    })
    console.log(util)
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (app.globalData.landlordProfile) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  topButtom: res.userInfo.nickName
                })
                console.log(res)
              }
            })
          }
        }
      })
    }
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        topButtom: res.userInfo.nickName
      })
    }
  },

  onGetOpenid: function() {
    app.globalData.landlordProfile = true
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                topButtom: res.userInfo.nickName
              })
              console.log(res)
            }
          })
        }
      }
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        // console.log("电话号是："+this.data.phoneNum)
        app.globalData.openid = res.result.openid
        // this.curUser = res.result.openid
        console.log("openid", res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 根据邀请码查看用户是不是房东
  checkUserID: function() {
    // 查询当前用户所有的 counters
    db.collection('users').where({
      inCode: this.data.inCode
    }).get({
      success: res => {
        if (res.data.length == 0) {
          console.log("找不到邀请码", this.data.isLandlord)
          this.setData({
            isLandlord: false
          })
          this.openAlert()
        } else {
          this.setData({
            isLandlord: true,
            hideaskCode: false,
            showWelcome: true,
          })
          // 更新global var的inCode
          app.globalData.inCode = this.data.inCode

          // db.collection("profit").where({
          //   invCode: this.data.inCode
          // }).get({
          //   success: res => {
          //     this.setData({
          //       signDate: res.data[0].date_sign,
          //     })
          //   },
          //   fail: err => {
          //     console.log(err)
          //     wx.showToast({
          //       icon: 'none',
          //       title: '查询记录失败'
          //     })
          //   }
          // })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  checkUserIDbegin: function() {
    if (app.globalData.inCode == "" || app.globalData.inCode == null){
      this.setData({
        isLandlord: false
      })
    } else {
      this.setData({
        isLandlord: true,
        hideaskCode: false,
        showWelcome: true,
      })
    }
  },


  // 如果 邀请码 不合法，alert弹窗 
  openAlert: function() {
    wx.showModal({
      content: '未查到合法邀请码',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },

  toProfitPage: function(e) {
    if (this.data.isLandlord) {
      wx.navigateTo({
        url: "../totalProfit/totalProfit",
      })
    } else {
      wx.showModal({
        content: '请输入邀请码',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

  toNotificationPage: function(e) {
    if (this.data.isLandlord == false) {
      wx.showModal({
        content: '请输入邀请码',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      wx.navigateTo({
        url: "../notification/notification",
      })
    }
  },

  toHousePage: function(e) {
    if (this.data.isLandlord == false) {
      wx.showModal({
        content: '请输入邀请码',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      util.buttonClicked(this);
      wx.navigateTo({
        url: "../houseList/houseList",
      })
    }
  },

  logout: function(e) {
    app.globalData.inCode = null
    wx.reLaunch({
      url: '../home/home'
    })
  },
})