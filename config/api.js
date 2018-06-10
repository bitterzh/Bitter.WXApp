// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9110/';
// 云平台部署时使用
// var WxApiRoot = 'https://www.jiept.net/';



module.exports = {
  getUrl: function (control, action) {
    return WxApiRoot + control + '/' + action
  },
  mvList: WxApiRoot + 'movie/search',  //获得商品列表

  CollectList: WxApiRoot + 'collect/list',  //收藏列表
  CollectAddOrDelete: WxApiRoot + 'collect/addordelete',  //添加或取消收藏

  CommentList: WxApiRoot + 'comment/list',  //评论列表
  CommentCount: WxApiRoot + 'comment/count',  //评论总数
  CommentPost: WxApiRoot + 'comment/post',   //发表评论

  SearchIndex: WxApiRoot + 'search/index',  //搜索关键字
  SearchResult: WxApiRoot + 'search/result',  //搜索结果
  SearchHelper: WxApiRoot + 'search/helper',  //搜索帮助
  SearchClearHistory: WxApiRoot + 'search/clearhistory',  //搜索历史清楚

  CollectIndex: WxApiRoot + 'collect/index',       // 我的收藏
  CollectDelete: WxApiRoot + 'collect/delete',      // 删除我的收藏
  CollectAdd: WxApiRoot + 'collect/add',            // 增加我的收藏

  HistoryIndex: WxApiRoot + 'history/index',
  HistoryDelete: WxApiRoot + 'history/delete',
  HistoryUpsert: WxApiRoot + 'history/upsert',
  HistoryRecord: WxApiRoot + 'history/record',

  UserSendCode: WxApiRoot + 'user/sendCode',
  UserBindMobile: WxApiRoot + 'user/bindMobile'
};