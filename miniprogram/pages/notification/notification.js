// miniprogram/pages/notification/notification.js
// Created by: Liuting Chen
// 通知显示页面

var app = getApp();
var notifyList = [];
const db = wx.cloud.database();
var dataid = "";
var notification_contant = [];
var global_noti = []
var dataList = []
var senderList = []
var timeList = []
var totalNum = 0
var idList = []
var readList = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, ]
var readID = []

const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notificationList: [],

    text0: ["这是一个段落 \n 看我变身换行"],
    notifications: [],
    blank: "\n",
    totalNum: 0,
    dataList: null,
    senderList: null,
    timeList: null,
    notification_body_list: null,
    idList: null,
    readID: [],
    readList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    notification_contant = [];
    global_noti = []
    dataList = []
    senderList = []
    timeList = []
    totalNum = 0
    idList = []
    readList = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, ]
    readID = []
    this.getNotificationNum()
  },

  // 查看数据库中当前邀请码的通知总数
  getNotificationNum: function() {
    db.collection("notifications").where({
      invCode: app.globalData.inCode,
    }).count({
      success: res => {
        console.log(res.total)
        totalNum = res.total
        this.quertyNoti()
      }
    })
  },

  // 获取该邀请码在数据库中的通知，注意：只获取最新20条
  quertyNoti: function() {
    db.collection("notifications").where({
      invCode: app.globalData.inCode,
      // _id: _.gt(totalNum - 20)
    }).get({
      success: res => {
        console.log("查询成功", res)
        for (var i = 0; i < res.data.length; i++) {
          dataList.push(res.data[res.data.length - i - 1].notification)
          senderList.push(res.data[res.data.length - i - 1].sender)
          timeList.push(res.data[res.data.length - i - 1].time)
          idList.push(res.data[res.data.length - i - 1]._id)
        }
        var tempStr = ""
        for (var i = 0; i < dataList.length; i++) {
          var notification_temp = []
          var begin = 0
          for (var j = 0; j < dataList[i].length; j++) {
            if (dataList[i][j] == "|") {
              notification_temp.push(tempStr)
              tempStr = ""
            } else {
              tempStr = tempStr.concat(dataList[i][j])
            }
          }
          notification_temp.push(tempStr)
          global_noti.push(notification_temp)
          tempStr = ""
          notification_temp = []
        }
        this.setData({
          dataList: dataList,
          senderList: senderList,
          timeList: timeList,
          notification_body_list: global_noti,
          idList: idList
        })
        this.getReadStatus()
      }
    })
  },

  // 查询通知是否已读
  getReadStatus: function() {
    return new Promise(resolve => {
      for (var i = 0; i < idList.length; i++) {
        db.collection("notifications_seen").where({
          _id: idList[i],
        }).get({
          success: res => {
            if (res.data.length == 1) {
              readID.push(res.data[0]._id)
              this.setData({
                readID: readID
              })
            }
          }
        })
      }
    })
  },

  // 用户点击已读，将已读状态存入数据库
  handleRead: function(e) {
    var id = parseInt(e.currentTarget.id)
    var noid = idList[id]
    readList[id] = true
    this.setData({
      readList: readList
    })
    console.log(this.data.dataList[id], id)
    wx.cloud.database().collection('notifications_seen').add({
      data: {
        _id: parseInt(noid),
        notificationID: parseInt(noid),
        invCode: app.globalData.inCode,
        time: this.getNowFormatDate(),
        content: this.data.dataList[id],
        sender: this.data.senderList[id],
      },
      success: res => {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)
      }
    })
  },

  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})