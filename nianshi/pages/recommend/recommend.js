//index.js

Page({
  data: {
    exchange: 0,
    animation_start: 0,
    currentNavtab: "0",
    imgUrls: [
      {
        src: 'https://www.nianshi.xyz/images/theme.jpg',
        bindfun: 'bindActTap1'
      },
      {
        src: '../../images/好歌分享.png',
        bindfun: 'bindActTap2'
      },
      {
        src: '../../images/社区活动.png',
        bindfun: 'bindActTap3'
      },
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
    
// not in chenyu part
// in zihangyihan part 
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
// end

  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  bindActTap1: function (e) {
    wx.navigateTo({
      url: '/pages/activity/activity',
    })
    // console.log(e)
  },

  bindActTap2: function (e) {
    wx.navigateTo({
      url: '/pages/activity2/activity2',
    })
    console.log(e)
  },
  bindActTap3: function (e) {
    wx.navigateTo({
      url: '/pages/activity3/activity3',
    })
    console.log(e)
  },
  bindIndexTap: function (e) {
    console.log(e);
    var that = this
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.id,
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
    /* 刷新后只改变点赞数，暂时保留
    var that = this;
    wx.request({
      url: 'https://www.nianshi.xyz/getArticleByLike',
      success(res) {
        console.log(res)
        console.log(that)
        for (var i = 0; i < that.data.articles.length; i++) {
          for(var j = 0; j < res.data.length; j++){
            if(that.data.articles[i].article_id == res.data[j].article_id){
              if (that.data.articles[i].numofLike != res.data[j].numofLike){
                that.data.articles[i].numofLike = res.data[i].numofLike
                break
              }
            }
          }
          //console.log(res.data[i].passed);
        }
        that.setData({
          articles:that.data.articles
        })
      }
    })
    */
  },
  bindLikeTap: function (e) {
    var that=this
    wx.request({
      url: 'https://www.nianshi.xyz/setLike',
      data:{
        article_id:that.data.article_id,
        openid:app.globalData.openid
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  // there are two onload function?
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
          if (res.data[i].passed != 0 && res.data[i].passed != 2){
            articles.push(res.data[i]);
            articles[i-notPass].imagesrc = "https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data[i].article_id;
          }
        }
        that.setData({
          articles
        })
        console.log(articles)
      }
    })

    // chenyu animation part
    var ani_above_1 = wx.createAnimation({
      duration: 1500,
      delay: 1000,
      timingFunction: 'ease',
    })
    var ani_above_2 = wx.createAnimation({
      duration: 1500,
      delay: 1000,
      timingFunction: 'ease',
    })
    var ani_above_3 = wx.createAnimation({
      duration: 1500,
      delay: 1000,
      timingFunction: 'ease',
    })
    var ani_image = wx.createAnimation({
      duration: 3000,
      delay: 1000,
      timingFunction: 'ease-in',
    })
    var ani_below_4 = wx.createAnimation({
      duration: 2000,
      delay: 2500,
      timingFunction: 'ease',
    })
    var ani_below_5 = wx.createAnimation({
      duration: 2000,
      delay: 2500,
      timingFunction: 'ease',
    })
    var ani_below_6 = wx.createAnimation({
      duration: 2000,
      delay: 2500,
      timingFunction: 'ease',
    })
    var extra = wx.createAnimation({
      delay: 8000,
      duration: 2000
    })
    var temp = wx.getSystemInfoSync().windowWidth;
    ani_above_1.opacity(1).translateX(130 / 750 * temp).step();
    ani_above_2.opacity(1).translateX(100 / 750 * temp).step();
    ani_above_3.opacity(1).translateX(74 / 750 * temp).step();
    ani_image.opacity(1).step();
    ani_below_4.opacity(1).translateX(160 / 750 * temp).step();
    ani_below_5.opacity(1).translateX(74 / 750 * temp).step();
    ani_below_6.opacity(1).translateX(-20 / 750 * temp).step();
    extra.opacity(1).step();
    this.setData({
      ani_above_1: ani_above_1.export(),
      ani_above_2: ani_above_2.export(),
      ani_above_3: ani_above_3.export(),
      ani_image: ani_image.export(),
      ani_below_4: ani_below_4.export(),
      ani_below_5: ani_below_5.export(),
      ani_below_6: ani_below_6.export(),
      extra: extra.export()
    })
  },
  animation_over: function (event) {
    console.log("动画结束", event);
    this.setData({
      exchange: 1
    })
  },
  start_now: function (options) {
    this.setData({
      exchange: 1
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

  // upper:function(e){

  // },

  // lower:function(e){

  // }
})
