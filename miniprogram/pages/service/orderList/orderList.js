// miniprogram/pages/orderList/orderList.js
// Created by: Liuting Chen
// 显示保洁邀请码所对应的所有订单

var app = getApp()
const util = require('../../../utils/util.js')
var orderlist = []
var orderlistNum = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
  },

  getOrderList: function() {
    orderlist = []
    wx.cloud.database().collection('order_num').where({
      invCode: app.globalData.serviceInCode,
    }).get({
      success: res => {
        console.log(res.data)
        orderlistNum = []
        for (var i = 0; i < res.data.length; i++) {
          orderlistNum.push(res.data[i].order_num)
        }
        console.log(orderlistNum)
        this.setData({
          orderlist: orderlistNum
        })
      }
    })
  },

  toHousePage: function (e) {
    var id = e.currentTarget.id
    app.globalData.curCleanOrderCheck = id
    util.buttonClicked(this)
    wx.navigateTo({
      url: "../cleanImageHistory/cleanImageHistory",
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