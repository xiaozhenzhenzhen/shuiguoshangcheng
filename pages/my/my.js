// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide:false,
    usermsg:{}
  },
  goshooping:function(e){
    wx.switchTab({
      url: '../home/home',
    })
  },
  jump: function (e) {
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/login/login?id=' + id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  quitlogin:function(){
    wx.clearStorage();
    wx.showLoading({
      title: '退出中',
    });
    setTimeout(()=>{
      this.onShow();
      wx.hideLoading()
    },500)
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res.data);
        this.setData({
          isHide: true,
          usermsg:res.data
        })
        console.log(this.data.usermsg)
      },
      fail: (err) => {
        this.setData({ isHide: false })
      }
    })
    console.log(this.data.isHide)
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