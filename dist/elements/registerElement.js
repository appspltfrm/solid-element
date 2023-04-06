import { memo as m, insert as y, template as g } from "solid-js/web";
import { compose as w, register as C } from "component-register";
import { withSolid as O, getCurrentElement as j } from "solid-element";
import { splitProps as k } from "solid-js";
const E = /* @__PURE__ */ g("<style>");
function R(i, s) {
  if (customElements.get(i))
    return;
  const a = s, c = {
    slottedChildren: {
      value: void 0,
      attribute: "slotted-children",
      notify: !1,
      reflect: !1,
      parse: !1
    }
  };
  for (const [r, e] of Object.entries(a.reactive ?? {})) {
    const n = {
      value: void 0,
      notify: !1,
      parse: !1,
      reflect: !1,
      attribute: void 0
    };
    typeof e == "object" && Object.assign(n, e), c[r] = n;
  }
  const p = s.prototype.connectedCallback, d = s.prototype.disconnectedCallback;
  let t, l = s;
  for (; l !== HTMLElement && (t = Object.getOwnPropertyDescriptor(l.prototype, "renderRoot"), !t); )
    l = Object.getPrototypeOf(l);
  const u = w(C(i, c, {
    BaseElement: s
  }), O)((r) => {
    const e = a.__shadowStyles, [n, f] = k(r, ["slottedChildren"]), o = j();
    return p && p.call(o), d && o.addReleaseCallback(() => d.call(o)), o.renderRoot === o.shadowRoot ? [m(() => e && (typeof e == "string" ? [e] : e).map((b) => (() => {
      const h = E();
      return y(h, b), h;
    })())), m(() => o.template({
      props: f,
      children: []
    }))] : o.template({
      props: f,
      children: n.slottedChildren ?? []
    });
  });
  t != null && t.get && Object.defineProperty(u.prototype, "renderRoot", {
    get() {
      var e;
      const r = (e = t == null ? void 0 : t.get) == null ? void 0 : e.call(this);
      if (r)
        return r;
      if (!this.shadowRoot)
        return this.attachShadow({
          mode: "open"
        });
    }
  });
}
export {
  R as registerElement
};
//# sourceMappingURL=registerElement.js.map
