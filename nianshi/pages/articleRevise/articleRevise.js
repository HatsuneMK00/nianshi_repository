// pages/articleRevise/articleRevise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleFontSize: '30px',
    contentFontSize: '20px',
    timeAndAuthorSize: '15px',
    article_id: '',
    article_title: '',
    article_content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app=getApp();
    console.log(app);
    wx.request({
      url: 'https://www.nianshi.xyz/api/getArticle?id=' + options.id,
      data: {
        article_id:options.id,
        openid:app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Test: res.data,
          article_id: res.data.article_id,
          article_title: res.data.title,
          article_content: res.data.text
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
      article_title: e.detail.value
    })
  },

  setContent: function (e) {
    this.setData({
      article_content: e.detail.value
    })
  },

  articleRevisePost: function (e) {
    var that = this
    wx.showToast({
      title: 'loading',
      icon: 'loading',
    })
    console.log(that.data.article_id)
    console.log(that.data.article_title)
    console.log(that.data.article_content)
    wx.request({
      url: 'https://www.nianshi.xyz/api/update_article',
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'string',
      data: { 'article_id' : that.data.article_id, 'title' : that.data.article_title, 'article': that.data.article_content },
      success(res){
        console.log(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  },

})


