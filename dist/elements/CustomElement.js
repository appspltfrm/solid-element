var o = Object.defineProperty;
var s = (t, e, a) => e in t ? o(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var d = (t, e, a) => (s(t, typeof e != "symbol" ? e + "" : e, a), a);
class c extends HTMLElement {
  addDisconnectedCallback(e) {
    this.addReleaseCallback(e);
  }
  get renderRoot() {
    return this.shadowRoot || this.attachShadow({ mode: "open" });
  }
}
/**
 * Returns definition of reactive props.
 */
d(c, "reactive");
export {
  c as CustomElement
};
//# sourceMappingURL=CustomElement.js.map
