// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  gotologIn: function (e) {
    var that = this
    wx.showToast({
      title: 'loading',
      icon: 'loading',
    })
    console.log(e)

    wx.request({
      url: 'https://www.nianshi.xyz/signUp',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'string',
      data: { 'openid': that.data.openid, 'articleID': that.data.articleID, 'author': that.data.author, 'pwd': that.data.pwd},
      success(res) {
        if(res.statusCode != 200)
        {
          wx.hideToast()
          that.setData({
            error: "您已经注册过了"
          })
        }
        else
        {
          wx.hideToast()
          console.log(res)
          console.log("success")
          wx.navigateTo({
            url: '/pages/info/info',
          })
        }
      },
    })
  },
  getAuthor: function(e){
    
    this.setData({
      author: e.detail.value
    })
  },
  getPwd: function(e){
    this.setData({
      pwd: e.detail.value
    })
  }
})