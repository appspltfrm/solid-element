import { customElementBirthmark as l } from "./customElementBirthmark.js";
import { buildFinalClass as r } from "./internals/buildFinalClass.js";
const n = {}, m = new MutationObserver(async (t) => {
  let s = [];
  for (const f of t)
    if (f.addedNodes) {
      for (const o of f.addedNodes)
        if (o instanceof Element && n[o.tagName]) {
          if (!customElements.get(o.tagName)) {
            let e = await n[o.tagName]();
            typeof e == "object" && (e = e.default), typeof e == "function" && e.defineCustomElement ? e.defineCustomElement() : (e[l] && (e = r(e)), customElements.define(o.tagName.toLowerCase(), e)), s.push(o.tagName);
          }
          s.includes(o.tagName) && customElements.upgrade(o);
        }
    }
  for (const f of s)
    delete n[f];
  Object.keys(n).length === 0 && m.disconnect();
});
let i = !1;
function u(t, s) {
  if (t = t.toUpperCase(), customElements.get(t) || n[t])
    throw new Error(`Custom element ${t} already defined`);
  n[t] = s, i || (i = !0, m.observe(document, { subtree: !0, childList: !0 }));
}
export {
  u as defineLazyCustomElement
};
//# sourceMappingURL=defineLazyCustomElement.js.map
