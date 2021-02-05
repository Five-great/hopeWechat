// components/wxHtml/wxHtml.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: '默认文字',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEditorReady() {
      const that = this
      // console.log(that)
      wx.createSelectorQuery().in(that).select('#editor').context(function (res) {
        that.editorCtx = res.context;
        // console.log(that.editorCtx)
        // wx.showLoading({
        //   title: '加载内容中...',
        // })
        // setTimeout(function () {
          let data = that.data;
        //   wx.hideLoading();
        // data.innerText? data.innerText.replace(getRegExp(),):''
        console.log(that.editorCtx)
          that.editorCtx.setContents({
            html: data.innerText ? data.innerText : '',
            success: (res) => {
              
            },
            fail: (res) => {
              
            }
          })
          that.editorCtx.getContents({
            success: (res1) => {
              console.log(res1)
           
            that.triggerEvent('editorEvent', { editorhtml: res1.delta.ops});
             
            },
            fail: (res) => {
              
            }
          })
        // }, 500)
      }).exec()
    },
    statuschange(e){
        // console.log(e)
    }
  }
})
