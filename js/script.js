window._A = {
    "config": {
        "v": 1,
        "isLocal": false,
        "psd": {
            "landscape": {
                "w": 1680,
                "h": 945
            },
            "portrait": {
                "w": 376,
                "h": 749
            }
        }
    },
    "webp": true,
    "img": {
        "jpg": ".webp?1",
        "png": ".webp?1"
    },
    "route": {
        "new": {
            "url": "\/",
            "page": "home"
        },
        "old": {
            "url": false,
            "page": false
        }
    },
    "is": {
        "404": false,
        "home": true
    },
    "was": []
};
window.R = {},
R.iLerp = (t,r,s)=>R.Clamp((s - t) / (r - t), 0, 1),
R.Lerp = (t,r,s)=>t * (1 - s) + r * s,
R.Damp = (t,r,s)=>R.Lerp(t, r, 1 - Math.exp(Math.log(1 - s) * RD)),
R.Remap = (t,r,s,e,i)=>R.Lerp(s, e, R.iLerp(t, r, i)),
R.M = class {
    constructor(t) {
        R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
        this.v = this.vInit(t),
        this.raf = new R.RafR(this.run)
    }
    vInit(r) {
        const i = {
            el: R.Select.el(r.el),
            e: {
                curve: r.e || "linear"
            },
            d: {
                origin: r.d || 0,
                curr: 0
            },
            delay: r.delay || 0,
            cb: r.cb || !1,
            r: r.r || 2,
            prog: 0,
            progE: 0,
            elapsed: 0
        };
        i.elL = i.el.length,
        R.Has(r, "update") ? i.up = t=>{
            r.update(i)
        }
        : R.Has(r, "svg") ? i.up = this.uSvg : R.Has(r, "line") ? i.up = this.uLine : i.up = this.uProp;
        var s = r.p || !1
          , t = r.svg || !1
          , a = r.line || !1;
        let e = !1;
        if (s) {
            i.prop = {},
            i.propI = [];
            var n = Object.keys(s);
            i.propL = n.length;
            for (let t = 0; t < i.propL; t++) {
                const u = n[t];
                i.prop[t] = {
                    name: u,
                    origin: {
                        start: s[u][0],
                        end: s[u][1]
                    },
                    curr: s[u][0],
                    start: s[u][0],
                    end: s[u][1],
                    unit: s[u][2] || "%"
                };
                var o = u.charAt(0)
                  , h = "r" === o && e ? "r2" : o;
                e = "r" === o,
                i.propI[h] = t
            }
        } else if (t)
            i.svg = {
                type: t.type,
                attr: "polygon" === t.type ? "points" : "d",
                end: t.end,
                originArr: {},
                arr: {},
                val: []
            },
            i.svg.start = t.start || i.el[0].getAttribute(i.svg.attr),
            i.svg.curr = i.svg.start,
            i.svg.originArr.start = R.Svg.split(i.svg.start),
            i.svg.originArr.end = R.Svg.split(i.svg.end),
            i.svg.arr.start = i.svg.originArr.start,
            i.svg.arr.end = i.svg.originArr.end,
            i.svg.arrL = i.svg.arr.start.length;
        else if (a) {
            i.line = {
                dashed: a.dashed,
                coeff: {
                    start: R.Is.def(a.start) ? (100 - a.start) / 100 : 1,
                    end: R.Is.def(a.end) ? (100 - a.end) / 100 : 0
                },
                shapeL: [],
                origin: {
                    start: [],
                    end: []
                },
                curr: [],
                start: [],
                end: []
            };
            for (let e = 0; e < i.elL; e++) {
                var l = a.elWL || i.el[e];
                i.line.shapeL[e] = R.Svg.shapeL(l);
                let t;
                if (i.line.dashed) {
                    const c = i.line.dashed;
                    let r = 0;
                    var d = c.split(/[\s,]/)
                      , v = d.length;
                    for (let t = 0; t < v; t++)
                        r += parseFloat(d[t]) || 0;
                    let s = "";
                    var p = Math.ceil(i.line.shapeL[e] / r);
                    for (let t = 0; t < p; t++)
                        s += c + " ";
                    t = s + "0 " + i.line.shapeL[e]
                } else
                    t = i.line.shapeL[e];
                i.el[e].style.strokeDasharray = t,
                i.line.origin.start[e] = i.line.coeff.start * i.line.shapeL[e],
                i.line.origin.end[e] = i.line.coeff.end * i.line.shapeL[e],
                i.line.curr[e] = i.line.origin.start[e],
                i.line.start[e] = i.line.origin.start[e],
                i.line.end[e] = i.line.origin.end[e]
            }
        }
        return i
    }
    play(t) {
        this.pause(),
        this.vUpd(t),
        this.delay.run()
    }
    pause() {
        this.raf.stop(),
        this.delay && this.delay.stop()
    }
    vUpd(t) {
        var r = t || {}
          , s = R.Has(r, "reverse") ? "start" : "end";
        if (R.Has(this.v, "prop"))
            for (let t = 0; t < this.v.propL; t++)
                this.v.prop[t].end = this.v.prop[t].origin[s],
                this.v.prop[t].start = this.v.prop[t].curr,
                R.Has(r, "p") && R.Has(r.p, this.v.prop[t].name) && (R.Has(r.p[this.v.prop[t].name], "newEnd") && (this.v.prop[t].end = r.p[this.v.prop[t].name].newEnd),
                R.Has(r.p[this.v.prop[t].name], "newStart") && (this.v.prop[t].start = r.p[this.v.prop[t].name].newStart));
        else if (R.Has(this.v, "svg"))
            R.Has(r, "svg") && R.Has(r.svg, "start") ? this.v.svg.arr.start = r.svg.start : this.v.svg.arr.start = R.Svg.split(this.v.svg.curr),
            R.Has(r, "svg") && R.Has(r.svg, "end") ? this.v.svg.arr.end = r.svg.end : this.v.svg.arr.end = this.v.svg.originArr[s];
        else if (R.Has(this.v, "line")) {
            for (let t = 0; t < this.v.elL; t++)
                this.v.line.start[t] = this.v.line.curr[t];
            if (R.Has(r, "line") && R.Has(r.line, "end")) {
                this.v.line.coeff.end = (100 - r.line.end) / 100;
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t]
            } else
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.end[t] = this.v.line.origin[s][t]
        }
        this.v.d.curr = R.Has(r, "d") ? r.d : R.R(this.v.d.origin - this.v.d.curr + this.v.elapsed),
        this.v.e.curve = r.e || this.v.e.curve,
        this.v.e.calc = R.Is.str(this.v.e.curve) ? R.Ease[this.v.e.curve] : R.Ease4(this.v.e.curve),
        this.v.delay = (R.Has(r, "delay") ? r : this.v).delay,
        this.v.cb = (R.Has(r, "cb") ? r : this.v).cb,
        this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0,
        this.delay = new R.Delay(this.gRaf,this.v.delay)
    }
    gRaf() {
        this.raf.run()
    }
    run(t) {
        1 === this.v.prog ? (this.pause(),
        this.v.up(),
        this.v.cb && this.v.cb()) : (this.v.elapsed = R.Clamp(t, 0, this.v.d.curr),
        this.v.prog = R.Clamp(this.v.elapsed / this.v.d.curr, 0, 1),
        this.v.progE = this.v.e.calc(this.v.prog),
        this.v.up())
    }
    uProp() {
        const r = this.v.prop;
        var t = this.v.propI;
        for (let t = 0; t < this.v.propL; t++)
            r[t].curr = this.lerp(r[t].start, r[t].end);
        var s = R.Has(t, "x") ? r[t.x].curr + r[t.x].unit : 0
          , e = R.Has(t, "y") ? r[t.y].curr + r[t.y].unit : 0;
        const i = s + e === 0 ? 0 : "translate3d(" + s + "," + e + ",0)"
          , a = R.Has(t, "r") ? r[t.r].name + "(" + r[t.r].curr + "deg)" : 0
          , n = R.Has(t, "r2") ? r[t.r2].name + "(" + r[t.r2].curr + "deg)" : 0
          , o = R.Has(t, "s") ? r[t.s].name + "(" + r[t.s].curr + ")" : 0;
        var h = i + a + n + o === 0 ? 0 : [i, a, n, o].filter(t=>0 !== t).join(" ")
          , l = R.Has(t, "o") ? r[t.o].curr : -1;
        for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
            0 !== h && (this.v.el[t].style.transform = h),
            0 <= l && (this.v.el[t].style.opacity = l)
    }
    uSvg() {
        const r = this.v.svg;
        r.currTemp = "";
        for (let t = 0; t < r.arrL; t++)
            r.val[t] = isNaN(r.arr.start[t]) ? r.arr.start[t] : this.lerp(r.arr.start[t], r.arr.end[t]),
            r.currTemp += r.val[t] + " ",
            r.curr = r.currTemp.trim();
        for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
            this.v.el[t].setAttribute(r.attr, r.curr)
    }
    uLine() {
        const r = this.v.line;
        for (let t = 0; t < this.v.elL; t++) {
            const s = this.v.el[t].style;
            r.curr[t] = this.lerp(r.start[t], r.end[t]),
            s.strokeDashoffset = r.curr[t],
            0 === this.v.prog && (s.opacity = 1)
        }
    }
    lerp(t, r) {
        return R.R(R.Lerp(t, r, this.v.progE), this.v.r)
    }
}
,
R.TL = class {
    constructor() {
        this.arr = [],
        this.del = 0
    }
    from(t) {
        this.del += R.Has(t, "delay") ? t.delay : 0,
        t.delay = this.del,
        this.arr.push(new R.M(t))
    }
    play(t) {
        this.run("play", t)
    }
    pause() {
        this.run("pause")
    }
    run(r, t) {
        var s = this.arr.length
          , e = t || void 0;
        for (let t = 0; t < s; t++)
            this.arr[t][r](e)
    }
}
,
R.BM = (r,s)=>{
    var e = s.length;
    for (let t = 0; t < e; t++)
        r[s[t]] = r[s[t]].bind(r)
}
,
R.Clamp = (t,r,s)=>Math.min(Math.max(t, r), s),
R.Delay = class {
    constructor(t, r) {
        this.cb = t,
        this.d = r,
        R.BM(this, ["loop"]),
        this.raf = new R.RafR(this.loop)
    }
    run() {
        0 === this.d ? this.cb() : this.raf.run()
    }
    stop() {
        this.raf.stop()
    }
    loop(t) {
        t = R.Clamp(t, 0, this.d);
        1 === R.Clamp(t / this.d, 0, 1) && (this.stop(),
        this.cb())
    }
}
,
R.Ease = {
    linear: t=>t,
    i1: t=>1 - Math.cos(t * (.5 * Math.PI)),
    o1: t=>Math.sin(t * (.5 * Math.PI)),
    io1: t=>-.5 * (Math.cos(Math.PI * t) - 1),
    i2: t=>t * t,
    o2: t=>t * (2 - t),
    io2: t=>t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
    i3: t=>t * t * t,
    o3: t=>--t * t * t + 1,
    io3: t=>t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    i4: t=>t * t * t * t,
    o4: t=>1 - --t * t * t * t,
    io4: t=>t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    i5: t=>t * t * t * t * t,
    o5: t=>1 + --t * t * t * t * t,
    io5: t=>t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    i6: t=>0 === t ? 0 : 2 ** (10 * (t - 1)),
    o6: t=>1 === t ? 1 : 1 - 2 ** (-10 * t),
    io6: t=>0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
},
R.r0 = (t,r)=>1 - 3 * r + 3 * t,
R.r1 = (t,r)=>3 * r - 6 * t,
R.r2 = (t,r,s)=>((R.r0(r, s) * t + R.r1(r, s)) * t + 3 * r) * t,
R.r3 = (t,r,s)=>3 * R.r0(r, s) * t * t + 2 * R.r1(r, s) * t + 3 * r,
R.r4 = (t,r,s,e,i)=>{
    let a, n, o = 0;
    for (; n = r + .5 * (s - r),
    0 < (a = R.r2(n, e, i) - t) ? s = n : r = n,
    1e-7 < Math.abs(a) && ++o < 10; )
        ;
    return n
}
,
R.r5 = (r,s,e,i)=>{
    for (let t = 0; t < 4; ++t) {
        var a = R.r3(s, e, i);
        if (0 === a)
            return s;
        s -= (R.r2(s, e, i) - r) / a
    }
    return s
}
,
R.Ease4 = t=>{
    const a = t[0]
      , r = t[1]
      , n = t[2]
      , s = t[3];
    let o = new Float32Array(11);
    if (a !== r || n !== s)
        for (let t = 0; t < 11; ++t)
            o[t] = R.r2(.1 * t, a, n);
    return t=>a === r && n === s ? t : 0 === t ? 0 : 1 === t ? 1 : R.r2(function(t) {
        let r = 0;
        for (var s = 1; 10 !== s && o[s] <= t; ++s)
            r += .1;
        --s;
        var e = (t - o[s]) / (o[s + 1] - o[s])
          , e = r + .1 * e
          , i = R.r3(e, a, n);
        return .001 <= i ? R.r5(t, e, a, n) : 0 === i ? e : R.r4(t, i, i + .1, a, n)
    }(t), r, s)
}
,
R.Fetch = r=>{
    var t = "json" === r.type;
    const s = t ? "json" : "text"
      , e = {
        method: t ? "POST" : "GET",
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    };
    t && (e.body = r.body),
    fetch(r.url, e).then(t=>{
        if (t.ok)
            return t[s]();
        r.error && r.error()
    }
    ).then(t=>{
        r.success(t)
    }
    )
}
,
R.Has = (t,r)=>t.hasOwnProperty(r),
R.Is = {
    str: t=>"string" == typeof t,
    obj: t=>t === Object(t),
    arr: t=>t.constructor === Array,
    def: t=>void 0 !== t,
    und: t=>void 0 === t
},
R.PCurve = (t,r,s)=>{
    return (r + s) ** (r + s) / (r ** r * s ** s) * t ** r * (1 - t) ** s
}
,
R.R = (t,r)=>{
    r = R.Is.und(r) ? 100 : 10 ** r;
    return Math.round(t * r) / r
}
,
R.Select = {
    el: t=>{
        let r = [];
        var s;
        return R.Is.str(t) ? (s = t.substring(1),
        "#" === t.charAt(0) ? r[0] = R.G.id(s) : r = R.G.class(s)) : r[0] = t,
        r
    }
    ,
    type: t=>"#" === t.charAt(0) ? "id" : "class",
    name: t=>t.substring(1)
},
R.L = (t,r,s,e)=>{
    var i = document;
    const a = R.Select.el(t);
    var n = a.length;
    let o = s;
    var t = "wheel"
      , h = "mouse";
    const l = [h + "Wheel", h + "move", "touchmove", "touchstart"];
    var d = -1 !== l.indexOf(s) && {
        passive: !1
    }
      , v = (s === l[0] ? o = "on" + t in i ? t : R.Is.def(i.onmousewheel) ? h + t : "DOMMouseScroll" : "focusOut" === s && (o = R.Snif.isFirefox ? "blur" : "focusout"),
    "a" === r ? "add" : "remove");
    for (let t = 0; t < n; t++)
        a[t][v + "EventListener"](o, e, d)
}
;
const Tab = class {
    constructor() {
        this.arr = [],
        this.pause = 0,
        R.BM(this, ["v"]),
        R.L(document, "a", "visibilitychange", this.v)
    }
    add(t) {
        this.arr.push(t)
    }
    v() {
        var t = performance.now();
        let r, s;
        s = document.hidden ? (this.pause = t,
        "stop") : (r = t - this.pause,
        "start");
        for (let t = this.l(); 0 <= t; t--)
            this.arr[t][s](r)
    }
    l() {
        return this.arr.length - 1
    }
}
;
R.Tab = new Tab;
let RD = 0;
const FR = 1e3 / 60
  , Raf = (R.Raf = class {
    constructor() {
        this._ = [],
        this.on = !0,
        R.BM(this, ["loop", "tOff", "tOn"]),
        R.Tab.add({
            stop: this.tOff,
            start: this.tOn
        }),
        this.raf()
    }
    tOff() {
        this.on = !1
    }
    tOn(t) {
        this.t = null;
        let r = this.l();
        for (; r--; )
            this._[r].sT += t;
        this.on = !0
    }
    add(t) {
        this._.push(t)
    }
    remove(t) {
        let r = this.l();
        for (; r--; )
            if (this._[r].id === t)
                return void this._.splice(r, 1)
    }
    loop(r) {
        if (this.on) {
            this.t || (this.t = r),
            RD = (r - this.t) / FR,
            this.t = r;
            let t = this.l();
            for (; t--; ) {
                const e = this._[t];
                var s;
                R.Is.def(e) && (e.sT || (e.sT = r),
                s = r - e.sT,
                e.cb(s))
            }
        }
        this.raf()
    }
    raf() {
        requestAnimationFrame(this.loop)
    }
    l() {
        return this._.length
    }
}
,
new R.Raf);
let RafId = 0;
R.RafR = class {
    constructor(t) {
        this.cb = t,
        this.on = !1,
        this.id = RafId,
        RafId++
    }
    run() {
        this.on || (Raf.add({
            id: this.id,
            cb: this.cb
        }),
        this.on = !0)
    }
    stop() {
        this.on && (Raf.remove(this.id),
        this.on = !1)
    }
}
,
R.Rand = {
    range: (t,r,s)=>R.R(Math.random() * (r - t) + t, s),
    uniq: r=>{
        const s = [];
        for (let t = 0; t < r; t++)
            s[t] = t;
        let t = r;
        for (var e, i; t--; )
            e = ~~(Math.random() * (t + 1)),
            i = s[t],
            s[t] = s[e],
            s[e] = i;
        return s
    }
},
R.Snif = {
    uA: navigator.userAgent.toLowerCase(),
    get iPadIOS13() {
        return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
    },
    get isMobile() {
        return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
    },
    get isMobileAndroid() {
        return /android.*mobile/.test(this.uA)
    },
    get isIOS() {
        return (/ipad|iphone/.test(this.uA) || this.iPadIOS13) && !window.MSStream
    },
    get isAndroid() {
        return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
    },
    get isFirefox() {
        return -1 < this.uA.indexOf("firefox")
    },
    get safari() {
        return this.uA.match(/version\/[\d.]+.*safari/)
    },
    get isSafari() {
        return !!this.safari && !this.isAndroid
    },
    get isSafariOlderThan8() {
        let t = 8;
        if (this.isSafari) {
            const r = this.safari[0].match(/version\/\d{1,2}/);
            t = +r[0].split("/")[1]
        }
        return t < 8
    },
    get isIEolderThan11() {
        return -1 < this.uA.indexOf("msie")
    },
    get isIE11() {
        return 0 < navigator.appVersion.indexOf("Trident/")
    },
    get isEdge() {
        return -1 < this.uA.indexOf("edge")
    }
},
R.Svg = {
    shapeL: e=>{
        var t, r, s, i;
        if ("circle" === e.tagName)
            return 2 * e.getAttribute("r") * Math.PI;
        if ("line" === e.tagName)
            return t = e.getAttribute("x1"),
            r = e.getAttribute("x2"),
            s = e.getAttribute("y1"),
            i = e.getAttribute("y2"),
            Math.sqrt((r -= t) * r + (i -= s) * i);
        if ("polyline" !== e.tagName)
            return e.getTotalLength();
        {
            let r = 0, s;
            var a = e.points.numberOfItems;
            for (let t = 0; t < a; t++) {
                var n = e.points.getItem(t);
                0 < t && (r += Math.sqrt((n.x - s.x) ** 2 + (n.y - s.y) ** 2)),
                s = n
            }
            return r
        }
    }
    ,
    split: t=>{
        const s = []
          , r = t.split(" ");
        var e = r.length;
        for (let t = 0; t < e; t++) {
            var i = r[t].split(",")
              , a = i.length;
            for (let r = 0; r < a; r++) {
                let t = i[r];
                t = isNaN(t) ? t : +t,
                s.push(t)
            }
        }
        return s
    }
},
R.Timer = class {
    constructor(t) {
        this.timer = new R.Delay(t.cb,t.delay)
    }
    run() {
        this.timer.stop(),
        this.timer.run()
    }
}
,
R.ZL = t=>9 < t ? t : "0" + t,
R.Cr = t=>document.createElement(t),
R.g = (t,r,s)=>{
    const e = t || document;
    return e["getElement" + r](s)
}
,
R.G = {
    id: (t,r)=>R.g(r, "ById", t),
    class: (t,r)=>R.g(r, "sByClassName", t),
    tag: (t,r)=>R.g(r, "sByTagName", t)
},
R.index = (r,s)=>{
    var e = s.length;
    for (let t = 0; t < e; t++)
        if (r === s[t])
            return t;
    return -1
}
,
R.Index = {
    list: t=>R.index(t, t.parentNode.children),
    class: (t,r,s)=>R.index(t, R.G.class(r, s))
},
R.PD = t=>{
    t.cancelable && t.preventDefault()
}
,
R.RO = class {
    constructor() {
        this.eT = R.Snif.isMobile ? "orientationchange" : "resize",
        this.tick = !1,
        this.arr = [],
        R.BM(this, ["fn", "gRaf", "run"]),
        this.t = new R.Timer({
            delay: 100,
            cb: this.gRaf
        }),
        this.raf = new R.RafR(this.run),
        R.L(window, "a", this.eT, this.fn)
    }
    add(t) {
        this.arr.push(t)
    }
    remove(r) {
        for (let t = this.l(); 0 <= t; t--)
            if (this.arr[t].id === r)
                return void this.arr.splice(t, 1)
    }
    fn(t) {
        this.e = t,
        this.t.run()
    }
    gRaf() {
        this.tick || (this.tick = !0,
        this.raf.run())
    }
    run() {
        for (let t = this.l(); 0 <= t; t--)
            this.arr[t].cb(this.e);
        this.raf.stop(),
        this.tick = !1
    }
    l() {
        return this.arr.length - 1
    }
}
;
const Ro = new R.RO;
let RoId = 0;
R.ROR = class {
    constructor(t) {
        this.cb = t,
        this.id = RoId,
        RoId++
    }
    on() {
        Ro.add({
            id: this.id,
            cb: this.cb
        })
    }
    off() {
        Ro.remove(this.id)
    }
}
,
R.TopReload = t=>{
    "scrollRestoration"in history ? history.scrollRestoration = "manual" : window.onbeforeunload = t=>{
        window.scrollTo(0, 0)
    }
}
,
R.O = (t,r)=>{
    t.style.opacity = r
}
,
R.pe = (t,r)=>{
    t.style.pointerEvents = r
}
,
R.PE = {
    all: t=>{
        R.pe(t, "all")
    }
    ,
    none: t=>{
        R.pe(t, "none")
    }
},
R.T = (t,r,s,e)=>{
    e = R.Is.und(e) ? "%" : e;
    t.style.transform = "translate3d(" + r + e + "," + s + e + ",0)"
}
;
!function() {
    "use strict";
    class t {
        constructor(t) {
            const s = _A;
            if (s.mutating = !0,
            s.main = {},
            this.app = R.G.id("app"),
            s.is[404])
                return;
            R.BM(this, ["eD"]);
            const e = t.engine;
            s.engine = new e,
            R.L(document.body, "a", "click", this.eD),
            new t.transition.intro((t=>{
                this.introXhr(t)
            }
            ))
        }
        eD(t) {
            let s = t.target
              , e = !1
              , i = !1;
            for (; s; ) {
                const t = s.tagName;
                if ("A" === t) {
                    e = !0;
                    break
                }
                if (("INPUT" === t || "BUTTON" === t) && "submit" === s.type) {
                    i = !0;
                    break
                }
                s = s.parentNode
            }
            if (e) {
                const e = s.href;
                s.classList.contains("_tb") && (R.PD(t),
                window.open(e))
            } else
                i && R.PD(t)
        }
        introXhr(t) {
            const s = _A;
            R.Fetch({
                url: s.route.new.url + "?fetch=true&webp=" + s.webp,
                type: "html",
                success: s=>{
                    const e = JSON.parse(s);
                    _A.color = e.color,
                    this.add(this.app, e.body),
                    this.main = R.G.id("main"),
                    t()
                }
            })
        }
        add(t, s) {
            t.insertAdjacentHTML("beforeend", s)
        }
    }
    class s {
        constructor() {
            const t = _A;
            t.resizeRq = !1,
            t.win = {
                w: 0,
                h: 0
            }
        }
        resize() {
            const t = _A
              , s = innerWidth
              , e = innerHeight;
            if (t.resizeRq = s !== t.win.w || e !== t.win.h,
            !t.resizeRq)
                return;
            t.win = {
                w: s,
                h: e
            },
            t.winSemi = {
                w: .5 * s,
                h: .5 * e
            },
            t.winRatio = {
                wh: s / e,
                hw: e / s
            };
            const i = t.config.psd;
            t.psd = {
                landscape: {
                    h: i.landscape.h,
                    w: i.landscape.w
                },
                portrait: {
                    h: i.portrait.h,
                    w: i.portrait.w
                }
            },
            t.winPsd = {
                landscape: {
                    w: s / t.psd.landscape.w,
                    h: e / t.psd.landscape.h
                },
                portrait: {
                    w: s / t.psd.portrait.w,
                    h: e / t.psd.portrait.h
                }
            },
            t.isLandscape = t.winRatio.wh > 1
        }
    }
    class e {
        constructor(t) {
            this.cbFn = t.cb,
            this.isOn = !1,
            this.isFF = R.Snif.isFirefox,
            R.BM(this, ["fn"]);
            const s = ["mouseWheel", "keydown"];
            for (let t = 0; t < 2; t++)
                R.L(document, "a", s[t], this.fn)
        }
        init(t) {
            this.isX = t.isX
        }
        on() {
            this.tick = !1,
            this.isOn = !0
        }
        resize() {
            this.spaceGap = _A.win.h - 40
        }
        fn(t) {
            this.e = t,
            this.eT = t.type,
            this.eK = t.key,
            "keydown" === this.eT && "Tab" !== this.eK || R.PD(t),
            this.isOn && (this.tick || (this.tick = !0,
            this.run()))
        }
        run() {
            const t = this.eT;
            "wheel" === t ? this.w() : "keydown" === t && this.key()
        }
        w() {
            const t = this.e;
            let s;
            const e = t.wheelDeltaY || -1 * t.deltaY;
            if (this.isX) {
                const i = t.wheelDeltaX || -1 * t.deltaX;
                s = Math.abs(i) >= Math.abs(e) ? i : e
            } else
                s = e;
            this.isFF && 1 === t.deltaMode ? s *= .75 : s *= .556,
            this.s = -s,
            this.cb()
        }
        key() {
            const t = this.eK
              , s = "ArrowUp" === t || "ArrowLeft" === t
              , e = " " === t;
            if (s || ("ArrowDown" === t || "ArrowRight" === t) || e) {
                let t = 100;
                if (s)
                    t *= -1;
                else if (e) {
                    const s = this.e.shiftKey ? -1 : 1;
                    t = this.spaceGap * s
                }
                this.s = t,
                this.cb()
            } else
                this.tick = !1
        }
        cb() {
            this.cbFn(this.s),
            this.tick = !1
        }
    }
    class i {
        constructor() {
            this.isAll = !1,
            this.timer = new R.Timer({
                delay: 300,
                cb: t=>{
                    this.isAll = !1,
                    this.rafR.run()
                }
            }),
            R.BM(this, ["r"]),
            this.rafR = new R.RafR(this.r)
        }
        init() {
            this.el = R.G.id("_p")
        }
        run() {
            this.timer.run(),
            this.isAll || (this.isAll = !0,
            this.rafR.run())
        }
        r() {
            const t = this.isAll ? "all" : "none";
            R.PE[t](this.el),
            this.rafR.stop()
        }
    }
    class r {
        constructor(t) {
            this.cb = t.cb,
            this.el = R.Has(t, "el") ? R.Select.el(t.el)[0] : document,
            R.BM(this, ["run"])
        }
        on() {
            this.l("a")
        }
        l(t) {
            R.L(this.el, t, "mousemove", this.run),
            R.L(this.el, t, "touchmove", this.run)
        }
        run(t) {
            const s = "touchmove" === t.type ? t.changedTouches[0] : t;
            this.cb(s.pageX, s.pageY, t)
        }
    }
    class n {
        constructor() {
            this.s = {
                curr: 0,
                targ: 0
            },
            this.slider2 = {
                curr: 0,
                currR: 0,
                targ: 0
            },
            this.sp3 = {
                curr: 0,
                currR: 0,
                targ: 0
            },
            this.min = 0,
            this.isDown = !1,
            this.prev = {
                x: {
                    slider2: 0,
                    sp3: 0
                },
                y: 0
            },
            R.BM(this, ["sFn", "sUp", "move", "down", "up"]),
            this.scrollV = new e({
                cb: this.sFn
            }),
            this.pointer = new i,
            this.mm = new r({
                cb: this.move
            }),
            this.isMobileTouch = R.Snif.isMobile
        }
        intro(t) {
            this.isX = t.isX,
            this.index = 0,
            this.indexPrev = 0,
            this.progress = R.G.id("progress").children[0],
            this.sp3Progress = R.G.id("sp3-progress"),
            this.sp3ProgressCurr = R.G.id("sp3-progress-curr"),
            this.navPagiIndex = 0,
            this.navPagi = R.G.class("nav-pagi-ul"),
            this.navPagiL = this.navPagi[0].children.length,
            this.navPagiY = [];
            for (let t = 0; t < this.navPagiL; t++)
                this.navPagiY[t] = {
                    curr: 110,
                    targ: 110
                };
            this.navPagiHidden = !1;
            this.sUpAll(0),
            this.cr1ColorW = R.G.id("cr1-color-w"),
            this.sp3LiWrap = R.G.id("sp3-li-w"),
            this.sp3LiW = this.sp3LiWrap.children[0]
        }
        init() {
            this.scrollV.init({
                isX: this.isX
            }),
            this.pointer.init()
        }
        resize() {
            const t = _A;
            this.isLandscape = t.isLandscape;
            const s = parseInt(getComputedStyle(this.cr1ColorW, null).getPropertyValue("padding-left"), 10)
              , e = this.cr1ColorW.offsetWidth - t.win.w + s
              , i = parseInt(getComputedStyle(this.sp3LiWrap, null).getPropertyValue("padding-left"), 10)
              , r = this.sp3LiW.offsetWidth
              , n = this.sp3LiW.offsetWidth - t.win.w + i
              , h = this.sp3Progress.offsetWidth
              , o = this.sp3LiWrap.offsetWidth / r * h;
            this.sp3XRest = h - o;
            const a = t.action.data();
            this.dataReset = a.reset,
            this.data = a.arr,
            this.dataL = a.arrL,
            this.max = {
                y: a.max,
                x: {
                    slider2: e,
                    sp3: n
                }
            },
            this.scrollV.resize();
            const l = this.clampY(this.s.targ);
            if (l === this.max.y && this.sUpAll(l),
            this.isLandscape)
                this.slider2.targ = 0,
                this.slider2.curr = 0,
                this.slider2.currR = 0,
                this.slider2T(),
                this.sp3.targ = 0,
                this.sp3.curr = 0,
                this.sp3.currR = 0,
                this.sp3T();
            else {
                const t = this.clampXSlider2(this.slider2.targ);
                t === this.max.x.slider2 && (this.slider2.targ = t,
                this.slider2.curr = t,
                this.slider2.currR = t,
                this.slider2T());
                const s = this.clampXSp3(this.sp3.targ);
                s === this.max.x.sp3 && (this.sp3.targ = s,
                this.sp3.curr = s,
                this.sp3.currR = s,
                this.sp3T())
            }
            this.dataReset(),
            this.render(),
            this.navPagiHidden = !1,
            this.navPagiUp()
        }
        menu(t) {
            const s = _A;
            this.dataReset();
            const e = s.action.menu[t];
            this.sUpAll(s.action.step[e]),
            this.render();
            for (let t = 0; t < this.navPagiL; t++)
                this.navPagiY[t].curr = this.navPagiY[t].targ;
            this.navPagiUp(),
            s.engine.gl.loop()
        }
        sFn(t) {
            const s = _A;
            this.isDown || s.formIsOpen && this.isLandscape || s.menuIsOpen || this.sUp(this.clampY(this.s.targ + t))
        }
        sUp(t) {
            this.s.targ = t,
            this.s.targ !== _A.s && this.pointer.run()
        }
        down(t) {
            if (t.ctrlKey)
                return void R.PD(t);
            const s = _A;
            if (s.formIsOpen && this.isLandscape || s.menuIsOpen)
                return;
            this.isDown = !0,
            this.isSlider2 = t.target.classList.contains("cr1-color") && !this.isLandscape,
            this.isSp3 = "sp3-li-w" === t.target.id && !this.isLandscape;
            const e = "touchstart" === t.type ? t.changedTouches[0] : t;
            this.start = {
                y: e.pageY,
                x: {
                    slider2: e.pageX,
                    sp3: e.pageX
                }
            },
            this.targ = {
                x: {
                    slider2: this.slider2.targ,
                    sp3: this.sp3.targ
                },
                y: this.s.targ
            },
            this.targPrev = {
                x: {
                    slider2: this.targ.x.slider2,
                    sp3: this.targ.x.sp3
                },
                y: this.targ.y
            }
        }
        move(t, s, e) {
            R.PD(e);
            const i = _A;
            if (this.isDown)
                if (this.isSp3 && i.isSliding) {
                    if (Math.abs(t - this.start.x.sp3) < 15)
                        return;
                    const s = 2.5;
                    t > this.prev.x.sp3 && this.targ.x.sp3 === this.min ? this.start.x.sp3 = t - (this.targPrev.x.sp3 - this.min) / s : t < this.prev.x.sp3 && this.targ.x.sp3 === this.max.x.sp3 && (this.start.x.sp3 = t - (this.targPrev.x.sp3 - this.max.x.sp3) / s),
                    this.prev.x.sp3 = t,
                    this.targ.x.sp3 = -(t - this.start.x.sp3) * s + this.targPrev.x.sp3,
                    this.targ.x.sp3 = this.clampXSp3(this.targ.x.sp3),
                    this.sp3.targ = this.targ.x.sp3
                } else if (this.isSlider2) {
                    if (Math.abs(t - this.start.x.slider2) < 15)
                        return;
                    const s = 2.5;
                    t > this.prev.x.slider2 && this.targ.x.slider2 === this.min ? this.start.x.slider2 = t - (this.targPrev.x.slider2 - this.min) / s : t < this.prev.x.slider2 && this.targ.x.slider2 === this.max.x.slider2 && (this.start.x.slider2 = t - (this.targPrev.x.slider2 - this.max.x.slider2) / s),
                    this.prev.x.slider2 = t,
                    this.targ.x.slider2 = -(t - this.start.x.slider2) * s + this.targPrev.x.slider2,
                    this.targ.x.slider2 = this.clampXSlider2(this.targ.x.slider2),
                    this.slider2.targ = this.targ.x.slider2
                } else {
                    const e = this.isX ? t : s;
                    if (Math.abs(e - this.start.y) < 10)
                        return;
                    const i = this.isMobileTouch ? 5 : 2.5;
                    e > this.prev.y && this.targ.y === this.min ? this.start.y = e - (this.targPrev.y - this.min) / i : e < this.prev.y && this.targ.y === this.max.y && (this.start.y = e - (this.targPrev.y - this.max.y) / i),
                    this.prev.y = e,
                    this.targ.y = -(e - this.start.y) * i + this.targPrev.y,
                    this.targ.y = this.clampY(this.targ.y),
                    this.sUp(this.targ.y)
                }
        }
        up() {
            this.isDown = !1
        }
        loop() {
            const t = _A
              , s = this.slider2.currR !== this.slider2.targ
              , e = this.sp3.currR !== this.sp3.targ
              , i = t.s !== this.s.targ;
            let r = !1;
            for (let t = 0; t < this.navPagiL; t++)
                if (R.R(this.navPagiY[t].curr) !== R.R(this.navPagiY[t].targ)) {
                    r = !0;
                    break
                }
            if (t.needS = i || r || s || e,
            t.needS) {
                this.s.curr = R.Damp(this.s.curr, this.s.targ, .09),
                t.s = R.R(this.s.curr),
                this.slider2.curr = R.Damp(this.slider2.curr, this.slider2.targ, .09),
                this.slider2.currR = R.R(this.slider2.curr),
                this.slider2T(),
                this.sp3.curr = R.Damp(this.sp3.curr, this.sp3.targ, .09),
                this.sp3.currR = R.R(this.sp3.curr),
                this.sp3T(),
                this.render();
                for (let t = 0; t < this.navPagiL; t++)
                    this.navPagiY[t].curr = R.Damp(this.navPagiY[t].curr, this.navPagiY[t].targ, .09);
                this.navPagiUp()
            }
        }
        slider2T() {
            R.T(this.cr1ColorW, -this.slider2.currR, 0, "px")
        }
        sp3T() {
            if (R.T(this.sp3LiW, -this.sp3.currR, 0, "px"),
            !this.isLandscape) {
                const t = R.R(R.Lerp(-this.sp3XRest, 0, this.sp3.currR / this.max.x.sp3));
                R.T(this.sp3ProgressCurr, t, 0, "px")
            }
        }
        navPagiUp() {
            for (let t = 0; t < 3; t++)
                for (let s = 0; s < this.navPagiL; s++)
                    R.T(this.navPagi[t].children[s], 0, R.R(this.navPagiY[s].curr))
        }
        render() {
            const t = _A
              , s = t.s
              , e = R.R(R.Lerp(-100, 0, s / this.max.y));
            R.T(this.progress, 0, e);
            for (let e = 0; e < this.dataL; e++) {
                const i = this.data[e];
                if (i.match(s))
                    return t.slideIndex = e,
                    this.renderPagi(),
                    i.action()
            }
        }
        renderPagi() {
            const t = _A.slideIndex
              , s = this.data[t]
              , e = s.navPagiY.index
              , i = s.navPagiY.first;
            t !== this.index && (this.indexPrev = this.index,
            this.index = t);
            const r = this.index > this.indexPrev ? -100 : 100;
            if (this.isLandscape) {
                if (this.navPagiIndex !== e || this.navPagiHidden) {
                    const t = e
                      , s = this.navPagiIndex;
                    this.navPagiIndex = t,
                    -1 !== e && (this.navPagiY[t].targ = 0),
                    -1 !== s && t !== s && (this.navPagiY[s].targ = r)
                }
            } else if (i) {
                if (this.navPagiIndex !== e) {
                    const t = e
                      , s = this.navPagiIndex;
                    this.navPagiIndex = t,
                    -1 !== s && (this.navPagiY[s].targ = r,
                    this.navPagiY[s].curr = r)
                }
                this.navPagiHidden && (this.navPagiY[this.navPagiIndex].targ = 0,
                this.navPagiHidden = !1)
            } else
                this.navPagiHidden || -1 !== this.navPagiIndex && (this.navPagiY[this.navPagiIndex].targ = r,
                this.navPagiHidden = !0)
        }
        sUpAll(t) {
            this.s.targ = t,
            this.s.curr = t,
            _A.s = t
        }
        clampXSp3(t) {
            return R.R(R.Clamp(t, this.min, this.max.x.sp3))
        }
        clampXSlider2(t) {
            return R.R(R.Clamp(t, this.min, this.max.x.slider2))
        }
        clampY(t) {
            return R.R(R.Clamp(t, this.min, this.max.y))
        }
        l(t) {
            const s = document;
            R.L(s, t, "mousedown", this.down),
            R.L(s, t, "touchstart", this.down),
            R.L(s, t, "mouseup", this.up),
            R.L(s, t, "touchend", this.up)
        }
        on() {
            this.scrollV.on(),
            this.mm.on(),
            this.l("a")
        }
    }
    class h {
        constructor(t) {
            const s = t.index
              , e = t.delay;
            this.propArr = t.prop,
            this.propArrL = this.propArr.length;
            const i = this.propArr[0];
            this.start = i[1],
            this.end = i[2],
            this.prop = {},
            this.prog = {
                show: {
                    start: s * e,
                    end: 1 - (t.length - 1 - s) * e
                },
                hide: {
                    start: 0,
                    end: 1
                }
            },
            this.curr = this.start
        }
        prepare(t) {
            this.isShow = t.isShow;
            const s = t.isRunning;
            this.isShow ? (this.prop.start = s ? this.curr : t.start,
            this.prop.end = 0) : (this.prop.start = this.curr,
            this.prop.end = t.propEndIsEnd ? t.end : t.start);
            const e = this.isShow && !s ? this.prog.show : this.prog.hide;
            this.prog.start = e.start,
            this.prog.end = e.end
        }
        loop(t) {
            const s = t.el
              , e = t.elL
              , i = [0, 0]
              , r = (R.Clamp(t.prog, this.prog.start, this.prog.end) - this.prog.start) / t.lineProgEndFirst;
            this.curr = R.R(R.Lerp(this.prop.start, this.prop.end, t.rEase(r)), 3);
            let n = ""
              , h = "";
            for (let s = 0; s < this.propArrL; s++) {
                const e = this.propArr[s]
                  , o = e[0];
                if (0 === s) {
                    i["y" === o ? 1 : 0] = this.curr
                } else if ("y" === o)
                    i[1] = this.curr;
                else if ("x" === o)
                    i[0] = this.curr;
                else if ("rotateX" === o) {
                    const s = this.isShow ? e[1] : 0
                      , i = this.isShow ? 0 : e[2];
                    n = " rotateX(" + R.R(R.Lerp(s, i, t.rEase(r)), 6) + "deg)"
                } else if ("opacity" === o) {
                    const t = this.isShow ? 0 : 1
                      , s = this.isShow ? 1 : 0;
                    h = R.R(R.Lerp(t, s, R.Ease.o5(r)), 6)
                }
            }
            for (let t = 0; t < e; t++) {
                const e = s[t].style;
                e.transform = "translate3d(" + i[0] + "%," + i[1] + "%,0)" + n,
                "" !== h && (e.opacity = h)
            }
        }
    }
    class o {
        constructor(t) {
            this.a = _A;
            const s = t.delay
              , e = t.el
              , i = t.objChildren
              , r = t.prop
              , n = t.indexStart;
            this.random = t.random,
            this.element = [],
            this.elementL = [],
            this.obj = [],
            this.objL = e.length,
            this.randUniq = [],
            this.progEndMinShow = 1;
            for (let t = 0; t < this.objL; t++) {
                this.element[t] = i ? e[t].children : [e[t]],
                this.elementL[t] = this.element[t].length,
                this.obj[t] = new h({
                    index: n + t,
                    length: this.objL,
                    delay: s,
                    prop: r
                });
                const o = this.obj[t].prog;
                0 === t && (this.lineProgEndFirst = {
                    show: o.show.end,
                    hide: o.hide.end
                }),
                o.show.end < this.progEndMinShow && (this.progEndMinShow = o.show.end),
                this.randUniq[t] = t
            }
        }
        prepare(t) {
            !t.isRunning && this.random && (this.randUniq = R.Rand.uniq(this.objL));
            for (let s = 0; s < this.objL; s++)
                this.obj[s].prepare(t)
        }
        loop(t) {
            const s = t.prog
              , e = t.lineProgEndFirst
              , i = t.rEase;
            for (let t = 0; t < this.objL; t++)
                this.obj[t].loop({
                    el: this.element[this.randUniq[t]],
                    elL: this.elementL[t],
                    prog: s,
                    lineProgEndFirst: e,
                    rEase: i
                })
        }
    }
    class a {
        constructor(t) {
            this.a = _A;
            const s = t.delay
              , e = t.lineStartTogether || !1
              , i = t.objChildren
              , r = t.random || !1;
            let n = t.el;
            R.Is.und(n.length) && (n = [n]),
            this.lineL = n.length;
            const h = t.prop
              , a = h[0];
            this.start = a[1],
            this.end = a[2],
            this.progEndMin = {
                show: 1,
                hide: 1
            },
            this.line = [];
            let l = 0;
            for (let t = 0; t < this.lineL; t++) {
                this.line[t] = new o({
                    indexStart: l,
                    objChildren: i,
                    el: n[t].children,
                    prop: h,
                    delay: s,
                    random: r
                });
                const a = this.line[t].progEndMinShow;
                a < this.progEndMin.show && (this.progEndMin.show = a),
                e || (l += this.line[t].objL)
            }
        }
        motion(t) {
            R.Is.def(this.letterAnim) && this.letterAnim.pause();
            let s = this.start
              , e = this.end;
            t.reverse && (s = this.end,
            e = this.start);
            const i = t.action
              , r = "show" === i
              , n = t.d
              , h = R.Ease[t.e]
              , o = this.line
              , a = this.lineL
              , l = o[0].obj[0].curr;
            let c = !1;
            r || (c = s < 0 && l > 0 || (s > 0 && l < 0 || Math.abs(l) < Math.abs(.3 * s)));
            let d = 0;
            const p = r ? e : s;
            Math.abs(l) === Math.abs(p) && (d = t.delay);
            for (let t = 0; t < a; t++)
                o[t].prepare({
                    isShow: r,
                    isRunning: this.isRunning,
                    propEndIsEnd: c,
                    start: s,
                    end: e
                });
            const x = n + n * (1 - this.progEndMin[i]);
            return this.letterAnim = new R.M({
                delay: d,
                d: x,
                update: t=>{
                    const s = t.prog;
                    for (let t = 0; t < a; t++)
                        o[t].loop({
                            prog: s,
                            lineProgEndFirst: o[t].lineProgEndFirst[i],
                            rEase: h
                        })
                }
                ,
                cb: t=>{
                    this.isRunning = !1
                }
            }),
            {
                play: t=>{
                    this.isRunning = !0,
                    this.letterAnim.play()
                }
            }
        }
    }
    class l {
        constructor() {
            R.BM(this, ["fn", "over", "link"]),
            this.poly = [{
                lines: "9,14.5 25,14.5 25,15.5 9,15.5 9,15",
                cross: "11.7,11 23,22.3 22.3,23 11,11.7 11.3,11.4"
            }, {
                lines: "9,18.5 25,18.5 25,19.5 9,19.5 9,19",
                cross: "11,22.3 22.3,11 23,11.7 11.7,23 11.3,22.7"
            }],
            this.morph = [],
            this.isOpen = !1,
            _A.menuIsOpen = !1
        }
        intro() {
            this.progress = R.G.id("progress"),
            this.burgerW = R.G.id("nav-burger-w"),
            this.burgerLine = R.G.class("nav-burger-line"),
            this.menuBg = R.G.id("nav-menu-bg"),
            this.liC = "nav-menu-li",
            this.li = R.G.class(this.liC),
            this.liL = this.li.length;
            const t = R.G.class("nav-menu-li-name")
              , s = R.G.class("nav-menu-li-no");
            this.nameL = t.length,
            this.nameA = [],
            this.noA = [];
            for (let e = 0; e < this.nameL; e++)
                this.nameA[e] = new a({
                    objChildren: !1,
                    el: t[e],
                    prop: [["y", 110, -110], ["rotateX", -30, 20]],
                    delay: 0,
                    lineStartTogether: !0
                }),
                this.noA[e] = new a({
                    objChildren: !1,
                    el: s[e],
                    prop: [["y", 110, -110]],
                    delay: 0
                });
            this.creditA = new a({
                objChildren: !1,
                el: R.G.id("nav-menu-credit-wrap"),
                prop: [["y", 110, -110]],
                delay: 0
            }),
            this.pagiA = new a({
                objChildren: !1,
                el: R.G.id("nav-pagi"),
                prop: [["y", 110, -110]],
                delay: .05
            });
            this.pagiA.motion({
                action: "show",
                d: 1e3,
                e: "o6",
                delay: 0,
                reverse: !1
            }).play()
        }
        on() {
            this.l("a")
        }
        off() {
            this.l("r")
        }
        lOver(t) {
            R.L("." + this.liC, t, "mouseenter", this.over),
            R.L("." + this.liC, t, "mouseleave", this.over)
        }
        l(t) {
            R.L(this.burgerW, t, "click", this.fn),
            R.L("." + this.liC, t, "click", this.link)
        }
        over(t) {
            const s = t.target
              , e = "mouseenter" === t.type
              , i = e ? R.Index.class(s, this.liC) : -1;
            for (let t = 0; t < this.liL; t++) {
                const s = t !== i && e ? "add" : "remove";
                for (let e = 0; e < 2; e++)
                    this.li[t].children[e].classList[s]("on")
            }
        }
        link(t) {
            this.off();
            const s = t.target
              , e = R.Index.class(s, this.liC);
            _A.scroll.menu(e),
            this.fn(),
            this.on()
        }
        fn() {
            const t = _A
              , s = this.isOpen ? "lines" : "cross"
              , e = this.isOpen ? "remove" : "add"
              , i = this.isOpen ? "hide" : "show"
              , r = this.isOpen ? 500 : 1800
              , n = this.isOpen ? "o3" : "o6"
              , h = this.isOpen ? "none" : "all"
              , o = this.isOpen ? "show" : "hide"
              , a = this.isOpen ? 1800 : 500
              , l = this.isOpen ? "o6" : "o3";
            for (let t = 0; t < 2; t++)
                R.Is.def(this.morph[t]) && this.morph[t].pause(),
                this.morph[t] = new R.M({
                    el: this.burgerLine[t],
                    svg: {
                        type: "polygon",
                        end: this.poly[t][s]
                    },
                    d: 600,
                    e: "o6"
                });
            this.isOpen = !this.isOpen,
            t.menuIsOpen = this.isOpen;
            let c = -1;
            if (this.isOpen) {
                const s = t.scroll.data[t.slideIndex].navPagiY;
                !0 === s.first && (c = s.index)
            }
            const d = this.isOpen ? "a" : "r";
            if (this.isOpen)
                for (let t = 0; t < this.liL; t++)
                    for (let s = 0; s < 2; s++) {
                        this.li[t].children[s].classList.remove("on");
                        const e = t === c ? "add" : "remove";
                        this.li[t].children[s].classList[e]("active")
                    }
            this.lOver(d);
            const p = this.pagiA.motion({
                action: o,
                d: a,
                e: l,
                delay: 100,
                reverse: !1
            })
              , x = []
              , y = [];
            for (let t = 0; t < this.nameL; t++) {
                const s = 50 * t;
                x[t] = this.nameA[t].motion({
                    action: i,
                    d: r,
                    e: n,
                    delay: s,
                    reverse: !1
                }),
                y[t] = this.noA[t].motion({
                    action: i,
                    d: r,
                    e: n,
                    delay: s + 100,
                    reverse: !1
                })
            }
            const w = this.creditA.motion({
                action: i,
                d: r,
                e: n,
                delay: 400,
                reverse: !1
            });
            for (let t = 0; t < this.liL; t++) {
                const s = this.isOpen && t === c ? "none" : h;
                R.PE[s](this.li[t])
            }
            this.menuBg.classList[e]("on"),
            this.progress.classList[e]("on");
            for (let t = 0; t < this.nameL; t++)
                x[t].play(),
                y[t].play();
            w.play(),
            p.play();
            for (let t = 0; t < 2; t++)
                this.morph[t].play()
        }
    }
    var c = {
        vertex: "precision highp float;attribute vec2 c;attribute vec2 e;uniform mat4 a;uniform mat4 b;uniform vec2 d;uniform vec2 t;varying vec2 f;varying vec2 g;void main(){gl_Position=a*b*vec4(c,0,1);f=vec2((e-.5)*d+.5+t);g=c;}",
        fragment: "precision highp float;varying vec2 f;varying vec2 g;uniform sampler2D h;uniform int j;uniform vec3 k;uniform float l;float i (vec2 c){return fract(sin(dot(c.xy,vec2(12.9898,78.233)))*43758.5453123);}void main(){vec4 m;if(j==1){m=texture2D(h,f);}else{if(j==2){float n=1.2;float x=g.x*n-(n*.5);float y=g.y*n+(n*.5);m=vec4(k,abs(x-y*.32)*l);}else{m=vec4(mix(k*.75,k,g.y),1.);}m+=mix(-0.017,0.017,i(g));}gl_FragColor=m;}"
    };
    function d() {
        const t = new Float32Array(16);
        return t[0] = 1,
        t[5] = 1,
        t[10] = 1,
        t[15] = 1,
        t
    }
    function p(t) {
        return t[0] = 1,
        t[1] = 0,
        t[2] = 0,
        t[3] = 0,
        t[4] = 0,
        t[5] = 1,
        t[6] = 0,
        t[7] = 0,
        t[8] = 0,
        t[9] = 0,
        t[10] = 1,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        t
    }
    function x(t, s) {
        return function(t, s, e) {
            let i = e[0]
              , r = e[1]
              , n = e[2];
            if (s === t)
                t[12] = s[0] * i + s[4] * r + s[8] * n + s[12],
                t[13] = s[1] * i + s[5] * r + s[9] * n + s[13],
                t[14] = s[2] * i + s[6] * r + s[10] * n + s[14],
                t[15] = s[3] * i + s[7] * r + s[11] * n + s[15];
            else {
                const e = s[0]
                  , h = s[1]
                  , o = s[2]
                  , a = s[3]
                  , l = s[4]
                  , c = s[5]
                  , d = s[6]
                  , p = s[7]
                  , x = s[8]
                  , y = s[9]
                  , w = s[10]
                  , m = s[11];
                t[0] = e,
                t[1] = h,
                t[2] = o,
                t[3] = a,
                t[4] = l,
                t[5] = c,
                t[6] = d,
                t[7] = p,
                t[8] = x,
                t[9] = y,
                t[10] = w,
                t[11] = m,
                t[12] = e * i + l * r + x * n + s[12],
                t[13] = h * i + c * r + y * n + s[13],
                t[14] = o * i + d * r + w * n + s[14],
                t[15] = a * i + p * r + m * n + s[15]
            }
            return t
        }(t, t, s)
    }
    class y {
        constructor(t, s) {
            this.gl = t,
            this.near = s.near || 1,
            this.far = s.far || 2e3,
            this.fov = s.fov || 45,
            this.aspect = s.aspect || 1,
            this.left = s.left,
            this.right = s.right,
            this.top = s.top,
            this.bottom = s.bottom,
            this.type = s.type,
            this.projectionMatrix = d(),
            this.matrixCamera = d()
        }
        resize(t) {
            "perspective" === this.type ? this.perspective(t) : this.orthographic(t),
            this.gl.renderer.uProjectionMatrix(this.projectionMatrix)
        }
        perspective(t) {
            t && (this.aspect = t.aspect);
            const s = this.fov * (Math.PI / 180);
            this.projectionMatrix = function(t, s, e, i, r) {
                const n = 1 / Math.tan(.5 * s)
                  , h = 1 / (i - r);
                return t[0] = n / e,
                t[1] = 0,
                t[2] = 0,
                t[3] = 0,
                t[4] = 0,
                t[5] = n,
                t[6] = 0,
                t[7] = 0,
                t[8] = 0,
                t[9] = 0,
                t[10] = (r + i) * h,
                t[11] = -1,
                t[12] = 0,
                t[13] = 0,
                t[14] = 2 * r * i * h,
                t[15] = 0,
                t
            }(this.projectionMatrix, s, this.aspect, this.near, this.far);
            const e = _A.winSemi;
            this.posOrigin = {
                x: e.w,
                y: -e.h,
                z: e.h / Math.tan(Math.PI * this.fov / 360)
            }
        }
        orthographic(t) {
            t && (this.right = t.right,
            this.bottom = t.bottom),
            this.projectionMatrix = function(t, s, e, i, r, n, h) {
                const o = 1 / (s - e)
                  , a = 1 / (i - r)
                  , l = 1 / (n - h);
                return t[0] = -2 * o,
                t[1] = 0,
                t[2] = 0,
                t[3] = 0,
                t[4] = 0,
                t[5] = -2 * a,
                t[6] = 0,
                t[7] = 0,
                t[8] = 0,
                t[9] = 0,
                t[10] = 2 * l,
                t[11] = 0,
                t[12] = (s + e) * o,
                t[13] = (r + i) * a,
                t[14] = (h + n) * l,
                t[15] = 1,
                t
            }(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far)
        }
        render(t) {
            this.matrixCamera = p(this.matrixCamera),
            this.matrixCamera = x(this.matrixCamera, [this.posOrigin.x + t.x, this.posOrigin.y + t.y, this.posOrigin.z + t.z]);
            return function(t, s) {
                const e = s[0]
                  , i = s[1]
                  , r = s[2]
                  , n = s[3]
                  , h = s[4]
                  , o = s[5]
                  , a = s[6]
                  , l = s[7]
                  , c = s[8]
                  , d = s[9]
                  , p = s[10]
                  , x = s[11]
                  , y = s[12]
                  , w = s[13]
                  , m = s[14]
                  , f = s[15]
                  , g = p * f
                  , u = m * x
                  , L = a * f
                  , R = m * l
                  , v = a * x
                  , G = p * l
                  , b = r * f
                  , A = m * n
                  , I = r * x
                  , O = p * n
                  , P = r * l
                  , T = a * n
                  , C = c * w
                  , S = y * d
                  , E = h * w
                  , _ = y * o
                  , M = h * d
                  , Y = c * o
                  , U = e * w
                  , D = y * i
                  , B = e * d
                  , j = c * i
                  , z = e * o
                  , H = h * i
                  , F = g * o + R * d + v * w - (u * o + L * d + G * w)
                  , k = u * i + b * d + O * w - (g * i + A * d + I * w)
                  , X = L * i + A * o + P * w - (R * i + b * o + T * w)
                  , N = G * i + I * o + T * d - (v * i + O * o + P * d)
                  , W = 1 / (e * F + h * k + c * X + y * N);
                return t[0] = W * F,
                t[1] = W * k,
                t[2] = W * X,
                t[3] = W * N,
                t[4] = W * (u * h + L * c + G * y - (g * h + R * c + v * y)),
                t[5] = W * (g * e + A * c + I * y - (u * e + b * c + O * y)),
                t[6] = W * (R * e + b * h + T * y - (L * e + A * h + P * y)),
                t[7] = W * (v * e + O * h + P * c - (G * e + I * h + T * c)),
                t[8] = W * (C * l + _ * x + M * f - (S * l + E * x + Y * f)),
                t[9] = W * (S * n + U * x + j * f - (C * n + D * x + B * f)),
                t[10] = W * (E * n + D * l + z * f - (_ * n + U * l + H * f)),
                t[11] = W * (Y * n + B * l + H * x - (M * n + j * l + z * x)),
                t[12] = W * (E * p + Y * m + S * a - (M * m + C * a + _ * p)),
                t[13] = W * (B * m + C * r + D * p - (U * p + j * m + S * r)),
                t[14] = W * (U * a + H * m + _ * r - (z * m + E * r + D * a)),
                t[15] = W * (z * p + M * r + j * a - (B * a + H * p + Y * r)),
                t
            }(this.matrixCamera, this.matrixCamera)
        }
    }
    class w {
        constructor(t, s) {
            const e = _A;
            this.gl = t,
            this.cb = s;
            const i = "." + (e.webp ? "webp" : "jpg")
              , r = "." + (e.webp ? "webp" : "png")
              , n = "/static/media/" + (e.initIsLanscape ? "d" : "m") + "/";
            this.version = "?" + e.config.v;
            const h = e.section
              , o = e.sectionL
              , a = {};
            for (let t = 0; t < o; t++) {
                const s = h[t]
                  , e = s.length;
                a[s.name] = [];
                for (let t = 0; t < e; t++) {
                    const e = R.ZL(t);
                    if ("cr1" === s.name) {
                        a[s.name][t] = {
                            r: n + s.name + "/" + e + "/r/00" + i,
                            l: []
                        };
                        for (let r = 0; r < 3; r++)
                            a[s.name][t].l[r] = n + s.name + "/" + e + "/l/" + R.ZL(r) + i
                    } else {
                        const h = "cr0" === s.name ? r : i;
                        a[s.name][t] = n + s.name + "/" + e + h
                    }
                }
            }
            this.media = {},
            this.mediaL = 0,
            this.loadNo = R.G.id("load-no").children[0],
            this.prog = {
                curr: 0,
                targ: 0
            },
            this.no = 0,
            this.prevNo = 0,
            R.BM(this, ["loop"]),
            this.raf = new R.RafR(this.loop);
            for (let t = 0; t < o; t++) {
                const s = h[t]
                  , e = s.length;
                this.media[s.name] = [];
                for (let t = 0; t < e; t++)
                    if ("cr1" === s.name) {
                        this.media[s.name][t] = {
                            l: []
                        },
                        this.imgSet({
                            src: a[s.name][t].r,
                            name: s.name,
                            index: t
                        });
                        for (let e = 0; e < 3; e++)
                            this.imgSet({
                                src: a[s.name][t].l[e],
                                name: s.name,
                                index: t,
                                left: e
                            })
                    } else
                        this.imgSet({
                            src: a[s.name][t],
                            name: s.name,
                            index: t
                        })
            }
            this.raf.run()
        }
        imgSet(t) {
            const s = t.index
              , e = t.name
              , i = t.src
              , r = new Image;
            r.onload = i=>{
                const n = {
                    attrib: this.texInit(r),
                    element: r,
                    type: "img"
                };
                "cr1" === e ? R.Is.def(t.left) ? this.media[e][s].l[t.left] = n : this.media[e][s].r = n : this.media[e][s] = n,
                this.no++
            }
            ,
            r.src = i + this.version,
            this.mediaL++
        }
        texInit(t) {
            const s = this.gl
              , e = s.createTexture();
            return s.bindTexture(s.TEXTURE_2D, e),
            s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, t),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.LINEAR),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.LINEAR),
            e
        }
        loop() {
            this.no !== this.prevNo && (this.prevNo = this.no,
            this.loadNo.textContent = Math.round(100 / this.mediaL * this.no)),
            this.no === this.mediaL && (this.raf.stop(),
            this.cb(this.media))
        }
    }
    class m {
        constructor(t) {
            this.dpr = t.dpr;
            const s = R.G.id("gl");
            this.gl = s.getContext("webgl", {
                antialias: !0,
                alpha: !0
            }) || s.getContext("experimental-webgl"),
            this.state = {
                depthTest: null,
                cullFace: null
            },
            this.setBlendFunc(),
            this.gl.renderer = this;
            const e = this.gl.getExtension("OES_vertex_array_object")
              , i = ["create", "bind"];
            this.vertexArray = {};
            for (let t = 0; t < 2; t++) {
                const s = i[t];
                this.vertexArray[s] = e[s + "VertexArrayOES"].bind(e)
            }
            this.programCurrId = null,
            this.viewport = {
                width: null,
                height: null
            },
            this.camera = new y(this.gl,t.camera),
            new w(this.gl,(s=>{
                this.tex = s,
                t.cb()
            }
            ))
        }
        setFaceCulling(t) {
            this.state.cullFace !== t && (this.state.cullFace = t,
            this.gl.enable(this.gl.CULL_FACE),
            this.gl.cullFace(this.gl[t]))
        }
        setBlendFunc() {
            this.gl.enable(this.gl.BLEND),
            this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
        }
        clear() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
        }
        resize() {
            this.win = _A.win,
            this.width = this.win.w,
            this.height = this.win.h,
            this.gl.canvas.width = this.width * this.dpr,
            this.gl.canvas.height = this.height * this.dpr,
            this.camera.resize({
                aspect: this.gl.canvas.width / this.gl.canvas.height
            }),
            this.setViewport()
        }
        setViewport() {
            const t = this.width * this.dpr
              , s = this.height * this.dpr;
            this.viewport.width === t && this.viewport.height === s || (this.viewport.width = t,
            this.viewport.height = s,
            this.gl.viewport(0, 0, t, s),
            this.viewMatrix = this.camera.render({
                x: 0,
                y: 0,
                z: 0
            }))
        }
        render(t, s) {
            s.draw(),
            t.draw()
        }
    }
    let f = 1;
    class g {
        constructor(t, s) {
            this.gl = t,
            this.uniform = s.uniform || {},
            this.id = f++,
            this.program = this.crP(s.shader);
            const e = this.uniform;
            e.a = {
                type: "Matrix4fv"
            },
            e.b = {
                type: "Matrix4fv"
            },
            this.getL(e, "Uniform"),
            this.gl.renderer.uProjectionMatrix = t=>{
                e.a.value = t
            }
        }
        crP(t) {
            const s = this.gl
              , e = this.crS(t.vertex, s.VERTEX_SHADER)
              , i = this.crS(t.fragment, s.FRAGMENT_SHADER)
              , r = s.createProgram();
            return s.attachShader(r, e),
            s.attachShader(r, i),
            s.linkProgram(r),
            s.deleteShader(e),
            s.deleteShader(i),
            r
        }
        crS(t, s) {
            const e = this.gl.createShader(s);
            return this.gl.shaderSource(e, t),
            this.gl.compileShader(e),
            e
        }
        getL(t, s) {
            for (const e in t)
                R.Has(t, e) && (t[e].location = this.gl["get" + s + "Location"](this.program, e))
        }
        setUniform() {
            for (const t in this.uniform)
                if (R.Has(this.uniform, t)) {
                    const s = this.uniform[t]
                      , e = s.location
                      , i = "uniform" + s.type;
                    "Matrix" === s.type.substring(0, 6) ? this.gl[i](e, !1, s.value) : this.gl[i](e, s.value)
                }
        }
        run() {
            this.gl.renderer.programCurrId === this.id || (this.gl.useProgram(this.program),
            this.gl.renderer.programCurrId = this.id)
        }
    }
    class u {
        constructor(t, s) {
            this.gl = t,
            this.index = s.index,
            this.program = s.program,
            this.mode = s.mode,
            this.face = s.face,
            this.attrib = s.attrib,
            this.hasTex = s.hasTex,
            this.hasTex1 = 1 === this.hasTex,
            this.gl.renderer.vertexArray.bind(null),
            this.program.getL(this.attrib, "Attrib"),
            this.modelMatrix = d()
        }
        setVAO() {
            const t = this.gl.renderer;
            this.vao = t.vertexArray.create(),
            t.vertexArray.bind(this.vao),
            this.setAttrib(),
            t.vertexArray.bind(null)
        }
        setAttrib() {
            const t = this.gl;
            for (const s in this.attrib)
                if (R.Has(this.attrib, s)) {
                    const e = this.attrib[s]
                      , i = "index" === s
                      , r = e.data.constructor;
                    r === Float32Array ? e.type = t.FLOAT : r === Uint16Array ? e.type = t.UNSIGNED_SHORT : e.type = t.UNSIGNED_INT,
                    e.count = e.data.length / e.size,
                    e.target = i ? t.ELEMENT_ARRAY_BUFFER : t.ARRAY_BUFFER,
                    e.normalize = !1,
                    t.bindBuffer(e.target, t.createBuffer()),
                    t.bufferData(e.target, e.data, t.STATIC_DRAW),
                    i || (t.enableVertexAttribArray(e.location),
                    t.vertexAttribPointer(e.location, e.size, e.type, e.normalize, 0, 0))
                }
        }
        draw(t) {
            const s = this.gl
              , e = s.renderer;
            e.setFaceCulling(this.face),
            this.program.run(),
            this.modelMatrix = p(this.modelMatrix);
            const i = e.viewMatrix;
            let r = function(t, s, e) {
                const i = e[0]
                  , r = e[1]
                  , n = e[2]
                  , h = e[3]
                  , o = e[4]
                  , a = e[5]
                  , l = e[6]
                  , c = e[7]
                  , d = e[8]
                  , p = e[9]
                  , x = e[10]
                  , y = e[11]
                  , w = e[12]
                  , m = e[13]
                  , f = e[14]
                  , g = e[15]
                  , u = s[0]
                  , L = s[1]
                  , R = s[2]
                  , v = s[3]
                  , G = s[4]
                  , b = s[5]
                  , A = s[6]
                  , I = s[7]
                  , O = s[8]
                  , P = s[9]
                  , T = s[10]
                  , C = s[11]
                  , S = s[12]
                  , E = s[13]
                  , _ = s[14]
                  , M = s[15];
                return t[0] = i * u + r * G + n * O + h * S,
                t[1] = i * L + r * b + n * P + h * E,
                t[2] = i * R + r * A + n * T + h * _,
                t[3] = i * v + r * I + n * C + h * M,
                t[4] = o * u + a * G + l * O + c * S,
                t[5] = o * L + a * b + l * P + c * E,
                t[6] = o * R + a * A + l * T + c * _,
                t[7] = o * v + a * I + l * C + c * M,
                t[8] = d * u + p * G + x * O + y * S,
                t[9] = d * L + p * b + x * P + y * E,
                t[10] = d * R + p * A + x * T + y * _,
                t[11] = d * v + p * I + x * C + y * M,
                t[12] = w * u + m * G + f * O + g * S,
                t[13] = w * L + m * b + f * P + g * E,
                t[14] = w * R + m * A + f * T + g * _,
                t[15] = w * v + m * I + f * C + g * M,
                t
            }(n = this.modelMatrix, n, i);
            var n;
            const h = t.tr
              , o = h.x
              , a = h.y + h.sliderY
              , l = h.w
              , c = h.h + h.sliderH;
            let d, y, w;
            if (this.hasTex1)
                d = [h.tx, h.ty - h.sliderTy - _A.introGLScale],
                y = [0, 0, 0],
                w = 1;
            else {
                d = [0, 0];
                const t = _A.color.cr1[this.index];
                R.Is.def(t) ? (y = t.rgbNorm,
                w = 1) : (y = _A.color.cr0.rgbNorm,
                w = h.opacity)
            }
            r = x(r, [o, -a, 0]),
            r = function(t, s) {
                return function(t, s, e) {
                    let i = e[0]
                      , r = e[1]
                      , n = e[2];
                    return t[0] = s[0] * i,
                    t[1] = s[1] * i,
                    t[2] = s[2] * i,
                    t[3] = s[3] * i,
                    t[4] = s[4] * r,
                    t[5] = s[5] * r,
                    t[6] = s[6] * r,
                    t[7] = s[7] * r,
                    t[8] = s[8] * n,
                    t[9] = s[9] * n,
                    t[10] = s[10] * n,
                    t[11] = s[11] * n,
                    t[12] = s[12],
                    t[13] = s[13],
                    t[14] = s[14],
                    t[15] = s[15],
                    t
                }(t, t, s)
            }(r, [l, c, 1]);
            const m = this.program.uniform
              , f = t.media;
            if (this.hasTex1) {
                const t = h.scale + _A.introGLScale
                  , s = 0 === l ? 0 : l / c
                  , e = f.ratio.wh
                  , i = s / e;
                let r = 1
                  , n = 1;
                e > 1 ? (r = s,
                i > 1 && (r /= i,
                n /= i)) : (n = 1 / s,
                i < 1 && (r *= i,
                n *= i)),
                m.d.value = [r / t, n / t]
            }
            m.j.value = this.hasTex,
            m.t.value = d,
            m.k.value = y,
            m.l.value = w,
            m.b.value = r,
            this.program.setUniform(),
            this.hasTex1 && s.bindTexture(s.TEXTURE_2D, this.attrib.e.tex),
            e.vertexArray.bind(this.vao);
            const g = this.attrib.index;
            s.drawElements(s[this.mode], g.count, g.type, 0)
        }
    }
    class L {
        constructor(t, s) {
            const e = _A;
            this.program = s.program,
            this.gl = t;
            const i = this.gl.renderer.tex;
            this.section = e.section,
            this.sectionL = e.sectionL,
            this.plane = {};
            for (let t = 0; t < this.sectionL; t++) {
                const s = this.section[t]
                  , e = s.length
                  , r = s.name;
                this.plane[r] = [];
                for (let s = 0; s < e; s++) {
                    const e = i[r][s];
                    if ("cr1" === r) {
                        this.plane[r][s] = {
                            l: []
                        },
                        this.plane[r][s].r = this.pCr({
                            tex: e.r,
                            index: t
                        });
                        for (let i = 0; i < 3; i++)
                            this.plane[r][s].l[i] = this.pCr({
                                tex: e.l[i],
                                index: t
                            })
                    } else
                        this.plane[r][s] = this.pCr({
                            tex: e,
                            index: t
                        })
                }
            }
        }
        pCr(t) {
            const s = t.tex
              , e = t.index
              , i = s.element
              , r = i.width
              , n = i.height
              , h = {
                pts: {
                    hori: 2,
                    vert: 2
                },
                tex: s,
                media: {
                    obj: i,
                    dimension: {
                        width: r,
                        height: n
                    },
                    ratio: {
                        wh: r / n,
                        hw: n / r
                    }
                },
                geo: new u(this.gl,{
                    hasTex: 1,
                    index: e,
                    program: this.program,
                    mode: "TRIANGLE_STRIP",
                    face: "FRONT",
                    attrib: {
                        c: {
                            size: 2
                        },
                        index: {
                            size: 1
                        },
                        e: {
                            size: 2,
                            tex: s.attrib
                        }
                    }
                })
            }
              , o = this.planeSetup(h)
              , a = h.geo.attrib;
            return a.c.data = new Float32Array(o.pos),
            a.index.data = new Uint16Array(o.index),
            a.e.data = new Float32Array(o.texture),
            h.geo.setVAO(),
            h
        }
        draw() {
            for (let t = 0; t < this.sectionL; t++) {
                const s = this.section[t]
                  , e = s.length
                  , i = s.name;
                for (let t = 0; t < e; t++)
                    if ("cr1" === i) {
                        this.drawP(this.plane[i][t].r);
                        for (let s = 0; s < 3; s++)
                            this.drawP(this.plane[i][t].l[s])
                    } else
                        this.drawP(this.plane[i][t])
            }
        }
        drawP(t) {
            const s = _A.win
              , e = t.tr
              , i = e.h > 0 && e.w > 0
              , r = e.x < s.w
              , n = e.x + e.w > 0
              , h = e.y < s.h
              , o = e.y + e.h > 0;
            h && o && (r && n) && i ? (t.isOut && (t.isOut = !1),
            t.geo.draw(t)) : t.isOut || (t.isOut = !0,
            t.geo.draw(t))
        }
        planeSetup(t) {
            t.isOut = !1;
            const s = t.pts.hori
              , e = t.pts.vert
              , i = s - 1
              , r = e - 1
              , n = 1 / i
              , h = 1 / r
              , o = [];
            let a = 0;
            for (let t = 0; t < e; t++) {
                const e = t * h - 1;
                for (let t = 0; t < s; t++)
                    o[a++] = t * n,
                    o[a++] = e
            }
            const l = [];
            let c = 0;
            const d = e - 1
              , p = e - 2
              , x = s - 1;
            for (let t = 0; t < d; t++) {
                const e = s * t
                  , i = e + s;
                for (let r = 0; r < s; r++) {
                    const n = i + r;
                    l[c++] = e + r,
                    l[c++] = n,
                    r === x && t < p && (l[c++] = n,
                    l[c++] = s * (t + 1))
                }
            }
            const y = t.media.ratio.wh
              , w = {};
            y > 1 ? (w.w = y,
            w.h = 1) : (w.w = 1,
            w.h = 1 / y);
            const m = .5 * (1 - 1 / w.w)
              , f = .5 * (1 - 1 / w.h)
              , g = [];
            let u = 0;
            for (let t = 0; t < e; t++) {
                const e = 1 - (t / r / w.h + f);
                for (let t = 0; t < s; t++)
                    g[u++] = t / i / w.w + m,
                    g[u++] = e
            }
            return {
                pos: o,
                index: l,
                texture: g
            }
        }
    }
    class v {
        constructor(t, s) {
            const e = s.program
              , i = new Float32Array([0, -1, 1, -1, 0, 0, 1, 0])
              , r = new Uint16Array([0, 2, 1, 3])
              , n = _A.color.cr1L;
            this.bgL = n + 1,
            this.bg = [];
            for (let s = 0; s < this.bgL; s++) {
                this.bg[s] = {
                    geo: new u(t,{
                        hasTex: s === n ? 2 : 0,
                        index: s,
                        program: e,
                        mode: "TRIANGLE_STRIP",
                        face: "FRONT",
                        attrib: {
                            c: {
                                size: 2
                            },
                            index: {
                                size: 1
                            }
                        }
                    }),
                    isOut: !1
                };
                const h = this.bg[s].geo.attrib;
                h.c.data = i,
                h.index.data = r,
                this.bg[s].geo.setVAO()
            }
        }
        draw() {
            const t = _A.win;
            for (let s = 0; s < this.bgL; s++) {
                const e = this.bg[s]
                  , i = e.tr
                  , r = i.h > 0 && i.w > 0
                  , n = i.x < t.w
                  , h = i.x + i.w > 0
                  , o = i.y < t.h
                  , a = i.y + i.h > 0;
                o && a && (n && h) && r ? (this.bg[s].isOut && (e.isOut = !1),
                e.geo.draw(e)) : e.isOut || (e.isOut = !0,
                e.geo.draw(e))
            }
        }
    }
    class G {
        constructor(t) {
            this.renderer = new m({
                camera: {
                    type: "perspective"
                },
                dpr: _A.initIsLanscape ? 1.5 : 2,
                cb: t
            }),
            this.gl = this.renderer.gl,
            this.program = new g(this.gl,{
                shader: c,
                uniform: {
                    j: {
                        type: "1i",
                        value: 0
                    },
                    d: {
                        type: "2fv",
                        value: [1, 1]
                    },
                    t: {
                        type: "2fv",
                        value: [0, 0]
                    },
                    k: {
                        type: "3fv",
                        value: [0, 0, 0]
                    },
                    l: {
                        type: "1f",
                        value: 0
                    }
                }
            })
        }
        init() {
            this.renderer.clear();
            const t = {
                program: this.program
            };
            this.planeTex = new L(this.gl,t),
            this.planeBg = new v(this.gl,t)
        }
        resize() {
            this.renderer.resize()
        }
        loop() {
            this.renderer.render(this.planeTex, this.planeBg)
        }
    }
    class b {
        constructor() {
            this.prop = ["x", "y", "w", "h", "scale", "tx", "ty"],
            this.propL = this.prop.length,
            this.propBgL = 4,
            this.slider1Name = ["de3", "en2"],
            this.slider1 = {};
            for (let t = 0; t < 2; t++)
                this.slider1[this.slider1Name[t]] = {
                    index: 0,
                    y: [],
                    ty: [],
                    h: []
                };
            this.slider2 = {
                r: {
                    index: 0,
                    y: [],
                    ty: [],
                    h: []
                },
                l: {
                    index: 0,
                    y: [],
                    ty: [],
                    h: []
                }
            },
            this.bg = {
                y: [],
                h: []
            },
            R.BM(this, ["slide1", "slide2Left", "slide2Right"])
        }
        intro() {
            this.de3LiLine = R.G.class("de3-li-line"),
            this.en2LiLine = R.G.class("en2-li-line"),
            this.slider2L = 20,
            this.dom = {
                cr1: {
                    visible: !0,
                    style: {
                        show: "block",
                        hide: "none"
                    }
                },
                de3: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                en2: {
                    visible: !0,
                    style: {
                        show: "block",
                        hide: "none"
                    }
                },
                de0: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                en0: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                cr0: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                ex0: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                sp0: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                },
                sp2: {
                    visible: !0,
                    style: {
                        show: "flex",
                        hide: "none"
                    }
                }
            }
        }
        domUp(t) {
            const s = t.name;
            if (this.isLandscape || "cr1" !== s) {
                const e = t.a;
                ("show" === e && !this.dom[s].visible || "hide" === e && this.dom[s].visible) && (this.dom[s].visible = !this.dom[s].visible,
                R.G.id(s).style.display = this.dom[s].style[e])
            } else
                this.dom[s].visible = !1
        }
        init() {
            const t = _A
              , s = t.engine.gl;
            this.texGL = s.planeTex.plane,
            this.section = t.section,
            this.sectionL = t.sectionL;
            for (let t = 0; t < this.sectionL; t++) {
                const s = this.section[t]
                  , e = s.length
                  , i = s.name;
                for (let t = 0; t < e; t++)
                    if ("cr1" === i) {
                        this.texGL[i][t].r.tr = {
                            x: 0,
                            y: 0,
                            w: 1,
                            h: 1,
                            scale: 1,
                            tx: 0,
                            ty: 0,
                            sliderY: 0,
                            sliderH: 0,
                            sliderTy: 0
                        };
                        for (let s = 0; s < 3; s++)
                            this.texGL[i][t].l[s].tr = {
                                x: 0,
                                y: 0,
                                w: 1,
                                h: 1,
                                scale: 1,
                                tx: 0,
                                ty: 0,
                                sliderY: 0,
                                sliderH: 0,
                                sliderTy: 0
                            }
                    } else
                        this.texGL[i][t].tr = {
                            x: 0,
                            y: 0,
                            w: 1,
                            h: 1,
                            scale: 1,
                            tx: 0,
                            ty: 0,
                            sliderY: 0,
                            sliderH: 0,
                            sliderTy: 0
                        }
            }
            this.texBgGL = s.planeBg.bg,
            this.bgLastL = t.color.cr1L,
            this.bgL = t.color.cr1L + 1;
            for (let t = 0; t < this.bgL; t++)
                this.texBgGL[t].tr = {
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    sliderY: 0,
                    sliderH: 0
                }
        }
        on() {
            const t = "click";
            R.L(".slider-1", "a", t, this.slide1),
            R.L(".cr1-type-txt", "a", t, this.slide2Left),
            R.L(".cr1-color", "a", t, this.slide2Right)
        }
        slide2Left(t) {
            const s = R.Index.class(t.target, "cr1-type-txt");
            if (s === this.slider2.l.index)
                return;
            this.slider2.l.index = s;
            const e = this.slider2.r.index
              , i = this.setSlide({
                type: 2,
                side: "l",
                index: s
            });
            for (let t = 0; t < 3; t++)
                this.slider2.l.y[e][t] = i.y[t],
                this.slider2.l.ty[e][t] = i.ty[t],
                this.slider2.l.h[e][t] = i.h[t];
            _A.fxCr1.left()
        }
        slide2Right(t) {
            const s = R.Index.class(t.target, "cr1-color");
            if (s === this.slider2.r.index)
                return;
            this.slider2.r.index = s;
            const e = this.setSlide({
                type: 2,
                side: "r",
                index: s
            })
              , i = this.setSlide({
                type: 2,
                side: "l",
                index: this.slider2.l.index
            })
              , r = this.setSlide({
                type: 2,
                side: "l",
                index: -1
            })
              , n = this.setSlide({
                type: 2,
                side: "l",
                index: 3
            })
              , h = this.setSlideBg({
                index: s
            });
            for (let t = 0; t < this.slider2L; t++) {
                this.slider2.r.y[t] = e.y[t],
                this.slider2.r.ty[t] = e.ty[t],
                this.slider2.r.h[t] = e.h[t];
                for (let e = 0; e < 3; e++) {
                    let h;
                    h = t === s ? i : t > s ? r : n,
                    this.slider2.l.y[t][e] = h.y[e],
                    this.slider2.l.ty[t][e] = h.ty[e],
                    this.slider2.l.h[t][e] = h.h[e]
                }
            }
            for (let t = 0; t < this.bgL; t++)
                this.bg.y[t] = h.y[t],
                this.bg.h[t] = h.h[t];
            _A.fxCr1.right()
        }
        slide1(t) {
            const s = t.target.classList.contains("de3-li")
              , e = s ? "de3" : "en2"
              , i = s ? this.de3LiLine : this.en2LiLine
              , r = R.Index.class(t.target, e + "-li");
            this.slider1[e].index = r;
            const n = this.setSlide({
                type: 1,
                index: r
            });
            for (let t = 0; t < 3; t++) {
                this.slider1[e].y[t] = n.y[t],
                this.slider1[e].ty[t] = n.ty[t],
                this.slider1[e].h[t] = n.h[t];
                const s = t === r ? "add" : "remove";
                i[t].children[0].children[0].classList[s]("on")
            }
        }
        resize() {
            const t = _A
              , s = t.win.w
              , e = t.win.h
              , i = t.winSemi.w
              , r = t.winSemi.h
              , n = .5 * t.winSemi.w
              , h = t.winPsd
              , o = h.landscape.h
              , a = h.landscape.w
              , l = h.portrait.h
              , c = h.portrait.w
              , d = {}
              , p = {};
            this.isLandscape = t.isLandscape;
            const x = .44 * e
              , y = .56 * e
              , w = {
                landscape: {
                    w: 352 * o,
                    h: 468 * o
                },
                portrait: {
                    w: 200 * l,
                    h: 268 * l
                }
            };
            w.landscape.x = .5 * (i - w.landscape.w),
            w.landscape.y = .5 * (e - w.landscape.h),
            w.portrait.x = .5 * (s - w.portrait.w),
            w.portrait.y = x + .5 * (y - w.portrait.h);
            const m = {
                landscape: {
                    w: 384 * o,
                    h: 544 * o
                },
                portrait: {
                    w: 180 * l,
                    h: 254 * l
                }
            };
            m.landscape.x = .5 * (i - m.landscape.w),
            m.landscape.y = .5 * (e - m.landscape.h),
            m.portrait.x = .5 * (s - m.portrait.w),
            m.portrait.y = .5 * (x - m.portrait.h);
            const f = {
                landscape: {
                    w: 1488 * a - 66,
                    h: 710 * o - 40
                },
                portrait: {
                    w: 340 * c,
                    h: 520 * l
                }
            };
            f.landscape.x = .5 * (s - f.landscape.w),
            f.landscape.y = .5 * (e - f.landscape.h),
            f.portrait.x = .5 * (s - f.portrait.w),
            f.portrait.y = .5 * (e - f.portrait.h);
            const g = 1800
              , u = 1200
              , L = [{
                d: 20,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }, {
                d: g,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !1
            }, {
                d: g,
                first: !1
            }, {
                d: u,
                first: !0
            }];
            p.bg = {
                hideIn: {
                    x: 0,
                    y: e,
                    w: i,
                    h: e
                },
                show: {
                    x: 0,
                    y: 0,
                    w: i,
                    h: e
                },
                hideOut: {
                    x: 0,
                    y: -e,
                    w: i,
                    h: e
                },
                disable: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }
            },
            p.bgCr0 = {
                hideIn: {
                    x: f.landscape.x,
                    y: e + 2 * f.landscape.y,
                    w: f.landscape.w,
                    h: f.landscape.h,
                    opacity: 0
                },
                show: {
                    x: f.landscape.x,
                    y: f.landscape.y,
                    w: f.landscape.w,
                    h: f.landscape.h,
                    opacity: 1
                },
                hideOut: {
                    x: f.landscape.x,
                    y: -e,
                    w: f.landscape.w,
                    h: f.landscape.h,
                    opacity: 0
                },
                disable: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    opacity: 0
                }
            },
            p.gl = {
                intro: {
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: .4 * -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                },
                de0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                de1: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: 0,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .5
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: n,
                        y: r,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: -.02,
                        ty: -.08
                    }
                },
                de2: [{
                    hideIn: {
                        x: n,
                        y: r,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: w.landscape.x,
                        y: w.landscape.y,
                        w: w.landscape.w,
                        h: w.landscape.h,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: n,
                        y: r,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }, {
                    hideIn: {
                        x: .75 * s,
                        y: 0,
                        w: 0,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: i,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: i,
                        y: r,
                        w: i,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                de3: [{
                    hideIn: {
                        x: n,
                        y: r,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    }
                }],
                en0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                en1: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                en2: [{
                    hideIn: {
                        x: 0,
                        y: e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .5
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    }
                }],
                en3: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                cr0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                cr1: [{
                    r: {
                        hideIn: {
                            x: i + n,
                            y: e,
                            w: 0,
                            h: e,
                            scale: 1,
                            tx: 0,
                            ty: .5
                        },
                        show: {
                            x: i,
                            y: 0,
                            w: i,
                            h: e,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        hideOut: {
                            x: i,
                            y: -e,
                            w: i,
                            h: e,
                            scale: 1,
                            tx: 0,
                            ty: -.5
                        }
                    },
                    l: [{
                        hideIn: {
                            x: n,
                            y: e + .8 * r,
                            w: 0,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        show: {
                            x: m.landscape.x,
                            y: m.landscape.y,
                            w: m.landscape.w,
                            h: m.landscape.h,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        hideOut: {
                            x: n,
                            y: .5 * -r,
                            w: 0,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        }
                    }]
                }],
                cr2: {
                    hideIn: {
                        x: i,
                        y: e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: i,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: i,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                ex0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                ex1: [{
                    hideIn: {
                        x: 0,
                        y: e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .4
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                }, {
                    hideIn: {
                        x: i + n,
                        y: 1.2 * e,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: i + w.landscape.x,
                        y: w.landscape.y,
                        w: w.landscape.w,
                        h: w.landscape.h,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: i + n,
                        y: r,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                ex2: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .4
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                sp0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                sp1: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .4
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: i,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                sp2: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                sp3: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                co0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .75
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                }
            },
            d.bg = {
                hideIn: {
                    x: 0,
                    y: 0,
                    w: s,
                    h: 0
                },
                show: {
                    x: 0,
                    y: 0,
                    w: s,
                    h: x
                },
                hideOut: {
                    x: 0,
                    y: 0,
                    w: s,
                    h: x
                },
                disable: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }
            },
            d.bgCr0 = {
                hideIn: {
                    x: f.portrait.x,
                    y: e + 2 * f.portrait.y,
                    w: f.portrait.w,
                    h: f.portrait.h,
                    opacity: 0
                },
                show: {
                    x: f.portrait.x,
                    y: f.portrait.y,
                    w: f.portrait.w,
                    h: f.portrait.h,
                    opacity: 1
                },
                hideOut: {
                    x: f.portrait.x,
                    y: -e,
                    w: f.portrait.w,
                    h: f.portrait.h,
                    opacity: 0
                },
                disable: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    opacity: 0
                }
            },
            d.gl = {
                intro: {
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .3
                    }
                },
                de0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e + x,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    }
                },
                de1: {
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: .2 * x,
                        w: s,
                        h: .8 * x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                },
                de2: [{
                    hideIn: {
                        x: i,
                        y: x + .5 * y,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: w.portrait.x,
                        y: w.portrait.y,
                        w: w.portrait.w,
                        h: w.portrait.h,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: i,
                        y: x + .5 * y,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }, {
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: .2 * x,
                        w: s,
                        h: .8 * x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                de3: [{
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                en0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                en1: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                en2: [{
                    hideIn: {
                        x: 0,
                        y: x,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                en3: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.8
                    }
                },
                cr0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: x,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .7
                    }
                },
                cr1: [{
                    r: {
                        hideIn: {
                            x: 0,
                            y: e,
                            w: s,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        show: {
                            x: 0,
                            y: x,
                            w: s,
                            h: y,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        hideOut: {
                            x: 0,
                            y: x,
                            w: s,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: -.2
                        }
                    },
                    l: [{
                        hideIn: {
                            x: i,
                            y: .5 * -x,
                            w: 0,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        show: {
                            x: m.portrait.x,
                            y: m.portrait.y,
                            w: m.portrait.w,
                            h: m.portrait.h,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        },
                        hideOut: {
                            x: i,
                            y: .5 * x,
                            w: 0,
                            h: 0,
                            scale: 1,
                            tx: 0,
                            ty: 0
                        }
                    }]
                }],
                cr2: {
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                },
                ex0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .7
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -y,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    }
                },
                ex1: [{
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: .2 * x,
                        w: s,
                        h: .8 * x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }, {
                    hideIn: {
                        x: i,
                        y: 1.2 * e,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: w.portrait.x,
                        y: w.portrait.y,
                        w: w.portrait.w,
                        h: w.portrait.h,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: i,
                        y: x + .5 * y,
                        w: 0,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                }],
                ex2: {
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                },
                sp0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: -y,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: -.5
                    }
                },
                sp1: {
                    hideIn: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: 0,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: x,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    }
                },
                sp2: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .3
                    }
                },
                sp3: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .3
                    }
                },
                co0: {
                    hideIn: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .9
                    },
                    show: {
                        x: 0,
                        y: 0,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: 0
                    },
                    hideOut: {
                        x: 0,
                        y: e,
                        w: s,
                        h: e,
                        scale: 1,
                        tx: 0,
                        ty: .8
                    }
                }
            },
            this.slider1H = this.isLandscape ? e : x;
            for (let t = 0; t < 2; t++) {
                const s = this.slider1Name[t]
                  , e = this.setSlide({
                    type: 1,
                    index: this.slider1[s].index
                });
                for (let t = 0; t < 3; t++)
                    this.texGL[s][t].tr.sliderY = e.y[t],
                    this.texGL[s][t].tr.sliderTy = e.ty[t],
                    this.texGL[s][t].tr.sliderH = e.h[t],
                    this.slider1[s].y[t] = e.y[t],
                    this.slider1[s].ty[t] = e.ty[t],
                    this.slider1[s].h[t] = e.h[t]
            }
            this.slider2HL = this.isLandscape ? m.landscape.h : m.portrait.h,
            this.slider2HR = this.isLandscape ? e : y;
            const R = this.slider2.r.index
              , v = this.setSlide({
                type: 2,
                side: "r",
                index: R
            })
              , G = this.setSlide({
                type: 2,
                side: "l",
                index: this.slider2.l.index
            })
              , b = this.setSlide({
                type: 2,
                side: "l",
                index: -1
            })
              , A = this.setSlide({
                type: 2,
                side: "l",
                index: 3
            })
              , I = this.texGL.cr1;
            for (let t = 0; t < this.slider2L; t++) {
                I[t].r.tr.sliderY = v.y[t],
                I[t].r.tr.sliderTy = v.ty[t],
                I[t].r.tr.sliderH = v.h[t],
                this.slider2.r.y[t] = v.y[t],
                this.slider2.r.ty[t] = v.ty[t],
                this.slider2.r.h[t] = v.h[t],
                this.slider2.l.y[t] = [],
                this.slider2.l.ty[t] = [],
                this.slider2.l.h[t] = [];
                for (let s = 0; s < 3; s++) {
                    let e;
                    e = t === R ? G : t > R ? b : A,
                    I[t].l[s].tr.sliderY = e.y[s],
                    I[t].l[s].tr.sliderTy = e.ty[s],
                    I[t].l[s].tr.sliderH = e.h[s],
                    this.slider2.l.y[t][s] = e.y[s],
                    this.slider2.l.ty[t][s] = e.ty[s],
                    this.slider2.l.h[t][s] = e.h[s]
                }
            }
            this.bgH = this.isLandscape ? e : x;
            const O = this.setSlideBg({
                index: R
            });
            for (let t = 0; t < this.bgLastL; t++)
                this.texBgGL[t].tr.sliderY = O.y[t],
                this.texBgGL[t].tr.sliderH = O.h[t],
                this.bg.y[t] = O.y[t],
                this.bg.h[t] = O.h[t];
            this.pos = this.isLandscape ? p : d;
            const P = this.pos.gl.de3;
            for (let t = 0; t < 2; t++)
                P[t + 1] = P[0];
            const T = this.pos.gl.en2;
            for (let t = 0; t < 2; t++)
                T[t + 1] = T[0];
            const C = this.pos.gl.cr1;
            for (let t = 0; t < 2; t++)
                C[0].l[t + 1] = C[0].l[0];
            for (let t = 0; t < this.slider2L - 1; t++)
                C[t + 1] = C[0];
            const S = {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                scale: 1,
                tx: 0,
                ty: 0
            }
              , E = this.pos.gl
              , _ = Object.keys(E)
              , M = _.length;
            for (let t = 0; t < M; t++) {
                const s = _[t]
                  , e = E[_[t]]
                  , i = e.length;
                if ("cr1" === s)
                    for (let t = 0; t < i; t++) {
                        e[t].r.disable = S;
                        const s = e[t].l.length;
                        for (let i = 0; i < s; i++)
                            e[t].l[i].disable = S
                    }
                else if ("de2" === s || "de3" === s || "en2" === s || "ex1" === s) {
                    const s = E[_[t]]
                      , e = s.length;
                    for (let t = 0; t < e; t++)
                        s[t].disable = S
                } else
                    E[_[t]].disable = S
            }
            this.stepL = L.length,
            this.step = [L[0].d],
            this.menu = [];
            for (let t = 1; t < this.stepL; t++)
                this.step[t] = L[t].d + this.step[t - 1],
                L[t].first && this.menu.push(t)
        }
        data() {
            const t = _A
              , s = this.step
              , e = this.stepL
              , i = this.texGL
              , r = this.pos.bg
              , n = this.pos.bgCr0
              , h = this.pos.gl
              , o = "disable"
              , a = "hide"
              , l = !1
              , c = [{
                navPagiY: {
                    index: -1,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "de0",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.intro[0],
                        pos: h.intro,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: "hideIn"
                    }),
                    t.mutating || t.fxHero.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: -1,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.intro[0],
                        pos: h.intro,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: "disable"
                    }),
                    t.fxHero.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxDe0.run({
                        a: "hide",
                        reverse: !0
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !0
                },
                action: s=>{
                    this.domUp({
                        name: "de0",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.intro[0],
                        pos: h.intro,
                        action: "disable"
                    }),
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: "hideIn"
                    }),
                    t.fxHero.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxDe0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxDe0.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxDe1.run({
                        a: "hide",
                        reverse: !0
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "de0",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: "disable"
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.de2[0],
                        pos: h.de2[0],
                        action: "hideIn"
                    }),
                    this.setGL({
                        tex: i.de2[1],
                        pos: h.de2[1],
                        action: "hideIn"
                    }),
                    t.fxDe1.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.domUp({
                        name: "de3",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    i.de1[0].tr.scale = R.R(h.de1.show.h / i.de1[0].tr.h, 7),
                    this.setGL({
                        tex: i.de2[0],
                        pos: h.de2[0],
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    i.de2[0].tr.scale = R.R(h.de2[0].show.h / i.de2[0].tr.h, 7),
                    this.setGL({
                        tex: i.de2[1],
                        pos: h.de2[1],
                        action: ["hideIn", "show"],
                        norm: e
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: "hideIn"
                        });
                    t.fxDe1.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.de2[0],
                        pos: h.de2[0],
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    i.de2[0].tr.scale = R.R(h.de2[0].show.h / i.de2[0].tr.h, 7),
                    this.setGL({
                        tex: i.de2[1],
                        pos: h.de2[1],
                        action: ["show", "hideOut"],
                        norm: e
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: ["hideIn", "show"],
                            norm: e
                        }),
                        this.isLandscape && (i.de3[t].tr.scale = R.R(h.de3[t].show.h / i.de3[t].tr.h, 7));
                    t.fxDe3.run({
                        a: "hide"
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "en0",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "de3",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: "disable"
                    }),
                    this.setGL({
                        tex: i.de2[0],
                        pos: h.de2[0],
                        action: "disable"
                    }),
                    this.setGL({
                        tex: i.de2[1],
                        pos: h.de2[1],
                        action: "disable"
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: "show"
                        }),
                        this.isLandscape && (i.de3[t].tr.scale = 1);
                    t.fxDe3.run({
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: "hideIn"
                    })
                }
            }, {
                navPagiY: {
                    index: 0,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: ["show", "hideOut"],
                            norm: e
                        });
                    t.fxDe3.run({
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxEn0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !0
                },
                action: s=>{
                    this.domUp({
                        name: "de3",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "en0",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: "hideIn"
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: "hideOut"
                        });
                    t.fxEn0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: ["hideIn", "show"],
                        norm: e
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: "disable"
                        });
                    t.fxEn0.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxEn1.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "en2",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "en0",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: "show"
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: "hideIn"
                        });
                    t.fxEn1.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: ["show", "hideOut"],
                        norm: e
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: ["hideIn", "show"],
                            norm: e
                        }),
                        this.isLandscape && (i.en2[t].tr.scale = R.R(h.en2[t].show.h / i.en2[t].tr.h, 7));
                    t.fxEn1.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxEn2.run({
                        a: "hide"
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "en2",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: "hideOut"
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: "show"
                        }),
                        this.isLandscape && (i.en2[t].tr.scale = 1);
                    t.fxEn2.run({
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: "hideIn"
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: ["show", "hideOut"],
                            norm: e
                        });
                    t.fxEn2.run({
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: "disable"
                    }),
                    t.fxEn3.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "en2",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "cr0",
                        a: "hide"
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: "hideOut"
                        });
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: "hideIn"
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: "hideIn"
                    }),
                    t.fxEn3.run({
                        a: "show"
                    })
                }
            }, {
                navPagiY: {
                    index: 1,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxEn3.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxCr0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !0
                },
                action: s=>{
                    this.domUp({
                        name: "cr1",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "cr0",
                        a: "show"
                    }),
                    this.setBgGL({
                        pos: r,
                        action: "hideIn"
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: "show"
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: "hideIn"
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: "hideIn"
                            })
                    }
                    t.fxCr0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setBgGL({
                        pos: r,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: ["show", "hideOut"],
                        norm: e
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: ["hideIn", "show"],
                            norm: e
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: ["hideIn", "show"],
                                norm: e
                            }),
                            this.isLandscape && (i.cr1[t].l[s].tr.scale = R.R(h.cr1[t].l[s].show.h / i.cr1[t].l[s].tr.h, 7))
                    }
                    t.fxCr0.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxCr1.run({
                        a: "hide"
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "cr0",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "cr1",
                        a: "show"
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: "hideOut"
                    }),
                    this.setBgGL({
                        pos: r,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: "hideIn"
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: "show"
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: "show"
                            }),
                            this.isLandscape && (i.cr1[t].l[s].tr.scale = 1)
                    }
                    t.fxCr1.run({
                        a: "show"
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setBgGL({
                        pos: r,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: "disable"
                    }),
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: ["hideIn", "show"],
                        norm: e
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: ["show", "hideOut"],
                            norm: e
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: ["show", "hideOut"],
                                norm: e
                            }),
                            this.isLandscape && (i.cr1[t].l[s].tr.scale = R.R(h.cr1[t].l[s].show.h / i.cr1[t].l[s].tr.h, 7))
                    }
                    t.fxCr1.run({
                        a: "hide"
                    }),
                    t.fxCr2.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "cr1",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "ex0",
                        a: "hide"
                    }),
                    this.setBgGL({
                        pos: r,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: "hideIn"
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: "hideOut"
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: "hideOut"
                            })
                    }
                    t.fxCr2.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 2,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxCr2.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxEx0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 3,
                    first: !0
                },
                action: s=>{
                    this.domUp({
                        name: "ex0",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.ex1[0],
                        pos: h.de0,
                        action: "hideIn"
                    }),
                    t.fxEx0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 3,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.ex1[0],
                        pos: h.ex1[0],
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.ex1[1],
                        pos: h.ex1[1],
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    i.ex1[1].tr.scale = R.R(h.ex1[1].show.h / i.ex1[1].tr.h, 7),
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: "hideIn"
                    }),
                    t.fxEx0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 3,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "ex0",
                        a: "hide"
                    });
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.ex1[0],
                        pos: h.ex1[0],
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.ex1[1],
                        pos: h.ex1[1],
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    i.ex1[1].tr.scale = R.R(h.ex1[1].show.h / i.ex1[1].tr.h, 7),
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxEx2.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 3,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "sp0",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.ex1[0],
                        pos: h.ex1[0],
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.ex1[1],
                        pos: h.ex1[1],
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: "hideIn"
                    }),
                    t.fxEx2.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 3,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxEx2.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxSp0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !0
                },
                action: s=>{
                    this.domUp({
                        name: "sp0",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: "hideIn"
                    }),
                    t.fxSp0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxSp1.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxSp0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "sp0",
                        a: "hide"
                    }),
                    this.domUp({
                        name: "sp2",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: "hideIn"
                    }),
                    t.fxSp1.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxSp1.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxSp2.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "sp2",
                        a: "show"
                    }),
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: "hideIn"
                    }),
                    t.fxSp2.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxSp2.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxSp3.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    this.domUp({
                        name: "sp2",
                        a: "hide"
                    }),
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: "show"
                    }),
                    this.setGL({
                        tex: i.co0[0],
                        pos: h.co0,
                        action: "hideIn"
                    }),
                    t.fxSp3.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 4,
                    first: !1
                },
                action: s=>{
                    const e = this.ease().io2;
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: ["show", "hideOut"],
                        norm: e
                    }),
                    this.setGL({
                        tex: i.co0[0],
                        pos: h.co0,
                        action: ["hideIn", "show"],
                        norm: e
                    }),
                    t.fxSp3.run({
                        a: "hide",
                        reverse: !1
                    }),
                    t.fxCo0.run({
                        a: "hide",
                        reverse: !1
                    })
                }
            }, {
                navPagiY: {
                    index: 5,
                    first: !0
                },
                action: s=>{
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: "hideOut"
                    }),
                    this.setGL({
                        tex: i.co0[0],
                        pos: h.co0,
                        action: "show"
                    }),
                    t.fxCo0.run({
                        a: "show",
                        reverse: !1
                    })
                }
            }];
            c[0].match = t=>t <= s[0];
            for (let t = 1; t < this.stepL; t++)
                c[t].match = e=>e > s[t - 1] && e <= s[t];
            return {
                reset: s=>{
                    this.domUp({
                        name: "cr1",
                        a: a
                    }),
                    this.domUp({
                        name: "de3",
                        a: a
                    }),
                    this.domUp({
                        name: "en2",
                        a: a
                    }),
                    this.domUp({
                        name: "de0",
                        a: a
                    }),
                    this.domUp({
                        name: "en0",
                        a: a
                    }),
                    this.domUp({
                        name: "cr0",
                        a: a
                    }),
                    this.domUp({
                        name: "ex0",
                        a: a
                    }),
                    this.domUp({
                        name: "sp0",
                        a: a
                    }),
                    this.domUp({
                        name: "sp2",
                        a: a
                    }),
                    this.setBgCr0GL({
                        pos: n,
                        action: o
                    }),
                    this.setBgGL({
                        pos: r,
                        action: o
                    }),
                    this.setGL({
                        tex: i.intro[0],
                        pos: h.intro,
                        action: o
                    }),
                    this.setGL({
                        tex: i.de0[0],
                        pos: h.de0,
                        action: o
                    }),
                    this.setGL({
                        tex: i.de1[0],
                        pos: h.de1,
                        action: o
                    }),
                    this.setGL({
                        tex: i.de2[0],
                        pos: h.de2[0],
                        action: o
                    }),
                    this.setGL({
                        tex: i.de2[1],
                        pos: h.de2[1],
                        action: o
                    }),
                    this.setGL({
                        tex: i.en0[0],
                        pos: h.en0,
                        action: o
                    }),
                    this.setGL({
                        tex: i.en1[0],
                        pos: h.en1,
                        action: o
                    }),
                    this.setGL({
                        tex: i.en3[0],
                        pos: h.en3,
                        action: o
                    }),
                    this.setGL({
                        tex: i.cr0[0],
                        pos: h.cr0,
                        action: o
                    }),
                    this.setGL({
                        tex: i.cr2[0],
                        pos: h.cr2,
                        action: o
                    }),
                    this.setGL({
                        tex: i.ex0[0],
                        pos: h.ex0,
                        action: o
                    }),
                    this.setGL({
                        tex: i.ex1[0],
                        pos: h.ex1[0],
                        action: o
                    }),
                    this.setGL({
                        tex: i.ex1[1],
                        pos: h.ex1[1],
                        action: o
                    }),
                    this.setGL({
                        tex: i.ex2[0],
                        pos: h.ex2,
                        action: o
                    }),
                    this.setGL({
                        tex: i.sp0[0],
                        pos: h.sp0,
                        action: o
                    }),
                    this.setGL({
                        tex: i.sp1[0],
                        pos: h.sp1,
                        action: o
                    }),
                    this.setGL({
                        tex: i.sp2[0],
                        pos: h.sp2,
                        action: o
                    }),
                    this.setGL({
                        tex: i.sp3[0],
                        pos: h.sp3,
                        action: o
                    }),
                    this.setGL({
                        tex: i.co0[0],
                        pos: h.co0,
                        action: o
                    }),
                    t.fxHero.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxDe0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxDe1.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxEn0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxEn1.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxEn3.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxCr0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxCr2.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxEx0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxEx2.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxSp0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxSp1.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxSp2.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxSp3.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxCo0.run({
                        a: a,
                        reverse: l
                    }),
                    t.fxDe3.run({
                        a: a
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.de3[t],
                            pos: h.de3[t],
                            action: o
                        });
                    t.fxEn2.run({
                        a: a
                    });
                    for (let t = 0; t < 3; t++)
                        this.setGL({
                            tex: i.en2[t],
                            pos: h.en2[t],
                            action: o
                        });
                    t.fxCr1.run({
                        a: a
                    });
                    for (let t = 0; t < this.slider2L; t++) {
                        this.setGL({
                            tex: i.cr1[t].r,
                            pos: h.cr1[t].r,
                            action: o
                        });
                        for (let s = 0; s < 3; s++)
                            this.setGL({
                                tex: i.cr1[t].l[s],
                                pos: h.cr1[t].l[s],
                                action: o
                            })
                    }
                }
                ,
                arr: c,
                arrL: c.length,
                max: s[e - 1]
            }
        }
        loop() {
            const t = _A;
            t.needGL = !1;
            for (let s = 0; s < 2; s++) {
                const e = this.slider1Name[s];
                for (let s = 0; s < 3; s++)
                    this.texGL[e][s].tr.sliderY = R.Damp(this.texGL[e][s].tr.sliderY, this.slider1[e].y[s], .07),
                    this.texGL[e][s].tr.sliderTy = R.Damp(this.texGL[e][s].tr.sliderTy, this.slider1[e].ty[s], .07),
                    this.texGL[e][s].tr.sliderH = R.Damp(this.texGL[e][s].tr.sliderH, this.slider1[e].h[s], .07),
                    R.R(this.texGL[e][s].tr.sliderH) !== R.R(this.slider1[e].h[s]) && (t.needGL = !0)
            }
            for (let s = 0; s < this.slider2L; s++) {
                const e = "cr1";
                this.texGL[e][s].r.tr.sliderY = R.Damp(this.texGL[e][s].r.tr.sliderY, this.slider2.r.y[s], .07),
                this.texGL[e][s].r.tr.sliderTy = R.Damp(this.texGL[e][s].r.tr.sliderTy, this.slider2.r.ty[s], .07),
                this.texGL[e][s].r.tr.sliderH = R.Damp(this.texGL[e][s].r.tr.sliderH, this.slider2.r.h[s], .07),
                R.R(this.texGL[e][s].r.tr.sliderH) !== R.R(this.slider2.r.h[s]) && (t.needGL = !0);
                for (let i = 0; i < 3; i++)
                    this.texGL[e][s].l[i].tr.sliderY = R.Damp(this.texGL[e][s].l[i].tr.sliderY, this.slider2.l.y[s][i], .07),
                    this.texGL[e][s].l[i].tr.sliderTy = R.Damp(this.texGL[e][s].l[i].tr.sliderTy, this.slider2.l.ty[s][i], .07),
                    this.texGL[e][s].l[i].tr.sliderH = R.Damp(this.texGL[e][s].l[i].tr.sliderH, this.slider2.l.h[s][i], .07),
                    R.R(this.texGL[e][s].l[i].tr.sliderH) !== R.R(this.slider2.l.h[s][i]) && (t.needGL = !0)
            }
            for (let s = 0; s < this.bgLastL; s++)
                this.texBgGL[s].tr.sliderY = R.Damp(this.texBgGL[s].tr.sliderY, this.bg.y[s], .07),
                this.texBgGL[s].tr.sliderH = R.Damp(this.texBgGL[s].tr.sliderH, this.bg.h[s], .07),
                R.R(this.texBgGL[s].tr.sliderH) !== R.R(this.bg.h[s]) && (t.needGL = !0)
        }
        ease() {
            const t = _A
              , s = t.slideIndex - 1
              , e = this.step
              , i = s < 0 ? 0 : e[s]
              , r = (t.s - i) / (e[s + 1] - i);
            return {
                linear: r,
                io2: R.Ease.io2(r)
            }
        }
        setBgCr0GL(t) {
            const s = t.pos
              , e = t.action
              , i = t.norm || 0
              , r = R.Is.und(t.norm)
              , n = this.bgLastL;
            for (let t = 0; t < this.propBgL; t++) {
                const h = this.prop[t];
                this.texBgGL[n].tr[h] = r ? s[e][h] : R.Lerp(s[e[0]][h], s[e[1]][h], i)
            }
            this.texBgGL[n].tr.opacity = r ? s[e].opacity : R.Lerp(s[e[0]].opacity, s[e[1]].opacity, i)
        }
        setBgGL(t) {
            const s = t.pos
              , e = t.action
              , i = t.norm || 0
              , r = R.Is.und(t.norm);
            for (let t = 0; t < this.bgLastL; t++)
                for (let n = 0; n < this.propBgL; n++) {
                    const h = this.prop[n];
                    this.texBgGL[t].tr[h] = r ? s[e][h] : R.Lerp(s[e[0]][h], s[e[1]][h], i)
                }
        }
        setGL(t) {
            const s = t.pos
              , e = t.tex
              , i = t.action
              , r = t.norm || 0
              , n = R.Is.und(t.norm);
            for (let t = 0; t < this.propL; t++) {
                const h = this.prop[t];
                e.tr[h] = n ? s[i][h] : R.Lerp(s[i[0]][h], s[i[1]][h], r)
            }
        }
        setSlideBg(t) {
            const s = t.index
              , e = this.bgH
              , i = []
              , r = [];
            for (let t = 0; t < this.bgL; t++)
                r[t] = t === s ? 0 : -e,
                i[t] = t > s ? e : 0;
            return {
                y: i,
                h: r
            }
        }
        setSlide(t) {
            const s = t.index;
            let e, i;
            1 === t.type ? (e = this.slider1H,
            i = 3) : "r" === t.side ? (e = this.slider2HR,
            i = this.slider2L) : (e = this.slider2HL,
            i = 3);
            const r = []
              , n = []
              , h = [];
            for (let t = 0; t < i; t++)
                n[t] = t === s ? 0 : -e,
                r[t] = t > s ? e : 0,
                h[t] = t < s ? .2 : t === s ? 0 : -.2;
            return {
                y: r,
                ty: h,
                h: n
            }
        }
    }
    class A {
        intro() {
            this.on = !1,
            this.anima = {
                h1: new a({
                    objChildren: !0,
                    el: R.G.id("hero-h1"),
                    prop: [["y", 110, -110], ["rotateX", -20, 4]],
                    delay: .02
                }),
                scrollTxt: new a({
                    objChildren: !1,
                    el: R.G.id("hero-scroll-txt"),
                    prop: [["y", -110, 110]],
                    delay: 0
                }),
                scrollArrow: new a({
                    objChildren: !1,
                    el: R.G.id("hero-scroll-arrow"),
                    prop: [["y", -110, 110]],
                    delay: 0
                }),
                capsule: new a({
                    objChildren: !1,
                    el: R.G.id("hero-capsule"),
                    prop: [["y", -140, -100], ["opacity"]],
                    delay: 0
                })
            }
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 0 : e.d.hide;
            const h = i && s ? 100 : 0
              , o = s ? 1 : 0
              , a = this.anima.h1.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h,
                reverse: t.reverse
            })
              , l = this.anima.capsule.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h,
                reverse: t.reverse
            })
              , c = this.anima.scrollTxt.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h + 600 * o,
                reverse: t.reverse
            })
              , d = this.anima.scrollArrow.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h + 800 * o,
                reverse: t.reverse
            });
            a.play(),
            l.play(),
            c.play(),
            d.play()
        }
    }
    class I {
        constructor(t) {
            const s = t.section
              , e = t.delay
              , i = "en0" === s;
            this.hasCapsule = "cr0" === s || "sp2" === s;
            const r = !i
              , n = R.G.class("title-w", R.G.id(s))[0];
            let h;
            if (i) {
                const t = n.children;
                h = [t[2], t[1], t[4], t[3], t[0]]
            } else
                h = n;
            this.on = !1,
            this.anima = {
                title: new a({
                    objChildren: r,
                    el: h,
                    prop: [["y", 110, -110], ["rotateX", -16, 4]],
                    delay: e
                })
            },
            this.hasCapsule && (this.anima.capsule = new a({
                objChildren: !1,
                el: R.G.id(s + "-capsule"),
                prop: [["y", 70, -120], ["opacity"]],
                delay: 0
            }))
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 1 : e.d.hide;
            const h = i && s ? 100 : 0
              , o = s ? 1 : 0
              , a = this.anima.title.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h,
                reverse: t.reverse
            });
            if (this.hasCapsule) {
                this.anima.capsule.motion({
                    action: t.a,
                    d: n,
                    e: r,
                    delay: h + 400 * o,
                    reverse: t.reverse
                }).play()
            }
            a.play()
        }
    }
    class O {
        intro() {
            this.fxTitle = new I({
                section: "de0",
                delay: .06
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class P {
        constructor(t) {
            this.el = R.Select.el(t.el)[0],
            this.app = R.G.id("app"),
            this.txt = this.el.innerHTML
        }
        resize(t) {
            this.el.innerHTML = this.txt;
            const s = this.el.offsetWidth
              , e = R.Cr("div")
              , i = e.style;
            i.visibility = "hidden",
            i.position = "absolute",
            i.whiteSpace = "nowrap";
            const r = window.getComputedStyle(this.el);
            i.fontFamily = r.getPropertyValue("font-family"),
            i.fontSize = r.getPropertyValue("font-size"),
            i.fontWeight = r.getPropertyValue("font-weight"),
            i.letterSpacing = r.getPropertyValue("letter-spacing"),
            this.app.appendChild(e);
            const n = this.txt.split("<br>")
              , h = n.length;
            let o = "";
            for (let i = 0; i < h; i++) {
                let r = n[i].split(" ");
                const h = r.length;
                let a = []
                  , l = 0
                  , c = "";
                for (let t = 0; t < h; t++) {
                    const i = r[t]
                      , n = c + i + " ";
                    e.innerHTML = n.trim();
                    e.offsetWidth >= s ? (a[l++] = c.trim(),
                    c = i + " ") : c = n
                }
                c !== a[l - 1] && (a[l++] = c.trim());
                const d = t.tag.start
                  , p = t.tag.end;
                for (let t = 0; t < l; t++)
                    o += d + a[t] + p
            }
            e.parentNode.removeChild(e),
            this.el.innerHTML = o
        }
    }
    class T {
        constructor(t) {
            const s = t.section
              , e = R.G.id(s);
            let i;
            this.isCo0 = "co0" === s,
            "en1" === s || "en3" === s ? (this.p = R.G.class("p", e),
            i = "title-w") : this.isCo0 ? (this.p = [R.G.id(s + "-p")],
            i = "title-w") : (this.p = R.G.class("txt-p", e),
            i = "txt-title-w"),
            this.pL = this.p.length,
            this.splitTxt = [];
            for (let t = 0; t < this.pL; t++)
                this.splitTxt[t] = new P({
                    el: this.p[t]
                });
            this.on = !1,
            this.anima = {
                title: new a({
                    objChildren: !0,
                    el: R.G.class(i, e)[0],
                    prop: [["y", 110, -110], ["rotateX", -15, 10]],
                    delay: .05
                }),
                txt: []
            },
            this.isCo0 && (this.anima.email = new a({
                objChildren: !1,
                el: R.G.id("co0-email"),
                prop: [["y", 110, -110]],
                delay: 0
            }),
            this.emailLineA = new R.M({
                el: R.G.id("co0-email-line"),
                p: {
                    scaleX: [0, 1]
                },
                r: 6
            }))
        }
        resize() {
            for (let t = 0; t < this.pL; t++)
                this.splitTxt[t].resize({
                    tag: {
                        start: "<span><span>",
                        end: "</span></span>"
                    }
                }),
                this.anima.txt[t] = new a({
                    objChildren: !0,
                    el: this.p[t],
                    prop: [["y", 110, -110]],
                    delay: .04
                })
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 0 : e.d.hide;
            const h = i && s ? 100 : 0
              , o = s ? 1 : 0
              , a = this.anima.title.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h,
                reverse: t.reverse
            })
              , l = [];
            for (let s = 0; s < this.pL; s++)
                l[s] = this.anima.txt[s].motion({
                    action: t.a,
                    d: n,
                    e: r,
                    delay: h + 300 * (s + 1) * o,
                    reverse: t.reverse
                });
            if (this.isCo0) {
                const e = this.anima.email.motion({
                    action: t.a,
                    d: n,
                    e: r,
                    delay: h + 600 * o,
                    reverse: t.reverse
                })
                  , i = {
                    d: n,
                    e: r,
                    delay: h + 1e3 * o
                };
                s || (i.reverse = !0),
                this.emailLineA.play(i),
                e.play()
            }
            a.play();
            for (let t = 0; t < this.pL; t++)
                l[t].play()
        }
    }
    class C {
        intro() {
            this.fxTxt = new T({
                section: "de1"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class S {
        intro() {
            this.li = R.G.class("de3-li"),
            this.on = !1,
            this.anima = {
                title: new a({
                    objChildren: !0,
                    el: R.G.id("de3-title"),
                    prop: [["y", 110, -110]],
                    delay: .1
                }),
                line: new a({
                    objChildren: !1,
                    el: R.G.class("de3-li-line"),
                    prop: [["x", -110, 110]],
                    delay: .1
                }),
                no: new a({
                    objChildren: !1,
                    el: R.G.class("de3-li-no"),
                    prop: [["y", 110, -110]],
                    delay: .1
                }),
                name: new a({
                    objChildren: !1,
                    el: R.G.class("de3-li-name"),
                    prop: [["y", 110, -110]],
                    delay: .1
                })
            }
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 0 : e.d.hide;
            const h = s ? "all" : "none"
              , o = i && s ? 100 : 0
              , a = s ? 1 : 0
              , l = this.anima.title.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o,
                reverse: !1
            })
              , c = this.anima.no.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 100 * a,
                reverse: !1
            })
              , d = this.anima.name.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 200 * a,
                reverse: !1
            })
              , p = this.anima.line.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 300 * a,
                reverse: !1
            });
            for (let t = 0; t < 3; t++)
                R.PE[h](this.li[t]);
            l.play(),
            c.play(),
            d.play(),
            p.play()
        }
    }
    class E {
        intro() {
            this.fxTitle = new I({
                section: "en0",
                delay: .04
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class _ {
        intro() {
            this.fxTxt = new T({
                section: "en1"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class M {
        intro() {
            this.li = R.G.class("en2-li"),
            this.on = !1,
            this.anima = {
                line: new a({
                    objChildren: !1,
                    el: R.G.class("en2-li-line"),
                    prop: [["x", -110, 110]],
                    delay: .1
                }),
                top: new a({
                    objChildren: !1,
                    el: R.G.class("en2-li-top"),
                    prop: [["y", 110, -110]],
                    delay: .1
                }),
                bottom: new a({
                    objChildren: !1,
                    el: R.G.class("en2-li-bottom"),
                    prop: [["y", 110, -110]],
                    delay: .1
                })
            }
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 0 : e.d.hide;
            const h = s ? "all" : "none"
              , o = i && s ? 100 : 0
              , a = s ? 1 : 0
              , l = this.anima.top.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 100 * a,
                reverse: !1
            })
              , c = this.anima.bottom.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 200 * a,
                reverse: !1
            })
              , d = this.anima.line.motion({
                action: t.a,
                d: n,
                e: r,
                delay: o + 300 * a,
                reverse: !1
            });
            for (let t = 0; t < 3; t++)
                R.PE[h](this.li[t]);
            l.play(),
            c.play(),
            d.play()
        }
    }
    class Y {
        intro() {
            this.fxTxt = new T({
                section: "en3"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class U {
        intro() {
            this.fxTitle = new I({
                section: "cr0",
                delay: .09
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class D {
        intro() {
            _A.color.cr1;
            const t = _A.action.slider2;
            this.indexLeft = t.l.index,
            this.indexRight = t.r.index,
            this.color = R.G.class("cr1-color");
            const s = R.G.class("cr1-color-curr")
              , e = R.G.class("cr1-color-active");
            this.l = s.length,
            this.on = !1,
            this.colorA = {
                curr: [],
                active: []
            };
            for (let t = 0; t < this.l; t++)
                this.colorA.curr[t] = new R.M({
                    el: s[t],
                    p: {
                        scale: [0, 1]
                    },
                    r: 6
                });
            for (let t = 0; t < this.l; t++)
                this.colorA.active[t] = new R.M({
                    el: e[t],
                    p: {
                        scale: [0, 1]
                    },
                    r: 6
                });
            this.typeTxt = R.G.class("cr1-type-txt"),
            this.typeTxt[this.indexLeft].children[0].classList.add("on");
            const i = R.G.class("cr1-type-line");
            this.type = {
                txtA: new a({
                    objChildren: !0,
                    el: R.G.id("cr1-type"),
                    prop: [["y", 110, -110]],
                    delay: .05
                }),
                lineA: []
            };
            for (let t = 0; t < 3; t++)
                this.type.lineA[t] = new R.M({
                    el: i[t],
                    p: {
                        scaleX: [0, 1]
                    },
                    r: 6
                });
            this.name = {
                anima: []
            };
            for (let t = 0; t < this.l; t++)
                this.name.anima[t] = new a({
                    objChildren: !1,
                    el: R.G.class("cr1-name-line-" + t),
                    prop: [["y", 110, -110]],
                    delay: .035,
                    lineStartTogether: !0
                })
        }
        left() {
            const t = this.indexLeft;
            this.indexLeft = _A.action.slider2.l.index,
            this.typeTxt[t].children[0].classList.remove("on"),
            this.typeTxt[this.indexLeft].children[0].classList.add("on"),
            this.type.lineA[t].play({
                d: 400,
                e: "o3",
                delay: 0,
                reverse: !0
            }),
            this.type.lineA[this.indexLeft].play({
                d: 1200,
                e: "o6",
                delay: 0
            })
        }
        right() {
            const t = this.indexRight;
            this.indexRight = _A.action.slider2.r.index;
            const s = t > this.indexRight
              , e = this.name.anima[t].motion({
                action: "hide",
                d: 500,
                e: "o3",
                delay: 0,
                reverse: s
            })
              , i = this.name.anima[this.indexRight].motion({
                action: "show",
                d: 1400,
                e: "o6",
                delay: 0,
                reverse: s
            });
            this.colorA.active[t].play({
                d: 300,
                e: "o3",
                delay: 0,
                reverse: !0
            }),
            this.colorA.active[this.indexRight].play({
                d: 800,
                e: "o6",
                delay: 0
            }),
            i.play(),
            e.play()
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A.menuIsOpen
              , i = s ? "o6" : "o3";
            let r;
            r = s ? 1400 : e ? 0 : 500;
            const n = s ? 1200 : 400
              , h = s ? "all" : "none";
            let o;
            const a = {
                e: "o6"
            }
              , l = e && s ? 100 : 0
              , c = l
              , d = s ? l + 500 : l
              , p = s ? l + 800 : l;
            s ? (o = 40,
            a.d = 1e3) : (a.reverse = !0,
            o = 15,
            a.d = 600);
            const x = this.name.anima[this.indexRight].motion({
                action: t.a,
                d: r,
                e: i,
                delay: l,
                reverse: !1
            })
              , y = this.type.txtA.motion({
                action: t.a,
                d: r,
                e: i,
                delay: d,
                reverse: !1
            })
              , w = {
                d: n,
                e: i,
                delay: p
            };
            s || (w.reverse = !0);
            for (let t = 0; t < 3; t++)
                R.PE[h](this.typeTxt[t]);
            for (let t = 0; t < this.l; t++)
                R.PE[h](this.color[t]);
            this.colorA.active[this.indexRight].play(a),
            this.type.lineA[this.indexLeft].play(w);
            for (let t = 0; t < this.l; t++)
                a.delay = c + t * o,
                this.colorA.curr[t].play(a);
            x.play(),
            y.play()
        }
    }
    class B {
        intro() {
            this.fxTxt = new T({
                section: "cr2"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class j {
        intro() {
            this.fxTitle = new I({
                section: "ex0",
                delay: .04
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class z {
        intro() {
            this.fxTxt = new T({
                section: "ex2"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class H {
        intro() {
            this.fxTitle = new I({
                section: "sp0",
                delay: .1
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class F {
        intro() {
            this.fxTxt = new T({
                section: "sp1"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class k {
        intro() {
            this.fxTitle = new I({
                section: "sp2",
                delay: .05
            })
        }
        run(t) {
            this.fxTitle.run(t)
        }
    }
    class X {
        intro() {
            const t = R.G.id("sp3")
              , s = R.G.class("txt-title-w", t)[0]
              , e = R.G.class("sp3-li-title")
              , i = R.G.class("sp3-li-content")
              , r = R.G.id("sp3-progress-w");
            this.liW = R.G.id("sp3-li-w"),
            this.on = !1,
            this.anima = {
                title: new a({
                    objChildren: !0,
                    el: s,
                    prop: [["y", 110, -110], ["rotateX", -16, 4]],
                    delay: .05
                }),
                liTitle: new a({
                    objChildren: !0,
                    el: e,
                    prop: [["y", 110, -110]],
                    delay: .03
                }),
                liContent: new a({
                    objChildren: !0,
                    el: i,
                    prop: [["y", 110, -110]],
                    delay: .03
                }),
                progress: new a({
                    objChildren: !1,
                    el: r,
                    prop: [["x", -100, -100]],
                    delay: 0
                })
            },
            this.line = [];
            for (let t = 0; t < 5; t++)
                this.line[t] = new R.M({
                    el: ".sp3-li-icon-circle-" + t,
                    line: {
                        start: 0,
                        end: 100
                    },
                    d: 1800,
                    e: "o4"
                })
        }
        run(t) {
            const s = "show" === t.a;
            if (s && this.on || !s && !this.on)
                return;
            this.on = s;
            const e = _A
              , i = _A.menuIsOpen
              , r = s ? "o6" : "o3";
            let n;
            n = s ? e.d.show : i ? 0 : e.d.hide;
            const h = i && s ? 100 : 0
              , o = s ? 1 : 0
              , a = s ? 100 : 0
              , l = s ? "all" : "none"
              , c = this.anima.title.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h,
                reverse: t.reverse
            })
              , d = this.anima.liTitle.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h + 200 * o,
                reverse: t.reverse
            })
              , p = this.anima.liContent.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h + 400 * o,
                reverse: t.reverse
            })
              , x = this.anima.progress.motion({
                action: t.a,
                d: n,
                e: r,
                delay: h + 400 * o,
                reverse: t.reverse
            });
            R.PE[l](this.liW);
            for (let t = 0; t < 5; t++)
                this.line[t].play({
                    line: {
                        end: a
                    },
                    d: n,
                    e: r,
                    delay: h + 300 * t * o
                });
            c.play(),
            d.play(),
            p.play(),
            x.play()
        }
    }
    class N {
        intro() {
            this.fxTxt = new T({
                section: "co0"
            })
        }
        resize() {
            this.fxTxt.resize()
        }
        run(t) {
            this.fxTxt.run(t)
        }
    }
    class W {
        constructor(t) {
            this.submit = t,
            R.BM(this, ["fn"]),
            _A.formIsOpen = !1
        }
        intro() {
            this.nav = R.G.id("nav-contact-w"),
            this.sail = R.G.id("fo-sail"),
            this.panelW = R.G.id("fo-panel-w"),
            this.emailA = R.G.id("co0-email-a"),
            this.sailA = new R.M({
                el: this.sail,
                p: {
                    opacity: [0, .7]
                },
                r: 6
            }),
            this.panelA = new R.M({
                el: this.panelW,
                p: {
                    x: [100, 0]
                }
            })
        }
        on() {
            R.L(this.nav, "a", "click", this.fn),
            R.L(this.sail, "a", "click", this.fn),
            R.L(this.emailA, "a", "click", this.fn)
        }
        fn(t) {
            const s = _A;
            if (!s.isLandscape)
                return;
            "co0-email-a" === t.target.id && R.PD(t);
            const e = s.formIsOpen
              , i = e ? "none" : "all"
              , r = {
                d: e ? s.d.hide : s.d.ioForm,
                e: e ? "o3" : "io6"
            };
            e && (r.reverse = !0);
            const n = {
                d: 450,
                e: "o2"
            };
            e && (n.reverse = !0),
            R.PE[i](this.sail),
            e || this.submit.reset(),
            this.panelA.play(r),
            this.sailA.play(n),
            s.formIsOpen = !e
        }
    }
    class V {
        constructor() {
            R.BM(this, ["fn"]),
            _A.formIsOpen = !1
        }
        intro() {
            this.submit = R.G.id("fo-submit-cta"),
            this.name = R.G.id("fo-name"),
            this.surname = R.G.id("fo-surname"),
            this.email = R.G.id("fo-email"),
            this.subject = R.G.id("fo-subject"),
            this.message = R.G.id("fo-message"),
            this.msg = R.G.id("fo-submit-msg")
        }
        reset() {
            this.resetValue(),
            this.resetMsg()
        }
        resetValue() {
            this.name.value = "",
            this.surname.value = "",
            this.email.value = "",
            this.message.value = ""
        }
        resetMsg() {
            this.msg.textContent = "",
            this.msg.className = ""
        }
        on() {
            R.L(this.submit, "a", "click", this.fn)
        }
        fn() {
            const t = "name=" + this.name.value + "&" + ("surname=" + this.surname.value) + "&" + ("email=" + this.email.value) + "&" + ("subject=" + this.subject.value) + "&" + ("message=" + this.message.value);
            this.resetMsg(),
            R.Fetch({
                url: "php/tool/Submit.php",
                type: "json",
                body: t,
                success: t=>{
                    "success" === t.status && this.resetValue(),
                    this.msg.className = t.status,
                    this.msg.textContent = t.message
                }
                ,
                error: t=>{
                    this.msg.className = "error",
                    this.msg.textContent = "ERROR. PLEASE TRY AGAIN."
                }
            })
        }
    }
    class q {
        constructor() {
            R.BM(this, ["fn", "clickOut"])
        }
        intro() {
            this.content = R.G.id("fo-select-content"),
            this.input = R.G.id("fo-subject"),
            this.list = R.G.id("fo-select-list"),
            this.arrow = R.G.id("fo-select-arrow")
        }
        on() {
            R.L(this.content, "a", "click", this.fn)
        }
        fn(t) {
            this.list.classList.contains("on") ? this.cnFn("remove") : (t.stopPropagation(),
            this.cnFn("add"),
            this.clickOutListener("a"))
        }
        clickOutListener(t) {
            R.L(document, t, "click", this.clickOut)
        }
        cnFn(t) {
            this.list.classList[t]("on"),
            this.arrow.classList[t]("on")
        }
        clickOut(t) {
            this.clickOutListener("r");
            const s = t.target
              , e = s.classList.contains("fo-select-li");
            if (this.cnFn("remove"),
            e) {
                const t = s.textContent;
                this.content.textContent = t,
                this.input.value = t
            }
        }
    }
    class K {
        constructor() {
            R.BM(this, ["fn"])
        }
        on() {
            R.L(".fo-input", "a", "focus", this.fn),
            R.L(".fo-input", "a", "blur", this.fn)
        }
        fn(t) {
            const s = "focus" === t.type ? "add" : "remove";
            R.G.class("fo-line", t.target.parentNode)[0].classList[s]("on")
        }
    }
    class Z {
        constructor() {
            R.BM(this, ["fn"])
        }
        intro() {
            this.txt = R.G.id("fo-message")
        }
        on() {
            R.L(this.txt, "a", "focus", this.fn),
            R.L(this.txt, "a", "blur", this.fn)
        }
        fn(t) {
            const s = "focus" === t.type ? "add" : "remove";
            this.txt.classList[s]("on")
        }
    }
    class J {
        constructor() {
            this.s = {
                curr: 0,
                targ: 0
            },
            this.isDown = !1,
            this.prev = 0,
            this.min = 0,
            R.BM(this, ["sFn", "move", "down", "up"]),
            this.scrollV = new e({
                cb: this.sFn
            }),
            this.mm = new r({
                cb: this.move
            })
        }
        intro() {
            this.panel = R.G.id("fo-panel"),
            this.progress = R.G.id("fo-progress").children[0],
            this.scrollV.init({
                isX: !1
            }),
            this.sUpAll(0)
        }
        resize() {
            this.max = Math.max(this.panel.offsetHeight - _A.win.h, 0),
            this.scrollV.resize();
            const t = this.clamp(this.s.targ);
            t === this.max && this.sUpAll(t),
            this.draw()
        }
        down(t) {
            t.ctrlKey ? R.PD(t) : (this.isDown = !0,
            this.start = t.targetTouches[0].pageY,
            this.targ = this.s.targ,
            this.targPrev = this.targ)
        }
        move(t, s) {
            if (!this.isDown)
                return;
            const e = s;
            if (Math.abs(e - this.start) < 10)
                return;
            e > this.prev && this.targ === this.min ? this.start = e - (this.targPrev - this.min) / 2 : e < this.prev && this.targ === this.max && (this.start = e - (this.targPrev - this.max) / 2),
            this.prev = e,
            this.targ = 2 * -(e - this.start) + this.targPrev,
            this.s.targ = this.clamp(this.targ)
        }
        up() {
            this.isDown = !1
        }
        sFn(t) {
            _A.formIsOpen && !this.isDown && (this.s.targ = this.clamp(this.s.targ + t))
        }
        loop() {
            _A.formIsOpen && (this.s.curr = R.Damp(this.s.curr, this.s.targ, .09),
            this.draw())
        }
        draw() {
            const t = R.R(R.Lerp(-100, 0, this.s.curr / this.max));
            R.T(this.progress, 0, t),
            R.T(this.panel, 0, -R.R(this.s.curr), "px")
        }
        sUpAll(t) {
            this.s.targ = t,
            this.s.curr = t
        }
        clamp(t) {
            return R.R(R.Clamp(t, this.min, this.max))
        }
        l(t) {
            const s = document;
            R.L(s, t, "touchstart", this.down),
            R.L(s, t, "touchend", this.up)
        }
        on() {
            this.scrollV.on(),
            this.mm.on(),
            this.l("a")
        }
    }
    class Q {
        constructor() {
            this.submit = new V,
            this.open = new W(this.submit),
            this.select = new q,
            this.input = new K,
            this.textarea = new Z,
            this.scroll = new J
        }
        intro() {
            this.open.intro(),
            this.submit.intro(),
            this.select.intro(),
            this.textarea.intro(),
            this.scroll.intro()
        }
        resize() {
            this.scroll.resize()
        }
        loop() {
            this.scroll.loop()
        }
        on() {
            this.open.on(),
            this.submit.on(),
            this.select.on(),
            this.input.on(),
            this.textarea.on(),
            this.scroll.on()
        }
    }
    class $ {
        constructor(t) {
            this.cb = t.cb,
            this.el = R.Has(t, "el") ? R.Select.el(t.el)[0] : document,
            R.BM(this, ["run"])
        }
        on() {
            this.l("a")
        }
        off() {
            this.l("r")
        }
        l(t) {
            R.L(this.el, t, "touchmove", this.run)
        }
        run(t) {
            const s = t.changedTouches[0];
            this.cb(s.pageX, s.pageY, t)
        }
    }
    class tt {
        constructor() {
            this.a = _A,
            this.start = {
                x: 0,
                y: 0
            },
            R.BM(this, ["pr", "move", "down"]),
            this.tm = new $({
                cb: this.move
            })
        }
        init() {
            this.a.isSliding = !1,
            this.tm.off(),
            this.paralyse("r"),
            this.tick = !0
        }
        on() {
            this.tm.on(),
            this.downL("a")
        }
        down(t) {
            const s = t.targetTouches[0];
            this.start.y = s.pageY,
            this.start.x = s.pageX,
            this.onSlider = t.target.classList.contains("_ssp"),
            this.a.isSliding = !1,
            this.paralyse("r"),
            this.tick || (this.tick = !0)
        }
        move(t, s) {
            if (this.onSlider && !_A.isLandscape && this.tick) {
                const e = Math.abs(t - this.start.x)
                  , i = Math.abs(s - this.start.y);
                e !== i && (this.tick = !1,
                this.a.isSliding = e > i,
                this.a.isSliding && this.paralyse("a"))
            }
        }
        downL(t) {
            R.L(document, t, "touchstart", this.down)
        }
        paralyse(t) {
            R.L(document, t, "touchmove", this.pr)
        }
        pr(t) {
            R.PD(t)
        }
    }
    class st {
        constructor() {
            const t = _A;
            this.isLocal = t.config.isLocal,
            this.loadNo = R.G.id("load-no").children[0],
            this.loadBg = R.G.id("load-bg")
        }
        hide(t) {
            const s = _A
              , e = this.isLocal ? 0 : s.d.io
              , i = "io6"
              , r = new R.M({
                el: this.loadNo,
                p: {
                    y: [0, -110]
                },
                d: e,
                e: i
            })
              , n = new R.M({
                el: this.loadBg,
                p: {
                    y: [0, -101]
                },
                d: e,
                e: i,
                cb: t
            })
              , h = new R.M({
                d: e,
                e: i,
                r: 6,
                update: t=>{
                    s.introGLScale = R.Lerp(.08, 0, t.progE)
                }
                ,
                cb: t=>{
                    s.isIntro = !1
                }
            });
            r.play(),
            n.play(),
            h.play()
        }
    }
    R.TopReload(),
    new class {
        constructor() {
            const t = this.div("-w", " rotate")
              , s = this.div("", "");
            s.textContent = "Please rotate your device.",
            t.appendChild(s),
            R.G.id("app").appendChild(t)
        }
        div(t, s) {
            const e = R.Cr("div");
            return e.className = "iss" + t + s,
            e
        }
    }
    ,
    new class {
        constructor(s) {
            new t(s)
        }
    }
    ({
        engine: class {
            constructor() {
                const t = _A;
                t.section = [{
                    name: "intro",
                    length: 1
                }, {
                    name: "de0",
                    length: 1
                }, {
                    name: "de1",
                    length: 1
                }, {
                    name: "de2",
                    length: 2
                }, {
                    name: "de3",
                    length: 3
                }, {
                    name: "en0",
                    length: 1
                }, {
                    name: "en1",
                    length: 1
                }, {
                    name: "en2",
                    length: 3
                }, {
                    name: "en3",
                    length: 1
                }, {
                    name: "cr0",
                    length: 1
                }, {
                    name: "cr1",
                    length: 20
                }, {
                    name: "cr2",
                    length: 1
                }, {
                    name: "ex0",
                    length: 1
                }, {
                    name: "ex1",
                    length: 2
                }, {
                    name: "ex2",
                    length: 1
                }, {
                    name: "sp0",
                    length: 1
                }, {
                    name: "sp1",
                    length: 1
                }, {
                    name: "sp2",
                    length: 1
                }, {
                    name: "sp3",
                    length: 1
                }, {
                    name: "co0",
                    length: 1
                }],
                t.d = {
                    show: 1700,
                    hide: 500,
                    io: 1900,
                    ioForm: 1600
                },
                t.slideIndex = 0,
                t.sectionL = t.section.length,
                t.s = 0,
                t.needS = !1,
                t.needGL = !1,
                t.prop = ["x", "y", "w", "h"],
                t.propL = t.prop.length,
                t.introGLScale = 0,
                t.isIntro = !0,
                t.color = t.config.color,
                t.initIsLanscape = !0,
                R.Snif.isMobile && (t.initIsLanscape = window.matchMedia("(orientation: landscape)").matches),
                R.BM(this, ["resize", "loop"]),
                this.ssp = new tt,
                this.win = new s,
                this.ro = new R.ROR(this.resize),
                this.raf = new R.RafR(this.loop),
                t.scroll = new n,
                t.nav = new l,
                t.fxHero = new A,
                t.fxDe0 = new O,
                t.fxDe1 = new C,
                t.fxDe3 = new S,
                t.fxEn0 = new E,
                t.fxEn1 = new _,
                t.fxEn2 = new M,
                t.fxEn3 = new Y,
                t.fxCr0 = new U,
                t.fxCr1 = new D,
                t.fxCr2 = new B,
                t.fxEx0 = new j,
                t.fxEx2 = new z,
                t.fxSp0 = new H,
                t.fxSp1 = new F,
                t.fxSp2 = new k,
                t.fxSp3 = new X,
                t.fxCo0 = new N,
                t.action = new b,
                this.form = new Q
            }
            glInit(t) {
                this.gl = new G(t)
            }
            intro() {
                const t = _A;
                this.ssp.init(),
                t.nav.intro(),
                t.fxHero.intro(),
                t.fxDe0.intro(),
                t.fxDe1.intro(),
                t.fxDe3.intro(),
                t.fxEn0.intro(),
                t.fxEn1.intro(),
                t.fxEn3.intro(),
                t.fxEn2.intro(),
                t.fxCr0.intro(),
                t.fxCr1.intro(),
                t.fxCr2.intro(),
                t.fxEx0.intro(),
                t.fxEx2.intro(),
                t.fxSp0.intro(),
                t.fxSp1.intro(),
                t.fxSp2.intro(),
                t.fxSp3.intro(),
                t.fxCo0.intro(),
                t.action.intro(),
                this.form.intro(),
                t.scroll.intro({
                    isX: !1
                }),
                this.raf.run()
            }
            init() {
                const t = _A;
                this.gl.init(),
                t.action.init(),
                t.scroll.init(),
                this.resize(),
                this.ro.on()
            }
            resize() {
                const t = _A;
                this.win.resize(),
                t.fxDe1.resize(),
                t.fxEn1.resize(),
                t.fxEn3.resize(),
                t.fxEx2.resize(),
                t.fxCr2.resize(),
                t.fxSp1.resize(),
                t.fxCo0.resize(),
                this.form.resize(),
                this.gl.resize(),
                t.action.resize(),
                t.scroll.resize(),
                this.gl.loop()
            }
            on() {
                const t = _A;
                this.ssp.on(),
                t.action.on(),
                t.nav.on(),
                this.form.on(),
                t.scroll.on()
            }
            loop() {
                const t = _A;
                t.action.loop(),
                t.scroll.loop(),
                this.form.loop(),
                (t.needS || t.needGL || t.isIntro) && this.gl.loop()
            }
        }
        ,
        transition: {
            intro: class {
                constructor(t) {
                    const s = _A;
                    this.introA = new st,
                    new R.Delay((e=>{
                        t((t=>{
                            s.engine.glInit((t=>{
                                this.cb()
                            }
                            ))
                        }
                        ))
                    }
                    ),0).run()
                }
                cb() {
                    const t = _A;
                    t.engine.intro(),
                    t.engine.init();
                    const s = t.config.isLocal ? 0 : .46 * t.d.io;
                    new R.Delay((s=>{
                        t.engine.on()
                    }
                    ),.7 * s).run(),
                    new R.Delay((s=>{
                        t.fxHero.run({
                            a: "show",
                            reverse: !1
                        }),
                        t.fxDe0.run({
                            a: "hide",
                            reverse: !0
                        }),
                        t.mutating = !1
                    }
                    ),s).run(),
                    this.introA.hide((t=>{
                        R.PE.none(R.G.id("load"))
                    }
                    ))
                }
            }
        }
    })
}();