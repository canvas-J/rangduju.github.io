// miniprogram/pages/houseDetail/houseDetail.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: app.globalData.curProfitHouse,
    base_profit:0,
    contract_start: "",
    contract_end:"",
    hold_period:"",
    landlord_profit_percentage:"",
    contract_duration: "",
    m_fee_percentage:"",
    safety_profit:0,
    monthly_avg_revenue_2019:[],
    monthly_coop_days_2019:[],
    reservation_days_2019:[],
    monthly_checkin_percentage:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery()
  },

  onQuery: function () {
    db.collection('house_profit').where({
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
        console.log('[数据库] [查询记录] 成功: ', res)
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