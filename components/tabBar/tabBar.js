// components/tabBar/tabBar.js
Component({
    /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0
    },
    auth: {
      type: Number,
      value: 0,
      observer: 'onAuthChanged'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: [{
      "pagePath": "pages/home/home",
      "text": "首页",
      "iconPath": "../../image/tabBar/homeIcon.png",
      "selectedIconPath": "../../image/tabBar/homeIcon.png",
      "idx": 1
      },
      {
        "pagePath": "pages/responsibility/responsibility",
        "text": "社会责任",
        "iconPath": "../../image/tabBar/responsibilityIcon.png",
        "selectedIconPath": "../../image/tabBar/responsibilityIcon.png",
        "idx": 2
      },
      {
        "pagePath": "pages/description/description",
        "text": "图说院校",
        "iconPath": "../../image/tabBar/descriptionIcon.png",
        "selectedIconPath": "../../image/tabBar/descriptionIcon.png",
        "idx": 3
      },
      {
        "pagePath": "pages/videoXW/videoXW",
        "text": "视频希望",
        "iconPath": "../../image/tabBar/videoXWIcon.png",
        "selectedIconPath": "../../image/tabBar/videoXWIcon.png",
        "idx": 4
      },
      {
        "pagePath": "pages/about/about",
        "text": "关于我们",
        "iconPath": "../../image/tabBar/aboutIcon.png",
        "selectedIconPath": "../../image/tabBar/aboutIcon.png",
        "idx": 5
      }],
    _auth: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      const {
        idx,
        path
      } = e.currentTarget.dataset

      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }

      wx.switchTab({
        url: `/${path}`,
      })
    },
    onAuthChanged(newVal) {
      wx.setStorageSync('__com-tabbar-auth', newVal)
      this.setData({
        _auth: newVal
      })
    },
    trigger(eventName, value = {}, info) {
      if (!eventName) {
        throw new TypeError('没有自定义事件名')
      }
      this.triggerEvent(eventName, value)
      console.log(`发送 ${eventName} 事件,携带的值为 ${typeof value === 'object' ? JSON.stringify(value) : value} ${info ? '   ---   ' + info : ''}`)
    }
  },
  ready() {},
  pageLifetimes: {
    show: function() {
      console.log('show')
      this.setData({
        _auth: wx.getStorageSync('__com-tabbar-auth')
      })
    }
  }
})
