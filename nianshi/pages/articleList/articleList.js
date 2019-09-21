// pages/articleList/articleList.js


Page({
  data: {
    currentNavtab: "0",
    interval: 5000,
    duration: 1000,
    swiperIndex: 0,
    feedIndex: 0,
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
  bindIndexTap: function (e) {
    // console.log(e);
   wx.navigateTo({
     url: '/pages/article/article?id=' + e.currentTarget.id
   })
  },
  // bindLikeTap: function (e) {
  //   this.data[idx].good_yet = 1 - this.data[idx].good_yet
  //   if(this.data.good_yet == 1){
  //     this.data.good_num = this.data.good_num + 1
  //   }
  //   else{
  //     this.data.good_num = this.data.good_num - 1
  //   }
  //   console.log(e)
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    var method ='getArticleByAge?age=';
    var types = ['亲情','友情','爱情'];
    if(prevpage.route=='pages/year/year'){
      method = 'getArticleByAge?age='
    }
    else{
      method = 'getArticleByType?type=';
    }
    var that = this;
    wx.request({
      url: 'https://www.nianshi.xyz/' + method + options.id,
      success(res){
        // console.log(res)
        if (method == 'getArticleByAge?age='){
          wx.setNavigationBarTitle({
            title: '文章~' + options.id})
        }
        else{
          wx.setNavigationBarTitle({
            title: '文章~' + types[options.id]})
        }
         var articles = [];
         var notPass = 0;
        for(var i = 0; i < res.data.length; i++){
          console.log(res.data[i].passed);
          if (res.data[i].passed != 1) {
            notPass++;
          }
          if (res.data[i].passed != 0 && res.data[i].passed != 2) {
            articles.push(res.data[i]);
            articles[i - notPass].imagesrc = "https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
          }
          // articles.push(res.data[i]);
          // articles[i].imagesrc ="https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
        }
        that.setData({
          articles
        })
        // console.log(articles)
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

  }
})