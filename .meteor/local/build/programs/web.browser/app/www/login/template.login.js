(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "ng-controller": "DemoCtrl",
    layout: "column"
  }, "\n  ", HTML.getTag("md-content")({
    "layout-padding": "",
    "class": "autoScroll"
  }, "\n\n    ", HTML.getTag("md-input-container")("\n      ", HTML.Comment(" Use floating placeholder instead of label "), "\n      ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_email_24px.svg",
    "class": "email"
  }), "\n      ", HTML.INPUT({
    "ng-model": "user.email",
    type: "email",
    placeholder: "Email (required)",
    "ng-required": "true"
  }), "\n      ", HTML.DIV({
    "ng-messages": "user.email.$error"
  }, "\n          ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n      "), "\n    "), "\n\n	", HTML.getTag("md-input-container")("\n      ", HTML.Comment(" Use floating placeholder instead of label "), "\n      ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_lock_24px.svg",
    "class": "password"
  }), "\n      ", HTML.INPUT({
    "ng-model": "user.password",
    type: "password",
    placeholder: "Enter password",
    "ng-required": "true"
  }), "\n      ", HTML.DIV({
    "ng-messages": "user.password.$error"
  }, "\n          ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n      "), "\n  "), "\n\n    ", HTML.DIV({
    layout: "row"
  }, "\n      ", HTML.getTag("md-button")({
    "class": "btn1"
  }, " Cancel "), "\n      ", HTML.getTag("md-button")({
    "class": "btn1"
  }, " Log In "), "\n    "), "\n\n  "), "\n");
}));
Meteor.startup(Template.body.renderToDocument);

})();
