import { insert as _, template as A } from "solid-js/web";
import { createRoot as v, createSignal as w } from "solid-js";
import { CallbackName as P } from "./internals/CallbackName.js";
import { callbacksProp as g } from "./internals/callbacksProp.js";
import { childrenProp as y } from "./internals/childrenProp.js";
import { fromAttributeValue as S } from "./internals/fromAttributeValue.js";
import { preValuesProp as k } from "./internals/preValuesProp.js";
import { reactivePropsProp as f } from "./internals/reactivePropsProp.js";
import { renderRootProp as j } from "./internals/renderRootProp.js";
import { stylesProp as p } from "./internals/stylesProp.js";
import { toAttributeName as O } from "./internals/toAttributeName.js";
import { toAttributeValue as $ } from "./internals/toAttributeValue.js";
const x = /* @__PURE__ */ A("<style>");
function d(e, n) {
  if (!Object.prototype.hasOwnProperty.call(e, n))
    throw new TypeError("attempted to use private field on non-instance");
  return e;
}
var N = 0;
function R(e) {
  return "__private_" + N++ + "_" + e;
}
function U(e, n) {
  var s;
  const i = n, u = (s = /* @__PURE__ */ R("initialized"), class extends n {
    static get observedAttributes() {
      const r = i[f];
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
      d(this, s)[s] || (d(this, s)[s] = !0, V(r, i), r[k] = void 0, super.connectedCallback(), v((t) => {
        this.addDisconnectedCallback(() => {
          this.renderRoot.textContent = "", t();
        });
        let o = super.template({
          children: r[y]
        });
        if (o && i[p] && this.renderRoot === this) {
          const a = Array.isArray(i[p]) ? i[p].join(`
`) : i[p];
          o = [(() => {
            const c = x();
            return c.innerHTML = a, c;
          })(), o];
        }
        return _(this.renderRoot, o);
      }, E(this)));
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      const r = this[g];
      let t = r.pop();
      for (; t; )
        t[0] === P.disconnected && t[1](this), t = r.pop();
      super.disconnectedCallback(), d(this, s)[s] = !1;
    }
    attributeChangedCallback(r, t, o) {
      if (!d(this, s)[s])
        return;
      const a = T(r, i);
      o == null && !this[a[0]] || (this[a[0]] = S(o, a[1]));
    }
  }), m = n[f];
  for (let [l, r] of Object.entries(m))
    r.attribute || (r.attribute = O(l));
  if (i[j] === "element" && i[p]) {
    for (const l of Array.isArray(i[p]) ? i[p] : [i[p]])
      if (l) {
        const r = document.head ?? document.querySelector("head"), t = document.createElement("style");
        t.appendChild(document.createTextNode(l)), r.appendChild(t);
      }
  }
  customElements.define(e, u);
}
function E(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let n = e.parentNode;
  for (; n && !n._$owner && !(n.assignedSlot && n.assignedSlot._$owner); )
    n = n.parentNode;
  return n && n.assignedSlot ? n.assignedSlot._$owner : e._$owner;
}
function T(e, n) {
  const s = n[f];
  return Object.entries(s).find(([i, u]) => i === e || u.attribute === e);
}
function V(e, n) {
  const s = n[f], i = [y, ...Object.keys(s ?? {})], u = e[k];
  function m(r, t, o) {
    const a = e[g];
    for (let c = 0; c < a.length; c++)
      if (a[c][0] === P.propertyValueChange)
        try {
          a[c][1](e, r, t, o);
        } catch (b) {
          console.warn("CustomElement property value change callback error", b);
        }
  }
  function l(r, t) {
    const o = r.attribute;
    t = $(t, r), t == null || t === !1 ? e.removeAttribute(o) : e.getAttribute(o) !== t && e.setAttribute(o, t);
  }
  for (let r = 0; r < i.length; r++) {
    const t = i[r], o = s[t];
    let a;
    u && t in u ? a = u[t] : a = e[t], o != null && o.reflect && l(o, a);
    const [c, b] = w(a);
    Object.defineProperty(e, t, {
      get: c,
      set(h) {
        b((C) => (t !== y && (o != null && o.reflect && l(o, h), m(t, h, C)), h));
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
export {
  U as defineCustomElement
};
//# sourceMappingURL=defineCustomElement.js.map
