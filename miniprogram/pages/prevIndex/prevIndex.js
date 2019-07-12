//index.js
var app = getApp()
const db = wx.cloud.database()

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
    signDate:null,
    notificationWaitMessage:false,
    profitWaitMessage: false,
  },

  inCodeInput: function (e) {
    this.setData({
      inCode: e.detail.value
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
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
            }
          })
        }
      }
    })
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
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        // console.log("电话号是："+this.data.phoneNum)
        app.globalData.openid = res.result.openid
        // this.curUser = res.result.openid
        
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
         }
        else {
          this.setData({
            isLandlord: true,
            hideaskCode: false,
            showWelcome: true,
          })
          // 更新global var的inCode
          getApp().globalData.inCode = this.data.inCode

          db.collection("profit").where({
            invCode: this.data.inCode
          }).get({
            success: res => {
              this.setData({
                signDate: res.data[0].date_sign,
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
            }
          })
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

  // 如果 邀请码 不合法，alert弹窗 
  openAlert: function () {
    wx.showModal({
      content: '未查到合法邀请码',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },

  toProfitPage: function(e) {
    if(this.data.isLandlord) {
      
      wx.navigateTo({
        url: "../totalProfit/totalProfit",
      })
    }
    else {
      wx.showModal({
        content: '请输入邀请码',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

toNotificationPage: function (e) {
    
    if (this.data.isLandlord == false) {
      wx.showModal({
        content: '请输入邀请码',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    else{
      wx.navigateTo({
        url: "../notification/notification",
      })
    }
  }

  // onAdd: function () {
  //   const db = wx.cloud.database()
  //   db.collection('users').add({
  //     data: {
  //       phone: this.data.phoneNum
  //     },
  //     success: res => {
  //       // 在返回结果中会包含新创建的记录的 _id
  //       this.setData({
  //         counterId: res._id,
  //         phone: this.data.phoneNum
  //       })
  //       // wx.showToast({
  //       //   title: '新增记录成功',
  //       // })
  //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '新增记录失败'
  //       })
  //       console.error('[数据库] [新增记录] 失败：', err)
  //     }
  //   })
  // },


//检查用户在不在数据库中
  // onQuery: function () {
  //   const db = wx.cloud.database()
  //   // 查询当前用户所有的 counters
  //   db.collection('users').where({
  //     _openid: this.curUser
  //   }).get({
  //     success: res => {
  //       console.log("00000",res, res.data.length);

  //       if (res.data.length == 0) {
  //         this.onAdd()
  //       }
  //       this.setData({
  //         queryResult: JSON.stringify(res.data, null, 2),
  //         notInDB: false
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //       this.onAdd()
  //     }
  //   })
  // },
})

