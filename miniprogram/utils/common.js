//放大图片
function previewImg(e) {
  var index = e.currentTarget.dataset.index;
  var imgArr = e.currentTarget.dataset.image;
  wx.previewImage({
    current: imgArr[index], //当前图片地址
    urls: imgArr, //所有要预览的图片的地址集合 数组形式
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}



module.exports.previewImg = previewImg;