var v = Object.defineProperty;
var g = (r, e, o) => e in r ? v(r, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[e] = o;
var d = (r, e, o) => (g(r, typeof e != "symbol" ? e + "" : e, o), o);
import { globalStylesProp as j } from "./internals/globalStylesProp.js";
import { customElementBirthmark as m } from "./customElementBirthmark.js";
import { CallbackName as b } from "./internals/CallbackName.js";
import { callbacksProp as P } from "./internals/callbacksProp.js";
import { fromAttributeValue as w } from "./internals/fromAttributeValue.js";
import { preValuesProp as C } from "./internals/preValuesProp.js";
import { reactivePropsProp as y } from "./internals/reactivePropsProp.js";
import { renderRootProp as O } from "./internals/renderRootProp.js";
import { stylesProp as R } from "./internals/stylesProp.js";
function I(r, e) {
  var s, i;
  const o = typeof r == "function" ? r : HTMLElement;
  if (typeof r == "object" && (e = r), e || (e = {}), e.renderRoot || (e.renderRoot = "shadow"), e.reactive)
    for (const f of Object.keys(e.reactive))
      typeof e.reactive[f] == "boolean" && (e.reactive[f] = {});
  const t = (i = class extends o {
    constructor() {
      super();
      const a = Object.getOwnPropertyNames(this).filter((c) => c !== "_$owner"), n = {};
      let u = !1;
      for (const c of a) {
        const l = Object.getOwnPropertyDescriptor(this, c);
        l != null && l.writable && (n[c] = l.value, u = !0);
      }
      const h = Object.getPrototypeOf(this).constructor[y];
      for (const [c, l] of Object.entries(h))
        !a.includes(c) && this.hasAttribute(l.attribute) && (n[c] = w(this.getAttribute(l.attribute), l), u = !0);
      u && Object.defineProperty(this, C, { value: n, enumerable: !1, writable: !0 }), Object.defineProperty(this, P, { value: [], enumerable: !1, writable: !1 });
    }
    get [(s = m, m)]() {
      return !0;
    }
    get renderRoot() {
      return e.renderRoot === "element" ? this : this.shadowRoot ?? this.attachShadow({ mode: e.mode || "open", slotAssignment: e.slotAssignment, delegatesFocus: e.delegatesFocus });
    }
    addDisconnectedCallback(a) {
      return p(this, b.disconnected, a);
    }
    addPropertyValueChangeCallback(a) {
      return p(this, b.propertyValueChange, a);
    }
  }, d(i, s, !0), i);
  if (Object.defineProperty(t, y, { value: e.reactive ?? {} }), Object.defineProperty(t, O, { value: e.renderRoot }), e.styles && e.renderRoot !== "element" && Object.defineProperty(t, R, { value: Array.isArray(e.styles) ? e.styles : [e.styles] }), e.globalStyles || e.renderRoot === "element" && e.styles) {
    const f = [e.globalStyles, e.styles].flat().filter((a) => !!a);
    Object.defineProperty(t, j, { value: f });
  }
  return Object.defineProperty(t.prototype, "template", { value: () => {
  } }), Object.defineProperty(t.prototype, "connectedCallback", { value: () => {
  } }), Object.defineProperty(t.prototype, "disconnectedCallback", { value: () => {
  } }), t;
}
function p(r, e, o) {
  const t = r[P];
  return t.find((s) => s[0] === e && s[1] === o) || t.push([e, o]), () => {
    const s = t.findIndex((i) => i[0] === e && i[1] === o);
    s > -1 && t.splice(s, 1);
  };
}
export {
  I as CustomElement
};
//# sourceMappingURL=CustomElement.js.map
