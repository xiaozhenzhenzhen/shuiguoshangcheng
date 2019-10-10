// pages/comment/comment.js
Page({

  data: {
    active:0,
    data: {},
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
    
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  jumpHome: function () {
    //功能：用户点击详情按钮后跳转详情组件comment
    wx.switchTab({
      url: '../home/home',
    })
    //保留并且跳转,特点允许回退
    //获取自定义属性
    // wx.navigateTo({
    //   url: '/pages/home/home',
    // });
    //
  },
  jumpmy:function(){
    wx.switchTab({
      url: '../my/my',
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  //页面加载获取点击页id
  onLoad: function (options) {
    const sc = wx.cloud.database();
     console.log(options);
     //查询当前id的所有数据
    sc.collection("myproduct").where({
      _id: options.id
    }).get().then(res => {
      console.log(res.data);
      //保存要轮播的图片
      this.setData({
        imgUrls: [res.data[0].picOne, res.data[0].picsecond, res.data[0].picthree]
      })
      //保存页面要使用的数据
      this.setData({
          data:res.data[0]
      })

    }).catch(err =>{
      console.log(err);
    });
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