//index.js

Page({
  data: {
    currentNavtab: "0",
    imgUrls: [
      {
        src: 'https://www.nianshi.xyz/images/red_block.png',
        text: 'This is a topic'
      },
      {
        src: 'https://www.nianshi.xyz/images/yellow_block.png',
        text: 'This is a topic'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperIndex: 0,
    feedIndex: 0,
    swiperChange(e) {
      const that = this;
      that.setData({
        swiperIndex: e.detail.current,
      })
    },
    feed: [
      {
        article_id: 0,
        article_name: "我们是改革开放的成果",
        author_name: "毕飞宇",
        article_outline: "60一代对改革开放的评论",
        article_img: "https://www.nianshi.xyz/images/art1.jpg",
        good_num: "112",
        good_yet: 0,
        comment_num: "18"
      },
      {
        article_id: 1,
        article_name: "我的前半生",
        author_name: "青锋",
        article_outline: "一个平凡人真实的生活回忆",
        article_img: "https://www.nianshi.xyz/images/art2.jpg",
        good_num: "124",
        good_yet: 0,
        comment_num: "11"
      },
      {
        article_id: 2,
        article_name: "我的前半生",
        author_name: "青锋",
        article_outline: "一个平凡人真实的生活回忆",
        article_img: "https://www.nianshi.xyz/images/art2.jpg",
        good_num: "124",
        good_yet: 0,
        comment_num: "11"
      },
      {
        article_id: 3,
        article_name: "我的前半生",
        author_name: "青锋",
        article_outline: "一个平凡人真实的生活回忆",
        article_img: "https://www.nianshi.xyz/images/art2.jpg",
        good_num: "124",
        good_yet: 0,
        comment_num: "11"
      }
    ],
  },
  bindActTap: function (e) {
    wx.navigateTo({
      url: '/pages/activity/activity',
    })
    console.log(e)
  },
  bindIndexTap: function (e) {
    console.log(e)
      wx.navigateTo({
        url: '/pages/article/article',
      })
    // wx.switchTab({
    //   url: '',
    // })({
    //   // url: '../article/articleId?id=value'
    //   url: '/pages/agepage/agepage'
    // })
  },
  bindLikeTap: function (e) {
    // this.data.good_yet = 1 - this.data.good_yet
    // if(this.data.good_yet == 1){
    //   this.data.good_num = this.data.good_num + 1
    // }
    // else{
    //   this.data.good_num = this.data.good_num - 1
    // }
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // upper:function(e){

  // },

  // lower:function(e){

  // }
})
