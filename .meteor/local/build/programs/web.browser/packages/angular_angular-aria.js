//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/angular:angular-aria/angular-aria.js                                                           //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
 * @license AngularJS v1.3.15                                                                              // 2
 * (c) 2010-2014 Google, Inc. http://angularjs.org                                                         // 3
 * License: MIT                                                                                            // 4
 */                                                                                                        // 5
(function(window, angular, undefined) {'use strict';                                                       // 6
                                                                                                           // 7
/**                                                                                                        // 8
 * @ngdoc module                                                                                           // 9
 * @name ngAria                                                                                            // 10
 * @description                                                                                            // 11
 *                                                                                                         // 12
 * The `ngAria` module provides support for common                                                         // 13
 * [<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](http://www.w3.org/TR/wai-aria/)       // 14
 * attributes that convey state or semantic information about the application for users                    // 15
 * of assistive technologies, such as screen readers.                                                      // 16
 *                                                                                                         // 17
 * <div doc-module-components="ngAria"></div>                                                              // 18
 *                                                                                                         // 19
 * ## Usage                                                                                                // 20
 *                                                                                                         // 21
 * For ngAria to do its magic, simply include the module as a dependency. The directives supported         // 22
 * by ngAria are:                                                                                          // 23
 * `ngModel`, `ngDisabled`, `ngShow`, `ngHide`, `ngClick`, `ngDblClick`, and `ngMessages`.                 // 24
 *                                                                                                         // 25
 * Below is a more detailed breakdown of the attributes handled by ngAria:                                 // 26
 *                                                                                                         // 27
 * | Directive                                   | Supported Attributes                                                                   |
 * |---------------------------------------------|----------------------------------------------------------------------------------------|
 * | {@link ng.directive:ngDisabled ngDisabled}  | aria-disabled                                                                          |
 * | {@link ng.directive:ngShow ngShow}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngHide ngHide}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngDblclick ngDblclick}  | tabindex                                                                               |
 * | {@link module:ngMessages ngMessages}        | aria-live                                                                              |
 * | {@link ng.directive:ngModel ngModel}        | aria-checked, aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-required, input roles |
 * | {@link ng.directive:ngClick ngClick}        | tabindex, keypress event, button role                                                               |
 *                                                                                                         // 37
 * Find out more information about each directive by reading the                                           // 38
 * {@link guide/accessibility ngAria Developer Guide}.                                                     // 39
 *                                                                                                         // 40
 * ##Example                                                                                               // 41
 * Using ngDisabled with ngAria:                                                                           // 42
 * ```html                                                                                                 // 43
 * <md-checkbox ng-disabled="disabled">                                                                    // 44
 * ```                                                                                                     // 45
 * Becomes:                                                                                                // 46
 * ```html                                                                                                 // 47
 * <md-checkbox ng-disabled="disabled" aria-disabled="true">                                               // 48
 * ```                                                                                                     // 49
 *                                                                                                         // 50
 * ##Disabling Attributes                                                                                  // 51
 * It's possible to disable individual attributes added by ngAria with the                                 // 52
 * {@link ngAria.$ariaProvider#config config} method. For more details, see the                            // 53
 * {@link guide/accessibility Developer Guide}.                                                            // 54
 */                                                                                                        // 55
 /* global -ngAriaModule */                                                                                // 56
var ngAriaModule = angular.module('ngAria', ['ng']).                                                       // 57
                        provider('$aria', $AriaProvider);                                                  // 58
                                                                                                           // 59
/**                                                                                                        // 60
 * @ngdoc provider                                                                                         // 61
 * @name $ariaProvider                                                                                     // 62
 *                                                                                                         // 63
 * @description                                                                                            // 64
 *                                                                                                         // 65
 * Used for configuring the ARIA attributes injected and managed by ngAria.                                // 66
 *                                                                                                         // 67
 * ```js                                                                                                   // 68
 * angular.module('myApp', ['ngAria'], function config($ariaProvider) {                                    // 69
 *   $ariaProvider.config({                                                                                // 70
 *     ariaValue: true,                                                                                    // 71
 *     tabindex: false                                                                                     // 72
 *   });                                                                                                   // 73
 * });                                                                                                     // 74
 *```                                                                                                      // 75
 *                                                                                                         // 76
 * ## Dependencies                                                                                         // 77
 * Requires the {@link ngAria} module to be installed.                                                     // 78
 *                                                                                                         // 79
 */                                                                                                        // 80
function $AriaProvider() {                                                                                 // 81
  var config = {                                                                                           // 82
    ariaHidden: true,                                                                                      // 83
    ariaChecked: true,                                                                                     // 84
    ariaDisabled: true,                                                                                    // 85
    ariaRequired: true,                                                                                    // 86
    ariaInvalid: true,                                                                                     // 87
    ariaMultiline: true,                                                                                   // 88
    ariaValue: true,                                                                                       // 89
    tabindex: true,                                                                                        // 90
    bindKeypress: true                                                                                     // 91
  };                                                                                                       // 92
                                                                                                           // 93
  /**                                                                                                      // 94
   * @ngdoc method                                                                                         // 95
   * @name $ariaProvider#config                                                                            // 96
   *                                                                                                       // 97
   * @param {object} config object to enable/disable specific ARIA attributes                              // 98
   *                                                                                                       // 99
   *  - **ariaHidden** – `{boolean}` – Enables/disables aria-hidden tags                                   // 100
   *  - **ariaChecked** – `{boolean}` – Enables/disables aria-checked tags                                 // 101
   *  - **ariaDisabled** – `{boolean}` – Enables/disables aria-disabled tags                               // 102
   *  - **ariaRequired** – `{boolean}` – Enables/disables aria-required tags                               // 103
   *  - **ariaInvalid** – `{boolean}` – Enables/disables aria-invalid tags                                 // 104
   *  - **ariaMultiline** – `{boolean}` – Enables/disables aria-multiline tags                             // 105
   *  - **ariaValue** – `{boolean}` – Enables/disables aria-valuemin, aria-valuemax and aria-valuenow tags // 106
   *  - **tabindex** – `{boolean}` – Enables/disables tabindex tags                                        // 107
   *  - **bindKeypress** – `{boolean}` – Enables/disables keypress event binding on `&lt;div&gt;` and      // 108
   *    `&lt;li&gt;` elements with ng-click                                                                // 109
   *                                                                                                       // 110
   * @description                                                                                          // 111
   * Enables/disables various ARIA attributes                                                              // 112
   */                                                                                                      // 113
  this.config = function(newConfig) {                                                                      // 114
    config = angular.extend(config, newConfig);                                                            // 115
  };                                                                                                       // 116
                                                                                                           // 117
  function watchExpr(attrName, ariaAttr, negate) {                                                         // 118
    return function(scope, elem, attr) {                                                                   // 119
      var ariaCamelName = attr.$normalize(ariaAttr);                                                       // 120
      if (config[ariaCamelName] && !attr[ariaCamelName]) {                                                 // 121
        scope.$watch(attr[attrName], function(boolVal) {                                                   // 122
          if (negate) {                                                                                    // 123
            boolVal = !boolVal;                                                                            // 124
          }                                                                                                // 125
          elem.attr(ariaAttr, boolVal);                                                                    // 126
        });                                                                                                // 127
      }                                                                                                    // 128
    };                                                                                                     // 129
  }                                                                                                        // 130
                                                                                                           // 131
  /**                                                                                                      // 132
   * @ngdoc service                                                                                        // 133
   * @name $aria                                                                                           // 134
   *                                                                                                       // 135
   * @description                                                                                          // 136
   * @priority 200                                                                                         // 137
   *                                                                                                       // 138
   * The $aria service contains helper methods for applying common                                         // 139
   * [ARIA](http://www.w3.org/TR/wai-aria/) attributes to HTML directives.                                 // 140
   *                                                                                                       // 141
   * ngAria injects common accessibility attributes that tell assistive technologies when HTML             // 142
   * elements are enabled, selected, hidden, and more. To see how this is performed with ngAria,           // 143
   * let's review a code snippet from ngAria itself:                                                       // 144
   *                                                                                                       // 145
   *```js                                                                                                  // 146
   * ngAriaModule.directive('ngDisabled', ['$aria', function($aria) {                                      // 147
   *   return $aria.$$watchExpr('ngDisabled', 'aria-disabled');                                            // 148
   * }])                                                                                                   // 149
   *```                                                                                                    // 150
   * Shown above, the ngAria module creates a directive with the same signature as the                     // 151
   * traditional `ng-disabled` directive. But this ngAria version is dedicated to                          // 152
   * solely managing accessibility attributes. The internal `$aria` service is used to watch the           // 153
   * boolean attribute `ngDisabled`. If it has not been explicitly set by the developer,                   // 154
   * `aria-disabled` is injected as an attribute with its value synchronized to the value in               // 155
   * `ngDisabled`.                                                                                         // 156
   *                                                                                                       // 157
   * Because ngAria hooks into the `ng-disabled` directive, developers do not have to do                   // 158
   * anything to enable this feature. The `aria-disabled` attribute is automatically managed               // 159
   * simply as a silent side-effect of using `ng-disabled` with the ngAria module.                         // 160
   *                                                                                                       // 161
   * The full list of directives that interface with ngAria:                                               // 162
   * * **ngModel**                                                                                         // 163
   * * **ngShow**                                                                                          // 164
   * * **ngHide**                                                                                          // 165
   * * **ngClick**                                                                                         // 166
   * * **ngDblclick**                                                                                      // 167
   * * **ngMessages**                                                                                      // 168
   * * **ngDisabled**                                                                                      // 169
   *                                                                                                       // 170
   * Read the {@link guide/accessibility ngAria Developer Guide} for a thorough explanation of each        // 171
   * directive.                                                                                            // 172
   *                                                                                                       // 173
   *                                                                                                       // 174
   * ## Dependencies                                                                                       // 175
   * Requires the {@link ngAria} module to be installed.                                                   // 176
   */                                                                                                      // 177
  this.$get = function() {                                                                                 // 178
    return {                                                                                               // 179
      config: function(key) {                                                                              // 180
        return config[key];                                                                                // 181
      },                                                                                                   // 182
      $$watchExpr: watchExpr                                                                               // 183
    };                                                                                                     // 184
  };                                                                                                       // 185
}                                                                                                          // 186
                                                                                                           // 187
                                                                                                           // 188
ngAriaModule.directive('ngShow', ['$aria', function($aria) {                                               // 189
  return $aria.$$watchExpr('ngShow', 'aria-hidden', true);                                                 // 190
}])                                                                                                        // 191
.directive('ngHide', ['$aria', function($aria) {                                                           // 192
  return $aria.$$watchExpr('ngHide', 'aria-hidden', false);                                                // 193
}])                                                                                                        // 194
.directive('ngModel', ['$aria', function($aria) {                                                          // 195
                                                                                                           // 196
  function shouldAttachAttr(attr, normalizedAttr, elem) {                                                  // 197
    return $aria.config(normalizedAttr) && !elem.attr(attr);                                               // 198
  }                                                                                                        // 199
                                                                                                           // 200
  function shouldAttachRole(role, elem) {                                                                  // 201
    return !elem.attr('role') && (elem.attr('type') === role) && (elem[0].nodeName !== 'INPUT');           // 202
  }                                                                                                        // 203
                                                                                                           // 204
  function getShape(attr, elem) {                                                                          // 205
    var type = attr.type,                                                                                  // 206
        role = attr.role;                                                                                  // 207
                                                                                                           // 208
    return ((type || role) === 'checkbox' || role === 'menuitemcheckbox') ? 'checkbox' :                   // 209
           ((type || role) === 'radio'    || role === 'menuitemradio') ? 'radio' :                         // 210
           (type === 'range'              || role === 'progressbar' || role === 'slider') ? 'range' :      // 211
           (type || role) === 'textbox'   || elem[0].nodeName === 'TEXTAREA' ? 'multiline' : '';           // 212
  }                                                                                                        // 213
                                                                                                           // 214
  return {                                                                                                 // 215
    restrict: 'A',                                                                                         // 216
    require: '?ngModel',                                                                                   // 217
    priority: 200, //Make sure watches are fired after any other directives that affect the ngModel value  // 218
    link: function(scope, elem, attr, ngModel) {                                                           // 219
      var shape = getShape(attr, elem);                                                                    // 220
      var needsTabIndex = shouldAttachAttr('tabindex', 'tabindex', elem);                                  // 221
                                                                                                           // 222
      function ngAriaWatchModelValue() {                                                                   // 223
        return ngModel.$modelValue;                                                                        // 224
      }                                                                                                    // 225
                                                                                                           // 226
      function getRadioReaction() {                                                                        // 227
        if (needsTabIndex) {                                                                               // 228
          needsTabIndex = false;                                                                           // 229
          return function ngAriaRadioReaction(newVal) {                                                    // 230
            var boolVal = (attr.value == ngModel.$viewValue);                                              // 231
            elem.attr('aria-checked', boolVal);                                                            // 232
            elem.attr('tabindex', 0 - !boolVal);                                                           // 233
          };                                                                                               // 234
        } else {                                                                                           // 235
          return function ngAriaRadioReaction(newVal) {                                                    // 236
            elem.attr('aria-checked', (attr.value == ngModel.$viewValue));                                 // 237
          };                                                                                               // 238
        }                                                                                                  // 239
      }                                                                                                    // 240
                                                                                                           // 241
      function ngAriaCheckboxReaction(newVal) {                                                            // 242
        elem.attr('aria-checked', !ngModel.$isEmpty(ngModel.$viewValue));                                  // 243
      }                                                                                                    // 244
                                                                                                           // 245
      switch (shape) {                                                                                     // 246
        case 'radio':                                                                                      // 247
        case 'checkbox':                                                                                   // 248
          if (shouldAttachRole(shape, elem)) {                                                             // 249
            elem.attr('role', shape);                                                                      // 250
          }                                                                                                // 251
          if (shouldAttachAttr('aria-checked', 'ariaChecked', elem)) {                                     // 252
            scope.$watch(ngAriaWatchModelValue, shape === 'radio' ?                                        // 253
                getRadioReaction() : ngAriaCheckboxReaction);                                              // 254
          }                                                                                                // 255
          break;                                                                                           // 256
        case 'range':                                                                                      // 257
          if (shouldAttachRole(shape, elem)) {                                                             // 258
            elem.attr('role', 'slider');                                                                   // 259
          }                                                                                                // 260
          if ($aria.config('ariaValue')) {                                                                 // 261
            if (attr.min && !elem.attr('aria-valuemin')) {                                                 // 262
              elem.attr('aria-valuemin', attr.min);                                                        // 263
            }                                                                                              // 264
            if (attr.max && !elem.attr('aria-valuemax')) {                                                 // 265
              elem.attr('aria-valuemax', attr.max);                                                        // 266
            }                                                                                              // 267
            if (!elem.attr('aria-valuenow')) {                                                             // 268
              scope.$watch(ngAriaWatchModelValue, function ngAriaValueNowReaction(newVal) {                // 269
                elem.attr('aria-valuenow', newVal);                                                        // 270
              });                                                                                          // 271
            }                                                                                              // 272
          }                                                                                                // 273
          break;                                                                                           // 274
        case 'multiline':                                                                                  // 275
          if (shouldAttachAttr('aria-multiline', 'ariaMultiline', elem)) {                                 // 276
            elem.attr('aria-multiline', true);                                                             // 277
          }                                                                                                // 278
          break;                                                                                           // 279
      }                                                                                                    // 280
                                                                                                           // 281
      if (needsTabIndex) {                                                                                 // 282
        elem.attr('tabindex', 0);                                                                          // 283
      }                                                                                                    // 284
                                                                                                           // 285
      if (ngModel.$validators.required && shouldAttachAttr('aria-required', 'ariaRequired', elem)) {       // 286
        scope.$watch(function ngAriaRequiredWatch() {                                                      // 287
          return ngModel.$error.required;                                                                  // 288
        }, function ngAriaRequiredReaction(newVal) {                                                       // 289
          elem.attr('aria-required', !!newVal);                                                            // 290
        });                                                                                                // 291
      }                                                                                                    // 292
                                                                                                           // 293
      if (shouldAttachAttr('aria-invalid', 'ariaInvalid', elem)) {                                         // 294
        scope.$watch(function ngAriaInvalidWatch() {                                                       // 295
          return ngModel.$invalid;                                                                         // 296
        }, function ngAriaInvalidReaction(newVal) {                                                        // 297
          elem.attr('aria-invalid', !!newVal);                                                             // 298
        });                                                                                                // 299
      }                                                                                                    // 300
    }                                                                                                      // 301
  };                                                                                                       // 302
}])                                                                                                        // 303
.directive('ngDisabled', ['$aria', function($aria) {                                                       // 304
  return $aria.$$watchExpr('ngDisabled', 'aria-disabled');                                                 // 305
}])                                                                                                        // 306
.directive('ngMessages', function() {                                                                      // 307
  return {                                                                                                 // 308
    restrict: 'A',                                                                                         // 309
    require: '?ngMessages',                                                                                // 310
    link: function(scope, elem, attr, ngMessages) {                                                        // 311
      if (!elem.attr('aria-live')) {                                                                       // 312
        elem.attr('aria-live', 'assertive');                                                               // 313
      }                                                                                                    // 314
    }                                                                                                      // 315
  };                                                                                                       // 316
})                                                                                                         // 317
.directive('ngClick',['$aria', '$parse', function($aria, $parse) {                                         // 318
  return {                                                                                                 // 319
    restrict: 'A',                                                                                         // 320
    compile: function(elem, attr) {                                                                        // 321
      var fn = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);                 // 322
      return function(scope, elem, attr) {                                                                 // 323
                                                                                                           // 324
        var nodeBlackList = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'];                                          // 325
                                                                                                           // 326
        function isNodeOneOf(elem, nodeTypeArray) {                                                        // 327
          if (nodeTypeArray.indexOf(elem[0].nodeName) !== -1) {                                            // 328
            return true;                                                                                   // 329
          }                                                                                                // 330
        }                                                                                                  // 331
        if (!elem.attr('role') && !isNodeOneOf(elem, nodeBlackList)) {                                     // 332
          elem.attr('role', 'button');                                                                     // 333
        }                                                                                                  // 334
                                                                                                           // 335
        if ($aria.config('tabindex') && !elem.attr('tabindex')) {                                          // 336
          elem.attr('tabindex', 0);                                                                        // 337
        }                                                                                                  // 338
                                                                                                           // 339
        if ($aria.config('bindKeypress') && !attr.ngKeypress && !isNodeOneOf(elem, nodeBlackList)) {       // 340
          elem.on('keypress', function(event) {                                                            // 341
            if (event.keyCode === 32 || event.keyCode === 13) {                                            // 342
              scope.$apply(callback);                                                                      // 343
            }                                                                                              // 344
                                                                                                           // 345
            function callback() {                                                                          // 346
              fn(scope, { $event: event });                                                                // 347
            }                                                                                              // 348
          });                                                                                              // 349
        }                                                                                                  // 350
      };                                                                                                   // 351
    }                                                                                                      // 352
  };                                                                                                       // 353
}])                                                                                                        // 354
.directive('ngDblclick', ['$aria', function($aria) {                                                       // 355
  return function(scope, elem, attr) {                                                                     // 356
    if ($aria.config('tabindex') && !elem.attr('tabindex')) {                                              // 357
      elem.attr('tabindex', 0);                                                                            // 358
    }                                                                                                      // 359
  };                                                                                                       // 360
}]);                                                                                                       // 361
                                                                                                           // 362
                                                                                                           // 363
})(window, window.angular);                                                                                // 364
                                                                                                           // 365
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-aria'] = {};

})();
