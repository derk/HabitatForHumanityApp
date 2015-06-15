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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angular:angular-animate/angular-animate.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @license AngularJS v1.3.15                                                                                          // 2
 * (c) 2010-2014 Google, Inc. http://angularjs.org                                                                     // 3
 * License: MIT                                                                                                        // 4
 */                                                                                                                    // 5
(function(window, angular, undefined) {'use strict';                                                                   // 6
                                                                                                                       // 7
/* jshint maxlen: false */                                                                                             // 8
                                                                                                                       // 9
/**                                                                                                                    // 10
 * @ngdoc module                                                                                                       // 11
 * @name ngAnimate                                                                                                     // 12
 * @description                                                                                                        // 13
 *                                                                                                                     // 14
 * The `ngAnimate` module provides support for JavaScript, CSS3 transition and CSS3 keyframe animation hooks within existing core and custom directives.
 *                                                                                                                     // 16
 * <div doc-module-components="ngAnimate"></div>                                                                       // 17
 *                                                                                                                     // 18
 * # Usage                                                                                                             // 19
 *                                                                                                                     // 20
 * To see animations in action, all that is required is to define the appropriate CSS classes                          // 21
 * or to register a JavaScript animation via the `myModule.animation()` function. The directives that support animation automatically are:
 * `ngRepeat`, `ngInclude`, `ngIf`, `ngSwitch`, `ngShow`, `ngHide`, `ngView` and `ngClass`. Custom directives can take advantage of animation
 * by using the `$animate` service.                                                                                    // 24
 *                                                                                                                     // 25
 * Below is a more detailed breakdown of the supported animation events provided by pre-existing ng directives:        // 26
 *                                                                                                                     // 27
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *                                                                                                                     // 40
 * You can find out more information about animations upon visiting each directive page.                               // 41
 *                                                                                                                     // 42
 * Below is an example of how to apply animations to a directive that supports animation hooks:                        // 43
 *                                                                                                                     // 44
 * ```html                                                                                                             // 45
 * <style type="text/css">                                                                                             // 46
 * .slide.ng-enter, .slide.ng-leave {                                                                                  // 47
 *   -webkit-transition:0.5s linear all;                                                                               // 48
 *   transition:0.5s linear all;                                                                                       // 49
 * }                                                                                                                   // 50
 *                                                                                                                     // 51
 * .slide.ng-enter { }        /&#42; starting animations for enter &#42;/                                              // 52
 * .slide.ng-enter.ng-enter-active { } /&#42; terminal animations for enter &#42;/                                     // 53
 * .slide.ng-leave { }        /&#42; starting animations for leave &#42;/                                              // 54
 * .slide.ng-leave.ng-leave-active { } /&#42; terminal animations for leave &#42;/                                     // 55
 * </style>                                                                                                            // 56
 *                                                                                                                     // 57
 * <!--                                                                                                                // 58
 * the animate service will automatically add .ng-enter and .ng-leave to the element                                   // 59
 * to trigger the CSS transition/animations                                                                            // 60
 * -->                                                                                                                 // 61
 * <ANY class="slide" ng-include="..."></ANY>                                                                          // 62
 * ```                                                                                                                 // 63
 *                                                                                                                     // 64
 * Keep in mind that, by default, if an animation is running, any child elements cannot be animated                    // 65
 * until the parent element's animation has completed. This blocking feature can be overridden by                      // 66
 * placing the `ng-animate-children` attribute on a parent container tag.                                              // 67
 *                                                                                                                     // 68
 * ```html                                                                                                             // 69
 * <div class="slide-animation" ng-if="on" ng-animate-children>                                                        // 70
 *   <div class="fade-animation" ng-if="on">                                                                           // 71
 *     <div class="explode-animation" ng-if="on">                                                                      // 72
 *        ...                                                                                                          // 73
 *     </div>                                                                                                          // 74
 *   </div>                                                                                                            // 75
 * </div>                                                                                                              // 76
 * ```                                                                                                                 // 77
 *                                                                                                                     // 78
 * When the `on` expression value changes and an animation is triggered then each of the elements within               // 79
 * will all animate without the block being applied to child elements.                                                 // 80
 *                                                                                                                     // 81
 * ## Are animations run when the application starts?                                                                  // 82
 * No they are not. When an application is bootstrapped Angular will disable animations from running to avoid          // 83
 * a frenzy of animations from being triggered as soon as the browser has rendered the screen. For this to work,       // 84
 * Angular will wait for two digest cycles until enabling animations. From there on, any animation-triggering          // 85
 * layout changes in the application will trigger animations as normal.                                                // 86
 *                                                                                                                     // 87
 * In addition, upon bootstrap, if the routing system or any directives or load remote data (via $http) then Angular   // 88
 * will automatically extend the wait time to enable animations once **all** of the outbound HTTP requests             // 89
 * are complete.                                                                                                       // 90
 *                                                                                                                     // 91
 * ## CSS-defined Animations                                                                                           // 92
 * The animate service will automatically apply two CSS classes to the animated element and these two CSS classes      // 93
 * are designed to contain the start and end CSS styling. Both CSS transitions and keyframe animations are supported   // 94
 * and can be used to play along with this naming structure.                                                           // 95
 *                                                                                                                     // 96
 * The following code below demonstrates how to perform animations using **CSS transitions** with Angular:             // 97
 *                                                                                                                     // 98
 * ```html                                                                                                             // 99
 * <style type="text/css">                                                                                             // 100
 * /&#42;                                                                                                              // 101
 *  The animate class is apart of the element and the ng-enter class                                                   // 102
 *  is attached to the element once the enter animation event is triggered                                             // 103
 * &#42;/                                                                                                              // 104
 * .reveal-animation.ng-enter {                                                                                        // 105
 *  -webkit-transition: 1s linear all; /&#42; Safari/Chrome &#42;/                                                     // 106
 *  transition: 1s linear all; /&#42; All other modern browsers and IE10+ &#42;/                                       // 107
 *                                                                                                                     // 108
 *  /&#42; The animation preparation code &#42;/                                                                       // 109
 *  opacity: 0;                                                                                                        // 110
 * }                                                                                                                   // 111
 *                                                                                                                     // 112
 * /&#42;                                                                                                              // 113
 *  Keep in mind that you want to combine both CSS                                                                     // 114
 *  classes together to avoid any CSS-specificity                                                                      // 115
 *  conflicts                                                                                                          // 116
 * &#42;/                                                                                                              // 117
 * .reveal-animation.ng-enter.ng-enter-active {                                                                        // 118
 *  /&#42; The animation code itself &#42;/                                                                            // 119
 *  opacity: 1;                                                                                                        // 120
 * }                                                                                                                   // 121
 * </style>                                                                                                            // 122
 *                                                                                                                     // 123
 * <div class="view-container">                                                                                        // 124
 *   <div ng-view class="reveal-animation"></div>                                                                      // 125
 * </div>                                                                                                              // 126
 * ```                                                                                                                 // 127
 *                                                                                                                     // 128
 * The following code below demonstrates how to perform animations using **CSS animations** with Angular:              // 129
 *                                                                                                                     // 130
 * ```html                                                                                                             // 131
 * <style type="text/css">                                                                                             // 132
 * .reveal-animation.ng-enter {                                                                                        // 133
 *   -webkit-animation: enter_sequence 1s linear; /&#42; Safari/Chrome &#42;/                                          // 134
 *   animation: enter_sequence 1s linear; /&#42; IE10+ and Future Browsers &#42;/                                      // 135
 * }                                                                                                                   // 136
 * @-webkit-keyframes enter_sequence {                                                                                 // 137
 *   from { opacity:0; }                                                                                               // 138
 *   to { opacity:1; }                                                                                                 // 139
 * }                                                                                                                   // 140
 * @keyframes enter_sequence {                                                                                         // 141
 *   from { opacity:0; }                                                                                               // 142
 *   to { opacity:1; }                                                                                                 // 143
 * }                                                                                                                   // 144
 * </style>                                                                                                            // 145
 *                                                                                                                     // 146
 * <div class="view-container">                                                                                        // 147
 *   <div ng-view class="reveal-animation"></div>                                                                      // 148
 * </div>                                                                                                              // 149
 * ```                                                                                                                 // 150
 *                                                                                                                     // 151
 * Both CSS3 animations and transitions can be used together and the animate service will figure out the correct duration and delay timing.
 *                                                                                                                     // 153
 * Upon DOM mutation, the event class is added first (something like `ng-enter`), then the browser prepares itself to add
 * the active class (in this case `ng-enter-active`) which then triggers the animation. The animation module will automatically
 * detect the CSS code to determine when the animation ends. Once the animation is over then both CSS classes will be  // 156
 * removed from the DOM. If a browser does not support CSS transitions or CSS animations then the animation will start and end
 * immediately resulting in a DOM element that is at its final state. This final state is when the DOM element         // 158
 * has no CSS transition/animation classes applied to it.                                                              // 159
 *                                                                                                                     // 160
 * ### Structural transition animations                                                                                // 161
 *                                                                                                                     // 162
 * Structural transitions (such as enter, leave and move) will always apply a `0s none` transition                     // 163
 * value to force the browser into rendering the styles defined in the setup (`.ng-enter`, `.ng-leave`                 // 164
 * or `.ng-move`) class. This means that any active transition animations operating on the element                     // 165
 * will be cut off to make way for the enter, leave or move animation.                                                 // 166
 *                                                                                                                     // 167
 * ### Class-based transition animations                                                                               // 168
 *                                                                                                                     // 169
 * Class-based transitions refer to transition animations that are triggered when a CSS class is                       // 170
 * added to or removed from the element (via `$animate.addClass`, `$animate.removeClass`,                              // 171
 * `$animate.setClass`, or by directives such as `ngClass`, `ngModel` and `form`).                                     // 172
 * They are different when compared to structural animations since they **do not cancel existing                       // 173
 * animations** nor do they **block successive transitions** from rendering on the same element.                       // 174
 * This distinction allows for **multiple class-based transitions** to be performed on the same element.               // 175
 *                                                                                                                     // 176
 * In addition to ngAnimate supporting the default (natural) functionality of class-based transition                   // 177
 * animations, ngAnimate also decorates the element with starting and ending CSS classes to aid the                    // 178
 * developer in further styling the element throughout the transition animation. Earlier versions                      // 179
 * of ngAnimate may have caused natural CSS transitions to break and not render properly due to                        // 180
 * $animate temporarily blocking transitions using `0s none` in order to allow the setup CSS class                     // 181
 * (the `-add` or `-remove` class) to be applied without triggering an animation. However, as of                       // 182
 * **version 1.3**, this workaround has been removed with ngAnimate and all non-ngAnimate CSS                          // 183
 * class transitions are compatible with ngAnimate.                                                                    // 184
 *                                                                                                                     // 185
 * There is, however, one special case when dealing with class-based transitions in ngAnimate.                         // 186
 * When rendering class-based transitions that make use of the setup and active CSS classes                            // 187
 * (e.g. `.fade-add` and `.fade-add-active` for when `.fade` is added) be sure to define                               // 188
 * the transition value **on the active CSS class** and not the setup class.                                           // 189
 *                                                                                                                     // 190
 * ```css                                                                                                              // 191
 * .fade-add {                                                                                                         // 192
 *   /&#42; remember to place a 0s transition here                                                                     // 193
 *      to ensure that the styles are applied instantly                                                                // 194
 *      even if the element already has a transition style &#42;/                                                      // 195
 *   transition:0s linear all;                                                                                         // 196
 *                                                                                                                     // 197
 *   /&#42; starting CSS styles &#42;/                                                                                 // 198
 *   opacity:1;                                                                                                        // 199
 * }                                                                                                                   // 200
 * .fade-add.fade-add-active {                                                                                         // 201
 *   /&#42; this will be the length of the animation &#42;/                                                            // 202
 *   transition:1s linear all;                                                                                         // 203
 *   opacity:0;                                                                                                        // 204
 * }                                                                                                                   // 205
 * ```                                                                                                                 // 206
 *                                                                                                                     // 207
 * The setup CSS class (in this case `.fade-add`) also has a transition style property, however, it                    // 208
 * has a duration of zero. This may not be required, however, incase the browser is unable to render                   // 209
 * the styling present in this CSS class instantly then it could be that the browser is attempting                     // 210
 * to perform an unnecessary transition.                                                                               // 211
 *                                                                                                                     // 212
 * This workaround, however, does not apply to  standard class-based transitions that are rendered                     // 213
 * when a CSS class containing a transition is applied to an element:                                                  // 214
 *                                                                                                                     // 215
 * ```css                                                                                                              // 216
 * /&#42; this works as expected &#42;/                                                                                // 217
 * .fade {                                                                                                             // 218
 *   transition:1s linear all;                                                                                         // 219
 *   opacity:0;                                                                                                        // 220
 * }                                                                                                                   // 221
 * ```                                                                                                                 // 222
 *                                                                                                                     // 223
 * Please keep this in mind when coding the CSS markup that will be used within class-based transitions.               // 224
 * Also, try not to mix the two class-based animation flavors together since the CSS code may become                   // 225
 * overly complex.                                                                                                     // 226
 *                                                                                                                     // 227
 *                                                                                                                     // 228
 * ### Preventing Collisions With Third Party Libraries                                                                // 229
 *                                                                                                                     // 230
 * Some third-party frameworks place animation duration defaults across many element or className                      // 231
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which            // 232
 * is expecting actual animations on these elements and has to wait for their completion.                              // 233
 *                                                                                                                     // 234
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:                             // 235
 *                                                                                                                     // 236
 * ```css                                                                                                              // 237
 * /&#42; prefixed with animate- &#42;/                                                                                // 238
 * .animate-fade-add.animate-fade-add-active {                                                                         // 239
 *   transition:1s linear all;                                                                                         // 240
 *   opacity:0;                                                                                                        // 241
 * }                                                                                                                   // 242
 * ```                                                                                                                 // 243
 *                                                                                                                     // 244
 * You then configure `$animate` to enforce this prefix:                                                               // 245
 *                                                                                                                     // 246
 * ```js                                                                                                               // 247
 * $animateProvider.classNameFilter(/animate-/);                                                                       // 248
 * ```                                                                                                                 // 249
 * </div>                                                                                                              // 250
 *                                                                                                                     // 251
 * ### CSS Staggering Animations                                                                                       // 252
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for      // 255
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an      // 256
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).         // 257
 *                                                                                                                     // 258
 * ```css                                                                                                              // 259
 * .my-animation.ng-enter {                                                                                            // 260
 *   /&#42; standard transition code &#42;/                                                                            // 261
 *   -webkit-transition: 1s linear all;                                                                                // 262
 *   transition: 1s linear all;                                                                                        // 263
 *   opacity:0;                                                                                                        // 264
 * }                                                                                                                   // 265
 * .my-animation.ng-enter-stagger {                                                                                    // 266
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/                                // 267
 *   -webkit-transition-delay: 0.1s;                                                                                   // 268
 *   transition-delay: 0.1s;                                                                                           // 269
 *                                                                                                                     // 270
 *   /&#42; in case the stagger doesn't work then these two values                                                     // 271
 *    must be set to 0 to avoid an accidental CSS inheritance &#42;/                                                   // 272
 *   -webkit-transition-duration: 0s;                                                                                  // 273
 *   transition-duration: 0s;                                                                                          // 274
 * }                                                                                                                   // 275
 * .my-animation.ng-enter.ng-enter-active {                                                                            // 276
 *   /&#42; standard transition styles &#42;/                                                                          // 277
 *   opacity:1;                                                                                                        // 278
 * }                                                                                                                   // 279
 * ```                                                                                                                 // 280
 *                                                                                                                     // 281
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if more than 10ms has passed after the last animation has been fired.                            // 285
 *                                                                                                                     // 286
 * The following code will issue the **ng-leave-stagger** event on the element provided:                               // 287
 *                                                                                                                     // 288
 * ```js                                                                                                               // 289
 * var kids = parent.children();                                                                                       // 290
 *                                                                                                                     // 291
 * $animate.leave(kids[0]); //stagger index=0                                                                          // 292
 * $animate.leave(kids[1]); //stagger index=1                                                                          // 293
 * $animate.leave(kids[2]); //stagger index=2                                                                          // 294
 * $animate.leave(kids[3]); //stagger index=3                                                                          // 295
 * $animate.leave(kids[4]); //stagger index=4                                                                          // 296
 *                                                                                                                     // 297
 * $timeout(function() {                                                                                               // 298
 *   //stagger has reset itself                                                                                        // 299
 *   $animate.leave(kids[5]); //stagger index=0                                                                        // 300
 *   $animate.leave(kids[6]); //stagger index=1                                                                        // 301
 * }, 100, false);                                                                                                     // 302
 * ```                                                                                                                 // 303
 *                                                                                                                     // 304
 * Stagger animations are currently only supported within CSS-defined animations.                                      // 305
 *                                                                                                                     // 306
 * ## JavaScript-defined Animations                                                                                    // 307
 * In the event that you do not want to use CSS3 transitions or CSS3 animations or if you wish to offer animations on browsers that do not
 * yet support CSS transitions/animations, then you can make use of JavaScript animations defined inside of your AngularJS module.
 *                                                                                                                     // 310
 * ```js                                                                                                               // 311
 * //!annotate="YourApp" Your AngularJS Module|Replace this or ngModule with the module that you used to define your application.
 * var ngModule = angular.module('YourApp', ['ngAnimate']);                                                            // 313
 * ngModule.animation('.my-crazy-animation', function() {                                                              // 314
 *   return {                                                                                                          // 315
 *     enter: function(element, done) {                                                                                // 316
 *       //run the animation here and call done when the animation is complete                                         // 317
 *       return function(cancelled) {                                                                                  // 318
 *         //this (optional) function will be called when the animation                                                // 319
 *         //completes or when the animation is cancelled (the cancelled                                               // 320
 *         //flag will be set to true if cancelled).                                                                   // 321
 *       };                                                                                                            // 322
 *     },                                                                                                              // 323
 *     leave: function(element, done) { },                                                                             // 324
 *     move: function(element, done) { },                                                                              // 325
 *                                                                                                                     // 326
 *     //animation that can be triggered before the class is added                                                     // 327
 *     beforeAddClass: function(element, className, done) { },                                                         // 328
 *                                                                                                                     // 329
 *     //animation that can be triggered after the class is added                                                      // 330
 *     addClass: function(element, className, done) { },                                                               // 331
 *                                                                                                                     // 332
 *     //animation that can be triggered before the class is removed                                                   // 333
 *     beforeRemoveClass: function(element, className, done) { },                                                      // 334
 *                                                                                                                     // 335
 *     //animation that can be triggered after the class is removed                                                    // 336
 *     removeClass: function(element, className, done) { }                                                             // 337
 *   };                                                                                                                // 338
 * });                                                                                                                 // 339
 * ```                                                                                                                 // 340
 *                                                                                                                     // 341
 * JavaScript-defined animations are created with a CSS-like class selector and a collection of events which are set to run
 * a javascript callback function. When an animation is triggered, $animate will look for a matching animation which fits
 * the element's CSS class attribute value and then run the matching animation event function (if found).              // 344
 * In other words, if the CSS classes present on the animated element match any of the JavaScript animations then the callback function will
 * be executed. It should be also noted that only simple, single class selectors are allowed (compound class selectors are not supported).
 *                                                                                                                     // 347
 * Within a JavaScript animation, an object containing various event callback animation functions is expected to be returned.
 * As explained above, these callbacks are triggered based on the animation event. Therefore if an enter animation is run,
 * and the JavaScript animation is found, then the enter callback will handle that animation (in addition to the CSS keyframe animation
 * or transition code that is defined via a stylesheet).                                                               // 351
 *                                                                                                                     // 352
 *                                                                                                                     // 353
 * ### Applying Directive-specific Styles to an Animation                                                              // 354
 * In some cases a directive or service may want to provide `$animate` with extra details that the animation will      // 355
 * include into its animation. Let's say for example we wanted to render an animation that animates an element         // 356
 * towards the mouse coordinates as to where the user clicked last. By collecting the X/Y coordinates of the click     // 357
 * (via the event parameter) we can set the `top` and `left` styles into an object and pass that into our function     // 358
 * call to `$animate.addClass`.                                                                                        // 359
 *                                                                                                                     // 360
 * ```js                                                                                                               // 361
 * canvas.on('click', function(e) {                                                                                    // 362
 *   $animate.addClass(element, 'on', {                                                                                // 363
 *     to: {                                                                                                           // 364
 *       left : e.client.x + 'px',                                                                                     // 365
 *       top : e.client.y + 'px'                                                                                       // 366
 *     }                                                                                                               // 367
 *   }):                                                                                                               // 368
 * });                                                                                                                 // 369
 * ```                                                                                                                 // 370
 *                                                                                                                     // 371
 * Now when the animation runs, and a transition or keyframe animation is picked up, then the animation itself will    // 372
 * also include and transition the styling of the `left` and `top` properties into its running animation. If we want   // 373
 * to provide some starting animation values then we can do so by placing the starting animations styles into an object
 * called `from` in the same object as the `to` animations.                                                            // 375
 *                                                                                                                     // 376
 * ```js                                                                                                               // 377
 * canvas.on('click', function(e) {                                                                                    // 378
 *   $animate.addClass(element, 'on', {                                                                                // 379
 *     from: {                                                                                                         // 380
 *        position: 'absolute',                                                                                        // 381
 *        left: '0px',                                                                                                 // 382
 *        top: '0px'                                                                                                   // 383
 *     },                                                                                                              // 384
 *     to: {                                                                                                           // 385
 *       left : e.client.x + 'px',                                                                                     // 386
 *       top : e.client.y + 'px'                                                                                       // 387
 *     }                                                                                                               // 388
 *   }):                                                                                                               // 389
 * });                                                                                                                 // 390
 * ```                                                                                                                 // 391
 *                                                                                                                     // 392
 * Once the animation is complete or cancelled then the union of both the before and after styles are applied to the   // 393
 * element. If `ngAnimate` is not present then the styles will be applied immediately.                                 // 394
 *                                                                                                                     // 395
 */                                                                                                                    // 396
                                                                                                                       // 397
angular.module('ngAnimate', ['ng'])                                                                                    // 398
                                                                                                                       // 399
  /**                                                                                                                  // 400
   * @ngdoc provider                                                                                                   // 401
   * @name $animateProvider                                                                                            // 402
   * @description                                                                                                      // 403
   *                                                                                                                   // 404
   * The `$animateProvider` allows developers to register JavaScript animation event handlers directly inside of a module.
   * When an animation is triggered, the $animate service will query the $animate service to find any animations that match
   * the provided name value.                                                                                          // 407
   *                                                                                                                   // 408
   * Requires the {@link ngAnimate `ngAnimate`} module to be installed.                                                // 409
   *                                                                                                                   // 410
   * Please visit the {@link ngAnimate `ngAnimate`} module overview page learn more about how to use animations in your application.
   *                                                                                                                   // 412
   */                                                                                                                  // 413
  .directive('ngAnimateChildren', function() {                                                                         // 414
    var NG_ANIMATE_CHILDREN = '$$ngAnimateChildren';                                                                   // 415
    return function(scope, element, attrs) {                                                                           // 416
      var val = attrs.ngAnimateChildren;                                                                               // 417
      if (angular.isString(val) && val.length === 0) { //empty attribute                                               // 418
        element.data(NG_ANIMATE_CHILDREN, true);                                                                       // 419
      } else {                                                                                                         // 420
        scope.$watch(val, function(value) {                                                                            // 421
          element.data(NG_ANIMATE_CHILDREN, !!value);                                                                  // 422
        });                                                                                                            // 423
      }                                                                                                                // 424
    };                                                                                                                 // 425
  })                                                                                                                   // 426
                                                                                                                       // 427
  //this private service is only used within CSS-enabled animations                                                    // 428
  //IE8 + IE9 do not support rAF natively, but that is fine since they                                                 // 429
  //also don't support transitions and keyframes which means that the code                                             // 430
  //below will never be used by the two browsers.                                                                      // 431
  .factory('$$animateReflow', ['$$rAF', '$document', function($$rAF, $document) {                                      // 432
    var bod = $document[0].body;                                                                                       // 433
    return function(fn) {                                                                                              // 434
      //the returned function acts as the cancellation function                                                        // 435
      return $$rAF(function() {                                                                                        // 436
        //the line below will force the browser to perform a repaint                                                   // 437
        //so that all the animated elements within the animation frame                                                 // 438
        //will be properly updated and drawn on screen. This is                                                        // 439
        //required to perform multi-class CSS based animations with                                                    // 440
        //Firefox. DO NOT REMOVE THIS LINE.                                                                            // 441
        var a = bod.offsetWidth + 1;                                                                                   // 442
        fn();                                                                                                          // 443
      });                                                                                                              // 444
    };                                                                                                                 // 445
  }])                                                                                                                  // 446
                                                                                                                       // 447
  .config(['$provide', '$animateProvider', function($provide, $animateProvider) {                                      // 448
    var noop = angular.noop;                                                                                           // 449
    var forEach = angular.forEach;                                                                                     // 450
    var selectors = $animateProvider.$$selectors;                                                                      // 451
    var isArray = angular.isArray;                                                                                     // 452
    var isString = angular.isString;                                                                                   // 453
    var isObject = angular.isObject;                                                                                   // 454
                                                                                                                       // 455
    var ELEMENT_NODE = 1;                                                                                              // 456
    var NG_ANIMATE_STATE = '$$ngAnimateState';                                                                         // 457
    var NG_ANIMATE_CHILDREN = '$$ngAnimateChildren';                                                                   // 458
    var NG_ANIMATE_CLASS_NAME = 'ng-animate';                                                                          // 459
    var rootAnimateState = {running: true};                                                                            // 460
                                                                                                                       // 461
    function extractElementNode(element) {                                                                             // 462
      for (var i = 0; i < element.length; i++) {                                                                       // 463
        var elm = element[i];                                                                                          // 464
        if (elm.nodeType == ELEMENT_NODE) {                                                                            // 465
          return elm;                                                                                                  // 466
        }                                                                                                              // 467
      }                                                                                                                // 468
    }                                                                                                                  // 469
                                                                                                                       // 470
    function prepareElement(element) {                                                                                 // 471
      return element && angular.element(element);                                                                      // 472
    }                                                                                                                  // 473
                                                                                                                       // 474
    function stripCommentsFromElement(element) {                                                                       // 475
      return angular.element(extractElementNode(element));                                                             // 476
    }                                                                                                                  // 477
                                                                                                                       // 478
    function isMatchingElement(elm1, elm2) {                                                                           // 479
      return extractElementNode(elm1) == extractElementNode(elm2);                                                     // 480
    }                                                                                                                  // 481
    var $$jqLite;                                                                                                      // 482
    $provide.decorator('$animate',                                                                                     // 483
        ['$delegate', '$$q', '$injector', '$sniffer', '$rootElement', '$$asyncCallback', '$rootScope', '$document', '$templateRequest', '$$jqLite',
 function($delegate,   $$q,   $injector,   $sniffer,   $rootElement,   $$asyncCallback,   $rootScope,   $document,   $templateRequest,   $$$jqLite) {
                                                                                                                       // 486
      $$jqLite = $$$jqLite;                                                                                            // 487
      $rootElement.data(NG_ANIMATE_STATE, rootAnimateState);                                                           // 488
                                                                                                                       // 489
      // Wait until all directive and route-related templates are downloaded and                                       // 490
      // compiled. The $templateRequest.totalPendingRequests variable keeps track of                                   // 491
      // all of the remote templates being currently downloaded. If there are no                                       // 492
      // templates currently downloading then the watcher will still fire anyway.                                      // 493
      var deregisterWatch = $rootScope.$watch(                                                                         // 494
        function() { return $templateRequest.totalPendingRequests; },                                                  // 495
        function(val, oldVal) {                                                                                        // 496
          if (val !== 0) return;                                                                                       // 497
          deregisterWatch();                                                                                           // 498
                                                                                                                       // 499
          // Now that all templates have been downloaded, $animate will wait until                                     // 500
          // the post digest queue is empty before enabling animations. By having two                                  // 501
          // calls to $postDigest calls we can ensure that the flag is enabled at the                                  // 502
          // very end of the post digest queue. Since all of the animations in $animate                                // 503
          // use $postDigest, it's important that the code below executes at the end.                                  // 504
          // This basically means that the page is fully downloaded and compiled before                                // 505
          // any animations are triggered.                                                                             // 506
          $rootScope.$$postDigest(function() {                                                                         // 507
            $rootScope.$$postDigest(function() {                                                                       // 508
              rootAnimateState.running = false;                                                                        // 509
            });                                                                                                        // 510
          });                                                                                                          // 511
        }                                                                                                              // 512
      );                                                                                                               // 513
                                                                                                                       // 514
      var globalAnimationCounter = 0;                                                                                  // 515
      var classNameFilter = $animateProvider.classNameFilter();                                                        // 516
      var isAnimatableClassName = !classNameFilter                                                                     // 517
              ? function() { return true; }                                                                            // 518
              : function(className) {                                                                                  // 519
                return classNameFilter.test(className);                                                                // 520
              };                                                                                                       // 521
                                                                                                                       // 522
      function classBasedAnimationsBlocked(element, setter) {                                                          // 523
        var data = element.data(NG_ANIMATE_STATE) || {};                                                               // 524
        if (setter) {                                                                                                  // 525
          data.running = true;                                                                                         // 526
          data.structural = true;                                                                                      // 527
          element.data(NG_ANIMATE_STATE, data);                                                                        // 528
        }                                                                                                              // 529
        return data.disabled || (data.running && data.structural);                                                     // 530
      }                                                                                                                // 531
                                                                                                                       // 532
      function runAnimationPostDigest(fn) {                                                                            // 533
        var cancelFn, defer = $$q.defer();                                                                             // 534
        defer.promise.$$cancelFn = function() {                                                                        // 535
          cancelFn && cancelFn();                                                                                      // 536
        };                                                                                                             // 537
        $rootScope.$$postDigest(function() {                                                                           // 538
          cancelFn = fn(function() {                                                                                   // 539
            defer.resolve();                                                                                           // 540
          });                                                                                                          // 541
        });                                                                                                            // 542
        return defer.promise;                                                                                          // 543
      }                                                                                                                // 544
                                                                                                                       // 545
      function parseAnimateOptions(options) {                                                                          // 546
        // some plugin code may still be passing in the callback                                                       // 547
        // function as the last param for the $animate methods so                                                      // 548
        // it's best to only allow string or array values for now                                                      // 549
        if (isObject(options)) {                                                                                       // 550
          if (options.tempClasses && isString(options.tempClasses)) {                                                  // 551
            options.tempClasses = options.tempClasses.split(/\s+/);                                                    // 552
          }                                                                                                            // 553
          return options;                                                                                              // 554
        }                                                                                                              // 555
      }                                                                                                                // 556
                                                                                                                       // 557
      function resolveElementClasses(element, cache, runningAnimations) {                                              // 558
        runningAnimations = runningAnimations || {};                                                                   // 559
                                                                                                                       // 560
        var lookup = {};                                                                                               // 561
        forEach(runningAnimations, function(data, selector) {                                                          // 562
          forEach(selector.split(' '), function(s) {                                                                   // 563
            lookup[s]=data;                                                                                            // 564
          });                                                                                                          // 565
        });                                                                                                            // 566
                                                                                                                       // 567
        var hasClasses = Object.create(null);                                                                          // 568
        forEach((element.attr('class') || '').split(/\s+/), function(className) {                                      // 569
          hasClasses[className] = true;                                                                                // 570
        });                                                                                                            // 571
                                                                                                                       // 572
        var toAdd = [], toRemove = [];                                                                                 // 573
        forEach((cache && cache.classes) || [], function(status, className) {                                          // 574
          var hasClass = hasClasses[className];                                                                        // 575
          var matchingAnimation = lookup[className] || {};                                                             // 576
                                                                                                                       // 577
          // When addClass and removeClass is called then $animate will check to                                       // 578
          // see if addClass and removeClass cancel each other out. When there are                                     // 579
          // more calls to removeClass than addClass then the count falls below 0                                      // 580
          // and then the removeClass animation will be allowed. Otherwise if the                                      // 581
          // count is above 0 then that means an addClass animation will commence.                                     // 582
          // Once an animation is allowed then the code will also check to see if                                      // 583
          // there exists any on-going animation that is already adding or remvoing                                    // 584
          // the matching CSS class.                                                                                   // 585
          if (status === false) {                                                                                      // 586
            //does it have the class or will it have the class                                                         // 587
            if (hasClass || matchingAnimation.event == 'addClass') {                                                   // 588
              toRemove.push(className);                                                                                // 589
            }                                                                                                          // 590
          } else if (status === true) {                                                                                // 591
            //is the class missing or will it be removed?                                                              // 592
            if (!hasClass || matchingAnimation.event == 'removeClass') {                                               // 593
              toAdd.push(className);                                                                                   // 594
            }                                                                                                          // 595
          }                                                                                                            // 596
        });                                                                                                            // 597
                                                                                                                       // 598
        return (toAdd.length + toRemove.length) > 0 && [toAdd.join(' '), toRemove.join(' ')];                          // 599
      }                                                                                                                // 600
                                                                                                                       // 601
      function lookup(name) {                                                                                          // 602
        if (name) {                                                                                                    // 603
          var matches = [],                                                                                            // 604
              flagMap = {},                                                                                            // 605
              classes = name.substr(1).split('.');                                                                     // 606
                                                                                                                       // 607
          //the empty string value is the default animation                                                            // 608
          //operation which performs CSS transition and keyframe                                                       // 609
          //animations sniffing. This is always included for each                                                      // 610
          //element animation procedure if the browser supports                                                        // 611
          //transitions and/or keyframe animations. The default                                                        // 612
          //animation is added to the top of the list to prevent                                                       // 613
          //any previous animations from affecting the element styling                                                 // 614
          //prior to the element being animated.                                                                       // 615
          if ($sniffer.transitions || $sniffer.animations) {                                                           // 616
            matches.push($injector.get(selectors['']));                                                                // 617
          }                                                                                                            // 618
                                                                                                                       // 619
          for (var i=0; i < classes.length; i++) {                                                                     // 620
            var klass = classes[i],                                                                                    // 621
                selectorFactoryName = selectors[klass];                                                                // 622
            if (selectorFactoryName && !flagMap[klass]) {                                                              // 623
              matches.push($injector.get(selectorFactoryName));                                                        // 624
              flagMap[klass] = true;                                                                                   // 625
            }                                                                                                          // 626
          }                                                                                                            // 627
          return matches;                                                                                              // 628
        }                                                                                                              // 629
      }                                                                                                                // 630
                                                                                                                       // 631
      function animationRunner(element, animationEvent, className, options) {                                          // 632
        //transcluded directives may sometimes fire an animation using only comment nodes                              // 633
        //best to catch this early on to prevent any animation operations from occurring                               // 634
        var node = element[0];                                                                                         // 635
        if (!node) {                                                                                                   // 636
          return;                                                                                                      // 637
        }                                                                                                              // 638
                                                                                                                       // 639
        if (options) {                                                                                                 // 640
          options.to = options.to || {};                                                                               // 641
          options.from = options.from || {};                                                                           // 642
        }                                                                                                              // 643
                                                                                                                       // 644
        var classNameAdd;                                                                                              // 645
        var classNameRemove;                                                                                           // 646
        if (isArray(className)) {                                                                                      // 647
          classNameAdd = className[0];                                                                                 // 648
          classNameRemove = className[1];                                                                              // 649
          if (!classNameAdd) {                                                                                         // 650
            className = classNameRemove;                                                                               // 651
            animationEvent = 'removeClass';                                                                            // 652
          } else if (!classNameRemove) {                                                                               // 653
            className = classNameAdd;                                                                                  // 654
            animationEvent = 'addClass';                                                                               // 655
          } else {                                                                                                     // 656
            className = classNameAdd + ' ' + classNameRemove;                                                          // 657
          }                                                                                                            // 658
        }                                                                                                              // 659
                                                                                                                       // 660
        var isSetClassOperation = animationEvent == 'setClass';                                                        // 661
        var isClassBased = isSetClassOperation                                                                         // 662
                           || animationEvent == 'addClass'                                                             // 663
                           || animationEvent == 'removeClass'                                                          // 664
                           || animationEvent == 'animate';                                                             // 665
                                                                                                                       // 666
        var currentClassName = element.attr('class');                                                                  // 667
        var classes = currentClassName + ' ' + className;                                                              // 668
        if (!isAnimatableClassName(classes)) {                                                                         // 669
          return;                                                                                                      // 670
        }                                                                                                              // 671
                                                                                                                       // 672
        var beforeComplete = noop,                                                                                     // 673
            beforeCancel = [],                                                                                         // 674
            before = [],                                                                                               // 675
            afterComplete = noop,                                                                                      // 676
            afterCancel = [],                                                                                          // 677
            after = [];                                                                                                // 678
                                                                                                                       // 679
        var animationLookup = (' ' + classes).replace(/\s+/g,'.');                                                     // 680
        forEach(lookup(animationLookup), function(animationFactory) {                                                  // 681
          var created = registerAnimation(animationFactory, animationEvent);                                           // 682
          if (!created && isSetClassOperation) {                                                                       // 683
            registerAnimation(animationFactory, 'addClass');                                                           // 684
            registerAnimation(animationFactory, 'removeClass');                                                        // 685
          }                                                                                                            // 686
        });                                                                                                            // 687
                                                                                                                       // 688
        function registerAnimation(animationFactory, event) {                                                          // 689
          var afterFn = animationFactory[event];                                                                       // 690
          var beforeFn = animationFactory['before' + event.charAt(0).toUpperCase() + event.substr(1)];                 // 691
          if (afterFn || beforeFn) {                                                                                   // 692
            if (event == 'leave') {                                                                                    // 693
              beforeFn = afterFn;                                                                                      // 694
              //when set as null then animation knows to skip this phase                                               // 695
              afterFn = null;                                                                                          // 696
            }                                                                                                          // 697
            after.push({                                                                                               // 698
              event: event, fn: afterFn                                                                                // 699
            });                                                                                                        // 700
            before.push({                                                                                              // 701
              event: event, fn: beforeFn                                                                               // 702
            });                                                                                                        // 703
            return true;                                                                                               // 704
          }                                                                                                            // 705
        }                                                                                                              // 706
                                                                                                                       // 707
        function run(fns, cancellations, allCompleteFn) {                                                              // 708
          var animations = [];                                                                                         // 709
          forEach(fns, function(animation) {                                                                           // 710
            animation.fn && animations.push(animation);                                                                // 711
          });                                                                                                          // 712
                                                                                                                       // 713
          var count = 0;                                                                                               // 714
          function afterAnimationComplete(index) {                                                                     // 715
            if (cancellations) {                                                                                       // 716
              (cancellations[index] || noop)();                                                                        // 717
              if (++count < animations.length) return;                                                                 // 718
              cancellations = null;                                                                                    // 719
            }                                                                                                          // 720
            allCompleteFn();                                                                                           // 721
          }                                                                                                            // 722
                                                                                                                       // 723
          //The code below adds directly to the array in order to work with                                            // 724
          //both sync and async animations. Sync animations are when the done()                                        // 725
          //operation is called right away. DO NOT REFACTOR!                                                           // 726
          forEach(animations, function(animation, index) {                                                             // 727
            var progress = function() {                                                                                // 728
              afterAnimationComplete(index);                                                                           // 729
            };                                                                                                         // 730
            switch (animation.event) {                                                                                 // 731
              case 'setClass':                                                                                         // 732
                cancellations.push(animation.fn(element, classNameAdd, classNameRemove, progress, options));           // 733
                break;                                                                                                 // 734
              case 'animate':                                                                                          // 735
                cancellations.push(animation.fn(element, className, options.from, options.to, progress));              // 736
                break;                                                                                                 // 737
              case 'addClass':                                                                                         // 738
                cancellations.push(animation.fn(element, classNameAdd || className,     progress, options));           // 739
                break;                                                                                                 // 740
              case 'removeClass':                                                                                      // 741
                cancellations.push(animation.fn(element, classNameRemove || className,  progress, options));           // 742
                break;                                                                                                 // 743
              default:                                                                                                 // 744
                cancellations.push(animation.fn(element, progress, options));                                          // 745
                break;                                                                                                 // 746
            }                                                                                                          // 747
          });                                                                                                          // 748
                                                                                                                       // 749
          if (cancellations && cancellations.length === 0) {                                                           // 750
            allCompleteFn();                                                                                           // 751
          }                                                                                                            // 752
        }                                                                                                              // 753
                                                                                                                       // 754
        return {                                                                                                       // 755
          node: node,                                                                                                  // 756
          event: animationEvent,                                                                                       // 757
          className: className,                                                                                        // 758
          isClassBased: isClassBased,                                                                                  // 759
          isSetClassOperation: isSetClassOperation,                                                                    // 760
          applyStyles: function() {                                                                                    // 761
            if (options) {                                                                                             // 762
              element.css(angular.extend(options.from || {}, options.to || {}));                                       // 763
            }                                                                                                          // 764
          },                                                                                                           // 765
          before: function(allCompleteFn) {                                                                            // 766
            beforeComplete = allCompleteFn;                                                                            // 767
            run(before, beforeCancel, function() {                                                                     // 768
              beforeComplete = noop;                                                                                   // 769
              allCompleteFn();                                                                                         // 770
            });                                                                                                        // 771
          },                                                                                                           // 772
          after: function(allCompleteFn) {                                                                             // 773
            afterComplete = allCompleteFn;                                                                             // 774
            run(after, afterCancel, function() {                                                                       // 775
              afterComplete = noop;                                                                                    // 776
              allCompleteFn();                                                                                         // 777
            });                                                                                                        // 778
          },                                                                                                           // 779
          cancel: function() {                                                                                         // 780
            if (beforeCancel) {                                                                                        // 781
              forEach(beforeCancel, function(cancelFn) {                                                               // 782
                (cancelFn || noop)(true);                                                                              // 783
              });                                                                                                      // 784
              beforeComplete(true);                                                                                    // 785
            }                                                                                                          // 786
            if (afterCancel) {                                                                                         // 787
              forEach(afterCancel, function(cancelFn) {                                                                // 788
                (cancelFn || noop)(true);                                                                              // 789
              });                                                                                                      // 790
              afterComplete(true);                                                                                     // 791
            }                                                                                                          // 792
          }                                                                                                            // 793
        };                                                                                                             // 794
      }                                                                                                                // 795
                                                                                                                       // 796
      /**                                                                                                              // 797
       * @ngdoc service                                                                                                // 798
       * @name $animate                                                                                                // 799
       * @kind object                                                                                                  // 800
       *                                                                                                               // 801
       * @description                                                                                                  // 802
       * The `$animate` service provides animation detection support while performing DOM operations (enter, leave and move) as well as during addClass and removeClass operations.
       * When any of these operations are run, the $animate service                                                    // 804
       * will examine any JavaScript-defined animations (which are defined by using the $animateProvider provider object)
       * as well as any CSS-defined animations against the CSS classes present on the element once the DOM operation is run.
       *                                                                                                               // 807
       * The `$animate` service is used behind the scenes with pre-existing directives and animation with these directives
       * will work out of the box without any extra configuration.                                                     // 809
       *                                                                                                               // 810
       * Requires the {@link ngAnimate `ngAnimate`} module to be installed.                                            // 811
       *                                                                                                               // 812
       * Please visit the {@link ngAnimate `ngAnimate`} module overview page learn more about how to use animations in your application.
       * ## Callback Promises                                                                                          // 814
       * With AngularJS 1.3, each of the animation methods, on the `$animate` service, return a promise when called. The
       * promise itself is then resolved once the animation has completed itself, has been cancelled or has been       // 816
       * skipped due to animations being disabled. (Note that even if the animation is cancelled it will still         // 817
       * call the resolve function of the animation.)                                                                  // 818
       *                                                                                                               // 819
       * ```js                                                                                                         // 820
       * $animate.enter(element, container).then(function() {                                                          // 821
       *   //...this is called once the animation is complete...                                                       // 822
       * });                                                                                                           // 823
       * ```                                                                                                           // 824
       *                                                                                                               // 825
       * Also note that, due to the nature of the callback promise, if any Angular-specific code (like changing the scope,
       * location of the page, etc...) is executed within the callback promise then be sure to wrap the code using     // 827
       * `$scope.$apply(...)`;                                                                                         // 828
       *                                                                                                               // 829
       * ```js                                                                                                         // 830
       * $animate.leave(element).then(function() {                                                                     // 831
       *   $scope.$apply(function() {                                                                                  // 832
       *     $location.path('/new-page');                                                                              // 833
       *   });                                                                                                         // 834
       * });                                                                                                           // 835
       * ```                                                                                                           // 836
       *                                                                                                               // 837
       * An animation can also be cancelled by calling the `$animate.cancel(promise)` method with the provided         // 838
       * promise that was returned when the animation was started.                                                     // 839
       *                                                                                                               // 840
       * ```js                                                                                                         // 841
       * var promise = $animate.addClass(element, 'super-long-animation');                                             // 842
       * promise.then(function() {                                                                                     // 843
       *   //this will still be called even if cancelled                                                               // 844
       * });                                                                                                           // 845
       *                                                                                                               // 846
       * element.on('click', function() {                                                                              // 847
       *   //tooo lazy to wait for the animation to end                                                                // 848
       *   $animate.cancel(promise);                                                                                   // 849
       * });                                                                                                           // 850
       * ```                                                                                                           // 851
       *                                                                                                               // 852
       * (Keep in mind that the promise cancellation is unique to `$animate` since promises in                         // 853
       * general cannot be cancelled.)                                                                                 // 854
       *                                                                                                               // 855
       */                                                                                                              // 856
      return {                                                                                                         // 857
        /**                                                                                                            // 858
         * @ngdoc method                                                                                               // 859
         * @name $animate#animate                                                                                      // 860
         * @kind function                                                                                              // 861
         *                                                                                                             // 862
         * @description                                                                                                // 863
         * Performs an inline animation on the element which applies the provided `to` and `from` CSS styles to the element.
         * If any detected CSS transition, keyframe or JavaScript matches the provided `className` value then the animation
         * will take on the provided styles. For example, if a transition animation is set for the given className then the
         * provided `from` and `to` styles will be applied alongside the given transition. If a JavaScript animation is
         * detected then the provided styles will be given in as function paramters.                                   // 868
         *                                                                                                             // 869
         * ```js                                                                                                       // 870
         * ngModule.animation('.my-inline-animation', function() {                                                     // 871
         *   return {                                                                                                  // 872
         *     animate : function(element, className, from, to, done) {                                                // 873
         *       //styles                                                                                              // 874
         *     }                                                                                                       // 875
         *   }                                                                                                         // 876
         * });                                                                                                         // 877
         * ```                                                                                                         // 878
         *                                                                                                             // 879
         * Below is a breakdown of each step that occurs during the `animate` animation:                               // 880
         *                                                                                                             // 881
         * | Animation Step                                                                                                        | What the element class attribute looks like                  |
         * |-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
         * | 1. `$animate.animate(...)` is called                                                                                  | `class="my-animation"`                                       |
         * | 2. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                            |
         * | 3. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                            |
         * | 4. the `className` class value is added to the element                                                                | `class="my-animation ng-animate className"`                  |
         * | 5. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate className"`                  |
         * | 6. `$animate` blocks all CSS transitions on the element to ensure the `.className` class styling is applied right away| `class="my-animation ng-animate className"`                  |
         * | 7. `$animate` applies the provided collection of `from` CSS styles to the element                                     | `class="my-animation ng-animate className"`                  |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate className"`                  |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate className"`                  |
         * | 10. the `className-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate className className-active"` |
         * | 11. `$animate` applies the collection of `to` CSS styles to the element which are then handled by the transition      | `class="my-animation ng-animate className className-active"` |
         * | 12. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate className className-active"` |
         * | 13. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                       |
         * | 14. The returned promise is resolved.                                                                                 | `class="my-animation"`                                       |
         *                                                                                                             // 898
         * @param {DOMElement} element the element that will be the focus of the enter animation                       // 899
         * @param {object} from a collection of CSS styles that will be applied to the element at the start of the animation
         * @param {object} to a collection of CSS styles that the element will animate towards                         // 901
         * @param {string=} className an optional CSS class that will be added to the element for the duration of the animation (the default class is `ng-inline-animate`)
         * @param {object=} options an optional collection of options that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 904
        */                                                                                                             // 905
        animate: function(element, from, to, className, options) {                                                     // 906
          className = className || 'ng-inline-animate';                                                                // 907
          options = parseAnimateOptions(options) || {};                                                                // 908
          options.from = to ? from : null;                                                                             // 909
          options.to   = to ? to : from;                                                                               // 910
                                                                                                                       // 911
          return runAnimationPostDigest(function(done) {                                                               // 912
            return performAnimation('animate', className, stripCommentsFromElement(element), null, null, noop, options, done);
          });                                                                                                          // 914
        },                                                                                                             // 915
                                                                                                                       // 916
        /**                                                                                                            // 917
         * @ngdoc method                                                                                               // 918
         * @name $animate#enter                                                                                        // 919
         * @kind function                                                                                              // 920
         *                                                                                                             // 921
         * @description                                                                                                // 922
         * Appends the element to the parentElement element that resides in the document and then runs the enter animation. Once
         * the animation is started, the following CSS classes will be present on the element for the duration of the animation:
         *                                                                                                             // 925
         * Below is a breakdown of each step that occurs during enter animation:                                       // 926
         *                                                                                                             // 927
         * | Animation Step                                                                                                        | What the element class attribute looks like                |
         * |-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
         * | 1. `$animate.enter(...)` is called                                                                                    | `class="my-animation"`                                     |
         * | 2. element is inserted into the `parentElement` element or beside the `afterElement` element                          | `class="my-animation"`                                     |
         * | 3. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                          |
         * | 4. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                          |
         * | 5. the `.ng-enter` class is added to the element                                                                      | `class="my-animation ng-animate ng-enter"`                 |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate ng-enter"`                 |
         * | 7. `$animate` blocks all CSS transitions on the element to ensure the `.ng-enter` class styling is applied right away | `class="my-animation ng-animate ng-enter"`                 |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate ng-enter"`                 |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate ng-enter"`                 |
         * | 10. the `.ng-enter-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate ng-enter ng-enter-active"` |
         * | 11. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate ng-enter ng-enter-active"` |
         * | 12. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                     |
         * | 13. The returned promise is resolved.                                                                                 | `class="my-animation"`                                     |
         *                                                                                                             // 943
         * @param {DOMElement} element the element that will be the focus of the enter animation                       // 944
         * @param {DOMElement} parentElement the parent element of the element that will be the focus of the enter animation
         * @param {DOMElement} afterElement the sibling element (which is the previous element) of the element that will be the focus of the enter animation
         * @param {object=} options an optional collection of options that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 948
        */                                                                                                             // 949
        enter: function(element, parentElement, afterElement, options) {                                               // 950
          options = parseAnimateOptions(options);                                                                      // 951
          element = angular.element(element);                                                                          // 952
          parentElement = prepareElement(parentElement);                                                               // 953
          afterElement = prepareElement(afterElement);                                                                 // 954
                                                                                                                       // 955
          classBasedAnimationsBlocked(element, true);                                                                  // 956
          $delegate.enter(element, parentElement, afterElement);                                                       // 957
          return runAnimationPostDigest(function(done) {                                                               // 958
            return performAnimation('enter', 'ng-enter', stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
          });                                                                                                          // 960
        },                                                                                                             // 961
                                                                                                                       // 962
        /**                                                                                                            // 963
         * @ngdoc method                                                                                               // 964
         * @name $animate#leave                                                                                        // 965
         * @kind function                                                                                              // 966
         *                                                                                                             // 967
         * @description                                                                                                // 968
         * Runs the leave animation operation and, upon completion, removes the element from the DOM. Once             // 969
         * the animation is started, the following CSS classes will be added for the duration of the animation:        // 970
         *                                                                                                             // 971
         * Below is a breakdown of each step that occurs during leave animation:                                       // 972
         *                                                                                                             // 973
         * | Animation Step                                                                                                        | What the element class attribute looks like                |
         * |-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
         * | 1. `$animate.leave(...)` is called                                                                                    | `class="my-animation"`                                     |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                          |
         * | 3. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                          |
         * | 4. the `.ng-leave` class is added to the element                                                                      | `class="my-animation ng-animate ng-leave"`                 |
         * | 5. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate ng-leave"`                 |
         * | 6. `$animate` blocks all CSS transitions on the element to ensure the `.ng-leave` class styling is applied right away | `class="my-animation ng-animate ng-leave"`                 |
         * | 7. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate ng-leave"`                 |
         * | 8. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate ng-leave"`                 |
         * | 9. the `.ng-leave-active` class is added (this triggers the CSS transition/animation)                                 | `class="my-animation ng-animate ng-leave ng-leave-active"` |
         * | 10. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate ng-leave ng-leave-active"` |
         * | 11. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                     |
         * | 12. The element is removed from the DOM                                                                               | ...                                                        |
         * | 13. The returned promise is resolved.                                                                                 | ...                                                        |
         *                                                                                                             // 989
         * @param {DOMElement} element the element that will be the focus of the leave animation                       // 990
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 992
        */                                                                                                             // 993
        leave: function(element, options) {                                                                            // 994
          options = parseAnimateOptions(options);                                                                      // 995
          element = angular.element(element);                                                                          // 996
                                                                                                                       // 997
          cancelChildAnimations(element);                                                                              // 998
          classBasedAnimationsBlocked(element, true);                                                                  // 999
          return runAnimationPostDigest(function(done) {                                                               // 1000
            return performAnimation('leave', 'ng-leave', stripCommentsFromElement(element), null, null, function() {   // 1001
              $delegate.leave(element);                                                                                // 1002
            }, options, done);                                                                                         // 1003
          });                                                                                                          // 1004
        },                                                                                                             // 1005
                                                                                                                       // 1006
        /**                                                                                                            // 1007
         * @ngdoc method                                                                                               // 1008
         * @name $animate#move                                                                                         // 1009
         * @kind function                                                                                              // 1010
         *                                                                                                             // 1011
         * @description                                                                                                // 1012
         * Fires the move DOM operation. Just before the animation starts, the animate service will either append it into the parentElement container or
         * add the element directly after the afterElement element if present. Then the move animation will be run. Once
         * the animation is started, the following CSS classes will be added for the duration of the animation:        // 1015
         *                                                                                                             // 1016
         * Below is a breakdown of each step that occurs during move animation:                                        // 1017
         *                                                                                                             // 1018
         * | Animation Step                                                                                                       | What the element class attribute looks like              |
         * |----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
         * | 1. `$animate.move(...)` is called                                                                                    | `class="my-animation"`                                   |
         * | 2. element is moved into the parentElement element or beside the afterElement element                                | `class="my-animation"`                                   |
         * | 3. `$animate` waits for the next digest to start the animation                                                       | `class="my-animation ng-animate"`                        |
         * | 4. `$animate` runs the JavaScript-defined animations detected on the element                                         | `class="my-animation ng-animate"`                        |
         * | 5. the `.ng-move` class is added to the element                                                                      | `class="my-animation ng-animate ng-move"`                |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                        | `class="my-animation ng-animate ng-move"`                |
         * | 7. `$animate` blocks all CSS transitions on the element to ensure the `.ng-move` class styling is applied right away | `class="my-animation ng-animate ng-move"`                |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                            | `class="my-animation ng-animate ng-move"`                |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                 | `class="my-animation ng-animate ng-move"`                |
         * | 10. the `.ng-move-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate ng-move ng-move-active"` |
         * | 11. `$animate` waits for the animation to complete (via events and timeout)                                          | `class="my-animation ng-animate ng-move ng-move-active"` |
         * | 12. The animation ends and all generated CSS classes are removed from the element                                    | `class="my-animation"`                                   |
         * | 13. The returned promise is resolved.                                                                                | `class="my-animation"`                                   |
         *                                                                                                             // 1034
         * @param {DOMElement} element the element that will be the focus of the move animation                        // 1035
         * @param {DOMElement} parentElement the parentElement element of the element that will be the focus of the move animation
         * @param {DOMElement} afterElement the sibling element (which is the previous element) of the element that will be the focus of the move animation
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 1039
        */                                                                                                             // 1040
        move: function(element, parentElement, afterElement, options) {                                                // 1041
          options = parseAnimateOptions(options);                                                                      // 1042
          element = angular.element(element);                                                                          // 1043
          parentElement = prepareElement(parentElement);                                                               // 1044
          afterElement = prepareElement(afterElement);                                                                 // 1045
                                                                                                                       // 1046
          cancelChildAnimations(element);                                                                              // 1047
          classBasedAnimationsBlocked(element, true);                                                                  // 1048
          $delegate.move(element, parentElement, afterElement);                                                        // 1049
          return runAnimationPostDigest(function(done) {                                                               // 1050
            return performAnimation('move', 'ng-move', stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
          });                                                                                                          // 1052
        },                                                                                                             // 1053
                                                                                                                       // 1054
        /**                                                                                                            // 1055
         * @ngdoc method                                                                                               // 1056
         * @name $animate#addClass                                                                                     // 1057
         *                                                                                                             // 1058
         * @description                                                                                                // 1059
         * Triggers a custom animation event based off the className variable and then attaches the className value to the element as a CSS class.
         * Unlike the other animation methods, the animate service will suffix the className value with {@type -add} in order to provide
         * the animate service the setup and active CSS classes in order to trigger the animation (this will be skipped if no CSS transitions
         * or keyframes are defined on the -add-active or base CSS class).                                             // 1063
         *                                                                                                             // 1064
         * Below is a breakdown of each step that occurs during addClass animation:                                    // 1065
         *                                                                                                             // 1066
         * | Animation Step                                                                                         | What the element class attribute looks like                        |
         * |--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
         * | 1. `$animate.addClass(element, 'super')` is called                                                     | `class="my-animation"`                                             |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                           | `class="my-animation ng-animate"`                                  |
         * | 3. the `.super-add` class is added to the element                                                      | `class="my-animation ng-animate super-add"`                        |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                              | `class="my-animation ng-animate super-add"`                        |
         * | 5. the `.super` and `.super-add-active` classes are added (this triggers the CSS transition/animation) | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay          | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                             | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                       | `class="my-animation super"`                                       |
         * | 9. The super class is kept on the element                                                              | `class="my-animation super"`                                       |
         * | 10. The returned promise is resolved.                                                                  | `class="my-animation super"`                                       |
         *                                                                                                             // 1079
         * @param {DOMElement} element the element that will be animated                                               // 1080
         * @param {string} className the CSS class that will be added to the element and then animated                 // 1081
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 1083
        */                                                                                                             // 1084
        addClass: function(element, className, options) {                                                              // 1085
          return this.setClass(element, className, [], options);                                                       // 1086
        },                                                                                                             // 1087
                                                                                                                       // 1088
        /**                                                                                                            // 1089
         * @ngdoc method                                                                                               // 1090
         * @name $animate#removeClass                                                                                  // 1091
         *                                                                                                             // 1092
         * @description                                                                                                // 1093
         * Triggers a custom animation event based off the className variable and then removes the CSS class provided by the className value
         * from the element. Unlike the other animation methods, the animate service will suffix the className value with {@type -remove} in
         * order to provide the animate service the setup and active CSS classes in order to trigger the animation (this will be skipped if
         * no CSS transitions or keyframes are defined on the -remove or base CSS classes).                            // 1097
         *                                                                                                             // 1098
         * Below is a breakdown of each step that occurs during removeClass animation:                                 // 1099
         *                                                                                                             // 1100
         * | Animation Step                                                                                                       | What the element class attribute looks like                        |
         * |----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
         * | 1. `$animate.removeClass(element, 'super')` is called                                                                | `class="my-animation super"`                                       |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                         | `class="my-animation super ng-animate"`                            |
         * | 3. the `.super-remove` class is added to the element                                                                 | `class="my-animation super ng-animate super-remove"`               |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                                            | `class="my-animation super ng-animate super-remove"`               |
         * | 5. the `.super-remove-active` classes are added and `.super` is removed (this triggers the CSS transition/animation) | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                        | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                             |
         * | 9. The returned promise is resolved.                                                                                 | `class="my-animation"`                                             |
         *                                                                                                             // 1112
         *                                                                                                             // 1113
         * @param {DOMElement} element the element that will be animated                                               // 1114
         * @param {string} className the CSS class that will be animated and then removed from the element             // 1115
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 1117
        */                                                                                                             // 1118
        removeClass: function(element, className, options) {                                                           // 1119
          return this.setClass(element, [], className, options);                                                       // 1120
        },                                                                                                             // 1121
                                                                                                                       // 1122
        /**                                                                                                            // 1123
         *                                                                                                             // 1124
         * @ngdoc method                                                                                               // 1125
         * @name $animate#setClass                                                                                     // 1126
         *                                                                                                             // 1127
         * @description Adds and/or removes the given CSS classes to and from the element.                             // 1128
         * Once complete, the `done()` callback will be fired (if provided).                                           // 1129
         *                                                                                                             // 1130
         * | Animation Step                                                                                                                               | What the element class attribute looks like                                            |
         * |----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
         * | 1. `$animate.setClass(element, 'on', 'off')` is called                                                                                       | `class="my-animation off"`                                                             |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                                                 | `class="my-animation ng-animate off"`                                                  |
         * | 3. the `.on-add` and `.off-remove` classes are added to the element                                                                          | `class="my-animation ng-animate on-add off-remove off"`                                |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                                                                    | `class="my-animation ng-animate on-add off-remove off"`                                |
         * | 5. the `.on`, `.on-add-active` and `.off-remove-active` classes are added and `.off` is removed (this triggers the CSS transition/animation) | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                                                | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                                                                   | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                                                             | `class="my-animation on"`                                                              |
         * | 9. The returned promise is resolved.                                                                                                         | `class="my-animation on"`                                                              |
         *                                                                                                             // 1142
         * @param {DOMElement} element the element which will have its CSS classes changed                             // 1143
         *   removed from it                                                                                           // 1144
         * @param {string} add the CSS classes which will be added to the element                                      // 1145
         * @param {string} remove the CSS class which will be removed from the element                                 // 1146
         *   CSS classes have been set on the element                                                                  // 1147
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise                                                            // 1149
         */                                                                                                            // 1150
        setClass: function(element, add, remove, options) {                                                            // 1151
          options = parseAnimateOptions(options);                                                                      // 1152
                                                                                                                       // 1153
          var STORAGE_KEY = '$$animateClasses';                                                                        // 1154
          element = angular.element(element);                                                                          // 1155
          element = stripCommentsFromElement(element);                                                                 // 1156
                                                                                                                       // 1157
          if (classBasedAnimationsBlocked(element)) {                                                                  // 1158
            return $delegate.$$setClassImmediately(element, add, remove, options);                                     // 1159
          }                                                                                                            // 1160
                                                                                                                       // 1161
          // we're using a combined array for both the add and remove                                                  // 1162
          // operations since the ORDER OF addClass and removeClass matters                                            // 1163
          var classes, cache = element.data(STORAGE_KEY);                                                              // 1164
          var hasCache = !!cache;                                                                                      // 1165
          if (!cache) {                                                                                                // 1166
            cache = {};                                                                                                // 1167
            cache.classes = {};                                                                                        // 1168
          }                                                                                                            // 1169
          classes = cache.classes;                                                                                     // 1170
                                                                                                                       // 1171
          add = isArray(add) ? add : add.split(' ');                                                                   // 1172
          forEach(add, function(c) {                                                                                   // 1173
            if (c && c.length) {                                                                                       // 1174
              classes[c] = true;                                                                                       // 1175
            }                                                                                                          // 1176
          });                                                                                                          // 1177
                                                                                                                       // 1178
          remove = isArray(remove) ? remove : remove.split(' ');                                                       // 1179
          forEach(remove, function(c) {                                                                                // 1180
            if (c && c.length) {                                                                                       // 1181
              classes[c] = false;                                                                                      // 1182
            }                                                                                                          // 1183
          });                                                                                                          // 1184
                                                                                                                       // 1185
          if (hasCache) {                                                                                              // 1186
            if (options && cache.options) {                                                                            // 1187
              cache.options = angular.extend(cache.options || {}, options);                                            // 1188
            }                                                                                                          // 1189
                                                                                                                       // 1190
            //the digest cycle will combine all the animations into one function                                       // 1191
            return cache.promise;                                                                                      // 1192
          } else {                                                                                                     // 1193
            element.data(STORAGE_KEY, cache = {                                                                        // 1194
              classes: classes,                                                                                        // 1195
              options: options                                                                                         // 1196
            });                                                                                                        // 1197
          }                                                                                                            // 1198
                                                                                                                       // 1199
          return cache.promise = runAnimationPostDigest(function(done) {                                               // 1200
            var parentElement = element.parent();                                                                      // 1201
            var elementNode = extractElementNode(element);                                                             // 1202
            var parentNode = elementNode.parentNode;                                                                   // 1203
            // TODO(matsko): move this code into the animationsDisabled() function once #8092 is fixed                 // 1204
            if (!parentNode || parentNode['$$NG_REMOVED'] || elementNode['$$NG_REMOVED']) {                            // 1205
              done();                                                                                                  // 1206
              return;                                                                                                  // 1207
            }                                                                                                          // 1208
                                                                                                                       // 1209
            var cache = element.data(STORAGE_KEY);                                                                     // 1210
            element.removeData(STORAGE_KEY);                                                                           // 1211
                                                                                                                       // 1212
            var state = element.data(NG_ANIMATE_STATE) || {};                                                          // 1213
            var classes = resolveElementClasses(element, cache, state.active);                                         // 1214
            return !classes                                                                                            // 1215
              ? done()                                                                                                 // 1216
              : performAnimation('setClass', classes, element, parentElement, null, function() {                       // 1217
                  if (classes[0]) $delegate.$$addClassImmediately(element, classes[0]);                                // 1218
                  if (classes[1]) $delegate.$$removeClassImmediately(element, classes[1]);                             // 1219
                }, cache.options, done);                                                                               // 1220
          });                                                                                                          // 1221
        },                                                                                                             // 1222
                                                                                                                       // 1223
        /**                                                                                                            // 1224
         * @ngdoc method                                                                                               // 1225
         * @name $animate#cancel                                                                                       // 1226
         * @kind function                                                                                              // 1227
         *                                                                                                             // 1228
         * @param {Promise} animationPromise The animation promise that is returned when an animation is started.      // 1229
         *                                                                                                             // 1230
         * @description                                                                                                // 1231
         * Cancels the provided animation.                                                                             // 1232
        */                                                                                                             // 1233
        cancel: function(promise) {                                                                                    // 1234
          promise.$$cancelFn();                                                                                        // 1235
        },                                                                                                             // 1236
                                                                                                                       // 1237
        /**                                                                                                            // 1238
         * @ngdoc method                                                                                               // 1239
         * @name $animate#enabled                                                                                      // 1240
         * @kind function                                                                                              // 1241
         *                                                                                                             // 1242
         * @param {boolean=} value If provided then set the animation on or off.                                       // 1243
         * @param {DOMElement=} element If provided then the element will be used to represent the enable/disable operation
         * @return {boolean} Current animation state.                                                                  // 1245
         *                                                                                                             // 1246
         * @description                                                                                                // 1247
         * Globally enables/disables animations.                                                                       // 1248
         *                                                                                                             // 1249
        */                                                                                                             // 1250
        enabled: function(value, element) {                                                                            // 1251
          switch (arguments.length) {                                                                                  // 1252
            case 2:                                                                                                    // 1253
              if (value) {                                                                                             // 1254
                cleanup(element);                                                                                      // 1255
              } else {                                                                                                 // 1256
                var data = element.data(NG_ANIMATE_STATE) || {};                                                       // 1257
                data.disabled = true;                                                                                  // 1258
                element.data(NG_ANIMATE_STATE, data);                                                                  // 1259
              }                                                                                                        // 1260
            break;                                                                                                     // 1261
                                                                                                                       // 1262
            case 1:                                                                                                    // 1263
              rootAnimateState.disabled = !value;                                                                      // 1264
            break;                                                                                                     // 1265
                                                                                                                       // 1266
            default:                                                                                                   // 1267
              value = !rootAnimateState.disabled;                                                                      // 1268
            break;                                                                                                     // 1269
          }                                                                                                            // 1270
          return !!value;                                                                                              // 1271
         }                                                                                                             // 1272
      };                                                                                                               // 1273
                                                                                                                       // 1274
      /*                                                                                                               // 1275
        all animations call this shared animation triggering function internally.                                      // 1276
        The animationEvent variable refers to the JavaScript animation event that will be triggered                    // 1277
        and the className value is the name of the animation that will be applied within the                           // 1278
        CSS code. Element, `parentElement` and `afterElement` are provided DOM elements for the animation              // 1279
        and the onComplete callback will be fired once the animation is fully complete.                                // 1280
      */                                                                                                               // 1281
      function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, options, doneCallback) {
        var noopCancel = noop;                                                                                         // 1283
        var runner = animationRunner(element, animationEvent, className, options);                                     // 1284
        if (!runner) {                                                                                                 // 1285
          fireDOMOperation();                                                                                          // 1286
          fireBeforeCallbackAsync();                                                                                   // 1287
          fireAfterCallbackAsync();                                                                                    // 1288
          closeAnimation();                                                                                            // 1289
          return noopCancel;                                                                                           // 1290
        }                                                                                                              // 1291
                                                                                                                       // 1292
        animationEvent = runner.event;                                                                                 // 1293
        className = runner.className;                                                                                  // 1294
        var elementEvents = angular.element._data(runner.node);                                                        // 1295
        elementEvents = elementEvents && elementEvents.events;                                                         // 1296
                                                                                                                       // 1297
        if (!parentElement) {                                                                                          // 1298
          parentElement = afterElement ? afterElement.parent() : element.parent();                                     // 1299
        }                                                                                                              // 1300
                                                                                                                       // 1301
        //skip the animation if animations are disabled, a parent is already being animated,                           // 1302
        //the element is not currently attached to the document body or then completely close                          // 1303
        //the animation if any matching animations are not found at all.                                               // 1304
        //NOTE: IE8 + IE9 should close properly (run closeAnimation()) in case an animation was found.                 // 1305
        if (animationsDisabled(element, parentElement)) {                                                              // 1306
          fireDOMOperation();                                                                                          // 1307
          fireBeforeCallbackAsync();                                                                                   // 1308
          fireAfterCallbackAsync();                                                                                    // 1309
          closeAnimation();                                                                                            // 1310
          return noopCancel;                                                                                           // 1311
        }                                                                                                              // 1312
                                                                                                                       // 1313
        var ngAnimateState  = element.data(NG_ANIMATE_STATE) || {};                                                    // 1314
        var runningAnimations     = ngAnimateState.active || {};                                                       // 1315
        var totalActiveAnimations = ngAnimateState.totalActive || 0;                                                   // 1316
        var lastAnimation         = ngAnimateState.last;                                                               // 1317
        var skipAnimation = false;                                                                                     // 1318
                                                                                                                       // 1319
        if (totalActiveAnimations > 0) {                                                                               // 1320
          var animationsToCancel = [];                                                                                 // 1321
          if (!runner.isClassBased) {                                                                                  // 1322
            if (animationEvent == 'leave' && runningAnimations['ng-leave']) {                                          // 1323
              skipAnimation = true;                                                                                    // 1324
            } else {                                                                                                   // 1325
              //cancel all animations when a structural animation takes place                                          // 1326
              for (var klass in runningAnimations) {                                                                   // 1327
                animationsToCancel.push(runningAnimations[klass]);                                                     // 1328
              }                                                                                                        // 1329
              ngAnimateState = {};                                                                                     // 1330
              cleanup(element, true);                                                                                  // 1331
            }                                                                                                          // 1332
          } else if (lastAnimation.event == 'setClass') {                                                              // 1333
            animationsToCancel.push(lastAnimation);                                                                    // 1334
            cleanup(element, className);                                                                               // 1335
          } else if (runningAnimations[className]) {                                                                   // 1336
            var current = runningAnimations[className];                                                                // 1337
            if (current.event == animationEvent) {                                                                     // 1338
              skipAnimation = true;                                                                                    // 1339
            } else {                                                                                                   // 1340
              animationsToCancel.push(current);                                                                        // 1341
              cleanup(element, className);                                                                             // 1342
            }                                                                                                          // 1343
          }                                                                                                            // 1344
                                                                                                                       // 1345
          if (animationsToCancel.length > 0) {                                                                         // 1346
            forEach(animationsToCancel, function(operation) {                                                          // 1347
              operation.cancel();                                                                                      // 1348
            });                                                                                                        // 1349
          }                                                                                                            // 1350
        }                                                                                                              // 1351
                                                                                                                       // 1352
        if (runner.isClassBased                                                                                        // 1353
            && !runner.isSetClassOperation                                                                             // 1354
            && animationEvent != 'animate'                                                                             // 1355
            && !skipAnimation) {                                                                                       // 1356
          skipAnimation = (animationEvent == 'addClass') == element.hasClass(className); //opposite of XOR             // 1357
        }                                                                                                              // 1358
                                                                                                                       // 1359
        if (skipAnimation) {                                                                                           // 1360
          fireDOMOperation();                                                                                          // 1361
          fireBeforeCallbackAsync();                                                                                   // 1362
          fireAfterCallbackAsync();                                                                                    // 1363
          fireDoneCallbackAsync();                                                                                     // 1364
          return noopCancel;                                                                                           // 1365
        }                                                                                                              // 1366
                                                                                                                       // 1367
        runningAnimations     = ngAnimateState.active || {};                                                           // 1368
        totalActiveAnimations = ngAnimateState.totalActive || 0;                                                       // 1369
                                                                                                                       // 1370
        if (animationEvent == 'leave') {                                                                               // 1371
          //there's no need to ever remove the listener since the element                                              // 1372
          //will be removed (destroyed) after the leave animation ends or                                              // 1373
          //is cancelled midway                                                                                        // 1374
          element.one('$destroy', function(e) {                                                                        // 1375
            var element = angular.element(this);                                                                       // 1376
            var state = element.data(NG_ANIMATE_STATE);                                                                // 1377
            if (state) {                                                                                               // 1378
              var activeLeaveAnimation = state.active['ng-leave'];                                                     // 1379
              if (activeLeaveAnimation) {                                                                              // 1380
                activeLeaveAnimation.cancel();                                                                         // 1381
                cleanup(element, 'ng-leave');                                                                          // 1382
              }                                                                                                        // 1383
            }                                                                                                          // 1384
          });                                                                                                          // 1385
        }                                                                                                              // 1386
                                                                                                                       // 1387
        //the ng-animate class does nothing, but it's here to allow for                                                // 1388
        //parent animations to find and cancel child animations when needed                                            // 1389
        $$jqLite.addClass(element, NG_ANIMATE_CLASS_NAME);                                                             // 1390
        if (options && options.tempClasses) {                                                                          // 1391
          forEach(options.tempClasses, function(className) {                                                           // 1392
            $$jqLite.addClass(element, className);                                                                     // 1393
          });                                                                                                          // 1394
        }                                                                                                              // 1395
                                                                                                                       // 1396
        var localAnimationCount = globalAnimationCounter++;                                                            // 1397
        totalActiveAnimations++;                                                                                       // 1398
        runningAnimations[className] = runner;                                                                         // 1399
                                                                                                                       // 1400
        element.data(NG_ANIMATE_STATE, {                                                                               // 1401
          last: runner,                                                                                                // 1402
          active: runningAnimations,                                                                                   // 1403
          index: localAnimationCount,                                                                                  // 1404
          totalActive: totalActiveAnimations                                                                           // 1405
        });                                                                                                            // 1406
                                                                                                                       // 1407
        //first we run the before animations and when all of those are complete                                        // 1408
        //then we perform the DOM operation and run the next set of animations                                         // 1409
        fireBeforeCallbackAsync();                                                                                     // 1410
        runner.before(function(cancelled) {                                                                            // 1411
          var data = element.data(NG_ANIMATE_STATE);                                                                   // 1412
          cancelled = cancelled ||                                                                                     // 1413
                        !data || !data.active[className] ||                                                            // 1414
                        (runner.isClassBased && data.active[className].event != animationEvent);                       // 1415
                                                                                                                       // 1416
          fireDOMOperation();                                                                                          // 1417
          if (cancelled === true) {                                                                                    // 1418
            closeAnimation();                                                                                          // 1419
          } else {                                                                                                     // 1420
            fireAfterCallbackAsync();                                                                                  // 1421
            runner.after(closeAnimation);                                                                              // 1422
          }                                                                                                            // 1423
        });                                                                                                            // 1424
                                                                                                                       // 1425
        return runner.cancel;                                                                                          // 1426
                                                                                                                       // 1427
        function fireDOMCallback(animationPhase) {                                                                     // 1428
          var eventName = '$animate:' + animationPhase;                                                                // 1429
          if (elementEvents && elementEvents[eventName] && elementEvents[eventName].length > 0) {                      // 1430
            $$asyncCallback(function() {                                                                               // 1431
              element.triggerHandler(eventName, {                                                                      // 1432
                event: animationEvent,                                                                                 // 1433
                className: className                                                                                   // 1434
              });                                                                                                      // 1435
            });                                                                                                        // 1436
          }                                                                                                            // 1437
        }                                                                                                              // 1438
                                                                                                                       // 1439
        function fireBeforeCallbackAsync() {                                                                           // 1440
          fireDOMCallback('before');                                                                                   // 1441
        }                                                                                                              // 1442
                                                                                                                       // 1443
        function fireAfterCallbackAsync() {                                                                            // 1444
          fireDOMCallback('after');                                                                                    // 1445
        }                                                                                                              // 1446
                                                                                                                       // 1447
        function fireDoneCallbackAsync() {                                                                             // 1448
          fireDOMCallback('close');                                                                                    // 1449
          doneCallback();                                                                                              // 1450
        }                                                                                                              // 1451
                                                                                                                       // 1452
        //it is less complicated to use a flag than managing and canceling                                             // 1453
        //timeouts containing multiple callbacks.                                                                      // 1454
        function fireDOMOperation() {                                                                                  // 1455
          if (!fireDOMOperation.hasBeenRun) {                                                                          // 1456
            fireDOMOperation.hasBeenRun = true;                                                                        // 1457
            domOperation();                                                                                            // 1458
          }                                                                                                            // 1459
        }                                                                                                              // 1460
                                                                                                                       // 1461
        function closeAnimation() {                                                                                    // 1462
          if (!closeAnimation.hasBeenRun) {                                                                            // 1463
            if (runner) { //the runner doesn't exist if it fails to instantiate                                        // 1464
              runner.applyStyles();                                                                                    // 1465
            }                                                                                                          // 1466
                                                                                                                       // 1467
            closeAnimation.hasBeenRun = true;                                                                          // 1468
            if (options && options.tempClasses) {                                                                      // 1469
              forEach(options.tempClasses, function(className) {                                                       // 1470
                $$jqLite.removeClass(element, className);                                                              // 1471
              });                                                                                                      // 1472
            }                                                                                                          // 1473
                                                                                                                       // 1474
            var data = element.data(NG_ANIMATE_STATE);                                                                 // 1475
            if (data) {                                                                                                // 1476
                                                                                                                       // 1477
              /* only structural animations wait for reflow before removing an                                         // 1478
                 animation, but class-based animations don't. An example of this                                       // 1479
                 failing would be when a parent HTML tag has a ng-class attribute                                      // 1480
                 causing ALL directives below to skip animations during the digest */                                  // 1481
              if (runner && runner.isClassBased) {                                                                     // 1482
                cleanup(element, className);                                                                           // 1483
              } else {                                                                                                 // 1484
                $$asyncCallback(function() {                                                                           // 1485
                  var data = element.data(NG_ANIMATE_STATE) || {};                                                     // 1486
                  if (localAnimationCount == data.index) {                                                             // 1487
                    cleanup(element, className, animationEvent);                                                       // 1488
                  }                                                                                                    // 1489
                });                                                                                                    // 1490
                element.data(NG_ANIMATE_STATE, data);                                                                  // 1491
              }                                                                                                        // 1492
            }                                                                                                          // 1493
            fireDoneCallbackAsync();                                                                                   // 1494
          }                                                                                                            // 1495
        }                                                                                                              // 1496
      }                                                                                                                // 1497
                                                                                                                       // 1498
      function cancelChildAnimations(element) {                                                                        // 1499
        var node = extractElementNode(element);                                                                        // 1500
        if (node) {                                                                                                    // 1501
          var nodes = angular.isFunction(node.getElementsByClassName) ?                                                // 1502
            node.getElementsByClassName(NG_ANIMATE_CLASS_NAME) :                                                       // 1503
            node.querySelectorAll('.' + NG_ANIMATE_CLASS_NAME);                                                        // 1504
          forEach(nodes, function(element) {                                                                           // 1505
            element = angular.element(element);                                                                        // 1506
            var data = element.data(NG_ANIMATE_STATE);                                                                 // 1507
            if (data && data.active) {                                                                                 // 1508
              forEach(data.active, function(runner) {                                                                  // 1509
                runner.cancel();                                                                                       // 1510
              });                                                                                                      // 1511
            }                                                                                                          // 1512
          });                                                                                                          // 1513
        }                                                                                                              // 1514
      }                                                                                                                // 1515
                                                                                                                       // 1516
      function cleanup(element, className) {                                                                           // 1517
        if (isMatchingElement(element, $rootElement)) {                                                                // 1518
          if (!rootAnimateState.disabled) {                                                                            // 1519
            rootAnimateState.running = false;                                                                          // 1520
            rootAnimateState.structural = false;                                                                       // 1521
          }                                                                                                            // 1522
        } else if (className) {                                                                                        // 1523
          var data = element.data(NG_ANIMATE_STATE) || {};                                                             // 1524
                                                                                                                       // 1525
          var removeAnimations = className === true;                                                                   // 1526
          if (!removeAnimations && data.active && data.active[className]) {                                            // 1527
            data.totalActive--;                                                                                        // 1528
            delete data.active[className];                                                                             // 1529
          }                                                                                                            // 1530
                                                                                                                       // 1531
          if (removeAnimations || !data.totalActive) {                                                                 // 1532
            $$jqLite.removeClass(element, NG_ANIMATE_CLASS_NAME);                                                      // 1533
            element.removeData(NG_ANIMATE_STATE);                                                                      // 1534
          }                                                                                                            // 1535
        }                                                                                                              // 1536
      }                                                                                                                // 1537
                                                                                                                       // 1538
      function animationsDisabled(element, parentElement) {                                                            // 1539
        if (rootAnimateState.disabled) {                                                                               // 1540
          return true;                                                                                                 // 1541
        }                                                                                                              // 1542
                                                                                                                       // 1543
        if (isMatchingElement(element, $rootElement)) {                                                                // 1544
          return rootAnimateState.running;                                                                             // 1545
        }                                                                                                              // 1546
                                                                                                                       // 1547
        var allowChildAnimations, parentRunningAnimation, hasParent;                                                   // 1548
        do {                                                                                                           // 1549
          //the element did not reach the root element which means that it                                             // 1550
          //is not apart of the DOM. Therefore there is no reason to do                                                // 1551
          //any animations on it                                                                                       // 1552
          if (parentElement.length === 0) break;                                                                       // 1553
                                                                                                                       // 1554
          var isRoot = isMatchingElement(parentElement, $rootElement);                                                 // 1555
          var state = isRoot ? rootAnimateState : (parentElement.data(NG_ANIMATE_STATE) || {});                        // 1556
          if (state.disabled) {                                                                                        // 1557
            return true;                                                                                               // 1558
          }                                                                                                            // 1559
                                                                                                                       // 1560
          //no matter what, for an animation to work it must reach the root element                                    // 1561
          //this implies that the element is attached to the DOM when the animation is run                             // 1562
          if (isRoot) {                                                                                                // 1563
            hasParent = true;                                                                                          // 1564
          }                                                                                                            // 1565
                                                                                                                       // 1566
          //once a flag is found that is strictly false then everything before                                         // 1567
          //it will be discarded and all child animations will be restricted                                           // 1568
          if (allowChildAnimations !== false) {                                                                        // 1569
            var animateChildrenFlag = parentElement.data(NG_ANIMATE_CHILDREN);                                         // 1570
            if (angular.isDefined(animateChildrenFlag)) {                                                              // 1571
              allowChildAnimations = animateChildrenFlag;                                                              // 1572
            }                                                                                                          // 1573
          }                                                                                                            // 1574
                                                                                                                       // 1575
          parentRunningAnimation = parentRunningAnimation ||                                                           // 1576
                                   state.running ||                                                                    // 1577
                                   (state.last && !state.last.isClassBased);                                           // 1578
        }                                                                                                              // 1579
        while (parentElement = parentElement.parent());                                                                // 1580
                                                                                                                       // 1581
        return !hasParent || (!allowChildAnimations && parentRunningAnimation);                                        // 1582
      }                                                                                                                // 1583
    }]);                                                                                                               // 1584
                                                                                                                       // 1585
    $animateProvider.register('', ['$window', '$sniffer', '$timeout', '$$animateReflow',                               // 1586
                           function($window,   $sniffer,   $timeout,   $$animateReflow) {                              // 1587
      // Detect proper transitionend/animationend event names.                                                         // 1588
      var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;                   // 1589
                                                                                                                       // 1590
      // If unprefixed events are not supported but webkit-prefixed are, use the latter.                               // 1591
      // Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.                     // 1592
      // Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`           // 1593
      // but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.                        // 1594
      // Register both events in case `window.onanimationend` is not supported because of that,                        // 1595
      // do the same for `transitionend` as Safari is likely to exhibit similar behavior.                              // 1596
      // Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit                   // 1597
      // therefore there is no reason to test anymore for other vendor prefixes: http://caniuse.com/#search=transition // 1598
      if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {                        // 1599
        CSS_PREFIX = '-webkit-';                                                                                       // 1600
        TRANSITION_PROP = 'WebkitTransition';                                                                          // 1601
        TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';                                                     // 1602
      } else {                                                                                                         // 1603
        TRANSITION_PROP = 'transition';                                                                                // 1604
        TRANSITIONEND_EVENT = 'transitionend';                                                                         // 1605
      }                                                                                                                // 1606
                                                                                                                       // 1607
      if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {                          // 1608
        CSS_PREFIX = '-webkit-';                                                                                       // 1609
        ANIMATION_PROP = 'WebkitAnimation';                                                                            // 1610
        ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';                                                        // 1611
      } else {                                                                                                         // 1612
        ANIMATION_PROP = 'animation';                                                                                  // 1613
        ANIMATIONEND_EVENT = 'animationend';                                                                           // 1614
      }                                                                                                                // 1615
                                                                                                                       // 1616
      var DURATION_KEY = 'Duration';                                                                                   // 1617
      var PROPERTY_KEY = 'Property';                                                                                   // 1618
      var DELAY_KEY = 'Delay';                                                                                         // 1619
      var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';                                                            // 1620
      var ANIMATION_PLAYSTATE_KEY = 'PlayState';                                                                       // 1621
      var NG_ANIMATE_PARENT_KEY = '$$ngAnimateKey';                                                                    // 1622
      var NG_ANIMATE_CSS_DATA_KEY = '$$ngAnimateCSS3Data';                                                             // 1623
      var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;                                                                         // 1624
      var CLOSING_TIME_BUFFER = 1.5;                                                                                   // 1625
      var ONE_SECOND = 1000;                                                                                           // 1626
                                                                                                                       // 1627
      var lookupCache = {};                                                                                            // 1628
      var parentCounter = 0;                                                                                           // 1629
      var animationReflowQueue = [];                                                                                   // 1630
      var cancelAnimationReflow;                                                                                       // 1631
      function clearCacheAfterReflow() {                                                                               // 1632
        if (!cancelAnimationReflow) {                                                                                  // 1633
          cancelAnimationReflow = $$animateReflow(function() {                                                         // 1634
            animationReflowQueue = [];                                                                                 // 1635
            cancelAnimationReflow = null;                                                                              // 1636
            lookupCache = {};                                                                                          // 1637
          });                                                                                                          // 1638
        }                                                                                                              // 1639
      }                                                                                                                // 1640
                                                                                                                       // 1641
      function afterReflow(element, callback) {                                                                        // 1642
        if (cancelAnimationReflow) {                                                                                   // 1643
          cancelAnimationReflow();                                                                                     // 1644
        }                                                                                                              // 1645
        animationReflowQueue.push(callback);                                                                           // 1646
        cancelAnimationReflow = $$animateReflow(function() {                                                           // 1647
          forEach(animationReflowQueue, function(fn) {                                                                 // 1648
            fn();                                                                                                      // 1649
          });                                                                                                          // 1650
                                                                                                                       // 1651
          animationReflowQueue = [];                                                                                   // 1652
          cancelAnimationReflow = null;                                                                                // 1653
          lookupCache = {};                                                                                            // 1654
        });                                                                                                            // 1655
      }                                                                                                                // 1656
                                                                                                                       // 1657
      var closingTimer = null;                                                                                         // 1658
      var closingTimestamp = 0;                                                                                        // 1659
      var animationElementQueue = [];                                                                                  // 1660
      function animationCloseHandler(element, totalTime) {                                                             // 1661
        var node = extractElementNode(element);                                                                        // 1662
        element = angular.element(node);                                                                               // 1663
                                                                                                                       // 1664
        //this item will be garbage collected by the closing                                                           // 1665
        //animation timeout                                                                                            // 1666
        animationElementQueue.push(element);                                                                           // 1667
                                                                                                                       // 1668
        //but it may not need to cancel out the existing timeout                                                       // 1669
        //if the timestamp is less than the previous one                                                               // 1670
        var futureTimestamp = Date.now() + totalTime;                                                                  // 1671
        if (futureTimestamp <= closingTimestamp) {                                                                     // 1672
          return;                                                                                                      // 1673
        }                                                                                                              // 1674
                                                                                                                       // 1675
        $timeout.cancel(closingTimer);                                                                                 // 1676
                                                                                                                       // 1677
        closingTimestamp = futureTimestamp;                                                                            // 1678
        closingTimer = $timeout(function() {                                                                           // 1679
          closeAllAnimations(animationElementQueue);                                                                   // 1680
          animationElementQueue = [];                                                                                  // 1681
        }, totalTime, false);                                                                                          // 1682
      }                                                                                                                // 1683
                                                                                                                       // 1684
      function closeAllAnimations(elements) {                                                                          // 1685
        forEach(elements, function(element) {                                                                          // 1686
          var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);                                                     // 1687
          if (elementData) {                                                                                           // 1688
            forEach(elementData.closeAnimationFns, function(fn) {                                                      // 1689
              fn();                                                                                                    // 1690
            });                                                                                                        // 1691
          }                                                                                                            // 1692
        });                                                                                                            // 1693
      }                                                                                                                // 1694
                                                                                                                       // 1695
      function getElementAnimationDetails(element, cacheKey) {                                                         // 1696
        var data = cacheKey ? lookupCache[cacheKey] : null;                                                            // 1697
        if (!data) {                                                                                                   // 1698
          var transitionDuration = 0;                                                                                  // 1699
          var transitionDelay = 0;                                                                                     // 1700
          var animationDuration = 0;                                                                                   // 1701
          var animationDelay = 0;                                                                                      // 1702
                                                                                                                       // 1703
          //we want all the styles defined before and after                                                            // 1704
          forEach(element, function(element) {                                                                         // 1705
            if (element.nodeType == ELEMENT_NODE) {                                                                    // 1706
              var elementStyles = $window.getComputedStyle(element) || {};                                             // 1707
                                                                                                                       // 1708
              var transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];                             // 1709
              transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);                // 1710
                                                                                                                       // 1711
              var transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];                                   // 1712
              transitionDelay  = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);                        // 1713
                                                                                                                       // 1714
              var animationDelayStyle = elementStyles[ANIMATION_PROP + DELAY_KEY];                                     // 1715
              animationDelay   = Math.max(parseMaxTime(elementStyles[ANIMATION_PROP + DELAY_KEY]), animationDelay);    // 1716
                                                                                                                       // 1717
              var aDuration  = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);                             // 1718
                                                                                                                       // 1719
              if (aDuration > 0) {                                                                                     // 1720
                aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1;         // 1721
              }                                                                                                        // 1722
              animationDuration = Math.max(aDuration, animationDuration);                                              // 1723
            }                                                                                                          // 1724
          });                                                                                                          // 1725
          data = {                                                                                                     // 1726
            total: 0,                                                                                                  // 1727
            transitionDelay: transitionDelay,                                                                          // 1728
            transitionDuration: transitionDuration,                                                                    // 1729
            animationDelay: animationDelay,                                                                            // 1730
            animationDuration: animationDuration                                                                       // 1731
          };                                                                                                           // 1732
          if (cacheKey) {                                                                                              // 1733
            lookupCache[cacheKey] = data;                                                                              // 1734
          }                                                                                                            // 1735
        }                                                                                                              // 1736
        return data;                                                                                                   // 1737
      }                                                                                                                // 1738
                                                                                                                       // 1739
      function parseMaxTime(str) {                                                                                     // 1740
        var maxValue = 0;                                                                                              // 1741
        var values = isString(str) ?                                                                                   // 1742
          str.split(/\s*,\s*/) :                                                                                       // 1743
          [];                                                                                                          // 1744
        forEach(values, function(value) {                                                                              // 1745
          maxValue = Math.max(parseFloat(value) || 0, maxValue);                                                       // 1746
        });                                                                                                            // 1747
        return maxValue;                                                                                               // 1748
      }                                                                                                                // 1749
                                                                                                                       // 1750
      function getCacheKey(element) {                                                                                  // 1751
        var parentElement = element.parent();                                                                          // 1752
        var parentID = parentElement.data(NG_ANIMATE_PARENT_KEY);                                                      // 1753
        if (!parentID) {                                                                                               // 1754
          parentElement.data(NG_ANIMATE_PARENT_KEY, ++parentCounter);                                                  // 1755
          parentID = parentCounter;                                                                                    // 1756
        }                                                                                                              // 1757
        return parentID + '-' + extractElementNode(element).getAttribute('class');                                     // 1758
      }                                                                                                                // 1759
                                                                                                                       // 1760
      function animateSetup(animationEvent, element, className, styles) {                                              // 1761
        var structural = ['ng-enter','ng-leave','ng-move'].indexOf(className) >= 0;                                    // 1762
                                                                                                                       // 1763
        var cacheKey = getCacheKey(element);                                                                           // 1764
        var eventCacheKey = cacheKey + ' ' + className;                                                                // 1765
        var itemIndex = lookupCache[eventCacheKey] ? ++lookupCache[eventCacheKey].total : 0;                           // 1766
                                                                                                                       // 1767
        var stagger = {};                                                                                              // 1768
        if (itemIndex > 0) {                                                                                           // 1769
          var staggerClassName = className + '-stagger';                                                               // 1770
          var staggerCacheKey = cacheKey + ' ' + staggerClassName;                                                     // 1771
          var applyClasses = !lookupCache[staggerCacheKey];                                                            // 1772
                                                                                                                       // 1773
          applyClasses && $$jqLite.addClass(element, staggerClassName);                                                // 1774
                                                                                                                       // 1775
          stagger = getElementAnimationDetails(element, staggerCacheKey);                                              // 1776
                                                                                                                       // 1777
          applyClasses && $$jqLite.removeClass(element, staggerClassName);                                             // 1778
        }                                                                                                              // 1779
                                                                                                                       // 1780
        $$jqLite.addClass(element, className);                                                                         // 1781
                                                                                                                       // 1782
        var formerData = element.data(NG_ANIMATE_CSS_DATA_KEY) || {};                                                  // 1783
        var timings = getElementAnimationDetails(element, eventCacheKey);                                              // 1784
        var transitionDuration = timings.transitionDuration;                                                           // 1785
        var animationDuration = timings.animationDuration;                                                             // 1786
                                                                                                                       // 1787
        if (structural && transitionDuration === 0 && animationDuration === 0) {                                       // 1788
          $$jqLite.removeClass(element, className);                                                                    // 1789
          return false;                                                                                                // 1790
        }                                                                                                              // 1791
                                                                                                                       // 1792
        var blockTransition = styles || (structural && transitionDuration > 0);                                        // 1793
        var blockAnimation = animationDuration > 0 &&                                                                  // 1794
                             stagger.animationDelay > 0 &&                                                             // 1795
                             stagger.animationDuration === 0;                                                          // 1796
                                                                                                                       // 1797
        var closeAnimationFns = formerData.closeAnimationFns || [];                                                    // 1798
        element.data(NG_ANIMATE_CSS_DATA_KEY, {                                                                        // 1799
          stagger: stagger,                                                                                            // 1800
          cacheKey: eventCacheKey,                                                                                     // 1801
          running: formerData.running || 0,                                                                            // 1802
          itemIndex: itemIndex,                                                                                        // 1803
          blockTransition: blockTransition,                                                                            // 1804
          closeAnimationFns: closeAnimationFns                                                                         // 1805
        });                                                                                                            // 1806
                                                                                                                       // 1807
        var node = extractElementNode(element);                                                                        // 1808
                                                                                                                       // 1809
        if (blockTransition) {                                                                                         // 1810
          blockTransitions(node, true);                                                                                // 1811
          if (styles) {                                                                                                // 1812
            element.css(styles);                                                                                       // 1813
          }                                                                                                            // 1814
        }                                                                                                              // 1815
                                                                                                                       // 1816
        if (blockAnimation) {                                                                                          // 1817
          blockAnimations(node, true);                                                                                 // 1818
        }                                                                                                              // 1819
                                                                                                                       // 1820
        return true;                                                                                                   // 1821
      }                                                                                                                // 1822
                                                                                                                       // 1823
      function animateRun(animationEvent, element, className, activeAnimationComplete, styles) {                       // 1824
        var node = extractElementNode(element);                                                                        // 1825
        var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);                                                       // 1826
        if (node.getAttribute('class').indexOf(className) == -1 || !elementData) {                                     // 1827
          activeAnimationComplete();                                                                                   // 1828
          return;                                                                                                      // 1829
        }                                                                                                              // 1830
                                                                                                                       // 1831
        var activeClassName = '';                                                                                      // 1832
        var pendingClassName = '';                                                                                     // 1833
        forEach(className.split(' '), function(klass, i) {                                                             // 1834
          var prefix = (i > 0 ? ' ' : '') + klass;                                                                     // 1835
          activeClassName += prefix + '-active';                                                                       // 1836
          pendingClassName += prefix + '-pending';                                                                     // 1837
        });                                                                                                            // 1838
                                                                                                                       // 1839
        var style = '';                                                                                                // 1840
        var appliedStyles = [];                                                                                        // 1841
        var itemIndex = elementData.itemIndex;                                                                         // 1842
        var stagger = elementData.stagger;                                                                             // 1843
        var staggerTime = 0;                                                                                           // 1844
        if (itemIndex > 0) {                                                                                           // 1845
          var transitionStaggerDelay = 0;                                                                              // 1846
          if (stagger.transitionDelay > 0 && stagger.transitionDuration === 0) {                                       // 1847
            transitionStaggerDelay = stagger.transitionDelay * itemIndex;                                              // 1848
          }                                                                                                            // 1849
                                                                                                                       // 1850
          var animationStaggerDelay = 0;                                                                               // 1851
          if (stagger.animationDelay > 0 && stagger.animationDuration === 0) {                                         // 1852
            animationStaggerDelay = stagger.animationDelay * itemIndex;                                                // 1853
            appliedStyles.push(CSS_PREFIX + 'animation-play-state');                                                   // 1854
          }                                                                                                            // 1855
                                                                                                                       // 1856
          staggerTime = Math.round(Math.max(transitionStaggerDelay, animationStaggerDelay) * 100) / 100;               // 1857
        }                                                                                                              // 1858
                                                                                                                       // 1859
        if (!staggerTime) {                                                                                            // 1860
          $$jqLite.addClass(element, activeClassName);                                                                 // 1861
          if (elementData.blockTransition) {                                                                           // 1862
            blockTransitions(node, false);                                                                             // 1863
          }                                                                                                            // 1864
        }                                                                                                              // 1865
                                                                                                                       // 1866
        var eventCacheKey = elementData.cacheKey + ' ' + activeClassName;                                              // 1867
        var timings = getElementAnimationDetails(element, eventCacheKey);                                              // 1868
        var maxDuration = Math.max(timings.transitionDuration, timings.animationDuration);                             // 1869
        if (maxDuration === 0) {                                                                                       // 1870
          $$jqLite.removeClass(element, activeClassName);                                                              // 1871
          animateClose(element, className);                                                                            // 1872
          activeAnimationComplete();                                                                                   // 1873
          return;                                                                                                      // 1874
        }                                                                                                              // 1875
                                                                                                                       // 1876
        if (!staggerTime && styles && Object.keys(styles).length > 0) {                                                // 1877
          if (!timings.transitionDuration) {                                                                           // 1878
            element.css('transition', timings.animationDuration + 's linear all');                                     // 1879
            appliedStyles.push('transition');                                                                          // 1880
          }                                                                                                            // 1881
          element.css(styles);                                                                                         // 1882
        }                                                                                                              // 1883
                                                                                                                       // 1884
        var maxDelay = Math.max(timings.transitionDelay, timings.animationDelay);                                      // 1885
        var maxDelayTime = maxDelay * ONE_SECOND;                                                                      // 1886
                                                                                                                       // 1887
        if (appliedStyles.length > 0) {                                                                                // 1888
          //the element being animated may sometimes contain comment nodes in                                          // 1889
          //the jqLite object, so we're safe to use a single variable to house                                         // 1890
          //the styles since there is always only one element being animated                                           // 1891
          var oldStyle = node.getAttribute('style') || '';                                                             // 1892
          if (oldStyle.charAt(oldStyle.length - 1) !== ';') {                                                          // 1893
            oldStyle += ';';                                                                                           // 1894
          }                                                                                                            // 1895
          node.setAttribute('style', oldStyle + ' ' + style);                                                          // 1896
        }                                                                                                              // 1897
                                                                                                                       // 1898
        var startTime = Date.now();                                                                                    // 1899
        var css3AnimationEvents = ANIMATIONEND_EVENT + ' ' + TRANSITIONEND_EVENT;                                      // 1900
        var animationTime     = (maxDelay + maxDuration) * CLOSING_TIME_BUFFER;                                        // 1901
        var totalTime         = (staggerTime + animationTime) * ONE_SECOND;                                            // 1902
                                                                                                                       // 1903
        var staggerTimeout;                                                                                            // 1904
        if (staggerTime > 0) {                                                                                         // 1905
          $$jqLite.addClass(element, pendingClassName);                                                                // 1906
          staggerTimeout = $timeout(function() {                                                                       // 1907
            staggerTimeout = null;                                                                                     // 1908
                                                                                                                       // 1909
            if (timings.transitionDuration > 0) {                                                                      // 1910
              blockTransitions(node, false);                                                                           // 1911
            }                                                                                                          // 1912
            if (timings.animationDuration > 0) {                                                                       // 1913
              blockAnimations(node, false);                                                                            // 1914
            }                                                                                                          // 1915
                                                                                                                       // 1916
            $$jqLite.addClass(element, activeClassName);                                                               // 1917
            $$jqLite.removeClass(element, pendingClassName);                                                           // 1918
                                                                                                                       // 1919
            if (styles) {                                                                                              // 1920
              if (timings.transitionDuration === 0) {                                                                  // 1921
                element.css('transition', timings.animationDuration + 's linear all');                                 // 1922
              }                                                                                                        // 1923
              element.css(styles);                                                                                     // 1924
              appliedStyles.push('transition');                                                                        // 1925
            }                                                                                                          // 1926
          }, staggerTime * ONE_SECOND, false);                                                                         // 1927
        }                                                                                                              // 1928
                                                                                                                       // 1929
        element.on(css3AnimationEvents, onAnimationProgress);                                                          // 1930
        elementData.closeAnimationFns.push(function() {                                                                // 1931
          onEnd();                                                                                                     // 1932
          activeAnimationComplete();                                                                                   // 1933
        });                                                                                                            // 1934
                                                                                                                       // 1935
        elementData.running++;                                                                                         // 1936
        animationCloseHandler(element, totalTime);                                                                     // 1937
        return onEnd;                                                                                                  // 1938
                                                                                                                       // 1939
        // This will automatically be called by $animate so                                                            // 1940
        // there is no need to attach this internally to the                                                           // 1941
        // timeout done method.                                                                                        // 1942
        function onEnd() {                                                                                             // 1943
          element.off(css3AnimationEvents, onAnimationProgress);                                                       // 1944
          $$jqLite.removeClass(element, activeClassName);                                                              // 1945
          $$jqLite.removeClass(element, pendingClassName);                                                             // 1946
          if (staggerTimeout) {                                                                                        // 1947
            $timeout.cancel(staggerTimeout);                                                                           // 1948
          }                                                                                                            // 1949
          animateClose(element, className);                                                                            // 1950
          var node = extractElementNode(element);                                                                      // 1951
          for (var i in appliedStyles) {                                                                               // 1952
            node.style.removeProperty(appliedStyles[i]);                                                               // 1953
          }                                                                                                            // 1954
        }                                                                                                              // 1955
                                                                                                                       // 1956
        function onAnimationProgress(event) {                                                                          // 1957
          event.stopPropagation();                                                                                     // 1958
          var ev = event.originalEvent || event;                                                                       // 1959
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();                                           // 1960
                                                                                                                       // 1961
          /* Firefox (or possibly just Gecko) likes to not round values up                                             // 1962
           * when a ms measurement is used for the animation */                                                        // 1963
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));                       // 1964
                                                                                                                       // 1965
          /* $manualTimeStamp is a mocked timeStamp value which is set                                                 // 1966
           * within browserTrigger(). This is only here so that tests can                                              // 1967
           * mock animations properly. Real events fallback to event.timeStamp,                                        // 1968
           * or, if they don't, then a timeStamp is automatically created for them.                                    // 1969
           * We're checking to see if the timeStamp surpasses the expected delay,                                      // 1970
           * but we're using elapsedTime instead of the timeStamp on the 2nd                                           // 1971
           * pre-condition since animations sometimes close off early */                                               // 1972
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {                      // 1973
            activeAnimationComplete();                                                                                 // 1974
          }                                                                                                            // 1975
        }                                                                                                              // 1976
      }                                                                                                                // 1977
                                                                                                                       // 1978
      function blockTransitions(node, bool) {                                                                          // 1979
        node.style[TRANSITION_PROP + PROPERTY_KEY] = bool ? 'none' : '';                                               // 1980
      }                                                                                                                // 1981
                                                                                                                       // 1982
      function blockAnimations(node, bool) {                                                                           // 1983
        node.style[ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY] = bool ? 'paused' : '';                                   // 1984
      }                                                                                                                // 1985
                                                                                                                       // 1986
      function animateBefore(animationEvent, element, className, styles) {                                             // 1987
        if (animateSetup(animationEvent, element, className, styles)) {                                                // 1988
          return function(cancelled) {                                                                                 // 1989
            cancelled && animateClose(element, className);                                                             // 1990
          };                                                                                                           // 1991
        }                                                                                                              // 1992
      }                                                                                                                // 1993
                                                                                                                       // 1994
      function animateAfter(animationEvent, element, className, afterAnimationComplete, styles) {                      // 1995
        if (element.data(NG_ANIMATE_CSS_DATA_KEY)) {                                                                   // 1996
          return animateRun(animationEvent, element, className, afterAnimationComplete, styles);                       // 1997
        } else {                                                                                                       // 1998
          animateClose(element, className);                                                                            // 1999
          afterAnimationComplete();                                                                                    // 2000
        }                                                                                                              // 2001
      }                                                                                                                // 2002
                                                                                                                       // 2003
      function animate(animationEvent, element, className, animationComplete, options) {                               // 2004
        //If the animateSetup function doesn't bother returning a                                                      // 2005
        //cancellation function then it means that there is no animation                                               // 2006
        //to perform at all                                                                                            // 2007
        var preReflowCancellation = animateBefore(animationEvent, element, className, options.from);                   // 2008
        if (!preReflowCancellation) {                                                                                  // 2009
          clearCacheAfterReflow();                                                                                     // 2010
          animationComplete();                                                                                         // 2011
          return;                                                                                                      // 2012
        }                                                                                                              // 2013
                                                                                                                       // 2014
        //There are two cancellation functions: one is before the first                                                // 2015
        //reflow animation and the second is during the active state                                                   // 2016
        //animation. The first function will take care of removing the                                                 // 2017
        //data from the element which will not make the 2nd animation                                                  // 2018
        //happen in the first place                                                                                    // 2019
        var cancel = preReflowCancellation;                                                                            // 2020
        afterReflow(element, function() {                                                                              // 2021
          //once the reflow is complete then we point cancel to                                                        // 2022
          //the new cancellation function which will remove all of the                                                 // 2023
          //animation properties from the active animation                                                             // 2024
          cancel = animateAfter(animationEvent, element, className, animationComplete, options.to);                    // 2025
        });                                                                                                            // 2026
                                                                                                                       // 2027
        return function(cancelled) {                                                                                   // 2028
          (cancel || noop)(cancelled);                                                                                 // 2029
        };                                                                                                             // 2030
      }                                                                                                                // 2031
                                                                                                                       // 2032
      function animateClose(element, className) {                                                                      // 2033
        $$jqLite.removeClass(element, className);                                                                      // 2034
        var data = element.data(NG_ANIMATE_CSS_DATA_KEY);                                                              // 2035
        if (data) {                                                                                                    // 2036
          if (data.running) {                                                                                          // 2037
            data.running--;                                                                                            // 2038
          }                                                                                                            // 2039
          if (!data.running || data.running === 0) {                                                                   // 2040
            element.removeData(NG_ANIMATE_CSS_DATA_KEY);                                                               // 2041
          }                                                                                                            // 2042
        }                                                                                                              // 2043
      }                                                                                                                // 2044
                                                                                                                       // 2045
      return {                                                                                                         // 2046
        animate: function(element, className, from, to, animationCompleted, options) {                                 // 2047
          options = options || {};                                                                                     // 2048
          options.from = from;                                                                                         // 2049
          options.to = to;                                                                                             // 2050
          return animate('animate', element, className, animationCompleted, options);                                  // 2051
        },                                                                                                             // 2052
                                                                                                                       // 2053
        enter: function(element, animationCompleted, options) {                                                        // 2054
          options = options || {};                                                                                     // 2055
          return animate('enter', element, 'ng-enter', animationCompleted, options);                                   // 2056
        },                                                                                                             // 2057
                                                                                                                       // 2058
        leave: function(element, animationCompleted, options) {                                                        // 2059
          options = options || {};                                                                                     // 2060
          return animate('leave', element, 'ng-leave', animationCompleted, options);                                   // 2061
        },                                                                                                             // 2062
                                                                                                                       // 2063
        move: function(element, animationCompleted, options) {                                                         // 2064
          options = options || {};                                                                                     // 2065
          return animate('move', element, 'ng-move', animationCompleted, options);                                     // 2066
        },                                                                                                             // 2067
                                                                                                                       // 2068
        beforeSetClass: function(element, add, remove, animationCompleted, options) {                                  // 2069
          options = options || {};                                                                                     // 2070
          var className = suffixClasses(remove, '-remove') + ' ' +                                                     // 2071
                          suffixClasses(add, '-add');                                                                  // 2072
          var cancellationMethod = animateBefore('setClass', element, className, options.from);                        // 2073
          if (cancellationMethod) {                                                                                    // 2074
            afterReflow(element, animationCompleted);                                                                  // 2075
            return cancellationMethod;                                                                                 // 2076
          }                                                                                                            // 2077
          clearCacheAfterReflow();                                                                                     // 2078
          animationCompleted();                                                                                        // 2079
        },                                                                                                             // 2080
                                                                                                                       // 2081
        beforeAddClass: function(element, className, animationCompleted, options) {                                    // 2082
          options = options || {};                                                                                     // 2083
          var cancellationMethod = animateBefore('addClass', element, suffixClasses(className, '-add'), options.from); // 2084
          if (cancellationMethod) {                                                                                    // 2085
            afterReflow(element, animationCompleted);                                                                  // 2086
            return cancellationMethod;                                                                                 // 2087
          }                                                                                                            // 2088
          clearCacheAfterReflow();                                                                                     // 2089
          animationCompleted();                                                                                        // 2090
        },                                                                                                             // 2091
                                                                                                                       // 2092
        beforeRemoveClass: function(element, className, animationCompleted, options) {                                 // 2093
          options = options || {};                                                                                     // 2094
          var cancellationMethod = animateBefore('removeClass', element, suffixClasses(className, '-remove'), options.from);
          if (cancellationMethod) {                                                                                    // 2096
            afterReflow(element, animationCompleted);                                                                  // 2097
            return cancellationMethod;                                                                                 // 2098
          }                                                                                                            // 2099
          clearCacheAfterReflow();                                                                                     // 2100
          animationCompleted();                                                                                        // 2101
        },                                                                                                             // 2102
                                                                                                                       // 2103
        setClass: function(element, add, remove, animationCompleted, options) {                                        // 2104
          options = options || {};                                                                                     // 2105
          remove = suffixClasses(remove, '-remove');                                                                   // 2106
          add = suffixClasses(add, '-add');                                                                            // 2107
          var className = remove + ' ' + add;                                                                          // 2108
          return animateAfter('setClass', element, className, animationCompleted, options.to);                         // 2109
        },                                                                                                             // 2110
                                                                                                                       // 2111
        addClass: function(element, className, animationCompleted, options) {                                          // 2112
          options = options || {};                                                                                     // 2113
          return animateAfter('addClass', element, suffixClasses(className, '-add'), animationCompleted, options.to);  // 2114
        },                                                                                                             // 2115
                                                                                                                       // 2116
        removeClass: function(element, className, animationCompleted, options) {                                       // 2117
          options = options || {};                                                                                     // 2118
          return animateAfter('removeClass', element, suffixClasses(className, '-remove'), animationCompleted, options.to);
        }                                                                                                              // 2120
      };                                                                                                               // 2121
                                                                                                                       // 2122
      function suffixClasses(classes, suffix) {                                                                        // 2123
        var className = '';                                                                                            // 2124
        classes = isArray(classes) ? classes : classes.split(/\s+/);                                                   // 2125
        forEach(classes, function(klass, i) {                                                                          // 2126
          if (klass && klass.length > 0) {                                                                             // 2127
            className += (i > 0 ? ' ' : '') + klass + suffix;                                                          // 2128
          }                                                                                                            // 2129
        });                                                                                                            // 2130
        return className;                                                                                              // 2131
      }                                                                                                                // 2132
    }]);                                                                                                               // 2133
  }]);                                                                                                                 // 2134
                                                                                                                       // 2135
                                                                                                                       // 2136
})(window, window.angular);                                                                                            // 2137
                                                                                                                       // 2138
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-animate'] = {};

})();
