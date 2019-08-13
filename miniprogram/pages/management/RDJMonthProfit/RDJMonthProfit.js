// miniprogram/pages/houseDetail/MonthProfit/MonthProfit.js
// Created by: Liuting Chen
// 每月房东收益详情页面，管理员展示端

const db = wx.cloud.database()
var app = getApp()
var month = app.globalData.checkProfitMonth

Page({

  /**
   * 页面的初始数据
   */
  data: {
    revenue: "",
    month: 0,
    months: 0,
    cost: 0,
    mfee: 0,
    ebs: 0,
    extraProfit: 0,
    monthsProfit: 0,
    address: "",
    allRevenue: 0,
    landlordGrossIncome: 0,
    variableCost: 0,
    landlordRefund: 0,
    landlord_profit: 0,
    base_profit: 0, 
    rdjProfit:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery()
  },

  onQuery: function () {
    db.collection('house_profit_hardinput').where({
      address: app.globalData.curProfitHouse
    }).get({
      success: res => {
        this.setData({
          month: app.globalData.checkProfitMonth,
          address: app.globalData.curProfitHouse,
          allRevenue: res.data[0].year_list.year_2019.all_revenue[app.globalData.checkProfitMonth],
          mfee: res.data[0].year_list.year_2019.mfee[app.globalData.checkProfitMonth],
          ebs: res.data[0].year_list.year_2019.ebs[app.globalData.checkProfitMonth],
          extraProfit: res.data[0].year_list.year_2019.extra_profit[app.globalData.checkProfitMonth],
          landlordGrossIncome: res.data[0].year_list.year_2019.landlord_gross_income[app.globalData.checkProfitMonth],
          variableCost: res.data[0].year_list.year_2019.variable_cost[app.globalData.checkProfitMonth],
          cost: res.data[0].year_list.year_2019.cost[app.globalData.checkProfitMonth],
          landlordRefund: res.data[0].year_list.year_2019.landlord_refund[app.globalData.checkProfitMonth],
          landlordProfit: res.data[0].year_list.year_2019.landlord_profit[app.globalData.checkProfitMonth],
          rdjProfit: res.data[0].year_list.year_2019.landlord_profit[app.globalData.rdjProfit],
        })
        console.log('[数据库][查询记录]====== 成功: ', res)
      },
      fail: err => {
        // wx.showToast({
        //   icon: 'none',
        //   title: '查询记录失败'
        // })
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