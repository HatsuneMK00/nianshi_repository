Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  bindIndexTap: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.id
    })
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    var that = this;
    wx.request({
      url: 'https://www.nianshi.xyz/getArticleByLike',
      success(res) {
        // console.log(res)
        var articles = [];
        var notPass = 0;
        for (var i = 0; i < res.data.length; i++) {
          //console.log(res.data[i].passed);
          if (res.data[i].passed != 1) {
            notPass++;
          }
          if (res.data[i].passed != 0 && res.data[i].passed != 2) {
            articles.push(res.data[i]);
            articles[i - notPass].imagesrc = "https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
          }
        }
        that.setData({
          articles
        })
        console.log(articles)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    console.log(app)
    wx.request({
      url: 'https://www.nianshi.xyz/api/get_liked_article/'+app.globalData.openid,
      success(res){
        console.log(res)
        if (res.data.length == 0) {
          that.setData({ message: "暂时没有已收藏的文章哦" })
        }
        else {
          that.setData({ message: "" })
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
    var page = getCurrentPages().pop(); //当前页面
    if (page == undefined || page == null) return;
    page.onLoad();
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
    
  }
})