Template.shopHome.onRendered(function(){
  var shopId = Router.current().params._id;
  Meteor.subscribe('shop_products',shopId,'all');
  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplay : 5000,
      loop: true
  });

  console.log(this.data)
    
  localStorage.setItem('shopName',this.data.name + '店');
  localStorage.setItem('shopIcon',this.data.icon);
  Session.set('documentTitle',this.data.name + '店');

  var shareUrl = 'http://market.raidcdn.cn/shop/';
  shareUrl += shopId;
  console.log(shareUrl);
  calcWeChatSignature(shareUrl);
});

Template.shopHome.helpers({
  products: function(){
    var categories = this.categories || [];
    return Products.find({category_id:{$in:categories}},{sort:{createdAt:-1}}).fetch();
  },
  shopName: function(){
    var user = Meteor.user();
    if(user){
      userName = user.profile.nickname || user.username;
      shopName = this.name || user.profile.shopName || userName + '的店铺';
      return shopName;
    }
    return '';
  }
});

Template.shopHome.events({
  // 分享店铺提示
  'click #share': function(e){
    $("#shopShareTip").popup();
  }
})