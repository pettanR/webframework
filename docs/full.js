/*
 Copyright 2012-2014 pettanR team.
 https://sourceforge.jp/projects/pettanr/
 BSD 3-Clause License
*/
(function(v) {
  function bg(a, b) {
    var c = [], d = ei, e = 0, g, h;
    for (g = a.length; e < g; ++e) {
      var l = b < d[h = a.charCodeAt(e)] ? a.charAt(e) : (16 > h ? "%0" + h.toString(16) : 128 > h ? "%" + h.toString(16) : 2048 > h ? "%" + (h >> 6 | 192).toString(16) + "%" + (h & 63 | 128).toString(16) : "%" + (h >> 12 | 224).toString(16) + "%" + (h >> 6 & 63 | 128).toString(16) + "%" + (h & 63 | 128).toString(16)).toUpperCase();
      c[e] = l;
    }
    return c.join("");
  }
  function fi(a) {
    var b = [], c = parseInt, d = String.fromCharCode, e = -1, g = 0, h;
    for (h = a.length; g < h; ++g) {
      if (k) {
        var l = c(a.substr(g, 2), 16);
        ++g;
        if (127 < l) {
          if (223 < l) {
            var k = (l & 15) << 12;
            l = c(a.substr(g + 2, 2), 16) & 63;
            g += 3;
            k += l << 6;
          } else {
            k = (l & 63) << 6;
          }
          l = c(a.substr(g + 2, 2), 16) & 63;
          g += 3;
          l += k;
        }
        b[++e] = d(l);
        k = !1;
      } else {
        l = a.charAt(g), (k = "%" === l) || (b[++e] = l);
      }
    }
    return b.join("");
  }
  function r(a) {
    if (V(a)) {
      r.ViewPort.listenOnce(ec, a);
    } else {
      if (He) {
        return He.apply(gi || r, arguments);
      }
    }
  }
  function Ta(a, b) {
    if (Lb) {
      return Lb(a, b || []);
    }
  }
  function sb(a) {
    return Lb ? Ta(Ie, [a]) : Hd ? !window.vbs_testAXO(a) && Ie(a) : Ie(a);
  }
  function Ie(a) {
    return new ActiveXObject(a);
  }
  function Z(a) {
    return a && "object" === typeof a && a !== a + "" && a !== a + 0 && !0 !== a;
  }
  function V(a) {
    return "function" === typeof a;
  }
  function cg(a) {
    return "unknown" === typeof a;
  }
  function fc(a) {
    return !0 === a || !1 === a;
  }
  function H(a) {
    return a === a + "";
  }
  function R(a) {
    return a + 0 === a || a !== a;
  }
  function ja(a) {
    return a + 0 === a && isFinite(a);
  }
  function gc(a) {
    return a !== a;
  }
  function dg(a) {
    return a && a.constructor === window.Image || a && window.HTMLImageElement && a.constructor === window.HTMLImageElement || 525.13 > f.WebKit && a && !Je(a.src) && !Je(a.onload) && R(a.height) && R(a.width) && fc(a.complete) ? !0 : !1;
  }
  function Je(a) {
    return a === v;
  }
  function Mb(a) {
    var b;
    if (!a || !Z(a)) {
      return a;
    }
    var c = {};
    for (b in a) {
      c[b] = a[b];
    }
    return c;
  }
  function Ke(a, b) {
    var c;
    if (!b || !Z(b)) {
      return a;
    }
    for (c in b) {
      a[c] = b[c];
    }
    return a;
  }
  function Id(a, b) {
    if (a) {
      for (b in a) {
        delete a[b];
      }
    }
  }
  function Le(a) {
    return eg(a, [], [], -1);
  }
  function eg(a, b, c, d) {
    var e;
    if (a) {
      if (ra(a)) {
        var g = b.indexOf(a);
        if (-1 !== g) {
          return c[g];
        }
        b[++d] = a;
        c[d] = g = [];
      } else {
        if (Z(a)) {
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
      g[e] = eg(a[e], b, c, d);
    }
    return g;
  }
  function Ba(a, b) {
    for (var c = b.split(">"); b = c.shift();) {
      if (a = a[b], !a) {
        return;
      }
    }
    return a;
  }
  function aa(a) {
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
      b[c] = a[c];
    }
    return b;
  }
  function Me(a) {
    if (H(a)) {
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
      if (Jd(b)) {
        return b - 0;
      }
    }
    return a;
  }
  function hc(a) {
    if (null == a || "" === a) {
      return "";
    }
    for (a = ("" + a).split(Qc).join(" ").split("\r").join(" ").split("\n").join(" ").split("\t").join(" ").split("\f").join(" ").split("\b").join(" ");;) {
      a = a.split("  ");
      if (2 > a.length) {
        return a[0];
      }
      a = a.join(" ");
    }
  }
  function Rc(a) {
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
    var c = Ne;
    for (b in c) {
      a = a.split(b).join(c[b]);
    }
    return a.split("&amp;").join("&");
  }
  function Nb(a) {
    return null == a || "" === a ? "" : ("" + a).split("&").join("&amp;").split('"').join("&quot;").split("'").join("&apos;").split("<").join("&lt;").split(">").join("&gt;");
  }
  function Jd(a) {
    var b = a - 0;
    return "" + b === a || "" + b === "0" + a;
  }
  function fg(a, b) {
    var c, d = [];
    for (c in a) {
      Oe(d, c, a[c], !!b);
    }
    return d.join("&").split("%20").join("+");
  }
  function gg(a, b, c) {
    c = V(c) ? c() : null == c ? "" : c;
    a[a.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c);
  }
  function Oe(a, b, c, d) {
    var e;
    if (ra(c)) {
      var g = 0;
      for (e = c.length; g < e; ++g) {
        var h = c[g];
        d || "[]" === b ? gg(a, b, h) : Oe(a, b + "[" + (Z(h) ? g : "") + "]", h, d);
      }
    } else {
      if (!d && Z(c)) {
        for (g in c) {
          Oe(a, b + "[" + g + "]", c[g], d);
        }
      } else {
        gg(a, b, c);
      }
    }
  }
  function Pe(a, b) {
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
  function Ob(a) {
    var b = 0;
    if (-1 !== "http:file:https".indexOf(a.substr(0, 5))) {
      return a;
    }
    var c = hg.split("//");
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
  function Qe(a) {
    a = Kd(Ob(a));
    return a === ig || 0 === a.indexOf(ig + "/");
  }
  function jg(a) {
    return 0 === Ob(a).indexOf(location.protocol);
  }
  function kg(a) {
    return 0 === Ob(a).indexOf("file:");
  }
  function Kd(a) {
    return a.split("?")[0].split("#")[0];
  }
  function Sc(a) {
    a = Kd(a).split(".");
    return a.length ? a.pop() : "";
  }
  function Re(a) {
    a = a.split("#");
    a.splice(0, 1);
    return a.join("#");
  }
  function Ld(a) {
    var b = [], c, d = -1;
    for (c in a) {
      -1 !== d && (b[++d] = "&"), b[++d] = c, b[++d] = "=", b[++d] = encodeURIComponent(a[c]);
    }
    return b.join("");
  }
  function Md(a, b) {
    return Z(b) && (b = Ld(b)) ? a + (-1 !== a.indexOf("?") ? "&" : "?") + b : a;
  }
  function ic(a) {
    var b = 0, c = {}, d;
    if (!a) {
      return c;
    }
    a = a.split("&");
    for (d = a.length; b < d; ++b) {
      var e = a[b];
      var g = e.indexOf("=");
      -1 === g ? c[decodeURIComponent(e)] = !0 : c[decodeURIComponent(e.substr(0, g))] = Me(decodeURIComponent(e.substr(g + 1)));
    }
    return c;
  }
  function Tc(a, b) {
    var c = Pb[Pb.length - 1], d = jc[jc.length - 1];
    Se = !0;
    if (!b || z(a) || !(Z(a) || ra(a) || V(a))) {
      return !1;
    }
    c.length === lg && (c = Pb[Pb.length] = [], d = jc[jc.length] = []);
    c[c.length] = a;
    d[d.length] = b;
    return !0;
  }
  function z(a) {
    var b = !Se, c;
    Se = !1;
    if (a === Nd) {
      return Te;
    }
    (c = hi(Pb, jc, a)) && b && (Nd = a, Te = c);
    return c;
  }
  function Uc(a, b) {
    for (var c = 0, d = Pb.length, e, g, h; c < d; ++c) {
      if (e = Pb[c], g = jc[c], h = e.indexOf(a), -1 !== h && (b === v || g[h] === b)) {
        return e.splice(h, 1), g.splice(h, 1), Nd === a && (Nd = Te = null), !0;
      }
    }
    return !1;
  }
  function Ha(a, b, c) {
    a = ta(a, b, c);
    if (!a.j) {
      return a;
    }
    (b = kc.length) ? (b = kc[b - 1], --kc.length, c = b(Ue), c.j = a.j, c.za = a.za, c.u = a.u, c.context = a.context, c.O = a.O, c.proxy = Vc) : (b = mg(a), a.proxy = Vc);
    return Wc[Wc.length] = b;
  }
  function ta(a, b, c, d) {
    if (Z(a) && V(b)) {
      var e = {context:a, u:b, j:1};
    } else {
      if (Z(a)) {
        b && H(b) ? e = {context:a, za:b, j:4} : (e = {context:a, j:2}, c = b);
      } else {
        if (V(a)) {
          c = b, d ? e = {context:d, u:a, j:1} : e = {u:a, j:3};
        } else {
          if (V(b)) {
            d ? e = {context:d, u:b, j:1} : e = {u:b, j:3};
          } else {
            if (d && H(a)) {
              c = b, e = {context:d, za:a, j:4};
            } else {
              if (d) {
                e = {context:d, j:2}, c = a;
              } else {
                console.log("\u4e0d\u6b63 " + a);
                console.dir(a);
                return;
              }
            }
          }
        }
      }
    }
    ra(c) && (e.O = c);
    return e.context || e.O ? e : a;
  }
  function mg(a) {
    return function() {
      if (arguments[0] === Ue) {
        return a;
      }
      if (arguments[0] !== Ve) {
        return a.proxy && a.proxy(a, arguments);
      }
    };
  }
  function Vc(a, b) {
    var c = b || [], d = a.context, e = a.u, g = a.O;
    if (g && g.length) {
      var h = [];
      c.length && (1 === c.length ? h[0] = c[0] : h.push.apply(h, c));
      1 === g.length ? h[h.length] = g[0] : h.push.apply(h, g);
      c = h;
    }
    switch(a.j) {
      case 1:
        return 0 === c.length ? e.call(d) : e.apply(d, c);
      case 4:
        var l = a.za;
      case 2:
        l = l || "handleEvent";
        h = d[l];
        if (V(h)) {
          return 0 === c.length ? d[l]() : 1 === c.length ? d[l](c[0]) : h.apply(d, c);
        }
        break;
      case 3:
        return 0 === c.length ? e() : 1 === c.length ? e(c[0]) : e.apply(null, c);
    }
    return 0;
  }
  function Ca(a) {
    var b = Wc.indexOf(a);
    if (-1 !== b) {
      return Wc.splice(b, 1), kc[kc.length] = a, a = a(Ue), Id(a), !0;
    }
  }
  function Od() {
    var a = aa(arguments), b = a[0], c, d, e = {}, g = {proxy:ii, Ld:e};
    !0 === H(b) && (e.displayName = b, a.shift());
    e.vd = c = a[0];
    if (R(c)) {
      var h = !!(c & ba.va);
      var l = !!(c & ba.kc);
      if ((d = !!(c & ba.Jc)) && l) {
        r.N.Ub("final & Abstract!");
        return;
      }
      a.shift();
    } else {
      e.vd = 0;
    }
    a = a[0];
    if (!Z(a)) {
      a = {};
    } else {
      if (a.Constructor) {
        if (!V(a.Constructor)) {
          alert('"Constructor" is not function.');
          return;
        }
        e.Eb = a.Constructor;
      }
    }
    c = mg(g);
    g.Ka = c;
    c.superClassOf = ng;
    c.subClassOf = ji;
    og ? (ua(c.prototype, a, !0), Xc ? c.prototype.__proto__ = Xc : ua(c.prototype, pg, !1)) : (c.prototype = ua(ua(Xc || c.prototype, a, !0), pg, !1), c.prototype.constructor = c);
    c.NAME = b;
    l ? e.Qd = !0 : h && (e.bb = [], e.cc = []);
    d ? e.Ad = !0 : c.inherits = ki;
    Pd.push(c);
    We.push(e);
    return c;
  }
  function qg(a) {
    var b = Pd, c;
    if (-1 !== (c = b.indexOf(a.constructor))) {
      return b[c];
    }
    if (-1 !== b.indexOf(a)) {
      return a;
    }
  }
  function Ia(a) {
    var b = Pd.indexOf(a);
    -1 === b && (b = Pd.indexOf(qg(a)));
    if (-1 !== b) {
      return We[b];
    }
    if (-1 !== We.indexOf(a)) {
      return a;
    }
  }
  function ua(a, b, c) {
    for (var d in b) {
      if ("Constructor" !== d) {
        if ("__proto__" === d || "prototype" === d || "constructor" === d) {
          r.N.Ub(d + " is reserved!");
          return;
        }
        if (c || a[d] === v) {
          a[d] = b[d];
        }
      }
    }
    return a;
  }
  function ng(a) {
    var b = Ia(a), c = a;
    if (!Ia(this) || !b || this === a) {
      return !1;
    }
    for (; c = Ia(c).Ea;) {
      if (c === this) {
        return !0;
      }
    }
    return !1;
  }
  function ji(a) {
    return a && ng.call(a, this);
  }
  function ki() {
    var a = aa(arguments), b = [], c = Ia(this), d = a[0];
    c.Ad && r.N.Ub("X.Class inherits, Class is final!");
    H(d) ? a.shift() : d = "SubClass of " + c.displayName;
    b.push(d);
    d = a[0];
    R(d) ? a.shift() : d = c.vd;
    b.push(d);
    a[0] && qg(a[0]) && b.push(a.shift());
    b.push(a[0]);
    Xc = og ? this.prototype : new this(Ve);
    a = Od.apply(r.ye, b);
    Xc = null;
    Ia(a).Ea = this;
    return a;
  }
  function ii(a, b) {
    var c = a.Ka, d = a.Ld;
    if (d.Qd) {
      r.N.Ub("AbstractClass!");
    } else {
      var e = d.bb && d.bb.length ? d.bb.pop() : new c(Ve);
      d.cc && d.cc.push(e);
      li && e.constructor !== c && (console.log("------- constructor \u306e\u4e0d\u4e00\u81f4!"), e.constructor = c);
      c = d.Eb ? d.Eb.apply(e, b) : d.Ea && e.Super.apply(e, b);
      return c !== e && (Z(c) || V(c)) ? (e.kill(), c) : e;
    }
  }
  function Yc(a) {
    var b = this._listeners, c = 0, d = a.type, e, g, h, l;
    if (!b || !(e = b[d || a])) {
      return 0;
    }
    d || (a = {type:d = a});
    a.target = a.target || this;
    a.currentTarget = a.currentTarget || this;
    b[tb] ? ++b[tb] : b[tb] = 1;
    for (g = 0; g < e.length; ++g) {
      var k = e[g];
      if (!k.$d) {
        var f = Vc(k, h || (h = [a]));
        if (k.once || f & 1) {
          if (!va) {
            var va = b[3] || (b[3] = {});
            va = va[d] || (va[d] = []);
          }
          -1 === va.indexOf(k) && (va[va.length] = k);
        }
        c |= ja(f) ? f : 0;
        if (6 === (f & 6)) {
          break;
        }
      }
    }
    if (0 === --b[tb]) {
      delete b[tb];
      if (e = b[2]) {
        g = 0;
        for (a = e.length; g < a; ++g) {
          k = e[g], lc = k[4], ub = k[5], this.listen(k[0], k[1], k[2], k[3]), k.length = 0;
        }
        e.length = 0;
        lc = ub = !1;
        delete b[2];
      }
      if (va = b[3]) {
        delete b[3];
        Qb = !0;
        for (l in va) {
          e = va[l];
          for (g = e.length; g;) {
            this.unlisten(l, e[--g]);
          }
          e.length = 0;
          delete va[l];
        }
        Qb = !1;
      }
      mc[Qd] === this && delete mc[Qd];
      b[nc] && this.kill();
    }
    return c;
  }
  function rg(a, b, c, d) {
    var e = this._listeners, g;
    if (!a) {
      return this;
    }
    if (e && e[tb]) {
      return e[2] || (e[2] = []), e[2][e[2].length] = [a, b, c, d, lc, ub], this;
    }
    if (ra(a)) {
      for (g = a.length; g;) {
        this.listen(a[--g], b, c, d);
      }
      return this;
    }
    var h = (g = this._rawObject || E.o && ca(this)) && (!e || !e[a]) && H(a);
    if (this.listening(a, b || this, c, d)) {
      return this;
    }
    e || (e = this._listeners = {});
    e = e[a] || (e[a] = []);
    h && sg(this, a, g, e);
    a = ta(b, c, d, this);
    e[e.length] = a;
    a.once = lc;
    a.lock = ub;
    return this;
  }
  function sg(a, b, c, d) {
    ub || (b = w[b] || b);
    if (ra(b)) {
      for (c = b.length; c;) {
        d = a;
        var e = b[--c], g = da;
        ub = !0;
        d.listen(e, g, void 0, void 0);
        ub = !1;
        console.log("events fix > " + b[c]);
      }
    } else {
      if (Ja.W) {
        switch(a._rawType) {
          case 2:
            d.ia = Ha(a, Xe, [b]);
            d.Ca = c.AddEventListener(b, d.ia);
            break;
          case 1:
            if (12 > f.Opera) {
              c["on" + b] = Ha(a, Yc, [b]);
              break;
            }
          default:
            Rd && Rd[b] ? c.addEventListener(b, tg, !1) : (a = a._listeners[0] || (a._listeners[0] = Ha(a, Ye)), c.addEventListener ? c.addEventListener(b, a, !1) : c["on" + b] = a);
        }
      } else {
        if (Ja.Fb) {
          switch(a._rawType) {
            case 2:
              d.ia = Ha(a, Xe, [b]);
              d.Ca = c.AddEventListener(b, d.ia);
              break;
            case 1:
              console.log("XHR addEvent " + b);
              c["on" + b] = Ha(a, Yc, [b]);
              break;
            default:
              a = a._listeners[0] || (a._listeners[0] = Ha(a, Ye)), c.attachEvent ? c.attachEvent("on" + b, a) : c["on" + b] = a;
          }
        } else {
          switch(a._rawType) {
            case 2:
              d.ia = Ha(a, Xe, [b]);
              d.Ca = c.AddEventListener(b, d.ia);
              break;
            case 1:
              c["on" + b] = Ha(a, Yc, [b]);
              break;
            default:
              c["on" + b] = a._listeners[0] || (a._listeners[0] = Ha(a, Ye));
          }
        }
      }
    }
  }
  function tg(a) {
    return oa(this).dispatch(Zc[a.type] || a.type);
  }
  function Xe(a, b, c) {
    return this.dispatch(c);
  }
  function ug(a, b, c, d, e) {
    Qb || (b = w[b] || b);
    if (ra(b)) {
      for (c = b.length; c;) {
        d = a;
        e = b[--c];
        var g = da;
        Qb = !0;
        d.unlisten(e, g, void 0, void 0);
        Qb = !1;
      }
    } else {
      if (Ja.W) {
        switch(a._rawType) {
          case 2:
            c.RemoveEventListener(b, d.Ca);
            Ca(d.ia);
            delete d.Ca;
            delete d.ia;
            break;
          case 1:
            if (12 > f.Opera) {
              Ca(c["on" + b]);
              c["on" + b] = "";
              break;
            }
          default:
            Rd && Rd[b] ? c.removeEventListener(b, tg, !1) : c.addEventListener ? c.removeEventListener(b, a._listeners[0], !1) : c["on" + b] = null, !e && a._listeners[0] && (Ca(a._listeners[0]), delete a._listeners[0]);
        }
      } else {
        if (Ja.Fb) {
          switch(a._rawType) {
            case 2:
              c.RemoveEventListener(b, d.Ca);
              Ca(d.ia);
              delete d.Ca;
              delete d.ia;
              break;
            case 1:
              Ca(c["on" + b]);
              c["on" + b] = da;
              c["on" + b] = "";
              console.log("XHR rmEvent " + b);
              break;
            default:
              c.attachEvent ? (c.detachEvent("on" + b, a._listeners[0]), console.log("raw rmEvent " + b)) : (c["on" + b] = da, c["on" + b] = ""), e || (Ca(a._listeners[0]), delete a._listeners[0]);
          }
        } else {
          switch(a._rawType) {
            case 2:
              c.RemoveEventListener(b, d.Ca);
              Ca(d.ia);
              delete d.Ca;
              delete d.ia;
              break;
            case 1:
              Ca(c["on" + b]);
              c["on" + b] = da;
              c["on" + b] = "";
              break;
            default:
              c["on" + b] = da, c["on" + b] = "", e || (Ca(a._listeners[0]), delete a._listeners[0]);
          }
        }
      }
    }
  }
  function oc(a, b) {
    var c = a._listeners, d = a._rawObject || E.o && ca(a), e = b ? sg : ug, g;
    if (c && d) {
      for (g in c) {
        Jd(g) || e(a, g, d, c[g], !0);
      }
    }
  }
  function fa(a, b, c, d, e) {
    var g = Sd;
    a = a < Ua ? 1 : a / Ua | 0;
    R(b) || (e = d, d = c, c = b, b = 0);
    c = ta(c, d, e);
    if (!c) {
      return -1;
    }
    c.j || (c = {u:c});
    c.Hd = a;
    c.ra = a;
    c.Vc = b;
    c.ca = ++Td;
    g[g.length] = c;
    !$c && Ze();
    return Td;
  }
  function ka(a, b, c, d) {
    return fa(a, 1, b, c, d);
  }
  function O(a) {
    var b = Sd, c = b.length, d = c, e;
    if ($c) {
      ea || (ea = {}), ea[a] = !0;
    } else {
      for (; c;) {
        if ((e = b[--c]).ca == a) {
          b.splice(c, 1);
          mc[a] && delete mc[a];
          !$e && (e.ra <= ad || 1 === d) && Ze();
          break;
        }
      }
    }
    return 0;
  }
  function Ud() {
    var a = Q(), b = (a - bd) / Ua | 0 || 1, c = Sd, d = 0, e = c.length;
    a += Ua / 2;
    var g, h;
    $c && alert("X_Timer_busyTimeout \u30d5\u30e9\u30b0\u304c\u7acb\u3063\u305f\u307e\u307e!\u30a8\u30e9\u30fc\u306e\u53ef\u80fd\u6027");
    for ($c = !0; d < e; ++d) {
      var l = c[d];
      if (!(ea && ea[l.ca] || 0 < (l.ra -= b) || g && (l.ra = 1))) {
        var k = l.Vc;
        Qd = l.ca;
        var f = l.j ? Vc(l, []) : l.u();
        a <= Q() && (g = !0);
        f & 1 || 1 === k ? (c.splice(d, 1), --d, --e) : (1 < k && --l.Vc, l.ra = l.Hd);
      }
    }
    Va = Qd = 0;
    $c = !1;
    if (ea) {
      $e = !0;
      for (h in ea) {
        O(h);
      }
      $e = !1;
      ea = null;
    }
    Ze();
    Vd();
  }
  function Ze() {
    var a = Sd, b = a.length;
    if (0 === b) {
      Va && clearTimeout(Va), Va = 0;
    } else {
      if (1 < b && a.sort(mi), a = a[0].ra, a < ad || 0 === Va) {
        Va && (clearTimeout(Va), a -= (Q() - bd) / Ua, 0 <= a || (a = 0)), bd = Q(), Va = setTimeout(Ud, Ua * a | 0), ad = a;
      }
    }
  }
  function mi(a, b) {
    return a.ra === b.ra ? a.ca - b.ca : a.ra - b.ra;
  }
  function Wd(a) {
    var b = Rb, c = b.length, d = 0, e, g;
    a = a || Q();
    for (Xd = !0; d < c; ++d) {
      var h = b[d];
      ea && ea[h.ca] || (h.j ? Vc(h, g || (g = [a])) : h.u(a));
    }
    b.splice(0, c);
    b.length && (cd = Yd ? Yd(Wd) : fa(0, 1, Wd));
    Xd = !1;
    if (ea) {
      for (e in ea) {
        dd(ea[e]);
      }
      ea = null;
    }
    Vd();
  }
  function Vd() {
    var a = -1, b;
    if (ed.length) {
      for (; b = ed[++a];) {
        b();
      }
      ed.length = 0;
    }
  }
  function fd() {
    return vg || (Lb ? Ta(Ba, [document, "activeElement"]) : window.vbs_testAE() && document.activeElement);
  }
  function af(a) {
    var b = fd();
    b !== a && (cb = !0, a.focus(), cb = !1, Zd || (Zd = b) && (ed[ed.length] = ni));
  }
  function ni() {
    var a = fd(), b = Zd;
    a !== b && (cb = !0, b.focus(), cb = !1);
    Zd = null;
  }
  function wg(a) {
    var b = fd();
    Wa = "focus" === a.type;
    b && this._rawObject !== b && (this.unlisten(Wa ? "blur" : "focus", wg), console.log(">>>>>> activeElement \u53d6\u5f97 \u4e0d\u4e00\u81f4 " + this.je));
    Sb && O(Sb);
    Sb = ka(16, xg);
    return 10;
  }
  function xg() {
    p.dispatch(Wa ? 20 : 21);
    Sb = 0;
  }
  function bf() {
    var a = cf();
    pc !== a[0] || qc !== a[1] ? (pc = a[0], qc = a[1], ka(100, bf)) : (console.log("-- detectFinishResizing : " + Q()), p.asyncDispatch(22), gd = !1, df && (df = !1, p.asyncDispatch(100, {type:23, orientation:window.orientation})));
  }
  function oi(a) {
    vg = a.target._rawObject;
  }
  function cf() {
    return f.IE ? [Da.clientWidth, Da.clientHeight] : 12 > f.Opera ? [Da.offsetWidth, Da.offsetHeight] : [window.innerWidth, window.innerHeight];
  }
  function rc(a, b, c) {
    switch(sc(a)) {
      case tc:
        return $d = !0, new P(a, b, c);
      case uc:
        a = vc(a, !0);
        for (b = a.length; 1 < b;) {
          a[--b].kill();
        }
        return a[0];
    }
  }
  function ae(a) {
    be = !0;
    return new P(a);
  }
  function db(a, b) {
    var c = a._flags;
    if (!a._tag || 0 === (c & A) || c & 4) {
      return 0;
    }
    W && S();
    return (c = a._rawObject || ca && ca(a)) ? c[b] : 0;
  }
  function ef(a, b) {
    var c = a._attrs, d = ce, e = [""], g = pi, h = 0, l;
    b ? delete a._newAttrs : a._flags &= -524289;
    if (!c) {
      return delete a._attrText, "";
    }
    for (l in c) {
      if (!g[l]) {
        if (b) {
          var k = !1;
          switch(a._tag + l) {
            case "PARAMvalue":
              k = "movie" !== c.name;
            case "INPUTsrc":
              k = k || "image" !== c.type;
            case "LINKhref":
              if (k = k || "stylesheet" !== c.rel, !k) {
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
              a._newAttrs[l] = c[l];
              continue;
          }
        }
        e[++h] = d[l] ? l : [l, '="', qi[l] ? Nb(c[l]) : c[l], '"'].join("");
      }
    }
    if (0 < h) {
      return a._attrText = e.join(" ");
    }
    delete a._attrText;
    return "";
  }
  function yg(a, b, c, d, e) {
    switch(d) {
      case "ns":
      case "NS":
        if ("svg" === e || "SVG" === e) {
          a._flags |= Ea;
        }
        if ("vml" === e || "VML" === e) {
          a._flags |= vb;
        }
        return;
      case "UID":
      case "tag":
      case "tagName":
        return;
      case "id":
        e = e !== "ie4uid" + a._uid ? e : v;
        e !== a._id && (a._id = e, a._flags |= 8192, a._flags & A && la());
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
    if (0 === d.indexOf("on")) {
      r.N.warn('xnode.attr("' + d + '") is wrong, xnode.listen() & xnode.unlisten().');
    } else {
      if (d = de[d] || d, b[d] !== e) {
        return null == e ? (c[d] = v, Ka(d, b) && delete b[d]) : c[d] = b[d] = e, !0;
      }
    }
  }
  function ff(a) {
    var b;
    if (b = zg[a]) {
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
    return zg[a] = b;
  }
  function hd(a) {
    var b = ri, c = b + 25, d, e;
    a = a.split(" ").join("");
    if (d = Ag[a]) {
      return d;
    }
    d = "";
    var g = 0;
    for (e = a.length; g < e; ++g) {
      var h = a.charAt(g);
      var l = h.charCodeAt(0);
      d += b <= l && l <= c ? "-" + h : h;
    }
    return Ag[a] = d.toLowerCase();
  }
  function si(a) {
    var b;
    if (R(a)) {
      return 0 <= a && 16777215 >= a ? a : NaN;
    }
    if (H(a)) {
      if (R(b = Bg[a.toUpperCase()]) && 0 <= b && 16777215 >= b) {
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
      return ja(c + b + d) ? (c << 16) + (d << 8) + b : NaN;
    }
  }
  function Tb(a, b) {
    var c = a._css, d = [], e = -1, g, h;
    a._flags &= ~La;
    if (!c) {
      return delete a._cssText, "";
    }
    for (k in c) {
      var l = c[k];
      var k = hd(wb[k] || k);
      (g = ti[k]) ? d[++e] = k + ":" + g(l) : wc && wc[k] ? (h || (h = {}))[k] = l : d[++e] = k + ":" + l;
    }
    h ? (l = gf(a, h, d), e = d.length, l && (d[++e] = "filter:" + l), b = b && l) : b = !1;
    if (0 <= e) {
      return a._cssText = d.join(";"), b ? (--d.length, d.join(";")) : a._cssText;
    }
    delete a._cssText;
    return "";
  }
  function gf(a, b, c) {
    b = b || a._css;
    var d = wc, e = [], g = -1, h, l, k, f, va, m;
    for (h in b) {
      if (l = d[h]) {
        var u = b[h];
        switch(l) {
          case 1:
            e[++g] = u;
            break;
          case 2:
            0 === u ? c && (c[c.length] = "visibility:hidden") : 1 > u && (e[++g] = "alpha(opacity=" + (100 * u | 0) + ")");
            break;
          case 3:
            var t = u.split(" ");
            l = [0, 0, 0, 0];
            var q = 0;
            for (f = t.length; q < f; ++q) {
              u = t[q];
              var J = 4 > q && parseFloat(u);
              if (J === J) {
                if (J = id(u), u = J[0], J = J[1], u) {
                  if (k = ee[J]) {
                    l[q] = u / k;
                  } else {
                    switch(J) {
                      case "px":
                        l[q] = u;
                        break;
                      case "em":
                        W ? va = !0 : l[q] = xc(a) * u;
                      default:
                        l[q] = 0;
                    }
                  }
                } else {
                  l[q] = 0;
                }
              } else {
                if ("#" === u.charAt(0) || 0 === u.indexOf("rgb") || Bg[u.toUpperCase()]) {
                  if (u = si(u), 0 <= u && 1048576 > u) {
                    var r = "00000" + u.toString(16);
                    r = "#" + r.substr(r.length - 6);
                  } else {
                    u && (r = "#" + u.toString(16));
                  }
                } else {
                  "inset" === u && (m = !0);
                }
              }
            }
            if (m || !r) {
              break;
            }
            if (va) {
              p.listenOnce(hb, a, ui);
              break;
            }
            u = eb(180 * Math.atan2(l[1] + l[3], l[0] + l[3]) / Math.PI + 90);
            e[++g] = "shadow(color=" + r + ",strength=" + l[3] + ",direction=" + (u | 0) + ")";
            break;
          case 7:
            a._flags |= fe;
        }
      }
    }
    return e.join(" ");
  }
  function eb(a) {
    a %= 360;
    return 0 > a ? 360 + a : a;
  }
  function ui() {
    this._flags & A && (this._flags |= Xa, la());
  }
  function id(a) {
    if (R(a)) {
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
    return [b, vi[a] ? a : "px"];
  }
  function Cg(a, b, c, d) {
    wc && wc[c] && (b |= Xa);
    d || 0 === d ? a[c] = d : delete a[c];
    switch(c) {
      case "display":
        "none" === d ? b |= 4 : b &= -5;
        break;
      case "visibility":
        if (b & 8 && 0 == a.opacity) {
          break;
        }
        "hidden" === d ? b |= 8 : b &= -9;
        break;
      case "opacity":
        b |= 0;
        if (b & 8 && "hidden" === a.visibility) {
          break;
        }
        0 == d ? b |= 8 : b &= -9;
        break;
      case "overflow":
        "hidden" === d ? b |= 32 : b &= -33;
        break;
      case "position":
        "absolute" === d ? b |= 16 : b &= -17;
        break;
      case "width":
        d = id(d);
        b = "%" !== d[1] ? (b | 64) & -129 : b & -65 | 128;
        break;
      case "height":
        d = id(d), b = "%" !== d[1] ? (b | 256) & -513 : b & -257 | 512;
    }
    return b;
  }
  function Ma(a) {
    for (var b = [], c = arguments.length, d = 0, e, g, h = 0, l; d < c; ++d) {
      b.push.apply(b, arguments[d]);
    }
    if (1 === (c = b.length)) {
      return new P(b[0]);
    }
    if (!this || this.append !== Ma.prototype.append) {
      return new Ma(b);
    }
    for (d = 0; d < c; ++d) {
      e = b[d];
      l = !1;
      for (g = 0; g < h; ++g) {
        if (this[g] === e) {
          l = !0;
          break;
        }
      }
      l || (this[h] = e, h = ++this.length);
    }
  }
  function Dg(a) {
    var b = wi, c = xi, d = yi, e = [], g = -1, h = a.length, l = 0, k = 0, f = 0, m, q, u, t, r, J, gb, v, x, p;
    for (a += " "; g < h;) {
      var n = a.charAt(++g);
      var C = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789\\".indexOf(n);
      C = (m = -1 !== C) && 52 > C;
      switch(l) {
        case 0:
          C ? (f = 1, l = 2, t = g) : !B && (q = b[n]) ? 1 < q && 1 < k ? l = 15 : (l = 5 === q ? 14 : 0) & ((1 < q || 1 > k) && (k = q)) & (5 === q && ++g) : (q = c[n]) ? (f = q) && (l = 5 === f ? 4 : 1) : "*" === n ? (f = 1, r = n) && (l = 14) && ++g : " " !== n && (l = 15);
          break;
        case 1:
          C ? (t = g) && (l = 2) : " " !== n && (l = 15);
          break;
        case 2:
          !m && (!G || 2 !== f && 3 !== f || ":" !== n && "." !== n) ? (r = a.substring(t, g)) && (l = 4 === f && "not" !== r && "(" === n ? "lang" !== r && "contains" !== r ? 8 : 11 : 14) : 4 > c[n] && (l = 14);
          break;
        case 4:
          C ? (l = 5, t = g) : " " !== n && (l = 15);
          break;
        case 5:
          "=" === n ? (v = 1, l = 6, J || (J = a.substring(t, g))) && (t = g + 1) : "]" === n ? (v = 0, l = 14, J || (J = a.substring(t, g))) && ++g : " " === n ? J || (J = a.substring(t, g)) : (v = d[a.substr(g, 2)]) ? (l = 6, J || (J = a.substring(t, g))) && (t = ++g) : !m && (l = 15);
          break;
        case 6:
          '"' !== n && "'" !== n || G || u ? " " !== n && (t = g) && (l = 7) : (u = n) && (t = g + 1) && (l = 7);
          break;
        case 7:
          n === u ? !G && !gb && (gb = a.substring(t, g)) : "]" === n ? (gb || (gb = a.substring(t, g))) && (l = 14) && ++g : " " === n && !u && !gb && (gb = a.substring(t, g));
          break;
        case 8:
          -1 !== "+-0123456789".indexOf(n) ? (t = g) && (l = 9) : "n" === n ? (l = 10, x = 1, t = g + 1) : "even" === a.substr(g, 4) ? (x = 2, p = 0, g += 3) : "odd" === a.substr(g, 3) ? (x = 2, p = 1, g += 2) : ")" === n && (l = x ? 14 : 15) && ++g;
          break;
        case 9:
          q = a.substring(t, g);
          "n" === n ? (l = 10, t = g + 1) && (x = "+" === q ? 1 : "-" === q ? -1 : parseFloat(q)) : ")" === n && (l = 14) && ++g && (p = parseFloat(q)) && (x = 0);
          break;
        case 10:
          ")" === n && (l = 14) && ++g && (p = parseFloat(a.substring(t, g)) || 0);
          break;
        case 11:
          !('"' !== n && "'" !== n || G || u) && (u = n) && (t = g + 1) && (l = 12);
          break;
        case 12:
          n === u && !G && (gb = a.substring(t, g)) && (l = 13);
          break;
        case 13:
          ")" === n && (l = 14) && ++g;
      }
      if (15 === l) {
        return g;
      }
      if (14 === l) {
        if (4 === f) {
          if ("not" === r) {
            if (B) {
              return g;
            }
            var B = !0;
            l = f = 0;
            r = null;
          } else {
            if ("lang" === r || "contains" === r) {
              e = [B ? 0 : k, f, r, gb];
            } else {
              if (x !== x || p !== p) {
                return g;
              }
              e = [B ? 0 : k, c[r] || f, r, x, p];
            }
            break;
          }
        } else {
          e = 5 === k ? 5 : 5 === f ? [B ? 0 : k, f, J, v, gb] : [B ? 0 : k, f, r.split("\\").join("")];
          break;
        }
      }
      var G = "\\" === n && !G;
    }
    return B && -1 === (q = a.substr(g).indexOf(")")) ? g : B ? [g + q + 1, [k, 6, e]] : [g, e];
  }
  function Eg(a) {
    var b = Ya, c = this.constructor === Ma && this.length ? this : [this.constructor === P || this.instanceOf && this.instanceOf(P) ? this : ha], d = c, e = Array.prototype.push, g = [], h = !!zi(L), l = 1 < c.length, k = !0, f, m, q;
    if (wa < ec) {
      alert("not ready! use X.ViewPort.listenOnce( X_EVENT_XDOM_READY, callback )");
    } else {
      if (!H(a)) {
        return g;
      }
      for (f = []; a.length;) {
        if (!u) {
          var u = Dg(a);
          if (R(u)) {
            return [];
          }
          a = a.substr(u[0]);
          u = u[1];
          if (5 === u) {
            l = !0;
            d = c;
            f && f.length && e.apply(g, f);
            u = null;
            f = [];
            k = !0;
            continue;
          }
        }
        var t = u[0];
        var r = u[1];
        var J = u[2];
        var n = 1 === r ? h ? J : J.toUpperCase() : "*";
        var p = "*" === n;
        if (!k) {
          if (f.length) {
            0 !== t && (d = f, f = []);
          } else {
            u = null;
            continue;
          }
        }
        var x = 0;
        var v = d.length;
        var w = -1;
        l = l || 1 < v;
        switch(t) {
          case 2:
            for (; x < v; ++x) {
              if (t = d[x], (m = t._xnodes) && (q = m.length)) {
                for (k = 0; k < q; ++k) {
                  t = m[k], t._tag && (p || n === t._tag) && (f[++w] = t);
                }
              }
            }
            break;
          case 3:
            for (; x < v; ++x) {
              if (t = d[x], k = t.getOrder() + 1, (t = t.parent) && (m = t._xnodes) && (q = m.length)) {
                for (; k < q; ++k) {
                  if (t = m[k], t._tag) {
                    if (p || n === t._tag) {
                      f[++w] = t;
                    }
                    break;
                  }
                }
              }
            }
            break;
          case 4:
            for (k = {}; x < v; ++x) {
              for (t = d[x].next(); t; t = t.next()) {
                if (t._tag && (p || n === t._tag)) {
                  var C = t._uid;
                  if (k[C]) {
                    break;
                  } else {
                    k[C] = !0, f[++w] = t;
                  }
                }
              }
            }
            break;
          default:
            if (1 === t || k && 7 > r) {
              if (k) {
                if ("HTML" === n) {
                  f[0] = Ya;
                  break;
                }
                if ("HEAD" === n) {
                  f[0] = jd;
                  break;
                }
                if ("BODY" === n) {
                  f[0] = ha;
                  break;
                }
              }
              k = {};
              Fg(f, d, p ? "" : n, k);
            }
        }
        k = !1;
        switch(r) {
          case 2:
            var B = ["id", 1, J];
            break;
          case 3:
            B = ["class", 3, J];
            break;
          case 4:
            if (!(B = Gg[J])) {
              return [];
            }
            break;
          case 5:
            B = [J, u[3], u[4]];
            break;
          case 6:
            var G = !0;
            u = u[2];
            J = u[2];
            switch(u[1]) {
              case 1:
                B = ["tag", 1, h ? J : J.toUpperCase()];
                break;
              case 2:
                B = ["id", 1, J];
                break;
              case 3:
                B = ["class", 3, J];
                break;
              case 4:
                if (!(B = Gg[J])) {
                  return [];
                }
                break;
              case 5:
                B = [J, u[3], u[4]];
            }break;
          case 7:
            f = c;
            break;
          case 8:
            var E = !0;
            f = [b];
            break;
          case 9:
            if (w = document.links) {
              for (f = [], x = w.length; x;) {
                f[--x] = P(w[x]);
              }
            }
        }
        if (B && f.length) {
          if (B.l) {
            f = B.l({not:G, xml:h}, f, u[3], u[4]);
          } else {
            if (V(B)) {
              for (u = [], x = 0, w = -1; t = f[x]; ++x) {
                !!B(t) ^ G && (u[++w] = t);
              }
            } else {
              if (u = [], p = B[0], r = B[1], B = B[2], p = de[p] || p, h || "class" !== p || 3 !== r) {
                for ((J = !!B && !h && -1 === "title id name class for action archive background cite classid codebase data href longdesc profile src usemap".indexOf(p)) && (B = B.toLowerCase()), 3 === r && (B = " " + B + " "), x = 0, w = -1, v = f.length; x < v; ++x) {
                  t = f[x];
                  n = "tag" === p ? t._tag : "id" === p ? t._id : "class" === p ? t._className : t._attrs && t._attrs[p];
                  if ((C = !!n) && r) {
                    switch(J && (n = n.toLowerCase()), r) {
                      case 1:
                        C = n === B;
                        break;
                      case 2:
                        C = n !== B;
                        break;
                      case 3:
                        C = -1 !== (" " + n + " ").indexOf(B);
                        break;
                      case 4:
                        C = 0 === n.indexOf(B);
                        break;
                      case 5:
                        C = n.lastIndexOf(B) + B.length === n.length;
                        break;
                      case 6:
                        C = -1 !== n.indexOf(B);
                        break;
                      case 7:
                        C = n === B || n.substring(0, B.length + 1) === B + "-";
                    }
                  }
                  !!C ^ G && (u[++w] = t);
                }
              } else {
                for (B = " " + B + " ", x = 0, w = -1; t = f[x]; ++x) {
                  v = t._className, !!(v && -1 < (" " + v + " ").indexOf(B)) ^ G && (u[++w] = t);
                }
              }
            }
            f = u;
          }
        }
        B = null;
        G = !1;
        u = null;
      }
      if (l) {
        f && f.length && e.apply(g, f);
        v = g.length;
        if (2 > v) {
          return g[0] || ge;
        }
        f = [];
        k = {};
        x = 0;
        for (w = -1; x < v; ++x) {
          t = g[x], k[C = t._uid] || (k[C] = !0, f[++w] = t);
        }
        f = Hg([], f, E ? [b] : b._xnodes);
      }
      return 1 === f.length ? f[0] : new Ma(f);
    }
  }
  function Hg(a, b, c) {
    for (var d = c.length, e = 0, g, h, l; e < d; ++e) {
      if (h = c[e], h._tag) {
        g = b.indexOf(h);
        if (-1 !== g) {
          a[a.length] = h;
          if (2 === b.length) {
            return a[a.length] = b[0 === g ? 1 : 0], a;
          }
          b.splice(g, 1);
        }
        if ((l = h._xnodes) && Hg(a, b, l)) {
          return a;
        }
      }
    }
  }
  function Fg(a, b, c, d) {
    for (var e = b.length, g = 0, h, l, f, F; g < e; ++g) {
      h = b[g], l = h._uid, f = h._tag, !d[l] && f && (d[l] = !0, c && c !== f || (a[a.length] = h), (F = h._xnodes) && (1 < F.length || F[0] && F[0]._tag) && Fg(a, F, c, d));
    }
  }
  function yc(a, b, c, d) {
    var e = [];
    c = c.not;
    for (var g = 0, h = -1, l, f, F, m; l = d[g]; ++g) {
      F = b || l._tag;
      m = null;
      if (0 >= a) {
        for (f = l.prev(); f; f = f.prev()) {
          if (f._tag && (b || F === f._tag)) {
            m = !1;
            break;
          }
        }
      }
      if (null === m && 0 <= a) {
        for (f = l.next(); f; f = f.next()) {
          if (f._tag && (b || F === f._tag)) {
            m = !1;
            break;
          }
        }
      }
      null === m && (m = !0);
      m ^ c && (e[++h] = l);
    }
    return e;
  }
  function he(a, b, c, d, e, g, h) {
    var l = [], f = {};
    d = d.not;
    for (var F = 0, m = -1, n, u, t, q, r; t = e[F]; ++F) {
      n = t._uid;
      u = f[n];
      if (void 0 === u) {
        u = 0;
        q = t.parent[a]();
        for (r = c || t._tag; q; q = q[b]()) {
          q._tag && (c || r === q._tag) && (++u, f[q._uid] = 0 === g ? u === h : 0 === (u - h) % g && 0 <= (u - h) / g);
        }
        u = f[n];
      }
      u ^ d && (l[++m] = t);
    }
    return l;
  }
  function hf(a, b, c, d) {
    var e = [];
    b = b ? c.not : !c.not;
    c = 0;
    for (var g = -1, h; h = d[c]; ++c) {
      h._attrs && h._attrs[a] ^ b && (e[++g] = h);
    }
    return e;
  }
  function ie(a, b, c) {
    for (var d = Ai, e = c && Q(), g = c ? c[1] : [], h = a, l, f, F; a;) {
      l = !0;
      if ((f = g[g.length - 1]) && 1 === d[b.ea ? f.toUpperCase() : f]) {
        0 <= (F = a.toUpperCase().indexOf("</" + (b.ea ? f.toUpperCase() : f))) ? (b.Ha(a.substring(0, F)), (F = Ig(g, b, a)) ? a = a.substring(F) : (b.Ha(a), a = "")) : (b.Ha(a), a = "");
      } else {
        if (0 === a.indexOf("\x3c!--")) {
          0 < (F = a.indexOf("--\x3e")) && (b.tc(a.substring(4, F)), a = a.substring(F + 3), l = !1);
        } else {
          if (0 === a.indexOf("</")) {
            2 < (F = Ig(g, b, a)) && (a = a.substring(F), l = !1);
          } else {
            if (0 === a.indexOf("<")) {
              var m, q = m = void 0, u = void 0, t = void 0;
              F = void 0;
              for (var n = g, r = b, p = a, v = je, x = je, w = Bi, E = Ci, C = 0, B = p.length, G = 0, z = [], A = !1; G < B && 9 > C;) {
                var y = p.charAt(G);
                switch(C) {
                  case 0:
                    "<" === y && ++C;
                    break;
                  case 1:
                    v[y] & 3 && ++C && (t = G);
                    break;
                  case 2:
                    x[y] & 16 ? ++C && (F = p.substring(t, G)) : (">" === y || (A = "/>" === p.substr(G, 2))) && (F = p.substring(t, G)) && (C = 9);
                    break;
                  case 3:
                    v[y] & 3 ? ++C && (t = G) : (">" === y || (A = "/>" === p.substr(G, 2))) && (C = 9);
                    break;
                  case 4:
                    "=" === y ? (C = 6, u = p.substring(t, G)) : x[y] & 16 ? (C = 5, u = p.substring(t, G)) : (">" === y || (A = "/>" === p.substr(G, 2))) && (C = 9, z[z.length] = p.substring(t, G));
                    break;
                  case 5:
                    !(x[y] & 16) && v[y] & 3 ? (C = 3, z[z.length] = u) && (t = G) : "=" === y ? C = 6 : (">" === y || (A = "/>" === p.substr(G, 2))) && (C = 9, z[z.length] = u);
                    break;
                  case 6:
                    '"' === y || "'" === y ? (C = 7, q = y) && (t = G + 1) : !(x[y] & 16) && (C = 8, t = G);
                    break;
                  case 7:
                    !m && y === q && (C = 3) && w(z, u, p.substring(t, G));
                    break;
                  case 8:
                    x[y] & 16 ? (C = 3, w(z, u, p.substring(t, G))) : ">" === y ? (C = 9, w(z, u, p.substring(t, G))) : !m && !E[u] && (A = "/>" === p.substr(G, 2)) && (C = 9, w(z, u, p.substring(t, G)));
                }
                m = "\\" === y && !m;
                ++G;
              }
              if (9 === C) {
                A && ++G;
                m = F.toUpperCase();
                if (!jf && 1 === Di[m]) {
                  for (; f && 1 === Ei[r.ea ? f.toUpperCase() : f];) {
                    ke(n, r, f), f = n[n.length - 1];
                  }
                }
                f && 1 === Fi[m] && (f === F || Jg[m] && 1 === Jg[m][r.ea ? f.toUpperCase() : f]) && ke(n, r, f);
                A = A || kf[m];
                !A && (n[n.length] = r.ea ? F : m);
                F = !1 === r.ic(r.ea ? F : m, z, A, G) ? !1 : G;
              } else {
                F = 0;
              }
              if (F) {
                a = a.substring(F), l = !1;
              } else {
                if (!1 === F) {
                  return;
                }
              }
            }
          }
        }
        l && (F = a.indexOf("<"), l = 0 > F ? a : a.substring(0, F), a = 0 > F ? "" : a.substring(F), b.Ha(l));
      }
      if (a === h) {
        b.err(a);
        return;
      }
      if (c && e + Ua <= Q() && a) {
        b.fc(1 - a.length / c[0]);
        ka(0, ie, [a, b, c]);
        return;
      }
      h = a;
    }
    ke(g, b);
    c && b.gd();
  }
  function Ig(a, b, c) {
    for (var d = je, e = je, g = 0, h = c.length, f = 0, k, m, n; f < h && 9 > g;) {
      m = c.charAt(f);
      switch(g) {
        case 0:
          "</" === c.substr(f, 2) && ++g && ++f;
          break;
        case 1:
          d[m] & 3 && ++g && (n = f);
          break;
        case 2:
          e[m] & 16 && ++g;
          ">" === m && (g = 9);
          2 !== g && (k = c.substring(n, f));
          break;
        case 3:
          ">" === m && (g = 9);
      }
      ++f;
    }
    return 9 === g ? (ke(a, b, b.ea ? k : k.toUpperCase()), f) : 0;
  }
  function Bi(a, b, c) {
    b = b.toLowerCase();
    c = 1 === ce[b] ? b : c;
    a[a.length] = {Jd:b, Nd:-1 !== c.indexOf('"') ? c.split('"').join('\\"').split('\\\\"').join('\\"') : c};
  }
  function ke(a, b, c) {
    var d = 0, e = a.length;
    if (c) {
      for (d = e; 0 <= d && a[--d] !== c;) {
      }
    }
    if (0 <= d) {
      for (; d < e;) {
        b.hc(a[--e]);
      }
      a.length = d;
    }
  }
  function vc(a, b) {
    var c = I;
    c.qa = [];
    c.Ba.length = 0;
    c.pd = b;
    ie(a, c);
    var d = c.qa;
    delete c.qa;
    return d;
  }
  function Kg(a, b) {
    var c = ua(ma(), Gi), d = I;
    c.listenOnce(11, c, c.kill);
    d.qa = [];
    d.Ba.length = 0;
    d.pd = b;
    ie(a, c, [a.length, []]);
    return c;
  }
  function T(a, b, c) {
    return a || 0 === a ? a : b || 0 === b ? b : c || 0 === c ? c : NaN;
  }
  function Lg(a) {
    var b = a._anime, c = a._flags, d = kd;
    ib = !0;
    d.splice(d.indexOf(a), 1);
    b.m = 0;
    c & ~xb && (d = c & ld, c & Ub || zc(a, b, 0.5, !1), d || (a._rawObject.style.cssText = Tb(a)), a._flags &= xb);
  }
  function Mg(a, b, c) {
    for (var d = kd, e = 0, g, h; (g = d[e]) && g !== a; ++e) {
      if (3 >= g._anime.m && (a.contains(g) || g.contains(a))) {
        return 2;
      }
    }
    for (e = 0; (g = d[e]) && g !== a; ++e) {
      if (h = g._anime, 6 <= h.m && (a.contains(g) || g.contains(a))) {
        return c ? 3 : g;
      }
    }
    return b ? 6 : 4;
  }
  function Vb(a) {
    var b = kd, c = Q(), d = !1, e, g;
    if (ib) {
      for (ib = !1, b.sort(Hi), e = 0; g = b[e]; ++e) {
        var h = g._anime;
        3 >= h.m ? R(h.m = g = Mg(g, h.duration)) || (g._anime.Wb = !0, h.m = 3) : h.Wb = !1;
      }
    }
    for (e = b.length; e;) {
      var f = !1;
      g = b[--e];
      h = g._anime;
      switch(h.m) {
        case 7:
          if (c < h.Gc) {
            h.fc = d = (c - h.Od) / h.duration;
            var k = h.Md(d);
            h.x = (h.zb - h.$b) * k + h.$b;
            h.y = (h.Ab - h.ac) * k + h.ac;
            h.rotate = (h.ub - h.Xb) * k + h.Xb;
            h.skewX = (h.xb - h.Yb) * k + h.Yb;
            h.skewY = (h.yb - h.Zb) * k + h.Zb;
            h.Na = (h.eb - h.ob) * k + h.ob;
            h.Oa = (h.fb - h.pb) * k + h.pb;
            h.alpha = (h.Fc - h.md) * k + h.md;
            h.scrollX = (h.vb - h.qb) * k + h.qb;
            h.scrollY = (h.wb - h.rb) * k + h.rb;
            zc(g, h, d, !0);
            d = !0;
            break;
          }
          g.asyncDispatch(38);
        case 4:
          k = !h.Wb && !h.gc && h.qd;
          zc(g, h, 1, !!k);
          k ? (console.log("\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u7d42\u4e86(" + h.m + ") -> GPU \u89e3\u9664\u5f85\u6a5f " + k), h.Gc = c + k, h.m = 5, d = !0) : (console.log("\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u7d42\u4e86(" + h.m + ") -> "), f = !0);
          break;
        case 6:
          h.Od = c;
          h.Gc = c + h.duration;
          h.m = 7;
          h.fc = 0;
          g.asyncDispatch(36);
          d = !0;
          h.wc && !md || zc(g, h, 0, !0);
          break;
        case 5:
          h.Gc <= c || h.Wb || h.gc ? (md && zc(g, h, 1, !1), f = !0) : d = !0;
          break;
        default:
          h.wc || zc(g, h, 0, !1), h.wc = !0;
      }
      h.gc = !1;
      f && (md && g.asyncDispatch(41), h.Wb && (ib = d = !0), b.splice(e, 1), h.m = 0);
    }
    (lf = d) ? W ? (a && a.type === jb ? kb && dd(kb) : Fa.listen(jb, Vb), kb = 0) : (Fa.unlisten(jb, Vb), kb = le(Vb)) : (Fa.unlisten(jb, Vb), kb = 0);
  }
  function Hi(a, b) {
    var c = 4 <= a._anime.m, d = 4 <= b._anime.m;
    return c && d && !c && !d ? a._anime.uid - b._anime.uid : c ? -1 : 1;
  }
  function zc(a, b, c, d) {
    var e = "";
    if (1 === c) {
      var g = b.x = b.zb;
      var h = b.y = b.Ab;
      var l = eb(b.rotate = b.ub);
      var k = eb(b.skewX = b.xb);
      var m = eb(b.skewY = b.yb);
      var n = b.Na = b.eb;
      var q = b.Oa = b.fb;
      var u = b.alpha = b.Fc;
      b.scrollX = b.vb;
      b.scrollY = b.wb;
    } else {
      g = b.x, h = b.y, l = eb(b.rotate), k = eb(b.skewX), m = eb(b.skewY), n = b.Na, q = b.Oa, u = b.alpha;
    }
    if (b.transform) {
      g !== g && h !== h || 0 === g && 0 === h || (e = f.Safari && f.Windows ? " -webkit-translate(" + (g | 0) + "px," + (h | 0) + "px)" : " translate(" + (g | 0) + "px," + (h | 0) + "px)");
      if (0 > l || 0 < l) {
        e += " rotate(" + l + "deg)";
      }
      if (0 > k || 0 < k) {
        e += " skewX(" + k + "deg)";
      }
      if (0 > m || 0 < m) {
        e += " skewY(" + m + "deg)";
      }
      if (1 > n || 1 < n) {
        e += " scaleX(" + n + ")";
      }
      if (1 > q || 1 < q) {
        e += " scaleY(" + q + ")";
      }
      a.css("transform", (e ? e.substr(1) : "") + (d ? md : ""));
      console.log(a.className() + " " + e + " " + (a._flags & lb));
      md && (d ? a._flags & Ub ? (a._flags &= xb, a._flags |= yb) : a._flags & yb || (a._flags &= xb, a._flags |= ld) : a._flags & yb ? (a._flags &= xb, a._flags |= Ub) : a._flags & ld && (a._flags &= xb));
    } else {
      if (32 === b.Ja) {
        a.css("dxtransform", [g | 0, h | 0, l || 0, k || 0, m || 0, n, q, b.ed, b.fd]);
      } else {
        switch(g === g && a.css(b.ed, (g | 0) + "px"), h === h && a.css(b.fd, (h | 0) + "px"), b.Ja) {
          case 4:
            a.css("zoom", n);
            break;
          case 2:
            a.css("fontSize", n + "em");
        }
      }
    }
    b.doScroll && a._rawObject && (console.log("ok " + c), a._rawObject.scrollLeft = b.scrollX | 0, a._rawObject.scrollTop = b.scrollY | 0);
    u === u && a.css("opacity", u);
  }
  function sc(a) {
    return "" === a ? tc : a ? a === window ? Ng : a === document ? Og : a.constructor === P ? Wb : a.constructor === Ma ? mf : me(a) ? Bc : 3 === a.nodeType ? nd : H(a) ? "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) ? uc : tc : a.instanceOf && a.instanceOf(P) ? Wb : 0 : 0;
  }
  function oa(a) {
    var b, c;
    switch(sc(a)) {
      case Wb:
      case mf:
        return a;
      case Bc:
        return E.o ? (a = a.getAttribute("UID")) && mb[a] : a.UID && mb[a.UID];
      case Ng:
        return p;
      case Og:
        return L;
      case nd:
        if (a.UID) {
          return mb[a.UID];
        }
        var d = mb;
        for (b = d.length; b;) {
          if ((c = d[--b]) && c._rawObject === a) {
            return c;
          }
        }
    }
  }
  function ne(a, b) {
    for (var c = a.length, d; c;) {
      d = a[--c], b ? d._flags = d._flags | A | 4096 : d._flags = d._flags & ~A & ~Cc, d._xnodes && ne(d._xnodes, b);
    }
  }
  function nf(a) {
    var b, c;
    if (this._tag) {
      if (1 < (c = arguments.length)) {
        for (b = 0; b < c; ++b) {
          this.append(arguments[b]);
        }
        return this;
      }
      (b = this._xnodes) || (this._xnodes = b = []);
      switch(sc(a)) {
        case Bc:
        case nd:
          a = P(a);
          break;
        case uc:
        case tc:
          return nf.apply(this, vc(a, !0));
        case Wb:
          if (a.parent === this && b[b.length - 1] === a) {
            return this;
          }
          a.remove();
          5 > f.IE && !a._tag && 0 === (this._flags & Xb) && (this._flags |= Yb);
          break;
        default:
          return this;
      }
      a.parent = this;
      b[b.length] = a;
      this._flags & A && (a._flags |= A, a._xnodes && ne(a._xnodes, !0), la());
      this._flags & Ea && (a._flags |= Ea);
      this._flags & vb && (a._flags |= vb);
      return this;
    }
  }
  function Pg(a) {
    var b = this.parent;
    if (a === v) {
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
  function la() {
    W || (W = le(S));
  }
  function S(a) {
    var b, c;
    if (W && !(wa < Dc)) {
      dd(W);
      W = 0;
      a && Fa._listeners && Fa._listeners[of] && Fa.dispatch(of);
      var d = Za;
      if (b = d.length) {
        for (; b;) {
          var e = d[--b];
          e.instanceOf ? zb(e) : E.o ? (e.removeAttribute("id"), e.outerHTML = "") : f.MacIE ? e.parentNode && e.parentNode.tagName && m.Ta(e) : e.parentNode && e.parentNode.tagName && e.parentNode.removeChild(e);
        }
        d.length = 0;
      }
      if (5 <= f.IE && 5.5 > f.IE) {
        var g = fd();
        y.style.visibility = "hidden";
      }
      Ya._flags & Ab ? od(Ya, Ya._rawObject.parentNode, null, Ya._flags, 1, d = []) : (od(jd, jd._rawObject.parentNode, null, jd._flags, 1, []), od(ha, ha._rawObject.parentNode, null, ha._flags, 1, d = []));
      5 <= f.IE && 5.5 > f.IE && (y.style.visibility = "", g && g.parentNode && af(g));
      Qg && (la(), Qg = !1);
      if (fe && d.length) {
        for (b = 0; c = d[b]; ++b) {
          c._flags &= ~fe;
          var h;
          g = void 0;
          e = wc;
          var l = c._css;
          c = c._rawObject;
          var k = c.style.filter || "", F = k;
          for (g in l) {
            if (h = e[g]) {
              switch(h) {
                case 7:
                  h = c;
                  var n = l[g], q = Math.PI / 180, u = eb(n[2]) * q, t = Math.cos(u);
                  u = Math.sin(u);
                  var r = Math.tan(eb(n[3]) * q);
                  q = Math.tan(eb(n[4]) * q);
                  var v = n[5], w = n[6], z = h.offsetWidth, x = h.offsetHeight, A = Math.abs(t), H = Math.abs(u), C = (x - (z * H + x * A)) / 2 - x / 2 * q - ((x * w - x) / 2 | 0) + n[1];
                  h.style[n[7]] = (z - (z * A + x * H)) / 2 - z / 2 * r - ((z * v - z) / 2 | 0) + n[0] + "px";
                  h.style[n[8]] = C + "px";
                  h = "progid:DXImageTransform.Microsoft.Matrix(M11=" + t * v + ",M12=" + (-u + r) * v + ",M21=" + (u + q) * w + ",M22=" + t * w + ',FilterType="bilinear",sizingMethod="auto expand")';
                  break;
                default:
                  continue;
              }
              h && (k += (k ? " " : "") + h);
            }
          }
          k !== F && (c.style.filter = k);
        }
      }
      Fa._listeners && Fa._listeners[jb] && Fa[a ? "dispatch" : "asyncDispatch"](jb);
      p._listeners && p._listeners[hb] && p.asyncDispatch(hb);
    }
  }
  function Rg(a, b) {
    var c = a.childNodes, d, e;
    if (c && c.length) {
      for (d = 0; e = c[d]; ++d) {
        switch(e.nodeType) {
          case 1:
            Rg(e, b);
            break;
          case 3:
            b[b.length] = e;
        }
      }
    }
  }
  function Sg(a) {
    var b = a.jc, c = oe, d = pd, e, g, h;
    if (b._flags & A) {
      switch(W && S(), b = b._rawObject, a.by) {
        case "selection":
          if (Zb) {
            if (d.getRangeAt) {
              return d.rangeCount && d.getRangeAt(0);
            }
            c.setStart(d.anchorNode, d.anchorOffset);
            c.setEnd(d.focusNode, d.focusOffset);
            return c;
          }
          switch(document.selection.type) {
            case "text":
              return d();
          }break;
        case "point":
          if (Zb) {
            Rg(b, d = []);
            b = a.v1;
            var l = a.v2;
            for (a = e = 0; g = d[a]; ++a) {
              c.selectNodeContents(g);
              var k = g.data.length;
              for (h = 0; h < k; ++h) {
                if (f.IE || f.Edge) {
                  c.setEnd(g, h);
                  c.setStart(g, h);
                  var m = c.getBoundingClientRect();
                  var n = m.top;
                  var q = m.bottom;
                  var u = m.left;
                  c.setEnd(g, h + 1);
                  m = c.getBoundingClientRect();
                  if (m.left < u) {
                    if (u <= b && b <= m.right && n <= l && l <= q) {
                      return {hitRange:c, rect:m, offset:e, text:g};
                    }
                    continue;
                  }
                } else {
                  c.setEnd(g, h + 1), c.setStart(g, h), m = c.getBoundingClientRect();
                }
                if (m.left <= b && b <= m.right && m.top <= l && l <= m.bottom) {
                  return {hitRange:c, rect:m, offset:e, text:g};
                }
              }
              e += k;
            }
            c = null;
          } else {
            if (c.moveToPoint(b = a.v1, l = a.v2), c.expand("character")) {
              if (u = c.boundingLeft, n = c.boundingTop, b < u || u + c.boundingWidth < b || l < n || n + c.boundingHeight < l) {
                if (c.moveStart("character", -1), c.moveEnd("character", -1), u = c.boundingLeft, n = c.boundingTop, b < u || u + c.boundingWidth < b || l < n || n + c.boundingHeight < l) {
                  c = null;
                }
              }
            } else {
              c = null;
            }
          }
          return c;
        case "char":
          if (Zb) {
            return c.setEnd(b, k < a.v2 ? k : a.v2), c.setStart(b, a.v1), {hitRange:c};
          }
          c.moveToElementText(b);
          c.moveEnd("character", k < a.v2 ? k : a.v2);
          c.moveStart("character", a.v1);
          return c;
      }
    }
  }
  function Tg(a, b) {
    var c = a._xnodes, d;
    if (c && c.length) {
      for (d = -1; a = c[++d];) {
        a._tag ? Tg(a, b) : b[b.length] = a;
      }
    }
  }
  function Ii(a) {
    for (var b = aa(arguments), c = pf.length; c;) {
      if (pf[--c]._id === a) {
        return b.shift(), pf[c].dispatch({type:"message", data:b});
      }
    }
  }
  function Ji(a) {
    switch(a.type) {
      case "load":
        console.log("swf loaded.");
    }
  }
  function pe(a) {
    var b = this._rawObject;
    switch(a.type) {
      case hb:
        if (this.la = b.contentWindow || b.contentDocument && b.contentDocument.parentWindow || window.frames[this.xa], f.IE && (this.la.name = this.xa), this.listen(9 > f.IE ? "readystatechange" : ["load", "error"], pe), !(9 > f.IE)) {
          qf(this);
          return;
        }
      case "readystatechange":
        if ("complete" !== b.readyState && "loaded" !== b.readyState) {
          break;
        }
        if (!this.Nb) {
          qf(this);
          break;
        }
      case "load":
        this.asyncDispatch("ninjaload");
        break;
      case "error":
        this.asyncDispatch("ninjaerror");
        break;
      case U:
        p.unlisten(hb, this, pe), this.la && this.la.close();
    }
    return 2;
  }
  function qf(a) {
    var b = a._rawObject.contentDocument || a.la.document, c = a.Ra;
    a.Nb = !0;
    delete a.Ra;
    b.open();
    b.writeln(c);
    b.close();
  }
  function rf(a) {
    var b = "", c;
    for (c in a) {
      b && (b += ",");
      var d = (d = a[c]) || 0 === d ? d : null;
      b += '"' + c + '":' + (Z(d) ? rf(d) : H(d) ? '"' + d + '"' : d);
    }
    return "{" + b + "}";
  }
  function qe(a) {
    return a ? window.JSON ? JSON.parse(a) : eval("(" + a + ")") : a;
  }
  function Ug(a) {
    var b;
    if (H(a)) {
      if (b = sf[Ob(a)]) {
        return b;
      }
      var c = nb.create("img", {src:a}, {position:"absolute"});
      S();
      a = E.o ? ca(c) : c._rawObject;
      var d = !0;
    } else {
      if (a.constructor === P) {
        c = a, a = E.o ? ca(c)._rawObject : c._rawObject;
      } else {
        if (!me(a)) {
          if (a.constructor === ma && dg(a._rawObject)) {
            c = a, a = c._rawObject;
          } else {
            return;
          }
        }
      }
      if (b = sf[a.src]) {
        return b;
      }
    }
    if (a.naturalWidth) {
      return [a.naturalWidth, a.naturalHeight];
    }
    if (5 <= f.IE) {
      b = a.runtimeStyle;
      var e = b.width;
      var g = b.height;
      b.width = "auto";
      b.height = "auto";
      var h = a.width;
      var l = a.height;
      b.width = e;
      b.height = g;
    } else {
      e = h = a.width, g = l = a.height, a.removeAttribute && (a.removeAttribute("width"), a.removeAttribute("height"), h = a.width, l = a.height, a.width = e, a.height = g);
    }
    b = sf[a.src] = [h, l];
    d && c.kill();
    return b;
  }
  function Ga(a) {
    a && (this.Ua = a, this.tagName = a.tagName);
  }
  function Vg() {
    return 1 === this.length ? this.Ua && this.Ua.parentNode ? new Ga(this.Ua.parentNode) : null : 0 === this.length ? null : this[0].parentNode ? new Ga(this[0].parentNode) : null;
  }
  function Wg(a) {
    return !!this.find(a).length;
  }
  function Xg(a) {
    if (1 === this.length) {
      return this;
    }
    if (0 === this.length) {
      return null;
    }
    if (this.Xa && this.Xa[a]) {
      return this.Xa[a];
    }
    this.Xa || (this.Xa = []);
    return this[a] ? this.Xa[a] = new Ga(this[a]) : null;
  }
  function Yg(a, b) {
    switch(a) {
      case "number":
      case "int":
      case "boolean":
      case "string":
      case v:
        b = a, a = 0;
    }
    var c = a ? this.find(a) : this;
    c = 1 === c.length ? c.Ua : c[0];
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
        return !!Me(c);
    }
    return c || "";
  }
  function Zg(a) {
    var b = this.constructor === fb ? this : [this.Ua], c = b, d = Array.prototype.push, e = [], g = 1 < b.length, h = !0, f, k;
    if (!H(a)) {
      return re;
    }
    for (f = []; a.length;) {
      if (!m) {
        var m = Dg(a);
        if (R(m)) {
          return re;
        }
        a = a.substr(m[0]);
        m = m[1];
        if (5 === m) {
          g = !0;
          c = b;
          f && f.length && d.apply(e, f);
          m = null;
          f = [];
          h = !0;
          continue;
        }
      }
      var n = m[0];
      var q = m[1];
      var u = m[2];
      var t = 1 === q ? u : "*";
      var r = "*" === t;
      if (!h) {
        if (f.length) {
          0 !== n && (c = f, f = []);
        } else {
          m = null;
          continue;
        }
      }
      var p = 0;
      var v = c.length;
      var w = -1;
      g = g || 1 < v;
      switch(n) {
        case 2:
          for (; p < v; ++p) {
            for (k = c[p].firstChild; k; k = k.nextSibling) {
              1 !== k.nodeType || !r && t !== k.tagName || (f[++w] = k);
            }
          }
          break;
        case 3:
          for (; p < v; ++p) {
            for (k = c[p].nextSibling; k; k = k.nextSibling) {
              if (1 === k.nodeType) {
                if (r || t === k.tagName) {
                  f[++w] = k;
                }
                break;
              }
            }
          }
          break;
        case 4:
          for (h = []; p < v; ++p) {
            for (k = c[p].nextSibling; k; k = k.nextSibling) {
              if (1 === k.nodeType && (r || t === k.tagName)) {
                if (-1 !== h.indexOf(k)) {
                  break;
                } else {
                  h[h.length] = k, f[++w] = k;
                }
              }
            }
          }
          break;
        case 6:
          for (q = 0; p < v; ++p) {
            if (k = c[p].getAttributeNode(u)) {
              f[++w] = k;
            }
          }
          break;
        default:
          if (1 === n || h && 7 > q) {
            for (; p < v; ++p) {
              k = c[p], k.childNodes && k.childNodes.length && $g(f, k, r ? null : t);
            }
          }
      }
      h = !1;
      switch(q) {
        case 2:
          var x = ["id", 1, u];
          break;
        case 3:
          x = ["class", 3, u];
          break;
        case 4:
          if (!(x = ah[u])) {
            return re;
          }
          break;
        case 5:
          x = [u, m[3], m[4]];
          break;
        case 6:
          var y = !0;
          m = m[2];
          u = m[2];
          switch(m[1]) {
            case 1:
              x = ["tag", 1, u];
              break;
            case 2:
              x = ["id", 1, u];
              break;
            case 3:
              x = ["class", 3, u];
              break;
            case 4:
              if (!(x = ah[u])) {
                return [];
              }
              break;
            case 5:
              x = [u, m[3], m[4]];
          }break;
        case 7:
          f = b;
      }
      if (x && f.length) {
        if (x.l) {
          f = x.l({not:y, xml:!0}, f, m[3], m[4]);
        } else {
          if (V(x)) {
            for (r = [], p = 0, w = -1; k = f[p]; ++p) {
              !!x(k) ^ y && (r[++w] = k);
            }
          } else {
            for (r = [], m = x[0], q = x[1], x = x[2], 3 === q && (x = " " + x + " "), p = 0, w = -1, v = f.length; p < v; ++p) {
              k = f[p];
              u = k.getAttribute(m, 2);
              if ((t = null != u) && q) {
                switch(q) {
                  case 1:
                    t = u === x;
                    break;
                  case 2:
                    t = u !== x;
                    break;
                  case 3:
                    t = -1 !== (" " + u + " ").indexOf(x);
                    break;
                  case 4:
                    t = 0 === u.indexOf(x);
                    break;
                  case 5:
                    t = u.lastIndexOf(x) + x.length === u.length;
                    break;
                  case 6:
                    t = -1 !== u.indexOf(x);
                    break;
                  case 7:
                    t = u === x || u.substring(0, x.length + 1) === x + "-";
                }
              }
              !!t ^ y && (r[++w] = k);
            }
          }
          f = r;
        }
      }
      x = null;
      y = !1;
      m = null;
    }
    if (g) {
      f && f.length && d.apply(e, f);
      v = e.length;
      if (0 === v) {
        return re;
      }
      if (1 === v) {
        return new Ga(e[0]);
      }
      f = [];
      p = 0;
      for (w = -1; p < v; ++p) {
        k = e[p], -1 === f.indexOf(k) && (f[++w] = k);
      }
      bh(e = [], f, this.Ua.childNodes);
      p = 0;
      for (v = f.length; p < v; ++p) {
        -1 === e.indexOf(k = f[p]) && (e[e.length] = k);
      }
      f = e;
    }
    return 1 === f.length ? new Ga(f[0]) : new fb(f);
  }
  function bh(a, b, c) {
    for (var d = c.length, e = 0, g, h, f; e < d; ++e) {
      h = c[e];
      if (-1 !== (g = b.indexOf(h))) {
        a[a.length] = h;
        b.splice(g, 1);
        if (1 === b.length) {
          return a[a.length] = b[0], b.length = 0, !0;
        }
        if (0 === b.length) {
          return !0;
        }
      }
      if ((f = h.childNodes) && bh(a, b, f)) {
        return !0;
      }
    }
  }
  function $g(a, b, c) {
    b = b.childNodes;
    for (var d = b.length, e = 0, g; e < d; ++e) {
      g = b[e], 1 === g.nodeType && (c && g.tagName !== c || (a[a.length] = g), g.childNodes && g.childNodes.length && $g(a, g, c));
    }
  }
  function Ec(a, b, c, d) {
    var e = [];
    c = c.not;
    for (var g = 0, h = -1, f, k, m, n; f = d[g]; ++g) {
      m = b || f.tagName;
      n = null;
      if (0 >= a) {
        for (k = f.previousSibling; k; k = k.previousSibling) {
          if (1 === k.nodeType && (b || m === k.tagName)) {
            n = !1;
            break;
          }
        }
      }
      if (null === n && 0 <= a) {
        for (k = f.nextSibling; k; k = k.nextSibling) {
          if (1 === k.nodeType && (b || m === k.tagName)) {
            n = !1;
            break;
          }
        }
      }
      null === n && (n = !0);
      n ^ c && (e[++h] = f);
    }
    return e;
  }
  function se(a, b, c, d, e, g, h) {
    var f = aa(e), k = [], m = {};
    d = d.not;
    for (var n = 0, q = -1, u, t, p, r, w; t = e[n]; ++n) {
      u = m[n];
      if (u === v) {
        u = 0;
        p = t.parentNode[a];
        for (r = c || t.tagName; p; p = p[b]) {
          1 !== p.nodeType || !c && r !== p.tagName || (++u, w = f.indexOf(p), -1 === w && (f[w = f.length] = p), m[w] = 0 === g ? u === h : 0 === (u - h) % g && 0 <= (u - h) / g);
        }
        u = m[n];
      }
      u ^ d && (k[++q] = t);
    }
    return k;
  }
  function fb(a) {
    for (var b = 0, c = a ? a.length : 0; b < c; ++b) {
      this[b] = a[b];
    }
    this.length = c;
  }
  function Ki() {
    var a = z(this);
    if (this.closed()) {
      return this.asyncDispatch(30), delete a.H, 1;
    }
  }
  function tf(a) {
    var b = z(this), c = b && b.page;
    switch(a.type) {
      case 30:
        this.kill();
        break;
      case U:
        c && !this.closed() && (9 < f.IEHost ? c.close() : c.open("about:blank", "_self").close(), Uc(this, c)), b.H && O(b.H), p.unlisten(30, this, tf);
    }
  }
  function qd(a) {
    var b;
    switch(a.type) {
      case U:
        if (this === sa && Fc) {
          1 === Fc && this.unlisten(9, qd).dispatch(9), rd(!0), Uc(this), Fc = 0;
        } else {
          if (this === sa) {
            Na.cancel();
            rd(!0);
            var c = !0;
          } else {
            -1 !== (a = ob.indexOf(this)) && (ob.splice(a, 1), c = !0);
          }
        }
        c && (this.dispatch(15), this.dispatch({type:9, lastEventType:15}), Uc(this));
        break;
      case 13:
        this.dispatch(a);
        break;
      case 12:
        401 === a.status && (b = z(this).auth) && z(b).Ud(b, a);
      case 11:
        Fc = 1;
        this.listenOnce(9, qd).asyncDispatch(32, {type:9, lastEventType:a.type});
        a.target = a.currentTarget = this;
        this.asyncDispatch(a);
        break;
      case 9:
        Fc = 2, this.kill();
    }
  }
  function rd(a) {
    var b;
    if (sa) {
      if (!a) {
        return;
      }
      Na.unlisten([13, 11, 12], sa, qd).reset();
      sa = Na = $b = null;
    }
    console.log("\u25a0\u25a0------------ X_NET_shiftQueue " + ob.length);
    if (ob.length) {
      sa = a = ob.shift();
      $b = z(sa);
      switch($b.Sd) {
        case Gc:
          switch($b.test) {
            case "gadget":
              Na = $a || m.Mc();
              break;
            case "flash":
              break;
            default:
              Na = q || m.Tc();
          }if (b = $b.auth) {
            var c = z(b);
            switch(b.state()) {
              case 0:
              case 1:
              case 2:
                b.dispatch(50) & 8 ? sa === a && a.kill() : sa === a && (c.xc = c.xc || [], -1 === c.xc.indexOf(a) && c.xc.push(a), sa = null, rd());
                return;
              case 3:
                ob.push(sa);
                sa = null;
                rd();
                return;
            }
            c.be(b, $b);
          }
          break;
        case uf:
          Na = na || m.Rc();
          break;
        case te:
          Na = xa || m.Kc();
          break;
        case ue:
          Na = ve || m.Oc();
      }
      Na.listen([13, 11, 12], sa, qd);
      Na.load($b);
    }
  }
  function Li(a) {
    var b = {}, c = 0, d;
    if (!a) {
      return b;
    }
    a = a.split("\r\n");
    for (d = a.length; c < d; ++c) {
      var e = a[c];
      var g = e.indexOf(": ");
      if (0 < g) {
        var h = e.substring(0, g);
        e = e.substring(g + 2);
        b[h] = e.split("\r\n").join("\n").split("\n");
      }
    }
    return b;
  }
  function ch(a) {
    switch(a.type) {
      case "ninjaload":
        if (++dh < Bb) {
          return;
        }
        Hc = na.asyncDispatch(1000, 12);
        break;
      case "ninjaerror":
        na.asyncDispatch(12);
    }
    return 1;
  }
  function eh(a) {
    switch(a.type) {
      case "ninjaload":
        if (fh) {
          return;
        }
        1 === ++gh && (hh ? (a = this._rawObject.contentDocument || this.la.document, xa.asyncDispatch({type:11, response:a && a.body ? a.body.innerHTML : ""})) : xa.asyncDispatch({type:11}));
        break;
      case "ninjaerror":
        xa.asyncDispatch(12);
    }
    return 1;
  }
  function Mi() {
    var a = this._rawObject;
    this.finish || (a && a.complete ? (this.finish = !0, a.width || (O(this.H), this.H = this.asyncDispatch(12))) : this.timeout < (this.Ec += this.uc) && (this.finish = !0, O(this.H), this.H = this.asyncDispatch({type:12, timeout:!0})));
  }
  function Ni(a) {
    var b = this._rawObject;
    if (this.Ya) {
      switch(a.type) {
        case "error":
          if (Oi && b.width) {
            break;
          }
          if (this.finish) {
            break;
          }
          this.finish = !0;
          this.H && O(this.H);
          this.H = this.asyncDispatch(this.timeout, 12);
          break;
        case "load":
          this.finish = !0, this.H && O(this.H), f.Prsto && !b.complete ? this.H = this.asyncDispatch(12) : (a = Ug(ih ? this : this.Ya), this.H = this.asyncDispatch({type:11, src:this.Ya, w:a[0], h:a[1]}));
      }
    }
  }
  function jh() {
    var a = $a._rawObject, b, c, d;
    if (a && (a = a.contentWindow || a.contentDocument && a.contentDocument.parentWindow || window.frames[vf]) && (b = a.frames) && (c = b.length)) {
      for (; c && !(d = Ta(Ba, [b[--c], "location>hash"]));) {
      }
      if (d && d !== wf) {
        wf = d;
        switch(xf) {
          case 0:
            a.location.href = ac + "#" + Cb.shift();
            if (Cb.length) {
              return;
            }
            break;
          case 1:
            a.location.href = ac + "#_waiting_";
            break;
          case 2:
            d = d.substr(1);
            b = parseFloat(d);
            if (sd) {
              if (td += yf(d), --sd) {
                a.location.href = ac + "#_recived_" + sd;
                return;
              }
            } else {
              if (1 < b) {
                return d = d.substr((b + ":").length), td = yf(d), sd = --b, a.location.href = ac + "#_recived_" + sd, fa(16, 0, jh), 1;
              }
              td = yf(d);
            }
            $a.asyncDispatch(qe(td));
            td = "";
            $a.C = !1;
            xf = 0;
            wf = "";
            a.location.href = ac + "#_recived_";
            return 1;
        }
        ++xf;
      }
    }
  }
  function yf(a) {
    return f.Gecko ? unescape(a) : decodeURIComponent(a);
  }
  function Pi(a) {
    var b = z(this);
    switch(a.type) {
      case U:
        this.cancelAuth();
      case 12:
      case 50:
        b.Ma && O(b.Ma);
        break;
      case 11:
        b.Ma && O(b.Ma), zf(this) && (b.Ma = ka(Af(this) - Q() - b.refreshMargin, this, this.refreshToken));
    }
  }
  function kh() {
    var a = z(this), b;
    if (pb.closed()) {
      var c = 0;
      this.asyncDispatch(15);
    } else {
      if (b = pb.find("location>search")) {
        a = z(this), a.code = ic(b.slice(1)).code, c = 2, lh(this, a), this.asyncDispatch({type:13, message:"Get code success, then authorization code."});
      }
    }
    if (0 <= c) {
      return a = a || z(this), a.J = c, pb.kill(), pb = null, Ic = O(Ic), 1;
    }
  }
  function lh(a, b) {
    b.La = r.Ac({xhr:b.tokenEndpoint, postdata:Ld({client_id:b.clientID, client_secret:b.clientSecret, grant_type:"authorization_code", code:b.code, redirect_uri:b.redirectURI}), dataType:"json", headers:{Accept:"application/json", "Content-Type":"application/x-www-form-urlencoded"}, test:"gadget"}).Rd([11, 12], a, mh);
  }
  function mh(a) {
    var b = a.response, c = z(this), d = 3 === c.J;
    delete c.La;
    switch(a.type) {
      case 11:
        if (d && b.error) {
          ya("-", this, "refreshToken");
          c.J = 0;
          this.asyncDispatch({type:12, message:"Refresh access token error."});
          this.asyncDispatch(50);
          break;
        } else {
          if (b.error) {
            c.J = 0;
            this.asyncDispatch({type:12, message:"Get new access token error."});
            this.asyncDispatch(50);
            break;
          }
        }
        ya("+", this, "accessToken", b.access_token || "");
        d && !b.refresh_token || ya("+", this, "refreshToken", b.refresh_token || "");
        b.expires_in ? (a = Q() + 1000 * b.expires_in, ya("+", this, "tokenExpiry", a)) : Af(this) && ya("-", this, "tokenExpiry");
        c.J = 4;
        this.asyncDispatch({type:11, message:d ? "Refresh access token success." : "Get new access token success."});
        break;
      case 12:
        d ? (c.J = 0, this.asyncDispatch({type:12, message:"Refresh access token error."}), ya("-", this, "refreshToken"), this.asyncDispatch(50)) : "param" === Bf(this) ? (c.J = 0, this.asyncDispatch({type:12, message:"network-error"})) : (c.J = 0, ya("+", this, "AuthMechanism", "param"), this.asyncDispatch({type:13, message:"Refresh access token failed. retry header -> param. "}), lh(this, c));
    }
  }
  function Qi(a, b) {
    var c = b.headers, d = !1;
    if ("param" !== Bf(a)) {
      var e = (d = !Na.te || !!c) && (c["WWW-Authenticate"] || c["www-authenticate"]);
      ra(e) && (e = e.join("\n"));
    }
    e && -1 === e.indexOf(" error=") ? (this.J = 0, a.asyncDispatch(50)) : (e && -1 !== e.indexOf("invalid_token") || !d) && zf(a) ? (ya("-", a, "accessToken"), this.J = 3, a.refreshToken()) : (ya("-", a, "accessToken"), this.J = 0, a.asyncDispatch(50));
  }
  function Ri(a, b) {
    var c = ya("", a, "accessToken"), d = Bf(a), e = b.url;
    c && "param" === d && (b.url = Md(e, {bearer_token:encodeURIComponent(c)}));
    !c || d && "header" !== d || (d = b.headers || (b.headers = {}), d.Authorization = "Bearer " + c);
  }
  function zf(a) {
    return ya("", a, "refreshToken");
  }
  function Af(a) {
    return parseFloat(ya("", a, "tokenExpiry")) || 0;
  }
  function Bf(a) {
    return Na === q && Jc ? "param" : ya("", a, "AuthMechanism");
  }
  function ya(a, b, c, d) {
    var e = "+" === a ? "setItem" : "-" === a ? "removeItem" : "getItem";
    if (window.localStorage) {
      return window.localStorage[e](z(b).clientID + c, d);
    }
    b = z(b);
    switch(a) {
      case "+":
        b[c] = d;
        break;
      case "-":
        b[c] !== v && delete b[c];
    }
    return b[c];
  }
  function ud(a) {
    switch(a.type) {
      case 31:
        var b = Oa[a.backendID];
        this.unlisten(32, ud);
        this.source = a.source;
        this.backendName = b.ya;
        Tc(this, b.Ka(this, a.source, a.option));
        this.listenOnce(10, ud);
        break;
      case 10:
        a = z(this);
        (a.autoplay || a.ma) && a.A();
        delete a.ma;
        break;
      case 32:
      case 30:
        this.kill();
        break;
      case U:
        if (p.unlisten(30, this, ud), b = z(this)) {
          b.kill(), Uc(this, b);
        }
    }
  }
  function Cf(a, b, c, d) {
    var e = c[0] || "", g = ic(Re(e)), h = g.ext || Sc(e);
    e && a ? (c = [b, c, d, e, h], c[5] = c, b.listenOnce(9, a, nh, c), a.nb(b, h, g)) : b.asyncDispatch(32);
  }
  function nh(a, b, c, d, e, g, h) {
    g = Oa.indexOf(this);
    a.pa ? (c = {type:31, option:d, source:e, backendName:this.ya, backendID:g}, 1 === this.Za && (c.needTouchForPlay = Kc), 2 === this.Za && (c.needTouchForLoad = vd), b.asyncDispatch(c)) : (console.log("No " + e + " " + this.ya), (h[3] = e = c[c.indexOf(e) + 1]) ? (c = ic(Re(e)), h[4] = g = c.ext || Sc(e), b.listenOnce(9, this, nh, h), this.nb(b, g, c)) : (e = Oa[g + 1]) ? Cf(e, b, c, d) : b.asyncDispatch(32));
  }
  function Lc(a) {
    var b = 0, c = 0, d = 0;
    if (R(a)) {
      return a;
    }
    if (H(a) && a.length) {
      var e = a.split(".");
      var g = parseFloat((e[1] + "000").substr(0, 3)) || 0;
      e = e[0].split(":");
      if (!(3 < e.length)) {
        switch(e.length) {
          case 0:
            break;
          case 1:
            b = parseFloat(e[0]) || 0;
            break;
          case 2:
            c = parseFloat(e[0]) || 0;
            b = parseFloat(e[1]) || 0;
            60 <= b && alert("invalid time string " + a);
            break;
          case 3:
            d = parseFloat(e[0]) || 0;
            c = parseFloat(e[1]) || 0;
            b = parseFloat(e[2]) || 0;
            60 <= b && alert("invalid time string " + a);
            60 <= c && alert("invalid time string " + a);
            break;
          default:
            alert("invalid time string " + a);
        }
        g = 1000 * (3600 * d + 60 * c + b) + g;
        return 0 > g ? 0 : g;
      }
    }
  }
  function wd(a, b, c) {
    var d = a.ha;
    c && delete a.ha;
    return 0 <= d ? a.duration <= d || b < d ? 0 : d : a.F && 0 <= a.D ? a.duration <= a.D || b < a.D ? 0 : a.D : 0 > a.startTime || a.duration <= a.startTime ? 0 : a.startTime;
  }
  function Pa(a) {
    var b = a.duration;
    return a.F && 0 <= a.G ? b <= a.G ? b : a.G : 0 > a.endTime || b <= a.endTime ? b : a.endTime;
  }
  function oh() {
    for (var a = n.aa, b = qb, c = 0, d, e, g = 1 / 0, h; c < b; ++c) {
      d = a[c];
      e = d.getState();
      if (!e.g) {
        return d;
      }
      if (d !== n.da) {
        if (15E3 >= e.currentTime) {
          return d;
        }
        d = e.endTime - e.currentTime;
        d < g && (g = d, h = c);
      }
    }
    return a[h];
  }
  function bc(a) {
    var b, c, d, e;
    switch(a.type) {
      case 31:
        var g = Oa[a.backendID];
        var h = a.option;
        K.unlisten(32, bc);
        K.source = c = a.source;
        K.backendName = d = g.ya;
        for (b = 0; b < qb; ++b) {
          ph && (h = Le(h), h.useVideo = !0, console.log("use video")), n.aa.push(e = g.Ka(null, a.source, h).listen(51, Db));
        }
        b = {type:31, source:c, backendName:d};
        a.needTouchForPlay && (b.needTouchForPlay = !0) || a.needTouchForLoad && (b.needTouchForLoad = !0) ? (n.cb = b, e.listenOnce(49, bc)) : K.asyncDispatch(b);
        e.listen(13, bc).listenOnce(10, bc);
        return 6;
      case 32:
        return K.listen(32, Db).asyncDispatch(32), 6;
      case 49:
        K.asyncDispatch(n.cb);
        delete n.cb;
        break;
      case 13:
        K.dispatch({type:13, percent:a.percent});
        break;
      case 10:
        console.log("X.AudioSprite - Ready!");
        n.cb && (b = n.cb, b.needTouchForPlay = !1, K.unlisten(49, bc).asyncDispatch(b), delete n.cb);
        for (b = 0; b < qb; ++b) {
          a = n.aa[b], (a.autoplay || a.ma) && a.A(), delete a.ma;
        }
        this.listen(13, bc);
        K.asyncDispatch(10);
    }
  }
  function Db(a) {
    var b = a.target;
    switch(a.type) {
      case 42:
      case 47:
      case 48:
        b !== n.da && b.F || K.asyncDispatch(a.type);
        break;
      case 43:
        if (b === n.da) {
          n.lb = !0, K.asyncDispatch(44);
        } else {
          if (b.F || K.asyncDispatch(46), n.mb && !n.da) {
            return n.da = b, K.play(n.Tb), 8;
          }
        }
        break;
      case 51:
        var c = n.aa.indexOf(b);
        0 <= c && (a.trackID = c, K.dispatch(a));
        break;
      case 20:
        console.log("\u25a0 \u30a2\u30af\u30c6\u30a3\u30d6");
        for (a = n.Cc; a.length;) {
          a.pop().A();
        }
        break;
      case 21:
        console.log("\u25a0 \u30c7\u30a2\u30af\u30c6\u30a3\u30d6");
        a = n.aa;
        for (c = qb; b = a[--c];) {
          b.g && n.Cc.push(b) && b.pause();
        }
        break;
      case 32:
      case 30:
        K.kill();
        break;
      case U:
        for (n.Cc.length = 0; n.aa.length;) {
          n.aa.pop().kill();
        }
        for (c in n.Db) {
          delete n.Db[c];
        }
        for (c in n.ec) {
          delete n.ec[c];
        }
        n.da = null;
        n.$a = 0;
        n.Tb = "";
        n.lb = !1;
        n.mb = !1;
        p.unlisten([20, 21, 30], Db);
        K = null;
    }
  }
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
      var h = this.length - 1;
      for (g = a + b; h >= g; --h) {
        this[h + d] = this[h];
      }
    } else {
      if (0 > d) {
        h = a + b;
        for (g = this.length; h < g; ++h) {
          this[h + d] = this[h];
        }
        this.length += d;
      }
    }
    h = 2;
    for (g = c.length; h < g; ++h) {
      this[h - 2 + a] = c[h];
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
  var ei = function() {
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
    return bg(a, 0);
  });
  window.encodeURIComponent || (window.encodeURIComponent = function(a) {
    return bg(a, 1);
  });
  window.decodeURI || (window.decodeURI = fi);
  window.decodeURIComponent || (window.decodeURIComponent = window.decodeURI);
  if (!window.console || window.parent && window.parent.log) {
    console = {log:function(a) {
      var b;
      window.parent && (b = parent.document.all ? parent.document.all.log : parent.log || parent.document.getElementById("log")) && (b.innerHTML = a + "<br>" + b.innerHTML);
    }};
  }
  console.dir || (console.dir = function() {
  });
  var pi = {}, m = {ab:[]}, da = new Function, He, gi;
  r.VERSION = "0.6.181";
  r.bootTime = +new Date;
  r.emptyFunction = da;
  r.inHead = function(a) {
    if (!a || !a.length) {
      return !1;
    }
    a = a[a.length - 1];
    a = a.parentElement || a.parentNode || a;
    return "head" === a.tagName.toLowerCase();
  }(document.scripts || document.getElementsByTagName && document.getElementsByTagName("script") || document.all && document.all.xd("script"));
  var f = r.UA = {}, Eb = "", Df;
  (function() {
    function a(a, b, c) {
      c = parseFloat(a.split(b)[1]);
      return 0 <= c ? c : 0;
    }
    function b(a, b) {
      return 0 <= a.indexOf(b);
    }
    var c = f, d = document.documentElement, e = navigator.userAgent, g = navigator.appVersion, h = parseFloat(g) | 0, l = navigator.platform, k = document.documentMode, m = screen.width, n = screen.height, q = Math.max, u = window.HTMLAudioElement, t = window.performance, p = window.Int8Array, r = window.ontouchstart !== v, w = a(g, "Version/") || a(e, "Version/"), y = window.opera, x = y && (y.version ? parseFloat(y.version()) : q(a(e, "Opera"), w, h)), z = window.opr, A = window.operamini;
    q = A && q(a(e, "Opera Mini/"), a(e, "Opera Mobi/"), w);
    var C = b(e, "UCWEB"), B = a(e, " U2/"), G = !y && (document.all || k), E = !G && d.msContentZoomFactor, H = !E && window.chrome, K = b(e, "Safari"), M = b(e.toLowerCase(), "iris");
    d = d && d.style.MozAppearance !== v;
    var P = b(g, "Konqueror"), L = b(g, "YJApp-ANDROID"), O = a(e.toUpperCase(), "PLAYSTATION 3"), Q = a(e, "PlayStation Vita"), R = "New Nintendo 3DS" === l || b(e, "iPhone OS 6_0") && 320 === m && 240 === n, W = window.palmGetResource, U = a(e, "Windows Phone") || a(g, "Windows Phone OS ") || a(e, "; wds"), Z = b(g, "ZuneWP"), aa = 0 === l.indexOf("Win"), ea = 0 === l.indexOf("Mac"), T = b(l, "Android") || d && b(g, "Android") || L, ba = b(l, "Linux"), ca = b(e, "Xbox One"), I = a(l, "Android ") || 
    a(g, "Android ") || a(e, "Android ") || a(e, "; Adr "), V = a(g, "Trident/"), ia = a(g, "Edge/");
    k = k ? k : window.Ac ? document.getElementsByTagName ? 7 : 4 : document.compatMode ? 6 : (0).toFixed ? 5.5 : window.attachEvent ? 5 : 4;
    var ja = a(e, "rv:"), pa = a(e, "AppleWebKit/"), da = a(e, "Chrome/"), fa = a(e, "OPR/"), ka = a(e, "Fennec/"), la = a(e, "Netscape6/") || a(e, "Netscape/") || a(e, "Navigator/"), ha = a(e, "NetFront/"), ma = a(e, "iCab"), na = H && 534.3 >= pa, oa = r && (pa || d) && ("Linux armv7l" === l || "Linux i686" === l) && b(e, "Linux x86_64") || !I && L;
    r = !k && document.registerElement;
    L = !k && document.execCommand;
    if (b(e, "Kobo")) {
      c.Kobo = !0;
    } else {
      if (b(e, "Kindle")) {
        c.KindlePW = !0;
      } else {
        if (b(e, "EBRD")) {
          c.SonyReader = !0;
        } else {
          if ("Nintendo WiiU" === l) {
            c.WiiU = !0;
          } else {
            if ("Nintendo Wii" === l) {
              c.Wii = !0;
            } else {
              if ("Nitro" === l) {
                c.NDS = !0;
              } else {
                if ("Nintendo DSi" === l) {
                  c.NDSi = !0;
                } else {
                  if ("Nintendo 3DS" === l) {
                    c.N3DS = !0;
                  } else {
                    if (R) {
                      c.New3DS = !0;
                    } else {
                      if (O) {
                        c.PS3 = !0;
                      } else {
                        if (b(g, "PSP")) {
                          c.PSP = !0;
                        } else {
                          if (Q) {
                            c.PSVita = Q;
                          } else {
                            if (!ca && b(e, "Xbox")) {
                              c.XBox360 = !0;
                            } else {
                              if (ca) {
                                c.XBoxOne = !0;
                              } else {
                                if (2 === h && b(e, "Sony/COM2/")) {
                                  c.Mylo = 2, ha = 3.4;
                                } else {
                                  if (W) {
                                    c.WebOS = !0;
                                  } else {
                                    if (b(e, "MeeGo") && b(e, "NokiaBrowser/8.5.0")) {
                                      c.MeeGo = !0;
                                    } else {
                                      if (!R && 0 === l.indexOf("iP") || 0 === e.indexOf("; iPh OS ")) {
                                        e = 1 === window.devicePixelRatio;
                                        var D = a(g.split("_").join("."), "OS ");
                                        if (!D) {
                                          var S = !0;
                                          D = window.WebAssembly ? 11.2 : window.HTMLMeterElement ? 10.3 : window.Proxy ? 10.2 : window.HTMLPictureElement ? 9.3 : Number.isNaN ? 9.2 : window.SharedWorker ? t && t.now ? 8.0 : 8.4 : L ? 7.1 : window.webkitURL ? 6.1 : window.Worker ? 5.1 : p ? 4.3 : u ? 4.1 : 3.2;
                                        }
                                        c.iOS = D;
                                        D = m === 1.5 * n || 1.5 * m === n;
                                        switch(l) {
                                          case "iPhone":
                                          case "iPhone Simulator":
                                            c.iPhone = D ? e ? "3GS-" : "4|4s" : "5+";
                                            break;
                                          case "iPad":
                                          case "iPad Simulator":
                                            c.iPad = e ? "2-|1min-" : "3+|2min+";
                                            break;
                                          case "iPod":
                                            c.iPod = D ? e ? "3-" : "4" : "5+";
                                        }
                                      } else {
                                        if (U) {
                                          c.WinPhone = U;
                                        } else {
                                          if (ia && "ARM" === l) {
                                            c.WinPhone = 10, S = !0;
                                          } else {
                                            if (Z) {
                                              c.WinPhone = 11 === k ? 8.1 : 10 === k ? 8 : 9 === k ? 7.5 : 7 === k ? 7 : "?", S = !0;
                                            } else {
                                              if (aa) {
                                                switch(l) {
                                                  case "WinCE":
                                                    c[l] = !0;
                                                    break;
                                                  case "Win16":
                                                  case "Win32":
                                                  case "Win64":
                                                    c[l] = !0;
                                                    if (D = e.split("Windows NT 10")[1]) {
                                                      switch(D.substr(0, 2)) {
                                                        case ".0":
                                                          D = 10;
                                                          break;
                                                        default:
                                                          D = "?";
                                                      }
                                                    } else {
                                                      if (D = e.split("Windows NT ")[1]) {
                                                        switch(D.substr(0, 3)) {
                                                          case "6.3":
                                                            D = 8.1;
                                                            break;
                                                          case "6.2":
                                                            D = 8;
                                                            break;
                                                          case "6.1":
                                                            D = 7;
                                                            break;
                                                          case "6.0":
                                                            D = "Vista";
                                                            break;
                                                          case "5.2":
                                                            D = "2003|XP64";
                                                            break;
                                                          case "5.1":
                                                            D = b(D, "5.1; SV1") ? "XPSP2" : "XP";
                                                            break;
                                                          case "5.0":
                                                            D = b(D, "5.01") ? "2kSP1" : 2000;
                                                            break;
                                                          case "4.0":
                                                            D = "NT";
                                                            break;
                                                          default:
                                                            D = "?";
                                                        }
                                                      } else {
                                                        if (D = e.split("Windows ")[1]) {
                                                          switch(D.substr(0, 2)) {
                                                            case "98":
                                                              D = b(D, "98; Win 9x 4.90") ? "ME" : "98|98SE";
                                                              break;
                                                            case "95":
                                                              D = 95;
                                                              break;
                                                            case "3.":
                                                              D = parseFloat(D);
                                                              break;
                                                            default:
                                                              D = "?";
                                                          }
                                                        } else {
                                                          D = "?";
                                                        }
                                                      }
                                                    }
                                                    c.Windows = D;
                                                }
                                              } else {
                                                if (ea) {
                                                  switch(c.Mac = !0, l) {
                                                    case "MacPowerPC":
                                                      l = "MacPPC";
                                                    case "MacPPC":
                                                    case "Mac68K":
                                                    case "MacIntel":
                                                      c[l] = !0;
                                                  }
                                                } else {
                                                  if (T && d) {
                                                    b(e, "Android 4.4;") ? D = "2.3+" : 4 <= I ? D = I : T && (D = "2.2+"), oa && (S = !0);
                                                  } else {
                                                    if (T && y) {
                                                      I ? D = I : (D = "1.6+", S = !0), c.Android = D;
                                                    } else {
                                                      if (I) {
                                                        c.Android = I;
                                                      } else {
                                                        if (ba && oa) {
                                                          var Y = !0;
                                                          H && !na || z || fa ? D = I = "4+" : D = r ? I = L ? 4.4 : 5 : p ? I = navigator.connection ? window.searchBoxJavaBridge_ || H ? Number.isNaN ? 4.1 : 4 : 4.2 : 4.4 : I = 529 > pa ? 1.5 : 531 > pa ? 2.0 : 534 > pa ? u ? 2.3 : 2.2 : 3;
                                                          c.Android = D;
                                                        } else {
                                                          ba && (c.Linux = !0);
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
    ha ? c.NetFront = ha : ma ? c.iCab = ma : O ? c.Sony = O : A ? c.OperaMin = q : C ? c.UCWEB = B : y ? c.Opera = c.Prsto = x : G ? (V = V ? V + 4 | 0 : k, V !== k && (c.IEHost = V), c.IE = k, 10 <= k && 8 <= c.Windows && 9 > c.Windows && 0 === screenY && innerHeight + 1 !== outerHeight && (c.ModernIE = k), c.Mac && (c.MacIE = k)) : E ? c.Edge = ia : d ? (c.Gecko = ja, ka ? c.Fennec = ka : T ? c.Fennec = ja : la && (c.NN = la)) : z || fa ? (c.OPR = fa, c.Blink = da, Y && (S = !0)) : I && na ? (c.AOSP = 
    I, Y && (S = !0)) : H ? (c.Blink = da, Y && (S = !0)) : I && r ? (c.CrWV = I, Y && (S = !0)) : I && (w || Y) ? (c.AOSP = I, Y && (S = !0)) : P ? c.Khtml = h : pa && (c.WebKit = pa, da ? c.Chrome = da : M ? c.Iris = pa : K && (w ? D = w : 528.16 >= pa && (D = 73 > pa ? 0.8 : 85 > pa ? 0.9 : 100 > pa ? 1 : 125 > pa ? 1.1 : 312 > pa ? 1.2 : 412 > pa ? 1.3 : 419.3 >= pa ? 2 : 525.13 >= pa ? 3 : 525.25 >= pa ? 3.1 : 3.2), c.Safari = D));
    S && (c.PCMode = !0);
  })();
  (function() {
    var a, b;
    if (5 > f.IE) {
      Eb = f.Mac ? "Mac" : f.WinCE ? "WinCE" : f.Windows ? "Win" : "Other", Eb += "_IE4", 4.5 <= f.IE && (Eb += "5");
    } else {
      for (a in f) {
        (b = f[a]) && (Eb = !0 !== b ? Eb + (a + b + " ") : Eb + (a + " "));
      }
    }
    f.Gecko && (b = navigator.userAgent.split("rv:")[1]) && (b = b.split("."), Df = b[0] + (0 <= parseFloat(b[1]) ? "." + b[1] + (0 < parseFloat(b[2]) ? "." + b[2] : "") : ""));
  })();
  var E = {}, Ja = {}, Ef;
  5 > f.IE ? (E.o = !0, Ja.o = !0) : f.Mac && f.IE ? (E.W = !0, Ja.Fb = !0) : document.getElementById && (E.W = !0, document.addEventListener ? Ja.W = !0 : document.attachEvent ? Ja.Fb = !0 : Ja.ge = !0);
  var za = document.documentElement || E.W ? document.getElementsByTagName("html")[0] : E.o ? document.all.xd("html")[0] : null, xd = E.W ? document.getElementsByTagName("head")[0] : E.o ? document.all.xd("head")[0] : null, y;
  if (navigator.msPointerEnabled || navigator.pointerEnabled) {
    var qh = !0;
  }
  qh || window.ontouchstart === v || (Ef = !0);
  var Hd = f.Windows && !f.WinCE && !f.WinPhone && 11 > f.IE, Lb = !(5.5 > f.IE) && new Function("f,a", "try{return f.apply({},a)}catch(e){}");
  r.Script = {tryIfSafe:Ta, VBS:Hd};
  Hd && (Lb || document.write("<script type=text/vbscript>Function vbs_testAXO(v)\nOn Error Resume Next\nSet ax = CreateObject(v)\nIf Err.Number Then\nax = 1\nEnd If\nErr.Clear\nvbs_testAXO = ax\nEnd Function\x3c/script>"), Lb || document.write("<script type=text/vbscript>Function vbs_testAE()\nOn Error Resume Next\nSet ae = Document.ActiveElement\nIf Err.Number Then\nae = 1\nEnd If\nErr.Clear\nvbs_testAE = ae\nEnd Function\x3c/script>"));
  f.IE6 && !Ta(function() {
    document.execCommand("BackgroundImageCache", !1, !0);
    return 1;
  }) && (f.ieExeComError = !0);
  var ra = new Function("v", 5.5 > f.IE || 4 > f.NetFront ? "return v&&v.push===Array.prototype.push" : f.IE ? 'return v&&Object.prototype.toString.call(v)==="[object Array]"' : "return v instanceof Array"), me = new Function("v", 5 > f.IE || f.MacIE ? "return v&&v.tagName&&v.insertAdjacentHTML&&!0" : 4 > f.NetFront ? "return v&&v.nodeType===1" : window.HTMLElement ? "return v instanceof HTMLElement" : "return v&&v.appendChild&&v.nodeType===1");
  r.Type = {isObject:Z, isFunction:V, isUnknown:cg, isArray:ra, isBoolean:fc, isString:H, isNumber:R, isFinite:ja, isNaN:gc, isHTMLElement:me, isImage:dg, isNull:function(a) {
    return null === a;
  }, isUndefined:Je};
  var Ka = Lb ? new Function("a,b", 'return (""+a) in b') : function(a, b, c) {
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
  r.Object = {copy:Mb, deepCopy:Le, override:Ke, clear:Id, isEmpty:function(a) {
    if (a) {
      for (var b in a) {
        return !1;
      }
      return !0;
    }
  }, inObject:Ka, find:Ba};
  r.Array = {copy:aa};
  var Qc = String.fromCharCode(13) + String.fromCharCode(10), Ne = {"&nbsp;":160, "&iexcl;":161, "&cent;":162, "&pound;":163, "&curren;":164, "&yen;":165, "&brvbar;":166, "&sect;":167, "&uml;":168, "&copy;":169, "&ordf;":170, "&laquo;":171, "&not;":172, "&shy;":173, "&reg;":174, "&macr;":175, "&deg;":176, "&plusmn;":177, "&sup2;":178, "&sup3;":179, "&acute;":180, "&micro;":181, "&para;":182, "&middot;":183, "&cedil;":184, "&sup1;":185, "&ordm;":186, "&raquo;":187, "&frac14;":188, "&frac12;":189, 
  "&frac34;":190, "&iquest;":191, "&Agrave;":192, "&Aacute;":193, "&Acirc;":194, "&Atilde;":195, "&Auml;":196, "&Aring;":197, "&AElig;":198, "&Ccedil;":199, "&Egrave;":200, "&Eacute;":201, "&Ecirc;":202, "&Euml;":203, "&Igrave;":204, "&Iacute;":205, "&Icirc;":206, "&Iuml;":207, "&ETH;":208, "&Ntilde;":209, "&Ograve;":210, "&Oacute;":211, "&Ocirc;":212, "&Otilde;":213, "&Ouml;":214, "&times;":215, "&Oslash;":216, "&Ugrave;":217, "&Uacute;":218, "&Ucirc;":219, "&Uuml;":220, "&Yacute;":221, "&THORN;":222, 
  "&szlig;":223, "&agrave;":224, "&aacute;":225, "&acirc;":226, "&atilde;":227, "&auml;":228, "&aring;":229, "&aelig;":230, "&ccedil;":231, "&egrave;":232, "&eacute;":233, "&ecirc;":234, "&euml;":235, "&igrave;":236, "&iacute;":237, "&icirc;":238, "&iuml;":239, "&eth;":240, "&ntilde;":241, "&ograve;":242, "&oacute;":243, "&ocirc;":244, "&otilde;":245, "&ouml;":246, "&divide;":247, "&oslash;":248, "&ugrave;":249, "&uacute;":250, "&ucirc;":251, "&uuml;":252, "&yacute;":253, "&thorn;":254, "&yuml;":255, 
  "&OElig;":338, "&oelig;":339, "&Scaron;":352, "&scaron;":353, "&Yuml;":376, "&circ;":710, "&tilde;":732, "&fnof;":402, "&Alpha;":913, "&Beta;":914, "&Gamma;":915, "&Delta;":916, "&Epsilon;":917, "&Zeta;":918, "&Eta;":919, "&Theta;":920, "&Iota;":921, "&Kappa;":922, "&Lambda;":923, "&Mu;":924, "&Nu;":925, "&Xi;":926, "&Omicron;":927, "&Pi;":928, "&Rho;":929, "&Sigma;":931, "&Tau;":932, "&Upsilon;":933, "&Phi;":934, "&Chi;":935, "&Psi;":936, "&Omega;":937, "&alpha;":945, "&beta;":946, "&gamma;":947, 
  "&delta;":948, "&epsilon;":949, "&zeta;":950, "&eta;":951, "&theta;":952, "&iota;":953, "&kappa;":954, "&lambda;":955, "&mu;":956, "&nu;":957, "&xi;":958, "&omicron;":959, "&pi;":960, "&rho;":961, "&sigmaf;":962, "&sigma;":963, "&tau;":964, "&upsilon;":965, "&phi;":966, "&chi;":967, "&psi;":968, "&omega;":969, "&thetasym;":977, "&upsih;":978, "&piv;":982, "&ensp;":8194, "&emsp;":8195, "&thinsp;":8201, "&zwnj;":8204, "&zwj;":8205, "&lrm;":8206, "&rlm;":8207, "&ndash;":8211, "&mdash;":8212, "&lsquo;":8216, 
  "&rsquo;":8217, "&sbquo;":8218, "&ldquo;":8220, "&rdquo;":8221, "&bdquo;":8222, "&dagger;":8224, "&Dagger;":8225, "&bull;":8226, "&hellip;":8230, "&permil;":8240, "&prime;":8242, "&Prime;":8243, "&lsaquo;":8249, "&rsaquo;":8250, "&oline;":8254, "&frasl;":8260, "&euro;":8364, "&image;":8465, "&ewierp;":8472, "&real;":8476, "&trade;":8482, "&alefsym;":8501, "&larr;":8592, "&uarr;":8593, "&rarr;":8594, "&darr;":8595, "&harr;":8596, "&crarr;":8629, "&lArr;":8656, "&uArr;":8657, "&rArr;":8658, "&dArr;":8659, 
  "&hArr;":8660, "&forall;":8704, "&part;":8706, "&exist;":8707, "&empty;":8709, "&nabla;":8711, "&isin;":8712, "&notin;":8713, "&ni;":8715, "&prod;":8719, "&sum;":8721, "&minus;":8722, "&lowast;":8727, "&radic;":8730, "&prop;":8733, "&infin;":8734, "&ang;":8736, "&and;":8743, "&or;":8744, "&cap;":8745, "&cup;":8746, "&int;":8747, "&there4;":8756, "&sim;":8764, "&cong;":8773, "&asymp;":8776, "&ne;":8800, "&equiv;":8801, "&le;":8804, "&ge;":8805, "&sub;":8834, "&sup;":8835, "&nsub;":8836, "&sube;":8838, 
  "&supe;":8839, "&oplus;":8853, "&otimes;":8855, "&perp;":8869, "&sdot;":8901, "&lceil;":8968, "&rceil;":8969, "&lfloor;":8970, "&rfloor;":8971, "&lang;":9001, "&rang;":9002, "&loz;":9674, "&spades;":9824, "&clubs;":9827, "&hearts;":9829, "&diams;":9830};
  (function(a, b) {
    for (b in a) {
      a[b] = String.fromCharCode(a[b]);
    }
  })(Ne);
  r.String = {parse:Me, cleanupWhiteSpace:hc, whiteSpaceToTag:function(a) {
    return null == a || "" === a ? "" : ("" + a).split(Qc).join("<br>").split("\r").join("<br>").split("\n").join("<br>").split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;").split("\f").join("").split("\b").join("");
  }, chrReferanceTo:Rc, toChrReferance:function(a) {
    var b;
    if (null == a || "" === a) {
      return "";
    }
    a = Nb(a);
    var c = Ne;
    for (b in c) {
      a = a.split(c[b]).join(b);
    }
    return a;
  }, isNumberString:Jd, serialize:fg};
  r.Number = {conpareVersion:Pe};
  var hg = function(a) {
    var b = 1 < a.length && a[a.length - 1];
    !1 === b || "" !== b && -1 === b.indexOf(".") || --a.length;
    return a.join("/");
  }(Kd(location.href).split("/")), ig = location.protocol + "//" + location.hostname, rh = "file:" === location.protocol, sh = rh || "localhost" === location.hostname || "127.0.0.1" === location.hostname, Si = ic(location.search.slice(1));
  r.URL = {BASE_URL:hg, IS_FILE:rh, IS_LOCAL:sh, PARAMS:Si, create:Md, toAbsolutePath:Ob, objToParam:Ld, paramToObj:ic, isSameDomain:Qe, isSameProtocol:jg, isLocal:kg, cleanup:Kd, getEXT:Sc, getSearch:function(a) {
    a = a.split("#")[0].split("?");
    a.splice(0, 1);
    return a.join("?");
  }, getHash:Re};
  r.Pair = {create:Tc, get:z, release:Uc};
  var lg = 1024, Pb = [[]], jc = [[]], Se = !1, hi = new Function("s", "p", "k", function() {
    for (var a = "var i=0,l=s.length,a;for(;i<l;++i){a=s[i];switch(k){", b = 0, c; b < lg; ++b) {
      c = b.toString(16), a += "case a[0x" + c + "]:return p[i][0x" + c + "];";
    }
    return a + "}}";
  }()), Nd, Te;
  r.Callback = {NONE:0, UN_LISTEN:1, STOP_PROPAGATION:2, STOP_NOW:6, PREVENT_DEFAULT:8, CAPTURE_POINTER:16, RELEASE_POINTER:32};
  console.log("X.Core.Callback");
  var Wc = [], kc = [], Ue = Wc, Ve = kc;
  m.ab.push(function() {
  });
  var Pd = [], We = [], Qa = [], Ra = [], Xc = null, og = !(f.Prsto && f.Android) && !f.AOSP && !f.CrWV && !!da.prototype.__proto__, li = 3 > f.AOSP || 5 > f.iOS, Y = [], pg = {kill:function() {
    var a, b, c;
    if (this.instanceOf(ma)) {
      if ((a = this._listeners) && Y.length && -1 !== Y.indexOf(this)) {
        return;
      }
      if (a && !a[nc] && a[Ff]) {
        Y[b = Y.length] = this;
        if (this.dispatch(Ff) & 8) {
          this.dispatch(th);
          var d = !0;
        }
        1 === Y.length ? Y.length = 0 : Y.splice(Y[b] === this ? b : Y.indexOf(this), 1);
        if (d) {
          return;
        }
      }
      if (a = this._listeners) {
        if (a[tb]) {
          a[nc] = !0;
          return;
        }
        a[U] && (Y[b = Y.length] = this, a[nc] = !1, this.dispatch(U), 1 === Y.length ? Y.length = 0 : Y.splice(Y[b] === this ? b : Y.indexOf(this), 1));
        if (!(a = this._listeners)) {
          for (e in a) {
            if (!(e <= nc)) {
              for (d = a[e], b = d.length; b;) {
                this.unlisten(e, d[--b]);
              }
            }
          }
        }
      }
      if (this.instanceOf(P) && (a = this.parent, b = this._xnodes, 0 !== (this._flags & uh))) {
        a && a._xnodes && a._xnodes.splice(a._xnodes.indexOf(this), 1);
        if (b && (c = b.length)) {
          for (delete this._xnodes; c;) {
            b[--c].kill();
          }
          b.length = 0;
        }
        mb[this._uid] = null;
        this._anime && this._anime.m && (console.log("Animation \u4e2d\u306e KILL"), Lg(this));
        c = this._rawObject || E.o && ca(this);
        E.o ? c ? (Za[Za.length] = c, la()) : this._tag || 0 !== (a._flags & Xb) || (a._flags |= Yb) : c && c.parentNode && c.parentNode.tagName && (Za[Za.length] = c, la());
      }
      c = mc;
      for (e in c) {
        c[e] === this && O(e);
      }
    }
    Id(this);
    var e = Ia(this);
    e.bb && (e.cc.splice(e.cc.indexOf(this), 1), e.bb[e.bb.length] = this);
  }, Super:function(a) {
    var b = this.constructor, c = Qa.indexOf(this), d;
    if (-1 === c) {
      Qa[c = Qa.length] = this;
      var e = d = Ra[c] = 0;
    } else {
      for (e = d = Ra[c]; e;) {
        b = Ia(b).Ea, --e;
      }
    }
    for (; b;) {
      ++e;
      b = Ia(b).Ea;
      if (!b) {
        break;
      }
      var g = Ia(b);
      if (g.Eb) {
        Ra[c] += e;
        var h = g.Eb.apply(this, arguments);
        break;
      }
    }
    Qa[c] !== this && (c = Qa.indexOf(this));
    0 === d ? (Qa.splice(c, 1), Ra.splice(c, 1)) : Ra[c] = d;
    return h || this;
  }, superCall:function(a, b) {
    var c = this.constructor, d = c.prototype, e = Qa.indexOf(this), g = arguments;
    if (V(a)) {
      for (f in d) {
        if (d[f] === a) {
          var h = f;
          break;
        }
      }
      if (!h) {
        return;
      }
    } else {
      if (H(a) && V(this[a])) {
        h = a;
      } else {
        return;
      }
    }
    if (-1 === e) {
      Qa[e = Qa.length] = this;
      var f = d = Ra[e] = 0;
    } else {
      for (f = d = Ra[e]; f;) {
        c = Ia(c).Ea, --f;
      }
    }
    if (c) {
      for (a = c.prototype[h]; c;) {
        ++f;
        c = Ia(c).Ea;
        var k = c.prototype[h];
        if (k !== a) {
          if (V(k)) {
            switch(Ra[e] += f, g.length) {
              case 1:
                var m = k.call(this);
                break;
              case 2:
                m = k.call(this, g[1]);
                break;
              case 3:
                m = k.call(this, g[1], g[2]);
                break;
              case 4:
                m = k.call(this, g[1], g[2], g[3]);
                break;
              default:
                g = aa(g), g.shift(), m = k.apply(this, g);
            }
          }
          break;
        }
      }
    }
    Qa[e] !== this && (e = Qa.indexOf(this));
    0 === d ? (Qa.splice(e, 1), Ra.splice(e, 1)) : Ra[e] = d;
    return m;
  }, instanceOf:function(a) {
    var b = this;
    if (this.constructor === a) {
      return !0;
    }
    for (; b = Ia(b).Ea;) {
      if (b === a) {
        return !0;
      }
    }
    return !1;
  }}, ba = {NONE:0, va:1, kc:2, Jc:4, Bd:8};
  r.Class = {NONE:ba.NONE, POOL_OBJECT:ba.va, ABSTRACT:ba.kc, FINAL:ba.Jc, SINGLETON:ba.Bd, create:Od};
  var w = {}, Zc = {}, vh = !qh && (Ef ? {touchstart:"pointerdown", mousedown:"pointerdown", touchend:"pointerup", mouseup:"pointerup", touchmove:"pointermove", mousemove:"pointermove", touchleave:"pointerleave", mouseout:"pointerout", mouseleave:"pointerleave", touchcancel:"pointercancel", contextmenu:"contextmenu", dbclick:"dbclick", click:"click"} : {mousedown:"pointerdown", mouseup:"pointerup", mousemove:"pointermove", mouseout:"pointerout", mouseleave:"pointerleave", contextmenu:"contextmenu", 
  dbclick:"dbclick", click:"click"}), Dc = 7, ec = 8, Ff = 17, th = 18, U = 19, of = 25, jb = 26, hb = 27;
  r.Event = {XDOM_READY:ec, COMPLETE:9, READY:10, SUCCESS:11, ERROR:12, PROGRESS:13, BEFORE_CANCEL:14, CANCELED:15, TIMEOUT:16, BEFORE_KILL_INSTANCE:Ff, KILL_INSTANCE_CANCELED:th, KILL_INSTANCE:U, VIEW_ACTIVATE:20, VIEW_DEACTIVATE:21, VIEW_RESIZED:22, VIEW_TURNED:23, BASE_FONT_RESIZED:24, BEFORE_UPDATE:of, UPDATED:jb, AFTER_UPDATE:hb, HASH_CHANGED:28, BEFORE_UNLOAD:29, UNLOAD:30, BACKEND_READY:31, BACKEND_NONE:32, BACKEND_RESEARCH:33, BACKEND_CHANGED:34, ANIME_BEFORE_START:35, ANIME_START:36, ANIME:37, 
  ANIME_END:38, ANIME_BEFORE_STOP:39, ANIME_STOP:40, GPU_RELEASED:41, MEDIA_PLAYING:42, MEDIA_BEFORE_LOOP:43, MEDIA_LOOPED:44, MEDIA_PAUSED:45, MEDIA_ENDED:46, MEDIA_WAITING:47, MEDIA_SEEKING:48, MEDIA_WAIT_FOR_TOUCH:49, NEED_AUTH:50, DEBUG:51};
  m.ab.push(function() {
    var a, b;
    for (a in w) {
      var c = w[a];
      if (ra(c)) {
        for (b = c.length; b;) {
          Zc[c[--b]] = a;
        }
      } else {
        Zc[c] = a;
      }
    }
  });
  var tb = 1, nc = 4, lc = !1, ub = !1, Qb = !1, we = !1, Gf = !1, mc = {}, Rd = (f.WebKit || f.Blink) && {transitionend:!0, webkitTransitionEnd:!0, mozTransitionEnd:!0, oTransitionEnd:!0, otransitionEnd:!0, animationend:!0, webkitAnimationEnd:!0, oAnimationEnd:!0, animationstart:!0, webkitAnimationStart:!0, oAnimationStart:!0, animationiteration:!0, webkitAnimationIteration:!0, oAnimationIteration:!0}, ma = r.EventDispatcher = Od("EventDispatcher", {_rawType:0, _listeners:null, _rawObject:null, 
  Constructor:function(a) {
    a && (this._rawObject = a);
  }, dispatch:Yc, listen:rg, listenOnce:function(a, b, c, d) {
    lc = !0;
    this.listen(a, b, c, d);
    lc = !1;
    return this;
  }, unlisten:function(a, b, c, d) {
    var e = this._listeners, g, h;
    if (!e) {
      return this;
    }
    if (ra(a)) {
      for (h = a.length; h;) {
        this.unlisten(a[--h], b, c, d), a[h] || alert("\u4e0d\u6b63\u306a unlisten Array");
      }
      return this;
    }
    if (g = e[2]) {
      for (h = g.length; h;) {
        var f = g[--h];
        if (f[0] === a && f[1] === b && f[2] === c && f[3] === d && (!f[5] || Qb)) {
          return g.splice(h, 1), g.ue || delete e[2], this;
        }
      }
    }
    we = !0;
    h = this.listening(a, b, c, d);
    we = !1;
    if (!1 === h) {
      return this;
    }
    f = (b = e[a])[h];
    if (e[tb]) {
      var k = e[3] || (e[3] = {});
      (k = k[a]) ? k[k.length] = f : e[3][a] = [f];
      f.$d = !0;
    } else {
      if (Id(f), 1 !== b.length) {
        b.splice(h, 1);
      } else {
        b.length = 0;
        delete e[a];
        f = !0;
        for (k in e) {
          if (!(k <= nc)) {
            f = !1;
            break;
          }
        }
        Jd("" + a) || (e = this._rawObject || E.o && ca(this)) && ug(this, a, e, b, !f);
        f && delete this._listeners;
      }
    }
    return this;
  }, listening:function(a, b, c, d) {
    var e = this._listeners, g = ub || Qb, h, f;
    if (a === v) {
      return !!e;
    }
    if (!e || !(h = e[a])) {
      return !1;
    }
    if (b === v) {
      return we ? 0 : !0;
    }
    b = b.j ? b : ta(b, c, d, this);
    if ((f = e[3]) && (f = f[a])) {
      for (a = f.length; a;) {
        if (e = f[--a], e === b || e.context === b.context && e.u === b.u && e.za === b.za && e.O === b.O && e.lock === g) {
          return !1;
        }
      }
    }
    for (a = h.length; a;) {
      if (e = h[--a], e === b || e.context === b.context && e.u === b.u && e.za === b.za && e.O === b.O && e.lock === g) {
        return we ? a : !0;
      }
    }
    return !1;
  }, asyncDispatch:function(a, b) {
    a && b === v && (b = a, a = 0);
    a === v && eval('throw "asyncDispatch \u3067 undefined \u30a4\u30d9\u30f3\u30c8\u304c\u6307\u5b9a\u3055\u308c\u307e\u3057\u305f"');
    var c = fa(a, 1, this, Yc, [b]);
    mc[c] = this;
    return c;
  }}), Aa = [], cb, Mc, Ye = Ja.o || Ja.Fb ? function() {
    var a = event, b = this._rawObject;
    if (cb) {
      a.cancelBubble = !0;
    } else {
      Mc = a;
      var c = new xe(a, this, b);
      Aa[Aa.length] = c;
      c = this.dispatch(c);
      Mc === a && (Mc = null);
      --Aa.length;
      c & 2 && (a.cancelBubble = !0);
      Aa.length || Vd();
      if (c & 8) {
        return cb = !0, "A" === this._tag && b.blur(), cb = !1, a.returnValue = !1;
      }
    }
  } : function(a) {
    var b = 0, c = this._rawObject, d;
    if (cb) {
      a.stopPropagation();
    } else {
      Mc = a;
      var e = new xe(a, this);
      Aa[Aa.length] = e;
      if (ra(e)) {
        if (0 === e.length) {
          b = 10;
        } else {
          var g = 0;
          for (d = e.length; g < d; ++g) {
            b |= this.dispatch(e[g]) || 0;
          }
        }
      } else {
        b = this.dispatch(e);
      }
      Mc === a && (Mc = null);
      --Aa.length;
      Aa.length || Vd();
      b & 2 && a.stopPropagation();
      if (b & 8) {
        return cb = !0, "A" === this._tag && c.blur(), cb = !1, a.preventDefault(), 525.13 > f.WebKit && ("click" === a.type || "dbclick" === a.type) && (Gf = !0), !1;
      }
    }
  };
  525.13 > f.WebKit && (za.onclick = za.ondbclick = function(a) {
    if (Gf) {
      return Gf = !1, a.preventDefault(), !1;
    }
  });
  var Q = Date.now || function() {
    return +new Date;
  }, Yd = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || !1, Hf = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || !1, Ua = 16, Sd = [], ea = null, $e = !1, 
  Td = 0, Va = 0, $c = !1, bd = 0, ad = 0, Qd = 0, Rb = [], cd = 0, Xd = !1, le = Yd ? function(a, b, c) {
    var d = Rb.length;
    0 === d && (cd = Yd(Wd));
    a = ta(a, b, c);
    a.j || (a = {u:a});
    Rb[d] = a;
    return a.ca = ++Td;
  } : function(a, b, c) {
    var d = Rb.length;
    0 === d && (cd = fa(0, 1, Wd));
    a = ta(a, b, c);
    a.j || (a = {u:a});
    Rb[d] = a;
    return a.ca = ++Td;
  }, dd = Hf ? function(a) {
    var b = Rb, c = b.length, d = c, e;
    if (Xd) {
      ea || (ea = {}), ea[a] = !0;
    } else {
      for (; d && !((e = b[--d]).ca < a);) {
        if (e.ca == a) {
          b.splice(d, 1);
          1 === c && Hf && Hf(cd);
          break;
        }
      }
    }
    return 0;
  } : function(a) {
    var b = Rb, c = b.length, d = c, e;
    if (Xd) {
      ea || (ea = {}), ea[a] = !0;
    } else {
      for (; d && !((e = b[--d]).ca < a);) {
        if (e.ca == a) {
          b.splice(d, 1);
          1 === c && O(cd);
          break;
        }
      }
    }
    return 0;
  };
  r.Timer = {RESOLUTION:Ua, now:Q, add:fa, once:ka, remove:O, requestFrame:le, cancelFrame:dd};
  if (5 > f.IE || f.MacIE) {
    r.Timer._ = Ud, Ud = "X.Timer._()";
  }
  f.iOS && window.addEventListener("scroll", function() {
    if (Va) {
      clearTimeout(Va);
      var a = Q();
      var b = bd + Ua * ad - a;
      Va = setTimeout(Ud, 0 < b ? b : 0);
      bd = a;
      ad = b / Ua | 0;
    }
    wh();
  });
  var ed = [], Zd, Ti = f.IE || document.activeElement !== v, vg, ye = window.postMessage ? 10000 * Math.random() | 0 : 0, If = ye && {}, Fa = ua(ma(), {we:function() {
  }, re:function() {
  }, message:function(a, b) {
    var c = 10000 * Math.random() | 0;
    if (ye) {
      return If[a + c] = b, p.listen("message", Fa), ye + "-" + a + c;
    }
  }, handleEvent:function(a) {
    switch(a) {
      case "message":
        if (a.origin === r.URL.zd) {
          var b = a.data.indexOf("-");
          console.log("msg ||| " + a.data.substr(0, b));
          if (a.data.substr(0, b) == ye) {
            var c = a.data.substr(b, b = a.data.indexOf(" "));
            if (If[c]) {
              If[c](a.data.substr(b + c.length));
            }
          }
        }
        console.log(a.origin + " " + r.URL.zd);
        return 10;
    }
  }});
  m.rd = function() {
    var a = m.ab, b = a.length, c = Q() - r.bootTime;
    r.bootSpeed = c;
    console.log("js score " + c);
    delete m.rd;
    for (delete m.ab; b;) {
      a[--b](Fa);
    }
  };
  var wa, Wa = window.parent === window || !window.parent, Sb, Da, gd, pc, qc, ze = 0, Ae = 0, qa, xh, Jf, yh = 9 > f.IE || f.iOS, zh = !yh && function() {
    var a = yd._rawObject.offsetHeight;
    qa !== a && (qa = a) && p.asyncDispatch(24);
  }, df, Ah = window.orientation !== v && function() {
    df = !0;
    !f.Android && Kf();
  }, L = ma(document), p = ua(ma(window), {handleEvent:function(a) {
    var b = !1, c;
    switch(a.type) {
      case "beforeunload":
        return a = a.target && a.target.attr && a.target.attr("href"), H(a) && !a.toLowerCase().indexOf("javascript:") ? 10 : p.dispatch(29);
      case "unload":
        p.dispatch(30);
        L.kill();
        p.kill();
        break;
      case "visibilitychange":
        console.log(a.type + ":" + document.hidden);
        p.dispatch((Wa = !document.hidden) ? 20 : 21);
        break;
      case "msvisibilitychange":
        console.log(a.type + ":" + document.msHidden);
        p.dispatch((Wa = !document.msHidden) ? 20 : 21);
        break;
      case "mozvisibilitychange":
        console.log(a.type + ":" + document.mozHidden);
        p.dispatch((Wa = !document.mozHidden) ? 20 : 21);
        break;
      case "webkitvisibilitychange":
        console.log(a.type + ":" + document.webkitHidden);
        p.dispatch((Wa = !document.webkitHidden) ? 20 : 21);
        break;
      case "blur":
      case "focusout":
        if (9 > f.IE && (c = fd())) {
          return (a = oa(c)) && a.listenOnce(["focus", "blur"], wg), Sb && O(Sb), Sb = ka(16, xg), 10;
        }
        if (a.target !== L) {
          break;
        }
      case "pagehide":
        b = !0;
      case "focus":
      case "pageshow":
      case "focusin":
        Wa === b && (Wa = !b, p.dispatch(b ? 21 : 20));
    }
  }}), wh = window.pageXOffset !== v ? function() {
    W && S();
    return [ze = window.pageXOffset, Ae = window.pageYOffset];
  } : window.scrollLeft !== v ? function() {
    W && S();
    return [ze = window.scrollLeft, Ae = window.scrollTop];
  } : function() {
    W && S();
    return [ze = Da.scrollLeft || y.scrollLeft, Ae = Da.scrollTop || y.scrollTop];
  };
  r.ViewPort = {listen:function(a, b, c, d) {
    a <= wa && p.asyncDispatch(a);
    var e = ta(b, c, d);
    e.j ? 3 === e.j ? p.listen(a, this, e.u, e.O) : p.listen(a, b, c, d) : p.listen(a, this, b);
    return r.ViewPort;
  }, listenOnce:function(a, b, c, d) {
    a <= wa && p.asyncDispatch(a);
    var e = ta(b, c, d);
    e.j ? 3 === e.j ? p.listenOnce(a, this, e.u, e.O) : p.listenOnce(a, b, c, d) : p.listenOnce(a, this, b);
    return r.ViewPort;
  }, unlisten:function(a, b, c, d) {
    var e = ta(b, c, d);
    e.j ? 3 === e.j ? p.unlisten(a, this, e.u, e.O) : p.unlisten(a, b, c, d) : p.unlisten(a, this, b);
    return r.ViewPort;
  }, listening:function(a, b, c, d) {
    var e = ta(b, c, d);
    return e.j ? 3 === e.j ? p.listening(a, this, e.u, e.O) : p.listening(a, b, c, d) : p.listening(a, this, b);
  }, asyncDispatch:function() {
    return p.asyncDispatch.apply(p, arguments);
  }, getPointerPosition:function() {
  }, inView:function() {
  }, getSize:function() {
    return [pc, qc];
  }, getDocumentSize:function() {
    W && S();
    return [Da.scrollWidth || Da.offsetWidth, Da.scrollHeight || Da.offsetHeight];
  }, getScrollPosition:wh, getScrollbarSize:function() {
    return [xh, Jf];
  }, getBaseFontSize:function() {
    return W ? (S(), qa = yd._rawObject.offsetHeight) : qa;
  }, isActive:function() {
    return Wa;
  }, isVisible:function() {
    return Wa;
  }};
  var Kf = yh ? function() {
    if (!gd) {
      var a = cf();
      if (pc !== a[0] || qc !== a[1]) {
        pc = a[0], qc = a[1], ka(100, bf), gd = !0;
      }
    }
    a = yd._rawObject.offsetHeight;
    qa !== a && (qa && p.asyncDispatch(24), qa = a);
  } : function() {
    console.log("-- resize : " + Q());
    !gd && (gd = !0) && ka(100, bf);
    return 10;
  };
  m.ua = function() {
    var a, b, c;
    console.log("> X_TEMP.onDomContentLoaded rs:" + wa);
    if (5 <= wa) {
      return 1;
    }
    wa = 5;
    m.ua && L.unlisten("DOMContentLoaded", m.ua);
    delete m.ua;
    y = document.body;
    Da = "CSS1Compat" !== document.compatMode ? y : za || y;
    r.Doc.html = a = Ya = za && P(za).removeClass("js-disabled").addClass(Eb.split(".").join("_"));
    a._flags |= A;
    r.Doc.head = b = jd = xd && P(xd);
    r.Doc.body = c = ha = P(y);
    c["parent "] = b.parent = a;
    a._xnodes = [b, c];
    a.appendTo = a.prev = a.next = a.clone = a.remove = a.kill = a.create = a.createText = a.createAt = a.createTextAt = a.append = a.appendAt = a.empty = a.html = a.text = a.css = a.cssText = b.appendTo = b.prev = b.clone = b.remove = b.kill = b.createText = b.createTextAt = b.empty = b.html = b.text = b.css = b.cssText = c.appendTo = c.next = c.clone = c.remove = c.kill = new Function("return this");
    p.listenOnce(5, function() {
      wa = 6;
      !m.Qa && p.asyncDispatch(6);
    });
    p.listenOnce(6, function() {
      wa = Dc;
      ha.appendAt(0, nb = rc("div", {"class":"hidden-system-node"}), yd = rc("div", {"class":"hidden-system-node"}).cssText("line-height:1;height:1em;").text("X"));
      S();
      p.asyncDispatch(Dc);
    });
    p.listenOnce(Dc, function() {
      var a = cf(), b = y.style.overflow;
      pc = a[0];
      qc = a[1];
      y.style.overflow = "hidden";
      a = y.clientWidth;
      var c = y.clientHeight;
      y.style.overflow = "scroll";
      a -= y.clientWidth;
      c -= y.clientHeight;
      a || (a = y.offsetWidth - y.clientWidth);
      c || (c = y.offsetHeight - y.clientHeight);
      y.style.overflow = b;
      xh = a;
      Jf = c;
      0 >= c && (Jf = a);
      Ah && p.listen("orientationchange", Ah);
      zh ? (p.listen("resize", Kf), fa(333, zh)) : fa(333, Kf);
      qa = yd._rawObject.offsetHeight;
      p.asyncDispatch(wa = ec);
    });
    m.Qa && (m.Qa = !!y.children.length);
    p.asyncDispatch(5);
    p.listen(["beforeunload", "unload"]);
    document.hidden !== v ? L.listen("visibilitychange", p) : document.webkitHidden !== v ? L.listen("webkitvisibilitychange", p) : document.msHidden !== v ? L.listen("msvisibilitychange", p) : document.mozHidden !== v && L.listen("mozvisibilitychange", p);
    window.onpageshow !== v && p.listen(["pageshow", "pagehide"]);
    f.Gecko ? (document.addEventListener("focus", p.handleEvent, !0), document.addEventListener("blur", p.handleEvent, !0)) : L.listen(["focusin", "focusout"], p);
    Ti || p.listen("focus", oi);
    p.listen(["focus", "blur"]);
    return 1;
  };
  Ja.W ? L.listenOnce("DOMContentLoaded", m.ua) : 6 <= f.IE && r.inHead && (m.Ob = document.createElement("<script id=__ieonload defer src=javascript:void(0)>\x3c/script>"), xd.appendChild(m.Ob), m.Ob.onreadystatechange = function() {
    var a = m.Ob;
    a && "complete" === a.readyState && (a.onreadystatechange = da, a.onreadystatechange = null, a.removeNode(!0), delete m.Ob, m.ua && m.ua());
  });
  419.3 >= f.WebKit && fa(16, function() {
    if (!m.ua) {
      return 1;
    }
    if ("loaded" === document.readyState || "complete" === document.readyState) {
      return m.ua();
    }
  });
  p.listenOnce("load", m.ua);
  r.N = {Gb:null, debug:function(a) {
    r.N.Mb(a, 0);
  }, info:function(a) {
    r.N.Mb(a, 1);
  }, warn:function(a) {
    r.N.Mb(a, 2);
  }, Ub:function(a) {
    r.N.Mb(a, 3);
  }, Mb:function(a, b) {
    var c;
    if (ec <= wa) {
      if (c = r.N.Gb) {
        c.remove(), delete r.N.Gb;
      }
    } else {
      ec <= wa ? ((c = r.N.Gb) || (c = r.N.Gb = P("div").le(0)), c.add("<p>" + a + "</p>")) : console ? 0 === b ? console.debug(a) : 1 === b ? console.info(a) : console.warn(a) : 1 < b && alert(a);
    }
  }};
  console.log("X.Core.Log");
  r.Doc = {listen:function(a, b, c, d) {
    a <= wa && "DOMContentLoaded" === a && L.asyncDispatch(a);
    var e = ta(b, c, d);
    e.j ? 3 === e.j ? L.listen(a, this, e.u, e.O) : L.listen(a, b, c, d) : L.listen(a, this, b);
    return r.Doc;
  }, listenOnce:function(a, b, c, d) {
    a <= wa && "DOMContentLoaded" === a && L.asyncDispatch(a);
    var e = ta(b, c, d);
    e.j ? 3 === e.j && L.listenOnce(a, this, e.u, e.O) : L.listenOnce(a, this, b);
    L.listenOnce(a, b, c, d);
    return r.Doc;
  }, unlisten:function(a, b, c, d) {
    var e = ta(b, c, d);
    e.j ? 3 === e.j ? L.unlisten(a, this, e.u, e.O) : L.unlisten(a, b, c, d) : L.unlisten(a, this, b);
    return r.Doc;
  }, listening:function(a, b, c, d) {
    var e = ta(b, c, d);
    return e.j ? 3 === e.j ? L.listening(a, this, e.u, e.O) : L.listening(a, b, c, d) : L.listening(a, this, b);
  }, create:rc, createText:ae};
  var kf = {AREA:!0, BASE:!0, BASEFONT:!0, BR:!0, COL:!0, FRAME:!0, HR:!0, IMG:!0, INPUT:!0, ISINDEX:!0, LINK:!0, META:!0, PARAM:!0, EMBED:!0}, Ci = {action:!0, archive:!0, background:!0, cite:!0, classid:!0, codebase:!0, data:!0, href:!0, longdesc:!0, profile:!0, src:!0, usemap:!0}, Lf = {STYLE:!0, LINK:!0, TITLE:!0, BGSOUND:!0, AREA:!0, BASE:!0, META:!0}, Ui = {SCRIPT:!0, NOSCRIPT:!0, NOFRAMES:!0, "!":!0, COMMENT:!0, NOEMBED:!0, NOLAYER:!0}, Mf = {PRE:!0, TEXTAREA:!0, CODE:!0, KBD:!0, SAMP:!0, 
  XMP:!0, PLAINTEXT:!0, LISTING:!0}, uh = 1, A = 2, lb = 65536, Xa = 10 > f.IE && f.ActiveX ? 131072 : 0, La = 1048576, ld = 4194304, yb = 8388608, Ub = 16777216, Nc = 5 > f.IE ? 4194304 : 0, zd = 5 > f.IE ? 8388608 : 0, Yb = 5 > f.IE ? 16777216 : 0, Xb = 5 > f.IE ? 33554432 : 0, Cc = 5 <= f.IE && 5.5 > f.IE && f.ActiveX ? 33554432 : 0, fe = f.ActiveX && 134217728, Ea = document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect ? 268435456 : 0, vb = function() {
    if (!f.ActiveX || 5 > f.IE || 9 < f.IE) {
      return 0;
    }
    document.write("\x3c!--[if vml]><script id=vmltest1>__vml=1;\x3c/script><![endif]--\x3e\x3c!--[if gte vml 1]><script id=vmltest2>__vml=2;\x3c/script><![endif]--\x3e");
    r.Doc.VML = window.__vml / 2 || 0;
    switch(window.__vml) {
      case 2:
        document.getElementById("vmltest2").removeNode(!0);
      case 1:
        return document.getElementById("vmltest1").removeNode(!0), 536870912;
    }
    return 0;
  }(), Ab = 61440 | lb | Xa | 0, Sa = 2147483647 ^ Ab, xb = 2147483647 ^ (ld | yb | Ub), Oc = Nc | zd;
  r.Doc.SVG = !!Ea;
  var Ad = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || 1, Bh = !window.PointerEvent && window.MSPointerEvent && [0, 0, "touch", "pen", "mouse"], Ch = 5 > f.iOS ? "page" : "client", Nf = {}, xe;
  1 !== Ad && (Eb += " dpr" + Ad, f.dpr = Ad);
  !f.IE || 9 <= f.IE ? xe = function(a, b) {
    var c = a.type, d, e, g;
    this.type = d = Zc[c] || c;
    switch(d) {
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
    if (a.pointerType || 10 === f.IE && "click" === d && (a.pointerType = "mouse")) {
      Bh ? (this.pointerType = Bh[a.pointerType], this.pressure = R(a.pressure) ? a.pressure : -1 !== a.button ? 0.5 : 0, this.width = a.width / Ad, this.height = a.height / Ad) : (this.pointerType = a.pointerType, this.pressure = a.pressure, this.width = a.width, this.height = a.height);
      switch(this.pointerType) {
        case "pen":
          this.tiltX = a.tiltX, this.tiltY = a.tiltY, "MSPointerHover" === c && (this.type = "pointermove");
        case "touch":
          this.radiusX = a.radiusX, this.radiusY = a.radiusY, this.rotationAngle = a.rotationAngle;
      }
      this.button = a.button;
      this.buttons = a.buttons;
      this.pointerId = a.pointerId;
      this.target = oa(a.target);
      this.relatedTarget = oa(a.relatedTarget);
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
      if (e = vh[c]) {
        if (d = a.changedTouches) {
          Nf[b._uid] = e;
          var h = [];
          var l = a.altKey;
          var k = a.ctrlKey;
          var m = a.metaKey;
          var n = a.shiftKey;
          var q = Q();
          var u = "touchend" === c || "touchcancel" === c ? 0 : 0.5;
          for (g = d.length; g;) {
            var t = d[--g];
            var p = t.target;
            p = 3 === p.nodeType ? p.parentNode : p;
            c = oa(p);
            p = 5 > f.iOS ? c.offset() : p.getBoundingClientRect();
            var r = t.relatedTarget;
            h[g] = {type:e, pointerType:"touch", target:c, currentTarget:b, relatedTarget:r && oa(3 === r.nodeType ? r.parentNode : r), isPrimary:!0, hwTimestamp:q, timestamp:q, button:u ? 0 : -1, buttons:u ? 1 : 0, altKey:l, ctrlKey:k, metaKey:m, shiftKey:n, pointerId:t.identifier + 2, pageX:t.pageX, pageY:t.pageY, clientX:R(t.clientX) ? t.clientX : t.pageX - ze, clientY:R(t.clientY) ? t.clientY : t.pageY - Ae, offsetX:R(t.offsetX) ? t.offsetX : t[Ch + "X"] - (p.x || p.left || 0), offsetY:R(t.offsetY) ? 
            t.offsetY : t[Ch + "Y"] - (p.y || p.top || 0), radiusX:t.radiusX || 0, radiusY:t.radiusY || 0, rotationAngle:t.rotationAngle || 0, pressure:t.force || t.webkitForce || u, width:t.width || 0, height:t.height || 0};
          }
          return 1 === h.length ? h[0] : h;
        }
        if (Nf[b._uid] === e) {
          return delete Nf[b._uid], [];
        }
        this.type = e;
        this.pointerType = "mouse";
        this.button = h = a.button !== v ? a.button : a.which !== v ? a.which - 1 : -1;
        this.buttons = a.buttons !== v ? a.buttons : 0 === h ? 1 : 1 === h ? 2 : 2 === h ? 4 : 0;
        this.pressure = -1 !== h ? 0.5 : 0;
        e = a.target;
        this.target = oa(3 === e.nodeType ? e.parentNode : e);
        this.isPrimary = !0;
        this.hwTimestamp = this.timestamp = Q();
        this.altKey = a.altKey;
        this.ctrlKey = a.ctrlKey;
        this.metaKey = a.metaKey;
        this.shiftKey = a.shiftKey;
        this.pointerId = 1;
        this.clientX = a.clientX;
        this.clientY = a.clientY;
        this.pageX = a.pageX;
        this.pageY = a.pageY;
        this.offsetX = R(a.offsetX) ? a.offsetX : a.layerX;
        this.offsetY = R(a.offsetY) ? a.offsetY : a.layerY;
        if ("mousedown" === c && 2 === h && f.Prsto) {
          return h = [Mb(this), Mb(this)], h[1].type = "contextmenu", h;
        }
      } else {
        this.keyCode = ja(a.keyCode) ? a.keyCode : ja(a.charCode) ? a.charCode : a.which;
        this.charCode = ja(a.charCode) ? a.charCode : a.which;
        this.altKey = a.altKey || !!(a.zc & 1);
        this.ctrlKey = a.ctrlKey || !!(a.zc & 2);
        this.shiftKey = a.shiftKey || !!(a.zc & 4);
        this.metaKey = a.metaKey || !!(a.zc & 8);
        this.button = h = a.button !== v ? a.button : a.which !== v ? a.which - 1 : -1;
        this.buttons = a.buttons !== v ? a.buttons : 0 === h ? 1 : 1 === h ? 2 : 2 === h ? 4 : 0;
        if (e = a.target) {
          this.target = oa(3 === e.nodeType ? e.parentNode : e);
        }
        if (e = a.relatedTarget) {
          this.relatedTarget = oa(3 === e.nodeType ? e.parentNode : e);
        }
        "wheel" === d && (a.deltaY !== v ? (this.deltaX = a.deltaX, this.deltaY = a.deltaY, this.deltaZ = a.deltaZ || 0) : a.wheelDeltaY !== v ? (this.deltaX = a.wheelDeltaX / 120, this.deltaY = a.wheelDeltaY / 120, this.deltaZ = a.Ae / 120 || 0) : a.wheelDelta !== v ? (this.deltaX = this.deltaZ = 0, this.deltaY = a.wheelDelta / -120) : a.detail !== v ? (this.deltaX = this.deltaZ = 0, this.deltaY = "MozMousePixelScroll" === c ? a.detail / 45 : a.detail / 3) : this.deltaX = this.deltaY = this.deltaZ = 
        0);
      }
    }
    this.currentTarget = b;
    this.eventPhase = a.eventPhase;
    this.detail = a.detail;
  } : xe = function(a, b, c) {
    var d = a.type;
    this.type = Zc[d] || d;
    (this.target = oa(a.srcElement)) && !this.target._tag && (this.target = this.target.parent);
    this.currentTarget = b;
    this.relatedTarget = oa(a.fromElement || a.toElement);
    this.eventPhase = a.srcElement === c ? 2 : 3;
    this.charCode = this.keyCode = a.keyCode;
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
    if (d = vh[d]) {
      this.type = d, this.pointerType = "mouse", this.clientX = a.clientX, this.clientY = a.clientY, this.pageX = a.clientX + Da.scrollLeft, this.pageY = a.clientY + Da.scrollTop, 5 <= f.IE && (this.offsetX = a.offsetX, this.offsetY = a.offsetY), this.pressure = -1 !== b ? 0.5 : 0, this.isPrimary = !0, this.hwTimestamp = this.timestamp = Q(), this.pointerId = 1, this.tiltY = this.tiltX = this.height = this.width = this.rotationAngle = this.radiusY = this.radiusX = 0;
    }
  };
  document.onwheel === v && (f.Gecko && window.MouseScrollEvent ? 0 <= Pe(Df, "1.9.1") ? w.wheel = "MozMousePixelScroll" : 0 <= Pe(Df, "0.9.7") && (w.wheel = "DOMMouseScroll") : w.wheel = "mousewheel");
  if (f.Opera || f.Webkit || f.Blink || f.Khtml || f.AOSP || f.CrWV) {
    w.focusin = "DOMFocusIn", w.focusout = "DOMFocusOut";
  }
  window.onwebkitanimationend !== v && window.onanimationend === v ? (w.animationend = "webkitAnimationEnd", w.animationstart = "webkitAnimationStart", w.animationiteration = "webkitAnimationIteration") : window.onoanimationend !== v && window.onanimationend === v ? (w.animationend = "oAnimationEnd", w.animationstart = "oAnimationStart", w.animationiteration = "oAnimationIteration") : za && za.style.msAnimation !== v && za.style.animation === v && (w.animationend = "MSAnimationEnd", w.animationstart = 
  "MSAnimationStart", w.animationiteration = "MSAnimationIteration");
  window.onwebkittransitionend !== v && window.ontransitionend === v ? w.transitionend = "webkitTransitionEnd" : window.onotransitionend !== v && window.ontransitionend === v ? w.transitionend = 12 > f.Opera ? "oTransitionEnd" : "otransitionEnd" : window.onmoztransitionend !== v && window.ontransitionend === v && (w.transitionend = "mozTransitionEnd");
  navigator.pointerEnabled || (navigator.msPointerEnabled ? (w.pointerdown = "MSPointerDown", w.pointerup = "MSPointerUp", w.pointermove = ["MSPointerMove", "MSPointerHover"], w.pointercancel = "MSPointerCancel", w.pointerout = "MSPointerOut", w.pointerleave = "MSPointerLeave") : Ef ? (w.pointerdown = ["touchstart", "mousedown"], w.pointerup = ["touchend", "mouseup"], w.pointermove = ["touchmove", "mousemove"], w.pointercancel = "touchcancel", w.pointerleave = "touchleave") : (w.pointerdown = "mousedown", 
  w.pointerup = "mouseup", w.pointermove = "mousemove", w.pointerleave = za.onmouseleave !== v ? "mouseleave" : "mouseout", f.Prsto && (w.contextmenu = "mousedown")));
  var Dh;
  p.listenOnce(Dc, function() {
    var a = nb;
    a.cssText("width:10px;padding:1px;border:2px solid #0;margin:4px;");
    Dh = 10 === a.width() ? 3 : 1;
    1 === Dh && a.cssText("width:10px;padding:1px;border:2px solid red;margin:4px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;").width();
    Fb.boxShadow && 10 !== a.cssText(hd(wb.boxShadow) + ":10px 10px 0 0 #000;width:10px;").width() && (console.log(a.cssText() + a.width()), Fb.boxShadowLayoutBug = !0);
    a.cssText("position:absolute;top:0;left:0;margin:1px;border:2px solid #000;padding:4px;").append("<div></div>").firstChild().cssText("position:absolute;top:8px;left:8px;margin:16px;border:32px solid #666;padding:64px;").y();
    a.cssText("").empty();
  });
  var Vi = 5 > f.IE || !za.getBoundingClientRect ? 10 > f.Opera ? function(a) {
    var b = 0, c = 0;
    do {
      b += a.offsetLeft, c += a.offsetTop;
    } while (a = a.offsetParent);
    return {x:b, y:c};
  } : function(a) {
    var b = 0, c = 0, d = a, e = y;
    do {
      b += d.offsetLeft || 0, c += d.offsetTop || 0;
    } while (d = d.offsetParent);
    d = a;
    do {
      b -= d.scrollLeft || 0, c -= d.scrollTop || 0, d = d.parentNode;
    } while (d != e);
    return {x:b, y:c};
  } : "CSS1Compat" !== document.compatMode || f.Webkit ? function(a) {
    a = a.getBoundingClientRect();
    return {x:a.left + window.pageXOffset, y:a.top + window.pageYOffset};
  } : function(a) {
    a = a.getBoundingClientRect();
    return {x:a.left + za.scrollLeft - za.clientLeft, y:a.top + za.scrollTop - za.clientTop};
  }, ce = {checked:1, compact:1, declare:1, defer:1, disabled:1, ismap:1, multiple:1, nohref:1, noresize:1, noshade:1, nowrap:1, readonly:1, selected:1}, Bd = {"class":"className", accesskey:"accessKey", "accept-charset":"acceptCharset", bgcolor:"bgColor", cellpadding:"cellPadding", cellspacing:"cellSpacing", "char":"ch", charoff:"chOff", codebase:"codeBase", codetype:"codeType", colspan:"colSpan", datetime:"dateTime", "for":"htmlFor", frameborder:"frameBorder", "http-equiv":"httpEquiv", ismap:"isMap", 
  longdesc:"longDesc", maxlength:"maxLength", nohref:"noHref", readonly:"readOnly", rowspan:"rowSpan", tabindex:"tabIndex", usemap:"useMap", valuetype:"valueType", checked:"defaultChecked"}, Of = {INPUT:!0, TEXTAREA:!0, SELECT:!0, BUTTON:!0, OBJECT:!0, PARAM:!0}, Wi = {button:!0, hidden:!0, submit:!0, reset:!0, radio:!0, checkbox:!0}, qi = {value:!0, title:!0, alt:!0}, de = {};
  (function(a, b) {
    for (var c in a) {
      b[a[c]] = c;
    }
  })(Bd, de);
  var Eh = window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle, zg = {}, ri = 65, Ag = {}, wb = {}, ee = {}, Pf = {}, Bg = {BLACK:0, RED:16711680, LIME:65280, BLUE:255, YELLOW:16776960, AQUA:65535, CYAN:65535, MAGENTA:16711935, FUCHSIA:16711935, WHITE:16777215, GREEN:32768, PURPLE:8388736, MAROON:8388608, NAVY:128, OLIVE:8421376, TEAL:32896, GRAY:8421504, SILVER:12632256, DIMGRAY:6908265, SLATEGRAY:7372944, DARKGRAY:11119017, GAINSBORO:14474460, MIDNIGHTBLUE:1644912, 
  SLATEBLUE:6970061, MEDIUMBLUE:205, ROYALBLUE:4286945, DODGERBLUE:2003199, SKYBLUE:8900331, STEELBLUE:4620980, LIGHTBLUE:11393254, PALETURQUOISE:11529966, TURQUOISE:4251856, LIGHTCYAN:14745599, AQUAMARINE:8388564, DARKGREEN:25600, SEAGREEN:3050327, LIGHTGREEN:9498256, CHARTREUSE:8388352, GREENYELLOW:11403055, LIMEGREEN:3329330, YELLOWGREEN:10145074, OLIVEDRAB:7048739, DARKKHAKI:12367723, PALEGOLDENROD:15657130, LIGHTYELLOW:16777184, GOLD:16766720, GOLDENROD:14329120, DARKGOLDENROD:12092939, ROSYBROWN:12357519, 
  INDIANRED:13458524, SADDLEBROWN:9127187, SIENNA:10506797, PERU:13468991, BURLYWOOD:14596231, BEIGE:16119260, WHEAT:16113331, SANDYBROWN:16032864, TAN:13808780, CHOCOLATE:13789470, FIREBRICK:11674146, BROWN:10824234, SALMON:16416882, ORANGE:16753920, CORAL:16744272, TOMATO:16737095, HOTPINK:16738740, PINK:16761035, DEEPPINK:16716947, PALEVIOLETRED:14381203, VIOLET:15631086, PLUM:14524637, ORCHILD:14315734, DARKVIOLET:9699539, BLUEVIOLET:9055202, MEDIUMPURPLE:9662683, THISTLE:14204888, LAVENDER:15132410, 
  MISTYROSE:16770273, IVORY:16777200, LEMONCHIFFON:16775885}, wc = f.ActiveX && 9 > f.IE ? {opacity:2, boxShadow:3, textShadow:4, transform:5, dxtransform:7} : f.ActiveX && 9 <= f.IE && 10 > f.IE ? {textShadow:4} : null, vi = {px:0, em:1, cm:2, mm:3, "in":4, "%":5, pct:5, ms:6, s:7, "#":8, rgb:9, rgba:10}, xc = Eh ? function(a) {
    W && S();
    return a === ha && qa ? qa : a._fontSize ? a._fontSize : a._fontSize = a._rawObject ? parseFloat(Eh(a._rawObject, null).fontSize) : 0;
  } : 5 <= f.IE ? function(a) {
    W && S();
    if (a === ha && qa) {
      return qa;
    }
    if (a._fontSize) {
      return a._fontSize;
    }
    var b = a._rawObject.currentStyle.fontSize;
    var c = id(b);
    var d = c[0];
    c = c[1];
    if (0 === d) {
      if (d = Pf[b]) {
        return a._fontSize = d;
      }
    } else {
      if (b = ee[c]) {
        return a._fontSize = d / b;
      }
    }
    switch(c) {
      case "px":
        return a._fontSize = d;
      case "em":
        if (a.parent) {
          return a._fontSize = xc(a.parent) * d;
        }
        break;
      case "%":
        if (a.parent) {
          return a._fontSize = xc(a.parent) * d / 100;
        }
    }
    return 0;
  } : E.W ? function(a) {
    var b;
    W && S();
    if (a === ha && qa) {
      return qa;
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
  } : E.o ? function(a) {
    var b;
    W && S();
    if (a === ha && qa) {
      return qa;
    }
    if (a._fontSize) {
      return a._fontSize;
    }
    if (a._css && (b = a._css.fontSize)) {
      var c = id(b);
      var d = c[0];
      c = c[1];
      if (0 === d) {
        if (b = Pf[b]) {
          return a._fontSize = b;
        }
      } else {
        if (b = ee[c]) {
          return a._fontSize = d / b;
        }
      }
    } else {
      return (a._rawObject || ca(a)).insertAdjacentHTML("BeforeEnd", '<div id="ie4charsize" style="position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;">X</div>'), b = document.all.ie4charsize, d = b.offsetHeight, b.removeAttribute("id"), b.outerHTML = "", a._fontSize = d;
    }
    switch(c) {
      case "px":
        return a._fontSize = d;
      case "em":
        if (a.parent) {
          return a._fontSize = xc(a.parent) * d;
        }
        break;
      case "%":
        if (a.parent) {
          return a._fontSize = xc(a.parent) * d / 100;
        }
    }
    return 0;
  } : 0, Fb = {}, ti = {transitionDuration:f.Android && !f.Chrome && function(a) {
    return 0 === parseFloat(a) ? "0.001s" : a;
  }};
  r.CSS = {VENDER_PREFIX:wb, Support:Fb};
  (function() {
    var a = 5 > f.IE ? {} : document.createElement("div").style, b = a.cssText, c = "webkit Webkit Moz moz Ms ms O o khtml Khtml".split(" "), d = "opacity boxSizing boxShadow transform transformOrigin perspective transisiton transitionDelay transitionProperty transitionDuration transitionTimingFunction backfaceVisibility willChange filter userSelect touchSelect touchAction touchCallout contentZooming userDrag tapHighlightColor".split(" "), e, g, h;
    for (e = d.length; e;) {
      var l = g = d[--e];
      if (a[g] === v) {
        for (g = g.charAt(0).toUpperCase() + g.substr(1), h = c.length; h;) {
          var k = c[--h];
          if (a[k + g] !== v) {
            "ms" === k && (k = "Ms");
            "o" === k && (k = "O");
            wb[l] = k + g;
            break;
          }
        }
      } else {
        wb[l] = g;
      }
    }
    a.cssText = "background:rgba(0,0,0,0.5);border-color:transparent";
    Fb.rgba = !!a.background;
    Fb.transparent = !!a.borderColor;
    if (g = wb.boxShadow) {
      a.cssText = hd(g) + ":0 0", Fb.boxShadow = !!a[g], a.cssText = hd(g) + ":0 0, 0 0", Fb.boxShadowMulti = !!a[g], a.cssText = hd(g) + ":0 0 inset", Fb.boxShadowInset = a[g] && -1 !== a[g].indexOf("inset");
    }
    a.cssText = b;
  })();
  p.listenOnce(Dc, function() {
    var a = nb, b = ee, c = ["cm", "mm", "in", "pt", "pc"], d;
    for (d = c.length; d;) {
      var e = c[--d];
      b[e] = a.css("width", 10 + e).width() / 10;
    }
    b = Pf;
    c = "xx-large x-large large larger medium small smaller x-small xx-small".split(" ");
    a.css({lineHeight:"100%", height:"1em"}).text("X");
    for (d = c.length; d;) {
      e = c[--d], b[e] = a.css("fontSize", e).height();
    }
    a.cssText("").empty();
  });
  Ma.prototype.length = 0;
  Ma.prototype.each = function(a) {
    var b = this.length, c = 0, d;
    if (1 < arguments.length) {
      for (d = aa(arguments); c < b && (d[0] = c, !1 !== a.apply(this[c], d)); ++c) {
      }
    } else {
      for (; c < b && !1 !== a.call(this[c], c); ++c) {
      }
    }
    return this;
  };
  m.ab.push(function() {
    var a = Ma.prototype, b = P.prototype, c;
    for (c in b) {
      var d = b[c];
      V(d) && !a[c] && (a[c] = new Function(["var a=arguments,f=X.Node.prototype.", c, ",t=this,i,l=t.length;if(l)for(i=0;i<l;++i)if(i===l-1)return f.apply(t[i],a);else f.apply(t[i],a);return f.apply(t,a)"].join("")));
    }
  });
  var wi = {"":0, " ":1, ">":2, "+":3, "~":4, ",":5, "@":6}, xi = {"":0, tag:1, "#":2, ".":3, ":":4, "[":5, not:6, scope:7, root:8, link:9}, yi = {"==":1, "!=":2, "~=":3, "^=":4, "$=":5, "*=":6, "|=":7};
  r.Doc.find = He = Ma.prototype.find = Eg;
  var Gg = {root:function() {
    return Ya;
  }, target:{l:function(a, b) {
    for (var c = [], d = location.hash.slice(1), e = a.not, g = 0, h = -1, f; f = b[g]; ++g) {
      (f._id || f._attrs && f._attrs.name) === d ^ e && (c[++h] = f);
    }
    return c;
  }}, "first-child":{l:function(a, b) {
    return yc(-1, !0, a, b);
  }}, "last-child":{l:function(a, b) {
    return yc(1, !0, a, b);
  }}, "only-child":{l:function(a, b) {
    return yc(0, !0, a, b);
  }}, "first-of-type":{l:function(a, b) {
    return yc(-1, !1, a, b);
  }}, "last-of-type":{l:function(a, b) {
    return yc(1, !1, a, b);
  }}, "only-of-type":{l:function(a, b) {
    return yc(0, !1, a, b);
  }}, "nth-child":{l:function(a, b, c, d) {
    return he("firstChild", "next", !0, a, b, c, d);
  }}, "nth-last-child":{l:function(a, b, c, d) {
    return he("lastChild", "prev", !0, a, b, c, d);
  }}, "nth-of-type":{l:function(a, b, c, d) {
    return he("firstChild", "next", !1, a, b, c, d);
  }}, "nth-last-of-type":{l:function(a, b, c, d) {
    return he("lastChild", "prev", !1, a, b, c, d);
  }}, empty:{l:function(a, b) {
    for (var c = [], d = a.not, e = 0, g = -1, h, f, k; h = b[e]; ++e) {
      f = !0;
      for (k = h.firstChild(); k; k = k.next()) {
        if (k._tag || k._text) {
          f = !1;
          break;
        }
      }
      f ^ d && (c[++g] = h);
    }
    return c;
  }}, link:{l:function(a, b) {
    var c = document.links, d = [], e, g;
    if (!c) {
      return d;
    }
    var h = {};
    var f = a.not;
    for (e = 0; g = c[e]; ++e) {
      h[P(g)._uid] = !0;
    }
    e = 0;
    for (g = -1; c = b[e]; ++e) {
      h[c._uid] ^ f && (d[++g] = c);
    }
    return d;
  }}, lang:{l:function(a, b, c) {
    var d = [];
    a = a.not;
    var e = 0, g = -1, h, f, k;
    for (c = c.toLowerCase(); f = h = b[e]; ++e) {
      for (; f && !(k = f._attrs && f._attrs.lang);) {
        f = f.parent;
      }
      (!!k && 0 === k.toLowerCase().indexOf(c)) ^ a && (d[++g] = h);
    }
    return d;
  }}, enabled:{l:function(a, b) {
    return hf("disabled", !1, a, b);
  }}, disabled:{l:function(a, b) {
    return hf("disabled", !0, a, b);
  }}, checked:{l:function(a, b) {
    return hf("checked", !0, a, b);
  }}, contains:{l:function(a, b, c) {
    var d = [];
    a = a.not;
    for (var e = 0, g = -1, h; h = b[e]; ++e) {
      -1 < h.text().indexOf(c) ^ a && (d[++g] = h);
    }
    return d;
  }}}, je = function() {
    var a = "abcdefghijklmnopqrstuvwxyz! \t\r\n\f\b", b = {}, c;
    for (c = 26; c;) {
      b[a.charAt(--c)] = 2;
    }
    c = 26;
    for (a = a.toUpperCase(); c;) {
      b[a.charAt(--c)] = 1;
    }
    for (c = 33; 26 < c;) {
      b[a.charAt(--c)] = 16;
    }
    return b;
  }(), Di = {ADDRESS:!0, APPLET:!0, BLOCKQUOTE:!0, BUTTON:!0, CENTER:!0, DD:!0, DEL:!0, DIR:!0, DIV:!0, DL:!0, DT:!0, FIELDSET:!0, FORM:!0, FRAMESET:!0, HR:!0, IFRAME:!0, INS:!0, ISINDEX:!0, LI:!0, MAP:!0, MENU:!0, NOFRAMES:!0, NOSCRIPT:!0, OBJECT:!0, OL:!0, P:!0, PRE:!0, SCRIPT:!0, TABLE:!0, TBODY:!0, TD:!0, TFOOT:!0, TH:!0, THEAD:!0, TR:!0, UL:!0}, Ei = {ABBR:!0, ACRONYM:!0, APPLET:!0, B:!0, BASEFONT:!0, BDO:!0, BIG:!0, BR:!0, BUTTON:!0, CITE:!0, CODE:!0, DEL:!0, DFN:!0, EM:!0, FONT:!0, I:!0, IFRAME:!0, 
  IMG:!0, INPUT:!0, INS:!0, KBD:!0, LABEL:!0, MAP:!0, OBJECT:!0, Q:!0, S:!0, SAMP:!0, SCRIPT:!0, SELECT:!0, SMALL:!0, SPAN:!0, STRIKE:!0, STRONG:!0, SUB:!0, SUP:!0, TEXTAREA:!0, TT:!0, U:!0, VAR:!0}, Fi = {OLGROUP:!0, DD:!0, DT:!0, LI:!0, OPTIONS:!0, P:!0, TBODY:!0, TD:!0, TFOOT:!0, TH:!0, THEAD:!0, TR:!0}, Jg = {TH:{TD:!0}, TD:{TH:!0}, DT:{DD:!0}, DD:{DT:!0}, COLGROUP:{CAPTION:!0}, THEAD:{CAPTION:!0, COLGROUP:!0}, TFOOT:{CAPTION:!0, COLGROUP:!0, THEAD:!0, TBODY:!0}, TBODY:{CAPTION:!0, COLGROUP:!0, 
  THEAD:!0, TFOOT:!0}}, Ai = {SCRIPT:!0, STYLE:!0, PLAINTEXT:!0, XMP:!0, TEXTAREA:!0}, jf = !1, I = {qa:null, Ba:[], ea:!1, err:function(a) {
    I.qa.length = 0;
    !I.pd && r.N.warn("X_Dom_Parser() error " + a);
  }, ic:function(a, b, c) {
    var d, e = I.Ba, g = I.qa, h = e.length;
    h ? d = e[h - 1].create(a) : d = g[g.length] = rc(a);
    c || (e[h] = d);
    if (e = b.length) {
      for (g = {}; e;) {
        if (a = b[--e]) {
          H(a) ? (c = a, g[c] = !0) : (c = a.Jd, g[c] = a.Nd);
        }
      }
      d.attr(g);
    }
  }, hc:function() {
    0 < I.Ba.length && --I.Ba.length;
  }, Ha:function(a) {
    I.Ba.length ? I.Ba[I.Ba.length - 1].createText(a) : I.qa[I.qa.length] = ae(a);
  }, tc:da}, Gi = {ea:!1, err:function(a) {
    I.err(a);
    this.asyncDispatch(12);
  }, ic:I.ic, hc:I.hc, Ha:I.Ha, tc:da, fc:function(a) {
    this.asyncDispatch({type:13, Zd:a});
  }, gd:function() {
    var a = I.qa;
    delete I.qa;
    this.asyncDispatch({type:11, hb:a});
  }}, kd = [], Fh = 0, lf = !1, kb = 0, ib = !1, Qf = !!wb.transform, Gh = 5.5 <= f.IE && 9 > f.IE && f.ActiveX, md = !wb.perspective || f.Prsto && f.Android || f.IE && 7 <= f.Windows && 9 > f.Windows ? "" : " translateZ(0)", Hh = {x:NaN, y:NaN, zb:NaN, Ab:NaN, $b:NaN, ac:NaN, rotate:NaN, Xb:NaN, ub:NaN, skewX:NaN, Yb:NaN, xb:NaN, skewY:NaN, Zb:NaN, yb:NaN, Na:1, ob:1, eb:1, Oa:1, pb:1, fb:1, alpha:NaN, scrollX:NaN, qb:NaN, vb:NaN, scrollY:NaN, rb:NaN, wb:NaN}, Ih = {quadratic:function(a) {
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
  }}, P = r.Node = ma.inherits("X.Node", ba.NONE, {_uid:0, _flags:0, _rect:null, _fontSize:0, length:1, parent:null, _xnodes:null, _gpuParent:null, _tag:"", _text:"", _id:"", _className:"", _attrs:null, _newAttrs:null, _attrText:"", _css:null, _cssText:"", _anime:null, Constructor:function(a) {
    var b = mb.length, c, d;
    if ($d || this.constructor !== P) {
      $d = !1, this._tag = a.toUpperCase(), arguments[1] && this.attr(arguments[1]), (c = arguments[2]) && this[H(c) ? "cssText" : "css"](c);
    } else {
      if (be) {
        be = !1, this._text = a;
      } else {
        if (1 < arguments.length) {
          return new Ma(arguments);
        }
        if (ra(a) && a.length) {
          return new Ma(a);
        }
        switch(sc(a)) {
          case Wb:
          case mf:
            return a;
          case Bc:
            if (d = oa(a)) {
              return d;
            }
            this.parent = (c = a.parentNode || a.parentElement) && c.tagName && oa(c);
            this._rawObject = a;
            this._tag = a.tagName.toUpperCase();
            this._id = a.id;
            this._className = a.className;
            this.cssText(a.style.cssText);
            this._flags &= Sa;
            E.o ? a.setAttribute("UID", "" + b) : a.UID = b;
            break;
          case nd:
            if (d = oa(a)) {
              return d;
            }
            this.parent = oa(a.parentNode);
            this._rawObject = a;
            this._text = a.data;
            a.UID = b;
            break;
          case uc:
          case tc:
            return (d = vc(a, !0) && 1 < d.length) ? new Ma(d) : d.length ? d[0] : ge;
          default:
            if (ge) {
              return ge;
            }
            this.length = 0;
            return;
        }
      }
    }
    this.parent && this.parent._flags & A && (this._flags |= A);
    this._flags |= uh;
    mb[this._uid = b] = this[0] = this;
  }, width:function() {
    return db(this, "offsetWidth");
  }, height:function() {
    return db(this, "offsetHeight");
  }, clientWidth:function() {
    return db(this, "clientWidth");
  }, clientHeight:function() {
    return db(this, "clientHeight");
  }, scrollWidth:function() {
    return db(this, "scrollWidth");
  }, scrollHeight:function() {
    return db(this, "scrollHeight");
  }, scrollLeft:function() {
    return db(this, "scrollLeft");
  }, scrollTop:function() {
    return db(this, "scrollTop");
  }, x:function() {
    return db(this, "offsetLeft");
  }, y:function() {
    return db(this, "offsetTop");
  }, offset:function() {
    var a = this._flags, b = {x:0, y:0};
    if (0 === (a & A) || a & 4 || ha === this || Ya === this) {
      return b;
    }
    W && S();
    return (a = this._rawObject || ca && ca(this)) ? Vi(a) : b;
  }, attr:function(a) {
    var b = this._attrs, c, d;
    if (a && Z(a)) {
      if (!this._tag) {
        return this;
      }
      b || (b = this._attrs = {});
      var e = this._newAttrs || (this._newAttrs = {});
      for (d in a) {
        !0 === yg(this, b, e, d, a[d]) && (c = !0);
      }
      c && (delete this._attrText, this._flags |= 557056, this._flags & A && la());
      return this;
    }
    if (1 < arguments.length) {
      if (!this._tag) {
        return this;
      }
      !0 === yg(this, b || (this._attrs = {}), this._newAttrs || (this._newAttrs = {}), a, arguments[1]) && (delete this._attrText, this._flags |= 557056, this._flags & A && la());
      return this;
    }
    if (H(a) && this._tag) {
      switch(a) {
        case "id":
          return this._id;
        case "class":
        case "className":
          return this._className;
        case "tag":
        case "tagName":
          return this._tag;
        case "style":
        case "cssText":
          return this.cssText();
        case "src":
          if ("IFRAME" !== this._tag) {
            break;
          }
          if (this._newAttrs && Ka(a, this._newAttrs)) {
            return this._newAttrs[a];
          }
          if (e = E.o ? this._rawObject || ca(this) : this._rawObject) {
            return b || (b = this._attrs = {}), b[a] = e[a];
          }
          break;
        case "selected":
          f.WebKit && (e = this._rawObject) && (e.parentNode && e.selectedIndex);
        case "value":
          if ("INPUT" === this._tag && Wi[b.type]) {
            break;
          }
        case "checked":
        case "disabled":
        case "selectedIndex":
          if (Of[this._tag]) {
            if (this._newAttrs && Ka(a, this._newAttrs)) {
              return this._newAttrs[a];
            }
            if (e = E.o ? this._rawObject || ca(this) : this._rawObject) {
              return b || (b = this._attrs = {}), "TEXTAREA" === this._tag && "value" === a && 9 > f.IE ? b[a] = e.value.split("\r").join("") : b[a] = e[a];
            }
          }
      }
      return b && b[de[a] || a];
    }
  }, css:function(a) {
    var b = arguments, c = this._css, d = !this._tag || Lf[this._tag] || "SCRIPT" === this._tag, e;
    if (Z(a)) {
      if (d) {
        return this;
      }
      c || (c = this._css = {});
      var g = this._flags;
      for (e in a) {
        d = ff(e), b = a[e], c[d] !== b && (g = Cg(c, g, d, b));
      }
      this._flags = g |= lb | La;
      g & A && la();
      delete this._cssText;
      return this;
    }
    if (1 < b.length) {
      if (d) {
        return this;
      }
      c || (c = this._css = {});
      d = ff(a);
      b = b[1];
      if (c[d] === b) {
        return this;
      }
      this._flags = Cg(c, this._flags, d, b) | lb | La;
      this._flags & A && la();
      delete this._cssText;
      return this;
    }
    if (c && !d) {
      return c[ff(a)];
    }
  }, cssText:function(a) {
    var b, c;
    if (a === this._cssText && 0 === (this._flags & La)) {
      return this;
    }
    if ("" === a) {
      return delete this._css, delete this._cssText, this._flags = this._flags | lb | Xa, this._flags &= ~La, this._flags & A && la(), this;
    }
    if (H(a)) {
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
    this._flags & La && Tb(this);
    return this._cssText;
  }, find:Eg, animate:function(a) {
    var b = kd, c = a.from || {}, d = a.to || {}, e = a.duration, g = a.lazyRelease, h = a.easing, f = a.fallback;
    a = this._anime;
    if (!(this._flags & A)) {
      return alert("@animate \u8981\u7d20\u306f\u30c4\u30ea\u30fc\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u305b\u3093!"), this;
    }
    if (!a) {
      this._anime = a = Mb(Hh);
      var k = this._css && parseFloat(this._css.opacity);
      0 <= k && (a.alpha = k);
    }
    a.$b = a.x = T(c.x, a.x);
    a.ac = a.y = T(c.y, a.y);
    a.Xb = a.rotate = T(c.rotate, a.rotate);
    a.Yb = a.skewX = T(c.skewX, c.skew, a.skewX);
    a.Zb = a.skewY = T(c.skewY, c.skew, a.skewY);
    a.ob = a.Na = T(c.scaleX, c.scale, a.Na);
    a.pb = a.Oa = T(c.scaleY, c.scale, a.Oa);
    a.md = a.alpha = T(c.opacity, a.alpha);
    a.qb = a.scrollX = T(c.scrollX, a.scrollX);
    a.rb = a.scrollY = T(c.scrollY, a.scrollY);
    a.zb = T(d.x, a.x);
    a.Ab = T(d.y, a.y);
    a.ub = T(d.rotate, a.rotate);
    a.xb = T(d.skewX, d.skew, a.skewX);
    a.yb = T(d.skewY, d.skew, a.skewY);
    a.eb = T(d.scaleX, d.scale, a.Na);
    a.fb = T(d.scaleY, d.scale, a.Oa);
    a.Fc = T(d.opacity, a.alpha);
    a.vb = T(d.scrollX, a.scrollX);
    a.wb = T(d.scrollY, a.scrollY);
    ja(a.zb) && gc(a.x) && (a.x = a.$b = 0);
    ja(a.Ab) && gc(a.y) && (a.y = a.ac = 0);
    a.ub && gc(a.rotate) && (a.rotate = a.Xb = 0);
    a.xb && gc(a.skewX) && (a.skewX = a.Yb = 0);
    a.yb && gc(a.skewY) && (a.skewY = a.Zb = 0);
    a.duration = 0 <= e && ja(e) ? e : 0;
    a.qd = 0 <= g && ja(g) ? g : 0;
    a.Md = V(h) ? h : Ih[h] || Ih.circular;
    a.wc = !1;
    a.transform = (ja(a.x) || ja(a.y) || a.qd) && Qf;
    a.doScroll = 0 <= a.vb || 0 <= a.wb;
    a.Ja = 0;
    a.ed = f & 8 ? "right" : "left";
    a.fd = f & 16 ? "bottom" : "top";
    if (1 !== a.eb || 1 !== a.ob || 1 !== a.fb || 1 !== a.pb) {
      c = a.ob === a.pb && a.eb === a.fb, Qf ? a.transform = !0 : Gh && f & 32 ? a.Ja = 32 : f & 4 && c ? a.Ja = 4 : f & 2 && c ? a.Ja = 2 : f & 1 && (a.Ja = 1);
    }
    if (ja(a.rotate) || ja(a.skewX) || ja(a.skewY)) {
      Qf ? a.transform = !0 : Gh && f & 32 && (a.Ja = 32);
    }
    !a.duration && 6 <= a.m ? this.stop() : (a.m ? 4 > a.m ? (b.splice(b.indexOf(this), 1), b[b.length] = this, a.uid = ++Fh, ib = !0) : a.duration ? a.m = 6 : (5 !== a.m ? (a.m = 4, a.gc = !1) : a.m = 1, ib = !0) : (b[b.length] = this, a.m = 1, a.uid = ++Fh, ib = !0), lf || (lf = !0, W ? (kb && (kb = dd(kb)), Fa.listen(jb, Vb)) : (Fa.unlisten(jb, Vb), kb = le(Vb))));
    return this;
  }, stop:function(a) {
    var b = this._anime, c = kd;
    if (!b || !b.m) {
      return this;
    }
    switch(b.m) {
      case 6:
      case 2:
      case 3:
        ib = !0;
      case 1:
        var d = !0;
      case 4:
      case 7:
        a & 1 && Ke(b, Hh);
        if (d) {
          break;
        }
        b.zb = b.x;
        b.Ab = b.y;
        b.ub = b.rotate;
        b.xb = b.skewX;
        b.yb = b.skewY;
        b.eb = b.Na;
        b.fb = b.Oa;
        b.Fc = b.alpha;
        b.vb = b.scrollX;
        b.wb = b.scrollY;
        b.m = 4;
        ib = !0;
      case 5:
        b.gc = !(a & 2);
    }
    d && (c.splice(c.indexOf(this), 1), b.m = 0);
    return this;
  }, create:function(a, b, c) {
    if (this._tag) {
      return this.append(a = rc(a, b, c)), a;
    }
  }, createAt:function(a, b, c, d) {
    if (this._tag) {
      return this.appendAt(a, a = rc(b, c, d)), a;
    }
  }, createText:function(a) {
    if (this._tag) {
      return this.append(a = ae(a)), a;
    }
  }, createTextAt:function(a, b) {
    var c;
    if (this._tag) {
      return this.appendAt(a, c = ae(b)), c;
    }
  }, createRange:function(a, b, c) {
    return Xi(this, a, b, c);
  }, clone:function(a) {
    var b, c;
    if (this._tag) {
      $d = !0;
      var d = P(this._tag, Mb(this._attrs), Mb(this._css)).attr({id:this._id}).className(this._className);
      this._flags & Ea && (d._flags |= Ea);
      this._flags & vb && (d._flags |= vb);
      if (a && (b = this._xnodes) && (c = b.length)) {
        for (a = 0; a < c; ++a) {
          d.append(b[a].clone(!0));
        }
      }
      return d;
    }
    be = !0;
    return P(this._text);
  }, append:nf, appendAt:function(a, b) {
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
    switch(sc(b)) {
      case Bc:
      case nd:
        b = P(b);
        break;
      case uc:
      case tc:
        b = vc(b, !0);
        for (c = b.length; c;) {
          this.appendAt(a, b[--c]);
        }
        return this;
      case Wb:
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
        5 > f.IE && !b._tag && 0 === (this._flags & Xb) && (this._flags |= Yb);
        break;
      default:
        return this;
    }
    b.parent = this;
    this._xnodes.splice(a, 0, b);
    this._flags & A && (b._flags |= A, b._xnodes && ne(b._xnodes, !0), la());
    this._flags & Ea && (b._flags |= Ea);
    this._flags & vb && (b._flags |= vb);
    return this;
  }, appendTo:function(a, b) {
    switch(sc(a)) {
      case Bc:
        a = P(a);
        break;
      case uc:
        a = vc(a, !0), a = a[0] || a;
      case Wb:
        break;
      default:
        return this;
    }
    ja(b) ? a.appendAt(b, this) : a.append(this);
    return this;
  }, prev:Pg, next:function(a) {
    var b = this.parent;
    if (a === v) {
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
  }, swap:function(a) {
    return this.parent ? 1 === arguments.length ? this.prev(a).remove() : Pg.apply(this, arguments).remove() : this;
  }, remove:function() {
    var a = this.parent;
    if (!a) {
      return this;
    }
    this._anime && this._anime.m && (console.log("Animation \u4e2d\u306e REMOVE"), Lg(this));
    delete this.parent;
    a._xnodes.splice(a._xnodes.indexOf(this), 1);
    this._flags & A ? (this._flags = this._flags & ~A & ~Cc, this._xnodes && ne(this._xnodes, !1), E.o ? this._rawObject || ca(this) ? (Za[Za.length] = this, la()) : this._tag || 0 !== (a._flags & Xb) || (a._flags |= Yb) : (a = this._rawObject) && a.parentNode && a.parentNode.tagName && (Za[Za.length] = this, la())) : E.o || (a = this._rawObject) && a.parentNode && a.parentNode.tagName && (Za[Za.length] = this, la());
    return this;
  }, empty:function() {
    var a = this._xnodes, b;
    if (a && (b = a.length)) {
      for (delete this._xnodes; b;) {
        a[--b].kill();
      }
      a.length = 0;
    }
    return this;
  }, contains:function(a) {
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
  }, getChildAt:function(a) {
    var b = this._xnodes;
    return b && 0 <= a && a < b.length && b[a];
  }, numChildren:function() {
    var a = this._xnodes;
    return a ? a.length : 0;
  }, firstChild:function() {
    return this._xnodes && this._xnodes[0];
  }, lastChild:function() {
    var a = this._xnodes;
    return a && a[a.length - 1];
  }, getOrder:function() {
    var a = this.parent;
    return this === Ya ? 0 : a ? a._xnodes.indexOf(this) : -1;
  }, className:function(a) {
    if (a === v) {
      return this._className;
    }
    if (this._className === a) {
      return this;
    }
    if (a && H(a)) {
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
    this._flags |= 16384;
    this._flags & A && la();
    return this;
  }, addClass:function(a) {
    var b = a.split(" "), c = b.length, d = this._className, e;
    for (a = ""; c;) {
      (e = b[--c]) && !this.hasClass(e) && (a += (a ? " " : "") + e);
    }
    return a ? this.className((d ? d + " " : "") + a) : this;
  }, removeClass:function(a) {
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
  }, toggleClass:function(a, b) {
    var c;
    if (b !== v) {
      return b ? this.addClass(a) : this.removeClass(a);
    }
    var d = a.split(" ");
    for (c = d.length; c;) {
      var e = d[--c];
      this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
    }
    return this;
  }, hasClass:function(a) {
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
  }, html:function(a) {
    var b, c, d;
    if (a !== v) {
      if (!this._tag) {
        return this.text(a);
      }
      this.empty();
      a && nf.apply(this, vc(a, !0));
      return this;
    }
    if (!this._tag) {
      return this._text;
    }
    this._flags & La && Tb(this);
    a = Gb ? ["<", this._tag, this._id ? ' id="' + this._id + '"' : "", this._className ? ' class="' + this._className + '"' : "", this._flags & 524288 ? ef(this) : this._attrText, this._cssText ? ' style="' + this._cssText + '"' : "", ">"] : [];
    var e = a.length;
    if ((b = this._xnodes) && (d = b.length)) {
      Gb || (Gb = this);
      for (c = 0; c < d; ++c) {
        a[e] = b[c].html(), ++e;
      }
      Gb === this && (Gb = null);
    }
    !Gb || kf[this._tag] || (a[e] = "</" + this._tag + ">");
    return a.join("");
  }, text:function(a) {
    var b, c, d;
    if (a !== v) {
      null === a && (a = "");
      if (!this._tag) {
        return this._text !== a && (a ? this._text = a : delete this._text, this._flags |= 8192, this._flags & A && la()), this;
      }
      if ((b = this._xnodes) && 1 === b.length && !b[0]._tag) {
        return b[0].text(a), this;
      }
      if (!a) {
        return this.empty();
      }
      this.empty().createText(a);
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
  }, call:function(a) {
    var b = arguments, c = b.length - 1, d, e, g, h, l;
    switch(a) {
      case "isSVG":
        return !!(this._flags & Ea);
      case "isVML":
        return !!(this._flags & vb);
      case "nodeType":
        return this._tag ? 1 : 3;
      case "outerHTML":
        return Gb = ha, b = this.html(), Gb = null, b;
      case "treeIsDirty":
        return !!W;
      case "fontSize":
        return this._flags & A ? xc(this) : 0;
      case "inGPU":
        return !!(this._flags & (yb | Ub));
      case "isGPUChild":
        if (this._flags & A) {
          for (d = this; d = d.parent;) {
            if (d._flags & (yb | Ub)) {
              return !0;
            }
          }
        }
        return !1;
      case "containGPU":
        return !1;
      case "canAnimateNow":
        return this._flags & A && 6 === Mg(this, !0, !0);
      case "animeState":
        return this._anime ? this._anime.m : 0;
      case "animeProgress":
        return this._anime && 7 === this._anime.m ? this._anime.fc : 0;
    }
    W && S();
    if (d = this._rawObject || E.o && ca(this)) {
      if ("scrollTo" === a) {
        d.scrollLeft = b[1] || 0, d.scrollTop = b[2] || 0;
      } else {
        if ("inView" === a) {
          if (!(this._flags & A)) {
            return {isInView:!1};
          }
          b = y;
          var k = d;
          for (h = l = e = g = 0; k !== b;) {
            d = k.parentNode || k.parentElement;
            var m = d.clientHeight;
            c = d.clientWidth;
            var n = d.scrollHeight;
            var p = d.scrollWidth;
            if (m < p || c < n) {
              n = k.offsetLeft + h;
              p = k.offsetTop + l;
              e = e || k.offsetWidth;
              k = g || k.offsetHeight;
              var q = d.scrollLeft;
              g = d.scrollTop;
              if (g < p + k && p < g + m && q < n + e && n < q + c) {
                var t = n < q ? "right" : q + c < n + e ? "left" : "both";
                var r = p < g ? "bottom" : g + m < p + k ? "top" : "both";
                h = "right" === t ? 0 : n - q;
                l = "bottom" === t ? 0 : p - g;
                e = "both" === t ? e : "right" === t ? q + c - n : n + e - q;
                g = "both" === r ? k : "bottom" === r ? g + m - p : p + k - g;
              } else {
                return {isInView:!1};
              }
            }
            k = d;
          }
          return {isInView:!0};
        }
        m = d[a];
        if (V(m)) {
          return c ? (b = aa(b), b.shift(), m.apply(d, b)) : d[a]();
        }
        if (9 > f.IE && (cg(m) || Z(m))) {
          if (c) {
            b = aa(b);
            b.shift();
            m = [];
            for (h = 0; h < c; ++h) {
              m[h] = "_" + h;
            }
            m = m.join(",");
            return Function(m, ["return this.", a, "(", m, ")"].join("")).apply(d, b);
          }
          return d[a]();
        }
      }
    }
  }, each:function(a) {
    if (1 < arguments.length) {
      var b = aa(arguments);
      b[0] = 0;
      a.apply(this, b);
    } else {
      a.call(this, 0);
    }
    return this;
  }}), Wb = 1, Bc = 2, nd = 3, uc = 4, tc = 5, mf = 7, Ng = 8, Og = 9, Jh = !f.MacIE && 8 >= f.IE, Kh = !(9 > f.IE), Rf = !!Cc, $d = !1, be = !1, Gb = null, W = 0, zi = E.o ? da : function(a) {
    return fc(a.ea) ? a.ea : a.ea = a._rawObject.createElement("p").tagName !== a._rawObject.createElement("P").tagName;
  }, mb = [], ge = mb[0] = P(), Ya, jd, ha, nb, yd, Za = [], ca = E.o && function(a) {
    return a._rawObject || (a._rawObject = document.all["ie4uid" + a._uid] || a._id && document.all[a._id]);
  }, Qg = !1, od = E.W ? function(a, b, c, d, e, g) {
    var h = a._rawObject, l, k;
    if (a._flags & yb) {
      return console.log("\u66f4\u65b0\u306eskip " + a._className + !!(a._flags & Ab)), a._flags & Ab && Cd(a, h), h;
    }
    a._flags & Ub && (console.log("GPU \u89e3\u653e "), a._flags &= xb);
    a._flags & ld && (a._flags &= xb, a._flags |= yb);
    if (a._flags & 4) {
      if (Rf) {
        return h && h.parentNode && zb(a), c;
      }
      h && (h.style.display = "none");
      return h && h.nextSibling === c ? h : c;
    }
    d |= a._flags;
    if (a._flags & Cc && 0 === (d & 28672)) {
      return c;
    }
    if (!h) {
      a._tag ? Jh ? (a._flags & La && Tb(a, !0), h = document.createElement(["<", a._tag, ' UID="', a._uid, '"', a._id ? ' id="' + a._id + '"' : "", a._className ? ' class="' + a._className + '"' : "", ef(a, !0), a._cssText ? ' style="' + a._cssText + '"' : "", ">"].join(""))) : h = a._flags & Ea ? document.createElementNS("http://www.w3.org/2000/svg", a._tag.toLowerCase()) : document.createElement(a._tag) : (a._flags &= Sa, h = 8 > f.IE ? document.createTextNode(Rc(a._text).split("\n").join(Qc)) : 
      document.createTextNode(Rc(a._text)), f.IE || (h.UID = a._uid));
      a._rawObject = h;
      Kh || (c ? b.insertBefore(h, c) : b.appendChild(h));
      a._tag && (oc(a, !0), a._flags |= 262144, Jh ? (a._flags &= Sa, a._newAttrs && (a._flags |= 32768), a._flags |= Xa) : (h.UID = a._uid, a._newAttrs = a._attrs, a._flags &= Sa, a._flags = a._flags | 57344 | lb | Xa, !f.Gecko || "IFRAME" !== a._tag || a._attrs && a._attrs.src || a.attr("src", "about:blank")));
      var m = !0;
    } else {
      if (h.parentNode !== b || c && h.nextSibling !== c) {
        c ? b.insertBefore(h, c) : b.appendChild(h);
      }
    }
    a._listeners && 0 === (a._flags & 262144) && (oc(a, !0), a._flags |= 262144);
    var n = a._css && 0 <= a._css.opacity && a._css.opacity;
    e *= n || 1;
    d & Ab && (delete a._fontSize, Cd(a, h, n, e, d));
    if (Rf && a._tag) {
      if ("none" === h.runtimeStyle.display) {
        return zb(a), a._flags |= Cc, c;
      }
      a._flags &= ~Cc;
    }
    a._flags & fe && (g[g.length] = a);
    if ((l = a._xnodes) && (k = l.length)) {
      for (; k;) {
        var p = od(l[--k], h, p, d, e, g);
      }
    }
    m && Kh && (c ? b.insertBefore(h, c) : b.appendChild(h), f.Gecko && "IFRAME" === a._tag && h.contentWindow && (h.contentWindow.location.replace = h.src));
    return h;
  } : E.o ? function(a, b, c, d) {
    var e = a._rawObject || ca(a), g, f, l;
    if (!a._tag) {
      return a._flags & 8192 && Cd(a, e), e;
    }
    if (a._flags & 4) {
      return e && (e.style.display = "none", "none" !== e.style.display) ? (zb(a), c) : e || c;
    }
    if (e) {
      d |= a._flags;
      c = (b = a._xnodes) ? b.length : 0;
      if (f = !!(a._flags & Yb)) {
        for (a._flags &= ~Yb, g = 0; g < c; ++g) {
          if (a._flags = b[g]._tag ? a._flags | zd : a._flags | Nc, a._flags & Oc === Oc) {
            var k = !0;
            break;
          }
        }
      }
      if (a._flags & Xb || a._flags & Oc === zd) {
        for (g = 0; g < c; ++g) {
          var m = od(b[g], e, m, d);
        }
      } else {
        if (k) {
          k = [];
          for (g = 0; g < c; ++g) {
            k[g] = Be(b[g], !1);
          }
          e.innerHTML = k.join("");
          for (g = 0; g < c; ++g) {
            Sf(b[g]);
          }
          a._flags |= Xb;
        } else {
          if (a._flags & Nc) {
            f = f || !1;
            for (g = 0; g < c; ++g) {
              k = b[g], k._flags & Ab && (k._flags &= Sa, f = !0);
            }
            f && (e.innerHTML = a.text());
          }
        }
      }
      d & Ab && delete a._fontSize;
      a._flags &= -4097;
      a._flags & Ab && Cd(a, e);
    } else {
      c ? c.insertAdjacentHTML("AfterEnd", Be(a, !1)) : b.insertAdjacentHTML("AfterBegin", Be(a, !1)), Sf(a), e = a._rawObject || ca(a);
    }
    (l = a._anime) && 6 <= l.m && l.doScroll && (6 === l.m ? (a = l.qb, a === a ? e.scrollLeft = a : l.qb = e.scrollLeft, a = l.rb, a === a ? e.scrollTop = a : l.rb = e.scrollTop) : (e.scrollLeft = l.scrollX, e.scrollTop = l.scrollY));
    return e;
  } : function() {
  }, Cd = E.W ? function(a, b, c, d, e) {
    var g, h;
    if (a._tag) {
      a._flags & 8192 && (a._id ? a._flags & Ea ? b.setAttribute("id", a._id) : b.id = a._id : b.id && b.removeAttribute("id"));
      a._flags & 16384 && (a._className ? a._flags & Ea ? b.setAttribute("class", a._className) : b.className = a._className : b.className && b.removeAttribute(8 > f.IE ? "className" : "class"));
      if (a._flags & 32768 && (g = a._newAttrs || a._attrs)) {
        for (h in g) {
          var l = g[h];
          switch(a._tag + h) {
            case "TEXTAREAvalue":
              if (!f.MacIE && 5 <= f.IE && 5 > f.IE || f.ieExeComError && 6 <= f.IE && 7 > f.IE) {
                b.firstChild ? b.firstChild.data = l || "" : b.appendChild(document.createTextNode(l || ""));
                continue;
              }
              break;
            case "IFRAMEsrc":
              if (f.Gecko && b.contentWindow) {
                b.contentWindow.location.replace = b.src = l || "";
                continue;
              }
          }
          l === v ? b.removeAttribute(Bd[h] || h) : a._flags & Ea ? b.setAttribute(h, l) : b[Bd[h] || h] = ce[h] ? h : l;
        }
        delete a._newAttrs;
      }
      if (e & 0 && 0 <= c) {
        var k = !0;
        a._css.opacity = d;
        a._flags & lb ? a._flags |= La : a._flags & Xa || (a._flags |= Xa);
      }
      a._flags & lb ? (a._flags & La ? Tb(a) : a._cssText) ? 9 > f.Opera || 1 > f.Gecko ? b.setAttribute("style", a._cssText) : b.style.cssText = a._cssText : 6 > f.IE || 528 > f.WebKit ? b.style.cssText = "" : b.removeAttribute("style") : a._flags & Xa && ((l = gf(a)) ? (b.style.filter = l, a._flags |= 2097152) : (b.style.removeAttribute("filter"), a._flags &= -2097153));
      k && (a._css.opacity = c);
    } else {
      b.data = 8 > f.IE ? Rc(a._text).split("\n").join(Qc) : Rc(a._text);
    }
    a._flags &= Sa;
  } : E.o ? function(a, b) {
    var c, d, e;
    if (a._tag) {
      if (a._flags & 8192 && b.setAttribute("id", a._id || "ie4uid" + a._uid), a._flags & 16384 && (a._className ? b.className = a._className : b.removeAttribute("class")), a._flags & lb ? (a._flags & La ? Tb(a) : a._cssText) ? b.style.cssText = a._cssText : (b.style.cssText = "", b.removeAttribute("style")) : a._flags & Xa && ((e = gf(a)) ? (b.style.filter = e, a._flags |= 2097152) : (b.style.removeAttribute("filter"), a._flags &= -2097153)), a._flags & 32768 && (c = a._newAttrs || a._attrs)) {
        for (d in c) {
          (e = c[d]) === v ? b.removeAttribute(Bd[d] || d) : b.setAttribute(Bd[d] || d, ce[d] ? d : e);
        }
        delete a._newAttrs;
      }
    } else {
      b.innerText = a._text;
    }
    a._flags &= Sa;
  } : function() {
  }, Be = E.o && function(a, b) {
    var c = a._uid, d, e, g;
    if (a._tag) {
      b || zb(a, !1);
      a._flags & La && Tb(a, !0);
      c = ["<", a._tag, " id=", a._id || "ie4uid" + c, ' UID="', c, '"', a._className ? ' class="' + a._className + '"' : "", ef(a, !0), a._cssText ? ' style="' + a._cssText + '"' : "", ">"];
      var f = c.length;
      if ((d = a._xnodes) && (g = d.length)) {
        a._flags &= ~Yb;
        for (e = 0; e < g && !(a._flags = d[e]._tag ? a._flags | zd : a._flags | Nc, a._flags & Oc === Oc); ++e) {
        }
        if (a._flags & Oc === Nc) {
          c[f] = a.text(), ++f;
        } else {
          for (e = 0; e < g; ++e) {
            c[f] = Be(d[e], !0), ++f;
          }
          a._flags |= Xb;
        }
      }
      kf[a._tag] || (c[f] = "</" + a._tag + ">");
      a._newAttrs && (a._flags |= 32768);
    } else {
      c = ["<FONT id=ie4uid", c, ' UID="', c, '">', a._text, "</FONT>"], delete a._rawObject;
    }
    return c.join("");
  }, Sf = E.o && function(a) {
    var b, c;
    if (!a._tag) {
      return a;
    }
    if ((b = a._xnodes) && (c = b.length)) {
      for (; c;) {
        Sf(b[--c]);
      }
    }
    a._flags & (32768 | Xa) ? Cd(a, a._rawObject || ca(a)) : a._flags &= Sa;
    oc(a, !0);
  }, zb = E.W ? function(a, b) {
    var c = a._xnodes, d = a._rawObject, e, g;
    if (c && (g = c.length)) {
      for (e = 0; e < g; ++e) {
        var h = c[e];
        h._tag && zb(h, !0);
      }
    }
    d && (a._flags & 262144 && (a._listeners && oc(a, !1), a._flags &= -262145), Rf && d.filters && d.filters.length && (b = !1, delete a._rawObject, !Of[a._tag] || a._newAttrs && Ka("value", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.value = d.value), "OPTION" !== a._tag || a._newAttrs && Ka("selected", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selected = d.selected), "SELECT" !== a._tag || a._newAttrs && Ka("selectedIndex", a._newAttrs) || (a._attrs || (a._attrs = {}), 
    a._attrs.selectedIndex = d.selectedIndex, a._attrs.value = d.value), "INPUT" !== a._tag || !a._attrs || "checkbox" !== a._attrs.type && "radio" !== a._attrs.type || a._newAttrs && Ka("checked", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.checked = d.checked), d.innerHTML = ""), f.MacIE ? !b && d.parentNode && d.parentNode.tagName && m.Ta(d) : !b && d.parentNode && d.parentNode.tagName && d.parentNode.removeChild(d));
  } : E.o ? function(a, b) {
    var c = a._xnodes, d = a._rawObject || ca(a), e, g;
    if (c && (g = c.length)) {
      for (e = 0; e < g; ++e) {
        zb(c[e], !0);
      }
    }
    d && (a._listeners && oc(a, !1), !Of[a._tag] || a._newAttrs && Ka("value", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.value = d.value), "OPTION" !== a._tag || a._newAttrs && Ka("selected", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selected = d.selected), "SELECT" !== a._tag || a._newAttrs && Ka("selectedIndex", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.selectedIndex = d.selectedIndex, a._attrs.value = d.value), "INPUT" !== a._tag || !a._attrs || "checkbox" !== 
    a._attrs.type && "radio" !== a._attrs.type || a._newAttrs && Ka("checked", a._newAttrs) || (a._attrs || (a._attrs = {}), a._attrs.checked = d.checked), d.removeAttribute("id"), b || (d.outerHTML = ""), delete a._rawObject);
  } : function() {
  };
  p.listenOnce(30, zb, [Ya, !0]);
  m.Qa = !0;
  m.mc = function(a) {
    var b = " " + a.className + " ";
    a = (a.tagName || "").toUpperCase();
    return -1 === b.indexOf(" skip-cleanup ") && (Ui[a] || -1 !== b.indexOf(" cleanup-target "));
  };
  f.MacIE ? (m.Ta = function(a) {
    var b = a.parentNode;
    3 !== a.nodeType && alert(a.nodeType + "\n" + (a.outerHTML || a.data));
    1 === a.nodeType ? b && b.removeChild(a) : 3 === a.nodeType && b && y.appendChild(a);
  }, m.Gd = [], m.ke = function() {
    for (var a = m.Gd, b = 0, c; 5 > b && a.length;) {
      c = a.shift(), c.parentNode && ++b;
    }
  }) : 8 > f.Opera && (m.Ta = function(a) {
    (1 === a.nodeType || 3 === a.nodeType) && a.parentNode && a.parentNode.removeChild(a);
  });
  m.ad = E.W ? function() {
    function a(b, c) {
      for (var d = aa(b.childNodes), e = 0, g = d.length, h, l, n; e < g; ++e) {
        switch(h = d[e], h.nodeType) {
          case 1:
            l = h.tagName.toUpperCase();
            if (Lf[l]) {
              xd.appendChild(h);
              continue;
            } else {
              if (m.mc(h)) {
                b.removeChild(h);
                continue;
              } else {
                h.childNodes && h.childNodes.length && a(h, c || Mf[l]);
              }
            }
            n = null;
            break;
          case 3:
            if (l = c ? h.data : hc(h.data), !n && " " !== l && l.length) {
              h.data = l;
              n = h;
              break;
            } else {
              n && (n.data += l);
            }
          default:
            8 > f.Opera ? m.Ta(h) : b.removeChild(h);
        }
      }
    }
    var b = y, c, d;
    if (m.Qa) {
      jf = !0;
      a(f.MacIE ? c = b.cloneNode(!0) : b);
      if (f.MacIE) {
        document.write(c = c.innerHTML);
      } else {
        if (c = 8 >= f.IE ? b.innerHTML.split(Qc).join("") : b.innerHTML, "fastinnerhtml!" === c) {
          c = "";
          var e = 0;
          for (d = b.childNodes.length; e < d; ++e) {
            var g = b.childNodes[e];
            c += g.outerHTML || g.data;
          }
        }
      }
      b.appendChild(m.vc = b = document.createElement("div"));
      b.style.cssText = "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;";
      b.setAttribute("style", "position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;");
      Kg(c, !0).listen(13, m.Jb).listenOnce(11, m.Jb);
    }
  } : function() {
    var a = ha._rawObject;
    if (m.Qa) {
      var b = a.innerHTML;
      a.insertAdjacentHTML("BeforeEnd", '<div id="_xdom_builder_progress" style="position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;"></div>');
      m.vc = document.all._xdom_builder_progress;
      Kg(b, !0).listen(13, m.Jb).listenOnce(11, m.Jb);
    }
  };
  p.listenOnce(5, m.ad);
  m.Jb = function(a) {
    var b = m.vc;
    switch(a.type) {
      case 13:
        b.style.width = (100 * a.Zd | 0) + "%";
        break;
      case 11:
        var c = ha._xnodes = [];
        c.push.apply(c, a.hb);
        b.style.width = "100%";
        m.rc(ha, y.childNodes || y.children, b);
        delete m.ad;
        delete m.vc;
    }
  };
  m.rc = function(a, b, c, d) {
    var e = d ? 0 : aa(a._xnodes), g = d ? 0 : e.length, h = d ? d.stack : [], l = d ? d.done : 0, k = Q();
    b = d ? d.current : {yc:a, hb:e, bc:g, sb:0, Vb:aa(b), ga:0, Da:null, ld:0};
    for (var n, q, r; b || (b = h.pop());) {
      q = b.sb;
      g = b.bc;
      if (q < g) {
        for (a = b.yc, e = b.hb; n = e[q];) {
          if (r = m.jd(a, n, b), ++q, ++l, r) {
            b.sb = q, h[h.length] = b, b = r, q = 0, g = r.bc, a = n, e = r.hb;
          } else {
            if (k + Ua <= Q()) {
              b.sb = q;
              d && (d.current = q < g && b, d.done = l);
              ka(0, m.rc, [null, null, c, d || {stack:h, current:q < g && b, done:l}]);
              c.style.width = (100 * (1 - l / mb.length) | 0) + "%";
              return;
            }
          }
        }
      }
      b = null;
    }
    console.log("xtree \u4f5c\u6210\u5b8c\u4e86");
    p.asyncDispatch(6);
    6 > f.IE ? c.outerHTML = "" : c.parentNode.removeChild(c);
    delete m.rc;
    delete m.jd;
    delete m.Qa;
    delete m.mc;
    jf = !1;
  };
  m.jd = E.W ? function(a, b, c) {
    var d = c.Vb, e = d.length, g = c.Da, h = c.Dc, l;
    for (b.parent = a; c.ga < e; ++c.ga) {
      var k = d[c.ga];
      var n = k.tagName && k.tagName.toUpperCase();
      if (1 !== k.nodeType && 3 !== k.nodeType || "!" === n || n && "/" === n.charAt(0)) {
        8 > f.Opera || f.MacIE ? m.Ta(k) : k.parentNode.removeChild(k);
      } else {
        if (b._tag) {
          if (3 === k.nodeType) {
            if (!(l = k.data) || " " === (l = hc(l))) {
              8 > f.Opera || f.MacIE ? m.Ta(k) : k.parentNode.removeChild(k);
              continue;
            }
            alert("1:[" + a._tag + ">" + b._tag + "] !== " + k.nodeType + "\n" + k.data);
          } else {
            if (Lf[n]) {
              alert(n);
              continue;
            } else {
              if (b._tag !== n) {
                alert("2:[" + a._tag + ">" + b._tag + " len:" + (b._xnodes ? b._xnodes.length : "") + "] !== " + n + " " + (k.childNodes ? k.childNodes.length : "") + "\n" + k.outerHTML);
              } else {
                if (b._rawObject = k, "/" === n.charAt(0) && (n = n.slice(1)), b._tag = n, b._flags |= A, b._flags &= Sa, k.UID = b._uid, c.Da = null, "TEXTAREA" === n) {
                  b.attr("value", b.html()).empty();
                } else {
                  if (k.childNodes && k.childNodes.length) {
                    return ++c.ga, {yc:b, hb:aa(b._xnodes), Da:null, ld:0, sb:0, bc:b._xnodes.length, Vb:aa(k.childNodes), ga:0, Dc:h || Mf[n]};
                  }
                }
              }
            }
          }
          ++c.ga;
          break;
        }
        if (3 !== k.nodeType) {
          if (!(l = b._text) || " " === hc(l)) {
            console.log("[" + a._tag + "> UID:" + b._uid + " len:" + b._text.length + " code : " + b._text.charCodeAt(0) + "," + b._text.charCodeAt(1) + "] destroyed.");
            b.kill();
            break;
          }
          alert(a._tag + ' > "' + b._text + '" !== ' + n + "\nprev : " + (b.prev() && b.prev().html()) + "\nnext : " + (b.next() && b.next().html()) + "\nhtml : " + k.outerHTML);
          break;
        }
        ++c.ga;
        b._rawObject = k;
        b._flags |= A;
        b._flags &= Sa;
        b._text = k.data;
        h ? g && (g.text(g._text + b._text), console.log("[" + a._tag + ">" + b._uid + "] xtext,destroy ... "), b.kill()) : ((l = b._text) && " " !== (l = hc(l)) || (console.log("[" + a._tag + ">" + b._uid + "] destroy ... "), b.kill()), g ? (g.text(g._text + l), console.log("[" + a._tag + ">" + b._uid + "] xtext,destroy ... "), b.kill()) : b.text(l));
        c.Da = g || b;
        break;
      }
    }
  } : function(a, b, c) {
    var d = c.Vb, e = c.ga, g = d.length, f = c.Da, l = c.Dc;
    b.parent = a;
    if (b._tag) {
      for (; e < g; ++e, ++c.ga) {
        f = d[e];
        var k = f.tagName;
        if ("!" !== k && "/" !== k.charAt(0)) {
          if (b._tag !== k) {
            alert(b._tag + "  !== " + k + "\nxnode.html():" + b.Kd("cite") + "\nelm.outerHTML:" + f.outerHTML);
          } else {
            ++c.ga;
            b._rawObject = f;
            b._flags |= A;
            b._flags &= Sa;
            if (m.mc(f)) {
              b.kill();
              break;
            }
            !b._id && f.setAttribute("id", "ie4uid" + b._uid);
            f.setAttribute("UID", b._uid);
            "INPUT" === k && (b._attrs ? b._attrs.type || (b._attrs.type = "text") : b._attrs = {type:"text"});
            a._flags |= zd;
            c.Da = null;
            if ("TEXTAREA" === k) {
              b.attr("value", b.html()).empty();
            } else {
              if (b._xnodes && b._xnodes.length) {
                return {yc:b, hb:aa(b._xnodes), Da:null, ld:0, sb:0, bc:b._xnodes.length, Vb:aa(f.children), ga:0, Dc:l || Mf[k]};
              }
            }
            break;
          }
        }
      }
      b._rawObject || alert(b._tag + " " + b._id + " !== none...");
    } else {
      b._flags |= A, b._flags &= Sa, l ? f && (f.text(f._text + b._text), b.kill()) : (k = b._text) && " " !== (k = hc(k)) ? f ? (f.text(f._text + k), b.kill()) : b.text(k) : (b.kill(), b = null), c.Da = f || b, a._flags |= Nc;
    }
  };
  console.log("X.Dom.Builder");
  console.log("bootTime : " + (Q() - r.ze));
  var oe, pd, Zb = !document.selection || 9 <= f.IE || f.Edge, Xi = Od("X.TextRange", {xnode:null, by:"", v1:0, v2:0, Constructor:function(a, b, c, d) {
    oe || (oe = Zb ? document.createRange() : y.createTextRange());
    this.jc = a;
    switch(b) {
      case "selection":
        pd || (pd = Zb ? window.getSelection() : document.selection.createRange);
      case "point":
      case "char":
        this.by = b;
        break;
      default:
        d = c, c = b;
    }
    "selection" !== b ? (this.v1 = c || 0, this.v2 = d || 0) : this.getOffset();
  }, move:function(a, b) {
    var c = this.jc, d = c._rawObject;
    0 <= a ? this.v1 = a : (this.v1 += a, 0 > this.v1 && (this.v1 = 0));
    R(b) && (0 <= b ? this.v2 = b : (this.v2 += b, this.v2 < this.v1 && (this.v2 = this.v1)));
    "TEXTAREA" === c._tag && (9 > f.IE || f.Prsto ? (c = (9 > f.IE ? d.value.split("\r").join("") : d.value).length, f.Prsto && af(d), d = d.createTextRange(), this.v1 === this.v2 && 0 === this.v1 ? d.collapse(!0) : this.v1 !== this.v2 || this.v1 < c ? (d.collapse(), this.v1 === this.v2 ? d.move("character", this.v1) : (d.moveEnd("character", this.v2), d.moveStart("character", this.v1))) : d.collapse(!1), d.select()) : d.setSelectionRange && d.setSelectionRange(this.v1, this.v2));
  }, select:function() {
  }, getRect:function() {
    var a = Sg(this);
    if (a) {
      if (Zb) {
        if (a.od) {
          a = a.od.getBoundingClientRect();
          var b = {x:a.left, y:a.top, width:a.width, height:a.height};
        }
      } else {
        b = {x:a.boundingLeft, y:a.boundingTop, width:a.boundingWidth, height:a.boundingHeight};
      }
    }
    return b || {x:0, y:0, width:0, height:0};
  }, getOffset:function() {
    var a = this.jc, b, c, d;
    if ("TEXTAREA" === a._tag) {
      if ((b = a._rawObject) && a._flags & A) {
        if (9 > f.IE) {
          var e = pd().duplicate();
          e.parentElement() !== b && (af(b), e = y.createTextRange(), e.moveToElementText(b), e.collapse(!0), e.select());
          var g = y.createTextRange();
          g.moveToElementText(b);
          g.setEndPoint("EndToStart", e);
          a = y.createTextRange();
          a.moveToElementText(b);
          a.setEndPoint("StartToEnd", e);
          var h = d = b = !1;
          var l;
          var k = l = g.text;
          var m = c = e.text;
          var n = a.text;
          do {
            b || (0 == g.compareEndPoints("StartToEnd", g) ? b = !0 : (g.moveEnd("character", -1), g.text == k ? l += "\r\n" : b = !0)), d || (0 == e.compareEndPoints("StartToEnd", e) ? d = !0 : (e.moveEnd("character", -1), e.text == m ? c += "\r\n" : d = !0)), h || (0 == a.compareEndPoints("StartToEnd", a) ? h = !0 : (a.moveEnd("character", -1), a.text != n && (h = !0)));
          } while (!b || !d || !h);
          e = l.split("\r").join("").length;
          return {from:this.v1 = e, to:this.v2 = e + c.split("\r").join("").length};
        }
        b.setSelectionRange && (12 > f.IE ? (c = b.value.length, c = {from:this.v1 = b.selectionStart < c ? b.selectionStart : c, to:this.v2 = b.selectionEnd < c ? b.selectionEnd : c}) : c = {from:this.v1 = b.selectionStart, to:this.v2 = b.selectionEnd});
      }
    } else {
      if (e = Sg(this)) {
        if (Zb) {
          g = e.od, c = {offset:e.offset, from:this.v1 = g.startOffset, to:this.v2 = g.endOffset, text:oa(e.text)};
        } else {
          if (g = oe.duplicate(), g.moveToElementText(a._rawObject), g.setEndPoint("EndToStart", e), g = g.text.length, Tg(a, a = []), a.length) {
            b = 0;
            for (d = -1; h = a[++d];) {
              c = h._rawObject.data.length;
              if (g < b + c) {
                break;
              }
              b += c;
            }
            c = {offset:b, from:this.v1 = g - b, to:this.v2 = g - b + e.text.length, text:h};
          }
        }
      }
    }
    return c || {from:-1, to:-1};
  }, text:function(a) {
    var b = this.jc;
    if (a !== v && "TEXTAREA" === b._tag) {
      var c = b._rawObject;
      var d = 9 > f.IE ? c.value.split("\r").join("") : c.value;
      if ("char" === this.by) {
        b.Kd({value:d.substr(0, this.v1) + a + d.substr(this.v2)});
      } else {
        var e = this.getOffset();
        b = e.from;
        e = e.to;
        9 > f.IE ? (c = pd(), c.text = a) : (d = d.substr(0, b) + a + d.substr(e), c.value = d);
        e = e !== b ? b + a.length : e + a.length;
        this.move(e, e);
      }
    }
  }}), Tf = f.IE && f.ActiveX ? !(5.5 > f.IE) & f.ActiveX ? function() {
    var a = sb("ShockwaveFlash.ShockwaveFlash");
    return parseFloat(a && a.GetVariable("$version").split("WIN ")[1]) || 0;
  }() : 0 : parseFloat(Ba(navigator, "plugins>Shockwave Flash>version") || 0), Lh = f.IE && f.ActiveX ? f.ActiveX && 6 <= f.IE ? function() {
    for (var a = sb("AgControl.AgControl"), b = a ? 5 : 0; b; --b) {
      if (a.IsVersionSupported(b + ".0")) {
        return b;
      }
    }
    return 0;
  }() : 0 : parseFloat(Ba(navigator, "plugins>Silverlight Plug-In>version") || 0), Yi = f.IE && f.ActiveX ? 5.5 > f.IE || !f.ActiveX ? 0 : function() {
    var a = sb("UnityWebPlayer.UnityWebPlayer.1");
    return a ? parseFloat(a.GetPluginVersion()) : 0;
  }() : parseFloat(Ba(navigator, "plugins>Unity Player>version") || 0), Zi = window.N || (f.ActiveX && 6 <= f.IE ? sb("Gears.Factory") : Ba(navigator, "mimeTypes>application/x-googlegears>enabledPlugin")), Hb = f.IE && f.ActiveX ? function() {
    var a = sb("WMPlayer.OCX.7");
    return a ? parseFloat(a.versionInfo) : sb("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}") ? 6.4 : 0;
  }() : 0;
  r.Plugin = {Flash:Tf, Silverlight:Lh, Unity:Yi, Gears:!!Zi, WMP:Hb};
  var Uf = f.IE && !f.MacIE, pf = [];
  Tf && P.inherits("X.Plugin.Flash", ba.va, {Constructor:function(a, b) {
    Uf ? this.Super("object", {classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0", id:a.id, name:a.id, width:a.width, height:a.height, se:['<param name="flashVars" value="', a.de, '"><param name="movie" value="', a.src, '"><param name="quality" value="', a.td, '"><param name="bgcolor" value="', a.bgcolor, '"><param name="allowfullscreen" value="', a.Pd, '"><param name="wmode" value="', a.yd, '"><param name="allowScriptAccess" value="', 
    a.ae, '"><param name="AllowNetworking" value="', a.Td, '">'].join("")}, b) : this.Super("embed", {type:"application/x-shockwave-flash", xe:"http://www.macromedia.com/go/getflashplayer", id:a.id, name:a.id, width:a.width, height:a.height, src:a.src, he:a.de, td:a.td, bgcolor:a.bgcolor, me:a.Pd, yd:a.yd, oe:a.ae, ne:a.Td}, b);
    this.listenOnce("load", this, Ji);
  }, listen:function(a) {
    "message" === a && (r.Plugin.ie = Ii);
    return rg.apply(this, arguments);
  }, flashVars:function(a) {
    return a === v ? Uf ? this.firstChild().attr("value") : this.attr("FlashVars") : Uf ? (this.firstChild().attr("value", a), this) : this.attr("FlashVars", a);
  }});
  r.Util = {};
  var Mh = r.Util.NinjaIframe = P.inherits("NinjaIframe", {la:null, Ra:"", xa:"", Nb:!1, Constructor:function(a) {
    this.xa = "hidden-iframe-" + Q();
    this.Super("IFRAME", {className:"hidden-iframe", scrolling:"no", Id:"no", frameborder:0, tabindex:-1, name:this.xa, id:this.xa});
    9 > f.IE && this.attr("src", "about:blank");
    f.Webkit || this.css({position:"absolute"});
    a && (this.Ra = a);
    this.appendTo(nb).listenOnce(U, pe);
    p.listenOnce(hb, this, pe);
  }, refresh:function(a) {
    this.Nb = !1;
    if (!this.la) {
      return this.Ra = a, this;
    }
    5 <= f.IE && 6 > f.IE ? this.la.location.href = "about:blank" : this.la.location.reload();
    if (!H(a)) {
      return this;
    }
    this.Ra = a;
    9 > f.IE || qf(this);
    return this;
  }});
  r.JSON = 8 <= f.IE && 9 > f.IE ? {stringify:function(a) {
    return unescape(JSON.stringify(a));
  }, parse:JSON.parse} : window.JSON || {stringify:rf, parse:qe};
  var sf = {};
  r.Util.Image = {getActualDimension:Ug};
  r.XML = Ga;
  Ga.prototype.tagName = "";
  Ga.prototype.length = 1;
  Ga.prototype.parent = Vg;
  Ga.prototype.has = Wg;
  Ga.prototype.get = Xg;
  Ga.prototype.val = Yg;
  Ga.prototype.find = Zg;
  var ah = {"first-child":{l:function(a, b) {
    return Ec(-1, !0, a, b);
  }}, "last-child":{l:function(a, b) {
    return Ec(1, !0, a, b);
  }}, "only-child":{l:function(a, b) {
    return Ec(0, !0, a, b);
  }}, "first-of-type":{l:function(a, b) {
    return Ec(-1, !1, a, b);
  }}, "last-of-type":{l:function(a, b) {
    return Ec(1, !1, a, b);
  }}, "only-of-type":{l:function(a, b) {
    return Ec(0, !1, a, b);
  }}, "nth-child":{l:function(a, b, c, d) {
    return se("firstChild", "nextSibling", !0, a, b, c, d);
  }}, "nth-last-child":{l:function(a, b, c, d) {
    return se("lastChild", "previousSibling", !0, a, b, c, d);
  }}, "nth-of-type":{l:function(a, b, c, d) {
    return se("firstChild", "nextSibling", !1, a, b, c, d);
  }}, "nth-last-of-type":{l:function(a, b, c, d) {
    return se("lastChild", "previousSibling", !1, a, b, c, d);
  }}, empty:{l:function(a, b) {
    for (var c = [], d = a.not, e = 0, g = -1, f, l, k; f = b[e]; ++e) {
      l = !0;
      for (k = f.firstChild; k; k = k.nextSibling) {
        if (1 === k.nodeType || 3 === k.nodeType && k.nodeValue) {
          l = !1;
          break;
        }
      }
      l ^ d && (c[++g] = f);
    }
    return c;
  }}, contains:{l:function(a, b, c) {
    var d = [];
    a = a.not;
    for (var e = 0, g = -1, f, l = ""; f = b[e]; ++e) {
      switch(f.nodeType) {
        case 1:
          l = f.innerText || f.text || f.textContent;
          break;
        case 3:
          l = f.nodeValue;
      }
      -1 < l.indexOf(c) ^ a && (d[++g] = f);
    }
    return d;
  }}}, re = new fb;
  fb.prototype.length = 0;
  fb.prototype.Xa = null;
  fb.prototype.parent = Vg;
  fb.prototype.has = Wg;
  fb.prototype.get = Xg;
  fb.prototype.val = Yg;
  fb.prototype.find = Zg;
  r.Util.Embed = P.inherits("Embed", {pe:0, la:null, Ra:"", xa:"", Nb:!1, Constructor:function() {
    this.Super(9 > f.IE ? "OBJECT" : "EMBED", {tabindex:-1, name:this.xa, id:this.xa});
  }});
  var $i = r.Util.Window = ma.inherits("X.Window", {Constructor:function(a) {
    var b = a.url, c = window.open(b || "", a.name || "", a.params || ""), d = a.html;
    p.listenOnce(30, this, tf);
    this.listenOnce([30, U], tf);
    Tc(this, {page:c, H:fa(a.interval || 500, 0, this, Ki)});
    !b && d && this.write(d);
  }, closed:function() {
    var a = z(this);
    return a ? Ta(Ba, [a.page, "closed"]) : !0;
  }, url:function(a) {
    var b = z(this);
    b && (b.page.location.href = a);
    return this;
  }, write:function(a) {
    var b = z(this);
    (b = b && Ta(Ba, [b.page, "document"])) ? (b.open(), b.write(a || ""), b.close()) : this.asyncDispatch(12);
    return this;
  }, find:function(a) {
    var b = z(this);
    if (b) {
      return Ta(Ba, [b.page, a]);
    }
  }, focus:function() {
    var a = z(this);
    a && a.page.focus();
    return this;
  }});
  r.Util.HTMLParser = function(a, b) {
    var c, d = {ea:!!b.isXML, err:b.onError || da, ic:b.tagStart || da, hc:b.tagEnd || da, Ha:b.chars || da, tc:b.commnet || da, gd:c = b.onAsyncComplete};
    ie(a, d, !!c);
  };
  r.Net = ma.inherits("X.Net", ba.NONE, {Constructor:function(a, b) {
    var c, d, e;
    if (Z(c = a)) {
      if (H(d = c.xhr)) {
        var g = Gc;
      } else {
        if (H(d = c.jsonp)) {
          g = uf;
        } else {
          if (H(d = c.img || c.image)) {
            g = ue;
          } else {
            if (H(d = c.form)) {
              g = te;
            } else {
              if (g = aj[c.type]) {
                d = c.url;
              } else {
                alert("X.Net args error");
                return;
              }
            }
          }
        }
      }
      if (!H(d)) {
        alert("X.Net args error");
        return;
      }
    } else {
      if (H(a)) {
        d = a, Z(c = b) ? g = c.type || Gc : (g = Gc, c = {url:d, method:"GET"});
      } else {
        alert("X.Net args error");
        return;
      }
    }
    (e = c.auth) && delete c.auth;
    c = Le(c);
    e && (c.auth = e);
    c.params && g !== te && (d = Md(d, c.params), delete c.params);
    g === Gc && (c.method = c.method || (c.postdata ? "POST" : "GET"), c.dataType = c.dataType || Sc(d));
    c.Sd = g;
    c.url = d;
    Tc(this, c);
    this.listen(U, qd);
    ob[ob.length] = this;
    !sa && rd();
  }, state:function() {
    return this === sa ? Fc ? 3 : 2 : 0 <= ob.indexOf(this) ? 1 : 0;
  }});
  var Gc = 1, uf = 2, te = 3, ue = 4, aj = {xhr:Gc, jsonp:uf, form:te, img:ue, image:ue}, ob = [], q, na, xa, ve, $a, Na, sa, $b, Fc, Ib = window.XMLHttpRequest && function() {
    return ab || (ab = new XMLHttpRequest);
  }, ab = Ib && Ib(), Nh = ab && ab.withCredentials !== v, Oh = ab && ab.onprogress !== v, Ce = ab && !!ab.upload, Jc = window.XDomainRequest && function() {
    return De || (De = new XDomainRequest);
  }, De = Jc && Jc(), Dd = 0, Ph = "", Pc, Jb = f.ActiveX && (5 <= f.IE && 7 > f.IE || sh) && function() {
    return sb(Ph);
  }, bj = 9 > f.IE;
  Jb && function() {
    for (var a = "Msxml2.XMLHTTP.6.0 Msxml2.XMLHTTP.3.0 Msxml2.XMLHTTP.5.0 Msxml2.XMLHTTP.4.0 Msxml2.XMLHTTP Microsoft.XMLHTTP".split(" "), b = [6, 3, 5, 4, 2, 1], c = -1, d; 5 > c;) {
      if (d = sb(a[++c])) {
        Dd = b[c];
        Ph = a[c];
        Pc = d;
        return;
      }
    }
    Jb = null;
  }();
  r.XHR = {W3C:Ib ? 1 : 0, MSXML:Jb ? 2 : 0, XDR:Jc ? 4 : 0, FLASH:4 <= Tf ? 8 : 0, GADGET:5.5 <= f.IE || !f.IE ? 16 : 0, PROGRESS:Oh, UPLOAD_PROGRESS:Ce, CORS:De || Nh, BINARY:Hd};
  Dd && (r.XHR.MSXML_VERSION = Dd);
  if (ab || Pc) {
    m.Tc = function() {
      q = ua(ma(), m.Uc, !0);
      delete m.Tc;
      delete m.Uc;
      return q;
    }, m.Uc = {_rawType:1, Fa:!1, wa:!1, Dd:"", fa:"", C:!1, T:!1, Ib:!1, ta:0, v:0, load:function(a) {
      var b = q._rawObject, c = a.method, d = a.url, e = !1 !== a.async, g = a.username, h = a.password, l = a.headers || {}, k = a.postdata || "", m = a.timeout || 20000, n = q.fa = a.dataType, p = !Qe(d), r = kg(d), t;
      if (!b || p !== q.Fa || Jb && r !== q.wa) {
        b && q.unlisten(["load", "readystatechange", "progress", "error", "timeout"]);
        var w = !0;
        q._rawObject = b = p ? Nh ? Ib() : Jc() : r ? Jb ? Pc = Pc || Jb() : Ib() : Ib ? Ib() : Pc = Pc || Jb();
        q.Fa = Jc && p;
        q.wa = !Ib || r && Jb;
      }
      b.open(c, d, e, g, h);
      switch(n) {
        case "":
        case "txt":
        case "text":
          q.fa = "text";
          break;
        case "json":
          q.fa = "json";
          break;
        case "document":
        case "xml":
        case "html":
        case "htm":
        case "svg":
        case "vml":
          q.fa = "document";
          break;
        case "blob":
        case "arraybuffer":
          q.fa = n;
      }
      b.responseType !== v && q.fa && ("json" === q.fa ? b.responseType = 10 > f.Gecko ? "moz-json" : f.Gecko ? "json" : "" : b.responseType = q.fa);
      if (!q.wa && b.overrideMimeType) {
        switch(n) {
          case "document":
          case "xml":
          case "html":
          case "htm":
          case "svg":
          case "vml":
            var y = "text/xml";
            break;
          case "json":
            y = "application/json";
            break;
          case "mp3":
            y = "mpeg";
          case "weba":
            y = y || "webm";
          case "opus":
            y = y || "ogg";
          case "ogg":
          case "wav":
          case "aac":
            y = "audio/" + (y || n);
            break;
          case "m4a":
          case "mp4":
            y = "audio/x-" + n;
            break;
          case "jpeg":
          case "jpg":
          case "png":
          case "gif":
          case "bmp":
          case "ico":
            y = "text/plain; charset=x-user-defined";
        }
        (a.mimeType || y) && b.overrideMimeType(a.mimeType || y);
      }
      if (!q.Fa && (q.wa ? 3 <= Dd : b.setRequestHeader)) {
        for (t in-1 !== "document json text".indexOf(q.fa) && f.Safari && (l["If-Modified-Since"] = "Thu, 01 Jun 1970 00:00:00 GMT"), p || l["X-Requested-With"] || (l["X-Requested-With"] = "XMLHttpRequest"), "POST" !== c || l["Content-Type"] || (l["Content-Type"] = Z(k) ? "application/x-www-form-urlencoded" : "text/plain"), l) {
          l[t] !== v && b.setRequestHeader(t, l[t] + "");
        }
      }
      q.wa || b.timeout === v ? q.v = ka(m, q.Yd) : b.timeout = m;
      q.C = !0;
      b.send(Z(k) ? fg(k) : "" + k);
      e && 4 !== b.readyState ? w && (q.wa ? b.onreadystatechange = q.handleEvent : Oh || q.Fa ? q.listen(["load", "progress", "error", "timeout"]) : 8 === f.IE ? q.listen(["readystatechange", "error", "timeout"]) : 7 === f.IE ? q.listen(["readystatechange", "error"]) : q.listen(["load", "readystatechange", "error", "timeout"]), Ce && b.upload.addEventListener("progress", q.sd)) : ka(32, q, [{type:"readystatechange"}]);
    }, cancel:function() {
      q._rawObject.abort();
      q.T = !0;
    }, reset:function() {
      q.Dd = q.fa = "";
      q.T = q.C = q.Ib = !1;
      q.v && O(q.v);
      q.ta = q.v = 0;
      q._rawObject.abort();
      if (q.Ib || bj && !q.wa) {
        Ce && ab.upload.removeEventListener("progress", q.sd), oc(q, !1), q._rawObject = null, q.Fa ? (De = null, delete q.Fa) : ab = null, q.unlisten(["load", "readystatechange", "progress", "error", "timeout"]);
      }
    }, handleEvent:function(a) {
      function b(a) {
        if (a && (420 > f.Webkit || 4 > f.KHTML)) {
          var b = escape(a);
          !b.match("%u") && b.match("%") && (a = decodeURIComponent(b));
        }
        return a;
      }
      var c = q._rawObject, d = !q.T, e;
      switch(a && a.type || "readystatechange") {
        case "readystatechange":
          switch(c.readyState) {
            case 0:
            case 1:
              return;
            case 2:
              d && q.asyncDispatch({type:13, percent:0});
              return;
            case 3:
              d && q.asyncDispatch({type:13, percent:99.9 > q.ta ? 99.9 : (q.ta + 100) / 2});
              return;
            case 4:
              if (100 === q.ta) {
                return;
              }
              break;
            default:
              return;
          }case "load":
          if (!q.C) {
            break;
          }
          q.ta = 100;
          q.C = !1;
          a = c.status;
          q.Fa ? e = {"Content-Type":c.contentType} : (q.wa ? 3 <= Dd : c.setRequestHeader) && (e = c.getAllResponseHeaders()) && (e = Li(e));
          if (!a && "file:" === location.protocol || 100 > a && (a = 200) || 200 <= a && 400 > a || 1223 === a && (a = 204) || f.Webkit && a === v) {
            switch(q.fa) {
              case "text":
                var g = Ta(Ba, [c, "responseText"]);
                g = b(g);
                break;
              case "json":
                g = Ta(Ba, [c, "response"]) || Ta(Ba, [c, "responseText"]);
                H(g) && (g = qe(b(g)));
                break;
              case "document":
                g = c.responseXML || c.response || c.responseText;
                break;
              case "blob":
              case "arraybuffer":
                g = c.response || c.responseText;
            }
          }
          g ? q.asyncDispatch(32, {type:11, status:a || 200, response:g, headers:e || null}) : q.asyncDispatch(32, {type:12, status:a || 400, headers:e || null});
          break;
        case "progress":
          a.lengthComputable && (q.ta = a.loaded / a.total * 100, d && 100 > q.ta && q.asyncDispatch({type:13, percent:q.ta}));
          break;
        case "error":
          q.C = !1;
          q.Ib = f.Prsto || f.Webkit;
          d && q.asyncDispatch(32, {type:12, status:c.status});
          break;
        case "timeout":
          q.C = !1, q.Ib = !!f.Gecko, q.asyncDispatch({type:12, timeout:!0, status:408});
      }
    }, Yd:function() {
      var a = q._rawObject, b = !q.T || !q.C;
      if (b || 3 > a.readyState) {
        q.C = !1, b && q.asyncDispatch({type:12, timeout:!0, status:408});
      }
      q.v = 0;
    }, sd:Ce && function(a) {
      !q.T && q.asyncDispatch({type:13, percent:q.ta, uploadPercent:a.loaded / a.total * 100});
    }};
  }
  m.Qc = function(a, b, c, d) {
    a === Kb && na.C && (na.C = !1, na.asyncDispatch({type:b ? 11 : 12, response:qe(b)}), Hc && O(Hc), console.log("ms : " + c + " speed : " + (b.length + (d || 0)) / c * 1000 + " \u30d0\u30a4\u30c8/\u79d2."));
  };
  var Kb = Math.random(), Bb, dh = 0, Hc;
  m.Rc = function() {
    window.__jsonpcb__ = m.Qc;
    na = ua(Mh(), m.Sc);
    delete m.Qc;
    delete m.Rc;
    delete m.Sc;
    return na;
  };
  m.Sc = {C:!1, T:!1, load:function(a) {
    var b = a.url, c = a.callbackName;
    a = a.charset;
    var d = RegExp ? "js/libs/json2.js" : "js/libs/json2_regfree.js";
    if (!jg(b)) {
      return na.asyncDispatch(12);
    }
    c || (c = ic(b.split("?")[1]).callback) || (b += "&callback=cb", c = "cb");
    a = a ? ' charset="' + a + '"' : "";
    f.Prsto ? (b = [window.JSON ? "" : '<script src="' + d + '">\x3c/script>', "<script>", 'onunload=function(){im.onload=im.onerror=""};', "nw=+new Date;", "function ", c, "(o){if(nw){nw-=+new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw", window.JSON ? 18103 : 0, ");nw=0}}", "\x3c/script>", "<script", a, ' id="jp">\x3c/script>', '<img id="im" src="', b, '" onload="jp.src=im.src" onerror="jp.src=im.src">'], Bb = 2) : 5 > f.IE || f.MacIE ? (b = ['<script id="jn">\x3c/script>', "<script", 
    a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw-16,", 18103, ")}", 'function t1(){document.all.jn.src="', d, '";id=setTimeout("t2()",16);nw=+new Date}', 'id=setTimeout("t1()",16);', 'function t2(){if(window.JSON){document.all.jp.src="', b, '"}else{id=setTimeout("t2()",16)}}', "\x3c/script>"], Bb = 3) : 8 > f.IE ? (b = ['<script id="jn">\x3c/script>', "<script", a, ' id="jp">\x3c/script>', 
    "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw-16,", 18103, ")}", 'function t1(){jn.src="', d, '";id=setTimeout(t2,16);nw=+new Date}', "id=setTimeout(t1,16);", 'function t2(){if(window.JSON){jp.src="', b, '"}else{id=setTimeout(t2,16)}}', "\x3c/script>"], Bb = 3) : 9 > f.IE ? (b = ["<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "nw=0;", "function ", c, "(o){nw-=+new Date;parent.__jsonpcb__(" + 
    Kb + ",parent.X.JSON.stringify(o),-nw)}", 'function tm(){jp.src="', b, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"], Bb = 2) : 10 > f.IE ? (b = ["<script", a, ' id="jp">\x3c/script>', "<script>", "onunload=function(){clearTimeout(id)};", "function ", c, "(o){nw-=+new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw)}", 'function tm(){jp.src="', b, '";nw=+new Date}', "id=setTimeout(tm,16);", "\x3c/script>"], Bb = 2) : window.JSON ? (b = ["<script>", "nw=+new Date;", "function ", 
    c, "(o){if(nw){nw-=+new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw);nw=0}}", "\x3c/script>", "<script", a, ' src="', b, '">\x3c/script>'], Bb = 1) : (b = ["<script>", "function ", c, "(o){if(nw){nw-=new Date;parent.__jsonpcb__(" + Kb + ",JSON.stringify(o),-nw,", 18103, ");nw=0}}", "nw=+new Date;", "\x3c/script>", '<script src="', d, '">\x3c/script>', "<script", a, ' src="', b, '">\x3c/script>'], Bb = 2);
    na.refresh(b.join("")).listen(["ninjaload", "ninjaerror"], ch);
    na.C = !0;
  }, cancel:function() {
    na.reset();
    na.T = !0;
  }, reset:function() {
    na.C = na.T = !1;
    na.unlisten(["ninjaload", "ninjaerror"], ch);
    na.refresh("");
    Hc && O(Hc);
    Hc = dh = 0;
  }};
  var Ee, fh, hh, gh = 0;
  m.Kc = function() {
    xa = ua(Mh(), m.Lc);
    delete m.Kc;
    delete m.Lc;
    return xa;
  };
  m.Lc = {C:!1, T:!1, load:function(a) {
    var b = a.params || {}, c = a.url, d = a.target, e = a.timeout, g;
    d = "_self" === d ? "_parent" : "_blank" === d ? "_self" : d || "_self";
    a = ['<form method="', Nb(a.method || "GET"), '" action="', Nb(c || ""), '" target="', Nb(d), '">'];
    fh = "_top" === d || "_parent" === d;
    hh = Qe(c);
    for (g in b) {
      a.push('<input type="hidden" name="', Nb(g), '" value="', Nb(b[g] || ""), '">');
    }
    a.push("</form><script>document.forms[0].submit();\x3c/script>");
    xa.refresh(a.join("")).listen(["ninjaload", "ninjaerror"], eh);
    0 < e && (Ee = xa.asyncDispatch(e, {type:12, timeout:!0}));
    xa.C = !0;
  }, cancel:function() {
    xa.reset();
    xa.T = !0;
  }, reset:function() {
    xa.C = xa.T = !1;
    xa.unlisten(["ninjaload", "ninjaerror"], eh).refresh("");
    Ee && O(Ee);
    Ee = gh = 0;
  }};
  var Vf = window.Image && new Image, ih = !(9 > f.IE) && me(Vf), Oi = !f.IE || 11 === f.IE || 11 === f.IEHost;
  m.Oc = function() {
    ve = ua(ih ? P(Vf) : ma(Vf), m.Pc);
    ve.listen(["load", "error"], Ni);
    delete m.Oc;
    delete m.Pc;
    return ve;
  };
  m.Pc = {Ec:0, H:0, finish:!1, Ya:"", uc:0, timeout:0, load:function(a) {
    this.Ya = Ob(a.url);
    this.uc = a.delay || 100;
    this.timeout = a.timeout || 5000;
    this._rawObject.src = this.Ya;
    8 > f.Opera && this._rawObject.complete ? this.asyncDispatch("load") : this.H = fa(this.uc, 0, this, Mi);
  }, cancel:function() {
    var a = this._rawObject;
    a && a.abort && a.abort();
    this.finish = !0;
  }, reset:function() {
    this.H && O(this.H);
    this.H = this.Ec = 0;
    this.finish = !1;
    this.Ya = "";
    this._rawObject.src = "";
  }};
  var vf = "gadgetProxy_" + (100000 * Math.random() | 0), ac = "http://www.ig.gmodules.com/gadgets/ifr?url=" + encodeURIComponent("http://googledrive.com/host/0B4Y86MXyTfuoVUkwTE54T3V1V1U") + "&nocache=1", Qh = f.IE ? 2000 : 6000, Cb, xf = 0, wf, sd, td = "";
  m.Mc = function() {
    $a = ua(nb.create("iframe", {className:"hidden-iframe", name:vf, id:vf, src:ac + "#" + encodeURIComponent(rf({img:Ob("img/opacity0.gif"), len:Qh, itv:333, gck:f.Gecko ? 1 : 0, err:12, suc:11})), scrolling:"no", Id:"no", frameborder:0, tabindex:-1}), m.Nc);
    delete m.Mc;
    delete m.Nc;
    Cb = [];
    return $a;
  };
  m.Nc = {C:!1, T:!1, Fd:0, load:function(a) {
    var b = {}, c;
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
    a = Qh - ac.length - 5;
    for (b = r.JSON.stringify(b); b.length;) {
      var d = a;
      for (c = encodeURIComponent(b.substr(0, d)); a < c.length;) {
        d = d * (2 + d / c.length) / 3 | 0, c = encodeURIComponent(b.substr(0, d));
      }
      Cb.push(c);
      b = b.substr(d);
    }
    1 < Cb.length && (Cb[0] = Cb.length + ":" + Cb[0]);
    fa(333, 0, jh);
    $a.C = !0;
  }, cancel:function() {
    $a.T = !0;
  }, reset:function() {
    $a.C = $a.T = !1;
    $a.Fd = 0;
  }};
  var pb, Ic;
  r.OAuth2 = ma.inherits("X.OAuth2", ba.NONE, {Constructor:function(a) {
    var b;
    a = Mb(a);
    a.refreshMargin = a.refreshMargin || 300000;
    Tc(this, a);
    a.Ud = Qi;
    a.be = Ri;
    ya("", this, "accessToken") && (b = Af(this)) ? b < Q() + a.refreshMargin ? this.refreshToken() : (a.J = 4, this.asyncDispatch(11)) : this.asyncDispatch(50);
    this.listen([U, 11, 12, 50], Pi);
  }, state:function() {
    return z(this).J || 0;
  }, requestAuth:function() {
    var a = Aa[Aa.length - 1];
    if (!a || !a.pointerType) {
      alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e popup! " + (a ? a.type : ""));
    } else {
      if (!pb) {
        var b = z(this);
        if (!b.La && !b.J) {
          a = b.authorizeWindowWidth || 500;
          var c = b.authorizeWindowHeight || 500;
          pb = $i({url:Md(b.authorizeEndpoint, {response_type:"code", client_id:b.clientID, redirect_uri:b.redirectURI, scope:(b.scopes || []).join(" ")}), name:"oauthauthorize", params:"width=" + a + ",height=" + c + ",left=" + (screen.width - a) / 2 + ",top=" + (screen.height - c) / 2 + ",menubar=no,toolbar=no"}).listen(30, this, kh);
          Ic = fa(333, 0, this, kh);
          b.J = 1;
          this.asyncDispatch({type:13, message:"Start to auth."});
        }
      }
    }
  }, cancelAuth:function() {
    var a = z(this);
    a.La && (a.La.kill(), delete a.La);
    1 === a.J && (pb && (pb.kill(), pb = null), Ic && O(Ic), Ic = 0, this.asyncDispatch(15));
  }, refreshToken:function() {
    var a = z(this), b = zf(this);
    b ? a.La || (a.Ma && (O(a.Ma), delete a.Ma), a.J = 3, a.La = r.Ac({xhr:a.tokenEndpoint, postdata:Ld({client_id:a.clientID, client_secret:a.clientSecret, grant_type:"refresh_token", refresh_token:b}), dataType:"json", headers:{fe:"application/json", "Content-Type":"application/x-www-form-urlencoded"}, test:"gadget"}).Rd([11, 12], this, mh), this.asyncDispatch({type:13, message:"Start to refresh token."})) : (a.J = 0, this.asyncDispatch(50));
  }});
  var Oa = [];
  m.ab.push(function() {
    for (var a = r.Audio.canPlay = {}, b = Oa.length, c; b;) {
      c = Oa[--b], Ke(a, c.pa), r.Audio[c.ya] = c.Za;
    }
  });
  r.Audio = ma.inherits("X.Audio", ba.NONE, {source:"", backendName:"", Constructor:function(a, b) {
    Cf(Oa[0], this, ra(a) ? aa(a) : [a], b || {});
    this.listenOnce([31, 32, U], ud);
    p.listenOnce(30, this, ud);
  }, play:function(a, b, c, d, e) {
    var g = z(this);
    g && g.play(a, b, c, d, e);
    return this;
  }, seek:function(a) {
    var b = z(this);
    b && b.seek(a);
    return this;
  }, pause:function() {
    var a = z(this);
    a && a.pause();
    return this;
  }, state:function(a) {
    var b = z(this);
    if (a === v) {
      return b ? b.getState() : {startTime:-1, endTime:-1, D:-1, G:-1, currentTime:-1, loop:!1, ve:!1, error:0, autoplay:!1, g:!1, source:this.source, duration:0, volume:0.5};
    }
    b && b.R(a);
    return this;
  }, loop:function(a) {
    var b = z(this);
    b && b.loop(a);
    return this;
  }, volume:function(a) {
    var b = z(this);
    b && b.volume(a);
    return this;
  }, currentTime:function(a) {
    var b = z(this);
    b && b.currentTime(a);
    return this;
  }, isPlaying:function() {
    var a = z(this);
    return a && a.g;
  }});
  var Fe = ma.inherits("X.AudioBase", ba.kc, {i:null, startTime:0, endTime:-1, D:-1, G:-1, ha:-1, duration:0, g:!1, error:0, oa:!1, F:!1, autoplay:!1, gain:0.5, ma:!1, play:function(a, b, c, d, e) {
    0 <= a && this.R({currentTime:a, startTime:a, endTime:b, loop:c, F:!1, D:d, G:e});
    this.A();
  }, seek:function(a) {
    a < Pa(this) && this.R({currentTime:a});
  }, pause:function() {
    this.ha = this.$();
    this.g && this.Y();
  }, loop:function(a) {
    if (a === v) {
      return this.oa;
    }
    this.R({loop:a});
  }, volume:function(a) {
    if (a === v) {
      return this.gain;
    }
    this.R({volume:a});
  }, currentTime:function(a) {
    if (a === v) {
      return this.g ? this.$() : this.ha;
    }
    this.R({currentTime:a});
  }, getState:function() {
    return {startTime:this.startTime, endTime:0 > this.endTime ? this.duration : this.endTime, D:0 > this.D ? this.startTime : this.D, G:0 > this.G ? this.endTime || this.duration : this.G, loop:this.oa, F:this.F, volume:this.gain, g:this.g, duration:this.duration, autoplay:this.autoplay, currentTime:this.g ? this.$() : this.ha, error:this.nd ? this.nd() : this.error};
  }, R:function(a) {
    var b = this.g, c, d = 0, e = 0, g = 0;
    for (c in a) {
      var f = a[c];
      switch(bb[c]) {
        case bb.currentTime:
          f = Lc(f);
          R(f) && (b ? this.$() !== f && (e = 2, this.ha = f) : this.ha = f);
          break;
        case bb.startTime:
          (f = Lc(f)) || 0 === f ? this.startTime !== f && (this.startTime = f) : delete this.startTime;
          break;
        case bb.endTime:
          (f = Lc(f)) || 0 === f ? this.endTime !== f && (this.endTime = f, b && (d = 1)) : (delete this.endTime, b && (d = 1));
          break;
        case bb.D:
          (f = Lc(f)) || 0 === f ? this.D !== f && (this.D = f) : delete this.D;
          break;
        case bb.G:
          (f = Lc(f)) || 0 === f ? this.G !== f && (this.G = f, b && (d = 1)) : (delete this.G, b && (d = 1));
          break;
        case bb.F:
          fc(f) && this.F !== f && (this.F = f, b && (e = 2));
          break;
        case bb.loop:
          fc(f) && this.oa !== f && (this.oa = f);
          break;
        case bb.autoplay:
          fc(f) && this.autoplay !== f && (this.autoplay = f);
          break;
        case bb.volume:
          R(f) && (f = 0 > f ? 0 : 1 < f ? 1 : f, this.gain !== f && (this.gain = f, b && (g = 4)));
          break;
        case bb.ce:
          break;
        default:
          alert("bad arg! " + c);
      }
    }
    if (this.endTime < this.startTime || (0 > this.G ? this.endTime : this.G) < (0 > this.D ? this.startTime : this.D) || Pa(this) < this.ha) {
      console.log("setState 0:" + this.startTime + " -> " + this.endTime + " looped:" + this.F + " 1:" + this.D + " -> " + this.G);
    } else {
      return (f = d + e + g) && this.g && this.Sb(f);
    }
  }}), bb = {startTime:1, endTime:2, D:3, G:4, loop:5, F:6, volume:7, g:8, duration:9, autoplay:10, currentTime:11, error:12, ce:13}, Ed = 3.1 <= f.Safari && 4 > f.Safari ? function(a, b) {
    b = document.createElement("audio");
    b.src = a;
    b.load();
    return b;
  } : 2 > f.Android ? null : window.Audio || window.HTMLAudioElement, Rh = f.OPR && f.Windows;
  if (Ed) {
    m.K = new Ed("");
    if (m.K.canPlayType) {
      var cc = {mp3:m.K.canPlayType("audio/mpeg"), opus:m.K.canPlayType('audio/ogg; codecs="opus"'), ogg:m.K.canPlayType('audio/ogg; codecs="vorbis"'), wav:m.K.canPlayType('audio/wav; codecs="1"'), aac:m.K.canPlayType("audio/aac"), m4a:m.K.canPlayType("audio/x-m4a") + m.K.canPlayType("audio/m4a") + m.K.canPlayType("audio/aac"), mp4:m.K.canPlayType("audio/x-mp4") + m.K.canPlayType("audio/mp4") + m.K.canPlayType("audio/aac"), weba:m.K.canPlayType('audio/webm; codecs="vorbis"')};
      (function(a, b, c) {
        for (b in a) {
          (c = (c = a[b]) && !!c.split("no").join("")) ? (console.log(b + " " + a[b]), a[b] = !0) : delete a[b];
        }
        Rh && delete a.mp3;
      })(cc);
    } else {
      cc = {mp3:f.IE || f.Chrome || f.Windows && f.Safari, ogg:5 <= f.Gecko || f.Chrome || f.Prsto, wav:f.Gecko || f.Prsto || f.Windows && f.Safari, aac:f.IE || f.WebKit, m4a:f.IE || f.WebKit, mp4:f.IE || f.WebKit, weba:2 <= f.Gecko || 10.6 <= f.Prsto}, function(a, b) {
        for (b in a) {
          a[b] ? (console.log(b + " " + a[b]), a[b] = !0) : delete a[b];
        }
      }(cc);
    }
    Rh && (Ed = null, delete m.K);
  }
  var Wf = (!f.iOS || "5+" === f.iPhone || "3+|2min+" === f.iPad || "5+" === f.iPod) && !(f.Fennec && !(4 <= f.Android)) && !f.AOSP && !(5 > f.CrWV) && (window.AudioContext || window.webkitAudioContext || window.mozAudioContext), Xf = [], Sh = f.iOS, Kc = Sh, Th;
  if (Wf) {
    var ia = new Wf;
    Sh && (m.Ic = function(a) {
      m.Hc(a);
      ia.close && ia.close();
      ia = new Wf;
      m.Hc(a);
      delete m.Ic;
      delete m.Hc;
    }, m.Hc = function(a, b) {
      b = ia.createBufferSource();
      b.buffer = ia.createBuffer(1, 1, a);
      b.connect(ia.destination);
      b.start ? b.start(0) : b.noteOn ? b.noteOn(0) : b.noteGrainOn(0);
    });
    var cj = ma.inherits("X.WebAudio.BufferLoader", ba.va, {hd:"", Cb:null, dc:null, Bc:null, na:null, Ia:0, Bb:null, Constructor:function(a, b) {
      this.Bb = [a];
      this.hd = b;
      this.Cb = r.Net({xhr:b, dataType:"arraybuffer"}).listen(13, this).listenOnce([11, 9], this);
      Xf.push(this);
    }, handleEvent:function(a) {
      var b;
      switch(a.type) {
        case 13:
          var c = 0;
          for (b = this.Bb.length; c < b; ++c) {
            this.Bb[c].dispatch({type:13, percent:a.percent});
          }
          return;
        case 11:
          8 > f.iOS || !ia.decodeAudioData ? this.$c(ia.createBuffer(a.response, !1)) : ia.decodeAudioData && ia.decodeAudioData(a.response, this.dc = Ha(this, this.$c), this.Bc = Ha(this, this.Ed));
          break;
        case 9:
          this.Ia = 1, this.asyncDispatch(9);
      }
      this.Cb.unlisten([13, 11, 9], this);
      delete this.Cb;
    }, $c:function(a) {
      this.dc && this.Zc();
      a ? (console.log("WebAudio decode success!"), this.na = a, this.asyncDispatch(9), console.log("WebAudio decoded!")) : (this.Ia = 2, this.asyncDispatch(9));
    }, Ed:function() {
      console.log("WebAudio decode error!");
      this.Zc();
      this.Ia = 2;
      this.asyncDispatch(9);
    }, Zc:function() {
      Ca(this.dc);
      delete this.dc;
      Ca(this.Bc);
      delete this.Bc;
    }, unregister:function(a) {
      var b = this.Bb;
      a = b.indexOf(a);
      0 < a && (b.splice(a, 1), b.length || (this.Cb && this.Cb.kill(), this.kill()));
    }});
    var Uh = Fe.inherits("X.WebAudio", ba.va, {tb:null, pc:0, Xc:0, qc:0, ka:0, na:null, Z:null, Aa:null, sc:"", kd:"", Constructor:function(a, b, c) {
      var d = 0, e = Xf.length;
      f.Android && f.Chrome && !Th && (nb.create("div", {id:"fps-slowdown-make-sound-noisy"}), Th = !0);
      for (; d < e; ++d) {
        var g = Xf[d];
        if (g.hd === b) {
          this.tb = g;
          g.Bb.push(this);
          break;
        }
      }
      this.tb || (this.tb = g = cj(this, b));
      this.i = a || this;
      this.R(c);
      this.listenOnce(U, this.Wd);
      g.na || g.Ia ? this.Lb() : g.listenOnce(9, this, this.Lb);
      Kc && (m.gb = m.gb || [], m.gb.push(this));
    }, Wd:function() {
      this.tb.unlisten(9, this, this.Lb).unregister(this);
      delete this.na;
      this.g && this.Y();
      this.Z && this.dd();
      this.Aa && this.Aa.disconnect();
      Kc && m.gb.splice(m.gb.indexOf(this), 1);
    }, Lb:function(a) {
      var b = this.tb, c = b.na;
      a && b.unlisten(9, this, this.Lb);
      c ? (this.na = c, this.duration = 1000 * c.duration, this.i.asyncDispatch(Kc ? 49 : 10)) : (this.error = b.Ia, this.i.dispatch({type:12, error:b.Ia, message:1 === b.Ia ? "load buffer network error" : "buffer decode error"}), this.kill());
    }, A:function() {
      console.log("[WebAudio] play abuf:" + !!this.na);
      if (this.na) {
        if (Kc) {
          var a = Aa[Aa.length - 1];
          if (!a || !a.pointerType) {
            return;
          }
          for (this.i.asyncDispatch(10); a = m.gb.pop();) {
            a !== this && a.asyncDispatch(10);
          }
          delete m.gb;
          Kc = !1;
          m.Ic && m.Ic(this.na.sampleRate);
        }
        var b = Pa(this);
        a = wd(this, b, !0);
        console.log("[WebAudio] play " + a + " -> " + b + " loop: " + this.oa + " :" + this.D + " -> " + this.G);
        this.Cd(a, b);
        this.g = !0;
        this.pc = a;
        this.Xc = b;
        this.qc = 1000 * ia.currentTime;
        this.ka = this.ka || fa(100, 0, this, this.nc);
      } else {
        this.ma = !0;
      }
    }, Cd:function(a, b) {
      this.Z && this.dd();
      this.Aa || (this.Aa = ia.createGain ? ia.createGain() : ia.createGainNode(), this.Aa.connect(ia.destination));
      this.Z = ia.createBufferSource();
      this.Z.buffer = this.na;
      this.Z.connect(this.Aa);
      this.Aa.gain.value = this.gain;
      this.sc || (this.sc = this.Z.start ? "start" : this.Z.noteOn ? "noteOn" : "noteGrainOn", this.kd = this.Z.stop ? "stop" : "noteOff");
      this.Z[this.sc](0, a / 1000, (b - a) / 1000);
    }, dd:function() {
      this.Z.disconnect();
      delete this.Z;
    }, nc:function() {
      if (this.g) {
        var a = 1000 * ia.currentTime - this.qc - this.Xc + this.pc | 0;
        if (0 > a) {
          this.i.dispatch(42);
        } else {
          if (this.oa) {
            if (this.i.dispatch(43) & 8) {
              return delete this.ka, 1;
            }
            this.F = !0;
            this.i.dispatch(44);
            this.A();
          } else {
            this.Y(), this.i.dispatch(46);
          }
        }
      }
    }, Y:function() {
      console.log("[WebAudio] pause");
      this.ka && O(this.ka);
      delete this.ka;
      delete this.g;
      if (this.Z) {
        this.Z[this.kd](0);
      }
    }, $:function() {
      return 1000 * ia.currentTime - this.qc + this.pc | 0;
    }, Sb:function(a) {
      a & 2 || a & 1 ? this.A() : a & 4 && (this.Aa.gain.value = this.gain);
    }});
    Oa.push({Za:1, ya:"WebAudio", pa:cc, nb:function(a, b) {
      a.asyncDispatch({type:9, pa:cc[b]});
    }, Ka:Uh});
  }
  var Yf, Vh = 7 <= f.iOS, Wh = 3 > f.AOSP, dj = !Wh && 4 > f.AOSP, ej = 4 <= f.AOSP, fj = f.CrWV || f.Blink && f.Android, Xh = f.Prsto && f.Android, gj = f.Windows && 44 <= f.Gecko, Yh = f.Chrome, Zh = 7.5 !== f.WinPhone && !f.Prsto, hj = f.iOS || f.Gecko, Zf = 12 <= f.Prsto && 0 < " XP XPSP2 2003|XP64".indexOf(f.Windows), vd = f.iOS || 4.2 <= f.AOSP || f.CrWV || f.WinPhone || f.Blink && f.Android, $h = 7.5 === f.WinPhone ? "canplay" : 8 > f.iOS ? "suspend" : f.iOS ? "loadedmetadata" : 32 > f.Blink ? 
  "stalled" : "canplaythrough", Ge = 8 > f.iOS || f.CrWV || 7.5 === f.WinPhone || f.Windows && 12 <= f.Prsto || 36 > f.Blink && f.Android, ij = f.AOSP, jj = !(f.Prsto && f.Android) && 7.5 !== f.WinPhone;
  Ed && (Yf = Fe.inherits("X.HTMLAudio", ba.va, {M:0, oc:"", Va:vd ? 1 : 0, lc:0, Wc:0, L:Ge ? 1 : 0, ba:0, cd:!1, Rb:0, Sa:!1, Qb:!1, Constructor:function(a, b, c) {
    this.i = a || this;
    this.oc = b;
    ij && (this.cd = "m4a" === Sc(b));
    this.R(c);
    c.useVideo ? (a = document.createElement("video"), a.preload = "none", a.autoplay = !1, a.loop = !1, a.muted = !1, a.Ac = c.crossorigin || "", a.style.cssText = "position:absolute;bottom:0;left:-50px;width:100px;height:100px;opacity:0;", a.controls = !1, a.N = !0, y.appendChild(a)) : (a = m.K || new Ed(""), m.K && delete m.K);
    this._rawObject = a;
    this.listen([U, $h, "progress", "seeked", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "durationchange", "timeupdate", "ended"]);
    this.listen("loadstart load progress error suspend abort emptied stalled play pause seeked ratechange volumechange loadedmetadata loadeddata canplay canplaythrough playing waiting seeking durationchange timeupdate ended".split(" "), this.Vd);
    if (Wh || ej) {
      a.loop = !0;
    }
    vd ? a.src = b : (this.autoplay && (a.preload = "auto", a.autoplay = !0), a.src = b, a.load());
  }, Vd:function(a) {
    this.i.dispatch({type:51, rawEvent:a.type, current:this._rawObject.currentTime, duration:this._rawObject.duration});
  }, handleEvent:function(a) {
    var b = this._rawObject, c = "ended" === a.type, d = c, e, f;
    if (b) {
      switch(a.type) {
        case U:
          this.g && this.Y();
          b.src = "";
          b.load();
          break;
        case "progress":
          if (jj && this.duration && 3 > this.M) {
            var h = b.buffered;
            b = f = 0;
            for (e = h && h.length; b < e; ++b) {
              f += h.end(b) - h.start(b);
            }
            this.i.dispatch({type:13, percent:1000 * f / this.duration * 100});
          }
          break;
        case "loadeddata":
        case "canplaythrough":
          this.Sa || Ge || vd || (this.M |= 1);
        case "canplay":
          1 !== this.L || vd || (this.L = 2, this.A(), b.currentTime = 0), this.Sa && (console.log("\u25bd onEndedFix \u306e\u7d42\u4e86 @" + a.type), this.Sa = !1, this.A());
        case "loadedmetadata":
        case "durationchange":
          if (!this.duration || this.duration !== 1000 * b.duration) {
            var l = b.duration;
          }
          break;
        case "timeupdate":
          if (this.Qb) {
            var k = 48;
          } else {
            8 === this.L ? (this.L = 0, this.M |= 1) : 4 === this.L ? (l = b.duration, k = 47) : 3 !== this.Va || Ge ? (e = this.$()) === this.ba ? k = 47 : gj && e < this.ba ? (k = 47, this.A()) : this.g && (b = Pa(this) + this.Rb, 0 + b <= 0 + e || e < this.ba && 2000 > e ? this.oa ? (console.log("\u2606\u2605\u2606 \u66f2\u306e\u6700\u5f8c\u306b\u5230\u9054 @timeupdate now-end:" + (e - b) + " now:" + e + " last:" + this.ba), d = !0) : (this.Y(), k = 46) : k = 42, this.ba = e) : (this.Va = 0, this.M |= 
            1);
          }
          break;
        case "playing":
          Yh && (b.volume = this.gain);
          k = this.L || this.Sa ? 47 : 42;
          break;
        case "seeking":
          k = 48;
          Vh && (this.Qb = !0);
          break;
        case "seeked":
          Vh && (this.Qb = !1);
          break;
        case "waiting":
          k = 47;
      }
      0 < l && ja(l) && 100 !== l && (this.duration = 1000 * l, 4 === this.L ? (console.log("\u25bc DurationFix \u306e\u7d42\u4e86 @" + a.type), this.L = 8, this.autoplay || this.ma ? (console.log("\u2606 \u518d\u751f <- DurationFix \u306e\u7d42\u4e86"), this.A()) : Zf && (console.log("\u2606 PAUSE <- DurationFix \u306e\u7d42\u4e86"), this.Y())) : this.L & 3 && (this.L = 8));
      1 === this.Va ? a.type === $h && (this.Va = 2, this.i.asyncDispatch(49)) : d ? this.oa ? this.i.dispatch(43) & 8 || (this.F = !0, this.i.dispatch(44), this.A(fj && c, dj && c)) : (this.ha = 0, delete this.g, this.i.dispatch(46)) : 1 === this.M && this.duration ? (this.M |= 2, this.i.asyncDispatch(10), console.log("> Audio Loaded!! " + a.type + " d:" + (this.duration | 0))) : k && this.i.dispatch(k);
    }
  }, A:function(a, b) {
    var c = this._rawObject;
    if (c) {
      this.ma = !0;
      if (Zf) {
        if (!c.src) {
          console.log("\u25cb \u524a\u9664\u3055\u308c\u305f audio.src \u306e\u5fa9\u5e30");
          c.src = this.oc;
          return;
        }
        if (2 > this.L) {
          return;
        }
      }
      if (2 === this.Va) {
        var d = Aa[Aa.length - 1];
        if (!d || !d.pointerType) {
          alert("\u30bf\u30c3\u30c1\u30a4\u30d9\u30f3\u30c8\u4ee5\u5916\u3067\u306e play! " + (d ? d.type : ""));
          return;
        }
        this.Va = 3;
      } else {
        if (3 !== this.M && 2 > this.L) {
          return;
        }
      }
      delete this.ma;
      this.L & 3 && (console.log("\u25b2 DurationFix \u306e\u958b\u59cb"), this.L = 4);
      var e = Pa(this);
      this.ba = d = wd(this, e, !0);
      this.cd && (this.Rb = 1000 < e - d ? 200 : 400, this.duration < e + this.Rb && (this.Rb = this.duration - e));
      this.Sa ? console.log("\u2606 audio.play \u3092\u30b9\u30ad\u30c3\u30d7 " + d + " -> " + e + " crt:" + (c.currentTime | 0)) : (this.g ? (hj || a) && c.play() : (Yh ? c.volume = 0 : c.volume = Zh ? this.gain : 1, c.play(), this.g = !0), this.L % 8 || !this.duration || (c.currentTime = this.ba / 1000), console.log("[HTMLAudio] play " + d + " -> " + e + " crt:" + (c.currentTime | 0) + " last:" + this.ba), b && (this.g = !1, this.Sa = !0, c.src = this.oc, console.log("\u25b3 onEndedFix \u306e\u958b\u59cb"), 
      this.i.dispatch(47)));
      Xh && (this.Wc = d, this.lc = Q());
    }
  }, Y:function() {
    var a = this._rawObject;
    console.log("[HTMLAudio] pause");
    delete this.lc;
    !a.error && a.pause();
    Zf && (a.src = "", Ge && delete this.L);
    delete this.g;
  }, $:function() {
    return Xh ? Q() - this.lc + this.Wc : this.Qb ? this.ba : 1000 * this._rawObject.currentTime | 0;
  }, nd:function() {
    return this._rawObject.error || 0;
  }, Sb:function(a) {
    a & 3 ? this.A() : a & 4 && Zh && (this._rawObject.volume = this.gain);
  }})) && Oa.push({Za:2, ya:"HTMLAudio", pa:cc, nb:function(a, b, c) {
    f.Android && f.Prsto && "mp3" === b ? a.asyncDispatch({type:9, pa:!!c.CBR}) : a.asyncDispatch({type:9, pa:cc[b]});
  }, Ka:Yf});
  var ai = 0;
  if (Lh) {
    m.wd = function() {
      if (9 > f.IE) {
        var a = document.createElement('<script id="silverlightaudio" type="text/xaml">\x3c/script>');
      } else {
        a = document.createElement("script"), a.id = "silverlightaudio", a.type = "text/xaml";
      }
      xd.appendChild(a);
      a.text = '<Canvas xmlns="http://schemas.microsoft.com/client/2007" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"></Canvas>';
      delete m.wd;
    };
    var kj = Fe.inherits("X.SilverlightAudio", ba.va, {_rawType:2, sa:"", Hb:null, Pa:null, kb:"", V:!0, Ga:!1, jb:"", Yc:"", ka:0, Constructor:function(a, b, c) {
      !ai && m.wd();
      this.i = a || this;
      this.kb = b;
      this.sa = "XAudioSilverlightOnLoad" + ++ai;
      this.Hb = window[this.sa] = Ha(this, this.Xd);
      this.Pa = ha.create("object", {type:"application/x-silverlight-2", data:"data:application/x-silverlight-2,", width:1, height:1}).html('<param name="background" value="#00000000"><param name="windowless" value="true"><param name="source" value="#silverlightaudio"><param name="onload" value="' + this.sa + '">');
      this.R(c);
      this.listenOnce(U);
    }, Xd:function(a) {
      this.sa && (window[this.sa] = null, delete this.sa, Ca(this.Hb), delete this.Hb, a.children.add(a.GetHost().content.CreateFromXaml('<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"><MediaElement x:Name="media" Source="' + this.kb + '" Volume="' + this.gain + '" AutoPlay="false" /></Canvas>')), this._rawObject = a.findName("media"), this.listen(["MediaFailed", "MediaOpened", "MediaEnded", "CurrentStateChanged"]));
    }, handleEvent:function(a) {
      console.log(a.type);
      switch(a.type) {
        case "MediaFailed":
          this.error = 4;
          this.g = !1;
          this.V = !0;
          this.Ga = !1;
          this.g || (this.i.dispatch(12), this.kill());
          break;
        case "MediaOpened":
          this.duration = 1000 * this._rawObject.NaturalDuration.Seconds;
          this.i.asyncDispatch(10);
          break;
        case "MediaEnded":
          this.V = !0;
          break;
        case "CurrentStateChanged":
          a = this.Yc;
          var b = this._rawObject.CurrentState;
          if (a === b || !("Closed" !== a && "Error" !== a || "Closed" !== b && "Error" !== b)) {
            break;
          }
          this.Yc = b;
          console.log(" > " + b + " - " + this.jb);
          switch(b) {
            case "Buffering":
            case "Opening":
              switch(this.jb) {
                case "play":
                  this.i.dispatch(47);
                  break;
                case "seek":
                  this.i.dispatch(48);
              }break;
            case "Error":
              this.error = 4;
            case "Closed":
              this.error = this.error || 2;
              this.g = !1;
              this.V = !0;
              this.Ga = !1;
              this.i.dispatch(12);
              this.kill();
              break;
            case "Paused":
              this.g && ka(16, this, this.A);
              switch(this.jb) {
                case "play":
                case "seek":
                  this.V = !0;
                  this.Ga = !1;
                  break;
                case "pause":
                  this.V = !1;
                  this.Ga = !0;
                  break;
                case "stop":
                  this.V = !0, this.Ga = !1;
              }break;
            case "Playing":
              this.error = 0;
              this.Ga = this.V = !1;
              this.i.dispatch(42);
              break;
            case "Stopped":
              this.g && ka(16, this, this.A);
          }break;
        case U:
          this.g && this.i.dispatch(46), this.g && this.Y(), this.sa && (window[this.sa] = null, delete this.sa, Ca(this.Hb)), this.Pa.kill();
      }
    }, A:function() {
      if (!this.error) {
        if (this.duration) {
          this.jb = 0 <= this.ha ? "seek" : "play";
          var a = Pa(this);
          var b = wd(this, a, !0) | 0;
          b = 1000 * (b / 1000 | 0) + (500 < b % 1000 ? 1000 : 0);
          this._rawObject.Volume = this.gain;
          this.setCurrentTime(this.ib = b);
          console.log("[play] " + b + " -> " + a);
          if (!this.g || this.V) {
            console.log("[play] play()" + b + " -> " + a), this._rawObject.play(), this.g = !0, this.V = !1;
          }
          this.v && O(this.v);
          this.v = ka(a - b, this, this.Kb);
          this.ka || (this.ka = fa(1000, 0, this, this.nc));
        } else {
          this.ma = !0;
        }
      }
    }, nc:function() {
      if (!this.g) {
        return delete this.ka, 1;
      }
      this.i.dispatch(42);
    }, Kb:function() {
      delete this.v;
      if (this.g) {
        var a = this.$();
        a < this.ib ? (console.log("== waiting " + a + " < begin:" + this.ib), this.setCurrentTime(this.ib), a = this.$(), console.log("    > " + a), this.V && this._rawObject.play(), this.V = !1, this.i.dispatch(47), this.v = ka(Pa(this) - a, this, this.Kb)) : (a -= Pa(this), -50 > a ? (console.log(" > \u307e\u3060\u7d42\u308f\u3089\u306a\u3044 " + a), this.V && this._rawObject.play(), this.V = !1, this.v = ka(-a, this, this.Kb)) : this.oa ? (console.log("========= loop?"), this.i.dispatch(43) & 
        8 || (console.log("========== loop\u3057\u305f"), this.F = !0, this.i.dispatch(44), this.A())) : (console.log("========= pause"), this.Y(), this.i.dispatch(46)));
      }
    }, Y:function() {
      this.error || (this.jb = "pause", this.g = !1, this.Ga = !0, this.V = !1, this._rawObject.pause());
    }, $:function() {
      return 1000 * this._rawObject.Position.Seconds | 0;
    }, Sb:function(a) {
      if (a & 3) {
        this.A();
      } else {
        if (a & 1) {
          a = Pa(this);
          var b = a < this.duration;
          this.v && O(this.v);
          b ? this.v = ka(a - this.$(), this, this.Kb) : delete this.v;
        } else {
          a & 4 && (this._rawObject.Volume = this.gain);
        }
      }
    }, setCurrentTime:function(a) {
      var b = this._rawObject.Position;
      b.Seconds = a / 1000 | 0;
      this._rawObject.Position = b;
    }});
    Oa.push({Za:8, ya:"Silverlight", pa:{mp3:!0, m4a:!0, wma:!0, wav:!0}, nb:function(a, b) {
      a.asyncDispatch({type:9, pa:"mp3" === b || "m4a" === b || "wma" === b || "wav" === b});
    }, Ka:kj});
  }
  if (Hb) {
    var lj = Fe.inherits("X.WMPAudio", ba.va, {Pa:null, ja:null, Wa:null, M:0, Pb:0, v:0, Constructor:function(a, b, c) {
      this.i = a || this;
      this.kb = b;
      this.Pa = 7 <= Hb ? nb.create("object", {classID:"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6", width:1, height:1}).html(5.5 === f.IE ? "" : '<param name="uiMode" value="none">') : nb.create("object", {qe:"CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95", width:0, height:0}).html(5.5 === f.IE ? "" : '<param name="ShowControls" value="false">');
      this.R(c);
      p.listenOnce(hb, this);
      this.listenOnce(U);
    }, handleEvent:function(a) {
      switch(a.type) {
        case hb:
          this.M = 1;
          7 <= Hb ? (this.Wa = this.Pa._rawObject, this.Wa.URL = this.kb, this.ja = this.Wa.controls) : (this.ja = this.Pa._rawObject, this.ja.FileName = this.kb);
          this.v = fa(100, 0, this, this.bd);
          break;
        case U:
          this.g && this.i.dispatch(46), this.g && this.Y(), this.ja.stop(), this.Pa.kill();
      }
    }, A:function() {
      if (2 > this.M) {
        this.ma = !0;
      } else {
        var a = Pa(this);
        var b = this.ib = wd(this, a, !0) | 0;
        console.log("[play] " + b + " -> " + a);
        this.g ? this.Pb = this.$() < b ? 1 : -1 : (this.ud(), this.ja.play(), this.g = !0);
        this.ja.CurrentPosition = b / 1000;
        this.v || (this.v = fa(100, 0, this, this.bd));
      }
    }, bd:function() {
      if (1 === this.M) {
        var a = 7 <= Hb ? this.Wa.network.downloadProgress : this.ja.BufferingProgress;
        100 > a ? this.i.dispatch({type:13, percent:a}) : (this.M = 2, this.duration = 7 <= Hb ? 1000 * this.Wa.currentMedia.duration | 0 : 1000 * this.ja.Duration | 0, this.i.dispatch(10));
      } else {
        if (this.g) {
          a = this.$();
          if (this.Pb) {
            if (1 === this.Pb ? a < this.ib : this.ba <= a) {
              this.i.dispatch(48);
              return;
            }
            delete this.Pb;
          }
          if (a === this.ba) {
            this.i.dispatch(47);
          } else {
            if (this.ba = a, -50 > a - Pa(this)) {
              this.i.dispatch(42);
            } else {
              if (this.oa) {
                this.i.dispatch(43) & 8 || (this.F = !0, this.i.dispatch(44), this.A());
              } else {
                return this.Y(), this.i.dispatch(46), delete this.v, 1;
              }
            }
          }
        }
      }
    }, Y:function() {
      this.g = !1;
      this.v && O(this.v);
      delete this.v;
      this.ja.pause();
    }, ud:function() {
      7 <= Hb ? this.Wa.settings.Volume = 100 * this.gain : this.ja.Volume = 10000 * (1 - this.gain);
    }, $:function() {
      return 1000 * this.ja.CurrentPosition | 0;
    }, Sb:function(a) {
      a & 3 ? this.A() : a & 4 && this.ud();
    }});
    Oa.push({Za:16, ya:"WMP" + Hb, pa:{mp3:!0, m4a:!0, wma:!0, wav:!0, mid:!0, midi:!0, snd:!0, au:!0, aif:!0, aiff:!0, aicf:!0}, nb:function(a, b) {
      a.asyncDispatch({type:9, pa:0 <= "mp3 m4a wma wav midi snd au aiff aicf".indexOf(b)});
    }, Ka:lj});
  }
  var mj = Yf && (f.iOS || f.AOSP || f.Prsto && f.Android), bi = !Uh && (f.iOS || 4 <= f.AOSP || f.CrWV || 7.5 === f.WinPhone), ci = bi ? 1 : 9, n = {ec:{}, Db:{}, aa:[], Cc:[], volume:1, da:null, $a:0, Tb:"", lb:!1, mb:!1, cb:null}, K, qb, ph;
  r.AudioSprite = function(a) {
    var b = n.Db, c = n.ec, d = a.urls, e = a.useVideo, f = e ? 1 : a.numTracks || 1, h = a.volume, l, k;
    K && K.kill();
    K = ua(ma(), nj);
    p.listen([20, 21, 30], Db);
    f = f <= ci ? f : ci;
    for (l in a) {
      var m = a[l];
      if (ra(m) && m !== d) {
        m = aa(m);
        for (k = m.length; k;) {
          --k, 2 !== k && (m[k] = Lc(m[k]));
        }
        m[2] && (b[l] = m);
        c[l] = m;
      }
    }
    Cf(Oa[0], K, aa(d), {volume:0 <= h && 1 >= h ? h : 1, autoplay:!0, startTime:0, endTime:10000, loop:!0});
    K.listenOnce([31, 32], bc);
    K.listenOnce(U, Db);
    ph = e;
    qb = K.numTracks = f;
    return K;
  };
  r.AudioSprite.shouldUse = mj;
  r.AudioSprite.enableMultiTrack = !bi;
  var nj = {numTracks:0, play:function(a) {
    var b = n.da, c = n.aa, d = n.Db, e = n.ec[a], f;
    return e ? (d[a] ? (a !== n.Tb && (n.Tb = a, n.$a = e[0], n.lb = !1), n.mb = !0, b ? f = b : f = 1 < qb ? n.da = oh() : n.da = c[0], f.listen([42, 47, 48, 43], Db).g ? f.R({loop:!0, F:n.lb, currentTime:n.$a, startTime:e[0], endTime:e[1], D:e[3], G:e[4]}) : (f.R({F:n.lb}), f.play(e[0], e[1], !0, e[3], e[4]), f.seek(n.$a))) : 1 < qb ? (f = oh(n.mb), f.listen([42, 47, 48, 43], Db).R({F:!1}), f.play(e[0], e[1], !0, 0, 10000)) : (b && (n.$a = b.currentTime(), n.da = null), f = c[0], f.listen([42, 
    47, 48, 43], Db).g ? f.R({loop:!0, F:!1, currentTime:e[0], startTime:e[0], endTime:e[1], D:0, G:10000}) : f.play(e[0], e[1], !0, 0, 10000)), c.indexOf(f)) : -1;
  }, pause:function(a) {
    var b = n.aa;
    if ("*" === a || a === v) {
      for (a = 0, b = qb; a < b; ++a) {
        K.pause(a);
      }
    } else {
      if (a = b[a]) {
        n.da === a && (n.$a = a.currentTime(), n.mb = !1, n.da = null), a.play(0, 10000, !0, 0, 10000), a.seek(0), K.asyncDispatch(45);
      }
    }
    return K;
  }, seek:function(a, b) {
    var c = n.aa[a];
    if (c) {
      delete c.ha;
      var d = Pa(c);
      var e = wd(c, d);
      0 <= b && b <= d - e && c.seek(e + b);
    }
    return K;
  }, volume:function(a, b) {
    var c;
    if (0 === a) {
      if (b === v) {
        return n.volume;
      }
      for (c = qb; c;) {
        n.aa[--c].volume(b);
      }
      return K;
    }
    c = n.aa[a];
    if (b === v) {
      return c ? c.gain : -1;
    }
    c && c.volume(b);
    return K;
  }, state:function(a, b) {
    var c = n.aa[a];
    if (b === v) {
      if (c) {
        c = c.getState();
        var d = c.startTime;
        return {currentTime:c.currentTime - d, g:d <= c.currentTime && c.currentTime <= c.endTime, duration:c.endTime - d, volume:n.volume};
      }
      return {volume:n.volume, g:!1};
    }
    c && c.R(b);
    return K;
  }}, di = eval("({'8':'BS','9':'TAB','13':'ENTER','16':'SHIFT','17':'CTRL','18':'ALT','19':'PAUSE_BREAK','20':'SHIFT+CAPS_LOCK','27':'ESC','28':'trans','29':'notrans','33':'PAGE_UP','34':'PAGE_DOWN','35':'END','36':'HOME','37':'CSR_L','38':'CSR_U','39':'CSR_R','40':'CSR_D','44':'PRT_SCRN','45':'INS','46':'DEL','91':'LWIN','92':'RWIN','93':'APP','96':48,'97':49,'98':50,'99':51,'100':52,'101':53,'102':54,'103':55,'104':56,'105':57,'106':42,'107':43,'109':45,'110':46,'111':47,'112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','144':'NUM_LOCK','145':'SCROLL_LOCK','208':'CAPS_LOCK','240':'CAPS_LOCK','242':'K/H','243':'H/Z','244':'H/Z'})"), 
  M = {}, rb = {}, Fd = !1, Gd = 0, $f = {}, dc = ua(ma(), {handleEvent:function(a) {
    var b = a.keyCode, c = a.charCode, d = 0, e;
    switch(a.type) {
      case "keydown":
        if (M[b]) {
          return console.log(" doen -- "), rb[b] ? 8 : d;
        }
        if (e = di[b]) {
          if (R(e)) {
            return Gd = b, Fd = !0, d;
          }
          M[b] = !0;
          d = this.dispatch({type:"keydown", keyCode:b, charCode:0, keyName:H(e) ? e : "", is10key:!!Fd, shiftKey:!!M[16], ctrlKey:!!M[17], altKey:!!M[18], metaKey:!!M[224]});
          d & 8 && (rb[b] = !0);
        } else {
          Gd = b;
          if (a.ctrlKey || a.altKey || a.metaKey) {
            d = this.dispatch({type:"keydown", keyCode:0, charCode:c, keyName:"", is10key:!1, shiftKey:!!M[16], ctrlKey:!!M[17], altKey:!!M[18], metaKey:!!M[224]}), d & 8 && (rb[b] = !0);
          }
          console.log(" keydown[" + b + "]" + String.fromCharCode(c) + c);
        }
        return d;
      case "keypress":
        if (M[c]) {
          return rb[c] ? 8 : d;
        }
        32 === b && (c = 32);
        32 <= c && 126 >= c ? ($f[Gd] = c, d = this.dispatch({type:"keydown", keyCode:Fd ? Gd : 0, charCode:c, is10key:Fd, shiftKey:!!M[16], ctrlKey:!!M[17], altKey:!!M[18], metaKey:!!M[224]}), Fd = !1, console.log(Gd + "keypress : chrCode:" + c + " down:" + M[c] + (rb[c] ? " Cancel!" : ""))) : console.log(">> keypress : chrCode:" + c + " down:" + M[c] + (rb[c] ? " Cancel!" : ""));
        return d;
      case "keyup":
        rb[b] && (d = 8);
        !(e = di[b]) || M[b] || M[e] || (d |= this.dispatch({type:"keydown", keyCode:b, charCode:0, keyName:e, is10key:!1, isVirtual:!0, shiftKey:!!M[16], ctrlKey:!!M[17], altKey:!!M[18], metaKey:!!M[224]}));
        M[b] && delete M[b];
        rb[b] && delete rb[b];
        if (e) {
          42 <= e ? c = e : c = 0;
        } else {
          c = $f[b];
          if (!c) {
            return d;
          }
          delete $f[b];
        }
        return d |= this.dispatch({type:"keyup", keyCode:b, charCode:c, keyName:H(e) ? e : "", shiftKey:M[16], ctrlKey:M[17], altKey:M[18], metaKey:M[224]});
    }
  }}), ag = r.KB = {listen:function(a, b, c, d) {
    a && b && dc.listen(a, b, c, d);
    return ag;
  }, listenOnce:function(a, b, c, d) {
    a && b && dc.listenOnce(a, b, c, d);
    return ag;
  }, unlisten:function(a, b, c, d) {
    a && b && dc.unlisten(a, b, c, d);
    return ag;
  }, listening:function(a, b, c, d) {
    return dc.listening(a, b, c, d);
  }};
  p.listen([20, 21], dc);
  9 > f.IE ? L.listen(["keyup", "keydown", "keypress"], dc) : p.listen(["keyup", "keydown", "keypress"], dc);
  r.ee = "2019/05/30  1:19:28.11";
  window.X = r;
  m.rd();
})();

