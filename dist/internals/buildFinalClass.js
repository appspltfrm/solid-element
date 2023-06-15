import { effect, insert, template } from "solid-js/web";
import { createRoot, getOwner, createSignal } from "solid-js";
import { CallbackName } from "./CallbackName.js";
import { callbacksProp } from "./callbacksProp.js";
import { childrenProp } from "./childrenProp.js";
import { classesProp } from "./classesProp.js";
import { fromAttributeValue } from "./fromAttributeValue.js";
import { globalStylesProp } from "./globalStylesProp.js";
import { ownerProp } from "./ownerProp.js";
import { preValuesProp } from "./preValuesProp.js";
import { reactivePropsProp } from "./reactivePropsProp.js";
import { stylesProp } from "./stylesProp.js";
import { toAttributeName } from "./toAttributeName.js";
import { toAttributeValue } from "./toAttributeValue.js";
const _tmpl$ = /* @__PURE__ */ template(`<style>`);
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
function buildFinalClass(ElementClass) {
  var _initialized;
  const internalClass = ElementClass;
  const finalClass = (_initialized = /* @__PURE__ */ _classPrivateFieldLooseKey("initialized"), class CustomElementFinal extends ElementClass {
    static get observedAttributes() {
      const props = internalClass[reactivePropsProp];
      return Object.values(props).map((p) => p.attribute);
    }
    constructor() {
      super();
      Object.defineProperty(this, _initialized, {
        writable: true,
        value: false
      });
    }
    connectedCallback() {
      const internalThis = this;
      if (_classPrivateFieldLooseBase(this, _initialized)[_initialized]) {
        return;
      }
      _classPrivateFieldLooseBase(this, _initialized)[_initialized] = true;
      initReactiveProps(internalThis, internalClass);
      internalThis[preValuesProp] = void 0;
      if (internalClass[classesProp]) {
        for (const c of internalClass[classesProp]) {
          this.classList.add(c);
        }
      }
      super.connectedCallback();
      createRoot((dispose) => {
        this.addDisconnectedCallback(() => {
          this.renderRoot.textContent = "";
          dispose();
          delete internalThis[ownerProp];
        });
        let template2 = super.template({
          children: internalThis[childrenProp]
        });
        if (template2 && internalClass[stylesProp] && this.renderRoot !== this) {
          template2 = [(() => {
            const _el$ = _tmpl$();
            effect(() => _el$.innerHTML = internalClass[stylesProp].join("\n"));
            return _el$;
          })(), template2];
        }
        internalThis[ownerProp] = getOwner();
        return insert(this.renderRoot, template2);
      }, lookupContext(this));
    }
    async disconnectedCallback() {
      await Promise.resolve();
      if (this.isConnected) {
        return;
      }
      const callbacks = this[callbacksProp];
      let callback = callbacks.pop();
      while (callback) {
        if (callback[0] === CallbackName.disconnected) {
          callback[1](this);
        }
        callback = callbacks.pop();
      }
      super.disconnectedCallback();
      _classPrivateFieldLooseBase(this, _initialized)[_initialized] = false;
    }
    attributeChangedCallback(name, oldVal, newVal) {
      if (!_classPrivateFieldLooseBase(this, _initialized)[_initialized]) {
        return;
      }
      const prop = lookupAttributeProp(name, internalClass);
      if (newVal == null && !this[prop[0]]) {
        return;
      }
      this[prop[0]] = fromAttributeValue(newVal, prop[1]);
    }
  });
  const reactiveProps = ElementClass[reactivePropsProp];
  for (let [propName, propDefinition] of Object.entries(reactiveProps)) {
    if (!propDefinition.attribute) {
      propDefinition.attribute = toAttributeName(propName);
    }
  }
  if (internalClass[globalStylesProp]) {
    for (const css of internalClass[globalStylesProp]) {
      if (css) {
        const head = document.head ?? document.querySelector("head");
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    }
  }
  return finalClass;
}
function lookupContext(el) {
  if (el.assignedSlot && el.assignedSlot[ownerProp]) {
    return el.assignedSlot[ownerProp];
  }
  let next = el.parentNode;
  while (next && !next[ownerProp] && !(next.assignedSlot && next.assignedSlot[ownerProp])) {
    next = next.parentNode;
  }
  return next && next.assignedSlot ? next.assignedSlot[ownerProp] : el[ownerProp];
}
function lookupAttributeProp(attributeName, elementClass) {
  const props = elementClass[reactivePropsProp];
  return Object.entries(props).find(([propName, prop]) => propName === attributeName || prop.attribute === attributeName);
}
function initReactiveProps(element, elementClass) {
  const reactiveProps = elementClass[reactivePropsProp];
  const names = [childrenProp, ...Object.keys(reactiveProps ?? {})];
  const preValues = element[preValuesProp];
  function firePropChange(propName, newVal, oldVal) {
    const callbacks = element[callbacksProp];
    for (let i = 0; i < callbacks.length; i++) {
      if (callbacks[i][0] === CallbackName.propertyValueChange) {
        try {
          callbacks[i][1](element, propName, newVal, oldVal);
        } catch (e) {
          console.warn("CustomElement property value change callback error", e);
        }
      }
    }
  }
  function reflectAttribute(prop, value) {
    const attr = prop.attribute;
    value = toAttributeValue(value, prop);
    if (value === void 0 || value === null || value === false) {
      element.removeAttribute(attr);
    } else {
      const prev = element.getAttribute(attr);
      if (prev !== value) {
        element.setAttribute(attr, value);
      }
    }
  }
  for (let i = 0; i < names.length; i++) {
    const propName = names[i];
    const propConfig = reactiveProps[propName];
    let initialValue = void 0;
    if (preValues && propName in preValues) {
      initialValue = preValues[propName];
    } else {
      initialValue = element[propName];
    }
    if (propConfig == null ? void 0 : propConfig.reflect) {
      reflectAttribute(propConfig, initialValue);
    }
    const [get, set] = createSignal(initialValue);
    Object.defineProperty(element, propName, {
      get,
      set(newVal) {
        set((oldVal) => {
          if (propName !== childrenProp) {
            if (propConfig == null ? void 0 : propConfig.reflect) {
              reflectAttribute(propConfig, newVal);
            }
            firePropChange(propName, newVal, oldVal);
          }
          return newVal;
        });
      },
      enumerable: true,
      configurable: true
    });
  }
}
export {
  buildFinalClass
};
//# sourceMappingURL=buildFinalClass.js.map
