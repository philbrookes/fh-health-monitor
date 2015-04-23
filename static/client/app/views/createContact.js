(function () {
  app.ViewCls.CreateContactModal = Backbone.View.extend({
    _action: 'Create',
    isShow:false,
    initialize: function () {
      var tmpl = app.tmpl.get('tmpl_create_contact', {});
      this.setElement($(tmpl))
    },
    hide:function(){
      this.$el.modal("hide");
    } ,
    render: function () {
      this.$el.modal();
      this.$el.find('#create_contact_title').text(this._action + ' Contact');
      this.$el.find('#btn_create_contact').text(this._action);
    },
    events: {
      'hidden.bs.modal': 'onHidden',
      'shown.bs.modal': 'onShow',
      'submit #createContactForm': 'onFormSubmit'
    },
    onShow: function () {
      this.$el.find('#createContactForm')[0].reset();
      this.isShow=true;
    },
    onHidden: function () {
      this.isShow=false;
      window.history.back();
    },
    onFormSubmit: function (e) {
      var form = $(e.target);
      var arr = form.serializeArray();
      var json = {};
      for (var i = 0; i < arr.length; i++) {
        json[arr[i].name] = arr[i].value;
      }
      json['createDate'] = new Date();
      var btn = this.$el.find('#btn_create_contact');
      var self = this;
      this.save(json, function (err) {
        btn.button('reset');
        if (err) {
          app.msg.alert(err.toString())
        } else {
          self.$el.modal('hide')
        }
      });
      btn.button('loading');
      return false
    },
    save: function (data, cb) {
      var col = app.collections.contacts;
      col.create(data, {
        'wait': true,
        'success': function () {
          cb()
        },
        'error': function () {
          cb('Creating contact failed.')
        }
      })
    }
  })
}())
