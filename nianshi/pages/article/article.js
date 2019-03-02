// pages/article/article.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleFontSize : '',
    contentFontSize : '',
    timeAndAuthorSize : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.nianshi.xyz/getArticle?id=2', //服务器地址 实际按调用文章页会传过来的id号来访问，暂硬编写《==================================
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        var winWidth = wx.getSystemInfoSync().windowWidth
        var winHeight = wx.getSystemInfoSync().windowHeight
        
        console.log(winWidth)

        console.log(res.data)
        that.setData({
          Test: res.data
        })
        var titleLength = res.data.title.length

        console.log(titleLength)
        if (titleLength <=8  && winWidth <= 500){
          that.setData({
            titleFontSize: "42px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 8 && titleLength <= 12  && winWidth <= 500){//小于12
          that.setData({
            titleFontSize: "30px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 12 && winWidth <= 500) {//小于15
          that.setData({
            titleFontSize: "24px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        }else if (titleLength <= 9&& winWidth >= 500){
          that.setData({
            titleFontSize: "70px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 9 && titleLength <= 12 && winWidth >= 500){
          that.setData({
            titleFontSize: "60px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 12 && winWidth >= 500) {//小于18
          that.setData({
            titleFontSize: "45px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        }//字体调整算法后再用计算式,请用中文调试，暂硬编写《==================================
      },
      fail: function (err){
        console.log(err)
      }
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

})