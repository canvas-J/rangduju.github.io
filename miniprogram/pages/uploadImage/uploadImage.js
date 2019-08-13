// miniprogram/pages/uploadImage/uploadImage.js
// Created by: Liuting Chen
// 此页目前没用，暂时保留

import { $init, $digest } from '../../utils/common.util'
const app = getApp()
var util = require('../../utils/util.js');
var s = null
var result = null

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    topButtom: '获取我的头像昵称',
    images: []
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    $init(this)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("success")
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                topButtom: res.userInfo.nickName
              })
              console.log("suc", this.userInfo)
            }

          })
        }
      }
    })
  },

  onUnload: function() {
    result = null
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        result = res
        s = res.tempFilePaths.length
        
        // 限制最多只能留下9张照片
        this.data.images = images.length <= 9 ? images : images.slice(0, 9)
        console.log("____", this.data.images)
        $digest(this) 
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        topButtom: res.userInfo.nickName
      })
    }
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    
    this.data.images.splice(idx, 1)
    result.tempFilePaths.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },

  onGetOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        // console.log("电话号是："+this.data.phoneNum)
        app.globalData.openid = res.result.openid
        // this.curUser = res.result.openid
        console.log("openid", res.result.openid)

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    if (result == null) {
      wx.showModal({
        content: "请添加图片",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确认")
          }
        }
      })
    } else {
      wx.showLoading({
        title: '上传中...',
        mask: true
      })
    }

    Promise.all(result.tempFilePaths.map((item, index) => {
      console.log("___", item)
      return wx.cloud.uploadFile({
        cloudPath: 'uploadImages/' + app.globalData.inCode + '#idx' + index + '~' + Date.now(), // 文件名称 
        filePath: item,
      })
    }))
      .then((resCloud) => {
        console.log("+++", resCloud)
        wx.hideLoading()
        wx.showModal({
          content: '上传成功，返回',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                changed: true
              })
            }
          }
        });

      }).catch((err) => {
        console.log(err)
      })
  },

})
