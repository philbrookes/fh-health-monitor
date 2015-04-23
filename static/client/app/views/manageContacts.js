(function () {
  app.ViewCls.ManageContactsModal = Backbone.View.extend({
    _action: 'Create',
    isShow:false,
    back: true,
    initialize: function () {
      var self = this;
      this.setElement(app.tmpl.get('tmpl_manage_contacts', {}));
      app.collections.contacts.models.forEach(this.addContactView.bind(this));
      app.collections.contacts.on("add", function(){
        self.setElement(app.tmpl.get('tmpl_manage_contacts', {}));
        app.collections.contacts.models.forEach(self.addContactView.bind(self));
      });
    },
    hide:function(){
      this.$el.modal("hide");
    } ,
    render: function () {
      this.back = true;
      this.$el.modal();
    },
    events: {
      'hidden.bs.modal': 'onHidden',
      'shown.bs.modal': 'onShow',
      'click #createContact': 'showCreateContactForm'
    },
    keyaction: function(ev){
      if(ev.keyCode == 27){
        this.hide();
        return false;
      }
      return;
    },
    onShow: function () {
      this.isShow=true;
      this.back = true;
    },
    onHidden: function () {
      this.isShow=false;
      if(this.back){
        window.history.back();
      }
    },
    showCreateContactForm: function() {
      this.back = false;
      app.router.navigate("createContact", {trigger: true, replace: false});
      this.$el.modal("hide");
    },
    addContactView: function(model) {
      var contactView = new app.ViewCls.ContactRow({
        model: model
      });
      contactView.render();
      this.$el.find("table#contacts_container").append(contactView.$el);
    }
  })
}())
