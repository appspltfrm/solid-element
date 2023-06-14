import { buildFinalClass } from "./internals/buildFinalClass.js";
function defineCustomElement(tagName, ElementClass) {
  customElements.define(tagName, buildFinalClass(ElementClass));
}
export {
  defineCustomElement
};
//# sourceMappingURL=defineCustomElement.js.map
