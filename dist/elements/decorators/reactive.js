function i(e) {
  return (c, o, n) => {
    const r = c.constructor, t = r.reactive ?? {};
    t[o] = e ?? !0, r.reactive = t;
  };
}
export {
  i as reactive
};
//# sourceMappingURL=reactive.js.map
