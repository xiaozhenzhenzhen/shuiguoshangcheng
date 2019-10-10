// pages/db/db.js
//初始化云数据库
const db = wx.cloud.database();
Page({
  data: {

  },
  addData:function(){
    //此方法完成向云数据库myproduct添加数据
    db.collection("myproduct").add({
      data:{
        id:1,comefrom:"本产品由品典果专供",title:"福建三华李  大果  约210至230/每份",selltime:"08月01日",taketime:"08月02日",limit:"8000",price:"1.99"
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  
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