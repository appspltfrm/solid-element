var v = Object.defineProperty;
var j = (t, e, o) => e in t ? v(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var d = (t, e, o) => (j(t, typeof e != "symbol" ? e + "" : e, o), o);
import { birthmarkProp as m } from "./internals/birthmarkProp.js";
import { CallbackName as p } from "./internals/CallbackName.js";
import { callbacksProp as P } from "./internals/callbacksProp.js";
import { fromAttributeValue as g } from "./internals/fromAttributeValue.js";
import { preValuesProp as w } from "./internals/preValuesProp.js";
import { reactivePropsProp as b } from "./internals/reactivePropsProp.js";
import { renderRootProp as C } from "./internals/renderRootProp.js";
import { stylesProp as O } from "./internals/stylesProp.js";
function H(t, e) {
  var i, l;
  const o = typeof t == "function" ? t : HTMLElement;
  if (typeof t == "object" && (e = t), e || (e = {}), e.renderRoot || (e.renderRoot = "shadow"), e.reactive)
    for (const s of Object.keys(e.reactive))
      typeof e.reactive[s] == "boolean" && (e.reactive[s] = {});
  const r = (l = class extends o {
    constructor() {
      super();
      const n = Object.getOwnPropertyNames(this).filter((c) => c !== "_$owner"), f = {};
      let u = !1;
      for (const c of n) {
        const a = Object.getOwnPropertyDescriptor(this, c);
        a != null && a.writable && (f[c] = a.value, u = !0);
      }
      const y = Object.getPrototypeOf(this).constructor[b];
      for (const [c, a] of Object.entries(y))
        !n.includes(c) && this.hasAttribute(a.attribute) && (f[c] = g(this.getAttribute(a.attribute), a), u = !0);
      u && Object.defineProperty(this, w, { value: f, enumerable: !1, writable: !0 }), Object.defineProperty(this, P, { value: [], enumerable: !1, writable: !1 });
    }
    get [(i = m, m)]() {
      return !0;
    }
    get renderRoot() {
      return e.renderRoot === "element" ? this : this.shadowRoot ?? this.attachShadow({ mode: e.mode || "open", slotAssignment: e.slotAssignment, delegatesFocus: e.delegatesFocus });
    }
    addDisconnectedCallback(n) {
      return h(this, p.disconnected, n);
    }
    addPropertyValueChangeCallback(n) {
      return h(this, p.propertyValueChange, n);
    }
  }, d(l, i, !0), l);
  return Object.defineProperty(r, b, { value: e.reactive ?? {} }), Object.defineProperty(r, C, { value: e.renderRoot }), e.styles && Object.defineProperty(r, O, { value: e.styles }), Object.defineProperty(r.prototype, "template", { value: () => {
  } }), Object.defineProperty(r.prototype, "connectedCallback", { value: () => {
  } }), Object.defineProperty(r.prototype, "disconnectedCallback", { value: () => {
  } }), r;
}
function h(t, e, o) {
  const r = t[P];
  return r.find((i) => i[0] === e && i[1] === o) || r.push([e, o]), () => {
    const i = r.findIndex((l) => l[0] === e && l[1] === o);
    i > -1 && r.splice(i, 1);
  };
}
export {
  H as CustomElement
};
//# sourceMappingURL=CustomElement.js.map
