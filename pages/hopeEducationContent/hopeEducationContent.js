// pages/hopeEducationContent/hopeEducationContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dzbList: [],
    swiperFlag: true,
    currentIndex: 0,
    showBtn: 0,
    swiperLen: 0,
    timeID: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.Base.getData({flag:'dzb',id: options.idx}).then(res=>{
      console.log(res)
      this.data.swiperLen = res.info.length     
       res.state=="ok"?this.setData({dzbList: res.info}) : ''
    })
  },
  handleChange: function(e) {
    this.setData({currentIndex: e.detail.current})
  },

  toLeft: function (e) {
    if (!this.data.swiperFlag) { // 如果动画还未完成，不执行
      return
    } else {
      // 修改按钮切换不可用状态
       this.data.swiperFlag = false
      var index = this.data.currentIndex
      index = ( index - 1 + this.data.swiperLen ) % this.data.swiperLen 
      this.setData({currentIndex: index })
    }    
  },
  toRight: function (e) {
    if (!this.data.swiperFlag) { // 如果动画还未完成，不执行
      return
    } else {
      // 修改按钮切换不可用状态
      this.data.swiperFlag = false
      var index = this.data.currentIndex
      index = ( index + 1 ) % this.data.swiperLen 
      this.setData({currentIndex: index })
      }
  },
  changeFinish: function(e){
    this.data.swiperFlag = true
  },
  showBtnFun: function(e){
    clearTimeout(this.data.timeID);
    var index = this.data.currentIndex;
    let temShow = 3;
     index == 0? temShow = 2 : ''
     index == this.data.swiperLen-1 ? temShow = 1 : ''
     this.setData({ showBtn: temShow })
    this.data.timeID = setTimeout(()=>{   this.setData({ showBtn: 0 }) },3000)
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