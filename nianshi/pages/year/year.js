Page({
  data: {
    items: [
      {
        url: '../../images/19000.png',
        image: 'iconfont icon-19000',
        text: '1900前'
      }, {
        url: '../../images/1900.png',
        image: 'iconfont icon-1900',
        text: '1900'
      }, {
        url: '../../images/1910.png',
        image: 'iconfont icon-1910',
        text: '1910'
      }, {
        url: '../../images/1920.png',
        image: 'iconfont icon-1920',
        text: '1920'
      }, {
        url: '../../images/1930.png',
        image: 'iconfont icon-1930',
        text: '1930'
      }, {
        url: '../../images/1940.png',
        image: 'iconfont icon-1940',
        text: '1940'
      }, {
        url: '../../images/1950.png',
        image: 'iconfont icon-1950',
        text: '1950'
      }, {
        url: '../../images/1960.png',
        image: 'iconfont icon-1960',
        text: '1960'
      }, {
        url: '../../images/1970.png',
        image: 'iconfont icon-1970',
        text: '1970'
      }, {
        url: '../../images/1980.png',
        image: 'iconfont icon-1980',
        text: '1980'
      }, {
        url: '../../images/1990.png',
        image: 'iconfont icon-1990',
        text: '1990'
      }, {
        url: '../../images/2000.png',
        image: 'iconfont icon-2000',
        text: '2000'
      }, {
        url: '../../images/2010.png',
        image: 'iconfont icon-2010',
        text: '2010'
      }, {
        url: '../../images/20100.png',
        image: 'iconfont icon-20100',
        text: '2010后'
      }
    ],
  },
  bindYearTap: function(e){
    wx.navigateTo({
      url: '/pages/articleList/articleList?id=' + e.target.id,
    })
  }
})