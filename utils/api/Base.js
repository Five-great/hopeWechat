const api = 'https://xcx.hope55.com/API/WebAPI';
var Base = {
    request:function(opt) {
      // set token
     return new Promise((resolve, reject,next) => {
      typeof reject == "function"? '' : reject=(err)=>{ console.error(err); wx.showToast({ title: err.data.message,})}
      wx.request({ 
          url: api + opt.url,
          method: opt.method || 'GET',
          data: opt.data, // 参数
          success: (result) => {
            if (result.statusCode == 200) {
              typeof resolve == "function" ? resolve(JSON.parse(result.data)) : ''
            } else {
                console.error(result);
                wx.showToast({
                  title: result.data.message,
                })
            }
         },  
          headers: {
            'Content-Type': 'application/json'
          }, 
          fail: reject, // 失败结果
          complete: next // 成功或者失败都会调用的结果
        })
      })
  },
  getBanner: function(){
    return this.request({
      method: 'GET',
      url: '/GetDate',
      data: { flag: 'banner', pagesize: 20 }
    })
  },
  getData: function (data) {
   return this.request({
      method: 'GET',
      url: '/GetDate',
      data: data
    })
  }

}

module.exports.Base = Base