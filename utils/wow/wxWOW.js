
function setWatcher(page) {
  let data = page.data;
  // data.$fv_wxWoWDataObserve=Object.keys(data)
  // console.log(data.$fv_wxWoWDataObserve)
  // console.log(data)
  let watchFun = function(fullName,value, oldValue){
    if(fullName == 'data.wxwow'){
      // console.log(value)
       return 0;
      // console.log(oldValue)
      // console.log(this.data)
    }
    // if()
    // console.log(this.data)
    // console.log(this.data.$fv_wxWoWDataObserved)

    setTimeout(()=>{ScrollFunc(this)},200);
      // console.log(fullName+'-----')
      // console.log('---++--')
    // }
    
  }
  let deep = true; // 若未设置deep,则为undefine
 observe(page, 'data', watchFun, deep, page,'data');
  // console.log("---end--")
  
  // Object.keys(data).forEach(v => {
  //   if(v == '__webviewId__'|| v == 'Object') return;
  //   // console.log(v)
  //   // console.log(data[v])
  //   // let key = v.split('.'); // 将watch中的属性以'.'切分成数组
  //     // for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
  //     //   nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
  //     // }
  //   // let lastKey = key[key.length - 1];
  //   // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
 
  //   observe(nowData, v, watchFun, deep, page,v); // 监听nowData对象的lastKey
  // })
}
/**
 * 监听属性 并执行监听函数
 */
function observe(obj, key, watchFun, deep, page,fullName) {
  var val = obj[key];
  if (deep && val != null && typeof val === 'object') {
    Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
      // console.log(fullName+'.'+childKey)
      if(childKey == '__webviewId__' || childKey == 'Object'|| childKey == '$fv_wxWoWDataObserve' || childKey == '$fv_wxWoW') return;
      observe(val, childKey, watchFun, deep, page,fullName+'.'+childKey); // 递归调用监听函数
    })
  }
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      watchFun.call(page,fullName,value,val); // fullName 是绑定对象属性全称，value是新值，val是旧值
      val = value;
      if (deep && val != null && typeof val === 'object') { // 若是深度监听,重新监听该对象，以便监听其属性或新增属性。
        observe(obj, key, watchFun, deep, page,fullName);
      }
    },
    get: function () {
      return val;
    }
  })
}
var ResetFunc = function(_this,_state){
  let $fv_that = _this;
  // console.log( $fv_that.data.$fv_wxWoW.oldlist)
  $fv_that.data.$fv_wxWoW.oldlist = [];
  $fv_that.setData({wxwow: { state: _state ,prefix: $fv_that.data.wxwow.prefix} });


 
}
var ScrollFunc = function(_this){
  let $fv_that = _this;
  let query = wx.createSelectorQuery();
  query.selectAll('.wx-wow').boundingClientRect('.wx-wow').exec(function(res){
      // console.log(fv_that.data.wxWoWList)
      // console.log(res[0].length)
      typeof res[0] == 'object' && res[0].forEach((ele) =>{
        // console.log(fv_that.data.wxWoW.edlist)
        let idx = ele.dataset.wxWowId;
        let offset = ele.dataset.wxWowOffset ?parseInt(ele.dataset.wxWowOffset): 0;
        if($fv_that.data.$fv_wxwowHeight-offset > ele.top && !($fv_that.data.$fv_wxWoW.oldlist.indexOf(idx)!=-1)){ 
         $fv_that.data.$fv_wxWoW.oldlist.push(idx);
         $fv_that.data.$fv_wxWoW.maxIndex<idx?$fv_that.data.$fv_wxWoW.maxIndex=idx :'';
        //  !$fv_that.data.$fv_wxWoWDataObserved?$fv_that.setData({$fv_wxWoWDataObserved: true}):'';//监听完毕
         let name =  ele.dataset.wxWowName? ele.dataset.wxWowName : '';
         let delayTime =  ele.dataset.wxWowDelay? ele.dataset.wxWowDelay : '';
         let durationTime = ele.dataset.wxWowDuration ? ele.dataset.wxWowDuration : '' ; 
         let  iteration = ele.dataset.wxWowIteration ? ele.dataset.wxWowIteration : '' ;
          $fv_that.data.wxwow = { idx: '.wowId-'+idx,name: name,prefix: 'animated',delayTime,durationTime, iteration,maxidx: $fv_that.data.$fv_wxWoW.maxIndex};
          $fv_that.setData({wxwow: $fv_that.data.wxwow });
        }
      })
  })
}
const $FV_WXWOW ={
  OnLoadFunc: function(e){
    let $fv_that = this;
    // 获取系统信息
      wx.getSystemInfo({
         success: function (res) {
        $fv_that.setData({
          $fv_wxwowHeight: res.screenHeight,
          $fv_wxwowWidth: res.screenWidth,
          $fv_wxWoWDataObserve: null,
          $fv_wxWoWDataObserved: false,
          $fv_wxWoW: {oldlist:[],maxIndex:0},
          wxwow: {},
        });
       setWatcher($fv_that);
      }
    });
   
  },
  OnHideFunc: function(e){
    let $fv_that = this;
    // console.log( $fv_that.data.$fv_wxWoW.oldlist)
    $fv_that.data.wxwowConfig && !$fv_that.data.wxwowConfig.repeat? ResetFunc($fv_that,'RESET-REPEAT') : ResetFunc($fv_that,'RESET');
  
  },
  OnShowFunc: function(e){
    let $fv_that = this;
    $fv_that.data.wxwowConfig && !$fv_that.data.wxwowConfig.repeat ? '': setTimeout(()=>{ScrollFunc($fv_that)},200);
  },
  OnPageScrollFunc: function(e){
    let $fv_that = this;
    ScrollFunc($fv_that);
  }
}
const $fv_wowPage = Page;
module.exports = function(e) {
  let {
    onPageScroll,
    onLoad,
    onShow,
    onHide
  } = e;
  
 
 e.onLoad =(onLoad => {
   return function (_e) {
    typeof $FV_WXWOW.OnLoadFunc == 'function' && $FV_WXWOW.OnLoadFunc.call(this,_e);
    onLoad && onLoad.call(this, _e);
   }
 })(onLoad);
 e.onShow =(onShow => {
  return function (_e) {
         // console.log('22')
   typeof $FV_WXWOW.OnShowFunc == 'function' && $FV_WXWOW.OnShowFunc.call(this,_e);
   onShow && onShow.call(this, _e);
  }
})(onShow);
e.onHide =(onHide => {
  return function (_e) {
   typeof $FV_WXWOW.OnHideFunc == 'function' && $FV_WXWOW.OnHideFunc.call(this,_e);
   onHide && onHide.call(this, _e);
  }
})(onHide);
  e.onPageScroll = (onPageScroll => {
    return function (_e) {
      typeof $FV_WXWOW.OnPageScrollFunc == 'function' && $FV_WXWOW.OnPageScrollFunc.call(this,_e.scrollTop);
      onPageScroll && onPageScroll.call(this, _e);
    }
  })(onPageScroll);
  return $fv_wowPage.call(this, e)
}