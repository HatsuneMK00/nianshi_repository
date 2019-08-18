// pages/article/article.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleFontSize : '',
    contentFontSize : '',
    timeAndAuthorSize : '',
    imagesrc :''
  },
  bindLikeTap:function(e){
    var that = this;
    var app = getApp();
    var option;
    console.log(that.data.Test.liked)
    if(that.data.Test.liked=='false'){
      option='like_article';
    }
    else{option='dislike_article';}
    console.log(option)
    wx.request({
      url: 'https://www.nianshi.xyz/api/'+option,
      data: {
        article_id: that.data.Test.article_id,
        openid: app.globalData.openid
      },
      success(res){
        console.log(res)
        if(res.data=='success'){
          console.log('hello')
          that.setData({
            'that.data.Test.liked': 'false',
            'that.data.Test.numoflike': ['that.data.Test.numofLike'] - 1
          })
        }
        else if(res.data=='error'){
          console.log('helllo')
          that.setData({
            'that.data.Test.liked':'ture',
            'that.data.Test.numoflike':['that.data.Test.numofLike']+1
          })
        }
        
      }
    })
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
    console.log(options);
    wx.request({
      url: 'https://www.nianshi.xyz/api/set_read',
      data:{
        article_id: options.id,
        openid: app.globalData.openid
      },
      success: function(res){
        console.log("set read success")
      }
    })
    wx.request({
      url: 'https://www.nianshi.xyz/api/getArticle', //服务器地址 实际按调用文章页会传过来的id号来访问
      data: {
        article_id:options.id,
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        var winWidth = wx.getSystemInfoSync().windowWidth
        var winHeight = wx.getSystemInfoSync().windowHeight
        
        console.log(winWidth)

        console.log(res.data)
        that.setData({
          Test: res.data
        })
        that.setData({
          imagesrc:"https://www.nianshi.xyz/articleImage?image_id=0&article_id=" + res.data.article_id
        })
        var titleLength = res.data.title.length
        console.log(titleLength)
        if (titleLength <=8  && winWidth <= 500){
          that.setData({
            titleFontSize: "42px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 8 && titleLength <= 12  && winWidth <= 500){//小于12
          that.setData({
            titleFontSize: "30px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        } else if (titleLength > 12 && winWidth <= 500) {//小于15
          that.setData({
            titleFontSize: "24px",
            contentFontSize: "20px",
            timeAndAuthorSize: "15px"
          })
        }else if (titleLength <= 9&& winWidth >= 500){
          that.setData({
            titleFontSize: "70px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 9 && titleLength <= 12 && winWidth >= 500){
          that.setData({
            titleFontSize: "60px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        } else if (titleLength > 12 && winWidth >= 500) {//小于18
          that.setData({
            titleFontSize: "45px",
            contentFontSize: "35px",
            timeAndAuthorSize: "25px"
          })
        }//字体调整算法后再用计算式,请用中文调试，暂硬编写《==================================
      },
      fail: function (err){
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

})