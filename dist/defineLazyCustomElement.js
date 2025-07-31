import { customElementBirthmark } from "./customElementBirthmark.js";
import { buildFinalClass } from "./internals/buildFinalClass.js";
const elements = {};
const loading = {};
const observer = "MutationObserver" in globalThis ? new MutationObserver(async (mutations) => {
  let definedElements = [];
  for (const m of mutations) {
    if (m.addedNodes) {
      for (const n of m.addedNodes) {
        if (n instanceof Element && elements[n.tagName]) {
          const tagName = n.tagName;
          if (!definedElements.includes(tagName) && !customElements.get(tagName)) {
            if (!(tagName in loading)) {
              loading[tagName] = new Promise(async (resolve) => {
                try {
                  let elementClass = await elements[n.tagName]();
                  if (typeof elementClass === "object") {
                    elementClass = elementClass.default;
                  }
                  if (typeof elementClass === "function" && elementClass.defineCustomElement) {
                    elementClass.defineCustomElement();
                  } else {
                    if (elementClass[customElementBirthmark]) {
                      elementClass = buildFinalClass(elementClass);
                    }
                    customElements.define(n.tagName.toLowerCase(), elementClass);
                  }
                  resolve();
                } catch (e) {
                  console.error(e);
                  delete loading[tagName];
                }
              });
            }
            await loading[tagName];
            definedElements.push(n.tagName);
          }
          if (definedElements.includes(n.tagName)) {
            customElements.upgrade(n);
          }
        }
      }
    }
  }
  for (const e of definedElements) {
    delete elements[e];
    delete loading[e];
  }
  if (Object.keys(elements).length === 0) {
    observer?.disconnect();
  }
}) : void 0;
let connected = false;
function defineLazyCustomElement(tagName, loader) {
  tagName = tagName.toUpperCase();
  if (customElements.get(tagName) || elements[tagName]) {
    throw new Error(`Custom element ${tagName} already defined`);
  }
  elements[tagName] = loader;
  if (!connected) {
    connected = true;
    observer?.observe(document, { subtree: true, childList: true });
  }
}
export {
  defineLazyCustomElement
};
//# sourceMappingURL=defineLazyCustomElement.js.map
