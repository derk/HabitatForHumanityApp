(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV(HTML.Raw("\n    <h1>Registration</h1>\n    "), Spacebars.include(view.lookupTemplate("registration")), "\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("registration");
Template["registration"] = new Template("Template.registration", (function() {
  var view = this;
  return HTML.FORM("\n", HTML.UL("\n  ", HTML.getTag("md-content")({
    "layout-padding": "",
    "class": "autoScroll"
  }, "\n\n        ", HTML.Comment(" Use floating label instead of placeholder "), "\n        ", HTML.H1(" Name "), "\n        ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_person_24px.svg",
    "class": "name"
  }), "\n        ", HTML.INPUT({
    "ng-model": "user.name",
    type: "name",
    placeholder: "Name",
    "ng-required": "true"
  }), "\n        ", HTML.DIV({
    "ng-messages": "user.name.$error"
  }, "\n            ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n        ", HTML.Comment(" Use floating placeholder instead of label "), "\n        ", HTML.H1(" Email Address"), "\n        ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_email_24px.svg",
    "class": "email"
  }), "\n        ", HTML.INPUT({
    "ng-model": "user.email",
    type: "email",
    placeholder: "Email",
    "ng-required": "true"
  }), "\n        ", HTML.DIV({
    "ng-messages": "user.email.$error"
  }, "\n            ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n        ", HTML.Comment(" Use floating placeholder instead of label "), "\n        ", HTML.H1(" Confirm email address "), "\n        ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_email_24px.svg",
    "class": "email"
  }), "\n        ", HTML.INPUT({
    "ng-model": "user.email",
    type: "email",
    placeholder: "Confirm email address",
    "ng-required": "true"
  }), "\n        ", HTML.DIV({
    "ng-messages": "user.email.$error"
  }, "\n            ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n        ", HTML.H1(" Select a chapter from below "), "\n        ", HTML.getTag("md-select")({
    "ng-model": "user.chapter",
    placeholder: "Chapter",
    "ng-required": "true"
  }, "\n          ", HTML.getTag("md-option")({
    "ng-repeat": "chapter in user.chapters",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("user"), "chapter"));
    }
  }, Blaze.View("lookup:user.chapter", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("user"), "chapter"));
  })), "\n        "), "\n        ", HTML.DIV({
    "ng-messages": "user.chapter.$error"
  }, "\n              ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n        ", HTML.Comment(" Use floating placeholder instead of label "), "\n        ", HTML.H1(" Password "), "\n        ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_lock_24px.svg",
    "class": "password"
  }), "\n        ", HTML.INPUT({
    "ng-model": "user.password",
    type: "password",
    placeholder: "Enter password",
    "ng-required": "true"
  }), "\n        ", HTML.DIV({
    "ng-messages": "user.password.$error"
  }, "\n            ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n        ", HTML.H1(" Confirm password "), "\n        ", HTML.getTag("md-icon")({
    "md-svg-src": "img/icons/ic_lock_24px.svg",
    "class": "password"
  }), "\n        ", HTML.INPUT({
    "ng-model": "user.password",
    type: "password",
    placeholder: "Confirm password",
    "ng-required": "true"
  }), "\n        ", HTML.DIV({
    "ng-messages": "user.password.$error"
  }, "\n            ", HTML.DIV({
    "ng-message": "required"
  }, "This is required."), "\n        "), "\n\n  "), "\n\n        ", HTML.Raw('<input type="submit" value="Save">'), "\n"), "\n");
}));

})();
