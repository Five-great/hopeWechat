const normalCallout = {
  id: 1,
  latitude:  30.78224,
  longitude: 103.923580,
  iconPath: '../../image/about/markerIcon.png',
  // callout: {
  //   content: '文本内容',
  //   color: '#ff0000',
  //   fontSize: 14,
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   borderColor: '#000000',
  //   bgColor: '#fff',
  //   padding: 5,
  //   display: 'ALWAYS',
  //   textAlign: 'center'
  // },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}
Page({
  data: {
    actionSheetHidden:true,
    actionSheetItems:[
     {bindtap:'Menu1',txt:'菜单1'},
     {bindtap:'Menu2',txt:'菜单2'},
     {bindtap:'Menu3',txt:'菜单3'}
    ],
    menu:'',
    showMenu: '',
    latitude:  30.78224,
    longitude: 103.923580,
    markers: [normalCallout],
  },
  actionSheetTap:function(){
    this.setData({
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
   actionSheetbindchange:function(){
    this.setData({
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
   bindMenu1:function(){
    this.setData({
     menu:1,
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
   bindMenu2:function(){
    this.setData({
     menu:2,
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
   bindMenu3:function(){
    this.setData({
     menu:3,
     actionSheetHidden:!this.data.actionSheetHidden
    })
   },
  onReady: function (e) {
  },
  longpressFun: function(){
    console.log('lonh=gr')
  },
  showBigImg: function(){
    var _this = this;
    var url = 'https://fivecc.cn/medias/logo.png';
    wx.downloadFile({
      url: url,
      success: function (res) {
        var benUrl = res.tempFilePath;
        //图片保存到本地相册
        wx.saveImageToPhotosAlbum({
          filePath: benUrl,
          //授权成功，保存图片
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          //授权失败
          fail: function (err) {
            if (err.errMsg) { //重新授权弹框确认
              wx.showModal({
                title: '提示',
                content: '您好，请先授权再保存此图片。',
                showCancel: false,
                success(res) {
                  if (res.confirm) { //重新授权弹框用户点击了确定
                    wx.openSetting({ //进入小程序授权设置页面
                      success(settingdata) {
                        console.log(settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                          wx.saveImageToPhotosAlbum({
                            filePath: benUrl,
                            success: function (data) {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                          })
                        } else { //用户未打开保存图片到相册的授权开关
                          wx.showModal({
                            title: '温馨提示',
                            content: '授权失败，请稍后重新获取',
                            showCancel: false,
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  toCall:function(){
    wx.makePhoneCall({
      phoneNumber: '02869694278',
      success: function () {
        console.log('成功拨打电话')
      }
    })
  },
  onPageScroll: function(e){
   e.scrollTop>130? this.setData({showMenu:true}):this.setData({showMenu:false})
  },
  menuGoto: function(e){
    e.target.dataset.url?wx.navigateTo({url: '/'+e.target.dataset.url}):''
  }

})
