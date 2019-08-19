// pages/reservation/reservation.js
let that;
const common=require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    wx.cloud.downloadFile({
      fileID: 'cloud://rangduju-test-8i0oe.7261-rangduju-test-8i0oe/qrcode.png'
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      let str='qrcode[0]'
      that.setData({
        [str]: res.tempFilePath
      })
    }).catch(error => {
      // handle error
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  previewImg(e){
    common.previewImg(e);
  }

})