Template.registerHelper('seller_id', function(){
  return Router.current().params.query.s || localStorage.getItem('seller_id') || 'RTsZ64Cc8iyoc4BmW';
});

if (Meteor.isClient) {
  Session.set("DocumentTitle",'微商传播机');
  Deps.autorun(function(){
    document.title = Session.get("DocumentTitle");
  });
}