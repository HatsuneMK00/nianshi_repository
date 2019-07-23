// pages/articleRevise/articleRevise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleFontSize: '30px',
    contentFontSize: '20px',
    timeAndAuthorSize: '15px',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.request({
      url: 'https://www.nianshi.xyz/getArticle?id=3', //+ options.id,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Test: res.data
        })
      },
      fail: function (err) {
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

  setTitle: function (e) {
    this.setData({
      Title: e.detail.value
    })
  },

  setContent: function (e) {
    this.setData({
      Content: e.detail.value
    })
  },

  articleRevisePost: function (e) {
    var that = this
    wx.showToast({
      title: 'loading',
      icon: 'loading',
    })
    wx.request({
      url: '',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'string',
      data: { 'article': Test.article_id , 'title': that.data.Title , 'content' : that.data.Content },
      success(res){
        console.log(res)
      }
    })
  },

})


