// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindContributeTap:function(e){
    var that = this;
    var app=getApp();
    wx.navigateTo({
      url: '/pages/contribute/contribute',
    })
  },
  catchReviseTap:function(e){
    var that = this;
    var app=getApp();
    console.log('hello');
    wx.navigateTo({
      url: '/pages/articleRevise/articleRevise?id='+ e.currentTarget.id,
    })
  },
  catchDeleteTap:function(e){
    console.log(e.currentTarget.id);
    wx.showModal({
      title:"删除确认",
      content:"是否确认删除这篇文章?",
      confirmText:"确认",
      cancelText:"取消",
      success(res){
        if(res.confirm){
          console.log(e.currentTarget.id)
          wx.request({
            url: 'https://www.nianshi.xyz/api/delete_article',
            data: {
              article_id: e.currentTarget.id
            },
            success(res){
              wx.showToast({
                title: '删除成功'
              })
              var page = getCurrentPages().pop(); //当前页面
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          console.log("confirmed");
        }else if(res.cancel){
          console.log("cancelled");
        }
      }
    });

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
        console.log(res)
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      var page = getCurrentPages().pop(); //当前页面
      if (page == undefined || page == null) return;
      page.onLoad();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
  bindInfoTap: function (e){
    wx.navigateTo({
      url: '/pages/'
    })
  },
  bindIndexTap: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.id
    })
  },
})