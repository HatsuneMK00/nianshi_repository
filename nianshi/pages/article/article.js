// pages/article/article.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleFontSize: '',
    contentFontSize: '',
    timeAndAuthorSize: '',
    hasImg: true,
    imagesrc: ''
  },
  bindLikeTap: function(e) {
    var that = this;
    var app = getApp();
    var option;
    if (that.data.Test.liked == false) {
      option = 'like_article';
    } else {
      option = 'dislike_article';
    }
    wx.request({
      url: 'https://www.nianshi.xyz/api/' + option,
      data: {
        article_id: that.data.Test.article_id,
        openid: app.globalData.openid
      },
      success(res) {
        if (res.data == 'success') {
          that.data.Test.liked = !that.data.Test.liked
          if (that.data.Test.liked == true) {
            that.data.Test.numofLike = that.data.Test.numofLike + 1
            wx.showToast({
              title: '收藏成功\^o^/',
              icon: 'none'
            })
          } else {
            that.data.Test.numofLike = that.data.Test.numofLike - 1
            wx.showToast({
              title: '已取消收藏~',
              icon: 'none'
            })
          }
        } else if (res.data == 'error') {
          console.log('res error')
        }
        that.setData({
          Test: that.data.Test
        })
        /* 修改上一页的数据 */
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];
        for (var i = 0; i < prevPage.data.articles.length; i++) {
          if (prevPage.data.articles[i].article_id == currPage.data.Test.article_id) {
            prevPage.data.articles[i].numofLike = currPage.data.Test.numofLike;
            break;
          }
        }
        prevPage.setData({
          articles: prevPage.data.articles
        })

      }
    })
    /* 修改上一页的数据 */
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    console.log(prevPage);
    for (var i = 0; i < prevPage.data.articles.length; i++) {
      if (prevPage.data.articles[i].article_id == currPage.data.Test.article_id) {
        console.log(currPage.data.Test.numofLike)
        prevPage.data.articles[i].numofLike = currPage.data.Test.numofLike;
        break;
      }
    }
    console.log(prevPage)
    prevPage.setData({
      articles: prevPage.data.articles
    })
    //prevPage.data.articles[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var app = getApp();
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'testgetInfo',
      success: function(res) {
        app.globalData.openid = res.result.info.OPENID
        // console.log(app.globalData.openid)
      }
    })
    console.log(options);
    wx.request({
      url: 'https://www.nianshi.xyz/api/set_read',
      data: {
        article_id: options.id,
        openid: app.globalData.openid
      },
      success: function(res) {
        console.log("set read success")
      }
    })
    console.log(options.id)
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://www.nianshi.xyz/api/getArticle', //服务器地址 实际按调用文章页会传过来的id号来访问
      data: {
        article_id: options.id,
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {

        var winWidth = wx.getSystemInfoSync().windowWidth
        var winHeight = wx.getSystemInfoSync().windowHeight

        console.log(res.data)
        that.setData({
          Test: res.data
        })
        that.setData({
          imagesrc: "https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data.article_id
        })
        wx.request({
          url: that.data.imagesrc,
          success: function(res){
            console.log(res)
            if (res.data == 'no such image'){
              that.setData({
                hasImg: false
              })
            }
          }
        })
        var titleLength = res.data.title.length
        console.log(that)
        if (titleLength <= 8 && winWidth <= 500) {
          that.setData({
            titleFontSize: "42px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 8 && titleLength <= 12 && winWidth <= 500) { //小于12
          that.setData({
            titleFontSize: "30px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 12 && winWidth <= 500) { //小于15
          that.setData({
            titleFontSize: "24px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength <= 9 && winWidth >= 500) {
          that.setData({
            titleFontSize: "70px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 9 && titleLength <= 12 && winWidth >= 500) {
          that.setData({
            titleFontSize: "60px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 12 && winWidth >= 500) { //小于18
          that.setData({
            titleFontSize: "45px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } //字体调整算法后再用计算式,请用中文调试，暂硬编写《==================================
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})