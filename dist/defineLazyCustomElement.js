const s = {}, d = new MutationObserver((t) => {
  let n = [];
  for (const o of t)
    if (o.addedNodes)
      for (const e of o.addedNodes)
        e instanceof Element && s[e.tagName] && (customElements.get(e.tagName) || (customElements.define(e.tagName, s[e.tagName]()), n.push(e.tagName)), n.includes(e.tagName) && customElements.upgrade(e));
  for (const o of n)
    delete s[o];
  Object.keys(s).length === 0 && d.disconnect();
});
let c = !1;
function f(t, n) {
  t = t.toUpperCase(), !customElements.get(t) && (s[t] = n, c || (c = !0, d.observe(document, { subtree: !0, childList: !0 })));
}
export {
  f as defineLazyCustomElement
};
//# sourceMappingURL=defineLazyCustomElement.js.map
