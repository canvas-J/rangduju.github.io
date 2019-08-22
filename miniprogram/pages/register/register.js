// pages/register/register.js
let that;
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    certificates: [{
      name: '',
      certificates_type: 1,
      image_arr: [],
      image_id: [],
      number: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },
  //取值
  getValue(e) {
    let str;
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    if (type == 'name') {
      str = 'certificates[' + index + '].name';
      console.log('radio发生change事件，携带value值为：', e.detail.value);
    } else if (type == 'radio') {
      str = 'certificates[' + index + '].certificates_type';
      console.log('radio发生change事件，携带value值为：', e.detail.value);
    } else {
      str = 'certificates[' + index + '].number';
      console.log('radio发生change事件，携带value值为：', e.detail.value);
    }
    let value = e.detail.value.replace(/\s/g, '');
    that.setData({
      [str]: value
    })
  },
  getInputValue(e) {
    that.getValue(e);
  },
  //单选框事件
  radioChange(e) {
    that.getValue(e);
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
  photograph(e) {
    let index = e.currentTarget.dataset.index;
    let indexz = e.currentTarget.dataset.indexz;
    let temporaryStr = 'certificates[' + index + '].image_arr[' + indexz + ']';
    let temporaryIdStr = 'certificates[' + index + '].image_id[' + indexz + ']';
    let imageId = that.data.certificates[index].image_id[indexz];
    //删除云存储中的图片
    if (imageId != undefined) {
      wx.cloud.deleteFile({
        fileList: [imageId]
      }).then(res => {
        // handle success
        console.log(res.fileList)
      }).catch(error => {
        // handle error
      })
    }
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        const filePath = res.tempFilePaths[0];
        that.setData({
          [temporaryStr]: filePath
        })
        // 上传图片
        const cloudPath = Date.now() + filePath.match(/\.[^.]+?$/)[0]
        // const cloudPath = filePath.match(/([^/*.]+)\.\w+$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              [temporaryIdStr]: res.fileID
            })

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
          },
        })


      },
      fail: e => {
        console.error(e)
      }
    })
    console.log(that.data.certificates, 133);
  },

  //删除房客
  deletUser() {
    let arr = that.data.certificates;
    wx.showModal({
      title: '提示',
      content: '您确定删除该房客？',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < 2; i++) {
            let imageId = arr[arr.length - 1].image_id[i]
            if (imageId != undefined) {
              wx.cloud.deleteFile({
                fileList: [imageId]
              }).then(res => {
                // handle success
                console.log(res.fileList)
              }).catch(error => {
                // handle error
              })
            }
          }
          arr.splice(-1, 1);
          that.setData({
            certificates: arr
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //添加房客
  addUser() {
    let arr = this.data.certificates;
    let a = {
      name: '',
      certificates_type: 1,
      image_arr: [],
      image_id: [],
      number: ''
    };
    arr.push(a);
    this.setData({
      certificates: arr
    })
  },
  //提交信息
  increase() {
    // console.log(that.data.certificates)
    let information = that.data.certificates;
    for (let i = 0; i < information.length; i++) {
      if (information[i].name == '' || information[i].number == '') {
        wx.showToast({
          title: '请您把信息填写完整！',
          icon: 'none',
          duration: 2000
        })
        return
      } else if (information[i].image_arr[0] == undefined || information[i].image_arr[1] == undefined) {
        wx.showToast({
          title: '请您选择证件照片！',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    db.collection('register').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          tenant1: that.data.certificates[0],
          tenant2: that.data.certificates[1],
          tenant3: that.data.certificates[2]
        }
      })
      .then(res => {
        console.log(res)
        if (res.errMsg == 'collection.add:ok') {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          //返回上一级菜单
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
      })
      .catch(err => {
        console.error(err)
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      })

  }
  


})