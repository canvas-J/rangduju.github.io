// pages/paymentTest/paymentTest.js
const db = wx.cloud.database();
let userName;
let newDate;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    auth= wx.getStorageSync('auth');
    console.log(auth);
    userName=auth.nickName;
    let date = new Date();
    newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //支付
  pay() {
    wx.cloud.callFunction({
        name: 'getPay',
        data: {
          total_fee: parseFloat(0.01).toFixed(2) * 700000,
          attach: 'anything',
          body: '清洁费'
        }
      })
      .then(res => {
        wx.requestPayment({
          appId: res.result.appid,
          timeStamp: res.result.timeStamp,
          nonceStr: res.result.nonce_str,
          package: 'prepay_id=' + res.result.prepay_id,
          signType: 'MD5',
          paySign: res.result.paySign,
          success: res => {
            console.log(res)
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
            if (res['errMsg']) {
              db.collection('pay_user').add({
                  // data 字段表示需新增的 JSON 数据
                  data: {
                    userName: userName,
                    time: newDate
                  }
                })
                .then(res => {
                  console.log(res);
                  console.log('支付数据存入成功')
                })
                .catch(console.error)
            } else {
              console.log('支付数据存入失败')
            }
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      })
  }

})