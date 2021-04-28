(function(window,document,navigator,location,screen,Object,Function,Array,String,Math,setTimeout,clearTimeout,parseFloat,parseInt,undefined){"use strict";
/*
 Copyright 2012-2014 pettanR team.
 https://sourceforge.jp/projects/pettanr/
 BSD 3-Clause License
*/
Function.prototype.apply || (Function.prototype.apply = function(a, b) {
  var c;
  a = a || window;
  b = b || [];
  a === window ? a.__apply = void 0 : a.constructor && a.constructor.prototype.__apply ? delete a.constructor.prototype.__apply : a.__apply && delete a.__apply;
  a.__apply = this;
  a.__apply || (a.constructor.prototype.__apply = this);
  var d = b.length;
  switch(d) {
    case 0:
      var e = a.__apply();
      break;
    case 1:
      e = a.__apply(b[0]);
      break;
    case 2:
      e = a.__apply(b[0], b[1]);
      break;
    case 3:
      e = a.__apply(b[0], b[1], b[2]);
      break;
    case 4:
      e = a.__apply(b[0], b[1], b[2], b[3]);
      break;
    case 5:
      e = a.__apply(b[0], b[1], b[2], b[3], b[4]);
      break;
    case 6:
      e = a.__apply(b[0], b[1], b[2], b[3], b[4], b[5]);
      break;
    case 7:
      e = a.__apply(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
      break;
    case 8:
      e = a.__apply(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
      break;
    case 9:
      e = a.__apply(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
      break;
    default:
      e = [];
      for (c = 0; c < d; ++c) {
        e[c] = "y[" + c + "]";
      }
      e = (new Function("x,y", "return x.__apply(" + e.join(",") + ")"))(a, b);
  }
  a === window ? a.__apply = void 0 : a.constructor && a.constructor.prototype.__apply ? delete a.constructor.prototype.__apply : a.__apply && delete a.__apply;
  return e;
});
Function.prototype.call || (Function.prototype.call = function() {
  for (var a = arguments, b = a[0], c = [], d = 1, e = a.length; d < e; ++d) {
    c[d - 1] = a[d];
  }
  return this.apply(b, c);
});
Array.prototype.pop || (Array.prototype.pop = function() {
  var a = this[this.length - 1];
  --this.length;
  return a;
});
Array.prototype.push || (Array.prototype.push = function() {
  for (var a = arguments, b = 0, c = a.length, d = this.length; b < c; ++b) {
    this[d + b] = a[b];
  }
  return this.length;
});
Array.prototype.shift || (Array.prototype.shift = function() {
  for (var a = this[0], b = 1, c = this.length; b < c; ++b) {
    this[b - 1] = this[b];
  }
  --this.length;
  return a;
});
Array.prototype.unshift || (Array.prototype.unshift = function() {
  for (var a = arguments, b = a.length, c = this.length += b - 1, d = c; d >= b; --d) {
    this[d] = this[d - b];
  }
  for (d = 0; d < b; ++d) {
    this[d] = a[d];
  }
  return c;
});
Array.prototype.splice || (Array.prototype.splice = function(a, b) {
  var c = arguments, d = c.length - 2 - b, e = this.slice(a, a + b), g;
  if (0 < d) {
    var f = this.length - 1;
    for (g = a + b; f >= g; --f) {
      this[f + d] = this[f];
    }
  } else {
    if (0 > d) {
      f = a + b;
      for (g = this.length; f < g; ++f) {
        this[f + d] = this[f];
      }
      this.length += d;
    }
  }
  f = 2;
  for (g = c.length; f < g; ++f) {
    this[f - 2 + a] = c[f];
  }
  return e;
});
Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
  var c = this.length >>> 0;
  if (0 === c) {
    return -1;
  }
  if (b) {
    var d = b || 0;
    d = -Infinity === d ? 0 : (0 > d ? -d : d) | 0;
    if (c <= d) {
      return -1;
    }
  }
  for (d = 0 <= d ? d : 0 < c + d ? c + d : 0; d < c; ++d) {
    if (this[d] === a) {
      return d;
    }
  }
  return -1;
});
var _builtin_skipEncodeURI = function() {
  var a = {}, b;
  for (b = 71; b;) {
    a["!'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".charCodeAt(--b)] = 2;
  }
  for (b = 12; b;) {
    a["#$&+,-/:;=?@".charCodeAt(--b)] = 1;
  }
  return a;
}();
window.encodeURI || (window.encodeURI = function(a) {
  return _builtin_encodeURI(a, 0);
});
window.encodeURIComponent || (window.encodeURIComponent = function(a) {
  return _builtin_encodeURI(a, 1);
});
function _builtin_encodeURI(a, b) {
  var c = [], d = _builtin_skipEncodeURI, e = 0, g, f;
  a += "";
  for (g = a.length; e < g; ++e) {
    var k = b < d[f = a.charCodeAt(e)] ? a.charAt(e) : (16 > f ? "%0" + f.toString(16) : 128 > f ? "%" + f.toString(16) : 2048 > f ? "%" + (f >> 6 | 192).toString(16) + "%" + (f & 63 | 128).toString(16) : "%" + (f >> 12 | 224).toString(16) + "%" + (f >> 6 & 63 | 128).toString(16) + "%" + (f & 63 | 128).toString(16)).toUpperCase();
    c[e] = k;
  }
  return c.join("");
}
function _builtin_decodeURI(a) {
  var b = [], c = parseInt, d = String.fromCharCode, e = -1, g = 0, f;
  a += "";
  for (f = a.length; g < f; ++g) {
    if (h) {
      var k = c(a.substr(g, 2), 16);
      ++g;
      if (127 < k) {
        if (223 < k) {
          var h = (k & 15) << 12;
          k = c(a.substr(g + 2, 2), 16) & 63;
          g += 3;
          h += k << 6;
        } else {
          h = (k & 63) << 6;
        }
        k = c(a.substr(g + 2, 2), 16) & 63;
        g += 3;
        k += h;
      }
      b[++e] = d(k);
      h = !1;
    } else {
      k = a.charAt(g), (h = "%" === k) || (b[++e] = k);
    }
  }
  return b.join("");
}
window.decodeURI || (window.decodeURI = _builtin_decodeURI);
window.decodeURIComponent || (window.decodeURIComponent = window.decodeURI);
function X(a) {
  if (X_Type_isFunction(a)) {
    X.ViewPort.listenOnce(X_EVENT_XDOM_READY, a);
  } else {
    if (X_shortcutFunction) {
      return X_shortcutFunction.apply(X_shortcutContext || X, arguments);
    }
  }
}
var X_EMPTY_OBJECT = {}, X_TEMP = {onSystemReady:[]}, X_emptyFunction = new Function, X_shortcutFunction, X_shortcutContext, g_X_uniqueStamp = 0, X_HAS_DEV_TOOL = !!window.console, X_IS_DEV = !0, X_DEFINE_IS_TEST = !1, X_USE_DOM_RANGE = !0, X_USE_AUDIO = !0, X_USE_GAMEPAD = !0, X_USE_JSONDB = !0, X_DEFINE_BUILD_TIMESTAMP = 1619601117698;
X_IS_DEV ? (X.buildTimeStamp = X_DEFINE_BUILD_TIMESTAMP, X_HAS_DEV_TOOL || (console = {log:X_emptyFunction, dir:X_emptyFunction})) : X_HAS_DEV_TOOL && (console.log = console.dir = function() {
});
function X_error(a) {
  X_HAS_DEV_TOOL ? eval('throw "' + a + '"') : alert(a);
}
X.VERSION = "0.7.0";
X.bootTime = +new Date;
X.emptyFunction = X_emptyFunction;
X.inHead = function(a) {
  if (!a || !a.length) {
    return !1;
  }
  a = a[a.length - 1];
  a = a.parentElement || a.parentNode || a;
  return "head" === a.tagName.toLowerCase();
}(document.scripts || document.getElementsByTagName && document.getElementsByTagName("script") || document.all && document.all.tags("script"));
var X_UA = X.UA = {}, whatBrowserAmI = X_UA;
(function(a, b, c, d, e, g, f, k) {
  function h(a, b) {
    var c = g(a.split(b)[1]);
    return 0 <= c ? c : 0;
  }
  function l(a, b) {
    return 0 <= a.indexOf(b);
  }
  function p(a) {
    return l(a, "Linux armv") || l(a, "Linux aarch") || l(a, "Linux i686") || l(a, "Linux x86_64");
  }
  function w(a, b) {
    for (var c in b) {
      if (c === a) {
        return !0;
      }
    }
  }
  function m(a, b) {
    var c = "", d = -1, e;
    if (a = a.split(b)[1]) {
      for (; e = a.charCodeAt(++d);) {
        if (48 <= e && 57 >= e || 46 === e) {
          c += a.charAt(d);
        } else {
          break;
        }
      }
      for (d = c.length; d;) {
        if (46 === c.charCodeAt(--d)) {
          c = c.substr(0, d);
        } else {
          break;
        }
      }
    }
    return c;
  }
  function v(a, b) {
    var c = 0, d;
    a = a.split(".");
    b = b.split(".");
    for (d = Math.min(a.length, b.length); c < d; ++c) {
      var e = g(a[c]), f = g(b[c]);
      if (e !== f) {
        return e > f ? 1 : -1;
      }
    }
    return a.length === b.length ? 0 : a.length > b.length ? 1 : -1;
  }
  function q() {
    for (var a = arguments, b = 1, c = a.length, d = a[0], e; b < c; ++b) {
      0 > v(d, e = a[b]) && (d = e);
    }
    return d;
  }
  function t(a) {
    return a === a + "" ? a : a === a - 0 ? "" + a : a.min && a.max ? a.min + "~" + a.max : a.min ? a.min + "~" : "~" + a.max;
  }
  function y(a) {
    return a === a + "" ? g(a) : a;
  }
  var u, x, n = d.userAgent, F = d.appVersion, G = g(F) | 0, D = d.platform, A = c.documentElement, I = A && A.style, O = c.documentMode, U = e.width, za = e.height, La = b.HTMLAudioElement, Ma = b.performance, Na = b.Int8Array, mb = void 0 !== b.ontouchstart, Y = m(F, "Version/") || m(n, "Version/"), ca = !Oa && b.opera, Pa = ca && (ca.version && "function" === typeof ca.version ? ca.version() : q(m(n, "Opera "), Y, "" + G)), Qa = b.opr, ha = !ca && (c.all || O), R = ha && (O ? O : b.XMLHttpRequest ? 
  c.getElementsByTagName ? 7 : 4 : c.compatMode ? 6 : (0).toFixed ? 5.5 : b.attachEvent ? 5 : 4), na = !ha && A.msContentZoomFactor, da = !na && b.chrome, ea = !ha && void 0 !== I.MozAppearance, Oa = b.operamini, oa = l(n, "UCWEB"), nb = oa && m(n, " U2/"), ob = oa && m(n, "; wds "), Aa = m(n.split("_").join("."), "; iPh OS "), pb = m(n, "; Adr "), Ra = l(F, "YJApp-ANDROID"), S = l(D, "Android") || ea && l(F, "Android") || Ra, M = m(D, "Android ") || m(F, "Android ") || m(n, "Android ") || pb, Ba = 
  l(D, "Linux"), Ca = "MacIntel" === D && void 0 !== d.standalone, Da = ea && m(n, "Goanna/"), V = !Da && ea && m(n, "rv:"), Sa = m(n, "Firefox/"), Ta = m(n, "Opera/"), Ua = b.FNRBrowser, H = h(n, "AppleWebKit/"), aa = m(n, "Chrome/"), pa = m(n, "OPR/"), qb = m(F, "KHTML/"), Va = m(n.toLowerCase(), "iris"), Ea = m(n, "FxiOS/"), rb = m(n, "CriOS/"), sb = m(n, "EdgiOS/"), Fa = m(n, "Silk/"), fa = h(n, "SamsungBrowser/"), ia;
  if (ia = !fa) {
    a: {
      for (var Wa = "GT-I9300 GT-I9305 SHV-E210 SGH-T999L SGH-I747 SGH-N064 SC-06D SGH-N035 SC-03E SCH-J021 SCL21 SCH-R530 SCH-I535 SCH-S960L SCH-S968C GT-I9308 SCH-I939 SHV-E210S GT-I8160 GT-I8260 GT-I8262 SM-G350 SM-G352 SM-G386F SM-G386T1GT-N7000 GT-N7005 SHV-E160 SC-05D SGH-N054 SGH-I717 SGH-T879 GT-I9220 GT-I9228 SCH-I889 GT-N7100 GT-N7105 SCH-I605 SCH-R950 SGH-I317 SGH-T889 SPH-L900 SCH-N719 GT-N7102 GT-N7108 SGH-N025 SC-02E SHV-E250 GT-N5100 GT-N5110 GT-N5120 GT-N8000 GT-N8005 GT-N8010 GT-N8013 GT-N8020 GT-I9100 GT-I9108 GT-I9210 SGH-I777 SGH-I757M SGH-I727 SGH-I927 SGH-T989 SHW-M250 SPH-D710 ISW11SC SC-02C SCH-R760 SCH-I929 GT-I9105 GT-I8190 GT-I8200 SM-G730A GT-P3100 GT-P3110 GT-P3113 SCH-I705 GT-P5100 GT-P5110 GT-P5113 SCH-I915 SM-G3508 SM-G3509 GT-S7580 GT-S7582 GT-S6310 GT-S6312 GT-S6313T".split(" "), 
      qa, Ga = Wa.length; qa = Wa[--Ga];) {
        if (l(n, qa)) {
          ia = 2 > g(Y) ? Y : .9;
          break a;
        }
      }
      var Xa = "SC-02F SGH-N075 GT-S7270 GT-S7272 GT-S7275R GT-I9150 GT-I9152 GT-I9200 GT-I9205 GT-I9500 GT-I9506 SC-04E SGH-N045 GT-I9190 GT-I9192 GT-I9295 GT-I9197 GT-I9198 SGH-I257M SCH-I435 GT-I8666 GT-I8552 GT-I8558 SHV-E500S/L GT-18552B SM-N900 N9000 N9002 SC-01F SCL22 SM-G7100 SM-G7102 SM-G7105 SM-N750 SM-P600 SM-P601 SM-P605 GT-I9301I GT-I9300RWI SGH-T399 SM-P900 SM-P901 SM-P90 SM-P905 GT-I9295 SGH-I537 SHV-E330S GT-I9507V GT-I9505 GT-I9515 SGH-I337 SM-T230 SM-T231 SM-T235 SM-T237 403SC SM-T330NU SM-T331NU SM-T337V SM-T530 SM-T531 SM-T535 M-T320 SM-T321 SM-T325 SM-T520 SM-T525 SM-T900 SM-T905 SM-T700 SM-T705 SM-T707V SM-T800 SM-T805 SM-T807 SM-A300 SM-A5000 SM-A5009 SM-A500F SM-A500F1 SM-A500FQ SM-A500FU SM-A500G SM-A500H SM-A500HQ SM-A500K SM-G850 SM-C115 SM-C111 SM-G750F SM-G7508 SM-G7508Q SM-G750H GT-I9301I SM-900 SC-04F SCL23 SM-G906S SM-G906K SM-G906L SM-G870A SM-N915 SC-02G SM-800".split(" ");
      for (Ga = Xa.length; qa = Xa[--Ga];) {
        if (l(n, qa)) {
          ia = Y;
          break a;
        }
      }
      ia = void 0;
    }
  }
  var Ya = ia, Za = da && 534.3 >= H, $a = p(D), tb = $a && !l(n, D) && p(n), ab = mb && (H || ea) && tb || !M && Ra, bb = !!b.ReactNativeWebView, ra;
  if (ra = $a) {
    a: {
      var cb = void 0;
      for (cb in b) {
        if (0 === cb.indexOf("SlexAPI_")) {
          ra = !0;
          break a;
        }
      }
      ra = void 0;
    }
  }
  var db = ra, eb = b.puffinDevice, sa = eb && eb.clientInfo, ja = sa && "iOS" === sa.os && sa.osVersion, ta = ja && sa.model, Ha = !R && c.registerElement, ub = !R && c.execCommand, fb = Ba && Ha && "11.0.696.34" === aa, vb = b._firefoxTV_playbackStateObserverJava, gb = h(n, "diordnA "), wb = null === b.onoperadetachedviewchange, Z, P, r, ka, va, la, Ia, wa, hb, ib, jb;
  if ("Nitro" === D) {
    var E = "NDS", T = !0;
  } else {
    if ("Nintendo DSi" === D) {
      E = "NDSi";
      var C = Ta;
      T = !0;
    } else {
      if ("New Nintendo 3DS" === D || l(n, "iPhone OS 6_0") && 320 === U && 240 === za) {
        E = "New3DS", C = m(n, "NintendoBrowser/"), T = !0;
      } else {
        if ("Nintendo 3DS" === D) {
          E = "N3DS";
          C = m(n, "Version/");
          H = 535;
          var xb = C;
          T = !0;
        } else {
          if ("Nintendo Swicth" === D) {
            E = "Swicth", C = m(F, "NintendoBrowser/"), T = !0;
          } else {
            if ("Nintendo WiiU" === D) {
              E = "WiiU", C = m(F, "NintendoBrowser/"), H = m(F, "AppleWebKit/"), T = !0;
            } else {
              if ("Nintendo Wii" === D) {
                E = "Wii";
                C = m(n, "Wii; U; ; ");
                var z = E, B = C;
                T = !0;
              } else {
                if (r = m(n, "PlayStation Vita ")) {
                  E = "PSVita", C = r, z = E, B = r, T = !0;
                } else {
                  if (r = m(n, "(PlayStation Portable); ")) {
                    E = "PSP";
                    C = r;
                    var kb = 3.3;
                    z = E;
                    B = r;
                    T = !0;
                  } else {
                    if (r = m(n, "PLAYSTATION 3; ") || m(n, "PLAYSTATION 3 ")) {
                      E = "PS3", C = r, z = E, B = r, 0 > v("4.10", r) && (u = "Sony", x = r), T = !0;
                    } else {
                      if (l(n, "Xbox One")) {
                        E = "XboxOne", C = 1, T = !0;
                      } else {
                        if (l(n, "Xbox")) {
                          E = "Xbox360", C = 1, T = !0;
                        } else {
                          if (2 === G && l(n, "Sony/COM2/")) {
                            E = "Mylo";
                            C = 2;
                            kb = 3.4;
                            z = E;
                            B = 2;
                            var ma = !0;
                          } else {
                            if (0 === D.indexOf("iP") || Aa || ja || Ca) {
                              if (ja) {
                                switch(C = ja, ta.substr(0, 4)) {
                                  case "iPho":
                                    var J = "iPhone", ba = m(ta, J), Q = !0;
                                    break;
                                  case "iPad":
                                    J = "iPad";
                                    ba = m(ta, J);
                                    var K = !0;
                                    break;
                                  case "iPod":
                                    J = "iPod";
                                    ba = m(ta, J);
                                    var Ja = !0;
                                }
                              } else {
                                Aa ? C = Aa : (C = m(F.split("_").join("."), "OS "), hb = !w("isSecureContext", b), ib = w("enableWebGL", b), jb = w("sameOrigin", b));
                                C || (P = !0);
                                if (!C || Ua) {
                                  C = b.PointerEvent ? 13 : b.HTMLDataListElement ? 12.2 : Array.prototype.flat ? 12 : d.sendBeacon ? 11.3 : b.WebAssembly ? 11.2 : b.HTMLMeterElement ? 10.3 : b.Proxy ? 10.2 : b.HTMLPictureElement ? 9.3 : f.isNaN ? 9.2 : b.SharedWorker ? Ma && Ma.now ? 8 : 8.4 : ub ? 7.1 : b.webkitURL ? 6.1 : b.Worker ? 5.1 : Na ? 4.3 : La ? 4.1 : 3.2;
                                }
                                var Ka = 1 === b.devicePixelRatio, L = U === 1.5 * za || 1.5 * U === za;
                                0 === D.indexOf("iPhone") ? (J = "iPhone", ba = L ? Ka ? {max:3} : {min:4, max:5} : {max:6}, Q = !0) : 0 === D.indexOf("iPad") || Ca ? (J = "iPad", ba = Ka ? {max:2} : {min:3}, K = !0) : 0 === D.indexOf("iPod") && (J = "iPod", ba = L ? Ka ? {max:3} : 4 : {min:5}, Ja = !0);
                              }
                              !ja && (d.standalone || (K || 12 > C) && w("webkitFullscreenEnabled", c) || 11 <= C && 13 > C && d.mediaDevices) ? (u = "SafariMobile", z = "Safari", B = C) : (wa = !0, u = "iOSWebView");
                              E = "iOS";
                              x = C;
                            } else {
                              if (l(n, "Kobo")) {
                                E = "Kobo", u = "AOSP", x = 2.2, z = u, B = x, S = va = !0;
                              } else {
                                if (l(n, "EBRD")) {
                                  E = "SonyReader", u = "AOSP", x = 2.2, z = u, B = x, va = !0;
                                } else {
                                  if (r = m(n, "CrOS x86_64 ") || m(n, "CrOS aarch64 ") || m(n, "CrOS i686 ") || m(n, "CrOS armv7l ")) {
                                    E = "ChromeOS";
                                    C = r;
                                    var xa = !0;
                                  } else {
                                    if (void 0 !== b.onmoztimechange) {
                                      E = "FirefoxOS", C = 18.1 > V ? "1.0.1" : 19 > V ? 1.1 : 27 > V ? 1.2 : 29 > V ? 1.3 : 31 > V ? 1.4 : 33 > V ? 2 : 35 > V ? 2.1 : 38 > V ? 2.2 : 45 > V ? 2.5 : 2.6, l(n, "Mobile") ? Q = !0 : l(n, "Tablet") ? K = !0 : l(n, "TV") && (ka = !0);
                                    } else {
                                      if (b.palmGetResource) {
                                        E = "webOS", C = m(n, "webOS/") || m(n, "WEBOS") || m(n, "hpwOS/"), z = E, B = C, l(n, "webOS.TV") || l(n, "/SmartTV") ? ka = !0 : Q = !0;
                                      } else {
                                        if (r = m(n, "Tizen ")) {
                                          E = "Tizen", C = r, z = "Samsung", B = fa, u = z, x = B, Q = !0;
                                        } else {
                                          if (r = m(n, "Windows Phone ") || m(F, "Windows Phone OS ") || ob) {
                                            var ya = !0;
                                            C = r;
                                            Q = !0;
                                          } else {
                                            if (na && "ARM" === D) {
                                              ya = !0, C = 10, P = Q = !0;
                                            } else {
                                              if (ha && l(F, "ZuneWP")) {
                                                ya = !0, C = 11 === R ? 8.1 : 10 === R ? 8 : 9 === R ? 7.5 : 7 === R ? 7 : "?", P = Q = !0;
                                              } else {
                                                if (l(n, "FOMA;")) {
                                                  E = "FeaturePhone", Q = !0;
                                                } else {
                                                  if (l(n, "SoftBank;")) {
                                                    E = "FeaturePhone", Q = !0;
                                                  } else {
                                                    if (l(n, "KFMUWI")) {
                                                      var W = !0;
                                                      C = 6.3;
                                                      var N = K = !0;
                                                    } else {
                                                      if (l(n, "KFKAWI")) {
                                                        W = !0, C = 6, N = K = !0;
                                                      } else {
                                                        if (l(n, "KFSUWI") || l(n, "KFAUWI") || l(n, "KFDOWI")) {
                                                          W = !0, C = 5, N = K = !0;
                                                        } else {
                                                          if (l(n, "KFGIWI")) {
                                                            W = !0, C = 5, N = K = !0;
                                                          } else {
                                                            if (l(n, "KFARWI") || l(n, "KFSAWA") || l(n, "KFSAWI")) {
                                                              W = !0, C = 5 <= g(M) ? 5 : 4, N = K = !0;
                                                            } else {
                                                              if (l(n, "KFSOWI") || l(n, "KFTHWA") || l(n, "KFTHWI") || l(n, "KFAPWA") || l(n, "KFAPWI")) {
                                                                W = !0, C = 3, N = K = !0;
                                                              } else {
                                                                if (l(n, "KFOT") || l(n, "KFTT") || l(n, "KFJWA") || l(n, "KFJWI")) {
                                                                  W = !0, C = 2, N = K = !0;
                                                                } else {
                                                                  if (l(n, "Kindle Fire")) {
                                                                    W = !0, C = 1, N = K = !0;
                                                                  } else {
                                                                    if (r = m(n, "Kindle/")) {
                                                                      E = "Kindle", C = r, u = "AOSP", x = 2.2, z = u, B = x, va = !0;
                                                                    } else {
                                                                      if (vb) {
                                                                        W = !0, C = M || gb, N = ka = !0, P = gb;
                                                                      } else {
                                                                        if (l(n, "AmazonWebAppPlatform") || l(n, "; AFT")) {
                                                                          W = !0, C = M, N = ka = !0;
                                                                        } else {
                                                                          if (l(n, "MeeGo")) {
                                                                            E = "MeeGo";
                                                                          } else {
                                                                            if (l(n, "Maemo")) {
                                                                              E = "Maemo";
                                                                            } else {
                                                                              if (0 === n.indexOf("Windows Mobile;") || Va) {
                                                                                E = "WindowsMobile", ma = !0;
                                                                              } else {
                                                                                if ("WinCE" === D) {
                                                                                  E = D, ma = !0;
                                                                                } else {
                                                                                  if ("Win16" === D || "Win32" === D || "Win64" === D) {
                                                                                    E = D, C = m(n, "Windows NT ") || m(n, "Windows "), xa = !0;
                                                                                  } else {
                                                                                    if (0 === D.indexOf("Mac")) {
                                                                                      E = "MacPowerPC" === D ? "MacPPC" : D;
                                                                                      if (r = m(n.split("_").join("."), "Mac OS X ")) {
                                                                                        C = r;
                                                                                      }
                                                                                      var lb = xa = !0;
                                                                                    } else {
                                                                                      l(n, "BlackBerry") || l(n, "BB10") ? (E = "BlackBerry", C = Y, Q = !0) : l(n, "SunOS") || l(n, "Sun Solaris") ? (E = "SunOS", xa = !0) : l(n, "FreeBSD") ? E = "FreeBSD" : l(n, "OpenBSD") ? E = "OpenBSD" : l(n, "NetBSD") ? E = "NetBSD" : S && ea ? (l(n, "Android 4.4;") ? L = {min:2.3} : 4 <= g(M) ? L = M : L = {min:2.2}, C = L, ab && (P = !0)) : S && ca ? (M ? L = M : (L = {min:1.6}, P = !0), C = L, l(n, "Tablet") ? 
                                                                                      K = !0 : Q = !0) : M ? (C = M, S = !0) : Ba && ab || bb || db ? (Z = !0, fa ? L = {min:4.4} : da && !Za || Qa || pa ? L = {min:4} : (L = M = void 0 !== I.touchAction ? {min:5} : Ha ? 4.4 : Na ? d.connection ? b.searchBoxJavaBridge_ || da ? f.isNaN ? 4.1 : 4 : 4.2 : 4.4 : 534 <= H ? 3 : 533 <= H ? La ? 2.3 : 2.2 : 530 <= H ? 2 : 1.5, Ya && (u = "Samsung", x = Ya)), C = L, S = !0) : fb ? (C = {min:5}, Z = S = !0) : 
                                                                                      Ba && (l(n, "Ubuntu") ? E = "Ubuntu" : (r = m(n, "Mint/")) ? (E = "Mint", C = r) : (r = m(n, "Fedora/")) ? (E = "Fedora", C = r) : E = l(n, "Gentoo") ? "Gentoo" : "Linux");
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  W || S && Z && Fa ? E = "FireOS" : S && (E = E || "Android");
  ya && (E = "WindowsPhone");
  u || (N = N || S, ca ? (u = N || ma || Q || K ? "PrestoMobile" : "Presto", x = Pa) : ha ? ((L = h(F, "Trident/") + 4) && L !== R && (z = "IEHost", B = L), 10 <= R && 6.2 <= C && 7 > C && 0 === screenY && innerHeight + 1 !== outerHeight && (z = "ModernIE", B = R), ma || Q || K || Ja ? u = "TridentMobile" : lb && 5 <= R ? (u = "Tasman", z = "MacIE", B = R) : (u = "Trident", lb && (z = "MacIE", B = R)), x = R) : na ? (u = ya ? "EdgeMobile" : "EdgeHTML", x = m(F, "Edge/")) : Da ? (u = "Goanna", x = 
  Da) : ea ? (u = N ? "Fennec" : "Gecko", x = V || Sa) : fa ? (u = "Samsung", x = fa, Z && (P = !0)) : (r = kb || m(n, "NetFront/")) ? (u = "NetFront", x = r) : (r = m(n, "iCab")) ? (u = "iCab", x = r) : (r = q(m(n, "Opera Mini/"), m(n, "Opera Mobi/")) || Oa && Y) ? (u = "OperaMini", x = r, E || (l(n, "iPhone") ? J = "iPhone" : l(n, "iPad") ? J = "iPad" : l(n, "iPod") && (J = "iPod"), J && (E = "iOS"))) : oa ? (u = "UCWEB", x = nb) : qb ? (u = "KHTML", x = G) : S && Za ? (u = "AOSP", x = M, la = 
  !0, Z && (P = !0)) : da || Qa || pa ? (u = N ? "ChromiumMobile" : "Chromium", x = aa, Z && (P = !0)) : S && Ha ? (u = "ChromeWebView", x = 5 > g(M) ? M : aa, la = !0, b.requestFileSystem || b.webkitRequestFileSystem || (Ia = !0), Z && (P = !0)) : S && (Y || Z) ? (u = "AOSP", x = M, la = !0, Z && (P = !0)) : aa ? (u = N ? "ChromiumMobile" : "Chromium", x = aa) : H && (u = "WebKit", x = H));
  z || ((r = na && m(n, "Edge/") || m(n, "EdgA/") || sb || m(n, "Edg/")) ? (z = "Edge", B = r) : (r = m(F, "Coast/")) ? (z = "Coast", B = r) : hb ? z = "OperaTurbo" : (r = m(F, "OPT/")) ? (z = "OperaTouch", B = r, P = P || !l(F, "Mobile/")) : (r = m(n.toLowerCase(), "ybrowser/")) ? (z = "Yahoo", B = r) : !oa && (r = m(n, "UCBrowser/")) ? (z = "UC", B = r) : Fa ? (z = "Silk", B = Fa) : (r = m(n, "Vivaldi/")) ? (z = "Vivaldi", B = r) : (r = m(n, "QQBrowser/")) ? (z = "QQ", B = r) : (r = m(n, "YaBrowser/")) ? 
  (z = "Yandex", B = r) : (r = m(n, "coc_coc_browser/")) ? (z = "coccoc", B = r) : (r = m(n, "Camino/")) ? (z = "Camino", B = r) : l(n, "SE 2.X MetaSr 1.0") ? z = "Sogou" : (r = m(n, "Focus/") || m(n, "Klar/") || 9 > g(Ea) && wa && 11 <= g(C) && Ea) ? (z = "Focus", B = r) : (r = m(n, "AOLBUILD/") || m(n, "AOL/") || m(n, "AOL ")) ? (z = "AOL", B = r) : (r = m(n, "IceDragon/")) ? (z = "IceDragon", B = r) : (r = m(n, "Iceweasel/")) ? (z = "Iceweasel", B = r) : (r = m(n, "TenFourFox/")) ? (z = "ITenFourFox", 
  B = r) : (r = m(n, "Waterfox/")) ? (z = "Waterfox", B = r) : (r = m(n, "GNUzilla/")) ? (z = "GNUzilla", B = r) : (r = m(n, "SeaMonkey/")) ? (z = "SeaMonkey", B = r) : (r = m(n, "PaleMoon/")) ? (z = "PaleMoon", B = r) : (r = m(n, "Basilisk/")) ? (z = "Basilisk", B = r) : (r = m(n, "Maxthon/") || m(n, "Maxthon ") || m(n, "MXiOS/")) || l(n, "Maxthon") ? (z = "Maxthon", B = r || 1) : l(n, "Avant Browser;") ? z = "Avant" : (r = m(n, "Konqueror/")) ? (z = "Konqueror", B = r) : (r = m(n, "Midori/")) ? 
  (z = "Midori", B = r) : (r = m(n, "OmniWeb/")) ? (z = "OmniWeb", B = r) : (r = m(n, "Roccat/")) ? (z = "Roccat", B = r) : (r = m(n, "Epiphany/")) ? (z = "Epiphany", B = r) : (r = m(n, "WebPositive/")) ? (z = "WebPositive", B = r) : (r = m(n, "Iron/")) || l(n, " Iron ") ? (z = "Iron", B = r || da && aa) : (r = m(n, "Comodo Dragon/")) ? (z = "ComodoDragon", B = r) : (r = m(n, "Brave/")) || l(n, " Brave ") || jb ? (z = "Brave", B = r || da && aa) : (r = m(n, "Rockmelt/")) ? (z = "Rockmelt", B = r) : 
  (r = m(n, "Sleipnir/")) || Ua || db ? (z = "Sleipnir", r && (B = r)) : ib ? z = "Dolphin" : (r = m(n, "Puffin/")) ? (z = "Puffin", B = r) : (r = m(n, "Dooble/")) ? (z = "Dooble", B = r) : (r = m(n, "Flock/")) ? (z = "Flock", B = r) : (r = m(n, "Galeon/")) ? (z = "Galeon", B = r) : (r = m(n, "Falkon/")) ? (z = "Falkon", B = r) : (r = m(n, "Iceape/")) ? (z = "Iceape", B = r) : (r = m(n, "K-Meleon/")) ? (z = "KMeleon", B = r) : (r = xb || m(F, "NX/")) ? (z = "NetFrontNX", B = r) : (r = m(n, "Netscape6/") || 
  m(n, "Netscape/") || m(n, "Navigator/")) ? (z = "NN", B = r) : Va ? (z = "Iris", B = r) : (r = m(n, "FBAV/") || l(F, "FBAN/")) ? (z = "Facebook", B = r) : (r = m(F, "Line/")) ? (z = "LINE", B = r) : (r = m(n, "QtWebEngine/")) ? (z = "QtWebEngine", B = r) : (r = m(n, "QtWebKit/")) ? (z = "QtWebKit", B = r) : (r = m(n, "DuckDuckGo/")) ? (z = "DuckDuckGo", B = r) : (r = m(n, "Lunascape/") || bb) ? (z = "Lunascape", B = r) : (r = Ea || ea && (Sa || x)) ? (z = "Firefox", B = r) : wb ? (z = "OperaGX", 
  B = pa) : (r = Pa || pa || Ta) ? (z = "Opera", B = r) : ha ? (z = "IE", B = x) : fa ? (z = u, B = fa) : (r = rb || (da || fb && la) && aa) ? (z = "Chrome", B = r) : la && !Ia ? (z = u, B = x) : wa && !K ? (u = "SafariMobile", z = "Safari", B = C) : wa || Ia || !l(n, "Safari") && !Y || (z = "Safari", B = Y || (73 > H ? .8 : 85 > H ? .9 : 100 > H ? 1 : 125 > H ? 1.1 : 312 > H ? 1.2 : 412 > H ? 1.3 : 419.3 >= H ? 2 : 525.13 >= H ? 3 : 525.25 >= H ? 3.1 : 3.2)), z = z || "unknown");
  E && (a.PLATFORM = E, C ? (a.PLATFORM_VERSION = t(C), a[E] = y(C)) : a[E] = !0);
  u && (a.ENGINE = u, x ? (a.ENGINE_VERSION = t(x), a[u] = y(x)) : a[u] = !0, z || (z = u, B = x));
  z && (a.BRAND = z, B ? (a.BRAND_VERSION = t(B), a[z] = y(B)) : a[z] = !0);
  J && (a.DEVICE = J, ba ? (a.DEVICE_VERSION = t(ba), a[J] = y(ba)) : a[J] = !0);
  if (P || Ca) {
    a.PCSITE_REQUESTED = !0;
  }
  a.DEVICE_TYPE = ma ? 8 : T ? 7 : ka ? 6 : Ja ? 5 : va ? 4 : Q ? 2 : K ? 3 : xa ? 1 : 0;
})(whatBrowserAmI, window, document, navigator, screen, parseFloat, Number);
var X_UA_DOM = {}, X_UA_EVENT = {}, X_UA_HID = {};
5 > (X_UA.Trident || X_UA.TridentMobile) ? (X_UA_DOM.IE4 = !0, X_UA_EVENT.IE4 = !0) : X_UA.MacIE ? (X_UA_DOM.W3C = !0, X_UA_EVENT.IE = !0) : document.getElementById && (X_UA_DOM.W3C = !0, document.addEventListener ? X_UA_EVENT.W3C = !0 : document.attachEvent ? X_UA_EVENT.IE = !0 : X_UA_EVENT.DOM0 = !0);
var X_elmHtml = document.documentElement || X_UA_DOM.W3C ? document.getElementsByTagName("html")[0] : X_UA_DOM.IE4 ? document.all.tags("html")[0] : null, X_elmHead = X_UA_DOM.W3C ? document.getElementsByTagName("head")[0] : X_UA_DOM.IE4 ? document.all.tags("head")[0] : null, X_UA_ActiveX = !!window.ActiveXObject, X_elmBody;
if (navigator.msPointerEnabled || navigator.pointerEnabled) {
  X_UA_HID.POINTER = !0;
}
X_UA_HID.POINTER || void 0 === window.ontouchstart || (X_UA_HID.TOUCH = !0);
var X_Script_VBS_ENABLED = (X_UA.Win16 || X_UA.Win32 || X_UA.Win64) && 11 > X_UA.Trident && 11 !== X_UA.IEHost, X_Script_gte15 = !(5.5 > (X_UA.Trident || X_UA.TridentMobile)) && new Function("f,a", "try{return f.apply({},a)}catch(e){}"), X_Script_ie6ExeComError;
X.Script = {tryIfSafe:X_Script_try, VBS:X_Script_VBS_ENABLED};
X_Script_VBS_ENABLED && (X_Script_gte15 || document.write("<script type=text/vbscript>Function vbs_testAXO(v)\nOn Error Resume Next\nSet ax = CreateObject(v)\nIf Err.Number Then\nax = 1\nEnd If\nErr.Clear\nvbs_testAXO = ax\nEnd Function\x3c/script>"), X_Script_gte15 || document.write("<script type=text/vbscript>Function vbs_testAE()\nOn Error Resume Next\nSet ae = Document.ActiveElement\nIf Err.Number Then\nae = 1\nEnd If\nErr.Clear\nvbs_testAE = ae\nEnd Function\x3c/script>"));
function X_Script_try(a, b) {
  if (X_Script_gte15) {
    return X_Script_gte15(a, b || []);
  }
}
function X_Script_createActiveXObjectSafty(a) {
  return X_Script_gte15 ? X_Script_try(X_Script_createActiveXObject, [a]) : X_Script_VBS_ENABLED ? !vbs_testAXO(a) && X_Script_createActiveXObject(a) : X_Script_createActiveXObject(a);
}
function X_Script_createActiveXObject(a) {
  return new ActiveXObject(a);
}
6 !== (X_UA.Trident || X_UA.TridentMobile) || X_Script_try(function() {
  document.execCommand("BackgroundImageCache", !1, !0);
  return 1;
}) || (X_Script_ie6ExeComError = !0);
var X_Type_isArray = new Function("v", 5.5 > (X_UA.Trident || X_UA.TridentMobile) || 4 > X_UA.NetFront ? "return v&&v.push===Array.prototype.push" : X_UA.Trident || X_UA.TridentMobile ? 'return v&&Object.prototype.toString.call(v)==="[object Array]"' : "return v instanceof Array"), X_Type_isHTMLElement = new Function("v", 5 > (X_UA.Trident || X_UA.TridentMobile) || X_UA.Tasman ? "return v&&v.tagName&&v.insertAdjacentHTML&&!0" : 4 > X_UA.NetFront ? "return v&&v.nodeType===1" : window.HTMLElement ? 
"return v instanceof HTMLElement" : "return v&&v.appendChild&&v.nodeType===1");
X.Type = {isObject:X_Type_isObject, isFunction:X_Type_isFunction, isUnknown:X_Type_isUnknown, isArray:X_Type_isArray, isBoolean:X_Type_isBoolean, isString:X_Type_isString, isNumber:X_Type_isNumber, isFinite:X_Type_isFinite, isNaN:X_Type_isNaN, isHTMLElement:X_Type_isHTMLElement, isImage:X_Type_isImage, isNull:X_Type_isNull, isUndefined:X_Type_isUndefined};
function X_Type_isObject(a) {
  return a && "object" === typeof a && a !== a + "" && a !== a + 0 && !0 !== a;
}
function X_Type_isFunction(a) {
  return "function" === typeof a;
}
function X_Type_isUnknown(a) {
  return "unknown" === typeof a;
}
function X_Type_isBoolean(a) {
  return !0 === a || !1 === a;
}
function X_Type_isString(a) {
  return a === a + "";
}
function X_Type_isNumber(a) {
  return a + 0 === a || a !== a;
}
function X_Type_isFinite(a) {
  return a + 0 === a && isFinite(a);
}
function X_Type_isNaN(a) {
  return a !== a;
}
function X_Type_isImage(a) {
  return a && a.constructor === window.Image || a && window.HTMLImageElement && a.constructor === window.HTMLImageElement || 525.13 > X_UA.WebKit && a && !X_Type_isUndefined(a.src) && !X_Type_isUndefined(a.onload) && X_Type_isNumber(a.height) && X_Type_isNumber(a.width) && X_Type_isBoolean(a.complete) ? !0 : !1;
}
function X_Type_isNull(a) {
  return null === a;
}
function X_Type_isUndefined(a) {
  return void 0 === a;
}
;var X_Object_inObject = X_Script_gte15 ? new Function("a,b", 'return (""+a) in b') : function(a, b, c) {
  a += "";
  if (b[a]) {
    return !0;
  }
  for (c in b) {
    if (c === a) {
      return !0;
    }
  }
  return !1;
};
X.Object = {copy:X_Object_copy, deepCopy:X_Object_deepCopy, override:X_Object_override, clear:X_Object_clear, isEmpty:X_Object_isEmpty, inObject:X_Object_inObject, find:X_Object_find};
function X_Object_copy(a) {
  var b;
  if (!a || !X_Type_isObject(a)) {
    return a;
  }
  var c = {};
  for (b in a) {
    c[b] = a[b];
  }
  return c;
}
function X_Object_override(a, b) {
  var c;
  if (!b || !X_Type_isObject(b)) {
    return a;
  }
  for (c in b) {
    a[c] = b[c];
  }
  return a;
}
function X_Object_clear(a, b) {
  if (a) {
    for (b in a) {
      delete a[b];
    }
  }
}
function X_Object_deepCopy(a) {
  return X_Object_deepCopy_(a, [], [], -1);
}
function X_Object_deepCopy_(a, b, c, d) {
  var e;
  if (a) {
    if (X_Type_isArray(a)) {
      var g = b.indexOf(a);
      if (-1 !== g) {
        return c[g];
      }
      b[++d] = a;
      c[d] = g = [];
    } else {
      if (X_Type_isObject(a)) {
        g = b.indexOf(a);
        if (-1 !== g) {
          return c[g];
        }
        b[++d] = a;
        c[d] = g = {};
      } else {
        return a;
      }
    }
  } else {
    return a;
  }
  for (e in a) {
    g[e] = X_Object_deepCopy_(a[e], b, c, d);
  }
  return g;
}
function X_Object_isEmpty(a) {
  if (a) {
    for (var b in a) {
      return !1;
    }
    return !0;
  }
}
function X_Object_find(a, b) {
  for (var c = b.split(">"); b = c.shift();) {
    if (a = a[b], !a) {
      return;
    }
  }
  return a;
}
;X.Array = {copy:X_Array_copy};
function X_Array_copy(a) {
  for (var b = [], c = 0, d = a.length; c < d; ++c) {
    b[c] = a[c];
  }
  return b;
}
;var X_String_CRLF = String.fromCharCode(13) + String.fromCharCode(10), X_String_CHAR_REFS = {"&nbsp;":160, "&iexcl;":161, "&cent;":162, "&pound;":163, "&curren;":164, "&yen;":165, "&brvbar;":166, "&sect;":167, "&uml;":168, "&copy;":169, "&ordf;":170, "&laquo;":171, "&not;":172, "&shy;":173, "&reg;":174, "&macr;":175, "&deg;":176, "&plusmn;":177, "&sup2;":178, "&sup3;":179, "&acute;":180, "&micro;":181, "&para;":182, "&middot;":183, "&cedil;":184, "&sup1;":185, "&ordm;":186, "&raquo;":187, "&frac14;":188, 
"&frac12;":189, "&frac34;":190, "&iquest;":191, "&Agrave;":192, "&Aacute;":193, "&Acirc;":194, "&Atilde;":195, "&Auml;":196, "&Aring;":197, "&AElig;":198, "&Ccedil;":199, "&Egrave;":200, "&Eacute;":201, "&Ecirc;":202, "&Euml;":203, "&Igrave;":204, "&Iacute;":205, "&Icirc;":206, "&Iuml;":207, "&ETH;":208, "&Ntilde;":209, "&Ograve;":210, "&Oacute;":211, "&Ocirc;":212, "&Otilde;":213, "&Ouml;":214, "&times;":215, "&Oslash;":216, "&Ugrave;":217, "&Uacute;":218, "&Ucirc;":219, "&Uuml;":220, "&Yacute;":221, 
"&THORN;":222, "&szlig;":223, "&agrave;":224, "&aacute;":225, "&acirc;":226, "&atilde;":227, "&auml;":228, "&aring;":229, "&aelig;":230, "&ccedil;":231, "&egrave;":232, "&eacute;":233, "&ecirc;":234, "&euml;":235, "&igrave;":236, "&iacute;":237, "&icirc;":238, "&iuml;":239, "&eth;":240, "&ntilde;":241, "&ograve;":242, "&oacute;":243, "&ocirc;":244, "&otilde;":245, "&ouml;":246, "&divide;":247, "&oslash;":248, "&ugrave;":249, "&uacute;":250, "&ucirc;":251, "&uuml;":252, "&yacute;":253, "&thorn;":254, 
"&yuml;":255, "&OElig;":338, "&oelig;":339, "&Scaron;":352, "&scaron;":353, "&Yuml;":376, "&circ;":710, "&tilde;":732, "&fnof;":402, "&Alpha;":913, "&Beta;":914, "&Gamma;":915, "&Delta;":916, "&Epsilon;":917, "&Zeta;":918, "&Eta;":919, "&Theta;":920, "&Iota;":921, "&Kappa;":922, "&Lambda;":923, "&Mu;":924, "&Nu;":925, "&Xi;":926, "&Omicron;":927, "&Pi;":928, "&Rho;":929, "&Sigma;":931, "&Tau;":932, "&Upsilon;":933, "&Phi;":934, "&Chi;":935, "&Psi;":936, "&Omega;":937, "&alpha;":945, "&beta;":946, 
"&gamma;":947, "&delta;":948, "&epsilon;":949, "&zeta;":950, "&eta;":951, "&theta;":952, "&iota;":953, "&kappa;":954, "&lambda;":955, "&mu;":956, "&nu;":957, "&xi;":958, "&omicron;":959, "&pi;":960, "&rho;":961, "&sigmaf;":962, "&sigma;":963, "&tau;":964, "&upsilon;":965, "&phi;":966, "&chi;":967, "&psi;":968, "&omega;":969, "&thetasym;":977, "&upsih;":978, "&piv;":982, "&ensp;":8194, "&emsp;":8195, "&thinsp;":8201, "&zwnj;":8204, "&zwj;":8205, "&lrm;":8206, "&rlm;":8207, "&ndash;":8211, "&mdash;":8212, 
"&lsquo;":8216, "&rsquo;":8217, "&sbquo;":8218, "&ldquo;":8220, "&rdquo;":8221, "&bdquo;":8222, "&dagger;":8224, "&Dagger;":8225, "&bull;":8226, "&hellip;":8230, "&permil;":8240, "&prime;":8242, "&Prime;":8243, "&lsaquo;":8249, "&rsaquo;":8250, "&oline;":8254, "&frasl;":8260, "&euro;":8364, "&image;":8465, "&ewierp;":8472, "&real;":8476, "&trade;":8482, "&alefsym;":8501, "&larr;":8592, "&uarr;":8593, "&rarr;":8594, "&darr;":8595, "&harr;":8596, "&crarr;":8629, "&lArr;":8656, "&uArr;":8657, "&rArr;":8658, 
"&dArr;":8659, "&hArr;":8660, "&forall;":8704, "&part;":8706, "&exist;":8707, "&empty;":8709, "&nabla;":8711, "&isin;":8712, "&notin;":8713, "&ni;":8715, "&prod;":8719, "&sum;":8721, "&minus;":8722, "&lowast;":8727, "&radic;":8730, "&prop;":8733, "&infin;":8734, "&ang;":8736, "&and;":8743, "&or;":8744, "&cap;":8745, "&cup;":8746, "&int;":8747, "&there4;":8756, "&sim;":8764, "&cong;":8773, "&asymp;":8776, "&ne;":8800, "&equiv;":8801, "&le;":8804, "&ge;":8805, "&sub;":8834, "&sup;":8835, "&nsub;":8836, 
"&sube;":8838, "&supe;":8839, "&oplus;":8853, "&otimes;":8855, "&perp;":8869, "&sdot;":8901, "&lceil;":8968, "&rceil;":8969, "&lfloor;":8970, "&rfloor;":8971, "&lang;":9001, "&rang;":9002, "&loz;":9674, "&spades;":9824, "&clubs;":9827, "&hearts;":9829, "&diams;":9830};
(function(a, b) {
  for (b in a) {
    a[b] = String.fromCharCode(a[b]);
  }
})(X_String_CHAR_REFS);
X.String = {parse:X_String_parse, cleanupWhiteSpace:X_String_cleanupWhiteSpace, whiteSpaceToTag:X_String_whiteSpaceToTag, chrReferanceTo:X_String_chrReferanceTo, toChrReferance:X_String_toChrReferance, isNumberString:X_String_isNumberString, serialize:X_String_serialize};
function X_String_parse(a) {
  if (X_Type_isString(a)) {
    switch(a) {
      case "":
        return a;
      case "NaN":
        return NaN;
      case "null":
        return null;
      case "true":
        return !0;
      case "false":
        return !1;
      case "Infinity":
        return 1 / 0;
      case "-Infinity":
        return -1 / 0;
      case "undefined":
        return;
    }
    var b = a.split(" ").join("");
    if (X_String_isNumberString(b)) {
      return b - 0;
    }
  }
  return a;
}
function X_String_cleanupWhiteSpace(a) {
  if (null == a || "" === a) {
    return "";
  }
  for (a = ("" + a).split(X_String_CRLF).join(" ").split("\r").join(" ").split("\n").join(" ").split("\t").join(" ").split("\f").join(" ").split("\b").join(" ");;) {
    a = a.split("  ");
    if (2 > a.length) {
      return a[0];
    }
    a = a.join(" ");
  }
}
function X_String_whiteSpaceToTag(a) {
  return null == a || "" === a ? "" : ("" + a).split(X_String_CRLF).join("<br>").split("\r").join("<br>").split("\n").join("<br>").split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;").split("\f").join("").split("\b").join("");
}
function X_String_chrReferanceTo(a) {
  var b;
  if (null == a || "" === a) {
    return "";
  }
  if (-1 === a.indexOf("&")) {
    return a;
  }
  a = ("" + a).split("&quot;").join('"').split("&apos;").join("'").split("&lt;").join("<").split("&gt;").join(">");
  if (-1 === a.indexOf("&")) {
    return a;
  }
  var c = X_String_CHAR_REFS;
  for (b in c) {
    a = a.split(b).join(c[b]);
  }
  return a.split("&amp;").join("&");
}
function X_String_toChrReferance(a) {
  var b;
  if (null == a || "" === a) {
    return "";
  }
  a = X_String_toChrReferanceForHtmlSafety(a);
  var c = X_String_CHAR_REFS;
  for (b in c) {
    a = a.split(c[b]).join(b);
  }
  return a;
}
function X_String_toChrReferanceForHtmlSafety(a) {
  return null == a || "" === a ? "" : ("" + a).split("&").join("&amp;").split('"').join("&quot;").split("'").join("&apos;").split("<").join("&lt;").split(">").join("&gt;");
}
function X_String_isNumberString(a) {
  var b = a - 0;
  return "" + b === a || "" + b === "0" + a;
}
function X_String_serialize(a, b) {
  function c(a, b, c) {
    c = X_Type_isFunction(c) ? c() : null == c ? "" : c;
    a[a.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c);
  }
  function d(a, b, e, g) {
    var f;
    if (X_Type_isArray(e)) {
      var h = 0;
      for (f = e.length; h < f; ++h) {
        var k = e[h];
        g || "[]" === b ? c(a, b, k) : d(a, b + "[" + (X_Type_isObject(k) ? h : "") + "]", k, g);
      }
    } else {
      if (!g && X_Type_isObject(e)) {
        for (h in e) {
          d(a, b + "[" + h + "]", e[h], g);
        }
      } else {
        c(a, b, e);
      }
    }
  }
  var e, g = [];
  for (e in a) {
    d(g, e, a[e], !!b);
  }
  return g.join("&").split("%20").join("+");
}
;X.Number = {conpareVersion:X_Number_conpareVersion};
function X_Number_conpareVersion(a, b) {
  var c = 0, d;
  a = a.split(".");
  b = b.split(".");
  for (d = Math.min(a.length, b.length); c < d; ++c) {
    var e = parseFloat(a[c]);
    var g = parseFloat(b[c]);
    if (e !== g) {
      return e > g ? 1 : -1;
    }
  }
  return a.length === b.length ? 0 : a.length > b.length ? 1 : -1;
}
;var X_URL_BASE_URL = function(a) {
  var b = 1 < a.length && a[a.length - 1];
  !1 === b || "" !== b && -1 === b.indexOf(".") || --a.length;
  return a.join("/");
}(X_URL_cleanup(location.href).split("/")), X_URL_HOST = location.protocol + "//" + location.hostname, X_URL_IS_FILE = "file:" === location.protocol, X_URL_IS_LOCAL = X_URL_IS_FILE || "localhost" === location.hostname || "127.0.0.1" === location.hostname, X_URL_PARAMS = X_URL_paramToObj(location.search.slice(1));
X.URL = {BASE_URL:X_URL_BASE_URL, IS_FILE:X_URL_IS_FILE, IS_LOCAL:X_URL_IS_LOCAL, PARAMS:X_URL_PARAMS, create:X_URL_create, toAbsolutePath:X_URL_toAbsolutePath, objToParam:X_URL_objToParam, paramToObj:X_URL_paramToObj, isSameDomain:X_URL_isSameDomain, isSameProtocol:X_URL_isSameProtocol, isLocal:X_URL_isLocal, cleanup:X_URL_cleanup, getEXT:X_URL_getEXT, getSearch:X_URL_getSearch, getHash:X_URL_getHash};
function X_URL_toAbsolutePath(a) {
  var b = 0;
  if (-1 !== "http:file:https".indexOf(a.substr(0, 5))) {
    return a;
  }
  var c = X_URL_BASE_URL.split("//");
  var d = c[1].split("/");
  if ("/" === a.charAt(0)) {
    return [c[0], "//", d[0], a].join("");
  }
  if ("./" === a.substr(0, 2)) {
    a = a.substr(2);
  } else {
    for (; "../" === a.substr(b, 3);) {
      --d.length, b += 3;
    }
    b && (a = a.substr(b));
  }
  return [c[0], "//", d.join("/"), "/", a].join("");
}
function X_URL_isSameDomain(a) {
  a = X_URL_cleanup(X_URL_toAbsolutePath(a));
  return a === X_URL_HOST || 0 === a.indexOf(X_URL_HOST + "/");
}
function X_URL_isSameProtocol(a) {
  return 0 === X_URL_toAbsolutePath(a).indexOf(location.protocol);
}
function X_URL_isLocal(a) {
  return 0 === X_URL_toAbsolutePath(a).indexOf("file:");
}
function X_URL_cleanup(a) {
  return a.split("?")[0].split("#")[0];
}
function X_URL_getEXT(a) {
  a = X_URL_cleanup(a).split(".");
  return a.length ? a.pop() : "";
}
function X_URL_getSearch(a) {
  a = a.split("#")[0].split("?");
  a.splice(0, 1);
  return a.join("?");
}
function X_URL_getHash(a) {
  a = a.split("#");
  a.splice(0, 1);
  return a.join("#");
}
function X_URL_objToParam(a) {
  var b = [], c, d = -1;
  for (c in a) {
    -1 !== d && (b[++d] = "&"), b[++d] = c, b[++d] = "=", b[++d] = encodeURIComponent(a[c]);
  }
  return b.join("");
}
function X_URL_create(a, b) {
  return X_Type_isObject(b) && (b = X_URL_objToParam(b)) ? a + (-1 !== a.indexOf("?") ? "&" : "?") + b : a;
}
function X_URL_paramToObj(a) {
  var b = 0, c = {}, d;
  if (!a) {
    return c;
  }
  a = a.split("&");
  for (d = a.length; b < d; ++b) {
    var e = a[b];
    var g = e.indexOf("=");
    -1 === g ? c[decodeURIComponent(e)] = !0 : c[decodeURIComponent(e.substr(0, g))] = X_String_parse(decodeURIComponent(e.substr(g + 1)));
  }
  return c;
}
;X.Pair = {create:X_Pair_create, get:X_Pair_get, release:X_Pair_release};
var X_Pair_SIZE = 1024, X_Pair_KEY_STORE_LIST = [[]], X_Pair_PAIR_STORE_LIST = [[]], X_Pair_noChashe = !1, X_Pair_functionString = new Function("s", "p", "k", function() {
  for (var a = "var i=0,l=s.length,a;for(;i<l;++i){a=s[i];switch(k){", b = 0, c; b < X_Pair_SIZE; ++b) {
    c = b.toString(16), a += "case a[0x" + c + "]:return p[i][0x" + c + "];";
  }
  return a + "}}";
}()), X_Pair_lastKey, X_Pair_lastPair;
function X_Pair_create(a, b) {
  var c = X_Pair_KEY_STORE_LIST[X_Pair_KEY_STORE_LIST.length - 1], d = X_Pair_PAIR_STORE_LIST[X_Pair_PAIR_STORE_LIST.length - 1];
  X_Pair_noChashe = !0;
  if (!b || X_Pair_get(a) || !(X_Type_isObject(a) || X_Type_isArray(a) || X_Type_isFunction(a))) {
    return !1;
  }
  c.length === X_Pair_SIZE && (c = X_Pair_KEY_STORE_LIST[X_Pair_KEY_STORE_LIST.length] = [], d = X_Pair_PAIR_STORE_LIST[X_Pair_PAIR_STORE_LIST.length] = []);
  c[c.length] = a;
  d[d.length] = b;
  return !0;
}
function X_Pair_get(a) {
  var b = !X_Pair_noChashe, c;
  X_Pair_noChashe = !1;
  if (a === X_Pair_lastKey) {
    return X_Pair_lastPair;
  }
  (c = X_Pair_functionString(X_Pair_KEY_STORE_LIST, X_Pair_PAIR_STORE_LIST, a)) && b && (X_Pair_lastKey = a, X_Pair_lastPair = c);
  return c;
}
function X_Pair_release(a, b) {
  for (var c = 0, d = X_Pair_KEY_STORE_LIST.length, e, g, f; c < d; ++c) {
    if (e = X_Pair_KEY_STORE_LIST[c], g = X_Pair_PAIR_STORE_LIST[c], f = e.indexOf(a), -1 !== f && (void 0 === b || g[f] === b)) {
      return e.splice(f, 1), g.splice(f, 1), X_Pair_lastKey === a && (X_Pair_lastKey = X_Pair_lastPair = null), !0;
    }
  }
  return !1;
}
;var X_CALLBACK_NONE = 0, X_CALLBACK_UN_LISTEN = 1, X_CALLBACK_STOP_PROPAGATION = 2, X_CALLBACK_STOP_NOW = 6, X_CALLBACK_PREVENT_DEFAULT = 8, X_CALLBACK_CAPTURE_POINTER = 16, X_CALLBACK_RELEASE_POINTER = 32, X_CALLBACK_SYS_CANCEL = 70;
X.Callback = {NONE:X_CALLBACK_NONE, UN_LISTEN:X_CALLBACK_UN_LISTEN, STOP_PROPAGATION:X_CALLBACK_STOP_PROPAGATION, STOP_NOW:X_CALLBACK_STOP_NOW, PREVENT_DEFAULT:X_CALLBACK_PREVENT_DEFAULT, CAPTURE_POINTER:X_CALLBACK_CAPTURE_POINTER, RELEASE_POINTER:X_CALLBACK_RELEASE_POINTER};
var X_CLOSURE_LIVE_LIST = [], X_CLOSURE_POOL_LIST = [], X_Closure_COMMAND_BACK = X_CLOSURE_LIVE_LIST, X_Closure_COMMAND_DROP = X_CLOSURE_POOL_LIST, X_CLOSURE_THIS_FUNC = 1, X_CLOSURE_HANDLEEVENT = 2, X_CLOSURE_FUNC_ONLY = 3, X_CLOSURE_THIS_FUNCNAME = 4, __CallbackHash__ = {cbKind:X_CLOSURE_THIS_FUNC, func:void 0, funcName:void 0, context:void 0, supplement:void 0, proxy:X_Closure_proxyCallback};
function X_Closure_create(a, b, c) {
  a = X_Closure_classifyCallbackArgs(a, b, c);
  if (!a.cbKind) {
    return a;
  }
  (b = X_CLOSURE_POOL_LIST.length) ? (b = X_CLOSURE_POOL_LIST[b - 1], --X_CLOSURE_POOL_LIST.length, c = b(X_Closure_COMMAND_BACK), c.cbKind = a.cbKind, c.funcName = a.funcName, c.func = a.func, c.context = a.context, c.supplement = a.supplement, c.proxy = X_Closure_proxyCallback) : (b = X_Closure_actualClosure(a), a.proxy = X_Closure_proxyCallback);
  return X_CLOSURE_LIVE_LIST[X_CLOSURE_LIVE_LIST.length] = b;
}
function X_Closure_classifyCallbackArgs(a, b, c, d) {
  if (X_Type_isObject(a) && X_Type_isFunction(b)) {
    var e = {context:a, func:b, cbKind:X_CLOSURE_THIS_FUNC};
  } else {
    if (X_Type_isObject(a)) {
      b && X_Type_isString(b) ? e = {context:a, funcName:b, cbKind:X_CLOSURE_THIS_FUNCNAME} : (e = {context:a, cbKind:X_CLOSURE_HANDLEEVENT}, c = b);
    } else {
      if (X_Type_isFunction(a)) {
        c = b, e = d ? {context:d, func:a, cbKind:X_CLOSURE_THIS_FUNC} : {func:a, cbKind:X_CLOSURE_FUNC_ONLY};
      } else {
        if (X_Type_isFunction(b)) {
          e = d ? {context:d, func:b, cbKind:X_CLOSURE_THIS_FUNC} : {func:b, cbKind:X_CLOSURE_FUNC_ONLY};
        } else {
          if (d && X_Type_isString(a)) {
            c = b, e = {context:d, funcName:a, cbKind:X_CLOSURE_THIS_FUNCNAME};
          } else {
            if (d) {
              e = {context:d, cbKind:X_CLOSURE_HANDLEEVENT}, c = a;
            } else {
              if (X_IS_DEV) {
                X_error("X.Closure.create : Invalid args! arguments[0]=" + a);
                return;
              }
            }
          }
        }
      }
    }
  }
  X_Type_isArray(c) && (e.supplement = c);
  return e.context || e.supplement ? e : a;
}
function X_Closure_actualClosure(a) {
  return function() {
    if (arguments[0] === X_Closure_COMMAND_BACK) {
      return a;
    }
    if (arguments[0] !== X_Closure_COMMAND_DROP) {
      return a.proxy && a.proxy(a, arguments);
    }
  };
}
function X_Closure_proxyCallback(a, b) {
  var c = b || [], d = a.context, e = a.func, g = a.supplement;
  if (g && g.length) {
    var f = [];
    c.length && (1 === c.length ? f[0] = c[0] : f.push.apply(f, c));
    1 === g.length ? f[f.length] = g[0] : f.push.apply(f, g);
    c = f;
  }
  switch(a.cbKind) {
    case X_CLOSURE_THIS_FUNC:
      return 0 === c.length ? e.call(d) : e.apply(d, c);
    case X_CLOSURE_THIS_FUNCNAME:
      var k = a.funcName;
    case X_CLOSURE_HANDLEEVENT:
      k = k || "handleEvent";
      f = d[k];
      if (X_Type_isFunction(f)) {
        return 0 === c.length ? d[k]() : 1 === c.length ? d[k](c[0]) : f.apply(d, c);
      }
      break;
    case X_CLOSURE_FUNC_ONLY:
      return 0 === c.length ? e() : 1 === c.length ? e(c[0]) : e.apply(null, c);
  }
  return X_CALLBACK_NONE;
}
function X_Closure_correct(a) {
  var b = X_CLOSURE_LIVE_LIST.indexOf(a);
  if (-1 !== b) {
    return X_CLOSURE_LIVE_LIST.splice(b, 1), 69 <= X_UA.Gecko && X_UA.Win32 || 80 <= X_UA.Chromium && X_UA.Win32 || 8 === X_UA.Trident && 10 === X_UA.Win32 || (X_CLOSURE_POOL_LIST[X_CLOSURE_POOL_LIST.length] = a), a = a(X_Closure_COMMAND_BACK), X_Object_clear(a), !0;
  }
}
function X_Closure_monitor() {
  return {"Callback:Live":X_CLOSURE_LIVE_LIST.length, "Callback:Pool":X_CLOSURE_POOL_LIST.length};
}
function X_Closure_gc() {
  X_CLOSURE_POOL_LIST.length = 0;
}
X_TEMP.onSystemReady.push(function(a) {
  a.monitor(X_Closure_monitor);
  a.gc(X_Closure_gc);
});
var __ClassBase__ = {NAME:""}, X_Class_CLASS_LIST = [], X_Class_DEF_LIST = [], X_Class_SUPER_CALLER = [], X_Class_SUPER_STACKS = [], X_Class_traits = null, X_Class_useObjectCreate = !1, X_Class_use_proto_ = !(X_UA.PrestoMobile && X_UA.Android) && !X_UA.AOSP && !X_UA.ChromeWebView && !!X_emptyFunction.prototype.__proto__, X_Class_constructorFix = 3 > X_UA.AOSP || 5 > (X_UA.SafariMobile || X_UA.iOSWebView), X_Class_SEAL_KILLING = [], X_Class_CommonMethods = {kill:function() {
  var a, b;
  if (this.instanceOf(X_EventDispatcher)) {
    if ((a = this._listeners) && X_Class_SEAL_KILLING.length && -1 !== X_Class_SEAL_KILLING.indexOf(this)) {
      return;
    }
    if (a && !a[X_LISTENERS_KILL_RESERVED] && a[X_EVENT_BEFORE_KILL_INSTANCE]) {
      X_Class_SEAL_KILLING[b = X_Class_SEAL_KILLING.length] = this;
      if (this.dispatch(X_EVENT_BEFORE_KILL_INSTANCE) & X_CALLBACK_PREVENT_DEFAULT) {
        this.dispatch(X_EVENT_KILL_INSTANCE_CANCELED);
        var c = !0;
      }
      1 === X_Class_SEAL_KILLING.length ? X_Class_SEAL_KILLING.length = 0 : X_Class_SEAL_KILLING.splice(X_Class_SEAL_KILLING[b] === this ? b : X_Class_SEAL_KILLING.indexOf(this), 1);
      if (c) {
        return;
      }
    }
    if (a = this._listeners) {
      if (a[X_LISTENERS_DISPATCHING]) {
        a[X_LISTENERS_KILL_RESERVED] = !0;
        return;
      }
      a[X_EVENT_KILL_INSTANCE] && (X_Class_SEAL_KILLING[b = X_Class_SEAL_KILLING.length] = this, a[X_LISTENERS_KILL_RESERVED] = !1, this.dispatch(X_EVENT_KILL_INSTANCE), 1 === X_Class_SEAL_KILLING.length ? X_Class_SEAL_KILLING.length = 0 : X_Class_SEAL_KILLING.splice(X_Class_SEAL_KILLING[b] === this ? b : X_Class_SEAL_KILLING.indexOf(this), 1));
      if (!(a = this._listeners)) {
        for (d in a) {
          if (!(d <= X_LISTENERS_KILL_RESERVED)) {
            for (c = a[d], b = c.length; b;) {
              this.unlisten(d, c[--b]);
            }
          }
        }
      }
    }
    this.instanceOf(X_Node) && X_Node_onKill(this);
    a = X_EventDispatcher_LAZY_TIMERS;
    for (d in a) {
      a[d] === this && X_Timer_remove(d);
    }
  }
  X_Object_clear(this);
  var d = X_Class_getClassDef(this);
  d.pool && (d.live.splice(d.live.indexOf(this), 1), d.pool[d.pool.length] = this);
}, Super:function(a) {
  var b = this.constructor, c = X_Class_SUPER_CALLER.indexOf(this), d;
  if (-1 === c) {
    X_Class_SUPER_CALLER[c = X_Class_SUPER_CALLER.length] = this;
    var e = d = X_Class_SUPER_STACKS[c] = 0;
  } else {
    for (e = d = X_Class_SUPER_STACKS[c]; e;) {
      b = X_Class_getClassDef(b).SuperClass, --e;
    }
  }
  for (; b;) {
    ++e;
    b = X_Class_getClassDef(b).SuperClass;
    if (!b) {
      break;
    }
    var g = X_Class_getClassDef(b);
    if (g.Constructor) {
      X_Class_SUPER_STACKS[c] += e;
      var f = g.Constructor.apply(this, arguments);
      break;
    }
  }
  X_Class_SUPER_CALLER[c] !== this && (c = X_Class_SUPER_CALLER.indexOf(this));
  0 === d ? (X_Class_SUPER_CALLER.splice(c, 1), X_Class_SUPER_STACKS.splice(c, 1)) : X_Class_SUPER_STACKS[c] = d;
  return f || this;
}, superCall:function(a, b) {
  var c = this.constructor, d = c.prototype, e = X_Class_SUPER_CALLER.indexOf(this), g = arguments;
  if (X_Type_isFunction(a)) {
    for (k in d) {
      if (d[k] === a) {
        var f = k;
        break;
      }
    }
    if (!f) {
      return;
    }
  } else {
    if (X_Type_isString(a) && X_Type_isFunction(this[a])) {
      f = a;
    } else {
      return;
    }
  }
  if (-1 === e) {
    X_Class_SUPER_CALLER[e = X_Class_SUPER_CALLER.length] = this;
    var k = d = X_Class_SUPER_STACKS[e] = 0;
  } else {
    for (k = d = X_Class_SUPER_STACKS[e]; k;) {
      c = X_Class_getClassDef(c).SuperClass, --k;
    }
  }
  if (c) {
    for (a = c.prototype[f]; c;) {
      ++k;
      c = X_Class_getClassDef(c).SuperClass;
      var h = c.prototype[f];
      if (h !== a) {
        if (X_Type_isFunction(h)) {
          switch(X_Class_SUPER_STACKS[e] += k, g.length) {
            case 1:
              var l = h.call(this);
              break;
            case 2:
              l = h.call(this, g[1]);
              break;
            case 3:
              l = h.call(this, g[1], g[2]);
              break;
            case 4:
              l = h.call(this, g[1], g[2], g[3]);
              break;
            default:
              g = X_Array_copy(g), g.shift(), l = h.apply(this, g);
          }
        }
        break;
      }
    }
  }
  X_Class_SUPER_CALLER[e] !== this && (e = X_Class_SUPER_CALLER.indexOf(this));
  0 === d ? (X_Class_SUPER_CALLER.splice(e, 1), X_Class_SUPER_STACKS.splice(e, 1)) : X_Class_SUPER_STACKS[e] = d;
  return l;
}, instanceOf:function(a) {
  var b = this;
  if (this.constructor === a) {
    return !0;
  }
  for (; b = X_Class_getClassDef(b).SuperClass;) {
    if (b === a) {
      return !0;
    }
  }
  return !1;
}}, X_Class = {NONE:0, POOL_OBJECT:1, ABSTRACT:2, FINAL:4, SINGLETON:8};
X.Class = {NONE:X_Class.NONE, POOL_OBJECT:X_Class.POOL_OBJECT, ABSTRACT:X_Class.ABSTRACT, FINAL:X_Class.FINAL, SINGLETON:X_Class.SINGLETON, create:X_Class_create};
function X_Class_create() {
  var a = X_Array_copy(arguments), b = a[0], c, d = {}, e = {proxy:X_Class_actualConstructor, classDef:d};
  X_Type_isString(b) && (d.displayName = b, a.shift());
  d.setting = c = a[0];
  if (X_Type_isNumber(c)) {
    var g = !!(c & X_Class.POOL_OBJECT);
    var f = !!(c & X_Class.ABSTRACT);
    var k = !!(c & X_Class.FINAL);
    if (X_IS_DEV && k && f) {
      X_error("X.Class : final & Abstract!");
      return;
    }
    a.shift();
  } else {
    d.setting = 0;
  }
  a = a[0];
  if (!X_Type_isObject(a)) {
    a = {};
  } else {
    if (a.Constructor) {
      if (X_IS_DEV && !X_Type_isFunction(a.Constructor)) {
        X_error('X.Class : "Constructor" is not function. displayName=' + d.displayName);
        return;
      }
      d.Constructor = a.Constructor;
    }
  }
  c = X_Closure_actualClosure(e);
  e.klass = c;
  c.superClassOf = X_Class_superClassOf;
  c.subClassOf = X_Class_subClassOf;
  X_Class_useObjectCreate ? (c.prototype = X_Class_override(X_Class_override(X_Class_traits || c.prototype, a, !0), X_Class_CommonMethods, !1), c.prototype.constructor = c) : X_Class_use_proto_ ? (X_Class_override(c.prototype, a, !0), X_Class_traits ? c.prototype.__proto__ = X_Class_traits : X_Class_override(c.prototype, X_Class_CommonMethods, !1)) : (c.prototype = X_Class_override(X_Class_override(X_Class_traits || c.prototype, a, !0), X_Class_CommonMethods, !1), c.prototype.constructor = c);
  c.NAME = b;
  f ? d.isAbstract = !0 : g && (d.pool = [], d.live = []);
  k ? d.Final = !0 : c.inherits = X_Class_inherits;
  X_Class_CLASS_LIST.push(c);
  X_Class_DEF_LIST.push(d);
  return c;
}
function X_Class_getClass(a) {
  var b = X_Class_CLASS_LIST, c;
  if (-1 !== (c = b.indexOf(a.constructor))) {
    return b[c];
  }
  if (-1 !== b.indexOf(a)) {
    return a;
  }
}
function X_Class_getClassDef(a) {
  var b = X_Class_CLASS_LIST.indexOf(a);
  -1 === b && (b = X_Class_CLASS_LIST.indexOf(X_Class_getClass(a)));
  if (-1 !== b) {
    return X_Class_DEF_LIST[b];
  }
  if (-1 !== X_Class_DEF_LIST.indexOf(a)) {
    return a;
  }
}
function X_Class_override(a, b, c) {
  for (var d in b) {
    if (b[d] !== b.Constructor) {
      if (X_IS_DEV && ("__proto__" === d || "prototype" === d || "constructor" === d)) {
        X_error("X.Class.override : " + d + " is reserved!");
        return;
      }
      if (c || void 0 === a[d]) {
        a[d] = b[d];
      }
    }
  }
  return a;
}
function X_Class_superClassOf(a) {
  var b = X_Class_getClassDef(this), c = X_Class_getClassDef(a), d = a;
  if (!b || !c || this === a) {
    return !1;
  }
  for (; d = X_Class_getClassDef(d).SuperClass;) {
    if (d === this) {
      return !0;
    }
  }
  return !1;
}
function X_Class_subClassOf(a) {
  return a && X_Class_superClassOf.call(a, this);
}
function X_Class_inherits() {
  var a = X_Array_copy(arguments), b = [], c = X_Class_getClassDef(this), d = a[0];
  if (X_IS_DEV && c.Final) {
    return X_error("X.Class inherits, Class is final!");
  }
  X_Type_isString(d) ? a.shift() : d = "SubClass of " + c.displayName;
  b.push(d);
  d = a[0];
  X_Type_isNumber(d) ? a.shift() : d = c.setting;
  b.push(d);
  a[0] && X_Class_getClass(a[0]) && b.push(a.shift());
  b.push(a[0]);
  X_Class_traits = X_Class_useObjectCreate ? Object.create(this.prototype) : X_Class_use_proto_ ? this.prototype : new this(X_Closure_COMMAND_DROP);
  a = X_Class_create.apply(X.Class, b);
  X_Class_traits = null;
  X_Class_getClassDef(a).SuperClass = this;
  return a;
}
function X_Class_actualConstructor(a, b) {
  var c = a.klass, d = a.classDef;
  if (X_IS_DEV && d.isAbstract) {
    X_error("AbstractClass!");
  } else {
    var e = d.pool && d.pool.length ? d.pool.pop() : X_Class_useObjectCreate ? Object.create(c.prototype) : new c(X_Closure_COMMAND_DROP);
    d.live && d.live.push(e);
    X_Class_constructorFix && e.constructor !== c && (X_IS_DEV && console.log("------- constructor \u306e\u4e0d\u4e00\u81f4!"), e.constructor = c);
    c = d.Constructor ? d.Constructor.apply(e, b) : d.SuperClass && e.Super.apply(e, b);
    return c !== e && (X_Type_isObject(c) || X_Type_isFunction(c)) ? (e.kill(), c) : e;
  }
}
;var X_Event_Rename = {}, X_Event_RenameTo = {}, X_Event_proxy = {IFRAMEload:function(a) {
  a.listen("readystatechange", X_Event_proxy.IFRAMEload_proxy);
}, IFRAMEload_proxy:function(a) {
  a = this._rawObject;
  return "complete" === a.readyState || "loaded" === a.readyState ? X_EventDispatcher_actualHandleEvent("load") : X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
}, contextmenu:function(a) {
  a.listen("mousedown", X_Event_proxy.contextmenu_proxy);
}, contextmenu_proxy:function(a) {
  return 2 === a.button ? this.dispatch("contextmenu") : X_CALLBACK_NONE;
}}, X_Event_toPointer = !X_UA_HID.POINTER && (X_UA_HID.TOUCH ? {touchstart:"pointerdown", mousedown:"pointerdown", touchend:"pointerup", mouseup:"pointerup", touchmove:"pointermove", mousemove:"pointermove", touchleave:"pointerleave", mouseout:"pointerout", mouseleave:"pointerleave", touchcancel:"pointercancel", contextmenu:"contextmenu", dbclick:"dbclick", click:"click"} : {mousedown:"pointerdown", mouseup:"pointerup", mousemove:"pointermove", mouseout:"pointerout", mouseleave:"pointerleave", contextmenu:"contextmenu", 
dbclick:"dbclick", click:"click"}), X_EVENT_PRE_INIT = 5, X_EVENT_XTREE_READY = 6, X_EVENT_INIT = 7, X_EVENT_XDOM_READY = 8, X_EVENT_COMPLETE = 9, X_EVENT_READY = 10, X_EVENT_SUCCESS = 11, X_EVENT_ERROR = 12, X_EVENT_PROGRESS = 13, X_EVENT_BEFORE_CANCEL = 14, X_EVENT_CANCELED = 15, X_EVENT_TIMEOUT = 16, X_EVENT_BEFORE_KILL_INSTANCE = 17, X_EVENT_KILL_INSTANCE_CANCELED = 18, X_EVENT_KILL_INSTANCE = 19, X_EVENT_VIEW_ACTIVATE = 20, X_EVENT_VIEW_DEACTIVATE = 21, X_EVENT_VIEW_RESIZED = 22, X_EVENT_VIEW_TURNED = 
23, X_EVENT_BASE_FONT_RESIZED = 24, X_EVENT_BEFORE_UPDATE = 25, X_EVENT_UPDATED = 26, X_EVENT_AFTER_UPDATE = 27, X_EVENT_HASH_CHANGED = 28, X_EVENT_BEFORE_UNLOAD = 29, X_EVENT_UNLOAD = 30, X_EVENT_BACKEND_READY = 31, X_EVENT_BACKEND_NONE = 32, X_EVENT_BACKEND_RESEARCH = 33, X_EVENT_BACKEND_CHANGED = 34, X_EVENT_ANIME_BEFORE_START = 35, X_EVENT_ANIME_START = 36, X_EVENT_ANIME = 37, X_EVENT_ANIME_END = 38, X_EVENT_ANIME_BEFORE_STOP = 39, X_EVENT_ANIME_STOP = 40, X_EVENT_GPU_RELEASED = 41, X_EVENT_MEDIA_PLAYING = 
42, X_EVENT_MEDIA_BEFORE_LOOP = 43, X_EVENT_MEDIA_LOOPED = 44, X_EVENT_MEDIA_PAUSED = 45, X_EVENT_MEDIA_ENDED = 46, X_EVENT_MEDIA_WAITING = 47, X_EVENT_MEDIA_SEEKING = 48, X_EVENT_MEDIA_WAIT_FOR_TOUCH = 49, X_EVENT_NEED_AUTH = 50, X_EVENT_DEBUG = 51, X_EVENT_LOST = 52, X_EVENT_NEED_UPGRADE = 53, X_Event_last = 53;
X.Event = {XDOM_READY:X_EVENT_XDOM_READY, COMPLETE:X_EVENT_COMPLETE, READY:X_EVENT_READY, SUCCESS:X_EVENT_SUCCESS, ERROR:X_EVENT_ERROR, PROGRESS:X_EVENT_PROGRESS, BEFORE_CANCEL:X_EVENT_BEFORE_CANCEL, CANCELED:X_EVENT_CANCELED, TIMEOUT:X_EVENT_TIMEOUT, BEFORE_KILL_INSTANCE:X_EVENT_BEFORE_KILL_INSTANCE, KILL_INSTANCE_CANCELED:X_EVENT_KILL_INSTANCE_CANCELED, KILL_INSTANCE:X_EVENT_KILL_INSTANCE, VIEW_ACTIVATE:X_EVENT_VIEW_ACTIVATE, VIEW_DEACTIVATE:X_EVENT_VIEW_DEACTIVATE, VIEW_RESIZED:X_EVENT_VIEW_RESIZED, 
VIEW_TURNED:X_EVENT_VIEW_TURNED, BASE_FONT_RESIZED:X_EVENT_BASE_FONT_RESIZED, BEFORE_UPDATE:X_EVENT_BEFORE_UPDATE, UPDATED:X_EVENT_UPDATED, AFTER_UPDATE:X_EVENT_AFTER_UPDATE, HASH_CHANGED:X_EVENT_HASH_CHANGED, BEFORE_UNLOAD:X_EVENT_BEFORE_UNLOAD, UNLOAD:X_EVENT_UNLOAD, BACKEND_READY:X_EVENT_BACKEND_READY, BACKEND_NONE:X_EVENT_BACKEND_NONE, BACKEND_RESEARCH:X_EVENT_BACKEND_RESEARCH, BACKEND_CHANGED:X_EVENT_BACKEND_CHANGED, ANIME_BEFORE_START:X_EVENT_ANIME_BEFORE_START, ANIME_START:X_EVENT_ANIME_START, 
ANIME:X_EVENT_ANIME, ANIME_END:X_EVENT_ANIME_END, ANIME_BEFORE_STOP:X_EVENT_ANIME_BEFORE_STOP, ANIME_STOP:X_EVENT_ANIME_STOP, GPU_RELEASED:X_EVENT_GPU_RELEASED, MEDIA_PLAYING:X_EVENT_MEDIA_PLAYING, MEDIA_BEFORE_LOOP:X_EVENT_MEDIA_BEFORE_LOOP, MEDIA_LOOPED:X_EVENT_MEDIA_LOOPED, MEDIA_PAUSED:X_EVENT_MEDIA_PAUSED, MEDIA_ENDED:X_EVENT_MEDIA_ENDED, MEDIA_WAITING:X_EVENT_MEDIA_WAITING, MEDIA_SEEKING:X_EVENT_MEDIA_SEEKING, MEDIA_WAIT_FOR_TOUCH:X_EVENT_MEDIA_WAIT_FOR_TOUCH, NEED_AUTH:X_EVENT_NEED_AUTH, LOST:X_EVENT_LOST, 
NEED_UPGRADE:X_EVENT_NEED_UPGRADE, DEBUG:X_EVENT_DEBUG};
X_TEMP.onSystemReady.push(function() {
  var a, b;
  for (a in X_Event_Rename) {
    var c = X_Event_Rename[a];
    if (X_Type_isArray(c)) {
      for (b = c.length; b;) {
        X_Event_RenameTo[c[--b]] = a;
      }
    } else {
      X_Event_RenameTo[c] = a;
    }
  }
});
var X_Listeners_, X_LISTENERS_ACTUAL_HANDLER = 0, X_LISTENERS_DISPATCHING = 1, X_LISTENERS_RESERVES = 2, X_LISTENERS_UNLISTENS = 3, X_LISTENERS_KILL_RESERVED = 4, X_EventDispatcher_EVENT_TARGET_OTHER = 0, X_EventDispatcher_EVENT_TARGET_XHR = 1, X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT = 2, X_EventDispatcher_once = !1, X_EventDispatcher_lock = !1, X_EventDispatcher_unlock = !1, X_EventDispatcher_needsIndex = !1, X_EventDispatcher_safariPreventDefault = !1, X_EventDispatcher_LAZY_TIMERS = {}, X_EventDispatcher_ANIME_EVENTS = 
(X_UA.WebKit || X_UA.SafariMobile || X_UA.iOSWebView || X_UA.Chromium) && {transitionend:!0, webkitTransitionEnd:!0, mozTransitionEnd:!0, oTransitionEnd:!0, otransitionEnd:!0, animationend:!0, webkitAnimationEnd:!0, oAnimationEnd:!0, animationstart:!0, webkitAnimationStart:!0, oAnimationStart:!0, animationiteration:!0, webkitAnimationIteration:!0, oAnimationIteration:!0}, X_EventDispatcher = X.EventDispatcher = X_Class_create({_rawType:X_EventDispatcher_EVENT_TARGET_OTHER, _listeners:null, _rawObject:null, 
Constructor:function(a) {
  a && (this._rawObject = a);
}, dispatch:X_EventDispatcher_dispatch, listen:X_EventDispatcher_listen, listenOnce:function(a, b, c, d) {
  X_EventDispatcher_once = !0;
  this.listen(a, b, c, d);
  X_EventDispatcher_once = !1;
  return this;
}, unlisten:X_EventDispatcher_unlisten, listening:function(a, b, c, d) {
  var e = this._listeners, g = X_EventDispatcher_lock || X_EventDispatcher_unlock, f, k;
  if (void 0 === a) {
    return !!e;
  }
  if (!e || !(f = e[a])) {
    return !1;
  }
  if (void 0 === b) {
    return X_EventDispatcher_needsIndex ? 0 : !0;
  }
  b = b.cbKind ? b : X_Closure_classifyCallbackArgs(b, c, d, this);
  if ((k = e[X_LISTENERS_UNLISTENS]) && (k = k[a])) {
    for (a = k.length; a;) {
      if (e = k[--a], e === b || e.context === b.context && e.func === b.func && e.funcName === b.funcName && e.supplement === b.supplement && e.lock === g) {
        return !1;
      }
    }
  }
  for (a = f.length; a;) {
    if (e = f[--a], e === b || e.context === b.context && e.func === b.func && e.funcName === b.funcName && e.supplement === b.supplement && e.lock === g) {
      return X_EventDispatcher_needsIndex ? a : !0;
    }
  }
  return !1;
}, asyncDispatch:function(a, b) {
  if (a && void 0 === b) {
    b = a, a = 0;
  } else {
    if (X_IS_DEV && void 0 === a) {
      X_error("X.EventDispatcher#asyncDispatch: Invalid EventType=" + a);
      return;
    }
  }
  var c = X_Timer_add(a, 1, this, X_EventDispatcher_dispatch, [b]);
  X_EventDispatcher_LAZY_TIMERS[c] = this;
  return c;
}});
function X_EventDispatcher_dispatch(a) {
  var b = this._listeners, c = X_CALLBACK_NONE, d = a.type, e, g, f, k;
  if (!b || !(e = b[d || a])) {
    return X_CALLBACK_NONE;
  }
  d || (a = {type:d = a});
  a.target = a.target || this;
  a.currentTarget = a.currentTarget || this;
  b[X_LISTENERS_DISPATCHING] ? ++b[X_LISTENERS_DISPATCHING] : b[X_LISTENERS_DISPATCHING] = 1;
  for (g = 0; g < e.length; ++g) {
    var h = e[g];
    if (!h.removed) {
      var l = X_Closure_proxyCallback(h, f || (f = [a]));
      if (h.once || l & X_CALLBACK_UN_LISTEN) {
        if (!p) {
          var p = b[X_LISTENERS_UNLISTENS] || (b[X_LISTENERS_UNLISTENS] = {});
          p = p[d] || (p[d] = []);
        }
        -1 === p.indexOf(h) && (p[p.length] = h);
      }
      c |= X_Type_isFinite(l) ? l : 0;
      if ((l & X_CALLBACK_STOP_NOW) === X_CALLBACK_STOP_NOW) {
        break;
      }
    }
  }
  if (0 === --b[X_LISTENERS_DISPATCHING]) {
    delete b[X_LISTENERS_DISPATCHING];
    if (e = b[X_LISTENERS_RESERVES]) {
      g = 0;
      for (a = e.length; g < a; ++g) {
        h = e[g], X_EventDispatcher_once = h[4], X_EventDispatcher_lock = h[5], this.listen(h[0], h[1], h[2], h[3]), h.length = 0;
      }
      e.length = 0;
      X_EventDispatcher_once = X_EventDispatcher_lock = !1;
      delete b[X_LISTENERS_RESERVES];
    }
    if (p = b[X_LISTENERS_UNLISTENS]) {
      delete b[X_LISTENERS_UNLISTENS];
      X_EventDispatcher_unlock = !0;
      for (k in p) {
        e = p[k];
        for (g = e.length; g;) {
          this.unlisten(k, e[--g]);
        }
        e.length = 0;
        delete p[k];
      }
      X_EventDispatcher_unlock = !1;
    }
    X_EventDispatcher_LAZY_TIMERS[X_Timer_currentUID] === this && delete X_EventDispatcher_LAZY_TIMERS[X_Timer_currentUID];
    b[X_LISTENERS_KILL_RESERVED] && X_Class_CommonMethods.kill.call(this);
  }
  return c;
}
function X_EventDispatcher_listen(a, b, c, d) {
  var e = this._listeners, g;
  if (!a) {
    return this;
  }
  if (e && e[X_LISTENERS_DISPATCHING]) {
    return e[X_LISTENERS_RESERVES] || (e[X_LISTENERS_RESERVES] = []), e[X_LISTENERS_RESERVES][e[X_LISTENERS_RESERVES].length] = [a, b, c, d, X_EventDispatcher_once, X_EventDispatcher_lock], this;
  }
  if (X_Type_isArray(a)) {
    for (g = a.length; g;) {
      this.listen(a[--g], b, c, d);
    }
    return this;
  }
  var f = (g = this._rawObject || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this)) && (!e || !e[a]) && X_Type_isString(a);
  if (this.listening(a, b || this, c, d)) {
    return this;
  }
  e || (e = this._listeners = {});
  e = e[a] || (e[a] = []);
  f && X_EventDispatcher_actualAddEvent(this, a, g, e);
  a = X_Closure_classifyCallbackArgs(b, c, d, this);
  e[e.length] = a;
  a.once = X_EventDispatcher_once;
  a.lock = X_EventDispatcher_lock;
  return this;
}
function X_EventDispatcher_systemListen(a, b, c, d, e) {
  X_EventDispatcher_lock = !0;
  a.listen(b, c, d, e);
  X_EventDispatcher_lock = !1;
}
function X_EventDispatcher_unlisten(a, b, c, d) {
  var e = this._listeners, g, f;
  if (!e) {
    return this;
  }
  if (X_Type_isArray(a)) {
    for (f = a.length; f;) {
      this.unlisten(a[--f], b, c, d);
    }
    return this;
  }
  if (g = e[X_LISTENERS_RESERVES]) {
    for (f = g.length; f;) {
      var k = g[--f];
      if (k[0] === a && k[1] === b && k[2] === c && k[3] === d && (!k[5] || X_EventDispatcher_unlock)) {
        return g.splice(f, 1), g.legth || delete e[X_LISTENERS_RESERVES], this;
      }
    }
  }
  X_EventDispatcher_needsIndex = !0;
  f = this.listening(a, b, c, d);
  X_EventDispatcher_needsIndex = !1;
  if (!1 === f) {
    return this;
  }
  k = (b = e[a])[f];
  if (e[X_LISTENERS_DISPATCHING]) {
    var h = e[X_LISTENERS_UNLISTENS] || (e[X_LISTENERS_UNLISTENS] = {});
    (h = h[a]) ? h[h.length] = k : e[X_LISTENERS_UNLISTENS][a] = [k];
    k.removed = !0;
  } else {
    if (X_Object_clear(k), 1 !== b.length) {
      b.splice(f, 1);
    } else {
      b.length = 0;
      delete e[a];
      k = !0;
      for (h in e) {
        if (!(h <= X_LISTENERS_KILL_RESERVED)) {
          k = !1;
          break;
        }
      }
      X_String_isNumberString("" + a) || (e = this._rawObject || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this)) && X_EventDispatcher_actualRemoveEvent(this, a, e, b, !k);
      k && delete this._listeners;
    }
  }
  return this;
}
function X_EventDispatcher_systemUnlisten(a, b, c, d, e) {
  X_EventDispatcher_unlock = !0;
  a.unlisten(b, c, d, e);
  X_EventDispatcher_unlock = !1;
}
function X_EventDispatcher_unlistenAll(a) {
  var b = a._listeners, c, d;
  if (b) {
    for (c in b) {
      if (!(c <= X_LISTENERS_KILL_RESERVED)) {
        var e = b[c];
        for (d = e.length; d;) {
          a.unlisten(c, e[--d]);
        }
      }
    }
  }
}
function X_EventDispatcher_actualAddEvent(a, b, c, d) {
  X_EventDispatcher_lock || (b = X_Event_Rename[b] || b);
  if (X_Type_isArray(b)) {
    for (c = b.length; c;) {
      X_EventDispatcher_systemListen(a, b[--c], X_emptyFunction);
    }
  } else {
    if (X_UA_EVENT.W3C) {
      switch(a._rawType) {
        case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
          d.slcallback = X_Closure_create(a, X_EventDispatcher_sliverLightDispatch, [b]);
          d.sltoken = c.AddEventListener(b, d.slcallback);
          break;
        case X_EventDispatcher_EVENT_TARGET_XHR:
          if (12 > (X_UA.Presto || X_UA.PrestoMobile)) {
            c["on" + b] = X_Closure_create(a, X_EventDispatcher_dispatch, [b]);
            break;
          }
        default:
          X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[b] ? c.addEventListener(b, X_EventDispatcher_iOSTransitionEndDispatch, !1) : (a = a._listeners[X_LISTENERS_ACTUAL_HANDLER] || (a._listeners[X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(a, X_EventDispatcher_actualHandleEvent)), c.addEventListener ? c.addEventListener(b, a, !1) : c["on" + b] = a);
      }
    } else {
      if (X_UA_EVENT.IE) {
        switch(a._rawType) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            d.slcallback = X_Closure_create(a, X_EventDispatcher_sliverLightDispatch, [b]);
            d.sltoken = c.AddEventListener(b, d.slcallback);
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            c["on" + b] = X_Closure_create(a, X_EventDispatcher_dispatch, [b]);
            break;
          default:
            a = a._listeners[X_LISTENERS_ACTUAL_HANDLER] || (a._listeners[X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(a, X_EventDispatcher_actualHandleEvent)), c.attachEvent ? c.attachEvent("on" + b, a) : c["on" + b] = a;
        }
      } else {
        switch(a._rawType) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            d.slcallback = X_Closure_create(a, X_EventDispatcher_sliverLightDispatch, [b]);
            d.sltoken = c.AddEventListener(b, d.slcallback);
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            c["on" + b] = X_Closure_create(a, X_EventDispatcher_dispatch, [b]);
            break;
          default:
            c["on" + b] = a._listeners[X_LISTENERS_ACTUAL_HANDLER] || (a._listeners[X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(a, X_EventDispatcher_actualHandleEvent));
        }
      }
    }
  }
}
function X_EventDispatcher_iOSTransitionEndDispatch(a) {
  return X_Node_getXNode(this).dispatch(X_Event_RenameTo[a.type] || a.type);
}
function X_EventDispatcher_sliverLightDispatch(a, b, c) {
  ++g_X_uniqueStamp;
  return this.dispatch(c);
}
function X_EventDispatcher_actualRemoveEvent(a, b, c, d, e) {
  X_EventDispatcher_unlock || (b = X_Event_Rename[b] || b);
  if (X_Type_isArray(b)) {
    for (c = b.length; c;) {
      X_EventDispatcher_systemUnlisten(a, b[--c], X_emptyFunction);
    }
  } else {
    if (X_UA_EVENT.W3C) {
      switch(a._rawType) {
        case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
          c.RemoveEventListener(b, d.sltoken);
          X_Closure_correct(d.slcallback);
          delete d.sltoken;
          delete d.slcallback;
          break;
        case X_EventDispatcher_EVENT_TARGET_XHR:
          if (12 > (X_UA.Presto || X_UA.PrestoMobile)) {
            X_Closure_correct(c["on" + b]);
            c["on" + b] = "";
            break;
          }
        default:
          X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[b] ? c.removeEventListener(b, X_EventDispatcher_iOSTransitionEndDispatch, !1) : c.addEventListener ? c.removeEventListener(b, a._listeners[X_LISTENERS_ACTUAL_HANDLER], !1) : c["on" + b] = null, !e && a._listeners[X_LISTENERS_ACTUAL_HANDLER] && (X_Closure_correct(a._listeners[X_LISTENERS_ACTUAL_HANDLER]), delete a._listeners[X_LISTENERS_ACTUAL_HANDLER]);
      }
    } else {
      if (X_UA_EVENT.IE) {
        switch(a._rawType) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            c.RemoveEventListener(b, d.sltoken);
            X_Closure_correct(d.slcallback);
            delete d.sltoken;
            delete d.slcallback;
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            X_Closure_correct(c["on" + b]);
            c["on" + b] = X_emptyFunction;
            c["on" + b] = "";
            break;
          default:
            c.attachEvent ? c.detachEvent("on" + b, a._listeners[X_LISTENERS_ACTUAL_HANDLER]) : (c["on" + b] = X_emptyFunction, c["on" + b] = ""), e || (X_Closure_correct(a._listeners[X_LISTENERS_ACTUAL_HANDLER]), delete a._listeners[X_LISTENERS_ACTUAL_HANDLER]);
        }
      } else {
        switch(a._rawType) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            c.RemoveEventListener(b, d.sltoken);
            X_Closure_correct(d.slcallback);
            delete d.sltoken;
            delete d.slcallback;
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            X_Closure_correct(c["on" + b]);
            c["on" + b] = X_emptyFunction;
            c["on" + b] = "";
            break;
          default:
            c["on" + b] = X_emptyFunction, c["on" + b] = "", e || (X_Closure_correct(a._listeners[X_LISTENERS_ACTUAL_HANDLER]), delete a._listeners[X_LISTENERS_ACTUAL_HANDLER]);
        }
      }
    }
  }
}
var X_EventDispatcher_CURRENT_EVENTS = [], X_EventDispatcher_ignoreActualEvent, X_EventDispatcher_rawEvent, X_EventDispatcher_actualHandleEvent = X_UA_EVENT.IE4 || X_UA_EVENT.IE ? function() {
  var a = event, b = this._rawObject;
  if (X_EventDispatcher_ignoreActualEvent) {
    a.cancelBubble = !0;
  } else {
    ++g_X_uniqueStamp;
    X_EventDispatcher_rawEvent = a;
    var c = new X_DomEvent(a, this, b);
    X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length] = c;
    c = this.dispatch(c);
    X_EventDispatcher_rawEvent === a && (X_EventDispatcher_rawEvent = null);
    --X_EventDispatcher_CURRENT_EVENTS.length;
    c & X_CALLBACK_STOP_PROPAGATION && (a.cancelBubble = !0);
    X_EventDispatcher_CURRENT_EVENTS.length || ExecuteAtEnd_onEnd();
    if (c & X_CALLBACK_PREVENT_DEFAULT) {
      return X_EventDispatcher_ignoreActualEvent = !0, "A" === this._tag && b.blur(), X_EventDispatcher_ignoreActualEvent = !1, a.returnValue = !1;
    }
  }
} : function(a) {
  var b = X_CALLBACK_NONE, c = this._rawObject, d;
  if (X_EventDispatcher_ignoreActualEvent) {
    a.stopPropagation();
  } else {
    ++g_X_uniqueStamp;
    X_EventDispatcher_rawEvent = a;
    var e = new X_DomEvent(a, this);
    X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length] = e;
    if (X_Type_isArray(e)) {
      if (0 === e.length) {
        b = X_CALLBACK_STOP_PROPAGATION | X_CALLBACK_PREVENT_DEFAULT;
      } else {
        var g = 0;
        for (d = e.length; g < d; ++g) {
          b |= this.dispatch(e[g]) || 0;
        }
      }
    } else {
      b = this.dispatch(e);
    }
    X_EventDispatcher_rawEvent === a && (X_EventDispatcher_rawEvent = null);
    --X_EventDispatcher_CURRENT_EVENTS.length;
    X_EventDispatcher_CURRENT_EVENTS.length || ExecuteAtEnd_onEnd();
    b & X_CALLBACK_STOP_PROPAGATION && a.stopPropagation();
    if (b & X_CALLBACK_PREVENT_DEFAULT) {
      return X_EventDispatcher_ignoreActualEvent = !0, "A" === this._tag && c.blur(), X_EventDispatcher_ignoreActualEvent = !1, a.preventDefault(), 525.13 > X_UA.WebKit && ("click" === a.type || "dbclick" === a.type) && (X_EventDispatcher_safariPreventDefault = !0), !1;
    }
  }
};
525.13 > X_UA.WebKit && (X_elmHtml.onclick = X_elmHtml.ondbclick = function(a) {
  if (X_EventDispatcher_safariPreventDefault) {
    return X_EventDispatcher_safariPreventDefault = !1, a.preventDefault(), !1;
  }
});
function X_EventDispatcher_toggleAllEvents(a, b) {
  var c = a._listeners, d = a._rawObject || X_UA_DOM.IE4 && X_Node__ie4getRawNode(a), e = b ? X_EventDispatcher_actualAddEvent : X_EventDispatcher_actualRemoveEvent, g;
  if (c && d) {
    for (g in c) {
      X_String_isNumberString(g) || e(a, g, d, c[g], !0);
    }
  }
}
;var X_Timer_now = Date.now || function() {
  return +new Date;
}, X_Timer_REQ_ANIME_FRAME = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || !1, X_Timer_CANCEL_ANIME_FRAME = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || 
!1, X_Timer_INTERVAL_TIME = 16, X_Timer_TICKET_LIST = [], X_Timer_removal = null, X_Timer_skipUpdate = !1, X_Timer_uid = 0, X_Timer_timerId = 0, X_Timer_busyTimeout = !1, X_Timer_timeStamp = 0, X_Timer_waitTime = 0, X_Timer_currentUID = 0, X_Timer_REQ_FRAME_LIST = [], X_Timer_requestID = 0, X_Timer_busyOnFrame = !1, X_Timer_requestFrame = X_Timer_REQ_ANIME_FRAME ? function(a, b, c) {
  var d = X_Timer_REQ_FRAME_LIST.length;
  0 === d && (X_Timer_requestID = X_Timer_REQ_ANIME_FRAME(X_Timer_onEnterFrame));
  a = X_Closure_classifyCallbackArgs(a, b, c);
  a.cbKind || (a = {func:a});
  X_Timer_REQ_FRAME_LIST[d] = a;
  return a._uid = ++X_Timer_uid;
} : function(a, b, c) {
  var d = X_Timer_REQ_FRAME_LIST.length;
  0 === d && (X_Timer_requestID = X_Timer_add(0, 1, X_Timer_onEnterFrame));
  a = X_Closure_classifyCallbackArgs(a, b, c);
  a.cbKind || (a = {func:a});
  X_Timer_REQ_FRAME_LIST[d] = a;
  return a._uid = ++X_Timer_uid;
}, X_Timer_cancelFrame = X_Timer_CANCEL_ANIME_FRAME ? function(a) {
  var b = X_Timer_REQ_FRAME_LIST, c = b.length, d = c, e;
  if (X_Timer_busyOnFrame) {
    X_Timer_removal || (X_Timer_removal = {}), X_Timer_removal[a] = !0;
  } else {
    for (; d && !((e = b[--d])._uid < a);) {
      if (e._uid == a) {
        b.splice(d, 1);
        1 === c && X_Timer_CANCEL_ANIME_FRAME && X_Timer_CANCEL_ANIME_FRAME(X_Timer_requestID);
        break;
      }
    }
  }
  return 0;
} : function(a) {
  var b = X_Timer_REQ_FRAME_LIST, c = b.length, d = c, e;
  if (X_Timer_busyOnFrame) {
    X_Timer_removal || (X_Timer_removal = {}), X_Timer_removal[a] = !0;
  } else {
    for (; d && !((e = b[--d])._uid < a);) {
      if (e._uid == a) {
        b.splice(d, 1);
        1 === c && X_Timer_remove(X_Timer_requestID);
        break;
      }
    }
  }
  return 0;
};
X.Timer = {RESOLUTION:X_Timer_INTERVAL_TIME, now:X_Timer_now, add:X_Timer_add, once:X_Timer_once, remove:X_Timer_remove, requestFrame:X_Timer_requestFrame, cancelFrame:X_Timer_cancelFrame};
function X_Timer_add(a, b, c, d, e) {
  var g = X_Timer_TICKET_LIST;
  a = a < X_Timer_INTERVAL_TIME ? 1 : a / X_Timer_INTERVAL_TIME | 0;
  X_Type_isNumber(b) || (e = d, d = c, c = b, b = 0);
  c = X_Closure_classifyCallbackArgs(c, d, e);
  if (!c) {
    return -1;
  }
  c.cbKind || (c = {func:c});
  c._time = a;
  c.last = a;
  c._count = b;
  c._uid = ++X_Timer_uid;
  g[g.length] = c;
  !X_Timer_busyTimeout && X_Timer_update();
  return X_Timer_uid;
}
function X_Timer_once(a, b, c, d) {
  return X_Timer_add(a, 1, b, c, d);
}
function X_Timer_remove(a) {
  var b = X_Timer_TICKET_LIST, c = b.length, d = c, e;
  if (X_Timer_busyTimeout) {
    X_Timer_removal || (X_Timer_removal = {}), X_Timer_removal[a] = !0;
  } else {
    for (; c;) {
      if ((e = b[--c])._uid == a) {
        b.splice(c, 1);
        X_EventDispatcher_LAZY_TIMERS[a] && delete X_EventDispatcher_LAZY_TIMERS[a];
        !X_Timer_skipUpdate && (e.last <= X_Timer_waitTime || 1 === d) && X_Timer_update();
        break;
      }
    }
  }
  return 0;
}
if (5 > (X_UA.Trident || X_UA.TridentMobile) || X_UA.Tasman) {
  window.__timercb__ = X_Timer_onTimeout, X_Timer_onTimeout = "__timercb__()";
}
function X_Timer_onTimeout() {
  var a = X_Timer_now(), b = (a - X_Timer_timeStamp) / X_Timer_INTERVAL_TIME | 0 || 1, c = X_Timer_TICKET_LIST, d = 0, e = c.length;
  a += X_Timer_INTERVAL_TIME / 2;
  var g, f;
  ++g_X_uniqueStamp;
  for (X_Timer_busyTimeout = !0; d < e; ++d) {
    var k = c[d];
    if (!(X_Timer_removal && X_Timer_removal[k._uid] || 0 < (k.last -= b) || g && (k.last = 1))) {
      var h = k._count;
      X_Timer_currentUID = k._uid;
      var l = k.cbKind ? X_Closure_proxyCallback(k, []) : k.func();
      a <= X_Timer_now() && (g = !0);
      l & X_CALLBACK_UN_LISTEN || 1 === h ? (c.splice(d, 1), --d, --e) : (1 < h && --k._count, k.last = k._time);
    }
  }
  X_Timer_timerId = X_Timer_currentUID = 0;
  X_Timer_busyTimeout = !1;
  if (X_Timer_removal) {
    X_Timer_skipUpdate = !0;
    for (f in X_Timer_removal) {
      X_Timer_remove(f);
    }
    X_Timer_skipUpdate = !1;
    X_Timer_removal = null;
  }
  X_Timer_update();
  ExecuteAtEnd_onEnd();
}
function X_Timer_update() {
  var a = X_Timer_TICKET_LIST, b = a.length;
  if (0 === b) {
    X_Timer_timerId && clearTimeout(X_Timer_timerId), X_Timer_timerId = 0;
  } else {
    if (1 < b && a.sort(X_Timer_compareQueue), a = a[0].last, a < X_Timer_waitTime || 0 === X_Timer_timerId) {
      X_Timer_timerId && (clearTimeout(X_Timer_timerId), a -= (X_Timer_now() - X_Timer_timeStamp) / X_Timer_INTERVAL_TIME, 0 <= a || (a = 0)), X_Timer_timeStamp = X_Timer_now(), X_Timer_timerId = setTimeout(X_Timer_onTimeout, X_Timer_INTERVAL_TIME * a | 0), X_Timer_waitTime = a;
    }
  }
}
function X_Timer_compareQueue(a, b) {
  return a.last === b.last ? a._uid - b._uid : a.last - b.last;
}
6.1 > (X_UA.SafariMobile || X_UA.iOSWebView) && window.addEventListener("scroll", function() {
  if (X_Timer_timerId) {
    clearTimeout(X_Timer_timerId);
    var a = X_Timer_now();
    var b = X_Timer_timeStamp + X_Timer_INTERVAL_TIME * X_Timer_waitTime - a;
    X_Timer_timerId = setTimeout(X_Timer_onTimeout, 0 < b ? b : 0);
    X_Timer_timeStamp = a;
    X_Timer_waitTime = b / X_Timer_INTERVAL_TIME | 0;
  }
  X_ViewPort_getScrollPosition();
});
function X_Timer_onEnterFrame(a) {
  var b = X_Timer_REQ_FRAME_LIST, c = b.length, d = 0, e, g;
  a = a || X_Timer_now();
  ++g_X_uniqueStamp;
  for (X_Timer_busyOnFrame = !0; d < c; ++d) {
    var f = b[d];
    X_Timer_removal && X_Timer_removal[f._uid] || (f.cbKind ? X_Closure_proxyCallback(f, g || (g = [a])) : f.func(a));
  }
  b.splice(0, c);
  b.length && (X_Timer_requestID = X_Timer_REQ_ANIME_FRAME ? X_Timer_REQ_ANIME_FRAME(X_Timer_onEnterFrame) : X_Timer_add(0, 1, X_Timer_onEnterFrame));
  X_Timer_busyOnFrame = !1;
  if (X_Timer_removal) {
    for (e in X_Timer_removal) {
      X_Timer_cancelFrame(X_Timer_removal[e]);
    }
    X_Timer_removal = null;
  }
  ExecuteAtEnd_onEnd();
}
;var ExecuteAtEnd_CALLBACKS = [];
function ExecuteAtEnd_add(a) {
  ExecuteAtEnd_CALLBACKS[ExecuteAtEnd_CALLBACKS.length] = a;
}
function ExecuteAtEnd_onEnd() {
  var a = -1, b;
  if (ExecuteAtEnd_CALLBACKS.length) {
    for (; b = ExecuteAtEnd_CALLBACKS[++a];) {
      b();
    }
    ExecuteAtEnd_CALLBACKS.length = 0;
  }
}
;var FocusUtility_lastElmFocused, FocusUtility_docActiveElmSupport = X_UA.Trident || X_UA.TridentMobile || void 0 !== document.activeElement, FocusUtility_fixActiveElm;
!FocusUtility_docActiveElmSupport && document.addEventListener && (document.addEventListener("focus", function(a) {
  a = a.target;
  FocusUtility_fixActiveElm = 3 === a.nodeType ? a.parentNode : a;
}, !1), document.addEventListener("blur", function(a) {
  a = a.target;
  a = 3 === a.nodeType ? a.parentNode : a;
  a === FocusUtility_fixActiveElm && (FocusUtility_fixActiveElm = null);
}, !1));
function FocusUtility_getFocusedElement() {
  return FocusUtility_fixActiveElm || (X_Script_gte15 ? X_Script_try(X_Object_find, [document, "activeElement"]) : X_Script_VBS_ENABLED && vbs_testAE() && document.activeElement);
}
function FocusUtility_setTemporarilyFocus(a) {
  var b = FocusUtility_getFocusedElement();
  b !== a && (X_EventDispatcher_ignoreActualEvent = !0, a.focus(), X_EventDispatcher_ignoreActualEvent = !1, FocusUtility_lastElmFocused || (FocusUtility_lastElmFocused = b) && ExecuteAtEnd_add(FocusUtility_restoreFocus));
}
function FocusUtility_restoreFocus() {
  var a = FocusUtility_getFocusedElement(), b = FocusUtility_lastElmFocused;
  a !== b && (X_EventDispatcher_ignoreActualEvent = !0, b.focus(), X_EventDispatcher_ignoreActualEvent = !1);
  FocusUtility_lastElmFocused = null;
}
;var X_System_postMessageAccessKey = window.postMessage ? 10000 * Math.random() | 0 : 0, X_System_MESSAGE_RECIVERS = X_System_postMessageAccessKey && {}, X_System = X_Class_override(X_EventDispatcher(), {monitor:function() {
}, gc:function() {
}, message:function(a, b) {
  var c = 10000 * Math.random() | 0;
  if (X_System_postMessageAccessKey) {
    return X_System_MESSAGE_RECIVERS[a + c] = b, X_ViewPort.listen("message", X_System), X_System_postMessageAccessKey + "-" + a + c;
  }
}, handleEvent:function(a) {
  switch(a) {
    case "message":
      if (a.origin === X.URL.BASE_URL) {
        var b = a.data.indexOf("-");
        if (a.data.substr(0, b) == X_System_postMessageAccessKey) {
          var c = a.data.substr(b, b = a.data.indexOf(" "));
          if (X_System_MESSAGE_RECIVERS[c]) {
            X_System_MESSAGE_RECIVERS[c](a.data.substr(b + c.length));
          }
        }
      }
      return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
  }
}}), X_System_javascriptScore;
X_TEMP.onRearchEndOfScript = function() {
  var a = X_TEMP.onSystemReady, b = a.length, c = X_Timer_now() - X.bootTime;
  X.bootSpeed = X_System_javascriptScore = c;
  for (delete X_TEMP.onRearchEndOfScript; b;) {
    a[--b](X_System);
  }
  delete X_TEMP.onSystemReady;
};
var X_ViewPort_readyState, X_ViewPort_active = window.parent === window || !window.parent, X_ViewPort_activeTimerID, X_ViewPort_rootElement, X_ViewPort_lock, X_ViewPort_width, X_ViewPort_height, X_ViewPort_scrollX = 0, X_ViewPort_scrollY = 0, X_ViewPort_baseFontSize, X_ViewPort_vScrollbarSize, X_ViewPort_hScrollbarSize, X_ViewPort_useDetectionLoop = 9 > (X_UA.Trident || X_UA.TridentMobile) || X_UA.SafariMobile || X_UA.iOSWebView, X_ViewPort_watchScroll = X_UA.PrestoMobile && X_UA.Android, X_ViewPort_detectFontSize = 
!X_ViewPort_useDetectionLoop && function() {
  var a = X_Node_fontSizeNode._rawObject.offsetHeight;
  X_ViewPort_baseFontSize !== a && (X_ViewPort_baseFontSize = a) && X_ViewPort.asyncDispatch(X_EVENT_BASE_FONT_RESIZED);
}, X_ViewPort_orientationFlag, X_ViewPort_orientationchange = void 0 !== window.orientation && function(a) {
  X_ViewPort_orientationFlag = !0;
  !X_UA.Android && X_ViewPort_resize();
}, X_ViewPort_document = X_EventDispatcher(document), X_ViewPort = X_Class_override(X_EventDispatcher(window), {handleEvent:function(a) {
  var b = !1, c;
  switch(a.type) {
    case "beforeunload":
      return a = a.target && a.target.attr && a.target.attr("href"), X_Type_isString(a) && !a.toLowerCase().indexOf("javascript:") ? X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION : X_ViewPort.dispatch(X_EVENT_BEFORE_UNLOAD);
    case "unload":
      X_ViewPort.dispatch(X_EVENT_UNLOAD);
      X_ViewPort_document.kill();
      X_ViewPort.kill();
      break;
    case "visibilitychange":
      X_ViewPort.dispatch((X_ViewPort_active = !document.hidden) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
      break;
    case "msvisibilitychange":
      X_ViewPort.dispatch((X_ViewPort_active = !document.msHidden) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
      break;
    case "mozvisibilitychange":
      X_ViewPort.dispatch((X_ViewPort_active = !document.mozHidden) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
      break;
    case "webkitvisibilitychange":
      X_ViewPort.dispatch((X_ViewPort_active = !document.webkitHidden) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
      break;
    case "blur":
    case "focusout":
      if (9 > (X_UA.Trident || X_UA.TridentMobile) && (c = FocusUtility_getFocusedElement())) {
        return (a = X_Node_getXNode(c)) && a.listenOnce(["focus", "blur"], X_ViewPort_detectFocusForIE), X_ViewPort_activeTimerID && X_Timer_remove(X_ViewPort_activeTimerID), X_ViewPort_activeTimerID = X_Timer_once(16, X_ViewPort_changeFocus), X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
      }
      if (a.target !== X_ViewPort_document) {
        break;
      }
    case "pagehide":
      b = !0;
    case "focus":
    case "pageshow":
    case "focusin":
      X_ViewPort_active === b && (X_ViewPort_active = !b, X_ViewPort.dispatch(b ? X_EVENT_VIEW_DEACTIVATE : X_EVENT_VIEW_ACTIVATE));
  }
}});
function X_ViewPort_detectFocusForIE(a) {
  var b = FocusUtility_getFocusedElement();
  X_ViewPort_active = "focus" === a.type;
  b && this._rawObject !== b && this.unlisten(X_ViewPort_active ? "blur" : "focus", X_ViewPort_detectFocusForIE);
  X_ViewPort_activeTimerID && X_Timer_remove(X_ViewPort_activeTimerID);
  X_ViewPort_activeTimerID = X_Timer_once(16, X_ViewPort_changeFocus);
  return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
}
function X_ViewPort_changeFocus() {
  X_ViewPort.dispatch(X_ViewPort_active ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
  X_ViewPort_activeTimerID = 0;
}
var X_ViewPort_getScrollPosition = void 0 !== window.pageXOffset ? function() {
  X_Node_updateTimerID && X_Node_startUpdate();
  return [X_ViewPort_scrollX = window.pageXOffset, X_ViewPort_scrollY = window.pageYOffset];
} : void 0 !== window.scrollLeft ? function() {
  X_Node_updateTimerID && X_Node_startUpdate();
  return [X_ViewPort_scrollX = window.scrollLeft, X_ViewPort_scrollY = window.scrollTop];
} : function() {
  X_Node_updateTimerID && X_Node_startUpdate();
  return [X_ViewPort_scrollX = X_ViewPort_rootElement.scrollLeft || X_elmBody.scrollLeft, X_ViewPort_scrollY = X_ViewPort_rootElement.scrollTop || X_elmBody.scrollTop];
};
X.ViewPort = {listen:function(a, b, c, d) {
  a <= X_ViewPort_readyState && X_ViewPort.asyncDispatch(a);
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort.listen(a, this, e.func, e.supplement) : X_ViewPort.listen(a, b, c, d) : X_ViewPort.listen(a, this, b);
  return X.ViewPort;
}, listenOnce:function(a, b, c, d) {
  a <= X_ViewPort_readyState && X_ViewPort.asyncDispatch(a);
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort.listenOnce(a, this, e.func, e.supplement) : X_ViewPort.listenOnce(a, b, c, d) : X_ViewPort.listenOnce(a, this, b);
  return X.ViewPort;
}, unlisten:function(a, b, c, d) {
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort.unlisten(a, this, e.func, e.supplement) : X_ViewPort.unlisten(a, b, c, d) : X_ViewPort.unlisten(a, this, b);
  return X.ViewPort;
}, listening:function(a, b, c, d) {
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  return e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort.listening(a, this, e.func, e.supplement) : X_ViewPort.listening(a, b, c, d) : X_ViewPort.listening(a, this, b);
}, asyncDispatch:function() {
  return X_ViewPort.asyncDispatch.apply(X_ViewPort, arguments);
}, getPointerPosition:function() {
}, inView:function(a) {
}, getSize:function() {
  return [X_ViewPort_width, X_ViewPort_height];
}, getDocumentSize:function() {
  X_Node_updateTimerID && X_Node_startUpdate();
  return [X_ViewPort_rootElement.scrollWidth || X_ViewPort_rootElement.offsetWidth || X_ViewPort_rootElement.clientWidth, X_ViewPort_rootElement.scrollHeight || X_ViewPort_rootElement.offsetHeight || X_ViewPort_rootElement.clientHeight];
}, getScrollPosition:X_ViewPort_getScrollPosition, getScrollbarSize:function() {
  return [X_ViewPort_vScrollbarSize, X_ViewPort_hScrollbarSize];
}, getBaseFontSize:function() {
  return X_Node_updateTimerID ? (X_Node_startUpdate(), X_ViewPort_baseFontSize = X_Node_fontSizeNode._rawObject.offsetHeight) : X_ViewPort_baseFontSize;
}, isActive:function() {
  return X_ViewPort_active;
}, isVisible:function() {
  return X_ViewPort_active;
}};
var X_ViewPort_resize = X_ViewPort_useDetectionLoop ? function() {
  if (!X_ViewPort_lock) {
    var a = X_ViewPort_getWindowSize();
    if (X_ViewPort_width !== a[0] || X_ViewPort_height !== a[1]) {
      X_ViewPort_width = a[0], X_ViewPort_height = a[1], X_Timer_once(32, X_ViewPort_detectFinishResizing), X_ViewPort_lock = !0;
    }
  }
  a = X_Node_fontSizeNode._rawObject.offsetHeight;
  X_ViewPort_baseFontSize !== a && (X_ViewPort_baseFontSize && X_ViewPort.asyncDispatch(X_EVENT_BASE_FONT_RESIZED), X_ViewPort_baseFontSize = a);
} : function(a) {
  !X_ViewPort_lock && (X_ViewPort_lock = !0) && X_Timer_once(32, X_ViewPort_detectFinishResizing);
  return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
};
function X_ViewPort_detectFinishResizing() {
  var a = X_ViewPort_getWindowSize();
  X_ViewPort_width !== a[0] || X_ViewPort_height !== a[1] ? (X_ViewPort_width = a[0], X_ViewPort_height = a[1], X_Timer_once(32, X_ViewPort_detectFinishResizing)) : (X_ViewPort.asyncDispatch(X_EVENT_VIEW_RESIZED), X_ViewPort_lock = !1, X_ViewPort_orientationFlag && (X_ViewPort_orientationFlag = !1, X_ViewPort.asyncDispatch(32, {type:X_EVENT_VIEW_TURNED, orientation:window.orientation})));
}
X_TEMP.onDomContentLoaded = function() {
  var a, b, c;
  if (X_EVENT_PRE_INIT <= X_ViewPort_readyState) {
    return X_CALLBACK_UN_LISTEN;
  }
  X_ViewPort_readyState = X_EVENT_PRE_INIT;
  X_TEMP.onDomContentLoaded && X_ViewPort_document.unlisten("DOMContentLoaded", X_TEMP.onDomContentLoaded);
  delete X_TEMP.onDomContentLoaded;
  X_elmBody = document.body;
  X_ViewPort_rootElement = "CSS1Compat" !== document.compatMode ? X_elmBody : X_elmHtml || X_elmBody;
  X.Doc.html = a = X_Node_html = X_elmHtml && X_Node(X_elmHtml).removeClass("js-disabled");
  a._flags |= X_NodeFlags_IN_TREE;
  X.Doc.head = b = X_Node_head = X_elmHead && X_Node(X_elmHead);
  X.Doc.body = c = X_Node_body = X_Node(X_elmBody);
  c["parent "] = b.parent = a;
  a._xnodes = [b, c];
  a.appendTo = a.prev = a.next = a.clone = a.remove = a.kill = a.create = a.createText = a.createAt = a.createTextAt = a.append = a.appendAt = a.empty = a.html = a.text = b.appendTo = b.prev = b.clone = b.remove = b.kill = b.createText = b.createTextAt = b.empty = b.html = b.text = b.css = b.cssText = c.appendTo = c.next = c.clone = c.remove = c.kill = new Function("return this");
  X_ViewPort.listenOnce(X_EVENT_PRE_INIT, function() {
    X_ViewPort_readyState = X_EVENT_XTREE_READY;
    !X_TEMP.X_Dom_useBuilder && X_ViewPort.asyncDispatch(X_EVENT_XTREE_READY);
  });
  X_ViewPort.listenOnce(X_EVENT_XTREE_READY, function() {
    X_ViewPort_readyState = X_EVENT_INIT;
    X_Node_body.appendAt(0, X_Node_systemNode = X_Doc_create("div", {"class":"hidden-system-node"}), X_Node_fontSizeNode = X_Doc_create("div", {"class":"hidden-system-node"}).cssText("line-height:1;height:1em;").text("X"));
    X_Node_startUpdate();
    X_ViewPort.asyncDispatch(X_EVENT_INIT);
  });
  X_ViewPort.listenOnce(X_EVENT_INIT, function() {
    var a = X_ViewPort_getWindowSize(), b = X_elmBody.style.overflow;
    X_ViewPort_width = a[0];
    X_ViewPort_height = a[1];
    X_elmBody.style.overflow = "hidden";
    a = X_elmBody.clientWidth;
    var c = X_elmBody.clientHeight;
    X_elmBody.style.overflow = "scroll";
    a -= X_elmBody.clientWidth;
    c -= X_elmBody.clientHeight;
    a || (a = X_elmBody.offsetWidth - X_elmBody.clientWidth);
    c || (c = X_elmBody.offsetHeight - X_elmBody.clientHeight);
    X_elmBody.style.overflow = b;
    X_ViewPort_vScrollbarSize = a;
    X_ViewPort_hScrollbarSize = c;
    0 >= c && (X_ViewPort_hScrollbarSize = a);
    X_ViewPort_orientationchange && X_ViewPort.listen("orientationchange", X_ViewPort_orientationchange);
    X_ViewPort_detectFontSize ? (X_ViewPort.listen("resize", X_ViewPort_resize), X_ViewPort_watchScroll && X_ViewPort.listen("scroll", X_ViewPort_resize), X_Timer_add(100, X_ViewPort_detectFontSize)) : X_Timer_add(100, X_ViewPort_resize);
    X_ViewPort_baseFontSize = X_Node_fontSizeNode._rawObject.offsetHeight;
    X_ViewPort.asyncDispatch(X_ViewPort_readyState = X_EVENT_XDOM_READY);
  });
  X_TEMP.X_Dom_useBuilder && (X_TEMP.X_Dom_useBuilder = !!X_elmBody.children.length);
  X_ViewPort.asyncDispatch(X_EVENT_PRE_INIT);
  X_ViewPort.listen(["beforeunload", "unload"]);
  void 0 !== document.hidden ? X_ViewPort_document.listen("visibilitychange", X_ViewPort) : void 0 !== document.webkitHidden ? X_ViewPort_document.listen("webkitvisibilitychange", X_ViewPort) : void 0 !== document.msHidden ? X_ViewPort_document.listen("msvisibilitychange", X_ViewPort) : void 0 !== document.mozHidden && X_ViewPort_document.listen("mozvisibilitychange", X_ViewPort);
  void 0 !== window.onpageshow && X_ViewPort.listen(["pageshow", "pagehide"]);
  X_UA.Gecko || X_UA.Fennec ? (document.addEventListener("focus", X_ViewPort.handleEvent, !0), document.addEventListener("blur", X_ViewPort.handleEvent, !0)) : X_ViewPort_document.listen(["focusin", "focusout"], X_ViewPort);
  FocusUtility_docActiveElmSupport || X_ViewPort.listen("focus", X_ViewPort_fixActiveElm);
  X_ViewPort.listen(["focus", "blur"]);
  return X_CALLBACK_UN_LISTEN;
};
function X_ViewPort_fixActiveElm(a) {
  FocusUtility_fixActiveElm = a.target._rawObject;
}
function X_ViewPort_getWindowSize() {
  return X_UA.Trident || X_UA.TridentMobile ? [X_ViewPort_rootElement.clientWidth, X_ViewPort_rootElement.clientHeight] : 12 > (X_UA.Presto || X_UA.PrestoMobile) ? [X_ViewPort_rootElement.offsetWidth, X_ViewPort_rootElement.offsetHeight] : X_UA.Samsung ? [window.outerWidth, window.outerHeight] : X_UA.iOSWebView && X_UA.Firefox ? [window.outerWidth, window.outerHeight] : [window.innerWidth, window.innerHeight];
}
X_UA_EVENT.W3C ? X_ViewPort_document.listenOnce("DOMContentLoaded", X_TEMP.onDomContentLoaded) : 6 <= (X_UA.Trident || X_UA.TridentMobile) && X.inHead && (X_TEMP._script = document.createElement("<script id=__ieonload defer src=javascript:void(0)>\x3c/script>"), X_elmHead.appendChild(X_TEMP._script), X_TEMP._script.onreadystatechange = function() {
  var a = X_TEMP._script;
  a && "complete" === a.readyState && (a.onreadystatechange = X_emptyFunction, a.onreadystatechange = null, a.removeNode(!0), delete X_TEMP._script, X_TEMP.onDomContentLoaded && X_TEMP.onDomContentLoaded());
});
419.3 >= X_UA.WebKit && X_Timer_add(16, function() {
  if (!X_TEMP.onDomContentLoaded) {
    return X_CALLBACK_UN_LISTEN;
  }
  if ("loaded" === document.readyState || "complete" === document.readyState) {
    return X_TEMP.onDomContentLoaded();
  }
});
X_ViewPort.listenOnce("load", X_TEMP.onDomContentLoaded);
X.Logger = {_$LogArea:null, debug:function(a) {
  X.Logger._output(a, 0);
}, info:function(a) {
  X.Logger._output(a, 1);
}, warn:function(a) {
  X.Logger._output(a, 2);
}, critical:function(a) {
  X.Logger._output(a, 3);
}, _output:function(a, b) {
  var c;
  if (X_EVENT_XDOM_READY <= X_ViewPort_readyState) {
    if (c = X.Logger._$LogArea) {
      c.remove(), delete X.Logger._$LogArea;
    }
  } else {
    X_EVENT_XDOM_READY <= X_ViewPort_readyState ? ((c = X.Logger._$LogArea) || (c = X.Logger._$LogArea = X_Node("div").addToRoot(0)), c.add("<p>" + a + "</p>")) : console ? 0 === b ? console.debug(a) : 1 === b ? console.info(a) : console.warn(a) : 1 < b && alert(a);
  }
}};
X.Doc = {listen:function(a, b, c, d) {
  a <= X_ViewPort_readyState && "DOMContentLoaded" === a && X_ViewPort_document.asyncDispatch(a);
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort_document.listen(a, this, e.func, e.supplement) : X_ViewPort_document.listen(a, b, c, d) : X_ViewPort_document.listen(a, this, b);
  return X.Doc;
}, listenOnce:function(a, b, c, d) {
  a <= X_ViewPort_readyState && "DOMContentLoaded" === a && X_ViewPort_document.asyncDispatch(a);
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY && X_ViewPort_document.listenOnce(a, this, e.func, e.supplement) : X_ViewPort_document.listenOnce(a, this, b);
  X_ViewPort_document.listenOnce(a, b, c, d);
  return X.Doc;
}, unlisten:function(a, b, c, d) {
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort_document.unlisten(a, this, e.func, e.supplement) : X_ViewPort_document.unlisten(a, b, c, d) : X_ViewPort_document.unlisten(a, this, b);
  return X.Doc;
}, listening:function(a, b, c, d) {
  var e = X_Closure_classifyCallbackArgs(b, c, d);
  return e.cbKind ? e.cbKind === X_CLOSURE_FUNC_ONLY ? X_ViewPort_document.listening(a, this, e.func, e.supplement) : X_ViewPort_document.listening(a, b, c, d) : X_ViewPort_document.listening(a, this, b);
}, create:X_Doc_create, createText:X_Doc_createText};
function X_Doc_create(a, b, c) {
  switch(X_Node_getType(a)) {
    case X_NodeType_STRING:
      return X_Node_newByTag = !0, new X_Node(a, b, c);
    case X_NodeType_HTML_STRING:
      a = X_HtmlParser_parse(a, !0);
      for (b = a.length; 1 < b;) {
        a[--b].kill();
      }
      return a[0];
  }
}
function X_Doc_createText(a) {
  X_Node_newByText = !0;
  return new X_Node(a);
}
;var X_Dom_DTD_EMPTY = {AREA:!0, BASE:!0, BASEFONT:!0, BR:!0, COL:!0, FRAME:!0, HR:!0, IMG:!0, INPUT:!0, ISINDEX:!0, LINK:!0, META:!0, PARAM:!0, EMBED:!0}, X_Dom_DTD_TAG_FIX = 5 > (X_UA.Trident || X_UA.TridentMobile) ? {ABBR:"ACRONYM", BDO:"", RUBY:""} : 7 > (X_UA.Trident || X_UA.TridentMobile) ? {ABBR:"ACRONYM"} : {}, X_Dom_DTD_ATTR_VAL_IS_URI = {action:!0, archive:!0, background:!0, cite:!0, classid:!0, codebase:!0, data:!0, href:!0, longdesc:!0, profile:!0, src:!0, usemap:!0}, X_Dom_DTD_MOVE_TO_HEAD = 
{STYLE:!0, LINK:!0, TITLE:!0, BGSOUND:!0, AREA:!0, BASE:!0, META:!0}, X_Dom_DTD_CLEANUP_TAGS = {SCRIPT:!0, NOSCRIPT:!0, NOFRAMES:!0, "!":!0, COMMENT:!0, NOEMBED:!0, NOLAYER:!0}, X_Dom_DTD_SKIP_CLEANUP_TAGS = {PRE:!0, TEXTAREA:!0, CODE:!0, KBD:!0, SAMP:!0, XMP:!0, PLAINTEXT:!0, LISTING:!0};
var X_NodeFlags_DESTROYED = 0, X_NodeFlags_EXIST = 1, X_NodeFlags_IN_TREE = 2, X_NodeFlags_STYLE_IS_DISPLAY_NONE = 4, X_NodeFlags_STYLE_IS_INVISIBLE = 8, X_NodeFlags_STYLE_IS_POS_ABSOLUTE = 16, X_NodeFlags_STYLE_IS_NO_OVERFLOW = 32, X_NodeFlags_STYLE_IS_WIDTH_LENGTH = 64, X_NodeFlags_STYLE_IS_WIDTH_PCT = 128, X_NodeFlags_STYLE_IS_HEIGHT_LENGTH = 256, X_NodeFlags_STYLE_IS_HEIGHT_PCT = 512, X_NodeFlags_STYLE_IS_FONT_LENGTH = 1024, X_NodeFlags_STYLE_IS_FONT_PCT = 2048, X_NodeFlags_DIRTY_POSITION = 4096, 
X_NodeFlags_DIRTY_CONTENT = 8192, X_NodeFlags_DIRTY_ID = 8192, X_NodeFlags_DIRTY_CLASSNAME = 16384, X_NodeFlags_DIRTY_ATTR = 32768, X_NodeFlags_DIRTY_CSS = 65536, X_NodeFlags_DIRTY_IE_FILTER = 10 > (X_UA.Trident || X_UA.TridentMobile) && X_UA_ActiveX ? 131072 : 0, X_NodeFlags_ACTUAL_LISTENING = 262144, X_NodeFlags_OLD_ATTRTEXT = 524288, X_NodeFlags_OLD_CSSTEXT = 1048576, X_NodeFlags_IE_FILTER_NOW = 2097152, X_NodeFlags_GPU_RESERVED = 4194304, X_NodeFlags_GPU_NOW = 8388608, X_NodeFlags_GPU_RELEASE_RESERVED = 
16777216, X_NodeFlags_GPU_CHILD = 33554432, X_NodeFlags_IE4_HAS_TEXTNODE = 5 > (X_UA.Trident || X_UA.TridentMobile) ? 4194304 : 0, X_NodeFlags_IE4_HAS_ELEMENT = 5 > (X_UA.Trident || X_UA.TridentMobile) ? 8388608 : 0, X_NodeFlags_IE4_DIRTY_CHILDREN = 5 > (X_UA.Trident || X_UA.TridentMobile) ? 16777216 : 0, X_NodeFlags_IE4_FIXED = 5 > (X_UA.Trident || X_UA.TridentMobile) ? 33554432 : 0, X_NodeFlags_IE5_DISPLAY_NONE_FIX = 5 <= (X_UA.Trident || X_UA.TridentMobile) && 5.5 > (X_UA.Trident || X_UA.TridentMobile) && 
10 !== X_UA.Win32 && X_UA_ActiveX ? 33554432 : 0, X_NodeFlags_IE8_OPACITY_FIX = 0, X_NodeFlags_IE_FILTER_FIX_AFTER = X_UA_ActiveX && 134217728, X_NodeFlags_IS_SVG = document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect ? 268435456 : 0, X_NodeFlags_IS_VML = function() {
  if (!X_UA_ActiveX || 5 > (X_UA.Trident || X_UA.TridentMobile) || 9 < (X_UA.Trident || X_UA.TridentMobile)) {
    return 0;
  }
  document.write("\x3c!--[if vml]><script id=vmltest1>__vml=1;\x3c/script><![endif]--\x3e\x3c!--[if gte vml 1]><script id=vmltest2>__vml=2;\x3c/script><![endif]--\x3e");
  X.Doc.VML = window.__vml / 2 || 0;
  switch(window.__vml) {
    case 2:
      document.getElementById("vmltest2").removeNode(!0);
    case 1:
      return document.getElementById("vmltest1").removeNode(!0), 536870912;
  }
  return 0;
}(), X_Node_BITMASK_RESET_STYLE = 2147483647 ^ (X_NodeFlags_STYLE_IS_DISPLAY_NONE | X_NodeFlags_STYLE_IS_INVISIBLE | X_NodeFlags_STYLE_IS_POS_ABSOLUTE | X_NodeFlags_STYLE_IS_NO_OVERFLOW | X_NodeFlags_STYLE_IS_WIDTH_LENGTH | X_NodeFlags_STYLE_IS_WIDTH_PCT | X_NodeFlags_STYLE_IS_HEIGHT_LENGTH | X_NodeFlags_STYLE_IS_HEIGHT_PCT | X_NodeFlags_STYLE_IS_FONT_LENGTH | X_NodeFlags_STYLE_IS_FONT_PCT), X_Node_BitMask_IS_DIRTY = X_NodeFlags_DIRTY_POSITION | X_NodeFlags_DIRTY_CONTENT | X_NodeFlags_DIRTY_ID | 
X_NodeFlags_DIRTY_CLASSNAME | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER | X_NodeFlags_IE8_OPACITY_FIX, X_Node_BitMask_RESET_DIRTY = 2147483647 ^ X_Node_BitMask_IS_DIRTY, X_Node_BitMask_RESET_GPU = 2147483647 ^ (X_NodeFlags_GPU_RESERVED | X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED), X_Node_BitMask_IE4_IS_MIX = X_NodeFlags_IE4_HAS_TEXTNODE | X_NodeFlags_IE4_HAS_ELEMENT;
X.Doc.SVG = !!X_NodeFlags_IS_SVG;
var X_Dom_Event_devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || 1, X_Dom_Event_convertMSPointerType = !window.PointerEvent && window.MSPointerEvent && [0, 0, "touch", "pen", "mouse"], X_Dom_Event_coordinateSystemForElementFromPoint = 5 > (X_UA.SafariMobile || X_UA.iOSWebView) ? "page" : "client", X_Dom_Event_CANCEL_MOUSE = {}, X_DomEvent;
X_DomEvent = !X_UA.Trident && !X_UA.TridentMobile || 9 <= (X_UA.Trident || X_UA.TridentMobile) ? function(a, b) {
  var c = a.type, d = X_Type_isNumber, e, g, f;
  this._e = a;
  this.type = e = X_Event_RenameTo[c] || c;
  switch(e) {
    case "message":
      this.data = a.data;
      this.origin = a.origin;
      this.source = a.source;
      break;
    case "progress":
      this.lengthComputable = a.lengthComputable;
      this.loaded = a.loaded;
      this.total = a.total;
      break;
    case "dragstart":
    case "dragenter":
    case "dragover":
    case "dragleave":
    case "drop":
    case "dragend":
      this.dataTransfer = a.dataTransfer;
  }
  if (a.pointerType || X_Dom_Event_convertMSPointerType && "click" === e && (a.pointerType = "mouse")) {
    X_Dom_Event_convertMSPointerType ? (this.pointerType = X_Dom_Event_convertMSPointerType[a.pointerType], this.pressure = d(a.pressure) ? a.pressure : -1 !== a.button ? 0.5 : 0, this.width = a.width / X_Dom_Event_devicePixelRatio, this.height = a.height / X_Dom_Event_devicePixelRatio) : (this.pointerType = a.pointerType, this.pressure = a.pressure, this.width = a.width, this.height = a.height);
    switch(this.pointerType) {
      case "pen":
        this.tiltX = a.tiltX, this.tiltY = a.tiltY, "MSPointerHover" === c && (this.type = "pointermove");
      case "touch":
        this.radiusX = a.radiusX, this.radiusY = a.radiusY, this.rotationAngle = a.rotationAngle;
    }
    this.button = a.button;
    this.buttons = a.buttons;
    this.pointerId = a.pointerId;
    this.target = X_Node_getXNode(a.target);
    this.relatedTarget = X_Node_getXNode(a.relatedTarget);
    this.isPrimary = a.isPrimary;
    this.hwTimestamp = a.hwTimestamp;
    this.timestamp = a.timestamp;
    this.altKey = a.altKey;
    this.ctrlKey = a.ctrlKey;
    this.metaKey = a.metaKey;
    this.shiftKey = a.shiftKey;
    this.clientX = a.clientX;
    this.clientY = a.clientY;
    this.pageX = a.pageX;
    this.pageY = a.pageY;
    this.offsetX = a.offsetX;
    this.offsetY = a.offsetY;
  } else {
    if (g = X_Event_toPointer[c]) {
      if (e = a.changedTouches) {
        X_Dom_Event_CANCEL_MOUSE[b._uid] = g;
        var k = [];
        var h = a.altKey;
        var l = a.ctrlKey;
        var p = a.metaKey;
        var w = a.shiftKey;
        var m = X_Timer_now();
        var v = "touchend" === c || "touchcancel" === c ? 0 : 0.5;
        for (f = e.length; f;) {
          var q = e[--f];
          var t = q.target;
          t = 3 === t.nodeType ? t.parentNode : t;
          c = X_Node_getXNode(t);
          t = 5 > (X_UA.SafariMobile || X_UA.iOSWebView) ? c.offset() : t.getBoundingClientRect();
          var y = q.relatedTarget;
          k[f] = {type:g, pointerType:"touch", target:c, currentTarget:b, relatedTarget:y && X_Node_getXNode(3 === y.nodeType ? y.parentNode : y), isPrimary:!0, hwTimestamp:m, timestamp:m, button:v ? 0 : -1, buttons:v ? 1 : 0, altKey:h, ctrlKey:l, metaKey:p, shiftKey:w, pointerId:q.identifier + 2, pageX:q.pageX, pageY:q.pageY, clientX:d(q.clientX) ? q.clientX : q.pageX - X_ViewPort_scrollX, clientY:d(q.clientY) ? q.clientY : q.pageY - X_ViewPort_scrollY, offsetX:d(q.offsetX) ? q.offsetX : q[X_Dom_Event_coordinateSystemForElementFromPoint + 
          "X"] - (t.x || t.left || 0), offsetY:d(q.offsetY) ? q.offsetY : q[X_Dom_Event_coordinateSystemForElementFromPoint + "Y"] - (t.y || t.top || 0), radiusX:q.radiusX || 0, radiusY:q.radiusY || 0, rotationAngle:q.rotationAngle || 0, pressure:q.force || q.webkitForce || v, width:q.width || 0, height:q.height || 0};
        }
        return 1 === k.length ? k[0] : k;
      }
      if (X_Dom_Event_CANCEL_MOUSE[b._uid] === g) {
        return delete X_Dom_Event_CANCEL_MOUSE[b._uid], [];
      }
      this.type = g;
      this.pointerType = "mouse";
      this.button = k = void 0 !== a.button ? a.button : void 0 !== a.which ? a.which - 1 : -1;
      this.buttons = void 0 !== a.buttons ? a.buttons : 0 === k ? 1 : 1 === k ? 2 : 2 === k ? 4 : 0;
      this.pressure = -1 !== k ? 0.5 : 0;
      g = a.target;
      this.target = X_Node_getXNode(3 === g.nodeType ? g.parentNode : g);
      this.isPrimary = !0;
      this.hwTimestamp = this.timestamp = X_Timer_now();
      this.altKey = a.altKey;
      this.ctrlKey = a.ctrlKey;
      this.metaKey = a.metaKey;
      this.shiftKey = a.shiftKey;
      this.pointerId = 1;
      this.clientX = a.clientX;
      this.clientY = a.clientY;
      this.pageX = a.pageX;
      this.pageY = a.pageY;
      this.offsetX = d(a.offsetX) ? a.offsetX : a.layerX;
      this.offsetY = d(a.offsetY) ? a.offsetY : a.layerY;
      if ("mousedown" === c && 2 === k && (X_UA.Presto || X_UA.PrestoMobile)) {
        return k = [X_Object_copy(this), X_Object_copy(this)], k[1].type = "contextmenu", k;
      }
    } else {
      this.keyCode = X_Type_isFinite(a.keyCode) ? a.keyCode : X_Type_isFinite(a.charCode) ? a.charCode : a.which;
      this.charCode = X_Type_isFinite(a.charCode) ? a.charCode || (a.key && 1 === a.key.length ? a.key.charCodeAt(0) : 0) : a.which;
      this.key = a.key || (32 <= this.charCode && 126 >= this.charCode ? String.fromCharCode(this.charCode) : "");
      this.altKey = a.altKey || !!(a.modifiers & 1);
      this.ctrlKey = a.ctrlKey || !!(a.modifiers & 2);
      this.shiftKey = a.shiftKey || !!(a.modifiers & 4);
      this.metaKey = a.metaKey || !!(a.modifiers & 8);
      this.button = k = void 0 !== a.button ? a.button : void 0 !== a.which ? a.which - 1 : -1;
      this.buttons = void 0 !== a.buttons ? a.buttons : 0 === k ? 1 : 1 === k ? 2 : 2 === k ? 4 : 0;
      if (g = a.target) {
        this.target = X_Node_getXNode(3 === g.nodeType ? g.parentNode : g);
      }
      if (g = a.relatedTarget) {
        this.relatedTarget = X_Node_getXNode(3 === g.nodeType ? g.parentNode : g);
      }
      "wheel" === e && (void 0 !== a.deltaY ? (this.deltaX = a.deltaX, this.deltaY = a.deltaY, this.deltaZ = a.deltaZ || 0) : void 0 !== a.wheelDeltaY ? (this.deltaX = a.wheelDeltaX / 120, this.deltaY = a.wheelDeltaY / 120, this.deltaZ = a.wheelDeltaZ / 120 || 0) : void 0 !== a.wheelDelta ? (this.deltaX = this.deltaZ = 0, this.deltaY = a.wheelDelta / -120) : void 0 !== a.detail ? (this.deltaX = this.deltaZ = 0, this.deltaY = "MozMousePixelScroll" === c ? a.detail / 45 : a.detail / 3) : this.deltaX = 
      this.deltaY = this.deltaZ = 0);
    }
  }
  this.currentTarget = b;
  this.eventPhase = a.eventPhase;
  this.detail = a.detail;
} : function(a, b, c) {
  var d = a.type;
  this.type = X_Event_RenameTo[d] || d;
  (this.target = X_Node_getXNode(a.srcElement)) && !this.target._tag && (this.target = this.target.parent);
  this.currentTarget = b;
  this.relatedTarget = X_Node_getXNode(a.fromElement || a.toElement);
  this.eventPhase = a.srcElement === c ? 2 : 3;
  this.charCode = this.keyCode = a.keyCode;
  this.key = 32 <= this.charCode && 126 >= this.charCode ? String.fromCharCode(this.charCode) : "";
  this.key = String.fromCharCode(a.keyCode);
  this.altKey = a.altKey;
  this.ctrlKey = a.ctrlKey;
  this.shiftKey = a.shiftKey;
  switch(this.type) {
    case "message":
      this.data = a.data;
      this.origin = a.origin;
      this.source = a.source;
      break;
    case "progress":
      this.loaded = a.loaded, this.total = a.total;
  }
  switch(d) {
    case "click":
    case "dblclick":
      b = 0;
      break;
    case "contextmenu":
      b = 2;
      break;
    default:
      b = a.button, b = b & 1 ? 0 : b & 4 ? 2 : b & 2 ? 1 : -1;
  }
  this.button = b;
  this.buttons = a.button;
  this.deltaX = 0;
  this.deltaY = a.wheelDelta / -120;
  if (d = X_Event_toPointer[d]) {
    this.type = d, this.pointerType = "mouse", this.clientX = a.clientX, this.clientY = a.clientY, this.pageX = a.clientX + X_ViewPort_rootElement.scrollLeft, this.pageY = a.clientY + X_ViewPort_rootElement.scrollTop, 5 <= (X_UA.Trident || X_UA.TridentMobile) && (this.offsetX = a.offsetX, this.offsetY = a.offsetY), this.pressure = -1 !== b ? 0.5 : 0, this.isPrimary = !0, this.hwTimestamp = this.timestamp = X_Timer_now(), this.pointerId = 1, this.tiltY = this.tiltX = this.height = this.width = this.rotationAngle = 
    this.radiusY = this.radiusX = 0;
  }
};
void 0 === document.onwheel && ((X_UA.Gecko || X_UA.Fennec) && window.MouseScrollEvent ? 0 <= X_Number_conpareVersion(X_UA.ENGINE_VERSION, "1.9.1") ? X_Event_Rename.wheel = "MozMousePixelScroll" : 0 <= X_Number_conpareVersion(X_UA.ENGINE_VERSION, "0.9.7") && (X_Event_Rename.wheel = "DOMMouseScroll") : X_Object_inObject("onmousewheel", document) && (X_Event_Rename.wheel = "mousewheel"));
if (X_UA.Presto || X_UA.PrestoMobile || X_UA.WebKit || X_UA.Chromium || X_UA.ChromiumMobile || X_UA.Samsung || X_UA.ChromeWebView || X_UA.KHTML || X_UA.AOSP || X_UA.EdgeHTML || X_UA.EdgeMobile) {
  X_Event_Rename.focusin = "DOMFocusIn", X_Event_Rename.focusout = "DOMFocusOut";
}
void 0 !== window.onwebkitanimationend && void 0 === window.onanimationend ? (X_Event_Rename.animationend = "webkitAnimationEnd", X_Event_Rename.animationstart = "webkitAnimationStart", X_Event_Rename.animationiteration = "webkitAnimationIteration") : void 0 !== window.onoanimationend && void 0 === window.onanimationend ? (X_Event_Rename.animationend = "oAnimationEnd", X_Event_Rename.animationstart = "oAnimationStart", X_Event_Rename.animationiteration = "oAnimationIteration") : X_elmHtml && void 0 !== 
X_elmHtml.style.msAnimation && void 0 === X_elmHtml.style.animation && (X_Event_Rename.animationend = "MSAnimationEnd", X_Event_Rename.animationstart = "MSAnimationStart", X_Event_Rename.animationiteration = "MSAnimationIteration");
void 0 !== window.onwebkittransitionend && void 0 === window.ontransitionend ? X_Event_Rename.transitionend = "webkitTransitionEnd" : void 0 !== window.onotransitionend && void 0 === window.ontransitionend ? X_Event_Rename.transitionend = 12 > (X_UA.Presto || X_UA.PrestoMobile) ? "oTransitionEnd" : "otransitionEnd" : void 0 !== window.onmoztransitionend && void 0 === window.ontransitionend && (X_Event_Rename.transitionend = "mozTransitionEnd");
navigator.pointerEnabled || (navigator.msPointerEnabled ? (X_Event_Rename.pointerdown = "MSPointerDown", X_Event_Rename.pointerup = "MSPointerUp", X_Event_Rename.pointermove = ["MSPointerMove", "MSPointerHover"], X_Event_Rename.pointercancel = "MSPointerCancel", X_Event_Rename.pointerout = "MSPointerOut", X_Event_Rename.pointerleave = "MSPointerLeave") : X_UA_HID.TOUCH ? (X_Event_Rename.pointerdown = ["touchstart", "mousedown"], X_Event_Rename.pointerup = ["touchend", "mouseup"], X_Event_Rename.pointermove = 
["touchmove", "mousemove"], X_Event_Rename.pointercancel = "touchcancel", X_Event_Rename.pointerleave = "touchleave") : (X_Event_Rename.pointerdown = "mousedown", X_Event_Rename.pointerup = "mouseup", X_Event_Rename.pointermove = "mousemove", X_Event_Rename.pointerleave = void 0 !== X_elmHtml.onmouseleave ? "mouseleave" : "mouseout", (X_UA.Presto || X_UA.PrestoMobile) && (X_Event_Rename.contextmenu = "mousedown")));
var X_Node_BoxModel = {CONTENT_BOX:1, PADDING_BOX:2, BORDER_BOX:3}, X_Node_BoxModel_defaultBoxModel, X_Node_BoxModel_boxSizingEnabled, X_Node_BoxModel_absoluteOffset;
X_ViewPort.listenOnce(X_EVENT_INIT, function() {
  var a = X_Node_systemNode;
  a.cssText("width:10px;padding:1px;border:2px solid #0;margin:4px;");
  X_Node_BoxModel_defaultBoxModel = 10 === a.width() ? X_Node_BoxModel.BORDER_BOX : X_Node_BoxModel.CONTENT_BOX;
  X_Node_BoxModel_defaultBoxModel === X_Node_BoxModel.CONTENT_BOX && (X_Node_BoxModel_boxSizingEnabled = 10 === a.cssText("width:10px;padding:1px;border:2px solid red;margin:4px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;").width());
  X_Node_CSS_Support.boxShadow && 10 !== a.cssText(X_Node_CSS_uncamelize(X_Node_CSS_VENDER_PREFIX.boxShadow) + ":10px 10px 0 0 #000;width:10px;").width() && (X_Node_CSS_Support.boxShadowLayoutBug = !0);
  X_Node_BoxModel_absoluteOffset = a.cssText("position:absolute;top:0;left:0;margin:1px;border:2px solid #000;padding:4px;").append("<div></div>").firstChild().cssText("position:absolute;top:8px;left:8px;margin:16px;border:32px solid #666;padding:64px;").y();
  a.cssText("").empty();
});
function X_Node_BoxModel_mesure(a, b, c) {
  var d = a._flags;
  if (!a._tag || 0 === (d & X_NodeFlags_IN_TREE) || d & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
    return 0;
  }
  X_Node_updateTimerID && X_Node_startUpdate();
  d = a._rawObject || X_Node__ie4getRawNode && X_Node__ie4getRawNode(a);
  return a._flags & X_NodeFlags_IS_SVG ? d ? d.getBoundingClientRect()[c] | 0 : 0 : d ? d[b] : 0;
}
function X_Node_width() {
  return X_Node_BoxModel_mesure(this, "offsetWidth", "width");
}
function X_Node_height() {
  return X_Node_BoxModel_mesure(this, "offsetHeight", "height");
}
function X_Node_clientWidth() {
  return X_Node_BoxModel_mesure(this, "clientWidth", "width");
}
function X_Node_clientHeight() {
  return X_Node_BoxModel_mesure(this, "clientHeight", "height");
}
function X_Node_scrollWidth() {
  return X_Node_BoxModel_mesure(this, "scrollWidth", "width");
}
function X_Node_scrollHeight() {
  return X_Node_BoxModel_mesure(this, "scrollHeight", "height");
}
function X_Node_scrollLeft() {
  return this._flags & X_NodeFlags_IS_SVG ? 0 : X_Node_BoxModel_mesure(this, "scrollLeft");
}
function X_Node_scrollTop() {
  return this._flags & X_NodeFlags_IS_SVG ? 0 : X_Node_BoxModel_mesure(this, "scrollTop");
}
function X_Node_x() {
  return X_Node_BoxModel_mesure(this, "offsetLeft", "left");
}
function X_Node_y() {
  return X_Node_BoxModel_mesure(this, "offsetTop", "top");
}
function X_Node_offset() {
  var a = this._flags, b = {x:0, y:0};
  if (0 === (a & X_NodeFlags_IN_TREE) || a & X_NodeFlags_STYLE_IS_DISPLAY_NONE || X_Node_body === this || X_Node_html === this) {
    return b;
  }
  X_Node_updateTimerID && X_Node_startUpdate();
  return (a = this._rawObject || X_Node__ie4getRawNode && X_Node__ie4getRawNode(this)) ? X_Node_getPosition(a) : b;
}
var X_Node_getPosition = 5 > (X_UA.Trident || X_UA.TridentMobile) || !X_elmHtml.getBoundingClientRect ? 10 > (X_UA.Presto || X_UA.PrestoMobile) ? function(a) {
  var b = 0, c = 0;
  do {
    b += a.offsetLeft, c += a.offsetTop;
  } while (a = a.offsetParent);
  return {x:b, y:c};
} : function(a) {
  var b = 0, c = 0, d = a, e = X_elmBody;
  do {
    b += d.offsetLeft || 0, c += d.offsetTop || 0;
  } while (d = d.offsetParent);
  d = a;
  do {
    b -= d.scrollLeft || 0, c -= d.scrollTop || 0, d = d.parentNode;
  } while (d != e);
  return {x:b, y:c};
} : "CSS1Compat" !== document.compatMode || X_UA.WebKit ? function(a) {
  a = a.getBoundingClientRect();
  return {x:a.left + window.pageXOffset, y:a.top + window.pageYOffset};
} : function(a) {
  a = a.getBoundingClientRect();
  var b = X_elmHtml;
  return {x:a.left + b.scrollLeft - b.clientLeft, y:a.top + b.scrollTop - b.clientTop};
};
var X_Node_Attr_noValue = {checked:1, compact:1, declare:1, defer:1, disabled:1, ismap:1, multiple:1, nohref:1, noresize:1, noshade:1, nowrap:1, readonly:1, selected:1}, X_Node_Attr_renameForDOM = {"class":"className", accesskey:"accessKey", "accept-charset":"acceptCharset", bgcolor:"bgColor", cellpadding:"cellPadding", cellspacing:"cellSpacing", "char":"ch", charoff:"chOff", codebase:"codeBase", codetype:"codeType", colspan:"colSpan", datetime:"dateTime", "for":"htmlFor", frameborder:"frameBorder", 
"http-equiv":"httpEquiv", ismap:"isMap", longdesc:"longDesc", maxlength:"maxLength", nohref:"noHref", readonly:"readOnly", rowspan:"rowSpan", tabindex:"tabIndex", usemap:"useMap", valuetype:"valueType", checked:"defaultChecked"}, X_Node_Attr_HAS_VALUE = {INPUT:!0, TEXTAREA:!0, SELECT:!0, BUTTON:!0, OBJECT:!0, PARAM:!0}, X_Node_Attr_STATIC_VALUE_TYPES = {button:!0, hidden:!0, submit:!0, reset:!0, radio:!0, checkbox:!0}, X_Node_Attr_toChrReferance = {value:!0, title:!0, alt:!0}, X_Node_Attr_renameForTag = 
{};
function X_Node_Attr_objToAttrText(a, b) {
  var c = a._attrs, d = X_Node_Attr_noValue, e = [""], g = X_EMPTY_OBJECT, f = 0, k;
  b ? delete a._newAttrs : a._flags &= ~X_NodeFlags_OLD_ATTRTEXT;
  if (!c) {
    return delete a._attrText, "";
  }
  for (k in c) {
    if (!g[k]) {
      if (b) {
        var h = !1;
        switch(a._tag + k) {
          case "PARAMvalue":
            h = "movie" !== c.name;
          case "INPUTsrc":
            h = h || "image" !== c.type;
          case "LINKhref":
            if (h = h || "stylesheet" !== c.rel, !h) {
              break;
            }
          case "IMGsrc":
          case "IFRAMEsrc":
          case "FRAMEsrc":
          case "SCRIPTsrc":
          case "EMBEDsrc":
          case "OBJECTdata":
          case "BGSOUNDsrc":
          case "APPLETcode":
            a._newAttrs || (a._newAttrs = {});
            a._newAttrs[k] = c[k];
            continue;
        }
      }
      e[++f] = d[k] ? k : [k, '="', X_Node_Attr_toChrReferance[k] ? X_String_toChrReferanceForHtmlSafety(c[k]) : c[k], '"'].join("");
    }
  }
  if (0 < f) {
    return a._attrText = e.join(" ");
  }
  delete a._attrText;
  return "";
}
(function(a, b) {
  for (var c in a) {
    b[a[c]] = c;
  }
})(X_Node_Attr_renameForDOM, X_Node_Attr_renameForTag);
function X_Node_attr(a) {
  var b = this._attrs, c = this._tag, d, e, g;
  if (a && X_Type_isObject(a)) {
    if (!c) {
      return this;
    }
    b || (b = this._attrs = {});
    c = this._newAttrs || (this._newAttrs = {});
    for (e in a) {
      !0 === X_Node_Attr_setAttr(this, b, c, e, a[e]) && (d = !0);
    }
    d && (delete this._attrText, this._flags = this._flags | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT, this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate());
    return this;
  }
  if (1 < arguments.length) {
    if (!c) {
      return this;
    }
    !0 === X_Node_Attr_setAttr(this, b || (this._attrs = {}), this._newAttrs || (this._newAttrs = {}), a, arguments[1]) && (delete this._attrText, this._flags = this._flags | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT, this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate());
    return this;
  }
  if (X_Type_isString(a) && c) {
    switch(a) {
      case "id":
        return this._id;
      case "class":
      case "className":
        return this._className;
      case "tag":
      case "tagName":
        return c;
      case "style":
      case "cssText":
        return this.cssText();
      case "src":
        if ("IFRAME" !== c) {
          break;
        }
        if (this._newAttrs && X_Object_inObject(a, this._newAttrs)) {
          return this._newAttrs[a];
        }
        if (g = X_UA_DOM.IE4 ? this._rawObject || X_Node__ie4getRawNode(this) : this._rawObject) {
          return b || (b = this._attrs = {}), b[a] = g[a];
        }
        break;
      case "selected":
        X_UA.WebKit && (g = this._rawObject) && (g.parentNode && g.selectedIndex);
      case "value":
        if ("INPUT" === c && X_Node_Attr_STATIC_VALUE_TYPES[b.type]) {
          break;
        }
      case "checked":
      case "disabled":
      case "selectedIndex":
        if (X_Node_Attr_HAS_VALUE[c]) {
          if (this._newAttrs && X_Object_inObject(a, this._newAttrs)) {
            return this._newAttrs[a];
          }
          if (g = X_UA_DOM.IE4 ? this._rawObject || X_Node__ie4getRawNode(this) : this._rawObject) {
            return b || (b = this._attrs = {}), "TEXTAREA" === c && "value" === a && 9 > (X_UA.Trident || X_UA.TridentMobile) ? b[a] = X_Node_Attr_getValueForIE(g) : b[a] = g[a];
          }
        }
    }
    return b && b[X_Node_Attr_renameForTag[a] || a];
  }
}
function X_Node_Attr_getValueForIE(a) {
  return a.value.split("\r").join("");
}
function X_Node_Attr_setAttr(a, b, c, d, e) {
  switch(d) {
    case "ns":
    case "NS":
      if ("svg" === e || "SVG" === e) {
        a._flags |= X_NodeFlags_IS_SVG;
      }
      if ("vml" === e || "VML" === e) {
        a._flags |= X_NodeFlags_IS_VML;
      }
      return;
    case "UID":
    case "tag":
    case "tagName":
      return;
    case "id":
      e = e !== "ie4uid" + a._uid ? e : void 0;
      e !== a._id && (a._id = e, a._flags |= X_NodeFlags_DIRTY_ID, a._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate());
      return;
    case "class":
    case "className":
      return a.className(e);
    case "style":
    case "cssText":
      return a.cssText(e);
    case "text":
      return a.text(e);
    case "html":
      return a.html(e);
  }
  if (X_IS_DEV && !X_TEMP.X_Dom_useBuilder && 0 === d.indexOf("on")) {
    X_error("X.Node.attr : xnode.attr(" + d + ") is wrong, Use xnode.listen() & xnode.unlisten().");
  } else {
    if (d = X_Node_Attr_renameForTag[d] || d, b[d] !== e) {
      return null == e ? (c[d] = void 0, X_Object_inObject(d, b) && delete b[d]) : c[d] = b[d] = e, !0;
    }
  }
}
;function X_Node_CSS_camelize(a) {
  var b;
  if (b = X_Node_CSS__DICTIONARY_CAMELIZE[a]) {
    return b;
  }
  var c = a.split(" ").join("").split("-");
  var d = c[0];
  var e = c.length;
  if (1 === e) {
    return d;
  }
  b = "-" === a.charAt(0) ? d.charAt(0).toUpperCase() + d.substring(1) : d;
  for (d = 1; d < e; ++d) {
    b += c[d].charAt(0).toUpperCase() + c[d].substring(1);
  }
  return X_Node_CSS__DICTIONARY_CAMELIZE[a] = b;
}
function X_Node_CSS_uncamelize(a) {
  var b = X_Node_CSS_CHAR_CODE_A, c = b + 25, d, e;
  a = a.split(" ").join("");
  if (d = X_Node_CSS__DICTIONARY_UNCAMELIZE[a]) {
    return d;
  }
  d = "";
  var g = 0;
  for (e = a.length; g < e; ++g) {
    var f = a.charAt(g);
    var k = f.charCodeAt(0);
    d += b <= k && k <= c ? "-" + f : f;
  }
  return X_Node_CSS__DICTIONARY_UNCAMELIZE[a] = d.toLowerCase();
}
var X_Node_CSS_getComputedStyle = window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle, X_Node_CSS__DICTIONARY_CAMELIZE = {}, X_Node_CSS_CHAR_CODE_A = 65, X_Node_CSS__DICTIONARY_UNCAMELIZE = {}, X_Node_CSS_VENDER_PREFIX = {}, X_Node_CSS__CLIP_SEPARATOR = 8 > (X_UA.Trident || X_UA.TridentMobile) ? " " : ",", X_Node_CSS__UNIT_RATIO = {}, X_Node_CSS__FONT_SIZE_RATIO = {}, X_Node_CSS_COLOR = {BLACK:0, RED:16711680, LIME:65280, BLUE:255, YELLOW:16776960, AQUA:65535, 
CYAN:65535, MAGENTA:16711935, FUCHSIA:16711935, WHITE:16777215, GREEN:32768, PURPLE:8388736, MAROON:8388608, NAVY:128, OLIVE:8421376, TEAL:32896, GRAY:8421504, SILVER:12632256, DIMGRAY:6908265, SLATEGRAY:7372944, DARKGRAY:11119017, GAINSBORO:14474460, MIDNIGHTBLUE:1644912, SLATEBLUE:6970061, MEDIUMBLUE:205, ROYALBLUE:4286945, DODGERBLUE:2003199, SKYBLUE:8900331, STEELBLUE:4620980, LIGHTBLUE:11393254, PALETURQUOISE:11529966, TURQUOISE:4251856, LIGHTCYAN:14745599, AQUAMARINE:8388564, DARKGREEN:25600, 
SEAGREEN:3050327, LIGHTGREEN:9498256, CHARTREUSE:8388352, GREENYELLOW:11403055, LIMEGREEN:3329330, YELLOWGREEN:10145074, OLIVEDRAB:7048739, DARKKHAKI:12367723, PALEGOLDENROD:15657130, LIGHTYELLOW:16777184, GOLD:16766720, GOLDENROD:14329120, DARKGOLDENROD:12092939, ROSYBROWN:12357519, INDIANRED:13458524, SADDLEBROWN:9127187, SIENNA:10506797, PERU:13468991, BURLYWOOD:14596231, BEIGE:16119260, WHEAT:16113331, SANDYBROWN:16032864, TAN:13808780, CHOCOLATE:13789470, FIREBRICK:11674146, BROWN:10824234, 
SALMON:16416882, ORANGE:16753920, CORAL:16744272, TOMATO:16737095, HOTPINK:16738740, PINK:16761035, DEEPPINK:16716947, PALEVIOLETRED:14381203, VIOLET:15631086, PLUM:14524637, ORCHILD:14315734, DARKVIOLET:9699539, BLUEVIOLET:9055202, MEDIUMPURPLE:9662683, THISTLE:14204888, LAVENDER:15132410, MISTYROSE:16770273, IVORY:16777200, LEMONCHIFFON:16775885};
function X_Node_CSS_parseColor(a) {
  var b;
  if (X_Type_isNumber(a)) {
    return 0 <= a && 16777215 >= a ? a : NaN;
  }
  if (X_Type_isString(a)) {
    if (X_Type_isNumber(b = X_Node_CSS_COLOR[a.toUpperCase()]) && 0 <= b && 16777215 >= b) {
      return b;
    }
    if ("#" === a.charAt(0)) {
      switch(a.length) {
        case 7:
          var c = parseInt(a.substr(1, 2), 16);
          var d = parseInt(a.substr(3, 2), 16);
          b = parseInt(a.substr(5, 2), 16);
          break;
        case 4:
          c = parseInt(a.charAt(1) + a.charAt(1), 16);
          d = parseInt(a.charAt(2) + a.charAt(2), 16);
          b = parseInt(a.charAt(3) + a.charAt(3), 16);
          break;
        case 2:
          c = d = b = parseInt(a.charAt(1) + a.charAt(1), 16);
          break;
        default:
          return;
      }
    } else {
      if (0 === a.indexOf("rgb(")) {
        b = a.substr(4).split(","), c = parseFloat(b[0]), d = parseFloat(b[1]), b = parseFloat(b[2]), -1 !== a.indexOf("%") && (c *= 2.55, d *= 2.55, b *= 2.55);
      } else {
        if (0 === a.indexOf("rgba(")) {
          b = a.substr(5).split(","), c = parseFloat(b[0]), d = parseFloat(b[1]), b = parseFloat(b[2]), -1 !== a.indexOf("%") && (c *= 2.55, d *= 2.55, b *= 2.55);
        } else {
          return NaN;
        }
      }
    }
    return X_Type_isFinite(c + b + d) ? (c << 16) + (d << 8) + b : NaN;
  }
}
function X_Node_CSS_objToCssText(a, b) {
  var c = a._css, d = [], e = -1, g, f;
  a._flags &= ~X_NodeFlags_OLD_CSSTEXT;
  if (!c) {
    return delete a._cssText, "";
  }
  for (h in c) {
    var k = c[h];
    var h = X_Node_CSS_uncamelize(X_Node_CSS_VENDER_PREFIX[h] || h);
    (g = X_Node_CSS_SPECIAL_FIX_PROP[h]) ? d[++e] = h + ":" + g(k) : X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[h] ? (f || (f = {}))[h] = k : d[++e] = h + ":" + k;
  }
  f ? (k = X_Node_CSS_objToIEFilterText(a, f, d), e = d.length, k && (d[++e] = "filter:" + k), b = b && k) : b = !1;
  if (0 <= e) {
    return a._cssText = d.join(";"), b ? (--d.length, d.join(";")) : a._cssText;
  }
  delete a._cssText;
  return "";
}
var X_Node_CSS_FILTER_FIX_PROPS = X_UA_ActiveX && 9 > (X_UA.Trident || X_UA.TridentMobile) ? {opacity:2, boxShadow:3, textShadow:4, transform:5, dxtransform:7} : X_UA_ActiveX && 9 <= (X_UA.Trident || X_UA.TridentMobile) && 10 > (X_UA.Trident || X_UA.TridentMobile) ? {textShadow:4} : null;
function X_Node_CSS_objToIEFilterText(a, b, c) {
  b = b || a._css;
  var d = X_Node_CSS_FILTER_FIX_PROPS, e = [], g = -1, f, k, h, l, p, w;
  for (f in b) {
    if (k = d[f]) {
      var m = b[f];
      switch(k) {
        case 1:
          e[++g] = m;
          break;
        case 2:
          0 === m ? c && (c[c.length] = "visibility:hidden") : 1 > m && (e[++g] = "alpha(opacity=" + (100 * m | 0) + ")");
          break;
        case 3:
          var v = m.split(" ");
          k = [0, 0, 0, 0];
          var q = 0;
          for (l = v.length; q < l; ++q) {
            m = v[q];
            var t = 4 > q && parseFloat(m);
            if (t === t) {
              if (t = X_Node_CSS__splitValueAndUnit(m), m = t[0], t = t[1], m) {
                if (h = X_Node_CSS__UNIT_RATIO[t]) {
                  k[q] = m / h;
                } else {
                  switch(t) {
                    case "px":
                      k[q] = m;
                      break;
                    case "em":
                      X_Node_updateTimerID ? p = !0 : k[q] = X_Node_CSS_getCharSize(a) * m;
                    default:
                      k[q] = 0;
                  }
                }
              } else {
                k[q] = 0;
              }
            } else {
              if ("#" === m.charAt(0) || 0 === m.indexOf("rgb") || X_Node_CSS_COLOR[m.toUpperCase()]) {
                if (m = X_Node_CSS_parseColor(m), 0 <= m && 1048576 > m) {
                  var y = "00000" + m.toString(16);
                  y = "#" + y.substr(y.length - 6);
                } else {
                  m && (y = "#" + m.toString(16));
                }
              } else {
                "inset" === m && (w = !0);
              }
            }
          }
          if (w || !y) {
            break;
          }
          if (p) {
            X_ViewPort.listenOnce(X_EVENT_AFTER_UPDATE, a, X_Node_CSS_onAfterUpdateForIEFilterFix);
            break;
          }
          m = X_Node_CSS_ieMathRangeFix(180 * Math.atan2(k[1] + k[3], k[0] + k[3]) / Math.PI + 90);
          e[++g] = "shadow(color=" + y + ",strength=" + k[3] + ",direction=" + (m | 0) + ")";
          break;
        case 7:
          a._flags |= X_NodeFlags_IE_FILTER_FIX_AFTER;
      }
    }
  }
  return e.join(" ");
}
function X_Node_CSS_ieMathRangeFix(a) {
  a %= 360;
  return 0 > a ? 360 + a : a;
}
function X_Node_CSS_IETransform(a, b) {
  var c = Math.PI / 180, d = X_Node_CSS_ieMathRangeFix(b[2]) * c, e = Math.cos(d);
  d = Math.sin(d);
  var g = X_Node_CSS_ieMathRangeFix(b[3]), f = X_Node_CSS_ieMathRangeFix(b[4]);
  g = Math.tan(g * c);
  c = Math.tan(f * c);
  f = b[5];
  var k = b[6], h = a.offsetWidth, l = a.offsetHeight, p = Math.abs(e), w = Math.abs(d), m = (l - (h * w + l * p)) / 2 - l / 2 * c - ((l * k - l) / 2 | 0) + b[1];
  a.style[b[7]] = (h - (h * p + l * w)) / 2 - h / 2 * g - ((h * f - h) / 2 | 0) + b[0] + "px";
  a.style[b[8]] = m + "px";
  return "progid:DXImageTransform.Microsoft.Matrix(M11=" + e * f + ",M12=" + (-d + g) * f + ",M21=" + (d + c) * k + ",M22=" + e * k + ',FilterType="bilinear",sizingMethod="auto expand")';
}
function X_Node_CSS_onAfterUpdateIEFilterFix(a) {
  var b = X_Node_CSS_FILTER_FIX_PROPS, c = a._css;
  a = a._rawObject;
  var d = a.style.filter || "", e = d, g, f;
  for (g in c) {
    if (f = b[g]) {
      switch(f) {
        case 7:
          f = X_Node_CSS_IETransform(a, c[g]);
          break;
        default:
          continue;
      }
      f && (d += (d ? " " : "") + f);
    }
  }
  d !== e && (a.style.filter = d);
}
function X_Node_CSS_onAfterUpdateForIEFilterFix() {
  this._flags & X_NodeFlags_IN_TREE && (this._flags |= X_NodeFlags_DIRTY_IE_FILTER, X_Node_reserveUpdate());
}
var X_Node_CSS_UNIT = {px:0, em:1, cm:2, mm:3, "in":4, "%":5, pct:5, ms:6, s:7, "#":8, rgb:9, rgba:10};
function X_Node_CSS__splitValueAndUnit(a) {
  if (X_Type_isNumber(a)) {
    return [a || 0, ""];
  }
  var b = parseFloat(a);
  if (b !== b) {
    return [0, ""];
  }
  var c = "" + b;
  0 < b && 1 > b && "." === a.charAt(0) && (c = c.slice(1));
  -1 < b && 0 > b && "." === a.charAt(1) && (c = "-." + c.substr(2));
  a = a.substr(a.indexOf(c) + c.length);
  return [b, X_Node_CSS_UNIT[a] ? a : "px"];
}
function X_Node_css(a) {
  var b = arguments, c = this._css, d = !this._tag || X_Dom_DTD_MOVE_TO_HEAD[this._tag] || "SCRIPT" === this._tag, e;
  if (X_Type_isObject(a)) {
    if (d) {
      return this;
    }
    c || (c = this._css = {});
    var g = X_Node_CSS_camelize;
    var f = this._flags;
    for (e in a) {
      if (d = g(e), b = a[e], c[d] !== b) {
        var k = !0;
        f = X_Node_CSS_setStyle(c, f, d, b);
      }
    }
    if (!k) {
      return this;
    }
    this._flags = f |= X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
    f & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
    delete this._cssText;
    return this;
  }
  if (1 < b.length) {
    if (d) {
      return this;
    }
    c || (c = this._css = {});
    d = X_Node_CSS_camelize(a);
    b = b[1];
    if (c[d] === b) {
      return this;
    }
    this._flags = X_Node_CSS_setStyle(c, this._flags, d, b) | X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
    this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
    delete this._cssText;
    return this;
  }
  if (c && !d) {
    return c[X_Node_CSS_camelize(a)];
  }
}
function X_Node_CSS_setStyle(a, b, c, d) {
  X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[c] && (b |= X_NodeFlags_DIRTY_IE_FILTER);
  d || 0 === d ? a[c] = d : delete a[c];
  switch(c) {
    case "display":
      "none" === d ? b |= X_NodeFlags_STYLE_IS_DISPLAY_NONE : b &= ~X_NodeFlags_STYLE_IS_DISPLAY_NONE;
      break;
    case "visibility":
      if (b & X_NodeFlags_STYLE_IS_INVISIBLE && 0 == a.opacity) {
        break;
      }
      "hidden" === d ? b |= X_NodeFlags_STYLE_IS_INVISIBLE : b &= ~X_NodeFlags_STYLE_IS_INVISIBLE;
      break;
    case "opacity":
      b |= X_NodeFlags_IE8_OPACITY_FIX;
      if (b & X_NodeFlags_STYLE_IS_INVISIBLE && "hidden" === a.visibility) {
        break;
      }
      0 == d ? b |= X_NodeFlags_STYLE_IS_INVISIBLE : b &= ~X_NodeFlags_STYLE_IS_INVISIBLE;
      break;
    case "overflow":
      "hidden" === d ? b |= X_NodeFlags_STYLE_IS_NO_OVERFLOW : b &= ~X_NodeFlags_STYLE_IS_NO_OVERFLOW;
      break;
    case "position":
      "absolute" === d ? b |= X_NodeFlags_STYLE_IS_POS_ABSOLUTE : b &= ~X_NodeFlags_STYLE_IS_POS_ABSOLUTE;
      break;
    case "width":
      d = X_Node_CSS__splitValueAndUnit(d);
      "%" !== d[1] ? (b |= X_NodeFlags_STYLE_IS_WIDTH_LENGTH, b &= ~X_NodeFlags_STYLE_IS_WIDTH_PCT) : (b &= ~X_NodeFlags_STYLE_IS_WIDTH_LENGTH, b |= X_NodeFlags_STYLE_IS_WIDTH_PCT);
      break;
    case "height":
      d = X_Node_CSS__splitValueAndUnit(d), "%" !== d[1] ? (b |= X_NodeFlags_STYLE_IS_HEIGHT_LENGTH, b &= ~X_NodeFlags_STYLE_IS_HEIGHT_PCT) : (b &= ~X_NodeFlags_STYLE_IS_HEIGHT_LENGTH, b |= X_NodeFlags_STYLE_IS_HEIGHT_PCT);
  }
  return b;
}
function X_Node_cssText(a) {
  var b, c;
  if (a === this._cssText && 0 === (this._flags & X_NodeFlags_OLD_CSSTEXT)) {
    return this;
  }
  if ("" === a) {
    return delete this._css, delete this._cssText, this._flags = this._flags | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER, this._flags &= ~X_NodeFlags_OLD_CSSTEXT, this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate(), this;
  }
  if (X_Type_isString(a)) {
    delete this._css;
    var d = {};
    a = a.split(";");
    var e = 0;
    for (b = a.length; e < b; ++e) {
      var g = a[e].split(":");
      (c = g[0]) && (d[c] = g[1] || !0);
    }
    return this.css(d);
  }
  this._flags & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(this);
  return this._cssText;
}
var X_Node_CSS_getCharSize = X_Node_CSS_getComputedStyle ? function(a) {
  X_Node_updateTimerID && X_Node_startUpdate();
  return a === X_Node_body && X_ViewPort_baseFontSize ? X_ViewPort_baseFontSize : a._fontSize ? a._fontSize : a._fontSize = a._rawObject ? parseFloat(X_Node_CSS_getComputedStyle(a._rawObject, null).fontSize) : 0;
} : 5 <= (X_UA.Trident || X_UA.TridentMobile) ? function(a) {
  X_Node_updateTimerID && X_Node_startUpdate();
  if (a === X_Node_body && X_ViewPort_baseFontSize) {
    return X_ViewPort_baseFontSize;
  }
  if (a._fontSize) {
    return a._fontSize;
  }
  var b = a._rawObject.currentStyle.fontSize;
  var c = X_Node_CSS__splitValueAndUnit(b);
  var d = c[0];
  c = c[1];
  if (0 === d) {
    if (d = X_Node_CSS__FONT_SIZE_RATIO[b]) {
      return a._fontSize = d;
    }
  } else {
    if (b = X_Node_CSS__UNIT_RATIO[c]) {
      return a._fontSize = d / b;
    }
  }
  switch(c) {
    case "px":
      return a._fontSize = d;
    case "em":
      if (a.parent) {
        return a._fontSize = X_Node_CSS_getCharSize(a.parent) * d;
      }
      break;
    case "%":
      if (a.parent) {
        return a._fontSize = X_Node_CSS_getCharSize(a.parent) * d / 100;
      }
  }
  return 0;
} : X_UA_DOM.W3C ? function(a) {
  var b;
  X_Node_updateTimerID && X_Node_startUpdate();
  if (a === X_Node_body && X_ViewPort_baseFontSize) {
    return X_ViewPort_baseFontSize;
  }
  if (a._fontSize) {
    return a._fontSize;
  }
  a._rawObject.appendChild(b = document.createElement("span"));
  b.style.cssText = "display:block;position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;";
  b.innerHTML = "X";
  var c = b.offsetHeight;
  a._rawObject.removeChild(b);
  return a._fontSize = c;
} : X_UA_DOM.IE4 ? function(a) {
  var b;
  X_Node_updateTimerID && X_Node_startUpdate();
  if (a === X_Node_body && X_ViewPort_baseFontSize) {
    return X_ViewPort_baseFontSize;
  }
  if (a._fontSize) {
    return a._fontSize;
  }
  if (a._css && (b = a._css.fontSize)) {
    var c = X_Node_CSS__splitValueAndUnit(b);
    var d = c[0];
    c = c[1];
    if (0 === d) {
      if (b = X_Node_CSS__FONT_SIZE_RATIO[b]) {
        return a._fontSize = b;
      }
    } else {
      if (b = X_Node_CSS__UNIT_RATIO[c]) {
        return a._fontSize = d / b;
      }
    }
  } else {
    return (a._rawObject || X_Node__ie4getRawNode(a)).insertAdjacentHTML("BeforeEnd", '<div id="ie4charsize" style="position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;">X</div>'), b = document.all.ie4charsize, d = b.offsetHeight, b.removeAttribute("id"), b.outerHTML = "", a._fontSize = d;
  }
  switch(c) {
    case "px":
      return a._fontSize = d;
    case "em":
      if (a.parent) {
        return a._fontSize = X_Node_CSS_getCharSize(a.parent) * d;
      }
      break;
    case "%":
      if (a.parent) {
        return a._fontSize = X_Node_CSS_getCharSize(a.parent) * d / 100;
      }
  }
  return 0;
} : 0, X_Node_CSS_Support = {}, X_Node_CSS_SPECIAL_FIX_PROP = {transitionDuration:(X_UA.AOSP || 1 > X_UA.Samsung) && function(a) {
  return 0 === parseFloat(a) ? "0.001s" : a;
}};
X.CSS = {VENDER_PREFIX:X_Node_CSS_VENDER_PREFIX, Support:X_Node_CSS_Support};
(function() {
  var a = 5 > (X_UA.Trident || X_UA.TridentMobile) ? {} : document.createElement("div").style, b = a.cssText, c = "webkit Webkit Moz moz Ms ms O o khtml Khtml".split(" "), d = "opacity boxSizing boxShadow transform transformOrigin perspective transisiton transitionDelay transitionProperty transitionDuration transitionTimingFunction backfaceVisibility willChange filter userSelect touchSelect touchAction touchCallout contentZooming userDrag tapHighlightColor".split(" "), e, g, f;
  for (e = d.length; e;) {
    var k = g = d[--e];
    if (void 0 === a[g]) {
      for (g = g.charAt(0).toUpperCase() + g.substr(1), f = c.length; f;) {
        var h = c[--f];
        if (void 0 !== a[h + g]) {
          "ms" === h && (h = "Ms");
          "o" === h && (h = "O");
          X_Node_CSS_VENDER_PREFIX[k] = h + g;
          break;
        }
      }
    } else {
      X_Node_CSS_VENDER_PREFIX[k] = g;
    }
  }
  a.cssText = "background:rgba(0,0,0,0.5);border-color:transparent";
  X_Node_CSS_Support.rgba = !!a.background;
  X_Node_CSS_Support.transparent = !!a.borderColor;
  if (g = X_Node_CSS_VENDER_PREFIX.boxShadow) {
    a.cssText = X_Node_CSS_uncamelize(g) + ":0 0", X_Node_CSS_Support.boxShadow = !!a[g], a.cssText = X_Node_CSS_uncamelize(g) + ":0 0, 0 0", X_Node_CSS_Support.boxShadowMulti = !!a[g], a.cssText = X_Node_CSS_uncamelize(g) + ":0 0 inset", X_Node_CSS_Support.boxShadowInset = a[g] && -1 !== a[g].indexOf("inset");
  }
  a.cssText = b;
})();
X_ViewPort.listenOnce(X_EVENT_INIT, function() {
  var a = X_Node_systemNode, b = X_Node_CSS__UNIT_RATIO, c = ["cm", "mm", "in", "pt", "pc"], d;
  for (d = c.length; d;) {
    var e = c[--d];
    b[e] = a.css("width", 10 + e).width() / 10;
  }
  b = X_Node_CSS__FONT_SIZE_RATIO;
  c = "xx-large x-large large larger medium small smaller x-small xx-small".split(" ");
  a.css({lineHeight:"100%", height:"1em"}).text("X");
  for (d = c.length; d;) {
    e = c[--d], b[e] = a.css("fontSize", e).height();
  }
  a.cssText("").empty();
});
function X_NodeList(a) {
  for (var b = [], c = arguments.length, d = 0, e, g, f = 0, k; d < c; ++d) {
    b.push.apply(b, arguments[d]);
  }
  if (1 === (c = b.length)) {
    return new X_Node(b[0]);
  }
  if (!this || this.append !== X_NodeList.prototype.append) {
    return new X_NodeList(b);
  }
  for (d = 0; d < c; ++d) {
    e = b[d];
    k = !1;
    for (g = 0; g < f; ++g) {
      if (this[g] === e) {
        k = !0;
        break;
      }
    }
    k || (this[f] = e, f = ++this.length);
  }
}
X_NodeList.prototype.length = 0;
X_NodeList.prototype.each = function(a) {
  var b = this.length, c = 0, d;
  if (1 < arguments.length) {
    for (d = X_Array_copy(arguments); c < b && (d[0] = c, !1 !== a.apply(this[c], d)); ++c) {
    }
  } else {
    for (; c < b && !1 !== a.call(this[c], c); ++c) {
    }
  }
  return this;
};
X_TEMP.onSystemReady.push(function() {
  var a = X_NodeList.prototype, b = X_Node.prototype, c;
  for (c in b) {
    var d = b[c];
    X_Type_isFunction(d) && !a[c] && (a[c] = new Function(["var a=arguments,f=X.Node.prototype.", c, ",t=this,i,l=t.length;if(l)for(i=0;i<l;++i)if(i===l-1)return f.apply(t[i],a);else f.apply(t[i],a);return f.apply(t,a)"].join("")));
  }
});
var X_Node_Selector__PSEUDO = {"nth-child":9, "nth-last-child":14, "nth-of-type":11, "nth-last-of-type":16, root:4, link:4, lang:4, empty:5, target:6, invalid:7, enabled:7, checked:7, disabled:8, contains:8, "last-child":10, "only-child":10, "first-child":11, "last-of-type":12, "only-of-type":12, "first-of-type":13}, X_Node_Selector__COMBINATOR = {"":0, " ":1, ">":2, "+":3, "~":4, ",":5, "@":6}, X_Node_Selector__SELECTOR = {"":0, tag:1, "#":2, ".":3, ":":4, "[":5, not:6, scope:7, root:8, link:9}, 
X_Node_Selector__OPERATORS = {"==":1, "!=":2, "~=":3, "^=":4, "$=":5, "*=":6, "|=":7}, X_Node_Selector__ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789\\", X_Node_Selector__NUMBER = "+-0123456789";
function X_Node_Selector__parse(a, b) {
  var c = X_Node_Selector__COMBINATOR, d = X_Node_Selector__SELECTOR, e = X_Node_Selector__OPERATORS, g = X_Node_Selector__ALPHABET, f = X_Node_Selector__NUMBER, k = [], h = -1, l = a.length, p = 0, w = 0, m = 0, v, q, t, y, u, x, n, F, G, D;
  for (a += " "; h < l;) {
    var A = a.charAt(++h);
    var I = g.indexOf(A);
    I = (v = -1 !== I) && 52 > I;
    switch(p) {
      case 0:
        I ? (m = 1, p = 2, y = h) : !O && (q = c[A]) ? 1 < q && 1 < w ? p = 15 : (p = 5 === q ? 14 : 0) & ((1 < q || 1 > w) && (w = q)) & (5 === q && ++h) : (q = d[A]) ? (m = q) && (p = 5 === m ? 4 : 1) : "*" === A ? (m = 1, u = A) && (p = 14) && ++h : " " !== A && (p = 15);
        break;
      case 1:
        I ? (y = h) && (p = 2) : " " !== A && (p = 15);
        break;
      case 2:
        !v && (!U || 2 !== m && 3 !== m || ":" !== A && "." !== A) ? (u = a.substring(y, h)) && (p = 4 === m && "not" !== u && "(" === A ? "lang" !== u && "contains" !== u ? 8 : 11 : 14) : 4 > d[A] && (p = 14);
        break;
      case 4:
        I ? (p = 5, y = h) : " " !== A && (p = 15);
        break;
      case 5:
        "=" === A ? (F = 1, p = 6, x || (x = a.substring(y, h))) && (y = h + 1) : "]" === A ? (F = 0, p = 14, x || (x = a.substring(y, h))) && ++h : " " === A ? x || (x = a.substring(y, h)) : (F = e[a.substr(h, 2)]) ? (p = 6, x || (x = a.substring(y, h))) && (y = ++h) : !v && (p = 15);
        break;
      case 6:
        '"' !== A && "'" !== A || U || t ? " " !== A && (y = h) && (p = 7) : (t = A) && (y = h + 1) && (p = 7);
        break;
      case 7:
        A === t ? !U && !n && (n = a.substring(y, h)) : "]" === A ? (n || (n = a.substring(y, h))) && (p = 14) && ++h : " " === A && !t && !n && (n = a.substring(y, h));
        break;
      case 8:
        -1 !== f.indexOf(A) ? (y = h) && (p = 9) : "n" === A ? (p = 10, G = 1, y = h + 1) : "even" === a.substr(h, 4) ? (G = 2, D = 0, h += 3) : "odd" === a.substr(h, 3) ? (G = 2, D = 1, h += 2) : ")" === A && (p = G ? 14 : 15) && ++h;
        break;
      case 9:
        q = a.substring(y, h);
        "n" === A ? (p = 10, y = h + 1) && (G = "+" === q ? 1 : "-" === q ? -1 : parseFloat(q)) : ")" === A && (p = 14) && ++h && (D = parseFloat(q)) && (G = 0);
        break;
      case 10:
        ")" === A && (p = 14) && ++h && (D = parseFloat(a.substring(y, h)) || 0);
        break;
      case 11:
        !('"' !== A && "'" !== A || U || t) && (t = A) && (y = h + 1) && (p = 12);
        break;
      case 12:
        A === t && !U && (n = a.substring(y, h)) && (p = 13);
        break;
      case 13:
        ")" === A && (p = 14) && ++h;
    }
    if (15 === p) {
      return h;
    }
    if (14 === p) {
      if (4 === m) {
        if ("not" === u) {
          if (O) {
            return h;
          }
          var O = !0;
          p = m = 0;
          u = null;
        } else {
          if ("lang" === u || "contains" === u) {
            k = [O ? 0 : w, m, u, n];
          } else {
            if (G !== G || D !== D) {
              return h;
            }
            k = [O ? 0 : w, d[u] || m, u, G, D];
          }
          break;
        }
      } else {
        k = 5 === w ? 5 : 5 === m ? [O ? 0 : w, m, x, F, n] : [O ? 0 : w, m, u.split("\\").join("")];
        break;
      }
    }
    var U = "\\" === A && !U;
  }
  return O && -1 === (q = a.substr(h).indexOf(")")) ? h : O ? [h + q + 1, [w, 6, k]] : [h, k];
}
X.Doc.find = X_shortcutFunction = X_NodeList.prototype.find = X_Node_find;
function X_Node_find(a) {
  function b(a, c, d) {
    for (var e = d.length, f = 0, g, h, k; f < e; ++f) {
      if (h = d[f], h._tag) {
        g = c.indexOf(h);
        if (-1 !== g) {
          a[a.length] = h;
          if (2 === c.length) {
            return a[a.length] = c[0 === g ? 1 : 0], a;
          }
          c.splice(g, 1);
        }
        if ((k = h._xnodes) && b(a, c, k)) {
          return a;
        }
      }
    }
  }
  var c = X_Node_html, d = this.constructor === X_NodeList && this.length ? this : [this.constructor === X_Node || this.instanceOf && this.instanceOf(X_Node) ? this : X_Node_body], e = d, g = Array.prototype.push, f = [], k = X_Node_getRoot(d[0]);
  k = !!X_Node_isXmlDocument(k);
  var h = 1 < d.length, l = !0, p, w, m;
  if (!(X_ViewPort_readyState < X_EVENT_XDOM_READY)) {
    if (!X_Type_isString(a)) {
      return f;
    }
    for (p = []; a.length;) {
      if (!v) {
        var v = X_Node_Selector__parse(a);
        if (X_Type_isNumber(v)) {
          return [];
        }
        a = a.substr(v[0]);
        v = v[1];
        if (5 === v) {
          h = !0;
          e = d;
          p && p.length && g.apply(f, p);
          v = null;
          p = [];
          l = !0;
          continue;
        }
      }
      var q = v[0];
      var t = v[1];
      var y = v[2];
      var u = 1 === t ? k ? y : y.toUpperCase() : "*";
      var x = "*" === u;
      if (!l) {
        if (p.length) {
          0 !== q && (e = p, p = []);
        } else {
          v = null;
          continue;
        }
      }
      var n = 0;
      var F = e.length;
      var G = -1;
      h = h || 1 < F;
      switch(q) {
        case 2:
          for (; n < F; ++n) {
            if (q = e[n], (w = q._xnodes) && (m = w.length)) {
              for (l = 0; l < m; ++l) {
                q = w[l], q._tag && (x || u === q._tag) && (p[++G] = q);
              }
            }
          }
          break;
        case 3:
          for (; n < F; ++n) {
            if (q = e[n], l = q.getOrder() + 1, (q = q.parent) && (w = q._xnodes) && (m = w.length)) {
              for (; l < m; ++l) {
                if (q = w[l], q._tag) {
                  if (x || u === q._tag) {
                    p[++G] = q;
                  }
                  break;
                }
              }
            }
          }
          break;
        case 4:
          for (l = {}; n < F; ++n) {
            for (q = e[n].next(); q; q = q.next()) {
              if (q._tag && (x || u === q._tag)) {
                var D = q._uid;
                if (l[D]) {
                  break;
                } else {
                  l[D] = !0, p[++G] = q;
                }
              }
            }
          }
          break;
        default:
          if (1 === q || l && 7 > t) {
            if (l) {
              if ("HTML" === u) {
                p[0] = X_Node_html;
                break;
              }
              if ("HEAD" === u) {
                p[0] = X_Node_head;
                break;
              }
              if ("BODY" === u) {
                p[0] = X_Node_body;
                break;
              }
            }
            l = {};
            X_Node_Selector__fetchElements(p, e, x ? "" : u, l);
          }
      }
      l = !1;
      switch(t) {
        case 2:
          var A = ["id", 1, y];
          break;
        case 3:
          A = ["class", 3, y];
          break;
        case 4:
          if (!(A = X_Node_Selector__filter[y])) {
            return [];
          }
          break;
        case 5:
          A = [y, v[3], v[4]];
          break;
        case 6:
          var I = !0;
          v = v[2];
          y = v[2];
          switch(v[1]) {
            case 1:
              A = ["tag", 1, k ? y : y.toUpperCase()];
              break;
            case 2:
              A = ["id", 1, y];
              break;
            case 3:
              A = ["class", 3, y];
              break;
            case 4:
              if (!(A = X_Node_Selector__filter[y])) {
                return [];
              }
              break;
            case 5:
              A = [y, v[3], v[4]];
          }break;
        case 7:
          p = d;
          break;
        case 8:
          var O = !0;
          p = [c];
          break;
        case 9:
          if (G = document.links) {
            for (p = [], n = G.length; n;) {
              p[--n] = X_Node(G[n]);
            }
          }
      }
      if (A && p.length) {
        if (A.m) {
          p = A.m({not:I, xml:k}, p, v[3], v[4]);
        } else {
          if (X_Type_isFunction(A)) {
            for (v = [], n = 0, G = -1; q = p[n]; ++n) {
              !!A(q) ^ I && (v[++G] = q);
            }
          } else {
            if (v = [], x = A[0], t = A[1], A = A[2], x = X_Node_Attr_renameForTag[x] || x, k || "class" !== x || 3 !== t) {
              for ((y = !!A && !k && -1 === "title id name class for action archive background cite classid codebase data href longdesc profile src usemap".indexOf(x)) && (A = A.toLowerCase()), 3 === t && (A = " " + A + " "), n = 0, G = -1, F = p.length; n < F; ++n) {
                q = p[n];
                u = "tag" === x ? q._tag : "id" === x ? q._id : "class" === x ? q._className : q._attrs && q._attrs[x];
                if ((D = !!u) && t) {
                  switch(y && (u = u.toLowerCase()), t) {
                    case 1:
                      D = u === A;
                      break;
                    case 2:
                      D = u !== A;
                      break;
                    case 3:
                      D = -1 !== (" " + u + " ").indexOf(A);
                      break;
                    case 4:
                      D = 0 === u.indexOf(A);
                      break;
                    case 5:
                      D = u.lastIndexOf(A) + A.length === u.length;
                      break;
                    case 6:
                      D = -1 !== u.indexOf(A);
                      break;
                    case 7:
                      D = u === A || u.substring(0, A.length + 1) === A + "-";
                  }
                }
                !!D ^ I && (v[++G] = q);
              }
            } else {
              for (A = " " + A + " ", n = 0, G = -1; q = p[n]; ++n) {
                F = q._className, !!(F && -1 < (" " + F + " ").indexOf(A)) ^ I && (v[++G] = q);
              }
            }
          }
          p = v;
        }
      }
      A = null;
      I = !1;
      v = null;
    }
    if (h) {
      p && p.length && g.apply(f, p);
      F = f.length;
      if (2 > F) {
        return f[0] || X_Node_none;
      }
      p = [];
      l = {};
      n = 0;
      for (G = -1; n < F; ++n) {
        q = f[n], l[D = q._uid] || (l[D] = !0, p[++G] = q);
      }
      p = b([], p, O ? [c] : c._xnodes);
    }
    return 1 === p.length ? p[0] : new X_NodeList(p);
  }
}
function X_Node_Selector__fetchElements(a, b, c, d) {
  for (var e = b.length, g = 0, f, k, h, l; g < e; ++g) {
    f = b[g], k = f._uid, h = f._tag, !d[k] && h && (d[k] = !0, c && c !== h || (a[a.length] = f), (l = f._xnodes) && (1 < l.length || l[0] && l[0]._tag) && X_Node_Selector__fetchElements(a, l, c, d));
  }
}
function X_Node_Selector__funcSelectorChild(a, b, c, d) {
  var e = [];
  c = c.not;
  for (var g = 0, f = -1, k, h, l, p; k = d[g]; ++g) {
    l = b || k._tag;
    p = null;
    if (0 >= a) {
      for (h = k.prev(); h; h = h.prev()) {
        if (h._tag && (b || l === h._tag)) {
          p = !1;
          break;
        }
      }
    }
    if (null === p && 0 <= a) {
      for (h = k.next(); h; h = h.next()) {
        if (h._tag && (b || l === h._tag)) {
          p = !1;
          break;
        }
      }
    }
    null === p && (p = !0);
    p ^ c && (e[++f] = k);
  }
  return e;
}
function X_Node_Selector__funcSelectorNth(a, b, c, d, e, g, f) {
  var k = [], h = {};
  d = d.not;
  for (var l = 0, p = -1, w, m, v, q, t; v = e[l]; ++l) {
    w = v._uid;
    m = h[w];
    if (void 0 === m) {
      m = 0;
      q = v.parent[a]();
      for (t = c || v._tag; q; q = q[b]()) {
        q._tag && (c || t === q._tag) && (++m, h[q._uid] = 0 === g ? m === f : 0 === (m - f) % g && 0 <= (m - f) / g);
      }
      m = h[w];
    }
    m ^ d && (k[++p] = v);
  }
  return k;
}
function X_Node_Selector__funcSelectorProp(a, b, c, d) {
  var e = [];
  b = b ? c.not : !c.not;
  c = 0;
  for (var g = -1, f; f = d[c]; ++c) {
    f._attrs && f._attrs[a] ^ b && (e[++g] = f);
  }
  return e;
}
var X_Node_Selector__filter = {root:function() {
  return X_Node_html;
}, target:{m:function(a, b) {
  for (var c = [], d = location.hash.slice(1), e = a.not, g = 0, f = -1, k; k = b[g]; ++g) {
    (k._id || k._attrs && k._attrs.name) === d ^ e && (c[++f] = k);
  }
  return c;
}}, "first-child":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(-1, !0, a, b);
}}, "last-child":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(1, !0, a, b);
}}, "only-child":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(0, !0, a, b);
}}, "first-of-type":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(-1, !1, a, b);
}}, "last-of-type":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(1, !1, a, b);
}}, "only-of-type":{m:function(a, b) {
  return X_Node_Selector__funcSelectorChild(0, !1, a, b);
}}, "nth-child":{m:function(a, b, c, d) {
  return X_Node_Selector__funcSelectorNth("firstChild", "next", !0, a, b, c, d);
}}, "nth-last-child":{m:function(a, b, c, d) {
  return X_Node_Selector__funcSelectorNth("lastChild", "prev", !0, a, b, c, d);
}}, "nth-of-type":{m:function(a, b, c, d) {
  return X_Node_Selector__funcSelectorNth("firstChild", "next", !1, a, b, c, d);
}}, "nth-last-of-type":{m:function(a, b, c, d) {
  return X_Node_Selector__funcSelectorNth("lastChild", "prev", !1, a, b, c, d);
}}, empty:{m:function(a, b) {
  for (var c = [], d = a.not, e = 0, g = -1, f, k, h; f = b[e]; ++e) {
    k = !0;
    for (h = f.firstChild(); h; h = h.next()) {
      if (h._tag || h._text) {
        k = !1;
        break;
      }
    }
    k ^ d && (c[++g] = f);
  }
  return c;
}}, link:{m:function(a, b) {
  var c = document.links, d = [], e, g;
  if (!c) {
    return d;
  }
  var f = {};
  var k = a.not;
  for (e = 0; g = c[e]; ++e) {
    f[X_Node(g)._uid] = !0;
  }
  e = 0;
  for (g = -1; c = b[e]; ++e) {
    f[c._uid] ^ k && (d[++g] = c);
  }
  return d;
}}, lang:{m:function(a, b, c) {
  var d = [];
  a = a.not;
  var e = 0, g = -1, f, k, h;
  for (c = c.toLowerCase(); k = f = b[e]; ++e) {
    for (; k && !(h = k._attrs && k._attrs.lang);) {
      k = k.parent;
    }
    (!!h && 0 === h.toLowerCase().indexOf(c)) ^ a && (d[++g] = f);
  }
  return d;
}}, enabled:{m:function(a, b) {
  return X_Node_Selector__funcSelectorProp("disabled", !1, a, b);
}}, disabled:{m:function(a, b) {
  return X_Node_Selector__funcSelectorProp("disabled", !0, a, b);
}}, checked:{m:function(a, b) {
  return X_Node_Selector__funcSelectorProp("checked", !0, a, b);
}}, contains:{m:function(a, b, c) {
  var d = [];
  a = a.not;
  for (var e = 0, g = -1, f; f = b[e]; ++e) {
    -1 < f.text().indexOf(c) ^ a && (d[++g] = f);
  }
  return d;
}}};
var X_HTMLParser_CHARS = function() {
  var a = "abcdefghijklmnopqrstuvwxyz! \t\r\n\f\b", b = {}, c;
  for (c = 26; c;) {
    b[a.charAt(--c)] = 2;
  }
  c = 27;
  for (a = a.toUpperCase(); c;) {
    b[a.charAt(--c)] = 1;
  }
  for (c = 33; 27 < c;) {
    b[a.charAt(--c)] = 16;
  }
  return b;
}(), X_HTMLParser_block = {ADDRESS:!0, APPLET:!0, BLOCKQUOTE:!0, BUTTON:!0, CENTER:!0, DD:!0, DEL:!0, DIR:!0, DIV:!0, DL:!0, DT:!0, FIELDSET:!0, FORM:!0, FRAMESET:!0, HR:!0, IFRAME:!0, INS:!0, ISINDEX:!0, LI:!0, MAP:!0, MENU:!0, NOFRAMES:!0, NOSCRIPT:!0, OBJECT:!0, OL:!0, P:!0, PRE:!0, SCRIPT:!0, TABLE:!0, TBODY:!0, TD:!0, TFOOT:!0, TH:!0, THEAD:!0, TR:!0, UL:!0}, X_HTMLParser_inline = {ABBR:!0, ACRONYM:!0, APPLET:!0, B:!0, BASEFONT:!0, BDO:!0, BIG:!0, BR:!0, BUTTON:!0, CITE:!0, CODE:!0, DEL:!0, 
DFN:!0, EM:!0, FONT:!0, I:!0, IFRAME:!0, IMG:!0, INPUT:!0, INS:!0, KBD:!0, LABEL:!0, MAP:!0, OBJECT:!0, Q:!0, S:!0, SAMP:!0, SCRIPT:!0, SELECT:!0, SMALL:!0, SPAN:!0, STRIKE:!0, STRONG:!0, SUB:!0, SUP:!0, TEXTAREA:!0, TT:!0, U:!0, VAR:!0}, X_HTMLParser_closeSelf = {COLGROUP:!0, DD:!0, DT:!0, LI:!0, OPTIONS:!0, P:!0, TBODY:!0, TD:!0, TFOOT:!0, TH:!0, THEAD:!0, TR:!0}, X_HTMLParser_sisters = {TH:{TD:!0}, TD:{TH:!0}, DT:{DD:!0}, DD:{DT:!0}, COLGROUP:{CAPTION:!0}, THEAD:{CAPTION:!0, COLGROUP:!0}, TFOOT:{CAPTION:!0, 
COLGROUP:!0, THEAD:!0, TBODY:!0}, TBODY:{CAPTION:!0, COLGROUP:!0, THEAD:!0, TFOOT:!0}}, X_HTMLParser_special = {SCRIPT:!0, STYLE:!0, PLAINTEXT:!0, XMP:!0, TEXTAREA:!0}, X_HTMLParser_skipFixNesting = !1;
function X_HTMLParser_exec(a, b, c) {
  for (var d = X_HTMLParser_special, e = c && X_Timer_now(), g = c ? c[1] : [], f = a, k, h; a;) {
    k = !0;
    if ((h = g[g.length - 1]) && 1 === d[b.isXML ? h.toUpperCase() : h]) {
      0 <= (h = a.toUpperCase().indexOf("</" + (b.isXML ? h.toUpperCase() : h))) ? (b.chars(a.substring(0, h)), (h = X_HTMLParser__parseEndTag(g, b, a)) ? a = a.substring(h) : (b.chars(a), a = "")) : (b.chars(a), a = "");
    } else {
      if (0 === a.indexOf("\x3c!--")) {
        0 < (h = a.indexOf("--\x3e")) && (b.comment(a.substring(4, h)), a = a.substring(h + 3), k = !1);
      } else {
        if (0 === a.indexOf("</")) {
          2 < (h = X_HTMLParser__parseEndTag(g, b, a)) && (a = a.substring(h), k = !1);
        } else {
          if (0 === a.indexOf("<")) {
            if (h = X_HTMLParser__parseStartTag(g, h, b, a)) {
              a = a.substring(h), k = !1;
            } else {
              if (!1 === h) {
                return;
              }
              a = "&lt;" + a.substr(1);
            }
          }
        }
      }
      k && (h = a.indexOf("<"), k = 0 > h ? a : a.substring(0, h), a = 0 > h ? "" : a.substring(h), b.chars(k));
    }
    if (a === f) {
      b.err(a);
      return;
    }
    if (c && a && e + X_Timer_INTERVAL_TIME <= X_Timer_now()) {
      b.progress(1 - a.length / c[0]);
      X_Timer_once(0, X_HTMLParser_exec, [a, b, c]);
      return;
    }
    f = a;
  }
  X_HTMLParser_parseEndTag(g, b);
  c && b.asyncComplete();
}
function X_HTMLParser__parseStartTag(a, b, c, d) {
  for (var e = X_HTMLParser_CHARS, g = X_HTMLParser_CHARS, f = X_HTMLParser_saveAttr, k = X_Dom_DTD_ATTR_VAL_IS_URI, h = 0, l = d.length, p = 0, w = [], m, v = !1, q, t, y, u, x; p < l && 9 > h;) {
    q = d.charAt(p);
    switch(h) {
      case 0:
        "<" === q && ++h;
        break;
      case 1:
        e[q] & 3 && ++h && (t = p);
        break;
      case 2:
        g[q] & 16 ? ++h && (m = d.substring(t, p)) : (">" === q || (v = "/>" === d.substr(p, 2))) && (m = d.substring(t, p)) && (h = 9);
        break;
      case 3:
        e[q] & 3 ? ++h && (t = p) : (">" === q || (v = "/>" === d.substr(p, 2))) && (h = 9);
        break;
      case 4:
        "=" === q ? (h = 6, y = d.substring(t, p)) : g[q] & 16 ? (h = 5, y = d.substring(t, p)) : (">" === q || (v = "/>" === d.substr(p, 2))) && (h = 9, w[w.length] = d.substring(t, p));
        break;
      case 5:
        !(g[q] & 16) && e[q] & 3 ? (h = 3, w[w.length] = y) && (t = p) : "=" === q ? h = 6 : (">" === q || (v = "/>" === d.substr(p, 2))) && (h = 9, w[w.length] = y);
        break;
      case 6:
        '"' === q || "'" === q ? (h = 7, u = q) && (t = p + 1) : !(g[q] & 16) && (h = 8, t = p);
        break;
      case 7:
        !x && q === u && (h = 3) && f(w, y, d.substring(t, p));
        break;
      case 8:
        g[q] & 16 ? (h = 3, f(w, y, d.substring(t, p))) : ">" === q ? (h = 9, f(w, y, d.substring(t, p))) : !x && !k[y] && (v = "/>" === d.substr(p, 2)) && (h = 9, f(w, y, d.substring(t, p)));
    }
    x = "\\" === q && !x;
    ++p;
  }
  if (9 === h) {
    v && ++p;
    d = m.toUpperCase();
    if (!X_HTMLParser_skipFixNesting && X_HTMLParser_block[d]) {
      for (; b && X_HTMLParser_inline[c.isXML ? b.toUpperCase() : b];) {
        X_HTMLParser_parseEndTag(a, c, b), b = a[a.length - 1];
      }
    }
    b && X_HTMLParser_closeSelf[d] && (b === m || X_HTMLParser_sisters[d] && X_HTMLParser_sisters[d][c.isXML ? b.toUpperCase() : b]) && X_HTMLParser_parseEndTag(a, c, b);
    v = v || X_Dom_DTD_EMPTY[d];
    !v && (a[a.length] = c.isXML ? m : d);
    return !1 === c.tagStart(c.isXML ? m : d, w, v, p) ? !1 : p;
  }
  return 0;
}
function X_HTMLParser__parseEndTag(a, b, c) {
  for (var d = X_HTMLParser_CHARS, e = X_HTMLParser_CHARS, g = 0, f = c.length, k = 0, h, l, p; k < f && 9 > g;) {
    l = c.charAt(k);
    switch(g) {
      case 0:
        "</" === c.substr(k, 2) && ++g && ++k;
        break;
      case 1:
        d[l] & 3 && ++g && (p = k);
        break;
      case 2:
        e[l] & 16 && ++g;
        ">" === l && (g = 9);
        2 !== g && (h = c.substring(p, k));
        break;
      case 3:
        ">" === l && (g = 9);
    }
    ++k;
  }
  return 9 === g ? (X_HTMLParser_parseEndTag(a, b, b.isXML ? h : h.toUpperCase()), k) : 0;
}
function X_HTMLParser_saveAttr(a, b, c) {
  b = b.toLowerCase();
  c = 1 === X_Node_Attr_noValue[b] ? b : c;
  a[a.length] = {attName:b, escaped:-1 !== c.indexOf('"') ? c.split('"').join('\\"').split('\\\\"').join('\\"') : c};
}
function X_HTMLParser_parseEndTag(a, b, c) {
  var d = 0, e = a.length;
  if (c) {
    for (d = e; 0 <= d && a[--d] !== c;) {
    }
  }
  if (0 <= d) {
    for (; d < e;) {
      b.tagEnd(a[--e]);
    }
    a.length = d;
  }
}
var X_HTMLParser_htmlStringToXNode = {flat:null, nest:[], isXML:!1, err:function(a) {
  X_HTMLParser_htmlStringToXNode.flat.length = 0;
  X_IS_DEV && !X_HTMLParser_htmlStringToXNode.ignoreError && X_error("X.Node#X_HTMLParser() : parse error! html=" + a);
}, tagStart:function(a, b, c, d) {
  d = X_HTMLParser_htmlStringToXNode.nest;
  var e = X_HTMLParser_htmlStringToXNode.flat, g = d.length;
  a = g ? d[g - 1].create(a) : e[e.length] = X_Doc_create(a);
  c || (d[g] = a);
  if (g = b.length) {
    for (e = {}; g;) {
      if (c = b[--g]) {
        X_Type_isString(c) ? (d = c, e[d] = !0) : (d = c.attName, e[d] = c.escaped);
      }
    }
    a.attr(e);
  }
}, tagEnd:function() {
  0 < X_HTMLParser_htmlStringToXNode.nest.length && --X_HTMLParser_htmlStringToXNode.nest.length;
}, chars:function(a) {
  X_HTMLParser_htmlStringToXNode.nest.length ? X_HTMLParser_htmlStringToXNode.nest[X_HTMLParser_htmlStringToXNode.nest.length - 1].createText(a) : X_HTMLParser_htmlStringToXNode.flat[X_HTMLParser_htmlStringToXNode.flat.length] = X_Doc_createText(a);
}, comment:X_emptyFunction};
function X_HtmlParser_parse(a, b) {
  var c = X_HTMLParser_htmlStringToXNode;
  c.flat = [];
  c.nest.length = 0;
  c.ignoreError = b;
  X_HTMLParser_exec(a, c);
  var d = c.flat;
  delete c.flat;
  return d;
}
var X_HTMLParser_asyncHtmlStringToXNode = {isXML:!1, err:function(a) {
  X_HTMLParser_htmlStringToXNode.err(a);
  this.asyncDispatch(X_EVENT_ERROR);
}, tagStart:X_HTMLParser_htmlStringToXNode.tagStart, tagEnd:X_HTMLParser_htmlStringToXNode.tagEnd, chars:X_HTMLParser_htmlStringToXNode.chars, comment:X_emptyFunction, progress:function(a) {
  this.asyncDispatch({type:X_EVENT_PROGRESS, percent:a});
}, asyncComplete:function() {
  var a = X_HTMLParser_htmlStringToXNode.flat;
  delete X_HTMLParser_htmlStringToXNode.flat;
  this.asyncDispatch({type:X_EVENT_SUCCESS, xnodes:a});
}};
function X_HTMLParser_asyncParse(a, b) {
  var c = X_Class_override(X_EventDispatcher(), X_HTMLParser_asyncHtmlStringToXNode), d = X_HTMLParser_htmlStringToXNode;
  c.listenOnce(X_EVENT_SUCCESS, c, c.kill);
  d.flat = [];
  d.nest.length = 0;
  d.ignoreError = b;
  X_HTMLParser_exec(a, c, [a.length, []]);
  return c;
}
;var X_NodeAnime_QUEUE = [], X_NodeAnime_uid = 0, X_NodeAnime_reserved = !1, X_NodeAnime_updateTimerID = 0, X_NodeAnime_needsDetection = !1, X_NodeAnime_hasTransform = !!X_Node_CSS_VENDER_PREFIX.transform, X_NodeAnime_hasDXTransform = 5.5 <= (X_UA.Trident || X_UA.TridentMobile) && 9 > (X_UA.Trident || X_UA.TridentMobile) && 11 !== X_UA.IEHost, X_NodeAnime_translateZ = !X_Node_CSS_VENDER_PREFIX.perspective || X_UA.PrestoMobile && X_UA.Android || (X_UA.Trident || X_UA.TridentMobile) && 6.1 <= (X_UA.Win32 || 
X_UA.Win64) && 7 > (X_UA.Win32 || X_UA.Win64) ? "" : " translateZ(0)", X_NODE_ANIME_RESET = 1, X_NODE_ANIME_STAY_GPU = 2, X_NodeAnime_DEFAULT = {x:NaN, y:NaN, toX:NaN, toY:NaN, fromX:NaN, fromY:NaN, rotate:NaN, fromRotate:NaN, toRotate:NaN, skewX:NaN, fromSkewX:NaN, toSkewX:NaN, skewY:NaN, fromSkewY:NaN, toSkewY:NaN, scaleX:1, fromScaleX:1, toScaleX:1, scaleY:1, fromScaleY:1, toScaleY:1, alpha:NaN, scrollX:NaN, fromScrollX:NaN, toScrollX:NaN, scrollY:NaN, fromScrollY:NaN, toScrollY:NaN};
function X_Node_animate(a) {
  var b = X_NodeAnime_QUEUE, c = a.from || {}, d = a.to || {}, e = a.duration, g = a.lazyRelease, f = a.easing, k = a.fallback;
  a = this._anime;
  if (!(this._flags & X_NodeFlags_IN_TREE)) {
    return this;
  }
  if (!a) {
    this._anime = a = X_Object_copy(X_NodeAnime_DEFAULT);
    var h = this._css && parseFloat(this._css.opacity);
    0 <= h && (a.alpha = h);
  }
  a.fromX = a.x = X_NodeAnime_getFinite(c.x, a.x);
  a.fromY = a.y = X_NodeAnime_getFinite(c.y, a.y);
  a.fromRotate = a.rotate = X_NodeAnime_getFinite(c.rotate, a.rotate);
  a.fromSkewX = a.skewX = X_NodeAnime_getFinite(c.skewX, c.skew, a.skewX);
  a.fromSkewY = a.skewY = X_NodeAnime_getFinite(c.skewY, c.skew, a.skewY);
  a.fromScaleX = a.scaleX = X_NodeAnime_getFinite(c.scaleX, c.scale, a.scaleX);
  a.fromScaleY = a.scaleY = X_NodeAnime_getFinite(c.scaleY, c.scale, a.scaleY);
  a.fromAlpha = a.alpha = X_NodeAnime_getFinite(c.opacity, a.alpha);
  a.fromScrollX = a.scrollX = X_NodeAnime_getFinite(c.scrollX, a.scrollX);
  a.fromScrollY = a.scrollY = X_NodeAnime_getFinite(c.scrollY, a.scrollY);
  a.toX = X_NodeAnime_getFinite(d.x, a.x);
  a.toY = X_NodeAnime_getFinite(d.y, a.y);
  a.toRotate = X_NodeAnime_getFinite(d.rotate, a.rotate);
  a.toSkewX = X_NodeAnime_getFinite(d.skewX, d.skew, a.skewX);
  a.toSkewY = X_NodeAnime_getFinite(d.skewY, d.skew, a.skewY);
  a.toScaleX = X_NodeAnime_getFinite(d.scaleX, d.scale, a.scaleX);
  a.toScaleY = X_NodeAnime_getFinite(d.scaleY, d.scale, a.scaleY);
  a.toAlpha = X_NodeAnime_getFinite(d.opacity, a.alpha);
  a.toScrollX = X_NodeAnime_getFinite(d.scrollX, a.scrollX);
  a.toScrollY = X_NodeAnime_getFinite(d.scrollY, a.scrollY);
  X_Type_isFinite(a.toX) && X_Type_isNaN(a.x) && (a.x = a.fromX = 0);
  X_Type_isFinite(a.toY) && X_Type_isNaN(a.y) && (a.y = a.fromY = 0);
  a.toRotate && X_Type_isNaN(a.rotate) && (a.rotate = a.fromRotate = 0);
  a.toSkewX && X_Type_isNaN(a.skewX) && (a.skewX = a.fromSkewX = 0);
  a.toSkewY && X_Type_isNaN(a.skewY) && (a.skewY = a.fromSkewY = 0);
  a.duration = 0 <= e && X_Type_isFinite(e) ? e : 0;
  a.lazyRelease = 0 <= g && X_Type_isFinite(g) ? g : 0;
  a.easing = X_Type_isFunction(f) ? f : X_NodeAnime_ease[f] || X_NodeAnime_ease.circular;
  a.inited = !1;
  a.transform = (X_Type_isFinite(a.x) || X_Type_isFinite(a.y) || a.lazyRelease) && X_NodeAnime_hasTransform;
  a.doScroll = 0 <= a.toScrollX || 0 <= a.toScrollY;
  a.fallback = 0;
  a.altX = k & 8 ? "right" : "left";
  a.altY = k & 16 ? "bottom" : "top";
  if (1 !== a.toScaleX || 1 !== a.fromScaleX || 1 !== a.toScaleY || 1 !== a.fromScaleY) {
    c = a.fromScaleX === a.fromScaleY && a.toScaleX === a.toScaleY, X_NodeAnime_hasTransform ? a.transform = !0 : X_NodeAnime_hasDXTransform && k & 32 ? a.fallback = 32 : k & 4 && c ? a.fallback = 4 : k & 2 && c ? a.fallback = 2 : k & 1 && (a.fallback = 1);
  }
  if (X_Type_isFinite(a.rotate) || X_Type_isFinite(a.skewX) || X_Type_isFinite(a.skewY)) {
    X_NodeAnime_hasTransform ? a.transform = !0 : X_NodeAnime_hasDXTransform && k & 32 && (a.fallback = 32);
  }
  !a.duration && 6 <= a.phase ? this.stop() : (a.phase ? 4 > a.phase ? (b.splice(b.indexOf(this), 1), b[b.length] = this, a.uid = ++X_NodeAnime_uid, X_NodeAnime_needsDetection = !0) : a.duration ? a.phase = 6 : (5 !== a.phase ? (a.phase = 4, a.releaseNow = !1) : a.phase = 1, X_NodeAnime_needsDetection = !0) : (b[b.length] = this, a.phase = 1, a.uid = ++X_NodeAnime_uid, X_NodeAnime_needsDetection = !0), X_NodeAnime_reserved || (X_NodeAnime_reserved = !0, X_Node_updateTimerID ? (X_NodeAnime_updateTimerID && 
  (X_NodeAnime_updateTimerID = X_Timer_cancelFrame(X_NodeAnime_updateTimerID)), X_System.listen(X_EVENT_UPDATED, X_NodeAnime_updateAnimations)) : (X_System.unlisten(X_EVENT_UPDATED, X_NodeAnime_updateAnimations), X_NodeAnime_updateTimerID = X_Timer_requestFrame(X_NodeAnime_updateAnimations))));
  return this;
}
function X_NodeAnime_getFinite(a, b, c) {
  return a || 0 === a ? a : b || 0 === b ? b : c || 0 === c ? c : NaN;
}
function X_Node_stop(a) {
  var b = this._anime, c = X_NodeAnime_QUEUE;
  if (!b || !b.phase) {
    return this;
  }
  switch(b.phase) {
    case 6:
    case 2:
    case 3:
      X_NodeAnime_needsDetection = !0;
    case 1:
      var d = !0;
    case 4:
    case 7:
      a & X_NODE_ANIME_RESET && X_Object_override(b, X_NodeAnime_DEFAULT);
      if (d) {
        break;
      }
      b.toX = b.x;
      b.toY = b.y;
      b.toRotate = b.rotate;
      b.toSkewX = b.skewX;
      b.toSkewY = b.skewY;
      b.toScaleX = b.scaleX;
      b.toScaleY = b.scaleY;
      b.toAlpha = b.alpha;
      b.toScrollX = b.scrollX;
      b.toScrollY = b.scrollY;
      b.phase = 4;
      X_NodeAnime_needsDetection = !0;
    case 5:
      b.releaseNow = !(a & X_NODE_ANIME_STAY_GPU);
  }
  d && (c.splice(c.indexOf(this), 1), b.phase = 0);
  return this;
}
function X_NodeAnime_stopNow(a) {
  var b = a._anime, c = a._flags, d = X_NodeAnime_QUEUE;
  X_NodeAnime_needsDetection = !0;
  d.splice(d.indexOf(a), 1);
  b.phase = 0;
  c & ~X_Node_BitMask_RESET_GPU && (d = c & X_NodeFlags_GPU_RESERVED, c & X_NodeFlags_GPU_RELEASE_RESERVED || X_NodeAnime_updatePosition(a, b, 0.5, !1), d || (a._rawObject.style.cssText = X_Node_CSS_objToCssText(a)), a._flags &= X_Node_BitMask_RESET_GPU);
}
function X_NodeAnime_detectWaitAnimation(a, b, c) {
  for (var d = X_NodeAnime_QUEUE, e = 0, g, f; (g = d[e]) && g !== a; ++e) {
    if (3 >= g._anime.phase && (a.contains(g) || g.contains(a))) {
      return 2;
    }
  }
  for (e = 0; (g = d[e]) && g !== a; ++e) {
    if (f = g._anime, 6 <= f.phase && (a.contains(g) || g.contains(a))) {
      return c ? 3 : g;
    }
  }
  return b ? 6 : 4;
}
function X_NodeAnime_updateAnimations(a) {
  var b = X_NodeAnime_QUEUE, c = X_Timer_now(), d = !1, e, g;
  if (X_NodeAnime_needsDetection) {
    for (X_NodeAnime_needsDetection = !1, b.sort(X_NodeAnime_sortAnimationNode), e = 0; g = b[e]; ++e) {
      var f = g._anime;
      3 >= f.phase ? X_Type_isNumber(f.phase = g = X_NodeAnime_detectWaitAnimation(g, f.duration)) || (g._anime.follower = !0, f.phase = 3) : f.follower = !1;
    }
  }
  for (e = b.length; e;) {
    var k = !1;
    g = b[--e];
    f = g._anime;
    switch(f.phase) {
      case 7:
        if (c < f.toTime) {
          f.progress = d = (c - f.fromTime) / f.duration;
          var h = f.easing(d);
          f.x = (f.toX - f.fromX) * h + f.fromX;
          f.y = (f.toY - f.fromY) * h + f.fromY;
          f.rotate = (f.toRotate - f.fromRotate) * h + f.fromRotate;
          f.skewX = (f.toSkewX - f.fromSkewX) * h + f.fromSkewX;
          f.skewY = (f.toSkewY - f.fromSkewY) * h + f.fromSkewY;
          f.scaleX = (f.toScaleX - f.fromScaleX) * h + f.fromScaleX;
          f.scaleY = (f.toScaleY - f.fromScaleY) * h + f.fromScaleY;
          f.alpha = (f.toAlpha - f.fromAlpha) * h + f.fromAlpha;
          f.scrollX = (f.toScrollX - f.fromScrollX) * h + f.fromScrollX;
          f.scrollY = (f.toScrollY - f.fromScrollY) * h + f.fromScrollY;
          X_NodeAnime_updatePosition(g, f, d, !0);
          d = !0;
          break;
        }
        g.asyncDispatch(X_EVENT_ANIME_END);
      case 4:
        h = !f.follower && !f.releaseNow && f.lazyRelease;
        X_NodeAnime_updatePosition(g, f, 1, !!h);
        h ? (f.toTime = c + h, f.phase = 5, d = !0) : k = !0;
        break;
      case 6:
        f.fromTime = c;
        f.toTime = c + f.duration;
        f.phase = 7;
        f.progress = 0;
        g.asyncDispatch(X_EVENT_ANIME_START);
        d = !0;
        f.inited && !X_NodeAnime_translateZ || X_NodeAnime_updatePosition(g, f, 0, !0);
        break;
      case 5:
        f.toTime <= c || f.follower || f.releaseNow ? (X_NodeAnime_translateZ && X_NodeAnime_updatePosition(g, f, 1, !1), k = !0) : d = !0;
        break;
      default:
        f.inited || X_NodeAnime_updatePosition(g, f, 0, !1), f.inited = !0;
    }
    f.releaseNow = !1;
    k && (X_NodeAnime_translateZ && g.asyncDispatch(X_EVENT_GPU_RELEASED), f.follower && (X_NodeAnime_needsDetection = d = !0), b.splice(e, 1), f.phase = 0);
  }
  (X_NodeAnime_reserved = d) ? X_Node_updateTimerID ? (a && a.type === X_EVENT_UPDATED ? X_NodeAnime_updateTimerID && X_Timer_cancelFrame(X_NodeAnime_updateTimerID) : X_System.listen(X_EVENT_UPDATED, X_NodeAnime_updateAnimations), X_NodeAnime_updateTimerID = 0) : (X_System.unlisten(X_EVENT_UPDATED, X_NodeAnime_updateAnimations), X_NodeAnime_updateTimerID = X_Timer_requestFrame(X_NodeAnime_updateAnimations)) : (X_System.unlisten(X_EVENT_UPDATED, X_NodeAnime_updateAnimations), X_NodeAnime_updateTimerID = 
  0);
}
function X_NodeAnime_sortAnimationNode(a, b) {
  var c = 4 <= a._anime.phase, d = 4 <= b._anime.phase;
  return c && d && !c && !d ? a._anime.uid - b._anime.uid : c ? -1 : 1;
}
function X_NodeAnime_updatePosition(a, b, c, d) {
  var e = "";
  if (1 === c) {
    c = b.x = b.toX;
    var g = b.y = b.toY;
    var f = X_Node_CSS_ieMathRangeFix(b.rotate = b.toRotate);
    var k = X_Node_CSS_ieMathRangeFix(b.skewX = b.toSkewX);
    var h = X_Node_CSS_ieMathRangeFix(b.skewY = b.toSkewY);
    var l = b.scaleX = b.toScaleX;
    var p = b.scaleY = b.toScaleY;
    var w = b.alpha = b.toAlpha;
    b.scrollX = b.toScrollX;
    b.scrollY = b.toScrollY;
  } else {
    c = b.x, g = b.y, f = X_Node_CSS_ieMathRangeFix(b.rotate), k = X_Node_CSS_ieMathRangeFix(b.skewX), h = X_Node_CSS_ieMathRangeFix(b.skewY), l = b.scaleX, p = b.scaleY, w = b.alpha;
  }
  if (b.transform) {
    c !== c && g !== g || 0 === c && 0 === g || (e = X_UA.WebKit && (X_UA.Win32 || X_UA.Win64) ? " -webkit-translate(" + (c | 0) + "px," + (g | 0) + "px)" : " translate(" + (c | 0) + "px," + (g | 0) + "px)");
    if (0 > f || 0 < f) {
      e += " rotate(" + f + "deg)";
    }
    if (0 > k || 0 < k) {
      e += " skewX(" + k + "deg)";
    }
    if (0 > h || 0 < h) {
      e += " skewY(" + h + "deg)";
    }
    if (1 > l || 1 < l) {
      e += " scaleX(" + l + ")";
    }
    if (1 > p || 1 < p) {
      e += " scaleY(" + p + ")";
    }
    a.css("transform", (e ? e.substr(1) : "") + (d ? X_NodeAnime_translateZ : ""));
    X_NodeAnime_translateZ && (d ? a._flags & X_NodeFlags_GPU_RELEASE_RESERVED ? (a._flags &= X_Node_BitMask_RESET_GPU, a._flags |= X_NodeFlags_GPU_NOW) : a._flags & X_NodeFlags_GPU_NOW || (a._flags &= X_Node_BitMask_RESET_GPU, a._flags |= X_NodeFlags_GPU_RESERVED) : a._flags & X_NodeFlags_GPU_NOW ? (a._flags &= X_Node_BitMask_RESET_GPU, a._flags |= X_NodeFlags_GPU_RELEASE_RESERVED) : a._flags & X_NodeFlags_GPU_RESERVED && (a._flags &= X_Node_BitMask_RESET_GPU));
  } else {
    if (32 === b.fallback) {
      a.css("dxtransform", [c | 0, g | 0, f || 0, k || 0, h || 0, l, p, b.altX, b.altY]);
    } else {
      switch(c === c && a.css(b.altX, (c | 0) + "px"), g === g && a.css(b.altY, (g | 0) + "px"), b.fallback) {
        case 4:
          a.css("zoom", l);
          break;
        case 2:
          a.css("fontSize", l + "em");
      }
    }
  }
  b.doScroll && a._rawObject && (a._rawObject.scrollLeft = b.scrollX | 0, a._rawObject.scrollTop = b.scrollY | 0);
  w === w && a.css("opacity", w);
}
var X_NodeAnime_ease = {quadratic:function(a) {
  return a * (2 - a);
}, circular:function(a) {
  return Math.sqrt(1 - --a * a);
}, back:function(a) {
  return --a * a * (5 * a + 4) + 1;
}, bounce:function(a, b) {
  b = 7.5625;
  return a < 1 / 2.75 ? b * a * a : a < 2 / 2.75 ? b * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? b * (a -= 2.25 / 2.75) * a + 0.9375 : b * (a -= 2.625 / 2.75) * a + 0.984375;
}, elastic:function(a) {
  return 0 === a ? 0 : 1 === a ? 1 : 0.4 * Math.pow(2, -10 * a) * Math.sin(28.56 * (a - 0.055)) + 1;
}};
var X_Node = X.Node = X_EventDispatcher.inherits(X_Class.NONE, {_uid:0, _flags:X_NodeFlags_DESTROYED, _rect:null, _fontSize:0, length:1, parent:null, _xnodes:null, _gpuParent:null, _tag:"", _text:"", _id:"", _className:"", _attrs:null, _newAttrs:null, _attrText:"", _css:null, _cssText:"", _anime:null, Constructor:function(a) {
  var b = X_Node_CHASHE.length, c, d;
  if (X_Node_newByTag || this.constructor !== X_Node) {
    X_Node_newByTag = !1, this._tag = a.toUpperCase(), arguments[1] && this.attr(arguments[1]), (c = arguments[2]) && (X_Type_isString(c) ? this.cssText(c) : this.css(c));
  } else {
    if (X_Node_newByText) {
      X_Node_newByText = !1, this._text = a;
    } else {
      if (1 < arguments.length) {
        return new X_NodeList(arguments);
      }
      if (X_Type_isArray(a) && a.length) {
        return new X_NodeList(a);
      }
      switch(X_Node_getType(a)) {
        case X_NodeType_XNODE:
        case X_NodeType_XNODE_LIST:
          return a;
        case X_NodeType_RAW_HTML:
          if (d = X_Node_getXNode(a)) {
            return d;
          }
          this.parent = (c = a.parentNode || a.parentElement) && c.tagName && X_Node_getXNode(c);
          this._rawObject = a;
          this._tag = a.tagName.toUpperCase();
          this._id = a.id;
          this._className = a.className;
          this.cssText(a.style.cssText);
          this._flags &= X_Node_BitMask_RESET_DIRTY;
          X_UA_DOM.IE4 ? a.setAttribute("UID", "" + b) : a.UID = b;
          break;
        case X_NodeType_RAW_TEXT:
          if (d = X_Node_getXNode(a)) {
            return d;
          }
          this.parent = X_Node_getXNode(a.parentNode);
          this._rawObject = a;
          this._text = a.data;
          a.UID = b;
          break;
        case X_NodeType_HTML_STRING:
        case X_NodeType_STRING:
          return (d = X_HtmlParser_parse(a, !0) && 1 < d.length) ? new X_NodeList(d) : d.length ? d[0] : X_Node_none;
        default:
          if (X_Node_none) {
            return X_Node_none;
          }
          this.length = 0;
          return;
      }
    }
  }
  this.parent && this.parent._flags & X_NodeFlags_IN_TREE && (this._flags |= X_NodeFlags_IN_TREE);
  this._flags |= X_NodeFlags_EXIST;
  X_Node_CHASHE[this._uid = b] = this[0] = this;
}, width:X_Node_width, height:X_Node_height, clientWidth:X_Node_clientWidth, clientHeight:X_Node_clientHeight, scrollWidth:X_Node_scrollWidth, scrollHeight:X_Node_scrollHeight, scrollLeft:X_Node_scrollLeft, scrollTop:X_Node_scrollTop, x:X_Node_x, y:X_Node_y, offset:X_Node_offset, attr:X_Node_attr, css:X_Node_css, cssText:X_Node_cssText, find:X_Node_find, animate:X_Node_animate, stop:X_Node_stop, create:X_Node_create, createAt:X_Node_createAt, createText:X_Node_createText, createTextAt:X_Node_createTextAt, 
clone:X_Node_clone, append:X_Node_append, appendAt:X_Node_appendAt, appendTo:X_Node_appendTo, prev:X_Node_prev, next:X_Node_next, swap:X_Node_swap, remove:X_Node_remove, empty:X_Node_empty, contains:X_Node_contains, getChildAt:X_Node_getChildAt, numChildren:X_Node_numChildren, firstChild:X_Node_firstChild, lastChild:X_Node_lastChild, getOrder:X_Node_getOrder, className:X_Node_className, addClass:X_Node_addClass, removeClass:X_Node_removeClass, toggleClass:X_Node_toggleClass, hasClass:X_Node_hasClass, 
html:X_Node__html, text:X_Node_text, call:X_Node_call, each:X_Node_each});
X_USE_DOM_RANGE && (X_Node.prototype.createRange = X_Node_createRange);
var X_NodeType_XNODE = 1, X_NodeType_RAW_HTML = 2, X_NodeType_RAW_TEXT = 3, X_NodeType_HTML_STRING = 4, X_NodeType_STRING = 5, X_NodeType_XNODE_LIST = 7, X_NodeType_WINDOW = 8, X_NodeType_DOCUMENT = 9, X_NodeType_IMAGE = 10, X_Node_strictElmCreation = !X_UA.Tasman && 8 >= (X_UA.Trident || X_UA.TridentMobile), X_Node_documentFragment = document.createDocumentFragment && (!(X_UA.Trident || X_UA.TridentMobile) || 5.5 <= (X_UA.Trident || X_UA.TridentMobile)) && document.createDocumentFragment(), X_Node_addTreeAfterChildren = 
!(9 > (X_UA.Trident || X_UA.TridentMobile)), X_Node_displayNoneFixForIE5 = !!X_NodeFlags_IE5_DISPLAY_NONE_FIX, X_Node_newByTag = !1, X_Node_newByText = !1, X_Node_outerXNode = null, X_Node_updateTimerID = 0, X_Node_isXmlDocument = X_UA_DOM.IE4 ? X_emptyFunction : function(a) {
  return X_Type_isBoolean(a.isXML) ? a.isXML : a.isXML = a._rawObject.createElement("p").tagName !== a._rawObject.createElement("P").tagName;
}, X_Node_CHASHE = [], X_Node_none = X_Node_CHASHE[0] = X_Node(), X_Node_html, X_Node_head, X_Node_body, X_Node_systemNode, X_Node_fontSizeNode, X_Node_reserveRemoval = [];
function X_Node_getType(a) {
  return "" === a ? X_NodeType_STRING : a ? a === window ? X_NodeType_WINDOW : a === document ? X_NodeType_DOCUMENT : a.constructor === X_Node ? X_NodeType_XNODE : a.constructor === X_NodeList ? X_NodeType_XNODE_LIST : X_Type_isHTMLElement(a) ? X_NodeType_RAW_HTML : 3 === a.nodeType ? X_NodeType_RAW_TEXT : X_Type_isString(a) ? "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) ? X_NodeType_HTML_STRING : X_NodeType_STRING : a.instanceOf && a.instanceOf(X_Node) ? X_NodeType_XNODE : 0 : 0;
}
function X_Node_getXNode(a) {
  var b, c;
  switch(X_Node_getType(a)) {
    case X_NodeType_XNODE:
    case X_NodeType_XNODE_LIST:
      return a;
    case X_NodeType_RAW_HTML:
      return X_UA_DOM.IE4 ? (a = a.getAttribute("UID")) && X_Node_CHASHE[a] : a.UID && X_Node_CHASHE[a.UID];
    case X_NodeType_WINDOW:
      return X_ViewPort;
    case X_NodeType_DOCUMENT:
      return X_ViewPort_document;
    case X_NodeType_RAW_TEXT:
      if (a.UID) {
        return X_Node_CHASHE[a.UID];
      }
      var d = X_Node_CHASHE;
      for (b = d.length; b;) {
        if ((c = d[--b]) && c._rawObject === a) {
          return c;
        }
      }
  }
}
function X_Node_getRoot(a) {
  return X_ViewPort_document;
}
var X_Node__ie4getRawNode = X_UA_DOM.IE4 && function(a) {
  return a._rawObject || (a._rawObject = document.all["ie4uid" + a._uid] || a._id && document.all[a._id]);
};
function X_Node_toggleInTreeFlag(a, b) {
  for (var c = a.length, d; c;) {
    d = a[--c], b ? d._flags = d._flags | X_NodeFlags_IN_TREE | X_NodeFlags_DIRTY_POSITION : d._flags = d._flags & ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX, d._xnodes && X_Node_toggleInTreeFlag(d._xnodes, b);
  }
}
function X_Node_toggleInGPUFlag(a, b, c) {
  var d = b.length;
  if (c) {
    for (; d;) {
      var e = b[--d];
      e._gpuParent || (e._flags |= X_NodeFlags_GPU_CHILD, e._gpuParent = a, e._xnodes && X_Node_toggleInTreeFlag(a, e._xnodes, c));
    }
  } else {
    for (; d;) {
      e = b[--d], e._gpuParent === a && (e._flags &= ~X_NodeFlags_GPU_CHILD, delete e._gpuParent, e._xnodes && X_Node_toggleInTreeFlag(a, e._xnodes, c));
    }
  }
}
function X_Node_create(a, b, c) {
  if (this._tag) {
    return this.append(a = X_Doc_create(a, b, c)), a;
  }
}
function X_Node_createAt(a, b, c, d) {
  if (this._tag) {
    return this.appendAt(a, a = X_Doc_create(b, c, d)), a;
  }
}
function X_Node_createText(a) {
  if (this._tag) {
    return this.append(a = X_Doc_createText(a)), a;
  }
}
function X_Node_createTextAt(a, b) {
  var c;
  if (this._tag) {
    return this.appendAt(a, c = X_Doc_createText(b)), c;
  }
}
function X_Node_createRange(a, b, c) {
  return X_TextRange(this, a, b, c) || null;
}
function X_Node_clone(a) {
  var b, c;
  if (this._tag) {
    X_Node_newByTag = !0;
    var d = X_Node(this._tag, X_Object_copy(this._attrs), X_Object_copy(this._css)).attr({id:this._id}).className(this._className);
    this._flags & X_NodeFlags_IS_SVG && (d._flags |= X_NodeFlags_IS_SVG);
    this._flags & X_NodeFlags_IS_VML && (d._flags |= X_NodeFlags_IS_VML);
    if (a && (b = this._xnodes) && (c = b.length)) {
      for (a = 0; a < c; ++a) {
        d.append(b[a].clone(!0));
      }
    }
    return d;
  }
  X_Node_newByText = !0;
  return X_Node(this._text);
}
function X_Node_append(a) {
  var b, c;
  if (this._tag) {
    if (1 < (c = arguments.length)) {
      for (b = 0; b < c; ++b) {
        this.append(arguments[b]);
      }
      return this;
    }
    (b = this._xnodes) || (this._xnodes = b = []);
    switch(X_Node_getType(a)) {
      case X_NodeType_RAW_HTML:
      case X_NodeType_RAW_TEXT:
        a = X_Node(a);
        break;
      case X_NodeType_HTML_STRING:
      case X_NodeType_STRING:
        return X_Node_append.apply(this, X_HtmlParser_parse(a, !0));
      case X_NodeType_XNODE:
        if (a.parent === this && b[b.length - 1] === a) {
          return this;
        }
        a.remove();
        5 > (X_UA.Trident || X_UA.TridentMobile) && !a._tag && 0 === (this._flags & X_NodeFlags_IE4_FIXED) && (this._flags |= X_NodeFlags_IE4_DIRTY_CHILDREN);
        break;
      default:
        return this;
    }
    a.parent = this;
    b[b.length] = a;
    this._flags & X_NodeFlags_IN_TREE && (a._flags |= X_NodeFlags_IN_TREE, a._xnodes && X_Node_toggleInTreeFlag(a._xnodes, !0), X_Node_reserveUpdate());
    this._flags & X_NodeFlags_IS_SVG && (a._flags |= X_NodeFlags_IS_SVG);
    this._flags & X_NodeFlags_IS_VML && (a._flags |= X_NodeFlags_IS_VML);
    return this;
  }
}
function X_Node_appendAt(a, b) {
  var c;
  if (!this._tag) {
    return this;
  }
  var d = arguments.length;
  (c = this._xnodes) || (c = this._xnodes = []);
  if (c.length <= a) {
    if (2 === d) {
      return this.append(b);
    }
    for (c = 1; c < d; ++c) {
      this.append(arguments[c]);
    }
    return this;
  }
  0 > a && (a = 0);
  if (2 < d) {
    for (; d;) {
      this.appendAt(a, arguments[--d]);
    }
    return this;
  }
  switch(X_Node_getType(b)) {
    case X_NodeType_RAW_HTML:
    case X_NodeType_RAW_TEXT:
      b = X_Node(b);
      break;
    case X_NodeType_HTML_STRING:
    case X_NodeType_STRING:
      b = X_HtmlParser_parse(b, !0);
      for (c = b.length; c;) {
        this.appendAt(a, b[--c]);
      }
      return this;
    case X_NodeType_XNODE:
      if (b.parent) {
        if (b.parent === this) {
          c = b.getOrder();
          if (c === a) {
            return this;
          }
          c < a && --a;
        }
        b.remove();
      }
      5 > (X_UA.Trident || X_UA.TridentMobile) && !b._tag && 0 === (this._flags & X_NodeFlags_IE4_FIXED) && (this._flags |= X_NodeFlags_IE4_DIRTY_CHILDREN);
      break;
    default:
      return this;
  }
  b.parent = this;
  this._xnodes.splice(a, 0, b);
  this._flags & X_NodeFlags_IN_TREE && (b._flags |= X_NodeFlags_IN_TREE, b._xnodes && X_Node_toggleInTreeFlag(b._xnodes, !0), X_Node_reserveUpdate());
  this._flags & X_NodeFlags_IS_SVG && (b._flags |= X_NodeFlags_IS_SVG);
  this._flags & X_NodeFlags_IS_VML && (b._flags |= X_NodeFlags_IS_VML);
  return this;
}
function X_Node_appendTo(a, b) {
  switch(X_Node_getType(a)) {
    case X_NodeType_RAW_HTML:
      a = X_Node(a);
      break;
    case X_NodeType_HTML_STRING:
      a = X_HtmlParser_parse(a, !0), a = a[0] || a;
    case X_NodeType_XNODE:
      break;
    default:
      return this;
  }
  X_Type_isFinite(b) ? a.appendAt(b, this) : a.append(this);
  return this;
}
function X_Node_prev(a) {
  var b = this.parent;
  if (void 0 === a) {
    if (!b) {
      return;
    }
    b = b._xnodes;
    var c = b.indexOf(this);
    return 0 < c ? b[c - 1] : a;
  }
  if (!b) {
    return this;
  }
  var d = arguments.length;
  if (1 < d) {
    for (c = 0; d; ++c) {
      b.appendAt(this.getOrder() - c, arguments[--d]);
    }
    return this;
  }
  b.appendAt(this.getOrder(), a);
  return this;
}
function X_Node_next(a) {
  var b = this.parent;
  if (void 0 === a) {
    if (!b) {
      return;
    }
    b = b._xnodes;
    var c = b.indexOf(this);
    return ++c < b.length ? b[c] : a;
  }
  if (!b) {
    return this;
  }
  var d = arguments.length;
  c = this.getOrder() + 1;
  if (b._xnodes.length <= c) {
    for (c = 0; c < d; ++c) {
      b.append(arguments[c]);
    }
  } else {
    if (1 < d) {
      for (; d;) {
        b.appendAt(this.getOrder() + 1, arguments[--d]);
      }
    } else {
      b.appendAt(c, a);
    }
  }
  return this;
}
function X_Node_swap(a) {
  return this.parent ? 1 === arguments.length ? this.prev(a).remove() : X_Node_prev.apply(this, arguments).remove() : this;
}
function X_Node_remove() {
  var a = this.parent;
  if (!a) {
    return this;
  }
  this._anime && this._anime.phase && X_NodeAnime_stopNow(this);
  delete this.parent;
  a._xnodes.splice(a._xnodes.indexOf(this), 1);
  this._flags & X_NodeFlags_IN_TREE ? (this._flags = this._flags & ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX, this._xnodes && X_Node_toggleInTreeFlag(this._xnodes, !1), X_UA_DOM.IE4 ? this._rawObject || X_Node__ie4getRawNode(this) ? (X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this, X_Node_reserveUpdate()) : this._tag || 0 !== (a._flags & X_NodeFlags_IE4_FIXED) || (a._flags |= X_NodeFlags_IE4_DIRTY_CHILDREN) : (a = this._rawObject) && a.parentNode && a.parentNode.tagName && 
  (X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this, X_Node_reserveUpdate())) : X_UA_DOM.IE4 || (a = this._rawObject) && a.parentNode && a.parentNode.tagName && (X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this, X_Node_reserveUpdate());
  return this;
}
function X_Node_empty() {
  var a = this._xnodes, b;
  if (a && (b = a.length)) {
    for (delete this._xnodes; b;) {
      a[--b].kill();
    }
    a.length = 0;
  }
  return this;
}
function X_Node_onKill(a) {
  var b = a.parent, c = a._xnodes, d;
  if (0 !== (a._flags & X_NodeFlags_EXIST)) {
    b && b._xnodes && b._xnodes.splice(b._xnodes.indexOf(a), 1);
    if (c && (d = c.length)) {
      for (delete a._xnodes; d;) {
        c[--d].kill();
      }
      c.length = 0;
    }
    X_Node_CHASHE[a._uid] = null;
    a._anime && a._anime.phase && X_NodeAnime_stopNow(a);
    X_UA_DOM.IE4 ? (c = a._rawObject || X_UA_DOM.IE4 && X_Node__ie4getRawNode(a)) ? (X_Node_reserveRemoval[X_Node_reserveRemoval.length] = c, X_Node_reserveUpdate()) : a._tag || 0 !== (b._flags & X_NodeFlags_IE4_FIXED) || (b._flags |= X_NodeFlags_IE4_DIRTY_CHILDREN) : (c = a._rawObject) && c.parentNode && c.parentNode.tagName && (X_Node_reserveRemoval[X_Node_reserveRemoval.length] = c, X_Node_reserveUpdate());
  }
}
function X_Node_contains(a) {
  if (!a || !this._tag || this === a) {
    return !1;
  }
  var b = this._xnodes;
  if (!b || !b.length) {
    return !1;
  }
  for (; a = a.parent;) {
    if (this === a) {
      return !0;
    }
  }
  return !1;
}
function X_Node_getChildAt(a) {
  var b = this._xnodes;
  return b && 0 <= a && a < b.length && b[a];
}
function X_Node_numChildren() {
  var a = this._xnodes;
  return a ? a.length : 0;
}
function X_Node_firstChild() {
  return this._xnodes && this._xnodes[0];
}
function X_Node_lastChild() {
  var a = this._xnodes;
  return a && a[a.length - 1];
}
function X_Node_getOrder() {
  var a = this.parent;
  return this === X_Node_html ? 0 : a ? a._xnodes.indexOf(this) : -1;
}
function X_Node_className(a) {
  if (void 0 === a) {
    return this._className;
  }
  if (this._className === a) {
    return this;
  }
  if (a && X_Type_isString(a)) {
    for (; -1 !== a.indexOf("  ");) {
      a = a.split("  ").join(" ");
    }
    " " === a.charAt(0) && (a = a.substr(1));
    0 === a.lastIndexOf(" ") && (a = a.substr(0, a.length - 1));
    if (this._className === a) {
      return this;
    }
    a ? this._className = a : delete this._className;
  } else {
    delete this._className;
  }
  this._flags |= X_NodeFlags_DIRTY_CLASSNAME;
  this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
  return this;
}
function X_Node_addClass(a) {
  var b = a.split(" "), c = b.length, d = this._className, e;
  for (a = ""; c;) {
    (e = b[--c]) && !this.hasClass(e) && (a += (a ? " " : "") + e);
  }
  return a ? this.className((d ? d + " " : "") + a) : this;
}
function X_Node_removeClass(a) {
  var b = this._className;
  a = a.split(" ");
  var c, d;
  if (!b) {
    return this;
  }
  var e = b.split(" ");
  for (c = e.length; c;) {
    for (b = e[--c], d = a.length; d;) {
      if (b === a[--d]) {
        e.splice(c, 1);
        a.splice(d, 1);
        var g = !0;
        break;
      }
    }
  }
  return g ? this.className(e.join(" ")) : this;
}
function X_Node_toggleClass(a, b) {
  var c;
  if (void 0 !== b) {
    return b ? this.addClass(a) : this.removeClass(a);
  }
  var d = a.split(" ");
  for (c = d.length; c;) {
    var e = d[--c];
    this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
  }
  return this;
}
function X_Node_hasClass(a) {
  var b = this._className, c;
  if (b === a) {
    return !0;
  }
  if (!b) {
    return !1;
  }
  b = " " + b + " ";
  if (-1 !== b.indexOf(" " + a + " ")) {
    return !0;
  }
  a = a.split(" ");
  for (c = a.length; c;) {
    var d = a[--c];
    if ("" !== d && -1 === b.indexOf(" " + d + " ")) {
      return !1;
    }
  }
  return !0;
}
function X_Node__html(a) {
  var b, c, d;
  if (void 0 !== a) {
    if (!this._tag) {
      return this.text(a);
    }
    this.empty();
    (a += "") && X_Node_append.apply(this, X_HtmlParser_parse(a, !0));
    return this;
  }
  if (!this._tag) {
    return this._text;
  }
  this._flags & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(this);
  a = X_Node_outerXNode ? ["<", this._tag, this._id ? ' id="' + this._id + '"' : "", this._className ? ' class="' + this._className + '"' : "", this._flags & X_NodeFlags_OLD_ATTRTEXT ? X_Node_Attr_objToAttrText(this) : this._attrText, this._cssText ? ' style="' + this._cssText + '"' : "", ">"] : [];
  var e = a.length;
  if ((b = this._xnodes) && (d = b.length)) {
    X_Node_outerXNode || (X_Node_outerXNode = this);
    for (c = 0; c < d; ++c) {
      a[e] = b[c].html(), ++e;
    }
    X_Node_outerXNode === this && (X_Node_outerXNode = null);
  }
  !X_Node_outerXNode || X_Dom_DTD_EMPTY[this._tag] || (a[e] = "</" + this._tag + ">");
  return a.join("");
}
function X_Node_text(a) {
  var b, c;
  if (void 0 !== a) {
    null === a && (a = "");
    var d = a + "";
    if (!this._tag) {
      return this._text !== d && (d ? this._text = d : delete this._text, this._flags |= X_NodeFlags_DIRTY_CONTENT, this._flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate()), this;
    }
    if ((b = this._xnodes) && 1 === b.length && !b[0]._tag) {
      return b[0].text(d), this;
    }
    if (!d) {
      return this.empty();
    }
    this.empty().createText(d);
    return this;
  }
  if (this._tag) {
    if ((b = this._xnodes) && (d = b.length)) {
      a = [];
      for (c = 0; c < d; ++c) {
        a[c] = b[c].text();
      }
      return a.join("");
    }
    return "";
  }
  return this._text;
}
function X_Node_call(a) {
  var b = arguments, c = b.length - 1, d, e, g, f, k;
  switch(a) {
    case "isSVG":
      return !!(this._flags & X_NodeFlags_IS_SVG);
    case "isVML":
      return !!(this._flags & X_NodeFlags_IS_VML);
    case "nodeType":
      return this._tag ? 1 : 3;
    case "outerHTML":
      return X_Node_outerXNode = X_Node_body, b = this.html(), X_Node_outerXNode = null, b;
    case "treeIsDirty":
      return !!X_Node_updateTimerID;
    case "fontSize":
      return this._flags & X_NodeFlags_IN_TREE ? X_Node_CSS_getCharSize(this) : 0;
    case "inGPU":
      return !!(this._flags & (X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED));
    case "isGPUChild":
      if (this._flags & X_NodeFlags_IN_TREE) {
        for (d = this; d = d.parent;) {
          if (d._flags & (X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED)) {
            return !0;
          }
        }
      }
      return !1;
    case "containGPU":
      return !1;
    case "canAnimateNow":
      return this._flags & X_NodeFlags_IN_TREE && 6 === X_NodeAnime_detectWaitAnimation(this, !0, !0);
    case "animeState":
      return this._anime ? this._anime.phase : 0;
    case "animeProgress":
      return this._anime && 7 === this._anime.phase ? this._anime.progress : 0;
  }
  X_Node_updateTimerID && X_Node_startUpdate();
  if (d = this._rawObject || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this)) {
    if ("scrollTo" === a) {
      d.scrollLeft = b[1] || 0, d.scrollTop = b[2] || 0;
    } else {
      if ("inView" === a) {
        if (!(this._flags & X_NodeFlags_IN_TREE)) {
          return {isInView:!1};
        }
        b = X_elmBody;
        var h = d;
        for (f = k = e = g = 0; h !== b;) {
          d = h.parentNode || h.parentElement;
          var l = d.clientHeight;
          c = d.clientWidth;
          var p = d.scrollHeight;
          var w = d.scrollWidth;
          if (l < w || c < p) {
            p = h.offsetLeft + f;
            w = h.offsetTop + k;
            e = e || h.offsetWidth;
            h = g || h.offsetHeight;
            var m = d.scrollLeft;
            g = d.scrollTop;
            if (g < w + h && w < g + l && m < p + e && p < m + c) {
              var v = p < m ? "right" : m + c < p + e ? "left" : "both";
              var q = w < g ? "bottom" : g + l < w + h ? "top" : "both";
              f = "right" === v ? 0 : p - m;
              k = "bottom" === v ? 0 : w - g;
              e = "both" === v ? e : "right" === v ? m + c - p : p + e - m;
              g = "both" === q ? h : "bottom" === q ? g + l - w : w + h - g;
            } else {
              return {isInView:!1};
            }
          }
          h = d;
        }
        return {isInView:!0};
      }
      l = d[a];
      if (X_Type_isFunction(l)) {
        return c ? (b = X_Array_copy(b), b.shift(), l.apply(d, b)) : d[a]();
      }
      if (9 > (X_UA.Trident || X_UA.TridentMobile) && (X_Type_isUnknown(l) || X_Type_isObject(l))) {
        if (c) {
          b = X_Array_copy(b);
          b.shift();
          l = [];
          for (f = 0; f < c; ++f) {
            l[f] = "_" + f;
          }
          l = l.join(",");
          return Function(l, ["return this.", a, "(", l, ")"].join("")).apply(d, b);
        }
        return d[a]();
      }
    }
  }
}
function X_Node_each(a) {
  if (1 < arguments.length) {
    var b = X_Array_copy(arguments);
    b[0] = 0;
    a.apply(this, b);
  } else {
    a.call(this, 0);
  }
  return this;
}
function X_Node_reserveUpdate() {
  X_Node_updateTimerID || (X_Node_updateTimerID = X_Timer_requestFrame(X_Node_startUpdate));
}
var X_Node_updateReservedByReleaseGPU = !1;
function X_Node_startUpdate(a) {
  var b;
  if (X_Node_updateTimerID && !(X_ViewPort_readyState < X_EVENT_INIT)) {
    X_Timer_cancelFrame(X_Node_updateTimerID);
    X_Node_updateTimerID = 0;
    a && X_System._listeners && X_System._listeners[X_EVENT_BEFORE_UPDATE] && X_System.dispatch(X_EVENT_BEFORE_UPDATE);
    var c = X_Node_reserveRemoval;
    if (b = c.length) {
      for (; b;) {
        var d = c[--b];
        d.instanceOf ? X_Node__actualRemove(d) : X_UA_DOM.IE4 ? (d.removeAttribute("id"), d.outerHTML = "") : X_UA.Tasman ? d.parentNode && d.parentNode.tagName && X_TEMP._fixed_remove(d) : d.parentNode && d.parentNode.tagName && d.parentNode.removeChild(d);
      }
      c.length = 0;
    }
    if (5 <= (X_UA.Trident || X_UA.TridentMobile) && 5.5 > (X_UA.Trident || X_UA.TridentMobile) && 10 !== X_UA.Win32) {
      var e = FocusUtility_getFocusedElement();
      X_elmBody.style.visibility = "hidden";
    }
    X_Node_html._flags & X_Node_BitMask_IS_DIRTY ? X_Node__commitUpdate(X_Node_html, X_Node_html._rawObject.parentNode, null, X_Node_html._flags, 1, c = []) : (X_Node__commitUpdate(X_Node_head, X_Node_head._rawObject.parentNode, null, X_Node_head._flags, 1, []), X_Node__commitUpdate(X_Node_body, X_Node_body._rawObject.parentNode, null, X_Node_body._flags, 1, c = []));
    5 <= (X_UA.Trident || X_UA.TridentMobile) && 5.5 > (X_UA.Trident || X_UA.TridentMobile) && 10 !== X_UA.Win32 && (X_elmBody.style.visibility = "", e && e.parentNode && FocusUtility_setTemporarilyFocus(e));
    X_Node_updateReservedByReleaseGPU && (X_Node_reserveUpdate(), X_Node_updateReservedByReleaseGPU = !1);
    if (X_NodeFlags_IE_FILTER_FIX_AFTER && c.length) {
      for (b = 0; e = c[b]; ++b) {
        e._flags &= ~X_NodeFlags_IE_FILTER_FIX_AFTER, X_Node_CSS_onAfterUpdateIEFilterFix(e);
      }
    }
    X_System._listeners && X_System._listeners[X_EVENT_UPDATED] && (a ? X_System.dispatch(X_EVENT_UPDATED) : X_System.asyncDispatch(X_EVENT_UPDATED));
    X_ViewPort._listeners && X_ViewPort._listeners[X_EVENT_AFTER_UPDATE] && X_ViewPort.asyncDispatch(X_EVENT_AFTER_UPDATE);
  }
}
var X_Node__commitUpdate = X_UA_DOM.W3C ? function(a, b, c, d, e, g) {
  var f = a._rawObject, k, h;
  if (a._flags & X_NodeFlags_GPU_NOW) {
    return a._flags & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode(a, f), f;
  }
  a._flags & X_NodeFlags_GPU_RELEASE_RESERVED && (a._flags &= X_Node_BitMask_RESET_GPU);
  a._flags & X_NodeFlags_GPU_RESERVED && (a._flags &= X_Node_BitMask_RESET_GPU, a._flags |= X_NodeFlags_GPU_NOW);
  if (a._flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
    if (X_Node_displayNoneFixForIE5) {
      return f && f.parentNode && X_Node__actualRemove(a), c;
    }
    f && (f.style.display = "none");
    return f && f.nextSibling === c ? f : c;
  }
  d |= a._flags;
  if (a._flags & X_NodeFlags_IE5_DISPLAY_NONE_FIX && 0 === (d & (X_NodeFlags_DIRTY_POSITION | X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME))) {
    return c;
  }
  if (!f) {
    a._tag ? X_Node_strictElmCreation ? (a._flags & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(a, !0), f = document.createElement(["<", a._tag, ' UID="', a._uid, '"', a._id ? ' id="' + a._id + '"' : "", a._className ? ' class="' + a._className + '"' : "", X_Node_Attr_objToAttrText(a, !0), a._cssText ? ' style="' + a._cssText + '"' : "", ">"].join(""))) : f = a._flags & X_NodeFlags_IS_SVG ? document.createElementNS("http://www.w3.org/2000/svg", a._tag.toLowerCase()) : document.createElement(a._tag) : 
    (a._flags &= X_Node_BitMask_RESET_DIRTY, f = 8 > (X_UA.Trident || X_UA.TridentMobile) ? document.createTextNode(X_String_chrReferanceTo(a._text).split("\n").join(X_String_CRLF)) : document.createTextNode(X_String_chrReferanceTo(a._text)), X_UA.Trident || X_UA.TridentMobile || (f.UID = a._uid));
    a._rawObject = f;
    X_Node_addTreeAfterChildren || (c ? b.insertBefore(f, c) : b.appendChild(f));
    a._tag && (X_EventDispatcher_toggleAllEvents(a, !0), a._flags |= X_NodeFlags_ACTUAL_LISTENING, X_Node_strictElmCreation ? (a._flags &= X_Node_BitMask_RESET_DIRTY, a._newAttrs && (a._flags |= X_NodeFlags_DIRTY_ATTR), a._flags |= X_NodeFlags_DIRTY_IE_FILTER) : (f.UID = a._uid, a._newAttrs = a._attrs, a._flags &= X_Node_BitMask_RESET_DIRTY, a._flags = a._flags | X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER, !X_UA.Gecko && 
    !X_UA.Fennec || "IFRAME" !== a._tag || a._attrs && a._attrs.src || a.attr("src", "about:blank")));
    var l = !0;
  } else {
    if (f.parentNode !== b || c && f.nextSibling !== c) {
      c ? b.insertBefore(f, c) : b.appendChild(f);
    }
  }
  a._listeners && 0 === (a._flags & X_NodeFlags_ACTUAL_LISTENING) && (X_EventDispatcher_toggleAllEvents(a, !0), a._flags |= X_NodeFlags_ACTUAL_LISTENING);
  var p = a._css && 0 <= a._css.opacity && a._css.opacity;
  e *= p || 1;
  d & X_Node_BitMask_IS_DIRTY && (delete a._fontSize, X_Node__updateRawNode(a, f, p, e, d));
  if (X_Node_displayNoneFixForIE5 && a._tag) {
    if ("none" === f.runtimeStyle.display) {
      return X_Node__actualRemove(a), a._flags |= X_NodeFlags_IE5_DISPLAY_NONE_FIX, c;
    }
    a._flags &= ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
  }
  a._flags & X_NodeFlags_IE_FILTER_FIX_AFTER && (g[g.length] = a);
  if ((k = a._xnodes) && (h = k.length)) {
    for (; h;) {
      var w = X_Node__commitUpdate(k[--h], f, w, d, e, g);
    }
  }
  l && X_Node_addTreeAfterChildren && (c ? b.insertBefore(f, c) : b.appendChild(f), (X_UA.Gecko || X_UA.Fennec) && "IFRAME" === a._tag && f.contentWindow && (f.contentWindow.location.replace = f.src));
  return f;
} : X_UA_DOM.IE4 ? function(a, b, c, d) {
  var e = a._rawObject || X_Node__ie4getRawNode(a), g, f, k;
  if (!a._tag) {
    return a._flags & X_NodeFlags_DIRTY_CONTENT && X_Node__updateRawNode(a, e), e;
  }
  if (a._flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
    return e && (e.style.display = "none", "none" !== e.style.display) ? (X_Node__actualRemove(a), c) : e || c;
  }
  if (e) {
    d |= a._flags;
    c = (b = a._xnodes) ? b.length : 0;
    if (f = !!(a._flags & X_NodeFlags_IE4_DIRTY_CHILDREN)) {
      for (a._flags &= ~X_NodeFlags_IE4_DIRTY_CHILDREN, g = 0; g < c; ++g) {
        if (a._flags = b[g]._tag ? a._flags | X_NodeFlags_IE4_HAS_ELEMENT : a._flags | X_NodeFlags_IE4_HAS_TEXTNODE, a._flags & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX) {
          var h = !0;
          break;
        }
      }
    }
    if (a._flags & X_NodeFlags_IE4_FIXED || a._flags & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_ELEMENT) {
      for (g = 0; g < c; ++g) {
        var l = X_Node__commitUpdate(b[g], e, l, d);
      }
    } else {
      if (h) {
        h = [];
        for (g = 0; g < c; ++g) {
          h[g] = X_Node__actualCreate(b[g], !1);
        }
        e.innerHTML = h.join("");
        for (g = 0; g < c; ++g) {
          X_Node__afterActualCreate(b[g]);
        }
        a._flags |= X_NodeFlags_IE4_FIXED;
      } else {
        if (a._flags & X_NodeFlags_IE4_HAS_TEXTNODE) {
          f = f || !1;
          for (g = 0; g < c; ++g) {
            h = b[g], h._flags & X_Node_BitMask_IS_DIRTY && (h._flags &= X_Node_BitMask_RESET_DIRTY, f = !0);
          }
          f && (e.innerHTML = a.text());
        }
      }
    }
    d & X_Node_BitMask_IS_DIRTY && delete a._fontSize;
    a._flags &= ~X_NodeFlags_DIRTY_POSITION;
    a._flags & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode(a, e);
  } else {
    c ? c.insertAdjacentHTML("AfterEnd", X_Node__actualCreate(a, !1)) : b.insertAdjacentHTML("AfterBegin", X_Node__actualCreate(a, !1)), X_Node__afterActualCreate(a), e = a._rawObject || X_Node__ie4getRawNode(a);
  }
  (k = a._anime) && 6 <= k.phase && k.doScroll && (6 === k.phase ? (a = k.fromScrollX, a === a ? e.scrollLeft = a : k.fromScrollX = e.scrollLeft, a = k.fromScrollY, a === a ? e.scrollTop = a : k.fromScrollY = e.scrollTop) : (e.scrollLeft = k.scrollX, e.scrollTop = k.scrollY));
  return e;
} : function() {
}, X_Node__updateRawNode = X_UA_DOM.W3C ? function(a, b, c, d, e) {
  var g, f;
  if (a._tag) {
    a._flags & X_NodeFlags_DIRTY_ID && (a._id ? a._flags & X_NodeFlags_IS_SVG ? b.setAttribute("id", a._id) : b.id = a._id : b.id && b.removeAttribute("id"));
    a._flags & X_NodeFlags_DIRTY_CLASSNAME && (a._className ? a._flags & X_NodeFlags_IS_SVG ? b.setAttribute("class", a._className) : b.className = a._className : b.className && b.removeAttribute(8 > (X_UA.Trident || X_UA.TridentMobile) ? "className" : "class"));
    if (a._flags & X_NodeFlags_DIRTY_ATTR && (g = a._newAttrs || a._attrs)) {
      var k = X_Node_Attr_renameForDOM;
      for (f in g) {
        var h = g[f];
        switch(a._tag + f) {
          case "TEXTAREAvalue":
            if (!X_UA.Tasman && 5 <= (X_UA.Trident || X_UA.TridentMobile) && 5 > (X_UA.Trident || X_UA.TridentMobile) || X_Script_ie6ExeComError) {
              b.firstChild ? b.firstChild.data = h || "" : b.appendChild(document.createTextNode(h || ""));
              continue;
            }
            break;
          case "IFRAMEsrc":
            if ((X_UA.Gecko || X_UA.Fennec) && b.contentWindow) {
              b.contentWindow.location.replace = b.src = h || "";
              continue;
            }
        }
        void 0 === h ? b.removeAttribute(k[f] || f) : a._flags & X_NodeFlags_IS_SVG ? b.setAttribute(f, h) : b[k[f] || f] = X_Node_Attr_noValue[f] ? f : h;
      }
      delete a._newAttrs;
    }
    if (e & X_NodeFlags_IE8_OPACITY_FIX && 0 <= c) {
      var l = !0;
      a._css.opacity = d;
      a._flags & X_NodeFlags_DIRTY_CSS ? a._flags |= X_NodeFlags_OLD_CSSTEXT : a._flags & X_NodeFlags_DIRTY_IE_FILTER || (a._flags |= X_NodeFlags_DIRTY_IE_FILTER);
    }
    a._flags & X_NodeFlags_DIRTY_CSS ? (a._flags & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText(a) : a._cssText) ? 9 > (X_UA.Presto || X_UA.PrestoMobile) || 1 > X_UA.Gecko ? b.setAttribute("style", a._cssText) : b.style.cssText = a._cssText : 6 > (X_UA.Trident || X_UA.TridentMobile) || 528 > X_UA.WebKit ? b.style.cssText = "" : b.removeAttribute("style") : a._flags & X_NodeFlags_DIRTY_IE_FILTER && ((h = X_Node_CSS_objToIEFilterText(a)) ? (b.style.filter = h, a._flags |= X_NodeFlags_IE_FILTER_NOW) : 
    (b.style.removeAttribute("filter"), a._flags &= ~X_NodeFlags_IE_FILTER_NOW));
    l && (a._css.opacity = c);
  } else {
    b.data = 8 > (X_UA.Trident || X_UA.TridentMobile) ? X_String_chrReferanceTo(a._text).split("\n").join(X_String_CRLF) : X_String_chrReferanceTo(a._text);
  }
  a._flags &= X_Node_BitMask_RESET_DIRTY;
} : X_UA_DOM.IE4 ? function(a, b) {
  var c, d, e;
  if (a._tag) {
    if (a._flags & X_NodeFlags_DIRTY_ID && b.setAttribute("id", a._id || "ie4uid" + a._uid), a._flags & X_NodeFlags_DIRTY_CLASSNAME && (a._className ? b.className = a._className : b.removeAttribute("class")), a._flags & X_NodeFlags_DIRTY_CSS ? (a._flags & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText(a) : a._cssText) ? b.style.cssText = a._cssText : (b.style.cssText = "", b.removeAttribute("style")) : a._flags & X_NodeFlags_DIRTY_IE_FILTER && ((e = X_Node_CSS_objToIEFilterText(a)) ? (b.style.filter = 
    e, a._flags |= X_NodeFlags_IE_FILTER_NOW) : (b.style.removeAttribute("filter"), a._flags &= ~X_NodeFlags_IE_FILTER_NOW)), a._flags & X_NodeFlags_DIRTY_ATTR && (c = a._newAttrs || a._attrs)) {
      var g = X_Node_Attr_renameForDOM;
      for (d in c) {
        void 0 === (e = c[d]) ? b.removeAttribute(g[d] || d) : b.setAttribute(g[d] || d, X_Node_Attr_noValue[d] ? d : e);
      }
      delete a._newAttrs;
    }
  } else {
    b.innerText = a._text;
  }
  a._flags &= X_Node_BitMask_RESET_DIRTY;
} : function() {
}, X_Node__actualCreate = X_UA_DOM.IE4 && function(a, b) {
  var c = a._uid, d, e, g;
  if (a._tag) {
    b || X_Node__actualRemove(a, !1);
    a._flags & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(a, !0);
    c = ["<", a._tag, " id=", a._id || "ie4uid" + c, ' UID="', c, '"', a._className ? ' class="' + a._className + '"' : "", X_Node_Attr_objToAttrText(a, !0), a._cssText ? ' style="' + a._cssText + '"' : "", ">"];
    var f = c.length;
    if ((d = a._xnodes) && (g = d.length)) {
      a._flags &= ~X_NodeFlags_IE4_DIRTY_CHILDREN;
      for (e = 0; e < g && !(a._flags = d[e]._tag ? a._flags | X_NodeFlags_IE4_HAS_ELEMENT : a._flags | X_NodeFlags_IE4_HAS_TEXTNODE, a._flags & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX); ++e) {
      }
      if (a._flags & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_TEXTNODE) {
        c[f] = a.text(), ++f;
      } else {
        for (e = 0; e < g; ++e) {
          c[f] = X_Node__actualCreate(d[e], !0), ++f;
        }
        a._flags |= X_NodeFlags_IE4_FIXED;
      }
    }
    X_Dom_DTD_EMPTY[a._tag] || (c[f] = "</" + a._tag + ">");
    a._newAttrs && (a._flags |= X_NodeFlags_DIRTY_ATTR);
  } else {
    c = ["<FONT id=ie4uid", c, ' UID="', c, '">', a._text, "</FONT>"], delete a._rawObject;
  }
  return c.join("");
}, X_Node__afterActualCreate = X_UA_DOM.IE4 && function(a) {
  var b, c;
  if (!a._tag) {
    return a;
  }
  if ((b = a._xnodes) && (c = b.length)) {
    for (; c;) {
      X_Node__afterActualCreate(b[--c]);
    }
  }
  a._flags & (X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_IE_FILTER) ? X_Node__updateRawNode(a, a._rawObject || X_Node__ie4getRawNode(a)) : a._flags &= X_Node_BitMask_RESET_DIRTY;
  X_EventDispatcher_toggleAllEvents(a, !0);
}, X_Node__actualRemove = X_UA_DOM.W3C ? function(a, b) {
  var c = a._xnodes, d = a._rawObject, e, g;
  if (c && (g = c.length)) {
    for (e = 0; e < g; ++e) {
      var f = c[e];
      f._tag && X_Node__actualRemove(f, !0);
    }
  }
  d && (a._flags & X_NodeFlags_ACTUAL_LISTENING && (a._listeners && X_EventDispatcher_toggleAllEvents(a, !1), a._flags &= ~X_NodeFlags_ACTUAL_LISTENING), X_Node_displayNoneFixForIE5 && d.filters && d.filters.length && (b = !1, delete a._rawObject, !X_Node_Attr_HAS_VALUE[a._tag] || a._newAttrs && X_Object_inObject("value", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.value = d.value), "OPTION" !== a._tag || a._newAttrs && X_Object_inObject("selected", a._newAttrs) || (a._attrs || (a._attrs = 
  {}), a._attrs.selected = d.selected), "SELECT" !== a._tag || a._newAttrs && X_Object_inObject("selectedIndex", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selectedIndex = d.selectedIndex, a._attrs.value = d.value), "INPUT" !== a._tag || !a._attrs || "checkbox" !== a._attrs.type && "radio" !== a._attrs.type || a._newAttrs && X_Object_inObject("checked", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.checked = d.checked), d.innerHTML = ""), X_UA.Tasman ? !b && d.parentNode && d.parentNode.tagName && 
  X_TEMP._fixed_remove(d) : !b && d.parentNode && d.parentNode.tagName && d.parentNode.removeChild(d));
} : X_UA_DOM.IE4 ? function(a, b) {
  var c = a._xnodes, d = a._rawObject || X_Node__ie4getRawNode(a), e, g;
  if (c && (g = c.length)) {
    for (e = 0; e < g; ++e) {
      X_Node__actualRemove(c[e], !0);
    }
  }
  d && (a._listeners && X_EventDispatcher_toggleAllEvents(a, !1), !X_Node_Attr_HAS_VALUE[a._tag] || a._newAttrs && X_Object_inObject("value", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.value = d.value), "OPTION" !== a._tag || a._newAttrs && X_Object_inObject("selected", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selected = d.selected), "SELECT" !== a._tag || a._newAttrs && X_Object_inObject("selectedIndex", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selectedIndex = 
  d.selectedIndex, a._attrs.value = d.value), "INPUT" !== a._tag || !a._attrs || "checkbox" !== a._attrs.type && "radio" !== a._attrs.type || a._newAttrs && X_Object_inObject("checked", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.checked = d.checked), d.removeAttribute("id"), b || (d.outerHTML = ""), delete a._rawObject);
} : function() {
};
X_ViewPort.listenOnce(X_EVENT_UNLOAD, X_Node__actualRemove, [X_Node_html, !0]);
function XUI_collectHTMLElement(a) {
}
;X_TEMP.X_Dom_useBuilder = !0;
X_TEMP._isCleanupTarget = function(a) {
  var b = " " + a.className + " ";
  a = (a.tagName || "").toUpperCase();
  return -1 === b.indexOf(" skip-cleanup ") && (X_Dom_DTD_CLEANUP_TAGS[a] || -1 !== b.indexOf(" cleanup-target "));
};
X_UA.Tasman ? (X_TEMP._fixed_remove = function(a) {
  var b = a.parentNode;
  3 !== a.nodeType && alert(a.nodeType + "\n" + (a.outerHTML || a.data));
  1 === a.nodeType ? b && b.removeChild(a) : 3 === a.nodeType && b && X_elmBody.appendChild(a);
}, X_TEMP._removalTextNodes = [], X_TEMP._timerRemove = function() {
  for (var a = X_TEMP._removalTextNodes, b = 0, c; 5 > b && a.length;) {
    c = a.shift(), c.parentNode && ++b;
  }
}) : 8 > (X_UA.Presto || X_UA.PrestoMobile) && (X_TEMP._fixed_remove = function(a) {
  (1 === a.nodeType || 3 === a.nodeType) && a.parentNode && a.parentNode.removeChild(a);
});
X_TEMP._onPreInit = X_UA_DOM.W3C ? function() {
  function a(b, c) {
    for (var d = X_Array_copy(b.childNodes), e = 0, f = d.length, g, k, v; e < f; ++e) {
      switch(g = d[e], g.nodeType) {
        case 1:
          k = g.tagName.toUpperCase();
          if (X_Dom_DTD_MOVE_TO_HEAD[k]) {
            X_elmHead.appendChild(g);
            continue;
          } else {
            if (X_TEMP._isCleanupTarget(g)) {
              b.removeChild(g);
              continue;
            } else {
              g.childNodes && g.childNodes.length && a(g, c || X_Dom_DTD_SKIP_CLEANUP_TAGS[k]);
            }
          }
          v = null;
          break;
        case 3:
          if (k = c ? g.data : X_String_cleanupWhiteSpace(g.data), !v && " " !== k && k.length) {
            g.data = k;
            v = g;
            break;
          } else {
            v && (v.data += k);
          }
        default:
          8 > X_UA.Presto ? X_TEMP._fixed_remove(g) : b.removeChild(g);
      }
    }
  }
  var b = X_elmBody, c, d;
  if (X_TEMP.X_Dom_useBuilder) {
    X_HTMLParser_skipFixNesting = !0;
    a(X_UA.Tasman ? c = b.cloneNode(!0) : b);
    if (X_UA.Tasman) {
      document.write(c = c.innerHTML);
    } else {
      if (c = 8 >= (X_UA.Trident || X_UA.TridentMobile) ? b.innerHTML.split(X_String_CRLF).join("") : b.innerHTML, "fastinnerhtml!" === c) {
        c = "";
        var e = 0;
        for (d = b.childNodes.length; e < d; ++e) {
          var g = b.childNodes[e];
          c += g.outerHTML || g.data;
        }
      }
    }
    b.appendChild(X_TEMP.elmProgress = b = document.createElement("div"));
    b.style.cssText = "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;";
    b.setAttribute("style", "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;");
    X_HTMLParser_asyncParse(c, !0).listen(X_EVENT_PROGRESS, X_TEMP._handleEvent).listenOnce(X_EVENT_SUCCESS, X_TEMP._handleEvent);
  }
} : function() {
  var a = X_Node_body._rawObject;
  if (X_TEMP.X_Dom_useBuilder) {
    var b = a.innerHTML;
    a.insertAdjacentHTML("BeforeEnd", '<div id="_xdom_builder_progress" style="position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;"></div>');
    X_TEMP.elmProgress = document.all._xdom_builder_progress;
    X_HTMLParser_asyncParse(b, !0).listen(X_EVENT_PROGRESS, X_TEMP._handleEvent).listenOnce(X_EVENT_SUCCESS, X_TEMP._handleEvent);
  }
};
X_ViewPort.listenOnce(X_EVENT_PRE_INIT, X_TEMP._onPreInit);
X_TEMP._handleEvent = function(a) {
  var b = X_TEMP.elmProgress;
  switch(a.type) {
    case X_EVENT_PROGRESS:
      b.style.width = (100 * a.percent | 0) + "%";
      break;
    case X_EVENT_SUCCESS:
      var c = X_Node_body._xnodes = [];
      c.push.apply(c, a.xnodes);
      b.style.width = "100%";
      X_TEMP.asyncCreateTree(X_Node_body, X_elmBody.childNodes || X_elmBody.children, b);
      delete X_TEMP._onPreInit;
      delete X_TEMP.elmProgress;
  }
};
X_TEMP.asyncCreateTree = function(a, b, c, d) {
  var e = d ? 0 : X_Array_copy(a._xnodes), g = d ? 0 : e.length, f = d ? d.stack : [], k = d ? d.done : 0, h = X_Timer_now();
  b = d ? d.current : {me:a, xnodes:e, l:g, i:0, elems:X_Array_copy(b), j:0, xtext:null, flag:0};
  for (var l, p, w; b || (b = f.pop());) {
    p = b.i;
    g = b.l;
    if (p < g) {
      for (a = b.me, e = b.xnodes; l = e[p];) {
        if (w = X_TEMP.bindElementToXnode(a, l, b), ++p, ++k, w) {
          b.i = p, f[f.length] = b, b = w, p = 0, g = w.l, a = l, e = w.xnodes;
        } else {
          if (h + X_Timer_INTERVAL_TIME <= X_Timer_now()) {
            b.i = p;
            d && (d.current = p < g && b, d.done = k);
            X_Timer_once(0, X_TEMP.asyncCreateTree, [null, null, c, d || {stack:f, current:p < g && b, done:k}]);
            c.style.width = (100 * (1 - k / X_Node_CHASHE.length) | 0) + "%";
            return;
          }
        }
      }
    }
    b = null;
  }
  X_ViewPort.asyncDispatch(X_EVENT_XTREE_READY);
  6 > (X_UA.Trident || X_UA.TridentMobile) ? c.outerHTML = "" : c.parentNode.removeChild(c);
  delete X_TEMP.asyncCreateTree;
  delete X_TEMP.bindElementToXnode;
  delete X_TEMP.X_Dom_useBuilder;
  delete X_TEMP._isCleanupTarget;
  X_HTMLParser_skipFixNesting = !1;
};
X_TEMP.bindElementToXnode = X_UA_DOM.W3C ? function(a, b, c) {
  var d = c.elems, e = d.length, g = c.xtext, f = c.skipCleanup, k;
  for (b.parent = a; c.j < e; ++c.j) {
    var h = d[c.j];
    var l = h.tagName && h.tagName.toUpperCase();
    if (1 !== h.nodeType && 3 !== h.nodeType || "!" === l || l && "/" === l.charAt(0)) {
      8 > X_UA.Presto || X_UA.Tasman ? X_TEMP._fixed_remove(h) : h.parentNode.removeChild(h);
    } else {
      if (b._tag) {
        if (3 === h.nodeType) {
          if (!(k = h.data) || " " === (k = X_String_cleanupWhiteSpace(k))) {
            8 > X_UA.Presto || X_UA.Tasman ? X_TEMP._fixed_remove(h) : h.parentNode.removeChild(h);
            continue;
          }
        } else {
          if (X_Dom_DTD_MOVE_TO_HEAD[l]) {
            continue;
          } else {
            if (b._tag === l) {
              if (b._rawObject = h, "/" === l.charAt(0) && (l = l.slice(1)), b._tag = l, b._flags |= X_NodeFlags_IN_TREE, b._flags &= X_Node_BitMask_RESET_DIRTY, h.UID = b._uid, c.xtext = null, "TEXTAREA" === l) {
                b.attr("value", b.html()).empty();
              } else {
                if (h.childNodes && h.childNodes.length) {
                  return ++c.j, {me:b, xnodes:X_Array_copy(b._xnodes), xtext:null, flag:0, i:0, l:b._xnodes.length, elems:X_Array_copy(h.childNodes), j:0, skipCleanup:f || X_Dom_DTD_SKIP_CLEANUP_TAGS[l]};
                }
              }
            }
          }
        }
        ++c.j;
        break;
      }
      if (3 !== h.nodeType) {
        if (!(k = b._text) || " " === X_String_cleanupWhiteSpace(k)) {
          b.kill();
          break;
        }
        alert(a._tag + ' > "' + b._text + '" !== ' + l + "\nprev : " + (b.prev() && b.prev().html()) + "\nnext : " + (b.next() && b.next().html()) + "\nhtml : " + h.outerHTML);
        break;
      }
      ++c.j;
      b._rawObject = h;
      b._flags |= X_NodeFlags_IN_TREE;
      b._flags &= X_Node_BitMask_RESET_DIRTY;
      b._text = h.data;
      f ? g && (g.text(g._text + b._text), b.kill()) : ((k = b._text) && " " !== (k = X_String_cleanupWhiteSpace(k)) || b.kill(), g ? (g.text(g._text + k), b.kill()) : b.text(k));
      c.xtext = g || b;
      break;
    }
  }
} : function(a, b, c) {
  var d = c.elems, e = c.j, g = d.length, f = c.xtext, k = c.skipCleanup;
  b.parent = a;
  if (b._tag) {
    for (; e < g; ++e, ++c.j) {
      f = d[e];
      var h = f.tagName;
      if ("!" !== h && "/" !== h.charAt(0) && b._tag === h) {
        ++c.j;
        b._rawObject = f;
        b._flags |= X_NodeFlags_IN_TREE;
        b._flags &= X_Node_BitMask_RESET_DIRTY;
        if (X_TEMP._isCleanupTarget(f)) {
          b.kill();
          break;
        }
        !b._id && f.setAttribute("id", "ie4uid" + b._uid);
        f.setAttribute("UID", b._uid);
        "INPUT" === h && (b._attrs ? b._attrs.type || (b._attrs.type = "text") : b._attrs = {type:"text"});
        a._flags |= X_NodeFlags_IE4_HAS_ELEMENT;
        c.xtext = null;
        if ("TEXTAREA" === h) {
          b.attr("value", b.html()).empty();
        } else {
          if (b._xnodes && b._xnodes.length) {
            return {me:b, xnodes:X_Array_copy(b._xnodes), xtext:null, flag:0, i:0, l:b._xnodes.length, elems:X_Array_copy(f.children), j:0, skipCleanup:k || X_Dom_DTD_SKIP_CLEANUP_TAGS[h]};
          }
        }
        break;
      }
    }
  } else {
    b._flags |= X_NodeFlags_IN_TREE, b._flags &= X_Node_BitMask_RESET_DIRTY, k ? f && (f.text(f._text + b._text), b.kill()) : (h = b._text) && " " !== (h = X_String_cleanupWhiteSpace(h)) ? f ? (f.text(f._text + h), b.kill()) : b.text(h) : (b.kill(), b = null), c.xtext = f || b, a._flags |= X_NodeFlags_IE4_HAS_TEXTNODE;
  }
};
var X_Plugin_FLASH_VERSION = (X_UA.Trident || X_UA.TridentMobile) && X_UA_ActiveX ? !(5.5 > (X_UA.Trident || X_UA.TridentMobile)) & X_UA_ActiveX ? function() {
  var a = X_Script_createActiveXObjectSafty("ShockwaveFlash.ShockwaveFlash");
  return parseFloat(a && a.GetVariable("$version").split("WIN ")[1]) || 0;
}() : 0 : parseFloat(X_Object_find(navigator, "plugins>Shockwave Flash>version") || 0), X_Plugin_SILVER_LIGHT_VERSION = (X_UA.Trident || X_UA.TridentMobile) && X_UA_ActiveX ? X_UA_ActiveX && 6 <= (X_UA.Trident || X_UA.TridentMobile) ? function() {
  for (var a = X_Script_createActiveXObjectSafty("AgControl.AgControl"), b = a ? 5 : 0; b; --b) {
    if (a.IsVersionSupported(b + ".0")) {
      return b;
    }
  }
  return 0;
}() : 0 : parseFloat(X_Object_find(navigator, "plugins>Silverlight Plug-In>version") || 0), X_Plugin_UNITY_VERSION = (X_UA.Trident || X_UA.TridentMobile) && X_UA_ActiveX ? 5.5 > (X_UA.Trident || X_UA.TridentMobile) || !X_UA_ActiveX ? 0 : function() {
  var a = X_Script_createActiveXObjectSafty("UnityWebPlayer.UnityWebPlayer.1");
  return a ? parseFloat(a.GetPluginVersion()) : 0;
}() : parseFloat(X_Object_find(navigator, "plugins>Unity Player>version") || 0), X_Plugin_GEARS_ENABLED = window.GearsFactory || (X_UA_ActiveX && 6 <= (X_UA.Trident || X_UA.TridentMobile) ? function() {
  return X_Script_createActiveXObjectSafty("Gears.Factory");
}() : X_Object_find(navigator, "mimeTypes>application/x-googlegears>enabledPlugin")), X_Plugin_WMP_VERSION = (X_UA.Trident || X_UA.TridentMobile) && X_UA_ActiveX ? function() {
  var a = X_Script_createActiveXObjectSafty("WMPlayer.OCX.7");
  return a ? parseFloat(a.versionInfo) : X_Script_createActiveXObjectSafty("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}") ? 6.4 : 0;
}() : 0;
X.Plugin = {Flash:X_Plugin_FLASH_VERSION, Silverlight:X_Plugin_SILVER_LIGHT_VERSION, Unity:X_Plugin_UNITY_VERSION, Gears:!!X_Plugin_GEARS_ENABLED, WMP:X_Plugin_WMP_VERSION};
var X_Plugin_Flash_Wrapper, X_Plugin_Flash_useObject = (X_UA.Trident || X_UA.TridentMobile) && !X_UA.Tasman, X_Plugin_Flash_WRAPPER_LIST = [];
function X_Plugin_Flash_bridge(a) {
  for (var b = X_Array_copy(arguments), c = X_Plugin_Flash_WRAPPER_LIST.length; c;) {
    if (X_Plugin_Flash_WRAPPER_LIST[--c]._id === a) {
      return b.shift(), X_Plugin_Flash_WRAPPER_LIST[c].dispatch({type:"message", data:b});
    }
  }
}
X_Plugin_FLASH_VERSION && (X_Plugin_Flash_Wrapper = X_Node.inherits("X.Plugin.Flash", X_Class.POOL_OBJECT, {Constructor:function(a, b) {
  X_Plugin_Flash_useObject ? this.Super("object", {classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0", id:a.id, name:a.id, width:a.width, height:a.height, html:['<param name="flashVars" value="', a.vars, '"><param name="movie" value="', a.src, '"><param name="quality" value="', a.quality, '"><param name="bgcolor" value="', a.bgcolor, '"><param name="allowfullscreen" value="', a.fullscreen, '"><param name="wmode" value="', 
  a.wmode, '"><param name="allowScriptAccess" value="', a.script, '"><param name="AllowNetworking" value="', a.network, '">'].join("")}, b) : this.Super("embed", {type:"application/x-shockwave-flash", pluginspage:"http://www.macromedia.com/go/getflashplayer", id:a.id, name:a.id, width:a.width, height:a.height, src:a.src, FlashVars:a.vars, quality:a.quality, bgcolor:a.bgcolor, allowFullScreen:a.fullscreen, wmode:a.wmode, allowScriptAccess:a.script, allowNetworking:a.network}, b);
  this.listenOnce("load", this, X_PluginFlash_handleEvent);
}, listen:function(a) {
  "message" === a && (X.Plugin._flashBridge = X_Plugin_Flash_bridge);
  return X_EventDispatcher_listen.apply(this, arguments);
}, flashVars:function(a) {
  return void 0 === a ? X_Plugin_Flash_useObject ? this.firstChild().attr("value") : this.attr("FlashVars") : X_Plugin_Flash_useObject ? (this.firstChild().attr("value", a), this) : this.attr("FlashVars", a);
}}));
function X_PluginFlash_handleEvent(a) {
}
;X.Util = {};
var X_NinjaIframe = X.Util.NinjaIframe = X_Node.inherits("NinjaIframe", {_iwin:null, _contentHTML:"", _name:"", _ready:!1, Constructor:function(a) {
  this._name = "hidden-iframe-" + X_Timer_now();
  this.Super("IFRAME", {className:"hidden-iframe", scrolling:"no", allowtransparency:"no", frameborder:0, tabindex:-1, name:this._name, id:this._name});
  9 > (X_UA.Trident || X_UA.TridentMobile) && this.attr("src", "about:blank");
  X_UA.WebKit || this.css({position:"absolute"});
  a && (this._contentHTML = a);
  this.appendTo(X_Node_systemNode).listenOnce(X_EVENT_KILL_INSTANCE, X_Util_NinjaIframe_handleEvent);
  X_ViewPort.listenOnce(X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent);
}, refresh:function(a) {
  this._ready = !1;
  if (!this._iwin) {
    return this._contentHTML = a, this;
  }
  5 <= (X_UA.Trident || X_UA.TridentMobile) && 6 > (X_UA.Trident || X_UA.TridentMobile) ? this._iwin.location.href = "about:blank" : this._iwin.location.reload();
  if (!X_Type_isString(a)) {
    return this;
  }
  this._contentHTML = a;
  9 > (X_UA.Trident || X_UA.TridentMobile) || X_Util_NinjaIframe_writeToIframe(this);
  return this;
}});
function X_Util_NinjaIframe_handleEvent(a) {
  var b = this._rawObject;
  switch(a.type) {
    case X_EVENT_AFTER_UPDATE:
      this._iwin = b.contentWindow || b.contentDocument && b.contentDocument.parentWindow || window.frames[this._name];
      if (X_UA.Trident || X_UA.TridentMobile) {
        this._iwin.name = this._name;
      }
      this.listen(9 > (X_UA.Trident || X_UA.TridentMobile) ? "readystatechange" : ["load", "error"], X_Util_NinjaIframe_handleEvent);
      if (!(9 > (X_UA.Trident || X_UA.TridentMobile))) {
        X_Util_NinjaIframe_writeToIframe(this);
        return;
      }
    case "readystatechange":
      if ("complete" !== b.readyState && "loaded" !== b.readyState) {
        break;
      }
      if (!this._ready) {
        X_Util_NinjaIframe_writeToIframe(this);
        break;
      }
    case "load":
      this.asyncDispatch("ninjaload");
      break;
    case "error":
      this.asyncDispatch("ninjaerror");
      break;
    case X_EVENT_KILL_INSTANCE:
      X_ViewPort.unlisten(X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent), this._iwin && this._iwin.close();
  }
  return X_CALLBACK_STOP_PROPAGATION;
}
function X_Util_NinjaIframe_writeToIframe(a) {
  var b = a._rawObject.contentDocument || a._iwin.document, c = a._contentHTML;
  a._ready = !0;
  delete a._contentHTML;
  b.open();
  b.writeln(c);
  b.close();
}
;var X_JSON = X.JSON = 8 <= (X_UA.Trident || X_UA.TridentMobile) && 9 > (X_UA.Trident || X_UA.TridentMobile) ? {stringify:function(a) {
  return unescape(JSON.stringify(a));
}, parse:JSON.parse} : window.JSON || {stringify:X_JSON_stringify, parse:X_JSON_parseTrustableString};
function X_JSON_stringify(a) {
  var b = "", c;
  for (c in a) {
    b && (b += ",");
    var d = (d = a[c]) || 0 === d ? d : null;
    b += '"' + c + '":' + (X_Type_isObject(d) ? X_JSON_stringify(d) : X_Type_isString(d) ? '"' + d + '"' : d);
  }
  return "{" + b + "}";
}
function X_JSON_parseTrustableString(a) {
  return a ? window.JSON ? JSON.parse(a) : eval("(" + a + ")") : a;
}
;var X_Util_Image_actualSize = {};
X.Util.Image = {getActualDimension:X_Util_Image_getActualDimension};
function X_Util_Image_getActualDimension(a) {
  var b;
  if (X_Type_isString(a)) {
    if (b = X_Util_Image_actualSize[X_URL_toAbsolutePath(a)]) {
      return b;
    }
    var c = X_Node_systemNode.create("img", {src:a}, {position:"absolute"});
    X_Node_startUpdate();
    a = X_UA_DOM.IE4 ? X_Node__ie4getRawNode(c) : c._rawObject;
    var d = !0;
  } else {
    if (a.constructor === X_Node) {
      c = a, a = X_UA_DOM.IE4 ? X_Node__ie4getRawNode(c)._rawObject : c._rawObject;
    } else {
      if (!X_Type_isHTMLElement(a)) {
        if (a.constructor === X_EventDispatcher && X_Type_isImage(a._rawObject)) {
          c = a, a = c._rawObject;
        } else {
          return;
        }
      }
    }
    if (b = X_Util_Image_actualSize[a.src]) {
      return b;
    }
  }
  if (a.naturalWidth) {
    return [a.naturalWidth, a.naturalHeight];
  }
  if (5 <= (X_UA.Trident || X_UA.TridentMobile)) {
    b = a.runtimeStyle;
    var e = b.width;
    var g = b.height;
    b.width = "auto";
    b.height = "auto";
    var f = a.width;
    var k = a.height;
    b.width = e;
    b.height = g;
  } else {
    e = f = a.width, g = k = a.height, a.removeAttribute && (a.removeAttribute("width"), a.removeAttribute("height"), f = a.width, k = a.height, a.width = e, a.height = g);
  }
  b = X_Util_Image_actualSize[a.src] = [f, k];
  d && c.kill();
  return b;
}
;X.XML = XMLWrapper;
function XMLWrapper(a) {
  a && (this._rawXML = a, this.tagName = a.tagName);
}
XMLWrapper.prototype.tagName = "";
XMLWrapper.prototype.length = 1;
XMLWrapper.prototype.parent = XMLWrapper_parent;
XMLWrapper.prototype.has = XMLWrapper_has;
XMLWrapper.prototype.get = XMLWrapper_get;
XMLWrapper.prototype.val = XMLWrapper_val;
XMLWrapper.prototype.find = XMLWrapper_find;
function XMLWrapper_parent() {
  return 1 === this.length ? this._rawXML && this._rawXML.parentNode ? new XMLWrapper(this._rawXML.parentNode) : null : 0 === this.length ? null : this[0].parentNode ? new XMLWrapper(this[0].parentNode) : null;
}
function XMLWrapper_has(a) {
  return !!this.find(a).length;
}
function XMLWrapper_get(a) {
  if (1 === this.length) {
    return this;
  }
  if (0 === this.length) {
    return null;
  }
  if (this._wraps && this._wraps[a]) {
    return this._wraps[a];
  }
  this._wraps || (this._wraps = []);
  return this[a] ? this._wraps[a] = new XMLWrapper(this[a]) : null;
}
function XMLWrapper_val(a, b) {
  switch(a) {
    case "number":
    case "int":
    case "boolean":
    case "string":
    case void 0:
      b = a, a = 0;
  }
  var c = a ? this.find(a) : this;
  c = 1 === c.length ? c._rawXML : c[0];
  if (!c) {
    switch(b) {
      case "number":
      case "int":
        return NaN;
      case "boolean":
        return !1;
      case "string":
        return "";
      default:
        return null;
    }
  }
  c = 1 === c.nodeType ? c.innerText || c.text || c.textContent : c.nodeValue;
  switch(b) {
    case "number":
      return parseFloat(c);
    case "int":
      return parseFloat(c) | 0;
    case "boolean":
      return !!X_String_parse(c);
  }
  return c || "";
}
function XMLWrapper_find(a) {
  var b = this.constructor === XMLListWrapper ? this : [this._rawXML], c = b, d = Array.prototype.push, e = [], g = 1 < b.length, f = !0, k, h;
  if (!X_Type_isString(a)) {
    return XMLListWrapper_0;
  }
  for (k = []; a.length;) {
    if (!l) {
      var l = X_Node_Selector__parse(a);
      if (X_Type_isNumber(l)) {
        return XMLListWrapper_0;
      }
      a = a.substr(l[0]);
      l = l[1];
      if (5 === l) {
        g = !0;
        c = b;
        k && k.length && d.apply(e, k);
        l = null;
        k = [];
        f = !0;
        continue;
      }
    }
    var p = l[0];
    var w = l[1];
    var m = l[2];
    var v = 1 === w ? m : "*";
    var q = "*" === v;
    if (!f) {
      if (k.length) {
        0 !== p && (c = k, k = []);
      } else {
        l = null;
        continue;
      }
    }
    var t = 0;
    var y = c.length;
    var u = -1;
    g = g || 1 < y;
    switch(p) {
      case 2:
        for (; t < y; ++t) {
          for (h = c[t].firstChild; h; h = h.nextSibling) {
            1 !== h.nodeType || !q && v !== h.tagName || (k[++u] = h);
          }
        }
        break;
      case 3:
        for (; t < y; ++t) {
          for (h = c[t].nextSibling; h; h = h.nextSibling) {
            if (1 === h.nodeType) {
              if (q || v === h.tagName) {
                k[++u] = h;
              }
              break;
            }
          }
        }
        break;
      case 4:
        for (f = []; t < y; ++t) {
          for (h = c[t].nextSibling; h; h = h.nextSibling) {
            if (1 === h.nodeType && (q || v === h.tagName)) {
              if (-1 !== f.indexOf(h)) {
                break;
              } else {
                f[f.length] = h, k[++u] = h;
              }
            }
          }
        }
        break;
      case 6:
        for (w = 0; t < y; ++t) {
          if (h = c[t].getAttributeNode(m)) {
            k[++u] = h;
          }
        }
        break;
      default:
        if (1 === p || f && 7 > w) {
          for (; t < y; ++t) {
            h = c[t], h.childNodes && h.childNodes.length && XMLWrapper_fetchElements(k, h, q ? null : v);
          }
        }
    }
    f = !1;
    switch(w) {
      case 2:
        var x = ["id", 1, m];
        break;
      case 3:
        x = ["class", 3, m];
        break;
      case 4:
        if (!(x = XMLWrapper_filter[m])) {
          return XMLListWrapper_0;
        }
        break;
      case 5:
        x = [m, l[3], l[4]];
        break;
      case 6:
        var n = !0;
        l = l[2];
        m = l[2];
        switch(l[1]) {
          case 1:
            x = ["tag", 1, m];
            break;
          case 2:
            x = ["id", 1, m];
            break;
          case 3:
            x = ["class", 3, m];
            break;
          case 4:
            if (!(x = XMLWrapper_filter[m])) {
              return [];
            }
            break;
          case 5:
            x = [m, l[3], l[4]];
        }break;
      case 7:
        k = b;
    }
    if (x && k.length) {
      if (x.m) {
        k = x.m({not:n, xml:!0}, k, l[3], l[4]);
      } else {
        if (X_Type_isFunction(x)) {
          for (q = [], t = 0, u = -1; h = k[t]; ++t) {
            !!x(h) ^ n && (q[++u] = h);
          }
        } else {
          for (q = [], l = x[0], w = x[1], x = x[2], 3 === w && (x = " " + x + " "), t = 0, u = -1, y = k.length; t < y; ++t) {
            h = k[t];
            m = h.getAttribute(l, 2);
            if ((v = null != m) && w) {
              switch(w) {
                case 1:
                  v = m === x;
                  break;
                case 2:
                  v = m !== x;
                  break;
                case 3:
                  v = -1 !== (" " + m + " ").indexOf(x);
                  break;
                case 4:
                  v = 0 === m.indexOf(x);
                  break;
                case 5:
                  v = m.lastIndexOf(x) + x.length === m.length;
                  break;
                case 6:
                  v = -1 !== m.indexOf(x);
                  break;
                case 7:
                  v = m === x || m.substring(0, x.length + 1) === x + "-";
              }
            }
            !!v ^ n && (q[++u] = h);
          }
        }
        k = q;
      }
    }
    x = null;
    n = !1;
    l = null;
  }
  if (g) {
    k && k.length && d.apply(e, k);
    y = e.length;
    if (0 === y) {
      return XMLListWrapper_0;
    }
    if (1 === y) {
      return new XMLWrapper(e[0]);
    }
    k = [];
    t = 0;
    for (u = -1; t < y; ++t) {
      h = e[t], -1 === k.indexOf(h) && (k[++u] = h);
    }
    XMLWrapper_sortElementOrder(e = [], k, this._rawXML.childNodes);
    t = 0;
    for (y = k.length; t < y; ++t) {
      -1 === e.indexOf(h = k[t]) && (e[e.length] = h);
    }
    k = e;
  }
  return 1 === k.length ? new XMLWrapper(k[0]) : new XMLListWrapper(k);
}
function XMLWrapper_sortElementOrder(a, b, c) {
  for (var d = c.length, e = 0, g, f, k; e < d; ++e) {
    f = c[e];
    if (-1 !== (g = b.indexOf(f))) {
      a[a.length] = f;
      b.splice(g, 1);
      if (1 === b.length) {
        return a[a.length] = b[0], b.length = 0, !0;
      }
      if (0 === b.length) {
        return !0;
      }
    }
    if ((k = f.childNodes) && XMLWrapper_sortElementOrder(a, b, k)) {
      return !0;
    }
  }
}
function XMLWrapper_fetchElements(a, b, c) {
  b = b.childNodes;
  for (var d = b.length, e = 0, g; e < d; ++e) {
    g = b[e], 1 === g.nodeType && (c && g.tagName !== c || (a[a.length] = g), g.childNodes && g.childNodes.length && XMLWrapper_fetchElements(a, g, c));
  }
}
function XMLWrapper_funcSelectorChild(a, b, c, d) {
  var e = [];
  c = c.not;
  for (var g = 0, f = -1, k, h, l, p; k = d[g]; ++g) {
    l = b || k.tagName;
    p = null;
    if (0 >= a) {
      for (h = k.previousSibling; h; h = h.previousSibling) {
        if (1 === h.nodeType && (b || l === h.tagName)) {
          p = !1;
          break;
        }
      }
    }
    if (null === p && 0 <= a) {
      for (h = k.nextSibling; h; h = h.nextSibling) {
        if (1 === h.nodeType && (b || l === h.tagName)) {
          p = !1;
          break;
        }
      }
    }
    null === p && (p = !0);
    p ^ c && (e[++f] = k);
  }
  return e;
}
function XMLWrapper_funcSelectorNth(a, b, c, d, e, g, f) {
  var k = X_Array_copy(e), h = [], l = {};
  d = d.not;
  for (var p = 0, w = -1, m, v, q, t, y; v = e[p]; ++p) {
    m = l[p];
    if (void 0 === m) {
      m = 0;
      q = v.parentNode[a];
      for (t = c || v.tagName; q; q = q[b]) {
        1 !== q.nodeType || !c && t !== q.tagName || (++m, y = k.indexOf(q), -1 === y && (k[y = k.length] = q), l[y] = 0 === g ? m === f : 0 === (m - f) % g && 0 <= (m - f) / g);
      }
      m = l[p];
    }
    m ^ d && (h[++w] = v);
  }
  return h;
}
var XMLWrapper_filter = {"first-child":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(-1, !0, a, b);
}}, "last-child":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(1, !0, a, b);
}}, "only-child":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(0, !0, a, b);
}}, "first-of-type":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(-1, !1, a, b);
}}, "last-of-type":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(1, !1, a, b);
}}, "only-of-type":{m:function(a, b) {
  return XMLWrapper_funcSelectorChild(0, !1, a, b);
}}, "nth-child":{m:function(a, b, c, d) {
  return XMLWrapper_funcSelectorNth("firstChild", "nextSibling", !0, a, b, c, d);
}}, "nth-last-child":{m:function(a, b, c, d) {
  return XMLWrapper_funcSelectorNth("lastChild", "previousSibling", !0, a, b, c, d);
}}, "nth-of-type":{m:function(a, b, c, d) {
  return XMLWrapper_funcSelectorNth("firstChild", "nextSibling", !1, a, b, c, d);
}}, "nth-last-of-type":{m:function(a, b, c, d) {
  return XMLWrapper_funcSelectorNth("lastChild", "previousSibling", !1, a, b, c, d);
}}, empty:{m:function(a, b) {
  for (var c = [], d = a.not, e = 0, g = -1, f, k, h; f = b[e]; ++e) {
    k = !0;
    for (h = f.firstChild; h; h = h.nextSibling) {
      if (1 === h.nodeType || 3 === h.nodeType && h.nodeValue) {
        k = !1;
        break;
      }
    }
    k ^ d && (c[++g] = f);
  }
  return c;
}}, contains:{m:function(a, b, c) {
  var d = [];
  a = a.not;
  for (var e = 0, g = -1, f, k = ""; f = b[e]; ++e) {
    switch(f.nodeType) {
      case 1:
        k = f.innerText || f.text || f.textContent;
        break;
      case 3:
        k = f.nodeValue;
    }
    -1 < k.indexOf(c) ^ a && (d[++g] = f);
  }
  return d;
}}};
function XMLListWrapper(a) {
  for (var b = 0, c = a ? a.length : 0; b < c; ++b) {
    this[b] = a[b];
  }
  this.length = c;
}
var XMLListWrapper_0 = new XMLListWrapper;
XMLListWrapper.prototype.length = 0;
XMLListWrapper.prototype._wraps = null;
XMLListWrapper.prototype.parent = XMLWrapper_parent;
XMLListWrapper.prototype.has = XMLWrapper_has;
XMLListWrapper.prototype.get = XMLWrapper_get;
XMLListWrapper.prototype.val = XMLWrapper_val;
XMLListWrapper.prototype.find = XMLWrapper_find;
var X_Window = X.Util.Window = X_EventDispatcher.inherits("X.Window", {Constructor:function(a) {
  var b = a.url, c = window.open(b || "", a.name || "", a.params || ""), d = a.html;
  X_ViewPort.listenOnce(X_EVENT_UNLOAD, this, X_Util_Window_handleEvent);
  this.listenOnce([X_EVENT_UNLOAD, X_EVENT_KILL_INSTANCE], X_Util_Window_handleEvent);
  X_Pair_create(this, {page:c, timerID:X_Timer_add(a.interval || 500, 0, this, X_Util_Window_onTimer)});
  !b && d && this.write(d);
}, closed:function() {
  var a = X_Pair_get(this);
  return a ? X_Script_try(X_Object_find, [a.page, "closed"]) : !0;
}, url:function(a) {
  var b = X_Pair_get(this);
  b && (b.page.location.href = a);
  return this;
}, write:function(a) {
  var b = X_Pair_get(this);
  (b = b && X_Script_try(X_Object_find, [b.page, "document"])) ? (b.open(), b.write(a || ""), b.close()) : this.asyncDispatch(X_EVENT_ERROR);
  return this;
}, find:function(a) {
  var b = X_Pair_get(this);
  if (b) {
    return X_Script_try(X_Object_find, [b.page, a]);
  }
}, focus:function() {
  var a = X_Pair_get(this);
  a && a.page.focus();
  return this;
}});
function X_Util_Window_onTimer(a) {
  a = X_Pair_get(this);
  if (this.closed()) {
    return this.asyncDispatch(X_EVENT_UNLOAD), delete a.timerID, X_CALLBACK_UN_LISTEN;
  }
}
function X_Util_Window_handleEvent(a) {
  var b = X_Pair_get(this), c = b && b.page;
  switch(a.type) {
    case X_EVENT_UNLOAD:
      this.kill();
      break;
    case X_EVENT_KILL_INSTANCE:
      c && !this.closed() && (9 < X_UA.IEHost ? c.close() : c.open("about:blank", "_self").close(), X_Pair_release(this, c)), b.timerID && X_Timer_remove(b.timerID), X_ViewPort.unlisten(X_EVENT_UNLOAD, this, X_Util_Window_handleEvent);
  }
}
;X.Net = X_EventDispatcher.inherits(X_Class.NONE, {Constructor:function(a, b) {
  var c, d, e;
  if (X_Type_isObject(c = a)) {
    if (X_Type_isString(d = c.xhr)) {
      var g = X_NET_TYPE_XHR;
    } else {
      if (X_Type_isString(d = c.jsonp)) {
        g = X_NET_TYPE_JSONP;
      } else {
        if (X_Type_isString(d = c.img || c.image)) {
          g = X_NET_TYPE_IMAGE;
        } else {
          if (X_Type_isString(d = c.form)) {
            g = X_NET_TYPE_FORM;
          } else {
            if (g = X_NET_NAME_TO_ID[c.type]) {
              d = c.url;
            } else {
              if (X_IS_DEV) {
                X_error("X.Net : Invalid type=" + c.type);
                return;
              }
            }
          }
        }
      }
    }
    if (X_IS_DEV && !X_Type_isString(d)) {
      X_error("X.Net : Invalid url=" + d);
      return;
    }
  } else {
    if (X_Type_isString(a)) {
      d = a, X_Type_isObject(c = b) ? g = c.type || X_NET_TYPE_XHR : (g = X_NET_TYPE_XHR, c = {url:d, method:"GET"});
    } else {
      if (X_IS_DEV) {
        X_error("X.Net : Args error!");
        return;
      }
    }
  }
  (e = c.auth) && delete c.auth;
  c = X_Object_deepCopy(c);
  e && (c.auth = e);
  c.params && g !== X_NET_TYPE_FORM && (d = X_URL_create(d, c.params), delete c.params);
  g === X_NET_TYPE_XHR && (c.method = c.method || (c.postdata ? "POST" : "GET"), c.dataType = c.dataType || X_URL_getEXT(d));
  c.netType = g;
  c.url = d;
  X_Pair_create(this, c);
  this.listen(X_EVENT_KILL_INSTANCE, X_NET_proxyDispatch);
  X_NET_QUEUE_LIST[X_NET_QUEUE_LIST.length] = this;
  !X_NET_currentQueue && X_NET_shiftQueue();
}, state:function() {
  return this === X_NET_currentQueue ? X_NET_completePhase ? 3 : 2 : 0 <= X_NET_QUEUE_LIST.indexOf(this) ? 1 : 0;
}});
var X_NET_IWrapper = function() {
};
X_NET_IWrapper.prototype.load = function() {
};
X_NET_IWrapper.prototype.cancel = function() {
};
X_NET_IWrapper.prototype.reset = function() {
};
var X_NET_TYPE_XHR = 1, X_NET_TYPE_JSONP = 2, X_NET_TYPE_FORM = 3, X_NET_TYPE_IMAGE = 4, X_NET_NAME_TO_ID = {xhr:X_NET_TYPE_XHR, jsonp:X_NET_TYPE_JSONP, form:X_NET_TYPE_FORM, img:X_NET_TYPE_IMAGE, image:X_NET_TYPE_IMAGE}, X_NET_QUEUE_LIST = [], X_XHR, X_JSONP, X_FormSender, X_ImgLoader, X_GadgetXHR, X_NET_currentWrapper, X_NET_currentQueue, X_NET_currentData, X_NET_completePhase;
function X_NET_proxyDispatch(a) {
  var b;
  switch(a.type) {
    case X_EVENT_KILL_INSTANCE:
      if (this === X_NET_currentQueue && X_NET_completePhase) {
        1 === X_NET_completePhase && this.unlisten(X_EVENT_COMPLETE, X_NET_proxyDispatch).dispatch(X_EVENT_COMPLETE), X_NET_shiftQueue(!0), X_Pair_release(this), X_NET_completePhase = 0;
      } else {
        if (this === X_NET_currentQueue) {
          X_NET_currentWrapper.cancel();
          X_NET_shiftQueue(!0);
          var c = !0;
        } else {
          -1 !== (a = X_NET_QUEUE_LIST.indexOf(this)) && (X_NET_QUEUE_LIST.splice(a, 1), c = !0);
        }
      }
      c && (this.dispatch(X_EVENT_CANCELED), this.dispatch({type:X_EVENT_COMPLETE, lastEventType:X_EVENT_CANCELED}), X_Pair_release(this));
      break;
    case X_EVENT_PROGRESS:
      this.dispatch(a);
      break;
    case X_EVENT_ERROR:
      if (401 === a.status && (b = X_Pair_get(this).auth)) {
        X_Pair_get(b).onAuthError(b, a);
      }
    case X_EVENT_SUCCESS:
      X_NET_completePhase = 1;
      this.listenOnce(X_EVENT_COMPLETE, X_NET_proxyDispatch).asyncDispatch(32, {type:X_EVENT_COMPLETE, lastEventType:a.type});
      a.target = a.currentTarget = this;
      this.asyncDispatch(a);
      break;
    case X_EVENT_COMPLETE:
      X_NET_completePhase = 2, this.kill();
  }
}
function X_NET_shiftQueue(a) {
  var b;
  if (X_NET_currentQueue) {
    if (!a) {
      return;
    }
    X_NET_currentWrapper.unlisten([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR], X_NET_currentQueue, X_NET_proxyDispatch).reset();
    X_NET_currentQueue = X_NET_currentWrapper = X_NET_currentData = null;
  }
  if (X_NET_QUEUE_LIST.length) {
    X_NET_currentQueue = a = X_NET_QUEUE_LIST.shift();
    X_NET_currentData = X_Pair_get(X_NET_currentQueue);
    switch(X_NET_currentData.netType) {
      case X_NET_TYPE_XHR:
        switch(X_NET_currentData.test) {
          case "gadget":
            X_NET_currentWrapper = X_GadgetXHR || X_TEMP.X_GadgetXHR_init();
            break;
          case "flash":
            break;
          default:
            X_NET_currentWrapper = X_XHR || X_TEMP.X_XHR_init();
        }if (b = X_NET_currentData.auth) {
          var c = X_Pair_get(b);
          switch(b.state()) {
            case 0:
            case 1:
            case 2:
              b.dispatch(X_EVENT_NEED_AUTH) & X_CALLBACK_PREVENT_DEFAULT ? X_NET_currentQueue === a && a.kill() : X_NET_currentQueue === a && (c.lazyRequests = c.lazyRequests || [], -1 === c.lazyRequests.indexOf(a) && c.lazyRequests.push(a), X_NET_currentQueue = null, X_NET_shiftQueue());
              return;
            case 3:
              X_NET_QUEUE_LIST.push(X_NET_currentQueue);
              X_NET_currentQueue = null;
              X_NET_shiftQueue();
              return;
          }
          c.updateRequest(b, X_NET_currentData);
        }
        break;
      case X_NET_TYPE_JSONP:
        X_NET_currentWrapper = X_JSONP || X_TEMP.X_JSONP_init();
        break;
      case X_NET_TYPE_FORM:
        X_NET_currentWrapper = X_FormSender || X_TEMP.X_FormSender_init();
        break;
      case X_NET_TYPE_IMAGE:
        X_NET_currentWrapper = X_ImgLoader || X_TEMP.X_ImgLoader_init();
    }
    X_NET_currentWrapper.listen([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR], X_NET_currentQueue, X_NET_proxyDispatch);
    X_NET_currentWrapper.load(X_NET_currentData);
  }
}
;var X_XHR_createW3C = window.XMLHttpRequest && function() {
  return X_XHR_w3c || (X_XHR_w3c = new XMLHttpRequest);
}, X_XHR_w3c = X_XHR_createW3C && X_XHR_createW3C(), X_XHR_cors = X_XHR_w3c && void 0 !== X_XHR_w3c.withCredentials, X_XHR_progress = X_XHR_w3c && void 0 !== X_XHR_w3c.onprogress, X_XHR_upload = X_XHR_w3c && !!X_XHR_w3c.upload, X_XHR_createXDR = window.XDomainRequest && function() {
  return X_XHR_xdr || (X_XHR_xdr = new XDomainRequest);
}, X_XHR_xdr = X_XHR_createXDR && X_XHR_createXDR(), X_XHR_msXMLVer = 0, X_XHR_msXMLName = "", X_XHR_msXML, X_XHR_createMSXML = X_UA_ActiveX && (5 <= (X_UA.Trident || X_UA.TridentMobile) && 7 > (X_UA.Trident || X_UA.TridentMobile) || X_URL_IS_LOCAL) && function() {
  return X_Script_createActiveXObjectSafty(X_XHR_msXMLName);
}, X_XHR_neverReuse = 9 > (X_UA.Trident || X_UA.TridentMobile), X_XHR_TYPE_FLASH = 8, X_XHR_TYPE_GADGET = 16;
X_XHR_createMSXML && function() {
  for (var a = "Msxml2.XMLHTTP.6.0 Msxml2.XMLHTTP.3.0 Msxml2.XMLHTTP.5.0 Msxml2.XMLHTTP.4.0 Msxml2.XMLHTTP Microsoft.XMLHTTP".split(" "), b = [6, 3, 5, 4, 2, 1], c = -1, d; 5 > c;) {
    if (d = X_Script_createActiveXObjectSafty(a[++c])) {
      X_XHR_msXMLVer = b[c];
      X_XHR_msXMLName = a[c];
      X_XHR_msXML = d;
      return;
    }
  }
  X_XHR_createMSXML = null;
}();
if (X_XHR_w3c || X_XHR_msXML) {
  X_TEMP.X_XHR_init = function() {
    X_XHR = X_Class_override(X_EventDispatcher(), X_TEMP.X_XHR_params, !0);
    delete X_TEMP.X_XHR_init;
    delete X_TEMP.X_XHR_params;
    return X_XHR;
  }, X_TEMP.X_XHR_params = {_rawType:X_EventDispatcher_EVENT_TARGET_XHR, _isXDR:!1, _isMsXML:!1, _method:"", _dataType:"", _busy:!1, _canceled:!1, _error:!1, _percent:0, _timerID:0, load:function(a) {
    var b = X_XHR._rawObject, c = a.method, d = a.url, e = !1 !== a.async, g = a.username, f = a.password, k = a.headers || {}, h = a.postdata || "", l = a.timeout || 20000, p = X_XHR._dataType = a.dataType, w = !X_URL_isSameDomain(d), m = X_URL_isLocal(d), v;
    if (!b || w !== X_XHR._isXDR || X_XHR_createMSXML && m !== X_XHR._isMsXML) {
      b && X_XHR.unlisten(["load", "readystatechange", "progress", "error", "timeout"]);
      var q = !0;
      X_XHR._rawObject = b = w ? X_XHR_cors ? X_XHR_createW3C() : X_XHR_createXDR() : m ? X_XHR_createMSXML ? X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML() : X_XHR_createW3C() : X_XHR_createW3C ? X_XHR_createW3C() : X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML();
      X_XHR._isXDR = X_XHR_createXDR && w;
      X_XHR._isMsXML = !X_XHR_createW3C || m && X_XHR_createMSXML;
    }
    b.open(c, d, e, g, f);
    switch(p) {
      case "":
      case "txt":
      case "text":
        X_XHR._dataType = "text";
        break;
      case "json":
        X_XHR._dataType = "json";
        break;
      case "document":
      case "xml":
      case "html":
      case "htm":
      case "svg":
      case "vml":
        X_XHR._dataType = "document";
        break;
      case "blob":
      case "arraybuffer":
        X_XHR._dataType = p;
    }
    void 0 !== b.responseType && X_XHR._dataType && (b.responseType = "json" === X_XHR._dataType ? 10 > (X_UA.Gecko || X_UA.Fennec) ? "moz-json" : X_UA.Gecko || X_UA.Fennec ? "json" : "" : X_XHR._dataType);
    if (!X_XHR._isMsXML && b.overrideMimeType) {
      switch(p) {
        case "document":
        case "xml":
        case "html":
        case "htm":
        case "svg":
        case "vml":
          var t = "text/xml";
          break;
        case "json":
          t = "application/json";
          break;
        case "mp3":
          t = "mpeg";
        case "weba":
          t = t || "webm";
        case "opus":
          t = t || "ogg";
        case "ogg":
        case "wav":
        case "aac":
          t = "audio/" + (t || p);
          break;
        case "m4a":
        case "mp4":
          t = "audio/x-" + p;
          break;
        case "jpeg":
        case "jpg":
        case "png":
        case "gif":
        case "bmp":
        case "ico":
          t = "text/plain; charset=x-user-defined";
      }
      (a.mimeType || t) && b.overrideMimeType(a.mimeType || t);
    }
    if (!X_XHR._isXDR && (X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : b.setRequestHeader)) {
      for (v in-1 !== "document json text".indexOf(X_XHR._dataType) && X_UA.WebKit && (k["If-Modified-Since"] = "Thu, 01 Jun 1970 00:00:00 GMT"), w || k["X-Requested-With"] || (k["X-Requested-With"] = "XMLHttpRequest"), "POST" !== c || k["Content-Type"] || (X_Type_isObject(h) ? k["Content-Type"] = "application/x-www-form-urlencoded" : k["Content-Type"] = "text/plain"), k) {
        void 0 !== k[v] && b.setRequestHeader(v, k[v] + "");
      }
    }
    X_XHR._isMsXML || void 0 === b.timeout ? X_XHR._timerID = X_Timer_once(l, X_XHR.onTimeout) : b.timeout = l;
    X_XHR._busy = !0;
    b.send(X_Type_isObject(h) ? X_String_serialize(h) : "" + h);
    e && 4 !== b.readyState ? q && (X_XHR._isMsXML ? b.onreadystatechange = X_XHR.handleEvent : X_XHR_progress || X_XHR._isXDR ? X_XHR.listen(["load", "progress", "error", "timeout"]) : 8 === (X_UA.Trident || X_UA.TridentMobile) ? X_XHR.listen(["readystatechange", "error", "timeout"]) : 7 === (X_UA.Trident || X_UA.TridentMobile) ? X_XHR.listen(["readystatechange", "error"]) : X_XHR.listen(["load", "readystatechange", "error", "timeout"]), X_XHR_upload && b.upload.addEventListener("progress", X_XHR.onUploadProgress)) : 
    X_Timer_once(32, X_XHR, [{type:"readystatechange"}]);
  }, cancel:function() {
    X_XHR._rawObject.abort();
    X_XHR._canceled = !0;
  }, reset:function() {
    X_XHR._method = X_XHR._dataType = "";
    X_XHR._canceled = X_XHR._busy = X_XHR._error = !1;
    X_XHR._timerID && X_Timer_remove(X_XHR._timerID);
    X_XHR._percent = X_XHR._timerID = 0;
    X_XHR._rawObject.abort();
    if (X_XHR._error || X_XHR_neverReuse && !X_XHR._isMsXML) {
      X_XHR_upload && X_XHR_w3c.upload.removeEventListener("progress", X_XHR.onUploadProgress), X_EventDispatcher_toggleAllEvents(X_XHR, !1), X_XHR._rawObject = null, X_XHR._isXDR ? (X_XHR_xdr = null, delete X_XHR._isXDR) : X_XHR_w3c = null, X_XHR.unlisten(["load", "readystatechange", "progress", "error", "timeout"]);
    }
  }, handleEvent:function(a) {
    function b(a) {
      if (a && (420 > X_UA.WebKit || 4 > X_UA.KHTML)) {
        var b = escape(a);
        !b.match("%u") && b.match("%") && (a = decodeURIComponent(b));
      }
      return a;
    }
    var c = X_XHR._rawObject, d = !X_XHR._canceled, e;
    switch(a && a.type || "readystatechange") {
      case "readystatechange":
        switch(c.readyState) {
          case 0:
          case 1:
            return;
          case 2:
            d && X_XHR.asyncDispatch({type:X_EVENT_PROGRESS, percent:0});
            return;
          case 3:
            d && X_XHR.asyncDispatch({type:X_EVENT_PROGRESS, percent:99.9 > X_XHR._percent ? 99.9 : (X_XHR._percent + 100) / 2});
            return;
          case 4:
            if (100 === X_XHR._percent) {
              return;
            }
            break;
          default:
            return;
        }case "load":
        if (!X_XHR._busy) {
          break;
        }
        X_XHR._percent = 100;
        X_XHR._busy = !1;
        a = c.status;
        X_XHR._isXDR ? e = {"Content-Type":c.contentType} : (X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : c.setRequestHeader) && (e = c.getAllResponseHeaders()) && (e = X_XHR_parseResponseHeaders(e));
        if (!a && "file:" === location.protocol || 100 > a && (a = 200) || 200 <= a && 400 > a || 1223 === a && (a = 204) || 0 === a && X_UA.AOSP || X_UA.WebKit && void 0 === a) {
          switch(X_XHR._dataType) {
            case "text":
              var g = X_Script_try(X_Object_find, [c, "responseText"]);
              g = b(g);
              break;
            case "json":
              g = X_Script_try(X_Object_find, [c, "response"]) || X_Script_try(X_Object_find, [c, "responseText"]);
              X_Type_isString(g) && (g = X_JSON_parseTrustableString(b(g)));
              break;
            case "document":
              g = c.responseXML || c.response || c.responseText;
              break;
            case "blob":
            case "arraybuffer":
              g = c.response || c.responseText;
          }
        }
        g ? X_XHR.asyncDispatch(32, {type:X_EVENT_SUCCESS, status:a || 200, response:g, headers:e || null}) : X_XHR.asyncDispatch(32, {type:X_EVENT_ERROR, status:a || 400, headers:e || null});
        break;
      case "progress":
        a.lengthComputable && (X_XHR._percent = a.loaded / a.total * 100, d && 100 > X_XHR._percent && X_XHR.asyncDispatch({type:X_EVENT_PROGRESS, percent:X_XHR._percent}));
        break;
      case "error":
        X_XHR._busy = !1;
        X_XHR._error = X_UA.Presto || X_UA.PrestoMobile || X_UA.WebKit;
        d && X_XHR.asyncDispatch(32, {type:X_EVENT_ERROR, status:c.status});
        break;
      case "timeout":
        X_XHR._busy = !1, X_XHR._error = !(!X_UA.Gecko && !X_UA.Fennec), X_XHR.asyncDispatch({type:X_EVENT_ERROR, timeout:!0, status:408});
    }
  }, onTimeout:function() {
    var a = X_XHR._rawObject, b = !X_XHR._canceled || !X_XHR._busy;
    if (b || 3 > a.readyState) {
      X_XHR._busy = !1, b && X_XHR.asyncDispatch({type:X_EVENT_ERROR, timeout:!0, status:408});
    }
    X_XHR._timerID = 0;
  }, onUploadProgress:X_XHR_upload && function(a) {
    !X_XHR._canceled && X_XHR.asyncDispatch({type:X_EVENT_PROGRESS, percent:X_XHR._percent, uploadPercent:a.loaded / a.total * 100});
  }};
}
function X_XHR_parseResponseHeaders(a) {
  var b = {}, c = 0, d;
  if (!a) {
    return b;
  }
  a = a.split("\r\n");
  for (d = a.length; c < d; ++c) {
    var e = a[c];
    var g = e.indexOf(": ");
    if (0 < g) {
      var f = e.substring(0, g);
      e = e.substring(g + 2);
      b[f] = e.split("\r\n").join("\n").split("\n");
    }
  }
  return b;
}
;X_TEMP.X_JSONP_cb = function(a, b, c, d) {
  a === X_JSONP_ACCESS_KEY && X_JSONP._busy && (X_JSONP._busy = !1, X_JSONP.asyncDispatch({type:b ? X_EVENT_SUCCESS : X_EVENT_ERROR, response:X_JSON_parseTrustableString(b)}), X_JSONP_errorTimerID && X_Timer_remove(X_JSONP_errorTimerID));
};
var X_JSONP_ACCESS_KEY = Math.random(), X_JSONP_CALLBACK_NAME = "__jsonpcb__", X_JSONP_maxOnloadCount, X_JSONP_onloadCount = 0, X_JSONP_errorTimerID;
X_TEMP.X_JSONP_init = function() {
  window[X_JSONP_CALLBACK_NAME] = X_TEMP.X_JSONP_cb;
  X_JSONP = X_Class_override(X_NinjaIframe(), X_TEMP.X_JSONP_params);
  delete X_TEMP.X_JSONP_cb;
  delete X_TEMP.X_JSONP_init;
  delete X_TEMP.X_JSONP_params;
  return X_JSONP;
};
X_TEMP.X_JSONP_params = {_busy:!1, _canceled:!1, load:function(a) {
  var b = a.url, c = a.callbackName;
  a = a.charset;
  var d = RegExp ? "js/libs/json2.js" : "js/libs/json2_regfree.js";
  if (!X_URL_isSameProtocol(b)) {
    return X_JSONP.asyncDispatch(X_EVENT_ERROR);
  }
  c || (c = X_URL_paramToObj(b.split("?")[1]).callback) || (b += "&callback=cb", c = "cb");
  a = a ? ' charset="' + a + '"' : "";
  X_UA.Presto || X_UA.PrestoMobile ? (b = [window.JSON ? "" : '<script src="' + d + '">\x3c/script>', "<script>", 'onunload=function(){im.onload=im.onerror=""};', "nw=+new Date;", "function ", c, "(o){if(nw){nw-=+new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw", window.JSON ? 18103 : 0, ");nw=0}}", "\x3c/script>", "<script", a, ' id="jp">\x3c/script>', '<img id="im" src="', b, '" onload="jp.src=im.src" onerror="jp.src=im.src">'], X_JSONP_maxOnloadCount = 
  2) : 5 > (X_UA.Trident || X_UA.TridentMobile) || X_UA.Tasman ? (b = ['<script id="jn">\x3c/script>', "<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw-16,", 18103, ")}", 'function t1(){document.all.jn.src="', d, '";id=setTimeout("t2()",16);nw=+new Date}', 'id=setTimeout("t1()",16);', 'function t2(){if(window.JSON){document.all.jp.src="', 
  b, '"}else{id=setTimeout("t2()",16)}}', "\x3c/script>"], X_JSONP_maxOnloadCount = 3) : 8 > (X_UA.Trident || X_UA.TridentMobile) ? (b = ['<script id="jn">\x3c/script>', "<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw-16,", 18103, ")}", 'function t1(){jn.src="', d, '";id=setTimeout(t2,16);nw=+new Date}', "id=setTimeout(t1,16);", 'function t2(){if(window.JSON){jp.src="', 
  b, '"}else{id=setTimeout(t2,16)}}', "\x3c/script>"], X_JSONP_maxOnloadCount = 3) : 9 > (X_UA.Trident || X_UA.TridentMobile) ? (b = ["<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "nw=0;", "function ", c, "(o){nw-=+new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",parent.X.JSON.stringify(o),-nw)}", 'function tm(){jp.src="', b, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"], X_JSONP_maxOnloadCount = 2) : 10 > (X_UA.Trident || 
  X_UA.TridentMobile) ? (b = ["<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=+new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw)}", 'function tm(){jp.src="', b, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"], X_JSONP_maxOnloadCount = 2) : window.JSON ? (b = ["<script>", "nw=+new Date;", "function ", c, "(o){if(nw){nw-=+new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + 
  ",JSON.stringify(o),-nw);nw=0}}", "\x3c/script>", "<script", a, ' src="', b, '">\x3c/script>'], X_JSONP_maxOnloadCount = 1) : (b = ["<script>", "function ", c, "(o){if(nw){nw-=new Date;parent." + X_JSONP_CALLBACK_NAME + "(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw,", 18103, ");nw=0}}", "nw=+new Date;", "\x3c/script>", '<script src="', d, '">\x3c/script>', "<script", a, ' src="', b, '">\x3c/script>'], X_JSONP_maxOnloadCount = 2);
  X_JSONP.refresh(b.join("")).listen(["ninjaload", "ninjaerror"], X_JSONP_iframeListener);
  X_JSONP._busy = !0;
}, cancel:function() {
  X_JSONP.reset();
  X_JSONP._canceled = !0;
}, reset:function() {
  X_JSONP._busy = X_JSONP._canceled = !1;
  X_JSONP.unlisten(["ninjaload", "ninjaerror"], X_JSONP_iframeListener);
  X_JSONP.refresh("");
  X_JSONP_errorTimerID && X_Timer_remove(X_JSONP_errorTimerID);
  X_JSONP_errorTimerID = X_JSONP_onloadCount = 0;
}};
function X_JSONP_iframeListener(a) {
  switch(a.type) {
    case "ninjaload":
      if (++X_JSONP_onloadCount < X_JSONP_maxOnloadCount) {
        return;
      }
      X_JSONP_errorTimerID = X_JSONP.asyncDispatch(1000, X_EVENT_ERROR);
      break;
    case "ninjaerror":
      X_JSONP.asyncDispatch(X_EVENT_ERROR);
  }
  return X_CALLBACK_UN_LISTEN;
}
;var X_FormSender_errorTimerID, X_FormSender_isLeave, X_FormSender_isSameDomain, X_FormSender_onloadCount = 0;
X_TEMP.X_FormSender_init = function() {
  X_FormSender = X_Class_override(X_NinjaIframe(), X_TEMP.X_FormSender_params);
  delete X_TEMP.X_FormSender_init;
  delete X_TEMP.X_FormSender_params;
  return X_FormSender;
};
function X_FormSender_escapeQuote(a) {
  return X_String_toChrReferanceForHtmlSafety(a);
}
X_TEMP.X_FormSender_params = {_busy:!1, _canceled:!1, load:function(a) {
  var b = a.params || {}, c = a.url, d = a.target, e = a.timeout, g;
  d = "_self" === d ? "_parent" : "_blank" === d ? "_self" : d || "_self";
  a = ['<form method="', X_FormSender_escapeQuote(a.method || "GET"), '" action="', X_FormSender_escapeQuote(c || ""), '" target="', X_FormSender_escapeQuote(d), '">'];
  X_FormSender_isLeave = "_top" === d || "_parent" === d;
  X_FormSender_isSameDomain = X_URL_isSameDomain(c);
  for (g in b) {
    a.push('<input type="hidden" name="', X_FormSender_escapeQuote(g), '" value="', X_FormSender_escapeQuote(b[g] || ""), '">');
  }
  a.push("</form><script>document.forms[0].submit();\x3c/script>");
  X_FormSender.refresh(a.join("")).listen(["ninjaload", "ninjaerror"], X_FormSender_iframeListener);
  0 < e && (X_FormSender_errorTimerID = X_FormSender.asyncDispatch(e, {type:X_EVENT_ERROR, timeout:!0}));
  X_FormSender._busy = !0;
}, cancel:function() {
  X_FormSender.reset();
  X_FormSender._canceled = !0;
}, reset:function() {
  X_FormSender._busy = X_FormSender._canceled = !1;
  X_FormSender.unlisten(["ninjaload", "ninjaerror"], X_FormSender_iframeListener).refresh("");
  X_FormSender_errorTimerID && X_Timer_remove(X_FormSender_errorTimerID);
  X_FormSender_errorTimerID = X_FormSender_onloadCount = 0;
}};
function X_FormSender_iframeListener(a) {
  switch(a.type) {
    case "ninjaload":
      if (X_FormSender_isLeave) {
        return;
      }
      1 === ++X_FormSender_onloadCount && (X_FormSender_isSameDomain ? (a = this._rawObject.contentDocument || this._iwin.document, X_FormSender.asyncDispatch({type:X_EVENT_SUCCESS, response:a && a.body ? a.body.innerHTML : ""})) : X_FormSender.asyncDispatch({type:X_EVENT_SUCCESS}));
      break;
    case "ninjaerror":
      X_FormSender.asyncDispatch(X_EVENT_ERROR);
  }
  return X_CALLBACK_UN_LISTEN;
}
;var X_ImgLoader_isElement, X_ImgLoader_0forError = !(X_UA.Trident || X_UA.TridentMobile) || 11 === (X_UA.Trident || X_UA.TridentMobile) || 11 === X_UA.IEHost;
X_TEMP.X_ImgLoader_init = function() {
  var a = new Image;
  X_ImgLoader_isElement = !(9 > (X_UA.Trident || X_UA.TridentMobile)) && X_Type_isHTMLElement(a);
  X_ImgLoader = X_Class_override(X_ImgLoader_isElement ? X_Node(a) : X_EventDispatcher(a), X_TEMP.X_ImgLoader_params);
  X_ImgLoader.listen(["load", "error"], X_ImgLoader_handleEvent);
  delete X_TEMP.X_ImgLoader_init;
  delete X_TEMP.X_ImgLoader_params;
  return X_ImgLoader;
};
X_TEMP.X_ImgLoader_params = {tick:0, timerID:0, finish:!1, abspath:"", delay:0, timeout:0, load:function(a) {
  this.abspath = X_URL_toAbsolutePath(a.url);
  this.delay = a.delay || 100;
  this.timeout = a.timeout || 5000;
  this._rawObject.src = this.abspath;
  8 > X_UA.Presto && this._rawObject.complete ? this.asyncDispatch("load") : this.timerID = X_Timer_add(this.delay, 0, this, X_ImgLoader_detect);
}, cancel:function() {
  var a = this._rawObject;
  a && a.abort && a.abort();
  this.finish = !0;
}, reset:function() {
  this.timerID && X_Timer_remove(this.timerID);
  this.timerID = this.tick = 0;
  this.finish = !1;
  this.abspath = "";
  this._rawObject.src = "";
}};
function X_ImgLoader_detect() {
  var a = this._rawObject;
  this.finish || (a && a.complete ? (this.finish = !0, a.width || (X_Timer_remove(this.timerID), this.timerID = this.asyncDispatch(X_EVENT_ERROR))) : this.timeout < (this.tick += this.delay) && (this.finish = !0, X_Timer_remove(this.timerID), this.timerID = this.asyncDispatch({type:X_EVENT_ERROR, timeout:!0})));
}
function X_ImgLoader_handleEvent(a) {
  var b = this._rawObject;
  if (this.abspath) {
    switch(a.type) {
      case "error":
        if (X_ImgLoader_0forError && b.width || this.finish) {
          break;
        }
        this.finish = !0;
        this.timerID && X_Timer_remove(this.timerID);
        this.timerID = this.asyncDispatch(this.timeout, X_EVENT_ERROR);
        break;
      case "load":
        this.finish = !0, this.timerID && X_Timer_remove(this.timerID), !X_UA.Presto && !X_UA.PrestoMobile || b.complete ? (a = X_Util_Image_getActualDimension(X_ImgLoader_isElement ? this : this.abspath), this.timerID = this.asyncDispatch({type:X_EVENT_SUCCESS, src:this.abspath, w:a[0], h:a[1]})) : this.timerID = this.asyncDispatch(X_EVENT_ERROR);
    }
  }
}
;var X_GadgetXHR_canUse = 5.5 <= (X_UA.Trident || X_UA.TridentMobile) || !(X_UA.Trident || X_UA.TridentMobile), X_GadgetXHR_iframeName = "gadgetProxy_" + (100000 * Math.random() | 0), X_GadgetXHR_GADGET_XML_URL = "http://pettanr.github.io/webframework/gadget/X.Net.XHRGadget.xml", X_GadgetXHR_GADGET_URL = "http://www.ig.gmodules.com/gadgets/ifr?url=" + encodeURIComponent(X_GadgetXHR_GADGET_XML_URL) + "&nocache=1", X_GadgetXHR_IMAGE_URL = "img/opacity0.gif", X_GadgetXHR_maxQueryLength = X_UA.Trident || 
X_UA.TridentMobile ? 2000 : 6000, X_GadgetXHR_useMessage = void 0 !== window.onmessage, X_GadgetXHR_requestBatches, X_GadgetXHR_requestOriginal, X_GadgetXHR_timerID, X_GadgetXHR_phase = -1, X_GadgetXHR_lastHashString, X_GadgetXHR_isReceiveBatches, X_GadgetXHR_receivedString = "";
function X_GadgetXHR_detectImageOverIframe() {
  var a = X_GadgetXHR._rawObject, b, c, d;
  if (a && (a = a.contentWindow || a.contentDocument && a.contentDocument.parentWindow || window.frames[X_GadgetXHR_iframeName]) && (b = a.frames) && (c = b.length)) {
    for (; c && !(d = X_Script_try(X_Object_find, [b[--c], "location>hash"]));) {
    }
    if (d && d !== X_GadgetXHR_lastHashString) {
      return X_GadgetXHR_lastHashString = d, X_GadgetXHR_workForReceivedMessage(d.substr(1), X_UA.Gecko || X_UA.Fennec ? unescape : decodeURIComponent);
    }
  }
}
function X_GadgetXHR_onMessageFromGadget(a) {
  a.source === window.frames[X_GadgetXHR_iframeName] && X_GadgetXHR_workForReceivedMessage(a.data, String);
}
function X_GadgetXHR_workForReceivedMessage(a, b) {
  var c = X_GadgetXHR._rawObject;
  c = (c.contentWindow || c.contentDocument && c.contentDocument.parentWindow || window.frames[X_GadgetXHR_iframeName]).location;
  switch(X_GadgetXHR_phase) {
    case -1:
    case 0:
      c.href = X_GadgetXHR_GADGET_URL + "#" + X_GadgetXHR_requestBatches.shift();
      if (X_GadgetXHR_requestBatches.length) {
        return X_GadgetXHR_useMessage || (X_GadgetXHR_timerID = X_Timer_add(16, 0, X_GadgetXHR_detectImageOverIframe)), X_CALLBACK_UN_LISTEN;
      }
      X_GadgetXHR_phase = 1;
      break;
    case 1:
      return c.href = X_GadgetXHR_GADGET_URL + "#_waiting_", X_GadgetXHR_phase = 2, X_GadgetXHR_useMessage || (X_GadgetXHR_timerID = X_Timer_add(333, 0, X_GadgetXHR_detectImageOverIframe)), X_CALLBACK_UN_LISTEN;
    case 2:
      if (X_GadgetXHR_isReceiveBatches) {
        if (X_GadgetXHR_receivedString += b(a), --X_GadgetXHR_isReceiveBatches) {
          c.href = X_GadgetXHR_GADGET_URL + "#_recived_" + X_GadgetXHR_isReceiveBatches;
          break;
        }
      } else {
        var d = parseFloat(a);
        if (1 < d) {
          return a = a.substr((d + ":").length), X_GadgetXHR_receivedString = b(a), X_GadgetXHR_isReceiveBatches = --d, c.href = X_GadgetXHR_GADGET_URL + "#_recived_" + X_GadgetXHR_isReceiveBatches, X_GadgetXHR_useMessage || (X_GadgetXHR_timerID = X_Timer_add(16, 0, X_GadgetXHR_detectImageOverIframe)), X_CALLBACK_UN_LISTEN;
        }
        X_GadgetXHR_receivedString = b(a);
      }
      X_GadgetXHR_lastHashString = "";
      c.href = X_GadgetXHR_GADGET_URL + "#_recived_";
      X_GadgetXHR_phase = 3;
      break;
    case 3:
      if ("ready" === a) {
        return X_GadgetXHR.asyncDispatch(X_JSON_parseTrustableString(X_GadgetXHR_receivedString)), X_GadgetXHR_receivedString = "", X_GadgetXHR._busy = !1, X_GadgetXHR_timerID = X_GadgetXHR_phase = 0, X_CALLBACK_UN_LISTEN;
      }
  }
}
X_TEMP.X_GadgetXHR_init = function() {
  var a = {len:X_GadgetXHR_maxQueryLength, itv:333, gck:X_UA.Gecko || X_UA.Fennec ? 1 : 0, err:X_EVENT_ERROR, suc:X_EVENT_SUCCESS};
  X_GadgetXHR_useMessage ? (a.tfo = location.protocol + "//" + location.host, 9 > (X_UA.Trident || X_UA.TridentMobile) ? window.attachEvent("onmessage", X_GadgetXHR_onMessageFromGadget) : window.addEventListener("message", X_GadgetXHR_onMessageFromGadget)) : a.img = X_URL_toAbsolutePath(X_GadgetXHR_IMAGE_URL);
  X_GadgetXHR = X_Class_override(X_Node_systemNode.create("iframe", {className:"hidden-iframe", name:X_GadgetXHR_iframeName, id:X_GadgetXHR_iframeName, src:X_GadgetXHR_GADGET_URL + "#" + encodeURIComponent(X_JSON_stringify(a)), scrolling:"no", allowtransparency:"no", frameborder:0, tabindex:-1}), X_TEMP.X_GadgetXHR_props);
  delete X_TEMP.X_GadgetXHR_init;
  delete X_TEMP.X_GadgetXHR_props;
  X_GadgetXHR_requestBatches = [];
  return X_GadgetXHR;
};
X_TEMP.X_GadgetXHR_props = {_busy:!1, _canceled:!1, _onloadCount:0, load:function(a) {
  var b = {}, c;
  X_GadgetXHR_requestOriginal = a;
  for (d in a) {
    switch(d) {
      case "url":
      case "postdata":
      case "method":
      case "dataType":
      case "headers":
      case "cashe":
        b[d] = a[d];
    }
  }
  a = X_GadgetXHR_maxQueryLength - X_GadgetXHR_GADGET_URL.length - 5;
  for (b = X.JSON.stringify(b); b.length;) {
    var d = a;
    for (c = encodeURIComponent(b.substr(0, d)); a < c.length;) {
      d = d * (2 + d / c.length) / 3 | 0, c = encodeURIComponent(b.substr(0, d));
    }
    X_GadgetXHR_requestBatches.push(c);
    b = b.substr(d);
  }
  1 < X_GadgetXHR_requestBatches.length && (X_GadgetXHR_requestBatches[0] = X_GadgetXHR_requestBatches.length + ":" + X_GadgetXHR_requestBatches[0]);
  X_GadgetXHR_useMessage || (X_GadgetXHR_timerID = X_Timer_add(333, 0, X_GadgetXHR_detectImageOverIframe));
  0 === X_GadgetXHR_phase && X_GadgetXHR_workForReceivedMessage();
  X_GadgetXHR._busy = !0;
}, cancel:function() {
  X_GadgetXHR._canceled = !0;
}, reset:function() {
  X_GadgetXHR._busy = X_GadgetXHR._canceled = !1;
  X_GadgetXHR._onloadCount = 0;
}};
var X_OAUTH2_authWindow, X_OAUTH2_authTimerID;
X.OAuth2 = X_EventDispatcher.inherits("X.OAuth2", X_Class.NONE, {Constructor:function(a) {
  var b;
  a = X_Object_copy(a);
  a.refreshMargin = a.refreshMargin || 300000;
  X_Pair_create(this, a);
  a.onAuthError = X_NET_OAUTH2_onXHR401Error;
  a.updateRequest = X_NET_OAUTH2_updateRequest;
  X_OAuth2_getAccessToken(this) && (b = X_OAuth2_getAccessTokenExpiry(this)) ? b < X_Timer_now() + a.refreshMargin ? this.refreshToken() : (a.oauth2State = 4, this.asyncDispatch(X_EVENT_SUCCESS)) : this.asyncDispatch(X_EVENT_NEED_AUTH);
  this.listen([X_EVENT_KILL_INSTANCE, X_EVENT_SUCCESS, X_EVENT_ERROR, X_EVENT_NEED_AUTH], X_OAUTH2_handleEvent);
}, state:function() {
  return X_Pair_get(this).oauth2State || 0;
}, requestAuth:function() {
  var a = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1];
  a && a.pointerType && !X_OAUTH2_authWindow && (a = X_Pair_get(this), a.net || a.oauth2State || (X_OAUTH2_authWindow = X_Window({url:X_URL_create(a.authorizeEndpoint, {response_type:"code", client_id:a.clientID, redirect_uri:a.redirectURI, scope:(a.scopes || []).join(" ")}), name:"oauthauthorize"}).listen(X_EVENT_UNLOAD, this, X_OAuth2_detectAuthPopup), X_OAUTH2_authTimerID = X_Timer_add(333, 0, this, X_OAuth2_detectAuthPopup), a.oauth2State = 1, this.asyncDispatch({type:X_EVENT_PROGRESS, message:"Start to auth."})));
}, cancelAuth:function() {
  var a = X_Pair_get(this);
  a.net && (a.net.kill(), delete a.net);
  1 === a.oauth2State && (X_OAUTH2_authWindow && (X_OAUTH2_authWindow.kill(), X_OAUTH2_authWindow = null), X_OAUTH2_authTimerID && X_Timer_remove(X_OAUTH2_authTimerID), X_OAUTH2_authTimerID = 0, this.asyncDispatch(X_EVENT_CANCELED));
}, refreshToken:function() {
  var a = X_Pair_get(this), b = X_OAuth2_getRefreshToken(this);
  b ? a.net || (a.refreshTimerID && (X_Timer_remove(a.refreshTimerID), delete a.refreshTimerID), a.oauth2State = 3, a.net = X.Net({xhr:a.tokenEndpoint, postdata:X_URL_objToParam({client_id:a.clientID, client_secret:a.clientSecret, grant_type:"refresh_token", refresh_token:b}), dataType:"json", headers:{Accept:"application/json", "Content-Type":"application/x-www-form-urlencoded"}, test:"gadget"}).listenOnce([X_EVENT_SUCCESS, X_EVENT_ERROR], this, X_OAuth2_responceHandler), this.asyncDispatch({type:X_EVENT_PROGRESS, 
  message:"Start to refresh token."})) : (a.oauth2State = 0, this.asyncDispatch(X_EVENT_NEED_AUTH));
}});
function X_OAUTH2_handleEvent(a) {
  var b = X_Pair_get(this);
  switch(a.type) {
    case X_EVENT_KILL_INSTANCE:
      this.cancelAuth();
    case X_EVENT_ERROR:
    case X_EVENT_NEED_AUTH:
      b.refreshTimerID && X_Timer_remove(b.refreshTimerID);
      break;
    case X_EVENT_SUCCESS:
      b.refreshTimerID && X_Timer_remove(b.refreshTimerID), X_OAuth2_getRefreshToken(this) && (b.refreshTimerID = X_Timer_once(X_OAuth2_getAccessTokenExpiry(this) - X_Timer_now() - b.refreshMargin, this, this.refreshToken));
  }
}
function X_OAuth2_detectAuthPopup(a) {
  a = X_Pair_get(this);
  var b;
  if (X_OAUTH2_authWindow.closed()) {
    var c = 0;
    this.asyncDispatch(X_EVENT_CANCELED);
  } else {
    if (b = X_OAUTH2_authWindow.find("location>search")) {
      a = X_Pair_get(this), a.code = X_URL_paramToObj(b.slice(1)).code, c = 2, X_OAuth2_authorizationCode(this, a), this.asyncDispatch({type:X_EVENT_PROGRESS, message:"Get code success, then authorization code."});
    }
  }
  if (0 <= c) {
    return a = a || X_Pair_get(this), a.oauth2State = c, X_OAUTH2_authWindow.kill(), X_OAUTH2_authWindow = null, X_OAUTH2_authTimerID = X_Timer_remove(X_OAUTH2_authTimerID), X_CALLBACK_UN_LISTEN;
  }
}
function X_OAuth2_authorizationCode(a, b) {
  b.net = X.Net({xhr:b.tokenEndpoint, postdata:X_URL_objToParam({client_id:b.clientID, client_secret:b.clientSecret, grant_type:"authorization_code", code:b.code, redirect_uri:b.redirectURI}), dataType:"json", headers:{Accept:"application/json", "Content-Type":"application/x-www-form-urlencoded"}, test:"gadget"}).listenOnce([X_EVENT_SUCCESS, X_EVENT_ERROR], a, X_OAuth2_responceHandler);
}
function X_OAuth2_responceHandler(a) {
  var b = a.response, c = X_Pair_get(this), d = 3 === c.oauth2State;
  delete c.net;
  switch(a.type) {
    case X_EVENT_SUCCESS:
      if (d && b.error) {
        X_OAuth2_removeRefreshToken(this);
        c.oauth2State = 0;
        this.asyncDispatch({type:X_EVENT_ERROR, message:"Refresh access token error."});
        this.asyncDispatch(X_EVENT_NEED_AUTH);
        break;
      }
      if (b.error) {
        c.oauth2State = 0;
        this.asyncDispatch({type:X_EVENT_ERROR, message:"Get new access token error."});
        this.asyncDispatch(X_EVENT_NEED_AUTH);
        break;
      }
      X_OAuth2_setAccessToken(this, b.access_token || "");
      d && !b.refresh_token || X_OAuth2_setRefreshToken(this, b.refresh_token || "");
      b.expires_in ? X_OAuth2_setAccessTokenExpiry(this, X_Timer_now() + 1000 * b.expires_in) : X_OAuth2_getAccessTokenExpiry(this) && X_OAuth2_removeAccessTokenExpiry(this);
      c.oauth2State = 4;
      this.asyncDispatch({type:X_EVENT_SUCCESS, message:d ? "Refresh access token success." : "Get new access token success."});
      break;
    case X_EVENT_ERROR:
      d ? (c.oauth2State = 0, this.asyncDispatch({type:X_EVENT_ERROR, message:"Refresh access token error."}), X_OAuth2_removeRefreshToken(this), this.asyncDispatch(X_EVENT_NEED_AUTH)) : "param" === X_OAuth2_getAuthMechanism(this) ? (c.oauth2State = 0, this.asyncDispatch({type:X_EVENT_ERROR, message:"network-error"})) : (c.oauth2State = 0, X_OAuth2_setAuthMechanism(this, "param"), this.asyncDispatch({type:X_EVENT_PROGRESS, message:"Refresh access token failed. retry header -> param. "}), X_OAuth2_authorizationCode(this, 
      c));
  }
}
function X_NET_OAUTH2_onXHR401Error(a, b) {
  var c = b.headers, d = !1;
  if ("param" !== X_OAuth2_getAuthMechanism(a)) {
    var e = (d = !X_NET_currentWrapper.isXDR || !!c) && (c["WWW-Authenticate"] || c["www-authenticate"]);
    X_Type_isArray(e) && (e = e.join("\n"));
  }
  e && -1 === e.indexOf(" error=") ? (this.oauth2State = 0, a.asyncDispatch(X_EVENT_NEED_AUTH)) : (e && -1 !== e.indexOf("invalid_token") || !d) && X_OAuth2_getRefreshToken(a) ? (X_OAuth2_removeAccessToken(a), this.oauth2State = 3, a.refreshToken()) : (X_OAuth2_removeAccessToken(a), this.oauth2State = 0, a.asyncDispatch(X_EVENT_NEED_AUTH));
}
function X_NET_OAUTH2_updateRequest(a, b) {
  var c = X_OAuth2_getAccessToken(a), d = X_OAuth2_getAuthMechanism(a), e = b.url;
  c && "param" === d && (b.url = X_URL_create(e, {bearer_token:encodeURIComponent(c)}));
  !c || d && "header" !== d || (d = b.headers || (b.headers = {}), d.Authorization = "Bearer " + c);
}
function X_OAuth2_getAccessToken(a) {
  return X_OAuth2_updateLocalStorage("", a, "accessToken");
}
function X_OAuth2_getRefreshToken(a) {
  return X_OAuth2_updateLocalStorage("", a, "refreshToken");
}
function X_OAuth2_getAccessTokenExpiry(a) {
  return parseFloat(X_OAuth2_updateLocalStorage("", a, "tokenExpiry")) || 0;
}
function X_OAuth2_getAuthMechanism(a) {
  return X_NET_currentWrapper === X_XHR && X_XHR_createXDR ? "param" : X_OAuth2_updateLocalStorage("", a, "AuthMechanism");
}
function X_OAuth2_setAccessToken(a, b) {
  X_OAuth2_updateLocalStorage("+", a, "accessToken", b);
}
function X_OAuth2_setRefreshToken(a, b) {
  X_OAuth2_updateLocalStorage("+", a, "refreshToken", b);
}
function X_OAuth2_setAccessTokenExpiry(a, b) {
  X_OAuth2_updateLocalStorage("+", a, "tokenExpiry", b);
}
function X_OAuth2_setAuthMechanism(a, b) {
  X_OAuth2_updateLocalStorage("+", a, "AuthMechanism", b);
}
function X_OAuth2_removeAccessToken(a) {
  X_OAuth2_updateLocalStorage("-", a, "accessToken");
}
function X_OAuth2_removeRefreshToken(a) {
  X_OAuth2_updateLocalStorage("-", a, "refreshToken");
}
function X_OAuth2_removeAccessTokenExpiry(a) {
  X_OAuth2_updateLocalStorage("-", a, "tokenExpiry");
}
function X_OAuth2_removeAuthMechanism(a) {
  X_OAuth2_updateLocalStorage("-", a, "AuthMechanism");
}
function X_OAuth2_updateLocalStorage(a, b, c, d) {
  var e = "+" === a ? "setItem" : "-" === a ? "removeItem" : "getItem";
  if (window.localStorage) {
    return window.localStorage[e](X_Pair_get(b).clientID + c, d);
  }
  b = X_Pair_get(b);
  switch(a) {
    case "+":
      b[c] = d;
      break;
    case "-":
      void 0 !== b[c] && delete b[c];
  }
  return b[c];
}
;var X_Audio_BACKENDS = [];
X_USE_AUDIO && (X_TEMP.onSystemReady.push(function() {
  for (var a = X.Audio.canPlay = {}, b = X_Audio_BACKENDS.length, c; b;) {
    c = X_Audio_BACKENDS[--b], X_Object_override(a, c.canPlay), X.Audio[c.backendName] = c.backendID;
  }
}), X.Audio = X_EventDispatcher.inherits("X.Audio", X_Class.NONE, {source:"", backendName:"", Constructor:function(a, b) {
  X_Audio_startDetectionBackend(X_Audio_BACKENDS[0], this, X_Type_isArray(a) ? X_Array_copy(a) : [a], b || {});
  this.listenOnce([X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE, X_EVENT_KILL_INSTANCE], X_Audio_handleEvent);
  X_ViewPort.listenOnce(X_EVENT_UNLOAD, this, X_Audio_handleEvent);
}, play:function(a, b, c, d, e) {
  var g = X_Pair_get(this);
  g && g.play(a, b, c, d, e);
  return this;
}, seek:function(a) {
  var b = X_Pair_get(this);
  b && b.seek(a);
  return this;
}, pause:function() {
  var a = X_Pair_get(this);
  a && a.pause();
  return this;
}, state:function(a) {
  var b = X_Pair_get(this);
  if (void 0 === a) {
    return b ? b.getState() : {startTime:-1, endTime:-1, loopStartTime:-1, loopEndTime:-1, currentTime:-1, loop:!1, looded:!1, error:0, autoplay:!1, playing:!1, source:this.source, duration:0, volume:0.5};
  }
  b && b.setState(a);
  return this;
}, loop:function(a) {
  var b = X_Pair_get(this);
  b && b.loop(a);
  return this;
}, volume:function(a) {
  var b = X_Pair_get(this);
  b && b.volume(a);
  return this;
}, currentTime:function(a) {
  var b = X_Pair_get(this);
  b && b.currentTime(a);
  return this;
}, isPlaying:function() {
  var a = X_Pair_get(this);
  return a && a.playing;
}}));
function X_Audio_handleEvent(a) {
  switch(a.type) {
    case X_EVENT_BACKEND_READY:
      var b = X_Audio_BACKENDS[a.backendID];
      this.unlisten(X_EVENT_BACKEND_NONE, X_Audio_handleEvent);
      this.source = a.source;
      this.backendName = b.backendName;
      X_Pair_create(this, b.klass(this, a.source, a.option, a.ext));
      this.listenOnce(X_EVENT_READY, X_Audio_handleEvent);
      break;
    case X_EVENT_READY:
      a = X_Pair_get(this);
      (a.autoplay || a._playReserved) && a.actualPlay();
      delete a._playReserved;
      break;
    case X_EVENT_BACKEND_NONE:
    case X_EVENT_UNLOAD:
      this.kill();
      break;
    case X_EVENT_KILL_INSTANCE:
      if (X_ViewPort.unlisten(X_EVENT_UNLOAD, this, X_Audio_handleEvent), b = X_Pair_get(this)) {
        b.kill(), X_Pair_release(this, b);
      }
  }
}
function X_Audio_startDetectionBackend(a, b, c, d) {
  var e = c[0] || "", g = X_URL_paramToObj(X_URL_getHash(e)), f = g.ext || X_URL_getEXT(e);
  e && a ? (c = [b, c, d, e, f], c[5] = c, b.listenOnce(X_EVENT_COMPLETE, a, X_Audio_onEndedDetection, c), a.detect(b, f, g)) : b.asyncDispatch(X_EVENT_BACKEND_NONE);
}
function X_Audio_onEndedDetection(a, b, c, d, e, g, f) {
  var k = X_Audio_BACKENDS.indexOf(this);
  a.canPlay ? (c = {type:X_EVENT_BACKEND_READY, option:d, source:e.split("#")[0], backendName:this.backendName, backendID:k, ext:g}, 1 === this.backendID && (c.needTouchForPlay = X_WebAudio_isNoTouch), 2 === this.backendID && (c.needTouchForLoad = X_HTMLAudio_need1stTouch), b.asyncDispatch(c)) : (f[3] = e = c[c.indexOf(e) + 1]) ? (c = X_URL_paramToObj(X_URL_getHash(e)), f[4] = g = c.ext || X_URL_getEXT(e), b.listenOnce(X_EVENT_COMPLETE, this, X_Audio_onEndedDetection, f), this.detect(b, g, c)) : 
  (e = X_Audio_BACKENDS[k + 1]) ? X_Audio_startDetectionBackend(e, b, c, d) : b.asyncDispatch(X_EVENT_BACKEND_NONE);
}
if (X_USE_AUDIO) {
  var X_AudioBase = X_EventDispatcher.inherits("X.AudioBase", X_Class.ABSTRACT, {dispatcher:null, startTime:0, endTime:-1, loopStartTime:-1, loopEndTime:-1, seekTime:-1, duration:0, playing:!1, error:0, autoLoop:!1, looped:!1, autoplay:!1, gain:0.5, _playReserved:!1, play:function(a, b, c, d, e) {
    0 <= a && this.setState({currentTime:a, startTime:a, endTime:b, loop:c, looped:!1, loopStartTime:d, loopEndTime:e});
    this.actualPlay();
  }, seek:function(a) {
    a < X_Audio_getEndTime(this) && this.setState({currentTime:a});
  }, pause:function() {
    this.seekTime = this.getActualCurrentTime();
    this.playing && this.actualPause();
  }, loop:function(a) {
    if (void 0 === a) {
      return this.autoLoop;
    }
    this.setState({loop:a});
  }, volume:function(a) {
    if (void 0 === a) {
      return this.gain;
    }
    this.setState({volume:a});
  }, currentTime:function(a) {
    if (void 0 === a) {
      return this.playing ? this.getActualCurrentTime() : this.seekTime;
    }
    this.setState({currentTime:a});
  }, getState:function() {
    return {startTime:this.startTime, endTime:0 > this.endTime ? this.duration : this.endTime, loopStartTime:0 > this.loopStartTime ? this.startTime : this.loopStartTime, loopEndTime:0 > this.loopEndTime ? this.endTime || this.duration : this.loopEndTime, loop:this.autoLoop, looped:this.looped, volume:this.gain, playing:this.playing, duration:this.duration, autoplay:this.autoplay, currentTime:this.playing ? this.getActualCurrentTime() : this.seekTime, error:this.getActualError ? this.getActualError() : 
    this.error};
  }, setState:function(a) {
    var b = this.playing, c, d = 0, e = 0, g = 0;
    for (c in a) {
      var f = a[c];
      switch(X_AUDIO_STATE[c]) {
        case X_AUDIO_STATE.currentTime:
          f = X_Audio_timeStringToNumber(f);
          X_Type_isNumber(f) && (b ? this.getActualCurrentTime() !== f && (e = 2, this.seekTime = f) : this.seekTime = f);
          break;
        case X_AUDIO_STATE.startTime:
          (f = X_Audio_timeStringToNumber(f)) || 0 === f ? this.startTime !== f && (this.startTime = f) : delete this.startTime;
          break;
        case X_AUDIO_STATE.endTime:
          (f = X_Audio_timeStringToNumber(f)) || 0 === f ? this.endTime !== f && (this.endTime = f, b && (d = 1)) : (delete this.endTime, b && (d = 1));
          break;
        case X_AUDIO_STATE.loopStartTime:
          (f = X_Audio_timeStringToNumber(f)) || 0 === f ? this.loopStartTime !== f && (this.loopStartTime = f) : delete this.loopStartTime;
          break;
        case X_AUDIO_STATE.loopEndTime:
          (f = X_Audio_timeStringToNumber(f)) || 0 === f ? this.loopEndTime !== f && (this.loopEndTime = f, b && (d = 1)) : (delete this.loopEndTime, b && (d = 1));
          break;
        case X_AUDIO_STATE.looped:
          X_Type_isBoolean(f) && this.looped !== f && (this.looped = f, b && (e = 2));
          break;
        case X_AUDIO_STATE.loop:
          X_Type_isBoolean(f) && this.autoLoop !== f && (this.autoLoop = f);
          break;
        case X_AUDIO_STATE.autoplay:
          X_Type_isBoolean(f) && this.autoplay !== f && (this.autoplay = f);
          break;
        case X_AUDIO_STATE.volume:
          X_Type_isNumber(f) && (f = 0 > f ? 0 : 1 < f ? 1 : f, this.gain !== f && (this.gain = f, b && (g = 4)));
          break;
        case X_AUDIO_STATE.useVideo:
          break;
        default:
          alert("bad arg! " + c);
      }
    }
    if (!(this.endTime < this.startTime || (0 > this.loopEndTime ? this.endTime : this.loopEndTime) < (0 > this.loopStartTime ? this.startTime : this.loopStartTime) || X_Audio_getEndTime(this) < this.seekTime)) {
      return (f = d + e + g) && this.playing && this.afterUpdateState(f);
    }
  }});
}
var X_AUDIO_STATE = {startTime:1, endTime:2, loopStartTime:3, loopEndTime:4, loop:5, looped:6, volume:7, playing:8, duration:9, autoplay:10, currentTime:11, error:12, useVideo:13};
function X_Audio_timeStringToNumber(a) {
  var b = 0, c = 0, d = 0;
  if (X_Type_isNumber(a)) {
    return a;
  }
  if (X_Type_isString(a) && a.length) {
    a = a.split(".");
    var e = parseFloat((a[1] + "000").substr(0, 3)) || 0;
    a = a[0].split(":");
    if (!(3 < a.length)) {
      switch(a.length) {
        case 1:
          b = parseFloat(a[0]) || 0;
          break;
        case 2:
          c = parseFloat(a[0]) || 0;
          b = parseFloat(a[1]) || 0;
          break;
        case 3:
          d = parseFloat(a[0]) || 0, c = parseFloat(a[1]) || 0, b = parseFloat(a[2]) || 0;
      }
      e = 1000 * (3600 * d + 60 * c + b) + e;
      return 0 > e ? 0 : e;
    }
  }
}
function X_Audio_getStartTime(a, b, c) {
  var d = a.seekTime;
  c && delete a.seekTime;
  return 0 <= d ? a.duration <= d || b < d ? 0 : d : a.looped && 0 <= a.loopStartTime ? a.duration <= a.loopStartTime || b < a.loopStartTime ? 0 : a.loopStartTime : 0 > a.startTime || a.duration <= a.startTime ? 0 : a.startTime;
}
function X_Audio_getEndTime(a) {
  var b = a.duration;
  return a.looped && 0 <= a.loopEndTime ? b <= a.loopEndTime ? b : a.loopEndTime : 0 > a.endTime || b <= a.endTime ? b : a.endTime;
}
;if (X_USE_AUDIO) {
  var X_Audio_constructor = 525 <= X_UA.WebKit && 528 > X_UA.WebKit ? function(a, b) {
    b = document.createElement("audio");
    b.src = a;
    b.load();
    return b;
  } : 2 > X_UA.Android ? null : window.Audio || window.HTMLAudioElement, X_Audio_blinkOperaFix = X_UA.Opera && X_UA.Chromium && (X_UA.Win32 || X_UA.Win64), X_Audio_codecs;
  X_Audio_constructor && (X_TEMP.rawAudio = new X_Audio_constructor(""), X_TEMP.rawAudio.canPlayType ? (X_Audio_codecs = {mp3:X_TEMP.rawAudio.canPlayType("audio/mpeg"), opus:X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="opus"'), ogg:X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="vorbis"'), wav:X_TEMP.rawAudio.canPlayType('audio/wav; codecs="1"'), aac:X_TEMP.rawAudio.canPlayType("audio/aac"), m4a:X_TEMP.rawAudio.canPlayType("audio/x-m4a") + X_TEMP.rawAudio.canPlayType("audio/m4a") + X_TEMP.rawAudio.canPlayType("audio/aac"), 
  mp4:X_TEMP.rawAudio.canPlayType("audio/x-mp4") + X_TEMP.rawAudio.canPlayType("audio/mp4") + X_TEMP.rawAudio.canPlayType("audio/aac"), weba:X_TEMP.rawAudio.canPlayType('audio/webm; codecs="vorbis"')}, function(a, b, c) {
    for (b in a) {
      (c = (c = a[b]) && !!c.split("no").join("")) ? a[b] = !0 : delete a[b];
    }
    X_Audio_blinkOperaFix && delete a.mp3;
  }(X_Audio_codecs)) : (X_Audio_codecs = {mp3:X_UA.Trident || X_UA.TridentMobile || X_UA.Chromium || X_UA.ChromiumMobile || X_UA.Samsung || (X_UA.Win32 || X_UA.Win64) && X_UA.WebKit, ogg:5 <= (X_UA.Gecko || X_UA.Fennec) || X_UA.Chromium || X_UA.ChromiumMobile || X_UA.Samsung || X_UA.Presto || X_UA.PrestoMobile, wav:X_UA.Gecko || X_UA.Fennec || X_UA.Presto || X_UA.PrestoMobile || (X_UA.Win32 || X_UA.Win64) && X_UA.WebKit, aac:X_UA.Trident || X_UA.TridentMobile || X_UA.WebKit, m4a:X_UA.Trident || X_UA.TridentMobile || 
  X_UA.WebKit, mp4:X_UA.Trident || X_UA.TridentMobile || X_UA.WebKit, weba:2 <= (X_UA.Gecko || X_UA.Fennec) || 10.6 <= (X_UA.Presto || X_UA.PrestoMobile)}, function(a, b) {
    for (b in a) {
      a[b] ? a[b] = !0 : delete a[b];
    }
  }(X_Audio_codecs)), X_Audio_blinkOperaFix && (X_Audio_constructor = null, delete X_TEMP.rawAudio));
  var X_WebAudio_Context = (!(X_UA.SafariMobile || X_UA.iOSWebView) || (!X_UA.iPhone || 6 <= X_UA.iPhone.min) && (!X_UA.iPad || 3 <= X_UA.iPad.min) && (!X_UA.iPod || 5 <= X_UA.iPod.min)) && !(X_UA.Fennec && !(4 <= X_UA.Android)) && !X_UA.AOSP && !(5 > X_UA.ChromeWebView) && (window.AudioContext || window.webkitAudioContext || window.mozAudioContext), X_WebAudio_context, X_WebAudio_BUFFER_LIST = [], X_WebAudio_need1stTouch = X_UA.SafariMobile || X_UA.iOSWebView || X_UA.Samsung || X_UA.ChromeWebView || 
  X_UA.ChromiumMobile || 66 <= X_UA.Chromium || 604 <= X_UA.WebKit, X_WebAudio_isNoTouch = X_WebAudio_need1stTouch, X_WebAudio_needRateFix = 10 > (X_UA.SafariMobile || X_UA.iOSWebView), X_WebAudio, X_WebAudio_BufferLoader, X_WebAudio_fpsFix;
  X_WebAudio_Context && (X_WebAudio_context = new X_WebAudio_Context, X_WebAudio_needRateFix && (X_TEMP.webAudioSampleRateFix = function(a) {
    X_TEMP.webAudioDummyPlay(a);
    X_WebAudio_context.close && X_WebAudio_context.close();
    X_WebAudio_context = new X_WebAudio_Context;
    X_TEMP.webAudioDummyPlay(a);
    delete X_TEMP.webAudioSampleRateFix;
    delete X_TEMP.webAudioDummyPlay;
  }, X_TEMP.webAudioDummyPlay = function(a, b) {
    b = X_WebAudio_context.createBufferSource();
    b.buffer = X_WebAudio_context.createBuffer(1, 1, a);
    b.connect(X_WebAudio_context.destination);
    b.start ? b.start(0) : b.noteOn ? b.noteOn(0) : b.noteGrainOn(0);
  }), X_WebAudio_BufferLoader = X_EventDispatcher.inherits("X.WebAudio.BufferLoader", X_Class.POOL_OBJECT, {audioUrl:"", xhr:null, onDecodeSuccess:null, onDecodeError:null, audioBuffer:null, errorState:0, webAudioList:null, Constructor:function(a, b) {
    this.webAudioList = [a];
    this.audioUrl = b;
    this.xhr = X.Net({xhr:b, dataType:"arraybuffer"}).listen(X_EVENT_PROGRESS, this).listenOnce([X_EVENT_SUCCESS, X_EVENT_COMPLETE], this);
    X_WebAudio_BUFFER_LIST.push(this);
  }, handleEvent:function(a) {
    var b;
    switch(a.type) {
      case X_EVENT_PROGRESS:
        var c = 0;
        for (b = this.webAudioList.length; c < b; ++c) {
          this.webAudioList[c].dispatch({type:X_EVENT_PROGRESS, percent:a.percent});
        }
        return;
      case X_EVENT_SUCCESS:
        8 > (X_UA.SafariMobile || X_UA.iOSWebView) || !X_WebAudio_context.decodeAudioData ? this._onDecodeSuccess(X_WebAudio_context.createBuffer(a.response, !1)) : X_WebAudio_context.decodeAudioData && X_WebAudio_context.decodeAudioData(a.response, this.onDecodeSuccess = X_Closure_create(this, this._onDecodeSuccess), this.onDecodeError = X_Closure_create(this, this._onDecodeError));
        break;
      case X_EVENT_COMPLETE:
        this.errorState = 1, this.asyncDispatch(X_EVENT_COMPLETE);
    }
    this.xhr.unlisten([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_COMPLETE], this);
    delete this.xhr;
  }, _onDecodeSuccess:function(a) {
    this.onDecodeSuccess && this._onDecodeComplete();
    a ? this.audioBuffer = a : this.errorState = 2;
    this.asyncDispatch(X_EVENT_COMPLETE);
  }, _onDecodeError:function() {
    this._onDecodeComplete();
    this.errorState = 2;
    this.asyncDispatch(X_EVENT_COMPLETE);
  }, _onDecodeComplete:function() {
    X_Closure_correct(this.onDecodeSuccess);
    delete this.onDecodeSuccess;
    X_Closure_correct(this.onDecodeError);
    delete this.onDecodeError;
  }, unregister:function(a) {
    var b = this.webAudioList;
    a = b.indexOf(a);
    0 < a && (b.splice(a, 1), b.length || (this.xhr && this.xhr.kill(), this.kill()));
  }}), X_WebAudio = X_AudioBase.inherits("X.WebAudio", X_Class.POOL_OBJECT, {loader:null, _startPos:0, _endPosition:0, _startTime:0, _interval:0, audioBuffer:null, bufferSource:null, gainNode:null, bufferPlay:"", bufferStop:"", Constructor:function(a, b, c, d) {
    d = 0;
    var e = X_WebAudio_BUFFER_LIST.length;
    X_UA.Android && (X_UA.ChromiumMobile || X_UA.ChromeWebView || X_UA.Samsung) && !X_WebAudio_fpsFix && (X_Node_systemNode.create("div", {id:"fps-slowdown-make-sound-noisy"}), X_WebAudio_fpsFix = !0);
    for (; d < e; ++d) {
      var g = X_WebAudio_BUFFER_LIST[d];
      if (g.audioUrl === b) {
        this.loader = g;
        g.webAudioList.push(this);
        break;
      }
    }
    this.loader || (this.loader = g = X_WebAudio_BufferLoader(this, b));
    this.dispatcher = a || this;
    this.setState(c);
    this.listenOnce(X_EVENT_KILL_INSTANCE, this.onKill);
    g.audioBuffer || g.errorState ? this._onLoadBufferComplete() : g.listenOnce(X_EVENT_COMPLETE, this, this._onLoadBufferComplete);
    X_WebAudio_isNoTouch && (X_TEMP.xWebAudioInstances = X_TEMP.xWebAudioInstances || [], X_TEMP.xWebAudioInstances.push(this));
  }, onKill:function() {
    this.loader.unlisten(X_EVENT_COMPLETE, this, this._onLoadBufferComplete).unregister(this);
    delete this.audioBuffer;
    this.playing && this.actualPause();
    this.bufferSource && this._sourceDispose();
    this.gainNode && this.gainNode.disconnect();
    X_WebAudio_isNoTouch && X_TEMP.xWebAudioInstances.splice(X_TEMP.xWebAudioInstances.indexOf(this), 1);
  }, _onLoadBufferComplete:function(a) {
    var b = this.loader, c = b.audioBuffer;
    a && b.unlisten(X_EVENT_COMPLETE, this, this._onLoadBufferComplete);
    c ? (this.audioBuffer = c, this.duration = 1000 * c.duration, this.dispatcher.asyncDispatch(X_WebAudio_isNoTouch ? X_EVENT_MEDIA_WAIT_FOR_TOUCH : X_EVENT_READY)) : (this.error = b.errorState, this.dispatcher.dispatch({type:X_EVENT_ERROR, error:b.errorState, message:1 === b.errorState ? "load buffer network error" : "buffer decode error"}), this.kill());
  }, actualPlay:function() {
    if (this.audioBuffer) {
      if (X_WebAudio_isNoTouch) {
        if (X_IS_DEV) {
          var a = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1];
          if (!a || !a.pointerType) {
            alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e play! " + (a ? a.type : ""));
            return;
          }
        }
        for (this.dispatcher.asyncDispatch(X_EVENT_READY); a = X_TEMP.xWebAudioInstances.pop();) {
          a !== this && a.asyncDispatch(X_EVENT_READY);
        }
        delete X_TEMP.xWebAudioInstances;
        X_WebAudio_isNoTouch = !1;
        X_TEMP.webAudioSampleRateFix && X_TEMP.webAudioSampleRateFix(this.audioBuffer.sampleRate);
      }
      var b = X_Audio_getEndTime(this);
      a = X_Audio_getStartTime(this, b, !0);
      this._createTree(a, b);
      this.playing = !0;
      this._startPos = a;
      this._endPosition = b;
      this._startTime = 1000 * X_WebAudio_context.currentTime;
      this._interval = this._interval || X_Timer_add(100, 0, this, this._onInterval);
    } else {
      this._playReserved = !0;
    }
  }, _createTree:function(a, b) {
    this.bufferSource && this._sourceDispose();
    this.gainNode || (this.gainNode = X_WebAudio_context.createGain ? X_WebAudio_context.createGain() : X_WebAudio_context.createGainNode(), this.gainNode.connect(X_WebAudio_context.destination));
    this.bufferSource = X_WebAudio_context.createBufferSource();
    this.bufferSource.buffer = this.audioBuffer;
    this.bufferSource.connect(this.gainNode);
    this.gainNode.gain.value = this.gain;
    this.bufferPlay || (this.bufferPlay = this.bufferSource.start ? "start" : this.bufferSource.noteOn ? "noteOn" : "noteGrainOn", this.bufferStop = this.bufferSource.stop ? "stop" : "noteOff");
    this.bufferSource[this.bufferPlay](0, a / 1000, (b - a) / 1000);
  }, _sourceDispose:function() {
    this.bufferSource.disconnect();
    delete this.bufferSource;
  }, _onInterval:function() {
    if (this.playing) {
      var a = 1000 * X_WebAudio_context.currentTime - this._startTime - this._endPosition + this._startPos | 0;
      if (0 > a) {
        this.dispatcher.dispatch(X_EVENT_MEDIA_PLAYING);
      } else {
        if (this.autoLoop) {
          if (this.dispatcher.dispatch(X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT) {
            return delete this._interval, X_CALLBACK_UN_LISTEN;
          }
          this.looped = !0;
          this.dispatcher.dispatch(X_EVENT_MEDIA_LOOPED);
          this.actualPlay();
        } else {
          this.actualPause(), this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED);
        }
      }
    }
  }, actualPause:function() {
    this._interval && X_Timer_remove(this._interval);
    delete this._interval;
    delete this.playing;
    if (this.bufferSource) {
      this.bufferSource[this.bufferStop](0);
    }
  }, getActualCurrentTime:function() {
    return 1000 * X_WebAudio_context.currentTime - this._startTime + this._startPos | 0;
  }, afterUpdateState:function(a) {
    a & 2 || a & 1 ? this.actualPlay() : a & 4 && (this.gainNode.gain.value = this.gain);
  }}), X_Audio_BACKENDS.push({backendID:1, backendName:"WebAudio", canPlay:X_Audio_codecs, detect:function(a, b) {
    a.asyncDispatch({type:X_EVENT_COMPLETE, canPlay:X_Audio_codecs[b]});
  }, klass:X_WebAudio}));
}
;if (X_USE_AUDIO) {
  var X_HTMLAudio, X_HTMLAudio_seekingFixIOS = 7 <= (X_UA.SafariMobile || X_UA.iOSWebView), X_HTMLAudio_endedFixIOS = 7 > (X_UA.SafariMobile || X_UA.iOSWebView), X_HTMLAudio_endedFixAOSP2 = 3 > X_UA.AOSP, X_HTMLAudio_endedFixAOSP3 = !X_HTMLAudio_endedFixAOSP2 && 4 > X_UA.AOSP, X_HTMLAudio_endedFixAOSP4 = 4 <= X_UA.AOSP || 1 > X_UA.Samsung, X_HTMLAudio_endedFixCWV = X_UA.ChromeWebView || X_UA.ChromiumMobile || X_UA.Samsung, X_HTMLAudio_currentTimeFix = X_UA.PrestoMobile && X_UA.Android, X_HTMLAudio_playStartFix = 
  (X_UA.Win32 || X_UA.Win64) && 44 <= (X_UA.Gecko || X_UA.Fennec), X_HTMLAudio_volumeFix = X_UA.Chromium || X_UA.ChromiumMobile || X_UA.Samsung, X_HTMLAudio_volumeEnabled = 7.5 !== X_UA.WindowsPhone && !(X_UA.Presto || X_UA.PrestoMobile), X_HTMLAudio_needPlayForSeek = X_UA.SafariMobile || X_UA.iOSWebView || X_UA.Gecko || X_UA.Fennec, X_HTMLAudio_pauseFix = 12 <= (X_UA.Presto || X_UA.PrestoMobile) && 5.1 <= (X_UA.Win32 || X_UA.Win64) && 5.2 >= (X_UA.Win32 || X_UA.Win64), X_HTMLAudio_need1stTouch = 
  X_UA.SafariMobile || X_UA.iOSWebView || 4.2 <= X_UA.AOSP || X_UA.Samsung || X_UA.ChromeWebView || X_UA.ChromiumMobile || X_UA.WindowsPhone || 66 <= X_UA.Gecko || 66 <= X_UA.Fennec || 66 <= X_UA.Chromium || 604 <= X_UA.WebKit, X_HTMLAudio_playTrigger = 7.5 === X_UA.WindowsPhone ? "canplay" : 8 > (X_UA.SafariMobile || X_UA.iOSWebView) ? "suspend" : X_UA.SafariMobile || X_UA.iOSWebView ? "loadedmetadata" : 32 > (X_UA.Chromium || X_UA.ChromiumMobile || X_UA.ChromeWebView) ? "stalled" : "canplaythrough", 
  X_HTMLAudio_durationFix = 8 > (X_UA.SafariMobile || X_UA.iOSWebView) || X_UA.ChromeWebView || 7.5 === X_UA.WindowsPhone || (X_UA.Win32 || X_UA.Win64) && 12 <= X_UA.Presto || 36 > X_UA.ChromiumMobile, X_HTMLAudio_shortPlayFix = X_UA.AOSP || 1 > X_UA.Samsung, X_HTMLAudio_progressEnabled = !(X_UA.PrestoMobile && X_UA.Android) && 7.5 !== X_UA.WindowsPhone;
  X_Audio_constructor && (X_HTMLAudio = X_AudioBase.inherits("X.HTMLAudio", X_Class.POOL_OBJECT, {_readyState:0, _src:"", _touchState:X_HTMLAudio_need1stTouch ? 1 : 0, _currentFixStart:0, _currentFixBegin:0, _durationFixPhase:X_HTMLAudio_durationFix ? 1 : 0, _lastCurrentTime:0, _shortPlayFixON:!1, _shortPlayFixTime:0, _endedFixON:!1, _seekingFixON:!1, Constructor:function(a, b, c, d) {
    this.dispatcher = a || this;
    this._src = b;
    X_HTMLAudio_shortPlayFix && (this._shortPlayFixON = "m4a" === d);
    this.setState(c);
    c.useVideo ? (a = document.createElement("video"), a.preload = "none", a.autoplay = !1, a.loop = !1, a.muted = !1, a.crossorigin = c.crossorigin || "", a.style.cssText = "position:absolute;bottom:0;left:-50px;width:100px;height:100px;opacity:0;", a.controls = !1, a.WebKitPlaysInline = !0, X_elmBody.appendChild(a)) : (a = X_TEMP.rawAudio || new X_Audio_constructor(""), X_TEMP.rawAudio && delete X_TEMP.rawAudio);
    this._rawObject = a;
    this.listen([X_EVENT_KILL_INSTANCE, X_HTMLAudio_playTrigger, "progress", "seeked", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "durationchange", "timeupdate", "ended"]);
    this.listen("loadstart load progress error suspend abort emptied stalled play pause seeked ratechange volumechange loadedmetadata loadeddata canplay canplaythrough playing waiting seeking durationchange timeupdate ended".split(" "), this.onDebug);
    if (X_HTMLAudio_endedFixAOSP2 || X_HTMLAudio_endedFixAOSP4) {
      a.loop = !0;
    }
    X_HTMLAudio_need1stTouch ? a.src = b : (this.autoplay && (a.preload = "auto", a.autoplay = !0), a.src = b, a.load());
  }, onDebug:function(a) {
    this.dispatcher.dispatch({type:X_EVENT_DEBUG, rawEvent:a.type, current:this._rawObject.currentTime, duration:this._rawObject.duration});
  }, handleEvent:function(a) {
    var b = this._rawObject, c = "ended" === a.type, d = c, e, g;
    if (b) {
      switch(a.type) {
        case X_EVENT_KILL_INSTANCE:
          this.playing && this.actualPause();
          b.src = "";
          b.load();
          break;
        case "progress":
          if (X_HTMLAudio_progressEnabled && this.duration && 3 > this._readyState) {
            var f = b.buffered;
            b = g = 0;
            for (e = f && f.length; b < e; ++b) {
              g += f.end(b) - f.start(b);
            }
            this.dispatcher.dispatch({type:X_EVENT_PROGRESS, percent:1000 * g / this.duration * 100});
          }
          break;
        case "loadeddata":
        case "canplaythrough":
          this._endedFixON || X_HTMLAudio_durationFix || X_HTMLAudio_need1stTouch || (this._readyState |= 1);
        case "canplay":
          1 !== this._durationFixPhase || X_HTMLAudio_need1stTouch || (this._durationFixPhase = 2, this.actualPlay(), b.currentTime = 0), this._endedFixON && (this._endedFixON = !1, this.actualPlay());
        case "loadedmetadata":
        case "durationchange":
          if (!this.duration || this.duration !== 1000 * b.duration) {
            var k = b.duration;
          }
          break;
        case "timeupdate":
          if (this._seekingFixON) {
            var h = X_EVENT_MEDIA_SEEKING;
          } else {
            8 === this._durationFixPhase ? (this._durationFixPhase = 0, this._readyState |= 1) : 4 === this._durationFixPhase ? (k = b.duration, h = X_EVENT_MEDIA_WAITING) : 3 !== this._touchState || X_HTMLAudio_durationFix ? (e = this.getActualCurrentTime()) === this._lastCurrentTime ? h = X_EVENT_MEDIA_WAITING : X_HTMLAudio_playStartFix && e < this._lastCurrentTime ? (h = X_EVENT_MEDIA_WAITING, this.actualPlay()) : this.playing && (b = X_Audio_getEndTime(this) + this._shortPlayFixTime, 0 + b <= 
            0 + e || e < this._lastCurrentTime && 2000 > e ? this.autoLoop ? d = !0 : (this.actualPause(), h = X_EVENT_MEDIA_ENDED) : h = X_EVENT_MEDIA_PLAYING, this._lastCurrentTime = e) : (this._touchState = 0, this._readyState |= 1);
          }
          break;
        case "playing":
          X_HTMLAudio_volumeFix && (b.volume = this.gain);
          h = this._durationFixPhase || this._endedFixON ? X_EVENT_MEDIA_WAITING : X_EVENT_MEDIA_PLAYING;
          break;
        case "seeking":
          h = X_EVENT_MEDIA_SEEKING;
          X_HTMLAudio_seekingFixIOS && (this._seekingFixON = !0);
          break;
        case "seeked":
          X_HTMLAudio_seekingFixIOS && (this._seekingFixON = !1);
          break;
        case "waiting":
          h = X_EVENT_MEDIA_WAITING;
      }
      0 < k && X_Type_isFinite(k) && 100 !== k && (this.duration = 1000 * k, 4 === this._durationFixPhase ? (this._durationFixPhase = 8, this.autoplay || this._playReserved ? this.actualPlay() : X_HTMLAudio_pauseFix && this.actualPause()) : this._durationFixPhase & 3 && (this._durationFixPhase = 8));
      1 === this._touchState ? a.type === X_HTMLAudio_playTrigger && (this._touchState = 2, this.dispatcher.asyncDispatch(X_EVENT_MEDIA_WAIT_FOR_TOUCH)) : d ? this.autoLoop ? this.dispatcher.dispatch(X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT || (this.looped = !0, this.dispatcher.dispatch(X_EVENT_MEDIA_LOOPED), this.actualPlay(X_HTMLAudio_endedFixCWV && c, X_HTMLAudio_endedFixAOSP3 && c)) : (this.seekTime = 0, delete this.playing, this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED)) : 1 === 
      this._readyState && this.duration ? (this._readyState |= 2, this.dispatcher.asyncDispatch(X_EVENT_READY)) : h && this.dispatcher.dispatch(h);
    }
  }, actualPlay:function(a, b) {
    var c = this._rawObject;
    if (c) {
      this._playReserved = !0;
      if (X_HTMLAudio_pauseFix) {
        if (!c.src) {
          c.src = this._src;
          return;
        }
        if (2 > this._durationFixPhase) {
          return;
        }
      }
      if (2 === this._touchState) {
        if (X_IS_DEV) {
          var d = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1];
          if (!d || !d.pointerType) {
            alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e play! " + (d ? d.type : ""));
            return;
          }
        }
        this._touchState = 3;
      } else {
        if (3 !== this._readyState && 2 > this._durationFixPhase) {
          return;
        }
      }
      delete this._playReserved;
      this._durationFixPhase & 3 && (this._durationFixPhase = 4);
      var e = X_Audio_getEndTime(this);
      this._lastCurrentTime = d = X_Audio_getStartTime(this, e, !0);
      this._shortPlayFixON && (this._shortPlayFixTime = 1000 < e - d ? 200 : 400, this.duration < e + this._shortPlayFixTime && (this._shortPlayFixTime = this.duration - e));
      this._endedFixON || (this.playing ? (X_HTMLAudio_needPlayForSeek || a) && c.play() : (c.volume = X_HTMLAudio_volumeFix ? 0 : X_HTMLAudio_volumeEnabled ? this.gain : 1, c.play(), this.playing = !0), this._durationFixPhase % 8 || !this.duration || (c.currentTime = this._lastCurrentTime / 1000), b && (this.playing = !1, this._endedFixON = !0, c.src = this._src, this.dispatcher.dispatch(X_EVENT_MEDIA_WAITING)));
      X_HTMLAudio_currentTimeFix && (this._currentFixBegin = d, this._currentFixStart = X_Timer_now());
    }
  }, actualPause:function() {
    var a = this._rawObject;
    delete this._currentFixStart;
    !a.error && a.pause();
    X_HTMLAudio_pauseFix && (a.src = "", X_HTMLAudio_durationFix && delete this._durationFixPhase);
    delete this.playing;
  }, getActualCurrentTime:function() {
    return X_HTMLAudio_currentTimeFix ? X_Timer_now() - this._currentFixStart + this._currentFixBegin : this._seekingFixON ? this._lastCurrentTime : 1000 * this._rawObject.currentTime | 0;
  }, getActualError:function() {
    return this._rawObject.error || 0;
  }, afterUpdateState:function(a) {
    a & 3 ? this.actualPlay() : a & 4 && X_HTMLAudio_volumeEnabled && (this._rawObject.volume = this.gain);
  }})) && X_Audio_BACKENDS.push({backendID:2, backendName:"HTMLAudio", canPlay:X_Audio_codecs, detect:function(a, b, c) {
    X_UA.Android && X_UA.PrestoMobile && "mp3" === b ? a.asyncDispatch({type:X_EVENT_COMPLETE, canPlay:!!c.CBR}) : a.asyncDispatch({type:X_EVENT_COMPLETE, canPlay:X_Audio_codecs[b]});
  }, klass:X_HTMLAudio});
}
;if (X_USE_AUDIO) {
  var X_SLAudio, X_SLAudio_uid = 0;
  X_Plugin_SILVER_LIGHT_VERSION && (X_TEMP.slaudioInit = function() {
    if (9 > (X_UA.Trident || X_UA.TridentMobile)) {
      var a = document.createElement('<script id="silverlightaudio" type="text/xaml">\x3c/script>');
    } else {
      a = document.createElement("script"), a.id = "silverlightaudio", a.type = "text/xaml";
    }
    X_elmHead.appendChild(a);
    a.text = '<Canvas xmlns="http://schemas.microsoft.com/client/2007" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"></Canvas>';
    delete X_TEMP.slaudioInit;
  }, X_SLAudio = X_AudioBase.inherits("X.SilverlightAudio", X_Class.POOL_OBJECT, {_rawType:X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT, _onload:"", _callback:null, xnodeObject:null, _source:"", _ended:!0, _paused:!1, _lastUserAction:"", _lastState:"", _interval:0, Constructor:function(a, b, c, d) {
    !X_SLAudio_uid && X_TEMP.slaudioInit();
    this.dispatcher = a || this;
    this._source = b;
    this._onload = "XAudioSilverlightOnLoad" + ++X_SLAudio_uid;
    this._callback = window[this._onload] = X_Closure_create(this, this.onSLReady);
    this.xnodeObject = X_Node_body.create("object", {type:"application/x-silverlight-2", data:"data:application/x-silverlight-2,", width:1, height:1}).html('<param name="background" value="#00000000"><param name="windowless" value="true"><param name="source" value="#silverlightaudio"><param name="onload" value="' + this._onload + '">');
    this.setState(c);
    this.listenOnce(X_EVENT_KILL_INSTANCE);
  }, onSLReady:function(a) {
    this._onload && (window[this._onload] = null, delete this._onload, X_Closure_correct(this._callback), delete this._callback, a.children.add(a.GetHost().content.CreateFromXaml('<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"><MediaElement x:Name="media" Source="' + this._source + '" Volume="' + this.gain + '" AutoPlay="false" /></Canvas>')), this._rawObject = a.findName("media"), this.listen(["MediaFailed", "MediaOpened", "MediaEnded", "CurrentStateChanged"]));
  }, handleEvent:function(a) {
    switch(a.type) {
      case "MediaFailed":
        this.error = 4;
        this.playing = !1;
        this._ended = !0;
        this._paused = !1;
        this.playing || (this.dispatcher.dispatch(X_EVENT_ERROR), this.kill());
        break;
      case "MediaOpened":
        this.duration = 1000 * this._rawObject.NaturalDuration.Seconds;
        this.dispatcher.asyncDispatch(X_EVENT_READY);
        break;
      case "MediaEnded":
        this._ended = !0;
        break;
      case "CurrentStateChanged":
        a = this._lastState;
        var b = this._rawObject.CurrentState;
        if (a === b || !("Closed" !== a && "Error" !== a || "Closed" !== b && "Error" !== b)) {
          break;
        }
        this._lastState = b;
        switch(b) {
          case "Buffering":
          case "Opening":
            switch(this._lastUserAction) {
              case "play":
                this.dispatcher.dispatch(X_EVENT_MEDIA_WAITING);
                break;
              case "seek":
                this.dispatcher.dispatch(X_EVENT_MEDIA_SEEKING);
            }break;
          case "Error":
            this.error = 4;
          case "Closed":
            this.error = this.error || 2;
            this.playing = !1;
            this._ended = !0;
            this._paused = !1;
            this.dispatcher.dispatch(X_EVENT_ERROR);
            this.kill();
            break;
          case "Paused":
            this.playing && X_Timer_once(16, this, this.actualPlay);
            switch(this._lastUserAction) {
              case "play":
              case "seek":
                this._ended = !0;
                this._paused = !1;
                break;
              case "pause":
                this._ended = !1;
                this._paused = !0;
                break;
              case "stop":
                this._ended = !0, this._paused = !1;
            }break;
          case "Playing":
            this.error = 0;
            this._paused = this._ended = !1;
            this.dispatcher.dispatch(X_EVENT_MEDIA_PLAYING);
            break;
          case "Stopped":
            this.playing && X_Timer_once(16, this, this.actualPlay);
        }break;
      case X_EVENT_KILL_INSTANCE:
        this.playing && this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED), this.playing && this.actualPause(), this._onload && (window[this._onload] = null, X_Closure_correct(this._callback)), this.xnodeObject.kill();
    }
  }, actualPlay:function() {
    if (!this.error) {
      if (this.duration) {
        this._lastUserAction = 0 <= this.seekTime ? "seek" : "play";
        var a = X_Audio_getEndTime(this);
        var b = X_Audio_getStartTime(this, a, !0) | 0;
        b = 1000 * (b / 1000 | 0) + (500 < b % 1000 ? 1000 : 0);
        this._rawObject.Volume = this.gain;
        this.setCurrentTime(this._beginTime = b);
        if (!this.playing || this._ended) {
          this._rawObject.play(), this.playing = !0, this._ended = !1;
        }
        this._timerID && X_Timer_remove(this._timerID);
        this._timerID = X_Timer_once(a - b, this, this._onEnded);
        this._interval || (this._interval = X_Timer_add(1000, 0, this, this._onInterval));
      } else {
        this._playReserved = !0;
      }
    }
  }, _onInterval:function() {
    if (!this.playing) {
      return delete this._interval, X_CALLBACK_UN_LISTEN;
    }
    this.dispatcher.dispatch(X_EVENT_MEDIA_PLAYING);
  }, _onEnded:function() {
    delete this._timerID;
    if (this.playing) {
      var a = this.getActualCurrentTime();
      a < this._beginTime ? (this.setCurrentTime(this._beginTime), a = this.getActualCurrentTime(), this._ended && this._rawObject.play(), this._ended = !1, this.dispatcher.dispatch(X_EVENT_MEDIA_WAITING), this._timerID = X_Timer_once(X_Audio_getEndTime(this) - a, this, this._onEnded)) : (a -= X_Audio_getEndTime(this), -50 > a ? (this._ended && this._rawObject.play(), this._ended = !1, this._timerID = X_Timer_once(-a, this, this._onEnded)) : this.autoLoop ? this.dispatcher.dispatch(X_EVENT_MEDIA_BEFORE_LOOP) & 
      X_CALLBACK_PREVENT_DEFAULT || (this.looped = !0, this.dispatcher.dispatch(X_EVENT_MEDIA_LOOPED), this.actualPlay()) : (this.actualPause(), this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED)));
    }
  }, actualPause:function() {
    this.error || (this._lastUserAction = "pause", this.playing = !1, this._paused = !0, this._ended = !1, this._rawObject.pause());
  }, getActualCurrentTime:function() {
    return 1000 * this._rawObject.Position.Seconds | 0;
  }, afterUpdateState:function(a) {
    if (a & 3) {
      this.actualPlay();
    } else {
      if (a & 1) {
        a = X_Audio_getEndTime(this);
        var b = a < this.duration;
        this._timerID && X_Timer_remove(this._timerID);
        b ? this._timerID = X_Timer_once(a - this.getActualCurrentTime(), this, this._onEnded) : delete this._timerID;
      } else {
        a & 4 && (this._rawObject.Volume = this.gain);
      }
    }
  }, setCurrentTime:function(a) {
    var b = this._rawObject.Position;
    b.Seconds = a / 1000 | 0;
    this._rawObject.Position = b;
  }}), X_Audio_BACKENDS.push({backendID:8, backendName:"Silverlight", canPlay:{mp3:!0, m4a:!0, wma:!0, wav:!0}, detect:function(a, b, c) {
    a.asyncDispatch({type:X_EVENT_COMPLETE, canPlay:"mp3" === b || "m4a" === b || "wma" === b || "wav" === b});
  }, klass:X_SLAudio}));
}
;if (X_USE_AUDIO) {
  var X_WMPAudio;
  X_Plugin_WMP_VERSION && (X_WMPAudio = X_AudioBase.inherits("X.WMPAudio", X_Class.POOL_OBJECT, {xnodeObject:null, wmp:null, _wmp:null, _readyState:0, _seekDirection:0, _timerID:0, Constructor:function(a, b, c, d) {
    this.dispatcher = a || this;
    this._source = b;
    this.xnodeObject = 7 <= X_Plugin_WMP_VERSION ? X_Node_systemNode.create("object", {classID:"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6", width:1, height:1}).html(5.5 === (X_UA.Trident || X_UA.TridentMobile) ? "" : '<param name="uiMode" value="none">') : X_Node_systemNode.create("object", {classID:"CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95", width:0, height:0}).html(5.5 === (X_UA.Trident || X_UA.TridentMobile) ? "" : '<param name="ShowControls" value="false">');
    this.setState(c);
    X_ViewPort.listenOnce(X_EVENT_AFTER_UPDATE, this);
    this.listenOnce(X_EVENT_KILL_INSTANCE);
  }, handleEvent:function(a) {
    switch(a.type) {
      case X_EVENT_AFTER_UPDATE:
        this._readyState = 1;
        7 <= X_Plugin_WMP_VERSION ? (this._wmp = this.xnodeObject._rawObject, this._wmp.URL = this._source, this.wmp = this._wmp.controls) : (this.wmp = this.xnodeObject._rawObject, this.wmp.FileName = this._source);
        this._timerID = X_Timer_add(100, 0, this, this._onTimer);
        break;
      case X_EVENT_KILL_INSTANCE:
        this.playing && this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED), this.playing && this.actualPause(), this.wmp.stop(), this.xnodeObject.kill();
    }
  }, actualPlay:function() {
    if (2 > this._readyState) {
      this._playReserved = !0;
    } else {
      var a = X_Audio_getEndTime(this);
      a = this._beginTime = X_Audio_getStartTime(this, a, !0) | 0;
      this.playing ? this._seekDirection = this.getActualCurrentTime() < a ? 1 : -1 : (this.setVolume(), this.wmp.play(), this.playing = !0);
      this.wmp.CurrentPosition = a / 1000;
      this._timerID || (this._timerID = X_Timer_add(100, 0, this, this._onTimer));
    }
  }, _onTimer:function() {
    if (1 === this._readyState) {
      var a = 7 <= X_Plugin_WMP_VERSION ? this._wmp.network.downloadProgress : this.wmp.BufferingProgress;
      100 > a ? this.dispatcher.dispatch({type:X_EVENT_PROGRESS, percent:a}) : (this._readyState = 2, this.duration = 7 <= X_Plugin_WMP_VERSION ? 1000 * this._wmp.currentMedia.duration | 0 : 1000 * this.wmp.Duration | 0, this.dispatcher.dispatch(X_EVENT_READY));
    } else {
      if (this.playing) {
        a = this.getActualCurrentTime();
        if (this._seekDirection) {
          if (1 === this._seekDirection ? a < this._beginTime : this._lastCurrentTime <= a) {
            this.dispatcher.dispatch(X_EVENT_MEDIA_SEEKING);
            return;
          }
          delete this._seekDirection;
        }
        if (a === this._lastCurrentTime) {
          this.dispatcher.dispatch(X_EVENT_MEDIA_WAITING);
        } else {
          if (this._lastCurrentTime = a, -50 > a - X_Audio_getEndTime(this)) {
            this.dispatcher.dispatch(X_EVENT_MEDIA_PLAYING);
          } else {
            if (this.autoLoop) {
              this.dispatcher.dispatch(X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT || (this.looped = !0, this.dispatcher.dispatch(X_EVENT_MEDIA_LOOPED), this.actualPlay());
            } else {
              return this.actualPause(), this.dispatcher.dispatch(X_EVENT_MEDIA_ENDED), delete this._timerID, X_CALLBACK_UN_LISTEN;
            }
          }
        }
      }
    }
  }, actualPause:function() {
    this.playing = !1;
    this._timerID && X_Timer_remove(this._timerID);
    delete this._timerID;
    this.wmp.pause();
  }, setVolume:function() {
    7 <= X_Plugin_WMP_VERSION ? this._wmp.settings.Volume = 100 * this.gain : this.wmp.Volume = 10000 * (1 - this.gain);
  }, getActualCurrentTime:function() {
    return 1000 * this.wmp.CurrentPosition | 0;
  }, afterUpdateState:function(a) {
    a & 3 ? this.actualPlay() : a & 4 && this.setVolume();
  }}), X_Audio_BACKENDS.push({backendID:16, backendName:"WMP" + X_Plugin_WMP_VERSION, canPlay:{mp3:!0, m4a:!0, wma:!0, wav:!0, mid:!0, midi:!0, snd:!0, au:!0, aif:!0, aiff:!0, aicf:!0}, detect:function(a, b) {
    a.asyncDispatch({type:X_EVENT_COMPLETE, canPlay:0 <= "mp3 m4a wma wav midi snd au aiff aicf".indexOf(b)});
  }, klass:X_WMPAudio}));
}
;if (X_USE_AUDIO) {
  var X_AudioSprite_shouldUse = X_HTMLAudio && (X_UA.SafariMobile || X_UA.iOSWebView || X_UA.AOSP || X_UA.PrestoMobile && X_UA.Android), X_AudioSprite_useVideoForMulti = !1, X_AudioSprite_disableMultiTrack = !X_WebAudio && (X_UA.SafariMobile || X_UA.iOSWebView || 4 <= X_UA.AOSP || X_UA.ChromeWebView || 7.5 === X_UA.WindowsPhone), X_AudioSprite_enableVolume = X_HTMLAudio && !(X_UA.SafariMobile || X_UA.iOSWebView) && !X_UA.AOSP && !(X_UA.PrestoMobile && X_UA.Android) && !(25 > X_UA.Fennec), X_AudioSprite_maxTracks = 
  X_AudioSprite_useVideoForMulti ? 2 : X_AudioSprite_disableMultiTrack ? 1 : 9, X_AudioSprite_lengthSilence = 10000, X_AudioSprite_lengthDistance = 5000, X_AudioSprite_uid = 0, X_AudioSprite_TEMP = {presets:{}, BGMs:{}, tracks:[], pauseTracks:[], volume:1, bgmTrack:null, bgmPosition:0, bgmName:"", bgmLooped:!1, bgmPlaying:!1, tmpEvent:null}, X_AudioSprite, X_AudioSprite_numTracks, X_AudioSprite_useVideo;
  X.AudioSprite = function(a) {
    var b = X_AudioSprite_TEMP.BGMs, c = X_AudioSprite_TEMP.presets, d = a.urls, e = a.useVideo, g = e ? 1 : a.numTracks || 1, f = a.volume, k, h;
    X_AudioSprite && X_AudioSprite.kill();
    X_AudioSprite = X_Class_override(X_EventDispatcher(), X_AudioSprite_members);
    X_ViewPort.listen([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD], X_AudioSprite_handleEvent);
    g = g <= X_AudioSprite_maxTracks ? g : X_AudioSprite_maxTracks;
    for (k in a) {
      var l = a[k];
      if (X_Type_isArray(l) && l !== d) {
        l = X_Array_copy(l);
        for (h = l.length; h;) {
          --h, 2 !== h && (l[h] = X_Audio_timeStringToNumber(l[h]));
        }
        l[2] && (b[k] = l);
        c[k] = l;
      }
    }
    X_Audio_startDetectionBackend(X_Audio_BACKENDS[0], X_AudioSprite, X_Array_copy(d), {volume:0 <= f && 1 >= f ? f : 1, autoplay:!0, startTime:0, endTime:X_AudioSprite_lengthSilence, loop:!0});
    X_AudioSprite.listenOnce([X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE], X_AudioSprite_backendHandler);
    X_AudioSprite.listenOnce(X_EVENT_KILL_INSTANCE, X_AudioSprite_handleEvent);
    X_AudioSprite_useVideo = e;
    X_AudioSprite_numTracks = X_AudioSprite.numTracks = g;
    return X_AudioSprite;
  };
  X.AudioSprite.shouldUse = X_AudioSprite_shouldUse;
  X.AudioSprite.enableMultiTrack = !X_AudioSprite_disableMultiTrack;
}
function X_AudioSprite_getTrackEnded() {
  for (var a = X_AudioSprite_TEMP.tracks, b = X_AudioSprite_numTracks, c = 0, d, e, g = 1 / 0, f; c < b; ++c) {
    d = a[c];
    e = d.getState();
    if (!e.playing) {
      return d;
    }
    if (d !== X_AudioSprite_TEMP.bgmTrack) {
      if (e.currentTime <= X_AudioSprite_lengthSilence + X_AudioSprite_lengthDistance) {
        return d;
      }
      d = e.endTime - e.currentTime;
      d < g && (g = d, f = c);
    }
  }
  return a[f];
}
if (X_USE_AUDIO) {
  var X_AudioSprite_members = {numTracks:0, play:function(a) {
    var b = X_AudioSprite_TEMP.bgmTrack, c = X_AudioSprite_TEMP.tracks, d = X_AudioSprite_TEMP.BGMs, e = X_AudioSprite_TEMP.presets[a];
    return e ? (d[a] ? (a !== X_AudioSprite_TEMP.bgmName && (X_AudioSprite_TEMP.bgmName = a, X_AudioSprite_TEMP.bgmPosition = e[0], X_AudioSprite_TEMP.bgmLooped = !1), X_AudioSprite_TEMP.bgmPlaying = !0, a = b ? b : 1 < X_AudioSprite_numTracks ? X_AudioSprite_TEMP.bgmTrack = X_AudioSprite_getTrackEnded() : X_AudioSprite_TEMP.bgmTrack = c[0], a.listen([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).playing ? a.setState({loop:!0, 
    looped:X_AudioSprite_TEMP.bgmLooped, currentTime:X_AudioSprite_TEMP.bgmPosition, startTime:e[0], endTime:e[1], loopStartTime:e[3], loopEndTime:e[4]}) : (a.setState({looped:X_AudioSprite_TEMP.bgmLooped}), a.play(e[0], e[1], !0, e[3], e[4]), a.seek(X_AudioSprite_TEMP.bgmPosition))) : 1 < X_AudioSprite_numTracks ? (a = X_AudioSprite_getTrackEnded(X_AudioSprite_TEMP.bgmPlaying), a.listen([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).setState({looped:!1}), 
    a.play(e[0], e[1], !0, 0, X_AudioSprite_lengthSilence)) : (b && (X_AudioSprite_TEMP.bgmPosition = b.currentTime(), X_AudioSprite_TEMP.bgmTrack = null), a = c[0], a.listen([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).playing ? a.setState({loop:!0, looped:!1, currentTime:e[0], startTime:e[0], endTime:e[1], loopStartTime:0, loopEndTime:X_AudioSprite_lengthSilence}) : a.play(e[0], e[1], !0, 0, X_AudioSprite_lengthSilence)), 
    c.indexOf(a)) : -1;
  }, pause:function(a) {
    var b = X_AudioSprite_TEMP.tracks;
    if ("*" === a || void 0 === a) {
      for (a = 0, b = X_AudioSprite_numTracks; a < b; ++a) {
        X_AudioSprite.pause(a);
      }
    } else {
      if (a = b[a]) {
        X_AudioSprite_TEMP.bgmTrack === a && (X_AudioSprite_TEMP.bgmPosition = a.currentTime(), X_AudioSprite_TEMP.bgmPlaying = !1, X_AudioSprite_TEMP.bgmTrack = null), a.play(0, X_AudioSprite_lengthSilence, !0, 0, X_AudioSprite_lengthSilence), a.seek(0), X_AudioSprite.asyncDispatch(X_EVENT_MEDIA_PAUSED);
      }
    }
    return X_AudioSprite;
  }, seek:function(a, b) {
    var c = X_AudioSprite_TEMP.tracks[a];
    if (c) {
      delete c.seekTime;
      var d = X_Audio_getEndTime(c);
      var e = X_Audio_getStartTime(c, d);
      0 <= b && b <= d - e && c.seek(e + b);
    }
    return X_AudioSprite;
  }, volume:function(a, b) {
    var c;
    if (0 === a) {
      if (void 0 === b) {
        return X_AudioSprite_TEMP.volume;
      }
      for (c = X_AudioSprite_numTracks; c;) {
        X_AudioSprite_TEMP.tracks[--c].volume(b);
      }
      return X_AudioSprite;
    }
    c = X_AudioSprite_TEMP.tracks[a];
    if (void 0 === b) {
      return c ? c.gain : -1;
    }
    c && c.volume(b);
    return X_AudioSprite;
  }, state:function(a, b) {
    var c = X_AudioSprite_TEMP.tracks[a];
    if (void 0 === b) {
      if (c) {
        c = c.getState();
        var d = c.startTime;
        return {currentTime:c.currentTime - d, playing:d <= c.currentTime && c.currentTime <= c.endTime, duration:c.endTime - d, volume:X_AudioSprite_TEMP.volume};
      }
      return {volume:X_AudioSprite_TEMP.volume, playing:!1};
    }
    c && c.setState(b);
    return X_AudioSprite;
  }};
}
function X_AudioSprite_backendHandler(a) {
  var b, c, d, e;
  switch(a.type) {
    case X_EVENT_BACKEND_READY:
      var g = X_Audio_BACKENDS[a.backendID];
      var f = a.option;
      X_AudioSprite.unlisten(X_EVENT_BACKEND_NONE, X_AudioSprite_backendHandler);
      X_AudioSprite.source = c = a.source;
      X_AudioSprite.backendName = d = g.backendName;
      for (b = 0; b < X_AudioSprite_numTracks; ++b) {
        if (X_AudioSprite_useVideo || 1 === b && X_AudioSprite_useVideoForMulti) {
          f = X_Object_deepCopy(f), f.useVideo = !0;
        }
        X_AudioSprite_TEMP.tracks.push(e = g.klass(null, a.source, f, a.ext).listen(X_EVENT_DEBUG, X_AudioSprite_handleEvent));
      }
      b = {type:X_EVENT_BACKEND_READY, source:c, backendName:d};
      a.needTouchForPlay && (b.needTouchForPlay = !0) || a.needTouchForLoad && (b.needTouchForLoad = !0) ? (X_AudioSprite_TEMP.tmpEvent = b, e.listenOnce(X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler)) : X_AudioSprite.asyncDispatch(b);
      e.listen(X_EVENT_PROGRESS, X_AudioSprite_backendHandler).listenOnce(X_EVENT_READY, X_AudioSprite_backendHandler);
      return X_CALLBACK_STOP_NOW;
    case X_EVENT_BACKEND_NONE:
      return X_AudioSprite.listen(X_EVENT_BACKEND_NONE, X_AudioSprite_handleEvent).asyncDispatch(X_EVENT_BACKEND_NONE), X_CALLBACK_STOP_NOW;
    case X_EVENT_MEDIA_WAIT_FOR_TOUCH:
      X_AudioSprite.asyncDispatch(X_AudioSprite_TEMP.tmpEvent);
      delete X_AudioSprite_TEMP.tmpEvent;
      break;
    case X_EVENT_PROGRESS:
      X_AudioSprite.dispatch({type:X_EVENT_PROGRESS, percent:a.percent});
      break;
    case X_EVENT_READY:
      X_AudioSprite_TEMP.tmpEvent && (b = X_AudioSprite_TEMP.tmpEvent, b.needTouchForPlay = !1, X_AudioSprite.unlisten(X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler).asyncDispatch(b), delete X_AudioSprite_TEMP.tmpEvent);
      for (b = 0; b < X_AudioSprite_numTracks; ++b) {
        a = X_AudioSprite_TEMP.tracks[b], (a.autoplay || a._playReserved) && a.actualPlay(), delete a._playReserved;
      }
      this.listen(X_EVENT_PROGRESS, X_AudioSprite_backendHandler);
      X_AudioSprite.asyncDispatch(X_EVENT_READY);
  }
}
function X_AudioSprite_handleEvent(a) {
  var b = a.target;
  switch(a.type) {
    case X_EVENT_MEDIA_PLAYING:
    case X_EVENT_MEDIA_WAITING:
    case X_EVENT_MEDIA_SEEKING:
      b !== X_AudioSprite_TEMP.bgmTrack && b.looped || X_AudioSprite.asyncDispatch(a.type);
      break;
    case X_EVENT_MEDIA_BEFORE_LOOP:
      if (b === X_AudioSprite_TEMP.bgmTrack) {
        X_AudioSprite_TEMP.bgmLooped = !0, X_AudioSprite.asyncDispatch(X_EVENT_MEDIA_LOOPED);
      } else {
        if (b.looped || X_AudioSprite.asyncDispatch(X_EVENT_MEDIA_ENDED), X_AudioSprite_TEMP.bgmPlaying && !X_AudioSprite_TEMP.bgmTrack) {
          return X_AudioSprite_TEMP.bgmTrack = b, X_AudioSprite.play(X_AudioSprite_TEMP.bgmName), X_CALLBACK_PREVENT_DEFAULT;
        }
      }
      break;
    case X_EVENT_DEBUG:
      var c = X_AudioSprite_TEMP.tracks.indexOf(b);
      0 <= c && (a.trackID = c, X_AudioSprite.dispatch(a));
      break;
    case X_EVENT_VIEW_ACTIVATE:
      for (a = X_AudioSprite_TEMP.pauseTracks; a.length;) {
        a.pop().actualPlay();
      }
      break;
    case X_EVENT_VIEW_DEACTIVATE:
      a = X_AudioSprite_TEMP.tracks;
      for (c = X_AudioSprite_numTracks; b = a[--c];) {
        b.playing && X_AudioSprite_TEMP.pauseTracks.push(b) && b.pause();
      }
      break;
    case X_EVENT_BACKEND_NONE:
    case X_EVENT_UNLOAD:
      X_AudioSprite.kill();
      break;
    case X_EVENT_KILL_INSTANCE:
      for (X_AudioSprite_TEMP.pauseTracks.length = 0; X_AudioSprite_TEMP.tracks.length;) {
        X_AudioSprite_TEMP.tracks.pop().kill();
      }
      for (c in X_AudioSprite_TEMP.BGMs) {
        delete X_AudioSprite_TEMP.BGMs[c];
      }
      for (c in X_AudioSprite_TEMP.presets) {
        delete X_AudioSprite_TEMP.presets[c];
      }
      X_AudioSprite_TEMP.bgmTrack = null;
      X_AudioSprite_TEMP.bgmPosition = 0;
      X_AudioSprite_TEMP.bgmName = "";
      X_AudioSprite_TEMP.bgmLooped = !1;
      X_AudioSprite_TEMP.bgmPlaying = !1;
      X_ViewPort.unlisten([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD], X_AudioSprite_handleEvent);
      X_AudioSprite = null;
  }
}
;var X_TextRange;
var X_TextRange_w3cSelection = window.getSelection && getSelection(), X_TextRange_w3cRange = document.createRange && document.createRange, X_TextRange_ieSelection = document.selection, X_TextRange_ieRange = !!X_TextRange_ieSelection, X_TextRange_canGetCursorPosition, X_TextRange_lazySelectTimerID, RangeFromSelection, RangeFromPoint, RangeFromIndex, LineRangeFromIndex, LineRangeFromPoint, LineRangeFromLast;
X_TextRange = function(a, b, c, d) {
  function e() {
    void 0 !== X_TextRange_canGetCursorPosition || !l || 9 > (X_UA.Trident || X_UA.TridentMobile) || (X_TextRange_canGetCursorPosition = !!h.setSelectionRange);
    return !l || X_TextRange_canGetCursorPosition || X_TextRange_ieRange;
  }
  var g = a._tag, f = a._attrs && a._attrs.type, k = a._flags, h = a._rawObject, l = "TEXTAREA" === g || "INPUT" === g && 0 < " text,search,url,telephone,password".indexOf(f);
  if (k & X_NodeFlags_IN_TREE && !(k & X_NodeFlags_STYLE_IS_DISPLAY_NONE)) {
    if ("selection" === b) {
      return l && FocusUtility_getFocusedElement() !== h ? void 0 : e() && RangeFromSelection(a, l, c);
    }
    if ("index" === b) {
      return c <= d || (d = c), e() && RangeFromIndex(a, l, c, d);
    }
    if (!l || X_TextRange_ieRange) {
      switch(b) {
        case "point":
          return X_Type_isFinite(c + d) ? RangeFromPoint(a, l, c, d) : void 0;
        case "line-index":
          return c <= d || (d = c), LineRangeFromIndex(a, l, c, d);
        case "line-last":
          return c <= d || (d = c), LineRangeFromLast(a, l, c, d);
        case "line-point":
          return X_Type_isFinite(c + d) ? LineRangeFromPoint(a, l, c, d) : void 0;
      }
    }
  }
};
function X_TextRange_collectTextNodes(a, b) {
  var c = a.childNodes, d, e;
  if (c && c.length) {
    for (d = 0; e = c[d]; ++d) {
      switch(e.nodeType) {
        case 1:
          X_TextRange_collectTextNodes(e, b);
          break;
        case 3:
          b[b.length] = e;
      }
    }
  }
}
function X_TextRange_getCorrectRect(a, b) {
  if (!a && X_TextRange_w3cRange) {
    if (X_UA.Trident || X_UA.TridentMobile || X_UA.EdgeHTML || X_UA.EdgeMobile) {
      var c = b.getBoundingClientRect();
      if (!b.collapsed) {
        var d = b.endOffset;
        var e = b.endContainer;
        b.setEnd(e, d - 1);
        var g = b.getBoundingClientRect();
        g.height < c.height && (c = {left:g.left, top:c.top, right:c.right, bottom:g.bottom, width:c.right - g.left, height:g.height});
        b.setEnd(e, d);
      }
      return c;
    }
    return b.getBoundingClientRect();
  }
  c = b;
  d = b.boundingLeft;
  g = b.boundingWidth + d;
  e = b.boundingHeight;
  if (b.text) {
    b.moveEnd("character", -1);
    c = b.boundingLeft;
    var f = b.boundingHeight;
    d < c || f < e ? (c = {left:c, top:b.boundingTop, right:g, bottom:f + b.boundingTop, width:g - c, height:f}, b.moveEnd("character", 1), 8 > (X_UA.Trident || X_UA.TridentMobile) && 0 === c.width && (b.moveStart("character", 1), c.top = b.boundingTop, c.bottom = c.top + f, c.width = b.boundingLeft - d, c.left = d, c.right = d + c.width, b.moveStart("character", -1))) : (b.moveEnd("character", 1), c = {left:d, top:b.boundingTop, right:g, bottom:e + b.boundingTop, width:b.boundingWidth, height:e});
  }
  return c;
}
function X_TextRange_hitRect(a, b, c) {
  return a.left <= b && b <= a.right && a.top <= c && c <= a.bottom;
}
function X_TextRange_getOffset() {
  var a = this._result;
  if (!X_TextRange_w3cRange && !X_TextRange_canGetCursorPosition) {
    var b = a.range;
    var c = b.duplicate();
    c.moveToElementText(this._xnode._rawObject);
    c.setEndPoint("EndToStart", b);
    c = c.text.length;
    a.from = c;
    a.to = c + b.text.length;
  }
  return {from:a.from, to:a.to};
}
function X_TextRange_getRect() {
  var a = this._result, b = a.rect;
  b || (b = a.rect = X_TextRange_getCorrectRect(this._isTextField, a.range));
  return !this._isTextField && X_TextRange_w3cRange ? {x:b.left | 0, y:b.top | 0, width:(b.width || b.right - b.left) | 0, height:(b.height || b.bottom - b.top) | 0} : {x:b.left, y:b.top, width:b.width, height:b.height};
}
function X_TextRange_move(a, b) {
  var c = this._result, d = c.range, e = this._xnode._rawObject, g, f;
  X_Type_isNumber(c.from) || this.getOffset();
  0 > a && (a += c.from, 0 > a && (a = 0));
  X_Type_isNumber(b) ? 0 > b && (b += c.to, b < a && (b = a)) : b = c.to;
  if (this._isTextField && !X_TextRange_ieRange) {
    e.setSelectionRange(a, b), a = e.selectionStart, b = e.selectionEnd;
  } else {
    if (!this._isTextField && X_TextRange_w3cRange) {
      X_TextRange_collectTextNodes(e, e = []);
      var k = f = 0;
      for (g = e.length; k < g; ++k) {
        var h = e[k];
        var l = h.data.length;
        if (f <= a && a < f + l) {
          var p = !0;
          d.setStart(h, a - f);
        }
        if (f <= b && b < f + l) {
          var w = !0;
          d.setEnd(h, b - f);
          break;
        }
        f += l;
      }
      w || (p || (d.setStart(h, l), a = f), d.setEnd(h, l), b = f);
    } else {
      X_TextRange_ieRange && ((X_UA.Presto || X_UA.PrestoMobile) && FocusUtility_setTemporarilyFocus(e), h = X_elmBody.createTextRange(), h.moveToElementText(e), d.setEndPoint("StartToStart", h), d.setEndPoint("EndToEnd", h), 0 === a + b ? d.collapse(!0) : (l = h.text.length, a = a < l ? a : l, b = b < l ? b : l, d.collapse(!0), d.moveEnd("character", b), d.moveStart("character", a)));
    }
  }
  c.from = a;
  c.to = b;
  c.rect = null;
  return this;
}
function X_TextRange_text(a) {
  var b = this._result, c = b.range, d = b.from, e = b.to;
  if (void 0 === a && X_TextRange_ieRange) {
    return c.text;
  }
  0 <= d || (this.getOffset(), d = b.from, e = b.to);
  if (void 0 === a) {
    return this._xnode._rawObject.value.substring(d, e);
  }
  b = this._xnode._attrs;
  void 0 !== b.value && delete b.value;
  X_TextRange_ieRange ? c.text = a : (c = this._xnode._rawObject, b = 9 > (X_UA.Trident || X_UA.TridentMobile) ? X_Node_Attr_getValueForIE(c) : c.value, c.value = b.substr(0, d) + a + b.substr(e));
  e !== d ? e = d + a.length : d = e += a.length;
  this.move(d, e);
  return this;
}
function X_TextRange_select() {
  var a = this._result;
  if (this._isTextField) {
    if (X_TextRange_canGetCursorPosition) {
      var b = this._xnode._rawObject;
      FocusUtility_getFocusedElement() !== b && b.focus();
      11 > (X_UA.Trident || X_UA.TridentMobile) && b.setSelectionRange(a.from, a.to);
    } else {
      X_TextRange_lazySelectTimerID && X_Timer_remove(X_TextRange_lazySelectTimerID), X_TextRange_lazySelectTimerID = X_Timer_once(100, this._xnode, X_TextRange_lazyFocus, [a]);
    }
  } else {
    X_TextRange_w3cRange ? (X_TextRange_w3cSelection.removeAllRanges(), X_TextRange_w3cSelection.addRange(a.range)) : a.range.select();
  }
  return this;
}
function X_TextRange_lazyFocus(a) {
  a = a.range;
  var b = X_TextRange_ieSelection.createRange(), c = this._rawObject;
  FocusUtility_getFocusedElement() !== c && c.focus();
  b.moveToElementText(c);
  b.setEndPoint("StartToStart", a);
  b.setEndPoint("EndToEnd", a);
  b.select();
  X_TextRange_lazySelectTimerID = 0;
}
;RangeFromSelection = function(a, b, c) {
  return (c = RangeFromSelection_getRawRange(a, b, c)) && {_xnode:a, _isTextField:b, _result:c, getOffset:b ? RangeFromSelection_getOffsetTextField : X_TextRange_w3cRange ? RangeFromSelection_getOffsetW3c : X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select};
};
function RangeFromSelection_getRawRange(a, b, c) {
  function d(a, b) {
    return 11 === (X_UA.Trident || X_UA.TridentMobile) || 11 === X_UA.IEHost ? (f = b.parentNode, a === f || a.contains(f)) : a.contains(b);
  }
  function e(a, b, c, e, f, g, h) {
    var k = [], l, m, p, q;
    X_TextRange_collectTextNodes(h, k);
    k.splice(0, k.indexOf(c));
    k.splice(k.indexOf(e) + 1);
    h = 0;
    for (l = k.length; h < l; ++h) {
      if (d(b, m = k[h])) {
        p ? q = m : p = q = m;
      } else {
        if (q) {
          break;
        }
      }
    }
    if (q) {
      return a.setStart(p, p === c ? f : 0), a.setEnd(q, q === e ? g : q.data.length), a;
    }
  }
  a = a._rawObject;
  var g, f;
  if (b && X_TextRange_canGetCursorPosition && !X_TextRange_ieRange) {
    return {};
  }
  if (!b && X_TextRange_w3cRange) {
    var k = X_TextRange_w3cSelection;
    if (k.getRangeAt) {
      var h = 0;
      for (g = k.rangeCount; h < g; ++h) {
        var l = k.getRangeAt(h);
        var p = l.startContainer;
        var w = l.endContainer;
        p === w ? d(a, p) || (l = null) : d(a, p) && d(a, w) || (l = c ? e(l, a, p, w, l.startOffset, l.endOffset, l.commonAncestorContainer) : null);
        if (l) {
          break;
        }
      }
    } else {
      if (p = k.anchorNode, w = k.focusNode, a.contains(p) && a.contains(w)) {
        l = document.createRange(), l.setStart(p, k.anchorOffset), l.setEnd(w, k.focusOffset);
      } else {
        if (c) {
          for (f = p.parentNode; !f.contains(w);) {
            f = f.parentNode;
          }
          l = e(document.createRange(), a, p, w, k.anchorOffset, k.focusOffset, f);
        } else {
          l = null;
        }
      }
    }
    if (l) {
      return {range:l, rect:X_TextRange_getCorrectRect(b, l)};
    }
  } else {
    switch(X_TextRange_ieSelection.type) {
      case "text":
      case "Text":
      case "none":
      case "None":
        l = X_TextRange_ieSelection.createRange();
        f = l.parentElement();
        if (a === f || a.contains(f)) {
          return {range:l, rect:X_TextRange_getCorrectRect(b, l)};
        }
        if (c && f.contains(a)) {
          return a.isTextEdit ? c = a.createTextRange() : (c = X_elmBody.createTextRange(), c.moveToElementText(a)), -1 === l.compareEndPoints("StartToStart", c) && l.setEndPoint("StartToStart", c), 1 === l.compareEndPoints("EndToEnd", c) && l.setEndPoint("EndToEnd", c), {range:l, rect:X_TextRange_getCorrectRect(b, l)};
        }
    }
  }
}
function RangeFromSelection_getOffsetTextField() {
  var a = this._result, b = this._xnode._rawObject;
  if (X_TextRange_canGetCursorPosition) {
    if (X_UA.Trident || X_UA.TridentMobile) {
      var c = b.value.length;
      var d = b.selectionStart;
      b = b.selectionEnd;
      d = d < c ? d : c;
      b = b < c ? b : c;
    } else {
      d = b.selectionStart, b = b.selectionEnd;
    }
  } else {
    c = a.range.duplicate();
    c.parentElement() !== b && (FocusUtility_setTemporarilyFocus(b), c = X_elmBody.createTextRange(), c.moveToElementText(b), c.collapse(!0), c.select());
    var e = X_elmBody.createTextRange();
    e.moveToElementText(b);
    e.setEndPoint("EndToStart", c);
    var g = e.text;
    for (d = g.split("\r").join("").length; 0 !== e.compareEndPoints("StartToEnd", e);) {
      if (e.moveEnd("character", -1), e.text === g) {
        ++d;
      } else {
        break;
      }
    }
    g = c.text;
    for (b = d + g.split("\r").join("").length; 0 !== c.compareEndPoints("StartToEnd", c);) {
      if (c.moveEnd("character", -1), c.text === g) {
        ++b;
      } else {
        break;
      }
    }
  }
  return {from:a.from = d, to:a.to = b};
}
function RangeFromSelection_getOffsetW3c() {
  var a = this._result, b = a.range, c = [], d = b.startContainer, e = -1, g = b.startOffset, f;
  for (X_TextRange_collectTextNodes(this._xnode._rawObject, c); f = c[++e];) {
    if (f === d) {
      return c = g, b = g + ("" + b).length, {from:a.from = c, to:a.to = b};
    }
    g += f.data.length;
  }
}
;RangeFromIndex = function(a, b, c, d) {
  var e;
  !b && X_TextRange_w3cRange ? e = document.createRange() : X_TextRange_ieRange && (e = X_elmBody.createTextRange());
  return {_xnode:a, _isTextField:b, _result:{range:e, from:0, to:0}, getOffset:X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select}.move(c, d);
};
RangeFromPoint = function(a, b, c, d) {
  return (c = RangeFromPoint_getRawRange(a, b, c, d)) && {_xnode:a, _isTextField:b, _result:c, getOffset:X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select};
};
function RangeFromPoint_getRawRange(a, b, c, d) {
  var e, g, f, k, h;
  if (!b && X_TextRange_w3cRange) {
    for (X_TextRange_collectTextNodes(a._rawObject, e = []), a = document.createRange(), g = f = 0; k = e[g]; ++g) {
      a.selectNodeContents(k);
      var l = X_TextRange_getCorrectRect(b, a);
      var p = k.data.length;
      if (X_TextRange_hitRect(l, c, d)) {
        for (h = 0; h < p; ++h) {
          if (a.setEnd(k, h + 1), a.setStart(k, h), l = X_TextRange_getCorrectRect(b, a), X_TextRange_hitRect(l, c, d)) {
            return {range:a, rect:l, from:f + h, to:f + h + 1};
          }
        }
      }
      f += p;
    }
  } else {
    if (e = a._rawObject, a = X_elmBody.createTextRange(), a.moveToPoint(c, d), g = a.parentElement(), g === e || e.contains(g)) {
      if (a.expand("character") ? (l = X_TextRange_getCorrectRect(b, a), l !== a && (X_TextRange_hitRect(l, c, d) || (a = null))) : a = null, a) {
        return {range:a, rect:l};
      }
    }
  }
}
;LineRangeFromIndex = function(a, b, c, d) {
  return (c = LineRangeFromIndex_getRawRange(null, a, b, c, d)) && {_xnode:a, _isTextField:b, _result:c, _getRawRange:LineRangeFromIndex_getRawRange, getOffset:X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select};
};
function LineRangeFromIndex_getRawRange(a, b, c, d, e) {
  function g(a, b, c, f, g) {
    if (a) {
      return 0 === d && (m = k, v = q = 0), l = g, b;
    }
    if (l <= f) {
      var h = !0;
      l = g;
    } else {
      l = l < g ? g : l;
    }
    if (h || b) {
      if (h && (++p, m && (x = !1), d === p && (m = k, v = c, q = c + w)), e < p || b && m) {
        return !0;
      }
    }
  }
  b = b._rawObject;
  var f, k, h, l, p = 0, w = 0, m, v, q;
  if (!c && X_TextRange_w3cRange) {
    a || (a = document.createRange());
    X_TextRange_collectTextNodes(b, b = []);
    var t = 0;
    for (f = b.length; k = b[t]; ++t) {
      var y = t === f - 1;
      var u = 0;
      for (h = k.data.length; u < h; ++u) {
        var x = y && u === h - 1;
        a.setEnd(k, u + 1);
        a.setStart(k, u);
        var n = X_TextRange_getCorrectRect(c, a);
        if (g(0 === t + u, x, u, n.top | 0, n.bottom | 0)) {
          return a.setEnd(x ? k : F, 1 + (x ? u : G)), a.setStart(m, v), {range:a, rect:X_TextRange_getCorrectRect(c, a), from:q, to:q + (a + "").length};
        }
        var F = k;
        var G = u;
      }
      w += h;
    }
  } else {
    for (k = !0, a || (b.isTextEdit ? a = b.createTextRange() : (a = X_elmBody.createTextRange(), a.moveToElementText(b))), f = a.text.length, a.collapse(!0), a.moveEnd("character", 1), t = 0; t < f; ++t) {
      x = t + 1 === f;
      n = X_TextRange_getCorrectRect(c, a);
      if (g(0 === t, x, t, n.top, n.bottom)) {
        return a.moveStart("character", q - t), x || a.moveEnd("character", -1), {range:a, rect:X_TextRange_getCorrectRect(c, a), from:q, to:q + a.text.length};
      }
      a.moveEnd("character", 1);
      a.moveStart("character", 1);
    }
  }
}
;LineRangeFromLast = function(a, b, c, d) {
  return (c = LineRangeFromLast_getRawRange(null, a, b, c, d)) && {_xnode:a, _isTextField:b, _result:c, _getRawRange:LineRangeFromLast_getRawRange, getOffset:X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select};
};
function LineRangeFromLast_getRawRange(a, b, c, d, e) {
  function g(a, b, c, f, g) {
    if (a) {
      return 0 === d && (v = h, q = c), w = f, b;
    }
    if (g <= w) {
      var k = !0;
      w = f;
    } else {
      w = f < w ? f : w;
    }
    if (k || b) {
      if (k && (++m, u = !1, d === m && (v = h, q = c)), e < m || b && v) {
        return !0;
      }
    }
  }
  b = b._rawObject;
  var f, k, h, l, p, w, m = 0, v, q;
  if (!c && X_TextRange_w3cRange) {
    for (a || (a = document.createRange()), X_TextRange_collectTextNodes(b, b = []), f = k = b.length; h = b[--f];) {
      var t = f === k - 1;
      for (l = p = h.data.length; l; --l) {
        var y = t && l === p;
        var u = 1 === f + l;
        a.setEnd(h, l);
        a.setStart(h, l - 1);
        var x = X_TextRange_getCorrectRect(c, a);
        if (g(y, u, l, x.top | 0, x.bottom | 0)) {
          var n = u ? 0 : n - 1;
          1 === k ? b = n : (a.setStart(b[0], 0), a.setEnd(F, n), b = (a + "").length);
          a.setStart(F, n);
          a.setEnd(v, q);
          return {range:a, rect:X_TextRange_getCorrectRect(c, a), from:b, to:b + (a + "").length};
        }
        var F = h;
        n = l;
      }
    }
  } else {
    for (h = !0, a || (b.isTextEdit ? a = b.createTextRange() : (a = X_elmBody.createTextRange(), a.moveToElementText(b))), k = f = a.text.length, a.collapse(!1), a.moveStart("character", -1); f; --f) {
      u = 1 === f;
      x = X_TextRange_getCorrectRect(c, a);
      if (g(f === k, u, f - 1, x.top, x.bottom)) {
        return !u && a.moveStart("character", 1), a.moveEnd("character", q - f + 1), u && --f, {range:a, rect:X_TextRange_getCorrectRect(c, a), from:f, to:f + a.text.length};
      }
      a.moveStart("character", -1);
      a.moveEnd("character", -1);
    }
  }
}
;LineRangeFromPoint = function(a, b, c, d) {
  return (c = LineRangeFromPoint_getRawRange(null, a, b, c, d)) && {_xnode:a, _isTextField:b, _result:c, _getRawRange:LineRangeFromPoint_getRawRange, getOffset:X_TextRange_getOffset, getRect:!b || X_TextRange_ieRange ? X_TextRange_getRect : null, move:X_TextRange_move, text:b ? X_TextRange_text : null, select:X_TextRange_select};
};
function LineRangeFromPoint_getRawRange(a, b, c, d, e) {
  function g(a, b, c, d, e) {
    if (a) {
      return D ? (w = k, m = v = 0) : (q = k, t = y = 0), l = e, b;
    }
    if (l <= d) {
      var f = !0;
      l = e;
    } else {
      l = l < e ? e : l;
    }
    if (f || b) {
      f && w && (F = !1);
      if (w) {
        return !0;
      }
      if (f || !q) {
        q = k, t = c, y = c + p;
      }
    }
    if (!w && D && (w = q, m = t, v = y, b)) {
      return !0;
    }
  }
  b = b._rawObject;
  var f, k, h, l, p = 0, w, m, v, q, t, y;
  if (!c && X_TextRange_w3cRange) {
    a || (a = document.createRange());
    X_TextRange_collectTextNodes(b, b = []);
    var u = 0;
    for (f = b.length; k = b[u]; ++u) {
      var x = u === f - 1;
      var n = 0;
      for (h = k.data.length; n < h; ++n) {
        var F = x && n === h - 1;
        a.setEnd(k, n + 1);
        a.setStart(k, n);
        var G = X_TextRange_getCorrectRect(c, a);
        var D = D || X_TextRange_hitRect(G, d, e);
        if (g(0 === u + n, F, n, G.top | 0, G.bottom | 0)) {
          return a.setEnd(F ? k : A, 1 + (F ? n : I)), a.setStart(w, m), {range:a, rect:X_TextRange_getCorrectRect(c, a), from:v, to:v + (a + "").length};
        }
        var A = k;
        var I = n;
      }
      p += h;
    }
  } else {
    for (k = !0, a || (b.isTextEdit ? a = b.createTextRange() : (a = X_elmBody.createTextRange(), a.moveToElementText(b))), f = a.text.length, a.collapse(!0), a.moveEnd("character", 1), u = 0; u < f; ++u) {
      F = u + 1 === f;
      G = X_TextRange_getCorrectRect(c, a);
      D = D || X_TextRange_hitRect(G, d, e);
      if (g(0 === u, F, u, G.top, G.bottom)) {
        return a.moveStart("character", v - u), F || a.moveEnd("character", -1), {range:a, rect:X_TextRange_getCorrectRect(c, a), from:v, to:v + a.text.length};
      }
      a.moveEnd("character", 1);
      a.moveStart("character", 1);
    }
  }
}
;var X_KB_SPECIALS = eval("({'8':'BS','9':'TAB','13':'ENTER','16':'SHIFT','17':'CTRL','18':'ALT','19':'PAUSE_BREAK','20':'SHIFT+CAPS_LOCK','27':'ESC','28':'trans','29':'notrans','33':'PAGE_UP','34':'PAGE_DOWN','35':'END','36':'HOME','37':'CSR_L','38':'CSR_U','39':'CSR_R','40':'CSR_D','44':'PRT_SCRN','45':'INS','46':'DEL','91':'LWIN','92':'RWIN','93':'APP','96':48,'97':49,'98':50,'99':51,'100':52,'101':53,'102':54,'103':55,'104':56,'105':57,'106':42,'107':43,'109':45,'110':46,'111':47,'112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','144':'NUM_LOCK','145':'SCROLL_LOCK','208':'CAPS_LOCK','240':'CAPS_LOCK','242':'K/H','243':'H/Z','244':'H/Z'})"), 
X_KB_DOWN_KEYS = {}, X_KB_CANCELED = {}, X_KB_lastIs10Key = !1, X_KB_lastKeyCode = 0, X_KB_TRANSFOEM = {}, X_kbManager = X_Class_override(X_EventDispatcher(), {handleEvent:function(a) {
  var b = a.keyCode, c = a.charCode, d = X_CALLBACK_NONE, e;
  switch(a.type) {
    case "keydown":
      if (X_KB_DOWN_KEYS[b]) {
        return X_KB_CANCELED[b] ? X_CALLBACK_PREVENT_DEFAULT : d;
      }
      if (e = X_KB_SPECIALS[b]) {
        if (X_Type_isNumber(e)) {
          return X_KB_lastKeyCode = b, X_KB_lastIs10Key = !0, d;
        }
        b && (X_KB_DOWN_KEYS[b] = !0, c = 0);
        d = this.dispatch({type:"keydown", keyCode:b, charCode:c, key:a.key, code:a.code, keyName:e || "", is10key:!!X_KB_lastIs10Key, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]});
        d & X_CALLBACK_PREVENT_DEFAULT && (X_KB_CANCELED[b] = !0);
      } else {
        if (X_KB_lastKeyCode = b, a.ctrlKey || a.altKey || a.metaKey) {
          d = this.dispatch({type:"keydown", keyCode:0, charCode:c, key:a.key, code:a.code, keyName:"", is10key:!1, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]}), d & X_CALLBACK_PREVENT_DEFAULT && (X_KB_CANCELED[b] = !0);
        }
      }
      return d;
    case "keypress":
      if (X_KB_DOWN_KEYS[c]) {
        return X_KB_CANCELED[c] ? X_CALLBACK_PREVENT_DEFAULT : d;
      }
      32 === b && (c = 32);
      32 <= c && 126 >= c && (X_KB_TRANSFOEM[X_KB_lastKeyCode] = c, d = this.dispatch({type:"keydown", keyCode:X_KB_lastIs10Key ? X_KB_lastKeyCode : 0, charCode:c, is10key:X_KB_lastIs10Key, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]}), X_KB_lastIs10Key = !1);
      return d;
    case "keyup":
      X_KB_CANCELED[b] && (d = X_CALLBACK_PREVENT_DEFAULT);
      !(e = X_KB_SPECIALS[b]) || X_KB_DOWN_KEYS[b] || X_KB_DOWN_KEYS[e] || (d |= this.dispatch({type:"keydown", keyCode:b, charCode:0, key:a.key, code:a.code, keyName:e, is10key:!1, isVirtual:!0, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]}));
      X_KB_DOWN_KEYS[b] && delete X_KB_DOWN_KEYS[b];
      X_KB_CANCELED[b] && delete X_KB_CANCELED[b];
      if (e) {
        c = 42 <= e ? e : 0;
      } else {
        c = X_KB_TRANSFOEM[b];
        if (!c) {
          return d;
        }
        delete X_KB_TRANSFOEM[b];
      }
      return d |= this.dispatch({type:"keyup", keyCode:b, charCode:c, key:a.key, code:a.code, keyName:X_Type_isString(e) ? e : "", shiftKey:X_KB_DOWN_KEYS[16], ctrlKey:X_KB_DOWN_KEYS[17], altKey:X_KB_DOWN_KEYS[18], metaKey:X_KB_DOWN_KEYS[224]});
  }
}}), X_KB = X.KB = {listen:function(a, b, c, d) {
  a && b && X_kbManager.listen(a, b, c, d);
  return X_KB;
}, listenOnce:function(a, b, c, d) {
  a && b && X_kbManager.listenOnce(a, b, c, d);
  return X_KB;
}, unlisten:function(a, b, c, d) {
  a && b && X_kbManager.unlisten(a, b, c, d);
  return X_KB;
}, listening:function(a, b, c, d) {
  return X_kbManager.listening(a, b, c, d);
}};
X_ViewPort.listen([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE], X_kbManager);
9 > (X_UA.Trident || X_UA.TridentMobile) ? X_ViewPort_document.listen(["keyup", "keydown", "keypress"], X_kbManager) : X_ViewPort.listen(["keyup", "keydown", "keypress"], X_kbManager);
X_TEMP.onRearchEndOfScript();
window.X = X;

})(this,document,navigator,location,screen,Object,Function,Array,String,Math,setTimeout,clearTimeout,parseFloat,parseInt)
