// pages/home/home.js
const sc = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//首页商品
    mycar:{},
    openid:"",
    selectcar:[],//购物车商品
    sum:[],
    cars:[],//购物车商品
    no:{}
  },
  
  // 增加数量
  addCount(e) {
    sc.collection('mycar').get().then(res => {
      this.setData({
        selectcar: res.data
      })
      //console.log(this.data.selectcar) //购物车列表
      var index = e.currentTarget.dataset.index;
      var pic = this.data.list[index]._id;
      sc.collection('mycar').where({productid:pic}).get().then(res=>{
        this.setData({
          no:res.data
        })
      }).catch(err=>{
      })
     var ss=this.data.no[0].num;
      console.log(index);
      //let num = this.data.selectcar[index].num;
     //console.log(num);
      let nb = ss + 1;
      //this.setData({nb:nb})
     // console.log(this.data.selectcar[index]._id);
     //this.data.no[0]._id
      sc.collection('mycar').doc(this.data.no[0]._id).update({
        data: {
          num: nb,
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
    
    this.onShow();
  },
  // 减少数量
  minusCount(e) {
    sc.collection('mycar').get().then(res => {
      this.setData({
        selectcar: res.data
      })
      // console.log(this.data.selectcar) //购物车列表
      var index = e.currentTarget.dataset.index;
      let num = this.data.selectcar[index].num;
      let nb = num-1;
      this.setData({ nb: nb })
      sc.collection('mycar').doc(this.data.selectcar[index]._id).update({
        data: {
          num: nb,
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })

    this.onShow();
  },
  //首页购物车数量
  count:function(e){
    sc.collection('mycar').get().then(res=>{
      this.setData({
       selectcar:res.data 
      })
      console.log(this.data.selectcar) //购物车列表
    }).catch(err=>{
      console.log(err)
    })
    

    // var index = e.currentTarget.dataset.index;
    // let num = this.data.mycar[index].num;
    // let nb = num + 1;
    // sc.collection('mycar').doc(this.data.mycar[index]._id).update({
    //   data: {
    //     num: nb,
    //   }
    // })

    this.onShow();
  },
  jumsearch:function(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/search/search?id=' + id,
    });
  },
  jumpComment: function (e) {
    //功能：用户点击详情按钮后跳转详情组件comment
    //wx.redirectTo({
    //url: '/pages/comment/comment',
    //});
    //保留并且跳转,特点允许回退
    //获取自定义属性
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    });
    //
  },
  //加入购物车
  pulsh: function(e){
    const sc = wx.cloud.database();
     //点击获取当前商品id
     var id=e.target.dataset.id;
     console.log(id);
    //点击获取用户信息
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        console.log(res.data);
        this.setData({openid:res.data})
      }
    })
    //查询获取到的id的信息
    sc.collection("myproduct").where({_id:id}).get().then(res => {
      console.log(res.data);
      this.setData({
        mycar: res.data
      })
      //将当前信息插入购物车数据库
      sc.collection("mycar").add({data:{
        useropenid:this.data.openid,
        productid:this.data.mycar[0]._id,
        pic:this.data.mycar[0].pic,
        title:this.data.mycar[0].title,
        cc:this.data.mycar[0].cc,
        num:1,
        selected:true
      }}).then(res => {
        //当前商品id
        //console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }).catch(err=>{
      
    })
    
    this.onShow();
  },
  asd() {
    var list = this.data.list;
    var cars = this.data.cars;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < cars.length; j++) {
        if (list[i].pic == cars[j].pic) {
          list[i].isCar = true;
          list[i].num = cars[j].num
        }
      }
    }
    this.setData({list})
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
    var that = this;
    const sc = wx.cloud.database();
    //查询myproduct集合中所有数据
    sc.collection("myproduct").get().then(res => {
      sc.collection("mycar").get().then(res => {
        console.log(res.data);
        this.setData({ cars: res.data })
        this.asd();
      })
      console.log(res.data);
      var sum = [];
      for (var i = 0; i < res.data.length; i++) {
        sum += res.data[i].num;
      }
      this.setData({
        list: res.data,
        sum: sum
      })

    }).catch(err => {
      console.log(err);
    })

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