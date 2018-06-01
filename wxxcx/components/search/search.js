// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchState:true,
    searchList:[],
    index:0,
    count:0,
    tag:'',
    total:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show:function(){
      this.setData({searchState:false})
    },
    hide:function(){
      this.setData({ searchState: true })
    },
    search:function(evt){
      this.setData({ tag: evt.detail.value})
      var _self = this;
      wx.request({
        url: 'http://localhost/api/douban/search.php',
        data: {
          tag: _self.data.tag
        },
        success: function (data) {
          _self.setData({ searchList: data.data.subjects});
          _self.setData({ count: data.data.count });
          _self.setData({ index: _self.data.index+1 });
          _self.setData({ total: data.data.total });
        }
      });
    },
    searchMore:function(){
      var _self = this;
      let offset = this.data.count * _self.data.index;
      if(_self.data.searchList.length>=_self.data.total){

      }else{
        wx.request({
          url: 'http://localhost/api/douban/search.php',
          data: {
            tag: _self.data.tag,
            start: offset,
            count: _self.data.count
          },
          success: function (data) {
            let temp = _self.data.searchList.concat(data.data.subjects);
            _self.setData({ index: _self.data.index + 1 });
            _self.setData({ searchList: temp });
          }
        });
      }
    },
    clearKey:function(){
      
    }
  }
})
