import { effect as v, insert as w, template as S } from "solid-js/web";
import { createRoot as A, createSignal as j } from "solid-js";
import { CallbackName as g } from "./CallbackName.js";
import { callbacksProp as k } from "./callbacksProp.js";
import { childrenProp as h } from "./childrenProp.js";
import { fromAttributeValue as O } from "./fromAttributeValue.js";
import { globalStylesProp as P } from "./globalStylesProp.js";
import { preValuesProp as C } from "./preValuesProp.js";
import { reactivePropsProp as d } from "./reactivePropsProp.js";
import { stylesProp as y } from "./stylesProp.js";
import { toAttributeName as $ } from "./toAttributeName.js";
import { toAttributeValue as x } from "./toAttributeValue.js";
const N = /* @__PURE__ */ S("<style>");
function f(t, e) {
  if (!Object.prototype.hasOwnProperty.call(t, e))
    throw new TypeError("attempted to use private field on non-instance");
  return t;
}
var R = 0;
function F(t) {
  return "__private_" + R++ + "_" + t;
}
function W(t) {
  var e;
  const s = t, p = (e = /* @__PURE__ */ F("initialized"), class extends t {
    static get observedAttributes() {
      const n = s[d];
      return Object.values(n).map((o) => o.attribute);
    }
    constructor() {
      super(), Object.defineProperty(this, e, {
        writable: !0,
        value: !1
      });
    }
    connectedCallback() {
      const n = this;
      f(this, e)[e] || (f(this, e)[e] = !0, L(n, s), n[C] = void 0, super.connectedCallback(), A((o) => {
        this.addDisconnectedCallback(() => {
          this.renderRoot.textContent = "", o();
        });
        let r = super.template({
          children: n[h]
        });
        return r && s[y] && this.renderRoot !== this && (r = [(() => {
          const i = N();
          return v(() => i.innerHTML = s[y].join(`
`)), i;
        })(), r]), w(this.renderRoot, r);
      }, T(this)));
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      const n = this[k];
      let o = n.pop();
      for (; o; )
        o[0] === g.disconnected && o[1](this), o = n.pop();
      super.disconnectedCallback(), f(this, e)[e] = !1;
    }
    attributeChangedCallback(n, o, r) {
      if (!f(this, e)[e])
        return;
      const i = V(n, s);
      r == null && !this[i[0]] || (this[i[0]] = O(r, i[1]));
    }
  }), c = t[d];
  for (let [l, n] of Object.entries(c))
    n.attribute || (n.attribute = $(l));
  if (s[P]) {
    for (const l of s[P])
      if (l) {
        const n = document.head ?? document.querySelector("head"), o = document.createElement("style");
        o.appendChild(document.createTextNode(l)), n.appendChild(o);
      }
  }
  return p;
}
function T(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function V(t, e) {
  const s = e[d];
  return Object.entries(s).find(([p, c]) => p === t || c.attribute === t);
}
function L(t, e) {
  const s = e[d], p = [h, ...Object.keys(s ?? {})], c = t[C];
  function l(o, r, i) {
    const a = t[k];
    for (let u = 0; u < a.length; u++)
      if (a[u][0] === g.propertyValueChange)
        try {
          a[u][1](t, o, r, i);
        } catch (b) {
          console.warn("CustomElement property value change callback error", b);
        }
  }
  function n(o, r) {
    const i = o.attribute;
    r = x(r, o), r == null || r === !1 ? t.removeAttribute(i) : t.getAttribute(i) !== r && t.setAttribute(i, r);
  }
  for (let o = 0; o < p.length; o++) {
    const r = p[o], i = s[r];
    let a;
    c && r in c ? a = c[r] : a = t[r], i != null && i.reflect && n(i, a);
    const [u, b] = j(a);
    Object.defineProperty(t, r, {
      get: u,
      set(m) {
        b((_) => (r !== h && (i != null && i.reflect && n(i, m), l(r, m, _)), m));
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
export {
  W as buildFinalClass
};
//# sourceMappingURL=buildFinalClass.js.map
