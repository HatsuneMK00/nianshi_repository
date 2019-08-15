Page({
  data: {
    find_items: [
      {
        image: '../../images/image1.jpg',
        brieftext: '梅林诗画节',
        avatar: '../../images/avatar1.png',
        nickname:'携程旅行',
        isLikenumber:134,
        isLike: false,
      },
      {
        image: '../../images/image2.jpg',
        brieftext: '漫步油菜花海',
        avatar: '../../images/avatar2.png',
        nickname: '春秋旅行',
        isLikenumber: 248,
        isLike: false,
      }, 
      {
        image: '../../images/image3.jpg',
        brieftext: '桃林畅游',
        avatar: '../../images/avatar3.png',
        nickname: '康辉旅行',
        isLikenumber: 112,
        isLike: false,
      },
      {
        image: '../../images/image4.jpg',
        brieftext: '三月枝头玉兰闹',
        avatar: '../../images/avatar4.png',
        nickname: '众信旅游',
        isLikenumber: 197,
        isLike: false,
      },
      {
        image: '../../images/image5.jpeg',
        brieftext: '一路向东，踏青之旅',
        avatar: '../../images/avatar5.png',
        nickname: '中国国旅',
        isLikenumber: 247,
        isLike: false,
      },
      {
        image: '/images/image6.jpeg',
        brieftext: '江南丝竹，声声入耳',
        avatar: '/images/avatar6.png',
        nickname: '锦江旅游',
        isLikenumber: 146,
        isLike: false,
      },
    ],
  },
  //事件处理函数

  find_checkboxChange: function (e) {
    let id = e.target.dataset.id, find_index = parseInt(e.target.dataset.index);
    this.data.find_items[find_index].isLike = !this.data.find_items[find_index].isLike;
    if (this.data.find_items[find_index].isLike) {
      this.data.find_items[find_index].isLikenumber++;
    }
    else {
      this.data.find_items[find_index].isLikenumber--;
    }
    this.setData({
      find_items: this.data.find_items,
    })
  },

})
