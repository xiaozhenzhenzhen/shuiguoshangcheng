// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:[],
    list:[],
    search_list:[]
  },
  dim: function (e) {
    var word = e.detail.value;
    console.log(word);
    this.setData({
      val:word
    });
    console.log(this.data)
  },
  
  check:function(){
    const db = wx.cloud.database();
    if(this.data.val!=""){
      db.collection("myproduct").where({
      title: {
        $regex: '.*' + this.data.val,
        $options: 'i'
      }
    }).get({
      success: res => {
        console.log(res.data)
        if (res.data=="") {
          wx.showToast({ title: "没有此商品" })
        }
        this.setData({
          search_list: res.data
        })
      }
    })
    } if(this.data.val==""){
      wx.showToast({ title: "请输入商品名" })
    };
    

    // const db = wx.cloud.database(); //初始化数据库
    // db.collection("myproduct").where({
    //   title: {
    //     $regex: '.*' + this.data.val,
    //     $options: 'i'
    //   }
    // }).get({
    //   success: res => {
    //     console.log(res.data)
    //     this.setData({
    //       search_list: res.data
    //     })
    //   }
    // })
  },
//这个查询就是查询all表中 字段为name中 like你传的值的所有数据
//后面的$options:'1' 代表这个like的条件不区分大小写
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