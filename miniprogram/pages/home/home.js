// miniprogram/pages/home/home.js
// Created by: Liuting Chen
// 让渡居首页以及入口页面

var app = getApp()

Page({
  data: {
    nowTime: '',
    someTime: null,
    list: [{
        id: 'landlord',
        name: '我是房东',
        open: false,

      },
      // {
      //   id: 'predict',
      //   name: '短租潜力预测',
      //   open: false,

      // },
      {
        id: 'service',
        name: '我是保洁方',
        open: false,
      },
      {
        id: 'management',
        name: '我是管理员',
        open: false,

      },
      // {
      //   id: 'contact',
      //   name: '我是管理员',
      //   open: false,
      // }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id
    console.log(id)

    if (id === "management") {
      console.log(id)
      wx.navigateTo({
        url: '../management/management' //管理员页面跳转
      })
    } else if (id === "landlord") {
      console.log(id)
      wx.navigateTo({
        url: '../landlordMain/landlordMain' //房东页面跳转
      })
    } else if (id === "service") {
      console.log(id)
      wx.navigateTo({
        url: '../service/service' //保洁房页面跳转
      })
    }
  },
});

