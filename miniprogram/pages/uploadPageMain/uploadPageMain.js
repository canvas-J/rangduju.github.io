// miniprogram/pages/uploadPageMain/uploadPageMain.js
// Created by: Liuting Chen
// 保洁前照片上传页面

import {
  $init,
  $digest
} from '../../utils/common.util'
const app = getApp()
var util = require('../../utils/util.js');
var positions = app.globalData.positions
var uploadRes = app.globalData.uploadRes
var loading = app.globalData.loading
var imgChoose = app.globalData.imgChoose

Page({
  data: {
    positions: ["卧室", "卫生间", "厨房", "客厅"],
    images: [],
    image_1: '',
    imageList: [],
    imgUrl: '',
    uploadRes: [],
    loading: [],
    color: '#D3D3D3',
    imgChoose: [],
    order_num: 0
  },

  onLoad: function() {
    positions = app.globalData.positions
    uploadRes = app.globalData.uploadRes
    loading = app.globalData.loading
    imgChoose = app.globalData.imgChoose
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    $init(this)
    for (var i = 0; i < this.data.positions; i++) {
      positions.push('')
      uploadRes.push(false)
      loading.push(false)
      imgChoose.push(false)
    }
    this.setData({
      images: positions,
      uploadRes: uploadRes,
      loading: loading,
      imgChoose: imgChoose
    })
  },

  onShow: function() {
    this.getOrderNum()
    
  },

  onUnload: function() {},

  getOrderNum: function () {
    wx.cloud.database().collection('order_num').count({
      success: res => {
        this.setData({
          order_num : res.total + 1
        })
        console.log(res.total)
      }
    })
  },

  chooseImageID(e) {
    var idx = e.target.dataset.idx
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      count: 1,
      success: res => {
        positions[idx] = res.tempFilePaths[0]
        imgChoose[idx] = true
        this.setData({
          images: positions,
          imgChoose: imgChoose
        })
      }
    })
  },

  removeImageID(e) {
    var idx = e.target.dataset.idx
    positions[idx] = ''
    imgChoose[idx] = false
    this.setData({
      images: positions,
      imgChoose: imgChoose
    })
    $digest(this)
  },

  handleImagePreviewID(e) {
    var idx = e.target.dataset.idx
    wx.previewImage({
      current: this.data.images[idx],
      urls: this.data.images
    })
  },

  doUploadID: function(e) {
    var idx = e.target.dataset.idx
    if (this.data.images[idx] == "" || this.data.images[idx] == null) {
      wx.showModal({
        content: "请添加图片",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确认")
          }
        }
      })
    } else {
      loading[idx] = true
      this.setData({
        loading: loading
      })
    }
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'uploadImages/' + app.globalData.inCode + '~' + Date.now(), // 文件名称 
      // 指定要上传的文件的小程序临时文件路径
      filePath: this.data.images[idx],
      // 成功回调
      success: res => {
        wx.hideLoading()
        console.log('上传成功', res)
        uploadRes[idx] = true
        this.setData({
          imgUrl: res.fileID,
          uploadRes: uploadRes,
        })
        this.addImgList(res.fileID, this.data.positions[idx])
      },
    })
  },

  //添加到图片列表
  addImgList(imgurl, inputName) {
    wx.cloud.database().collection('imagelist').add({
      data: {
        name: inputName,
        invCode: app.globalData.inCode,
        imgUrl: imgurl,
        time: this.getNowFormatDate(),
        status: "before clean",
        order_num: this.data.order_num
      },
      success(res) {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)
      }
    })
  },

  //获取当前时间,返回时间格式：2019-05-23 15:43:36
  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },

  uploadPageSecond: function(e) {

    wx.navigateTo({
      url: '../uploadPageSecond/uploadPageSecond' //实际路径要写全
    })
  }
})