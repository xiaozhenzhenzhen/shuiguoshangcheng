const sc = wx.cloud.database();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    mycar:[],
    total:"",
    //select:true
  },
  //点击选中状态
  selectlist(e){
    var index = e.currentTarget.dataset.index;
    let selected=this.data.mycar[index].selected;
    if(selected){
      selected=false;
      sc.collection('mycar').doc(this.data.mycar[index]._id).update({
        data: {
          selected:false
        }

      })
      this.onShow();
    } 
  },
  //点击未选中状态
  unselectlist(e){
    var index = e.currentTarget.dataset.index;
    let selected = this.data.mycar[index].selected;
    if (selected==false) {
      selected = true;
      sc.collection('mycar').doc(this.data.mycar[index]._id).update({
        data: {
          selected: true
        }

      })
      this.onShow();
    } 
  },


  // 增加数量
  addCount(e) {

    var index = e.currentTarget.dataset.index;
    let num = this.data.mycar[index].num;
   let nb= num + 1;
   
    sc.collection('mycar').doc(this.data.mycar[index]._id).update({
      data: {
        num: nb,
      }
      
    })

    this.onShow();
  },
  // 减少数量
  minusCount(e) {
    var index = e.currentTarget.dataset.index;
    let num = this.data.mycar[index].num; console.log(num)
    if(num>1){
      let nb = num - 1;
      sc.collection('mycar').doc(this.data.mycar[index]._id).update({
        data: {
          num: nb,
        }

      })
      this.onShow();
    }  
  },
  //删除购物车
   deleted(e){
     //var index = e.currentTarget.dataset.index;
     var id = e.target.dataset.id;
      sc.collection('mycar').doc(id).remove().then(res => { 
      }).catch(err => {//删除失败
          console.log(err);
        })
        this.onShow();
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let carts=this.data.mycar;
     


    
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
      key: 'openid',
      success: (res) => {
        console.log(res.data);
        //获取购物车数据
        sc.collection("mycar").where({ useropenid: res.data}).get().then(res => {
          // console.log(res.data); 
          // //遍历购物车商品价格
          // var sum = 0;
          // for(var item of res.data){
          //   sum+=item.cc*item.num;  
          // }
          //sum*=100;
          // this.setData({ total: sum })
          this.setData({
            mycar: res.data
          })
        }).catch(err => {
        })
        sc.collection("mycar").where({useropenid:res.data,selected:true}).get().then(res=>{
          console.log(res.data);
          //遍历购物车商品价格
          var sum = 0;
          for (var item of res.data) {
            sum += item.cc * item.num;
          }
          sum *= 100;
          this.setData({ total: sum })
          // this.setData({
          //   mycar: res.data
         // })
        })
      }
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