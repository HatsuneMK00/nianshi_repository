Page({
  data: {

  },
  onLoad: function () {
    var app = getApp();
    app.asked = true
  },
  notAuthorizing: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //这里写用户同意授权之后的逻辑
      var that = this;
      var app = getApp();
      console.log(e)
      wx.getUserInfo({
        success(res) {
          app.globalData.nickName = res.userInfo.nickName
          app.globalData.avatarUrl = res.userInfo.avatarUrl
          app.globalData.gender = res.userInfo.gender // 性别 0：未知、1：男、2：女
          app.globalData.province = res.userInfo.province
          app.globalData.city = res.userInfo.city
          app.globalData.country = res.userInfo.country
          wx.navigateBack({
            delta:1
          })
        }
      })
      
    } else {
      //用户按了拒绝按钮
      //这里写用户拒绝授权之后的逻辑
      wx.showModal({
        content:"没有授权将无法显示头像",
        success(res){
          if(res.confirm){
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },
//我觉得可以在点进小程序的时候判断是否授权，如果没有授权就跳到这个授权界面 然后点授权登陆按钮就可以调出授权的窗口
//如果这里选择拒绝了的话 在“我的”页面里面显示头像和用户名那里可以显示一个微信登陆的button，可以在那边点了之后进这个授权页面？
})