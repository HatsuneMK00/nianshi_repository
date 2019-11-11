Page({
  data: {
    items: [
      {
        url: 'https://www.nianshi.xyz/images/0qinqing.png',
        image: 'iconfont icon-qq',
        text: '亲情'
      }, {
        url: 'https://www.nianshi.xyz/images/1youqing.png',
        image: 'iconfont icon-yq',
        text: '友情'
      }, {
        url: 'https://www.nianshi.xyz/images/2aiqing.png',
        image: 'iconfont icon-aq',
        text: '爱情'
      }, {
        url: 'https://www.nianshi.xyz/images/3shehui.png',
        image: 'iconfont icon-sh',
        text: '社会'
      }, {
        url: 'https://www.nianshi.xyz/images/4lishi.png',
        image: 'iconfont icon-ls',
        text: '历史'
      }, {
        url: 'https://www.nianshi.xyz/images/5tongnian.png',
        image: 'iconfont icon-tn',
        text: '童年'
      }, {
        url: 'https://www.nianshi.xyz/images/6jiaxiang.png',
        image: 'iconfont icon-jx',
        text: '家乡'
      }, {
        url: 'https://www.nianshi.xyz/images/7meishi.png',
        image: 'iconfont icon-ms',
        text: '美食'
      }, {
        url: 'https://www.nianshi.xyz/images/8zizhuan.png',
        image: 'iconfont icon-zz',
        text: '自传'
      }, {
        url: 'https://www.nianshi.xyz/images/9jishi.png',
        image: 'iconfont icon-js',
        text: '纪实'
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