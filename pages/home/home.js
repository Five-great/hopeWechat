// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      BannerList: [],//banner
      shzrList: [], //社会责任
      menuList: [
        { url: '/pages/about/about', name: '关于我们', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/4e2078a0-908f-4706-ae6e-5181698fcd29.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/b28f50b1-ecab-4927-9ca8-0ca3fdf3f53c.png' },
        { url: '/pages/culture/culture', name: '企业文化', type: "navigate", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/99aba6cd-0609-45ff-afb8-09116ae07c74.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/92a43dc0-4a88-4e37-aad8-e2a441ce1b6a.png' },
        { url: '/pages/responsibility/responsibility', name: '社会责任', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/ac498f89-1b0e-46b7-b52f-782ef8cbe479.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/bf559760-5900-49ce-a6e7-48bdb1864583.png' },
        { url: '/pages/description/description', name: '图说院校', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/9f9f92bd-493c-4522-87b2-81a9c469222a.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/35d51bba-6fec-40a7-bcea-6f4d80f4e1d4.png' },
        { url: '/pages/videoXW/videoXW', name: '视频希望', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/d37855be-11ea-4dad-a9e4-bee7a4a28fab.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/febac12a-c7a5-4e2d-a90d-3220ab90f5e1.png' },
        { url: '/pages/hopeEducation/hopeEducation', name: '希望教育报', type: "navigate", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/2ece12a8-e39a-4797-a4ce-2a05f4b8d42f.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/385c4195-4c58-4dcf-8955-1b8ba0e7056b.png' },
      ],
      bottomList: [
        { url: '/pages/description/description', name: '图说院校', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/a7412301-c2ed-417a-ab09-5491f4d9fe32.png', iconImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/4287a776-6827-401c-b49f-73835057e809.pn' },
        { url: '/pages/videoXW/videoXW', name: '视频希望', type: "switchTab", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/8201f6b8-60bf-4c7e-be48-f65e93b82e0e.png', iconImg: '../../image/index/videoXWIcon.png' },
        { url: '/pages/hopeEducation/hopeEducation', name: '希望教育报', type: "navigate", bgImg: 'https://xcx.hope55.com/UploadFile/2021/1/26/71abb479-d278-4f43-b0c1-4431987dedca.png', iconImg: '../../image/index/hopeEducationIcon.png' }
      ],
      showFloor: false,
      showTab: false, //显示底部导航
      showWelcome: '',
      showPage: true,
      currentIndex: 0,
      fv_pageScroll:{
        pageIndex:0,  //当前页面的索引值
        startY: 0,  //开始的位置x
        startY2: 0,  //开始的位置x
        endTime: 0,  //开始的位置x
        endTime2: 0,  //开始的位置x
        difference: 0,  //滑动下拉距离
        critical: 180,
        windowHeight:'',// 屏幕高度
      },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({success: res=> { this.setData({ ['fv_pageScroll.windowHeight']: res.screenHeight})} })

    wx.Base.getBanner().then(res=>{
       res.state=='ok'?this.setData({BannerList: res.info }): ''
    });
    wx.Base.getData({flag:'shzr',id: 0,pageindex:1,pagesize:3}).then(res=>{
      console.log(res)
       res.state=="ok"?this.setData({shzrList: res.info}) : ''
    })
  },
  // 划动起始坐标方法
  touchStart(e){
    ((e.timeStamp-  this.data.fv_pageScroll.endTime)>500)?this.data.fv_pageScroll.startY = e.touches[0].pageY: '';  
  },
  touchStart2(e){
    ((e.timeStamp-  this.data.fv_pageScroll.endTime2)>500)?this.data.fv_pageScroll.startY2 = e.touches[0].pageY: '';  
  },
  touchMove(e){
   
    // let difference = e.touches[0].pageY -this.data.fv_pageScroll.startY
    //  this.setData({ ['fv_pageScroll.difference']: difference ,})
    //  console.log(difference)
  },
  // 划动结束坐标方法
 touchEnd(e){
   this.data.fv_pageScroll.endTime = e.timeStamp;
   let difference = e.changedTouches[0].pageY - this.data.fv_pageScroll.startY
  //  console.log('---start---'+this.data.fv_pageScroll.startY)
  //  console.log('difference='+difference)
  //  console.log('---end---'+e.changedTouches[0].pageY)
  // let difference = this.data.fv_pageScroll.difference; 
  let critical = this.data.fv_pageScroll.critical; // 拖动的距离
  let pageIndex = this.data.fv_pageScroll.pageIndex; //索引
  let that = this;
        // if((difference>= -critical && difference<0 && pageIndex==0)){ //当前欢迎页面 + （下滑 或 上拉小于临界值） ||
   
        // }else 
        if(difference >= critical && pageIndex==1){// 当前主页+ 下滑大于临界值
          wx.createSelectorQuery().select('#homePageID').boundingClientRect(res =>{ //判断欢迎页面位置
            res.top>-5?that.gotoWelcomePage():''
         }).exec();
        }else if( difference <-critical && pageIndex==0){ // 当前欢迎页面 + 上拉值大于临界值
           that.gotoHomePage(390)
        }
  },
  touchEnd2(e){
    this.data.fv_pageScroll.endTime2 = e.timeStamp;
    let difference = e.changedTouches[0].pageY - this.data.fv_pageScroll.startY2
   let critical = this.data.fv_pageScroll.critical; // 拖动的距离
   console.log(difference)
   let that = this;
        if( difference <= -critical){ 
          that.setData({showFloor: true});
          wx.pageScrollTo({
                selector: "#bottomID",
                duration: 500,
                success: r=>{
                }
              })
        }
         
   },
  gotoWelcomePage: function(_duration){
    this.data.fv_pageScroll.pageIndex = 0;
    this.setData({showTab: false,showPage: true,showWelcome: 'showWelcomePage'})
    // setTimeout(()=>{
    //   wx.pageScrollTo({
    //     selector: "#welcomePageID",
    //     duration: 500,
    //     success: r=>{
    //     }
    //   })
    // },5000)
   
  },
  gotoHomePage: function(_duration){
    let that = this;
    let  windowHeight = that.data.fv_pageScroll.windowHeight
    that.setData({showPage: false})
    // wx.pageScrollTo({
    //   selector: "#homePageID",
      _duration = typeof _duration === 'number' ?_duration : 400;
    //   success: r => {

      // var animation = wx.createAnimation({ // 移动动效
      //   duration: 300,
      //  });
      
      //  animation.translateY(-windowHeight).step()
      //  animation.translateY(0).step({ duration:0});
      //  that.setData({
      //    ['fv_pageScroll.animation']: animation.export(),
      // })
   
     
              
      // that.setData({ showTab: true,showWelcome: 'hideWelcomePage'})
      setTimeout(()=>{
       that.setData({ showTab: true, showWelcome: 'hideWelcomePage'});
        that.data.fv_pageScroll.pageIndex = 1;
      },_duration)
          
    //   },
    //   fail: err =>{
    //     console.log(err)
    //   }
    // })
    // setTimeout
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
    console.log("sdsd")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('wewe222')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('wewe332')
  },
  onPageScroll: function(){
    // this.setData({showTab: true});
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      
  },
  handleChange: function(e) {
    this.setData({currentIndex: e.detail.current})
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