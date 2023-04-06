function a(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  a as toAttributeName
};
//# sourceMappingURL=toAttributeName.js.map
