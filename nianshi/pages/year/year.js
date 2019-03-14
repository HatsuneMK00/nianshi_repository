Page({
  data: {
    items: [
      {
        url: 'https://www.nianshi.xyz/images/19000.png',
        image: 'iconfont icon-19000',
        text: '1900前'
      }, {
        url: 'https://www.nianshi.xyz/images/1900.png',
        image: 'iconfont icon-1900',
        text: '1900'
      }, {
        url: 'https://www.nianshi.xyz/images/1910.png',
        image: 'iconfont icon-1910',
        text: '1910'
      }, {
        url: 'https://www.nianshi.xyz/images/1920.png',
        image: 'iconfont icon-1920',
        text: '1920'
      }, {
        url: 'https://www.nianshi.xyz/images/1930.png',
        image: 'iconfont icon-1930',
        text: '1930'
      }, {
        url: 'https://www.nianshi.xyz/images/1940.png',
        image: 'iconfont icon-1940',
        text: '1940'
      }, {
        url: 'https://www.nianshi.xyz/images/1950.png',
        image: 'iconfont icon-1950',
        text: '1950'
      }, {
        url: 'https://www.nianshi.xyz/images/1960.png',
        image: 'iconfont icon-1960',
        text: '1960'
      }, {
        url: 'https://www.nianshi.xyz/images/1970.png',
        image: 'iconfont icon-1970',
        text: '1970'
      }, {
        url: 'https://www.nianshi.xyz/images/1980.png',
        image: 'iconfont icon-1980',
        text: '1980'
      }, {
        url: 'https://www.nianshi.xyz/images/1990.png',
        image: 'iconfont icon-1990',
        text: '1990'
      }, {
        url: 'https://www.nianshi.xyz/images/2000.png',
        image: 'iconfont icon-2000',
        text: '2000'
      }, {
        url: 'https://www.nianshi.xyz/images/2010.png',
        image: 'iconfont icon-2010',
        text: '2010'
      }, {
        url: 'https://www.nianshi.xyz/images/20100.png',
        image: 'iconfont icon-20100',
        text: '2010后'
      }
    ],
  },
  bindYearTap: function(e){
    console.log(e)
    var years = ['19000', '1900', '1910', '1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '20100'];
    wx.navigateTo({
      url: '/pages/articleList/articleList?id=' + years[e.target.id],
    })
  }
})