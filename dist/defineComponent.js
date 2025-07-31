import { children, splitProps, createMemo, sharedConfig, getOwner, mergeProps } from "solid-js";
import { getNextElement, spread } from "solid-js/web";
import { defineCustomElement } from "./defineCustomElement.js";
import { childrenProp } from "./internals/childrenProp.js";
import { parentOwnerProp } from "./internals/parentOwnerProp.js";
import { reactivePropsProp } from "./internals/reactivePropsProp.js";
function defineComponent(tagName, elementTypeOrOptions, componentOptions) {
  const solidElementType = typeof elementTypeOrOptions === "function" && elementTypeOrOptions;
  const options = typeof elementTypeOrOptions === "object" ? elementTypeOrOptions : componentOptions;
  function define() {
    if (customElements.get(tagName)) {
      return;
    } else if (solidElementType) {
      defineCustomElement(tagName, solidElementType);
    } else if (options?.define) {
      for (const d of Array.isArray(options.define) ? options.define : [options.define]) {
        d();
      }
    }
  }
  let cmp;
  if (solidElementType) {
    const internalClass = solidElementType;
    cmp = (rawProps) => {
      define();
      const rawChildren = children(() => rawProps.children);
      const [, uncheckedProps] = splitProps(rawProps, ["children"]);
      const props = createMemo(() => {
        const clone = {};
        const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
        for (const key of Object.keys(descriptors)) {
          const fixed = internalClass[reactivePropsProp][key] ? `prop:${key}` : fixPropName(key);
          Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
        }
        return clone;
      });
      return createMemo(() => {
        const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);
        const noShadow = el.renderRoot === el;
        const childrenPropName = noShadow ? `prop:${childrenProp}` : "children";
        el[parentOwnerProp] = getOwner();
        spread(el, mergeProps(props, {
          [childrenPropName]: rawChildren
        }), false, false);
        return el;
      });
    };
  } else {
    cmp = (rawProps) => {
      define();
      return createMemo(() => {
        const rawChildren = children(() => rawProps.children);
        const [_, uncheckedProps] = splitProps(rawProps, ["children"]);
        const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);
        const props = createMemo(() => {
          const clone = {};
          const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
          for (const key of Object.keys(descriptors)) {
            const fixed = fixPropName(key);
            Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
          }
          options?.propsHandler?.(clone);
          return clone;
        });
        spread(el, mergeProps(options?.initialProps, props, {
          children: rawChildren ?? []
        }), false, false);
        return el;
      });
    };
  }
  cmp["tagName"] = tagName;
  cmp["defineCustomElement"] = define;
  if (solidElementType) {
    cmp["element"] = solidElementType;
  }
  return cmp;
}
const notFixableProps = ["class", "className", "classList", "ref", "style"];
function fixPropName(key) {
  if (key.includes(":") || key.startsWith("on") || notFixableProps.includes(key)) {
    return key;
  } else if (key.includes("-")) {
    return `attr:${key}`;
  } else {
    return `prop:${key}`;
  }
}
export {
  defineComponent
};
//# sourceMappingURL=defineComponent.js.map
