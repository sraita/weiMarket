Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId() && Session.equals('pageNeedLogin',true)) {
    Router.go('login');
  }
  this.next();
},{except:['register','forgotpass']});


Router.route('/',{
  name: 'home',
  layoutTemplate: 'headSearchLayout'
});

// 分类
Router.route('/categories/:_id',{
  name: 'categories',
  layoutTemplate: 'headSearchLayout',
  waitOn: function(){
    var limit = this.params.query.limit || 10;
    limit = Number('limit');
    var category_id = this.params._id || 'all';
    Meteor.subscribe('categories_by_seller',Meteor.userId());
    return Meteor.subscribe('products_by_category',Meteor.userId(),category_id, limit);
  }
});

// 购物车
Router.route('/shopping',{
  name: 'shopping',
  layoutTemplate: 'headFootLayout',
  yieldRegions: {
    'shoppingHeader': {to: 'header'}
  },
  waitOn: function(){
    var limit = this.params.query.limit || 10;
    console.log(limit)
    Meteor.subscribe('user_shopping',Number(limit));
  }
});

// 我
Router.route('/me',{
  name: 'me',
  layoutTemplate: 'footLayout'
});

// 商品详情页
Router.route('/product/:_id',{
  name: 'product',
  layoutTemplate: 'headLayout',
  yieldRegions: {
    'productHeader': {to: 'header'}
  },
  waitOn: function(){
    return Meteor.subscribe('product-by-id', this.params._id);
  },
  data: function(){
    return Products.findOne({_id: this.params._id});
  }
});

// 搜索页
Router.route('/search',{
  name: 'search',
  layoutTemplate: 'headLayout',
  yieldRegions: {
    'searchHeader': {to: 'header'}
  },

});

// 搜索结果页
Router.route('/searchReault',{
  name: 'searchReault',
  layoutTemplate: 'headLayout'
});