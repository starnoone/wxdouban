//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //电影列表
    movie:{},
    //加载的起始位置
    start:0,
    //每次加载的条数
    count:21,
    //页码
    pageIndex:1,
    //总条数
    total:0,
    //加载中状态
    hiddenState:true,
    //提示文字
    promptText:'加载中...'
  },
  onLoad: function () {
    var _self = this;
    wx.request({
      url:'http://localhost/api/douban/movie.php',
      data: {
        act: 'in_theaters'
      },
      success:function(res){
        console.log(res);
        _self.setData({ movie: res.data.subjects });
        _self.setData({ total: res.data.total })
      }
    });
  },
  onReady:function(){
    //获取组件实例
    this.$searchCom = this.selectComponent('#searchCom');
  },
  getMore: function () {//下拉加载更多
    var _self = this;
    var offset = this.data.pageIndex * this.data.count;
    let len = _self.data.movie.length;
    //将加载中 状态显示
    _self.setData({hiddenState:false});
    if(len>=_self.data.total){
      _self.setData({ promptText: '已无更多' });
      let timmer = setTimeout(function(){
        _self.setData({ hiddenState: true });
        clearTimeout(timmer);
      },1000)
    }else{
      wx.request({
        url: 'http://localhost/api/douban/movie.php',
        data: {
          act: 'in_theaters',
          count: _self.data.count,
          start:offset
        },
        success: function (res) {
          console.log(res);
          let temp = _self.data.movie.concat(res.data.subjects)
          _self.setData({ pageIndex: (_self.data.pageIndex + 1) });
          _self.setData({ movie: temp });
          //隐藏loading
          _self.setData({ hiddenState: true });
        }
      });
    }  
  },

  //获取焦点显示search页面
  search:function(){
    this.$searchCom.show();
  }
})
