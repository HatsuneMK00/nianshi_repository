var app = getApp()
var that

Page({
  data: {
    DataSource:[1,1,1],
    icon: '../../images/logo.png',
    content: '我衷心地谢谢您\n一番关怀和情意\n如果没有你给我爱的滋润\n我生命将会失去意义\n我们在春风里陶醉飘逸\n仲夏夜里绵绵细语\n聆听那秋虫它轻轻在\n呢喃迎雪花飘满地\n我的平凡岁月里有了一个你\n显得充满活力\n❄️',
    resource: ['../../images/歌曲.jpg'
    ],
    zanSource: ['大佬A', '大佬B', '大佬C', '大佬D', '大佬E', '大佬F'],
    contnet: [{
      'firstname': '大佬A',
      'content': '我也很喜欢邓丽君'
    },
    {
      'firstname': '大佬B',
      'content': '哇，一代人的回忆！'
    },
    {
      'firstname': '大佬C',
      'content': '真好～'
    },
    {
      'firstname': '大佬D',
      'content': '中国好歌声🌹'
    }
    ],

    photoWidth: wx.getSystemInfoSync().windowWidth ,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },
  // 点击图片进行大图查看
  LookPhoto: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.resource,
    })
  },

  TouchZanUser: function (e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },

  delete: function () {
    wx.showToast({
      title: '删除成功',
    })
  },

  TouchDiscuss: function (e) {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    })

    if (that.data.isShow == false) {
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: true
      })

      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(0).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      setTimeout(function () {
        animation.width(120).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  }
})