var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
const db = wx.cloud.database();
var monthDetail = null
var day_catagory = []
var chartData = {
  main: {
    title: '2019年收益展示',
    data: null,
    categories: null,
  }
};

var testData = null;

Page({
  data: {
    chartTitle: '2019年收益展示',
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
  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '每月收益',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }]
    });
  },
  touchHandler: function (e) {
    this.startTime = e.timeStamp;
    columnChart.scrollStart(e);
  },
  moveHandler: function (e) {
    columnChart.scroll(e);
  },

  touchEndHandler: function (e) {
    this.endTime = e.timeStamp

    // 拖动条形图处理
    if (this.endTime - this.startTime > 200) {
      columnChart.scrollEnd(e);
    }
    // 点击条形图，跳入详情页面
    else {
      var monthprofit = 0;
      var index = columnChart.getCurrentDataIndex(e);
      console.log("点击", index);
      app.globalData.curProfitMonth = index
      db.collection("house_profit").where({
        address: getApp().globalData.curProfitHouse
      }).get({
        success: res => {
          monthprofit = 0
          monthprofit = res.data[0].year_list.year_2019.months[index+1]
          console.log(monthprofit)
          if (monthprofit == 0) {
            wx.navigateTo({
              url: "../noProfit/noProfit"
            })
          } else {
            wx.navigateTo({
              url: "../monthlyProfit/monthlyProfit"
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  },

  onLoad: function () {
    // this.getRevenue().then(result => {if
    //   this.show();
    // });
    this.getRevenue()
  },

  //  这个function是画柱状图用的
  getRevenue: function () {
    console.log("r1")
    return new Promise(resolve => {
      // ...
      console.log("r2")
      db.collection("house_profit").where({
        address: getApp().globalData.curProfitHouse
      }).get({
        success: res => {
          console.log("r3"),
            // this.setData({
            //   revenue: res.data[0].revenue,
            //   cate: res.data[0].categories,
            // })
          

          this.data.months = res.data[0].year_list.year_2019.months
          // chartData.main.categories = res.data[0].categories
          // chartData.main.data = res.data[0].data
          console.log('2019 [数据库] [查询记录] 成功: ', res)
          var monthProfit = res.data[0].year_list.year_2019.months
          var monthNum = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          var profitShowed = []
          var monthShowed = []
          console.log(monthProfit)
          for (var i = 0; i < 12; i++) {
              console.log(monthProfit[i]);
              profitShowed.push(monthProfit[i+1]);
              monthShowed.push(monthNum[i]);
          }
          chartData.main.categories = monthShowed
          chartData.main.data = profitShowed

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
                width: 40
              }
            },
            width: windowWidth,
            height: 300,
            enableScroll: true,
            title: {
              fontSize:50,
            }
          });
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
    // return resolve();
  },
});