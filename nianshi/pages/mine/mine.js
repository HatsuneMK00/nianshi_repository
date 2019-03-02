Page({
  data: {
    avatar: '',
    username: '',
    items: [
      {
        url: '../../images/sc.png',
        image: 'iconfont icon-sc',
        text: 'sc'
      }, {
        url: '../../images/ls.png',
        image: 'iconfont icon-ls',
        text: 'ls'
      }, {
        url: '../../images/tg.png',
        image: 'iconfont icon-tg',
        text: 'tg'
      }, {
        url: '../../images/fk.png',
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
})