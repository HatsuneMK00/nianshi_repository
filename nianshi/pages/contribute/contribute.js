Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearArray: ['1900前', '1900', '1910', '1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2010后'],
    yearIndex: 0,
    affairArray: ['亲情','友情','爱情','社会','自传','纪实'],
    affairIndex: 0,
    postYear: 19000,
    postAffair: 0,
    article_title: '',
    article_content: ''
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

  setTitle: function (e) {
    this.setData({
      article_title: e.detail.value
    })
  },

  setContent: function (e) {
    this.setData({
      article_content: e.detail.value
    })
  },

  bindAffairPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      affairIndex: e.detail.value,
      postAffair: e.detail.value
    })
  },

  bindYearPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      yearIndex: e.detail.value,
      postYear: e.detail.value
    })
    if (e.detail.value == 0){
      this.setData({
        postYear: 19000
      })
    } else if (e.detail.value == 13) {
      this.setData({
        postYear: 20100
      })
    } else if (e.detail.value <= 12 && e.detail.value >= 1) {
      var num = (e.detail.value - 1) * 10 + 1900
      this.setData({
        postYear: num
      })
    }
    console.log(this.data.postYear)
  },

  articleUpdatePost: function (e) {
    var app = getApp();
    // wx.cloud.init()
    // wx.cloud.callFunction({
    //   name: 'testgetInfo',
    //   success: function (res) {
    //     app.globalData.openid = res.result.info.OPENID
    //     console.log(app.globalData.openid)
    //   }
    // })
    var that = this
    wx.showToast({
      title: 'loading',
      icon: 'loading',
    })
    console.log(that.data.article_title)
    console.log(that.data.article_content)
    console.log(app.globalData.openid)
    console.log(that.data.postAffair)
    console.log(that.data.postYear)
    wx.request({
      url: 'https://www.nianshi.xyz/api/upload_article',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'string',
      data: { 'openid': app.globalData.openid, 'title': that.data.article_title, 'article': that.data.article_content, 'type': String(that.data.postAffair), 'year': String(that.data.postYear) },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '提交成功'
        })
      }
    })
  }
})