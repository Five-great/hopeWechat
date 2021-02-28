Page({

  /**
   * 页面的初始数据
   */
  data: {
    shzrList: [], //社会责任
    pageIndex: 1,
    pageSize: 3,
    pageTotal: 0,
    upLoadShow: 1,
    TiemOut: null,
    fv_pageScroll:{
      pageIndex:0,  //当前页面的索引值
      startY: 0,  //开始的位置x
      endTime: 0,  //开始的位置x
      difference: 0,  //滑动下拉距离
      critical: 300,
      animation: '',
      windowHeight:'',// 屏幕高度
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({success: res=> { this.data.fv_pageScroll.windowHeight=res.screenHeight} })
    wx.Base.getData({flag:'shzr',id: 0,pageindex: this.data.pageIndex,pagesize: this.data.pageSize}).then(res=>{
       this.data.pageTotal = res.total;
       this.data.pageIndex++;
       res.state=="ok"?this.setData({shzrList: res.info}) : ''
    })
  },
  getShzrData(){
   let that = this;
   if( (that.data.pageIndex-1)*that.data.pageSize<=that.data.pageTotal){
        wx.Base.getData({flag:'shzr',id: 0,pageindex: that.data.pageIndex,pagesize: that.data.pageSize}).then(res=>{
          that.data.pageIndex++;
          that.data.shzrList.push(...res.info)
          res.state=="ok"?that.setData({shzrList: that.data.shzrList,upLoadShow: 1}) : ''
        })
        
   }else{
    that.setData({upLoadShow: -1})
   }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
   wxWOWTap: function(e){
    //  console.log(e)
     setTimeout(()=>{
      e.target.dataset.idx?wx.navigateTo({url: '/pages/responsiblityDetails/responsiblityDetails?idx='+e.target.dataset.idx}):''
     },600)
   
   },
   changeUpLoat(){
    let that = this;
      wx.createSelectorQuery().select('#upLoadID').boundingClientRect(res =>{ 
        res.bottom>100?that.setData({upLoadShow: 0 }) : that.setData({upLoadShow: 1});
      }).exec();
   },
  touchStart(e){
    let that = this;
    ((e.timeStamp -  that.data.fv_pageScroll.endTime)>500)?that.data.fv_pageScroll.startY = e.touches[0].pageY: '';  
  },

  touchMove(e){
  let that = this;
   let difference = e.touches[0].pageY - that.data.fv_pageScroll.startY; // 移动后和起始值的差值
   if(difference<-that.data.fv_pageScroll.windowHeight/8 && that.data.upLoadShow!=-1){
    let animation = wx.createAnimation({    // 移动动效
      duration: 0,
    });
    ((that.data.fv_pageScroll.windowHeight/7)-difference>0 && that.data.upLoadShow!=0)? that.changeUpLoat():'';
      difference = Math.sqrt(Math.abs(parseInt(difference)));
      // console.log(difference)
    animation.translateY(-(difference+difference)).step()
    that.setData({
     ['fv_pageScroll.animation']: animation.export(),     // 动画
    })
   }
  },

  touchEnd(e){
    let that = this ;
    that.data.fv_pageScroll.endTime = e.timeStamp;
    that.touchcheck()
    that.data.TiemOut? clearTimeout(that.data.TiemOut):'';
    that.data.TiemOut = setTimeout(()=>{that.touchcheck() },500);
    // console.log("asdasdend")
   },

   touchcheck(){
     let that = this;
    let animation = wx.createAnimation({    // 移动动效
      duration: 200,
    });
    animation.translateY(0).step()
    that.setData({['fv_pageScroll.animation']: animation.export()}) ;    // 动画
    that.data.upLoadShow == 0? that.getShzrData() : that.data.upLoadShow !=-1 ? that.setData({upLoadShow: 1}) : '';
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