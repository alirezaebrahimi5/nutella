/* global a2a*/
(function (Drupal) {
    'use strict';
  
    Drupal.behaviors.addToAny = {
      attach: function (context, settings) {
        // If not the full document (it's probably AJAX), and window.a2a exists
        if (context !== document && window.a2a) {
          a2a.init_all(); // Init all uninitiated AddToAny instances
        }
      }
    };
  
  })(Drupal);
  ;
  /**
   * author Christopher Blum
   *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
   *    - forked from http://github.com/zuk/jquery.inview/
   */
  (function (factory) {
    if (typeof define == 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node, CommonJS
      module.exports = factory(require('jquery'));
    } else {
        // Browser globals
      factory(jQuery);
    }
  }(function ($) {
  
    var inviewObjects = [], viewportSize, viewportOffset,
        d = document, w = window, documentElement = d.documentElement, timer;
  
    $.event.special.inview = {
      add: function(data) {
        inviewObjects.push({ data: data, $element: $(this), element: this });
        // Use setInterval in order to also make sure this captures elements within
        // "overflow:scroll" elements or elements that appeared in the dom tree due to
        // dom manipulation and reflow
        // old: $(window).scroll(checkInView);
        //
        // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
        // intervals while the user scrolls. Therefore the inview event might fire a bit late there
        //
        // Don't waste cycles with an interval until we get at least one element that
        // has bound to the inview event.
        if (!timer && inviewObjects.length) {
           timer = setInterval(checkInView, 250);
        }
      },
  
      remove: function(data) {
        for (var i=0; i<inviewObjects.length; i++) {
          var inviewObject = inviewObjects[i];
          if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
            inviewObjects.splice(i, 1);
            break;
          }
        }
  
        // Clear interval when we no longer have any elements listening
        if (!inviewObjects.length) {
           clearInterval(timer);
           timer = null;
        }
      }
    };
  
    function getViewportSize() {
      var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };
  
      // if this is correct then return it. iPad has compat Mode, so will
      // go into check clientHeight/clientWidth (which has the wrong value).
      if (!size.height) {
        mode = d.compatMode;
        if (mode || !$.support.boxModel) { // IE, Gecko
          domObject = mode === 'CSS1Compat' ?
            documentElement : // Standards
            d.body; // Quirks
          size = {
            height: domObject.clientHeight,
            width:  domObject.clientWidth
          };
        }
      }
  
      return size;
    }
  
    function getViewportOffset() {
      return {
        top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
        left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
      };
    }
  
    function checkInView() {
      if (!inviewObjects.length) {
        return;
      }
  
      var i = 0, $elements = $.map(inviewObjects, function(inviewObject) {
        var selector  = inviewObject.data.selector,
            $element  = inviewObject.$element;
        return selector ? $element.find(selector) : $element;
      });
  
      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();
  
      for (; i<inviewObjects.length; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i][0])) {
          continue;
        }
  
        var $element      = $($elements[i]),
            elementSize   = { height: $element[0].offsetHeight, width: $element[0].offsetWidth },
            elementOffset = $element.offset(),
            elementDiff = $element.is('[data-diff]') ? $element.data('diff') : 40,
            triggerOntop = $element.is('[data-top]'),
            inView        = $element.data('inview');
  
        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }
        var top = elementOffset.top + Number(elementDiff) + (triggerOntop ? (viewportSize.height * .8) : 0);
        if (
            top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          if (!inView) {
            $element.data('inview', true).trigger('inview', [true]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }
  
    $(w).on("scroll resize scrollstop", function() {
      viewportSize = viewportOffset = null;
    });
  
    // IE < 9 scrolls to focused elements without firing the "scroll" event
    if (!documentElement.addEventListener && documentElement.attachEvent) {
      documentElement.attachEvent("onfocusin", function() {
        viewportOffset = null;
      });
    }
  }));
  ;
  /*! modernizr 3.6.0 (Custom Build) | MIT *
   * https://modernizr.com/download/?-csspositionsticky-objectfit-touchevents-mq-setclasses !*/
  !function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function i(e){var t=x.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?x.className.baseVal=t:x.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(){var e=t.body;return e||(e=s(_?"svg":"body"),e.fake=!0),e}function l(e,n,r,o){var i,l,u,f,c="modernizr",p=s("div"),d=a();if(parseInt(r,10))for(;r--;)u=s("div"),u.id=o?o[r]:c+(r+1),p.appendChild(u);return i=s("style"),i.type="text/css",i.id="s"+c,(d.fake?d:p).appendChild(i),d.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),p.id=c,d.fake&&(d.style.background="",d.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(d)),l=n(p,e),d.fake?(d.parentNode.removeChild(d),x.style.overflow=f,x.offsetHeight):p.parentNode.removeChild(p),!!l}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(e,t){return!!~(""+e).indexOf(t)}function c(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?c(o,n||t):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function v(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+d(t[o])+":"+r+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==m(e,null,"position")})}return n}function h(e,t,o,i){function a(){c&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=v(e,o);if(!r(l,"undefined"))return l}for(var c,p,d,m,h,y=["modernizr","tspan","samp"];!N.style&&y.length;)c=!0,N.modElem=s(y.shift()),N.style=N.modElem.style;for(d=e.length,p=0;d>p;p++)if(m=e[p],h=N.style[m],f(m,"-")&&(m=u(m)),N.style[m]!==n){if(i||r(o,"undefined"))return a(),"pfx"==t?m:!0;try{N.style[m]=o}catch(g){}if(N.style[m]!=h)return a(),"pfx"==t?m:!0}return a(),!1}function y(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+j.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?h(a,t,o,i):(a=(e+" "+P.join(s+" ")+s).split(" "),p(a,t,n))}var g=[],C=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var x=t.documentElement,_="svg"===x.nodeName.toLowerCase(),b=S._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];S._prefixes=b;var w=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();S.mq=w;var z=S.testStyles=l;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",b.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");z(r,function(e){n=9===e.offsetTop})}return n});var T="Moz O ms Webkit",j=S._config.usePrefixes?T.split(" "):[];S._cssomPrefixes=j;var E=function(t){var r,o=b.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var s=0;o>s;s++){var a=b[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+t}return!1};S.atRule=E;var P=S._config.usePrefixes?T.toLowerCase().split(" "):[];S._domPrefixes=P;var k={elem:s("modernizr")};Modernizr._q.push(function(){delete k.elem});var N={style:k.elem.style};Modernizr._q.unshift(function(){delete N.style}),S.testAllProps=y;var L=S.prefixed=function(e,t,n){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=u(e)),t?y(e,t,n):y(e,"pfx"))};Modernizr.addTest("objectfit",!!L("objectFit"),{aliases:["object-fit"]}),Modernizr.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=s("a"),r=n.style;return r.cssText=e+b.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)}),o(),i(g),delete S.addTest,delete S.addAsyncTest;for(var O=0;O<Modernizr._q.length;O++)Modernizr._q[O]();e.Modernizr=Modernizr}(window,document);;
  /*! lazysizes - v5.1.2 */
  !function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}("undefined"!=typeof window?window:{},function(a,b){"use strict";var c,d;if(function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b])}(),!b||!b.getElementsByClassName)return{init:function(){},cfg:d,noSupport:!0};var e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("Event");return e||(e={}),e.instance=c,h.initEvent(d,!f,!g),h.detail=e,a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),e({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=!0===a)&&(g=33),b||(b=!0,d=e-(f.now()-c),d<0&&(d=0),a||d<9?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;a<d?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}},D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K=/^img$/i,L=/^iframe$/i,M="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),N=0,O=0,P=0,Q=-1,R=function(a){P--,(!a||P<0||!a.target)&&(P=0)},S=function(a){return null==J&&(J="hidden"==x(b.body,"visibility")),J||!("hidden"==x(a.parentNode,"visibility")&&"hidden"==x(a,"visibility"))},T=function(a,c){var d,f=a,g=S(a);for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)(g=(x(f,"opacity")||1)>0)&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},U=function(){var a,f,h,j,k,m,n,p,q,r,s,t,u=c.elements;if((o=d.loadMode)&&P<8&&(a=u.length)){for(f=0,Q++;f<a;f++)if(u[f]&&!u[f]._lazyRace)if(!M||c.prematureUnveil&&c.prematureUnveil(u[f]))aa(u[f]);else if((p=u[f][i]("data-expand"))&&(m=1*p)||(m=O),r||(r=!d.expand||d.expand<1?e.clientHeight>500&&e.clientWidth>500?500:370:d.expand,c._defEx=r,s=r*d.expFactor,t=d.hFac,J=null,O<s&&P<1&&Q>2&&o>2&&!b.hidden?(O=s,Q=0):O=o>1&&Q>1&&P<6?r:N),q!==m&&(y=innerWidth+m*t,D=innerHeight+m,n=-1*m,q=m),h=u[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*t&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||S(u[f]))&&(l&&P<3&&!p&&(o<3||Q<4)||T(u[f],m))){if(aa(u[f]),k=!0,P>9)break}else!k&&l&&!j&&P<4&&Q<4&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=u[f][i](d.sizesAttr)))&&(j=g[0]||u[f]);j&&!k&&aa(j)}},V=B(U),W=function(a){var b=a.target;if(b._lazyCache)return void delete b._lazyCache;R(a),s(b,d.loadedClass),t(b,d.loadingClass),u(b,Y),v(b,"lazyloaded")},X=A(W),Y=function(a){X({target:a.target})},Z=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},$=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},_=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},s(a,d.loadingClass),p&&(clearTimeout(m),m=k(R,2500),u(a,Y,!0)),l&&q.call(j.getElementsByTagName("source"),$),h?a.setAttribute("srcset",h):g&&!l&&(L.test(a.nodeName)?Z(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){var b=a.complete&&a.naturalWidth>1;p&&!b||(b&&s(a,"ls-is-cached"),W(o),a._lazyCache=!0,k(function(){"_lazyCache"in a&&delete a._lazyCache},9)),"lazy"==a.loading&&P--},!0)}),aa=function(a){if(!a._lazyRace){var b,c=K.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,P++,_(a,b,f,e,c))}},ba=C(function(){d.loadMode=3,V()}),ca=function(){3==d.loadMode&&(d.loadMode=2),ba()},da=function(){if(!l){if(f.now()-p<999)return void k(da,999);l=!0,d.loadMode=3,V(),j("scroll",ca,!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),j("scroll",V,!0),j("resize",V,!0),a.MutationObserver?new MutationObserver(V).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",V,!0),e[h]("DOMAttrModified",V,!0),setInterval(V,999)),j("hashchange",V,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(a){b[h](a,V,!0)}),/d$|^c/.test(b.readyState)?da():(j("load",da),b[h]("DOMContentLoaded",V),k(da,2e4)),c.elements.length?(U(),z._lsFlush()):V()},checkElems:V,unveil:aa,_aLSL:ca}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;f<g;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width)&&d!==a._lazysizesWidth&&c(a,f,e,d))},f=function(){var b,c=a.length;if(c)for(b=0;b<c;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){!F.i&&b.getElementsByClassName&&(F.i=!0,E._(),D._())};return k(function(){d.init&&F()}),c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}});
  ;
  /*! lazysizes - v4.0.3 */
  !function(a,b){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}(window,function(a,b,c){"use strict";function d(a,c){if(!g[a]){var d=b.createElement(c?"link":"script"),e=b.getElementsByTagName("script")[0];c?(d.rel="stylesheet",d.href=a):d.src=a,g[a]=!0,g[d.src||d.href]=!0,e.parentNode.insertBefore(d,e)}}var e,f,g={};b.addEventListener&&(f=/\(|\)|\s|'/,e=function(a,c){var d=b.createElement("img");d.onload=function(){d.onload=null,d.onerror=null,d=null,c()},d.onerror=d.onload,d.src=a,d&&d.complete&&d.onload&&d.onload()},addEventListener("lazybeforeunveil",function(a){if(a.detail.instance==c){var b,g,h,i;a.defaultPrevented||("none"==a.target.preload&&(a.target.preload="auto"),b=a.target.getAttribute("data-link"),b&&d(b,!0),b=a.target.getAttribute("data-script"),b&&d(b),b=a.target.getAttribute("data-require"),b&&(c.cfg.requireJs?c.cfg.requireJs([b]):d(b)),h=a.target.getAttribute("data-bg"),h&&(a.detail.firesLoad=!0,g=function(){a.target.style.backgroundImage="url("+(f.test(h)?JSON.stringify(h):h)+")",a.detail.firesLoad=!1,c.fire(a.target,"_lazyloaded",{},!0,!0)},e(h,g)),i=a.target.getAttribute("data-poster"),i&&(a.detail.firesLoad=!0,g=function(){a.target.poster=i,a.detail.firesLoad=!1,c.fire(a.target,"_lazyloaded",{},!0,!0)},e(i,g)))}},!1))});;
  /*! npm.im/object-fit-images 3.2.4 */
  var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();
  ;
  function addtoany_onshare(a){}String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(a,b){var c=b>0?0|b:0;return this.substring(c,c+a.length)===a}});var waitForFinalEvent=function(){var a={};return function(b,c,d){d||(d="Don't call this twice without a uniqueId"),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}(),App=function(a){function b(){c=this,this.set_events()}var c,d=null,e=0;return b.prototype.fit_images=function(b){b.each(function(){var b=a(this),c=a("img",b);if(c.length>0){var d=c[0],e=d.currentSrc||d.src;b.css("background-image","url("+e+")"),c.css("opacity","0")}})},b.prototype.hoverSupport=function(){return Modernizr.mq("not all and (pointer: coarse)")},b.prototype.isTablet=function(){return Modernizr.mq("(max-width: 1023px)")},b.prototype.isDesktop=function(){return Modernizr.mq("(min-width: 1024px)")},b.prototype.isMobile=function(){return Modernizr.mq("(max-width: 767px)")},b.prototype.getCurrentDevice=function(){return this.isMobile()?"mobile":this.isTablet()?"tablet":"desktop"},b.prototype.freezeBody=function(b){var c=a("body"),d=void 0===b||b;d&&setTimeout(function(){e=a(window).scrollTop()},1e3),void 0!==b?c.toggleClass("blockScroll",!!d):c.addClass("blockScroll"),d||a(window).scrollTop(e)},b.prototype.set_events=function(){a(document).on("click",".toggleMore",function(){var b=a(this),c=a(b.data("target"));c.hasClass("opened")?(c.removeClass("opened"),b.attr("aria-expanded","false")):(c.addClass("opened"),b.attr("aria-expanded","true"))}).on("click",".scrollToContent",function(){a("html,body").animate({scrollTop:a(this).offset().top-a("#nutella-header").outerHeight()})}),objectFitImages(),a(document).ready(function(){a(".nutInview").one("inview",function(b,c){c&&a(this).addClass("inviewed")})}),d=this.getCurrentDevice(),a("html").addClass(Modernizr.touchevents?"no-hover":"has-hover"),a(window).resize(function(){waitForFinalEvent(function(){a(window).trigger("resize_end"),d!==c.getCurrentDevice()&&(a("body").hasClass("fancybox-active")||window.location.reload())},500,"resize")}).on("load",function(){a("body").addClass("siteLoaded")}),a(".tmpstaticimg").remove()},b}(jQuery);window.Nutella=new App;var a2a_config=a2a_config||{};a2a_config.callbacks=a2a_config.callbacks||[],a2a_config.callbacks.push({share:addtoany_onshare});;
  var ease={cubicInOut:function(a){return a<.5?4*a*a*a:.5*Math.pow(2*a-2,3)+1}},MenuShape=function(){function a(a){b=this,this.elm=a,this.path=a.querySelectorAll("path"),this.numPoints=4,this.duration=800,this.delayPointsArray=[],this.delayPointsMax=180,this.delayPerPath=70,this.timeStart=Date.now(),this.isOpened=!1,this.isAnimating=!1}var b;return a.prototype.toggle=function(){this.isAnimating=!0;for(var a=Math.random()*Math.PI*2,c=0;c<this.numPoints;c++){var d=c/(this.numPoints-1)*Math.PI*2;this.delayPointsArray[c]=(Math.sin(d+a)+1)/2*this.delayPointsMax}!1===this.isOpened?this.open():(this.isOpened=!1,setTimeout(function(){b.close()},200))},a.prototype.open=function(){this.isOpened=!0,this.elm.classList.add("is-opened"),this.timeStart=Date.now(),this.renderLoop(),jQuery(".navToggle").attr("aria-expanded","true"),jQuery("#main-content, #nutella-footer").attr("aria-hidden","true"),setTimeout(function(){jQuery("html").addClass("menu-opened")},500)},a.prototype.close=function(){this.isOpened=!1,this.elm.classList.remove("is-opened"),this.timeStart=Date.now(),this.renderLoop(),jQuery(".navToggle").attr("aria-expanded","false"),jQuery("html").addClass("menu-outing"),setTimeout(function(){jQuery("html").removeClass("menu-opened menu-outing")},500),jQuery(window).trigger("menuClosed"),jQuery("#main-content, #nutella-footer").attr("aria-hidden","false")},a.prototype.updatePath=function(a){for(var b=[],c=0;c<this.numPoints;c++)b[c]=100*ease.cubicInOut(Math.min(Math.max(a-this.delayPointsArray[c],0)/this.duration,1));var d="";d+=this.isOpened?"M 0 0 V "+b[0]+" ":"M 0 "+b[0]+" ";for(var c=0;c<this.numPoints-1;c++){var e=(c+1)/(this.numPoints-1)*100,f=e-1/(this.numPoints-1)*100/2;d+="C "+f+" "+b[c]+" "+f+" "+b[c+1]+" "+e+" "+b[c+1]+" "}return d+=this.isOpened?"V 0 H 0":"V 100 H 0"},a.prototype.render=function(){if(this.isOpened)for(var a=0;a<this.path.length;a++)this.path[a].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*a)));else for(var a=0;a<this.path.length;a++)this.path[a].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*(this.path.length-a-1))))},a.prototype.renderLoop=function(){this.render(),Date.now()-this.timeStart<this.duration+this.delayPerPath*(this.path.length-1)+this.delayPointsMax?requestAnimationFrame(function(){b.renderLoop()}):this.isAnimating=!1},a}();!function(a){var b=a("html"),c=document.querySelector(".shape-overlays"),d=new MenuShape(c);window.menuOverlay=d,a(".m-group .navToggle").insertAfter(".m-group .block-system-branding-block"),a(".navToggle").on("click",function(){if(d.isAnimating)return!1;d.toggle(),!0===d.isOpened&&a(window).trigger("menuOpened"),b.removeClass("search-active")});var e=a(".menu--main > ul > li.in-active-trail");if(Nutella.isMobile()&&0===e.length){var f=a(".m-group .menu--main > ul > li:last-child");f.addClass("opened"),a(".aria-button",f).attr("aria-expanded","true")}if(Modernizr.touchevents||a(".m-item .hoverText").each(function(){var b=a(this).data("hover-text");a(this).attr("data-hover-text","").append('<div aria-hidden="true" class="htxt">'+b+"</div>")}),a(document).on("click",".has-c > a, .aria-button",function(b){if(Modernizr.touchevents&&Modernizr.mq("(min-width: 768px)"))a(this).parents(".menu-item").hasClass("opened")||(b.preventDefault(),a(this).parents(".menu-item").addClass("opened")),a(this).parent().siblings().removeClass("opened");else if(a(b.target).is("button")){var c=a(this).parents(".menu-item");b.preventDefault(),c.siblings().removeClass("opened in-active-trail"),c.siblings().find(".aria-button").attr("aria-expanded",!1),c.hasClass("in-active-trail")?c.removeClass("opened in-active-trail"):c.hasClass("opened")?(c.removeClass("opened"),a(this).attr("aria-expanded","false")):(c.addClass("opened"),a(this).attr("aria-expanded","true"))}}),a(".menu-item.has-c").on("mouseenter focusin",function(){a('a[aria-expanded="false"]',this).attr("aria-expanded","true")}).on("mouseleave focusout",function(){a('a[aria-expanded="true"]',this).attr("aria-expanded","false")}),"object"==typeof Modernizr&&!Modernizr.csspositionsticky){var g=!1;a(window).on("scroll",function(){a(this).scrollTop()>=64?g||(g=!0,b.addClass("hfixed")):g&&(g=!1,b.removeClass("hfixed"))})}var h=!1;try{localStorage.getItem("a11ydebug")&&(h=!0)}catch(a){}jQuery(document).keyup(function(b){9==b.which&&d.isOpened&&0===a(document.activeElement).parents(".m-group").length&&d.close(),9==b.which&&h&&console.log(document.activeElement)})}(jQuery);;
  /**
  * DO NOT EDIT THIS FILE.
  * See the following change record for more information,
  * https://www.drupal.org/node/2815083
  * @preserve
  **/
  
  (function ($, once) {
    var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
    var originalJQOnce = $.fn.once;
    var originalJQRemoveOnce = $.fn.removeOnce;
  
    $.fn.once = function jQueryOnce(id) {
      Drupal.deprecationError({
        message: "jQuery.once() ".concat(deprecatedMessageSuffix)
      });
      return originalJQOnce.apply(this, [id]);
    };
  
    $.fn.removeOnce = function jQueryRemoveOnce(id) {
      Drupal.deprecationError({
        message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
      });
      return originalJQRemoveOnce.apply(this, [id]);
    };
  
    var drupalOnce = once;
  
    function augmentedOnce(id, selector, context) {
      originalJQOnce.apply($(selector, context), [id]);
      return drupalOnce(id, selector, context);
    }
  
    function remove(id, selector, context) {
      originalJQRemoveOnce.apply($(selector, context), [id]);
      return drupalOnce.remove(id, selector, context);
    }
  
    window.once = Object.assign(augmentedOnce, drupalOnce, {
      remove: remove
    });
  })(jQuery, once);;
  /*! js-cookie v3.0.1 | MIT */
  !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
  ;
  