"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
(function ($) {
  "use strict";

  var MEDIT_THEME = {
    init: function init() {
      this.dom();
      this.pageLoading();
      this.lazyload();
      this.headerSticky();
      this.headerTransparent();
      this.headerHeightCalculate();
      this.toggleAnimation({
        containerClass: '.site-drawer',
        buttonClass: '.toggle-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-drawer-overlay',
        activeBodyClass: 'drawer-open',
        buttonSuffix: '-toggle'
      });
      this.toggleAnimation({
        containerClass: '.site-holder',
        buttonClass: '.holder-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-holder-overlay',
        activeBodyClass: 'holder-open',
        buttonSuffix: '-holder'
      });
      this.mobileDropdownMenu();
      this.megaMenuWrap();
      this.splittingAnimation();
      this.inviewAnimation();
      this.sliderAnimation();
      this.hoverGallerySlider();
      this.goToTop();
      this.productQuantity();
      this.loginPage();
      this.gdpr();
      this.lightBox();
      this.newsletterLightbox();
    },
    dom: function dom() {
      var _Motion = Motion,
        cubicBezier = _Motion.cubicBezier;

      // Global variables
      this.loading = false;
      // Create split text
      var splitText = new SplitType('.split-text');

      // Motion easing animations
      this.easings = {
        // Power1
        power1: cubicBezier(0.55, 0.085, 0.68, 0.53),
        // Power1.in
        power1Out: cubicBezier(0.25, 0.46, 0.45, 0.94),
        // Power1.out
        power1InOut: cubicBezier(0.455, 0.03, 0.515, 0.955),
        // Power1.inOut

        // Power2
        power2: cubicBezier(0.55, 0.055, 0.675, 0.19),
        // Power2.in
        power2Out: cubicBezier(0.215, 0.61, 0.355, 1),
        // Power2.out
        power2InOut: cubicBezier(0.645, 0.045, 0.355, 1),
        // Power2.inOut

        // Power3
        power3: cubicBezier(0.895, 0.03, 0.685, 0.22),
        // Power3.in
        power3Out: cubicBezier(0.165, 0.84, 0.44, 1),
        // Power3.out
        power3InOut: cubicBezier(0.77, 0, 0.175, 1),
        // Power3.inOut

        // Power4
        power4: cubicBezier(0.755, 0.05, 0.855, 0.06),
        // Power4.in
        power4Out: cubicBezier(0.23, 1, 0.32, 1),
        // Power4.out
        power4InOut: cubicBezier(0.86, 0, 0.07, 1),
        // Power4.inOut

        // Expo
        expoIn: cubicBezier(0.95, 0.05, 0.795, 0.035),
        // Expo.in
        expoOut: cubicBezier(0.19, 1, 0.22, 1),
        // Expo.out
        expoInOut: cubicBezier(1, 0, 0, 1),
        // Expo.inOut

        // Back
        backIn: cubicBezier(0.6, -0.28, 0.735, 0.045),
        backOut: cubicBezier(0.175, 0.885, 0.32, 1.275),
        backInOut: cubicBezier(0.68, -0.55, 0.265, 1.55),
        // Circ
        circIn: cubicBezier(0.6, 0.04, 0.98, 0.335),
        circOut: cubicBezier(0.075, 0.82, 0.165, 1),
        circInOut: cubicBezier(0.785, 0.135, 0.15, 0.86),
        // Bounce
        bounceOut: cubicBezier(0.34, 1.56, 0.64, 1),
        // Custom
        smooth: cubicBezier(0.4, 0, 0.2, 1),
        smoothOut: cubicBezier(0, 0.7, 0.3, 1),
        // Smooth animasyonlar için
        smoothA: cubicBezier(0.35, 0.17, 0.3, 0.86),
        smoothB: cubicBezier(0.33, 1, 0.68, 1),
        smoothC: cubicBezier(0.65, 0, 0.35, 1),
        // Material Design easing
        material: cubicBezier(0.4, 0, 0.2, 1),
        materialAccelerate: cubicBezier(0.4, 0, 1, 1),
        materialDecelerate: cubicBezier(0, 0, 0.2, 1)
      };
    },
    pageLoading: function pageLoading() {
      var _Motion2 = Motion,
        animate = _Motion2.animate;
      var easings = this.easings;
      var pageLoading = document.querySelector('.site-page-loading');
      if (!pageLoading) return;
      var isPageLoaded = false;
      var captionAnimationComplete = false;
      var animateCaption = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var captionsInner, captions, captionCount, currentIndex, _animateNext;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                captionsInner = pageLoading.querySelector('.page-loading-captions-inner');
                if (captionsInner) {
                  _context2.next = 4;
                  break;
                }
                captionAnimationComplete = true;
                return _context2.abrupt("return");
              case 4:
                captions = captionsInner.querySelectorAll('.page-loading-caption');
                captionCount = captions.length;
                currentIndex = 0;
                captionsInner.style.transform = 'translateY(0)';
                _animateNext = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (!(currentIndex === 0)) {
                            _context.next = 3;
                            break;
                          }
                          _context.next = 3;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, 500);
                          });
                        case 3:
                          currentIndex++;
                          if (!(currentIndex >= captionCount)) {
                            _context.next = 9;
                            break;
                          }
                          captionAnimationComplete = true;
                          if (!isPageLoaded) {
                            _context.next = 8;
                            break;
                          }
                          return _context.abrupt("return");
                        case 8:
                          currentIndex = 0;
                        case 9:
                          _context.next = 11;
                          return animate(captionsInner, {
                            transform: "translateY(-".concat(100 / captionCount * currentIndex, "%)")
                          }, {
                            duration: 0.8,
                            ease: easings.power2InOut
                          }).finished;
                        case 11:
                          _context.next = 13;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, 2000);
                          });
                        case 13:
                          if (!(isPageLoaded && currentIndex >= captionCount - 1)) {
                            _context.next = 16;
                            break;
                          }
                          captionAnimationComplete = true;
                          return _context.abrupt("return");
                        case 16:
                          _animateNext();
                        case 17:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function animateNext() {
                    return _ref2.apply(this, arguments);
                  };
                }();
                _animateNext();
              case 10:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function animateCaption() {
          return _ref.apply(this, arguments);
        };
      }();
      var loadPage = function loadPage() {
        return new Promise(function (resolve) {
          var loadingCount = pageLoading.querySelector('.page-loading-count');
          if (!loadingCount) {
            resolve();
            return;
          }
          var images = Array.from(document.images).filter(function (img) {
            return !img.loading || img.loading !== 'lazy';
          });
          var loadedImages = 0;
          var totalImages = images.length;
          var minDuration = 1500; // Minimum 3 saniye
          var startTime = Date.now();
          loadingCount.textContent = "00%";
          var updateProgress = function updateProgress() {
            var elapsed = Date.now() - startTime;
            var timeProgress = Math.min(elapsed / minDuration * 100, 100);
            loadingCount.textContent = "".concat(Math.floor(timeProgress).toString().padStart(2, '0'), "%");
            if (elapsed >= minDuration) {
              clearInterval(progressInterval);
              resolve();
            }
          };
          var progressInterval = setInterval(updateProgress, 30);
          images.forEach(function (img) {
            if (!img.complete) {
              img.onload = function () {
                return loadedImages++;
              };
              img.onerror = function () {
                return loadedImages++;
              };
            } else {
              loadedImages++;
            }
          });
        });
      };
      animateCaption();
      var closeLoading = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var inner, bg;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                try {
                  inner = pageLoading.querySelector('.site-page-loading-inner');
                  bg = pageLoading.querySelector('.site-page-loading-bg');
                  inner.style.opacity = '1';
                  bg.style.transform = 'translateY(0%)';
                  animate([[inner, {
                    opacity: 0
                  }, {
                    duration: 0.6
                  }], [bg, {
                    transform: 'translateY(-100%)'
                  }, {
                    duration: 1.6,
                    at: 0.3
                  }]], {
                    ease: easings.power3InOut,
                    onComplete: function onComplete() {
                      setTimeout(function () {
                        pageLoading.remove();
                      }, 100);
                    }
                  });
                } catch (error) {
                  console.error('Loading close animation error:', error);
                  pageLoading.remove();
                }
              case 1:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function closeLoading() {
          return _ref3.apply(this, arguments);
        };
      }();
      loadPage().then(function () {
        isPageLoaded = true;
        var captionsInner = pageLoading.querySelector('.page-loading-captions-inner');
        if (!captionsInner) {
          closeLoading();
          return;
        }
        var _waitForCaption = function waitForCaption() {
          if (captionAnimationComplete) {
            closeLoading();
          } else {
            setTimeout(_waitForCaption, 100);
          }
        };
        _waitForCaption();
      });
    },
    lazyload: function lazyload() {
      // Global instance
      var lazyLoad = new LazyLoad({
        elements_selector: ".lazy",
        use_native: true,
        // Native lazy loading
        threshold: 0,
        // Loading distance
        callback_enter: function callback_enter(element) {
          element.parentElement.classList.add('is-loading');
        },
        callback_loaded: function callback_loaded(element) {
          element.parentElement.classList.remove('is-loading');
          element.parentElement.classList.add('is-loaded');
        },
        callback_error: function callback_error(element) {
          // Loading error
        }
      });
    },
    createElement: function createElement(value, tag, attributes) {
      var element = document.createElement(tag);
      Object.assign(element, attributes);
      element.innerHTML = value;
      return element.firstElementChild;
    },
    wrap: function wrap(element, target) {
      if (!element || !target) return;
      var wrapper;
      if (_typeof(target) === "object" && target.nodeType === 1) {
        wrapper = target;
      } else {
        wrapper = this.createElement(target);
      }
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      return wrapper;
    },
    headerSticky: function headerSticky() {
      var _this = this;
      var header = document.querySelector('.site-header');
      var pageContent = document.querySelector('.page-content');
      if (!header || !pageContent || !header.classList.contains('is-sticky')) return;

      // Header için wrapper oluştur
      var headerWrapper = document.createElement('div');
      headerWrapper.classList.add('sticky-header-wrapper');
      var updateHeaderHeight = function updateHeaderHeight() {
        header.style.display = 'none';
        header.offsetHeight;
        header.style.display = '';
        var headerHeight = header.offsetHeight;
        headerWrapper.style.height = "".concat(headerHeight, "px");
      };

      // Initial setup
      updateHeaderHeight();
      header.parentNode.insertBefore(headerWrapper, header);
      headerWrapper.appendChild(header);

      // Scroll pozisyonunu kontrol et
      var scrollThreshold = 10;
      var headerTop = headerWrapper.getBoundingClientRect().top;
      var handleScroll = function handleScroll() {
        headerTop = headerWrapper.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (headerTop <= 0) {
          header.classList.add('is-fixed');
          header.style.position = 'fixed';
          header.style.width = '100%';
          header.style.top = '0';
          if (scrollTop > scrollThreshold) {
            header.classList.add('stuck');
            _this.headerHeightCalculate();
          } else {
            header.classList.remove('stuck');
            _this.headerHeightCalculate();
          }
        } else {
          header.classList.remove('is-fixed', 'stuck');
          header.style.position = 'relative';
          header.style.width = 'auto';
          header.style.top = '0';
          _this.headerHeightCalculate();
        }
      };
      window.addEventListener('scroll', handleScroll, {
        passive: true
      });

      // Resize observers
      var resizeObserver = new ResizeObserver(function () {
        updateHeaderHeight();
        handleScroll();
      });
      resizeObserver.observe(header);
      var resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          updateHeaderHeight();
          handleScroll();
        }, 250);
      });
      var mediaQueries = [window.matchMedia('(min-width: 1024.02px)'), window.matchMedia('(max-width: 1024px)'), window.matchMedia('(max-width: 767px)')];
      mediaQueries.forEach(function (query) {
        query.addListener(function () {
          updateHeaderHeight();
          handleScroll();
        });
      });

      // Initial scroll check
      handleScroll();
    },
    headerTransparent: function headerTransparent() {
      var header = document.querySelector('.site-header.transparent');
      if (!header) return;
      var megaMenus = header.querySelectorAll('.menu-item-has-children.mega-menu');
      var isMegaMenuHovered = false;
      header.addEventListener('mouseenter', function () {
        header.classList.add('hover');
      });
      header.addEventListener('mouseleave', function () {
        if (isMegaMenuHovered) {
          setTimeout(function () {
            header.classList.remove('hover');
            isMegaMenuHovered = false;
          }, 230);
        } else {
          header.classList.remove('hover');
        }
      });

      // Mega menu hover kontrolü
      megaMenus.forEach(function (megaMenu) {
        megaMenu.addEventListener('mouseenter', function () {
          isMegaMenuHovered = true;
        });
      });
    },
    headerHeightCalculate: function headerHeightCalculate() {
      var header = document.querySelector('.site-header');
      var announcement = document.querySelector('.site-announcement-bar');
      var subheader = document.querySelector('.site-subheader');
      var adminbar = document.querySelector('#wpadminbar');
      var root = document.documentElement;
      var mediaQuery = window.matchMedia('(min-width: 1024.02px)');
      var calculateHeight = function calculateHeight() {
        if (mediaQuery.matches) {
          var totalHeight = parseFloat(getComputedStyle(root).getPropertyValue('--theme-header-height-desktop'));
          if (!header.classList.contains('stuck')) {
            if (announcement) {
              totalHeight += announcement.offsetHeight;
            }
            if (subheader) {
              totalHeight += subheader.offsetHeight;
            }
            if (adminbar) {
              totalHeight += adminbar.offsetHeight;
            }
          }
          header.style.setProperty('--header-height-desktop', "".concat(totalHeight, "px"));
        } else {
          header.style.removeProperty('--header-height-desktop');
        }
      };
      calculateHeight();
      mediaQuery.addEventListener('change', calculateHeight);
    },
    toggleAnimation: function toggleAnimation(config) {
      var defaults = {
        containerClass: '.site-drawer',
        buttonClass: '.toggle-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-drawer-overlay',
        activeBodyClass: 'drawer-open',
        buttonSuffix: '-toggle'
      };
      var options = _objectSpread(_objectSpread({}, defaults), config);
      var containers = document.querySelectorAll(options.containerClass);
      var toggleButtons = document.querySelectorAll(options.buttonClass);
      var closeButtons = document.querySelectorAll(options.closeButtonClass);
      var overlays = document.querySelectorAll(options.overlayClass);
      var closeActive = function closeActive() {
        containers.forEach(function (container) {
          return container.classList.remove('active');
        });
        toggleButtons.forEach(function (btn) {
          return btn.classList.remove('active');
        });
        document.body.classList.remove(options.activeBodyClass);
      };
      toggleButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          var buttonClasses = Array.from(button.classList);
          var toggleClass = buttonClasses.find(function (cls) {
            return cls.endsWith(options.buttonSuffix);
          });
          var type = toggleClass.replace(options.buttonSuffix, '');
          closeActive();
          button.classList.add('active');
          var targetContainer = Array.from(containers).find(function (container) {
            return container.classList.contains("".concat(type, "-").concat(options.containerClass.replace('.site-', '')));
          });
          if (targetContainer) {
            targetContainer.classList.add('active');
          }
          document.body.classList.add(options.activeBodyClass);
        });
      });
      closeButtons.forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeActive();
        });
      });
      overlays.forEach(function (overlay) {
        overlay.addEventListener('click', closeActive);
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest(options.containerClass) && !e.target.closest(options.buttonClass)) {
          closeActive();
        }
      });
    },
    mobileDropdownMenu: function mobileDropdownMenu() {
      var mobileQuery = window.matchMedia('(max-width: 1023px)');
      function calculateTotalHeight(submenu) {
        var totalHeight = submenu.scrollHeight;
        var activeNestedSubmenus = submenu.querySelectorAll('.active > .sub-menu');
        activeNestedSubmenus.forEach(function (nestedSubmenu) {
          totalHeight += nestedSubmenu.scrollHeight;
        });
        return totalHeight;
      }
      function initMobileMenu(e) {
        cleanup();
        if (!e.matches) return;
        var dropdownIcon = "\n          <svg class=\"dropdown-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M6 9L12 15L18 9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n        ";
        var mobileMenu = document.querySelectorAll('.site-navigation.menu-vertical');
        mobileMenu.forEach(function (menu) {
          var menuItemsWithChildren = menu.querySelectorAll('.menu-item-has-children');
          menuItemsWithChildren.forEach(function (menuItem) {
            var link = menuItem.querySelector('a');
            var wrapper = document.createElement('div');
            wrapper.className = 'menu-item-wrapper';
            link.parentNode.insertBefore(wrapper, link);
            wrapper.appendChild(link);
            var iconDiv = document.createElement('div');
            iconDiv.className = 'dropdown-icon-wrapper';
            iconDiv.innerHTML = dropdownIcon;
            wrapper.appendChild(iconDiv);
            var submenu = menuItem.querySelector('.sub-menu');
            var linkClickHandler = function linkClickHandler(e) {
              if (link.getAttribute('href') === '#') {
                e.preventDefault();
                toggleSubmenu(menuItem, submenu);
              }
            };
            var iconClickHandler = function iconClickHandler(e) {
              e.stopPropagation();
              toggleSubmenu(menuItem, submenu);
            };
            menuItem.mobileMenuHandlers = {
              link: linkClickHandler,
              icon: iconClickHandler
            };
            link.addEventListener('click', linkClickHandler);
            iconDiv.addEventListener('click', iconClickHandler);
          });
        });
      }
      function cleanup() {
        var mobileMenu = document.querySelectorAll('.site-navigation.menu-vertical');
        mobileMenu.forEach(function (menu) {
          var menuItemsWithChildren = menu.querySelectorAll('.menu-item-has-children');
          menuItemsWithChildren.forEach(function (menuItem) {
            var wrapper = menuItem.querySelector('.menu-item-wrapper');
            if (wrapper) {
              var link = wrapper.querySelector('a');
              menuItem.insertBefore(link, wrapper);
              wrapper.remove();
            }
            if (menuItem.mobileMenuHandlers) {
              var _link = menuItem.querySelector('a');
              _link.removeEventListener('click', menuItem.mobileMenuHandlers.link);
              delete menuItem.mobileMenuHandlers;
            }
            menuItem.classList.remove('active');
            var submenu = menuItem.querySelector('.sub-menu');
            if (submenu) {
              submenu.style.maxHeight = '';
            }
          });
        });
      }
      function toggleSubmenu(menuItem, submenu) {
        if (!mobileQuery.matches) return;
        var isActive = menuItem.classList.contains('active');
        var activeSiblings = menuItem.parentElement.querySelectorAll('.menu-item.active');
        activeSiblings.forEach(function (sibling) {
          if (sibling !== menuItem) {
            sibling.classList.remove('active');
            var siblingSubmenu = sibling.querySelector('.sub-menu');
            if (siblingSubmenu) {
              siblingSubmenu.style.maxHeight = '0px';
            }
            var activeChildren = sibling.querySelectorAll('.active');
            activeChildren.forEach(function (child) {
              child.classList.remove('active');
              var childSubmenu = child.querySelector('.sub-menu');
              if (childSubmenu) {
                childSubmenu.style.maxHeight = '0px';
              }
            });
          }
        });
        if (!isActive) {
          menuItem.classList.add('active');
          if (submenu) {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            var parent = menuItem.parentElement.closest('.sub-menu');
            while (parent) {
              var totalHeight = calculateTotalHeight(parent);
              parent.style.maxHeight = totalHeight + 'px';
              parent = parent.parentElement.closest('.sub-menu');
            }
          }
        } else {
          menuItem.classList.remove('active');
          if (submenu) {
            submenu.style.maxHeight = '0px';
            var _parent = menuItem.parentElement.closest('.sub-menu');
            while (_parent) {
              var _totalHeight = calculateTotalHeight(_parent);
              _parent.style.maxHeight = _totalHeight + 'px';
              _parent = _parent.parentElement.closest('.sub-menu');
            }
          }
          var activeChildren = menuItem.querySelectorAll('.active');
          activeChildren.forEach(function (child) {
            child.classList.remove('active');
            var childSubmenu = child.querySelector('.sub-menu');
            if (childSubmenu) {
              childSubmenu.style.maxHeight = '0px';
            }
          });
        }
      }
      document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu(mobileQuery);
        try {
          mobileQuery.addEventListener('change', initMobileMenu);
        } catch (e1) {
          try {
            mobileQuery.addListener(initMobileMenu);
          } catch (e2) {
            console.error('Could not add media query listener:', e2);
          }
        }
      });
    },
    megaMenuWrap: function megaMenuWrap() {
      var _this2 = this;
      var menu = document.querySelectorAll('.site-navigation.menu-horizontal .mega-menu > .sub-menu');
      if (menu !== null) {
        menu.forEach(function (item) {
          _this2.wrap(item, "<div class='sub-menu mega-sub-menu'></div>");
        });
      }
    },
    splittingAnimation: function splittingAnimation() {
      var _this3 = this;
      var _Motion3 = Motion,
        animate = _Motion3.animate,
        inView = _Motion3.inView,
        stagger = _Motion3.stagger;
      var hasLoading = document.querySelector('.site-page-loading');
      var initSplitAnimations = function initSplitAnimations() {
        // Split text animation styles
        var splitAnimations = {
          'split-style-1': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: "translateY(30px) rotate(".concat(index <= total / 2 ? -3 : 3, "deg)"),
                transformOrigin: index <= total / 2 ? '100% 100%' : '0% 100%'
              };
            },
            animate: {
              opacity: 1,
              transform: 'translateY(0) rotate(0deg)'
            }
          },
          'split-style-2': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: 'scale(1.3)'
              };
            },
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'split-style-3': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: 'scale(0.7)'
              };
            },
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'split-style-4': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: 'translateY(50%) rotate(-5deg)',
                transformOrigin: '0% 50%'
              };
            },
            animate: {
              opacity: 1,
              transform: 'translateY(0) rotate(0deg)'
            }
          },
          'split-style-5': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: 'translateX(-20%)'
              };
            },
            animate: {
              opacity: 1,
              transform: 'translateX(0%)'
            }
          },
          'split-style-6': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0,
                transform: 'translateX(20%)'
              };
            },
            animate: {
              opacity: 1,
              transform: 'translateX(0%)'
            }
          },
          'split-style-7': {
            initial: function initial(elements, index, total) {
              return {
                opacity: 0
              };
            },
            animate: {
              opacity: 1
            }
          }
        };

        // Prepare split text elements
        document.querySelectorAll('.split-text').forEach(function (element) {
          if (!element) return;
          var style = element.dataset.splitStyle;
          var animation = splitAnimations[style];
          var duration = Number(element.dataset.splitDuration) || 0.8;
          var selectedEasing = element.dataset.easings;
          if (!animation) return;

          // Choice of words or chars
          var type = element.dataset.splitType || 'words';
          var elements;
          switch (type) {
            case 'lines':
              elements = element.querySelectorAll('.line');
              break;
            case 'words':
              elements = element.querySelectorAll('.word');
              break;
            case 'chars':
              elements = element.querySelectorAll('.char');
              break;
            default:
              elements = element.querySelectorAll('.word');
            // fallback to words
          }
          var total = elements.length;

          // Set initial states
          elements.forEach(function (el, index) {
            var initialProps = animation.initial(el, index, total);
            Object.assign(el.style, _objectSpread({
              willChange: 'transform, opacity'
            }, initialProps));
          });

          // Default animation settings
          var animationSettings = {
            delay: stagger(0.05),
            duration: duration
          };

          // If selected easing exists, apply it
          if (selectedEasing && _this3.easings[selectedEasing]) {
            animationSettings.ease = _this3.easings[selectedEasing];
          }

          // Inview animation
          inView(element, function () {
            animate(elements, animation.animate, animationSettings);
          });
        });
      };
      if (hasLoading) {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.removedNodes.length && Array.from(mutation.removedNodes).some(function (node) {
              return node === hasLoading;
            })) {
              initSplitAnimations();
              observer.disconnect();
            }
          });
        });
        observer.observe(document.body, {
          childList: true
        });
      } else {
        // Loading yoksa hemen başlat
        initSplitAnimations();
      }
    },
    inviewAnimation: function inviewAnimation() {
      var _Motion4 = Motion,
        animate = _Motion4.animate,
        inView = _Motion4.inView,
        stagger = _Motion4.stagger;
      var easings = this.easings;
      var hasLoading = document.querySelector('.site-page-loading');
      var initInviewAnimations = function initInviewAnimations() {
        var inviewAnimations = {
          'fade': {
            animate: {
              opacity: 1
            }
          },
          'transformY': {
            animate: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          },
          'transformYreverse': {
            animate: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          },
          'transformX': {
            animate: {
              opacity: 1,
              transform: 'translateX(0)'
            }
          },
          'transformXreverse': {
            animate: {
              opacity: 1,
              transform: 'translateX(0)'
            }
          },
          'scaleUp': {
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'scaleDown': {
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          }
        };

        // Css variable for duration
        var rootStyles = getComputedStyle(document.documentElement);
        var defaultDuration = parseFloat(rootStyles.getPropertyValue('--theme-inview-animation-duration')) || 0.8;

        // Group elements by their viewport position
        var groupedElements = new Map();
        document.querySelectorAll('.inview-element').forEach(function (element) {
          if (!element) return;
          var animationType = element.dataset.inviewAnimation;
          var selectedEasing = element.dataset.easings;
          var animation = inviewAnimations[animationType];
          if (!animation) return;

          // Set initial state
          Object.assign(element.style, _objectSpread(_objectSpread({}, animation.initial), {}, {
            willChange: 'transform, opacity'
          }));

          // Get the element's position relative to viewport
          var rect = element.getBoundingClientRect();
          var viewportPosition = Math.floor(rect.top / 200); // Group elements by 200px segments

          if (!groupedElements.has(viewportPosition)) {
            groupedElements.set(viewportPosition, []);
          }
          groupedElements.get(viewportPosition).push({
            element: element,
            animation: animation,
            easing: selectedEasing
          });
        });

        // Animate each group
        groupedElements.forEach(function (group) {
          var elements = group.map(function (item) {
            return item.element;
          });
          var firstElement = elements[0];
          inView(firstElement, function () {
            group.forEach(function (item, index) {
              animate(item.element, item.animation.animate, {
                duration: defaultDuration,
                delay: index * 0.1,
                // Manual stagger delay
                ease: item.easing && easings[item.easing] ? easings[item.easing] : undefined
              });
            });
          }, {
            amount: 0,
            // Element must be 30% visible before animation triggers
            once: true
          });
        });

        /* const elements = document.querySelectorAll('.inview-element');
         elements.forEach((element, index) => {
          if (!element) return;
                 const animationType = element.dataset.inviewAnimation;
          const selectedEasing = element.dataset.easings;
          const staggerDelay = 0.1;
          const animation = inviewAnimations[animationType];
                 if (!animation) return;
                 const animationSettings = {
            duration: defaultDuration,
            delay: index * staggerDelay
          };
                 if (selectedEasing && easings[selectedEasing]) {
            animationSettings.ease = easings[selectedEasing];
          }
                 inView(element, () => {
            animate(element, animation.animate, animationSettings);
          }, {
            amount: 0, 
            once: true
          });
        }); */
      };
      if (hasLoading) {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.removedNodes.length && Array.from(mutation.removedNodes).some(function (node) {
              return node === hasLoading;
            })) {
              initInviewAnimations();
              observer.disconnect();
            }
          });
        });
        observer.observe(document.body, {
          childList: true
        });
      } else {
        initInviewAnimations();
      }
    },
    sliderAnimation: function sliderAnimation() {
      var slider = document.querySelectorAll('.site-slider-wrapper');
      slider.forEach(function (element) {
        var slide = element.querySelector('.site-slider');
        var preloader = document.createElement('div');
        preloader.className = 'preloader';
        slide.appendChild(preloader);
        var items = Number(slide.dataset.items) || 1;
        var itemsTablet = Number(slide.dataset.itemsTablet) || 1;
        var itemsMobile = Number(slide.dataset.itemsMobile) || 1;
        var slidesPerGroup = Number(slide.dataset.slidesPerGroup) || 1;
        var spaceBetween = Number(slide.dataset.margin) || 0;
        var spaceBetweenTablet = Number(slide.dataset.marginTablet) || 0;
        var spaceBetweenMobile = Number(slide.dataset.marginMobile) || 0;
        var speed = Number(slide.dataset.speed) || 400;
        var direction = slide.dataset.direction || 'horizontal';
        var loop = slide.dataset.loop === 'true' ? true : false || false;
        var autoplay = slide.dataset.autoplay || false;
        var autoplaySpeed = Number(slide.dataset.autoplaySpeed) || 2000;
        var mousewheel = slide.dataset.mousewheel === 'true' ? true : false || false;
        var simulateTouch = slide.dataset.simulateTouch === 'true' ? true : false || false;
        var parallax = slide.dataset.parallax === 'true' ? true : false || false;
        var controls = element.querySelector('.swiper-controls');
        var args = {
          // Optional parameters
          slidesPerView: itemsMobile,
          slidesPerGroup: slidesPerGroup,
          direction: direction,
          loop: loop,
          speed: speed,
          spaceBetween: spaceBetweenMobile,
          parallax: parallax,
          observer: true,
          watchSlidesProgress: true,
          lazy: {
            loadPrevNext: true,
            // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
          },
          // If we need pagination
          pagination: {
            el: controls ? controls.querySelector('.swiper-pagination') : '.swiper-pagination',
            clickable: true
          },
          // Navigation arrows
          navigation: {
            nextEl: controls ? controls.querySelector('.swiper-button-next') : '.swiper-button-next',
            prevEl: controls ? controls.querySelector('.swiper-button-prev') : '.swiper-button-prev'
          },
          mousewheel: mousewheel,
          simulateTouch: simulateTouch,
          slideVisibleClass: 'slide-on-visible',
          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          breakpoints: {
            // when window width is >= 320px
            567: {
              slidesPerView: itemsMobile,
              spaceBetween: spaceBetweenMobile
            },
            // when window width is >= 768px
            768: {
              slidesPerView: itemsTablet,
              spaceBetween: spaceBetweenTablet
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: items,
              spaceBetween: spaceBetween
            }
          },
          on: {
            init: function init(el) {
              el.slides.forEach(function (slide) {
                if (!slide.classList.contains('slide-on-visible')) {
                  var firstChild = slide.children[0];
                  if (firstChild && firstChild.classList.contains('inview-element')) {
                    firstChild.classList.remove('inview-element');
                  }
                }
              });
              setTimeout(function () {
                preloader.style.opacity = '0';
                setTimeout(function () {
                  element.classList.add('slider-initialized');
                  preloader.remove();
                }, 300);
              }, 500);
            }
          }
        };
        if (autoplay === 'true') {
          args.autoplay = {
            delay: autoplaySpeed,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true
          };
        }
        var swiper = new Swiper(slide, args);
      });
    },
    hoverGallerySlider: function hoverGallerySlider() {
      var container = document.querySelectorAll('.hover-gallery-slider');
      if (container !== null) {
        container.forEach(function (self) {
          var slider = new HoverSlider({
            selector: self,
            debug: false,
            duration: Number(0.4),
            delay: Number(0),
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });
        });
      }
    },
    goToTop: function goToTop() {
      var goToTop = document.querySelector('.site-go-to-top');
      if (!goToTop) return;
      var button = goToTop.querySelector('.go-to-top-button');
      var circle = goToTop.querySelector('.progress-ring__circle');
      var circleMetrics = {
        circumference: 0,
        radius: 0
      };
      var updateCircleSize = function updateCircleSize() {
        var buttonSize = button.offsetWidth;
        var strokeWidth = 2;
        // Calculate radius to fit the button perfectly
        var radius = buttonSize / 2 - strokeWidth / 2;

        // Update SVG viewBox
        var svg = circle.closest('.progress-ring');
        svg.setAttribute('viewBox', "0 0 ".concat(buttonSize, " ").concat(buttonSize));

        // Update circle attributes
        circle.setAttribute('r', radius);
        circle.setAttribute('cx', buttonSize / 2);
        circle.setAttribute('cy', buttonSize / 2);

        // Calculate progress ring metrics
        var circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = "".concat(circumference, " ").concat(circumference);
        circle.style.strokeDashoffset = circumference;

        // Update metrics
        circleMetrics = {
          circumference: circumference,
          radius: radius
        };
      };
      var initCircle = function initCircle() {
        requestAnimationFrame(function () {
          updateCircleSize();
        });
      };
      initCircle();
      window.addEventListener('load', initCircle);

      // Resize event
      var resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initCircle, 100);
      });
      function setProgress(percent) {
        var offset = circleMetrics.circumference - percent / 100 * circleMetrics.circumference;
        circle.style.strokeDashoffset = offset;
      }
      window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = Math.min(100, Math.max(0, scrollTop / scrollHeight * 100));
        if (scrollTop > 200) {
          goToTop.classList.add('active');
        } else {
          goToTop.classList.remove('active');
        }
        setProgress(scrollPercent);
      });
      button.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },
    productQuantity: function productQuantity() {
      var themeAjaxQuantity = function themeAjaxQuantity(event, target) {
        var block = document.querySelectorAll('.cart-with-quantity');
        if (block !== null) {
          var _loop = function _loop() {
            var self = block[i];
            var button = self.querySelector('.add-to-cart-quantity');
            var quantity = self.querySelector('.ajax-quantity');
            var addQty = function addQty() {
              quantity.style.cssText = "display: flex";
            };
            button.addEventListener('click', function (e) {
              e.preventDefault();
              e.target.closest('A').style.cssText = "display: none";
              addQty();
            });
            if (Number(event) === 0) {
              var parentDiv = target.closest('.quantity.ajax-quantity');
              var targetCartButton = target.closest('.cart-with-quantity').querySelector('.add-to-cart-quantity');
              targetCartButton.style.cssText = "display: inline-flex";
              parentDiv.style.cssText = "display: none !important";
            }
          };
          for (var i = 0; i < block.length; i++) {
            _loop();
          }
        }
      };
      var container = document.querySelectorAll('.quantity');
      if (container !== null) {
        var _loop2 = function _loop2() {
          var self = container[i];
          var changeQuantity = function changeQuantity() {
            var buttons = self.querySelectorAll('.quantity-button');
            if (buttons !== null) {
              buttons.forEach(function (button) {
                var qty_input = self.querySelector('.input-text.qty');
                if (qty_input.disabled) return;
                var qty_step = parseFloat(qty_input.getAttribute('step'));
                var qty_min = parseFloat(qty_input.getAttribute('min'));
                var qty_max = parseFloat(qty_input.getAttribute('max'));
                button.addEventListener('click', function (e) {
                  if (e.target.closest('DIV').classList.contains('minus')) {
                    var oldValue = parseFloat(qty_input.value);
                    if (isNaN(oldValue)) {
                      qty_input.val = 0;
                    }
                    qty_input.value = oldValue - qty_step < qty_min ? qty_min : oldValue - qty_step;
                  } else {
                    var _oldValue = parseFloat(qty_input.value);
                    if (isNaN(_oldValue)) {
                      qty_input.val = 0;
                    }
                    qty_input.value = _oldValue + qty_step > qty_max ? qty_max : _oldValue + qty_step;
                  }
                  qty_input.addEventListener('change', function () {
                    themeAjaxQuantity(qty_input.value, e.target);
                    if (self.classList.contains('ajax-quantity') && qty_input.value === '0') {
                      qty_input.value = 1;
                    }
                  });
                  qty_input.dispatchEvent(new Event('change'));
                });
              });
            }
          };
          changeQuantity();
          if (!self.classList.contains('ajax-quantity')) {
            $('body').on('updated_cart_totals', changeQuantity);
          }
        };
        for (var i = 0; i < container.length; i++) {
          _loop2();
        }
      }
    },
    loginPage: function loginPage() {
      var tab = document.querySelectorAll('.login-page-tab li');
      var form = document.querySelector('.login-form-container');
      if (tab !== null && form !== null) {
        var removeClass = function removeClass() {
          for (var i = 0; i < tab.length; i++) {
            if (tab[i].children[0].classList.contains('active')) {
              tab[i].children[0].classList.remove('active');
            }
          }
        };
        for (var i = 0; i < tab.length; i++) {
          var button = tab[i].children[0];
          button.addEventListener('click', function (event) {
            event.preventDefault();
            if (!event.target.classList.contains('active')) {
              removeClass();
              event.target.classList.add('active');
              form.classList.toggle('show-register-form');
            }
          });
        }
      }
    },
    gdpr: function gdpr() {
      var _Motion5 = Motion,
        animate = _Motion5.animate,
        inView = _Motion5.inView,
        stagger = _Motion5.stagger;
      var body = document.querySelector('body');
      var close = document.querySelector('.site-gdpr .btn');
      var gdpr = document.querySelector('.site-gdpr');
      if (!gdpr) return;
      var expiresDate = parseInt(gdpr.dataset.expires) || 30;

      // Initial state
      gdpr.style.opacity = '0';
      gdpr.style.visibility = 'hidden';
      gdpr.style.transform = 'translateY(100%)';
      var showGdpr = function showGdpr() {
        animate(gdpr, {
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)'
        }, {
          duration: 0.3,
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)' // power4.inOut easing equivalent
        });
        gdpr.classList.add('active');
      };
      var hideGdpr = function hideGdpr() {
        animate(gdpr, {
          opacity: 0,
          visibility: 'hidden',
          transform: 'translateY(100%)'
        }, {
          duration: 0.3,
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
          onComplete: function onComplete() {
            gdpr.classList.remove('active');
          }
        });
      };
      if (body.classList.contains('cookie-popup-enable') && !Cookies.get('cookie-popup-visible')) {
        window.addEventListener('DOMContentLoaded', showGdpr);
      }
      close.addEventListener('click', function (e) {
        e.preventDefault();
        Cookies.set('cookie-popup-visible', 'disable', {
          expires: expiresDate,
          path: '/'
        });
        hideGdpr();
      });
    },
    lightBox: function lightBox() {
      var gallery = document.querySelectorAll('.site-lightbox-gallery');
      if (gallery.length === 0) return;
      gallery.forEach(function (self) {
        var LeftArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>';
        var RightArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>';
        var ZoomIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fullscreen"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="8" x="7" y="8" rx="1"/></svg>';
        var CloseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        console.log(self);
        var lightbox = new PhotoSwipeLightbox({
          gallery: self,
          children: '.gallery-item',
          showHideAnimationType: "zoom",
          arrowPrevSVG: LeftArrow,
          arrowNextSVG: RightArrow,
          closeSVG: CloseIcon,
          zoomSVG: ZoomIcon,
          pswpModule: PhotoSwipe
        });
        lightbox.init();
      });
    },
    newsletterLightbox: function newsletterLightbox() {
      var lightbox = document.querySelector('.site-subscribe-lightbox');
      var body = document.querySelector('body');
      if (!lightbox) return;
      var expiresDate = parseInt(lightbox.dataset.expires) || 15;
      var lightboxClose = lightbox.querySelector('.close-popup-button');
      var closeButton = lightbox.querySelector('.site-close a');
      if (body.classList.contains('newsletter-lightbox-enable') && !Cookies.get('newsletter-lightbox-visible')) {
        window.addEventListener('DOMContentLoaded', function () {
          lightbox.classList.add('active');
        });
        [lightboxClose, closeButton].forEach(function (button) {
          button.addEventListener('click', function (e) {
            e.preventDefault();
            Cookies.set('newsletter-lightbox-visible', 'disable', {
              expires: expiresDate,
              path: '/'
            });
            lightbox.classList.remove('active');
          });
        });
      }
    }
  };
  MEDIT_THEME.init();
})(jQuery);