const elements: {[tagName: string]: () => CustomElementConstructor} = {};

const observer = new MutationObserver((mutations) => {

    // elements that were defined within this call
    let definedElements: string[] = [];

    for (const m of mutations) {
        if (m.addedNodes) {
            for (const n of m.addedNodes) {
                if (n instanceof Element && elements[n.tagName]) {
                    if (!customElements.get(n.tagName)) {
                        customElements.define(n.tagName, elements[n.tagName]());
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

export function defineLazyCustomElement(tagName: string, loader: () => CustomElementConstructor) {

    tagName = tagName.toUpperCase();

    // already defined and loaded
    if (customElements.get(tagName)) {
        return;
    }

    elements[tagName] = loader;

    if (!connected) {
        connected = true;
        observer.observe(document, {subtree: true, childList: true});
    }
}
