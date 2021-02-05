// pages/hope/hope.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Desc: '' ,
      DescList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.Base.getData({flag:'gywm',id: 0,pageindex: 1 ,pagesize: 100}).then(res=>{
      console.log(res)
       res.state=="ok"?this.setData({Desc: res.info.info}) : ''
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getEditorHtml: function(e){
     
     this.setData({DescList: e.detail.editorhtml})
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