//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movie:{},
    start:0,
    count:21,
    pageIndex:1
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
        _self.setData({ movie: res.data.subjects })
      }
    });
  },
  getMore: function () {
   
    var _self = this;
    console.log(_self.data.count);
    console.log(_self.data.pageIndex);
    var offset = this.data.pageIndex * this.data.count;
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
        _self.setData({ movie: temp },{pageIndex:_self.data.pageIndex+1})
      }
    });
  }
})
