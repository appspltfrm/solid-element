var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { customElementBirthmark } from "./customElementBirthmark.js";
import { CallbackName } from "./internals/CallbackName.js";
import { callbacksProp } from "./internals/callbacksProp.js";
import { fromAttributeValue } from "./internals/fromAttributeValue.js";
import { globalStylesProp } from "./internals/globalStylesProp.js";
import { preValuesProp } from "./internals/preValuesProp.js";
import { reactivePropsProp } from "./internals/reactivePropsProp.js";
import { renderRootProp } from "./internals/renderRootProp.js";
import { stylesProp } from "./internals/stylesProp.js";
function customElement(baseTypeOrOptions, options) {
  var _a, _b;
  const BaseType = typeof baseTypeOrOptions === "function" ? baseTypeOrOptions : HTMLElement;
  if (typeof baseTypeOrOptions === "object") {
    options = baseTypeOrOptions;
  }
  if (!options) {
    options = {};
  }
  if (!options.renderRoot) {
    options.renderRoot = "shadow";
  }
  if (options.reactive) {
    for (const propName of Object.keys(options.reactive)) {
      if (typeof options.reactive[propName] === "boolean") {
        options.reactive[propName] = {};
      }
    }
  }
  const newClass = (_b = class extends BaseType {
    constructor() {
      super();
      const ownPropNames = Object.getOwnPropertyNames(this).filter((p) => p !== "_$owner");
      const preValues = {};
      let hasPreValue = false;
      for (const propName of ownPropNames) {
        const descriptor = Object.getOwnPropertyDescriptor(this, propName);
        if (descriptor == null ? void 0 : descriptor.writable) {
          preValues[propName] = descriptor.value;
          hasPreValue = true;
        }
      }
      const reactiveProps = Object.getPrototypeOf(this).constructor[reactivePropsProp];
      for (const [propName, propDefinition] of Object.entries(reactiveProps)) {
        if (!ownPropNames.includes(propName) && this.hasAttribute(propDefinition.attribute)) {
          preValues[propName] = fromAttributeValue(this.getAttribute(propDefinition.attribute), propDefinition);
          hasPreValue = true;
        }
      }
      if (hasPreValue) {
        Object.defineProperty(this, preValuesProp, { value: preValues, enumerable: false, writable: true });
      }
      Object.defineProperty(this, callbacksProp, { value: [], enumerable: false, writable: false });
    }
    get [(_a = customElementBirthmark, customElementBirthmark)]() {
      return true;
    }
    get renderRoot() {
      if (options.renderRoot === "element") {
        return this;
      }
      return this.shadowRoot ?? this.attachShadow({ mode: options.mode || "open", slotAssignment: options.slotAssignment, delegatesFocus: options.delegatesFocus });
    }
    addDisconnectedCallback(callback) {
      return addCallback(this, CallbackName.disconnected, callback);
    }
    addPropertyValueChangeCallback(callback) {
      return addCallback(this, CallbackName.propertyValueChange, callback);
    }
  }, __publicField(_b, _a, true), _b);
  Object.defineProperty(newClass, reactivePropsProp, { value: options.reactive ?? {} });
  Object.defineProperty(newClass, renderRootProp, { value: options.renderRoot });
  if (options.styles && options.renderRoot !== "element") {
    Object.defineProperty(newClass, stylesProp, { value: Array.isArray(options.styles) ? options.styles : [options.styles] });
  }
  if (options.globalStyles || options.renderRoot === "element" && options.styles) {
    const styles = [options.globalStyles, options.renderRoot === "element" ? options.styles : void 0].flat().filter((s) => !!s);
    Object.defineProperty(newClass, globalStylesProp, { value: styles });
  }
  Object.defineProperty(newClass.prototype, "template", { value: () => void 0 });
  Object.defineProperty(newClass.prototype, "connectedCallback", { value: () => void 0 });
  Object.defineProperty(newClass.prototype, "disconnectedCallback", { value: () => void 0 });
  return newClass;
}
function addCallback(element, name, callback) {
  const callbacks = element[callbacksProp];
  if (!callbacks.find((c) => c[0] === name && c[1] === callback)) {
    callbacks.push([name, callback]);
  }
  return () => {
    const i = callbacks.findIndex((c) => c[0] === name && c[1] === callback);
    if (i > -1) {
      callbacks.splice(i, 1);
    }
  };
}
export {
  customElement
};
//# sourceMappingURL=customElement.js.map
