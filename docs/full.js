/*
 Copyright 2012-2014 pettanR team.
 https://sourceforge.jp/projects/pettanr/
 BSD 3-Clause License
*/
(function(undefined) {
  Function.prototype.apply || (Function.prototype.apply = function(x, y) {
    var apply = "__apply", a, i, r, j;
    x = x || window;
    y = y || [];
    if (x === window) {
      x[apply] = void 0;
    } else {
      if (x.constructor && x.constructor.prototype[apply]) {
        delete x.constructor.prototype[apply];
      } else {
        if (x[apply]) {
          delete x[apply];
        }
      }
    }
    x[apply] = this;
    if (!x[apply]) {
      x.constructor.prototype[apply] = this;
    }
    j = y.length;
    switch(j) {
      case 0:
        r = x[apply]();
        break;
      case 1:
        r = x[apply](y[0]);
        break;
      case 2:
        r = x[apply](y[0], y[1]);
        break;
      case 3:
        r = x[apply](y[0], y[1], y[2]);
        break;
      case 4:
        r = x[apply](y[0], y[1], y[2], y[3]);
        break;
      case 5:
        r = x[apply](y[0], y[1], y[2], y[3], y[4]);
        break;
      case 6:
        r = x[apply](y[0], y[1], y[2], y[3], y[4], y[5]);
        break;
      case 7:
        r = x[apply](y[0], y[1], y[2], y[3], y[4], y[5], y[6]);
        break;
      case 8:
        r = x[apply](y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7]);
        break;
      case 9:
        r = x[apply](y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8]);
        break;
      default:
        a = [];
        for (i = 0; i < j; ++i) {
          a[i] = "y[" + i + "]";
        }
        r = (new Function("x,y", "return x.__apply(" + a.join(",") + ")"))(x, y);
        break;
    }
    if (x === window) {
      x[apply] = void 0;
    } else {
      if (x.constructor && x.constructor.prototype[apply]) {
        delete x.constructor.prototype[apply];
      } else {
        if (x[apply]) {
          delete x[apply];
        }
      }
    }
    return r;
  });
  Function.prototype.call || (Function.prototype.call = function() {
    var a = arguments, x = a[0], y = [], i = 1, j = a.length;
    for (; i < j; ++i) {
      y[i - 1] = a[i];
    }
    return this.apply(x, y);
  });
  Array.prototype.pop || (Array.prototype.pop = function() {
    var r = this[this.length - 1];
    --this.length;
    return r;
  });
  Array.prototype.push || (Array.prototype.push = function() {
    var a = arguments, i = 0, j = a.length, l = this.length;
    for (; i < j; ++i) {
      this[l + i] = a[i];
    }
    return this.length;
  });
  Array.prototype.shift || (Array.prototype.shift = function() {
    var r = this[0], i = 1, j = this.length;
    for (; i < j; ++i) {
      this[i - 1] = this[i];
    }
    --this.length;
    return r;
  });
  Array.prototype.unshift || (Array.prototype.unshift = function() {
    var a = arguments, l = a.length, j = this.length += l - 1, i = j;
    for (; i >= l; --i) {
      this[i] = this[i - l];
    }
    for (i = 0; i < l; ++i) {
      this[i] = a[i];
    }
    return j;
  });
  Array.prototype.splice || (Array.prototype.splice = function(x, y) {
    var a = arguments, s = a.length - 2 - y, r = this.slice(x, x + y), i, j;
    if (s > 0) {
      for (i = this.length - 1, j = x + y; i >= j; --i) {
        this[i + s] = this[i];
      }
    } else {
      if (s < 0) {
        for (i = x + y, j = this.length; i < j; ++i) {
          this[i + s] = this[i];
        }
        this.length += s;
      }
    }
    for (i = 2, j = a.length; i < j; ++i) {
      this[i - 2 + x] = a[i];
    }
    return r;
  });
  Array.prototype.indexOf || (Array.prototype.indexOf = function(searchElement, fromIndex) {
    var l = this.length >>> 0, i;
    if (l === 0) {
      return -1;
    }
    if (fromIndex) {
      i = fromIndex || 0;
      i = i === -Infinity ? 0 : (i < 0 ? -i : i) | 0;
      if (l <= i) {
        return -1;
      }
    }
    for (i = 0 <= i ? i : 0 < l + i ? l + i : 0; i < l; ++i) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return -1;
  });
  var _builtin_skipEncodeURI = function() {
    var encodeURIComponentTarget = "!'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~", encodeURITarget = "#$&+,-/:;=?@", obj = {}, i;
    for (i = encodeURIComponentTarget.length; i;) {
      obj[encodeURIComponentTarget.charCodeAt(--i)] = 2;
    }
    for (i = encodeURITarget.length; i;) {
      obj[encodeURITarget.charCodeAt(--i)] = 1;
    }
    return obj;
  }();
  window["encodeURI"] || (window["encodeURI"] = function(x) {
    return _builtin_encodeURI(x, 0);
  });
  window["encodeURIComponent"] || (window["encodeURIComponent"] = function(x) {
    return _builtin_encodeURI(x, 1);
  });
  function _builtin_encodeURI(x, kind) {
    var result = [], skip = _builtin_skipEncodeURI, p = "%", i = 0, l, chr, c;
    x += "";
    for (l = x.length; i < l; ++i) {
      if (!(kind < skip[c = x.charCodeAt(i)])) {
        chr = (c < 16 ? "%0" + c.toString(16) : c < 128 ? p + c.toString(16) : c < 2048 ? p + (c >> 6 | 192).toString(16) + p + (c & 63 | 128).toString(16) : p + (c >> 12 | 224).toString(16) + p + (c >> 6 & 63 | 128).toString(16) + p + (c & 63 | 128).toString(16)).toUpperCase();
      } else {
        chr = x.charAt(i);
      }
      result[i] = chr;
    }
    return result.join("");
  }
  function _builtin_decodeURI(x) {
    var result = [], toInt = parseInt, toChrCode = String.fromCharCode, n = -1, i = 0, l, chr, decode, code, memory;
    x += "";
    for (l = x.length; i < l; ++i) {
      if (decode) {
        code = toInt(x.substr(i, 2), 16);
        ++i;
        if (127 < code) {
          if (223 < code) {
            memory = (code & 15) << 12;
            code = toInt(x.substr(i + 2, 2), 16) & 63;
            i += 3;
            memory += code << 6;
          } else {
            memory = (code & 63) << 6;
          }
          code = toInt(x.substr(i + 2, 2), 16) & 63;
          i += 3;
          code += memory;
        }
        result[++n] = toChrCode(code);
        decode = false;
      } else {
        chr = x.charAt(i);
        if (!(decode = chr === "%")) {
          result[++n] = chr;
        }
      }
    }
    return result.join("");
  }
  window["decodeURI"] || (window["decodeURI"] = _builtin_decodeURI);
  window["decodeURIComponent"] || (window["decodeURIComponent"] = window.decodeURI);
  function X(v) {
    if (X_Type_isFunction(v)) {
      X["ViewPort"]["listenOnce"](X_EVENT_XDOM_READY, v);
    } else {
      if (X_shortcutFunction) {
        return X_shortcutFunction.apply(X_shortcutContext || X, arguments);
      }
    }
  }
  if (!window["console"] || window.parent && window.parent.log) {
    console = {log:function(a) {
      var elm;
      if (window.parent) {
        elm = parent.document.all ? parent.document.all.log : parent.log || parent.document.getElementById("log");
        elm && (elm.innerHTML = a + "<br>" + elm.innerHTML);
      }
    }};
  }
  if (!console.dir) {
    console.dir = function() {
    };
  }
  var undefined, X_EMPTY_OBJECT = {}, X_TEMP = {onSystemReady:[]}, X_emptyFunction = new Function, X_shortcutFunction, X_shortcutContext;
  X["VERSION"] = "0.6.181";
  X["bootTime"] = +new Date;
  X["emptyFunction"] = X_emptyFunction;
  X["inHead"] = function(s) {
    if (!s) {
      return false;
    }
    if (!s.length) {
      return false;
    }
    s = s[s.length - 1];
    s = s.parentElement || s.parentNode || s;
    return s.tagName.toLowerCase() === "head";
  }(document.scripts || document.getElementsByTagName && document.getElementsByTagName("script") || document.all && document.all.tags("script"));
  var X_UA = X["UA"] = {}, X_UA_classNameForHTML = "", X_UA_Gecko_Version;
  (function() {
    function getNumber(str1, str2, v) {
      v = parseFloat(str1.split(str2)[1]);
      return 0 <= v ? v : 0;
    }
    function fromString(str1, str2) {
      return str1.indexOf(str2) === 0;
    }
    function findString(str1, str2) {
      return 0 <= str1.indexOf(str2);
    }
    var ua = X_UA, html = document.documentElement, dua = navigator.userAgent, dav = navigator.appVersion, tv = parseFloat(dav) | 0, sys = navigator.platform, docMode = document.documentMode, screenW = screen.width, screenH = screen.height, MathMax = Math.max, AudioElement = window.HTMLAudioElement, performance = window.performance, Int8Array = window.Int8Array, isTouch = window.ontouchstart !== undefined, verVersion = getNumber(dav, "Version/") || getNumber(dua, "Version/"), isPrsto = window.opera, 
    verOpera = isPrsto && (isPrsto.version ? parseFloat(isPrsto.version()) : MathMax(getNumber(dua, "Opera"), verVersion, tv)), isOPR = window.opr, isOpMin = window.operamini, verOpMin = isOpMin && MathMax(getNumber(dua, "Opera Mini/"), getNumber(dua, "Opera Mobi/"), verVersion), isUCWEB = findString(dua, "UCWEB"), verUC2 = getNumber(dua, " U2/"), isTrident = !isPrsto && (document.all || docMode), isEdge = !isTrident && html.msContentZoomFactor, isBlink = !isEdge && window.chrome, isSafari = findString(dua, 
    "Safari"), isIris = findString(dua.toLowerCase(), "iris"), isGecko = html && html.style.MozAppearance !== undefined, isKHTML = findString(dav, "Konqueror"), isYahooAdr = findString(dav, "YJApp-ANDROID"), isEdgeAdr = findString(dav, "EdgA/"), verPS3 = getNumber(dua.toUpperCase(), "PLAYSTATION 3"), isPSP = findString(dav, "PSP"), verPSVita = getNumber(dua, "PlayStation Vita"), isNDS = sys === "Nitro", isNDSi = sys === "Nintendo DSi", isN3DS = sys === "Nintendo 3DS", isNew3DS = sys === "New Nintendo 3DS" || 
    findString(dua, "iPhone OS 6_0") && screenW === 320 && screenH === 240, isWii = sys === "Nintendo Wii", isWiiU = sys === "Nintendo WiiU", isiOS = !isNew3DS && fromString(sys, "iP") || fromString(dua, "; iPh OS "), isWebOS = window.palmGetResource, verWP = getNumber(dua, "Windows Phone") || getNumber(dav, "Windows Phone OS ") || getNumber(dua, "; wds"), wpPCMode = findString(dav, "ZuneWP"), isWin = fromString(sys, "Win"), isMac = fromString(sys, "Mac"), isKobo = findString(dua, "Kobo"), isKindle = 
    findString(dua, "Kindle"), isSonyReader = findString(dua, "EBRD"), isMylo = tv === 2 && findString(dua, "Sony/COM2/"), isAndroid = findString(sys, "Android") || isGecko && findString(dav, "Android") || isYahooAdr, isLinux = findString(sys, "Linux"), isMeeGo = findString(dua, "MeeGo") && findString(dua, "NokiaBrowser/8.5.0"), isXBoxOne = findString(dua, "Xbox One"), isXBox360 = !isXBoxOne && findString(dua, "Xbox"), isFireFoxOS, isBlackBerry, isSolaris, verAndroid = getNumber(sys, "Android ") || 
    getNumber(dav, "Android ") || getNumber(dua, "Android ") || getNumber(dua, "; Adr "), verSafari = verVersion, verTrident = getNumber(dav, "Trident/"), verEdge = getNumber(dav, "Edge/"), verMSIE = docMode ? docMode : window.XMLHTTPRequest ? document.getElementsByTagName ? 7 : 4 : document.compatMode ? 6 : (0).toFixed ? 5.5 : window.attachEvent ? 5 : 4, verGecko = getNumber(dua, "rv:"), verWebKit = getNumber(dua, "AppleWebKit/"), verChrome = getNumber(dua, "Chrome/"), verOPR = getNumber(dua, "OPR/"), 
    verFennec = getNumber(dua, "Fennec/"), verNetscape = getNumber(dua, "Netscape6/") || getNumber(dua, "Netscape/") || getNumber(dua, "Navigator/"), verNetFront = getNumber(dua, "NetFront/"), ver_iCab = getNumber(dua, "iCab"), maybeAOSP = isBlink && verWebKit <= 534.3, maybePCMode = isTouch && (verWebKit || isGecko) && (sys === "Linux armv7l" || sys === "Linux i686") && findString(dua, "Linux x86_64") || !verAndroid && isYahooAdr, docRegElm = !verMSIE && document.registerElement, docExecCmd = !verMSIE && 
    document.execCommand, surelyPcMode, isPcMode, v, dpRatio;
    if (isKobo) {
      ua["Kobo"] = true;
    } else {
      if (isKindle) {
        ua["KindlePW"] = true;
      } else {
        if (isSonyReader) {
          ua["SonyReader"] = true;
        } else {
          if (isWiiU) {
            ua["WiiU"] = true;
          } else {
            if (isWii) {
              ua["Wii"] = true;
            } else {
              if (isNDS) {
                ua["NDS"] = true;
              } else {
                if (isNDSi) {
                  ua["NDSi"] = true;
                } else {
                  if (isN3DS) {
                    ua["N3DS"] = true;
                  } else {
                    if (isNew3DS) {
                      ua["New3DS"] = true;
                    } else {
                      if (verPS3) {
                        ua["PS3"] = true;
                      } else {
                        if (isPSP) {
                          ua["PSP"] = true;
                        } else {
                          if (verPSVita) {
                            ua["PSVita"] = verPSVita;
                          } else {
                            if (isXBox360) {
                              ua["XBox360"] = true;
                            } else {
                              if (isXBoxOne) {
                                ua["XBoxOne"] = true;
                              } else {
                                if (isMylo) {
                                  ua["Mylo"] = 2;
                                  verNetFront = 3.4;
                                } else {
                                  if (isWebOS) {
                                    ua["WebOS"] = true;
                                  } else {
                                    if (isMeeGo) {
                                      ua["MeeGo"] = true;
                                    } else {
                                      if (isiOS) {
                                        dpRatio = window.devicePixelRatio === 1;
                                        v = getNumber(dav.split("_").join("."), "OS ");
                                        if (!v) {
                                          isPcMode = true;
                                          v = window.WebAssembly ? 11.2 : window.HTMLMeterElement ? 10.3 : window.Proxy ? 10.2 : window.HTMLPictureElement ? 9.3 : Number.isNaN ? 9.2 : window.SharedWorker ? performance && performance.now ? 8.0 : 8.4 : docExecCmd ? 7.1 : window.webkitURL ? 6.1 : window.Worker ? 5.1 : Int8Array ? 4.3 : AudioElement ? 4.1 : 3.2;
                                        }
                                        ua["iOS"] = v;
                                        v = screenW === screenH * 1.5 || screenW * 1.5 === screenH;
                                        switch(sys) {
                                          case "iPhone":
                                          case "iPhone Simulator":
                                            ua["iPhone"] = v ? dpRatio ? "3GS-" : "4|4s" : "5+";
                                            break;
                                          case "iPad":
                                          case "iPad Simulator":
                                            ua["iPad"] = dpRatio ? "2-|1min-" : "3+|2min+";
                                            break;
                                          case "iPod":
                                            ua["iPod"] = v ? dpRatio ? "3-" : "4" : "5+";
                                            break;
                                        }
                                      } else {
                                        if (verWP) {
                                          ua["WinPhone"] = verWP;
                                        } else {
                                          if (verEdge && sys === "ARM") {
                                            ua["WinPhone"] = 10;
                                            isPcMode = true;
                                          } else {
                                            if (wpPCMode) {
                                              ua["WinPhone"] = verMSIE === 11 ? 8.1 : verMSIE === 10 ? 8 : verMSIE === 9 ? 7.5 : verMSIE === 7 ? 7 : "?";
                                              isPcMode = true;
                                            } else {
                                              if (isWin) {
                                                switch(sys) {
                                                  case "WinCE":
                                                    ua[sys] = true;
                                                    break;
                                                  case "Win16":
                                                  case "Win32":
                                                  case "Win64":
                                                    ua[sys] = true;
                                                    if (v = dua.split("Windows NT 10")[1]) {
                                                      switch(v.substr(0, 2)) {
                                                        case ".0":
                                                          v = 10;
                                                          break;
                                                        default:
                                                          v = "?";
                                                      }
                                                    } else {
                                                      if (v = dua.split("Windows NT ")[1]) {
                                                        switch(v.substr(0, 3)) {
                                                          case "6.3":
                                                            v = 8.1;
                                                            break;
                                                          case "6.2":
                                                            v = 8;
                                                            break;
                                                          case "6.1":
                                                            v = 7;
                                                            break;
                                                          case "6.0":
                                                            v = "Vista";
                                                            break;
                                                          case "5.2":
                                                            v = "2003|XP64";
                                                            break;
                                                          case "5.1":
                                                            v = findString(v, "5.1; SV1") ? "XPSP2" : "XP";
                                                            break;
                                                          case "5.0":
                                                            v = findString(v, "5.01") ? "2kSP1" : 2000;
                                                            break;
                                                          case "4.0":
                                                            v = "NT";
                                                            break;
                                                          default:
                                                            v = "?";
                                                        }
                                                      } else {
                                                        if (v = dua.split("Windows ")[1]) {
                                                          switch(v.substr(0, 2)) {
                                                            case "98":
                                                              v = findString(v, "98; Win 9x 4.90") ? "ME" : "98|98SE";
                                                              break;
                                                            case "95":
                                                              v = 95;
                                                              break;
                                                            case "3.":
                                                              v = parseFloat(v);
                                                              break;
                                                            default:
                                                              v = "?";
                                                          }
                                                        } else {
                                                          v = "?";
                                                        }
                                                      }
                                                    }
                                                    ua["Windows"] = v;
                                                    break;
                                                }
                                              } else {
                                                if (isMac) {
                                                  ua["Mac"] = true;
                                                  switch(sys) {
                                                    case "MacPowerPC":
                                                      sys = "MacPPC";
                                                    case "MacPPC":
                                                    case "Mac68K":
                                                    case "MacIntel":
                                                      ua[sys] = true;
                                                  }
                                                } else {
                                                  if (isAndroid && isGecko) {
                                                    if (findString(dua, "Android 4.4;")) {
                                                      v = "2.3+";
                                                    } else {
                                                      if (4 <= verAndroid) {
                                                        v = verAndroid;
                                                      } else {
                                                        if (isAndroid) {
                                                          v = "2.2+";
                                                        }
                                                      }
                                                    }
                                                    if (maybePCMode) {
                                                      isPcMode = true;
                                                    }
                                                  } else {
                                                    if (isAndroid && isPrsto) {
                                                      if (verAndroid) {
                                                        v = verAndroid;
                                                      } else {
                                                        v = "1.6+";
                                                        isPcMode = true;
                                                      }
                                                      ua["Android"] = v;
                                                    } else {
                                                      if (verAndroid) {
                                                        ua["Android"] = verAndroid;
                                                      } else {
                                                        if (isLinux && maybePCMode) {
                                                          surelyPcMode = true;
                                                          if (isBlink && !maybeAOSP || isOPR || verOPR) {
                                                            v = verAndroid = "4+";
                                                          } else {
                                                            if (docRegElm) {
                                                              v = verAndroid = docExecCmd ? 4.4 : 5;
                                                            } else {
                                                              if (Int8Array) {
                                                                v = verAndroid = !navigator.connection ? 4.4 : !window.searchBoxJavaBridge_ && !isBlink ? 4.2 : Number.isNaN ? 4.1 : 4;
                                                              } else {
                                                                v = verAndroid = verWebKit < 529 ? 1.5 : verWebKit < 531 ? 2.0 : verWebKit < 534 ? AudioElement ? 2.3 : 2.2 : 3;
                                                              }
                                                            }
                                                          }
                                                          ua["Android"] = v;
                                                        } else {
                                                          if (isLinux) {
                                                            ua["Linux"] = true;
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
    if (verNetFront) {
      ua["NetFront"] = verNetFront;
    } else {
      if (ver_iCab) {
        ua["iCab"] = ver_iCab;
      } else {
        if (verPS3) {
          ua["Sony"] = verPS3;
        } else {
          if (isOpMin) {
            ua["OperaMin"] = verOpMin;
          } else {
            if (isUCWEB) {
              ua["UCWEB"] = verUC2;
            } else {
              if (isPrsto) {
                ua["Opera"] = ua["Prsto"] = verOpera;
              } else {
                if (isTrident) {
                  verTrident = verTrident ? verTrident + 4 | 0 : verMSIE;
                  if (verTrident !== verMSIE) {
                    ua["IEHost"] = verTrident;
                  }
                  ua["IE"] = verMSIE;
                  if (10 <= verMSIE && 8 <= ua["Windows"] && ua["Windows"] < 9) {
                    if (screenY === 0 && innerHeight + 1 !== outerHeight) {
                      ua["ModernIE"] = verMSIE;
                    }
                  }
                  if (ua["Mac"]) {
                    ua["MacIE"] = verMSIE;
                  }
                } else {
                  if (isEdge) {
                    ua["Edge"] = verEdge;
                  } else {
                    if (isGecko) {
                      ua["Gecko"] = verGecko;
                      if (verFennec) {
                        ua["Fennec"] = verFennec;
                      } else {
                        if (isAndroid) {
                          ua["Fennec"] = verGecko;
                        } else {
                          if (verNetscape) {
                            ua["NN"] = verNetscape;
                          }
                        }
                      }
                    } else {
                      if (isOPR || verOPR) {
                        ua["OPR"] = verOPR;
                        ua["Blink"] = verChrome;
                        if (surelyPcMode) {
                          isPcMode = true;
                        }
                      } else {
                        if (verAndroid && maybeAOSP) {
                          ua["AOSP"] = verAndroid;
                          if (surelyPcMode) {
                            isPcMode = true;
                          }
                        } else {
                          if (isBlink) {
                            ua["Blink"] = verChrome;
                            if (surelyPcMode) {
                              isPcMode = true;
                            }
                          } else {
                            if (verAndroid && docRegElm) {
                              ua["CrWV"] = verAndroid;
                              if (surelyPcMode) {
                                isPcMode = true;
                              }
                            } else {
                              if (verAndroid && (verVersion || surelyPcMode)) {
                                ua["AOSP"] = verAndroid;
                                if (surelyPcMode) {
                                  isPcMode = true;
                                }
                              } else {
                                if (isKHTML) {
                                  ua["Khtml"] = tv;
                                } else {
                                  if (verWebKit) {
                                    ua["WebKit"] = verWebKit;
                                    if (verChrome) {
                                      ua["Chrome"] = verChrome;
                                    } else {
                                      if (isIris) {
                                        ua["Iris"] = verWebKit;
                                      } else {
                                        if (isSafari) {
                                          if (verSafari) {
                                            v = verSafari;
                                          } else {
                                            if (verWebKit <= 528.16) {
                                              v = verWebKit < 73 ? 0.8 : verWebKit < 85 ? 0.9 : verWebKit < 100 ? 1 : verWebKit < 125 ? 1.1 : verWebKit < 312 ? 1.2 : verWebKit < 412 ? 1.3 : verWebKit <= 419.3 ? 2 : verWebKit <= 525.13 ? 3 : verWebKit <= 525.25 ? 3.1 : 3.2;
                                            }
                                          }
                                          ua["Safari"] = v;
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
    if (isPcMode) {
      ua["PCMode"] = true;
    }
  })();
  (function() {
    var k, v;
    if (X_UA["IE"] < 5) {
      if (X_UA["Mac"]) {
        X_UA_classNameForHTML = "Mac";
      } else {
        if (X_UA["WinCE"]) {
          X_UA_classNameForHTML = "WinCE";
        } else {
          if (X_UA["Windows"]) {
            X_UA_classNameForHTML = "Win";
          } else {
            X_UA_classNameForHTML = "Other";
          }
        }
      }
      X_UA_classNameForHTML += "_IE4";
      if (4.5 <= X_UA["IE"]) {
        X_UA_classNameForHTML += "5";
      }
    } else {
      for (k in X_UA) {
        v = X_UA[k];
        if (v) {
          if (v !== true) {
            X_UA_classNameForHTML += k + v + " ";
          } else {
            X_UA_classNameForHTML += k + " ";
          }
        }
      }
    }
    if (X_UA["Gecko"] && (v = navigator.userAgent.split("rv:")[1])) {
      v = v.split(".");
      X_UA_Gecko_Version = v[0] + (0 <= parseFloat(v[1]) ? "." + v[1] + (0 < parseFloat(v[2]) ? "." + v[2] : "") : "");
    }
  })();
  var X_UA_DOM = {}, X_UA_EVENT = {}, X_UA_HID = {};
  if (X_UA["IE"] < 5) {
    X_UA_DOM.IE4 = true;
    X_UA_EVENT.IE4 = true;
  } else {
    if (X_UA["Mac"] && X_UA["IE"]) {
      X_UA_DOM.W3C = true;
      X_UA_EVENT.IE = true;
    } else {
      if (document.getElementById) {
        X_UA_DOM.W3C = true;
        if (document.addEventListener) {
          X_UA_EVENT.W3C = true;
        } else {
          if (document.attachEvent) {
            X_UA_EVENT.IE = true;
          } else {
            X_UA_EVENT.DOM0 = true;
          }
        }
      }
    }
  }
  var X_elmHtml = document.documentElement || X_UA_DOM.W3C ? document.getElementsByTagName("html")[0] : X_UA_DOM.IE4 ? document.all.tags("html")[0] : null, X_elmHead = X_UA_DOM.W3C ? document.getElementsByTagName("head")[0] : X_UA_DOM.IE4 ? document.all.tags("head")[0] : null, X_elmBody;
  if (navigator.msPointerEnabled || navigator.pointerEnabled) {
    X_UA_HID.POINTER = true;
  }
  if (!X_UA_HID.POINTER && window.ontouchstart !== undefined) {
    X_UA_HID.TOUCH = true;
  }
  var X_Script_VBS_ENABLED = X_UA["Windows"] && !X_UA["WinCE"] && !X_UA["WinPhone"] && X_UA["IE"] < 11, X_Script_gte15 = !(X_UA["IE"] < 5.5) && new Function("f,a", "try{return f.apply({},a)}catch(e){}");
  X["Script"] = {"tryIfSafe":X_Script_try, "VBS":X_Script_VBS_ENABLED};
  if (X_Script_VBS_ENABLED) {
    X_Script_gte15 || document.write("<script type=text/vbscript>" + ["Function vbs_testAXO(v)", "On Error Resume Next", "Set ax = CreateObject(v)", "If Err.Number Then", "ax = 1", "End If", "Err.Clear", "vbs_testAXO = ax", "End Function"].join("\n") + "\x3c/script>");
    X_Script_gte15 || document.write("<script type=text/vbscript>" + ["Function vbs_testAE()", "On Error Resume Next", "Set ae = Document.ActiveElement", "If Err.Number Then", "ae = 1", "End If", "Err.Clear", "vbs_testAE = ae", "End Function"].join("\n") + "\x3c/script>");
  }
  function X_Script_try(func, args) {
    if (!X_Script_gte15) {
      return;
    }
    return X_Script_gte15(func, args || []);
  }
  function X_Script_createActiveXObjectSafty(name) {
    if (!X_Script_gte15) {
      if (X_Script_VBS_ENABLED) {
        return !window["vbs_testAXO"](name) && X_Script_createActiveXObject(name);
      }
      return X_Script_createActiveXObject(name);
    }
    return X_Script_try(X_Script_createActiveXObject, [name]);
  }
  function X_Script_createActiveXObject(name) {
    return new ActiveXObject(name);
  }
  if (X_UA["IE6"] && !X_Script_try(function() {
    document.execCommand("BackgroundImageCache", false, true);
    return 1;
  })) {
    X_UA["ieExeComError"] = true;
  }
  var X_Type_isArray = new Function("v", X_UA["IE"] < 5.5 || X_UA["NetFront"] < 4 ? "return v&&v.push===Array.prototype.push" : X_UA["IE"] ? 'return v&&Object.prototype.toString.call(v)==="[object Array]"' : "return v instanceof Array"), X_Type_isHTMLElement = new Function("v", X_UA["IE"] < 5 || X_UA["MacIE"] ? "return v&&v.tagName&&v.insertAdjacentHTML&&!0" : X_UA["NetFront"] < 4 ? "return v&&v.nodeType===1" : window["HTMLElement"] ? "return v instanceof HTMLElement" : "return v&&v.appendChild&&v.nodeType===1");
  X["Type"] = {"isObject":X_Type_isObject, "isFunction":X_Type_isFunction, "isUnknown":X_Type_isUnknown, "isArray":X_Type_isArray, "isBoolean":X_Type_isBoolean, "isString":X_Type_isString, "isNumber":X_Type_isNumber, "isFinite":X_Type_isFinite, "isNaN":X_Type_isNaN, "isHTMLElement":X_Type_isHTMLElement, "isImage":X_Type_isImage, "isNull":X_Type_isNull, "isUndefined":X_Type_isUndefined};
  function X_Type_isObject(v) {
    return v && typeof v === "object" && v !== v + "" && v !== v + 0 && v !== true;
  }
  function X_Type_isFunction(v) {
    return typeof v === "function";
  }
  function X_Type_isUnknown(v) {
    return typeof v === "unknown";
  }
  function X_Type_isBoolean(v) {
    return v === true || v === false;
  }
  function X_Type_isString(v) {
    return v === v + "";
  }
  function X_Type_isNumber(v) {
    return v + 0 === v || v !== v;
  }
  function X_Type_isFinite(v) {
    return v + 0 === v && isFinite(v);
  }
  function X_Type_isNaN(v) {
    return v !== v;
  }
  function X_Type_isImage(v) {
    if (v && v.constructor === window.Image) {
      return true;
    }
    if (v && window.HTMLImageElement && v.constructor === window.HTMLImageElement) {
      return true;
    }
    if (X_UA["WebKit"] < 525.13) {
      if (v && v.src !== undefined && v.onload !== undefined && X_Type_isNumber(v.height) && X_Type_isNumber(v.width) && X_Type_isBoolean(v.complete)) {
        return true;
      }
    }
    return false;
  }
  function X_Type_isNull(v) {
    return v === null;
  }
  function X_Type_isUndefined(v) {
    return v === undefined;
  }
  console.log("X.Core.Type");
  var X_Object_inObject = !X_Script_gte15 ? function(name, obj, _) {
    name += "";
    if (obj[name]) {
      return true;
    }
    for (_ in obj) {
      if (_ === name) {
        return true;
      }
    }
    return false;
  } : new Function("a,b", 'return (""+a) in b');
  X["Object"] = {"copy":X_Object_copy, "deepCopy":X_Object_deepCopy, "override":X_Object_override, "clear":X_Object_clear, "isEmpty":X_Object_isEmpty, "inObject":X_Object_inObject, "find":X_Object_find};
  function X_Object_copy(src) {
    var ret, k;
    if (!src || !X_Type_isObject(src)) {
      return src;
    }
    ret = {};
    for (k in src) {
      ret[k] = src[k];
    }
    return ret;
  }
  function X_Object_override(target, src) {
    var k;
    if (!src || !X_Type_isObject(src)) {
      return target;
    }
    for (k in src) {
      target[k] = src[k];
    }
    return target;
  }
  function X_Object_clear(obj, k) {
    if (obj) {
      for (k in obj) {
        delete obj[k];
      }
    }
  }
  function X_Object_deepCopy(src) {
    return X_Object_deepCopy_(src, [], [], -1);
  }
  function X_Object_deepCopy_(src, objSrc, objCopy, n) {
    var ret, i, k;
    if (!src) {
      return src;
    } else {
      if (X_Type_isArray(src)) {
        i = objSrc.indexOf(src);
        if (i !== -1) {
          return objCopy[i];
        }
        objSrc[++n] = src;
        objCopy[n] = ret = [];
      } else {
        if (X_Type_isObject(src)) {
          i = objSrc.indexOf(src);
          if (i !== -1) {
            return objCopy[i];
          }
          objSrc[++n] = src;
          objCopy[n] = ret = {};
        } else {
          return src;
        }
      }
    }
    for (k in src) {
      ret[k] = X_Object_deepCopy_(src[k], objSrc, objCopy, n);
    }
    return ret;
  }
  function X_Object_isEmpty(v) {
    if (!v) {
      return;
    }
    for (var k in v) {
      return false;
    }
    return true;
  }
  function X_Object_find(obj, selector) {
    var selectors = selector.split(">");
    for (; selector = selectors.shift();) {
      obj = obj[selector];
      if (!obj) {
        return;
      }
    }
    return obj;
  }
  X["Array"] = {"copy":X_Array_copy};
  function X_Array_copy(ary) {
    var ret = [], i = 0, l = ary.length;
    for (; i < l; ++i) {
      ret[i] = ary[i];
    }
    return ret;
  }
  var X_String_CRLF = String.fromCharCode(13) + String.fromCharCode(10), X_String_CHAR_REFS = {"&nbsp;":160, "&iexcl;":161, "&cent;":162, "&pound;":163, "&curren;":164, "&yen;":165, "&brvbar;":166, "&sect;":167, "&uml;":168, "&copy;":169, "&ordf;":170, "&laquo;":171, "&not;":172, "&shy;":173, "&reg;":174, "&macr;":175, "&deg;":176, "&plusmn;":177, "&sup2;":178, "&sup3;":179, "&acute;":180, "&micro;":181, "&para;":182, "&middot;":183, "&cedil;":184, "&sup1;":185, "&ordm;":186, "&raquo;":187, "&frac14;":188, 
  "&frac12;":189, "&frac34;":190, "&iquest;":191, "&Agrave;":192, "&Aacute;":193, "&Acirc;":194, "&Atilde;":195, "&Auml;":196, "&Aring;":197, "&AElig;":198, "&Ccedil;":199, "&Egrave;":200, "&Eacute;":201, "&Ecirc;":202, "&Euml;":203, "&Igrave;":204, "&Iacute;":205, "&Icirc;":206, "&Iuml;":207, "&ETH;":208, "&Ntilde;":209, "&Ograve;":210, "&Oacute;":211, "&Ocirc;":212, "&Otilde;":213, "&Ouml;":214, "&times;":215, "&Oslash;":216, "&Ugrave;":217, "&Uacute;":218, "&Ucirc;":219, "&Uuml;":220, "&Yacute;":221, 
  "&THORN;":222, "&szlig;":223, "&agrave;":224, "&aacute;":225, "&acirc;":226, "&atilde;":227, "&auml;":228, "&aring;":229, "&aelig;":230, "&ccedil;":231, "&egrave;":232, "&eacute;":233, "&ecirc;":234, "&euml;":235, "&igrave;":236, "&iacute;":237, "&icirc;":238, "&iuml;":239, "&eth;":240, "&ntilde;":241, "&ograve;":242, "&oacute;":243, "&ocirc;":244, "&otilde;":245, "&ouml;":246, "&divide;":247, "&oslash;":248, "&ugrave;":249, "&uacute;":250, "&ucirc;":251, "&uuml;":252, "&yacute;":253, "&thorn;":254, 
  "&yuml;":255, "&OElig;":338, "&oelig;":339, "&Scaron;":352, "&scaron;":353, "&Yuml;":376, "&circ;":710, "&tilde;":732, "&fnof;":402, "&Alpha;":913, "&Beta;":914, "&Gamma;":915, "&Delta;":916, "&Epsilon;":917, "&Zeta;":918, "&Eta;":919, "&Theta;":920, "&Iota;":921, "&Kappa;":922, "&Lambda;":923, "&Mu;":924, "&Nu;":925, "&Xi;":926, "&Omicron;":927, "&Pi;":928, "&Rho;":929, "&Sigma;":931, "&Tau;":932, "&Upsilon;":933, "&Phi;":934, "&Chi;":935, "&Psi;":936, "&Omega;":937, "&alpha;":945, "&beta;":946, 
  "&gamma;":947, "&delta;":948, "&epsilon;":949, "&zeta;":950, "&eta;":951, "&theta;":952, "&iota;":953, "&kappa;":954, "&lambda;":955, "&mu;":956, "&nu;":957, "&xi;":958, "&omicron;":959, "&pi;":960, "&rho;":961, "&sigmaf;":962, "&sigma;":963, "&tau;":964, "&upsilon;":965, "&phi;":966, "&chi;":967, "&psi;":968, "&omega;":969, "&thetasym;":977, "&upsih;":978, "&piv;":982, "&ensp;":8194, "&emsp;":8195, "&thinsp;":8201, "&zwnj;":8204, "&zwj;":8205, "&lrm;":8206, "&rlm;":8207, "&ndash;":8211, "&mdash;":8212, 
  "&lsquo;":8216, "&rsquo;":8217, "&sbquo;":8218, "&ldquo;":8220, "&rdquo;":8221, "&bdquo;":8222, "&dagger;":8224, "&Dagger;":8225, "&bull;":8226, "&hellip;":8230, "&permil;":8240, "&prime;":8242, "&Prime;":8243, "&lsaquo;":8249, "&rsaquo;":8250, "&oline;":8254, "&frasl;":8260, "&euro;":8364, "&image;":8465, "&ewierp;":8472, "&real;":8476, "&trade;":8482, "&alefsym;":8501, "&larr;":8592, "&uarr;":8593, "&rarr;":8594, "&darr;":8595, "&harr;":8596, "&crarr;":8629, "&lArr;":8656, "&uArr;":8657, "&rArr;":8658, 
  "&dArr;":8659, "&hArr;":8660, "&forall;":8704, "&part;":8706, "&exist;":8707, "&empty;":8709, "&nabla;":8711, "&isin;":8712, "&notin;":8713, "&ni;":8715, "&prod;":8719, "&sum;":8721, "&minus;":8722, "&lowast;":8727, "&radic;":8730, "&prop;":8733, "&infin;":8734, "&ang;":8736, "&and;":8743, "&or;":8744, "&cap;":8745, "&cup;":8746, "&int;":8747, "&there4;":8756, "&sim;":8764, "&cong;":8773, "&asymp;":8776, "&ne;":8800, "&equiv;":8801, "&le;":8804, "&ge;":8805, "&sub;":8834, "&sup;":8835, "&nsub;":8836, 
  "&sube;":8838, "&supe;":8839, "&oplus;":8853, "&otimes;":8855, "&perp;":8869, "&sdot;":8901, "&lceil;":8968, "&rceil;":8969, "&lfloor;":8970, "&rfloor;":8971, "&lang;":9001, "&rang;":9002, "&loz;":9674, "&spades;":9824, "&clubs;":9827, "&hearts;":9829, "&diams;":9830};
  (function(refs, k) {
    for (k in refs) {
      refs[k] = String.fromCharCode(refs[k]);
    }
  })(X_String_CHAR_REFS);
  X["String"] = {"parse":X_String_parse, "cleanupWhiteSpace":X_String_cleanupWhiteSpace, "whiteSpaceToTag":X_String_whiteSpaceToTag, "chrReferanceTo":X_String_chrReferanceTo, "toChrReferance":X_String_toChrReferance, "isNumberString":X_String_isNumberString, "serialize":X_String_serialize};
  function X_String_parse(v) {
    var _v;
    if (X_Type_isString(v)) {
      switch(v) {
        case "":
          return v;
        case "NaN":
          return NaN;
        case "null":
          return null;
        case "true":
          return true;
        case "false":
          return false;
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        case "undefined":
          return;
      }
      _v = v.split(" ").join("");
      if (X_String_isNumberString(_v)) {
        return _v - 0;
      }
    }
    return v;
  }
  function X_String_cleanupWhiteSpace(text) {
    var _ = " ", __ = "  ";
    if (text == null || text === "") {
      return "";
    }
    text = ("" + text).split(X_String_CRLF).join(_).split("\r").join(_).split("\n").join(_).split("\t").join(_).split("\f").join(_).split("\b").join(_);
    while (true) {
      text = text.split(__);
      if (text.length < 2) {
        return text[0];
      }
      text = text.join(_);
    }
  }
  function X_String_whiteSpaceToTag(text) {
    if (text == null || text === "") {
      return "";
    }
    return ("" + text).split(X_String_CRLF).join("<br>").split("\r").join("<br>").split("\n").join("<br>").split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;").split("\f").join("").split("\b").join("");
  }
  function X_String_chrReferanceTo(str) {
    var refs, k;
    if (str == null || str === "") {
      return "";
    }
    if (str.indexOf("&") === -1) {
      return str;
    }
    str = ("" + str).split("&quot;").join('"').split("&apos;").join("'").split("&lt;").join("<").split("&gt;").join(">");
    if (str.indexOf("&") === -1) {
      return str;
    }
    refs = X_String_CHAR_REFS;
    for (k in refs) {
      str = str.split(k).join(refs[k]);
    }
    return str.split("&amp;").join("&");
  }
  function X_String_toChrReferance(str) {
    var refs, k;
    if (str == null || str === "") {
      return "";
    }
    str = X_String_toChrReferanceForHtmlSafety(str);
    refs = X_String_CHAR_REFS;
    for (k in refs) {
      str = str.split(refs[k]).join(k);
    }
    return str;
  }
  function X_String_toChrReferanceForHtmlSafety(str) {
    if (str == null || str === "") {
      return "";
    }
    return ("" + str).split("&").join("&amp;").split('"').join("&quot;").split("'").join("&apos;").split("<").join("&lt;").split(">").join("&gt;");
  }
  function X_String_isNumberString(v) {
    var n = v - 0;
    return "" + n === v || "" + n === "0" + v;
  }
  function X_String_serialize(a, traditional) {
    var prefix, list = [];
    for (prefix in a) {
      X_String_serialize_buildParams(list, prefix, a[prefix], !!traditional);
    }
    return list.join("&").split("%20").join("+");
  }
  function X_String_serialize_addParam(list, key, value) {
    value = X_Type_isFunction(value) ? value() : value == null ? "" : value;
    list[list.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }
  function X_String_serialize_buildParams(list, prefix, obj, traditional) {
    var name, i, l, v;
    if (X_Type_isArray(obj)) {
      for (i = 0, l = obj.length; i < l; ++i) {
        v = obj[i];
        if (traditional || prefix === "[]") {
          X_String_serialize_addParam(list, prefix, v);
        } else {
          X_String_serialize_buildParams(list, prefix + "[" + (X_Type_isObject(v) ? i : "") + "]", v, traditional);
        }
      }
    } else {
      if (!traditional && X_Type_isObject(obj)) {
        for (name in obj) {
          X_String_serialize_buildParams(list, prefix + "[" + name + "]", obj[name], traditional);
        }
      } else {
        X_String_serialize_addParam(list, prefix, obj);
      }
    }
  }
  X["Number"] = {"conpareVersion":X_Number_conpareVersion};
  function X_Number_conpareVersion(v1, v2) {
    var i = 0, l, n1, n2;
    v1 = v1.split(".");
    v2 = v2.split(".");
    l = Math.min(v1.length, v2.length);
    for (; i < l; ++i) {
      n1 = parseFloat(v1[i]);
      n2 = parseFloat(v2[i]);
      if (n1 !== n2) {
        return n1 > n2 ? 1 : -1;
      }
    }
    if (v1.length === v2.length) {
      return 0;
    }
    return v1.length > v2.length ? 1 : -1;
  }
  var X_URL_BASE_URL = function(parts) {
    var last = 1 < parts.length && parts[parts.length - 1];
    if (last !== false && (last === "" || last.indexOf(".") !== -1)) {
      --parts.length;
    }
    return parts.join("/");
  }(X_URL_cleanup(location.href).split("/")), X_URL_HOST = location.protocol + "//" + location.hostname, X_URL_IS_FILE = location.protocol === "file:", X_URL_IS_LOCAL = X_URL_IS_FILE || location.hostname === "localhost" || location.hostname === "127.0.0.1", X_URL_PARAMS = X_URL_paramToObj(location.search.slice(1));
  X["URL"] = {"BASE_URL":X_URL_BASE_URL, "IS_FILE":X_URL_IS_FILE, "IS_LOCAL":X_URL_IS_LOCAL, "PARAMS":X_URL_PARAMS, "create":X_URL_create, "toAbsolutePath":X_URL_toAbsolutePath, "objToParam":X_URL_objToParam, "paramToObj":X_URL_paramToObj, "isSameDomain":X_URL_isSameDomain, "isSameProtocol":X_URL_isSameProtocol, "isLocal":X_URL_isLocal, "cleanup":X_URL_cleanup, "getEXT":X_URL_getEXT, "getSearch":X_URL_getSearch, "getHash":X_URL_getHash};
  function X_URL_toAbsolutePath(path) {
    var s = "/", ss = "//", _ary, ary, i = 0;
    if ("http:file:https".indexOf(path.substr(0, 5)) !== -1) {
      return path;
    }
    _ary = X_URL_BASE_URL.split(ss);
    ary = _ary[1].split(s);
    if (path.charAt(0) === s) {
      return [_ary[0], ss, ary[0], path].join("");
    }
    if (path.substr(0, 2) === "./") {
      path = path.substr(2);
    } else {
      while (path.substr(i, 3) === "../") {
        --ary.length;
        i += 3;
      }
      if (i) {
        path = path.substr(i);
      }
    }
    return [_ary[0], ss, ary.join(s), s, path].join("");
  }
  function X_URL_isSameDomain(path) {
    path = X_URL_cleanup(X_URL_toAbsolutePath(path));
    return path === X_URL_HOST || path.indexOf(X_URL_HOST + "/") === 0;
  }
  function X_URL_isSameProtocol(path) {
    return X_URL_toAbsolutePath(path).indexOf(location.protocol) === 0;
  }
  function X_URL_isLocal(path) {
    return X_URL_toAbsolutePath(path).indexOf("file:") === 0;
  }
  function X_URL_cleanup(path) {
    return path.split("?")[0].split("#")[0];
  }
  function X_URL_getEXT(path) {
    path = X_URL_cleanup(path).split(".");
    return path.length ? path.pop() : "";
  }
  function X_URL_getSearch(path) {
    path = path.split("#")[0].split("?");
    path.splice(0, 1);
    return path.join("?");
  }
  function X_URL_getHash(path) {
    path = path.split("#");
    path.splice(0, 1);
    return path.join("#");
  }
  function X_URL_objToParam(data) {
    var result = [], k, n = -1;
    for (k in data) {
      if (n !== -1) {
        result[++n] = "&";
      }
      result[++n] = k;
      result[++n] = "=";
      result[++n] = encodeURIComponent(data[k]);
    }
    return result.join("");
  }
  function X_URL_create(url, params) {
    if (!X_Type_isObject(params) || !(params = X_URL_objToParam(params))) {
      return url;
    }
    return url + (url.indexOf("?") !== -1 ? "&" : "?") + params;
  }
  function X_URL_paramToObj(str) {
    var i = 0, obj = {}, parts, l, pair, p;
    if (!str) {
      return obj;
    }
    for (parts = str.split("&"), l = parts.length; i < l; ++i) {
      pair = parts[i];
      p = pair.indexOf("=");
      if (p === -1) {
        obj[decodeURIComponent(pair)] = true;
      } else {
        obj[decodeURIComponent(pair.substr(0, p))] = X_String_parse(decodeURIComponent(pair.substr(p + 1)));
      }
    }
    return obj;
  }
  X["Pair"] = {"create":X_Pair_create, "get":X_Pair_get, "release":X_Pair_release};
  var X_Pair_SIZE = 1024, X_Pair_KEY_STORE_LIST = [[]], X_Pair_PAIR_STORE_LIST = [[]], X_Pair_noChashe = false, X_Pair_functionString = new Function("s", "p", "k", function() {
    var ret = "var i=0,l=s.length,a;" + "for(;i<l;++i){" + "a=s[i];" + "switch(k){", j = 0, hex;
    for (; j < X_Pair_SIZE; ++j) {
      hex = j.toString(16);
      ret += "case a[0x" + hex + "]:return p[i][0x" + hex + "];";
    }
    return ret + "}}";
  }()), X_Pair_lastKey, X_Pair_lastPair;
  function X_Pair_create(key, pair) {
    var keyStore = X_Pair_KEY_STORE_LIST[X_Pair_KEY_STORE_LIST.length - 1], pairStore = X_Pair_PAIR_STORE_LIST[X_Pair_PAIR_STORE_LIST.length - 1];
    X_Pair_noChashe = true;
    if (!pair || X_Pair_get(key) || !(X_Type_isObject(key) || X_Type_isArray(key) || X_Type_isFunction(key))) {
      return false;
    }
    if (keyStore.length === X_Pair_SIZE) {
      keyStore = X_Pair_KEY_STORE_LIST[X_Pair_KEY_STORE_LIST.length] = [];
      pairStore = X_Pair_PAIR_STORE_LIST[X_Pair_PAIR_STORE_LIST.length] = [];
    }
    keyStore[keyStore.length] = key;
    pairStore[pairStore.length] = pair;
    return true;
  }
  function X_Pair_get(key) {
    var chashe = !X_Pair_noChashe, pair;
    X_Pair_noChashe = false;
    if (key === X_Pair_lastKey) {
      return X_Pair_lastPair;
    }
    if ((pair = X_Pair_functionString(X_Pair_KEY_STORE_LIST, X_Pair_PAIR_STORE_LIST, key)) && chashe) {
      X_Pair_lastKey = key;
      X_Pair_lastPair = pair;
    }
    return pair;
  }
  function X_Pair_release(key, opt_pair) {
    var i = 0, l = X_Pair_KEY_STORE_LIST.length, keyStore, pairStore, j;
    for (; i < l; ++i) {
      keyStore = X_Pair_KEY_STORE_LIST[i];
      pairStore = X_Pair_PAIR_STORE_LIST[i];
      j = keyStore.indexOf(key);
      if (j !== -1 && (opt_pair === undefined || pairStore[j] === opt_pair)) {
        keyStore.splice(j, 1);
        pairStore.splice(j, 1);
        if (X_Pair_lastKey === key) {
          X_Pair_lastKey = X_Pair_lastPair = null;
        }
        return true;
      }
    }
    return false;
  }
  var X_CALLBACK_NONE = 0, X_CALLBACK_UN_LISTEN = 1, X_CALLBACK_STOP_PROPAGATION = 2, X_CALLBACK_STOP_NOW = 4 | 2, X_CALLBACK_PREVENT_DEFAULT = 8, X_CALLBACK_CAPTURE_POINTER = 16, X_CALLBACK_RELEASE_POINTER = 32, X_CALLBACK_SYS_CANCEL = 64 | 4 | 2;
  X["Callback"] = {"NONE":X_CALLBACK_NONE, "UN_LISTEN":X_CALLBACK_UN_LISTEN, "STOP_PROPAGATION":X_CALLBACK_STOP_PROPAGATION, "STOP_NOW":X_CALLBACK_STOP_NOW, "PREVENT_DEFAULT":X_CALLBACK_PREVENT_DEFAULT, "CAPTURE_POINTER":X_CALLBACK_CAPTURE_POINTER, "RELEASE_POINTER":X_CALLBACK_RELEASE_POINTER};
  console.log("X.Core.Callback");
  var X_CLOSURE_LIVE_LIST = [], X_CLOSURE_POOL_LIST = [], X_Closure_COMMAND_BACK = X_CLOSURE_LIVE_LIST, X_Closure_COMMAND_DROP = X_CLOSURE_POOL_LIST, X_CLOSURE_THIS_FUNC = 1, X_CLOSURE_HANDLEEVENT = 2, X_CLOSURE_FUNC_ONLY = 3, X_CLOSURE_THIS_FUNCNAME = 4;
  var __CallbackHash__ = {cbKind:X_CLOSURE_THIS_FUNC, func:undefined, funcName:undefined, context:undefined, supplement:undefined, proxy:X_Closure_proxyCallback};
  function X_Closure_create(thisObject, opt_callback, opt_args) {
    var obj = X_Closure_classifyCallbackArgs(thisObject, opt_callback, opt_args), l, ret, _obj;
    if (!obj.cbKind) {
      return obj;
    }
    if (l = X_CLOSURE_POOL_LIST.length) {
      ret = X_CLOSURE_POOL_LIST[l - 1];
      --X_CLOSURE_POOL_LIST.length;
      _obj = ret(X_Closure_COMMAND_BACK);
      _obj.cbKind = obj.cbKind;
      _obj.funcName = obj.funcName;
      _obj.func = obj.func;
      _obj.context = obj.context;
      _obj.supplement = obj.supplement;
      _obj.proxy = X_Closure_proxyCallback;
    } else {
      ret = X_Closure_actualClosure(obj);
      obj.proxy = X_Closure_proxyCallback;
    }
    X_CLOSURE_LIVE_LIST[X_CLOSURE_LIVE_LIST.length] = ret;
    return ret;
  }
  function X_Closure_classifyCallbackArgs(arg1, arg2, arg3, alt_context) {
    var obj;
    if (X_Type_isObject(arg1) && X_Type_isFunction(arg2)) {
      obj = {context:arg1, func:arg2, cbKind:X_CLOSURE_THIS_FUNC};
    } else {
      if (X_Type_isObject(arg1)) {
        if (arg2 && X_Type_isString(arg2)) {
          obj = {context:arg1, funcName:arg2, cbKind:X_CLOSURE_THIS_FUNCNAME};
        } else {
          obj = {context:arg1, cbKind:X_CLOSURE_HANDLEEVENT};
          arg3 = arg2;
        }
      } else {
        if (X_Type_isFunction(arg1)) {
          arg3 = arg2;
          if (alt_context) {
            obj = {context:alt_context, func:arg1, cbKind:X_CLOSURE_THIS_FUNC};
          } else {
            obj = {func:arg1, cbKind:X_CLOSURE_FUNC_ONLY};
          }
        } else {
          if (X_Type_isFunction(arg2)) {
            if (alt_context) {
              obj = {context:alt_context, func:arg2, cbKind:X_CLOSURE_THIS_FUNC};
            } else {
              obj = {func:arg2, cbKind:X_CLOSURE_FUNC_ONLY};
            }
          } else {
            if (alt_context && X_Type_isString(arg1)) {
              arg3 = arg2;
              obj = {context:alt_context, funcName:arg1, cbKind:X_CLOSURE_THIS_FUNCNAME};
            } else {
              if (alt_context) {
                obj = {context:alt_context, cbKind:X_CLOSURE_HANDLEEVENT};
                arg3 = arg1;
              } else {
                console.log("\u4e0d\u6b63 " + arg1);
                console.dir(arg1);
                return;
              }
            }
          }
        }
      }
    }
    if (X_Type_isArray(arg3)) {
      obj.supplement = arg3;
    }
    return obj.context || obj.supplement ? obj : arg1;
  }
  function X_Closure_actualClosure(obj) {
    return function() {
      if (arguments[0] === X_Closure_COMMAND_BACK) {
        return obj;
      }
      if (arguments[0] !== X_Closure_COMMAND_DROP) {
        return obj.proxy && obj.proxy(obj, arguments);
      }
    };
  }
  function X_Closure_proxyCallback(xfunc, _args) {
    var args = _args || [], thisObj = xfunc.context, func = xfunc.func, supp = xfunc.supplement, temp, ret, funcName;
    if (supp && supp.length) {
      temp = [];
      args.length && (args.length === 1 ? temp[0] = args[0] : temp.push.apply(temp, args));
      supp.length === 1 ? temp[temp.length] = supp[0] : temp.push.apply(temp, supp);
      args = temp;
    }
    switch(xfunc.cbKind) {
      case X_CLOSURE_THIS_FUNC:
        return args.length === 0 ? func.call(thisObj) : func.apply(thisObj, args);
      case X_CLOSURE_THIS_FUNCNAME:
        funcName = xfunc.funcName;
      case X_CLOSURE_HANDLEEVENT:
        funcName = funcName || "handleEvent";
        temp = thisObj[funcName];
        if (X_Type_isFunction(temp)) {
          return args.length === 0 ? thisObj[funcName]() : args.length === 1 ? thisObj[funcName](args[0]) : temp.apply(thisObj, args);
        }
        break;
      case X_CLOSURE_FUNC_ONLY:
        return args.length === 0 ? func() : args.length === 1 ? func(args[0]) : func.apply(null, args);
    }
    return X_CALLBACK_NONE;
  }
  function X_Closure_correct(f) {
    var i = X_CLOSURE_LIVE_LIST.indexOf(f), obj;
    if (i !== -1) {
      X_CLOSURE_LIVE_LIST.splice(i, 1);
      X_CLOSURE_POOL_LIST[X_CLOSURE_POOL_LIST.length] = f;
      obj = f(X_Closure_COMMAND_BACK);
      X_Object_clear(obj);
      return true;
    }
  }
  function X_Closure_monitor() {
    return {"Callback:Live":X_CLOSURE_LIVE_LIST.length, "Callback:Pool":X_CLOSURE_POOL_LIST.length};
  }
  function X_Closure_gc() {
    X_CLOSURE_POOL_LIST.length = 0;
  }
  X_TEMP.onSystemReady.push(function(sys) {
    sys.monitor(X_Closure_monitor);
    sys.gc(X_Closure_gc);
  });
  var __ClassBase__ = {NAME:""}, X_Class_CLASS_LIST = [], X_Class_DEF_LIST = [], X_Class_SUPER_CALLER = [], X_Class_SUPER_STACKS = [], X_Class_traits = null, X_Class_useObjectCreate = false, X_Class_use_proto_ = !(X_UA["Prsto"] && X_UA["Android"]) && !X_UA["AOSP"] && !X_UA["ChromeWV"] && !!X_emptyFunction.prototype.__proto__, X_Class_constructorFix = X_UA["AOSP"] < 3 || X_UA["iOS"] < 5, X_Class_SEAL_KILLING = [], X_Class_CommonMethods = {"kill":function() {
    var listeners, flag, p, i, list, timers, def;
    if (this["instanceOf"](X_EventDispatcher)) {
      listeners = this["_listeners"];
      if (listeners && X_Class_SEAL_KILLING.length && X_Class_SEAL_KILLING.indexOf(this) !== -1) {
        return;
      }
      if (listeners && !listeners[X_LISTENERS_KILL_RESERVED] && listeners[X_EVENT_BEFORE_KILL_INSTANCE]) {
        X_Class_SEAL_KILLING[i = X_Class_SEAL_KILLING.length] = this;
        if (this["dispatch"](X_EVENT_BEFORE_KILL_INSTANCE) & X_CALLBACK_PREVENT_DEFAULT) {
          this["dispatch"](X_EVENT_KILL_INSTANCE_CANCELED);
          flag = true;
        }
        X_Class_SEAL_KILLING.length === 1 ? X_Class_SEAL_KILLING.length = 0 : X_Class_SEAL_KILLING.splice(X_Class_SEAL_KILLING[i] === this ? i : X_Class_SEAL_KILLING.indexOf(this), 1);
        if (flag) {
          return;
        }
      }
      if (listeners = this["_listeners"]) {
        if (listeners[X_LISTENERS_DISPATCHING]) {
          listeners[X_LISTENERS_KILL_RESERVED] = true;
          return;
        }
        if (listeners[X_EVENT_KILL_INSTANCE]) {
          X_Class_SEAL_KILLING[i = X_Class_SEAL_KILLING.length] = this;
          listeners[X_LISTENERS_KILL_RESERVED] = false;
          this["dispatch"](X_EVENT_KILL_INSTANCE);
          X_Class_SEAL_KILLING.length === 1 ? X_Class_SEAL_KILLING.length = 0 : X_Class_SEAL_KILLING.splice(X_Class_SEAL_KILLING[i] === this ? i : X_Class_SEAL_KILLING.indexOf(this), 1);
        }
        if (!(listeners = this["_listeners"])) {
          for (p in listeners) {
            if (p <= X_LISTENERS_KILL_RESERVED) {
              continue;
            }
            list = listeners[p];
            for (i = list.length; i;) {
              this["unlisten"](p, list[--i]);
            }
          }
        }
      }
      if (this["instanceOf"](Node)) {
        X_Node_onKill(this);
      }
      timers = X_EventDispatcher_LAZY_TIMERS;
      for (p in timers) {
        if (timers[p] === this) {
          X_Timer_remove(p);
        }
      }
    }
    X_Object_clear(this);
    def = X_Class_getClassDef(this);
    if (def.pool) {
      def.live.splice(def.live.indexOf(this), 1);
      def.pool[def.pool.length] = this;
    }
  }, "Super":function(var_args) {
    var me = this, sClass = me.constructor, i = X_Class_SUPER_CALLER.indexOf(me), stack, t, def, ret;
    if (i === -1) {
      X_Class_SUPER_CALLER[i = X_Class_SUPER_CALLER.length] = me;
      t = stack = X_Class_SUPER_STACKS[i] = 0;
    } else {
      t = stack = X_Class_SUPER_STACKS[i];
      while (t) {
        sClass = X_Class_getClassDef(sClass).SuperClass;
        --t;
      }
    }
    while (sClass) {
      ++t;
      sClass = X_Class_getClassDef(sClass).SuperClass;
      if (!sClass) {
        break;
      }
      def = X_Class_getClassDef(sClass);
      if (def.Constructor) {
        X_Class_SUPER_STACKS[i] += t;
        ret = def.Constructor.apply(me, arguments);
        break;
      }
    }
    if (X_Class_SUPER_CALLER[i] !== me) {
      i = X_Class_SUPER_CALLER.indexOf(me);
    }
    if (X_Class_SUPER_STACKS[i] === stack) {
    }
    if (stack === 0) {
      X_Class_SUPER_CALLER.splice(i, 1);
      X_Class_SUPER_STACKS.splice(i, 1);
    } else {
      X_Class_SUPER_STACKS[i] = stack;
    }
    return ret || me;
  }, "superCall":function(myFunc, var_args) {
    var me = this, sClass = me.constructor, proto = sClass.prototype, i = X_Class_SUPER_CALLER.indexOf(me), args = arguments, p, name, stack, t, sFunc, ret;
    if (X_Type_isFunction(myFunc)) {
      for (p in proto) {
        if (proto[p] === myFunc) {
          name = p;
          break;
        }
      }
      if (!name) {
        return;
      }
    } else {
      if (X_Type_isString(myFunc) && X_Type_isFunction(me[myFunc])) {
        name = myFunc;
      } else {
        return;
      }
    }
    if (i === -1) {
      X_Class_SUPER_CALLER[i = X_Class_SUPER_CALLER.length] = me;
      t = stack = X_Class_SUPER_STACKS[i] = 0;
    } else {
      t = stack = X_Class_SUPER_STACKS[i];
      while (t) {
        sClass = X_Class_getClassDef(sClass).SuperClass;
        --t;
      }
    }
    if (sClass) {
      myFunc = sClass.prototype[name];
      while (sClass) {
        ++t;
        sClass = X_Class_getClassDef(sClass).SuperClass;
        sFunc = sClass.prototype[name];
        if (sFunc !== myFunc) {
          if (X_Type_isFunction(sFunc)) {
            X_Class_SUPER_STACKS[i] += t;
            switch(args.length) {
              case 1:
                ret = sFunc.call(me);
                break;
              case 2:
                ret = sFunc.call(me, args[1]);
                break;
              case 3:
                ret = sFunc.call(me, args[1], args[2]);
                break;
              case 4:
                ret = sFunc.call(me, args[1], args[2], args[3]);
                break;
              default:
                args = X_Array_copy(args);
                args.shift();
                ret = sFunc.apply(me, args);
                break;
            }
          }
          break;
        }
      }
    }
    if (X_Class_SUPER_CALLER[i] !== me) {
      i = X_Class_SUPER_CALLER.indexOf(me);
    }
    if (stack === 0) {
      X_Class_SUPER_CALLER.splice(i, 1);
      X_Class_SUPER_STACKS.splice(i, 1);
    } else {
      X_Class_SUPER_STACKS[i] = stack;
    }
    return ret;
  }, "instanceOf":function(klass) {
    var Super = this;
    if (this.constructor === klass) {
      return true;
    }
    while (Super = X_Class_getClassDef(Super).SuperClass) {
      if (Super === klass) {
        return true;
      }
    }
    return false;
  }};
  var X_Class = {NONE:0, POOL_OBJECT:1, ABSTRACT:2, FINAL:4, SINGLETON:8};
  X["Class"] = {"NONE":X_Class.NONE, "POOL_OBJECT":X_Class.POOL_OBJECT, "ABSTRACT":X_Class.ABSTRACT, "FINAL":X_Class.FINAL, "SINGLETON":X_Class.SINGLETON, "create":X_Class_create};
  function X_Class_create() {
    var args = X_Array_copy(arguments), displayName = args[0], classSetting, opt_pool, opt_abstract, opt_final, privateDef, props, klass, classDef = {}, cbHash = {proxy:X_Class_actualConstructor, classDef:classDef};
    if (X_Type_isString(displayName) === true) {
      classDef.displayName = displayName;
      args.shift();
    }
    classDef.setting = classSetting = args[0];
    if (X_Type_isNumber(classSetting)) {
      opt_pool = !!(classSetting & X_Class.POOL_OBJECT);
      opt_abstract = !!(classSetting & X_Class.ABSTRACT);
      opt_final = !!(classSetting & X_Class.FINAL);
      if (opt_final && opt_abstract) {
        X.Logger.critical("final & Abstract!");
        return;
      }
      args.shift();
    } else {
      classDef.setting = 0;
    }
    props = args[0];
    if (!X_Type_isObject(props)) {
      props = {};
    } else {
      if (props["Constructor"]) {
        if (!X_Type_isFunction(props["Constructor"])) {
          alert('"Constructor" is not function.');
          return;
        }
        classDef.Constructor = props["Constructor"];
      }
    }
    klass = X_Closure_actualClosure(cbHash);
    cbHash.klass = klass;
    klass["superClassOf"] = X_Class_superClassOf;
    klass["subClassOf"] = X_Class_subClassOf;
    if (X_Class_useObjectCreate) {
      klass.prototype = X_Class_override(X_Class_override(X_Class_traits || klass.prototype, props, true), X_Class_CommonMethods, false);
      klass.prototype.constructor = klass;
    } else {
      if (X_Class_use_proto_) {
        X_Class_override(klass.prototype, props, true);
        if (X_Class_traits) {
          klass.prototype.__proto__ = X_Class_traits;
        } else {
          X_Class_override(klass.prototype, X_Class_CommonMethods, false);
        }
      } else {
        klass.prototype = X_Class_override(X_Class_override(X_Class_traits || klass.prototype, props, true), X_Class_CommonMethods, false);
        klass.prototype.constructor = klass;
      }
    }
    klass["NAME"] = displayName;
    if (opt_abstract) {
      classDef.isAbstract = true;
    } else {
      if (opt_pool) {
        classDef.pool = [];
        classDef.live = [];
      }
    }
    if (opt_final) {
      classDef.Final = true;
    } else {
      klass["inherits"] = X_Class_inherits;
    }
    X_Class_CLASS_LIST.push(klass);
    X_Class_DEF_LIST.push(classDef);
    return klass;
  }
  function X_Class_getClass(instance) {
    var cList = X_Class_CLASS_LIST, i;
    if ((i = cList.indexOf(instance.constructor)) !== -1) {
      return cList[i];
    }
    if (cList.indexOf(instance) !== -1) {
      return instance;
    }
  }
  function X_Class_getClassDef(KlassOrInstance) {
    var i = X_Class_CLASS_LIST.indexOf(KlassOrInstance);
    if (i === -1) {
      i = X_Class_CLASS_LIST.indexOf(X_Class_getClass(KlassOrInstance));
    }
    if (i !== -1) {
      return X_Class_DEF_LIST[i];
    }
    if (X_Class_DEF_LIST.indexOf(KlassOrInstance) !== -1) {
      return KlassOrInstance;
    }
  }
  function X_Class_override(target, src, force) {
    var p;
    for (p in src) {
      if (p === "Constructor") {
        continue;
      }
      if (p === "__proto__" || p === "prototype" || p === "constructor") {
        X.Logger.critical(p + " is reserved!");
        return;
      }
      if (force || target[p] === undefined) {
        target[p] = src[p];
      }
    }
    return target;
  }
  function X_Class_superClassOf(klass) {
    var myDef = X_Class_getClassDef(this), targetDef = X_Class_getClassDef(klass), SuperClass = klass;
    if (!myDef || !targetDef || this === klass) {
      return false;
    }
    while (SuperClass = X_Class_getClassDef(SuperClass).SuperClass) {
      if (SuperClass === this) {
        return true;
      }
    }
    return false;
  }
  function X_Class_subClassOf(klass) {
    return klass && X_Class_superClassOf.call(klass, this);
  }
  function X_Class_inherits() {
    var args = X_Array_copy(arguments), params = [], Super = this, superDef = X_Class_getClassDef(Super), displayName = args[0], classSetting, klass, def;
    if (superDef.Final) {
      X.Logger.critical("X.Class inherits, Class is final!");
    }
    if (X_Type_isString(displayName)) {
      args.shift();
    } else {
      displayName = "SubClass of " + superDef.displayName;
    }
    params.push(displayName);
    classSetting = args[0];
    if (X_Type_isNumber(classSetting)) {
      args.shift();
    } else {
      classSetting = superDef.setting;
    }
    params.push(classSetting);
    if (args[0] && X_Class_getClass(args[0])) {
      params.push(args.shift());
    }
    params.push(args[0]);
    if (X_Class_useObjectCreate) {
      X_Class_traits = Object.create(Super.prototype);
    } else {
      if (X_Class_use_proto_) {
        X_Class_traits = Super.prototype;
      } else {
        X_Class_traits = new Super(X_Closure_COMMAND_DROP);
      }
    }
    klass = X_Class_create.apply(X.Class, params);
    X_Class_traits = null;
    def = X_Class_getClassDef(klass);
    def.SuperClass = Super;
    return klass;
  }
  function X_Class_actualConstructor(f, args) {
    var klass = f.klass, def = f.classDef, instance, obj;
    if (def.isAbstract) {
      X.Logger.critical("AbstractClass!");
      return;
    }
    instance = def.pool && def.pool.length ? def.pool.pop() : X_Class_useObjectCreate ? Object.create(klass.prototype) : new klass(X_Closure_COMMAND_DROP);
    def.live && def.live.push(instance);
    if (X_Class_constructorFix && instance.constructor !== klass) {
      console.log("------- constructor \u306e\u4e0d\u4e00\u81f4!");
      instance.constructor = klass;
    }
    obj = def.Constructor ? def.Constructor.apply(instance, args) : def.SuperClass && instance["Super"].apply(instance, args);
    if (obj !== instance && (X_Type_isObject(obj) || X_Type_isFunction(obj))) {
      instance["kill"]();
      return obj;
    }
    return instance;
  }
  console.log("X.Core.Class");
  var X_Event_Rename = {}, X_Event_RenameTo = {}, X_Event_proxy = {"IFRAMEload":function(eventDispatcher) {
    eventDispatcher["listen"]("readystatechange", X_Event_proxy.IFRAMEload_proxy);
  }, IFRAMEload_proxy:function(e) {
    var raw = this["_rawObject"];
    return raw.readyState === "complete" || raw.readyState === "loaded" ? X_EventDispatcher_actualHandleEvent("load") : X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
  }, "contextmenu":function(eventDispatcher) {
    eventDispatcher["listen"]("mousedown", X_Event_proxy.contextmenu_proxy);
  }, contextmenu_proxy:function(e) {
    return e.button === 2 ? this["dispatch"]("contextmenu") : X_CALLBACK_NONE;
  }}, X_Event_toPointer = !X_UA_HID.POINTER && (X_UA_HID.TOUCH ? {"touchstart":"pointerdown", "mousedown":"pointerdown", "touchend":"pointerup", "mouseup":"pointerup", "touchmove":"pointermove", "mousemove":"pointermove", "touchleave":"pointerleave", "mouseout":"pointerout", "mouseleave":"pointerleave", "touchcancel":"pointercancel", "contextmenu":"contextmenu", "dbclick":"dbclick", "click":"click"} : {"mousedown":"pointerdown", "mouseup":"pointerup", "mousemove":"pointermove", "mouseout":"pointerout", 
  "mouseleave":"pointerleave", "contextmenu":"contextmenu", "dbclick":"dbclick", "click":"click"});
  var X_EVENT_PRE_INIT = 5, X_EVENT_XTREE_READY = 6, X_EVENT_INIT = 7, X_EVENT_XDOM_READY = 8, X_EVENT_COMPLETE = 9, X_EVENT_READY = 10, X_EVENT_SUCCESS = 11, X_EVENT_ERROR = 12, X_EVENT_PROGRESS = 13, X_EVENT_BEFORE_CANCEL = 14, X_EVENT_CANCELED = 15, X_EVENT_TIMEOUT = 16, X_EVENT_BEFORE_KILL_INSTANCE = 17, X_EVENT_KILL_INSTANCE_CANCELED = 18, X_EVENT_KILL_INSTANCE = 19, X_EVENT_VIEW_ACTIVATE = 20, X_EVENT_VIEW_DEACTIVATE = 21, X_EVENT_VIEW_RESIZED = 22, X_EVENT_VIEW_TURNED = 23, X_EVENT_BASE_FONT_RESIZED = 
  24, X_EVENT_BEFORE_UPDATE = 25, X_EVENT_UPDATED = 26, X_EVENT_AFTER_UPDATE = 27, X_EVENT_HASH_CHANGED = 28, X_EVENT_BEFORE_UNLOAD = 29, X_EVENT_UNLOAD = 30, X_EVENT_BACKEND_READY = 31, X_EVENT_BACKEND_NONE = 32, X_EVENT_BACKEND_RESEARCH = 33, X_EVENT_BACKEND_CHANGED = 34, X_EVENT_ANIME_BEFORE_START = 35, X_EVENT_ANIME_START = 36, X_EVENT_ANIME = 37, X_EVENT_ANIME_END = 38, X_EVENT_ANIME_BEFORE_STOP = 39, X_EVENT_ANIME_STOP = 40, X_EVENT_GPU_RELEASED = 41, X_EVENT_MEDIA_PLAYING = 42, X_EVENT_MEDIA_BEFORE_LOOP = 
  43, X_EVENT_MEDIA_LOOPED = 44, X_EVENT_MEDIA_PAUSED = 45, X_EVENT_MEDIA_ENDED = 46, X_EVENT_MEDIA_WAITING = 47, X_EVENT_MEDIA_SEEKING = 48, X_EVENT_MEDIA_WAIT_FOR_TOUCH = 49, X_EVENT_NEED_AUTH = 50, X_EVENT_DEBUG = 51, X_Event_last = 51;
  X["Event"] = {"XDOM_READY":X_EVENT_XDOM_READY, "COMPLETE":X_EVENT_COMPLETE, "READY":X_EVENT_READY, "SUCCESS":X_EVENT_SUCCESS, "ERROR":X_EVENT_ERROR, "PROGRESS":X_EVENT_PROGRESS, "BEFORE_CANCEL":X_EVENT_BEFORE_CANCEL, "CANCELED":X_EVENT_CANCELED, "TIMEOUT":X_EVENT_TIMEOUT, "BEFORE_KILL_INSTANCE":X_EVENT_BEFORE_KILL_INSTANCE, "KILL_INSTANCE_CANCELED":X_EVENT_KILL_INSTANCE_CANCELED, "KILL_INSTANCE":X_EVENT_KILL_INSTANCE, "VIEW_ACTIVATE":X_EVENT_VIEW_ACTIVATE, "VIEW_DEACTIVATE":X_EVENT_VIEW_DEACTIVATE, 
  "VIEW_RESIZED":X_EVENT_VIEW_RESIZED, "VIEW_TURNED":X_EVENT_VIEW_TURNED, "BASE_FONT_RESIZED":X_EVENT_BASE_FONT_RESIZED, "BEFORE_UPDATE":X_EVENT_BEFORE_UPDATE, "UPDATED":X_EVENT_UPDATED, "AFTER_UPDATE":X_EVENT_AFTER_UPDATE, "HASH_CHANGED":X_EVENT_HASH_CHANGED, "BEFORE_UNLOAD":X_EVENT_BEFORE_UNLOAD, "UNLOAD":X_EVENT_UNLOAD, "BACKEND_READY":X_EVENT_BACKEND_READY, "BACKEND_NONE":X_EVENT_BACKEND_NONE, "BACKEND_RESEARCH":X_EVENT_BACKEND_RESEARCH, "BACKEND_CHANGED":X_EVENT_BACKEND_CHANGED, "ANIME_BEFORE_START":X_EVENT_ANIME_BEFORE_START, 
  "ANIME_START":X_EVENT_ANIME_START, "ANIME":X_EVENT_ANIME, "ANIME_END":X_EVENT_ANIME_END, "ANIME_BEFORE_STOP":X_EVENT_ANIME_BEFORE_STOP, "ANIME_STOP":X_EVENT_ANIME_STOP, "GPU_RELEASED":X_EVENT_GPU_RELEASED, "MEDIA_PLAYING":X_EVENT_MEDIA_PLAYING, "MEDIA_BEFORE_LOOP":X_EVENT_MEDIA_BEFORE_LOOP, "MEDIA_LOOPED":X_EVENT_MEDIA_LOOPED, "MEDIA_PAUSED":X_EVENT_MEDIA_PAUSED, "MEDIA_ENDED":X_EVENT_MEDIA_ENDED, "MEDIA_WAITING":X_EVENT_MEDIA_WAITING, "MEDIA_SEEKING":X_EVENT_MEDIA_SEEKING, "MEDIA_WAIT_FOR_TOUCH":X_EVENT_MEDIA_WAIT_FOR_TOUCH, 
  "NEED_AUTH":X_EVENT_NEED_AUTH, "DEBUG":X_EVENT_DEBUG};
  X_TEMP.onSystemReady.push(function() {
    var k, name, i;
    for (k in X_Event_Rename) {
      name = X_Event_Rename[k];
      if (X_Type_isArray(name)) {
        for (i = name.length; i;) {
          X_Event_RenameTo[name[--i]] = k;
        }
      } else {
        X_Event_RenameTo[name] = k;
      }
    }
  });
  var X_Listeners_;
  var X_LISTENERS_ACTUAL_HANDLER = 0, X_LISTENERS_DISPATCHING = 1, X_LISTENERS_RESERVES = 2, X_LISTENERS_UNLISTENS = 3, X_LISTENERS_KILL_RESERVED = 4;
  var X_EventDispatcher_EVENT_TARGET_OTHER = 0, X_EventDispatcher_EVENT_TARGET_XHR = 1, X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT = 2;
  var X_EventDispatcher_once = false, X_EventDispatcher_lock = false, X_EventDispatcher_unlock = false, X_EventDispatcher_needsIndex = false, X_EventDispatcher_safariPreventDefault = false, X_EventDispatcher_LAZY_TIMERS = {}, X_EventDispatcher_ANIME_EVENTS = (X_UA["WebKit"] || X_UA["Blink"]) && {"transitionend":true, "webkitTransitionEnd":true, "mozTransitionEnd":true, "oTransitionEnd":true, "otransitionEnd":true, "animationend":true, "webkitAnimationEnd":true, "oAnimationEnd":true, "animationstart":true, 
  "webkitAnimationStart":true, "oAnimationStart":true, "animationiteration":true, "webkitAnimationIteration":true, "oAnimationIteration":true};
  var X_EventDispatcher = X["EventDispatcher"] = X_Class_create("EventDispatcher", {"_rawType":X_EventDispatcher_EVENT_TARGET_OTHER, "_listeners":null, "_rawObject":null, "Constructor":function(opt_rawObject) {
    if (opt_rawObject) {
      this["_rawObject"] = opt_rawObject;
    }
  }, "dispatch":X_EventDispatcher_dispatch, "listen":X_EventDispatcher_listen, "listenOnce":function(type, opt_arg1, opt_arg2, opt_arg3) {
    X_EventDispatcher_once = true;
    this["listen"](type, opt_arg1, opt_arg2, opt_arg3);
    X_EventDispatcher_once = false;
    return this;
  }, "unlisten":X_EventDispatcher_unlisten, "listening":function(opt_type, opt_arg1, opt_arg2, opt_arg3) {
    var listeners = this["_listeners"], lock = X_EventDispatcher_lock || X_EventDispatcher_unlock, list, cbHash, unlistens, i, f;
    if (opt_type === undefined) {
      return !!listeners;
    }
    if (!listeners || !(list = listeners[opt_type])) {
      return false;
    }
    if (opt_arg1 === undefined) {
      return X_EventDispatcher_needsIndex ? 0 : true;
    }
    if (opt_arg1.cbKind) {
      cbHash = opt_arg1;
    } else {
      cbHash = X_Closure_classifyCallbackArgs(opt_arg1, opt_arg2, opt_arg3, this);
    }
    if ((unlistens = listeners[X_LISTENERS_UNLISTENS]) && (unlistens = unlistens[opt_type])) {
      for (i = unlistens.length; i;) {
        f = unlistens[--i];
        if (f === cbHash || f.context === cbHash.context && f.func === cbHash.func && f.funcName === cbHash.funcName && f.supplement === cbHash.supplement && f.lock === lock) {
          return false;
        }
      }
    }
    for (i = list.length; i;) {
      f = list[--i];
      if (f === cbHash || f.context === cbHash.context && f.func === cbHash.func && f.funcName === cbHash.funcName && f.supplement === cbHash.supplement && f.lock === lock) {
        return X_EventDispatcher_needsIndex ? i : true;
      }
    }
    return false;
  }, "asyncDispatch":function(delay, e) {
    var timerID;
    if (delay && e === undefined) {
      e = delay;
      delay = 0;
    }
    delay === undefined && eval('throw "asyncDispatch \u3067 undefined \u30a4\u30d9\u30f3\u30c8\u304c\u6307\u5b9a\u3055\u308c\u307e\u3057\u305f"');
    timerID = X_Timer_add(delay, 1, this, X_EventDispatcher_dispatch, [e]);
    X_EventDispatcher_LAZY_TIMERS[timerID] = this;
    return timerID;
  }});
  function X_EventDispatcher_dispatch(e) {
    var listeners = this["_listeners"], ret = X_CALLBACK_NONE, type = e["type"], list, unlistens, i, l, args, f, r, sysOnly, timerID, k;
    if (!listeners || !(list = listeners[type || e])) {
      return X_CALLBACK_NONE;
    }
    if (!type) {
      e = {"type":type = e};
    }
    e["target"] = e["target"] || this;
    e["currentTarget"] = e["currentTarget"] || this;
    if (listeners[X_LISTENERS_DISPATCHING]) {
      ++listeners[X_LISTENERS_DISPATCHING];
    } else {
      listeners[X_LISTENERS_DISPATCHING] = 1;
    }
    for (i = 0; i < list.length; ++i) {
      f = list[i];
      if (f.removed) {
        continue;
      }
      r = X_Closure_proxyCallback(f, args || (args = [e]));
      if (f.once || r & X_CALLBACK_UN_LISTEN) {
        if (!unlistens) {
          unlistens = listeners[X_LISTENERS_UNLISTENS] || (listeners[X_LISTENERS_UNLISTENS] = {});
          unlistens = unlistens[type] || (unlistens[type] = []);
        }
        unlistens.indexOf(f) === -1 && (unlistens[unlistens.length] = f);
      }
      ret |= X_Type_isFinite(r) ? r : 0;
      if ((r & X_CALLBACK_STOP_NOW) === X_CALLBACK_STOP_NOW) {
        sysOnly = true;
        break;
      }
    }
    if (--listeners[X_LISTENERS_DISPATCHING] === 0) {
      delete listeners[X_LISTENERS_DISPATCHING];
      if (list = listeners[X_LISTENERS_RESERVES]) {
        for (i = 0, l = list.length; i < l; ++i) {
          f = list[i];
          X_EventDispatcher_once = f[4];
          X_EventDispatcher_lock = f[5];
          this["listen"](f[0], f[1], f[2], f[3]);
          f.length = 0;
        }
        list.length = 0;
        X_EventDispatcher_once = X_EventDispatcher_lock = false;
        delete listeners[X_LISTENERS_RESERVES];
      }
      if (unlistens = listeners[X_LISTENERS_UNLISTENS]) {
        delete listeners[X_LISTENERS_UNLISTENS];
        X_EventDispatcher_unlock = true;
        for (k in unlistens) {
          list = unlistens[k];
          for (i = list.length; i;) {
            this["unlisten"](k, list[--i]);
          }
          list.length = 0;
          delete unlistens[k];
        }
        X_EventDispatcher_unlock = false;
      }
      if (X_EventDispatcher_LAZY_TIMERS[X_Timer_currentUID] === this) {
        delete X_EventDispatcher_LAZY_TIMERS[X_Timer_currentUID];
      }
      if (listeners[X_LISTENERS_KILL_RESERVED]) {
        this["kill"]();
      }
    }
    return ret;
  }
  function X_EventDispatcher_listen(type, opt_arg1, opt_arg2, opt_arg3) {
    var listeners = this["_listeners"], i, raw, add, list, f;
    if (!type) {
      return this;
    }
    if (listeners && listeners[X_LISTENERS_DISPATCHING]) {
      if (!listeners[X_LISTENERS_RESERVES]) {
        listeners[X_LISTENERS_RESERVES] = [];
      }
      listeners[X_LISTENERS_RESERVES][listeners[X_LISTENERS_RESERVES].length] = [type, opt_arg1, opt_arg2, opt_arg3, X_EventDispatcher_once, X_EventDispatcher_lock];
      return this;
    }
    if (X_Type_isArray(type)) {
      for (i = type.length; i;) {
        this["listen"](type[--i], opt_arg1, opt_arg2, opt_arg3);
      }
      return this;
    }
    raw = this["_rawObject"] || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this);
    add = raw && (!listeners || !listeners[type]) && X_Type_isString(type);
    if (this["listening"](type, opt_arg1 || this, opt_arg2, opt_arg3)) {
      return this;
    }
    if (!listeners) {
      listeners = this["_listeners"] = {};
    }
    list = listeners[type] || (listeners[type] = []);
    add && X_EventDispatcher_actualAddEvent(this, type, raw, list);
    f = X_Closure_classifyCallbackArgs(opt_arg1, opt_arg2, opt_arg3, this);
    list[list.length] = f;
    f.once = X_EventDispatcher_once;
    f.lock = X_EventDispatcher_lock;
    return this;
  }
  function X_EventDispatcher_systemListen(that, type, opt_arg1, opt_arg2, opt_arg3) {
    X_EventDispatcher_lock = true;
    that["listen"](type, opt_arg1, opt_arg2, opt_arg3);
    X_EventDispatcher_lock = false;
  }
  function X_EventDispatcher_unlisten(opt_type, opt_arg1, opt_arg2, opt_arg3) {
    var listeners = this["_listeners"], list, reserves, unlistens, i, f, raw, k, empty;
    if (!listeners) {
      return this;
    }
    if (X_Type_isArray(opt_type)) {
      for (i = opt_type.length; i;) {
        this["unlisten"](opt_type[--i], opt_arg1, opt_arg2, opt_arg3);
        if (!opt_type[i]) {
          alert("\u4e0d\u6b63\u306a unlisten Array");
        }
      }
      return this;
    }
    if (reserves = listeners[X_LISTENERS_RESERVES]) {
      for (i = reserves.length; i;) {
        f = reserves[--i];
        if (f[0] === opt_type && f[1] === opt_arg1 && f[2] === opt_arg2 && f[3] === opt_arg3 && (!f[5] || X_EventDispatcher_unlock)) {
          reserves.splice(i, 1);
          if (!reserves.legth) {
            delete listeners[X_LISTENERS_RESERVES];
          }
          return this;
        }
      }
    }
    X_EventDispatcher_needsIndex = true;
    i = this["listening"](opt_type, opt_arg1, opt_arg2, opt_arg3);
    X_EventDispatcher_needsIndex = false;
    if (i === false) {
      return this;
    }
    f = (list = listeners[opt_type])[i];
    if (listeners[X_LISTENERS_DISPATCHING]) {
      unlistens = listeners[X_LISTENERS_UNLISTENS] || (listeners[X_LISTENERS_UNLISTENS] = {});
      (unlistens = unlistens[opt_type]) ? unlistens[unlistens.length] = f : listeners[X_LISTENERS_UNLISTENS][opt_type] = [f];
      f.removed = true;
    } else {
      X_Object_clear(f);
      if (list.length !== 1) {
        list.splice(i, 1);
      } else {
        list.length = 0;
        delete listeners[opt_type];
        empty = true;
        for (k in listeners) {
          if (k <= X_LISTENERS_KILL_RESERVED) {
            continue;
          }
          empty = false;
          break;
        }
        if (!X_String_isNumberString("" + opt_type)) {
          raw = this["_rawObject"] || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this);
          raw && X_EventDispatcher_actualRemoveEvent(this, opt_type, raw, list, !empty);
        }
        if (empty) {
          delete this["_listeners"];
        }
      }
    }
    return this;
  }
  function X_EventDispatcher_systemUnlisten(that, type, opt_arg1, opt_arg2, opt_arg3) {
    X_EventDispatcher_unlock = true;
    that["unlisten"](type, opt_arg1, opt_arg2, opt_arg3);
    X_EventDispatcher_unlock = false;
  }
  function X_EventDispatcher_unlistenAll(that) {
    var listeners = that["_listeners"], type, list, i;
    if (!listeners) {
      return;
    }
    for (type in listeners) {
      if (type <= X_LISTENERS_KILL_RESERVED) {
        continue;
      }
      list = listeners[type];
      for (i = list.length; i;) {
        that["unlisten"](type, list[--i]);
      }
    }
  }
  function X_EventDispatcher_actualAddEvent(that, type, raw, list) {
    var i, f;
    X_EventDispatcher_lock || (type = X_Event_Rename[type] || type);
    if (X_Type_isArray(type)) {
      for (i = type.length; i;) {
        X_EventDispatcher_systemListen(that, type[--i], X_emptyFunction);
        console.log("events fix > " + type[i]);
      }
    } else {
      if (X_UA_EVENT.W3C) {
        switch(that["_rawType"]) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            list.slcallback = X_Closure_create(that, X_EventDispatcher_sliverLightDispatch, [type]);
            list.sltoken = raw["AddEventListener"](type, list.slcallback);
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            if (X_UA["Opera"] < 12) {
              raw["on" + type] = X_Closure_create(that, X_EventDispatcher_dispatch, [type]);
              break;
            }
          default:
            if (X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[type]) {
              raw.addEventListener(type, X_EventDispatcher_iOSTransitionEndDispatch, false);
            } else {
              f = that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] || (that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(that, X_EventDispatcher_actualHandleEvent));
              if (raw.addEventListener) {
                raw.addEventListener(type, f, false);
              } else {
                raw["on" + type] = f;
              }
            }
        }
      } else {
        if (X_UA_EVENT.IE) {
          switch(that["_rawType"]) {
            case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
              list.slcallback = X_Closure_create(that, X_EventDispatcher_sliverLightDispatch, [type]);
              list.sltoken = raw["AddEventListener"](type, list.slcallback);
              break;
            case X_EventDispatcher_EVENT_TARGET_XHR:
              console.log("XHR addEvent " + type);
              raw["on" + type] = X_Closure_create(that, X_EventDispatcher_dispatch, [type]);
              break;
            default:
              f = that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] || (that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(that, X_EventDispatcher_actualHandleEvent));
              if (raw.attachEvent) {
                raw.attachEvent("on" + type, f);
              } else {
                raw["on" + type] = f;
              }
              break;
          }
        } else {
          switch(that["_rawType"]) {
            case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
              list.slcallback = X_Closure_create(that, X_EventDispatcher_sliverLightDispatch, [type]);
              list.sltoken = raw["AddEventListener"](type, list.slcallback);
              break;
            case X_EventDispatcher_EVENT_TARGET_XHR:
              raw["on" + type] = X_Closure_create(that, X_EventDispatcher_dispatch, [type]);
              break;
            default:
              raw["on" + type] = that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] || (that["_listeners"][X_LISTENERS_ACTUAL_HANDLER] = X_Closure_create(that, X_EventDispatcher_actualHandleEvent));
              break;
          }
        }
      }
    }
  }
  function X_EventDispatcher_iOSTransitionEndDispatch(e) {
    return X_Node_getXNode(this)["dispatch"](X_Event_RenameTo[e.type] || e.type);
  }
  function X_EventDispatcher_sliverLightDispatch(sender, e, type) {
    return this["dispatch"](type);
  }
  function X_EventDispatcher_actualRemoveEvent(that, type, raw, list, skip) {
    var i;
    X_EventDispatcher_unlock || (type = X_Event_Rename[type] || type);
    if (X_Type_isArray(type)) {
      for (i = type.length; i;) {
        X_EventDispatcher_systemUnlisten(that, type[--i], X_emptyFunction);
      }
    } else {
      if (X_UA_EVENT.W3C) {
        switch(that["_rawType"]) {
          case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
            raw["RemoveEventListener"](type, list.sltoken);
            X_Closure_correct(list.slcallback);
            delete list.sltoken;
            delete list.slcallback;
            break;
          case X_EventDispatcher_EVENT_TARGET_XHR:
            if (X_UA["Opera"] < 12) {
              X_Closure_correct(raw["on" + type]);
              raw["on" + type] = "";
              break;
            }
          default:
            if (X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[type]) {
              raw.removeEventListener(type, X_EventDispatcher_iOSTransitionEndDispatch, false);
            } else {
              if (raw.addEventListener) {
                raw.removeEventListener(type, that["_listeners"][X_LISTENERS_ACTUAL_HANDLER], false);
              } else {
                raw["on" + type] = null;
              }
            }
            if (!skip && that["_listeners"][X_LISTENERS_ACTUAL_HANDLER]) {
              X_Closure_correct(that["_listeners"][X_LISTENERS_ACTUAL_HANDLER]);
              delete that["_listeners"][X_LISTENERS_ACTUAL_HANDLER];
            }
        }
      } else {
        if (X_UA_EVENT.IE) {
          switch(that["_rawType"]) {
            case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
              raw["RemoveEventListener"](type, list.sltoken);
              X_Closure_correct(list.slcallback);
              delete list.sltoken;
              delete list.slcallback;
              break;
            case X_EventDispatcher_EVENT_TARGET_XHR:
              X_Closure_correct(raw["on" + type]);
              raw["on" + type] = X_emptyFunction;
              raw["on" + type] = "";
              console.log("XHR rmEvent " + type);
              break;
            default:
              if (raw.attachEvent) {
                raw.detachEvent("on" + type, that["_listeners"][X_LISTENERS_ACTUAL_HANDLER]);
                console.log("raw rmEvent " + type);
              } else {
                raw["on" + type] = X_emptyFunction;
                raw["on" + type] = "";
              }
              if (!skip) {
                X_Closure_correct(that["_listeners"][X_LISTENERS_ACTUAL_HANDLER]);
                delete that["_listeners"][X_LISTENERS_ACTUAL_HANDLER];
              }
          }
        } else {
          switch(that["_rawType"]) {
            case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT:
              raw["RemoveEventListener"](type, list.sltoken);
              X_Closure_correct(list.slcallback);
              delete list.sltoken;
              delete list.slcallback;
              break;
            case X_EventDispatcher_EVENT_TARGET_XHR:
              X_Closure_correct(raw["on" + type]);
              raw["on" + type] = X_emptyFunction;
              raw["on" + type] = "";
              break;
            default:
              raw["on" + type] = X_emptyFunction;
              raw["on" + type] = "";
              if (!skip) {
                X_Closure_correct(that["_listeners"][X_LISTENERS_ACTUAL_HANDLER]);
                delete that["_listeners"][X_LISTENERS_ACTUAL_HANDLER];
              }
          }
        }
      }
    }
  }
  var X_EventDispatcher_CURRENT_EVENTS = [];
  var X_EventDispatcher_ignoreActualEvent;
  var X_EventDispatcher_rawEvent;
  var X_EventDispatcher_actualHandleEvent = X_UA_EVENT.IE4 || X_UA_EVENT.IE ? function() {
    var e = event, elm = this["_rawObject"], ev, ret;
    if (X_EventDispatcher_ignoreActualEvent) {
      e.cancelBubble = true;
      return;
    }
    X_EventDispatcher_rawEvent = e;
    ev = new X_DomEvent(e, this, elm);
    X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length] = ev;
    ret = this["dispatch"](ev);
    if (X_EventDispatcher_rawEvent === e) {
      X_EventDispatcher_rawEvent = null;
    }
    --X_EventDispatcher_CURRENT_EVENTS.length;
    if (ret & X_CALLBACK_STOP_PROPAGATION) {
      e.cancelBubble = true;
    }
    if (!X_EventDispatcher_CURRENT_EVENTS.length) {
      ExecuteAtEnd_onEnd();
    }
    if (ret & X_CALLBACK_PREVENT_DEFAULT) {
      X_EventDispatcher_ignoreActualEvent = true;
      this["_tag"] === "A" && elm.blur();
      X_EventDispatcher_ignoreActualEvent = false;
      return e.returnValue = false;
    }
  } : function(e) {
    var ret = X_CALLBACK_NONE, elm = this["_rawObject"], ev, i, l;
    if (X_EventDispatcher_ignoreActualEvent) {
      e.stopPropagation();
      return;
    }
    X_EventDispatcher_rawEvent = e;
    ev = new X_DomEvent(e, this);
    X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length] = ev;
    if (X_Type_isArray(ev)) {
      if (ev.length === 0) {
        ret = X_CALLBACK_STOP_PROPAGATION | X_CALLBACK_PREVENT_DEFAULT;
      } else {
        for (i = 0, l = ev.length; i < l; ++i) {
          ret |= this["dispatch"](ev[i]) || 0;
        }
      }
    } else {
      ret = this["dispatch"](ev);
    }
    if (X_EventDispatcher_rawEvent === e) {
      X_EventDispatcher_rawEvent = null;
    }
    --X_EventDispatcher_CURRENT_EVENTS.length;
    if (!X_EventDispatcher_CURRENT_EVENTS.length) {
      ExecuteAtEnd_onEnd();
    }
    if (ret & X_CALLBACK_STOP_PROPAGATION) {
      e.stopPropagation();
    }
    if (ret & X_CALLBACK_PREVENT_DEFAULT) {
      X_EventDispatcher_ignoreActualEvent = true;
      this["_tag"] === "A" && elm.blur();
      X_EventDispatcher_ignoreActualEvent = false;
      e.preventDefault();
      if (X_UA["WebKit"] < 525.13) {
        if (e.type === "click" || e.type === "dbclick") {
          X_EventDispatcher_safariPreventDefault = true;
        }
      }
      return false;
    }
  };
  if (X_UA["WebKit"] < 525.13) {
    document.documentElement.onclick = document.documentElement["ondbclick"] = function(e) {
      if (X_EventDispatcher_safariPreventDefault) {
        X_EventDispatcher_safariPreventDefault = false;
        e.preventDefault();
        return false;
      }
    };
  }
  function X_EventDispatcher_toggleAllEvents(that, add) {
    var list = that["_listeners"], raw = that["_rawObject"] || X_UA_DOM.IE4 && X_Node__ie4getRawNode(that), func = add ? X_EventDispatcher_actualAddEvent : X_EventDispatcher_actualRemoveEvent, type;
    if (!list || !raw) {
      return;
    }
    for (type in list) {
      if (!X_String_isNumberString(type)) {
        func(that, type, raw, list[type], true);
      }
    }
  }
  console.log("X.Core.EventDispatcher");
  var X_Timer_now = Date.now || function() {
    return +new Date;
  }, X_Timer_REQ_ANIME_FRAME = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || false, X_Timer_CANCEL_ANIME_FRAME = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || 
  false, X_Timer_INTERVAL_TIME = 16, X_Timer_TICKET_LIST = [], X_Timer_removal = null, X_Timer_skipUpdate = false, X_Timer_uid = 0, X_Timer_timerId = 0, X_Timer_busyTimeout = false, X_Timer_timeStamp = 0, X_Timer_waitTime = 0, X_Timer_currentUID = 0, X_Timer_REQ_FRAME_LIST = [], X_Timer_requestID = 0, X_Timer_busyOnFrame = false, X_Timer_requestFrame = X_Timer_REQ_ANIME_FRAME ? function(args1, args2, args3) {
    var i = X_Timer_REQ_FRAME_LIST.length, f;
    i === 0 && (X_Timer_requestID = X_Timer_REQ_ANIME_FRAME(X_Timer_onEnterFrame));
    f = X_Closure_classifyCallbackArgs(args1, args2, args3);
    if (!f.cbKind) {
      f = {func:f};
    }
    X_Timer_REQ_FRAME_LIST[i] = f;
    return f._uid = ++X_Timer_uid;
  } : function(args1, args2, args3) {
    var i = X_Timer_REQ_FRAME_LIST.length, f;
    i === 0 && (X_Timer_requestID = X_Timer_add(0, 1, X_Timer_onEnterFrame));
    f = X_Closure_classifyCallbackArgs(args1, args2, args3);
    if (!f.cbKind) {
      f = {func:f};
    }
    X_Timer_REQ_FRAME_LIST[i] = f;
    return f._uid = ++X_Timer_uid;
  }, X_Timer_cancelFrame = X_Timer_CANCEL_ANIME_FRAME ? function(uid) {
    var list = X_Timer_REQ_FRAME_LIST, l = list.length, i = l, f;
    if (X_Timer_busyOnFrame) {
      if (!X_Timer_removal) {
        X_Timer_removal = {};
      }
      X_Timer_removal[uid] = true;
    } else {
      for (; i;) {
        if ((f = list[--i])._uid < uid) {
          break;
        }
        if (f._uid == uid) {
          list.splice(i, 1);
          l === 1 && X_Timer_CANCEL_ANIME_FRAME && X_Timer_CANCEL_ANIME_FRAME(X_Timer_requestID);
          break;
        }
      }
    }
    return 0;
  } : function(uid) {
    var list = X_Timer_REQ_FRAME_LIST, l = list.length, i = l, f;
    if (X_Timer_busyOnFrame) {
      if (!X_Timer_removal) {
        X_Timer_removal = {};
      }
      X_Timer_removal[uid] = true;
    } else {
      for (; i;) {
        if ((f = list[--i])._uid < uid) {
          break;
        }
        if (f._uid == uid) {
          list.splice(i, 1);
          l === 1 && X_Timer_remove(X_Timer_requestID);
          break;
        }
      }
    }
    return 0;
  };
  X["Timer"] = {"RESOLUTION":X_Timer_INTERVAL_TIME, "now":X_Timer_now, "add":X_Timer_add, "once":X_Timer_once, "remove":X_Timer_remove, "requestFrame":X_Timer_requestFrame, "cancelFrame":X_Timer_cancelFrame};
  function X_Timer_add(time, opt_count, args1, args2, args3) {
    var list = X_Timer_TICKET_LIST, hash, obj;
    time = time < X_Timer_INTERVAL_TIME ? 1 : time / X_Timer_INTERVAL_TIME | 0;
    if (!X_Type_isNumber(opt_count)) {
      args3 = args2;
      args2 = args1;
      args1 = opt_count;
      opt_count = 0;
    }
    hash = X_Closure_classifyCallbackArgs(args1, args2, args3);
    if (!hash) {
      return -1;
    }
    if (!hash.cbKind) {
      hash = {func:hash};
    }
    hash._time = time;
    hash.last = time;
    hash._count = opt_count;
    hash._uid = ++X_Timer_uid;
    list[list.length] = hash;
    !X_Timer_busyTimeout && X_Timer_update();
    return X_Timer_uid;
  }
  function X_Timer_once(time, args1, args2, args3) {
    return X_Timer_add(time, 1, args1, args2, args3);
  }
  function X_Timer_remove(uid) {
    var list = X_Timer_TICKET_LIST, i = list.length, l = i, f, q, eventDispatcher, lazy, listeners;
    if (X_Timer_busyTimeout) {
      if (!X_Timer_removal) {
        X_Timer_removal = {};
      }
      X_Timer_removal[uid] = true;
    } else {
      for (; i;) {
        if ((q = list[--i])._uid == uid) {
          list.splice(i, 1);
          if (X_EventDispatcher_LAZY_TIMERS[uid]) {
            delete X_EventDispatcher_LAZY_TIMERS[uid];
          }
          !X_Timer_skipUpdate && (q.last <= X_Timer_waitTime || l === 1) && X_Timer_update();
          break;
        }
      }
    }
    return 0;
  }
  if (X_UA["IE"] < 5 || X_UA["MacIE"]) {
    X["Timer"]["_"] = X_Timer_onTimeout;
    X_Timer_onTimeout = "X.Timer._()";
  }
  function X_Timer_onTimeout() {
    var now = X_Timer_now(), minus = (now - X_Timer_timeStamp) / X_Timer_INTERVAL_TIME | 0 || 1, list = X_Timer_TICKET_LIST, i = 0, l = list.length, limit = now + X_Timer_INTERVAL_TIME / 2, heavy, q, f, c, r, uid;
    if (X_Timer_busyTimeout) {
      alert("X_Timer_busyTimeout \u30d5\u30e9\u30b0\u304c\u7acb\u3063\u305f\u307e\u307e!\u30a8\u30e9\u30fc\u306e\u53ef\u80fd\u6027");
    }
    X_Timer_busyTimeout = true;
    for (; i < l; ++i) {
      q = list[i];
      if (X_Timer_removal && X_Timer_removal[q._uid] || 0 < (q.last -= minus) || heavy && (q.last = 1)) {
        continue;
      }
      c = q._count;
      X_Timer_currentUID = q._uid;
      if (q.cbKind) {
        r = X_Closure_proxyCallback(q, []);
      } else {
        r = q.func();
      }
      if (limit <= X_Timer_now()) {
        heavy = true;
      }
      if (r & X_CALLBACK_UN_LISTEN || c === 1) {
        list.splice(i, 1);
        --i;
        --l;
        continue;
      } else {
        if (1 < c) {
          --q._count;
        }
      }
      q.last = q._time;
    }
    X_Timer_timerId = X_Timer_currentUID = 0;
    X_Timer_busyTimeout = false;
    if (X_Timer_removal) {
      X_Timer_skipUpdate = true;
      for (uid in X_Timer_removal) {
        X_Timer_remove(uid);
      }
      X_Timer_skipUpdate = false;
      X_Timer_removal = null;
    }
    X_Timer_update();
    ExecuteAtEnd_onEnd();
  }
  function X_Timer_update() {
    var list = X_Timer_TICKET_LIST, i = list.length, n;
    if (i === 0) {
      X_Timer_timerId && clearTimeout(X_Timer_timerId);
      X_Timer_timerId = 0;
      return;
    }
    1 < i && list.sort(X_Timer_compareQueue);
    n = list[0].last;
    if (n < X_Timer_waitTime || X_Timer_timerId === 0) {
      if (X_Timer_timerId) {
        clearTimeout(X_Timer_timerId);
        n -= (X_Timer_now() - X_Timer_timeStamp) / X_Timer_INTERVAL_TIME;
        0 <= n || (n = 0);
      }
      X_Timer_timeStamp = X_Timer_now();
      X_Timer_timerId = setTimeout(X_Timer_onTimeout, X_Timer_INTERVAL_TIME * n | 0);
      X_Timer_waitTime = n;
    }
  }
  function X_Timer_compareQueue(a, b) {
    if (a.last === b.last) {
      return a._uid - b._uid;
    }
    return a.last - b.last;
  }
  if (X_UA["iOS"]) {
    window.addEventListener("scroll", function() {
      var last, now;
      if (X_Timer_timerId) {
        clearTimeout(X_Timer_timerId);
        now = X_Timer_now();
        last = X_Timer_timeStamp + X_Timer_INTERVAL_TIME * X_Timer_waitTime - now;
        X_Timer_timerId = setTimeout(X_Timer_onTimeout, 0 < last ? last : 0);
        X_Timer_timeStamp = now;
        X_Timer_waitTime = last / X_Timer_INTERVAL_TIME | 0;
      }
      X["ViewPort"]["getScrollPosition"]();
    });
  }
  function X_Timer_onEnterFrame(time) {
    var list = X_Timer_REQ_FRAME_LIST, l = list.length, i = 0, q, uid, args;
    time = time || X_Timer_now();
    X_Timer_busyOnFrame = true;
    for (; i < l; ++i) {
      q = list[i];
      if (X_Timer_removal && X_Timer_removal[q._uid]) {
        continue;
      }
      if (q.cbKind) {
        X_Closure_proxyCallback(q, args || (args = [time]));
      } else {
        q.func(time);
      }
    }
    list.splice(0, l);
    if (list.length) {
      X_Timer_requestID = X_Timer_REQ_ANIME_FRAME ? X_Timer_REQ_ANIME_FRAME(X_Timer_onEnterFrame) : X_Timer_add(0, 1, X_Timer_onEnterFrame);
    }
    X_Timer_busyOnFrame = false;
    if (X_Timer_removal) {
      for (uid in X_Timer_removal) {
        X_Timer_cancelFrame(X_Timer_removal[uid]);
      }
      X_Timer_removal = null;
    }
    ExecuteAtEnd_onEnd();
  }
  console.log("X.Core.Timer");
  var ExecuteAtEnd_CALLBACKS = [];
  function ExecuteAtEnd_add(func) {
    ExecuteAtEnd_CALLBACKS[ExecuteAtEnd_CALLBACKS.length] = func;
  }
  function ExecuteAtEnd_onEnd() {
    var i = -1, func;
    if (!ExecuteAtEnd_CALLBACKS.length) {
      return;
    }
    while (func = ExecuteAtEnd_CALLBACKS[++i]) {
      func();
    }
    ExecuteAtEnd_CALLBACKS.length = 0;
  }
  var FocusUtility_lastElmFocused;
  var FocusUtility_docActiveElmSupport = X_UA["IE"] || document.activeElement !== undefined;
  var FocusUtility_fixActiveElm;
  function FocusUtility_getFocusedElement() {
    return FocusUtility_fixActiveElm || (X_Script_gte15 ? X_Script_try(X_Object_find, [document, "activeElement"]) : window["vbs_testAE"]() && document.activeElement);
  }
  function FocusUtility_setTemporarilyFocus(elm) {
    var elmActive = FocusUtility_getFocusedElement();
    if (elmActive !== elm) {
      X_EventDispatcher_ignoreActualEvent = true;
      elm.focus();
      X_EventDispatcher_ignoreActualEvent = false;
      if (!FocusUtility_lastElmFocused) {
        FocusUtility_lastElmFocused = elmActive;
        elmActive && ExecuteAtEnd_add(FocusUtility_restoreFocus);
      }
    }
  }
  function FocusUtility_restoreFocus() {
    var elmActive = FocusUtility_getFocusedElement(), elm = FocusUtility_lastElmFocused;
    if (elmActive !== elm) {
      X_EventDispatcher_ignoreActualEvent = true;
      elm.focus();
      X_EventDispatcher_ignoreActualEvent = false;
    }
    FocusUtility_lastElmFocused = null;
  }
  var X_System_postMessageAccessKey = window.postMessage ? Math.random() * 10000 | 0 : 0, X_System_MESSAGE_RECIVERS = X_System_postMessageAccessKey && {}, X_System = X_Class_override(X_EventDispatcher(), {monitor:function() {
  }, gc:function() {
  }, message:function(name, callback) {
    var key = Math.random() * 10000 | 0;
    if (!X_System_postMessageAccessKey) {
      return;
    }
    X_System_MESSAGE_RECIVERS[name + key] = callback;
    X_ViewPort["listen"]("message", X_System);
    return X_System_postMessageAccessKey + "-" + name + key;
  }, handleEvent:function(e) {
    var i, _i, name;
    switch(e) {
      case "message":
        if (e.origin === X.URL.BASE_URL) {
          i = e.data.indexOf("-");
          console.log("msg ||| " + e.data.substr(0, i));
          if (e.data.substr(0, i) == X_System_postMessageAccessKey) {
            name = e.data.substr(i, _i = e.data.indexOf(" "));
            if (X_System_MESSAGE_RECIVERS[name]) {
              X_System_MESSAGE_RECIVERS[name](e.data.substr(_i + name.length));
            }
          }
        }
        console.log(e.origin + " " + X.URL.BASE_URL);
        return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
    }
  }}), X_System_javascriptScore;
  X_TEMP.onRearchEndOfScript = function() {
    var callbacks = X_TEMP.onSystemReady, i = callbacks.length, now = X_Timer_now(), speed = now - X["bootTime"];
    X["bootSpeed"] = X_System_javascriptScore = speed;
    console.log("js score " + speed);
    delete X_TEMP.onRearchEndOfScript;
    delete X_TEMP.onSystemReady;
    for (; i;) {
      callbacks[--i](X_System);
    }
  };
  var X_ViewPort_readyState, X_ViewPort_active = window.parent === window || !window.parent, X_ViewPort_activeTimerID, X_ViewPort_rootElement, X_ViewPort_lock, X_ViewPort_width, X_ViewPort_height, X_ViewPort_scrollX = 0, X_ViewPort_scrollY = 0, X_ViewPort_baseFontSize, X_ViewPort_vScrollbarSize, X_ViewPort_hScrollbarSize, X_ViewPort_useDetectionLoop = X_UA["IE"] < 9 || X_UA["iOS"], X_ViewPort_detectFontSize = !X_ViewPort_useDetectionLoop && function() {
    var size = X_Node_fontSizeNode["_rawObject"].offsetHeight;
    if (X_ViewPort_baseFontSize !== size) {
      X_ViewPort_baseFontSize = size;
      X_ViewPort_baseFontSize && X_ViewPort["asyncDispatch"](X_EVENT_BASE_FONT_RESIZED);
    }
  }, X_ViewPort_orientationFlag, X_ViewPort_orientationchange = window["orientation"] !== undefined && function(e) {
    X_ViewPort_orientationFlag = true;
    !X_UA["Android"] && X_ViewPort_resize();
  }, X_ViewPort_document = X_EventDispatcher(document), X_ViewPort = X_Class_override(X_EventDispatcher(window), {"handleEvent":function(e) {
    var href, i, name, active = false, elm, xnode;
    switch(e.type) {
      case "beforeunload":
        href = e.target && e.target["attr"] && e.target["attr"]("href");
        if (X_Type_isString(href) && !href.toLowerCase().indexOf("javascript:")) {
          return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
        }
        return X_ViewPort["dispatch"](X_EVENT_BEFORE_UNLOAD);
      case "unload":
        X_ViewPort["dispatch"](X_EVENT_UNLOAD);
        X_ViewPort_document["kill"]();
        X_ViewPort["kill"]();
        break;
      case "visibilitychange":
        console.log(e.type + ":" + document["hidden"]);
        X_ViewPort["dispatch"]((X_ViewPort_active = !document["hidden"]) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
        break;
      case "msvisibilitychange":
        console.log(e.type + ":" + document["msHidden"]);
        X_ViewPort["dispatch"]((X_ViewPort_active = !document["msHidden"]) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
        break;
      case "mozvisibilitychange":
        console.log(e.type + ":" + document["mozHidden"]);
        X_ViewPort["dispatch"]((X_ViewPort_active = !document["mozHidden"]) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
        break;
      case "webkitvisibilitychange":
        console.log(e.type + ":" + document["webkitHidden"]);
        X_ViewPort["dispatch"]((X_ViewPort_active = !document["webkitHidden"]) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
        break;
      case "blur":
      case "focusout":
        if (X_UA["IE"] < 9 && (elm = FocusUtility_getFocusedElement())) {
          xnode = X_Node_getXNode(elm);
          if (xnode) {
            xnode["listenOnce"](["focus", "blur"], X_ViewPort_detectFocusForIE);
          }
          if (X_ViewPort_activeTimerID) {
            X_Timer_remove(X_ViewPort_activeTimerID);
          }
          X_ViewPort_activeTimerID = X_Timer_once(16, X_ViewPort_changeFocus);
          return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
        }
        if (e.target !== X_ViewPort_document) {
          break;
        }
      case "pagehide":
        active = true;
      case "focus":
      case "pageshow":
      case "focusin":
        if (X_ViewPort_active === active) {
          X_ViewPort_active = !active;
          X_ViewPort["dispatch"](active ? X_EVENT_VIEW_DEACTIVATE : X_EVENT_VIEW_ACTIVATE);
        }
        break;
    }
  }});
  function X_ViewPort_detectFocusForIE(e) {
    var elmActive = FocusUtility_getFocusedElement();
    X_ViewPort_active = e.type === "focus";
    if (elmActive && this["_rawObject"] !== elmActive) {
      this["unlisten"](X_ViewPort_active ? "blur" : "focus", X_ViewPort_detectFocusForIE);
      console.log(">>>>>> activeElement \u53d6\u5f97 \u4e0d\u4e00\u81f4 " + this._tag);
    } else {
      if (!elmActive) {
      } else {
        if (elmActive) {
        }
      }
    }
    if (X_ViewPort_activeTimerID) {
      X_Timer_remove(X_ViewPort_activeTimerID);
    }
    X_ViewPort_activeTimerID = X_Timer_once(16, X_ViewPort_changeFocus);
    return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
  }
  function X_ViewPort_changeFocus() {
    X_ViewPort["dispatch"](X_ViewPort_active ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE);
    X_ViewPort_activeTimerID = 0;
  }
  X["ViewPort"] = {"listen":function(type, arg1, arg2, arg3) {
    var f;
    if (type <= X_ViewPort_readyState) {
      X_ViewPort["asyncDispatch"](type);
    }
    f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort["listen"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort["listen"](type, this, f.func, f.supplement);
      } else {
        X_ViewPort["listen"](type, arg1, arg2, arg3);
      }
    }
    return X["ViewPort"];
  }, "listenOnce":function(type, arg1, arg2, arg3) {
    var f;
    if (type <= X_ViewPort_readyState) {
      X_ViewPort["asyncDispatch"](type);
    }
    f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort["listenOnce"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort["listenOnce"](type, this, f.func, f.supplement);
      } else {
        X_ViewPort["listenOnce"](type, arg1, arg2, arg3);
      }
    }
    return X["ViewPort"];
  }, "unlisten":function(type, arg1, arg2, arg3) {
    var f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort["unlisten"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort["unlisten"](type, this, f.func, f.supplement);
      } else {
        X_ViewPort["unlisten"](type, arg1, arg2, arg3);
      }
    }
    return X["ViewPort"];
  }, "listening":function(type, arg1, arg2, arg3) {
    var f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      return X_ViewPort["listening"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        return X_ViewPort["listening"](type, this, f.func, f.supplement);
      }
    }
    return X_ViewPort["listening"](type, arg1, arg2, arg3);
  }, "asyncDispatch":function() {
    return X_ViewPort["asyncDispatch"].apply(X_ViewPort, arguments);
  }, "getPointerPosition":function() {
  }, "inView":function(elm) {
  }, "getSize":function() {
    return [X_ViewPort_width, X_ViewPort_height];
  }, "getDocumentSize":function() {
    X_Node_updateTimerID && X_Node_startUpdate();
    return [X_ViewPort_rootElement.scrollWidth || X_ViewPort_rootElement.offsetWidth, X_ViewPort_rootElement.scrollHeight || X_ViewPort_rootElement.offsetHeight];
  }, "getScrollPosition":window.pageXOffset !== undefined ? function() {
    X_Node_updateTimerID && X_Node_startUpdate();
    return [X_ViewPort_scrollX = window.pageXOffset, X_ViewPort_scrollY = window.pageYOffset];
  } : window.scrollLeft !== undefined ? function() {
    X_Node_updateTimerID && X_Node_startUpdate();
    return [X_ViewPort_scrollX = window.scrollLeft, X_ViewPort_scrollY = window.scrollTop];
  } : function() {
    X_Node_updateTimerID && X_Node_startUpdate();
    return [X_ViewPort_scrollX = X_ViewPort_rootElement.scrollLeft || X_elmBody.scrollLeft, X_ViewPort_scrollY = X_ViewPort_rootElement.scrollTop || X_elmBody.scrollTop];
  }, "getScrollbarSize":function() {
    return [X_ViewPort_vScrollbarSize, X_ViewPort_hScrollbarSize];
  }, "getBaseFontSize":function() {
    if (X_Node_updateTimerID) {
      X_Node_startUpdate();
      return X_ViewPort_baseFontSize = X_Node_fontSizeNode["_rawObject"].offsetHeight;
    }
    return X_ViewPort_baseFontSize;
  }, "isActive":function() {
    return X_ViewPort_active;
  }, "isVisible":function() {
    return X_ViewPort_active;
  }};
  var X_ViewPort_resize = X_ViewPort_useDetectionLoop ? function() {
    var size;
    if (!X_ViewPort_lock) {
      size = X_ViewPort_getWindowSize();
      if (X_ViewPort_width !== size[0] || X_ViewPort_height !== size[1]) {
        X_ViewPort_width = size[0];
        X_ViewPort_height = size[1];
        X_Timer_once(100, X_ViewPort_detectFinishResizing);
        X_ViewPort_lock = true;
      }
    }
    size = X_Node_fontSizeNode["_rawObject"].offsetHeight;
    if (X_ViewPort_baseFontSize !== size) {
      X_ViewPort_baseFontSize && X_ViewPort["asyncDispatch"](X_EVENT_BASE_FONT_RESIZED);
      X_ViewPort_baseFontSize = size;
    }
  } : function(e) {
    console.log("-- resize : " + X_Timer_now());
    !X_ViewPort_lock && (X_ViewPort_lock = true) && X_Timer_once(100, X_ViewPort_detectFinishResizing);
    return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
  };
  function X_ViewPort_detectFinishResizing() {
    var size = X_ViewPort_getWindowSize();
    if (X_ViewPort_width !== size[0] || X_ViewPort_height !== size[1]) {
      X_ViewPort_width = size[0];
      X_ViewPort_height = size[1];
      X_Timer_once(100, X_ViewPort_detectFinishResizing);
    } else {
      console.log("-- detectFinishResizing : " + X_Timer_now());
      X_ViewPort["asyncDispatch"](X_EVENT_VIEW_RESIZED);
      X_ViewPort_lock = false;
      if (X_ViewPort_orientationFlag) {
        X_ViewPort_orientationFlag = false;
        X_ViewPort["asyncDispatch"](100, {type:X_EVENT_VIEW_TURNED, "orientation":window.orientation});
      }
    }
  }
  X_TEMP.onDomContentLoaded = function() {
    var html, head, body;
    console.log("> X_TEMP.onDomContentLoaded rs:" + X_ViewPort_readyState);
    if (X_EVENT_PRE_INIT <= X_ViewPort_readyState) {
      return X_CALLBACK_UN_LISTEN;
    }
    X_ViewPort_readyState = X_EVENT_PRE_INIT;
    X_TEMP.onDomContentLoaded && X_ViewPort_document["unlisten"]("DOMContentLoaded", X_TEMP.onDomContentLoaded);
    delete X_TEMP.onDomContentLoaded;
    X_elmBody = document.body;
    X_ViewPort_rootElement = document.compatMode !== "CSS1Compat" ? X_elmBody : X_elmHtml || X_elmBody;
    X["Doc"]["html"] = html = X_Node_html = X_elmHtml && Node(X_elmHtml)["removeClass"]("js-disabled")["addClass"](X_UA_classNameForHTML.split(".").join("_"));
    html["_flags"] |= X_NodeFlags_IN_TREE;
    X["Doc"]["head"] = head = X_Node_head = X_elmHead && Node(X_elmHead);
    X["Doc"]["body"] = body = X_Node_body = Node(X_elmBody);
    body["parent "] = head["parent"] = html;
    html["_xnodes"] = [head, body];
    html["appendTo"] = html["prev"] = html["next"] = html["clone"] = html["remove"] = html["kill"] = html["create"] = html["createText"] = html["createAt"] = html["createTextAt"] = html["append"] = html["appendAt"] = html["empty"] = html["html"] = html["text"] = html["css"] = html["cssText"] = head["appendTo"] = head["prev"] = head["clone"] = head["remove"] = head["kill"] = head["createText"] = head["createTextAt"] = head["empty"] = head["html"] = head["text"] = head["css"] = head["cssText"] = body["appendTo"] = 
    body["next"] = body["clone"] = body["remove"] = body["kill"] = new Function("return this");
    X_ViewPort["listenOnce"](X_EVENT_PRE_INIT, function() {
      X_ViewPort_readyState = X_EVENT_XTREE_READY;
      !X_TEMP.X_Dom_useBuilder && X_ViewPort["asyncDispatch"](X_EVENT_XTREE_READY);
    });
    X_ViewPort["listenOnce"](X_EVENT_XTREE_READY, function() {
      X_ViewPort_readyState = X_EVENT_INIT;
      X_Node_body["appendAt"](0, X_Node_systemNode = X_Doc_create("div", {"class":"hidden-system-node"}), X_Node_fontSizeNode = X_Doc_create("div", {"class":"hidden-system-node"})["cssText"]("line-height:1;height:1em;")["text"]("X"));
      X_Node_startUpdate();
      X_ViewPort["asyncDispatch"](X_EVENT_INIT);
    });
    X_ViewPort["listenOnce"](X_EVENT_INIT, function() {
      var size = X_ViewPort_getWindowSize(), defaultOverflow = X_elmBody.style.overflow, w, h;
      X_ViewPort_width = size[0];
      X_ViewPort_height = size[1];
      X_elmBody.style.overflow = "hidden";
      w = X_elmBody.clientWidth;
      h = X_elmBody.clientHeight;
      X_elmBody.style.overflow = "scroll";
      w -= X_elmBody.clientWidth;
      h -= X_elmBody.clientHeight;
      if (!w) {
        w = X_elmBody.offsetWidth - X_elmBody.clientWidth;
      }
      if (!h) {
        h = X_elmBody.offsetHeight - X_elmBody.clientHeight;
      }
      X_elmBody.style.overflow = defaultOverflow;
      X_ViewPort_vScrollbarSize = w;
      X_ViewPort_hScrollbarSize = h;
      if (h <= 0) {
        console.log("invalid hScrollbarSize: " + h);
        X_ViewPort_hScrollbarSize = w;
      }
      if (X_ViewPort_orientationchange) {
        X_ViewPort["listen"]("orientationchange", X_ViewPort_orientationchange);
      }
      if (X_ViewPort_detectFontSize) {
        X_ViewPort["listen"]("resize", X_ViewPort_resize);
        X_Timer_add(333, X_ViewPort_detectFontSize);
      } else {
        X_Timer_add(333, X_ViewPort_resize);
      }
      X_ViewPort_baseFontSize = X_Node_fontSizeNode["_rawObject"].offsetHeight;
      X_ViewPort["asyncDispatch"](X_ViewPort_readyState = X_EVENT_XDOM_READY);
    });
    if (X_TEMP.X_Dom_useBuilder) {
      X_TEMP.X_Dom_useBuilder = !!X_elmBody.children.length;
    }
    X_ViewPort["asyncDispatch"](X_EVENT_PRE_INIT);
    X_ViewPort["listen"](["beforeunload", "unload"]);
    if (document["hidden"] !== undefined) {
      X_ViewPort_document["listen"]("visibilitychange", X_ViewPort);
    } else {
      if (document["webkitHidden"] !== undefined) {
        X_ViewPort_document["listen"]("webkitvisibilitychange", X_ViewPort);
      } else {
        if (document["msHidden"] !== undefined) {
          X_ViewPort_document["listen"]("msvisibilitychange", X_ViewPort);
        } else {
          if (document["mozHidden"] !== undefined) {
            X_ViewPort_document["listen"]("mozvisibilitychange", X_ViewPort);
          }
        }
      }
    }
    if (window["onpageshow"] !== undefined) {
      X_ViewPort["listen"](["pageshow", "pagehide"]);
    }
    if (X_UA["Gecko"]) {
      document.addEventListener("focus", X_ViewPort["handleEvent"], true);
      document.addEventListener("blur", X_ViewPort["handleEvent"], true);
    } else {
      X_ViewPort_document["listen"](["focusin", "focusout"], X_ViewPort);
    }
    if (!FocusUtility_docActiveElmSupport) {
      X_ViewPort["listen"]("focus", X_ViewPort_fixActiveElm);
    }
    X_ViewPort["listen"](["focus", "blur"]);
    return X_CALLBACK_UN_LISTEN;
  };
  function X_ViewPort_fixActiveElm(e) {
    FocusUtility_fixActiveElm = e.target["_rawObject"];
  }
  function X_ViewPort_getWindowSize() {
    return X_UA["IE"] ? [X_ViewPort_rootElement.clientWidth, X_ViewPort_rootElement.clientHeight] : X_UA["Opera"] < 12 ? [X_ViewPort_rootElement.offsetWidth, X_ViewPort_rootElement.offsetHeight] : [window.innerWidth, window.innerHeight];
  }
  console.log("X.Dom dom:w3c=" + X_UA_DOM.W3C + " ev:w3c=" + X_UA_EVENT.W3C);
  if (X_UA_EVENT.W3C) {
    X_ViewPort_document["listenOnce"]("DOMContentLoaded", X_TEMP.onDomContentLoaded);
  } else {
    if (6 <= X_UA["IE"] && X["inHead"]) {
      X_TEMP._script = document.createElement("<script id=__ieonload defer src=javascript:void(0)>\x3c/script>");
      X_elmHead.appendChild(X_TEMP._script);
      X_TEMP._script.onreadystatechange = function() {
        var s = X_TEMP._script;
        if (s && s.readyState === "complete") {
          s.onreadystatechange = X_emptyFunction;
          s.onreadystatechange = null;
          s.removeNode(true);
          delete X_TEMP._script;
          X_TEMP.onDomContentLoaded && X_TEMP.onDomContentLoaded();
        }
      };
    }
  }
  if (X_UA["WebKit"] <= 419.3) {
    X_Timer_add(16, function() {
      if (!X_TEMP.onDomContentLoaded) {
        return X_CALLBACK_UN_LISTEN;
      }
      if (document.readyState === "loaded" || document.readyState === "complete") {
        return X_TEMP.onDomContentLoaded();
      }
    });
  }
  X_ViewPort["listenOnce"]("load", X_TEMP.onDomContentLoaded);
  X.Logger = {_$LogArea:null, debug:function(msg) {
    X.Logger._output(msg, 0);
  }, info:function(msg) {
    X.Logger._output(msg, 1);
  }, warn:function(msg) {
    X.Logger._output(msg, 2);
  }, critical:function(msg) {
    X.Logger._output(msg, 3);
  }, _output:function(msg, level) {
    var body, $Area;
    if (X_EVENT_XDOM_READY <= X_ViewPort_readyState) {
      if ($Area = X.Logger._$LogArea) {
        $Area["remove"]();
        delete X.Logger._$LogArea;
      }
    } else {
      if (X_EVENT_XDOM_READY <= X_ViewPort_readyState) {
        if (!($Area = X.Logger._$LogArea)) {
          $Area = X.Logger._$LogArea = X.Node("div").addToRoot(0);
        }
        $Area.add("<p>" + msg + "</p>");
      } else {
        if (console) {
          level === 0 ? console.debug(msg) : level === 1 ? console.info(msg) : level === 2 ? console.warn(msg) : level === 3 ? console.warn(msg) : console.warn(msg);
        } else {
          1 < level && alert(msg);
        }
      }
    }
  }};
  console.log("X.Core.Log");
  X["Doc"] = {"listen":function(type, arg1, arg2, arg3) {
    var f;
    if (type <= X_ViewPort_readyState && type === "DOMContentLoaded") {
      X_ViewPort_document["asyncDispatch"](type);
    }
    f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort_document["listen"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort_document["listen"](type, this, f.func, f.supplement);
      } else {
        X_ViewPort_document["listen"](type, arg1, arg2, arg3);
      }
    }
    return X["Doc"];
  }, "listenOnce":function(type, arg1, arg2, arg3) {
    var f;
    if (type <= X_ViewPort_readyState && type === "DOMContentLoaded") {
      X_ViewPort_document["asyncDispatch"](type);
    }
    f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort_document["listenOnce"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort_document["listenOnce"](type, this, f.func, f.supplement);
      }
    }
    X_ViewPort_document["listenOnce"](type, arg1, arg2, arg3);
    return X["Doc"];
  }, "unlisten":function(type, arg1, arg2, arg3) {
    var f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      X_ViewPort_document["unlisten"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        X_ViewPort_document["unlisten"](type, this, f.func, f.supplement);
      } else {
        X_ViewPort_document["unlisten"](type, arg1, arg2, arg3);
      }
    }
    return X["Doc"];
  }, "listening":function(type, arg1, arg2, arg3) {
    var f = X_Closure_classifyCallbackArgs(arg1, arg2, arg3);
    if (!f.cbKind) {
      return X_ViewPort_document["listening"](type, this, arg1);
    } else {
      if (f.cbKind === X_CLOSURE_FUNC_ONLY) {
        return X_ViewPort_document["listening"](type, this, f.func, f.supplement);
      }
    }
    return X_ViewPort_document["listening"](type, arg1, arg2, arg3);
  }, "create":X_Doc_create, "createText":X_Doc_createText};
  function X_Doc_create(tag, opt_attrs, opt_css) {
    var list, i;
    switch(X_Node_getType(tag)) {
      case X_NodeType_STRING:
        X_Node_newByTag = true;
        return new Node(tag, opt_attrs, opt_css);
      case X_NodeType_HTML_STRING:
        list = X_HtmlParser_parse(tag, true);
        for (i = list.length; 1 < i;) {
          list[--i]["kill"]();
        }
        return list[0];
    }
  }
  function X_Doc_createText(text) {
    X_Node_newByText = true;
    return new Node(text);
  }
  var X_Dom_DTD_EMPTY = {"AREA":true, "BASE":true, "BASEFONT":true, "BR":true, "COL":true, "FRAME":true, "HR":true, "IMG":true, "INPUT":true, "ISINDEX":true, "LINK":true, "META":true, "PARAM":true, "EMBED":true}, X_Dom_DTD_TAG_FIX = X_UA["IE"] < 5 ? {"ABBR":"ACRONYM", "BDO":"", "RUBY":""} : X_UA["IE"] < 7 ? {"ABBR":"ACRONYM"} : {}, X_Dom_DTD_ATTR_VAL_IS_URI = {"action":true, "archive":true, "background":true, "cite":true, "classid":true, "codebase":true, "data":true, "href":true, "longdesc":true, 
  "profile":true, "src":true, "usemap":true}, X_Dom_DTD_MOVE_TO_HEAD = {"STYLE":true, "LINK":true, "TITLE":true, "BGSOUND":true, "AREA":true, "BASE":true, "META":true}, X_Dom_DTD_CLEANUP_TAGS = {"SCRIPT":true, "NOSCRIPT":true, "NOFRAMES":true, "!":true, "COMMENT":true, "NOEMBED":true, "NOLAYER":true}, X_Dom_DTD_SKIP_CLEANUP_TAGS = {"PRE":true, "TEXTAREA":true, "CODE":true, "KBD":true, "SAMP":true, "XMP":true, "PLAINTEXT":true, "LISTING":true};
  var X_NodeFlags_DESTROYED = 0, X_NodeFlags_EXIST = 1, X_NodeFlags_IN_TREE = 2, X_NodeFlags_STYLE_IS_DISPLAY_NONE = 2 << 1, X_NodeFlags_STYLE_IS_INVISIBLE = 2 << 2, X_NodeFlags_STYLE_IS_POS_ABSOLUTE = 2 << 3, X_NodeFlags_STYLE_IS_NO_OVERFLOW = 2 << 4, X_NodeFlags_STYLE_IS_WIDTH_LENGTH = 2 << 5, X_NodeFlags_STYLE_IS_WIDTH_PCT = 2 << 6, X_NodeFlags_STYLE_IS_HEIGHT_LENGTH = 2 << 7, X_NodeFlags_STYLE_IS_HEIGHT_PCT = 2 << 8, X_NodeFlags_STYLE_IS_FONT_LENGTH = 2 << 9, X_NodeFlags_STYLE_IS_FONT_PCT = 2 << 
  10, X_NodeFlags_DIRTY_POSITION = 2 << 11, X_NodeFlags_DIRTY_CONTENT = 2 << 12, X_NodeFlags_DIRTY_ID = 2 << 12, X_NodeFlags_DIRTY_CLASSNAME = 2 << 13, X_NodeFlags_DIRTY_ATTR = 2 << 14, X_NodeFlags_DIRTY_CSS = 2 << 15, X_NodeFlags_DIRTY_IE_FILTER = X_UA["IE"] < 10 && X_UA["ActiveX"] ? 2 << 16 : 0, X_NodeFlags_ACTUAL_LISTENING = 2 << 17, X_NodeFlags_OLD_ATTRTEXT = 2 << 18, X_NodeFlags_OLD_CSSTEXT = 2 << 19, X_NodeFlags_IE_FILTER_NOW = 2 << 20, X_NodeFlags_GPU_RESERVED = 2 << 21, X_NodeFlags_GPU_NOW = 
  2 << 22, X_NodeFlags_GPU_RELEASE_RESERVED = 2 << 23, X_NodeFlags_GPU_CHILD = 2 << 24, X_NodeFlags_IE4_HAS_TEXTNODE = X_UA["IE"] < 5 ? 2 << 21 : 0, X_NodeFlags_IE4_HAS_ELEMENT = X_UA["IE"] < 5 ? 2 << 22 : 0, X_NodeFlags_IE4_DIRTY_CHILDREN = X_UA["IE"] < 5 ? 2 << 23 : 0, X_NodeFlags_IE4_FIXED = X_UA["IE"] < 5 ? 2 << 24 : 0, X_NodeFlags_IE5_DISPLAY_NONE_FIX = 5 <= X_UA["IE"] && X_UA["IE"] < 5.5 && X_UA["ActiveX"] ? 2 << 24 : 0, X_NodeFlags_IE8_OPACITY_FIX = 0, X_NodeFlags_IE_FILTER_FIX_AFTER = X_UA["ActiveX"] && 
  2 << 26, X_NodeFlags_IS_SVG = document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg")["createSVGRect"] ? 2 << 27 : 0, X_NodeFlags_IS_VML = function() {
    if (!X_UA["ActiveX"] || X_UA["IE"] < 5 || 9 < X_UA["IE"]) {
      return 0;
    }
    document.write("\x3c!--[if vml]><script id=vmltest1>__vml=1;\x3c/script><![endif]--\x3e" + "\x3c!--[if gte vml 1]><script id=vmltest2>__vml=2;\x3c/script><![endif]--\x3e");
    X["Doc"]["VML"] = window["__vml"] / 2 || 0;
    switch(window["__vml"]) {
      case 2:
        document.getElementById("vmltest2").removeNode(true);
      case 1:
        document.getElementById("vmltest1").removeNode(true);
        return 2 << 28;
    }
    return 0;
  }(), X_Node_BITMASK_RESET_STYLE = (2 << 29) - 1 + (2 << 29) ^ (X_NodeFlags_STYLE_IS_DISPLAY_NONE | X_NodeFlags_STYLE_IS_INVISIBLE | X_NodeFlags_STYLE_IS_POS_ABSOLUTE | X_NodeFlags_STYLE_IS_NO_OVERFLOW | X_NodeFlags_STYLE_IS_WIDTH_LENGTH | X_NodeFlags_STYLE_IS_WIDTH_PCT | X_NodeFlags_STYLE_IS_HEIGHT_LENGTH | X_NodeFlags_STYLE_IS_HEIGHT_PCT | X_NodeFlags_STYLE_IS_FONT_LENGTH | X_NodeFlags_STYLE_IS_FONT_PCT), X_Node_BitMask_IS_DIRTY = X_NodeFlags_DIRTY_POSITION | X_NodeFlags_DIRTY_CONTENT | X_NodeFlags_DIRTY_ID | 
  X_NodeFlags_DIRTY_CLASSNAME | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER | X_NodeFlags_IE8_OPACITY_FIX, X_Node_BitMask_RESET_DIRTY = (2 << 29) - 1 + (2 << 29) ^ X_Node_BitMask_IS_DIRTY, X_Node_BitMask_RESET_GPU = (2 << 29) - 1 + (2 << 29) ^ (X_NodeFlags_GPU_RESERVED | X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED), X_Node_BitMask_IE4_IS_MIX = X_NodeFlags_IE4_HAS_TEXTNODE | X_NodeFlags_IE4_HAS_ELEMENT;
  X["Doc"]["SVG"] = !!X_NodeFlags_IS_SVG;
  var X_Dom_Event_devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || 1, X_Dom_Event_convertMSPointerType = !window.PointerEvent && window.MSPointerEvent && [0, 0, "touch", "pen", "mouse"], X_Dom_Event_coordinateSystemForElementFromPoint = X_UA["iOS"] < 5 ? "page" : "client", X_Dom_Event_CANCEL_MOUSE = {}, X_DomEvent;
  if (X_Dom_Event_devicePixelRatio !== 1) {
    X_UA_classNameForHTML += " dpr" + X_Dom_Event_devicePixelRatio;
    X_UA["dpr"] = X_Dom_Event_devicePixelRatio;
  }
  if (!X_UA["IE"] || 9 <= X_UA["IE"]) {
    X_DomEvent = function(e, xnode) {
      var originalType = e.type, isNum = X_Type_isNumber, type, pointerEventType, touches, events, altKey, ctrlKey, metaKey, shiftKey, target, xtarget, offset, related, force, elm, i, n, time, touch, ev;
      this._e = e;
      this["type"] = type = X_Event_RenameTo[originalType] || originalType;
      switch(type) {
        case "message":
          this["data"] = e.data;
          this["origin"] = e.origin;
          this["source"] = e.source;
          break;
        case "progress":
          this["lengthComputable"] = e.lengthComputable;
          this["loaded"] = e.loaded;
          this["total"] = e.total;
          break;
        case "dragstart":
        case "dragenter":
        case "dragover":
        case "dragleave":
        case "drop":
        case "dragend":
          this["dataTransfer"] = e.dataTransfer;
          break;
      }
      if (e.pointerType || X_UA["IE"] === 10 && type === "click" && (e.pointerType = "mouse")) {
        if (X_Dom_Event_convertMSPointerType) {
          this["pointerType"] = X_Dom_Event_convertMSPointerType[e.pointerType];
          this["pressure"] = isNum(e.pressure) ? e.pressure : e.button !== -1 ? 0.5 : 0;
          this["width"] = e.width / X_Dom_Event_devicePixelRatio;
          this["height"] = e.height / X_Dom_Event_devicePixelRatio;
        } else {
          this["pointerType"] = e.pointerType;
          this["pressure"] = e.pressure;
          this["width"] = e.width;
          this["height"] = e.height;
        }
        switch(this["pointerType"]) {
          case "pen":
            this["tiltX"] = e.tiltX;
            this["tiltY"] = e.tiltY;
            if (originalType === "MSPointerHover") {
              this["type"] = "pointermove";
            }
          case "touch":
            this["radiusX"] = e.radiusX;
            this["radiusY"] = e.radiusY;
            this["rotationAngle"] = e.rotationAngle;
          case "mouse":
        }
        this["button"] = e.button;
        this["buttons"] = e.buttons;
        this["pointerId"] = e.pointerId;
        this["target"] = X_Node_getXNode(e.target);
        this["relatedTarget"] = X_Node_getXNode(e.relatedTarget);
        this["isPrimary"] = e.isPrimary;
        this["hwTimestamp"] = e.hwTimestamp;
        this["timestamp"] = e.timestamp;
        this["altKey"] = e.altKey;
        this["ctrlKey"] = e.ctrlKey;
        this["metaKey"] = e.metaKey;
        this["shiftKey"] = e.shiftKey;
        this["clientX"] = e.clientX;
        this["clientY"] = e.clientY;
        this["pageX"] = e.pageX;
        this["pageY"] = e.pageY;
        this["offsetX"] = e.offsetX;
        this["offsetY"] = e.offsetY;
      } else {
        if (pointerEventType = X_Event_toPointer[originalType]) {
          if (touches = e.changedTouches) {
            if (touches.length === 0) {
              alert("e.changedTouches.length === 0");
            }
            X_Dom_Event_CANCEL_MOUSE[xnode["_uid"]] = pointerEventType;
            events = [];
            altKey = e.altKey;
            ctrlKey = e.ctrlKey;
            metaKey = e.metaKey;
            shiftKey = e.shiftKey;
            time = X_Timer_now();
            force = originalType === "touchend" || originalType === "touchcancel" ? 0 : 0.5;
            for (i = touches.length; i;) {
              touch = touches[--i];
              target = touch.target;
              target = target.nodeType === 3 ? target.parentNode : target;
              xtarget = X_Node_getXNode(target);
              offset = X_UA["iOS"] < 5 ? xtarget.offset() : target.getBoundingClientRect();
              related = touch.relatedTarget;
              events[i] = {"type":pointerEventType, "pointerType":"touch", "target":xtarget, "currentTarget":xnode, "relatedTarget":related && X_Node_getXNode(related.nodeType === 3 ? related.parentNode : related), "isPrimary":true, "hwTimestamp":time, "timestamp":time, "button":force ? 0 : -1, "buttons":force ? 1 : 0, "altKey":altKey, "ctrlKey":ctrlKey, "metaKey":metaKey, "shiftKey":shiftKey, "pointerId":touch.identifier + 2, "pageX":touch.pageX, "pageY":touch.pageY, "clientX":isNum(touch.clientX) ? 
              touch.clientX : touch.pageX - X_ViewPort_scrollX, "clientY":isNum(touch.clientY) ? touch.clientY : touch.pageY - X_ViewPort_scrollY, "offsetX":isNum(touch.offsetX) ? touch.offsetX : touch[X_Dom_Event_coordinateSystemForElementFromPoint + "X"] - (offset.x || offset.left || 0), "offsetY":isNum(touch.offsetY) ? touch.offsetY : touch[X_Dom_Event_coordinateSystemForElementFromPoint + "Y"] - (offset.y || offset.top || 0), "radiusX":touch.radiusX || 0, "radiusY":touch.radiusY || 0, "rotationAngle":touch.rotationAngle || 
              0, "pressure":touch.force || touch.webkitForce || force, "width":touch.width || 0, "height":touch.height || 0};
            }
            return events.length === 1 ? events[0] : events;
          } else {
            if (X_Dom_Event_CANCEL_MOUSE[xnode["_uid"]] === pointerEventType) {
              delete X_Dom_Event_CANCEL_MOUSE[xnode["_uid"]];
              return [];
            }
            this["type"] = pointerEventType;
            this["pointerType"] = "mouse";
            this["button"] = e.button !== undefined ? e.button : e.which !== undefined ? e.which - 1 : -1;
            this["buttons"] = e.buttons !== undefined ? e.buttons : this["button"] === 0 ? 1 : this["button"] === 1 ? 2 : this["button"] === 2 ? 4 : 0;
            this["pressure"] = this["button"] !== -1 ? 0.5 : 0;
            elm = e.target;
            this["target"] = X_Node_getXNode(elm.nodeType === 3 ? elm.parentNode : elm);
            this["isPrimary"] = true;
            this["hwTimestamp"] = this["timestamp"] = X_Timer_now();
            this["altKey"] = e.altKey;
            this["ctrlKey"] = e.ctrlKey;
            this["metaKey"] = e.metaKey;
            this["shiftKey"] = e.shiftKey;
            this["pointerId"] = 1;
            this["clientX"] = e.clientX;
            this["clientY"] = e.clientY;
            this["pageX"] = e.pageX;
            this["pageY"] = e.pageY;
            this["offsetX"] = isNum(e.offsetX) ? e.offsetX : e.layerX;
            this["offsetY"] = isNum(e.offsetY) ? e.offsetY : e.layerY;
            if (originalType === "mousedown" && this["button"] === 2 && X_UA["Prsto"]) {
              events = [X_Object_copy(this), X_Object_copy(this)];
              events[1].type = "contextmenu";
              return events;
            }
          }
        } else {
          this["keyCode"] = X_Type_isFinite(e.keyCode) ? e.keyCode : X_Type_isFinite(e.charCode) ? e.charCode : e.which;
          this["charCode"] = X_Type_isFinite(e.charCode) ? e.charCode : e.which;
          this["altKey"] = e.altKey || !!(e.modifiers & 1);
          this["ctrlKey"] = e.ctrlKey || !!(e.modifiers & 2);
          this["shiftKey"] = e.shiftKey || !!(e.modifiers & 4);
          this["metaKey"] = e.metaKey || !!(e.modifiers & 8);
          this["button"] = e.button !== undefined ? e.button : e.which !== undefined ? e.which - 1 : -1;
          this["buttons"] = e.buttons !== undefined ? e.buttons : this["button"] === 0 ? 1 : this["button"] === 1 ? 2 : this["button"] === 2 ? 4 : 0;
          if (elm = e.target) {
            this["target"] = X_Node_getXNode(elm.nodeType === 3 ? elm.parentNode : elm);
          }
          if (elm = e.relatedTarget) {
            this["relatedTarget"] = X_Node_getXNode(elm.nodeType === 3 ? elm.parentNode : elm);
          }
          if (type === "wheel") {
            if (e.deltaY !== undefined) {
              this["deltaX"] = e.deltaX;
              this["deltaY"] = e.deltaY;
              this["deltaZ"] = e.deltaZ || 0;
            } else {
              if (e.wheelDeltaY !== undefined) {
                this["deltaX"] = e.wheelDeltaX / 120;
                this["deltaY"] = e.wheelDeltaY / 120;
                this["deltaZ"] = e.wheelDeltaZ / 120 || 0;
              } else {
                if (e.wheelDelta !== undefined) {
                  this["deltaX"] = this["deltaZ"] = 0;
                  this["deltaY"] = e.wheelDelta / -120;
                } else {
                  if (e.detail !== undefined) {
                    this["deltaX"] = this["deltaZ"] = 0;
                    this["deltaY"] = originalType === "MozMousePixelScroll" ? e.detail / 45 : e.detail / 3;
                  } else {
                    this["deltaX"] = this["deltaY"] = this["deltaZ"] = 0;
                  }
                }
              }
            }
          }
        }
      }
      this["currentTarget"] = xnode;
      this["eventPhase"] = e.eventPhase;
      this["detail"] = e.detail;
    };
  } else {
    X_DomEvent = function(e, xnode, element) {
      var originalType = e.type, btn, type;
      this["type"] = X_Event_RenameTo[originalType] || originalType;
      this["target"] = X_Node_getXNode(e.srcElement);
      if (this["target"] && !this["target"]["_tag"]) {
        this["target"] = this["target"].parent;
      }
      this["currentTarget"] = xnode;
      this["relatedTarget"] = X_Node_getXNode(e.formElement || e.toElement);
      this["eventPhase"] = e.srcElement === element ? 2 : 3;
      this["keyCode"] = e.keyCode;
      this["charCode"] = e.keyCode;
      this["altKey"] = e.altKey;
      this["ctrlKey"] = e.ctrlKey;
      this["shiftKey"] = e.shiftKey;
      switch(this["type"]) {
        case "message":
          this["data"] = e.data;
          this["origin"] = e.origin;
          this["source"] = e.source;
          break;
        case "progress":
          this["loaded"] = e.loaded;
          this["total"] = e.total;
          break;
      }
      switch(originalType) {
        case "click":
        case "dblclick":
          this["button"] = 0;
          break;
        case "contextmenu":
          this["button"] = 2;
          break;
        default:
          btn = e.button;
          this["button"] = btn & 1 ? 0 : btn & 4 ? 2 : btn & 2 ? 1 : -1;
      }
      this["buttons"] = e.button;
      this["deltaX"] = 0;
      this["deltaY"] = e.wheelDelta / -120;
      if (type = X_Event_toPointer[originalType]) {
        this["type"] = type;
        this["pointerType"] = "mouse";
        this["clientX"] = e.clientX;
        this["clientY"] = e.clientY;
        this["pageX"] = e.clientX + X_ViewPort_rootElement.scrollLeft;
        this["pageY"] = e.clientY + X_ViewPort_rootElement.scrollTop;
        if (5 <= X_UA["IE"]) {
          this["offsetX"] = e.offsetX;
          this["offsetY"] = e.offsetY;
        }
        this["pressure"] = this["button"] !== -1 ? 0.5 : 0;
        this["isPrimary"] = true;
        this["hwTimestamp"] = this["timestamp"] = X_Timer_now();
        this["pointerId"] = 1;
        this["radiusX"] = 0;
        this["radiusY"] = 0;
        this["rotationAngle"] = 0;
        this["width"] = 0;
        this["height"] = 0;
        this["tiltX"] = 0;
        this["tiltY"] = 0;
      }
    };
  }
  if (document.onwheel === undefined) {
    if (X_UA["Gecko"] && window.MouseScrollEvent) {
      if (0 <= X_Number_conpareVersion(X_UA_Gecko_Version, "1.9.1")) {
        console.log("wheel <= MozMousePixelScroll");
        X_Event_Rename["wheel"] = "MozMousePixelScroll";
      } else {
        if (0 <= X_Number_conpareVersion(X_UA_Gecko_Version, "0.9.7")) {
          console.log("wheel <= DOMMouseScroll");
          X_Event_Rename["wheel"] = "DOMMouseScroll";
        }
      }
    } else {
      X_Event_Rename["wheel"] = "mousewheel";
    }
  }
  if (X_UA["Opera"] || X_UA["Webkit"] || X_UA["Blink"] || X_UA["Khtml"] || X_UA["AOSP"] || X_UA["ChromeWV"]) {
    X_Event_Rename["focusin"] = "DOMFocusIn";
    X_Event_Rename["focusout"] = "DOMFocusOut";
  }
  if (window.onwebkitanimationend !== undefined && window.onanimationend === undefined) {
    console.log("animationend <= webkitAnimationEnd");
    X_Event_Rename["animationend"] = "webkitAnimationEnd";
    X_Event_Rename["animationstart"] = "webkitAnimationStart";
    X_Event_Rename["animationiteration"] = "webkitAnimationIteration";
  } else {
    if (window.onoanimationend !== undefined && window.onanimationend === undefined) {
      console.log("animationend <= oAnimationEnd");
      X_Event_Rename["animationend"] = "oAnimationEnd";
      X_Event_Rename["animationstart"] = "oAnimationStart";
      X_Event_Rename["animationiteration"] = "oAnimationIteration";
    } else {
      if (document.documentElement && document.documentElement.style.msAnimation !== undefined && document.documentElement.style.animation === undefined) {
        console.log("animationend <= MSAnimationEnd");
        X_Event_Rename["animationend"] = "MSAnimationEnd";
        X_Event_Rename["animationstart"] = "MSAnimationStart";
        X_Event_Rename["animationiteration"] = "MSAnimationIteration";
      }
    }
  }
  if (window.onwebkittransitionend !== undefined && window.ontransitionend === undefined) {
    console.log("transitionend <= webkitTransitionEnd");
    X_Event_Rename["transitionend"] = "webkitTransitionEnd";
  } else {
    if (window.onotransitionend !== undefined && window.ontransitionend === undefined) {
      if (X_UA["Opera"] < 12) {
        console.log("transitionend <= oTransitionEnd|ver." + X_UA["Opera"]);
        X_Event_Rename["transitionend"] = "oTransitionEnd";
      } else {
        console.log("transitionend <= otransitionEnd|ver." + X_UA["Opera"]);
        X_Event_Rename["transitionend"] = "otransitionEnd";
      }
    } else {
      if (window.onmoztransitionend !== undefined && window.ontransitionend === undefined) {
        console.log("transitionend <= mozTransitionEnd");
        X_Event_Rename["transitionend"] = "mozTransitionEnd";
      }
    }
  }
  if (!navigator.pointerEnabled) {
    if (navigator.msPointerEnabled) {
      console.log("pointerdown <= MSPointerDown");
      X_Event_Rename["pointerdown"] = "MSPointerDown";
      X_Event_Rename["pointerup"] = "MSPointerUp";
      X_Event_Rename["pointermove"] = ["MSPointerMove", "MSPointerHover"];
      X_Event_Rename["pointercancel"] = "MSPointerCancel";
      X_Event_Rename["pointerout"] = "MSPointerOut";
      X_Event_Rename["pointerleave"] = "MSPointerLeave";
    } else {
      if (X_UA_HID.TOUCH) {
        X_Event_Rename["pointerdown"] = ["touchstart", "mousedown"];
        X_Event_Rename["pointerup"] = ["touchend", "mouseup"];
        X_Event_Rename["pointermove"] = ["touchmove", "mousemove"];
        X_Event_Rename["pointercancel"] = "touchcancel";
        X_Event_Rename["pointerleave"] = "touchleave";
      } else {
        X_Event_Rename["pointerdown"] = "mousedown";
        X_Event_Rename["pointerup"] = "mouseup";
        X_Event_Rename["pointermove"] = "mousemove";
        X_Event_Rename["pointerleave"] = X_elmHtml.onmouseleave !== undefined ? "mouseleave" : "mouseout";
        X_UA["Prsto"] && (X_Event_Rename["contextmenu"] = "mousedown");
      }
    }
  }
  var X_Node_BoxModel = {CONTENT_BOX:1, PADDING_BOX:2, BORDER_BOX:3}, X_Node_BoxModel_defaultBoxModel, X_Node_BoxModel_boxSizingEnabled, X_Node_BoxModel_absoluteOffset;
  X_ViewPort["listenOnce"](X_EVENT_INIT, function() {
    var node = X_Node_systemNode;
    node["cssText"]("width:10px;padding:1px;border:2px solid #0;margin:4px;");
    X_Node_BoxModel_defaultBoxModel = node["width"]() === 10 ? X_Node_BoxModel.BORDER_BOX : X_Node_BoxModel.CONTENT_BOX;
    if (X_Node_BoxModel_defaultBoxModel === X_Node_BoxModel.CONTENT_BOX) {
      X_Node_BoxModel_boxSizingEnabled = node["cssText"]("width:10px;padding:1px;border:2px solid red;margin:4px;" + "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;")["width"]() === 10;
    }
    if (X_Node_CSS_Support["boxShadow"] && node["cssText"](X_Node_CSS_uncamelize(X_Node_CSS_VENDER_PREFIX["boxShadow"]) + ":10px 10px 0 0 #000;width:10px;")["width"]() !== 10) {
      console.log(node["cssText"]() + node["width"]());
      X_Node_CSS_Support["boxShadowLayoutBug"] = true;
    }
    X_Node_BoxModel_absoluteOffset = node["cssText"]("position:absolute;top:0;left:0;margin:1px;border:2px solid #000;padding:4px;")["append"]("<div></div>")["firstChild"]()["cssText"]("position:absolute;top:8px;left:8px;margin:16px;border:32px solid #666;padding:64px;")["y"]();
    node["cssText"]("")["empty"]();
  });
  function X_Node_BoxModel_mesure(that, name) {
    var flags = that["_flags"], elm;
    if (!that["_tag"] || (flags & X_NodeFlags_IN_TREE) === 0 || flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
      return 0;
    }
    X_Node_updateTimerID && X_Node_startUpdate();
    elm = that["_rawObject"] || X_Node__ie4getRawNode && X_Node__ie4getRawNode(that);
    return elm ? elm[name] : 0;
  }
  function X_Node_width() {
    return X_Node_BoxModel_mesure(this, "offsetWidth");
  }
  function X_Node_height() {
    return X_Node_BoxModel_mesure(this, "offsetHeight");
  }
  function X_Node_clientWidth() {
    return X_Node_BoxModel_mesure(this, "clientWidth");
  }
  function X_Node_clientHeight() {
    return X_Node_BoxModel_mesure(this, "clientHeight");
  }
  function X_Node_scrollWidth() {
    return X_Node_BoxModel_mesure(this, "scrollWidth");
  }
  function X_Node_scrollHeight() {
    return X_Node_BoxModel_mesure(this, "scrollHeight");
  }
  function X_Node_scrollLeft() {
    return X_Node_BoxModel_mesure(this, "scrollLeft");
  }
  function X_Node_scrollTop() {
    return X_Node_BoxModel_mesure(this, "scrollTop");
  }
  function X_Node_x() {
    return X_Node_BoxModel_mesure(this, "offsetLeft");
  }
  function X_Node_y() {
    return X_Node_BoxModel_mesure(this, "offsetTop");
  }
  function X_Node_offset() {
    var flags = this["_flags"], offset = {x:0, y:0}, obj, parent, elm;
    if ((flags & X_NodeFlags_IN_TREE) === 0 || flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
      return offset;
    }
    if (X_Node_body === this || X_Node_html === this) {
      return offset;
    }
    X_Node_updateTimerID && X_Node_startUpdate();
    elm = this["_rawObject"] || X_Node__ie4getRawNode && X_Node__ie4getRawNode(this);
    return elm ? X_Node_getPosition(elm) : offset;
  }
  var X_Node_getPosition = !(X_UA["IE"] < 5) && document.createElement("div").getBoundingClientRect ? document.compatMode === "CSS1Compat" && !X_UA["Webkit"] ? function(el) {
    var pos = el.getBoundingClientRect(), html = X_elmHtml;
    return {x:pos.left + html.scrollLeft - html.clientLeft, y:pos.top + html.scrollTop - html.clientTop};
  } : function(el) {
    var pos = el.getBoundingClientRect();
    return {x:pos.left + window.pageXOffset, y:pos.top + window.pageYOffset};
  } : X_UA["Opera"] < 10 ? function(el) {
    var ex = 0;
    var ey = 0;
    do {
      ex += el.offsetLeft;
      ey += el.offsetTop;
    } while (el = el.offsetParent);
    return {x:ex, y:ey};
  } : function(target) {
    var ex = 0;
    var ey = 0;
    var el = target;
    var bd = X_elmBody;
    do {
      ex += el.offsetLeft || 0;
      ey += el.offsetTop || 0;
    } while (el = el.offsetParent);
    el = target;
    do {
      ex -= el.scrollLeft || 0;
      ey -= el.scrollTop || 0;
      el = el.parentNode;
    } while (el != bd);
    return {x:ex, y:ey};
  };
  var X_Node_Attr_noValue = {"checked":1, "compact":1, "declare":1, "defer":1, "disabled":1, "ismap":1, "multiple":1, "nohref":1, "noresize":1, "noshade":1, "nowrap":1, "readonly":1, "selected":1}, X_Node_Attr_renameForDOM = {"class":"className", "accesskey":"accessKey", "accept-charset":"acceptCharset", "bgcolor":"bgColor", "cellpadding":"cellPadding", "cellspacing":"cellSpacing", "char":"ch", "charoff":"chOff", "codebase":"codeBase", "codetype":"codeType", "colspan":"colSpan", "datetime":"dateTime", 
  "for":"htmlFor", "frameborder":"frameBorder", "http-equiv":"httpEquiv", "ismap":"isMap", "longdesc":"longDesc", "maxlength":"maxLength", "nohref":"noHref", "readonly":"readOnly", "rowspan":"rowSpan", "tabindex":"tabIndex", "usemap":"useMap", "valuetype":"valueType", "checked":"defaultChecked"}, X_Node_Attr_HAS_VALUE = {"INPUT":true, "TEXTAREA":true, "SELECT":true, "BUTTON":true, "OBJECT":true, "PARAM":true}, X_Node_Attr_STATIC_VALUE_TYPES = {"button":true, "hidden":true, "submit":true, "reset":true, 
  "radio":true, "checkbox":true}, X_Node_Attr_toChrReferance = {"value":true, "title":true, "alt":true}, X_Node_Attr_renameForTag = {};
  function X_Node_Attr_objToAttrText(that, skipNetworkForElmCreation) {
    var obj = that["_attrs"], noValue = X_Node_Attr_noValue, attrs = [""], plain = X_EMPTY_OBJECT, n = 0, k, check;
    if (skipNetworkForElmCreation) {
      delete that["_newAttrs"];
    } else {
      that["_flags"] &= ~X_NodeFlags_OLD_ATTRTEXT;
    }
    if (!obj) {
      delete that["_attrText"];
      return "";
    }
    for (k in obj) {
      if (plain[k]) {
        continue;
      }
      if (skipNetworkForElmCreation) {
        check = false;
        switch(that["_tag"] + k) {
          case "PARAMvalue":
            check = obj["name"] !== "movie";
          case "INPUTsrc":
            check = check || obj["type"] !== "image";
          case "LINKhref":
            check = check || obj["rel"] !== "stylesheet";
            if (!check) {
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
            if (!that["_newAttrs"]) {
              that["_newAttrs"] = {};
            }
            that["_newAttrs"][k] = obj[k];
            continue;
        }
      }
      attrs[++n] = noValue[k] ? k : [k, '="', X_Node_Attr_toChrReferance[k] ? X_String_toChrReferanceForHtmlSafety(obj[k]) : obj[k], '"'].join("");
    }
    if (0 < n) {
      return that["_attrText"] = attrs.join(" ");
    }
    delete that["_attrText"];
    return "";
  }
  (function(renameForDOM, renameForTag) {
    var k;
    for (k in renameForDOM) {
      renameForTag[renameForDOM[k]] = k;
    }
  })(X_Node_Attr_renameForDOM, X_Node_Attr_renameForTag);
  function X_Node_attr(nameOrObj) {
    var attrs = this["_attrs"], newAttrs, f, k, elm, v;
    if (nameOrObj && X_Type_isObject(nameOrObj)) {
      if (!this["_tag"]) {
        return this;
      }
      attrs || (attrs = this["_attrs"] = {});
      newAttrs = this["_newAttrs"] || (this["_newAttrs"] = {});
      for (k in nameOrObj) {
        if (X_Node_Attr_setAttr(this, attrs, newAttrs, k, nameOrObj[k]) === true) {
          f = true;
        }
      }
      if (f) {
        delete this["_attrText"];
        this["_flags"] |= X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT;
        this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
      }
      return this;
    } else {
      if (1 < arguments.length) {
        if (!this["_tag"]) {
          return this;
        }
        if (X_Node_Attr_setAttr(this, attrs || (this["_attrs"] = {}), this["_newAttrs"] || (this["_newAttrs"] = {}), nameOrObj, arguments[1]) === true) {
          delete this["_attrText"];
          this["_flags"] |= X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT;
          this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        }
        return this;
      } else {
        if (X_Type_isString(nameOrObj)) {
          if (!this["_tag"]) {
            return;
          }
          switch(nameOrObj) {
            case "id":
              return this["_id"];
            case "class":
            case "className":
              return this["_className"];
            case "tag":
            case "tagName":
              return this["_tag"];
            case "style":
            case "cssText":
              return this["cssText"]();
            case "src":
              if (this["_tag"] !== "IFRAME") {
                break;
              }
              if (this["_newAttrs"] && X_Object_inObject(nameOrObj, this["_newAttrs"])) {
                return this["_newAttrs"][nameOrObj];
              }
              if (elm = X_UA_DOM.IE4 ? this["_rawObject"] || X_Node__ie4getRawNode(this) : this["_rawObject"]) {
                if (!attrs) {
                  attrs = this["_attrs"] = {};
                }
                return attrs[nameOrObj] = elm[nameOrObj];
              }
              break;
            case "selected":
              if (X_UA["WebKit"] && (elm = this["_rawObject"])) {
                elm.parentNode && elm.selectedIndex;
              }
            case "value":
              if (this["_tag"] === "INPUT" && X_Node_Attr_STATIC_VALUE_TYPES[attrs["type"]]) {
                break;
              }
            case "checked":
            case "disabled":
            case "selectedIndex":
              if (X_Node_Attr_HAS_VALUE[this["_tag"]]) {
                if (this["_newAttrs"] && X_Object_inObject(nameOrObj, this["_newAttrs"])) {
                  return this["_newAttrs"][nameOrObj];
                }
                if (elm = X_UA_DOM.IE4 ? this["_rawObject"] || X_Node__ie4getRawNode(this) : this["_rawObject"]) {
                  if (!attrs) {
                    attrs = this["_attrs"] = {};
                  }
                  if (this["_tag"] === "TEXTAREA" && nameOrObj === "value" && X_UA["IE"] < 9) {
                    return attrs[nameOrObj] = X_Node_Attr_getValueForIE(elm);
                  }
                  return attrs[nameOrObj] = elm[nameOrObj];
                }
              }
              break;
          }
          return attrs && attrs[X_Node_Attr_renameForTag[nameOrObj] || nameOrObj];
        }
      }
    }
  }
  function X_Node_Attr_getValueForIE(elm) {
    return elm.value.split("\r").join("");
  }
  function X_Node_Attr_setAttr(that, attrs, newAttrs, name, v) {
    switch(name) {
      case "ns":
      case "NS":
        if (v === "svg" || v === "SVG") {
          that["_flags"] |= X_NodeFlags_IS_SVG;
        }
        if (v === "vml" || v === "VML") {
          that["_flags"] |= X_NodeFlags_IS_VML;
        }
        return;
      case "UID":
      case "tag":
      case "tagName":
        return;
      case "id":
        v = v !== "ie4uid" + that["_uid"] ? v : undefined;
        if (v !== that["_id"]) {
          that["_id"] = v;
          that["_flags"] |= X_NodeFlags_DIRTY_ID;
          that["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        }
        return;
      case "class":
      case "className":
        return that["className"](v);
      case "style":
      case "cssText":
        return that["cssText"](v);
      case "text":
        return that["text"](v);
      case "html":
        return that["html"](v);
    }
    if (name.indexOf("on") === 0) {
      X.Logger.warn('xnode.attr("' + name + '") is wrong, xnode.listen() & xnode.unlisten().');
      return;
    }
    name = X_Node_Attr_renameForTag[name] || name;
    if (attrs[name] === v) {
      return;
    }
    if (v == null) {
      newAttrs[name] = undefined;
      if (X_Object_inObject(name, attrs)) {
        delete attrs[name];
      }
    } else {
      newAttrs[name] = attrs[name] = v;
    }
    return true;
  }
  function X_Node_CSS_camelize(cssProp) {
    var parts, l, i, parts0, camelized;
    if (camelized = X_Node_CSS__DICTIONARY_CAMELIZE[cssProp]) {
      return camelized;
    }
    parts = cssProp.split(" ").join("").split("-");
    parts0 = parts[0];
    l = parts.length;
    if (l === 1) {
      return parts0;
    }
    camelized = cssProp.charAt(0) === "-" ? parts0.charAt(0).toUpperCase() + parts0.substring(1) : parts0;
    for (i = 1; i < l; ++i) {
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
    }
    return X_Node_CSS__DICTIONARY_CAMELIZE[cssProp] = camelized;
  }
  function X_Node_CSS_uncamelize(str) {
    var A = X_Node_CSS_CHAR_CODE_A, Z = A + 25, uncamelized, l, chr, code, i;
    str = str.split(" ").join("");
    if (uncamelized = X_Node_CSS__DICTIONARY_UNCAMELIZE[str]) {
      return uncamelized;
    }
    uncamelized = "";
    for (i = 0, l = str.length; i < l; ++i) {
      chr = str.charAt(i);
      code = chr.charCodeAt(0);
      uncamelized += A <= code && code <= Z ? "-" + chr : chr;
    }
    return X_Node_CSS__DICTIONARY_UNCAMELIZE[str] = uncamelized.toLowerCase();
  }
  var X_Node_CSS_getComputedStyle = window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle, X_Node_CSS__DICTIONARY_CAMELIZE = {}, X_Node_CSS_CHAR_CODE_A = "A".charCodeAt(0), X_Node_CSS__DICTIONARY_UNCAMELIZE = {}, X_Node_CSS_VENDER_PREFIX = {}, X_Node_CSS__CLIP_SEPARATOR = X_UA["IE"] < 8 ? " " : ",", X_Node_CSS__UNIT_RATIO = {}, X_Node_CSS__FONT_SIZE_RATIO = {}, X_Node_CSS_COLOR = {"BLACK":0, "RED":16711680, "LIME":65280, "BLUE":255, "YELLOW":16776960, "AQUA":65535, 
  "CYAN":65535, "MAGENTA":16711935, "FUCHSIA":16711935, "WHITE":16777215, "GREEN":32768, "PURPLE":8388736, "MAROON":8388608, "NAVY":128, "OLIVE":8421376, "TEAL":32896, "GRAY":8421504, "SILVER":12632256, "DIMGRAY":6908265, "SLATEGRAY":7372944, "DARKGRAY":11119017, "GAINSBORO":14474460, "MIDNIGHTBLUE":1644912, "SLATEBLUE":6970061, "MEDIUMBLUE":205, "ROYALBLUE":4286945, "DODGERBLUE":2003199, "SKYBLUE":8900331, "STEELBLUE":4620980, "LIGHTBLUE":11393254, "PALETURQUOISE":11529966, "TURQUOISE":4251856, 
  "LIGHTCYAN":14745599, "AQUAMARINE":8388564, "DARKGREEN":25600, "SEAGREEN":3050327, "LIGHTGREEN":9498256, "CHARTREUSE":8388352, "GREENYELLOW":11403055, "LIMEGREEN":3329330, "YELLOWGREEN":10145074, "OLIVEDRAB":7048739, "DARKKHAKI":12367723, "PALEGOLDENROD":15657130, "LIGHTYELLOW":16777184, "GOLD":16766720, "GOLDENROD":14329120, "DARKGOLDENROD":12092939, "ROSYBROWN":12357519, "INDIANRED":13458524, "SADDLEBROWN":9127187, "SIENNA":10506797, "PERU":13468991, "BURLYWOOD":14596231, "BEIGE":16119260, "WHEAT":16113331, 
  "SANDYBROWN":16032864, "TAN":13808780, "CHOCOLATE":13789470, "FIREBRICK":11674146, "BROWN":10824234, "SALMON":16416882, "ORANGE":16753920, "CORAL":16744272, "TOMATO":16737095, "HOTPINK":16738740, "PINK":16761035, "DEEPPINK":16716947, "PALEVIOLETRED":14381203, "VIOLET":15631086, "PLUM":14524637, "ORCHILD":14315734, "DARKVIOLET":9699539, "BLUEVIOLET":9055202, "MEDIUMPURPLE":9662683, "THISTLE":14204888, "LAVENDER":15132410, "MISTYROSE":16770273, "IVORY":16777200, "LEMONCHIFFON":16775885};
  function X_Node_CSS_parseColor(x) {
    var rgb, r, g, b;
    if (X_Type_isNumber(x)) {
      return 0 <= x && x <= 16777215 ? x : NaN;
    } else {
      if (!X_Type_isString(x)) {
        return;
      }
    }
    if (X_Type_isNumber(rgb = X_Node_CSS_COLOR[x.toUpperCase()]) && 0 <= rgb && rgb <= 16777215) {
      return rgb;
    } else {
      if (x.charAt(0) === "#") {
        switch(x.length) {
          case 7:
            r = parseInt(x.substr(1, 2), 16);
            g = parseInt(x.substr(3, 2), 16);
            b = parseInt(x.substr(5, 2), 16);
            break;
          case 4:
            r = parseInt(x.charAt(1) + x.charAt(1), 16);
            g = parseInt(x.charAt(2) + x.charAt(2), 16);
            b = parseInt(x.charAt(3) + x.charAt(3), 16);
            break;
          case 2:
            r = g = b = parseInt(x.charAt(1) + x.charAt(1), 16);
            break;
          default:
            return;
        }
      } else {
        if (x.indexOf("rgb(") === 0) {
          rgb = x.substr(4).split(",");
          r = parseFloat(rgb[0]);
          g = parseFloat(rgb[1]);
          b = parseFloat(rgb[2]);
          if (x.indexOf("%") !== -1) {
            r *= 2.55;
            g *= 2.55;
            b *= 2.55;
          }
        } else {
          if (x.indexOf("rgba(") === 0) {
            rgb = x.substr(5).split(",");
            r = parseFloat(rgb[0]);
            g = parseFloat(rgb[1]);
            b = parseFloat(rgb[2]);
            if (x.indexOf("%") !== -1) {
              r *= 2.55;
              g *= 2.55;
              b *= 2.55;
            }
          } else {
            return NaN;
          }
        }
      }
    }
    return X_Type_isFinite(r + b + g) ? (r << 16) + (g << 8) + b : NaN;
  }
  function X_Node_CSS_objToCssText(that, skipFilter) {
    var obj = that["_css"], css = [], n = -1, p, v, specialFix, filterFix;
    that["_flags"] &= ~X_NodeFlags_OLD_CSSTEXT;
    if (!obj) {
      delete that["_cssText"];
      return "";
    }
    for (p in obj) {
      v = obj[p];
      p = X_Node_CSS_uncamelize(X_Node_CSS_VENDER_PREFIX[p] || p);
      if (specialFix = X_Node_CSS_SPECIAL_FIX_PROP[p]) {
        css[++n] = p + ":" + specialFix(v);
      } else {
        if (X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[p]) {
          (filterFix || (filterFix = {}))[p] = v;
        } else {
          css[++n] = p + ":" + v;
        }
      }
    }
    if (filterFix) {
      v = X_Node_CSS_objToIEFilterText(that, filterFix, css);
      n = css.length;
      if (v) {
        css[++n] = "filter:" + v;
      }
      skipFilter = skipFilter && v;
    } else {
      skipFilter = false;
    }
    if (0 <= n) {
      that["_cssText"] = css.join(";");
      if (skipFilter) {
        --css.length;
        return css.join(";");
      }
      return that["_cssText"];
    }
    delete that["_cssText"];
    return "";
  }
  var X_Node_CSS_FILTER_FIX_PROPS = X_UA["ActiveX"] && X_UA["IE"] < 9 ? {"opacity":2, "boxShadow":3, "textShadow":4, "transform":5, "dxtransform":7} : X_UA["ActiveX"] && (9 <= X_UA["IE"] && X_UA["IE"] < 10) ? {"textShadow":4} : null;
  function X_Node_CSS_objToIEFilterText(that, opt_css, opt_cssList) {
    var obj = opt_css || that["_css"], test = X_Node_CSS_FILTER_FIX_PROPS, filters = [], n = -1, p, id, v, num, vu, u, _v, ary, params, i, l, dir, afterUpdate, impossible, color;
    for (p in obj) {
      if (!(id = test[p])) {
        continue;
      }
      v = obj[p];
      switch(id) {
        case 1:
          filters[++n] = v;
          break;
        case 2:
          if (v === 0) {
            console.log("@opacity:0 " + !!opt_cssList);
            opt_cssList && (opt_cssList[opt_cssList.length] = "visibility:hidden");
          } else {
            if (v < 1) {
              filters[++n] = "alpha(opacity=" + (v * 100 | 0) + ")";
            }
          }
          break;
        case 3:
          ary = v.split(" ");
          params = [0, 0, 0, 0];
          for (i = 0, l = ary.length; i < l; ++i) {
            v = ary[i];
            num = i < 4 && parseFloat(v);
            if (num === num) {
              vu = X_Node_CSS__splitValueAndUnit(v);
              v = vu[0];
              u = vu[1];
              if (v) {
                if (_v = X_Node_CSS__UNIT_RATIO[u]) {
                  params[i] = v / _v;
                } else {
                  switch(u) {
                    case "px":
                      params[i] = v;
                      break;
                    case "em":
                      if (X_Node_updateTimerID) {
                        afterUpdate = true;
                      } else {
                        params[i] = X_Node_CSS_getCharSize(that) * v;
                      }
                    default:
                      params[i] = 0;
                      break;
                  }
                }
              } else {
                params[i] = 0;
              }
            } else {
              if (v.charAt(0) === "#" || v.indexOf("rgb") === 0 || X_Node_CSS_COLOR[v.toUpperCase()]) {
                v = X_Node_CSS_parseColor(v);
                if (0 <= v && v < 1048576) {
                  color = "00000" + v.toString(16);
                  color = "#" + color.substr(color.length - 6);
                } else {
                  if (v) {
                    color = "#" + v.toString(16);
                  }
                }
              } else {
                if (v === "inset") {
                  impossible = true;
                } else {
                }
              }
            }
          }
          if (impossible || !color) {
            break;
          }
          if (afterUpdate) {
            X_ViewPort["listenOnce"](X_EVENT_AFTER_UPDATE, that, X_Node_CSS_onAfterUpdateForIEFilterFix);
            break;
          }
          dir = X_Node_CSS_ieMathRangeFix(Math.atan2(params[1] + params[3], params[0] + params[3]) * 180 / Math.PI + 90);
          filters[++n] = "shadow(color=" + color + ",strength=" + params[3] + ",direction=" + (dir | 0) + ")";
          break;
        case 4:
          break;
        case 6:
          break;
        case 5:
          break;
        case 7:
          that["_flags"] |= X_NodeFlags_IE_FILTER_FIX_AFTER;
          break;
      }
    }
    return filters.join(" ");
  }
  function X_Node_CSS_ieMathRangeFix(a) {
    a %= 360;
    return a < 0 ? 360 + a : a;
  }
  function X_Node_CSS_IETransform(elm, params) {
    var PI_180 = Math.PI / 180, rotate = X_Node_CSS_ieMathRangeFix(params[2]), radian = rotate * PI_180, cosX = Math.cos(radian), sinY = Math.sin(radian), skewX = X_Node_CSS_ieMathRangeFix(params[3]), skewY = X_Node_CSS_ieMathRangeFix(params[4]), _skX = Math.tan(skewX * PI_180), _skY = Math.tan(skewY * PI_180), scaleX = params[5], scaleY = params[6], m11 = cosX * scaleX, m12 = (-sinY + _skX) * scaleX, m21 = (sinY + _skY) * scaleY, m22 = cosX * scaleY, ow = elm.offsetWidth, oh = elm.offsetHeight, 
    absCosX = Math.abs(cosX), absSinY = Math.abs(sinY), dx = (ow - (ow * absCosX + oh * absSinY)) / 2 - ow / 2 * _skX - ((ow * scaleX - ow) / 2 | 0) + params[0], dy = (oh - (ow * absSinY + oh * absCosX)) / 2 - oh / 2 * _skY - ((oh * scaleY - oh) / 2 | 0) + params[1];
    elm.style[params[7]] = dx + "px";
    elm.style[params[8]] = dy + "px";
    return "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ',FilterType="bilinear",sizingMethod="auto expand")';
  }
  function X_Node_CSS_onAfterUpdateIEFilterFix(that) {
    var PI_180 = Math.PI / 180, test = X_Node_CSS_FILTER_FIX_PROPS, css = that["_css"], elm = that["_rawObject"], filter = elm.style.filter || "", origin = filter, p, v, plus, id;
    for (p in css) {
      if (!(id = test[p])) {
        continue;
      }
      plus = 0;
      switch(id) {
        case 7:
          plus = X_Node_CSS_IETransform(elm, css[p]);
          break;
        default:
          continue;
      }
      if (plus) {
        filter += (filter ? " " : "") + plus;
      }
    }
    if (filter !== origin) {
      elm.style.filter = filter;
    }
  }
  function X_Node_CSS_onAfterUpdateForIEFilterFix() {
    if (this["_flags"] & X_NodeFlags_IN_TREE) {
      this["_flags"] |= X_NodeFlags_DIRTY_IE_FILTER;
      X_Node_reserveUpdate();
    }
  }
  var X_Node_CSS_UNIT = {"px":0, "em":1, "cm":2, "mm":3, "in":4, "%":5, "pct":5, "ms":6, "s":7, "#":8, "rgb":9, "rgba":10};
  function X_Node_CSS__splitValueAndUnit(v) {
    var num, _num, u;
    if (X_Type_isNumber(v)) {
      return [v || 0, ""];
    }
    num = parseFloat(v);
    if (num !== num) {
      return [0, ""];
    }
    _num = "" + num;
    if (0 < num && num < 1 && v.charAt(0) === ".") {
      _num = _num.slice(1);
    }
    if (-1 < num && num < 0 && v.charAt(1) === ".") {
      _num = "-." + _num.substr(2);
    }
    u = v.substr(v.indexOf(_num) + _num.length);
    return [num, X_Node_CSS_UNIT[u] ? u : "px"];
  }
  function X_Node_css(nameOrObj) {
    var args = arguments, css = this["_css"], bad = !this["_tag"] || X_Dom_DTD_MOVE_TO_HEAD[this["_tag"]] || this["_tag"] === "SCRIPT", p, name, v, plain, camelize, flags;
    if (X_Type_isObject(nameOrObj)) {
      if (bad) {
        return this;
      }
      if (!css) {
        css = this["_css"] = {};
      }
      camelize = X_Node_CSS_camelize;
      flags = this["_flags"];
      for (p in nameOrObj) {
        name = camelize(p);
        v = nameOrObj[p];
        if (css[name] === v) {
          continue;
        }
        flags = X_Node_CSS_setStyle(css, flags, name, v);
      }
      flags |= X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
      this["_flags"] = flags;
      flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
      delete this["_cssText"];
      return this;
    } else {
      if (1 < args.length) {
        if (bad) {
          return this;
        }
        if (!css) {
          css = this["_css"] = {};
        }
        name = X_Node_CSS_camelize(nameOrObj);
        v = args[1];
        if (css[name] === v) {
          return this;
        }
        this["_flags"] = X_Node_CSS_setStyle(css, this["_flags"], name, v) | X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
        this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        delete this["_cssText"];
        return this;
      }
    }
    if (!css || bad) {
      return;
    }
    return css[X_Node_CSS_camelize(nameOrObj)];
  }
  function X_Node_CSS_setStyle(css, flags, name, newValue) {
    if (X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[name]) {
      flags |= X_NodeFlags_DIRTY_IE_FILTER;
    }
    if (!newValue && newValue !== 0) {
      delete css[name];
    } else {
      css[name] = newValue;
    }
    switch(name) {
      case "display":
        console.log(newValue);
        newValue === "none" ? flags |= X_NodeFlags_STYLE_IS_DISPLAY_NONE : flags &= ~X_NodeFlags_STYLE_IS_DISPLAY_NONE;
        return flags;
      case "visibility":
        if (flags & X_NodeFlags_STYLE_IS_INVISIBLE && css["opacity"] == 0) {
          return flags;
        }
        newValue === "hidden" ? flags |= X_NodeFlags_STYLE_IS_INVISIBLE : flags &= ~X_NodeFlags_STYLE_IS_INVISIBLE;
        return flags;
      case "opacity":
        flags |= X_NodeFlags_IE8_OPACITY_FIX;
        if (flags & X_NodeFlags_STYLE_IS_INVISIBLE && css["visibility"] === "hidden") {
          return flags;
        }
        newValue == 0 ? flags |= X_NodeFlags_STYLE_IS_INVISIBLE : flags &= ~X_NodeFlags_STYLE_IS_INVISIBLE;
        return flags;
      case "overflow":
        newValue === "hidden" ? flags |= X_NodeFlags_STYLE_IS_NO_OVERFLOW : flags &= ~X_NodeFlags_STYLE_IS_NO_OVERFLOW;
        return flags;
      case "position":
        newValue === "absolute" ? flags |= X_NodeFlags_STYLE_IS_POS_ABSOLUTE : flags &= ~X_NodeFlags_STYLE_IS_POS_ABSOLUTE;
        return flags;
      case "width":
        newValue = X_Node_CSS__splitValueAndUnit(newValue);
        if (newValue[1] !== "%") {
          flags |= X_NodeFlags_STYLE_IS_WIDTH_LENGTH;
          flags &= ~X_NodeFlags_STYLE_IS_WIDTH_PCT;
        } else {
          flags &= ~X_NodeFlags_STYLE_IS_WIDTH_LENGTH;
          flags |= X_NodeFlags_STYLE_IS_WIDTH_PCT;
        }
        return flags;
      case "height":
        newValue = X_Node_CSS__splitValueAndUnit(newValue);
        if (newValue[1] !== "%") {
          flags |= X_NodeFlags_STYLE_IS_HEIGHT_LENGTH;
          flags &= ~X_NodeFlags_STYLE_IS_HEIGHT_PCT;
        } else {
          flags &= ~X_NodeFlags_STYLE_IS_HEIGHT_LENGTH;
          flags |= X_NodeFlags_STYLE_IS_HEIGHT_PCT;
        }
        return flags;
      case "fontSize":
    }
    return flags;
  }
  function X_Node_cssText(v) {
    var obj, i, l, attr, name;
    if (v === this["_cssText"] && (this["_flags"] & X_NodeFlags_OLD_CSSTEXT) === 0) {
      return this;
    }
    if (v === "") {
      delete this["_css"];
      delete this["_cssText"];
      this["_flags"] |= X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER;
      this["_flags"] &= ~X_NodeFlags_OLD_CSSTEXT;
      this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
      return this;
    } else {
      if (X_Type_isString(v)) {
        delete this["_css"];
        obj = {};
        v = v.split(";");
        for (i = 0, l = v.length; i < l; ++i) {
          attr = v[i].split(":");
          (name = attr[0]) && (obj[name] = attr[1] || true);
        }
        return this["css"](obj);
      }
    }
    this["_flags"] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(this);
    return this["_cssText"];
  }
  var X_Node_CSS_getCharSize = X_Node_CSS_getComputedStyle ? function(that) {
    X_Node_updateTimerID && X_Node_startUpdate();
    if (that === X_Node_body && X_ViewPort_baseFontSize) {
      return X_ViewPort_baseFontSize;
    }
    if (that["_fontSize"]) {
      return that["_fontSize"];
    }
    return that["_fontSize"] = that["_rawObject"] ? parseFloat(X_Node_CSS_getComputedStyle(that["_rawObject"], null).fontSize) : 0;
  } : 5 <= X_UA["IE"] ? function(that) {
    var font, vu, v, u, _v;
    X_Node_updateTimerID && X_Node_startUpdate();
    if (that === X_Node_body && X_ViewPort_baseFontSize) {
      return X_ViewPort_baseFontSize;
    }
    if (that["_fontSize"]) {
      return that["_fontSize"];
    }
    font = that["_rawObject"].currentStyle.fontSize;
    vu = X_Node_CSS__splitValueAndUnit(font);
    v = vu[0];
    u = vu[1];
    if (v === 0) {
      if (v = X_Node_CSS__FONT_SIZE_RATIO[font]) {
        return that["_fontSize"] = v;
      }
    } else {
      if (_v = X_Node_CSS__UNIT_RATIO[u]) {
        return that["_fontSize"] = v / _v;
      }
    }
    switch(u) {
      case "px":
        return that["_fontSize"] = v;
      case "em":
        if (that.parent) {
          return that["_fontSize"] = X_Node_CSS_getCharSize(that.parent) * v;
        }
        break;
      case "%":
        if (that.parent) {
          return that["_fontSize"] = X_Node_CSS_getCharSize(that.parent) * v / 100;
        }
    }
    return 0;
  } : X_UA_DOM.W3C ? function(that) {
    var elm, v;
    X_Node_updateTimerID && X_Node_startUpdate();
    if (that === X_Node_body && X_ViewPort_baseFontSize) {
      return X_ViewPort_baseFontSize;
    }
    if (that["_fontSize"]) {
      return that["_fontSize"];
    }
    that["_rawObject"].appendChild(elm = document.createElement("span"));
    elm.style.cssText = "display:block;position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;";
    elm.innerHTML = "X";
    v = elm.offsetHeight;
    that["_rawObject"].removeChild(elm);
    return that["_fontSize"] = v;
  } : X_UA_DOM.IE4 ? function(that) {
    var font, vu, v, u, _v, elm;
    X_Node_updateTimerID && X_Node_startUpdate();
    if (that === X_Node_body && X_ViewPort_baseFontSize) {
      return X_ViewPort_baseFontSize;
    }
    if (that["_fontSize"]) {
      return that["_fontSize"];
    }
    if (that["_css"] && (font = that["_css"].fontSize)) {
      vu = X_Node_CSS__splitValueAndUnit(font);
      v = vu[0];
      u = vu[1];
      if (v === 0) {
        if (_v = X_Node_CSS__FONT_SIZE_RATIO[font]) {
          return that["_fontSize"] = _v;
        }
      } else {
        if (_v = X_Node_CSS__UNIT_RATIO[u]) {
          return that["_fontSize"] = v / _v;
        }
      }
    } else {
      (that["_rawObject"] || X_Node__ie4getRawNode(that)).insertAdjacentHTML("BeforeEnd", '<div id="ie4charsize" style="position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;">X</div>');
      elm = document.all["ie4charsize"];
      v = elm.offsetHeight;
      elm.removeAttribute("id");
      elm.outerHTML = "";
      return that["_fontSize"] = v;
    }
    switch(u) {
      case "px":
        return that["_fontSize"] = v;
      case "em":
        if (that.parent) {
          return that["_fontSize"] = X_Node_CSS_getCharSize(that.parent) * v;
        }
        break;
      case "%":
        if (that.parent) {
          return that["_fontSize"] = X_Node_CSS_getCharSize(that.parent) * v / 100;
        }
    }
    return 0;
  } : 0;
  var X_Node_CSS_Support = {}, X_Node_CSS_SPECIAL_FIX_PROP = {"transitionDuration":X_UA["Android"] && !X_UA["Chrome"] && function(v) {
    return parseFloat(v) === 0 ? "0.001s" : v;
  }};
  X["CSS"] = {"VENDER_PREFIX":X_Node_CSS_VENDER_PREFIX, "Support":X_Node_CSS_Support};
  (function() {
    var testStyle = X_UA["IE"] < 5 ? {} : document.createElement("div").style, temp = testStyle.cssText, vendors = "webkit,Webkit,Moz,moz,Ms,ms,O,o,khtml,Khtml".split(","), searches = ("opacity,boxSizing,boxShadow," + "transform,transformOrigin,perspective," + "transisiton,transitionDelay,transitionProperty,transitionDuration,transitionTimingFunction,backfaceVisibility,willChange,filter," + "userSelect,touchSelect,touchAction,touchCallout,contentZooming,userDrag,tapHighlightColor").split(","), vendor, 
    i, search, prop, j, v;
    for (i = searches.length; i;) {
      search = prop = searches[--i];
      if (testStyle[prop] === undefined) {
        prop = prop.charAt(0).toUpperCase() + prop.substr(1);
        for (j = vendors.length; j;) {
          v = vendors[--j];
          if (testStyle[v + prop] !== undefined) {
            if (v === "ms") {
              v = "Ms";
            }
            if (v === "o") {
              v = "O";
            }
            X_Node_CSS_VENDER_PREFIX[search] = v + prop;
            break;
          }
        }
      } else {
        X_Node_CSS_VENDER_PREFIX[search] = prop;
      }
    }
    testStyle.cssText = "background:rgba(0,0,0,0.5);border-color:transparent";
    X_Node_CSS_Support["rgba"] = !!testStyle["background"];
    X_Node_CSS_Support["transparent"] = !!testStyle["borderColor"];
    if (prop = X_Node_CSS_VENDER_PREFIX["boxShadow"]) {
      testStyle.cssText = X_Node_CSS_uncamelize(prop) + ":0 0";
      X_Node_CSS_Support["boxShadow"] = !!testStyle[prop];
      testStyle.cssText = X_Node_CSS_uncamelize(prop) + ":0 0, 0 0";
      X_Node_CSS_Support["boxShadowMulti"] = !!testStyle[prop];
      testStyle.cssText = X_Node_CSS_uncamelize(prop) + ":0 0 inset";
      X_Node_CSS_Support["boxShadowInset"] = testStyle[prop] && testStyle[prop].indexOf("inset") !== -1;
    }
    testStyle.cssText = temp;
  })();
  X_ViewPort["listenOnce"](X_EVENT_INIT, function() {
    var xnode = X_Node_systemNode, output = X_Node_CSS__UNIT_RATIO, list = "cm,mm,in,pt,pc".split(","), unit, size, base, i;
    for (i = list.length; i;) {
      unit = list[--i];
      output[unit] = xnode["css"]("width", 10 + unit)["width"]() / 10;
    }
    output = X_Node_CSS__FONT_SIZE_RATIO, list = "xx-large,x-large,large,larger,medium,small,smaller,x-small,xx-small".split(",");
    xnode["css"]({lineHeight:"100%", height:"1em"})["text"]("X");
    for (i = list.length; i;) {
      size = list[--i];
      output[size] = xnode["css"]("fontSize", size)["height"]();
    }
    xnode["cssText"]("")["empty"]();
  });
  function X_NodeList(v) {
    var args = [], l = arguments.length, i = 0, xnode, j, n = 0, skip;
    for (; i < l; ++i) {
      args.push.apply(args, arguments[i]);
    }
    if ((l = args.length) === 1) {
      return new Node(args[0]);
    }
    if (!this || this["append"] !== X_NodeList.prototype["append"]) {
      return new X_NodeList(args);
    }
    for (i = 0; i < l; ++i) {
      xnode = args[i];
      skip = false;
      for (j = 0; j < n; ++j) {
        if (this[j] === xnode) {
          skip = true;
          break;
        }
      }
      if (!skip) {
        this[n] = xnode;
        n = ++this.length;
      }
    }
  }
  X_NodeList.prototype.length = 0;
  X_NodeList.prototype["each"] = function(func) {
    var l = this.length, i = 0, args;
    if (1 < arguments.length) {
      args = X_Array_copy(arguments);
      for (; i < l; ++i) {
        args[0] = i;
        if (func.apply(this[i], args) === false) {
          break;
        }
      }
    } else {
      for (; i < l; ++i) {
        if (func.call(this[i], i) === false) {
          break;
        }
      }
    }
    return this;
  };
  X_TEMP.onSystemReady.push(function(sys) {
    var target = X_NodeList.prototype, src = Node.prototype, p, v;
    for (p in src) {
      v = src[p];
      if (X_Type_isFunction(v) && !target[p]) {
        target[p] = new Function(["var a=arguments,f=X.Node.prototype.", p, ",t=this,i,l=t.length;", "if(l)", "for(i=0;i<l;++i)", "if(i===l-1)return f.apply(t[i],a);", "else f.apply(t[i],a);", "return f.apply(t,a)"].join(""));
      }
    }
  });
  var X_Node_Selector__PSEUDO = {"nth-child":9, "nth-last-child":14, "nth-of-type":11, "nth-last-of-type":16, "root":4, "link":4, "lang":4, "empty":5, "target":6, "invalid":7, "enabled":7, "checked":7, "disabled":8, "contains":8, "last-child":10, "only-child":10, "first-child":11, "last-of-type":12, "only-of-type":12, "first-of-type":13}, X_Node_Selector__COMBINATOR = {"":0, " ":1, ">":2, "+":3, "~":4, ",":5, "@":6}, X_Node_Selector__SELECTOR = {"":0, "tag":1, "#":2, ".":3, ":":4, "[":5, "not":6, 
  "scope":7, "root":8, "link":9}, X_Node_Selector__OPERATORS = {"==":1, "!=":2, "~=":3, "^=":4, "$=":5, "*=":6, "|=":7}, X_Node_Selector__ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789\\", X_Node_Selector__NUMBER = "+-0123456789";
  function X_Node_Selector__parse(query, last) {
    var COMBINATOR = X_Node_Selector__COMBINATOR, SELECTOR = X_Node_Selector__SELECTOR, OPERATORS = X_Node_Selector__OPERATORS, ALPHABET = X_Node_Selector__ALPHABET, NUMBER = X_Node_Selector__NUMBER, result = [], i = -1, l = query.length, phase = 0, combinator = 0, selector = 0, chr, chrCode, nameChr, name1st, tmp, escape, quot, start, name, key, value, operator, a, b, not;
    query += " ";
    while (i < l) {
      chr = query.charAt(++i);
      chrCode = ALPHABET.indexOf(chr);
      nameChr = chrCode !== -1;
      name1st = nameChr && chrCode < 52;
      switch(phase) {
        case 0:
          name1st ? (selector = 1) && (phase = 2) && (start = i) : !not && (tmp = COMBINATOR[chr]) ? 1 < tmp && 1 < combinator ? phase = 15 : (phase = tmp === 5 ? 14 : 0) & ((1 < tmp || combinator < 1) && (combinator = tmp)) & (tmp === 5 && ++i) : (tmp = SELECTOR[chr]) ? (selector = tmp) && (phase = selector === 5 ? 4 : 1) : chr === "*" ? (selector = 1) && (name = chr) && (phase = 14) && ++i : chr !== " " && (phase = 15);
          break;
        case 1:
          name1st ? (start = i) && (phase = 2) : chr !== " " && (phase = 15);
          break;
        case 2:
          !nameChr && !(escape && (selector === 2 || selector === 3) && (chr === ":" || chr === ".")) ? (name = query.substring(start, i)) && (phase = selector === 4 && name !== "not" && chr === "(" ? name !== "lang" && name !== "contains" ? 8 : 11 : 14) : SELECTOR[chr] < 4 && (phase = 14);
          break;
        case 3:
          break;
        case 4:
          name1st ? (phase = 5) && (start = i) : chr !== " " && (phase = 15);
          break;
        case 5:
          chr === "=" ? (operator = 1) && (phase = 6) && (key || (key = query.substring(start, i))) && (start = i + 1) : chr === "]" ? !(operator = 0) && (phase = 14) && (key || (key = query.substring(start, i))) && ++i : chr === " " ? key || (key = query.substring(start, i)) : (operator = OPERATORS[query.substr(i, 2)]) ? (phase = 6) && (key || (key = query.substring(start, i))) && (start = ++i) : !nameChr && (phase = 15);
          break;
        case 6:
          (chr === '"' || chr === "'") && !escape && !quot ? (quot = chr) && (start = i + 1) && (phase = 7) : chr !== " " && (start = i) && (phase = 7);
          break;
        case 7:
          chr === quot ? !escape && !value && (value = query.substring(start, i)) : chr === "]" ? (value || (value = query.substring(start, i))) && (phase = 14) && ++i : chr === " " && !quot && !value && (value = query.substring(start, i));
          break;
        case 8:
          NUMBER.indexOf(chr) !== -1 ? (start = i) && (phase = 9) : chr === "n" ? (phase = 10) && (a = 1) && (start = i + 1) : query.substr(i, 4) === "even" ? (a = 2) && !(b = 0) && (i += 3) : query.substr(i, 3) === "odd" ? (a = 2) && (b = 1) && (i += 2) : chr === ")" && (phase = a ? 14 : 15) && ++i;
          break;
        case 9:
          tmp = query.substring(start, i);
          chr === "n" ? (phase = 10) && (start = i + 1) && (a = tmp === "+" ? 1 : tmp === "-" ? -1 : parseFloat(tmp)) : chr === ")" && (phase = 14) && ++i && (b = parseFloat(tmp)) && (a = 0);
          break;
        case 10:
          chr === ")" && (phase = 14) && ++i && (b = parseFloat(query.substring(start, i)) || 0);
          break;
        case 11:
          (chr === '"' || chr === "'") && !escape && !quot && (quot = chr) && (start = i + 1) && (phase = 12);
          break;
        case 12:
          chr === quot && !escape && (value = query.substring(start, i)) && (phase = 13);
          break;
        case 13:
          chr === ")" && (phase = 14) && ++i;
          break;
        default:
      }
      if (phase === 15) {
        return i;
      }
      if (phase === 14) {
        if (selector === 4) {
          if (name === "not") {
            if (not) {
              return i;
            } else {
              not = true;
              selector = 0;
              phase = 0;
              name = null;
            }
          } else {
            if (name === "lang" || name === "contains") {
              result = [not ? 0 : combinator, selector, name, value];
              break;
            } else {
              if (a !== a || b !== b) {
                return i;
              }
              result = [not ? 0 : combinator, SELECTOR[name] || selector, name, a, b];
              break;
            }
          }
        } else {
          result = combinator === 5 ? 5 : selector === 5 ? [not ? 0 : combinator, selector, key, operator, value] : [not ? 0 : combinator, selector, name.split("\\").join("")];
          break;
        }
      }
      escape = chr === "\\" && !escape;
    }
    if (not && (tmp = query.substr(i).indexOf(")")) === -1) {
      return i;
    }
    return not ? [i + tmp + 1, [combinator, 6, result]] : [i, result];
  }
  X["Doc"]["find"] = X_shortcutFunction = X_NodeList.prototype["find"] = X_Node_find;
  function X_Node_find(queryString) {
    var HTML = X_Node_html, scope = this.constructor === X_NodeList && this.length ? this : [this.constructor === Node || this["instanceOf"] && this["instanceOf"](Node) ? this : X_Node_body], parents = scope, noLower = "title id name class for action archive background cite classid codebase data href longdesc profile src usemap", ARY_PUSH = Array.prototype.push, ret = [], root = X_Node_getRoot(scope[0]), isXML = !!X_Node_isXmlDocument(root), isMulti = 1 < scope.length, isStart = true, _ = " ", isAll, 
    isNot, hasRoot, l, i, n, parsed, xnodes, merge, parent, children, j, m, combinator, selector, name, tagName, uid, tmp, xnode, filter, key, op, val, toLower, useName, links, className, attr, flag;
    if (X_ViewPort_readyState < X_EVENT_XDOM_READY) {
      alert("not ready! use X.ViewPort.listenOnce( X_EVENT_XDOM_READY, callback )");
      return;
    }
    if (!X_Type_isString(queryString)) {
      return ret;
    }
    xnodes = [];
    for (; queryString.length;) {
      if (!parsed) {
        parsed = X_Node_Selector__parse(queryString);
        if (X_Type_isNumber(parsed)) {
          return [];
        }
        queryString = queryString.substr(parsed[0]);
        parsed = parsed[1];
        if (parsed === 5) {
          isMulti = true;
          parents = scope;
          xnodes && xnodes.length && ARY_PUSH.apply(ret, xnodes);
          parsed = null;
          xnodes = [];
          isStart = true;
          continue;
        }
      }
      combinator = parsed[0];
      selector = parsed[1];
      name = parsed[2];
      tagName = selector === 1 ? isXML ? name : name.toUpperCase() : "*";
      isAll = tagName === "*";
      if (!isStart) {
        if (!xnodes.length) {
          parsed = null;
          continue;
        } else {
          if (combinator !== 0) {
            parents = xnodes;
            xnodes = [];
          }
        }
      }
      i = 0;
      l = parents.length;
      n = -1;
      isMulti = isMulti || 1 < l;
      switch(combinator) {
        case 2:
          for (; i < l; ++i) {
            parent = parents[i];
            if ((children = parent["_xnodes"]) && (m = children.length)) {
              for (j = 0; j < m; ++j) {
                xnode = children[j];
                if (xnode["_tag"] && (isAll || tagName === xnode["_tag"])) {
                  xnodes[++n] = xnode;
                }
              }
            }
          }
          break;
        case 3:
          for (; i < l; ++i) {
            xnode = parents[i];
            j = xnode["getOrder"]() + 1;
            parent = xnode.parent;
            if (parent && (children = parent["_xnodes"]) && (m = children.length)) {
              for (; j < m; ++j) {
                xnode = children[j];
                if (xnode["_tag"]) {
                  if (isAll || tagName === xnode["_tag"]) {
                    xnodes[++n] = xnode;
                  }
                  break;
                }
              }
            }
          }
          break;
        case 4:
          merge = {};
          for (; i < l; ++i) {
            for (xnode = parents[i]["next"](); xnode; xnode = xnode["next"]()) {
              if (xnode["_tag"] && (isAll || tagName === xnode["_tag"])) {
                uid = xnode["_uid"];
                if (merge[uid]) {
                  break;
                } else {
                  merge[uid] = true;
                  xnodes[++n] = xnode;
                }
              }
            }
          }
          break;
        default:
          if (combinator === 1 || isStart && selector < 7) {
            if (isStart) {
              if (tagName === "HTML") {
                xnodes[0] = X_Node_html;
                break;
              }
              if (tagName === "HEAD") {
                xnodes[0] = X_Node_head;
                break;
              }
              if (tagName === "BODY") {
                xnodes[0] = X_Node_body;
                break;
              }
            }
            merge = {};
            X_Node_Selector__fetchElements(xnodes, parents, isAll ? "" : tagName, merge);
          }
      }
      isStart = false;
      switch(selector) {
        case 2:
          filter = ["id", 1, name];
          break;
        case 3:
          filter = ["class", 3, name];
          break;
        case 4:
          if (!(filter = X_Node_Selector__filter[name])) {
            return [];
          }
          break;
        case 5:
          filter = [name, parsed[3], parsed[4]];
          break;
        case 6:
          isNot = true;
          parsed = parsed[2];
          name = parsed[2];
          switch(parsed[1]) {
            case 1:
              filter = ["tag", 1, isXML ? name : name.toUpperCase()];
              break;
            case 2:
              filter = ["id", 1, name];
              break;
            case 3:
              filter = ["class", 3, name];
              break;
            case 4:
              if (!(filter = X_Node_Selector__filter[name])) {
                return [];
              }
              break;
            case 5:
              filter = [name, parsed[3], parsed[4]];
              break;
          }break;
        case 7:
          xnodes = scope;
          break;
        case 8:
          hasRoot = true;
          xnodes = [HTML];
          break;
        case 9:
          if (links = document.links) {
            for (xnodes = [], i = links.length; i;) {
              xnodes[--i] = Node(links[i]);
            }
          } else {
          }
      }
      if (filter && xnodes.length) {
        if (filter.m) {
          xnodes = filter.m({not:isNot, xml:isXML}, xnodes, parsed[3], parsed[4]);
        } else {
          if (X_Type_isFunction(filter)) {
            tmp = [];
            for (i = 0, n = -1; xnode = xnodes[i]; ++i) {
              if (!!filter(xnode) ^ isNot) {
                tmp[++n] = xnode;
              }
            }
            xnodes = tmp;
          } else {
            tmp = [];
            key = filter[0];
            op = filter[1];
            val = filter[2];
            key = X_Node_Attr_renameForTag[key] || key;
            if (!isXML && key === "class" && op === 3) {
              val = _ + val + _;
              for (i = 0, n = -1; xnode = xnodes[i]; ++i) {
                className = xnode["_className"];
                if (!!(className && (_ + className + _).indexOf(val) > -1) ^ isNot) {
                  tmp[++n] = xnode;
                }
              }
            } else {
              useName = X_UA["IE"] && key !== "href" && key !== "src";
              toLower = !!val && !isXML && noLower.indexOf(key) === -1;
              if (toLower) {
                val = val.toLowerCase();
              }
              if (op === 3) {
                val = _ + val + _;
              }
              for (i = 0, n = -1, l = xnodes.length; i < l; ++i) {
                xnode = xnodes[i];
                attr = key === "tag" ? xnode["_tag"] : key === "id" ? xnode["_id"] : key === "class" ? xnode["_className"] : xnode["_attrs"] && xnode["_attrs"][key];
                flag = !!attr;
                if (flag && op) {
                  if (toLower) {
                    attr = attr.toLowerCase();
                  }
                  switch(op) {
                    case 1:
                      flag = attr === val;
                      break;
                    case 2:
                      flag = attr !== val;
                      break;
                    case 3:
                      flag = (_ + attr + _).indexOf(val) !== -1;
                      break;
                    case 4:
                      flag = attr.indexOf(val) === 0;
                      break;
                    case 5:
                      flag = attr.lastIndexOf(val) + val.length === attr.length;
                      break;
                    case 6:
                      flag = attr.indexOf(val) !== -1;
                      break;
                    case 7:
                      flag = attr === val || attr.substring(0, val.length + 1) === val + "-";
                      break;
                  }
                }
                if (!!flag ^ isNot) {
                  tmp[++n] = xnode;
                }
              }
            }
            xnodes = tmp;
          }
        }
      }
      filter = null;
      isNot = false;
      parsed = null;
    }
    if (isMulti) {
      xnodes && xnodes.length && ARY_PUSH.apply(ret, xnodes);
      l = ret.length;
      if (l < 2) {
        return ret[0] || X_Node_none;
      }
      xnodes = [];
      merge = {};
      for (i = 0, n = -1; i < l; ++i) {
        xnode = ret[i];
        if (!merge[uid = xnode["_uid"]]) {
          merge[uid] = true;
          xnodes[++n] = xnode;
        }
      }
      xnodes = X_Node_Selector__sortElementOrder([], xnodes, hasRoot ? [HTML] : HTML["_xnodes"]);
    }
    return xnodes.length === 1 ? xnodes[0] : new X_NodeList(xnodes);
  }
  function X_Node_Selector__sortElementOrder(newList, list, xnodes) {
    var l = xnodes.length, i = 0, j, child, _xnodes;
    for (; i < l; ++i) {
      child = xnodes[i];
      if (!child["_tag"]) {
        continue;
      }
      j = list.indexOf(child);
      if (j !== -1) {
        newList[newList.length] = child;
        if (list.length === 2) {
          newList[newList.length] = list[j === 0 ? 1 : 0];
          return newList;
        }
        list.splice(j, 1);
      }
      if ((_xnodes = child["_xnodes"]) && X_Node_Selector__sortElementOrder(newList, list, _xnodes)) {
        return newList;
      }
    }
  }
  function X_Node_Selector__fetchElements(list, xnodes, tag, merge) {
    var l = xnodes.length, i = 0, child, uid, _tag, _xnodes;
    for (; i < l; ++i) {
      child = xnodes[i];
      uid = child["_uid"];
      _tag = child["_tag"];
      if (!merge[uid] && _tag) {
        merge[uid] = true;
        (!tag || tag === _tag) && (list[list.length] = child);
        if ((_xnodes = child["_xnodes"]) && (1 < _xnodes.length || _xnodes[0] && _xnodes[0]["_tag"])) {
          X_Node_Selector__fetchElements(list, _xnodes, tag, merge);
        }
      }
    }
  }
  function X_Node_Selector__funcSelectorChild(type, flag_all, flags, xnodes) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xnode, node, tagName, tmp;
    for (; xnode = xnodes[i]; ++i) {
      tagName = flag_all || xnode["_tag"];
      tmp = null;
      if (type <= 0) {
        for (node = xnode["prev"](); node; node = node["prev"]()) {
          if (node["_tag"] && (flag_all || tagName === node["_tag"])) {
            tmp = false;
            break;
          }
        }
      }
      if (tmp === null && 0 <= type) {
        for (node = xnode["next"](); node; node = node["next"]()) {
          if (node["_tag"] && (flag_all || tagName === node["_tag"])) {
            tmp = false;
            break;
          }
        }
      }
      if (tmp === null) {
        tmp = true;
      }
      if (tmp ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }
  function X_Node_Selector__funcSelectorNth(pointer, sibling, flag_all, flags, xnodes, a, b) {
    var res = [], checked = {}, flag_not = flags.not, i = 0, n = -1, uid, c, xnode, tmp, node, tagName;
    for (; xnode = xnodes[i]; ++i) {
      uid = xnode["_uid"];
      tmp = checked[uid];
      if (tmp === void 0) {
        for (c = 0, node = xnode.parent[pointer](), tagName = flag_all || xnode["_tag"]; node; node = node[sibling]()) {
          if (node["_tag"] && (flag_all || tagName === node["_tag"])) {
            ++c;
            checked[node["_uid"]] = a === 0 ? c === b : (c - b) % a === 0 && (c - b) / a >= 0;
          }
        }
        tmp = checked[uid];
      }
      if (tmp ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }
  function X_Node_Selector__funcSelectorProp(prop, flag, flags, xnodes) {
    var res = [], flag_not = flag ? flags.not : !flags.not, i = 0, n = -1, xnode;
    for (; xnode = xnodes[i]; ++i) {
      if (xnode["_attrs"] && xnode["_attrs"][prop] ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }
  var X_Node_Selector__filter = {"root":function() {
    return X_Node_html;
  }, "target":{m:function(flags, xnodes) {
    var res = [], hash = location.hash.slice(1), flag_not = flags.not, i = 0, n = -1, xnode;
    for (; xnode = xnodes[i]; ++i) {
      if ((xnode["_id"] || xnode["_attrs"] && xnode["_attrs"]["name"]) === hash ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }}, "first-child":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(-1, true, flags, xnodes);
  }}, "last-child":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(1, true, flags, xnodes);
  }}, "only-child":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(0, true, flags, xnodes);
  }}, "first-of-type":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(-1, false, flags, xnodes);
  }}, "last-of-type":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(1, false, flags, xnodes);
  }}, "only-of-type":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorChild(0, false, flags, xnodes);
  }}, "nth-child":{m:function(flags, xnodes, a, b) {
    return X_Node_Selector__funcSelectorNth("firstChild", "next", true, flags, xnodes, a, b);
  }}, "nth-last-child":{m:function(flags, xnodes, a, b) {
    return X_Node_Selector__funcSelectorNth("lastChild", "prev", true, flags, xnodes, a, b);
  }}, "nth-of-type":{m:function(flags, xnodes, a, b) {
    return X_Node_Selector__funcSelectorNth("firstChild", "next", false, flags, xnodes, a, b);
  }}, "nth-last-of-type":{m:function(flags, xnodes, a, b) {
    return X_Node_Selector__funcSelectorNth("lastChild", "prev", false, flags, xnodes, a, b);
  }}, "empty":{m:function(flags, xnodes) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xnode, tmp, node;
    for (; xnode = xnodes[i]; ++i) {
      tmp = true;
      for (node = xnode["firstChild"](); node; node = node["next"]()) {
        if (node["_tag"] || node["_text"]) {
          tmp = false;
          break;
        }
      }
      if (tmp ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }}, "link":{m:function(flags, xnodes) {
    var links = document.links, res = [], checked, flag_not, i, link, xnode, n;
    if (!links) {
      return res;
    }
    checked = {};
    flag_not = flags.not;
    for (i = 0; link = links[i]; ++i) {
      checked[Node(link)["_uid"]] = true;
    }
    for (i = 0, n = -1; xnode = xnodes[i]; ++i) {
      if (checked[xnode["_uid"]] ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }}, "lang":{m:function(flags, xnodes, arg) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xnode, tmp, lang;
    arg = arg.toLowerCase();
    for (; tmp = xnode = xnodes[i]; ++i) {
      while (tmp && !(lang = tmp["_attrs"] && tmp["_attrs"]["lang"])) {
        tmp = tmp.parent;
      }
      if ((!!lang && lang.toLowerCase().indexOf(arg) === 0) ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }}, "enabled":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorProp("disabled", false, flags, xnodes);
  }}, "disabled":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorProp("disabled", true, flags, xnodes);
  }}, "checked":{m:function(flags, xnodes) {
    return X_Node_Selector__funcSelectorProp("checked", true, flags, xnodes);
  }}, "contains":{m:function(flags, xnodes, arg) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xnode;
    for (; xnode = xnodes[i]; ++i) {
      if (-1 < xnode["text"]().indexOf(arg) ^ flag_not) {
        res[++n] = xnode;
      }
    }
    return res;
  }}};
  var X_HTMLParser_CHARS = {"A":1, "B":1, "C":1, "D":1, "E":1, "F":1, "G":1, "H":1, "I":1, "J":1, "K":1, "L":1, "M":1, "N":1, "O":1, "P":1, "Q":1, "R":1, "S":1, "T":1, "U":1, "V":1, "W":1, "X":1, "Y":1, "Z":1, "a":2, "b":2, "c":2, "d":2, "e":2, "f":2, "g":2, "h":2, "i":2, "j":2, "k":2, "l":2, "m":2, "n":2, "o":2, "p":2, "q":2, "r":2, "s":2, "t":2, "u":2, "v":2, "w":2, "x":2, "y":2, "z":2, "!":1, "\t":16, "\r\n":16, "\r":16, "\n":16, "\f":16, "\b":16, " ":16}, X_HTMLParser_block = {"ADDRESS":1, "APPLET":1, 
  "BLOCKQUOTE":1, "BUTTON":1, "CENTER":1, "DD":1, "DEL":1, "DIR":1, "DIV":1, "DL":1, "DT":1, "FIELDSET":1, "FORM":1, "FRAMESET":1, "HR":1, "IFRAME":1, "INS":1, "ISINDEX":1, "LI":1, "MAP":1, "MENU":1, "NOFRAMES":1, "NOSCRIPT":1, "OBJECT":1, "OL":1, "P":1, "PRE":1, "SCRIPT":1, "TABLE":1, "TBODY":1, "TD":1, "TFOOT":1, "TH":1, "THEAD":1, "TR":1, "UL":1}, X_HTMLParser_inline = {"ABBR":1, "ACRONYM":1, "APPLET":1, "B":1, "BASEFONT":1, "BDO":1, "BIG":1, "BR":1, "BUTTON":1, "CITE":1, "CODE":1, "DEL":1, "DFN":1, 
  "EM":1, "FONT":1, "I":1, "IFRAME":1, "IMG":1, "INPUT":1, "INS":1, "KBD":1, "LABEL":1, "MAP":1, "OBJECT":1, "Q":1, "S":1, "SAMP":1, "SCRIPT":1, "SELECT":1, "SMALL":1, "SPAN":1, "STRIKE":1, "STRONG":1, "SUB":1, "SUP":1, "TEXTAREA":1, "TT":1, "U":1, "VAR":1}, X_HTMLParser_closeSelf = {"OLGROUP":1, "DD":1, "DT":1, "LI":1, "OPTIONS":1, "P":1, "TBODY":1, "TD":1, "TFOOT":1, "TH":1, "THEAD":1, "TR":1}, X_HTMLParser_sisters = {"TH":{"TD":1}, "TD":{"TH":1}, "DT":{"DD":1}, "DD":{"DT":1}, "COLGROUP":{"CAPTION":1}, 
  "THEAD":{"CAPTION":1, "COLGROUP":1}, "TFOOT":{"CAPTION":1, "COLGROUP":1, "THEAD":1, "TBODY":1}, "TBODY":{"CAPTION":1, "COLGROUP":1, "THEAD":1, "TFOOT":1}}, X_HTMLParser_special = {"SCRIPT":1, "STYLE":1, "PLAINTEXT":1, "XMP":1, "TEXTAREA":1}, X_HTMLParser_skipFixNesting = false;
  function X_HTMLParser_exec(html, handler, async) {
    var special = X_HTMLParser_special, startTime = async && X_Timer_now(), stack = async ? async[1] : [], lastHtml = html, chars, last, text, index;
    while (html) {
      chars = true;
      last = stack[stack.length - 1];
      if (last && special[handler.isXML ? last.toUpperCase() : last] === 1) {
        if (0 <= (index = html.toUpperCase().indexOf("</" + (handler.isXML ? last.toUpperCase() : last)))) {
          handler.chars(html.substring(0, index));
          if (index = X_HTMLParser__parseEndTag(stack, handler, html)) {
            html = html.substring(index);
          } else {
            handler.chars(html);
            html = "";
          }
        } else {
          handler.chars(html);
          html = "";
        }
      } else {
        if (html.indexOf("\x3c!--") === 0) {
          if (0 < (index = html.indexOf("--\x3e"))) {
            handler.comment(html.substring(4, index));
            html = html.substring(index + 3);
            chars = false;
          }
        } else {
          if (html.indexOf("</") === 0) {
            if (2 < (index = X_HTMLParser__parseEndTag(stack, handler, html))) {
              html = html.substring(index);
              chars = false;
            }
          } else {
            if (html.indexOf("<") === 0) {
              if (index = X_HTMLParser__parseStartTag(stack, last, handler, html)) {
                html = html.substring(index);
                chars = false;
              } else {
                if (index === false) {
                  return;
                }
              }
            }
          }
        }
        if (chars) {
          index = html.indexOf("<");
          text = index < 0 ? html : html.substring(0, index);
          html = index < 0 ? "" : html.substring(index);
          handler.chars(text);
        }
      }
      if (html === lastHtml) {
        handler.err(html);
        return;
      }
      if (async && startTime + X_Timer_INTERVAL_TIME <= X_Timer_now() && html) {
        handler.progress(1 - html.length / async[0]);
        X_Timer_once(0, X_HTMLParser_exec, [html, handler, async]);
        return;
      }
      lastHtml = html;
    }
    X_HTMLParser_parseEndTag(stack, handler);
    async && handler.asyncComplete();
  }
  function X_HTMLParser__parseStartTag(stack, last, handler, html) {
    var alphabets = X_HTMLParser_CHARS, whiteSpace = X_HTMLParser_CHARS, saveAttr = X_HTMLParser_saveAttr, uri = X_Dom_DTD_ATTR_VAL_IS_URI, phase = 0, l = html.length, i = 0, attrs = [], tagName, empty = false, chr, start, attrName, quot, escape, tagUpper;
    while (i < l && phase < 9) {
      chr = html.charAt(i);
      switch(phase) {
        case 0:
          chr === "<" && ++phase;
          break;
        case 1:
          alphabets[chr] & 3 && (++phase && (start = i));
          break;
        case 2:
          whiteSpace[chr] & 16 ? ++phase && (tagName = html.substring(start, i)) : (chr === ">" || (empty = html.substr(i, 2) === "/>")) && ((tagName = html.substring(start, i)) && (phase = 9));
          break;
        case 3:
          alphabets[chr] & 3 ? ++phase && (start = i) : (chr === ">" || (empty = html.substr(i, 2) === "/>")) && (phase = 9);
          break;
        case 4:
          chr === "=" ? (phase = 6) && (attrName = html.substring(start, i)) : whiteSpace[chr] & 16 ? (phase = 5) && (attrName = html.substring(start, i)) : (chr === ">" || (empty = html.substr(i, 2) === "/>")) && ((phase = 9) && (attrs[attrs.length] = html.substring(start, i)));
          break;
        case 5:
          !(whiteSpace[chr] & 16) && alphabets[chr] & 3 ? (phase = 3) && (attrs[attrs.length] = attrName) && (start = i) : chr === "=" ? phase = 6 : (chr === ">" || (empty = html.substr(i, 2) === "/>")) && ((phase = 9) && (attrs[attrs.length] = attrName));
          break;
        case 6:
          chr === '"' || chr === "'" ? (phase = 7) && (quot = chr) && (start = i + 1) : !(whiteSpace[chr] & 16) && ((phase = 8) && (start = i));
          break;
        case 7:
          !escape && chr === quot && (phase = 3) && saveAttr(attrs, attrName, html.substring(start, i));
          break;
        case 8:
          whiteSpace[chr] & 16 ? (phase = 3) && saveAttr(attrs, attrName, html.substring(start, i)) : chr === ">" ? (phase = 9) && saveAttr(attrs, attrName, html.substring(start, i)) : !escape && !uri[attrName] && (empty = html.substr(i, 2) === "/>") && ((phase = 9) && saveAttr(attrs, attrName, html.substring(start, i)));
          break;
      }
      escape = chr === "\\" && !escape;
      ++i;
    }
    if (phase === 9) {
      if (empty) {
        ++i;
      }
      tagUpper = tagName.toUpperCase();
      if (!X_HTMLParser_skipFixNesting && X_HTMLParser_block[tagUpper] === 1) {
        while (last && X_HTMLParser_inline[handler.isXML ? last.toUpperCase() : last] === 1) {
          X_HTMLParser_parseEndTag(stack, handler, last);
          last = stack[stack.length - 1];
        }
      }
      last && X_HTMLParser_closeSelf[tagUpper] === 1 && (last === tagName || X_HTMLParser_sisters[tagUpper] && X_HTMLParser_sisters[tagUpper][handler.isXML ? last.toUpperCase() : last] === 1) && X_HTMLParser_parseEndTag(stack, handler, last);
      empty = empty || X_Dom_DTD_EMPTY[tagUpper];
      !empty && (stack[stack.length] = handler.isXML ? tagName : tagUpper);
      if (handler.tagStart(handler.isXML ? tagName : tagUpper, attrs, empty, i) === false) {
        return false;
      }
      return i;
    }
    return 0;
  }
  function X_HTMLParser__parseEndTag(stack, handler, html) {
    var alphabets = X_HTMLParser_CHARS, whiteSpace = X_HTMLParser_CHARS, phase = 0, l = html.length, i = 0, tagName, chr, start;
    while (i < l && phase < 9) {
      chr = html.charAt(i);
      switch(phase) {
        case 0:
          html.substr(i, 2) === "</" && (++phase && ++i);
          break;
        case 1:
          alphabets[chr] & 3 && (++phase && (start = i));
          break;
        case 2:
          whiteSpace[chr] & 16 && ++phase;
          chr === ">" && (phase = 9);
          phase !== 2 && (tagName = html.substring(start, i));
          break;
        case 3:
          chr === ">" && (phase = 9);
          break;
      }
      ++i;
    }
    if (phase === 9) {
      X_HTMLParser_parseEndTag(stack, handler, handler.isXML ? tagName : tagName.toUpperCase());
      return i;
    }
    return 0;
  }
  function X_HTMLParser_saveAttr(attrs, name, value) {
    name = name.toLowerCase();
    value = X_Node_Attr_noValue[name] === 1 ? name : value;
    attrs[attrs.length] = {attName:name, escaped:value.indexOf('"') !== -1 ? value.split('"').join('\\"').split('\\\\"').join('\\"') : value};
  }
  function X_HTMLParser_parseEndTag(stack, handler, tagName) {
    var pos = 0, i = stack.length;
    if (tagName) {
      for (pos = i; 0 <= pos;) {
        if (stack[--pos] === tagName) {
          break;
        }
      }
    }
    if (0 <= pos) {
      for (; pos < i;) {
        handler.tagEnd(stack[--i]);
      }
      stack.length = pos;
    }
  }
  var X_HTMLParser_htmlStringToXNode = {flat:null, nest:[], isXML:false, err:function(html) {
    X_HTMLParser_htmlStringToXNode.flat.length = 0;
    !X_HTMLParser_htmlStringToXNode.ignoreError && X.Logger.warn("X_Dom_Parser() error " + html);
  }, tagStart:function(tagName, attrs, noChild, length) {
    var xnode, nest = X_HTMLParser_htmlStringToXNode.nest, flat = X_HTMLParser_htmlStringToXNode.flat, l = nest.length, attr, name, i, _attrs;
    if (l) {
      xnode = nest[l - 1]["create"](tagName);
    } else {
      xnode = flat[flat.length] = X_Doc_create(tagName);
    }
    if (!noChild) {
      nest[l] = xnode;
    }
    if (i = attrs.length) {
      _attrs = {};
      for (; i;) {
        if (attr = attrs[--i]) {
          if (X_Type_isString(attr)) {
            name = attr;
            _attrs[name] = true;
          } else {
            name = attr.attName;
            _attrs[name] = attr.escaped;
          }
        }
      }
      xnode["attr"](_attrs);
    }
  }, tagEnd:function() {
    0 < X_HTMLParser_htmlStringToXNode.nest.length && --X_HTMLParser_htmlStringToXNode.nest.length;
  }, chars:function(text) {
    if (X_HTMLParser_htmlStringToXNode.nest.length) {
      X_HTMLParser_htmlStringToXNode.nest[X_HTMLParser_htmlStringToXNode.nest.length - 1]["createText"](text);
    } else {
      X_HTMLParser_htmlStringToXNode.flat[X_HTMLParser_htmlStringToXNode.flat.length] = X_Doc_createText(text);
    }
  }, comment:X_emptyFunction};
  function X_HtmlParser_parse(html, ignoreError) {
    var worker = X_HTMLParser_htmlStringToXNode, ret;
    worker.flat = [];
    worker.nest.length = 0;
    worker.ignoreError = ignoreError;
    X_HTMLParser_exec(html, worker);
    ret = worker.flat;
    delete worker.flat;
    return ret;
  }
  var X_HTMLParser_asyncHtmlStringToXNode = {isXML:false, err:function(html) {
    X_HTMLParser_htmlStringToXNode.err(html);
    this["asyncDispatch"](X_EVENT_ERROR);
  }, tagStart:X_HTMLParser_htmlStringToXNode.tagStart, tagEnd:X_HTMLParser_htmlStringToXNode.tagEnd, chars:X_HTMLParser_htmlStringToXNode.chars, comment:X_emptyFunction, progress:function(pct) {
    this["asyncDispatch"]({type:X_EVENT_PROGRESS, percent:pct});
  }, asyncComplete:function() {
    var ret = X_HTMLParser_htmlStringToXNode.flat;
    delete X_HTMLParser_htmlStringToXNode.flat;
    this["asyncDispatch"]({type:X_EVENT_SUCCESS, xnodes:ret});
  }};
  function X_HTMLParser_asyncParse(html, ignoreError) {
    var dispatcher = X_Class_override(X_EventDispatcher(), X_HTMLParser_asyncHtmlStringToXNode), worker = X_HTMLParser_htmlStringToXNode;
    dispatcher["listenOnce"](X_EVENT_SUCCESS, dispatcher, dispatcher["kill"]);
    worker.flat = [];
    worker.nest.length = 0;
    worker.ignoreError = ignoreError;
    X_HTMLParser_exec(html, dispatcher, [html.length, []]);
    return dispatcher;
  }
  var X_NodeAnime_QUEUE = [], X_NodeAnime_uid = 0, X_NodeAnime_reserved = false, X_NodeAnime_updateTimerID = 0, X_NodeAnime_needsDetection = false, X_NodeAnime_hasTransform = !!X_Node_CSS_VENDER_PREFIX["transform"], X_NodeAnime_hasDXTransform = 5.5 <= X_UA["IE"] && X_UA["IE"] < 9 && X_UA["ActiveX"], X_NodeAnime_translateZ = X_Node_CSS_VENDER_PREFIX["perspective"] && !(X_UA["Prsto"] && X_UA["Android"]) && !(X_UA["IE"] && 7 <= X_UA["Windows"] && X_UA["Windows"] < 9) ? " translateZ(0)" : "", X_NODE_ANIME_RESET = 
  1, X_NODE_ANIME_STAY_GPU = 2, X_NodeAnime_DEFAULT = {x:NaN, y:NaN, toX:NaN, toY:NaN, fromX:NaN, fromY:NaN, rotate:NaN, fromRotate:NaN, toRotate:NaN, skewX:NaN, fromSkewX:NaN, toSkewX:NaN, skewY:NaN, fromSkewY:NaN, toSkewY:NaN, scaleX:1, fromScaleX:1, toScaleX:1, scaleY:1, fromScaleY:1, toScaleY:1, alpha:NaN, scrollX:NaN, fromScrollX:NaN, toScrollX:NaN, scrollY:NaN, fromScrollY:NaN, toScrollY:NaN};
  function X_Node_animate(obj) {
    var list = X_NodeAnime_QUEUE, from = obj["from"] || {}, dest = obj["to"] || {}, duration = obj["duration"], lazyRelease = obj["lazyRelease"], easing = obj["easing"], fallback = obj["fallback"], a, sameRate;
    obj = this["_anime"];
    if (!(this["_flags"] & X_NodeFlags_IN_TREE)) {
      alert("@animate \u8981\u7d20\u306f\u30c4\u30ea\u30fc\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u305b\u3093!");
      return this;
    }
    if (!obj) {
      this["_anime"] = obj = X_Object_copy(X_NodeAnime_DEFAULT);
      a = this["_css"] && parseFloat(this["_css"].opacity);
      if (0 <= a) {
        obj.alpha = a;
      }
    }
    obj.fromX = obj.x = X_NodeAnime_getFinite(from["x"], obj.x);
    obj.fromY = obj.y = X_NodeAnime_getFinite(from["y"], obj.y);
    obj.fromRotate = obj.rotate = X_NodeAnime_getFinite(from["rotate"], obj.rotate);
    obj.fromSkewX = obj.skewX = X_NodeAnime_getFinite(from["skewX"], from["skew"], obj.skewX);
    obj.fromSkewY = obj.skewY = X_NodeAnime_getFinite(from["skewY"], from["skew"], obj.skewY);
    obj.fromScaleX = obj.scaleX = X_NodeAnime_getFinite(from["scaleX"], from["scale"], obj.scaleX);
    obj.fromScaleY = obj.scaleY = X_NodeAnime_getFinite(from["scaleY"], from["scale"], obj.scaleY);
    obj.fromAlpha = obj.alpha = X_NodeAnime_getFinite(from["opacity"], obj.alpha);
    obj.fromScrollX = obj.scrollX = X_NodeAnime_getFinite(from["scrollX"], obj.scrollX);
    obj.fromScrollY = obj.scrollY = X_NodeAnime_getFinite(from["scrollY"], obj.scrollY);
    obj.toX = X_NodeAnime_getFinite(dest["x"], obj.x);
    obj.toY = X_NodeAnime_getFinite(dest["y"], obj.y);
    obj.toRotate = X_NodeAnime_getFinite(dest["rotate"], obj.rotate);
    obj.toSkewX = X_NodeAnime_getFinite(dest["skewX"], dest["skew"], obj.skewX);
    obj.toSkewY = X_NodeAnime_getFinite(dest["skewY"], dest["skew"], obj.skewY);
    obj.toScaleX = X_NodeAnime_getFinite(dest["scaleX"], dest["scale"], obj.scaleX);
    obj.toScaleY = X_NodeAnime_getFinite(dest["scaleY"], dest["scale"], obj.scaleY);
    obj.toAlpha = X_NodeAnime_getFinite(dest["opacity"], obj.alpha);
    obj.toScrollX = X_NodeAnime_getFinite(dest["scrollX"], obj.scrollX);
    obj.toScrollY = X_NodeAnime_getFinite(dest["scrollY"], obj.scrollY);
    if (X_Type_isFinite(obj.toX) && X_Type_isNaN(obj.x)) {
      obj.x = obj.fromX = 0;
    }
    if (X_Type_isFinite(obj.toY) && X_Type_isNaN(obj.y)) {
      obj.y = obj.fromY = 0;
    }
    if (obj.toRotate && X_Type_isNaN(obj.rotate)) {
      obj.rotate = obj.fromRotate = 0;
    }
    if (obj.toSkewX && X_Type_isNaN(obj.skewX)) {
      obj.skewX = obj.fromSkewX = 0;
    }
    if (obj.toSkewY && X_Type_isNaN(obj.skewY)) {
      obj.skewY = obj.fromSkewY = 0;
    }
    obj.duration = 0 <= duration && X_Type_isFinite(duration) ? duration : 0;
    obj.lazyRelease = 0 <= lazyRelease && X_Type_isFinite(lazyRelease) ? lazyRelease : 0;
    obj.easing = X_Type_isFunction(easing) ? easing : X_NodeAnime_ease[easing] || X_NodeAnime_ease["circular"];
    obj.inited = false;
    obj.transform = (X_Type_isFinite(obj.x) || X_Type_isFinite(obj.y) || obj.lazyRelease) && X_NodeAnime_hasTransform;
    obj.doScroll = 0 <= obj.toScrollX || 0 <= obj.toScrollY;
    obj.fallback = 0;
    obj.altX = fallback & 8 ? "right" : "left";
    obj.altY = fallback & 16 ? "bottom" : "top";
    if (obj.toScaleX !== 1 || obj.fromScaleX !== 1 || obj.toScaleY !== 1 || obj.fromScaleY !== 1) {
      sameRate = obj.fromScaleX === obj.fromScaleY && obj.toScaleX === obj.toScaleY;
      if (X_NodeAnime_hasTransform) {
        obj.transform = true;
      } else {
        if (X_NodeAnime_hasDXTransform && fallback & 32) {
          obj.fallback = 32;
        } else {
          if (fallback & 4 && sameRate) {
            obj.fallback = 4;
          } else {
            if (fallback & 2 && sameRate) {
              obj.fallback = 2;
            } else {
              if (fallback & 1) {
                obj.fallback = 1;
              }
            }
          }
        }
      }
    }
    if (X_Type_isFinite(obj.rotate) || X_Type_isFinite(obj.skewX) || X_Type_isFinite(obj.skewY)) {
      if (X_NodeAnime_hasTransform) {
        obj.transform = true;
      } else {
        if (X_NodeAnime_hasDXTransform && fallback & 32) {
          obj.fallback = 32;
        }
      }
    }
    if (!obj.duration && 6 <= obj.phase) {
      this["stop"]();
    } else {
      if (!obj.phase) {
        list[list.length] = this;
        obj.phase = 1;
        obj.uid = ++X_NodeAnime_uid;
        X_NodeAnime_needsDetection = true;
      } else {
        if (obj.phase < 4) {
          list.splice(list.indexOf(this), 1);
          list[list.length] = this;
          obj.uid = ++X_NodeAnime_uid;
          X_NodeAnime_needsDetection = true;
        } else {
          if (obj.duration) {
            obj.phase = 6;
          } else {
            if (obj.phase !== 5) {
              obj.phase = 4;
              obj.releaseNow = false;
              X_NodeAnime_needsDetection = true;
            } else {
              obj.phase = 1;
              X_NodeAnime_needsDetection = true;
            }
          }
        }
      }
      if (!X_NodeAnime_reserved) {
        X_NodeAnime_reserved = true;
        if (X_Node_updateTimerID) {
          if (X_NodeAnime_updateTimerID) {
            X_NodeAnime_updateTimerID = X_Timer_cancelFrame(X_NodeAnime_updateTimerID);
          }
          X_System["listen"](X_EVENT_UPDATED, X_NodeAnime_updateAnimations);
        } else {
          X_System["unlisten"](X_EVENT_UPDATED, X_NodeAnime_updateAnimations);
          X_NodeAnime_updateTimerID = X_Timer_requestFrame(X_NodeAnime_updateAnimations);
        }
      }
    }
    return this;
  }
  function X_NodeAnime_getFinite(a, b, c) {
    if (a || a === 0) {
      return a;
    }
    if (b || b === 0) {
      return b;
    }
    if (c || c === 0) {
      return c;
    }
    return NaN;
  }
  function X_Node_stop(option) {
    var obj = this["_anime"], list = X_NodeAnime_QUEUE, rm;
    if (!obj || !obj.phase) {
      return this;
    }
    switch(obj.phase) {
      case 6:
      case 2:
      case 3:
        X_NodeAnime_needsDetection = true;
      case 1:
        rm = true;
      case 4:
      case 7:
        if (option & X_NODE_ANIME_RESET) {
          X_Object_override(obj, X_NodeAnime_DEFAULT);
        }
        if (rm) {
          break;
        }
        obj.toX = obj.x;
        obj.toY = obj.y;
        obj.toRotate = obj.rotate;
        obj.toSkewX = obj.skewX;
        obj.toSkewY = obj.skewY;
        obj.toScaleX = obj.scaleX;
        obj.toScaleY = obj.scaleY;
        obj.toAlpha = obj.alpha;
        obj.toScrollX = obj.scrollX;
        obj.toScrollY = obj.scrollY;
        obj.phase = 4;
        X_NodeAnime_needsDetection = true;
      case 5:
        obj.releaseNow = !(option & X_NODE_ANIME_STAY_GPU);
        break;
    }
    if (rm) {
      list.splice(list.indexOf(this), 1);
      obj.phase = 0;
    }
    return this;
  }
  function X_NodeAnime_stopNow(xnode) {
    var obj = xnode["_anime"], flags = xnode["_flags"], list = X_NodeAnime_QUEUE, skipUpdate;
    X_NodeAnime_needsDetection = true;
    list.splice(list.indexOf(xnode), 1);
    obj.phase = 0;
    if (flags & ~X_Node_BitMask_RESET_GPU) {
      skipUpdate = flags & X_NodeFlags_GPU_RESERVED;
      flags & X_NodeFlags_GPU_RELEASE_RESERVED || X_NodeAnime_updatePosition(xnode, obj, 0.5, false);
      skipUpdate || (xnode["_rawObject"].style.cssText = X_Node_CSS_objToCssText(xnode));
      xnode["_flags"] &= X_Node_BitMask_RESET_GPU;
    }
  }
  function X_NodeAnime_detectWaitAnimation(xnode, duration, isTest) {
    var list = X_NodeAnime_QUEUE, i = 0, _xnode, obj;
    for (; _xnode = list[i]; ++i) {
      if (_xnode === xnode) {
        break;
      }
      if (_xnode["_anime"].phase <= 3) {
        if (xnode["contains"](_xnode) || _xnode["contains"](xnode)) {
          return 2;
        }
      }
    }
    for (i = 0; _xnode = list[i]; ++i) {
      if (_xnode === xnode) {
        break;
      }
      obj = _xnode["_anime"];
      if (6 <= obj.phase) {
        if (xnode["contains"](_xnode) || _xnode["contains"](xnode)) {
          return isTest ? 3 : _xnode;
        }
      }
    }
    return duration ? 6 : 4;
  }
  function X_NodeAnime_updateAnimations(e) {
    var list = X_NodeAnime_QUEUE, now = X_Timer_now(), c = false, i, xnode, obj, _xnode, rm, progress, easing, lazy;
    if (X_NodeAnime_needsDetection) {
      X_NodeAnime_needsDetection = false;
      list.sort(X_NodeAnime_sortAnimationNode);
      for (i = 0; xnode = list[i]; ++i) {
        obj = xnode["_anime"];
        if (obj.phase <= 3) {
          if (!X_Type_isNumber(obj.phase = _xnode = X_NodeAnime_detectWaitAnimation(xnode, obj.duration))) {
            _xnode["_anime"].follower = true;
            obj.phase = 3;
          }
        } else {
          obj.follower = false;
        }
      }
    }
    for (i = list.length; i;) {
      rm = false;
      xnode = list[--i];
      obj = xnode["_anime"];
      switch(obj.phase) {
        case 7:
          if (now < obj.toTime) {
            obj.progress = progress = (now - obj.fromTime) / obj.duration;
            easing = obj.easing(progress);
            obj.x = (obj.toX - obj.fromX) * easing + obj.fromX;
            obj.y = (obj.toY - obj.fromY) * easing + obj.fromY;
            obj.rotate = (obj.toRotate - obj.fromRotate) * easing + obj.fromRotate;
            obj.skewX = (obj.toSkewX - obj.fromSkewX) * easing + obj.fromSkewX;
            obj.skewY = (obj.toSkewY - obj.fromSkewY) * easing + obj.fromSkewY;
            obj.scaleX = (obj.toScaleX - obj.fromScaleX) * easing + obj.fromScaleX;
            obj.scaleY = (obj.toScaleY - obj.fromScaleY) * easing + obj.fromScaleY;
            obj.alpha = (obj.toAlpha - obj.fromAlpha) * easing + obj.fromAlpha;
            obj.scrollX = (obj.toScrollX - obj.fromScrollX) * easing + obj.fromScrollX;
            obj.scrollY = (obj.toScrollY - obj.fromScrollY) * easing + obj.fromScrollY;
            X_NodeAnime_updatePosition(xnode, obj, progress, true);
            c = true;
            break;
          }
          xnode["asyncDispatch"](X_EVENT_ANIME_END);
        case 4:
          lazy = !obj.follower && !obj.releaseNow && obj.lazyRelease;
          X_NodeAnime_updatePosition(xnode, obj, 1, !!lazy);
          if (lazy) {
            console.log("\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u7d42\u4e86(" + obj.phase + ") -> GPU \u89e3\u9664\u5f85\u6a5f " + lazy);
            obj.toTime = now + lazy;
            obj.phase = 5;
            c = true;
          } else {
            console.log("\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u7d42\u4e86(" + obj.phase + ") -> ");
            rm = true;
          }
          break;
        case 6:
          obj.fromTime = now;
          obj.toTime = now + obj.duration;
          obj.phase = 7;
          obj.progress = 0;
          xnode["asyncDispatch"](X_EVENT_ANIME_START);
          c = true;
          (!obj.inited || X_NodeAnime_translateZ) && X_NodeAnime_updatePosition(xnode, obj, 0, true);
          break;
        case 5:
          if (obj.toTime <= now || obj.follower || obj.releaseNow) {
            X_NodeAnime_translateZ && X_NodeAnime_updatePosition(xnode, obj, 1, false);
            rm = true;
          } else {
            c = true;
          }
          break;
        default:
          obj.inited || X_NodeAnime_updatePosition(xnode, obj, 0, false);
          obj.inited = true;
          break;
      }
      obj.releaseNow = false;
      if (rm) {
        X_NodeAnime_translateZ && xnode["asyncDispatch"](X_EVENT_GPU_RELEASED);
        if (obj.follower) {
          X_NodeAnime_needsDetection = c = true;
        }
        list.splice(i, 1);
        obj.phase = 0;
      }
    }
    if (X_NodeAnime_reserved = c) {
      if (X_Node_updateTimerID) {
        !e || e.type !== X_EVENT_UPDATED ? X_System["listen"](X_EVENT_UPDATED, X_NodeAnime_updateAnimations) : X_NodeAnime_updateTimerID && X_Timer_cancelFrame(X_NodeAnime_updateTimerID);
        X_NodeAnime_updateTimerID = 0;
      } else {
        X_System["unlisten"](X_EVENT_UPDATED, X_NodeAnime_updateAnimations);
        X_NodeAnime_updateTimerID = X_Timer_requestFrame(X_NodeAnime_updateAnimations);
      }
    } else {
      X_System["unlisten"](X_EVENT_UPDATED, X_NodeAnime_updateAnimations);
      X_NodeAnime_updateTimerID = 0;
    }
  }
  function X_NodeAnime_sortAnimationNode(xnode1, xnode2) {
    var a = 4 <= xnode1["_anime"].phase, b = 4 <= xnode2["_anime"].phase;
    if (a && b && (!a && !b)) {
      return xnode1["_anime"].uid - xnode2["_anime"].uid;
    }
    return a ? -1 : 1;
  }
  function X_NodeAnime_updatePosition(xnode, obj, ratio, useGPU) {
    var str = "", x, y, rotate, skewX, skewY, scaleX, scaleY, alpha, scrollX, scrollY;
    if (ratio === 1) {
      x = obj.x = obj.toX;
      y = obj.y = obj.toY;
      rotate = X_Node_CSS_ieMathRangeFix(obj.rotate = obj.toRotate);
      skewX = X_Node_CSS_ieMathRangeFix(obj.skewX = obj.toSkewX);
      skewY = X_Node_CSS_ieMathRangeFix(obj.skewY = obj.toSkewY);
      scaleX = obj.scaleX = obj.toScaleX;
      scaleY = obj.scaleY = obj.toScaleY;
      alpha = obj.alpha = obj.toAlpha;
      obj.scrollX = obj.toScrollX;
      obj.scrollY = obj.toScrollY;
    } else {
      x = obj.x;
      y = obj.y;
      rotate = X_Node_CSS_ieMathRangeFix(obj.rotate);
      skewX = X_Node_CSS_ieMathRangeFix(obj.skewX);
      skewY = X_Node_CSS_ieMathRangeFix(obj.skewY);
      scaleX = obj.scaleX;
      scaleY = obj.scaleY;
      alpha = obj.alpha;
    }
    if (obj.transform) {
      if ((x === x || y === y) && (x !== 0 || y !== 0)) {
        if (X_UA["Safari"] && X_UA["Windows"]) {
          str = " -webkit-translate(" + (x | 0) + "px," + (y | 0) + "px)";
        } else {
          str = " translate(" + (x | 0) + "px," + (y | 0) + "px)";
        }
      }
      if (rotate < 0 || 0 < rotate) {
        str += " rotate(" + rotate + "deg)";
      }
      if (skewX < 0 || 0 < skewX) {
        str += " skewX(" + skewX + "deg)";
      }
      if (skewY < 0 || 0 < skewY) {
        str += " skewY(" + skewY + "deg)";
      }
      if (scaleX < 1 || 1 < scaleX) {
        str += " scaleX(" + scaleX + ")";
      }
      if (scaleY < 1 || 1 < scaleY) {
        str += " scaleY(" + scaleY + ")";
      }
      xnode["css"]("transform", (str ? str.substr(1) : "") + (useGPU ? X_NodeAnime_translateZ : ""));
      console.log(xnode.className() + " " + str + " " + (xnode["_flags"] & X_NodeFlags_DIRTY_CSS));
      if (X_NodeAnime_translateZ) {
        if (useGPU) {
          if (xnode["_flags"] & X_NodeFlags_GPU_RELEASE_RESERVED) {
            xnode["_flags"] &= X_Node_BitMask_RESET_GPU;
            xnode["_flags"] |= X_NodeFlags_GPU_NOW;
          } else {
            if (!(xnode["_flags"] & X_NodeFlags_GPU_NOW)) {
              xnode["_flags"] &= X_Node_BitMask_RESET_GPU;
              xnode["_flags"] |= X_NodeFlags_GPU_RESERVED;
            }
          }
        } else {
          if (xnode["_flags"] & X_NodeFlags_GPU_NOW) {
            xnode["_flags"] &= X_Node_BitMask_RESET_GPU;
            xnode["_flags"] |= X_NodeFlags_GPU_RELEASE_RESERVED;
          } else {
            if (xnode["_flags"] & X_NodeFlags_GPU_RESERVED) {
              xnode["_flags"] &= X_Node_BitMask_RESET_GPU;
            }
          }
        }
      }
    } else {
      if (obj.fallback === 32) {
        xnode["css"]("dxtransform", [x | 0, y | 0, rotate || 0, skewX || 0, skewY || 0, scaleX, scaleY, obj.altX, obj.altY]);
      } else {
        x === x && xnode["css"](obj.altX, (x | 0) + "px");
        y === y && xnode["css"](obj.altY, (y | 0) + "px");
        switch(obj.fallback) {
          case 4:
            xnode["css"]("zoom", scaleX);
            break;
          case 2:
            xnode["css"]("fontSize", scaleX + "em");
            break;
          case 1:
            break;
        }
      }
    }
    if (obj.doScroll && xnode["_rawObject"]) {
      console.log("ok " + ratio);
      xnode["_rawObject"].scrollLeft = obj.scrollX | 0;
      xnode["_rawObject"].scrollTop = obj.scrollY | 0;
    }
    alpha === alpha && xnode["css"]("opacity", alpha);
  }
  var X_NodeAnime_ease = {"quadratic":function(k) {
    return k * (2 - k);
  }, "circular":function(k) {
    return Math.sqrt(1 - --k * k);
  }, "back":function(k) {
    return --k * k * (5 * k + 4) + 1;
  }, "bounce":function(k, X) {
    X = 7.5625;
    if (k < 1 / 2.75) {
      return X * k * k;
    } else {
      if (k < 2 / 2.75) {
        return X * (k -= 1.5 / 2.75) * k + 0.75;
      } else {
        if (k < 2.5 / 2.75) {
          return X * (k -= 2.25 / 2.75) * k + 0.9375;
        } else {
          return X * (k -= 2.625 / 2.75) * k + 0.984375;
        }
      }
    }
  }, "elastic":function(k) {
    return k === 0 ? 0 : k === 1 ? 1 : 0.4 * Math.pow(2, -10 * k) * Math.sin((k - 0.055) * 28.56) + 1;
  }};
  var Node = X["Node"] = X_EventDispatcher["inherits"]("X.Node", X_Class.NONE, {"_uid":0, "_flags":X_NodeFlags_DESTROYED, "_rect":null, "_fontSize":0, length:1, parent:null, "_xnodes":null, "_gpuParent":null, "_tag":"", "_text":"", "_id":"", "_className":"", "_attrs":null, "_newAttrs":null, "_attrText":"", "_css":null, "_cssText":"", "_anime":null, "Constructor":function(v) {
    var uid = X_Node_CHASHE.length, css, xnodes, xnode, parent;
    if (X_Node_newByTag || this.constructor !== Node) {
      X_Node_newByTag = false;
      this["_tag"] = v.toUpperCase();
      arguments[1] && this["attr"](arguments[1]);
      css = arguments[2];
      css && this[X_Type_isString(css) ? "cssText" : "css"](css);
    } else {
      if (X_Node_newByText) {
        X_Node_newByText = false;
        this["_text"] = v;
      } else {
        if (1 < arguments.length) {
          return new X_NodeList(arguments);
        }
        if (X_Type_isArray(v) && v.length) {
          return new X_NodeList(v);
        }
        switch(X_Node_getType(v)) {
          case X_NodeType_XNODE:
          case X_NodeType_XNODE_LIST:
            return v;
          case X_NodeType_RAW_HTML:
            if (xnode = X_Node_getXNode(v)) {
              return xnode;
            }
            this.parent = (parent = v.parentNode || v.parentElement) && parent.tagName && X_Node_getXNode(parent);
            this["_rawObject"] = v;
            this["_tag"] = v.tagName.toUpperCase();
            this["_id"] = v.id;
            this["_className"] = v.className;
            this["cssText"](v.style.cssText);
            this["_flags"] &= X_Node_BitMask_RESET_DIRTY;
            if (X_UA_DOM.IE4) {
              v.setAttribute("UID", "" + uid);
            } else {
              v["UID"] = uid;
            }
            break;
          case X_NodeType_RAW_TEXT:
            if (xnode = X_Node_getXNode(v)) {
              return xnode;
            }
            this.parent = X_Node_getXNode(v.parentNode);
            this["_rawObject"] = v;
            this["_text"] = v.data;
            v["UID"] = uid;
            break;
          case X_NodeType_HTML_STRING:
          case X_NodeType_STRING:
            if (xnodes = X_HtmlParser_parse(v, true) && 1 < xnodes.length) {
              return new X_NodeList(xnodes);
            }
            if (xnodes.length) {
              return xnodes[0];
            }
            return X_Node_none;
          default:
            if (X_Node_none) {
              return X_Node_none;
            }
            this.length = 0;
            return;
        }
      }
    }
    if (this.parent && this.parent["_flags"] & X_NodeFlags_IN_TREE) {
      this["_flags"] |= X_NodeFlags_IN_TREE;
    }
    this["_flags"] |= X_NodeFlags_EXIST;
    X_Node_CHASHE[this["_uid"] = uid] = this[0] = this;
  }, "width":X_Node_width, "height":X_Node_height, "clientWidth":X_Node_clientWidth, "clientHeight":X_Node_clientHeight, "scrollWidth":X_Node_scrollWidth, "scrollHeight":X_Node_scrollHeight, "scrollLeft":X_Node_scrollLeft, "scrollTop":X_Node_scrollTop, "x":X_Node_x, "y":X_Node_y, "offset":X_Node_offset, "attr":X_Node_attr, "css":X_Node_css, "cssText":X_Node_cssText, "find":X_Node_find, "animate":X_Node_animate, "stop":X_Node_stop, "create":X_Node_create, "createAt":X_Node_createAt, "createText":X_Node_createText, 
  "createTextAt":X_Node_createTextAt, "createRange":X_Node_createRange, "clone":X_Node_clone, "append":X_Node_append, "appendAt":X_Node_appendAt, "appendTo":X_Node_appendTo, "prev":X_Node_prev, "next":X_Node_next, "swap":X_Node_swap, "remove":X_Node_remove, "empty":X_Node_empty, "contains":X_Node_contains, "getChildAt":X_Node_getChildAt, "numChildren":X_Node_numChildren, "firstChild":X_Node_firstChild, "lastChild":X_Node_lastChild, "getOrder":X_Node_getOrder, "className":X_Node_className, "addClass":X_Node_addClass, 
  "removeClass":X_Node_removeClass, "toggleClass":X_Node_toggleClass, "hasClass":X_Node_hasClass, "html":X_Node__html, "text":X_Node_text, "call":X_Node_call, "each":X_Node_each});
  var X_NodeType_XNODE = 1, X_NodeType_RAW_HTML = 2, X_NodeType_RAW_TEXT = 3, X_NodeType_HTML_STRING = 4, X_NodeType_STRING = 5, X_NodeType_XNODE_LIST = 7, X_NodeType_WINDOW = 8, X_NodeType_DOCUMENT = 9, X_NodeType_IMAGE = 10, X_Node_strictElmCreation = !X_UA["MacIE"] && X_UA["IE"] <= 8, X_Node_documentFragment = document.createDocumentFragment && (!X_UA["IE"] || 5.5 <= X_UA["IE"]) && document.createDocumentFragment(), X_Node_addTreeAfterChildren = !(X_UA["IE"] < 9), X_Node_displayNoneFixForIE5 = 
  !!X_NodeFlags_IE5_DISPLAY_NONE_FIX, X_Node_newByTag = false, X_Node_newByText = false, X_Node_outerXNode = null, X_Node_updateTimerID = 0, X_Node_isXmlDocument = X_UA_DOM.IE4 ? X_emptyFunction : function(root) {
    if (X_Type_isBoolean(root.isXML)) {
      return root.isXML;
    }
    return root.isXML = root["_rawObject"].createElement("p").tagName !== root["_rawObject"].createElement("P").tagName;
  }, X_Node_CHASHE = [], X_Node_none = X_Node_CHASHE[0] = Node(), X_Node_html, X_Node_head, X_Node_body, X_Node_systemNode, X_Node_fontSizeNode, X_Node_reserveRemoval = [];
  function X_Node_getType(v) {
    if (v === "") {
      return X_NodeType_STRING;
    }
    if (!v) {
      return 0;
    }
    if (v === window) {
      return X_NodeType_WINDOW;
    }
    if (v === document) {
      return X_NodeType_DOCUMENT;
    }
    if (v.constructor === Node) {
      return X_NodeType_XNODE;
    }
    if (v.constructor === X_NodeList) {
      return X_NodeType_XNODE_LIST;
    }
    if (X_Type_isHTMLElement(v)) {
      return X_NodeType_RAW_HTML;
    }
    if (v.nodeType === 3) {
      return X_NodeType_RAW_TEXT;
    }
    if (X_Type_isString(v)) {
      return "<" === v.charAt(0) && v.charAt(v.length - 1) === ">" ? X_NodeType_HTML_STRING : X_NodeType_STRING;
    }
    if (v["instanceOf"] && v["instanceOf"](Node)) {
      return X_NodeType_XNODE;
    }
    return 0;
  }
  function X_Node_getXNode(v) {
    var uid, i, chashe, xnode;
    switch(X_Node_getType(v)) {
      case X_NodeType_XNODE:
      case X_NodeType_XNODE_LIST:
        return v;
      case X_NodeType_RAW_HTML:
        if (X_UA_DOM.IE4) {
          uid = v.getAttribute("UID");
          return uid && X_Node_CHASHE[uid];
        }
        return v["UID"] && X_Node_CHASHE[v["UID"]];
      case X_NodeType_WINDOW:
        return X_ViewPort;
      case X_NodeType_DOCUMENT:
        return X_ViewPort_document;
      case X_NodeType_RAW_TEXT:
        if (v["UID"]) {
          return X_Node_CHASHE[v["UID"]];
        }
        for (chashe = X_Node_CHASHE, i = chashe.length; i;) {
          if ((xnode = chashe[--i]) && xnode["_rawObject"] === v) {
            return xnode;
          }
        }
    }
  }
  function X_Node_getRoot(xnode) {
    return X_ViewPort_document;
  }
  var X_Node__ie4getRawNode = X_UA_DOM.IE4 && function(that) {
    return that["_rawObject"] || (that["_rawObject"] = document.all["ie4uid" + that["_uid"]] || that["_id"] && document.all[that["_id"]]);
  };
  function X_Node_toggleInTreeFlag(xnodes, flag) {
    var i = xnodes.length, xnode;
    for (; i;) {
      xnode = xnodes[--i];
      flag ? xnode["_flags"] |= X_NodeFlags_IN_TREE | X_NodeFlags_DIRTY_POSITION : xnode["_flags"] &= ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
      xnode["_xnodes"] && X_Node_toggleInTreeFlag(xnode["_xnodes"], flag);
    }
  }
  function X_Node_toggleInGPUFlag(gpuRoot, xnodes, flag) {
    var i = xnodes.length, xnode;
    if (flag) {
      for (; i;) {
        xnode = xnodes[--i];
        if (!xnode["_gpuParent"]) {
          xnode["_flags"] |= X_NodeFlags_GPU_CHILD;
          xnode["_gpuParent"] = gpuRoot;
          xnode["_xnodes"] && X_Node_toggleInTreeFlag(gpuRoot, xnode["_xnodes"], flag);
        }
      }
    } else {
      for (; i;) {
        xnode = xnodes[--i];
        if (xnode["_gpuParent"] === gpuRoot) {
          xnode["_flags"] &= ~X_NodeFlags_GPU_CHILD;
          delete xnode["_gpuParent"];
          xnode["_xnodes"] && X_Node_toggleInTreeFlag(gpuRoot, xnode["_xnodes"], flag);
        }
      }
    }
  }
  function X_Node_create(tag, opt_attrs, opt_css) {
    var xnode;
    if (!this["_tag"]) {
      return;
    }
    this["append"](xnode = X_Doc_create(tag, opt_attrs, opt_css));
    return xnode;
  }
  function X_Node_createAt(index, tag, opt_attrs, opt_css) {
    var xnode;
    if (!this["_tag"]) {
      return;
    }
    this["appendAt"](index, xnode = X_Doc_create(tag, opt_attrs, opt_css));
    return xnode;
  }
  function X_Node_createText(text) {
    var xnode;
    if (!this["_tag"]) {
      return;
    }
    this["append"](xnode = X_Doc_createText(text));
    return xnode;
  }
  function X_Node_createTextAt(index, text) {
    var xnode;
    if (!this["_tag"]) {
      return;
    }
    this["appendAt"](index, xnode = X_Doc_createText(text));
    return xnode;
  }
  function X_Node_createRange(a, b, c) {
    return X_TextRange(this, a, b, c);
  }
  function X_Node_clone(opt_clone_children) {
    var xnode, xnodes, i, l;
    if (this["_tag"]) {
      X_Node_newByTag = true;
      xnode = Node(this["_tag"], X_Object_copy(this["_attrs"]), X_Object_copy(this["_css"]))["attr"]({"id":this["_id"]})["className"](this["_className"]);
      if (this["_flags"] & X_NodeFlags_IS_SVG) {
        xnode["_flags"] |= X_NodeFlags_IS_SVG;
      }
      if (this["_flags"] & X_NodeFlags_IS_VML) {
        xnode["_flags"] |= X_NodeFlags_IS_VML;
      }
      if (opt_clone_children && (xnodes = this["_xnodes"]) && (l = xnodes.length)) {
        for (i = 0; i < l; ++i) {
          xnode["append"](xnodes[i]["clone"](true));
        }
      }
      return xnode;
    }
    X_Node_newByText = true;
    return Node(this["_text"]);
  }
  function X_Node_append(v) {
    var i, l, xnodes, frg;
    if (!this["_tag"]) {
      return;
    }
    if (1 < (l = arguments.length)) {
      for (i = 0; i < l; ++i) {
        this["append"](arguments[i]);
      }
      return this;
    }
    if (!(xnodes = this["_xnodes"])) {
      this["_xnodes"] = xnodes = [];
    }
    switch(X_Node_getType(v)) {
      case X_NodeType_RAW_HTML:
      case X_NodeType_RAW_TEXT:
        v = Node(v);
        break;
      case X_NodeType_HTML_STRING:
      case X_NodeType_STRING:
        return X_Node_append.apply(this, X_HtmlParser_parse(v, true));
      case X_NodeType_XNODE:
        if (v.parent === this && xnodes[xnodes.length - 1] === v) {
          return this;
        }
        v["remove"]();
        if (X_UA["IE"] < 5 && !v["_tag"] && (this["_flags"] & X_NodeFlags_IE4_FIXED) === 0) {
          this["_flags"] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
        }
        break;
      default:
        return this;
    }
    v.parent = this;
    xnodes[xnodes.length] = v;
    if (this["_flags"] & X_NodeFlags_IN_TREE) {
      v["_flags"] |= X_NodeFlags_IN_TREE;
      v["_xnodes"] && X_Node_toggleInTreeFlag(v["_xnodes"], true);
      X_Node_reserveUpdate();
    }
    if (this["_flags"] & X_NodeFlags_IS_SVG) {
      v["_flags"] |= X_NodeFlags_IS_SVG;
    }
    if (this["_flags"] & X_NodeFlags_IS_VML) {
      v["_flags"] |= X_NodeFlags_IS_VML;
    }
    return this;
  }
  function X_Node_appendAt(start, v) {
    var xnodes, l, i;
    if (!this["_tag"]) {
      return this;
    }
    l = arguments.length;
    if (!(xnodes = this["_xnodes"])) {
      xnodes = this["_xnodes"] = [];
    }
    if (xnodes.length <= start) {
      if (l === 2) {
        return this["append"](v);
      }
      for (i = 1; i < l; ++i) {
        this["append"](arguments[i]);
      }
      return this;
    }
    if (start < 0) {
      start = 0;
    }
    if (2 < l) {
      for (; l;) {
        this["appendAt"](start, arguments[--l]);
      }
      return this;
    }
    switch(X_Node_getType(v)) {
      case X_NodeType_RAW_HTML:
      case X_NodeType_RAW_TEXT:
        v = Node(v);
        break;
      case X_NodeType_HTML_STRING:
      case X_NodeType_STRING:
        v = X_HtmlParser_parse(v, true);
        for (i = v.length; i;) {
          this["appendAt"](start, v[--i]);
        }
        return this;
      case X_NodeType_XNODE:
        if (v.parent) {
          if (v.parent === this) {
            i = v["getOrder"]();
            if (i === start) {
              return this;
            }
            if (i < start) {
              --start;
            }
          }
          v["remove"]();
        }
        if (X_UA["IE"] < 5 && !v["_tag"] && (this["_flags"] & X_NodeFlags_IE4_FIXED) === 0) {
          this["_flags"] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
        }
        break;
      default:
        return this;
    }
    v.parent = this;
    this["_xnodes"].splice(start, 0, v);
    if (this["_flags"] & X_NodeFlags_IN_TREE) {
      v["_flags"] |= X_NodeFlags_IN_TREE;
      v["_xnodes"] && X_Node_toggleInTreeFlag(v["_xnodes"], true);
      X_Node_reserveUpdate();
    }
    if (this["_flags"] & X_NodeFlags_IS_SVG) {
      v["_flags"] |= X_NodeFlags_IS_SVG;
    }
    if (this["_flags"] & X_NodeFlags_IS_VML) {
      v["_flags"] |= X_NodeFlags_IS_VML;
    }
    return this;
  }
  function X_Node_appendTo(parent, opt_index) {
    switch(X_Node_getType(parent)) {
      case X_NodeType_RAW_HTML:
        parent = Node(parent);
        break;
      case X_NodeType_HTML_STRING:
        parent = X_HtmlParser_parse(parent, true);
        parent = parent[0] || parent;
      case X_NodeType_XNODE:
        break;
      default:
        return this;
    }
    X_Type_isFinite(opt_index) ? parent["appendAt"](opt_index, this) : parent["append"](this);
    return this;
  }
  function X_Node_prev(v) {
    var parent = this.parent, xnodes, i, l;
    if (v === undefined) {
      if (!parent) {
        return;
      }
      xnodes = parent["_xnodes"];
      i = xnodes.indexOf(this);
      return 0 < i ? xnodes[i - 1] : v;
    }
    if (!parent) {
      return this;
    }
    l = arguments.length;
    if (1 < l) {
      for (i = 0; l; ++i) {
        parent["appendAt"](this["getOrder"]() - i, arguments[--l]);
      }
      return this;
    }
    parent["appendAt"](this["getOrder"](), v);
    return this;
  }
  function X_Node_next(v) {
    var parent = this.parent, xnodes, i, l, start;
    if (v === undefined) {
      if (!parent) {
        return;
      }
      xnodes = parent["_xnodes"];
      i = xnodes.indexOf(this);
      return ++i < xnodes.length ? xnodes[i] : v;
    }
    if (!parent) {
      return this;
    }
    l = arguments.length;
    start = this["getOrder"]() + 1;
    if (parent["_xnodes"].length <= start) {
      for (i = 0; i < l; ++i) {
        parent["append"](arguments[i]);
      }
    } else {
      if (1 < l) {
        for (; l;) {
          parent["appendAt"](this["getOrder"]() + 1, arguments[--l]);
        }
      } else {
        parent["appendAt"](start, v);
      }
    }
    return this;
  }
  function X_Node_swap(v) {
    if (!this.parent) {
      return this;
    }
    return arguments.length === 1 ? this["prev"](v)["remove"]() : X_Node_prev.apply(this, arguments)["remove"]();
  }
  function X_Node_remove() {
    var parent = this.parent, elm;
    if (!parent) {
      return this;
    }
    if (this["_anime"] && this["_anime"].phase) {
      console.log("Animation \u4e2d\u306e REMOVE");
      X_NodeAnime_stopNow(this);
    }
    delete this.parent;
    parent["_xnodes"].splice(parent["_xnodes"].indexOf(this), 1);
    if (this["_flags"] & X_NodeFlags_IN_TREE) {
      this["_flags"] &= ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
      this["_xnodes"] && X_Node_toggleInTreeFlag(this["_xnodes"], false);
      if (X_UA_DOM.IE4) {
        if (elm = this["_rawObject"] || X_Node__ie4getRawNode(this)) {
          X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this;
          X_Node_reserveUpdate();
        } else {
          if (!this["_tag"] && (parent["_flags"] & X_NodeFlags_IE4_FIXED) === 0) {
            parent["_flags"] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
          }
        }
      } else {
        elm = this["_rawObject"];
        if (elm && elm.parentNode && elm.parentNode.tagName) {
          X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this;
          X_Node_reserveUpdate();
        }
      }
    } else {
      if (!X_UA_DOM.IE4) {
        elm = this["_rawObject"];
        if (elm && elm.parentNode && elm.parentNode.tagName) {
          X_Node_reserveRemoval[X_Node_reserveRemoval.length] = this;
          X_Node_reserveUpdate();
        }
      }
    }
    return this;
  }
  function X_Node_empty() {
    var xnodes = this["_xnodes"], i;
    if (xnodes && (i = xnodes.length)) {
      delete this["_xnodes"];
      for (; i;) {
        xnodes[--i]["kill"]();
      }
      xnodes.length = 0;
    }
    return this;
  }
  function X_Node_onKill(that) {
    var parent = that.parent, xnodes = that["_xnodes"], i, elm;
    if ((that["_flags"] & X_NodeFlags_EXIST) === 0) {
      return;
    }
    parent && parent["_xnodes"] && parent["_xnodes"].splice(parent["_xnodes"].indexOf(that), 1);
    if (xnodes && (i = xnodes.length)) {
      delete that["_xnodes"];
      for (; i;) {
        xnodes[--i]["kill"]();
      }
      xnodes.length = 0;
    }
    X_Node_CHASHE[that["_uid"]] = null;
    if (that["_anime"] && that["_anime"].phase) {
      console.log("Animation \u4e2d\u306e KILL");
      X_NodeAnime_stopNow(that);
    }
    elm = that["_rawObject"] || X_UA_DOM.IE4 && X_Node__ie4getRawNode(that);
    if (X_UA_DOM.IE4) {
      if (elm) {
        X_Node_reserveRemoval[X_Node_reserveRemoval.length] = elm;
        X_Node_reserveUpdate();
      } else {
        if (!that["_tag"] && (parent["_flags"] & X_NodeFlags_IE4_FIXED) === 0) {
          parent["_flags"] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
        }
      }
    } else {
      if (elm && elm.parentNode && elm.parentNode.tagName) {
        X_Node_reserveRemoval[X_Node_reserveRemoval.length] = elm;
        X_Node_reserveUpdate();
      }
    }
  }
  function X_Node_contains(v) {
    var xnodes;
    if (!v || !this["_tag"] || this === v) {
      return false;
    }
    xnodes = this["_xnodes"];
    if (!xnodes || !xnodes.length) {
      return false;
    }
    while (v = v["parent"]) {
      if (this === v) {
        return true;
      }
    }
    return false;
  }
  function X_Node_getChildAt(i) {
    var xnodes = this["_xnodes"];
    return xnodes && 0 <= i && i < xnodes.length && xnodes[i];
  }
  function X_Node_numChildren() {
    var xnodes = this["_xnodes"];
    return xnodes ? xnodes.length : 0;
  }
  function X_Node_firstChild() {
    return this["_xnodes"] && this["_xnodes"][0];
  }
  function X_Node_lastChild() {
    var xnodes = this["_xnodes"];
    return xnodes && xnodes[xnodes.length - 1];
  }
  function X_Node_getOrder() {
    var parent = this.parent;
    return this === X_Node_html ? 0 : parent ? parent["_xnodes"].indexOf(this) : -1;
  }
  function X_Node_className(v) {
    var node, _, __;
    if (v === undefined) {
      return this["_className"];
    }
    if (this["_className"] === v) {
      return this;
    }
    if (!v || !X_Type_isString(v)) {
      delete this["_className"];
    } else {
      _ = " ";
      __ = "  ";
      while (v.indexOf(__) !== -1) {
        v = v.split(__).join(_);
      }
      v.charAt(0) === _ && (v = v.substr(1));
      v.lastIndexOf(_) === 0 && (v = v.substr(0, v.length - 1));
      if (this["_className"] === v) {
        return this;
      }
      v ? this["_className"] = v : delete this["_className"];
    }
    this["_flags"] |= X_NodeFlags_DIRTY_CLASSNAME;
    this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
    return this;
  }
  function X_Node_addClass(v) {
    var names = v.split(" "), i = names.length, _class = this["_className"], name;
    v = "";
    for (; i;) {
      name = names[--i];
      if (!name) {
        continue;
      }
      !this["hasClass"](name) && (v += (v ? " " : "") + name);
    }
    return v ? this["className"]((_class ? _class + " " : "") + v) : this;
  }
  function X_Node_removeClass(v) {
    var _ = " ", _class = this["_className"], names = v.split(_), classNames, i, f, j;
    if (!_class) {
      return this;
    }
    for (classNames = _class.split(_), i = classNames.length; i;) {
      _class = classNames[--i];
      for (j = names.length; j;) {
        if (_class === names[--j]) {
          classNames.splice(i, 1);
          names.splice(j, 1);
          f = true;
          break;
        }
      }
    }
    return f ? this["className"](classNames.join(_)) : this;
  }
  function X_Node_toggleClass(v, opt_toggle) {
    var names, i, name;
    if (opt_toggle !== undefined) {
      return !opt_toggle ? this["removeClass"](v) : this["addClass"](v);
    }
    names = v.split(" ");
    for (i = names.length; i;) {
      name = names[--i];
      this["hasClass"](name) ? this["removeClass"](name) : this["addClass"](name);
    }
    return this;
  }
  function X_Node_hasClass(v) {
    var _ = " ", _class = this["_className"], i, name;
    if (_class === v) {
      return true;
    }
    if (!_class) {
      return false;
    }
    _class = _ + _class + _;
    if (_class.indexOf(_ + v + _) !== -1) {
      return true;
    }
    for (v = v.split(_), i = v.length; i;) {
      name = v[--i];
      if (name === "") {
        continue;
      }
      if (_class.indexOf(_ + name + _) === -1) {
        return false;
      }
    }
    return true;
  }
  function X_Node__html(html) {
    var _ = "", q = '"', xnodes, n, i, l;
    if (html !== undefined) {
      if (!this["_tag"]) {
        return this["text"](html);
      }
      this["empty"]();
      if (html += "") {
        X_Node_append.apply(this, X_HtmlParser_parse(html, true));
      }
      return this;
    }
    if (!this["_tag"]) {
      return this["_text"];
    }
    this["_flags"] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(this);
    html = !X_Node_outerXNode ? [] : ["<", this["_tag"], this["_id"] ? ' id="' + this["_id"] + q : _, this["_className"] ? ' class="' + this["_className"] + q : _, this["_flags"] & X_NodeFlags_OLD_ATTRTEXT ? X_Node_Attr_objToAttrText(this) : this["_attrText"], this["_cssText"] ? ' style="' + this["_cssText"] + q : _, ">"];
    n = html.length;
    if ((xnodes = this["_xnodes"]) && (l = xnodes.length)) {
      if (!X_Node_outerXNode) {
        X_Node_outerXNode = this;
      }
      for (i = 0; i < l; ++i) {
        html[n] = xnodes[i]["html"]();
        ++n;
      }
      if (X_Node_outerXNode === this) {
        X_Node_outerXNode = null;
      }
    }
    !X_Node_outerXNode || X_Dom_DTD_EMPTY[this["_tag"]] || (html[n] = "</" + this["_tag"] + ">");
    return html.join(_);
  }
  function X_Node_text(text) {
    var xnodes, texts, i, l;
    if (text !== undefined) {
      if (text === null) {
        text = "";
      }
      text += "";
      if (!this["_tag"]) {
        if (this["_text"] !== text) {
          text ? this["_text"] = text : delete this["_text"];
          this["_flags"] |= X_NodeFlags_DIRTY_CONTENT;
          this["_flags"] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        }
        return this;
      }
      if ((xnodes = this["_xnodes"]) && xnodes.length === 1 && !xnodes[0]["_tag"]) {
        xnodes[0]["text"](text);
        return this;
      }
      if (!text) {
        return this["empty"]();
      }
      this["empty"]()["createText"](text);
      return this;
    }
    if (this["_tag"]) {
      if ((xnodes = this["_xnodes"]) && (l = xnodes.length)) {
        for (texts = [], i = 0; i < l; ++i) {
          texts[i] = xnodes[i]["text"]();
        }
        return texts.join("");
      }
      return "";
    }
    return this["_text"];
  }
  function X_Node_call(name) {
    var args = arguments, l = args.length - 1, v, raw, parent, body, child, childX, childY, childW, childH, parentW, parentH, parentSX, parentSY, parentSW, parentSH, visibleX, visibleY, visibleW, visibleH, visiblePartX, visiblePartY, func, args, params, i;
    switch(name) {
      case "isSVG":
        return !!(this["_flags"] & X_NodeFlags_IS_SVG);
      case "isVML":
        return !!(this["_flags"] & X_NodeFlags_IS_VML);
      case "nodeType":
        return this["_tag"] ? 1 : 3;
      case "outerHTML":
        X_Node_outerXNode = X_Node_body;
        v = this["html"]();
        X_Node_outerXNode = null;
        return v;
      case "treeIsDirty":
        return !!X_Node_updateTimerID;
      case "fontSize":
        return this["_flags"] & X_NodeFlags_IN_TREE ? X_Node_CSS_getCharSize(this) : 0;
      case "inGPU":
        return !!(this["_flags"] & (X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED));
      case "isGPUChild":
        if (this["_flags"] & X_NodeFlags_IN_TREE) {
          parent = this;
          while (parent = parent.parent) {
            if (parent["_flags"] & (X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED)) {
              return true;
            }
          }
        }
        return false;
      case "containGPU":
        return false;
      case "canAnimateNow":
        return this["_flags"] & X_NodeFlags_IN_TREE && X_NodeAnime_detectWaitAnimation(this, true, true) === 6;
      case "animeState":
        return this["_anime"] ? this["_anime"].phase : 0;
      case "animeProgress":
        return this["_anime"] && this["_anime"].phase === 7 ? this["_anime"].progress : 0;
    }
    X_Node_updateTimerID && X_Node_startUpdate();
    raw = this["_rawObject"] || X_UA_DOM.IE4 && X_Node__ie4getRawNode(this);
    if (!raw) {
      return;
    }
    if (name === "scrollTo") {
      raw.scrollLeft = args[1] || 0;
      raw.scrollTop = args[2] || 0;
      return;
    }
    if (name === "inView") {
      if (!(this["_flags"] & X_NodeFlags_IN_TREE)) {
        return {"isInView":false};
      }
      body = X_elmBody;
      child = raw;
      visibleX = visibleY = visibleW = visibleH = 0;
      while (child !== body) {
        parent = child.parentNode || child.parentElement;
        parentH = parent.clientHeight;
        parentW = parent.clientWidth;
        parentSW = parent.scrollHeight;
        parentSH = parent.scrollWidth;
        if (parentH < parentSH || parentW < parentSW) {
          childX = child.offsetLeft + visibleX;
          childY = child.offsetTop + visibleY;
          childW = visibleW || child.offsetWidth;
          childH = visibleH || child.offsetHeight;
          parentSX = parent.scrollLeft;
          parentSY = parent.scrollTop;
          if (parentSY < childY + childH && childY < parentSY + parentH && parentSX < childX + childW && childX < parentSX + parentW) {
            visiblePartX = childX < parentSX ? "right" : parentSX + parentW < childX + childW ? "left" : "both";
            visiblePartY = childY < parentSY ? "bottom" : parentSY + parentH < childY + childH ? "top" : "both";
            visibleX = visiblePartX === "right" ? 0 : childX - parentSX;
            visibleY = visiblePartX === "bottom" ? 0 : childY - parentSY;
            visibleW = visiblePartX === "both" ? childW : visiblePartX === "right" ? parentSX + parentW - childX : childX + childW - parentSX;
            visibleH = visiblePartY === "both" ? childH : visiblePartY === "bottom" ? parentSY + parentH - childY : childY + childH - parentSY;
          } else {
            return {"isInView":false};
          }
        }
        child = parent;
      }
      return {"isInView":true};
    }
    func = raw[name];
    if (X_Type_isFunction(func)) {
      if (l) {
        args = X_Array_copy(args);
        args.shift();
        return func.apply(raw, args);
      }
      return raw[name]();
    } else {
      if (X_UA["IE"] < 9 && (X_Type_isUnknown(func) || X_Type_isObject(func))) {
        if (l) {
          args = X_Array_copy(args);
          args.shift();
          params = [];
          for (i = 0; i < l; ++i) {
            params[i] = "_" + i;
          }
          params = params.join(",");
          return Function(params, ["return this.", name, "(", params, ")"].join("")).apply(raw, args);
        }
        return raw[name]();
      }
    }
  }
  function X_Node_each(func) {
    var args;
    if (1 < arguments.length) {
      args = X_Array_copy(arguments);
      args[0] = 0;
      func.apply(this, args);
    } else {
      func.call(this, 0);
    }
    return this;
  }
  function X_Node_reserveUpdate() {
    if (!X_Node_updateTimerID) {
      X_Node_updateTimerID = X_Timer_requestFrame(X_Node_startUpdate);
    }
  }
  var X_Node_updateReservedByReleaseGPU = false;
  function X_Node_startUpdate(time) {
    var removal, i, xnodeOrElm, xnodesIEFilterFixAfter, xnode, active;
    if (!X_Node_updateTimerID || X_ViewPort_readyState < X_EVENT_INIT) {
      return;
    }
    X_Timer_cancelFrame(X_Node_updateTimerID);
    X_Node_updateTimerID = 0;
    if (time) {
      X_System["_listeners"] && X_System["_listeners"][X_EVENT_BEFORE_UPDATE] && X_System["dispatch"](X_EVENT_BEFORE_UPDATE);
    }
    removal = X_Node_reserveRemoval;
    if (i = removal.length) {
      for (; i;) {
        xnodeOrElm = removal[--i];
        if (!xnodeOrElm["instanceOf"]) {
          if (X_UA_DOM.IE4) {
            xnodeOrElm.removeAttribute("id");
            xnodeOrElm.outerHTML = "";
          } else {
            if (!X_UA["MacIE"]) {
              xnodeOrElm.parentNode && xnodeOrElm.parentNode.tagName && xnodeOrElm.parentNode.removeChild(xnodeOrElm);
            } else {
              xnodeOrElm.parentNode && xnodeOrElm.parentNode.tagName && X_TEMP._fixed_remove(xnodeOrElm);
            }
          }
        } else {
          X_Node__actualRemove(xnodeOrElm);
        }
      }
      removal.length = 0;
    }
    if (5 <= X_UA["IE"] && X_UA["IE"] < 5.5) {
      active = FocusUtility_getFocusedElement();
      X_elmBody.style.visibility = "hidden";
    }
    if (X_Node_html["_flags"] & X_Node_BitMask_IS_DIRTY) {
      X_Node__commitUpdate(X_Node_html, X_Node_html["_rawObject"].parentNode, null, X_Node_html["_flags"], 1, xnodesIEFilterFixAfter = []);
    } else {
      X_Node__commitUpdate(X_Node_head, X_Node_head["_rawObject"].parentNode, null, X_Node_head["_flags"], 1, xnodesIEFilterFixAfter = []);
      X_Node__commitUpdate(X_Node_body, X_Node_body["_rawObject"].parentNode, null, X_Node_body["_flags"], 1, xnodesIEFilterFixAfter = []);
    }
    if (5 <= X_UA["IE"] && X_UA["IE"] < 5.5) {
      X_elmBody.style.visibility = "";
      active && active.parentNode && FocusUtility_setTemporarilyFocus(active);
    }
    if (X_Node_updateReservedByReleaseGPU) {
      X_Node_reserveUpdate();
      X_Node_updateReservedByReleaseGPU = false;
    }
    if (X_NodeFlags_IE_FILTER_FIX_AFTER && xnodesIEFilterFixAfter.length) {
      for (i = 0; xnode = xnodesIEFilterFixAfter[i]; ++i) {
        xnode["_flags"] &= ~X_NodeFlags_IE_FILTER_FIX_AFTER;
        X_Node_CSS_onAfterUpdateIEFilterFix(xnode);
      }
    }
    X_System["_listeners"] && X_System["_listeners"][X_EVENT_UPDATED] && X_System[time ? "dispatch" : "asyncDispatch"](X_EVENT_UPDATED);
    X_ViewPort["_listeners"] && X_ViewPort["_listeners"][X_EVENT_AFTER_UPDATE] && X_ViewPort["asyncDispatch"](X_EVENT_AFTER_UPDATE);
  }
  var X_Node__commitUpdate = X_UA_DOM.W3C ? function(that, parentElement, nextElement, accumulatedFlags, ie8AccumulatedOpcity, xnodesIEFilterFixAfter) {
    var elm = that["_rawObject"], created, xnodes, l, next, anime, v, currentOpcity;
    if (that["_flags"] & X_NodeFlags_GPU_NOW) {
      console.log("\u66f4\u65b0\u306eskip " + that["_className"] + !!(that["_flags"] & X_Node_BitMask_IS_DIRTY));
      that["_flags"] & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode(that, elm);
      return elm;
    }
    if (that["_flags"] & X_NodeFlags_GPU_RELEASE_RESERVED) {
      console.log("GPU \u89e3\u653e ");
      that["_flags"] &= X_Node_BitMask_RESET_GPU;
    }
    if (that["_flags"] & X_NodeFlags_GPU_RESERVED) {
      that["_flags"] &= X_Node_BitMask_RESET_GPU;
      that["_flags"] |= X_NodeFlags_GPU_NOW;
    }
    if (that["_flags"] & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
      if (X_Node_displayNoneFixForIE5) {
        if (elm && elm.parentNode) {
          X_Node__actualRemove(that);
        }
        return nextElement;
      }
      elm && (elm.style.display = "none");
      return elm && elm.nextSibling === nextElement ? elm : nextElement;
    }
    accumulatedFlags |= that["_flags"];
    if (that["_flags"] & X_NodeFlags_IE5_DISPLAY_NONE_FIX) {
      if ((accumulatedFlags & (X_NodeFlags_DIRTY_POSITION | X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME)) === 0) {
        return nextElement;
      }
    }
    if (!elm) {
      if (!that["_tag"]) {
        that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
        if (X_UA["IE"] < 8) {
          elm = document.createTextNode(X_String_chrReferanceTo(that["_text"]).split("\n").join(X_String_CRLF));
        } else {
          elm = document.createTextNode(X_String_chrReferanceTo(that["_text"]));
        }
        if (!X_UA["IE"]) {
          elm["UID"] = that["_uid"];
        }
      } else {
        if (X_Node_strictElmCreation) {
          that["_flags"] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(that, true);
          elm = document.createElement(["<", that["_tag"], ' UID="', that["_uid"], '"', that["_id"] ? ' id="' + that["_id"] + '"' : "", that["_className"] ? ' class="' + that["_className"] + '"' : "", X_Node_Attr_objToAttrText(that, true), that["_cssText"] ? ' style="' + that["_cssText"] + '"' : "", ">"].join(""));
        } else {
          if (that["_flags"] & X_NodeFlags_IS_SVG) {
            elm = document.createElementNS("http://www.w3.org/2000/svg", that["_tag"].toLowerCase());
          } else {
            elm = document.createElement(that["_tag"]);
          }
        }
      }
      that["_rawObject"] = elm;
      if (!X_Node_addTreeAfterChildren) {
        nextElement ? parentElement.insertBefore(elm, nextElement) : parentElement.appendChild(elm);
      }
      if (that["_tag"]) {
        X_EventDispatcher_toggleAllEvents(that, true);
        that["_flags"] |= X_NodeFlags_ACTUAL_LISTENING;
        if (X_Node_strictElmCreation) {
          that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
          that["_newAttrs"] && (that["_flags"] |= X_NodeFlags_DIRTY_ATTR);
          that["_flags"] |= X_NodeFlags_DIRTY_IE_FILTER;
        } else {
          elm["UID"] = that["_uid"];
          that["_newAttrs"] = that["_attrs"];
          that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
          that["_flags"] |= X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER;
          if (X_UA["Gecko"]) {
            if (that["_tag"] === "IFRAME" && (!that["_attrs"] || !that["_attrs"]["src"])) {
              that["attr"]("src", "about:blank");
            }
          }
        }
      }
      created = true;
    } else {
      if (elm.parentNode !== parentElement || nextElement && elm.nextSibling !== nextElement) {
        nextElement ? parentElement.insertBefore(elm, nextElement) : parentElement.appendChild(elm);
      }
    }
    if (that["_listeners"] && (that["_flags"] & X_NodeFlags_ACTUAL_LISTENING) === 0) {
      X_EventDispatcher_toggleAllEvents(that, true);
      that["_flags"] |= X_NodeFlags_ACTUAL_LISTENING;
    }
    currentOpcity = that["_css"] && 0 <= that["_css"].opacity && that["_css"].opacity;
    ie8AccumulatedOpcity = ie8AccumulatedOpcity * (currentOpcity || 1);
    if (accumulatedFlags & X_Node_BitMask_IS_DIRTY) {
      delete that["_fontSize"];
      X_Node__updateRawNode(that, elm, currentOpcity, ie8AccumulatedOpcity, accumulatedFlags);
    }
    if (X_Node_displayNoneFixForIE5 && that["_tag"]) {
      if (elm.runtimeStyle.display === "none") {
        X_Node__actualRemove(that);
        that["_flags"] |= X_NodeFlags_IE5_DISPLAY_NONE_FIX;
        return nextElement;
      } else {
        that["_flags"] &= ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
      }
    }
    if (that["_flags"] & X_NodeFlags_IE_FILTER_FIX_AFTER) {
      xnodesIEFilterFixAfter[xnodesIEFilterFixAfter.length] = that;
    }
    if ((xnodes = that["_xnodes"]) && (l = xnodes.length)) {
      for (; l;) {
        next = X_Node__commitUpdate(xnodes[--l], elm, next, accumulatedFlags, ie8AccumulatedOpcity, xnodesIEFilterFixAfter);
      }
    }
    if (created && X_Node_addTreeAfterChildren) {
      nextElement ? parentElement.insertBefore(elm, nextElement) : parentElement.appendChild(elm);
      if (X_UA["Gecko"] && that["_tag"] === "IFRAME" && elm.contentWindow) {
        elm.contentWindow.location.replace = elm.src;
      }
    }
    return elm;
  } : X_UA_DOM.IE4 ? function(that, parentElement, prevElement, accumulatedFlags) {
    var elm = that["_rawObject"] || X_Node__ie4getRawNode(that), xnodes, l, i, dirty, mix, html, text, prev, anime, v;
    if (!that["_tag"]) {
      that["_flags"] & X_NodeFlags_DIRTY_CONTENT && X_Node__updateRawNode(that, elm);
      return elm;
    }
    if (that["_flags"] & X_NodeFlags_STYLE_IS_DISPLAY_NONE) {
      if (elm) {
        elm.style.display = "none";
        if (elm.style.display !== "none") {
          X_Node__actualRemove(that);
          return prevElement;
        }
      }
      return elm || prevElement;
    }
    if (!elm) {
      prevElement ? prevElement.insertAdjacentHTML("AfterEnd", X_Node__actualCreate(that, false)) : parentElement.insertAdjacentHTML("AfterBegin", X_Node__actualCreate(that, false));
      X_Node__afterActualCreate(that);
      elm = that["_rawObject"] || X_Node__ie4getRawNode(that);
    } else {
      accumulatedFlags |= that["_flags"];
      xnodes = that["_xnodes"];
      l = xnodes ? xnodes.length : 0;
      dirty = !!(that["_flags"] & X_NodeFlags_IE4_DIRTY_CHILDREN);
      if (dirty) {
        that["_flags"] &= ~X_NodeFlags_IE4_DIRTY_CHILDREN;
        for (i = 0; i < l; ++i) {
          if (xnodes[i]["_tag"]) {
            that["_flags"] |= X_NodeFlags_IE4_HAS_ELEMENT;
          } else {
            that["_flags"] |= X_NodeFlags_IE4_HAS_TEXTNODE;
          }
          if (that["_flags"] & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX) {
            mix = true;
            break;
          }
        }
      }
      if (that["_flags"] & X_NodeFlags_IE4_FIXED || that["_flags"] & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_ELEMENT) {
        for (i = 0; i < l; ++i) {
          prev = X_Node__commitUpdate(xnodes[i], elm, prev, accumulatedFlags);
        }
      } else {
        if (mix) {
          html = [];
          for (i = 0; i < l; ++i) {
            html[i] = X_Node__actualCreate(xnodes[i], false);
          }
          elm.innerHTML = html.join("");
          for (i = 0; i < l; ++i) {
            X_Node__afterActualCreate(xnodes[i]);
          }
          that["_flags"] |= X_NodeFlags_IE4_FIXED;
        } else {
          if (that["_flags"] & X_NodeFlags_IE4_HAS_TEXTNODE) {
            dirty = dirty || false;
            for (i = 0; i < l; ++i) {
              text = xnodes[i];
              if (text["_flags"] & X_Node_BitMask_IS_DIRTY) {
                text["_flags"] &= X_Node_BitMask_RESET_DIRTY;
                dirty = true;
              }
            }
            if (dirty) {
              elm.innerHTML = that["text"]();
            }
          }
        }
      }
      if (accumulatedFlags & X_Node_BitMask_IS_DIRTY) {
        delete that["_fontSize"];
      }
      that["_flags"] &= ~X_NodeFlags_DIRTY_POSITION;
      that["_flags"] & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode(that, elm);
    }
    if ((anime = that["_anime"]) && 6 <= anime.phase && anime.doScroll) {
      if (anime.phase === 6) {
        v = anime.fromScrollX;
        if (v === v) {
          elm.scrollLeft = v;
        } else {
          anime.fromScrollX = elm.scrollLeft;
        }
        v = anime.fromScrollY;
        if (v === v) {
          elm.scrollTop = v;
        } else {
          anime.fromScrollY = elm.scrollTop;
        }
      } else {
        elm.scrollLeft = anime.scrollX;
        elm.scrollTop = anime.scrollY;
      }
    }
    return elm;
  } : function() {
  };
  var X_Node__updateRawNode = X_UA_DOM.W3C ? function(that, elm, currentOpcity, ie8AccumulatedOpcity, accumulatedFlags) {
    var attrs, rename, k, v, f;
    if (!that["_tag"]) {
      if (X_UA["IE"] < 8) {
        elm.data = X_String_chrReferanceTo(that["_text"]).split("\n").join(X_String_CRLF);
      } else {
        elm.data = X_String_chrReferanceTo(that["_text"]);
      }
      that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
      return;
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_ID) {
      that["_id"] ? that["_flags"] & X_NodeFlags_IS_SVG ? elm.setAttribute("id", that["_id"]) : elm.id = that["_id"] : elm.id && elm.removeAttribute("id");
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_CLASSNAME) {
      that["_className"] ? that["_flags"] & X_NodeFlags_IS_SVG ? elm.setAttribute("class", that["_className"]) : elm.className = that["_className"] : elm.className && elm.removeAttribute(X_UA["IE"] < 8 ? "className" : "class");
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_ATTR && (attrs = that["_newAttrs"] || that["_attrs"])) {
      rename = X_Node_Attr_renameForDOM;
      for (k in attrs) {
        v = attrs[k];
        switch(that["_tag"] + k) {
          case "TEXTAREAvalue":
            if (!X_UA["MacIE"] && 5 <= X_UA["IE"] && X_UA["IE"] < 5 || X_UA["ieExeComError"] && 6 <= X_UA["IE"] && X_UA["IE"] < 7) {
              elm.firstChild ? elm.firstChild.data = v || "" : elm.appendChild(document.createTextNode(v || ""));
              continue;
            }
            break;
          case "IFRAMEsrc":
            if (X_UA["Gecko"] && elm.contentWindow) {
              elm.contentWindow.location.replace = elm.src = v || "";
              continue;
            }
            break;
          case "IFRAMEname":
        }
        v === undefined ? elm.removeAttribute(rename[k] || k) : that["_flags"] & X_NodeFlags_IS_SVG ? elm.setAttribute(k, v) : elm[rename[k] || k] = X_Node_Attr_noValue[k] ? k : v;
      }
      delete that["_newAttrs"];
    }
    if (accumulatedFlags & X_NodeFlags_IE8_OPACITY_FIX) {
      if (0 <= currentOpcity) {
        f = true;
        that["_css"].opacity = ie8AccumulatedOpcity;
        if (that["_flags"] & X_NodeFlags_DIRTY_CSS) {
          that["_flags"] |= X_NodeFlags_OLD_CSSTEXT;
        } else {
          if (!(that["_flags"] & X_NodeFlags_DIRTY_IE_FILTER)) {
            that["_flags"] |= X_NodeFlags_DIRTY_IE_FILTER;
          }
        }
      }
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_CSS) {
      if (that["_flags"] & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText(that) : that["_cssText"]) {
        X_UA["Opera"] < 9 || X_UA["Gecko"] < 1 ? elm.setAttribute("style", that["_cssText"]) : elm.style.cssText = that["_cssText"];
      } else {
        if (X_UA["IE"] < 6 || X_UA["WebKit"] < 528) {
          elm.style.cssText = "";
        } else {
          elm.removeAttribute("style");
        }
      }
    } else {
      if (that["_flags"] & X_NodeFlags_DIRTY_IE_FILTER) {
        v = X_Node_CSS_objToIEFilterText(that);
        if (v) {
          elm.style.filter = v;
          that["_flags"] |= X_NodeFlags_IE_FILTER_NOW;
        } else {
          elm.style.removeAttribute("filter");
          that["_flags"] &= ~X_NodeFlags_IE_FILTER_NOW;
        }
      }
    }
    if (f) {
      that["_css"].opacity = currentOpcity;
    }
    that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
  } : X_UA_DOM.IE4 ? function(that, elm) {
    var attrs, rename, k, v;
    if (!that["_tag"]) {
      elm.innerText = that["_text"];
      that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
      return;
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_ID) {
      elm.setAttribute("id", that["_id"] || "ie4uid" + that["_uid"]);
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_CLASSNAME) {
      that["_className"] ? elm.className = that["_className"] : elm.removeAttribute("class");
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_CSS) {
      if (that["_flags"] & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText(that) : that["_cssText"]) {
        elm.style.cssText = that["_cssText"];
      } else {
        elm.style.cssText = "";
        elm.removeAttribute("style");
      }
    } else {
      if (that["_flags"] & X_NodeFlags_DIRTY_IE_FILTER) {
        v = X_Node_CSS_objToIEFilterText(that);
        if (v) {
          elm.style.filter = v;
          that["_flags"] |= X_NodeFlags_IE_FILTER_NOW;
        } else {
          elm.style.removeAttribute("filter");
          that["_flags"] &= ~X_NodeFlags_IE_FILTER_NOW;
        }
      }
    }
    if (that["_flags"] & X_NodeFlags_DIRTY_ATTR && (attrs = that["_newAttrs"] || that["_attrs"])) {
      rename = X_Node_Attr_renameForDOM;
      for (k in attrs) {
        (v = attrs[k]) === undefined ? elm.removeAttribute(rename[k] || k) : elm.setAttribute(rename[k] || k, X_Node_Attr_noValue[k] ? k : v);
      }
      delete that["_newAttrs"];
    }
    that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
  } : function() {
  };
  var X_Node__actualCreate = X_UA_DOM.IE4 && function(that, isChild) {
    var uid = that["_uid"], html, xnodes, n, i, l;
    if (!that["_tag"]) {
      html = ["<FONT id=ie4uid", uid, ' UID="', uid, '">', that["_text"], "</FONT>"];
      delete that["_rawObject"];
    } else {
      if (!isChild) {
        X_Node__actualRemove(that, false);
      }
      that["_flags"] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText(that, true);
      html = ["<", that["_tag"], " id=", that["_id"] || "ie4uid" + uid, ' UID="', uid, '"', that["_className"] ? ' class="' + that["_className"] + '"' : "", X_Node_Attr_objToAttrText(that, true), that["_cssText"] ? ' style="' + that["_cssText"] + '"' : "", ">"];
      n = html.length;
      if ((xnodes = that["_xnodes"]) && (l = xnodes.length)) {
        that["_flags"] &= ~X_NodeFlags_IE4_DIRTY_CHILDREN;
        for (i = 0; i < l; ++i) {
          if (xnodes[i]["_tag"]) {
            that["_flags"] |= X_NodeFlags_IE4_HAS_ELEMENT;
          } else {
            that["_flags"] |= X_NodeFlags_IE4_HAS_TEXTNODE;
          }
          if (that["_flags"] & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX) {
            break;
          }
        }
        if (that["_flags"] & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_TEXTNODE) {
          html[n] = that["text"]();
          ++n;
        } else {
          for (i = 0; i < l; ++i) {
            html[n] = X_Node__actualCreate(xnodes[i], true);
            ++n;
          }
          that["_flags"] |= X_NodeFlags_IE4_FIXED;
        }
      }
      X_Dom_DTD_EMPTY[that["_tag"]] || (html[n] = "</" + that["_tag"] + ">");
      that["_newAttrs"] && (that["_flags"] |= X_NodeFlags_DIRTY_ATTR);
    }
    return html.join("");
  };
  var X_Node__afterActualCreate = X_UA_DOM.IE4 && function(that) {
    var xnodes, i, v;
    if (!that["_tag"]) {
      return that;
    }
    if ((xnodes = that["_xnodes"]) && (i = xnodes.length)) {
      for (; i;) {
        X_Node__afterActualCreate(xnodes[--i]);
      }
    }
    if (that["_flags"] & (X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_IE_FILTER)) {
      X_Node__updateRawNode(that, that["_rawObject"] || X_Node__ie4getRawNode(that));
    } else {
      that["_flags"] &= X_Node_BitMask_RESET_DIRTY;
    }
    X_EventDispatcher_toggleAllEvents(that, true);
  };
  var X_Node__actualRemove = X_UA_DOM.W3C ? function(that, isChild) {
    var xnodes = that["_xnodes"], elm = that["_rawObject"], child, i, l;
    if (xnodes && (l = xnodes.length)) {
      for (i = 0; i < l; ++i) {
        child = xnodes[i];
        child["_tag"] && X_Node__actualRemove(child, true);
      }
    }
    if (!elm) {
      return;
    }
    if (that["_flags"] & X_NodeFlags_ACTUAL_LISTENING) {
      that["_listeners"] && X_EventDispatcher_toggleAllEvents(that, false);
      that["_flags"] &= ~X_NodeFlags_ACTUAL_LISTENING;
    }
    if (X_Node_displayNoneFixForIE5) {
      if (elm.filters && elm.filters.length) {
        isChild = false;
        delete that["_rawObject"];
        if (X_Node_Attr_HAS_VALUE[that["_tag"]] && (!that["_newAttrs"] || !X_Object_inObject("value", that["_newAttrs"]))) {
          if (!that["_attrs"]) {
            that["_attrs"] = {};
          }
          that["_attrs"].value = elm.value;
        }
        if (that["_tag"] === "OPTION" && (!that["_newAttrs"] || !X_Object_inObject("selected", that["_newAttrs"]))) {
          if (!that["_attrs"]) {
            that["_attrs"] = {};
          }
          that["_attrs"].selected = elm.selected;
        }
        if (that["_tag"] === "SELECT" && (!that["_newAttrs"] || !X_Object_inObject("selectedIndex", that["_newAttrs"]))) {
          if (!that["_attrs"]) {
            that["_attrs"] = {};
          }
          that["_attrs"].selectedIndex = elm.selectedIndex;
          that["_attrs"].value = elm.value;
        }
        if (that["_tag"] === "INPUT" && that["_attrs"] && (that["_attrs"].type === "checkbox" || that["_attrs"].type === "radio") && (!that["_newAttrs"] || !X_Object_inObject("checked", that["_newAttrs"]))) {
          if (!that["_attrs"]) {
            that["_attrs"] = {};
          }
          that["_attrs"].checked = elm.checked;
        }
        elm.innerHTML = "";
      }
    }
    if (!X_UA["MacIE"]) {
      !isChild && elm.parentNode && elm.parentNode.tagName && elm.parentNode.removeChild(elm);
    } else {
      !isChild && elm.parentNode && elm.parentNode.tagName && X_TEMP._fixed_remove(elm);
    }
  } : X_UA_DOM.IE4 ? function(that, isChild) {
    var xnodes = that["_xnodes"], elm = that["_rawObject"] || X_Node__ie4getRawNode(that), i, l, xnode;
    if (xnodes && (l = xnodes.length)) {
      for (i = 0; i < l; ++i) {
        X_Node__actualRemove(xnodes[i], true);
      }
    }
    if (!elm) {
      return;
    }
    that["_listeners"] && X_EventDispatcher_toggleAllEvents(that, false);
    if (X_Node_Attr_HAS_VALUE[that["_tag"]] && (!that["_newAttrs"] || !X_Object_inObject("value", that["_newAttrs"]))) {
      if (!that["_attrs"]) {
        that["_attrs"] = {};
      }
      that["_attrs"].value = elm.value;
    }
    if (that["_tag"] === "OPTION" && (!that["_newAttrs"] || !X_Object_inObject("selected", that["_newAttrs"]))) {
      if (!that["_attrs"]) {
        that["_attrs"] = {};
      }
      that["_attrs"].selected = elm.selected;
    }
    if (that["_tag"] === "SELECT" && (!that["_newAttrs"] || !X_Object_inObject("selectedIndex", that["_newAttrs"]))) {
      if (!that["_attrs"]) {
        that["_attrs"] = {};
      }
      that["_attrs"].selectedIndex = elm.selectedIndex;
      that["_attrs"].value = elm.value;
    }
    if (that["_tag"] === "INPUT" && that["_attrs"] && (that["_attrs"].type === "checkbox" || that["_attrs"].type === "radio") && (!that["_newAttrs"] || !X_Object_inObject("checked", that["_newAttrs"]))) {
      if (!that["_attrs"]) {
        that["_attrs"] = {};
      }
      that["_attrs"].checked = elm.checked;
    }
    elm.removeAttribute("id");
    if (!isChild) {
      elm.outerHTML = "";
    }
    delete that["_rawObject"];
  } : function() {
  };
  X_ViewPort["listenOnce"](X_EVENT_UNLOAD, X_Node__actualRemove, [X_Node_html, true]);
  function XUI_collectHTMLElement(uinode) {
  }
  X_TEMP.X_Dom_useBuilder = true;
  X_TEMP._isCleanupTarget = function(elm) {
    var cname = " " + elm.className + " ", tag = (elm.tagName || "").toUpperCase();
    return cname.indexOf(" skip-cleanup ") === -1 && (X_Dom_DTD_CLEANUP_TAGS[tag] || cname.indexOf(" cleanup-target ") !== -1);
  };
  if (X_UA["MacIE"]) {
    X_TEMP._fixed_remove = function(node, xnode) {
      var parent = node.parentNode, l;
      node.nodeType !== 3 && alert(node.nodeType + "\n" + (node.outerHTML || node.data));
      if (node.nodeType === 1) {
        parent && parent.removeChild(node);
      } else {
        if (node.nodeType === 3) {
          l = X_TEMP._removalTextNodes.length;
          if (parent) {
            X_elmBody.appendChild(node);
            return;
          }
        } else {
        }
      }
    };
    X_TEMP._removalTextNodes = [];
    X_TEMP._timerRemove = function() {
      var nodes = X_TEMP._removalTextNodes, i = 0, node;
      while (i < 5 && nodes.length) {
        node = nodes.shift();
        if (node.parentNode) {
          ++i;
        }
      }
    };
  } else {
    if (X_UA["Opera"] < 8) {
      X_TEMP._fixed_remove = function(node) {
        if (node.nodeType === 1 || node.nodeType === 3) {
          node.parentNode && node.parentNode.removeChild(node);
        }
      };
    }
  }
  X_TEMP._onPreInit = X_UA_DOM.W3C ? function() {
    var r = X_Node_body, body = X_elmBody, copy, i, l, node, html, elmProgress;
    if (!X_TEMP.X_Dom_useBuilder) {
      return;
    }
    X_HTMLParser_skipFixNesting = true;
    function cleanUpTree(elm, skip) {
      var nodes = X_Array_copy(elm.childNodes), i = 0, l = nodes.length, node, tag, textNode, content;
      for (; i < l; ++i) {
        node = nodes[i];
        switch(node.nodeType) {
          case 1:
            tag = node.tagName.toUpperCase();
            if (X_Dom_DTD_MOVE_TO_HEAD[tag]) {
              X_elmHead.appendChild(node);
              continue;
            } else {
              if (X_TEMP._isCleanupTarget(node)) {
                elm.removeChild(node);
                continue;
              } else {
                node.childNodes && node.childNodes.length && cleanUpTree(node, skip || X_Dom_DTD_SKIP_CLEANUP_TAGS[tag]);
              }
            }
            textNode = null;
            break;
          case 3:
            content = skip ? node.data : X_String_cleanupWhiteSpace(node.data);
            if (!textNode && content !== " " && content.length) {
              node.data = content;
              textNode = node;
              break;
            } else {
              if (textNode) {
                textNode.data += content;
              }
            }
          default:
            if (!(X_UA["Opera"] < 8)) {
              elm.removeChild(node);
            } else {
              X_TEMP._fixed_remove(node);
            }
        }
      }
    }
    cleanUpTree(X_UA["MacIE"] ? copy = body.cloneNode(true) : body);
    if (X_UA["MacIE"]) {
      document.write(html = copy.innerHTML);
    } else {
      if (X_UA["IE"] <= 8) {
        html = body.innerHTML.split(X_String_CRLF).join("");
      } else {
        html = body.innerHTML;
      }
      if (html === "fastinnerhtml!") {
        html = "";
        for (i = 0, l = body.childNodes.length; i < l; ++i) {
          node = body.childNodes[i];
          html += node.outerHTML || node.data;
        }
      }
    }
    body.appendChild(X_TEMP.elmProgress = elmProgress = document.createElement("div"));
    elmProgress.style.cssText = "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;";
    elmProgress.setAttribute("style", "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;");
    X_HTMLParser_asyncParse(html, true)["listen"](X_EVENT_PROGRESS, X_TEMP._handleEvent)["listenOnce"](X_EVENT_SUCCESS, X_TEMP._handleEvent);
  } : function() {
    var r = X_Node_body, body = r["_rawObject"], elmProgress = "_xdom_builder_progress", html;
    if (!X_TEMP.X_Dom_useBuilder) {
      return;
    }
    html = body.innerHTML;
    body.insertAdjacentHTML("BeforeEnd", '<div id="' + elmProgress + '" style="position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;"></div>');
    X_TEMP.elmProgress = document.all[elmProgress];
    X_HTMLParser_asyncParse(html, true)["listen"](X_EVENT_PROGRESS, X_TEMP._handleEvent)["listenOnce"](X_EVENT_SUCCESS, X_TEMP._handleEvent);
  };
  X_ViewPort["listenOnce"](X_EVENT_PRE_INIT, X_TEMP._onPreInit);
  X_TEMP._handleEvent = function(e) {
    var elmProgress = X_TEMP.elmProgress, xnodes;
    switch(e.type) {
      case X_EVENT_PROGRESS:
        elmProgress.style.width = (e.percent * 100 | 0) + "%";
        break;
      case X_EVENT_SUCCESS:
        xnodes = X_Node_body["_xnodes"] = [];
        xnodes.push.apply(xnodes, e.xnodes);
        elmProgress.style.width = "100%";
        X_TEMP.asyncCreateTree(X_Node_body, X_elmBody.childNodes || X_elmBody.children, elmProgress);
        delete X_TEMP._onPreInit;
        delete X_TEMP.elmProgress;
        break;
    }
  };
  X_TEMP.asyncCreateTree = function(parent, elems, elmProgress, async) {
    var xnodes = async ? 0 : X_Array_copy(parent["_xnodes"]), l = async ? 0 : xnodes.length, stack = async ? async.stack : [], done = async ? async.done : 0, startTime = X_Timer_now(), current = async ? async.current : {me:parent, xnodes:xnodes, l:l, i:0, elems:X_Array_copy(elems), j:0, xtext:null, flag:0}, xnode, i, dive;
    while (current || (current = stack.pop())) {
      i = current.i;
      l = current.l;
      if (i < l) {
        parent = current.me;
        xnodes = current.xnodes;
        while (xnode = xnodes[i]) {
          dive = X_TEMP.bindElementToXnode(parent, xnode, current);
          ++i;
          ++done;
          if (dive) {
            current.i = i;
            stack[stack.length] = current;
            current = dive;
            i = 0;
            l = dive.l;
            parent = xnode;
            xnodes = dive.xnodes;
            continue;
          }
          if (startTime + X_Timer_INTERVAL_TIME <= X_Timer_now()) {
            current.i = i;
            if (async) {
              async.current = i < l && current;
              async.done = done;
            }
            X_Timer_once(0, X_TEMP.asyncCreateTree, [null, null, elmProgress, async || {stack:stack, current:i < l && current, done:done}]);
            elmProgress.style.width = ((1 - done / X_Node_CHASHE.length) * 100 | 0) + "%";
            return;
          }
        }
      }
      current = null;
    }
    console.log("xtree \u4f5c\u6210\u5b8c\u4e86");
    X_ViewPort["asyncDispatch"](X_EVENT_XTREE_READY);
    if (X_UA["IE"] < 6) {
      elmProgress.outerHTML = "";
    } else {
      elmProgress.parentNode.removeChild(elmProgress);
    }
    delete X_TEMP.asyncCreateTree;
    delete X_TEMP.bindElementToXnode;
    delete X_TEMP.X_Dom_useBuilder;
    delete X_TEMP._isCleanupTarget;
    X_HTMLParser_skipFixNesting = false;
  };
  X_TEMP.bindElementToXnode = X_UA_DOM.W3C ? function(parent, xnode, current) {
    var elems = current.elems, m = elems.length, xtext = current.xtext, skipCleanup = current.skipCleanup, inPreTag = current.inPreTag, elm, tag, text;
    xnode.parent = parent;
    for (; current.j < m; ++current.j) {
      elm = elems[current.j];
      tag = elm.tagName && elm.tagName.toUpperCase();
      if (elm.nodeType !== 1 && elm.nodeType !== 3 || tag === "!" || tag && tag.charAt(0) === "/") {
        if (!(X_UA["Opera"] < 8) && !X_UA["MacIE"]) {
          elm.parentNode.removeChild(elm);
        } else {
          X_TEMP._fixed_remove(elm);
        }
        continue;
      }
      if (xnode["_tag"]) {
        if (elm.nodeType === 3) {
          if (!(text = elm.data) || (text = X_String_cleanupWhiteSpace(text)) === " ") {
            if (!(X_UA["Opera"] < 8) && !X_UA["MacIE"]) {
              elm.parentNode.removeChild(elm);
            } else {
              X_TEMP._fixed_remove(elm);
            }
            continue;
          }
          alert("1:[" + parent["_tag"] + ">" + xnode["_tag"] + "] !== " + elm.nodeType + "\n" + elm.data);
        } else {
          if (X_Dom_DTD_MOVE_TO_HEAD[tag]) {
            alert(tag);
            continue;
          } else {
            if (xnode["_tag"] !== tag) {
              alert("2:[" + parent["_tag"] + ">" + xnode["_tag"] + " len:" + (xnode["_xnodes"] ? xnode["_xnodes"].length : "") + "] !== " + tag + " " + (elm.childNodes ? elm.childNodes.length : "") + "\n" + elm.outerHTML);
            } else {
              xnode["_rawObject"] = elm;
              if (tag.charAt(0) === "/") {
                tag = tag.slice(1);
              }
              xnode["_tag"] = tag;
              xnode["_flags"] |= X_NodeFlags_IN_TREE;
              xnode["_flags"] &= X_Node_BitMask_RESET_DIRTY;
              elm["UID"] = xnode["_uid"];
              current.xtext = null;
              if (tag === "TEXTAREA") {
                xnode["attr"]("value", xnode["html"]())["empty"]();
              } else {
                if (elm.childNodes && elm.childNodes.length) {
                  ++current.j;
                  return {me:xnode, xnodes:X_Array_copy(xnode["_xnodes"]), xtext:null, flag:0, i:0, l:xnode["_xnodes"].length, elems:X_Array_copy(elm.childNodes), j:0, skipCleanup:skipCleanup || X_Dom_DTD_SKIP_CLEANUP_TAGS[tag]};
                }
              }
            }
          }
        }
        ++current.j;
        break;
      }
      if (elm.nodeType !== 3) {
        if (!(text = xnode["_text"]) || (text = X_String_cleanupWhiteSpace(text)) === " ") {
          console.log("[" + parent["_tag"] + "> UID:" + xnode["_uid"] + " len:" + xnode["_text"].length + " code : " + xnode["_text"].charCodeAt(0) + "," + xnode["_text"].charCodeAt(1) + "] destroyed.");
          xnode["kill"]();
          break;
        }
        alert(parent["_tag"] + " > " + '"' + xnode["_text"] + '" !== ' + tag + "\n" + "prev : " + (xnode["prev"]() && xnode["prev"]()["html"]()) + "\n" + "next : " + (xnode["next"]() && xnode["next"]()["html"]()) + "\n" + "html : " + elm.outerHTML);
        break;
      }
      ++current.j;
      xnode["_rawObject"] = elm;
      xnode["_flags"] |= X_NodeFlags_IN_TREE;
      xnode["_flags"] &= X_Node_BitMask_RESET_DIRTY;
      xnode["_text"] = elm.data;
      if (!skipCleanup) {
        if (!(text = xnode["_text"]) || (text = X_String_cleanupWhiteSpace(text)) === " ") {
          console.log("[" + parent["_tag"] + ">" + xnode["_uid"] + "] destroy ... ");
          xnode["kill"]();
        }
        if (xtext) {
          xtext["text"](xtext["_text"] + text);
          console.log("[" + parent["_tag"] + ">" + xnode["_uid"] + "] xtext,destroy ... ");
          xnode["kill"]();
        } else {
          xnode["text"](text);
        }
      } else {
        if (xtext) {
          xtext["text"](xtext["_text"] + xnode["_text"]);
          console.log("[" + parent["_tag"] + ">" + xnode["_uid"] + "] xtext,destroy ... ");
          xnode["kill"]();
        }
      }
      current.xtext = xtext || xnode;
      break;
    }
  } : function(parent, xnode, current) {
    var elems = current.elems, j = current.j, m = elems.length, xtext = current.xtext, skipCleanup = current.skipCleanup, elm, tag, text;
    xnode.parent = parent;
    if (!xnode["_tag"]) {
      xnode["_flags"] |= X_NodeFlags_IN_TREE;
      xnode["_flags"] &= X_Node_BitMask_RESET_DIRTY;
      if (!skipCleanup) {
        if (!(text = xnode["_text"]) || (text = X_String_cleanupWhiteSpace(text)) === " ") {
          xnode["kill"]();
          xnode = null;
        } else {
          if (xtext) {
            xtext["text"](xtext["_text"] + text);
            xnode["kill"]();
          } else {
            xnode["text"](text);
          }
        }
      } else {
        if (xtext) {
          xtext["text"](xtext["_text"] + xnode["_text"]);
          xnode["kill"]();
        }
      }
      current.xtext = xtext || xnode;
      parent["_flags"] |= X_NodeFlags_IE4_HAS_TEXTNODE;
      return;
    }
    for (; j < m; ++j, ++current.j) {
      elm = elems[j];
      tag = elm.tagName;
      if (tag === "!" || tag.charAt(0) === "/") {
        continue;
      } else {
        if (xnode["_tag"] !== tag) {
          alert(xnode["_tag"] + " " + " !== " + tag + "\nxnode.html():" + xnode.attr("cite") + "\nelm.outerHTML:" + elm.outerHTML);
        } else {
          ++current.j;
          xnode["_rawObject"] = elm;
          xnode["_flags"] |= X_NodeFlags_IN_TREE;
          xnode["_flags"] &= X_Node_BitMask_RESET_DIRTY;
          if (X_TEMP._isCleanupTarget(elm)) {
            xnode["kill"]();
            break;
          }
          !xnode["_id"] && elm.setAttribute("id", "ie4uid" + xnode["_uid"]);
          elm.setAttribute("UID", xnode["_uid"]);
          tag === "INPUT" && (!xnode["_attrs"] ? xnode["_attrs"] = {type:"text"} : xnode["_attrs"].type || (xnode["_attrs"].type = "text"));
          parent["_flags"] |= X_NodeFlags_IE4_HAS_ELEMENT;
          current.xtext = null;
          if (tag === "TEXTAREA") {
            xnode["attr"]("value", xnode["html"]())["empty"]();
          } else {
            if (xnode["_xnodes"] && xnode["_xnodes"].length) {
              return {me:xnode, xnodes:X_Array_copy(xnode["_xnodes"]), xtext:null, flag:0, i:0, l:xnode["_xnodes"].length, elems:X_Array_copy(elm.children), j:0, skipCleanup:skipCleanup || X_Dom_DTD_SKIP_CLEANUP_TAGS[tag]};
            }
          }
          break;
        }
      }
    }
    if (!xnode["_rawObject"]) {
      alert(xnode["_tag"] + " " + xnode["_id"] + " !== none...");
    }
  };
  console.log("X.Dom.Builder");
  console.log("bootTime : " + (X_Timer_now() - X.bootTime));
  var X_TextRange_range, X_TextRange_selection, X_TextRange_isW3C = !document.selection || 9 <= X_UA["IE"] || X_UA["Edge"];
  var X_TextRange = X_Class_create("X.TextRange", {"xnode":null, "by":"", "v1":0, "v2":0, "Constructor":function(xnode, arg2, arg3, arg4) {
    if (!X_TextRange_range) {
      X_TextRange_range = X_TextRange_isW3C ? document.createRange() : X_elmBody.createTextRange();
    }
    this.xnode = xnode;
    switch(arg2) {
      case "selection":
        if (!X_TextRange_selection) {
          X_TextRange_selection = X_TextRange_isW3C ? window.getSelection() : document.selection.createRange;
        }
      case "point":
      case "char":
        this["by"] = arg2;
        break;
      default:
        arg4 = arg3;
        arg3 = arg2;
    }
    if (arg2 !== "selection") {
      this["v1"] = arg3 || 0;
      this["v2"] = arg4 || 0;
    } else {
      this["getOffset"]();
    }
  }, "move":X_TextRange_move, "select":X_TextRange_select, "getRect":X_TextRange_getRect, "getOffset":X_TextRange_getOffset, "text":X_TextRange_text});
  function X_TextRange_collectTextNodes(elm, ary) {
    var kids = elm.childNodes, i, e;
    if (!kids || !kids.length) {
      return;
    }
    for (i = 0; e = kids[i]; ++i) {
      switch(e.nodeType) {
        case 1:
          X_TextRange_collectTextNodes(e, ary);
          break;
        case 3:
          ary[ary.length] = e;
          break;
      }
    }
  }
  function X_TextRange_getRawRange(tr) {
    var xnode = tr.xnode, range = X_TextRange_range, selection = X_TextRange_selection, elm, isPoint, texts, i, offset, text, j, l, x, y, rect, top, btm, left;
    if (xnode["_flags"] & X_NodeFlags_IN_TREE) {
      X_Node_updateTimerID && X_Node_startUpdate();
      elm = xnode["_rawObject"];
      switch(tr["by"]) {
        case "selection":
          if (X_TextRange_isW3C) {
            if (selection.getRangeAt) {
              return selection.rangeCount && selection.getRangeAt(0);
            }
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.setEnd(selection.focusNode, selection.focusOffset);
            return range;
          } else {
            switch(document.selection.type) {
              case "text":
                return selection();
              case "Control":
              case "none":
            }
          }
          break;
        case "point":
          if (X_TextRange_isW3C) {
            X_TextRange_collectTextNodes(elm, texts = []);
            x = tr["v1"];
            y = tr["v2"];
            for (i = offset = 0; text = texts[i]; ++i) {
              range.selectNodeContents(text);
              l = text.data.length;
              for (j = 0; j < l; ++j) {
                if (X_UA["IE"] || X_UA["Edge"]) {
                  range.setEnd(text, j);
                  range.setStart(text, j);
                  rect = range.getBoundingClientRect();
                  top = rect.top;
                  btm = rect.bottom;
                  left = rect.left;
                  range.setEnd(text, j + 1);
                  rect = range.getBoundingClientRect();
                  if (rect.left < left) {
                    if (left <= x && x <= rect.right && top <= y && y <= btm) {
                      return {"hitRange":range, "rect":rect, "offset":offset, "text":text};
                    }
                    continue;
                  }
                } else {
                  range.setEnd(text, j + 1);
                  range.setStart(text, j);
                  rect = range.getBoundingClientRect();
                }
                if (rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
                  return {"hitRange":range, "rect":rect, "offset":offset, "text":text};
                }
              }
              offset += l;
            }
            range = null;
          } else {
            range.moveToPoint(x = tr["v1"], y = tr["v2"]);
            if (range.expand("character")) {
              left = range.boundingLeft;
              top = range.boundingTop;
              if (x < left || left + range.boundingWidth < x || y < top || top + range.boundingHeight < y) {
                range.moveStart("character", -1);
                range.moveEnd("character", -1);
                left = range.boundingLeft;
                top = range.boundingTop;
                if (x < left || left + range.boundingWidth < x || y < top || top + range.boundingHeight < y) {
                  range = null;
                }
              }
            } else {
              range = null;
            }
          }
          return range;
        case "char":
          if (X_TextRange_isW3C) {
            range.setEnd(elm, l < tr["v2"] ? l : tr["v2"]);
            range.setStart(elm, tr["v1"]);
            return {"hitRange":range};
          } else {
            range.moveToElementText(elm);
            range.moveEnd("character", l < tr["v2"] ? l : tr["v2"]);
            range.moveStart("character", tr["v1"]);
          }
          return range;
      }
    }
  }
  function X_TextRange_getRect() {
    var result = X_TextRange_getRawRange(this), rect, ret;
    if (result) {
      if (X_TextRange_isW3C) {
        if (result.hitRange) {
          rect = result.hitRange.getBoundingClientRect();
          ret = {"x":rect.left, "y":rect.top, "width":rect.width, "height":rect.height};
        }
      } else {
        ret = {"x":result.boundingLeft, "y":result.boundingTop, "width":result.boundingWidth, "height":result.boundingHeight};
      }
    }
    return ret || {"x":0, "y":0, "width":0, "height":0};
  }
  function X_TextRange_collectXTexts(xnode, ary) {
    var kids = xnode["_xnodes"], i;
    if (!kids || !kids.length) {
      return;
    }
    for (i = -1; xnode = kids[++i];) {
      if (xnode["_tag"]) {
        X_TextRange_collectXTexts(xnode, ary);
      } else {
        ary[ary.length] = xnode;
      }
    }
  }
  function X_TextRange_getOffset() {
    var xnode = this.xnode, elm, result, range, ret, from, xtexts, n, i, l, xtext;
    if (xnode["_tag"] === "TEXTAREA") {
      elm = xnode["_rawObject"];
      if (elm && xnode["_flags"] & X_NodeFlags_IN_TREE) {
        if (X_UA["IE"] < 9) {
          return cursorPosition.call(this, elm);
        } else {
          if (elm.setSelectionRange) {
            if (X_UA["IE"] < 12) {
              l = elm.value.length;
              ret = {"from":this["v1"] = elm.selectionStart < l ? elm.selectionStart : l, "to":this["v2"] = elm.selectionEnd < l ? elm.selectionEnd : l};
            } else {
              ret = {"from":this["v1"] = elm.selectionStart, "to":this["v2"] = elm.selectionEnd};
            }
          }
        }
      }
    } else {
      if (result = X_TextRange_getRawRange(this)) {
        if (X_TextRange_isW3C) {
          range = result.hitRange;
          ret = {"offset":result.offset, "from":this["v1"] = range.startOffset, "to":this["v2"] = range.endOffset, "text":X_Node_getXNode(result.text)};
        } else {
          range = X_TextRange_range.duplicate();
          range.moveToElementText(xnode["_rawObject"]);
          range.setEndPoint("EndToStart", result);
          from = range.text.length;
          X_TextRange_collectXTexts(xnode, xtexts = []);
          if (xtexts.length) {
            for (n = 0, i = -1; xtext = xtexts[++i];) {
              l = xtext["_rawObject"].data.length;
              if (from < n + l) {
                break;
              }
              n += l;
            }
            ret = {"offset":n, "from":this["v1"] = from - n, "to":this["v2"] = from - n + result.text.length, "text":xtext};
          }
        }
      }
    }
    return ret || {"from":-1, "to":-1};
  }
  function X_TextRange_text(v) {
    var xnode = this.xnode, elm, val, offset, from, to, range;
    if (v === undefined) {
    } else {
      if (xnode["_tag"] === "TEXTAREA") {
        elm = xnode["_rawObject"];
        val = X_UA["IE"] < 9 ? X_Node_Attr_getValueForIE(elm) : elm.value;
        if (this["by"] === "char") {
          xnode.attr({"value":val.substr(0, this["v1"]) + v + val.substr(this["v2"])});
        } else {
          offset = this["getOffset"]();
          from = offset["from"];
          to = offset["to"];
          if (X_UA["IE"] < 9) {
            range = X_TextRange_selection();
            range.text = v;
          } else {
            val = val.substr(0, from) + v + val.substr(to);
            elm.value = val;
          }
          if (to !== from) {
            to = from + v.length;
          } else {
            to += v.length;
          }
          this.move(to, to);
        }
      }
    }
  }
  function X_TextRange_move(from, to) {
    var xnode = this.xnode, elm = xnode["_rawObject"], len, range;
    if (0 <= from) {
      this["v1"] = from;
    } else {
      this["v1"] = this["v1"] + from;
      this["v1"] < 0 && (this["v1"] = 0);
    }
    if (X_Type_isNumber(to)) {
      if (0 <= to) {
        this["v2"] = to;
      } else {
        this["v2"] = this["v2"] + to;
        this["v2"] < this["v1"] && (this["v2"] = this["v1"]);
      }
    }
    if (xnode["_tag"] === "TEXTAREA") {
      if (X_UA["IE"] < 9 || X_UA["Prsto"]) {
        len = (X_UA["IE"] < 9 ? X_Node_Attr_getValueForIE(elm) : elm.value).length;
        if (X_UA["Prsto"]) {
          FocusUtility_setTemporarilyFocus(elm);
        }
        range = elm.createTextRange();
        if (this["v1"] === this["v2"] && this["v1"] === 0) {
          range.collapse(true);
        } else {
          if (this["v1"] !== this["v2"] || this["v1"] < len) {
            range.collapse();
            if (this["v1"] === this["v2"]) {
              range.move("character", this["v1"]);
            } else {
              range.moveEnd("character", this["v2"]);
              range.moveStart("character", this["v1"]);
            }
          } else {
            range.collapse(false);
          }
        }
        range.select();
      } else {
        if (elm.setSelectionRange) {
          elm.setSelectionRange(this["v1"], this["v2"]);
        }
      }
    }
  }
  function X_TextRange_select(v) {
  }
  function cursorPosition(textarea) {
    var selection_range = X_TextRange_selection().duplicate();
    if (selection_range.parentElement() !== textarea) {
      FocusUtility_setTemporarilyFocus(textarea);
      selection_range = X_elmBody.createTextRange();
      selection_range.moveToElementText(textarea);
      selection_range.collapse(true);
      selection_range.select();
    }
    var before_range = X_elmBody.createTextRange();
    before_range.moveToElementText(textarea);
    before_range.setEndPoint("EndToStart", selection_range);
    var after_range = X_elmBody.createTextRange();
    after_range.moveToElementText(textarea);
    after_range.setEndPoint("StartToEnd", selection_range);
    var before_finished = false, selection_finished = false, after_finished = false;
    var before_text, untrimmed_before_text, selection_text, untrimmed_selection_text, after_text, untrimmed_after_text;
    before_text = untrimmed_before_text = before_range.text;
    selection_text = untrimmed_selection_text = selection_range.text;
    after_text = untrimmed_after_text = after_range.text;
    do {
      if (!before_finished) {
        if (before_range.compareEndPoints("StartToEnd", before_range) == 0) {
          before_finished = true;
        } else {
          before_range.moveEnd("character", -1);
          if (before_range.text == before_text) {
            untrimmed_before_text += "\r\n";
          } else {
            before_finished = true;
          }
        }
      }
      if (!selection_finished) {
        if (selection_range.compareEndPoints("StartToEnd", selection_range) == 0) {
          selection_finished = true;
        } else {
          selection_range.moveEnd("character", -1);
          if (selection_range.text == selection_text) {
            untrimmed_selection_text += "\r\n";
          } else {
            selection_finished = true;
          }
        }
      }
      if (!after_finished) {
        if (after_range.compareEndPoints("StartToEnd", after_range) == 0) {
          after_finished = true;
        } else {
          after_range.moveEnd("character", -1);
          if (after_range.text == after_text) {
            untrimmed_after_text += "\r\n";
          } else {
            after_finished = true;
          }
        }
      }
    } while (!before_finished || !selection_finished || !after_finished);
    var startPoint = untrimmed_before_text.split("\r").join("").length;
    return {"from":this["v1"] = startPoint, "to":this["v2"] = startPoint + untrimmed_selection_text.split("\r").join("").length};
  }
  var X_Plugin_FLASH_VERSION = !X_UA["IE"] || !X_UA["ActiveX"] ? parseFloat(X_Object_find(navigator, "plugins>Shockwave Flash>version") || 0) : !(X_UA["IE"] < 5.5) & X_UA["ActiveX"] ? function() {
    var obj = X_Script_createActiveXObjectSafty("ShockwaveFlash.ShockwaveFlash");
    return parseFloat(obj && obj["GetVariable"]("$version").split("WIN ")[1]) || 0;
  }() : 0, X_Plugin_SILVER_LIGHT_VERSION = !X_UA["IE"] || !X_UA["ActiveX"] ? parseFloat(X_Object_find(navigator, "plugins>Silverlight Plug-In>version") || 0) : X_UA["ActiveX"] && 6 <= X_UA["IE"] ? function() {
    var obj = X_Script_createActiveXObjectSafty("AgControl.AgControl"), i = obj ? 5 : 0;
    for (; i; --i) {
      if (obj["IsVersionSupported"](i + ".0")) {
        return i;
      }
    }
    return 0;
  }() : 0, X_Plugin_UNITY_VERSION = !X_UA["IE"] || !X_UA["ActiveX"] ? parseFloat(X_Object_find(navigator, "plugins>Unity Player>version") || 0) : !(X_UA["IE"] < 5.5) && X_UA["ActiveX"] ? function() {
    var obj = X_Script_createActiveXObjectSafty("UnityWebPlayer.UnityWebPlayer.1");
    return obj ? parseFloat(obj["GetPluginVersion"]()) : 0;
  }() : 0, X_Plugin_GEARS_ENABLED = window.GearsFactory || (X_UA["ActiveX"] && 6 <= X_UA["IE"] ? function() {
    return X_Script_createActiveXObjectSafty("Gears.Factory");
  }() : X_Object_find(navigator, "mimeTypes>application/x-googlegears>enabledPlugin")), X_Plugin_WMP_VERSION = !X_UA["IE"] || !X_UA["ActiveX"] ? 0 : function() {
    var obj = X_Script_createActiveXObjectSafty("WMPlayer.OCX.7");
    return obj ? parseFloat(obj["versionInfo"]) : X_Script_createActiveXObjectSafty("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}") ? 6.4 : 0;
  }();
  X["Plugin"] = {"Flash":X_Plugin_FLASH_VERSION, "Silverlight":X_Plugin_SILVER_LIGHT_VERSION, "Unity":X_Plugin_UNITY_VERSION, "Gears":!!X_Plugin_GEARS_ENABLED, "WMP":X_Plugin_WMP_VERSION};
  var X_Plugin_Flash_Wrapper, X_Plugin_Flash_useObject = X_UA["IE"] && !X_UA["MacIE"], X_Plugin_Flash_WRAPPER_LIST = [];
  function X_Plugin_Flash_bridge(objectID) {
    var params = X_Array_copy(arguments), i = X_Plugin_Flash_WRAPPER_LIST.length;
    for (; i;) {
      if (X_Plugin_Flash_WRAPPER_LIST[--i]["_id"] === objectID) {
        params.shift();
        return X_Plugin_Flash_WRAPPER_LIST[i]["dispatch"]({type:"message", data:params});
      }
    }
  }
  if (X_Plugin_FLASH_VERSION) {
    X_Plugin_Flash_Wrapper = Node["inherits"]("X.Plugin.Flash", X_Class.POOL_OBJECT, {"Constructor":function(option, css) {
      if (X_Plugin_Flash_useObject) {
        this["Super"]("object", {classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0", id:option.id, name:option.id, width:option.width, height:option.height, html:['<param name="flashVars" ' + 'value="', option.vars, '">' + '<param name="movie" ' + 'value="', option.src, '">' + '<param name="quality" ' + 'value="', option.quality, '">' + '<param name="bgcolor" ' + 'value="', option.bgcolor, '">' + '<param name="allowfullscreen" ' + 
        'value="', option.fullscreen, '">' + '<param name="wmode" ' + 'value="', option.wmode, '">' + '<param name="allowScriptAccess" ' + 'value="', option.script, '">' + '<param name="AllowNetworking" ' + 'value="', option.network, '">'].join("")}, css);
      } else {
        this["Super"]("embed", {type:"application/x-shockwave-flash", pluginspage:"http://www.macromedia.com/go/getflashplayer", id:option.id, name:option.id, width:option.width, height:option.height, src:option.src, FlashVars:option.vars, quality:option.quality, bgcolor:option.bgcolor, allowFullScreen:option.fullscreen, wmode:option.wmode, allowScriptAccess:option.script, allowNetworking:option.network}, css);
      }
      this["listenOnce"]("load", this, X_PluginFlash_handleEvent);
    }, "listen":function(type) {
      if (type === "message") {
        X.Plugin._flashBridge = X_Plugin_Flash_bridge;
      }
      return X_EventDispatcher_listen.apply(this, arguments);
    }, "flashVars":function(v) {
      if (v === undefined) {
        if (X_Plugin_Flash_useObject) {
          return this["firstChild"]()["attr"]("value");
        } else {
          return this["attr"]("FlashVars");
        }
      }
      if (X_Plugin_Flash_useObject) {
        this["firstChild"]()["attr"]("value", v);
        return this;
      }
      return this["attr"]("FlashVars", v);
    }});
  }
  function X_PluginFlash_handleEvent(e) {
    switch(e.type) {
      case "load":
        console.log("swf loaded.");
        break;
    }
  }
  X["Util"] = {};
  var X_NinjaIframe = X["Util"]["NinjaIframe"] = Node["inherits"]("NinjaIframe", {_iwin:null, _contentHTML:"", _name:"", _ready:false, "Constructor":function(html) {
    this._name = "hidden-iframe-" + X_Timer_now();
    this["Super"]("IFRAME", {className:"hidden-iframe", scrolling:"no", allowtransparency:"no", frameborder:0, tabindex:-1, name:this._name, id:this._name});
    if (X_UA["IE"] < 9) {
      this["attr"]("src", "about:blank");
    }
    if (!X_UA["Webkit"]) {
      this["css"]({position:"absolute"});
    }
    if (html) {
      this._contentHTML = html;
    }
    this["appendTo"](X_Node_systemNode)["listenOnce"](X_EVENT_KILL_INSTANCE, X_Util_NinjaIframe_handleEvent);
    X_ViewPort["listenOnce"](X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent);
  }, "refresh":function(opt_contentHTML) {
    var raw = this["_rawObject"], idoc;
    this._ready = false;
    if (!this._iwin) {
      this._contentHTML = opt_contentHTML;
      return this;
    }
    if (5 <= X_UA["IE"] && X_UA["IE"] < 6) {
      this._iwin.location.href = "about:blank";
    } else {
      this._iwin.location.reload();
    }
    if (!X_Type_isString(opt_contentHTML)) {
      return this;
    }
    this._contentHTML = opt_contentHTML;
    if (!(X_UA["IE"] < 9)) {
      X_Util_NinjaIframe_writeToIframe(this);
    }
    return this;
  }});
  function X_Util_NinjaIframe_handleEvent(e) {
    var raw = this["_rawObject"];
    switch(e.type) {
      case X_EVENT_AFTER_UPDATE:
        this._iwin = raw.contentWindow || raw.contentDocument && raw.contentDocument.parentWindow || window.frames[this._name];
        if (X_UA["IE"]) {
          this._iwin.name = this._name;
        }
        this["listen"](X_UA["IE"] < 9 ? "readystatechange" : ["load", "error"], X_Util_NinjaIframe_handleEvent);
        if (!(X_UA["IE"] < 9)) {
          X_Util_NinjaIframe_writeToIframe(this);
          return;
        }
      case "readystatechange":
        if (raw.readyState !== "complete" && raw.readyState !== "loaded") {
          break;
        }
        if (!this._ready) {
          X_Util_NinjaIframe_writeToIframe(this);
          break;
        }
      case "load":
        console.log("iframe load.");
        this["asyncDispatch"]("ninjaload");
        break;
      case "error":
        this["asyncDispatch"]("ninjaerror");
        break;
      case X_EVENT_KILL_INSTANCE:
        X_ViewPort["unlisten"](X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent);
        this._iwin && this._iwin.close();
        break;
    }
    return X_CALLBACK_STOP_PROPAGATION;
  }
  function X_Util_NinjaIframe_writeToIframe(that) {
    var raw = that["_rawObject"], idoc = raw.contentDocument || that._iwin.document, html = that._contentHTML;
    that._ready = true;
    delete that._contentHTML;
    idoc.open();
    idoc.writeln(html);
    idoc.close();
  }
  var X_JSON = X["JSON"] = 8 <= X_UA["IE"] && X_UA["IE"] < 9 ? {"stringify":function(o) {
    return unescape(JSON.stringify(o));
  }, "parse":JSON.parse} : window.JSON || {"stringify":X_JSON_stringify, "parse":X_JSON_parseTrustableString};
  function X_JSON_stringify(obj) {
    var json = "", k, v;
    for (k in obj) {
      if (json) {
        json += ",";
      }
      v = obj[k];
      v = v || v === 0 ? v : null;
      json += '"' + k + '":' + (X_Type_isObject(v) ? X_JSON_stringify(v) : X_Type_isString(v) ? '"' + v + '"' : v);
    }
    return "{" + json + "}";
  }
  function X_JSON_parseTrustableString(jsonString) {
    if (!jsonString) {
      return jsonString;
    }
    return window.JSON ? JSON.parse(jsonString) : eval("(" + jsonString + ")");
  }
  var X_Util_Image_actualSize = {};
  X["Util"]["Image"] = {"getActualDimension":X_Util_Image_getActualDimension};
  function X_Util_Image_getActualDimension(XnodeOrImageElemOrSrc) {
    var xnode, img, remove, ret, run, memW, memH, w, h;
    if (X_Type_isString(XnodeOrImageElemOrSrc)) {
      if (ret = X_Util_Image_actualSize[X_URL_toAbsolutePath(XnodeOrImageElemOrSrc)]) {
        return ret;
      }
      xnode = X_Node_systemNode["create"]("img", {src:XnodeOrImageElemOrSrc}, {position:"absolute"});
      X_Node_startUpdate();
      img = X_UA_DOM.IE4 ? X_Node__ie4getRawNode(xnode) : xnode["_rawObject"];
      remove = true;
    } else {
      if (XnodeOrImageElemOrSrc.constructor === Node) {
        xnode = XnodeOrImageElemOrSrc;
        img = X_UA_DOM.IE4 ? X_Node__ie4getRawNode(xnode)["_rawObject"] : xnode["_rawObject"];
      } else {
        if (X_Type_isHTMLElement(XnodeOrImageElemOrSrc)) {
          img = XnodeOrImageElemOrSrc;
        } else {
          if (XnodeOrImageElemOrSrc.constructor === X_EventDispatcher && X_Type_isImage(XnodeOrImageElemOrSrc["_rawObject"])) {
            xnode = XnodeOrImageElemOrSrc;
            img = xnode["_rawObject"];
          } else {
            return;
          }
        }
      }
      if (ret = X_Util_Image_actualSize[img.src]) {
        return ret;
      }
    }
    if (img.naturalWidth) {
      return [img.naturalWidth, img.naturalHeight];
    }
    if (5 <= X_UA["IE"]) {
      run = img.runtimeStyle;
      memW = run.width;
      memH = run.height;
      run.width = "auto";
      run.height = "auto";
      w = img.width;
      h = img.height;
      run.width = memW;
      run.height = memH;
    } else {
      memW = w = img.width;
      memH = h = img.height;
      if (img.removeAttribute) {
        img.removeAttribute("width");
        img.removeAttribute("height");
        w = img.width;
        h = img.height;
        img.width = memW;
        img.height = memH;
      }
    }
    ret = X_Util_Image_actualSize[img.src] = [w, h];
    remove && xnode["kill"]();
    return ret;
  }
  X["XML"] = XMLWrapper;
  function XMLWrapper(xml) {
    if (xml) {
      this._rawXML = xml;
      this.tagName = xml.tagName;
    }
  }
  XMLWrapper.prototype.tagName = "";
  XMLWrapper.prototype.length = 1;
  XMLWrapper.prototype["parent"] = XMLWrapper_parent;
  XMLWrapper.prototype["has"] = XMLWrapper_has;
  XMLWrapper.prototype["get"] = XMLWrapper_get;
  XMLWrapper.prototype["val"] = XMLWrapper_val;
  XMLWrapper.prototype["find"] = XMLWrapper_find;
  function XMLWrapper_parent() {
    if (this.length === 1) {
      return this._rawXML && this._rawXML.parentNode ? new XMLWrapper(this._rawXML.parentNode) : null;
    }
    if (this.length === 0) {
      return null;
    }
    return this[0].parentNode ? new XMLWrapper(this[0].parentNode) : null;
  }
  function XMLWrapper_has(queryString) {
    return !!this.find(queryString).length;
  }
  function XMLWrapper_get(index) {
    if (this.length === 1) {
      return this;
    }
    if (this.length === 0) {
      return null;
    }
    if (this._wraps && this._wraps[index]) {
      return this._wraps[index];
    }
    if (!this._wraps) {
      this._wraps = [];
    }
    return this[index] ? this._wraps[index] = new XMLWrapper(this[index]) : null;
  }
  function XMLWrapper_val(queryString, type) {
    var wrapper, xml, v;
    switch(queryString) {
      case "number":
      case "int":
      case "boolean":
      case "string":
      case undefined:
        type = queryString;
        queryString = 0;
    }
    wrapper = queryString ? this.find(queryString) : this;
    xml = wrapper.length === 1 ? wrapper._rawXML : wrapper[0];
    if (!xml) {
      switch(type) {
        case "number":
        case "int":
          return NaN;
        case "boolean":
          return false;
        case "string":
          return "";
        default:
          return null;
      }
    }
    v = xml.nodeType === 1 ? xml.innerText || xml.text || xml.textContent : xml.nodeValue;
    switch(type) {
      case "number":
        return parseFloat(v);
      case "int":
        return parseFloat(v) | 0;
      case "boolean":
        return !!X_String_parse(v);
    }
    return v || "";
  }
  function XMLWrapper_find(queryString) {
    var scope = this.constructor === XMLListWrapper ? this : [this._rawXML], parents = scope, ARY_PUSH = Array.prototype.push, ret = [], isXML = true, isMulti = 1 < scope.length, isStart = true, _ = " ", isAll, isNot, hasRoot, l, i, n, parsed, xmlList, merge, combinator, selector, name, tagName, uid, tmp, xml, filter, key, op, val, toLower, useName, links, className, attr, flag;
    if (!X_Type_isString(queryString)) {
      return XMLListWrapper_0;
    }
    xmlList = [];
    for (; queryString.length;) {
      if (!parsed) {
        parsed = X_Node_Selector__parse(queryString);
        if (X_Type_isNumber(parsed)) {
          return XMLListWrapper_0;
        }
        queryString = queryString.substr(parsed[0]);
        parsed = parsed[1];
        if (parsed === 5) {
          isMulti = true;
          parents = scope;
          xmlList && xmlList.length && ARY_PUSH.apply(ret, xmlList);
          parsed = null;
          xmlList = [];
          isStart = true;
          continue;
        }
      }
      combinator = parsed[0];
      selector = parsed[1];
      name = parsed[2];
      tagName = selector === 1 ? name : "*";
      isAll = tagName === "*";
      if (!isStart) {
        if (!xmlList.length) {
          parsed = null;
          continue;
        } else {
          if (combinator !== 0) {
            parents = xmlList;
            xmlList = [];
          }
        }
      }
      i = 0;
      l = parents.length;
      n = -1;
      isMulti = isMulti || 1 < l;
      switch(combinator) {
        case 2:
          for (; i < l; ++i) {
            for (xml = parents[i].firstChild; xml; xml = xml.nextSibling) {
              if (xml.nodeType === 1 && (isAll || tagName === xml.tagName)) {
                xmlList[++n] = xml;
              }
            }
          }
          break;
        case 3:
          for (; i < l; ++i) {
            for (xml = parents[i].nextSibling; xml; xml = xml.nextSibling) {
              if (xml.nodeType === 1) {
                if (isAll || tagName === xml.tagName) {
                  xmlList[++n] = xml;
                }
                break;
              }
            }
          }
          break;
        case 4:
          merge = [];
          for (; i < l; ++i) {
            for (xml = parents[i].nextSibling; xml; xml = xml.nextSibling) {
              if (xml.nodeType === 1 && (isAll || tagName === xml.tagName)) {
                if (merge.indexOf(xml) !== -1) {
                  break;
                } else {
                  merge[merge.length] = xml;
                  xmlList[++n] = xml;
                }
              }
            }
          }
          break;
        case 6:
          selector = 0;
          tagName = "*";
          for (; i < l; ++i) {
            if (xml = parents[i].getAttributeNode(name)) {
              xmlList[++n] = xml;
            }
          }
          break;
        default:
          if (combinator === 1 || isStart && selector < 7) {
            for (; i < l; ++i) {
              xml = parents[i];
              xml.childNodes && xml.childNodes.length && XMLWrapper_fetchElements(xmlList, xml, isAll ? null : tagName);
            }
          }
      }
      isStart = false;
      switch(selector) {
        case 2:
          filter = ["id", 1, name];
          break;
        case 3:
          filter = ["class", 3, name];
          break;
        case 4:
          if (!(filter = XMLWrapper_filter[name])) {
            return XMLListWrapper_0;
          }
          break;
        case 5:
          filter = [name, parsed[3], parsed[4]];
          break;
        case 6:
          isNot = true;
          parsed = parsed[2];
          name = parsed[2];
          switch(parsed[1]) {
            case 1:
              filter = ["tag", 1, name];
              break;
            case 2:
              filter = ["id", 1, name];
              break;
            case 3:
              filter = ["class", 3, name];
              break;
            case 4:
              if (!(filter = XMLWrapper_filter[name])) {
                return [];
              }
              break;
            case 5:
              filter = [name, parsed[3], parsed[4]];
              break;
          }break;
        case 7:
          xmlList = scope;
          break;
      }
      if (filter && xmlList.length) {
        if (filter.m) {
          xmlList = filter.m({not:isNot, xml:isXML}, xmlList, parsed[3], parsed[4]);
        } else {
          if (X_Type_isFunction(filter)) {
            tmp = [];
            for (i = 0, n = -1; xml = xmlList[i]; ++i) {
              if (!!filter(xml) ^ isNot) {
                tmp[++n] = xml;
              }
            }
            xmlList = tmp;
          } else {
            tmp = [];
            key = filter[0];
            op = filter[1];
            val = filter[2];
            if (op === 3) {
              val = _ + val + _;
            }
            for (i = 0, n = -1, l = xmlList.length; i < l; ++i) {
              xml = xmlList[i];
              attr = xml.getAttribute(key, 2);
              flag = attr != null;
              if (flag && op) {
                switch(op) {
                  case 1:
                    flag = attr === val;
                    break;
                  case 2:
                    flag = attr !== val;
                    break;
                  case 3:
                    flag = (_ + attr + _).indexOf(val) !== -1;
                    break;
                  case 4:
                    flag = attr.indexOf(val) === 0;
                    break;
                  case 5:
                    flag = attr.lastIndexOf(val) + val.length === attr.length;
                    break;
                  case 6:
                    flag = attr.indexOf(val) !== -1;
                    break;
                  case 7:
                    flag = attr === val || attr.substring(0, val.length + 1) === val + "-";
                    break;
                }
              }
              if (!!flag ^ isNot) {
                tmp[++n] = xml;
              }
            }
            xmlList = tmp;
          }
        }
      }
      filter = null;
      isNot = false;
      parsed = null;
    }
    if (isMulti) {
      xmlList && xmlList.length && ARY_PUSH.apply(ret, xmlList);
      l = ret.length;
      if (l === 0) {
        return XMLListWrapper_0;
      }
      if (l === 1) {
        return new XMLWrapper(ret[0]);
      }
      xmlList = [];
      for (i = 0, n = -1; i < l; ++i) {
        xml = ret[i];
        if (xmlList.indexOf(xml) === -1) {
          xmlList[++n] = xml;
        }
      }
      XMLWrapper_sortElementOrder(ret = [], xmlList, this._rawXML.childNodes);
      for (i = 0, l = xmlList.length; i < l; ++i) {
        if (ret.indexOf(xml = xmlList[i]) === -1) {
          ret[ret.length] = xml;
        }
      }
      xmlList = ret;
    }
    return xmlList.length === 1 ? new XMLWrapper(xmlList[0]) : new XMLListWrapper(xmlList);
  }
  function XMLWrapper_sortElementOrder(newList, list, xmlList) {
    var l = xmlList.length, i = 0, j, child, _xmlList;
    for (; i < l; ++i) {
      child = xmlList[i];
      if ((j = list.indexOf(child)) !== -1) {
        newList[newList.length] = child;
        list.splice(j, 1);
        if (list.length === 1) {
          newList[newList.length] = list[0];
          list.length = 0;
          return true;
        }
        if (list.length === 0) {
          return true;
        }
      }
      if ((_xmlList = child.childNodes) && XMLWrapper_sortElementOrder(newList, list, _xmlList)) {
        return true;
      }
    }
  }
  function XMLWrapper_fetchElements(list, parent, tag) {
    var xmlList = parent.childNodes, l = xmlList.length, i = 0, child;
    for (; i < l; ++i) {
      child = xmlList[i];
      if (child.nodeType === 1) {
        (!tag || child.tagName === tag) && (list[list.length] = child);
        child.childNodes && child.childNodes.length && XMLWrapper_fetchElements(list, child, tag);
      }
    }
  }
  function XMLWrapper_funcSelectorChild(type, flag_all, flags, xmlList) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xml, node, tagName, tmp;
    for (; xml = xmlList[i]; ++i) {
      tagName = flag_all || xml.tagName;
      tmp = null;
      if (type <= 0) {
        for (node = xml.previousSibling; node; node = node.previousSibling) {
          if (node.nodeType === 1 && (flag_all || tagName === node.tagName)) {
            tmp = false;
            break;
          }
        }
      }
      if (tmp === null && 0 <= type) {
        for (node = xml.nextSibling; node; node = node.nextSibling) {
          if (node.nodeType === 1 && (flag_all || tagName === node.tagName)) {
            tmp = false;
            break;
          }
        }
      }
      if (tmp === null) {
        tmp = true;
      }
      if (tmp ^ flag_not) {
        res[++n] = xml;
      }
    }
    return res;
  }
  function XMLWrapper_funcSelectorNth(pointer, sibling, flag_all, flags, xmlList, a, b) {
    var uids = X_Array_copy(xmlList), res = [], checked = {}, flag_not = flags.not, i = 0, n = -1, c, xml, tmp, node, tagName, uid;
    for (; xml = xmlList[i]; ++i) {
      tmp = checked[i];
      if (tmp === undefined) {
        for (c = 0, node = xml.parentNode[pointer], tagName = flag_all || xml.tagName; node; node = node[sibling]) {
          if (node.nodeType === 1 && (flag_all || tagName === node.tagName)) {
            ++c;
            uid = uids.indexOf(node);
            if (uid === -1) {
              uids[uid = uids.length] = node;
            }
            checked[uid] = a === 0 ? c === b : (c - b) % a === 0 && (c - b) / a >= 0;
          }
        }
        tmp = checked[i];
      }
      if (tmp ^ flag_not) {
        res[++n] = xml;
      }
    }
    return res;
  }
  var XMLWrapper_filter = {"first-child":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(-1, true, flags, xmlList);
  }}, "last-child":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(1, true, flags, xmlList);
  }}, "only-child":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(0, true, flags, xmlList);
  }}, "first-of-type":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(-1, false, flags, xmlList);
  }}, "last-of-type":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(1, false, flags, xmlList);
  }}, "only-of-type":{m:function(flags, xmlList) {
    return XMLWrapper_funcSelectorChild(0, false, flags, xmlList);
  }}, "nth-child":{m:function(flags, xmlList, a, b) {
    return XMLWrapper_funcSelectorNth("firstChild", "nextSibling", true, flags, xmlList, a, b);
  }}, "nth-last-child":{m:function(flags, xmlList, a, b) {
    return XMLWrapper_funcSelectorNth("lastChild", "previousSibling", true, flags, xmlList, a, b);
  }}, "nth-of-type":{m:function(flags, xmlList, a, b) {
    return XMLWrapper_funcSelectorNth("firstChild", "nextSibling", false, flags, xmlList, a, b);
  }}, "nth-last-of-type":{m:function(flags, xmlList, a, b) {
    return XMLWrapper_funcSelectorNth("lastChild", "previousSibling", false, flags, xmlList, a, b);
  }}, "empty":{m:function(flags, xmlList) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xml, tmp, node;
    for (; xml = xmlList[i]; ++i) {
      tmp = true;
      for (node = xml.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === 1 || node.nodeType === 3 && node.nodeValue) {
          tmp = false;
          break;
        }
      }
      if (tmp ^ flag_not) {
        res[++n] = xml;
      }
    }
    return res;
  }}, "contains":{m:function(flags, xmlList, arg) {
    var res = [], flag_not = flags.not, i = 0, n = -1, xml, text = "";
    for (; xml = xmlList[i]; ++i) {
      switch(xml.nodeType) {
        case 1:
          text = xml.innerText || xml.text || xml.textContent;
          break;
        case 3:
          text = xml.nodeValue;
          break;
      }
      if (-1 < text.indexOf(arg) ^ flag_not) {
        res[++n] = xml;
      }
    }
    return res;
  }}};
  function XMLListWrapper(xmlList) {
    var i = 0, l = xmlList ? xmlList.length : 0;
    for (; i < l; ++i) {
      this[i] = xmlList[i];
    }
    this.length = l;
  }
  var XMLListWrapper_0 = new XMLListWrapper;
  XMLListWrapper.prototype.length = 0;
  XMLListWrapper.prototype._wraps = null;
  XMLListWrapper.prototype["parent"] = XMLWrapper_parent;
  XMLListWrapper.prototype["has"] = XMLWrapper_has;
  XMLListWrapper.prototype["get"] = XMLWrapper_get;
  XMLListWrapper.prototype["val"] = XMLWrapper_val;
  XMLListWrapper.prototype["find"] = XMLWrapper_find;
  var X_Embed = X["Util"]["Embed"] = Node["inherits"]("Embed", {autoRefresh:0, _iwin:null, _contentHTML:"", _name:"", _ready:false, "Constructor":function(params) {
    var tag = X_UA["IE"] < 9 ? "OBJECT" : "EMBED";
    this["Super"](tag, {tabindex:-1, name:this._name, id:this._name});
    if (tag === "OBJECT") {
    } else {
    }
  }});
  var X_Window = X["Util"]["Window"] = X_EventDispatcher["inherits"]("X.Window", {"Constructor":function(options) {
    var url = options["url"], page = window.open(url || "", options["name"] || "", options["params"] || ""), html = options["html"];
    X_ViewPort["listenOnce"](X_EVENT_UNLOAD, this, X_Util_Window_handleEvent);
    this["listenOnce"]([X_EVENT_UNLOAD, X_EVENT_KILL_INSTANCE], X_Util_Window_handleEvent);
    X_Pair_create(this, {page:page, timerID:X_Timer_add(options["interval"] || 500, 0, this, X_Util_Window_onTimer)});
    if (!url && html) {
      this["write"](html);
    }
  }, "closed":function() {
    var pair = X_Pair_get(this);
    return pair ? X_Script_try(X_Object_find, [pair.page, "closed"]) : true;
  }, "url":function(url) {
    var pair = X_Pair_get(this);
    pair && (pair.page.location.href = url);
    return this;
  }, "write":function(opt_html) {
    var pair = X_Pair_get(this), doc = pair && X_Script_try(X_Object_find, [pair.page, "document"]);
    if (doc) {
      doc.open();
      doc.write(opt_html || "");
      doc.close();
    } else {
      this["asyncDispatch"](X_EVENT_ERROR);
    }
    return this;
  }, "find":function(selector) {
    var pair = X_Pair_get(this);
    if (pair) {
      return X_Script_try(X_Object_find, [pair.page, selector]);
    }
  }, "focus":function() {
    var pair = X_Pair_get(this);
    pair && pair.page["focus"]();
    return this;
  }});
  function X_Util_Window_onTimer(e) {
    var pair = X_Pair_get(this);
    if (this["closed"]()) {
      this["asyncDispatch"](X_EVENT_UNLOAD);
      delete pair.timerID;
      return X_CALLBACK_UN_LISTEN;
    }
  }
  function X_Util_Window_handleEvent(e) {
    var pair = X_Pair_get(this), page = pair && pair.page;
    switch(e.type) {
      case X_EVENT_UNLOAD:
        this["kill"]();
        break;
      case X_EVENT_KILL_INSTANCE:
        if (page && !this["closed"]()) {
          if (9 < X_UA["IEHost"]) {
            page.close();
          } else {
            page.open("about:blank", "_self").close();
          }
          X_Pair_release(this, page);
        }
        pair.timerID && X_Timer_remove(pair.timerID);
        X_ViewPort["unlisten"](X_EVENT_UNLOAD, this, X_Util_Window_handleEvent);
        break;
    }
  }
  X["Util"]["HTMLParser"] = function(html, options) {
    var async, handler = {isXML:!!options["isXML"], err:options["onError"] || X_emptyFunction, tagStart:options["tagStart"] || X_emptyFunction, tagEnd:options["tagEnd"] || X_emptyFunction, chars:options["chars"] || X_emptyFunction, comment:options["commnet"] || X_emptyFunction, asyncComplete:async = options["onAsyncComplete"]};
    X_HTMLParser_exec(html, handler, !!async);
  };
  X["Net"] = X_EventDispatcher["inherits"]("X.Net", X_Class.NONE, {"Constructor":function(urlOrObject, opt_options) {
    var opt, url, type, auth;
    if (X_Type_isObject(opt = urlOrObject)) {
      if (X_Type_isString(url = opt["xhr"])) {
        type = X_NET_TYPE_XHR;
      } else {
        if (X_Type_isString(url = opt["jsonp"])) {
          type = X_NET_TYPE_JSONP;
        } else {
          if (X_Type_isString(url = opt["img"] || opt["image"])) {
            type = X_NET_TYPE_IMAGE;
          } else {
            if (X_Type_isString(url = opt["form"])) {
              type = X_NET_TYPE_FORM;
            } else {
              if (!(type = X_NET_NAME_TO_ID[opt["type"]])) {
                alert("X.Net args error");
                return;
              } else {
                url = opt["url"];
              }
            }
          }
        }
      }
      if (!X_Type_isString(url)) {
        alert("X.Net args error");
        return;
      }
    } else {
      if (X_Type_isString(urlOrObject)) {
        url = urlOrObject;
        if (X_Type_isObject(opt = opt_options)) {
          type = opt["type"] || X_NET_TYPE_XHR;
        } else {
          type = X_NET_TYPE_XHR;
          opt = {"url":url, "method":"GET"};
        }
      } else {
        alert("X.Net args error");
        return;
      }
    }
    if (auth = opt["auth"]) {
      delete opt["auth"];
    }
    opt = X_Object_deepCopy(opt);
    if (auth) {
      opt["auth"] = auth;
    }
    if (opt["params"] && type !== X_NET_TYPE_FORM) {
      url = X_URL_create(url, opt["params"]);
      delete opt["params"];
    }
    if (type === X_NET_TYPE_XHR) {
      opt["method"] = opt["method"] || (opt["postdata"] ? "POST" : "GET");
      opt["dataType"] = opt["dataType"] || X_URL_getEXT(url);
    }
    opt.netType = type;
    opt["url"] = url;
    X_Pair_create(this, opt);
    this["listen"](X_EVENT_KILL_INSTANCE, X_NET_proxyDispatch);
    X_NET_QUEUE_LIST[X_NET_QUEUE_LIST.length] = this;
    !X_NET_currentQueue && X_NET_shiftQueue();
  }, "state":function() {
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
  var X_NET_TYPE_XHR = 1, X_NET_TYPE_JSONP = 2, X_NET_TYPE_FORM = 3, X_NET_TYPE_IMAGE = 4, X_NET_NAME_TO_ID = {"xhr":X_NET_TYPE_XHR, "jsonp":X_NET_TYPE_JSONP, "form":X_NET_TYPE_FORM, "img":X_NET_TYPE_IMAGE, "image":X_NET_TYPE_IMAGE}, X_NET_QUEUE_LIST = [], X_XHR, X_JSONP, X_FormSender, X_ImgLoader, X_GadgetXHR, X_NET_currentWrapper, X_NET_currentQueue, X_NET_currentData, X_NET_completePhase;
  function X_NET_proxyDispatch(e) {
    var i, flag, auth;
    switch(e.type) {
      case X_EVENT_KILL_INSTANCE:
        if (this === X_NET_currentQueue && X_NET_completePhase) {
          if (X_NET_completePhase === 1) {
            this["unlisten"](X_EVENT_COMPLETE, X_NET_proxyDispatch)["dispatch"](X_EVENT_COMPLETE);
          }
          X_NET_shiftQueue(true);
          X_Pair_release(this);
          X_NET_completePhase = 0;
        } else {
          if (this === X_NET_currentQueue) {
            X_NET_currentWrapper.cancel();
            X_NET_shiftQueue(true);
            flag = true;
          } else {
            if ((i = X_NET_QUEUE_LIST.indexOf(this)) !== -1) {
              X_NET_QUEUE_LIST.splice(i, 1);
              flag = true;
            }
          }
        }
        if (flag) {
          this["dispatch"](X_EVENT_CANCELED);
          this["dispatch"]({type:X_EVENT_COMPLETE, "lastEventType":X_EVENT_CANCELED});
          X_Pair_release(this);
        }
        break;
      case X_EVENT_PROGRESS:
        this["dispatch"](e);
        break;
      case X_EVENT_ERROR:
        if (e.status === 401) {
          if (auth = X_Pair_get(this)["auth"]) {
            X_Pair_get(auth).onAuthError(auth, e);
          }
        }
      case X_EVENT_SUCCESS:
        X_NET_completePhase = 1;
        this["listenOnce"](X_EVENT_COMPLETE, X_NET_proxyDispatch)["asyncDispatch"](32, {type:X_EVENT_COMPLETE, "lastEventType":e.type});
        e["target"] = e["currentTarget"] = this;
        this["asyncDispatch"](e);
        break;
      case X_EVENT_COMPLETE:
        X_NET_completePhase = 2;
        this["kill"]();
        break;
    }
  }
  function X_NET_shiftQueue(currentKilled) {
    var q, auth, authSettings;
    if (X_NET_currentQueue) {
      if (!currentKilled) {
        return;
      }
      X_NET_currentWrapper["unlisten"]([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR], X_NET_currentQueue, X_NET_proxyDispatch).reset();
      X_NET_currentQueue = X_NET_currentWrapper = X_NET_currentData = null;
    }
    console.log("\u25a0\u25a0------------ X_NET_shiftQueue " + X_NET_QUEUE_LIST.length);
    if (!X_NET_QUEUE_LIST.length) {
      return;
    }
    X_NET_currentQueue = q = X_NET_QUEUE_LIST.shift();
    X_NET_currentData = X_Pair_get(X_NET_currentQueue);
    switch(X_NET_currentData.netType) {
      case X_NET_TYPE_XHR:
        switch(X_NET_currentData["test"]) {
          case "gadget":
            X_NET_currentWrapper = X_GadgetXHR || X_TEMP.X_GadgetXHR_init();
            break;
          case "flash":
            break;
          default:
            X_NET_currentWrapper = X_XHR || X_TEMP.X_XHR_init();
        }if (auth = X_NET_currentData["auth"]) {
          authSettings = X_Pair_get(auth);
          switch(auth["state"]()) {
            case 0:
            case 1:
            case 2:
              if (!(auth["dispatch"](X_EVENT_NEED_AUTH) & X_CALLBACK_PREVENT_DEFAULT)) {
                if (X_NET_currentQueue === q) {
                  authSettings.lazyRequests = authSettings.lazyRequests || [];
                  authSettings.lazyRequests.indexOf(q) === -1 && authSettings.lazyRequests.push(q);
                  X_NET_currentQueue = null;
                  X_NET_shiftQueue();
                }
              } else {
                X_NET_currentQueue === q && q["kill"]();
              }
              return;
            case 3:
              X_NET_QUEUE_LIST.push(X_NET_currentQueue);
              X_NET_currentQueue = null;
              X_NET_shiftQueue();
              return;
          }
          authSettings.updateRequest(auth, X_NET_currentData);
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
        break;
    }
    X_NET_currentWrapper["listen"]([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR], X_NET_currentQueue, X_NET_proxyDispatch);
    X_NET_currentWrapper.load(X_NET_currentData);
  }
  var X_XHR_createW3C = window["XMLHttpRequest"] && function() {
    return X_XHR_w3c || (X_XHR_w3c = new XMLHttpRequest);
  }, X_XHR_w3c = X_XHR_createW3C && X_XHR_createW3C(), X_XHR_cors = X_XHR_w3c && X_XHR_w3c.withCredentials !== undefined, X_XHR_progress = X_XHR_w3c && X_XHR_w3c.onprogress !== undefined, X_XHR_upload = X_XHR_w3c && !!X_XHR_w3c.upload, X_XHR_createXDR = window["XDomainRequest"] && function() {
    return X_XHR_xdr || (X_XHR_xdr = new XDomainRequest);
  }, X_XHR_xdr = X_XHR_createXDR && X_XHR_createXDR(), X_XHR_msXMLVer = 0, X_XHR_msXMLName = "", X_XHR_msXML, X_XHR_createMSXML = X_UA["ActiveX"] && (5 <= X_UA["IE"] && X_UA["IE"] < 7 || X_URL_IS_LOCAL) && function() {
    return X_Script_createActiveXObjectSafty(X_XHR_msXMLName);
  }, X_XHR_neverReuse = X_UA["IE"] < 9, X_XHR_TYPE_FLASH = 8, X_XHR_TYPE_GADGET = 16;
  if (X_XHR_createMSXML) {
    (function() {
      var x = ".XMLHTTP", m = "Msxml2" + x, n = [m + ".6.0", m + ".3.0", m + ".5.0", m + ".4.0", m, "Microsoft" + x], v = [6, 3, 5, 4, 2, 1], i = -1, a;
      for (; i < 5;) {
        a = X_Script_createActiveXObjectSafty(n[++i]);
        if (a) {
          X_XHR_msXMLVer = v[i];
          X_XHR_msXMLName = n[i];
          X_XHR_msXML = a;
          return;
        }
      }
      X_XHR_createMSXML = null;
    })();
  }
  X["XHR"] = {"W3C":X_XHR_createW3C ? 1 : 0, "MSXML":X_XHR_createMSXML ? 2 : 0, "XDR":X_XHR_createXDR ? 4 : 0, "FLASH":4 <= X_Plugin_FLASH_VERSION ? 8 : 0, "GADGET":5.5 <= X_UA["IE"] || !X_UA["IE"] ? 16 : 0, "PROGRESS":X_XHR_progress, "UPLOAD_PROGRESS":X_XHR_upload, "CORS":X_XHR_xdr || X_XHR_cors, "BINARY":X_Script_VBS_ENABLED};
  if (X_XHR_msXMLVer) {
    X["XHR"]["MSXML_VERSION"] = X_XHR_msXMLVer;
  }
  if (X_XHR_w3c || X_XHR_msXML) {
    X_TEMP.X_XHR_init = function() {
      X_XHR = X_Class_override(X_EventDispatcher(), X_TEMP.X_XHR_params, true);
      delete X_TEMP.X_XHR_init;
      delete X_TEMP.X_XHR_params;
      return X_XHR;
    };
    X_TEMP.X_XHR_params = {"_rawType":X_EventDispatcher_EVENT_TARGET_XHR, _isXDR:false, _isMsXML:false, _method:"", _dataType:"", _busy:false, _canceled:false, _error:false, _percent:0, _timerID:0, load:function(obj) {
      var raw = X_XHR["_rawObject"], method = obj["method"], url = obj["url"], async = obj["async"] !== false, username = obj["username"], password = obj["password"], headers = obj["headers"] || {}, postdata = obj["postdata"] || "", timeout = obj["timeout"] || 20000, noCache = obj["cache"] !== true, dataType = X_XHR._dataType = obj["dataType"], xDomain = !X_URL_isSameDomain(url), isFile = X_URL_isLocal(url), init, type, tmp, p;
      if (!raw || xDomain !== X_XHR._isXDR || X_XHR_createMSXML && isFile !== X_XHR._isMsXML) {
        raw && X_XHR["unlisten"](["load", "readystatechange", "progress", "error", "timeout"]);
        init = true;
        X_XHR["_rawObject"] = raw = xDomain ? X_XHR_cors ? X_XHR_createW3C() : X_XHR_createXDR() : isFile ? X_XHR_createMSXML ? X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML() : X_XHR_createW3C() : X_XHR_createW3C ? X_XHR_createW3C() : X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML();
        X_XHR._isXDR = X_XHR_createXDR && xDomain;
        X_XHR._isMsXML = !X_XHR_createW3C || isFile && X_XHR_createMSXML;
      }
      raw.open(method, url, async, username, password);
      switch(dataType) {
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
          X_XHR._dataType = dataType;
          break;
      }
      if (raw.responseType !== undefined && X_XHR._dataType) {
        if (X_XHR._dataType === "json") {
          raw.responseType = X_UA["Gecko"] < 10 ? "moz-json" : X_UA["Gecko"] ? "json" : "";
        } else {
          raw.responseType = X_XHR._dataType;
        }
      }
      if (!X_XHR._isMsXML && raw.overrideMimeType) {
        switch(type = dataType) {
          case "document":
          case "xml":
          case "html":
          case "htm":
          case "svg":
          case "vml":
            tmp = "text/xml";
            break;
          case "json":
            tmp = "application/json";
            break;
          case "mp3":
            tmp = "mpeg";
          case "weba":
            tmp = tmp || "webm";
          case "opus":
            tmp = tmp || "ogg";
          case "ogg":
          case "wav":
          case "aac":
            tmp = "audio/" + (tmp || type);
            break;
          case "m4a":
          case "mp4":
            tmp = "audio/x-" + type;
            break;
          case "jpeg":
          case "jpg":
          case "png":
          case "gif":
          case "bmp":
          case "ico":
            tmp = "text/plain; charset=x-user-defined";
            break;
        }
        if (obj["mimeType"] || tmp) {
          raw.overrideMimeType(obj["mimeType"] || tmp);
        }
      }
      if (!X_XHR._isXDR && (X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : raw.setRequestHeader)) {
        if ("document json text".indexOf(X_XHR._dataType) !== -1 && X_UA["Safari"]) {
          headers["If-Modified-Since"] = "Thu, 01 Jun 1970 00:00:00 GMT";
        }
        if (!xDomain && !headers["X-Requested-With"]) {
          headers["X-Requested-With"] = "XMLHttpRequest";
        }
        if (method === "POST" && !headers["Content-Type"]) {
          if (X_Type_isObject(postdata)) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          } else {
            headers["Content-Type"] = "text/plain";
          }
        }
        for (p in headers) {
          headers[p] !== undefined && raw.setRequestHeader(p, headers[p] + "");
        }
      }
      if (!X_XHR._isMsXML && raw.timeout !== undefined) {
        raw.timeout = timeout;
      } else {
        X_XHR._timerID = X_Timer_once(timeout, X_XHR.onTimeout);
      }
      X_XHR._busy = true;
      raw.send(X_Type_isObject(postdata) ? X_String_serialize(postdata) : "" + postdata);
      if (!async || raw.readyState === 4) {
        X_Timer_once(32, X_XHR, [{type:"readystatechange"}]);
      } else {
        if (init) {
          if (X_XHR._isMsXML) {
            raw["onreadystatechange"] = X_XHR.handleEvent;
          } else {
            if (X_XHR_progress || X_XHR._isXDR) {
              X_XHR["listen"](["load", "progress", "error", "timeout"]);
            } else {
              if (X_UA["IE"] === 8) {
                X_XHR["listen"](["readystatechange", "error", "timeout"]);
              } else {
                if (X_UA["IE"] === 7) {
                  X_XHR["listen"](["readystatechange", "error"]);
                } else {
                  X_XHR["listen"](["load", "readystatechange", "error", "timeout"]);
                }
              }
            }
          }
          if (X_XHR_upload) {
            raw.upload.addEventListener("progress", X_XHR.onUploadProgress);
          }
        }
      }
    }, cancel:function() {
      X_XHR["_rawObject"].abort();
      X_XHR._canceled = true;
    }, reset:function() {
      X_XHR._method = X_XHR._dataType = "";
      X_XHR._canceled = X_XHR._busy = X_XHR._error = false;
      X_XHR._timerID && X_Timer_remove(X_XHR._timerID);
      X_XHR._percent = X_XHR._timerID = 0;
      X_XHR["_rawObject"].abort();
      if (X_XHR._error || X_XHR_neverReuse && !X_XHR._isMsXML) {
        if (X_XHR_upload) {
          X_XHR_w3c.upload.removeEventListener("progress", X_XHR.onUploadProgress);
        }
        X_EventDispatcher_toggleAllEvents(X_XHR, false);
        X_XHR["_rawObject"] = null;
        if (X_XHR._isXDR) {
          X_XHR_xdr = null;
          delete X_XHR._isXDR;
        } else {
          X_XHR_w3c = null;
        }
        X_XHR["unlisten"](["load", "readystatechange", "progress", "error", "timeout"]);
      }
    }, handleEvent:function(e) {
      var raw = X_XHR["_rawObject"], live = !X_XHR._canceled, headers, status, text, data;
      switch(e && e.type || "readystatechange") {
        case "readystatechange":
          switch(raw.readyState) {
            case 0:
            case 1:
              return;
            case 2:
              live && X_XHR["asyncDispatch"]({type:X_EVENT_PROGRESS, "percent":0});
              return;
            case 3:
              live && X_XHR["asyncDispatch"]({type:X_EVENT_PROGRESS, "percent":X_XHR._percent < 99.9 ? 99.9 : (X_XHR._percent + 100) / 2});
              return;
            case 4:
              if (X_XHR._percent === 100) {
                return;
              }
              break;
            default:
              return;
          }case "load":
          if (!X_XHR._busy) {
            return;
          }
          X_XHR._percent = 100;
          X_XHR._busy = false;
          status = raw.status;
          if (X_XHR._isXDR) {
            headers = {"Content-Type":raw.contentType};
          } else {
            if ((X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : raw.setRequestHeader) && (headers = raw.getAllResponseHeaders())) {
              headers = X_XHR_parseResponseHeaders(headers);
            }
          }
          if (!status && location.protocol === "file:" || status < 100 && (status = 200) || 200 <= status && status < 400 || status === 1223 && (status = 204) || X_UA["Webkit"] && status === undefined) {
            switch(X_XHR._dataType) {
              case "text":
                data = X_Script_try(X_Object_find, [raw, "responseText"]);
                break;
              case "json":
                data = X_Script_try(X_Object_find, [raw, "response"]) || X_Script_try(X_Object_find, [raw, "responseText"]);
                if (X_Type_isString(data)) {
                  data = X_JSON_parseTrustableString(data);
                }
                break;
              case "document":
                data = raw["responseXML"] || raw["response"] || raw["responseText"];
                break;
              case "blob":
              case "arraybuffer":
                data = raw["response"] || raw["responseText"];
                break;
            }
          }
          if (data) {
            X_XHR["asyncDispatch"](32, {type:X_EVENT_SUCCESS, status:status || 200, response:data, "headers":headers || null});
          } else {
            X_XHR["asyncDispatch"](32, {type:X_EVENT_ERROR, status:status || 400, "headers":headers || null});
          }
          break;
        case "progress":
          if (e.lengthComputable) {
            X_XHR._percent = e.loaded / e.total * 100;
            live && X_XHR._percent < 100 && X_XHR["asyncDispatch"]({type:X_EVENT_PROGRESS, "percent":X_XHR._percent});
          }
          break;
        case "error":
          X_XHR._busy = false;
          X_XHR._error = X_UA["Prsto"] || X_UA["Webkit"];
          live && X_XHR["asyncDispatch"](32, {type:X_EVENT_ERROR, status:raw.status});
          break;
        case "timeout":
          X_XHR._busy = false;
          X_XHR._error = !!X_UA["Gecko"];
          X_XHR["asyncDispatch"]({type:X_EVENT_ERROR, "timeout":true, status:408});
          break;
      }
    }, onTimeout:function() {
      var raw = X_XHR["_rawObject"], live = !X_XHR._canceled || !X_XHR._busy;
      if (live || raw.readyState < 3) {
        X_XHR._busy = false;
        live && X_XHR["asyncDispatch"]({type:X_EVENT_ERROR, "timeout":true, status:408});
      }
      X_XHR._timerID = 0;
    }, onUploadProgress:X_XHR_upload && function(e) {
      !X_XHR._canceled && X_XHR["asyncDispatch"]({type:X_EVENT_PROGRESS, "percent":X_XHR._percent, "uploadPercent":e.loaded / e.total * 100});
    }};
  }
  function X_XHR_parseResponseHeaders(headerStr) {
    var headers = {}, headerPairs, i = 0, l, headerPair, index, key, val;
    if (!headerStr) {
      return headers;
    }
    headerPairs = headerStr.split("\r\n");
    for (l = headerPairs.length; i < l; ++i) {
      headerPair = headerPairs[i];
      index = headerPair.indexOf(": ");
      if (index > 0) {
        key = headerPair.substring(0, index);
        val = headerPair.substring(index + 2);
        headers[key] = val.split("\r\n").join("\n").split("\n");
      }
    }
    return headers;
  }
  X_TEMP.X_JSONP_cb = function(accessKey, jsonString, time, opt_json2FileSize) {
    if (accessKey !== X_JSONP_ACCESS_KEY || !X_JSONP._busy) {
      return;
    }
    X_JSONP._busy = false;
    X_JSONP["asyncDispatch"]({type:jsonString ? X_EVENT_SUCCESS : X_EVENT_ERROR, response:X_JSON_parseTrustableString(jsonString)});
    X_JSONP_errorTimerID && X_Timer_remove(X_JSONP_errorTimerID);
    console.log("ms : " + time + " speed : " + (jsonString.length + (opt_json2FileSize || 0)) / time * 1000 + " \u30d0\u30a4\u30c8/\u79d2.");
  };
  var X_JSONP_ACCESS_KEY = Math.random(), X_JSONP_maxOnloadCount, X_JSONP_onloadCount = 0, X_JSONP_errorTimerID;
  X_TEMP.X_JSONP_init = function() {
    X["Net"]["__json_cb__"] = X_TEMP.X_JSONP_cb;
    X_JSONP = X_Class_override(X_NinjaIframe(), X_TEMP.X_JSONP_params);
    delete X_TEMP.X_JSONP_cb;
    delete X_TEMP.X_JSONP_init;
    delete X_TEMP.X_JSONP_params;
    return X_JSONP;
  };
  X_TEMP.X_JSONP_params = {_busy:false, _canceled:false, load:function(option) {
    var url = option["url"], callback = option["callbackName"], charset = option["charset"], json2Path = window.RegExp ? "js/libs/json2.js" : "js/libs/json2_regfree.js", json2FileSize = 18103, html;
    if (!X_URL_isSameProtocol(url)) {
      return X_JSONP["asyncDispatch"](X_EVENT_ERROR);
    }
    if (!callback && !(callback = X_URL_paramToObj(url.split("?")[1])["callback"])) {
      url += "&callback=cb";
      callback = "cb";
    }
    charset = charset ? ' charset="' + charset + '"' : "";
    if (X_UA["Prsto"]) {
      html = [window["JSON"] ? "" : '<script src="' + json2Path + '">\x3c/script>', "<script>", 'onunload=function(){im.onload=im.onerror=""};', "nw=+new Date;", "function ", callback, "(o){if(nw){nw-=+new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw", window["JSON"] ? json2FileSize : 0, ");nw=0}}", "\x3c/script>", "<script", charset, ' id="jp">\x3c/script>', '<img id="im" src="', url, '" onload="jp.src=im.src" onerror="jp.src=im.src">'];
      X_JSONP_maxOnloadCount = 2;
    } else {
      if (X_UA["IE"] < 5 || X_UA["MacIE"]) {
        html = ['<script id="jn">\x3c/script>', "<script", charset, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", callback, "(o){nw-=new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw-16,", json2FileSize, ")}", 'function t1(){document.all.jn.src="', json2Path, '";id=setTimeout("t2()",16);nw=+new Date}', 'id=setTimeout("t1()",16);', 'function t2(){if(window.JSON){document.all.jp.src="', url, '"}else{id=setTimeout("t2()",16)}}', 
        "\x3c/script>"];
        X_JSONP_maxOnloadCount = 3;
      } else {
        if (X_UA["IE"] < 8) {
          html = ['<script id="jn">\x3c/script>', "<script", charset, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", callback, "(o){nw-=new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw-16,", json2FileSize, ")}", 'function t1(){jn.src="', json2Path, '";id=setTimeout(t2,16);nw=+new Date}', "id=setTimeout(t1,16);", 'function t2(){if(window.JSON){jp.src="', url, '"}else{id=setTimeout(t2,16)}}', "\x3c/script>"];
          X_JSONP_maxOnloadCount = 3;
        } else {
          if (X_UA["IE"] < 9) {
            html = ["<script", charset, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "nw=0;", "function ", callback, "(o){nw-=+new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",parent.X.JSON.stringify(o),-nw)}", 'function tm(){jp.src="', url, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"];
            X_JSONP_maxOnloadCount = 2;
          } else {
            if (X_UA["IE"] < 10) {
              html = ["<script", charset, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", callback, "(o){nw-=+new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw)}", 'function tm(){jp.src="', url, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"];
              X_JSONP_maxOnloadCount = 2;
            } else {
              if (window["JSON"]) {
                html = ["<script>", "nw=+new Date;", "function ", callback, "(o){if(nw){nw-=+new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw);nw=0}}", "\x3c/script>", "<script", charset, ' src="', url, '">\x3c/script>'];
                X_JSONP_maxOnloadCount = 1;
              } else {
                html = ["<script>", "function ", callback, "(o){if(nw){nw-=new Date;parent.X.Net.__json_cb__(" + X_JSONP_ACCESS_KEY + ",JSON.stringify(o),-nw,", json2FileSize, ");nw=0}}", "nw=+new Date;", "\x3c/script>", '<script src="', json2Path, '">\x3c/script>', "<script", charset, ' src="', url, '">\x3c/script>'];
                X_JSONP_maxOnloadCount = 2;
              }
            }
          }
        }
      }
    }
    X_JSONP["refresh"](html.join(""))["listen"](["ninjaload", "ninjaerror"], X_JSONP_iframeListener);
    X_JSONP._busy = true;
  }, cancel:function() {
    X_JSONP.reset();
    X_JSONP._canceled = true;
  }, reset:function() {
    X_JSONP._busy = X_JSONP._canceled = false;
    X_JSONP["unlisten"](["ninjaload", "ninjaerror"], X_JSONP_iframeListener);
    X_JSONP["refresh"]("");
    X_JSONP_errorTimerID && X_Timer_remove(X_JSONP_errorTimerID);
    X_JSONP_errorTimerID = X_JSONP_onloadCount = 0;
  }};
  function X_JSONP_iframeListener(e) {
    switch(e.type) {
      case "ninjaload":
        console.log("iframe onload, but " + X_JSONP_onloadCount + " < " + X_JSONP_maxOnloadCount);
        if (++X_JSONP_onloadCount < X_JSONP_maxOnloadCount) {
          return;
        }
        X_JSONP_errorTimerID = X_JSONP["asyncDispatch"](1000, X_EVENT_ERROR);
        break;
      case "ninjaerror":
        console.log("iframe onerror");
        X_JSONP["asyncDispatch"](X_EVENT_ERROR);
        break;
    }
    return X_CALLBACK_UN_LISTEN;
  }
  var X_FormSender_errorTimerID, X_FormSender_isLeave, X_FormSender_isSameDomain, X_FormSender_onloadCount = 0;
  X_TEMP.X_FormSender_init = function() {
    X_FormSender = X_Class_override(X_NinjaIframe(), X_TEMP.X_FormSender_params);
    delete X_TEMP.X_FormSender_init;
    delete X_TEMP.X_FormSender_params;
    return X_FormSender;
  };
  function X_FormSender_escapeQuote(str) {
    return X_String_toChrReferanceForHtmlSafety(str);
  }
  X_TEMP.X_FormSender_params = {_busy:false, _canceled:false, load:function(option) {
    var params = option["params"] || {}, url = option["url"], target = option["target"], timeout = option["timeout"], html, k;
    target = target === "_self" ? "_parent" : target === "_blank" ? "_self" : target || "_self", html = ['<form method="', X_FormSender_escapeQuote(option["method"] || "GET"), '" action="', X_FormSender_escapeQuote(url || ""), '" target="', X_FormSender_escapeQuote(target), '">'];
    X_FormSender_isLeave = target === "_top" || target === "_parent";
    X_FormSender_isSameDomain = X_URL_isSameDomain(url);
    for (k in params) {
      html.push('<input type="hidden" name="', X_FormSender_escapeQuote(k), '" value="', X_FormSender_escapeQuote(params[k] || ""), '">');
    }
    html.push("</form><script>document.forms[0].submit();\x3c/script>");
    X_FormSender["refresh"](html.join(""))["listen"](["ninjaload", "ninjaerror"], X_FormSender_iframeListener);
    if (0 < timeout) {
      X_FormSender_errorTimerID = X_FormSender["asyncDispatch"](timeout, {type:X_EVENT_ERROR, "timeout":true});
    }
    X_FormSender._busy = true;
  }, cancel:function() {
    X_FormSender.reset();
    X_FormSender._canceled = true;
  }, reset:function() {
    X_FormSender._busy = X_FormSender._canceled = false;
    X_FormSender["unlisten"](["ninjaload", "ninjaerror"], X_FormSender_iframeListener)["refresh"]("");
    X_FormSender_errorTimerID && X_Timer_remove(X_FormSender_errorTimerID);
    X_FormSender_errorTimerID = X_FormSender_onloadCount = 0;
  }};
  function X_FormSender_iframeListener(e) {
    var idoc;
    switch(e.type) {
      case "ninjaload":
        if (X_FormSender_isLeave) {
          return;
        }
        if (++X_FormSender_onloadCount === 1) {
          if (X_FormSender_isSameDomain) {
            idoc = this["_rawObject"].contentDocument || this._iwin.document;
            X_FormSender["asyncDispatch"]({type:X_EVENT_SUCCESS, response:idoc && idoc.body ? idoc.body.innerHTML : ""});
          } else {
            X_FormSender["asyncDispatch"]({type:X_EVENT_SUCCESS});
          }
        }
        break;
      case "ninjaerror":
        console.log("iframe onerror");
        X_FormSender["asyncDispatch"](X_EVENT_ERROR);
        break;
    }
    return X_CALLBACK_UN_LISTEN;
  }
  var X_ImgLoader_image = window["Image"] && new Image, X_ImgLoader_isElement = !(X_UA["IE"] < 9) && X_Type_isHTMLElement(X_ImgLoader_image), X_ImgLoader_0forError = !X_UA["IE"] || X_UA["IE"] === 11 || X_UA["IEHost"] === 11;
  X_TEMP.X_ImgLoader_init = function() {
    X_ImgLoader = X_Class_override(X_ImgLoader_isElement ? Node(X_ImgLoader_image) : X_EventDispatcher(X_ImgLoader_image), X_TEMP.X_ImgLoader_params);
    X_ImgLoader["listen"](["load", "error"], X_ImgLoader_handleEvent);
    delete X_TEMP.X_ImgLoader_init;
    delete X_TEMP.X_ImgLoader_params;
    return X_ImgLoader;
  };
  X_TEMP.X_ImgLoader_params = {tick:0, timerID:0, finish:false, abspath:"", delay:0, timeout:0, load:function(data) {
    this.abspath = X_URL_toAbsolutePath(data["url"]);
    this.delay = data["delay"] || 100;
    this.timeout = data["timeout"] || 5000;
    this["_rawObject"].src = this.abspath;
    if (X_UA["Opera"] < 8 && this["_rawObject"].complete) {
      this["asyncDispatch"]("load");
    } else {
      this.timerID = X_Timer_add(this.delay, 0, this, X_ImgLoader_detect);
    }
  }, cancel:function() {
    var raw = this["_rawObject"];
    raw && raw.abort && raw.abort();
    this.finish = true;
  }, reset:function() {
    this.timerID && X_Timer_remove(this.timerID);
    this.timerID = this.tick = 0;
    this.finish = false;
    this.abspath = "";
    this["_rawObject"].src = "";
  }};
  function X_ImgLoader_detect() {
    var raw = this["_rawObject"];
    if (this.finish) {
      return;
    }
    if (raw && raw.complete) {
      this.finish = true;
      if (raw.width) {
        return;
      }
      X_Timer_remove(this.timerID);
      this.timerID = this["asyncDispatch"](X_EVENT_ERROR);
    } else {
      if (this.timeout < (this.tick += this.delay)) {
        this.finish = true;
        X_Timer_remove(this.timerID);
        this.timerID = this["asyncDispatch"]({type:X_EVENT_ERROR, "timeout":true});
      }
    }
  }
  function X_ImgLoader_handleEvent(e) {
    var raw = this["_rawObject"], size;
    if (!this.abspath) {
      return;
    }
    switch(e.type) {
      case "error":
        if (X_ImgLoader_0forError && raw.width) {
          return;
        }
        if (this.finish) {
          return;
        }
        this.finish = true;
        this.timerID && X_Timer_remove(this.timerID);
        this.timerID = this["asyncDispatch"](this.timeout, X_EVENT_ERROR);
        break;
      case "load":
        this.finish = true;
        this.timerID && X_Timer_remove(this.timerID);
        if (X_UA["Prsto"] && !raw.complete) {
          this.timerID = this["asyncDispatch"](X_EVENT_ERROR);
          return;
        }
        size = X_Util_Image_getActualDimension(!X_ImgLoader_isElement ? this.abspath : this);
        this.timerID = this["asyncDispatch"]({"type":X_EVENT_SUCCESS, "src":this.abspath, "w":size[0], "h":size[1]});
        break;
    }
  }
  var X_GadgetXHR_canUse = 5.5 <= X_UA["IE"] || !X_UA["IE"], X_GadgetXHR_iframeName = "gadgetProxy_" + (Math.random() * 100000 | 0), X_GadgetXHR_GADGET_XML_URL = "http://googledrive.com/host/0B4Y86MXyTfuoVUkwTE54T3V1V1U", X_GadgetXHR_GADGET_URL = "http://www.ig.gmodules.com/gadgets/ifr?url=" + encodeURIComponent(X_GadgetXHR_GADGET_XML_URL) + "&nocache=1", X_GadgetXHR_IMAGE_URL = "img/opacity0.gif", X_GadgetXHR_maxQueryLength = X_UA["IE"] ? 2000 : 6000, X_GadgetXHR_requestBatches, X_GadgetXHR_requestOriginal, 
  X_GadgetXHR_timerID, X_GadgetXHR_phase = 0, X_GadgetXHR_lastHashString, X_GadgetXHR_isReceiveBatches, X_GadgetXHR_receivedString = "";
  function X_GadgetXHR_detectImageOverIframe() {
    var raw = X_GadgetXHR["_rawObject"], iwin, frames, i, ret, n;
    if (raw) {
      iwin = raw.contentWindow || raw.contentDocument && raw.contentDocument.parentWindow || window.frames[X_GadgetXHR_iframeName];
      if (iwin && (frames = iwin.frames) && (i = frames.length)) {
        for (; i;) {
          if (ret = X_Script_try(X_Object_find, [frames[--i], "location>hash"])) {
            break;
          }
        }
        if (ret && ret !== X_GadgetXHR_lastHashString) {
          X_GadgetXHR_lastHashString = ret;
          switch(X_GadgetXHR_phase) {
            case 0:
              iwin.location.href = X_GadgetXHR_GADGET_URL + "#" + X_GadgetXHR_requestBatches.shift();
              if (X_GadgetXHR_requestBatches.length) {
                return;
              }
              break;
            case 1:
              iwin.location.href = X_GadgetXHR_GADGET_URL + "#_waiting_";
              break;
            case 2:
              ret = ret.substr(1);
              n = parseFloat(ret);
              if (X_GadgetXHR_isReceiveBatches) {
                X_GadgetXHR_receivedString += X_GadgetXHR_decodeLocationHash(ret);
                if (--X_GadgetXHR_isReceiveBatches) {
                  iwin.location.href = X_GadgetXHR_GADGET_URL + "#_recived_" + X_GadgetXHR_isReceiveBatches;
                  return;
                }
              } else {
                if (1 < n) {
                  ret = ret.substr((n + ":").length);
                  X_GadgetXHR_receivedString = X_GadgetXHR_decodeLocationHash(ret);
                  X_GadgetXHR_isReceiveBatches = --n;
                  iwin.location.href = X_GadgetXHR_GADGET_URL + "#_recived_" + X_GadgetXHR_isReceiveBatches;
                  X_GadgetXHR_timerID = X_Timer_add(16, 0, X_GadgetXHR_detectImageOverIframe);
                  return X_CALLBACK_UN_LISTEN;
                } else {
                  X_GadgetXHR_receivedString = X_GadgetXHR_decodeLocationHash(ret);
                }
              }
              X_GadgetXHR["asyncDispatch"](X_JSON_parseTrustableString(X_GadgetXHR_receivedString));
              X_GadgetXHR_receivedString = "";
              X_GadgetXHR._busy = false;
              X_GadgetXHR_timerID = X_GadgetXHR_phase = 0;
              X_GadgetXHR_lastHashString = "";
              iwin.location.href = X_GadgetXHR_GADGET_URL + "#_recived_";
              return X_CALLBACK_UN_LISTEN;
          }
          ++X_GadgetXHR_phase;
        }
      }
    }
  }
  function X_GadgetXHR_decodeLocationHash(str) {
    return X_UA["Gecko"] ? unescape(str) : decodeURIComponent(str);
  }
  X_TEMP.X_GadgetXHR_init = function() {
    X_GadgetXHR = X_Class_override(X_Node_systemNode.create("iframe", {className:"hidden-iframe", name:X_GadgetXHR_iframeName, id:X_GadgetXHR_iframeName, src:X_GadgetXHR_GADGET_URL + "#" + encodeURIComponent(X_JSON_stringify({"img":X_URL_toAbsolutePath(X_GadgetXHR_IMAGE_URL), "len":X_GadgetXHR_maxQueryLength, "itv":333, "gck":X_UA["Gecko"] ? 1 : 0, "err":X_EVENT_ERROR, "suc":X_EVENT_SUCCESS})), scrolling:"no", allowtransparency:"no", frameborder:0, tabindex:-1}), X_TEMP.X_GadgetXHR_props);
    delete X_TEMP.X_GadgetXHR_init;
    delete X_TEMP.X_GadgetXHR_props;
    X_GadgetXHR_requestBatches = [];
    return X_GadgetXHR;
  };
  X_TEMP.X_GadgetXHR_props = {_busy:false, _canceled:false, _onloadCount:0, load:function(obj) {
    var req = {}, k, max, sendStr, l, str;
    X_GadgetXHR_requestOriginal = obj;
    for (k in obj) {
      switch(k) {
        case "url":
        case "postdata":
        case "method":
        case "dataType":
        case "headers":
        case "cashe":
          req[k] = obj[k];
          break;
      }
    }
    max = X_GadgetXHR_maxQueryLength - X_GadgetXHR_GADGET_URL.length - 5;
    sendStr = X["JSON"].stringify(req);
    while (sendStr.length) {
      l = max;
      str = encodeURIComponent(sendStr.substr(0, l));
      while (max < str.length) {
        l = l * (2 + l / str.length) / 3 | 0;
        str = encodeURIComponent(sendStr.substr(0, l));
      }
      X_GadgetXHR_requestBatches.push(str);
      sendStr = sendStr.substr(l);
      str = "";
    }
    sendStr = "";
    if (1 < X_GadgetXHR_requestBatches.length) {
      X_GadgetXHR_requestBatches[0] = X_GadgetXHR_requestBatches.length + ":" + X_GadgetXHR_requestBatches[0];
    }
    X_GadgetXHR_timerID = X_Timer_add(333, 0, X_GadgetXHR_detectImageOverIframe);
    X_GadgetXHR._busy = true;
  }, cancel:function() {
    X_GadgetXHR._canceled = true;
  }, reset:function() {
    X_GadgetXHR._busy = X_GadgetXHR._canceled = false;
    X_GadgetXHR._onloadCount = 0;
  }};
  var X_OAUTH2_authWindow, X_OAUTH2_authTimerID;
  X["OAuth2"] = X_EventDispatcher["inherits"]("X.OAuth2", X_Class.NONE, {"Constructor":function(obj) {
    var expires_at;
    obj = X_Object_copy(obj);
    obj["refreshMargin"] = obj["refreshMargin"] || 300000;
    X_Pair_create(this, obj);
    obj.onAuthError = X_NET_OAUTH2_onXHR401Error;
    obj.updateRequest = X_NET_OAUTH2_updateRequest;
    if (X_OAuth2_getAccessToken(this) && (expires_at = X_OAuth2_getAccessTokenExpiry(this))) {
      if (expires_at < X_Timer_now() + obj["refreshMargin"]) {
        this["refreshToken"]();
      } else {
        obj.oauth2State = 4;
        this["asyncDispatch"](X_EVENT_SUCCESS);
      }
    } else {
      this["asyncDispatch"](X_EVENT_NEED_AUTH);
    }
    this["listen"]([X_EVENT_KILL_INSTANCE, X_EVENT_SUCCESS, X_EVENT_ERROR, X_EVENT_NEED_AUTH], X_OAUTH2_handleEvent);
  }, "state":function() {
    return X_Pair_get(this).oauth2State || 0;
  }, "requestAuth":function() {
    var e = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1], w, h, pair;
    if (!e || !e["pointerType"]) {
      alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e popup! " + (e ? e.type : ""));
      return;
    }
    if (X_OAUTH2_authWindow) {
      return;
    }
    pair = X_Pair_get(this);
    if (pair.net || pair.oauth2State) {
      return;
    }
    w = pair["authorizeWindowWidth"] || 500;
    h = pair["authorizeWindowHeight"] || 500;
    X_OAUTH2_authWindow = X_Window({"url":X_URL_create(pair["authorizeEndpoint"], {"response_type":"code", "client_id":pair["clientID"], "redirect_uri":pair["redirectURI"], "scope":(pair["scopes"] || []).join(" ")}), "name":"oauthauthorize", "params":"width=" + w + ",height=" + h + ",left=" + (screen.width - w) / 2 + ",top=" + (screen.height - h) / 2 + ",menubar=no,toolbar=no"})["listen"](X_EVENT_UNLOAD, this, X_OAuth2_detectAuthPopup);
    X_OAUTH2_authTimerID = X_Timer_add(333, 0, this, X_OAuth2_detectAuthPopup);
    pair.oauth2State = 1;
    this["asyncDispatch"]({type:X_EVENT_PROGRESS, message:"Start to auth."});
  }, "cancelAuth":function() {
    var pair = X_Pair_get(this);
    if (pair.net) {
      pair.net["kill"]();
      delete pair.net;
    }
    if (pair.oauth2State !== 1) {
      return;
    }
    if (X_OAUTH2_authWindow) {
      X_OAUTH2_authWindow["kill"]();
      X_OAUTH2_authWindow = null;
    }
    X_OAUTH2_authTimerID && X_Timer_remove(X_OAUTH2_authTimerID);
    X_OAUTH2_authTimerID = 0;
    this["asyncDispatch"](X_EVENT_CANCELED);
  }, "refreshToken":function() {
    var pair = X_Pair_get(this), refreshToken = X_OAuth2_getRefreshToken(this);
    if (!refreshToken) {
      pair.oauth2State = 0;
      this["asyncDispatch"](X_EVENT_NEED_AUTH);
      return;
    }
    if (pair.net) {
      return;
    }
    if (pair.refreshTimerID) {
      X_Timer_remove(pair.refreshTimerID);
      delete pair.refreshTimerID;
    }
    pair.oauth2State = 3;
    pair.net = X.Net({"xhr":pair["tokenEndpoint"], "postdata":X_URL_objToParam({"client_id":pair["clientID"], "client_secret":pair["clientSecret"], "grant_type":"refresh_token", "refresh_token":refreshToken}), "dataType":"json", "headers":{"Accept":"application/json", "Content-Type":"application/x-www-form-urlencoded"}, "test":"gadget"}).listenOnce([X_EVENT_SUCCESS, X_EVENT_ERROR], this, X_OAuth2_responceHandler);
    this["asyncDispatch"]({type:X_EVENT_PROGRESS, message:"Start to refresh token."});
  }});
  function X_OAUTH2_handleEvent(e) {
    var pair = X_Pair_get(this);
    switch(e.type) {
      case X_EVENT_KILL_INSTANCE:
        this["cancelAuth"]();
      case X_EVENT_ERROR:
      case X_EVENT_NEED_AUTH:
        pair.refreshTimerID && X_Timer_remove(pair.refreshTimerID);
        break;
      case X_EVENT_SUCCESS:
        pair.refreshTimerID && X_Timer_remove(pair.refreshTimerID);
        if (X_OAuth2_getRefreshToken(this)) {
          pair.refreshTimerID = X_Timer_once(X_OAuth2_getAccessTokenExpiry(this) - X_Timer_now() - pair["refreshMargin"], this, this["refreshToken"]);
        }
    }
  }
  function X_OAuth2_detectAuthPopup(e) {
    var pair = X_Pair_get(this), status, search;
    if (X_OAUTH2_authWindow["closed"]()) {
      status = 0;
      this["asyncDispatch"](X_EVENT_CANCELED);
    } else {
      if (search = X_OAUTH2_authWindow["find"]("location>search")) {
        pair = X_Pair_get(this);
        pair.code = X_URL_paramToObj(search.slice(1))["code"];
        status = 2;
        X_OAuth2_authorizationCode(this, pair);
        this["asyncDispatch"]({type:X_EVENT_PROGRESS, message:"Get code success, then authorization code."});
      }
    }
    if (0 <= status) {
      pair = pair || X_Pair_get(this);
      pair.oauth2State = status;
      X_OAUTH2_authWindow["kill"]();
      X_OAUTH2_authWindow = null;
      X_OAUTH2_authTimerID = X_Timer_remove(X_OAUTH2_authTimerID);
      return X_CALLBACK_UN_LISTEN;
    }
  }
  function X_OAuth2_authorizationCode(oauth2, pair) {
    pair.net = X.Net({"xhr":pair["tokenEndpoint"], "postdata":X_URL_objToParam({"client_id":pair["clientID"], "client_secret":pair["clientSecret"], "grant_type":"authorization_code", "code":pair.code, "redirect_uri":pair["redirectURI"]}), "dataType":"json", "headers":{"Accept":"application/json", "Content-Type":"application/x-www-form-urlencoded"}, "test":"gadget"}).listenOnce([X_EVENT_SUCCESS, X_EVENT_ERROR], oauth2, X_OAuth2_responceHandler);
  }
  function X_OAuth2_responceHandler(e) {
    var data = e.response, pair = X_Pair_get(this), isRefresh = pair.oauth2State === 3;
    delete pair.net;
    switch(e.type) {
      case X_EVENT_SUCCESS:
        if (isRefresh && data.error) {
          X_OAuth2_removeRefreshToken(this);
          pair.oauth2State = 0;
          this["asyncDispatch"]({type:X_EVENT_ERROR, message:"Refresh access token error."});
          this["asyncDispatch"](X_EVENT_NEED_AUTH);
          return;
        } else {
          if (data.error) {
            pair.oauth2State = 0;
            this["asyncDispatch"]({type:X_EVENT_ERROR, message:"Get new access token error."});
            this["asyncDispatch"](X_EVENT_NEED_AUTH);
            return;
          }
        }
        X_OAuth2_setAccessToken(this, data["access_token"] || "");
        (!isRefresh || data["refresh_token"]) && X_OAuth2_setRefreshToken(this, data["refresh_token"] || "");
        if (data["expires_in"]) {
          X_OAuth2_setAccessTokenExpiry(this, X_Timer_now() + data["expires_in"] * 1000);
        } else {
          if (X_OAuth2_getAccessTokenExpiry(this)) {
            X_OAuth2_removeAccessTokenExpiry(this);
          }
        }
        pair.oauth2State = 4;
        if (pair.lazyRequests && pair.lazyRequests.length) {
        }
        this["asyncDispatch"]({type:X_EVENT_SUCCESS, message:isRefresh ? "Refresh access token success." : "Get new access token success."});
        break;
      case X_EVENT_ERROR:
        if (isRefresh) {
          pair.oauth2State = 0;
          this["asyncDispatch"]({type:X_EVENT_ERROR, message:"Refresh access token error."});
          X_OAuth2_removeRefreshToken(this);
          this["asyncDispatch"](X_EVENT_NEED_AUTH);
        } else {
          if (X_OAuth2_getAuthMechanism(this) === "param") {
            pair.oauth2State = 0;
            this["asyncDispatch"]({type:X_EVENT_ERROR, message:"network-error"});
          } else {
            pair.oauth2State = 0;
            X_OAuth2_setAuthMechanism(this, "param");
            this["asyncDispatch"]({type:X_EVENT_PROGRESS, message:"Refresh access token failed. retry header -> param. "});
            X_OAuth2_authorizationCode(this, pair);
          }
        }
        break;
    }
  }
  function X_NET_OAUTH2_onXHR401Error(oauth2, e) {
    var pair = this, headers = e["headers"], bearerParams, headersExposed = false;
    if (X_OAuth2_getAuthMechanism(oauth2) !== "param") {
      headersExposed = !X_NET_currentWrapper.isXDR || !!headers;
      bearerParams = headersExposed && (headers["WWW-Authenticate"] || headers["www-authenticate"]);
      X_Type_isArray(bearerParams) && (bearerParams = bearerParams.join("\n"));
    }
    if (bearerParams && bearerParams.indexOf(" error=") === -1) {
      pair.oauth2State = 0;
      oauth2["asyncDispatch"](X_EVENT_NEED_AUTH);
    } else {
      if ((bearerParams && bearerParams.indexOf("invalid_token") !== -1 || !headersExposed) && X_OAuth2_getRefreshToken(oauth2)) {
        X_OAuth2_removeAccessToken(oauth2);
        pair.oauth2State = 3;
        oauth2["refreshToken"]();
      } else {
        X_OAuth2_removeAccessToken(oauth2);
        pair.oauth2State = 0;
        oauth2["asyncDispatch"](X_EVENT_NEED_AUTH);
      }
    }
  }
  function X_NET_OAUTH2_updateRequest(oauth2, request) {
    var token = X_OAuth2_getAccessToken(oauth2), mechanism = X_OAuth2_getAuthMechanism(oauth2), url = request["url"], headers;
    if (token && mechanism === "param") {
      request["url"] = X_URL_create(url, {"bearer_token":encodeURIComponent(token)});
    }
    if (token && (!mechanism || mechanism === "header")) {
      headers = request["headers"] || (request["headers"] = {});
      headers["Authorization"] = "Bearer " + token;
    }
  }
  function X_OAuth2_getAccessToken(that) {
    return X_OAuth2_updateLocalStorage("", that, "accessToken");
  }
  function X_OAuth2_getRefreshToken(that) {
    return X_OAuth2_updateLocalStorage("", that, "refreshToken");
  }
  function X_OAuth2_getAccessTokenExpiry(that) {
    return parseFloat(X_OAuth2_updateLocalStorage("", that, "tokenExpiry")) || 0;
  }
  function X_OAuth2_getAuthMechanism(that) {
    return X_NET_currentWrapper === X_XHR && X_XHR_createXDR ? "param" : X_OAuth2_updateLocalStorage("", that, "AuthMechanism");
  }
  function X_OAuth2_setAccessToken(that, value) {
    X_OAuth2_updateLocalStorage("+", that, "accessToken", value);
  }
  function X_OAuth2_setRefreshToken(that, value) {
    X_OAuth2_updateLocalStorage("+", that, "refreshToken", value);
  }
  function X_OAuth2_setAccessTokenExpiry(that, value) {
    X_OAuth2_updateLocalStorage("+", that, "tokenExpiry", value);
  }
  function X_OAuth2_setAuthMechanism(that, value) {
    X_OAuth2_updateLocalStorage("+", that, "AuthMechanism", value);
  }
  function X_OAuth2_removeAccessToken(that) {
    X_OAuth2_updateLocalStorage("-", that, "accessToken");
  }
  function X_OAuth2_removeRefreshToken(that) {
    X_OAuth2_updateLocalStorage("-", that, "refreshToken");
  }
  function X_OAuth2_removeAccessTokenExpiry(that) {
    X_OAuth2_updateLocalStorage("-", that, "tokenExpiry");
  }
  function X_OAuth2_removeAuthMechanism(that) {
    X_OAuth2_updateLocalStorage("-", that, "AuthMechanism");
  }
  function X_OAuth2_updateLocalStorage(cmd, that, name, value) {
    var action = cmd === "+" ? "setItem" : cmd === "-" ? "removeItem" : "getItem", pair;
    if (window.localStorage) {
      return window.localStorage[action](X_Pair_get(that)["clientID"] + name, value);
    }
    pair = X_Pair_get(that);
    switch(cmd) {
      case "+":
        pair[name] = value;
        break;
      case "-":
        if (pair[name] !== undefined) {
          delete pair[name];
        }
    }
    return pair[name];
  }
  var X_Audio_BACKENDS = [];
  X_TEMP.onSystemReady.push(function() {
    var canPlay = X["Audio"]["canPlay"] = {}, i = X_Audio_BACKENDS.length, be;
    for (; i;) {
      be = X_Audio_BACKENDS[--i];
      X_Object_override(canPlay, be.canPlay);
      X["Audio"][be.backendName] = be.backendID;
    }
  });
  X["Audio"] = X_EventDispatcher["inherits"]("X.Audio", X_Class.NONE, {"source":"", "backendName":"", "Constructor":function(sourceList, opt_option) {
    X_Audio_startDetectionBackend(X_Audio_BACKENDS[0], this, X_Type_isArray(sourceList) ? X_Array_copy(sourceList) : [sourceList], opt_option || {});
    this["listenOnce"]([X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE, X_EVENT_KILL_INSTANCE], X_Audio_handleEvent);
    X_ViewPort["listenOnce"](X_EVENT_UNLOAD, this, X_Audio_handleEvent);
  }, "play":function(startTime, endTime, loop, loopStartTime, loopEndTime) {
    var pair = X_Pair_get(this);
    pair && pair.play(startTime, endTime, loop, loopStartTime, loopEndTime);
    return this;
  }, "seek":function(seekTime) {
    var pair = X_Pair_get(this);
    pair && pair.seek(seekTime);
    return this;
  }, "pause":function() {
    var pair = X_Pair_get(this);
    pair && pair.pause();
    return this;
  }, "state":function(obj) {
    var pair = X_Pair_get(this);
    if (obj === undefined) {
      return pair ? pair.getState() : {"startTime":-1, "endTime":-1, "loopStartTime":-1, "loopEndTime":-1, "currentTime":-1, "loop":false, "looded":false, "error":0, "autoplay":false, "playing":false, "source":this["source"], "duration":0, "volume":0.5};
    }
    pair && pair.setState(obj);
    return this;
  }, "loop":function(v) {
    var pair = X_Pair_get(this);
    pair && pair.loop(v);
    return this;
  }, "volume":function(v) {
    var pair = X_Pair_get(this);
    pair && pair.volume(v);
    return this;
  }, "currentTime":function(v) {
    var pair = X_Pair_get(this);
    pair && pair.currentTime(v);
    return this;
  }, "isPlaying":function() {
    var pair = X_Pair_get(this);
    return pair && pair.playing;
  }});
  function X_Audio_handleEvent(e) {
    var backend, src, pair;
    switch(e.type) {
      case X_EVENT_BACKEND_READY:
        backend = X_Audio_BACKENDS[e["backendID"]];
        this["unlisten"](X_EVENT_BACKEND_NONE, X_Audio_handleEvent);
        this["source"] = e["source"];
        this["backendName"] = backend.backendName;
        X_Pair_create(this, backend.klass(this, e["source"], e["option"]));
        this["listenOnce"](X_EVENT_READY, X_Audio_handleEvent);
        break;
      case X_EVENT_READY:
        pair = X_Pair_get(this);
        (pair.autoplay || pair._playReserved) && pair.actualPlay();
        delete pair._playReserved;
        break;
      case X_EVENT_BACKEND_NONE:
      case X_EVENT_UNLOAD:
        this["kill"]();
        break;
      case X_EVENT_KILL_INSTANCE:
        X_ViewPort["unlisten"](X_EVENT_UNLOAD, this, X_Audio_handleEvent);
        if (backend = X_Pair_get(this)) {
          backend["kill"]();
          X_Pair_release(this, backend);
        }
        break;
    }
  }
  function X_Audio_startDetectionBackend(backend, xaudio, sourceList, option) {
    var source = sourceList[0] || "", hash = X_URL_paramToObj(X_URL_getHash(source)), ext = hash["ext"] || X_URL_getEXT(source), sup;
    if (source && backend) {
      sup = [xaudio, sourceList, option, source, ext];
      sup[5] = sup;
      xaudio["listenOnce"](X_EVENT_COMPLETE, backend, X_Audio_onEndedDetection, sup);
      backend.detect(xaudio, ext, hash);
    } else {
      xaudio["asyncDispatch"](X_EVENT_BACKEND_NONE);
    }
  }
  function X_Audio_onEndedDetection(e, xaudio, sourceList, option, source, ext, sup) {
    var i = X_Audio_BACKENDS.indexOf(this), _e, hash, backend;
    if (e.canPlay) {
      _e = {type:X_EVENT_BACKEND_READY, "option":option, "source":source, "backendName":this.backendName, "backendID":i};
      if (this.backendID === 1) {
        _e["needTouchForPlay"] = X_WebAudio_isNoTouch;
      }
      if (this.backendID === 2) {
        _e["needTouchForLoad"] = X_HTMLAudio_need1stTouch;
      }
      xaudio["asyncDispatch"](_e);
    } else {
      console.log("No " + source + " " + this.backendName);
      if (sup[3] = source = sourceList[sourceList.indexOf(source) + 1]) {
        hash = X_URL_paramToObj(X_URL_getHash(source));
        sup[4] = ext = hash["ext"] || X_URL_getEXT(source);
        xaudio["listenOnce"](X_EVENT_COMPLETE, this, X_Audio_onEndedDetection, sup);
        this.detect(xaudio, ext, hash);
      } else {
        if (backend = X_Audio_BACKENDS[i + 1]) {
          X_Audio_startDetectionBackend(backend, xaudio, sourceList, option);
        } else {
          xaudio["asyncDispatch"](X_EVENT_BACKEND_NONE);
        }
      }
    }
  }
  var X_AudioBase = X_EventDispatcher["inherits"]("X.AudioBase", X_Class.ABSTRACT, {dispatcher:null, startTime:0, endTime:-1, loopStartTime:-1, loopEndTime:-1, seekTime:-1, duration:0, playing:false, error:0, autoLoop:false, looped:false, autoplay:false, gain:0.5, _playReserved:false, play:function(startTime, endTime, loop, loopStartTime, loopEndTime) {
    if (0 <= startTime) {
      this.setState({"currentTime":startTime, "startTime":startTime, "endTime":endTime, "loop":loop, "looped":false, "loopStartTime":loopStartTime, "loopEndTime":loopEndTime});
    }
    this.actualPlay();
  }, seek:function(seekTime) {
    if (seekTime < X_Audio_getEndTime(this)) {
      this.setState({"currentTime":seekTime});
    }
  }, pause:function() {
    this.seekTime = this.getActualCurrentTime();
    this.playing && this.actualPause();
  }, loop:function(v) {
    if (v === undefined) {
      return this.autoLoop;
    }
    this.setState({"loop":v});
  }, volume:function(v) {
    if (v === undefined) {
      return this.gain;
    }
    this.setState({"volume":v});
  }, currentTime:function(v) {
    if (v === undefined) {
      return this.playing ? this.getActualCurrentTime() : this.seekTime;
    }
    this.setState({"currentTime":v});
  }, getState:function() {
    return {"startTime":this.startTime, "endTime":this.endTime < 0 ? this.duration : this.endTime, "loopStartTime":this.loopStartTime < 0 ? this.startTime : this.loopStartTime, "loopEndTime":this.loopEndTime < 0 ? this.endTime || this.duration : this.loopEndTime, "loop":this.autoLoop, "looped":this.looped, "volume":this.gain, "playing":this.playing, "duration":this.duration, "autoplay":this.autoplay, "currentTime":this.playing ? this.getActualCurrentTime() : this.seekTime, "error":this.getActualError ? 
    this.getActualError() : this.error};
  }, setState:function(obj) {
    var playing = this.playing, k, v, end = 0, seek = 0, volume = 0;
    for (k in obj) {
      v = obj[k];
      switch(k) {
        case "currentTime":
          v = X_Audio_timeStringToNumber(v);
          if (X_Type_isNumber(v)) {
            if (playing) {
              if (this.getActualCurrentTime() !== v) {
                seek = 2;
                this.seekTime = v;
              }
            } else {
              this.seekTime = v;
            }
          } else {
            continue;
          }
          break;
        case "startTime":
          v = X_Audio_timeStringToNumber(v);
          if (v || v === 0) {
            if (this.startTime !== v) {
              this.startTime = v;
            }
          } else {
            delete this.startTime;
          }
          break;
        case "endTime":
          v = X_Audio_timeStringToNumber(v);
          if (v || v === 0) {
            if (this.endTime !== v) {
              this.endTime = v;
              if (playing) {
                end = 1;
              }
            }
          } else {
            delete this.endTime;
            if (playing) {
              end = 1;
            }
          }
          break;
        case "loopStartTime":
          v = X_Audio_timeStringToNumber(v);
          if (v || v === 0) {
            if (this.loopStartTime !== v) {
              this.loopStartTime = v;
            }
          } else {
            delete this.loopStartTime;
          }
          break;
        case "loopEndTime":
          v = X_Audio_timeStringToNumber(v);
          if (v || v === 0) {
            if (this.loopEndTime !== v) {
              this.loopEndTime = v;
              if (playing) {
                end = 1;
              }
            }
          } else {
            delete this.loopEndTime;
            if (playing) {
              end = 1;
            }
          }
          break;
        case "looped":
          if (X_Type_isBoolean(v) && this.looped !== v) {
            this.looped = v;
            if (playing) {
              seek = 2;
            }
          }
          break;
        case "loop":
          if (X_Type_isBoolean(v) && this.autoLoop !== v) {
            this.autoLoop = v;
          }
          break;
        case "autoplay":
          if (X_Type_isBoolean(v) && this.autoplay !== v) {
            this.autoplay = v;
          }
          break;
        case "volume":
          if (X_Type_isNumber(v)) {
            v = v < 0 ? 0 : 1 < v ? 1 : v;
            if (this.gain !== v) {
              this.gain = v;
              if (playing) {
                volume = 4;
              }
            }
          }
          break;
        case "useVideo":
          break;
        default:
          alert("bad arg! " + k);
      }
    }
    if (this.endTime < this.startTime || (this.loopEndTime < 0 ? this.endTime : this.loopEndTime) < (this.loopStartTime < 0 ? this.startTime : this.loopStartTime) || X_Audio_getEndTime(this) < this.seekTime) {
      console.log("setState 0:" + this.startTime + " -> " + this.endTime + " looped:" + this.looped + " 1:" + this.loopStartTime + " -> " + this.loopEndTime);
      return;
    }
    v = end + seek + volume;
    return v && this.playing && this.afterUpdateState(v);
  }});
  function X_Audio_timeStringToNumber(time) {
    var ary, ms, s = 0, m = 0, h = 0;
    if (X_Type_isNumber(time)) {
      return time;
    }
    if (!X_Type_isString(time) || !time.length) {
      return;
    }
    ary = time.split(".");
    ms = parseFloat((ary[1] + "000").substr(0, 3)) || 0;
    ary = ary[0].split(":");
    if (3 < ary.length) {
      return;
    }
    switch(ary.length) {
      case 0:
        break;
      case 1:
        s = parseFloat(ary[0]) || 0;
        break;
      case 2:
        m = parseFloat(ary[0]) || 0;
        s = parseFloat(ary[1]) || 0;
        if (60 <= s) {
          alert("invalid time string " + time);
        }
        break;
      case 3:
        h = parseFloat(ary[0]) || 0;
        m = parseFloat(ary[1]) || 0;
        s = parseFloat(ary[2]) || 0;
        if (60 <= s) {
          alert("invalid time string " + time);
        }
        if (60 <= m) {
          alert("invalid time string " + time);
        }
        break;
      default:
        alert("invalid time string " + time);
    }
    ms = (h * 3600 + m * 60 + s) * 1000 + ms;
    return ms < 0 ? 0 : ms;
  }
  function X_Audio_getStartTime(audioBase, endTime, delSeekTime) {
    var seek = audioBase.seekTime;
    if (delSeekTime) {
      delete audioBase.seekTime;
    }
    if (0 <= seek) {
      if (audioBase.duration <= seek || endTime < seek) {
        return 0;
      }
      return seek;
    }
    if (audioBase.looped && 0 <= audioBase.loopStartTime) {
      if (audioBase.duration <= audioBase.loopStartTime || endTime < audioBase.loopStartTime) {
        return 0;
      }
      return audioBase.loopStartTime;
    }
    if (audioBase.startTime < 0 || audioBase.duration <= audioBase.startTime) {
      return 0;
    }
    return audioBase.startTime;
  }
  function X_Audio_getEndTime(audioBase) {
    var duration = audioBase.duration;
    if (audioBase.looped && 0 <= audioBase.loopEndTime) {
      if (duration <= audioBase.loopEndTime) {
        return duration;
      }
      return audioBase.loopEndTime;
    }
    if (audioBase.endTime < 0 || duration <= audioBase.endTime) {
      return duration;
    }
    return audioBase.endTime;
  }
  var X_Audio_constructor = 3.1 <= X_UA["Safari"] && X_UA["Safari"] < 4 ? function(s, a) {
    a = document.createElement("audio");
    a.src = s;
    a.load();
    return a;
  } : !(X_UA["Android"] < 2) ? window["Audio"] || window.HTMLAudioElement : null, X_Audio_blinkOperaFix = X_UA["OPR"] && X_UA["Windows"], X_Audio_codecs;
  if (X_Audio_constructor) {
    X_TEMP.rawAudio = new X_Audio_constructor("");
    if (X_TEMP.rawAudio.canPlayType) {
      X_Audio_codecs = {"mp3":X_TEMP.rawAudio.canPlayType("audio/mpeg"), "opus":X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="opus"'), "ogg":X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="vorbis"'), "wav":X_TEMP.rawAudio.canPlayType('audio/wav; codecs="1"'), "aac":X_TEMP.rawAudio.canPlayType("audio/aac"), "m4a":X_TEMP.rawAudio.canPlayType("audio/x-m4a") + X_TEMP.rawAudio.canPlayType("audio/m4a") + X_TEMP.rawAudio.canPlayType("audio/aac"), "mp4":X_TEMP.rawAudio.canPlayType("audio/x-mp4") + X_TEMP.rawAudio.canPlayType("audio/mp4") + 
      X_TEMP.rawAudio.canPlayType("audio/aac"), "weba":X_TEMP.rawAudio.canPlayType('audio/webm; codecs="vorbis"')};
      (function(X_Audio_codecs, k, v) {
        for (k in X_Audio_codecs) {
          v = X_Audio_codecs[k];
          v = v && !!v.split("no").join("");
          if (v) {
            console.log(k + " " + X_Audio_codecs[k]);
            X_Audio_codecs[k] = true;
          } else {
            delete X_Audio_codecs[k];
          }
        }
        if (X_Audio_blinkOperaFix) {
          delete X_Audio_codecs["mp3"];
        }
      })(X_Audio_codecs);
    } else {
      X_Audio_codecs = {"mp3":X_UA["IE"] || X_UA["Chrome"] || X_UA["Windows"] && X_UA["Safari"], "ogg":5 <= X_UA["Gecko"] || X_UA["Chrome"] || X_UA["Prsto"], "wav":X_UA["Gecko"] || X_UA["Prsto"] || X_UA["Windows"] && X_UA["Safari"], "aac":X_UA["IE"] || X_UA["WebKit"], "m4a":X_UA["IE"] || X_UA["WebKit"], "mp4":X_UA["IE"] || X_UA["WebKit"], "weba":2 <= X_UA["Gecko"] || 10.6 <= X_UA["Prsto"]};
      (function(X_Audio_codecs, k) {
        for (k in X_Audio_codecs) {
          if (X_Audio_codecs[k]) {
            console.log(k + " " + X_Audio_codecs[k]);
            X_Audio_codecs[k] = true;
          } else {
            delete X_Audio_codecs[k];
          }
        }
      })(X_Audio_codecs);
    }
    if (X_Audio_blinkOperaFix) {
      X_Audio_constructor = null;
      delete X_TEMP.rawAudio;
    }
  }
  var X_WebAudio_Context = (!X_UA["iOS"] || X_UA["iPhone"] === "5+" || X_UA["iPad"] === "3+|2min+" || X_UA["iPod"] === "5+") && !(X_UA["Fennec"] && !(4 <= X_UA["Android"])) && !X_UA["AOSP"] && !(X_UA["ChromeWV"] < 5) && (window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"]), X_WebAudio_context, X_WebAudio_BUFFER_LIST = [], X_WebAudio_need1stTouch = X_UA["iOS"], X_WebAudio_isNoTouch = X_WebAudio_need1stTouch, X_WebAudio_needRateFix = X_WebAudio_need1stTouch, X_WebAudio, 
  X_WebAudio_BufferLoader, X_WebAudio_fpsFix;
  if (X_WebAudio_Context) {
    X_WebAudio_context = new X_WebAudio_Context;
    if (X_WebAudio_needRateFix) {
      X_TEMP.webAudioSampleRateFix = function(sampleRate) {
        X_TEMP.webAudioDummyPlay(sampleRate);
        if (true || X_WebAudio_context["sampleRate"] !== sampleRate) {
          X_WebAudio_context.close && X_WebAudio_context.close();
          X_WebAudio_context = new X_WebAudio_Context;
          X_TEMP.webAudioDummyPlay(sampleRate);
        }
        delete X_TEMP.webAudioSampleRateFix;
        delete X_TEMP.webAudioDummyPlay;
      };
      X_TEMP.webAudioDummyPlay = function(sampleRate, source) {
        source = X_WebAudio_context["createBufferSource"]();
        source.buffer = X_WebAudio_context["createBuffer"](1, 1, sampleRate);
        source["connect"](X_WebAudio_context["destination"]);
        source.start ? source.start(0) : source["noteOn"] ? source["noteOn"](0) : source["noteGrainOn"](0);
      };
    }
    X_WebAudio_BufferLoader = X_EventDispatcher["inherits"]("X.WebAudio.BufferLoader", X_Class.POOL_OBJECT, {audioUrl:"", xhr:null, onDecodeSuccess:null, onDecodeError:null, audioBuffer:null, errorState:0, webAudioList:null, "Constructor":function(webAudio, url) {
      this.webAudioList = [webAudio];
      this.audioUrl = url;
      this.xhr = X["Net"]({"xhr":url, "dataType":"arraybuffer"})["listen"](X_EVENT_PROGRESS, this)["listenOnce"]([X_EVENT_SUCCESS, X_EVENT_COMPLETE], this);
      X_WebAudio_BUFFER_LIST.push(this);
    }, handleEvent:function(e) {
      var i, l;
      switch(e.type) {
        case X_EVENT_PROGRESS:
          for (i = 0, l = this.webAudioList.length; i < l; ++i) {
            this.webAudioList[i]["dispatch"]({type:X_EVENT_PROGRESS, "percent":e["percent"]});
          }
          return;
        case X_EVENT_SUCCESS:
          if (X_UA["iOS"] < 8 || !X_WebAudio_context["decodeAudioData"]) {
            this._onDecodeSuccess(X_WebAudio_context["createBuffer"](e.response, false));
          } else {
            if (X_WebAudio_context["decodeAudioData"]) {
              X_WebAudio_context["decodeAudioData"](e.response, this.onDecodeSuccess = X_Closure_create(this, this._onDecodeSuccess), this.onDecodeError = X_Closure_create(this, this._onDecodeError));
            }
          }
          break;
        case X_EVENT_COMPLETE:
          this.errorState = 1;
          this["asyncDispatch"](X_EVENT_COMPLETE);
          break;
      }
      this.xhr["unlisten"]([X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_COMPLETE], this);
      delete this.xhr;
    }, _onDecodeSuccess:function(buffer) {
      this.onDecodeSuccess && this._onDecodeComplete();
      if (!buffer) {
        this.errorState = 2;
        this["asyncDispatch"](X_EVENT_COMPLETE);
        return;
      }
      console.log("WebAudio decode success!");
      this.audioBuffer = buffer;
      this["asyncDispatch"](X_EVENT_COMPLETE);
      console.log("WebAudio decoded!");
    }, _onDecodeError:function() {
      console.log("WebAudio decode error!");
      this._onDecodeComplete();
      this.errorState = 2;
      this["asyncDispatch"](X_EVENT_COMPLETE);
    }, _onDecodeComplete:function() {
      X_Closure_correct(this.onDecodeSuccess);
      delete this.onDecodeSuccess;
      X_Closure_correct(this.onDecodeError);
      delete this.onDecodeError;
    }, unregister:function(webAudio) {
      var list = this.webAudioList, i = list.indexOf(webAudio);
      if (0 < i) {
        list.splice(i, 1);
        if (!list.length) {
          this.xhr && this.xhr["kill"]();
          this["kill"]();
        }
      }
    }});
    X_WebAudio = X_AudioBase["inherits"]("X.WebAudio", X_Class.POOL_OBJECT, {loader:null, _startPos:0, _endPosition:0, _startTime:0, _interval:0, audioBuffer:null, bufferSource:null, gainNode:null, bufferPlay:"", bufferStop:"", "Constructor":function(dispatcher, url, option) {
      var i = 0, l = X_WebAudio_BUFFER_LIST.length, loader;
      if (X_UA["Android"] && X_UA["Chrome"] && !X_WebAudio_fpsFix) {
        X_Node_systemNode.create("div", {id:"fps-slowdown-make-sound-noisy"});
        X_WebAudio_fpsFix = true;
      }
      for (; i < l; ++i) {
        loader = X_WebAudio_BUFFER_LIST[i];
        if (loader.audioUrl === url) {
          this.loader = loader;
          loader.webAudioList.push(this);
          break;
        }
      }
      if (!this.loader) {
        this.loader = loader = X_WebAudio_BufferLoader(this, url);
      }
      this.dispatcher = dispatcher || this;
      this.setState(option);
      this["listenOnce"](X_EVENT_KILL_INSTANCE, this.onKill);
      if (loader.audioBuffer || loader.errorState) {
        this._onLoadBufferComplete();
      } else {
        loader["listenOnce"](X_EVENT_COMPLETE, this, this._onLoadBufferComplete);
      }
      if (X_WebAudio_isNoTouch) {
        X_TEMP.xWebAudioInstances = X_TEMP.xWebAudioInstances || [];
        X_TEMP.xWebAudioInstances.push(this);
      }
    }, onKill:function() {
      this.loader["unlisten"](X_EVENT_COMPLETE, this, this._onLoadBufferComplete).unregister(this);
      delete this.audioBuffer;
      this.playing && this.actualPause();
      this.bufferSource && this._sourceDispose();
      this.gainNode && this.gainNode.disconnect();
      if (X_WebAudio_isNoTouch) {
        X_TEMP.xWebAudioInstances.splice(X_TEMP.xWebAudioInstances.indexOf(this), 1);
      }
    }, _onLoadBufferComplete:function(e) {
      var loader = this.loader, buffer = loader.audioBuffer;
      e && loader["unlisten"](X_EVENT_COMPLETE, this, this._onLoadBufferComplete);
      if (!buffer) {
        this.error = loader.errorState;
        this.dispatcher["dispatch"]({type:X_EVENT_ERROR, error:loader.errorState, message:loader.errorState === 1 ? "load buffer network error" : "buffer decode error"});
        this["kill"]();
        return;
      }
      this.audioBuffer = buffer;
      this.duration = buffer.duration * 1000;
      this.dispatcher["asyncDispatch"](X_WebAudio_isNoTouch ? X_EVENT_MEDIA_WAIT_FOR_TOUCH : X_EVENT_READY);
    }, actualPlay:function() {
      var xWebAudio, begin, end;
      console.log("[WebAudio] play abuf:" + !!this.audioBuffer);
      if (!this.audioBuffer) {
        this._playReserved = true;
        return;
      }
      if (X_WebAudio_isNoTouch) {
        var e = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1];
        if (!e || !e["pointerType"]) {
          return;
        }
        this.dispatcher["asyncDispatch"](X_EVENT_READY);
        while (xWebAudio = X_TEMP.xWebAudioInstances.pop()) {
          xWebAudio !== this && xWebAudio["asyncDispatch"](X_EVENT_READY);
        }
        delete X_TEMP.xWebAudioInstances;
        X_WebAudio_isNoTouch = false;
        X_TEMP.webAudioSampleRateFix && X_TEMP.webAudioSampleRateFix(this.audioBuffer["sampleRate"]);
      }
      end = X_Audio_getEndTime(this);
      begin = X_Audio_getStartTime(this, end, true);
      console.log("[WebAudio] play " + begin + " -> " + end + " loop: " + this.autoLoop + " :" + this.loopStartTime + " -> " + this.loopEndTime);
      this._createTree(begin, end);
      this.playing = true;
      this._startPos = begin;
      this._endPosition = end;
      this._startTime = X_WebAudio_context.currentTime * 1000;
      this._interval = this._interval || X_Timer_add(100, 0, this, this._onInterval);
    }, _createTree:function(begin, end) {
      if (this.bufferSource) {
        this._sourceDispose();
      }
      if (!this.gainNode) {
        this.gainNode = X_WebAudio_context["createGain"] ? X_WebAudio_context["createGain"]() : X_WebAudio_context["createGainNode"]();
        this.gainNode["connect"](X_WebAudio_context["destination"]);
      }
      this.bufferSource = X_WebAudio_context["createBufferSource"]();
      this.bufferSource.buffer = this.audioBuffer;
      this.bufferSource["connect"](this.gainNode);
      this.gainNode["gain"].value = this.gain;
      if (!this.bufferPlay) {
        this.bufferPlay = this.bufferSource.start ? "start" : this.bufferSource["noteOn"] ? "noteOn" : "noteGrainOn";
        this.bufferStop = this.bufferSource.stop ? "stop" : "noteOff";
      }
      this.bufferSource[this.bufferPlay](0, begin / 1000, (end - begin) / 1000);
    }, _sourceDispose:function() {
      this.bufferSource.disconnect();
      delete this.bufferSource;
    }, _onInterval:function() {
      var time;
      if (this.playing) {
        time = X_WebAudio_context.currentTime * 1000 - this._startTime - this._endPosition + this._startPos | 0;
        if (time < 0) {
          this.dispatcher["dispatch"](X_EVENT_MEDIA_PLAYING);
          return;
        }
        if (this.autoLoop) {
          if (!(this.dispatcher["dispatch"](X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT)) {
            this.looped = true;
            this.dispatcher["dispatch"](X_EVENT_MEDIA_LOOPED);
            this.actualPlay();
          } else {
            delete this._interval;
            return X_CALLBACK_UN_LISTEN;
          }
        } else {
          this.actualPause();
          this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
        }
      }
    }, actualPause:function() {
      console.log("[WebAudio] pause");
      this._interval && X_Timer_remove(this._interval);
      delete this._interval;
      delete this.playing;
      if (this.bufferSource) {
        this.bufferSource[this.bufferStop](0);
      }
    }, getActualCurrentTime:function() {
      return X_WebAudio_context.currentTime * 1000 - this._startTime + this._startPos | 0;
    }, afterUpdateState:function(result) {
      if (result & 2 || result & 1) {
        this.actualPlay();
      } else {
        if (result & 4) {
          this.gainNode["gain"].value = this.gain;
        }
      }
    }});
    X_Audio_BACKENDS.push({backendID:1, backendName:"WebAudio", canPlay:X_Audio_codecs, detect:function(proxy, ext) {
      proxy["asyncDispatch"]({type:X_EVENT_COMPLETE, canPlay:X_Audio_codecs[ext]});
    }, klass:X_WebAudio});
  }
  var X_HTMLAudio, X_HTMLAudio_seekingFixIOS = 7 <= X_UA["iOS"], X_HTMLAudio_endedFixIOS = X_UA["iOS"] < 7, X_HTMLAudio_endedFixAOSP2 = X_UA["AOSP"] < 3, X_HTMLAudio_endedFixAOSP3 = !X_HTMLAudio_endedFixAOSP2 && X_UA["AOSP"] < 4, X_HTMLAudio_endedFixAOSP4 = 4 <= X_UA["AOSP"], X_HTMLAudio_endedFixCWV = X_UA["ChromeWV"] || X_UA["Blink"] && X_UA["Android"], X_HTMLAudio_currentTimeFix = X_UA["Prsto"] && X_UA["Android"], X_HTMLAudio_playStartFix = X_UA["Windows"] && 44 <= X_UA["Gecko"], X_HTMLAudio_volumeFix = 
  X_UA["Chrome"], X_HTMLAudio_volumeEnabled = X_UA["WinPhone"] !== 7.5 && !X_UA["Prsto"], X_HTMLAudio_needPlayForSeek = X_UA["iOS"] || X_UA["Gecko"], X_HTMLAudio_pauseFix = 12 <= X_UA["Prsto"] && 0 < " XP XPSP2 2003|XP64".indexOf(X_UA["Windows"]), X_HTMLAudio_need1stTouch = X_UA["iOS"] || 4.2 <= X_UA["AOSP"] || X_UA["ChromeWV"] || X_UA["WinPhone"] || X_UA["Blink"] && X_UA["Android"], X_HTMLAudio_playTrigger = X_UA["WinPhone"] === 7.5 ? "canplay" : X_UA["iOS"] < 8 ? "suspend" : X_UA["iOS"] ? "loadedmetadata" : 
  X_UA["Blink"] < 32 ? "stalled" : "canplaythrough", X_HTMLAudio_durationFix = X_UA["iOS"] < 8 || X_UA["ChromeWV"] || X_UA["WinPhone"] === 7.5 || X_UA["Windows"] && 12 <= X_UA["Prsto"] || X_UA["Blink"] < 36 && X_UA["Android"], X_HTMLAudio_shortPlayFix = X_UA["AOSP"], X_HTMLAudio_progressEnabled = !(X_UA["Prsto"] && X_UA["Android"]) && X_UA["WinPhone"] !== 7.5;
  if (X_Audio_constructor) {
    X_HTMLAudio = X_AudioBase["inherits"]("X.HTMLAudio", X_Class.POOL_OBJECT, {_readyState:0, _src:"", _touchState:X_HTMLAudio_need1stTouch ? 1 : 0, _currentFixStart:0, _currentFixBegin:0, _durationFixPhase:X_HTMLAudio_durationFix ? 1 : 0, _lastCurrentTime:0, _shortPlayFixON:false, _shortPlayFixTime:0, _endedFixON:false, _seekingFixON:false, "Constructor":function(dispatcher, source, option) {
      var raw;
      this.dispatcher = dispatcher || this;
      this._src = source;
      if (X_HTMLAudio_shortPlayFix) {
        this._shortPlayFixON = X_URL_getEXT(source) === "m4a";
      }
      this.setState(option);
      if (option["useVideo"]) {
        raw = document.createElement("video");
        raw.preload = "none";
        raw.autoplay = false, raw.loop = false;
        raw.muted = false;
        raw.crossorigin = option["crossorigin"] || "";
        raw.style.cssText = "position:absolute;bottom:0;left:-50px;width:100px;height:100px;opacity:0;";
        raw.controls = false;
        raw.WebKitPlaysInline = true;
        X_elmBody.appendChild(raw);
      } else {
        raw = X_TEMP.rawAudio || new X_Audio_constructor("");
        if (X_TEMP.rawAudio) {
          delete X_TEMP.rawAudio;
        }
      }
      this["_rawObject"] = raw;
      this["listen"]([X_EVENT_KILL_INSTANCE, X_HTMLAudio_playTrigger, "progress", "seeked", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "durationchange", "timeupdate", "ended"]);
      this["listen"](["loadstart", "load", "progress", "error", "suspend", "abort", "emptied", "stalled", "play", "pause", "seeked", "ratechange", "volumechange", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "durationchange", "timeupdate", "ended"], this.onDebug);
      if (X_HTMLAudio_endedFixAOSP2 || X_HTMLAudio_endedFixAOSP4) {
        raw.loop = true;
      }
      if (X_HTMLAudio_need1stTouch) {
        raw.src = source;
      } else {
        if (this.autoplay) {
          raw.preload = "auto";
          raw.autoplay = true;
        }
        raw.src = source;
        raw.load();
      }
    }, onDebug:function(e) {
      this.dispatcher["dispatch"]({type:X_EVENT_DEBUG, "rawEvent":e.type, "current":this["_rawObject"].currentTime, duration:this["_rawObject"].duration});
    }, handleEvent:function(e) {
      var raw = this["_rawObject"], actualEnded = e.type === "ended", ended = actualEnded, i, l, buf, time, ready, eventType, duration, end, now;
      if (!raw) {
        return;
      }
      switch(e.type) {
        case X_EVENT_KILL_INSTANCE:
          this.playing && this.actualPause();
          raw.src = "";
          raw.load();
          break;
        case "progress":
          if (X_HTMLAudio_progressEnabled && this.duration && this._readyState < 3) {
            buf = raw.buffered;
            for (i = time = 0, l = buf && buf.length; i < l; ++i) {
              time += buf["end"](i) - buf["start"](i);
            }
            this.dispatcher["dispatch"]({type:X_EVENT_PROGRESS, "percent":time * 1000 / this.duration * 100});
          }
          break;
        case "loadeddata":
        case "canplaythrough":
          if (!this._endedFixON && !X_HTMLAudio_durationFix && !X_HTMLAudio_need1stTouch) {
            this._readyState |= 1;
          }
        case "canplay":
          if (this._durationFixPhase === 1 && !X_HTMLAudio_need1stTouch) {
            this._durationFixPhase = 2;
            this.actualPlay();
            raw.currentTime = 0;
          }
          if (this._endedFixON) {
            console.log("\u25bd onEndedFix \u306e\u7d42\u4e86 @" + e.type);
            this._endedFixON = false;
            this.actualPlay();
          }
        case "loadedmetadata":
        case "durationchange":
          if (!this.duration || this.duration !== raw.duration * 1000) {
            duration = raw.duration;
          }
          break;
        case "timeupdate":
          if (this._seekingFixON) {
            eventType = X_EVENT_MEDIA_SEEKING;
          } else {
            if (this._durationFixPhase === 8) {
              this._durationFixPhase = 0;
              this._readyState |= 1;
            } else {
              if (this._durationFixPhase === 4) {
                duration = raw.duration;
                eventType = X_EVENT_MEDIA_WAITING;
              } else {
                if (this._touchState === 3 && !X_HTMLAudio_durationFix) {
                  this._touchState = 0;
                  this._readyState |= 1;
                } else {
                  if ((now = this.getActualCurrentTime()) === this._lastCurrentTime) {
                    eventType = X_EVENT_MEDIA_WAITING;
                  } else {
                    if (X_HTMLAudio_playStartFix && now < this._lastCurrentTime) {
                      eventType = X_EVENT_MEDIA_WAITING;
                      this.actualPlay();
                    } else {
                      if (this.playing) {
                        end = X_Audio_getEndTime(this) + this._shortPlayFixTime;
                        if (0 + end <= 0 + now || now < this._lastCurrentTime && now < 2000) {
                          if (this.autoLoop) {
                            console.log("\u2606\u2605\u2606 \u66f2\u306e\u6700\u5f8c\u306b\u5230\u9054 @timeupdate now-end:" + (now - end) + " now:" + now + " last:" + this._lastCurrentTime);
                            ended = true;
                          } else {
                            this.actualPause();
                            eventType = X_EVENT_MEDIA_ENDED;
                          }
                        } else {
                          eventType = X_EVENT_MEDIA_PLAYING;
                        }
                        this._lastCurrentTime = now;
                      }
                    }
                  }
                }
              }
            }
          }
          break;
        case "playing":
          if (X_HTMLAudio_volumeFix) {
            raw.volume = this.gain;
          }
          eventType = !this._durationFixPhase && !this._endedFixON ? X_EVENT_MEDIA_PLAYING : X_EVENT_MEDIA_WAITING;
          break;
        case "seeking":
          eventType = X_EVENT_MEDIA_SEEKING;
          if (X_HTMLAudio_seekingFixIOS) {
            this._seekingFixON = true;
          }
          break;
        case "seeked":
          if (X_HTMLAudio_seekingFixIOS) {
            this._seekingFixON = false;
          }
          break;
        case "waiting":
          eventType = X_EVENT_MEDIA_WAITING;
          break;
      }
      if (0 < duration && X_Type_isFinite(duration) && duration !== 100) {
        this.duration = duration * 1000;
        if (this._durationFixPhase === 4) {
          console.log("\u25bc DurationFix \u306e\u7d42\u4e86 @" + e.type);
          this._durationFixPhase = 8;
          if (this.autoplay || this._playReserved) {
            console.log("\u2606 \u518d\u751f <- DurationFix \u306e\u7d42\u4e86");
            this.actualPlay();
          } else {
            if (X_HTMLAudio_pauseFix) {
              console.log("\u2606 PAUSE <- DurationFix \u306e\u7d42\u4e86");
              this.actualPause();
            }
          }
        } else {
          if (this._durationFixPhase & 3) {
            this._durationFixPhase = 8;
          }
        }
      }
      if (this._touchState === 1) {
        if (e.type === X_HTMLAudio_playTrigger) {
          this._touchState = 2;
          this.dispatcher["asyncDispatch"](X_EVENT_MEDIA_WAIT_FOR_TOUCH);
        }
      } else {
        if (ended) {
          if (this.autoLoop) {
            if (!(this.dispatcher["dispatch"](X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT)) {
              this.looped = true;
              this.dispatcher["dispatch"](X_EVENT_MEDIA_LOOPED);
              this.actualPlay(X_HTMLAudio_endedFixCWV && actualEnded, X_HTMLAudio_endedFixAOSP3 && actualEnded);
            }
          } else {
            this.seekTime = 0;
            delete this.playing;
            this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
          }
        } else {
          if (this._readyState === 1 && this.duration) {
            this._readyState |= 2;
            this.dispatcher["asyncDispatch"](X_EVENT_READY);
            console.log("> Audio Loaded!! " + e.type + " d:" + (this.duration | 0));
          } else {
            if (eventType) {
              this.dispatcher["dispatch"](eventType);
            }
          }
        }
      }
    }, actualPlay:function(forcePlay, forceReload) {
      var raw = this["_rawObject"], begin, end;
      if (!raw) {
        return;
      }
      this._playReserved = true;
      if (X_HTMLAudio_pauseFix) {
        if (!raw.src) {
          console.log("\u25cb \u524a\u9664\u3055\u308c\u305f audio.src \u306e\u5fa9\u5e30");
          raw.src = this._src;
          return;
        }
        if (this._durationFixPhase < 2) {
          return;
        }
      }
      if (this._touchState === 2) {
        var e = X_EventDispatcher_CURRENT_EVENTS[X_EventDispatcher_CURRENT_EVENTS.length - 1];
        if (!e || !e["pointerType"]) {
          alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e play! " + (e ? e.type : ""));
          return;
        }
        this._touchState = 3;
      } else {
        if (this._readyState !== 3 && this._durationFixPhase < 2) {
          return;
        }
      }
      delete this._playReserved;
      if (this._durationFixPhase & 3) {
        console.log("\u25b2 DurationFix \u306e\u958b\u59cb");
        this._durationFixPhase = 4;
      }
      end = X_Audio_getEndTime(this);
      begin = X_Audio_getStartTime(this, end, true);
      this._lastCurrentTime = begin;
      if (this._shortPlayFixON) {
        this._shortPlayFixTime = 1000 < end - begin ? 200 : 400;
        if (this.duration < end + this._shortPlayFixTime) {
          this._shortPlayFixTime = this.duration - end;
        }
      }
      if (this._endedFixON) {
        console.log("\u2606 audio.play \u3092\u30b9\u30ad\u30c3\u30d7 " + begin + " -> " + end + " crt:" + (raw.currentTime | 0));
      } else {
        if (!this.playing) {
          if (X_HTMLAudio_volumeFix) {
            raw.volume = 0;
          } else {
            raw.volume = X_HTMLAudio_volumeEnabled ? this.gain : 1;
          }
          raw.play();
          this.playing = true;
        } else {
          if (X_HTMLAudio_needPlayForSeek || forcePlay) {
            raw.play();
          }
        }
        if (!(this._durationFixPhase % 8) && this.duration) {
          raw.currentTime = this._lastCurrentTime / 1000;
        }
        console.log("[HTMLAudio] play " + begin + " -> " + end + " crt:" + (raw.currentTime | 0) + " last:" + this._lastCurrentTime);
        if (forceReload) {
          this.playing = false;
          this._endedFixON = true;
          raw.src = this._src;
          console.log("\u25b3 onEndedFix \u306e\u958b\u59cb");
          this.dispatcher["dispatch"](X_EVENT_MEDIA_WAITING);
        }
      }
      if (X_HTMLAudio_currentTimeFix) {
        this._currentFixBegin = begin;
        this._currentFixStart = X_Timer_now();
      }
    }, actualPause:function() {
      var raw = this["_rawObject"];
      console.log("[HTMLAudio] pause");
      delete this._currentFixStart;
      !raw.error && raw.pause();
      if (X_HTMLAudio_pauseFix) {
        raw.src = "";
        if (X_HTMLAudio_durationFix) {
          delete this._durationFixPhase;
        }
      }
      delete this.playing;
    }, getActualCurrentTime:function() {
      return X_HTMLAudio_currentTimeFix ? X_Timer_now() - this._currentFixStart + this._currentFixBegin : this._seekingFixON ? this._lastCurrentTime : this["_rawObject"].currentTime * 1000 | 0;
    }, getActualError:function() {
      return this["_rawObject"].error || 0;
    }, afterUpdateState:function(result) {
      if (result & 3) {
        this.actualPlay();
      } else {
        if (result & 4 && X_HTMLAudio_volumeEnabled) {
          this["_rawObject"].volume = this.gain;
        }
      }
    }});
    X_HTMLAudio && X_Audio_BACKENDS.push({backendID:2, backendName:"HTMLAudio", canPlay:X_Audio_codecs, detect:function(proxy, ext, hash) {
      if (X_UA["Android"] && X_UA["Prsto"] && ext === "mp3") {
        proxy["asyncDispatch"]({type:X_EVENT_COMPLETE, canPlay:!!hash["CBR"]});
      } else {
        proxy["asyncDispatch"]({type:X_EVENT_COMPLETE, canPlay:X_Audio_codecs[ext]});
      }
    }, klass:X_HTMLAudio});
  }
  var X_SLAudio, X_SLAudio_uid = 0;
  if (X_Plugin_SILVER_LIGHT_VERSION) {
    X_TEMP.slaudioInit = function() {
      var s;
      if (X_UA["IE"] < 9) {
        s = document.createElement('<script id="silverlightaudio" type="text/xaml">\x3c/script>');
      } else {
        s = document.createElement("script");
        s.id = "silverlightaudio";
        s.type = "text/xaml";
      }
      X_elmHead.appendChild(s);
      s.text = '<Canvas xmlns="http://schemas.microsoft.com/client/2007" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"></Canvas>';
      delete X_TEMP.slaudioInit;
    };
    X_SLAudio = X_AudioBase["inherits"]("X.SilverlightAudio", X_Class.POOL_OBJECT, {"_rawType":X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT, _onload:"", _callback:null, xnodeObject:null, _source:"", _ended:true, _paused:false, _lastUserAction:"", _lastState:"", _interval:0, "Constructor":function(dispatcher, source, option) {
      !X_SLAudio_uid && X_TEMP.slaudioInit();
      this.dispatcher = dispatcher || this;
      this._source = source;
      this._onload = "XAudioSilverlightOnLoad" + ++X_SLAudio_uid;
      this._callback = window[this._onload] = X_Closure_create(this, this.onSLReady);
      this.xnodeObject = X_Node_body["create"]("object", {type:"application/x-silverlight-2", data:"data:application/x-silverlight-2,", width:1, height:1})["html"]('<param name="background" value="#00000000">' + '<param name="windowless" value="true">' + '<param name="source" value="#silverlightaudio">' + '<param name="onload" value="' + this._onload + '">');
      this.setState(option);
      this["listenOnce"](X_EVENT_KILL_INSTANCE);
    }, onSLReady:function(sender) {
      if (!this._onload) {
        return;
      }
      window[this._onload] = null;
      delete this._onload;
      X_Closure_correct(this._callback);
      delete this._callback;
      sender["children"]["add"](sender["GetHost"]()["content"]["CreateFromXaml"]('<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">' + '<MediaElement x:Name="media" Source="' + this._source + '" Volume="' + this.gain + '" AutoPlay="false" />' + "</Canvas>"));
      this["_rawObject"] = sender["findName"]("media");
      this["listen"](["MediaFailed", "MediaOpened", "MediaEnded", "CurrentStateChanged"]);
    }, handleEvent:function(e) {
      var lastState, currentState;
      console.log(e.type);
      switch(e.type) {
        case "MediaFailed":
          this.error = 4;
          this.playing = false;
          this._ended = true;
          this._paused = false;
          if (this.playing) {
          } else {
            this.dispatcher["dispatch"](X_EVENT_ERROR);
            this["kill"]();
          }
          break;
        case "MediaOpened":
          this.duration = this["_rawObject"]["NaturalDuration"]["Seconds"] * 1000;
          this.dispatcher["asyncDispatch"](X_EVENT_READY);
          break;
        case "MediaEnded":
          this._ended = true;
          break;
        case "CurrentStateChanged":
          lastState = this._lastState, currentState = this["_rawObject"]["CurrentState"];
          if (lastState === currentState || (lastState === "Closed" || lastState === "Error") && (currentState === "Closed" || currentState === "Error")) {
            return;
          }
          this._lastState = currentState;
          console.log(" > " + currentState + " - " + this._lastUserAction);
          switch(currentState) {
            case "Buffering":
            case "Opening":
              switch(this._lastUserAction) {
                case "play":
                  this.dispatcher["dispatch"](X_EVENT_MEDIA_WAITING);
                  break;
                case "seek":
                  this.dispatcher["dispatch"](X_EVENT_MEDIA_SEEKING);
                  break;
                case "pause":
                  break;
              }break;
            case "Error":
              this.error = 4;
            case "Closed":
              this.error = this.error || 2;
              this.playing = false;
              this._ended = true;
              this._paused = false;
              this.dispatcher["dispatch"](X_EVENT_ERROR);
              this["kill"]();
              break;
            case "Paused":
              this.playing && X_Timer_once(16, this, this.actualPlay);
              switch(this._lastUserAction) {
                case "play":
                case "seek":
                  this._ended = true;
                  this._paused = false;
                  break;
                case "pause":
                  this._ended = false;
                  this._paused = true;
                  break;
                case "stop":
                  this._ended = true;
                  this._paused = false;
              }break;
            case "Playing":
              this.error = 0;
              this._ended = false;
              this._paused = false;
              this.dispatcher["dispatch"](X_EVENT_MEDIA_PLAYING);
              break;
            case "Stopped":
              this.playing && X_Timer_once(16, this, this.actualPlay);
              break;
          }break;
        case X_EVENT_KILL_INSTANCE:
          this.playing && this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
          this.playing && this.actualPause();
          if (this._onload) {
            window[this._onload] = null;
            delete this._onload;
            X_Closure_correct(this._callback);
          }
          this.xnodeObject["kill"]();
          break;
      }
    }, actualPlay:function() {
      var begin, offset, end;
      if (this.error) {
        return;
      }
      if (!this.duration) {
        this._playReserved = true;
        return;
      }
      this._lastUserAction = 0 <= this.seekTime ? "seek" : "play";
      end = X_Audio_getEndTime(this);
      begin = X_Audio_getStartTime(this, end, true) | 0;
      begin = (begin / 1000 | 0) * 1000 + (500 < begin % 1000 ? 1000 : 0);
      this["_rawObject"]["Volume"] = this.gain;
      this.setCurrentTime(this._beginTime = begin);
      console.log("[play] " + begin + " -> " + end);
      if (!this.playing || this._ended) {
        console.log("[play] play()" + begin + " -> " + end);
        this["_rawObject"].play();
        this.playing = true;
        this._ended = false;
      }
      this._timerID && X_Timer_remove(this._timerID);
      this._timerID = X_Timer_once(end - begin, this, this._onEnded);
      if (!this._interval) {
        this._interval = X_Timer_add(1000, 0, this, this._onInterval);
      }
    }, _onInterval:function() {
      if (!this.playing) {
        delete this._interval;
        return X_CALLBACK_UN_LISTEN;
      }
      this.dispatcher["dispatch"](X_EVENT_MEDIA_PLAYING);
    }, _onEnded:function() {
      var time, end;
      delete this._timerID;
      if (this.playing) {
        time = this.getActualCurrentTime();
        if (time < this._beginTime) {
          console.log("== waiting " + time + " < begin:" + this._beginTime);
          this.setCurrentTime(this._beginTime);
          time = this.getActualCurrentTime();
          console.log("    > " + time);
          this._ended && this["_rawObject"].play();
          this._ended = false;
          this.dispatcher["dispatch"](X_EVENT_MEDIA_WAITING);
          this._timerID = X_Timer_once(X_Audio_getEndTime(this) - time, this, this._onEnded);
          return;
        }
        time -= X_Audio_getEndTime(this);
        if (time < -50) {
          console.log(" > \u307e\u3060\u7d42\u308f\u3089\u306a\u3044 " + time);
          this._ended && this["_rawObject"].play();
          this._ended = false;
          this._timerID = X_Timer_once(-time, this, this._onEnded);
          return;
        }
        if (this.autoLoop) {
          console.log("========= loop?");
          if (!(this.dispatcher["dispatch"](X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT)) {
            console.log("========== loop\u3057\u305f");
            this.looped = true;
            this.dispatcher["dispatch"](X_EVENT_MEDIA_LOOPED);
            this.actualPlay();
          }
        } else {
          console.log("========= pause");
          this.actualPause();
          this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
        }
      }
    }, actualPause:function() {
      if (this.error) {
        return;
      }
      this._lastUserAction = "pause";
      this.playing = false;
      this._paused = true;
      this._ended = false;
      this["_rawObject"].pause();
    }, getActualCurrentTime:function() {
      return this["_rawObject"]["Position"]["Seconds"] * 1000 | 0;
    }, afterUpdateState:function(result) {
      var end, halfway;
      if (result & 3) {
        this.actualPlay();
      } else {
        if (result & 1) {
          end = X_Audio_getEndTime(this);
          halfway = end < this.duration;
          this._timerID && X_Timer_remove(this._timerID);
          if (halfway) {
            this._timerID = X_Timer_once(end - this.getActualCurrentTime(), this, this._onEnded);
          } else {
            delete this._timerID;
          }
        } else {
          if (result & 4) {
            this["_rawObject"]["Volume"] = this.gain;
          }
        }
      }
    }, setCurrentTime:function(time) {
      var position = this["_rawObject"]["Position"];
      position["Seconds"] = time / 1000 | 0;
      this["_rawObject"]["Position"] = position;
    }});
    X_Audio_BACKENDS.push({backendID:8, backendName:"Silverlight", canPlay:{"mp3":true, "m4a":true, "wma":true, "wav":true}, detect:function(proxy, ext, hash) {
      proxy["asyncDispatch"]({type:X_EVENT_COMPLETE, canPlay:ext === "mp3" || ext === "m4a" || ext === "wma" || ext === "wav"});
    }, klass:X_SLAudio});
  }
  var X_WMPAudio;
  if (X_Plugin_WMP_VERSION) {
    X_WMPAudio = X_AudioBase["inherits"]("X.WMPAudio", X_Class.POOL_OBJECT, {xnodeObject:null, wmp:null, _wmp:null, _readyState:0, _seekDirection:0, _timerID:0, "Constructor":function(dispatcher, source, option) {
      this.dispatcher = dispatcher || this;
      this._source = source;
      if (7 <= X_Plugin_WMP_VERSION) {
        this.xnodeObject = X_Node_systemNode["create"]("object", {"classID":"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6", width:1, height:1})["html"](X_UA["IE"] === 5.5 ? "" : '<param name="uiMode" value="none">');
      } else {
        this.xnodeObject = X_Node_systemNode["create"]("object", {classID:"CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95", width:0, height:0})["html"](X_UA["IE"] === 5.5 ? "" : '<param name="ShowControls" value="false">');
      }
      this.setState(option);
      X_ViewPort["listenOnce"](X_EVENT_AFTER_UPDATE, this);
      this["listenOnce"](X_EVENT_KILL_INSTANCE);
    }, handleEvent:function(e) {
      switch(e.type) {
        case X_EVENT_AFTER_UPDATE:
          this._readyState = 1;
          if (7 <= X_Plugin_WMP_VERSION) {
            this._wmp = this.xnodeObject["_rawObject"];
            this._wmp["URL"] = this._source;
            this.wmp = this._wmp["controls"];
          } else {
            this.wmp = this.xnodeObject["_rawObject"];
            this.wmp["FileName"] = this._source;
          }
          this._timerID = X_Timer_add(100, 0, this, this._onTimer);
          break;
        case X_EVENT_KILL_INSTANCE:
          this.playing && this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
          this.playing && this.actualPause();
          this.wmp.stop();
          this.xnodeObject["kill"]();
          break;
      }
    }, actualPlay:function() {
      var begin, offset, end;
      if (this._readyState < 2) {
        this._playReserved = true;
        return;
      }
      end = X_Audio_getEndTime(this);
      begin = this._beginTime = X_Audio_getStartTime(this, end, true) | 0;
      console.log("[play] " + begin + " -> " + end);
      if (!this.playing) {
        this.setVolume();
        this.wmp.play();
        this.playing = true;
      } else {
        this._seekDirection = this.getActualCurrentTime() < begin ? 1 : -1;
      }
      this.wmp["CurrentPosition"] = begin / 1000;
      if (!this._timerID) {
        this._timerID = X_Timer_add(100, 0, this, this._onTimer);
      }
    }, _onTimer:function() {
      var progress, time;
      if (this._readyState === 1) {
        if (7 <= X_Plugin_WMP_VERSION) {
          progress = this._wmp["network"]["downloadProgress"];
        } else {
          progress = this.wmp["BufferingProgress"];
        }
        if (progress < 100) {
          this.dispatcher["dispatch"]({type:X_EVENT_PROGRESS, "percent":progress});
        } else {
          this._readyState = 2;
          if (7 <= X_Plugin_WMP_VERSION) {
            this.duration = this._wmp["currentMedia"].duration * 1000 | 0;
          } else {
            this.duration = this.wmp["Duration"] * 1000 | 0;
          }
          this.dispatcher["dispatch"](X_EVENT_READY);
        }
      } else {
        if (this.playing) {
          time = this.getActualCurrentTime();
          if (this._seekDirection) {
            if (this._seekDirection === 1 ? time < this._beginTime : this._lastCurrentTime <= time) {
              this.dispatcher["dispatch"](X_EVENT_MEDIA_SEEKING);
              return;
            }
            delete this._seekDirection;
          }
          if (time === this._lastCurrentTime) {
            this.dispatcher["dispatch"](X_EVENT_MEDIA_WAITING);
            return;
          }
          this._lastCurrentTime = time;
          if (time - X_Audio_getEndTime(this) < -50) {
            this.dispatcher["dispatch"](X_EVENT_MEDIA_PLAYING);
            return;
          }
          if (this.autoLoop) {
            if (!(this.dispatcher["dispatch"](X_EVENT_MEDIA_BEFORE_LOOP) & X_CALLBACK_PREVENT_DEFAULT)) {
              this.looped = true;
              this.dispatcher["dispatch"](X_EVENT_MEDIA_LOOPED);
              this.actualPlay();
            }
          } else {
            this.actualPause();
            this.dispatcher["dispatch"](X_EVENT_MEDIA_ENDED);
            delete this._timerID;
            return X_CALLBACK_UN_LISTEN;
          }
        }
      }
    }, actualPause:function() {
      this.playing = false;
      this._timerID && X_Timer_remove(this._timerID);
      delete this._timerID;
      this.wmp.pause();
    }, setVolume:function() {
      if (7 <= X_Plugin_WMP_VERSION) {
        this._wmp["settings"]["Volume"] = this.gain * 100;
      } else {
        this.wmp["Volume"] = (1 - this.gain) * 10000;
      }
    }, getActualCurrentTime:function() {
      return this.wmp["CurrentPosition"] * 1000 | 0;
    }, afterUpdateState:function(result) {
      if (result & 3) {
        this.actualPlay();
      } else {
        if (result & 4) {
          this.setVolume();
        }
      }
    }});
    X_Audio_BACKENDS.push({backendID:16, backendName:"WMP" + X_Plugin_WMP_VERSION, canPlay:{"mp3":true, "m4a":true, "wma":true, "wav":true, "mid":true, "midi":true, "snd":true, "au":true, "aif":true, "aiff":true, "aicf":true}, detect:function(proxy, ext) {
      proxy["asyncDispatch"]({type:X_EVENT_COMPLETE, canPlay:0 <= "mp3 m4a wma wav midi snd au aiff aicf".indexOf(ext)});
    }, klass:X_WMPAudio});
  }
  var X_AudioSprite_shouldUse = X_HTMLAudio && (X_UA["iOS"] || X_UA["AOSP"] || X_UA["Prsto"] && X_UA["Android"]), X_AudioSprite_useVideoForMulti = false, X_AudioSprite_disableMultiTrack = !X_WebAudio && (X_UA["iOS"] || 4 <= X_UA["AOSP"] || X_UA["ChromeWV"] || X_UA["WinPhone"] === 7.5), X_AudioSprite_enableVolume = X_HTMLAudio && !X_UA["iOS"] && !X_UA["AOSP"] && !(X_UA["Prsto"] && X_UA["Android"]) && !(X_UA["Fennec"] < 25), X_AudioSprite_maxTracks = X_AudioSprite_useVideoForMulti ? 2 : X_AudioSprite_disableMultiTrack ? 
  1 : 9, X_AudioSprite_lengthSilence = 10000, X_AudioSprite_lengthDistance = 5000, X_AudioSprite_uid = 0, X_AudioSprite_TEMP = {presets:{}, BGMs:{}, tracks:[], pauseTracks:[], volume:1, bgmTrack:null, bgmPosition:0, bgmName:"", bgmLooped:false, bgmPlaying:false, tmpEvent:null}, X_AudioSprite, X_AudioSprite_numTracks, X_AudioSprite_useVideo;
  X["AudioSprite"] = function(setting) {
    var tracks = X_AudioSprite_TEMP.tracks, bgms = X_AudioSprite_TEMP.BGMs, presets = X_AudioSprite_TEMP.presets, urls = setting["urls"], video = setting["useVideo"], n = video ? 1 : setting["numTracks"] || 1, volume = setting["volume"], k, i, v, track;
    if (X_AudioSprite) {
      X_AudioSprite["kill"]();
    }
    X_AudioSprite = X_Class_override(X_EventDispatcher(), X_AudioSprite_members);
    X_ViewPort["listen"]([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD], X_AudioSprite_handleEvent);
    n = n <= X_AudioSprite_maxTracks ? n : X_AudioSprite_maxTracks;
    for (k in setting) {
      v = setting[k];
      if (X_Type_isArray(v) && v !== urls) {
        v = X_Array_copy(v);
        for (i = v.length; i;) {
          --i;
          if (i !== 2) {
            v[i] = X_Audio_timeStringToNumber(v[i]);
          }
        }
        if (v[2]) {
          bgms[k] = v;
        }
        presets[k] = v;
      }
    }
    X_Audio_startDetectionBackend(X_Audio_BACKENDS[0], X_AudioSprite, X_Array_copy(urls), {"volume":0 <= volume && volume <= 1 ? volume : 1, "autoplay":true, "startTime":0, "endTime":X_AudioSprite_lengthSilence, "loop":true});
    X_AudioSprite["listenOnce"]([X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE], X_AudioSprite_backendHandler);
    X_AudioSprite["listenOnce"](X_EVENT_KILL_INSTANCE, X_AudioSprite_handleEvent);
    X_AudioSprite_useVideo = video;
    X_AudioSprite_numTracks = X_AudioSprite["numTracks"] = n;
    return X_AudioSprite;
  };
  X["AudioSprite"]["shouldUse"] = X_AudioSprite_shouldUse;
  X["AudioSprite"]["enableMultiTrack"] = !X_AudioSprite_disableMultiTrack;
  function X_AudioSprite_getTrackEnded() {
    var tracks = X_AudioSprite_TEMP.tracks, l = X_AudioSprite_numTracks, i = 0, track, state, last = 1 / 0, _last, index;
    for (; i < l; ++i) {
      track = tracks[i];
      state = track.getState();
      if (!state.playing) {
        return track;
      }
      if (track === X_AudioSprite_TEMP.bgmTrack) {
        continue;
      }
      if (state.currentTime <= X_AudioSprite_lengthSilence + X_AudioSprite_lengthDistance) {
        return track;
      }
      _last = state.endTime - state.currentTime;
      if (_last < last) {
        last = _last;
        index = i;
      }
    }
    return tracks[index];
  }
  var X_AudioSprite_members = {"numTracks":0, "play":function(name) {
    var bgm = X_AudioSprite_TEMP.bgmTrack, tracks = X_AudioSprite_TEMP.tracks, bgms = X_AudioSprite_TEMP.BGMs, presets = X_AudioSprite_TEMP.presets, preset = presets[name], track, i, k;
    if (preset) {
      if (bgms[name]) {
        if (name !== X_AudioSprite_TEMP.bgmName) {
          X_AudioSprite_TEMP.bgmName = name;
          X_AudioSprite_TEMP.bgmPosition = preset[0];
          X_AudioSprite_TEMP.bgmLooped = false;
        }
        X_AudioSprite_TEMP.bgmPlaying = true;
        if (bgm) {
          track = bgm;
        } else {
          if (1 < X_AudioSprite_numTracks) {
            track = X_AudioSprite_TEMP.bgmTrack = X_AudioSprite_getTrackEnded();
          } else {
            track = X_AudioSprite_TEMP.bgmTrack = tracks[0];
          }
        }
        if (track["listen"]([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).playing) {
          track.setState({"loop":true, "looped":X_AudioSprite_TEMP.bgmLooped, "currentTime":X_AudioSprite_TEMP.bgmPosition, "startTime":preset[0], "endTime":preset[1], "loopStartTime":preset[3], "loopEndTime":preset[4]});
        } else {
          track.setState({"looped":X_AudioSprite_TEMP.bgmLooped});
          track.play(preset[0], preset[1], true, preset[3], preset[4]);
          track.seek(X_AudioSprite_TEMP.bgmPosition);
        }
      } else {
        if (1 < X_AudioSprite_numTracks) {
          track = X_AudioSprite_getTrackEnded(X_AudioSprite_TEMP.bgmPlaying);
          track["listen"]([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).setState({"looped":false});
          track.play(preset[0], preset[1], true, 0, X_AudioSprite_lengthSilence);
        } else {
          if (bgm) {
            X_AudioSprite_TEMP.bgmPosition = bgm.currentTime();
            X_AudioSprite_TEMP.bgmTrack = null;
          }
          track = tracks[0];
          if (track["listen"]([X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP], X_AudioSprite_handleEvent).playing) {
            track.setState({"loop":true, "looped":false, "currentTime":preset[0], "startTime":preset[0], "endTime":preset[1], "loopStartTime":0, "loopEndTime":X_AudioSprite_lengthSilence});
          } else {
            track.play(preset[0], preset[1], true, 0, X_AudioSprite_lengthSilence);
          }
        }
      }
      return tracks.indexOf(track);
    }
    return -1;
  }, "pause":function(uid) {
    var tracks = X_AudioSprite_TEMP.tracks, i, l, track;
    if (uid === "*" || uid === undefined) {
      for (i = 0, l = X_AudioSprite_numTracks; i < l; ++i) {
        X_AudioSprite["pause"](i);
      }
    } else {
      if (track = tracks[uid]) {
        if (X_AudioSprite_TEMP.bgmTrack === track) {
          X_AudioSprite_TEMP.bgmPosition = track.currentTime();
          X_AudioSprite_TEMP.bgmPlaying = false;
          X_AudioSprite_TEMP.bgmTrack = null;
        }
        track.play(0, X_AudioSprite_lengthSilence, true, 0, X_AudioSprite_lengthSilence);
        track.seek(0);
        X_AudioSprite["asyncDispatch"](X_EVENT_MEDIA_PAUSED);
      }
    }
    return X_AudioSprite;
  }, "seek":function(uid, position) {
    var track = X_AudioSprite_TEMP.tracks[uid], end, start;
    if (track) {
      delete track.seekTime;
      end = X_Audio_getEndTime(track);
      start = X_Audio_getStartTime(track, end);
      0 <= position && position <= end - start && track.seek(start + position);
    }
    return X_AudioSprite;
  }, "volume":function(uid, opt_volume) {
    var track, i;
    if (uid === 0) {
      if (opt_volume === undefined) {
        return X_AudioSprite_TEMP.volume;
      }
      for (i = X_AudioSprite_numTracks; i;) {
        X_AudioSprite_TEMP.tracks[--i].volume(opt_volume);
      }
      return X_AudioSprite;
    }
    track = X_AudioSprite_TEMP.tracks[uid];
    if (opt_volume === undefined) {
      return track ? track.gain : -1;
    }
    track && track.volume(opt_volume);
    return X_AudioSprite;
  }, "state":function(uid, opt_obj) {
    var track = X_AudioSprite_TEMP.tracks[uid], state, start, end;
    if (opt_obj === undefined) {
      if (track) {
        state = track.getState();
        start = state.startTime;
        return {"currentTime":state.currentTime - start, "playing":start <= state.currentTime && state.currentTime <= state.endTime, "duration":state.endTime - start, "volume":X_AudioSprite_TEMP.volume};
      }
      return {"volume":X_AudioSprite_TEMP.volume, "playing":false};
    }
    track && track.setState(opt_obj);
    return X_AudioSprite;
  }};
  function X_AudioSprite_backendHandler(e) {
    var i, backend, option, src, name, last, _e, track;
    switch(e.type) {
      case X_EVENT_BACKEND_READY:
        backend = X_Audio_BACKENDS[e["backendID"]];
        option = e["option"];
        X_AudioSprite["unlisten"](X_EVENT_BACKEND_NONE, X_AudioSprite_backendHandler);
        X_AudioSprite["source"] = src = e["source"];
        X_AudioSprite["backendName"] = name = backend.backendName;
        for (i = 0; i < X_AudioSprite_numTracks; ++i) {
          if (X_AudioSprite_useVideo || i === 1 && X_AudioSprite_useVideoForMulti) {
            option = X_Object_deepCopy(option);
            option["useVideo"] = true;
            console.log("use video");
          }
          X_AudioSprite_TEMP.tracks.push(last = backend.klass(null, e["source"], option)["listen"](X_EVENT_DEBUG, X_AudioSprite_handleEvent));
        }
        _e = {"type":X_EVENT_BACKEND_READY, "source":src, "backendName":name};
        if (e["needTouchForPlay"] && (_e["needTouchForPlay"] = true) || e["needTouchForLoad"] && (_e["needTouchForLoad"] = true)) {
          X_AudioSprite_TEMP.tmpEvent = _e;
          last["listenOnce"](X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler);
        } else {
          X_AudioSprite["asyncDispatch"](_e);
        }
        last["listen"](X_EVENT_PROGRESS, X_AudioSprite_backendHandler)["listenOnce"](X_EVENT_READY, X_AudioSprite_backendHandler);
        return X_CALLBACK_STOP_NOW;
      case X_EVENT_BACKEND_NONE:
        X_AudioSprite["listen"](X_EVENT_BACKEND_NONE, X_AudioSprite_handleEvent)["asyncDispatch"](X_EVENT_BACKEND_NONE);
        return X_CALLBACK_STOP_NOW;
      case X_EVENT_MEDIA_WAIT_FOR_TOUCH:
        X_AudioSprite["asyncDispatch"](X_AudioSprite_TEMP.tmpEvent);
        delete X_AudioSprite_TEMP.tmpEvent;
        break;
      case X_EVENT_PROGRESS:
        X_AudioSprite["dispatch"]({type:X_EVENT_PROGRESS, "percent":e["percent"]});
        break;
      case X_EVENT_READY:
        console.log("X.AudioSprite - Ready!");
        if (X_AudioSprite_TEMP.tmpEvent) {
          _e = X_AudioSprite_TEMP.tmpEvent;
          _e["needTouchForPlay"] = false;
          X_AudioSprite["unlisten"](X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler)["asyncDispatch"](_e);
          delete X_AudioSprite_TEMP.tmpEvent;
        }
        for (i = 0; i < X_AudioSprite_numTracks; ++i) {
          track = X_AudioSprite_TEMP.tracks[i];
          (track.autoplay || track._playReserved) && track.actualPlay();
          delete track._playReserved;
        }
        this["listen"](X_EVENT_PROGRESS, X_AudioSprite_backendHandler);
        X_AudioSprite["asyncDispatch"](X_EVENT_READY);
        break;
    }
  }
  function X_AudioSprite_handleEvent(e) {
    var track = e.target, i, tracks, _e, k;
    switch(e.type) {
      case X_EVENT_MEDIA_PLAYING:
      case X_EVENT_MEDIA_WAITING:
      case X_EVENT_MEDIA_SEEKING:
        (track === X_AudioSprite_TEMP.bgmTrack || !track.looped) && X_AudioSprite["asyncDispatch"](e.type);
        break;
      case X_EVENT_MEDIA_BEFORE_LOOP:
        if (track === X_AudioSprite_TEMP.bgmTrack) {
          X_AudioSprite_TEMP.bgmLooped = true;
          X_AudioSprite["asyncDispatch"](X_EVENT_MEDIA_LOOPED);
        } else {
          if (!track.looped) {
            X_AudioSprite["asyncDispatch"](X_EVENT_MEDIA_ENDED);
          }
          if (X_AudioSprite_TEMP.bgmPlaying && !X_AudioSprite_TEMP.bgmTrack) {
            X_AudioSprite_TEMP.bgmTrack = track;
            X_AudioSprite.play(X_AudioSprite_TEMP.bgmName);
            return X_CALLBACK_PREVENT_DEFAULT;
          }
        }
        break;
      case X_EVENT_DEBUG:
        i = X_AudioSprite_TEMP.tracks.indexOf(track);
        if (0 <= i) {
          e["trackID"] = i;
          X_AudioSprite["dispatch"](e);
        }
        break;
      case X_EVENT_VIEW_ACTIVATE:
        console.log("\u25a0 \u30a2\u30af\u30c6\u30a3\u30d6");
        tracks = X_AudioSprite_TEMP.pauseTracks;
        while (tracks.length) {
          tracks.pop().actualPlay();
        }
        break;
      case X_EVENT_VIEW_DEACTIVATE:
        console.log("\u25a0 \u30c7\u30a2\u30af\u30c6\u30a3\u30d6");
        tracks = X_AudioSprite_TEMP.tracks;
        i = X_AudioSprite_numTracks;
        for (; i;) {
          track = tracks[--i];
          track.playing && X_AudioSprite_TEMP.pauseTracks.push(track) && track.pause();
        }
        break;
      case X_EVENT_BACKEND_NONE:
      case X_EVENT_UNLOAD:
        X_AudioSprite["kill"]();
        break;
      case X_EVENT_KILL_INSTANCE:
        X_AudioSprite_TEMP.pauseTracks.length = 0;
        while (X_AudioSprite_TEMP.tracks.length) {
          X_AudioSprite_TEMP.tracks.pop()["kill"]();
        }
        for (k in X_AudioSprite_TEMP.BGMs) {
          delete X_AudioSprite_TEMP.BGMs[k];
        }
        for (k in X_AudioSprite_TEMP.presets) {
          delete X_AudioSprite_TEMP.presets[k];
        }
        X_AudioSprite_TEMP.bgmTrack = null;
        X_AudioSprite_TEMP.bgmPosition = 0;
        X_AudioSprite_TEMP.bgmName = "";
        X_AudioSprite_TEMP.bgmLooped = false;
        X_AudioSprite_TEMP.bgmPlaying = false;
        X_ViewPort["unlisten"]([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD], X_AudioSprite_handleEvent);
        X_AudioSprite = null;
        break;
    }
  }
  var X_KB_SPECIALS = eval("({'8':'BS','9':'TAB'," + "'13':'ENTER','16':'SHIFT','17':'CTRL','18':'ALT','19':'PAUSE_BREAK','20':'SHIFT+CAPS_LOCK'," + "'27':'ESC','28':'trans','29':'notrans'," + "'33':'PAGE_UP','34':'PAGE_DOWN','35':'END','36':'HOME','37':'CSR_L','38':'CSR_U','39':'CSR_R','40':'CSR_D'," + "'44':'PRT_SCRN','45':'INS','46':'DEL'," + "'91':'LWIN','92':'RWIN','93':'APP'," + "'96':48,'97':49,'98':50,'99':51,'100':52,'101':53,'102':54,'103':55,'104':56,'105':57,'106':42,'107':43,'109':45,'110':46,'111':47," + 
  "'112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12'," + "'144':'NUM_LOCK','145':'SCROLL_LOCK','208':'CAPS_LOCK','240':'CAPS_LOCK','242':'K/H','243':'H/Z','244':'H/Z'})"), X_KB_DOWN_KEYS = {}, X_KB_CANCELED = {}, X_KB_lastIs10Key = false, X_KB_lastKeyCode = 0, X_KB_TRANSFOEM = {}, X_kbManager = X_Class_override(X_EventDispatcher(), {handleEvent:function(e) {
    var keyCode = e.keyCode, chrCode = e.charCode, cb = X_CALLBACK_NONE, special;
    switch(e.type) {
      case "keydown":
        if (X_KB_DOWN_KEYS[keyCode]) {
          console.log(" doen -- ");
          return X_KB_CANCELED[keyCode] ? X_CALLBACK_PREVENT_DEFAULT : cb;
        } else {
          if (special = X_KB_SPECIALS[keyCode]) {
            if (X_Type_isNumber(special)) {
              X_KB_lastKeyCode = keyCode;
              X_KB_lastIs10Key = true;
              return cb;
            } else {
              X_KB_DOWN_KEYS[keyCode] = true;
              chrCode = 0;
            }
            cb = this["dispatch"]({type:"keydown", keyCode:keyCode, charCode:chrCode, "keyName":X_Type_isString(special) ? special : "", "is10key":!!X_KB_lastIs10Key, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]});
            if (cb & X_CALLBACK_PREVENT_DEFAULT) {
              X_KB_CANCELED[keyCode] = true;
            }
          } else {
            X_KB_lastKeyCode = keyCode;
            if (e.ctrlKey || e.altKey || e.metaKey) {
              cb = this["dispatch"]({type:"keydown", keyCode:0, charCode:chrCode, "keyName":"", "is10key":false, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]});
              if (cb & X_CALLBACK_PREVENT_DEFAULT) {
                X_KB_CANCELED[keyCode] = true;
              }
            }
            console.log(" keydown[" + keyCode + "]" + String.fromCharCode(chrCode) + chrCode);
          }
        }
        return cb;
      case "keypress":
        if (X_KB_DOWN_KEYS[chrCode]) {
          return X_KB_CANCELED[chrCode] ? X_CALLBACK_PREVENT_DEFAULT : cb;
        } else {
          if (keyCode === 32) {
            chrCode = 32;
          }
        }
        if (32 <= chrCode && chrCode <= 126) {
          X_KB_TRANSFOEM[X_KB_lastKeyCode] = chrCode;
          cb = this["dispatch"]({type:"keydown", keyCode:X_KB_lastIs10Key ? X_KB_lastKeyCode : 0, charCode:chrCode, "is10key":X_KB_lastIs10Key, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]});
          X_KB_lastIs10Key = false;
          console.log(X_KB_lastKeyCode + "keypress : chrCode:" + chrCode + " down:" + X_KB_DOWN_KEYS[chrCode] + (X_KB_CANCELED[chrCode] ? " Cancel!" : ""));
        } else {
          console.log(">> keypress : chrCode:" + chrCode + " down:" + X_KB_DOWN_KEYS[chrCode] + (X_KB_CANCELED[chrCode] ? " Cancel!" : ""));
        }
        return cb;
      case "keyup":
        if (X_KB_CANCELED[keyCode]) {
          cb = X_CALLBACK_PREVENT_DEFAULT;
        }
        if ((special = X_KB_SPECIALS[keyCode]) && (!X_KB_DOWN_KEYS[keyCode] && !X_KB_DOWN_KEYS[special])) {
          cb |= this["dispatch"]({type:"keydown", keyCode:keyCode, charCode:0, "keyName":special, "is10key":false, "isVirtual":true, shiftKey:!!X_KB_DOWN_KEYS[16], ctrlKey:!!X_KB_DOWN_KEYS[17], altKey:!!X_KB_DOWN_KEYS[18], metaKey:!!X_KB_DOWN_KEYS[224]});
        }
        if (X_KB_DOWN_KEYS[keyCode]) {
          delete X_KB_DOWN_KEYS[keyCode];
        }
        if (X_KB_CANCELED[keyCode]) {
          delete X_KB_CANCELED[keyCode];
        }
        if (!special) {
          chrCode = X_KB_TRANSFOEM[keyCode];
          if (!chrCode) {
            return cb;
          }
          delete X_KB_TRANSFOEM[keyCode];
        } else {
          if (42 <= special) {
            chrCode = special;
          } else {
            chrCode = 0;
          }
        }
        cb |= this["dispatch"]({type:"keyup", keyCode:keyCode, charCode:chrCode, "keyName":X_Type_isString(special) ? special : "", shiftKey:X_KB_DOWN_KEYS[16], ctrlKey:X_KB_DOWN_KEYS[17], altKey:X_KB_DOWN_KEYS[18], metaKey:X_KB_DOWN_KEYS[224]});
        return cb;
      case X_EVENT_VIEW_ACTIVATE:
        break;
      case X_EVENT_VIEW_DEACTIVATE:
        break;
    }
  }}), X_KB = X["KB"] = {"listen":function(type, arg1, arg2, arg3) {
    type && arg1 && X_kbManager["listen"](type, arg1, arg2, arg3);
    return X_KB;
  }, "listenOnce":function(type, arg1, arg2, arg3) {
    type && arg1 && X_kbManager["listenOnce"](type, arg1, arg2, arg3);
    return X_KB;
  }, "unlisten":function(type, arg1, arg2, arg3) {
    type && arg1 && X_kbManager["unlisten"](type, arg1, arg2, arg3);
    return X_KB;
  }, "listening":function(type, arg1, arg2, arg3) {
    return X_kbManager["listening"](type, arg1, arg2, arg3);
  }};
  X_ViewPort["listen"]([X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE], X_kbManager);
  if (X_UA["IE"] < 9) {
    X_ViewPort_document["listen"](["keyup", "keydown", "keypress"], X_kbManager);
  } else {
    X_ViewPort["listen"](["keyup", "keydown", "keypress"], X_kbManager);
  }
  X.buildTimeStamp = "2019/05/15  2:30:44.69";
  window["X"] = X;
  X_TEMP.onRearchEndOfScript();
})();

