import { effect as v, insert as w, template as S } from "solid-js/web";
import { createRoot as A, createSignal as j } from "solid-js";
import { CallbackName as g } from "./internals/CallbackName.js";
import { callbacksProp as k } from "./internals/callbacksProp.js";
import { childrenProp as h } from "./internals/childrenProp.js";
import { fromAttributeValue as O } from "./internals/fromAttributeValue.js";
import { globalStylesProp as P } from "./internals/globalStylesProp.js";
import { preValuesProp as C } from "./internals/preValuesProp.js";
import { reactivePropsProp as f } from "./internals/reactivePropsProp.js";
import { stylesProp as y } from "./internals/stylesProp.js";
import { toAttributeName as $ } from "./internals/toAttributeName.js";
import { toAttributeValue as x } from "./internals/toAttributeValue.js";
const N = /* @__PURE__ */ S("<style>");
function u(e, i) {
  if (!Object.prototype.hasOwnProperty.call(e, i))
    throw new TypeError("attempted to use private field on non-instance");
  return e;
}
var R = 0;
function E(e) {
  return "__private_" + R++ + "_" + e;
}
function W(e, i) {
  var s;
  const a = i, l = (s = /* @__PURE__ */ E("initialized"), class extends i {
    static get observedAttributes() {
      const r = a[f];
      return Object.values(r).map((t) => t.attribute);
    }
    constructor() {
      super(), Object.defineProperty(this, s, {
        writable: !0,
        value: !1
      });
    }
    connectedCallback() {
      const r = this;
      u(this, s)[s] || (u(this, s)[s] = !0, F(r, a), r[C] = void 0, super.connectedCallback(), A((t) => {
        this.addDisconnectedCallback(() => {
          this.renderRoot.textContent = "", t();
        });
        let o = super.template({
          children: r[h]
        });
        return o && a[y] && this.renderRoot === this && (o = [(() => {
          const n = N();
          return v(() => n.innerHTML = a[y].join(`
`)), n;
        })(), o]), w(this.renderRoot, o);
      }, T(this)));
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      const r = this[k];
      let t = r.pop();
      for (; t; )
        t[0] === g.disconnected && t[1](this), t = r.pop();
      super.disconnectedCallback(), u(this, s)[s] = !1;
    }
    attributeChangedCallback(r, t, o) {
      if (!u(this, s)[s])
        return;
      const n = V(r, a);
      o == null && !this[n[0]] || (this[n[0]] = O(o, n[1]));
    }
  }), d = i[f];
  for (let [c, r] of Object.entries(d))
    r.attribute || (r.attribute = $(c));
  if (a[P]) {
    for (const c of a[P])
      if (c) {
        const r = document.head ?? document.querySelector("head"), t = document.createElement("style");
        t.appendChild(document.createTextNode(c)), r.appendChild(t);
      }
  }
  customElements.define(e, l);
}
function T(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let i = e.parentNode;
  for (; i && !i._$owner && !(i.assignedSlot && i.assignedSlot._$owner); )
    i = i.parentNode;
  return i && i.assignedSlot ? i.assignedSlot._$owner : e._$owner;
}
function V(e, i) {
  const s = i[f];
  return Object.entries(s).find(([a, l]) => a === e || l.attribute === e);
}
function F(e, i) {
  const s = i[f], a = [h, ...Object.keys(s ?? {})], l = e[C];
  function d(r, t, o) {
    const n = e[k];
    for (let p = 0; p < n.length; p++)
      if (n[p][0] === g.propertyValueChange)
        try {
          n[p][1](e, r, t, o);
        } catch (m) {
          console.warn("CustomElement property value change callback error", m);
        }
  }
  function c(r, t) {
    const o = r.attribute;
    t = x(t, r), t == null || t === !1 ? e.removeAttribute(o) : e.getAttribute(o) !== t && e.setAttribute(o, t);
  }
  for (let r = 0; r < a.length; r++) {
    const t = a[r], o = s[t];
    let n;
    l && t in l ? n = l[t] : n = e[t], o != null && o.reflect && c(o, n);
    const [p, m] = j(n);
    Object.defineProperty(e, t, {
      get: p,
      set(b) {
        m((_) => (t !== h && (o != null && o.reflect && c(o, b), d(t, b, _)), b));
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
export {
  W as defineCustomElement
};
//# sourceMappingURL=defineCustomElement.js.map
