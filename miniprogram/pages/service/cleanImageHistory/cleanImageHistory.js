// miniprogram/pages/getCleanImage/getCleanimage.js
// Created by: Liuting Chen

var imgList = []
var app = getApp()

Page({
  data: {
    dataList: [],
    urlList: []
  },

  onLoad: function() {
    this.getImageList();
  },

  getImageList() {
    let that = this;
    wx.cloud.database().collection('imagelist')
      .where({
        invCode: app.globalData.serviceInCode,
        order_num: parseInt(app.globalData.curCleanOrderCheck)
      })
      .get({
        success: res => {
          console.log(res)
          that.setData({
            dataList: res.data,
          })
          imgList = []
          for (var i = 0; i < that.data.dataList.length; i++) {
            imgList.push(that.data.dataList[i].imgUrl)
          }
        }
      })
  },

  handleImagePreviewID(e) {
    var idx = e.target.dataset.idx
    wx.previewImage({
      current: imgList[idx],
      urls: imgList
    })
  },

  onUnload: function() {

  },

  //去发布页
  qufabu() {
    wx.navigateTo({
      url: '../home/home',
    })
  }
})