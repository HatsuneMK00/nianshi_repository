Page({
  data: {
    items: [
      {
        url: '../../images/0qinqing.png',
        image: 'iconfont icon-qq',
        text: '亲情'
      }, {
        url: '../../images/1youqing.png',
        image: 'iconfont icon-yq',
        text: '友情'
      }, {
        url: '../../images/2aiqing.png',
        image: 'iconfont icon-aq',
        text: '爱情'
      }, {
        url: '../../images/3shehui.png',
        image: 'iconfont icon-sh',
        text: '社会'
      }, {
        url: '../../images/4lishi.png',
        image: 'iconfont icon-ls',
        text: '历史'
      }, {
        url: '../../images/5tongnian.png',
        image: 'iconfont icon-tn',
        text: '童年'
      }, {
        url: '../../images/6jiaxiang.png',
        image: 'iconfont icon-jx',
        text: '家乡'
      }, {
        url: '../../images/7meishi.png',
        image: 'iconfont icon-ms',
        text: '美食'
      }, {
        url: '../../images/8zizhuan.png',
        image: 'iconfont icon-zz',
        text: '自传'
      }, {
        url: '../../images/9jishi.png',
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