var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
const db = wx.cloud.database();
var monthDetail = null
var dayCatagory = []
var dayProfit = []
var chartData = {
  main: {
    title: null,
    data: null,
    categories: null,
  }
};
var testData = null;

Page({
  data: {
    chartTitle: '月收益展示',
    monthNum: 0,
    isMainChartDisplay: true,
    startTime: null,
    endTime: null,
    cate: null,
    revenue: null,
    dat: null,
    totalprofit: null,
    yearlist: null,
    months: null
  },
  touchHandler: function (e) {
    columnChart.scrollStart(e);
  },
  moveHandler: function (e) {
    columnChart.scroll(e);
  },
  touchEndHandler: function (e) {
    columnChart.scrollEnd(e);
  },

  onLoad: function () {
    // this.getRevenue().then(result => {if
    //   this.show();
    // });
    this.getRevenue()
  },

  //  这个function是画柱状图用的
  getRevenue: function () {
    var index = getApp().globalData.curProfitMonth
    this.setData({
      monthNum: index + 1
    })
    console.log("r1")
    return new Promise(resolve => {
      // ...
      console.log("r2")
      db.collection("house_profit").where({
        address: getApp().globalData.curProfitHouse
      }).get({
        success: res => {
          console.log("r3")
           if (index == 0) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_1
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 1) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_2
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 2) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_3
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 3) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_4
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 4) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_5
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 5) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_6
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 6) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_7
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 7) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_8
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 8) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_9
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayCatagory.push(i + 1)
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 9) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_10
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
              dayProfit = []
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
            if (index == 10) {
              monthDetail = res.data[0].year_list.year_2019.month_detail.m_11
              dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              for (var i = 0; i < monthDetail.length - 1; i++) {
                dayProfit.push(monthDetail[i + 1])
              }
            }
          if (index == 11) {
            monthDetail = res.data[0].year_list.year_2019.month_detail.m_12
            dayCatagory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            dayProfit = []
            for (var i = 0; i < monthDetail.length - 1; i++) {
              dayProfit.push(monthDetail[i + 1])
            }
          }
          if (monthDetail.length == 0) {
            wx.navigateTo({
              url: "../noProfit/noProfit"
            })
          }
          console.log(monthDetail)
          chartData.main.categories = dayCatagory
          chartData.main.data = dayProfit
          console.log("--------", chartData.main.categories)
      

          // update data to chart, 最好能写进新的函数，但是现在database的promise调用还没搞懂
          // https://blog.csdn.net/fanjun_/article/details/82734625
          var windowWidth = 320;
          try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
          } catch (e) {
            console.error('getSystemInfoSync failed!');
          }

          columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,

            series: [{
              name: '月份',
              data: chartData.main.data,
              format: function (val, name) {
                return val.toFixed(2) + '元';
              }
            }],
            yAxis: {
              format: function (val) {
                return val + '元';
              },
              title: '收益',
              min: 0
            },
            xAxis: {
              disableGrid: false,
              type: '月份'
            },
            extra: {
              column: {
                width: 30
              }
            },
            width: windowWidth,
            height: 300,
            enableScroll: true,
            title: {
              fontSize: 50,
            }
          });
        },
        fail: err => {
          console.error('xxxxx[数据库] [查询记录] 失败：', err)
        }
      })
      // return resolve();
    })
    // return resolve();
  },
});