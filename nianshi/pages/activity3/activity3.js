Page({
  data: {
    find_items: [
      {
        image: 'https://www.nianshi.xyz/images/image1.png',
        avatar: 'https://www.nianshi.xyz/images/avatar1.png',
        nickname:'携程旅行',
        isLikenumber:134,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image2.png',
        brieftext: '漫步油菜花海',
        avatar: 'https://www.nianshi.xyz/images/avatar2.png',
        nickname: '春秋旅行',
        isLikenumber: 248,
        isLike: false,
      }, 
      {
        image: 'https://www.nianshi.xyz/images/image3.png',
        brieftext: '桃林畅游',
        avatar: 'https://www.nianshi.xyz/images/avatar3.png',
        nickname: '康辉旅行',
        isLikenumber: 112,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image4.png',
        brieftext: '三月枝头玉兰闹',
        avatar: 'https://www.nianshi.xyz/images/avatar4.png',
        nickname: '众信旅游',
        isLikenumber: 197,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image5.png',
        brieftext: '一路向东，踏青之旅',
        avatar: 'https://www.nianshi.xyz/images/avatar5.png',
        nickname: '中国国旅',
        isLikenumber: 247,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image6.png',
        brieftext: '江南丝竹，声声入耳',
        avatar: 'https://www.nianshi.xyz/images/avatar6.png',
        nickname: '锦江旅游',
        isLikenumber: 146,
        isLike: false,
      },
    ],
    find_items2: [
      {
        image: 'https://www.nianshi.xyz/images/image7.png',
        brieftext: '定时药物盒',
        avatar: 'https://www.nianshi.xyz/images/avatar7.png',
        nickname: '安诚老年用品',
        isLikenumber: 134,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image8.png',
        brieftext: 'GPS导航拐杖',
        avatar: 'https://www.nianshi.xyz/images/avatar8.png',
        nickname: '康心便民',
        isLikenumber: 248,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image9.png',
        brieftext: '水龙头瓶盖',
        avatar: 'https://www.nianshi.xyz/images/avatar9.png',
        nickname: '源兴有限公司',
        isLikenumber: 112,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image10.png',
        brieftext: '立式放大镜',
        avatar: 'https://www.nianshi.xyz/images/avatar10.png',
        nickname: '福康堂',
        isLikenumber: 197,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image11.png',
        brieftext: '多功能拐杖',
        avatar: 'https://www.nianshi.xyz/images/avatar11.png',
        nickname: '得立荣',
        isLikenumber: 247,
        isLike: false,
      },
      {
        image: 'https://www.nianshi.xyz/images/image12.png',
        brieftext: '可折叠洗澡椅',
        avatar: 'https://www.nianshi.xyz/images/avatar12.png',
        nickname: '禾兴老年',
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
    this.data.find_items2[find_index].isLike = !this.data.find_items2[find_index].isLike;
    if (this.data.find_items2[find_index].isLike) {
      this.data.find_items2[find_index].isLikenumber++;
    }
    else {
      this.data.find_items2[find_index].isLikenumber--;
    }
    this.setData({
      find_items2: this.data.find_items2,
    })
  },
})
