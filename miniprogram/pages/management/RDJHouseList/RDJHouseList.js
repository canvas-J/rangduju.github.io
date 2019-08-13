// miniprogram/pages/management/RDJHouseList/RDJHouseList.js
// Created by: Liuting Chen
// 通过搜索房源id获取房源信息

var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp()
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    RDJHouseList: [],
    inputShowed: false,
    inputVal: "",
    totalHouseNum: 0,
    address: null,
    all_year_profit_landlord: null,
    base_profit: null,
    contract_start: null,
    district: null,
    hold_period: null,
    landlord_profit_percentage: null,
    m_fee_percentage: null,
    province: null,
    safety_profit: null,
    duration:null,
    contract_duration:null,
    address: app.globalData.curProfitHouse,
    monthly_avg_revenue_2019: [],
    monthly_coop_days_2019: [],
    reservation_days_2019: [],
    monthly_checkin_percentage: [],
    num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHouseNum()
  },

  // 查询房源总数
  getHouseNum: function() {
    wx.cloud.database().collection('house_profit').count({
      success: res => {
        this.setData({
          totalHouseNum: res.total
        })
      }
    })
  },

  // 根据用户输入查询房源信息
  search: function() {
    console.log(this.data.inputVal)
    this.getHouseList()
  },

  // 房源信息的数据库调用
  getHouseList: function() {
    this.setData({
      contract_start: null
    })
    wx.cloud.database().collection('house_profit').where({
      houseID: parseInt(this.data.inputVal),
    }).get({
      success: res => {
        console.log(res)
        console.log(res.data[0].year_list.length)
        this.setData({
          RDJHouseList: res.data,
          address: res.data[0].address,
          all_year_profit_landlord: res.data[0].all_year_profit_landlord,
          base_profit: res.data[0].base_profit,
          contract_start: res.data[0].contract_start,
          district: res.data[0].district,
          hold_period: res.data[0].hold_period,
          landlord_profit_percentage: res.data[0].landlord_profit_percentage,
          m_fee_percentage: res.data[0].m_fee_percentage,
          province: res.data[0].province,
          safety_profit: res.data[0].safety_profit,
          contract_duration: res.data[0].contract_duration,
          monthly_avg_revenue_2019: res.data[0].year_list.year_2019.monthly_avg_revenue,
          monthly_coop_days_2019: res.data[0].year_list.year_2019.monthly_coop_days,
          reservation_days_2019: res.data[0].year_list.year_2019.reservation_days,
          monthly_checkin_percentage: res.data[0].year_list.year_2019.monthly_checkin_percentage
        })
      }
    })
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  hideInputReload: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      dataListBefore: [],
      dataListAfter: [],
      urlList: []
    });
  },

  toMonthProfit: function (e) {
    app.globalData.curProfitHouse = this.data.address
    var idx = e.target.dataset.idx
    app.globalData.checkProfitMonth = idx
    wx.navigateTo({
      url: '../RDJMonthProfit/RDJMonthProfit',
    })
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

