var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
const db = wx.cloud.database();

var testData = null;

Page({
  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true,
    startTime: null,
    endTime: null,
    cata: null,
    dat: null,
    totalprofit:null,
    yearlist: null,
  },

  onLoad: function () {
    // this.getRevenue().then(result => {if
    //   this.show();
    // });
    this.getProfit()
  },

  

  getProfit: function() {
    return new Promise(resolve => {
      // ...
      const db = wx.cloud.database()
      console.log(getApp().globalData.curProfitHouse)
      db.collection("house_profit").where({
        address: getApp().globalData.curProfitHouse
      }).get({
        success: res => {
          console.log("-------", res)     
          this.setData({
            totalprofit: res.data[0].all_year_profit.toFixed(2),
            yearlist: res.data[0].year_list
          })
          console.log(totalprofit, yearlist)
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

  toProfitPage: function(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: e.currentTarget.id + '/' + e.currentTarget.id //自定义属性时 改为 + event.currentTarget.dataset.id
    })
  }
});