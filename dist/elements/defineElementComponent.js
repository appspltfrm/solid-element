import { children as b, splitProps as E, createMemo as m, sharedConfig as g, mergeProps as j } from "solid-js";
import { getNextElement as y, spread as O } from "solid-js/web";
import { registerElement as v } from "./registerElement.js";
function H(r, l, e, D) {
  const i = typeof l != "boolean" && l;
  function h() {
    if (!customElements.get(r)) {
      if (i)
        v(r, i);
      else if (e != null && e.define)
        for (const d of Array.isArray(e.define) ? e.define : [e.define])
          d();
    }
  }
  let f;
  if (i) {
    const d = i;
    f = (u) => {
      h();
      const P = b(() => u.children), [, p] = E(u, ["children"]), a = m(() => {
        var s;
        const t = {}, n = Object.getOwnPropertyDescriptors(p);
        for (const c of Object.keys(n)) {
          const o = (s = d.reactive) != null && s[c] ? `prop:${c}` : $(c);
          Object.defineProperty(t, c !== o ? o : c, n[c]);
        }
        return t;
      });
      return m(() => {
        const t = g.context ? y() : document.createElement(r), s = t.renderRoot === t ? "prop:slottedChildren" : "children";
        return O(t, j(a, {
          [s]: P
        }), !1, !1), t;
      });
    };
  } else
    f = (d) => (h(), m(() => {
      const u = b(() => d.children), [P, p] = E(d, ["children"]), a = g.context ? y() : document.createElement(r), t = m(() => {
        var c;
        const n = {}, s = Object.getOwnPropertyDescriptors(p);
        for (const o of Object.keys(s)) {
          const x = $(o);
          Object.defineProperty(n, o !== x ? x : o, s[o]);
        }
        return (c = e == null ? void 0 : e.propsHandler) == null || c.call(e, n), n;
      });
      return O(a, j(e == null ? void 0 : e.initialProps, t, {
        children: (l && u) ?? []
      }), !1, !l), a;
    }));
  return f.tagName = r, f.register = h, f;
}
const C = ["class", "className", "classList", "ref", "style"];
function $(r) {
  return r.includes(":") || r.startsWith("on") || C.includes(r) ? r : r.includes("-") ? `attr:${r}` : `prop:${r}`;
}
export {
  H as defineElementComponent
};
//# sourceMappingURL=defineElementComponent.js.map
