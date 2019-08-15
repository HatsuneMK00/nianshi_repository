Page({
  data: {
    items: [
      {
        url: 'https://www.nianshi.xyz/images/qq.png',
        image: 'iconfont icon-qq',
        text: '亲情'
      }, {
        url: 'https://www.nianshi.xyz/images/yq.png',
        image: 'iconfont icon-yq',
        text: '友情'
      }, {
        url: 'https://www.nianshi.xyz/images/aq.png',
        image: 'iconfont icon-aq',
        text: '爱情'
      }
    ],
  },
  bindAffairTap: function (e) {
    console.log(e.target.id),
    wx.navigateTo({
      url: '/pages/articleList/articleList?id=' + e.target.id,
    })
  }
})