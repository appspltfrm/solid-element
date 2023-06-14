function toAttributeName(propName) {
  return propName.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
export {
  toAttributeName
};
//# sourceMappingURL=toAttributeName.js.map
