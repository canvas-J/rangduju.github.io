// miniprogram/pages/notification/notification.js
var app = getApp();
var notifyList = [];
const db = wx.cloud.database();
var dataid = "";
var notification_contant = [];
var global_noti =[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notificationList:[],
    text0: ["这是一个段落 \n 看我变身换行"],
    notification_body_list: [],
    blank: "\n"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.queryNotification()

  },

  queryNotification: function() {
    
    db.collection("notifications").where({
      invCode: app.globalData.inCode
    }).get({
      success: res => {
        console.log("查询成功", res)
        notifyList = res.data[0].notification.reverse()
        for (var i = 0; i < notifyList.length; i++) {
          notification_contant.push(notifyList[i][0])
        }

        var tempStr = ""
        for (var i = 0; i < notification_contant.length; i++) {
          var notification_temp = []
          var begin = 0
          for (var j = 0; j < notification_contant[i].length; j++) {
            if (notification_contant[i][j] ==  "|") {
              notification_temp.push(tempStr)
              tempStr = ""
            }
            else {
              tempStr = tempStr.concat(notification_contant[i][j])
            }
            
          }
          notification_temp.push(tempStr)
          global_noti.push(notification_temp)
          tempStr = ""
          notification_temp = []
          console.log("+++++", global_noti)
        }

        console.log(notification_contant[0].length)

        // for (var i = 0; i < notification_contant.)
        this.setData({
          notificationList: res.data[0].notification.reverse(),
          notification_body_list: global_noti
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    }) 


    
    this.setData({
    })

  },

  handleRead: function(e) {
    var id = e.currentTarget.id
    console.log(id)
    notifyList[id][2] = 1
    db.collection('notifications').doc(dataid).set({
      data: {
        notification: notifyList
      },
      success: res => {
        console.log("[[[",res.data)
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