import { reactivePropsProp as e } from "./internals/reactivePropsProp.js";
import { isCustomElement as i } from "./isCustomElement.js";
function m(o) {
  return (r, t, s) => {
    if (i(r)) {
      const c = r.constructor[e];
      c[t] = o ?? {};
    }
  };
}
export {
  m as reactive
};
//# sourceMappingURL=reactive.js.map
