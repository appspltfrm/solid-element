import { reactivePropsProp } from "./internals/reactivePropsProp.js";
import { isCustomElement } from "./isCustomElement.js";
function reactive(options) {
  return (element, propName, propertyDescriptor) => {
    if (isCustomElement(element)) {
      const constructor = element.constructor;
      const reactive2 = constructor[reactivePropsProp];
      reactive2[propName] = options ?? {};
    }
  };
}
export {
  reactive
};
//# sourceMappingURL=reactive.js.map
