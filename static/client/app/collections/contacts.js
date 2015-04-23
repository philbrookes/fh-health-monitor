(function(){
  var ContactCollection=Backbone.Collection.extend({
    model:app.models.ContactModel,
    url:"/contacts"
  });
  app.collections.contacts=new ContactCollection();
})();
