//app.js
App({

  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  globalData: {
    inCode: null,
    adminInCode: null,
    serviceInCode: null,
    curProfitHouse: "",
    curProfitMonth: "",
    positions: [],
    uploadRes: [],
    loading: [],
    imgChoose: [],
    positions2: [],
    uploadRes2: [],
    loading2: [],
    imgChoose2: [],
    serviceProfile: false,
    landlordProfile: false,
    adminProfile: false,
    curCleanOrderCheck: "",
    checkProfitMonth: "",
    monthly_time_stamp_2019: []
  },
})