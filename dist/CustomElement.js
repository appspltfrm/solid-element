var v = Object.defineProperty;
var g = (r, e, o) => e in r ? v(r, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[e] = o;
var d = (r, e, o) => (g(r, typeof e != "symbol" ? e + "" : e, o), o);
import { customElementBirthmark as m } from "./customElementBirthmark.js";
import { CallbackName as b } from "./internals/CallbackName.js";
import { callbacksProp as P } from "./internals/callbacksProp.js";
import { fromAttributeValue as j } from "./internals/fromAttributeValue.js";
import { globalStylesProp as w } from "./internals/globalStylesProp.js";
import { preValuesProp as O } from "./internals/preValuesProp.js";
import { reactivePropsProp as y } from "./internals/reactivePropsProp.js";
import { renderRootProp as C } from "./internals/renderRootProp.js";
import { stylesProp as R } from "./internals/stylesProp.js";
function I(r, e) {
  var c, i;
  const o = typeof r == "function" ? r : HTMLElement;
  if (typeof r == "object" && (e = r), e || (e = {}), e.renderRoot || (e.renderRoot = "shadow"), e.reactive)
    for (const f of Object.keys(e.reactive))
      typeof e.reactive[f] == "boolean" && (e.reactive[f] = {});
  const t = (i = class extends o {
    constructor() {
      super();
      const l = Object.getOwnPropertyNames(this).filter((s) => s !== "_$owner"), n = {};
      let u = !1;
      for (const s of l) {
        const a = Object.getOwnPropertyDescriptor(this, s);
        a != null && a.writable && (n[s] = a.value, u = !0);
      }
      const h = Object.getPrototypeOf(this).constructor[y];
      for (const [s, a] of Object.entries(h))
        !l.includes(s) && this.hasAttribute(a.attribute) && (n[s] = j(this.getAttribute(a.attribute), a), u = !0);
      u && Object.defineProperty(this, O, { value: n, enumerable: !1, writable: !0 }), Object.defineProperty(this, P, { value: [], enumerable: !1, writable: !1 });
    }
    get [(c = m, m)]() {
      return !0;
    }
    get renderRoot() {
      return e.renderRoot === "element" ? this : this.shadowRoot ?? this.attachShadow({ mode: e.mode || "open", slotAssignment: e.slotAssignment, delegatesFocus: e.delegatesFocus });
    }
    addDisconnectedCallback(l) {
      return p(this, b.disconnected, l);
    }
    addPropertyValueChangeCallback(l) {
      return p(this, b.propertyValueChange, l);
    }
  }, d(i, c, !0), i);
  if (Object.defineProperty(t, y, { value: e.reactive ?? {} }), Object.defineProperty(t, C, { value: e.renderRoot }), e.styles && e.renderRoot !== "element" && Object.defineProperty(t, R, { value: Array.isArray(e.styles) ? e.styles : [e.styles] }), e.globalStyles || e.renderRoot === "element" && e.styles) {
    const f = [e.globalStyles, e.renderRoot === "element" ? e.styles : void 0].flat().filter((l) => !!l);
    Object.defineProperty(t, w, { value: f });
  }
  return Object.defineProperty(t.prototype, "template", { value: () => {
  } }), Object.defineProperty(t.prototype, "connectedCallback", { value: () => {
  } }), Object.defineProperty(t.prototype, "disconnectedCallback", { value: () => {
  } }), t;
}
function p(r, e, o) {
  const t = r[P];
  return t.find((c) => c[0] === e && c[1] === o) || t.push([e, o]), () => {
    const c = t.findIndex((i) => i[0] === e && i[1] === o);
    c > -1 && t.splice(c, 1);
  };
}
export {
  I as customElement
};
//# sourceMappingURL=customElement.js.map
