// pages/register/register.js
let that;
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificates:[
      {
        name:'',
        certificates_type: 1,
        image_arr: ['/pages/images/rangduju-bg.jpg','/pages/images/rangduju-bg.jpg'],
        number:''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
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
  getInputValue(e){
    that.getValue(e);
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
  photograph(e){
    let index=e.currentTarget.dataset.index;
    let indexz = e.currentTarget.dataset.indexz;
    let temporaryStr = 'certificates[' + index + '].image_arr[' + indexz + ']';
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {

          const filePath = res.tempFilePaths[0];
          // 上传图片
          const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              wx.cloud.getTempFileURL({
                //--fileList: 数组元素为需要换取文件路径的id值
                fileList: [res.fileID],
                success(res) {
                  console.log("获取真实路径", res)//返回的是图片下载地址
                  that.setData({
                    [temporaryStr]: res.fileList[0].tempFileURL
                  })
                }
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
  },
  //单选框事件
  radioChange(e) {
    that.getValue(e);    
  },
  //删除房客
  deletUser(){
    let arr=this.data.certificates;
    wx.showModal({
      title: '提示',
      content: '您确定删除该房客？',
      success(res) {
        if (res.confirm) {
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
  addUser(){
    let arr = this.data.certificates;
    let a = {
      name: '',
      certificates_type: 1,
      image_arr: ['/pages/images/rangduju-bg.jpg', '/pages/images/rangduju-bg.jpg'],
      number: ''
    };
    arr.push(a);
    this.setData({
      certificates: arr
    })
    console.log(arr)
  },
  //上传
  increase(){
    console.log(that.data.certificates)
    let information=that.data.certificates;
    for (let i = 0; i <information.length;i++){
      if (information[i].name == '' && information[i].number ==''){
        console.log(12);
        wx.showToast({
          title: '请您把信息填写完整！',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    db.collection('register').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        tenant1:that.data.certificates[0],
        tenant2: that.data.certificates[1],
        tenant3: that.data.certificates[2]
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  }
  
})