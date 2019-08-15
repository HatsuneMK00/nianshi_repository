// pages/articleList/articleList.js


Page({
  data: {
    currentNavtab: "0",
    interval: 5000,
    duration: 1000,
    swiperIndex: 0,
    feedIndex: 0,
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
      for(var i = 0; i < res.data.length; i++){
        articles.push(res.data[i]);
        articles[i].imagesrc ="https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
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