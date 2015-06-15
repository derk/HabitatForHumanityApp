(function(){
Meteor.startup(function() { $('body').attr({"ng-app":"starterApp","layout":"column","ng-controller":"UserController as vm"}); });

Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<!-- toolbar -->\n  "), HTML.getTag("md-toolbar")({
    layout: "row"
  }, "\n    ", HTML.getTag("md-button")({
    "class": "menu",
    "ng-click": "vm.toggleList()",
    "hide-gt-sm": ""
  }, "\n      ", HTML.getTag("md-icon")({
    "md-svg-src": "www/svg/menu.svg"
  }), "\n    "), "\n    ", HTML.H1("Angular Material - Starter App"), "\n  "), "\n\n  ", HTML.DIV({
    layout: "row",
    flex: ""
  }, "\n  ", HTML.Raw("<!-- sidebar -->"), "\n  ", HTML.getTag("md-sidenav")({
    layout: "column",
    "md-component-id": "left",
    "md-is-locked-open": "$mdMedia('gt-sm')",
    "class": "md-whiteframe-z2"
  }, "\n    ", HTML.getTag("md-list")("\n      ", HTML.getTag("md-item")({
    "ng-repeat": "it in vm.users"
  }, "\n                ", HTML.getTag("md-button")({
    "ng-click": "vm.selectUser(it)",
    "ng-class": "{'selected' : it === vm.selected }"
  }, "\n                  ", HTML.getTag("md-icon")({
    "md-svg-icon": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("it"), "avatar"));
    },
    "class": "avatar"
  }), "\n                  ", Blaze.View("lookup:it.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("it"), "name"));
  }), "\n                "), "\n            "), "\n    "), "\n  "), "\n\n  ", HTML.Raw("<!-- content -->"), "\n  ", HTML.getTag("md-content")({
    flex: "",
    id: "content"
  }, "\n    ", HTML.getTag("md-icon")({
    "md-svg-icon": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("vm"), "selected", "avatar"));
    },
    "class": "avatar"
  }), "\n          ", HTML.H2(Blaze.View("lookup:vm.selected.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("vm"), "selected", "name"));
  })), "\n\n          ", HTML.P(Blaze.View("lookup:vm.selected.content", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("vm"), "selected", "content"));
  })), "\n\n          ", HTML.getTag("md-button")({
    "class": "share",
    "md-no-ink": "",
    "ng-click": "vm.share($event)",
    "aria-label": "Share"
  }, "\n            ", HTML.getTag("md-icon")({
    "md-svg-icon": "share"
  }), "\n          "), "\n    "), "\n  "), "\n\n  ", HTML.SCRIPT({
    src: "./bower_components/angular/angular.js"
  }), "\n  ", HTML.SCRIPT({
    src: "./bower_components/angular-animate/angular-animate.js"
  }), "\n  ", HTML.SCRIPT({
    src: "./bower_components/angular-aria/angular-aria.js"
  }), "\n  ", HTML.SCRIPT({
    src: "./bower_components/angular-material/angular-material.js"
  }), "\n\n  ", HTML.SCRIPT({
    src: "./www/users/users.js"
  }), "\n  ", HTML.SCRIPT({
    src: "./www/users/userController.js"
  }), "\n  ", HTML.SCRIPT({
    src: "./www/users/userService.js"
  }), "\n\n  ", HTML.SCRIPT({
    type: "text/javascript"
  }, '\n    angular\n      .module(\'starterApp\', [\'ngMaterial\', \'users\'])\n      .config(function($mdThemingProvider, $mdIconProvider){\n                  $mdIconProvider\n                      .defaultIconSet("./www/svg/avatars.svg", 128)\n                      .icon("menu"       , "./www/svg/menu.svg"        , 24)\n                      .icon("share"      , "./www/svg/share.svg"       , 24)\n                      .icon("google_plus", "./www/svg/google_plus.svg" , 512)\n                      .icon("hangouts"   , "./www/svg/hangouts.svg"    , 512)\n                      .icon("twitter"    , "./www/svg/twitter.svg"     , 512)\n                      .icon("phone"      , "./www/svg/phone.svg"       , 512);\n                      $mdThemingProvider.theme(\'default\')\n                          .primaryPalette(\'brown\')\n                          .accentPalette(\'red\');\n              });\n      .run(function($log){\n        $log.debug("startApp   running ");\n      });\n  ') ];
}));
Meteor.startup(Template.body.renderToDocument);

})();
