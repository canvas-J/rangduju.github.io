// miniprogram/pages/home/home.js


Page({
  data: {
    list: [
      {
        id: 'landlord',
        name: '我是房东',
        open: false,
        
      },
      // {
      //   id: 'predict',
      //   name: '短租潜力预测',
      //   open: false,
       
      // },
      // {
      //   id: 'management',
      //   name: '房源委托管理',
      //   open: false,
        
      // },
      {
        id: 'service',
        name: '我是服务方',
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
      else if (id === "landlord") {
        console.log(id)
        wx.navigateTo({
          url: '../prevIndex/prevIndex'//实际路径要写全
        })
      }
      
      else if (id === "predict") {
        console.log(id)
        wx.navigateTo({
          url: '../predict/predict'//实际路径要写全
        })
      }
      else if (id === "service") {
        console.log(id)
        wx.navigateTo({
          url: '../service/service'//实际路径要写全
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
