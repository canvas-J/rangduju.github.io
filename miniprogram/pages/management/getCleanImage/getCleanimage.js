// miniprogram/pages/getCleanImage/getCleanimage.js
// Created by: Liuting Chen
// 管理员查看保洁前后照片页面

var imgListBefore = []
var imgListAfter = []
var dataList = []

Page({
  data: {
    dataListBefore: [],
    dataListAfter: [],
    urlList: [],
    inputShowed: false,
    inputVal: "",
    totalOrderNum: 0
  },
  onLoad: function () {
    this.getOrderNum()
  },
  getOrderNum: function () {
    wx.cloud.database().collection('order_num').count({
      success: res => {
        this.setData({
          totalOrderNum: res.total
        })
      }
    })
  },
  search: function() {
    console.log(this.data.inputVal)
    this.getImageListAfter();
    this.getImageListBefore();
    imgListBefore = []
    imgListAfter = []


  },
  getImageListBefore() {
    let that = this;
    that.setData({
      dataListBefore: []
    })
    wx.cloud.database().collection('imagelist').where({
      order_num:parseInt(this.data.inputVal),
      status:"before clean"
    }).get({
      success(res) {
        console.log(res)
        that.setData({
          dataListBefore: res.data,
        })
        for (var i = 0; i < that.data.dataListBefore.length; i++) {
          imgListBefore.push(that.data.dataListBefore[i].imgUrl)
        }
      }
    })
  },
  getImageListAfter() {
    let that = this;
    that.setData({
      dataListAfter: []
    })
    wx.cloud.database().collection('imagelist').where({
      order_num: parseInt(this.data.inputVal),
      status: "after clean"
    }).get({
      success(res) {
        console.log(res)
        that.setData({
          dataListAfter: res.data,
        })
        for (var i = 0; i < that.data.dataListAfter.length; i++) {
          imgListAfter.push(that.data.dataListAfter[i].imgUrl)
        }
      }
    })
  },
  handleImagePreviewIDBefore(e) {
    var idx = e.target.dataset.idx
    wx.previewImage({
      current: imgListBefore[idx],
      urls: imgListBefore
    })
  },
  handleImagePreviewIDAfter(e) {
    var idx = e.target.dataset.idx
    wx.previewImage({
      current: imgListAfter[idx],
      urls: imgListAfter
    })
  },

  onUnload: function () {

  },

  //去发布页
  qufabu() {
    wx.navigateTo({
      url: '../home/home',
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  hideInputReload: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      dataListBefore: [],
      dataListAfter: [],
      urlList: []
    });
  },

})