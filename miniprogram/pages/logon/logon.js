// miniprogram/pages/logon/logon.js
let openid;
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid();
    
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
  //获取用户信息
  userInfoHandler(res) {
    if (res.detail['userInfo']) {
      let data = res.detail.userInfo;
      wx.setStorageSync("auth", data); //把用户信息存入缓存
      let openid = this.data.openid;
      db.collection('viewers').where({
          _openid: openid
        }).get()
        .then(res => {
          console.log(res)
          if (res.data[0]) {
            db.collection('viewers').doc(res.data[0]._id).update({
                // data 传入需要局部更新的数据
                data: {
                  // 表示将 done 字段置为 true
                  user: data
                }
              })
              .then(res => {
                console.log(res)
                wx.reLaunch({
                  url: '../home/home',
                })
              })
              .catch(console.error)
          } else {
            db.collection('viewers').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  user: data
                }
              })
              .then(res => {
                console.log(res)
                wx.reLaunch({
                  url: '../home/home',
                })
              })
              .catch(console.error)
          }
        })
        .catch(err => {
          console.error(err)
        })

      console.log(159)
    } else {
      wx.showToast({
        title: '您点击了取消',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(res)
  },
  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  }
})