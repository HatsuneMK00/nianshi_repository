Page({
  data: {
    items: [
      {
        url: 'https://www.nianshi.xyz/images/19000.jpg',
        image: 'iconfont icon-19000',
        text: '1900前'
      }, {
        url: 'https://www.nianshi.xyz/images/1900.jpg',
        image: 'iconfont icon-1900',
        text: '1900'
      }, {
        url: 'https://www.nianshi.xyz/images/1910.jpg',
        image: 'iconfont icon-1910',
        text: '1910'
      }, {
        url: 'https://www.nianshi.xyz/images/1920.jpg',
        image: 'iconfont icon-1920',
        text: '1920'
      }, {
        url: 'https://www.nianshi.xyz/images/1930.jpg',
        image: 'iconfont icon-1930',
        text: '1930'
      }, {
        url: 'https://www.nianshi.xyz/images/1940.jpg',
        image: 'iconfont icon-1940',
        text: '1940'
      }, {
        url: 'https://www.nianshi.xyz/images/1950.jpg',
        image: 'iconfont icon-1950',
        text: '1950'
      }, {
        url: 'https://www.nianshi.xyz/images/1960.jpg',
        image: 'iconfont icon-1960',
        text: '1960'
      }, {
        url: 'https://www.nianshi.xyz/images/1970.jpg',
        image: 'iconfont icon-1970',
        text: '1970'
      }, {
        url: 'https://www.nianshi.xyz/images/1980.jpg',
        image: 'iconfont icon-1980',
        text: '1980'
      }, {
        url: 'https://www.nianshi.xyz/images/1990.jpg',
        image: 'iconfont icon-1990',
        text: '1990'
      }, {
        url: 'https://www.nianshi.xyz/images/2000.jpg',
        image: 'iconfont icon-2000',
        text: '2000'
      }, {
        url: 'https://www.nianshi.xyz/images/2010.jpg',
        image: 'iconfont icon-2010',
        text: '2010'
      }, {
        url: 'https://www.nianshi.xyz/images/20100.jpg',
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