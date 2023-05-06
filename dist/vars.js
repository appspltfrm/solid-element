var m = Object.defineProperty;
var y = (t, e, r) => e in t ? m(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var E = (t, e, r) => (y(t, typeof e != "symbol" ? e + "" : e, r), r);
import { createMemo as D, createSignal as S } from "solid-js";
import { createStore as b } from "solid-js/store";
const i = /* @__PURE__ */ new WeakMap();
class c {
  constructor() {
    E(this, "value");
    E(this, "onDelete");
  }
}
function a(t, e) {
  if (t && e in t)
    throw new Error(`Element var ${String(e)} already exists`);
}
function x(t, e) {
  if (t && !(e in t))
    throw new Error(`Element var ${String(e)} not exists`);
}
function M(t, e) {
  var n;
  const r = (n = i.get(t)) == null ? void 0 : n[e];
  return r instanceof c ? r.value : r;
}
function $(t, e, r, n) {
  return a(i.get(t), e), f(t, e, r, n), r;
}
function f(t, e, r, n) {
  let o = i.get(t);
  o || (o = {}, i.set(t, o), t.addDisconnectedCallback(() => {
    var u;
    const l = i.get(t);
    if (l)
      for (const g of Object.values(l))
        g instanceof c && ((u = g.onDelete) == null || u.call(g));
    i.delete(t);
  }));
  let s = r;
  n != null && n.onDelete && (s = new c(), s.value = r, s.onDelete = n.onDelete), o[e] = s;
}
function d(t, e) {
  var n;
  const r = i.get(t);
  if (r) {
    let o = r[e];
    return o instanceof c && ((n = o.onDelete) == null || n.call(o), o = o.value), delete r[e], o;
  }
}
function k(t, e, r, n, o) {
  const s = i.get(t);
  a(s, e);
  const l = D(r, n, o);
  return f(t, e, l), l;
}
function j(t, e) {
  const r = i.get(t);
  x(r, e);
  let n = r[e];
  n instanceof c && (n = n.value);
  const o = n;
  return typeof o == "function" ? o : () => {
    throw new Error(`Element var ${String(e)} is not a memo`);
  };
}
function C(t, e) {
  var o;
  let r = (o = i.get(t)) == null ? void 0 : o[e];
  r instanceof c && (r = r.value);
  const n = r;
  if (typeof n == "function")
    return n();
  throw new Error(`Element var ${String(e)} is not a memo`);
}
function v(t, e, r) {
  const n = i.get(t);
  a(n, e);
  const o = S(r);
  return f(t, e, o), o;
}
function N(t, e) {
  var o;
  let r = (o = i.get(t)) == null ? void 0 : o[e];
  r instanceof c && (r = r.value);
  let n = r;
  return n || (n = v(t, e)), n;
}
function O(t, e) {
  var o;
  let r = (o = i.get(t)) == null ? void 0 : o[e];
  r instanceof c && (r = r.value);
  let n = r;
  return n || (n = v(t, e)), n[0]();
}
function W(t, e, r) {
  var s;
  let n = (s = i.get(t)) == null ? void 0 : s[e];
  n instanceof c && (n = n.value);
  let o = n;
  o || (o = v(t, e)), o[1](r);
}
function q(t, e) {
  d(t, e);
}
function z(t, e, r, n) {
  const o = i.get(t);
  a(o, e);
  const s = S(), l = r.subscribe({
    next: (u) => s[1](() => u),
    error: (u) => {
      if (n != null && n.onError)
        n.onError(u);
      else
        throw u;
    }
  });
  return f(t, e, s, { onDelete: "unsubscribe" in l ? l.unsubscribe : l }), s[0];
}
function B(t, e) {
  d(t, e);
}
function F(t, e) {
  var o;
  let r = (o = i.get(t)) == null ? void 0 : o[e];
  r instanceof c && (r = r.value);
  const n = r;
  return n && Array.isArray(n) ? n : [
    void 0,
    (s) => {
      const [, l] = w(t, e);
      return l(s);
    }
  ];
}
function G(t, e, r) {
  var s;
  let n = (s = i.get(t)) == null ? void 0 : s[e];
  n instanceof c && (n = n.value);
  const o = n;
  if (o && Array.isArray(o))
    return o[1](r);
  w(t, e, r);
}
function H(t, e) {
  var o;
  let r = (o = i.get(t)) == null ? void 0 : o[e];
  r instanceof c && (r = r.value);
  const n = r;
  if (n && Array.isArray(n))
    return n[0];
}
function w(t, e, r) {
  const n = i.get(t);
  a(n, e);
  const o = b(r);
  return f(t, e, o), o;
}
function I(t, e, r, n) {
  const o = i.get(t);
  a(o, e);
  const s = b({}), l = r.subscribe({
    next: (u) => s[1](u),
    error: (u) => {
      if (n != null && n.onError)
        n.onError(u);
      else
        throw u;
    }
  });
  return f(t, e, s, { onDelete: "unsubscribe" in l ? l.unsubscribe : l }), s[0];
}
export {
  k as createElementMemo,
  v as createElementSignal,
  w as createElementStore,
  $ as createElementVar,
  q as deleteElementSignal,
  B as deleteElementStore,
  d as deleteElementVar,
  C as getElementMemo,
  O as getElementSignal,
  H as getElementStore,
  M as getElementVar,
  z as loadElementSignal,
  I as loadElementStore,
  W as setElementSignal,
  G as setElementStore,
  f as setElementVar,
  j as useElementMemo,
  N as useElementSignal,
  F as useElementStore
};
//# sourceMappingURL=vars.js.map
