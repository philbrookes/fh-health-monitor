(function () {
  app.ViewCls.ContactRow = Backbone.View.extend({
    initialize: function () {
      this.setElement($('<tr></tr>'))
    },
    render: function () {
      var attr = _.clone(this.model.attributes);
      var tmpl = app.tmpl.get('tmpl_contact_row', attr);
      this.$el.html(tmpl)
    }
  })
}())