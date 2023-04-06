function d(t, e) {
  return function(r) {
    t !== "shadow" ? Object.defineProperty(r.prototype, "renderRoot", {
      get() {
        return this;
      }
    }) : r.__shadowStyles = e == null ? void 0 : e.styles;
  };
}
export {
  d as renderRoot
};
//# sourceMappingURL=renderRoot.js.map
