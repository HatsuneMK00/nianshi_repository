// pages/info/info.js
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
    var app = getApp()
    var that = this
    that.setData({
      openid: app.globalData.openid
    })
    // console.log(that.data.openid)
    wx.request({
      url: 'https://www.nianshi.xyz/getArticleByAuthor',
      data: {
        author_id:that.data.openid
      },
      success(res){
        // console.log(res)
        if(res.data=="no such article"){
          that.setData({message:"暂无文章"})
        }
        else{
          that.setData({message:""})
          var articles = [];
          for (var i = 0; i < res.data.length; i++) {
            articles.push(res.data[i]);
            articles[i].imagesrc = "https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
          }
          that.setData({
            articles
          })
          // console.log(articles)
        }
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
  bindIndexTap: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.id
    })
  },
})