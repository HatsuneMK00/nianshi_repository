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
    // console.log('onloading');
    var that = this;
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        console.log(avatarUrl);
        that.setData({ avatar: avatarUrl, username: nickName})
        console.log(nickName);
      }
    })
    
  },
  onShow: function () {
    console.log("onshow");
  },
  onLoad: function(){
    var app = getApp()
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'testgetInfo',
      success: function (res) {
        that.setData({
          openid: res.result.info.OPENID
        })
        app.globalData.openid = that.data.openid
      }
    })
  },
  f1: function (e) {
    if(e.currentTarget.id=="2"){
      var app = getApp()
      var that = this
      console.log(app.globalData.openid)
      wx.request({
        url: 'https://www.nianshi.xyz/getInfo',
        data: { 'openid': app.globalData.openid },
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
  }
})