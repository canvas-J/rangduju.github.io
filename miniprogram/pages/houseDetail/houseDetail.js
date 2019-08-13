// miniprogram/pages/houseDetail/houseDetail.js
// Created by: Liuting Chen
// 每一个房源对应的收益展示，每月最后一天中午12点显示该月收益详情按键

var wxCharts = require('../../utils/wxcharts.js');
var app = getApp()
const db = wx.cloud.database()
var monthly_time_stamp_2019 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var monthly_time_stamp_2019_show = [false, false, false, false, false, false, false, false, false, false, false, false, false]

Page({

  /**
   * 页面的初始数据 TODO: 这里每个月的数据是一年一年加载的，需要自动化
   */
  data: {
    address: app.globalData.curProfitHouse,
    base_profit: 0,
    contract_start: "",
    contract_end: "",
    hold_period: "",
    landlord_profit_percentage: "",
    contract_duration: "",
    m_fee_percentage: "",
    safety_profit: 0,
    monthly_avg_revenue_2019: [],
    monthly_coop_days_2019: [],
    reservation_days_2019: [],
    monthly_checkin_percentage: [],
    nowTime: '',
    monthly_time_stamp_2019: null,
    monthly_time_stamp_2020: [],
    monthly_time_stamp_2019_show: [],
    setInter: '',
    num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    this.onQuery()
  },

  onQuery: function () {
    db.collection('house_profit_hardinput').where({
      address: app.globalData.curProfitHouse
    }).get({
      success: res => {
        this.setData({
          base_profit: res.data[0].base_profit,
          contract_start: res.data[0].contract_start,
          contract_duration: res.data[0].contract_duration,
          contract_end: res.data[0].contract_end,
          hold_period: res.data[0].hold_period,
          landlord_profit_percentage: res.data[0].landlord_profit_percentage,
          m_fee_percentage: res.data[0].m_fee_percentage,
          safety_profit: res.data[0].safety_profit,
          monthly_avg_revenue_2019: res.data[0].year_list.year_2019.monthly_avg_revenue,
          monthly_coop_days_2019: res.data[0].year_list.year_2019.monthly_coop_days,
          reservation_days_2019: res.data[0].year_list.year_2019.reservation_days,
          monthly_checkin_percentage: res.data[0].year_list.year_2019.monthly_checkin_percentage
        })
        console.log('[数据库][查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示，每两秒更新当前时间
   */
  onShow: function () {
    const targetTimezone = -8;
    // 当前时区与中时区时差，以min为维度
    const dif = new Date().getTimezoneOffset();
    var that = this;
    //将计时器赋值给setInter
    // TODO: 优化，自动获取年和月，更改util中的函数就可以辣
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.num + 1;
        var util = require("../../utils/util.js");
        var now = new Date().getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000)
        var m = util.formatMonth(now)
        var y = util.formatYear(now)
        if (m != 12) {
          m += 1
          for (var i = 1; i < m - 1; i++) {
            monthly_time_stamp_2019_show[i] = true
          }
          var futureTimeStamp = new Date(y + '-' + m + '-01 00:00:00'.replace(/-/g, "/")).getTime() - 12 * 60 * 60
          var delta = now - Date.parse(futureTimeStamp)
          if (delta > 0) {
            monthly_time_stamp_2019_show[m - 1] = true
          }
        } else {
          m = 1
          y += 1
          for (var i = 1; i < 12; i++) {
            monthly_time_stamp_2019_show[i] = true
          }
          var futureTimeStamp = new Date(y + '-' + m + '-01 00:00:00'.replace(/-/g, "/")).getTime() - 12 * 60 * 60
          var delta = now - Date.parse(futureTimeStamp)
          if (delta > 0) {
            monthly_time_stamp_2019_show[m - 1] = true
          }
        }
        console.log(monthly_time_stamp_2019_show)
        that.setData({
          num: numVal,
          nowTime: new Date().getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000),
          monthly_time_stamp_2019_show: monthly_time_stamp_2019_show
        });
      }, 2000);
  },

  toMonthProfit: function (e) {
    clearInterval(this.data.nowTime)
    var idx = e.target.dataset.idx
    app.globalData.checkProfitMonth = idx
    wx.navigateTo({
      url: 'MonthProfit/MonthProfit',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
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