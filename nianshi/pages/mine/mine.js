Page({
  data: {
    avatar: '',
    username: '',
    items: [
      {
        url: 'https://www.nianshi.xyz/images/sc.png',
        image: 'iconfont icon-sc',
        text: 'sc'
      }, {
        url: 'https://www.nianshi.xyz/images/ls.png',
        image: 'iconfont icon-ls',
        text: 'ls'
      }, {
        url: 'https://www.nianshi.xyz/images/tg.png',
        image: 'iconfont icon-tg',
        text: 'tg'
      }, {
        url: 'https://www.nianshi.xyz/images/fk.png',
        image: 'iconfont icon-fk',
        text: 'fk'
      }
    ],
  },
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'testgetInfo',
      success: function (res) {
        that.setData({
          openid: res.result.info.OPENID,
          test:"omg"
        })
        app.globalData.openid = that.data.openid
        console.log(that.data)
      }
    })
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if(!res.authSetting["scope.userInfo"]&&(!app.globalData.asked)){
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
        else{
          wx.getUserInfo({
            success(res){
              app.globalData.nickName = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              that.setData({
                username: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl
              })
            },
            fail(res){
              that.setData({
                avatar:'/images/logo.png'
              })
            }
          })
        }
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
    
    
  },
  onShow: function () {
    var that = this
    wx.getSetting({
      success(res){
        if(res.authSetting["scope.userInfo"]){
          var app = getApp()
          that.setData({ avatar: app.globalData.avatarUrl, username: app.globalData.nickName })
        }
        else{
          that.setData({
            avatar: '/images/logo.png'
          })
        }
      }
    })
  },
  f1: function (e) {
    if(e.currentTarget.id=="2"){
      var app = getApp()
      var that = this
      console.log(that.data.openid)
      wx.request({
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
              url: '/pages/info/info',
            })
          }
        }
      })
    }
    else if (e.currentTarget.id == "0" || e.currentTarget.id == "1" || e.currentTarget.id == "3"){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url: '/pages/list/list?id=' + e.currentTarget.id,
      })
    }
  },
  wantToAuth: function(e){
    wx.getSetting({
      success(res){
        if (!res.authSetting['scope.userInfo']){
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  }
})