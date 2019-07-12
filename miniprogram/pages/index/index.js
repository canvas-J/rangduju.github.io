// miniprogram/pages/home/home.js


Page({
  data: {
    list: [
      {
        id: 'about',
        name: '关于我们',
        open: false,

      },
      {
        id: 'predict',
        name: '短租潜力预测',
        open: false,

      },
      {
        id: 'management',
        name: '房源委托管理',
        open: false,

      },
      {
        id: 'feedback',
        name: '用户评价',
        open: false,
      },
      // {
      //   id: 'contact',
      //   name: '联系我们',
      //   open: false,
      // }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id
    console.log(id)

    if (id === "management") {
      console.log(id)
      wx.navigateTo({
        url: '../management/management'//实际路径要写全
      })
    }
    else if (id === "about") {
      console.log(id)
      wx.navigateTo({
        url: '../about/about'//实际路径要写全
      })
    }

    else if (id === "predict") {
      console.log(id)
      wx.navigateTo({
        url: '../predict/predict'//实际路径要写全
      })
    }
    else if (id === "feedback") {
      console.log(id)
      wx.navigateTo({
        url: '../feedback/feedback'//实际路径要写全
      })
    }
    // else if (id === "contact") {
    //   console.log(id)
    //   wx.navigateTo({
    //     url: '../contact/contact',//实际路径要写全
    //   })
    // }

  }
},


);
