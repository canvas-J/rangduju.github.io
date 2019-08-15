// pages/reservation/reservation.js
let that;
const common=require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: ['https://7261-rangduju-test-8i0oe-1259621310.tcb.qcloud.la/qrcode.png?sign=f4ddf526529324a1057b18c09ad349e7&t=1565861232']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;

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