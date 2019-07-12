var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var gPhone = getApp().globalData.globalPhone;
const db = wx.cloud.database();
var chartData = {
  main: {
    title: '总成交量',
    data: null,
    categories: null,
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13, 55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13, 55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35, 76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
};

var testData = null;

Page({
  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true,
    startTime: null,
    endTime:null,
    cata:null,
    dat:null,
  },
  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
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
    if (this.endTime - this.startTime > 250) {
      columnChart.scrollEnd(e);
    }
    // 点击条形图，跳入详情页面
    else {
      console.log("点击");    
      var index = columnChart.getCurrentDataIndex(e);
      if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
        this.setData({
          chartTitle: chartData.sub[index].title,
          isMainChartDisplay: false
        });
        columnChart.updateData({
          categories: chartData.sub[index].categories,
          series: [{
            name: '成交量',
            data: chartData.sub[index].data,
            format: function (val, name) {
              return val.toFixed(2) + '万';
            }
          }]
        });
      }
    }
  },

  onLoad: function() {
    // this.getRevenue().then(result => {
    //   this.show();
    // });
    this.getRevenue()
  },


  getRevenue: function () {
    console.log("r1")
    return new Promise(resolve => {
          // ...
          console.log("r2")
          var gPhone = getApp().globalData.globalPhone
          const db = wx.cloud.database()
          db.collection("propro").where({
            phone: gPhone
          }).get({
            success: res => {
              console.log("r3"),
                this.setData({
                  queryResult: JSON.stringify(res.data, null, 2),
                  revenue: res.data[0].revenue,
                  cata: res.data[0].categories,
                })
              chartData.main.categories = res.data[0].categories
              chartData.main.data = res.data[0].data
              console.log("=====", chartData.main.data)
              console.log('[数据库] [查询记录] 成功: ', res)
              console.log('查到的盈利是', this.data.revenue)

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
                  name: '成交量',
                  data: chartData.main.data,
                  format: function (val, name) {
                    return val.toFixed(2) + '万';
                  }
                }],
                yAxis: {
                  format: function (val) {
                    return val + '万';
                  },
                  title: 'hello',
                  min: 0
                },
                xAxis: {
                  disableGrid: false,
                  type: 'calibration'
                },
                extra: {
                  column: {
                    width: 15
                  }
                },
                width: windowWidth,
                height: 200,
                enableScroll: true,
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

//   test: function() {
//   var promise = new Promise(function (resolve){
//     console.log("inner promise"); // 1
//     console.log("r2")
   
//     const db = wx.cloud.database()
//     db.collection("propro").where({
//       phone: gPhone
//     }).get({
//       success: res => {
//         console.log("r3"),
//           this.setData({
//             queryResult: JSON.stringify(res.data, null, 2),
//             revenue: res.data[0].revenue,
//             cata: res.data[0].categories,
//           })
//         chartData.main.categories = res.data[0].categories
//         chartData.main.data = res.data[0].data
//         console.log("=====", chartData.main.data)
//         console.log('[数据库] [查询记录] 成功: ', res)
//         console.log('查到的盈利是', this.data.revenue)
//       },
//       fail: err => {
//         wx.showToast({
//           icon: 'none',
//           title: '查询记录失败'
//         })
//         console.error('[数据库] [查询记录] 失败：', err)
//       }
//     })

//     resolve(42);
// });
// promise.then(function(value){
//     console.log(value); // 3
//   console.log("?????????", chartData.main.categories)
//   var windowWidth = 320;
//   try {
//     var res = wx.getSystemInfoSync();
//     windowWidth = res.windowWidth;
//   } catch (e) {
//     console.error('getSystemInfoSync failed!');
//   }

//   columnChart = new wxCharts({
//     canvasId: 'columnCanvas',
//     type: 'column',
//     animation: true,
//     categories: chartData.main.categories,

//     series: [{
//       name: '成交量',
//       data: chartData.main.data,
//       format: function (val, name) {
//         return val.toFixed(2) + '万';
//       }
//     }],
//     yAxis: {
//       format: function (val) {
//         return val + '万';
//       },
//       title: 'hello',
//       min: 0
//     },
//     xAxis: {
//       disableGrid: false,
//       type: 'calibration'
//     },
//     extra: {
//       column: {
//         width: 15
//       }
//     },
//     width: windowWidth,
//     height: 200,
//     enableScroll: true,
//   });
    
// });
// console.log("outer promise"); // 2
//   },
 
  // show: function () {
  //   console.log("?????????", chartData.main.categories)
  //   var windowWidth = 320;
  //   try {
  //     var res = wx.getSystemInfoSync();
  //     windowWidth = res.windowWidth;
  //   } catch (e) {
  //     console.error('getSystemInfoSync failed!');
  //   }

  //   columnChart = new wxCharts({
  //     canvasId: 'columnCanvas',
  //     type: 'column',
  //     animation: true,
  //     categories: chartData.main.categories,
      
  //     series: [{
  //       name: '成交量',
  //       data: chartData.main.data,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '万';
  //       }
  //     }],
  //     yAxis: {
  //       format: function (val) {
  //         return val + '万';
  //       },
  //       title: 'hello',
  //       min: 0
  //     },
  //     xAxis: {
  //       disableGrid: false,
  //       type: 'calibration'
  //     },
  //     extra: {
  //       column: {
  //         width: 15
  //       }
  //     },
  //     width: windowWidth,
  //     height: 200,
  //     enableScroll: true,
  //   });
  // }
 });