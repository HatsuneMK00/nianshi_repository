Page({

  /**
   * 页面的初始数据
   */
  data: {
    ongoingActivities: [
      {
        time:"2019/10/10",
        title:"春天的故事",
        subtitle:"又是一年春来到",
        // imgsrc:"https://www.nianshi.xyz/images/yellow_block.png",
        imgsrc:"/images/spring.jpg",
        heat:9999,
        describe:"我们与春天的故事。",
        phase:"01"
      },
      {
        time: "2019/11/11",
        title: "乡愁情怀",
        subtitle:"记忆中不变的眷念",
        // imgsrc: "https://www.nianshi.xyz/images/yellow_block.png",
        imgsrc:"/images/act2.jpg",
        heat: 9999,
        describe:"乡愁是母亲的一碗面，是老家的一棵树，还是那一句熟悉的呼唤？",
        phase:"02"
      }
    ],
    doneActivities: [
      {
        time:"2019/9/9",
        title: "抽奖送陈大佬一只!!!",
        imgsrc: "https://www.nianshi.xyz/images/yellow_block.png",
        heat: 9999
      },
      {
        time:"2019/8/8",
        title: "抽奖送焦菜鸡一只",
        imgsrc: "https://www.nianshi.xyz/images/yellow_block.png",
        heat: 0
      }
    ]
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
    
  }
})