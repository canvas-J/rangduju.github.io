// miniprogram/pages/helloWorldPage/helloWorldPage.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    startPeriod: "",
    endPeriod: "",
    revenue: 0,
    queryResult: "",
    inCode: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  // getPhone: function () {
  //   const db = wx.cloud.database()
  //   // 查询当前用户所有的 counters
  //   db.collection('users').where({
  //     _openid: this.curUser
  //   }).get({
  //     success: res => {
  //       this.setData({
  //         queryResult: JSON.stringify(res.data, null, 2),
  //         phone: res.data[0].phone
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //       console.log('查到的电话是', this.data.phone)
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

  getRevenue: function() {
    var inCode = getApp().globalData.inCode
    const db = wx.cloud.database()
    db.collection("profit").where({
      invCode: inCode
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          // revenue: res.data[0].revenue
        })
        console.log('[数据库profit] [查询记录] 成功: ', res)
        // console.log('查到的盈利是', this.data.revenue)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})