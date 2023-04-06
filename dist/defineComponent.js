import { children as x, splitProps as j, createMemo as m, sharedConfig as C, mergeProps as E } from "solid-js";
import { getNextElement as y, spread as w } from "solid-js/web";
import { defineCustomElement as A } from "./defineCustomElement.js";
import { childrenProp as D } from "./internals/childrenProp.js";
import { reactivePropsProp as O } from "./internals/reactivePropsProp.js";
function N(r, l, g) {
  const f = typeof l == "function" && l, e = typeof l == "object" ? l : g;
  function a() {
    if (!customElements.get(r)) {
      if (f)
        A(r, f);
      else if (e != null && e.define)
        for (const c of Array.isArray(e.define) ? e.define : [e.define])
          c();
    }
  }
  let s;
  if (f) {
    const c = f;
    s = (d) => {
      a();
      const P = x(() => d.children), [, h] = j(d, ["children"]), p = m(() => {
        const n = {}, o = Object.getOwnPropertyDescriptors(h);
        for (const t of Object.keys(o)) {
          const i = c[O][t] ? `prop:${t}` : $(t);
          Object.defineProperty(n, t !== i ? i : t, o[t]);
        }
        return n;
      });
      return m(() => {
        const n = C.context ? y() : document.createElement(r), t = n.renderRoot === n ? `prop:${D}` : "children";
        return w(n, E(p, {
          [t]: P
        }), !1, !1), n;
      });
    };
  } else
    s = (c) => (a(), m(() => {
      const d = x(() => c.children), [P, h] = j(c, ["children"]), p = C.context ? y() : document.createElement(r), n = m(() => {
        var i;
        const o = {}, t = Object.getOwnPropertyDescriptors(h);
        for (const u of Object.keys(t)) {
          const b = $(u);
          Object.defineProperty(o, u !== b ? b : u, t[u]);
        }
        return (i = e == null ? void 0 : e.propsHandler) == null || i.call(e, o), o;
      });
      return w(p, E(e == null ? void 0 : e.initialProps, n, {
        children: d ?? []
      }), !1, !1), p;
    }));
  return s.tagName = r, s.defineCustomElement = a, s;
}
const S = ["class", "className", "classList", "ref", "style"];
function $(r) {
  return r.includes(":") || r.startsWith("on") || S.includes(r) ? r : r.includes("-") ? `attr:${r}` : `prop:${r}`;
}
export {
  N as defineComponent
};
//# sourceMappingURL=defineComponent.js.map
