Template.home.onRendered(function(){
  var seller_id = Router.current().params.query.s || 'RTsZ64Cc8iyoc4BmW';
  Meteor.subscribe('products_by_distributor',Meteor.userId(), 100);
  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplay : 5000,
      loop: true
  });

  if(Meteor.userId()){
    // 成功登录主页后自动成为分销商
    Meteor.setTimeout(function(){
      var user = Meteor.user();
      var role = user.profile.role || [];
      if(role.indexOf('distributor') < 0){
        role.push('distributor');
        Meteor.call('updateUserRole',user._id, role);
      }
    },2000);
  }
});

Template.home.helpers({
  products: function(){
    return DistributorProducts.find({distributor_id: Meteor.userId()}, {limit: 100}).fetch();
  }
});

Template.home.events({
  'click #selectProducts': function(e){
    return PUB.page('/categories/all');
  }
})