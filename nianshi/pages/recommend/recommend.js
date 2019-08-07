//index.js

Page({
  data: {
    currentNavtab: "0",
    imgUrls: [
      {
        src: 'https://www.nianshi.xyz/images/theme.jpg',
        text: '每季主题'
      },
      {
        src: 'https://www.nianshi.xyz/images/theme.jpg',
        text: '每季主题'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperIndex: 0,
    feedIndex: 0,
    swiperChange(e) {
      const that = this;
      that.setData({
        swiperIndex: e.detail.current,
      })
    },
    
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  bindActTap: function (e) {
    wx.navigateTo({
      url: '/pages/activity/activity',
    })
    // console.log(e)
  },
  bindIndexTap: function (e) {
    console.log(e);
    var that = this
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.id,
    })
    //wx.request({
    //url: '/pages/article/article',
    //data: { openid: app.globalData.openid}
    //})
    /*wx.request({
      url: 'https://www.nianshi.xyz/getInfo',
      data: { 'openid': that.data.openid },
      success(res) {
        console.log(res)
        if (res.data['signed'] == 'false') {
          wx.navigateTo({
            url: '/pages/upload/upload',
          })
        }
        else {
          wx.navigateTo({
            url: '/pages/article/article?id='+ e.currentTarget.id,
          })
        }
      }
    })*/
  },
    // wx.switchTab({
    //   url: '',
    // })({
    //   // url: '../article/articleId?id=value'
    //   url: '/pages/agepage/agepage'
    // })
  bindLikeTap: function (e) {
    var that=this
    wx.request({
      url: 'https://www.nianshi.xyz/setLike',
      data:{
        article_id:that.data.article_id,
        openid:app.globalData.openid
      }
    })
    // this.data.good_yet = 1 - this.data.good_yet
    // if(this.data.good_yet == 1){
    //   this.data.good_num = this.data.good_num + 1
    // }
    // else{
    //   this.data.good_num = this.data.good_num - 1
    // }
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'testgetInfo',
      success: function (res) {
        app.globalData.openid = res.result.info.OPENID
        console.log(app.globalData.openid)
      }
    })
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    wx.request({
      url: 'https://www.nianshi.xyz/getArticleByLike',
      success(res) {
        // console.log(res)
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

  // upper:function(e){

  // },

  // lower:function(e){

  // }
})
