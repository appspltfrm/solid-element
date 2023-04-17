import {CustomElement} from "./customElement";
import {customElementBirthmark} from "./customElementBirthmark";
import {CustomElementComponent} from "./defineComponent";
import {buildFinalClass} from "./internals/buildFinalClass";
import {InternalClass} from "./internals/InternalClass";

type LazyType = Promise<CustomElementConstructor | {default: CustomElementConstructor} | CustomElementComponent<any, CustomElement> | {default: CustomElementComponent<any, CustomElement>}>;

const elements: {[tagName: string]: () => LazyType} = {};

const observer = new MutationObserver(async (mutations) => {

    // elements that were defined within this call
    let definedElements: string[] = [];

    for (const m of mutations) {
        if (m.addedNodes) {
            for (const n of m.addedNodes) {
                if (n instanceof Element && elements[n.tagName]) {

                    if (!customElements.get(n.tagName)) {

                        let elementClass = await elements[n.tagName]();
                        if (typeof elementClass === "object") {
                            elementClass = elementClass.default;
                        }

                        if (typeof elementClass === "function" && (elementClass as unknown as CustomElementComponent<any, CustomElement>).defineCustomElement) {
                            (elementClass as unknown as CustomElementComponent<any, CustomElement>).defineCustomElement();

                        } else {

                            if ((elementClass as unknown as InternalClass)[customElementBirthmark]) {
                                elementClass = buildFinalClass(elementClass as any);
                            }

                            customElements.define(n.tagName.toLowerCase(), elementClass as any);
                        }

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
    }

    if (Object.keys(elements).length === 0) {
        observer.disconnect();
    }
})

let connected = false;

export function defineLazyCustomElement(tagName: string, loader: () => LazyType): void {

    tagName = tagName.toUpperCase();

    if (customElements.get(tagName) || elements[tagName]) {
        throw new Error(`Custom element ${tagName} already defined`);
    }

    elements[tagName] = loader;

    if (!connected) {
        connected = true;
        observer.observe(document, {subtree: true, childList: true});
    }
}
