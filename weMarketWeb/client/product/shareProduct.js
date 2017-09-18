Template.shareProductHeader.events({
  'click .right': function(){
    $('.productDropdown').toggle();
  },
  'click .dropdownItem': function(e){
    var page = e.currentTarget.id;
    return PUB.page(page);
  }
});

Template.shareProduct.onRendered(function(){
  Session.set('shareProductId', Router.current().params._id);
  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationType : 'custom',
      autoplay : 5000,
      loop: true,
      paginationCustomRender: function (swiper, current, total) {
        return '<span class="swiper-pagination-bullet">' + current + ' / ' + total + '</span>';
      }
  });
  console.log(this)
  Meteor.subscribe('shopping-by-product-id', Router.current().params._id);
});

Template.shareProduct.helpers({

});

Template.shareProduct.events({
  // 添加到购物车Popup
  'click .addToCart': function(){
    $("#addToCart").popup();
  },
  // 添加到购物车
  'click .btn-addCart': function(){
    var shopping = Shopping.findOne({user_id: Meteor.userId(), product_id: this._id});
    console.log(shopping)
    var user = Meteor.user();
    var obj = {
      product_id: this._id,
      product_name: this.name,
      product_img: this.mainImage,
      product_num: Number($('#goods_number').val()),
      product_price: this.sale_price,
      user_id: user._id,
      user_name: '',
      user_icon:'',
      seller_icon: this.seller_icon,
      seller_id: this.seller_id,
      seller_name: this.seller_name,
      createdAt: new Date()
    }
    console.log(obj);
    $.showLoading('正在添加');
    var callback = function(err,_id){
      $.hideLoading();
      if(err){
        console.log(err);
        return $.toast('请重试','cancel');
      }
      $.closePopup();
      return $.modal({
        title: "已添加到购物车",
        text: "该商品已经添加到购物车，您现在还需要继续购物吗？",
        buttons: [
          { text: "继续购物", className: "default", onClick: function(){ $.closeModal(); }},
          { text: "马上结算", onClick: function(){
            // goTo
            return PUB.page('/shopping');
          }}
        ]
      });
    }
    if(shopping){
      obj.product_num += shopping.product_num;
      Shopping.update({_id: shopping._id},{
        $set:obj
      },callback);
    } else {
      Shopping.insert(obj, callback);
    }
  }
});