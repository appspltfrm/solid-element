import { customElementBirthmark as d } from "./customElementBirthmark.js";
import { buildFinalClass as a } from "./internals/buildFinalClass.js";
const i = {}, f = {}, r = new MutationObserver(async (t) => {
  let o = [];
  for (const l of t)
    if (l.addedNodes) {
      for (const n of l.addedNodes)
        if (n instanceof Element && i[n.tagName]) {
          const s = n.tagName;
          !o.includes(s) && !customElements.get(s) && (s in f || (f[s] = new Promise(async (c) => {
            try {
              let e = await i[n.tagName]();
              typeof e == "object" && (e = e.default), typeof e == "function" && e.defineCustomElement ? e.defineCustomElement() : (e[d] && (e = a(e)), customElements.define(n.tagName.toLowerCase(), e)), c();
            } catch (e) {
              console.error(e), delete f[s];
            }
          })), await f[s], o.push(n.tagName)), o.includes(n.tagName) && customElements.upgrade(n);
        }
    }
  for (const l of o)
    delete i[l], delete f[l];
  Object.keys(i).length === 0 && r.disconnect();
});
let m = !1;
function p(t, o) {
  if (t = t.toUpperCase(), customElements.get(t) || i[t])
    throw new Error(`Custom element ${t} already defined`);
  i[t] = o, m || (m = !0, r.observe(document, { subtree: !0, childList: !0 }));
}
export {
  p as defineLazyCustomElement
};
//# sourceMappingURL=defineLazyCustomElement.js.map
