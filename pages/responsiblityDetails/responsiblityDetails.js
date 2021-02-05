// pages/responsiblityDeiler/responsiblityDeiler.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shzrList: [],
    Detail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
         console.log(options)

         wx.Base.getData({flag:'shzr',id: options.idx}).then(res=>{
          // console.log()

          res.info.Content= JSON.parse(`{\"Title\":\"鹤壁汽车工程职业学院2020—2021学年第一学期期末教职工培训的专题培训\",\"Url\":null,\"Fid\":1451,\"Author\":null,\"Source\":null,\"ShowTime\":\"2021-01-08T00:00:00\",\"Press\":42,\"Cover\":\"http://base.hope55.com/UploadFile/2021/1/11/a99a7905-b7ae-4dd9-a6ef-f8d9c3e6e4f8.jpg\",\"Details\":\"<div id=\\\"fvContentID\\\"><p style=\\\"line-height: 2; text-indent: 1em;\\\">1月8日，鹤壁汽车工程职业学院副院长熊左桥以《高校教师规范》为题，为全体教职工带来了2020&mdash;2021学年第一学期期末教职工培训的专题培训。此次培训由副院长张华主持，全体教职工参加了此次培训。</p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><span style=\\\"font-family: 'Microsoft YaHei', 'Helvetica Neue', 'PingFang SC', sans-serif;\\\">熊左桥从高校教师职业道德规范、高校教师素质及行为规范和高校教师教学工作规范三个方面展开交流。他以“高等学校教师职业道德规范”文件的背景和意义入手，带领全体教师共同学习并贯彻《高等学校教师职业道德规范》的基本内容。</span></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"http://base.hope55.com/UploadFile/2021/1/11/cc4edab0-6b00-41f3-9a8d-6f8c49c8f140.jpg\\\" /></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><span style=\\\"font-family: 'Microsoft YaHei', 'Helvetica Neue', 'PingFang SC', sans-serif;\\\">随后，他谈了“高校教师素质及行为规范”中教师职业素质构成的八个因素，以及如何构成一个严谨的教师职业素质结构模式，对全体教师提出三个方面的要求：一是对新时代高校教师基本素质要求；二是对新时代高校教师应具备的素质要求；三是对新时代高校教师行为规范要求。</span></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"http://base.hope55.com/UploadFile/2021/1/11/b0706142-2284-48c8-a808-d28d012d93c5.jpg\\\" /></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><span style=\\\"font-family: 'Microsoft YaHei', 'Helvetica Neue', 'PingFang SC', sans-serif;\\\">最后，熊左桥就“高校教师教学工作规范”同全体教师展开深刻探讨，并对教学工作中遇到的实际问题与个别教师进行交流，教师积极参与其中，受益颇多。</span></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"http://base.hope55.com/UploadFile/2021/1/11/aa916775-cebf-4a39-a623-d8e792797684.jpg\\\" /></p>\\r\\n<p style=\\\"line-height: 2; text-indent: 1em;\\\"><span style=\\\"font-family: 'Microsoft YaHei', 'Helvetica Neue', 'PingFang SC', sans-serif;\\\">此次专题讲座旨在培育做好业务素质精、科研能力强、能适应新时期职业教育改革发展需要的教师队伍，让全体教师对教学工作规范有了更深刻的感悟。</span></p></div>\"}`).Details
           res.state=="ok"?this.setData({Detail: res.info}) : ''
        })
        wx.Base.getData({flag:'shzr',id: 0,pageindex:1,pagesize:3}).then(res=>{
          console.log(res)
           res.state=="ok"?this.setData({shzrList: res.info}) : ''
        })
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