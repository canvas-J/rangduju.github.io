// miniprogram/pages/houseList/houseList.js
// Created by: Liuting Chen
// 根据邀请码查找房源list

var app = getApp()
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    houselist: null,
    buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouselist()
  },

  getHouselist: function () {
    return new Promise(resolve => {
      // ...
      const db = wx.cloud.database()
      db.collection("landlords").where({
        invCode: app.globalData.inCode
      }).get({
        success: res => {
          console.log("查询成功", res)
          this.setData({
            houselist: res.data[0].house
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
      // return resolve();
    })
  },

  toHousePage: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    app.globalData.curProfitHouse = id
    util.buttonClicked(this)
    wx.navigateTo({
      url: "../houseDetail/houseDetail",
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