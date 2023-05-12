import { effect as A, insert as O, template as _ } from "solid-js/web";
import { createRoot as j, getOwner as w, createSignal as x } from "solid-js";
import { CallbackName as k } from "./CallbackName.js";
import { callbacksProp as C } from "./callbacksProp.js";
import { childrenProp as P } from "./childrenProp.js";
import { fromAttributeValue as N } from "./fromAttributeValue.js";
import { globalStylesProp as g } from "./globalStylesProp.js";
import { ownerProp as c } from "./ownerProp.js";
import { preValuesProp as v } from "./preValuesProp.js";
import { reactivePropsProp as m } from "./reactivePropsProp.js";
import { stylesProp as y } from "./stylesProp.js";
import { toAttributeName as R } from "./toAttributeName.js";
import { toAttributeValue as F } from "./toAttributeValue.js";
const T = /* @__PURE__ */ _("<style>");
function d(t, e) {
  if (!Object.prototype.hasOwnProperty.call(t, e))
    throw new TypeError("attempted to use private field on non-instance");
  return t;
}
var V = 0;
function L(t) {
  return "__private_" + V++ + "_" + t;
}
function Z(t) {
  var e;
  const s = t, u = (e = /* @__PURE__ */ L("initialized"), class extends t {
    static get observedAttributes() {
      const n = s[m];
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
      d(this, e)[e] || (d(this, e)[e] = !0, E(n, s), n[v] = void 0, super.connectedCallback(), j((o) => {
        this.addDisconnectedCallback(() => {
          this.renderRoot.textContent = "", o(), delete n[c];
        });
        let r = super.template({
          children: n[P]
        });
        return r && s[y] && this.renderRoot !== this && (r = [(() => {
          const i = T();
          return A(() => i.innerHTML = s[y].join(`
`)), i;
        })(), r]), n[c] = w(), O(this.renderRoot, r);
      }, z(this)));
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      const n = this[C];
      let o = n.pop();
      for (; o; )
        o[0] === k.disconnected && o[1](this), o = n.pop();
      super.disconnectedCallback(), d(this, e)[e] = !1;
    }
    attributeChangedCallback(n, o, r) {
      if (!d(this, e)[e])
        return;
      const i = D(n, s);
      r == null && !this[i[0]] || (this[i[0]] = N(r, i[1]));
    }
  }), l = t[m];
  for (let [p, n] of Object.entries(l))
    n.attribute || (n.attribute = R(p));
  if (s[g]) {
    for (const p of s[g])
      if (p) {
        const n = document.head ?? document.querySelector("head"), o = document.createElement("style");
        o.appendChild(document.createTextNode(p)), n.appendChild(o);
      }
  }
  return u;
}
function z(t) {
  if (t.assignedSlot && t.assignedSlot[c])
    return t.assignedSlot[c];
  let e = t.parentNode;
  for (; e && !e[c] && !(e.assignedSlot && e.assignedSlot[c]); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot[c] : t[c];
}
function D(t, e) {
  const s = e[m];
  return Object.entries(s).find(([u, l]) => u === t || l.attribute === t);
}
function E(t, e) {
  const s = e[m], u = [P, ...Object.keys(s ?? {})], l = t[v];
  function p(o, r, i) {
    const a = t[C];
    for (let f = 0; f < a.length; f++)
      if (a[f][0] === k.propertyValueChange)
        try {
          a[f][1](t, o, r, i);
        } catch (b) {
          console.warn("CustomElement property value change callback error", b);
        }
  }
  function n(o, r) {
    const i = o.attribute;
    r = F(r, o), r == null || r === !1 ? t.removeAttribute(i) : t.getAttribute(i) !== r && t.setAttribute(i, r);
  }
  for (let o = 0; o < u.length; o++) {
    const r = u[o], i = s[r];
    let a;
    l && r in l ? a = l[r] : a = t[r], i != null && i.reflect && n(i, a);
    const [f, b] = x(a);
    Object.defineProperty(t, r, {
      get: f,
      set(h) {
        b((S) => (r !== P && (i != null && i.reflect && n(i, h), p(r, h, S)), h));
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
export {
  Z as buildFinalClass
};
//# sourceMappingURL=buildFinalClass.js.map
