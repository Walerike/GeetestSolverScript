// ==UserScript==
// @name         Geetest solver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Geetest solver 
// @author       Walerike
// @match        https://www.geetest.com/en/demo
// @icon         https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/48/Tether-USDT-icon.png
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    !function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pixelmatch = t() } }(function () { return function () { return function t(e, n, r) { function o(i, u) { if (!n[i]) { if (!e[i]) { var a = "function" == typeof require && require; if (!u && a) return a(i, !0); if (f) return f(i, !0); var c = new Error("Cannot find module '" + i + "'"); throw c.code = "MODULE_NOT_FOUND", c } var l = n[i] = { exports: {} }; e[i][0].call(l.exports, function (t) { return o(e[i][1][t] || t) }, l, l.exports, t, e, n, r) } return n[i].exports } for (var f = "function" == typeof require && require, i = 0; i < r.length; i++)o(r[i]); return o } }()({ 1: [function (t, e, n) { "use strict"; e.exports = function (t, e, n, i, a, c) { if (!o(t) || !o(e) || n && !o(n)) throw new Error("Image data: Uint8Array, Uint8ClampedArray or Buffer expected."); if (t.length !== e.length || n && n.length !== t.length) throw new Error("Image sizes do not match."); if (t.length !== i * a * 4) throw new Error("Image data size does not match width/height."); c = Object.assign({}, r, c); const l = i * a, s = new Uint32Array(t.buffer, t.byteOffset, l), p = new Uint32Array(e.buffer, e.byteOffset, l); let m = !0; for (let t = 0; t < l; t++)if (s[t] !== p[t]) { m = !1; break } if (m) { if (n && !c.diffMask) for (let e = 0; e < l; e++)h(t, 4 * e, c.alpha, n); return 0 } const w = 35215 * c.threshold * c.threshold; let y = 0; const [M, g, x] = c.aaColor, [E, b, A] = c.diffColor; for (let r = 0; r < a; r++)for (let o = 0; o < i; o++) { const l = 4 * (r * i + o), s = u(t, e, l, l); s > w ? c.includeAA || !f(t, o, r, i, a, e) && !f(e, o, r, i, a, t) ? (n && d(n, l, E, b, A), y++) : n && !c.diffMask && d(n, l, M, g, x) : n && (c.diffMask || h(t, l, c.alpha, n)) } return y }; const r = { threshold: .1, includeAA: !1, alpha: .1, aaColor: [255, 255, 0], diffColor: [255, 0, 0], diffMask: !1 }; function o(t) { return ArrayBuffer.isView(t) && 1 === t.constructor.BYTES_PER_ELEMENT } function f(t, e, n, r, o, f) { const a = Math.max(e - 1, 0), c = Math.max(n - 1, 0), l = Math.min(e + 1, r - 1), s = Math.min(n + 1, o - 1), d = 4 * (n * r + e); let h, p, m, w, y = e === a || e === l || n === c || n === s ? 1 : 0, M = 0, g = 0; for (let o = a; o <= l; o++)for (let f = c; f <= s; f++) { if (o === e && f === n) continue; const i = u(t, t, d, 4 * (f * r + o), !0); if (0 === i) { if (++y > 2) return !1 } else i < M ? (M = i, h = o, p = f) : i > g && (g = i, m = o, w = f) } return 0 !== M && 0 !== g && (i(t, h, p, r, o) && i(f, h, p, r, o) || i(t, m, w, r, o) && i(f, m, w, r, o)) } function i(t, e, n, r, o) { const f = Math.max(e - 1, 0), i = Math.max(n - 1, 0), u = Math.min(e + 1, r - 1), a = Math.min(n + 1, o - 1), c = 4 * (n * r + e); let l = e === f || e === u || n === i || n === a ? 1 : 0; for (let o = f; o <= u; o++)for (let f = i; f <= a; f++) { if (o === e && f === n) continue; const i = 4 * (f * r + o); if (t[c] === t[i] && t[c + 1] === t[i + 1] && t[c + 2] === t[i + 2] && t[c + 3] === t[i + 3] && l++, l > 2) return !0 } return !1 } function u(t, e, n, r, o) { let f = t[n + 0], i = t[n + 1], u = t[n + 2], d = t[n + 3], h = e[r + 0], p = e[r + 1], m = e[r + 2], w = e[r + 3]; if (d === w && f === h && i === p && u === m) return 0; d < 255 && (f = s(f, d /= 255), i = s(i, d), u = s(u, d)), w < 255 && (h = s(h, w /= 255), p = s(p, w), m = s(m, w)); const y = a(f, i, u) - a(h, p, m); if (o) return y; const M = c(f, i, u) - c(h, p, m), g = l(f, i, u) - l(h, p, m); return .5053 * y * y + .299 * M * M + .1957 * g * g } function a(t, e, n) { return .29889531 * t + .58662247 * e + .11448223 * n } function c(t, e, n) { return .59597799 * t - .2741761 * e - .32180189 * n } function l(t, e, n) { return .21147017 * t - .52261711 * e + .31114694 * n } function s(t, e) { return 255 + (t - 255) * e } function d(t, e, n, r, o) { t[e + 0] = n, t[e + 1] = r, t[e + 2] = o, t[e + 3] = 255 } function h(t, e, n, r) { const o = s(a(t[e + 0], t[e + 1], t[e + 2]), n * t[e + 3] / 255); d(r, e, o, o, o) } }, {}] }, {}, [1])(1) });
    const timer = ms => new Promise(res => setTimeout(res, ms))
    function findCenterSlider(imgSlider, imgOriginal) {
        let dstSlider = new cv.Mat()
        let dstOriginal = new cv.Mat()

        cv.cvtColor(imgSlider, dstSlider, cv.COLOR_BGR2GRAY)

        cv.cvtColor(imgOriginal, dstOriginal, cv.COLOR_BGR2GRAY)

        let dstSliderModificado = new cv.Mat()
        let kernel = cv.Mat.ones(5, 5, cv.CV_8UC1)
        let anchor = new cv.Point(-1, -1)

        cv.threshold(dstSlider, dstSliderModificado, 127, 255, cv.THRESH_BINARY)
        cv.erode(dstSlider, dstSliderModificado, kernel, anchor, 1)
        cv.dilate(dstSliderModificado, dstSliderModificado, kernel, anchor, 1)

        let contours = new cv.MatVector()
        let hierarchy = new cv.Mat()
        cv.findContours(dstSliderModificado, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

        let contour = contours.get(0)
        let moment = cv.moments(contour)
        return [Math.floor(moment.m10 / moment.m00), Math.floor(moment.m01 / moment.m00)]

    }

    function findDiffPosition(diff) {

        let src = cv.matFromImageData(diff)

        let dst = new cv.Mat()
        let kernel = cv.Mat.ones(5, 5, cv.CV_8UC1)
        let anchor = new cv.Point(-1, -1)

        cv.threshold(src, dst, 127, 255, cv.THRESH_BINARY)
        cv.erode(dst, dst, kernel, anchor, 1)
        cv.dilate(dst, dst, kernel, anchor, 1)
        cv.erode(dst, dst, kernel, anchor, 1)
        cv.dilate(dst, dst, kernel, anchor, 1)

        cv.cvtColor(dst, dst, cv.COLOR_BGR2GRAY)
        cv.threshold(dst, dst, 150, 255, cv.THRESH_BINARY_INV)

        let contours = new cv.MatVector()
        let hierarchy = new cv.Mat()
        cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

        let contour = contours.get(0)
        let moment = cv.moments(contour)

        return [Math.floor(moment.m10 / moment.m00), Math.floor(moment.m01 / moment.m00)]
    }

    function _Event(type, clientX) {
        let evt = new MouseEvent(type, {
            clientX: clientX,
            clientY: 0,
            bubbles: true,
            cancelable: true,
            view: window

        });
        return evt;
    }


    let waitOpencv = setInterval(function () {
        let opencv = document.querySelector("script[src*='opencv']")
        if (opencv) {
            clearInterval(waitOpencv)
            document.getElementsByClassName("tab-item tab-item-1")[0].click()
        }
    }, 5000)

    let waitCaptcha = setInterval(function () {
        let captcha = document.getElementsByClassName("geetest_btn")[0]
        if (captcha != null) {
            captcha.click()
            clearInterval(waitCaptcha)
        }
    }, 5000);


    let waitImageCaptcha = setInterval(function () {
        let captcha = document.getElementsByClassName("geetest_canvas_bg geetest_absolute")[0]
        let original = document.getElementsByClassName("geetest_canvas_fullbg geetest_fade geetest_absolute")[0]
        let slider = document.getElementsByClassName("geetest_canvas_slice geetest_absolute")[0]

        if (captcha) {

            let ctxSlider = slider.getContext('2d');
            let imgDataSlider = ctxSlider.getImageData(0, 0, slider.width, slider.height);
            let imgSlider = cv.matFromImageData(imgDataSlider)

            let ctxOriginal = original.getContext('2d');
            let imgDataOriginal = ctxOriginal.getImageData(0, 0, original.width, original.height);
            let imgOriginal = cv.matFromImageData(imgDataOriginal)

            let ctxCaptcha = captcha.getContext('2d');
            let imgDataCaptcha = ctxCaptcha.getImageData(0, 0, captcha.width, captcha.height);
            let imageCaptcha = cv.matFromImageData(imgDataCaptcha)



            const diffOptions = { includeAA: true, threshold: 0.2 }
            const diff = ctxCaptcha.createImageData(captcha.width, captcha.height)
            pixelmatch(imgDataOriginal.data, imgDataCaptcha.data, diff.data, captcha.width, captcha.height, diffOptions)
            ctxCaptcha.putImageData(diff, 0, 0)
            let coord = findDiffPosition(diff)
            console.log("Coordenadas: " + coord)
            let coordCentro = findCenterSlider(imgSlider, imgOriginal);
            console.log("Coordenadas centro: " + coordCentro)


            var x = coord[0] - coordCentro[0]
            console.log("x: " + x)


            let slider2 = document.querySelector('div.geetest_slider_button') || document.querySelector('div.geetest_btn'),
                clientX = Number(x) - 2,
                sleep = 5;
            slider2.focus();
            slider2.dispatchEvent(_Event("mousedown", 0));


            function moveup() {
                slider2.dispatchEvent(_Event("mouseup", clientX));
            }

            async function move() {
                for (let ev = 1; ev < clientX; ev = ev + 1) {
                    slider2.dispatchEvent(_Event("mousemove", ev));
                    await timer(sleep);
                }
                moveup();
            }

            move();

            clearInterval(waitImageCaptcha)

        }
    }, 5000)


})();