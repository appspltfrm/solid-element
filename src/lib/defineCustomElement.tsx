import {AssignableType} from "@co.mmons/js-utils/core";
import {createRoot, createSignal} from "solid-js";
import {insert} from "solid-js/web";
import {CustomElementInterface} from "./CustomElementInterface";
import {CustomElementReactivePropConfig} from "./CustomElementReactivePropConfig";
import {birthmarkProp} from "./internals/birthmarkProp";
import {CallbackName} from "./internals/CallbackName";
import {callbacksProp} from "./internals/callbacksProp";
import {childrenProp} from "./internals/childrenProp";
import {fromAttributeValue} from "./internals/fromAttributeValue";
import {InternalClass} from "./internals/InternalClass";
import {InternalInstance} from "./internals/InternalInstance";
import {preValuesProp} from "./internals/preValuesProp";
import {reactivePropsProp} from "./internals/reactivePropsProp";
import {renderRootProp} from "./internals/renderRootProp";
import {stylesProp} from "./internals/stylesProp";
import {toAttributeName} from "./internals/toAttributeName";
import {toAttributeValue} from "./internals/toAttributeValue";

export function defineCustomElement(tagName: string, ElementClass: AssignableType<HTMLElement & CustomElementInterface> & {[birthmarkProp]: true}) {

    const internalClass = ElementClass as unknown as InternalClass;

    const finalClass = class CustomElementFinal extends ElementClass {

        static get observedAttributes() {
            const props = internalClass[reactivePropsProp];
            return Object.values(props).map(p => p.attribute);
        }

        constructor() {
            super();
        }

        #initialized = false;

        connectedCallback() {

            const internalThis = this as unknown as HTMLElement & InternalInstance & CustomElementInterface;

            if (this.#initialized) {
                return;
            }

            this.#initialized = true;

            initReactiveProps(internalThis, internalClass);
            internalThis[preValuesProp] = undefined;

            super.connectedCallback!();

            createRoot((dispose: Function) => {

                this.addDisconnectedCallback(() => {
                    this.renderRoot.textContent = "";
                    dispose();
                })

                let template = super.template!({children: internalThis[childrenProp]});
                if (template && internalClass[stylesProp] && this.renderRoot === this) {
                    const styles = Array.isArray(internalClass[stylesProp]) ? internalClass[stylesProp].join("\n") : internalClass[stylesProp];
                    template = <><style innerHTML={styles}/>{template}</>
                }

                return insert(this.renderRoot, template);
            }, lookupContext(this));
        }

        async disconnectedCallback() {

            // prevent premature releasing when element is only temporarily removed from DOM
            await Promise.resolve();

            if (this.isConnected) {
                return;
            }

            const callbacks = (this as unknown as InternalInstance)[callbacksProp]!;

            let callback = callbacks.pop();
            while (callback) {

                if (callback[0] === CallbackName.disconnected) {
                    callback[1](this);
                }

                callback = callbacks.pop();
            }

            super.disconnectedCallback!();

            this.#initialized = false;
        }

        attributeChangedCallback(name: string, oldVal: string, newVal: string) {

            if (!this.#initialized) {
                return;
            }

            const prop = lookupAttributeProp(name, internalClass)!;

            if (newVal == null && !(this as any)[prop[0]]) {
                return;
            }

            (this as any)[prop[0]] = fromAttributeValue(newVal, prop[1]);
        }
    }

    const reactiveProps = (ElementClass as unknown as InternalClass)[reactivePropsProp];
    for (let [propName, propDefinition] of Object.entries(reactiveProps)) {
        if (!propDefinition.attribute) {
            propDefinition.attribute = toAttributeName(propName);
        }
    }

    if (internalClass[renderRootProp] === "element" && internalClass[stylesProp]) {
        for (const css of !Array.isArray(internalClass[stylesProp]) ? [internalClass[stylesProp]] : internalClass[stylesProp]) {
            if (css) {
                const head = document.head ?? document.querySelector("head");
                const style = document.createElement("style")
                style.appendChild(document.createTextNode(css));
                head.appendChild(style);
            }
        }
    }

    customElements.define(tagName, finalClass)
}

function lookupContext(el: HTMLElement) {

    type OwnerHost = {_$owner?: any}

    if (el.assignedSlot && (el.assignedSlot as OwnerHost)._$owner) {
        return (el.assignedSlot as OwnerHost)._$owner;
    }

    let next = el.parentNode;
    while (next && !(next as OwnerHost)._$owner && !((next as Element).assignedSlot && ((next as Element).assignedSlot as OwnerHost)._$owner)) {
        next = next.parentNode;
    }

    return next && (next as Element).assignedSlot ? ((next as Element).assignedSlot as OwnerHost)._$owner : (el as OwnerHost)._$owner;
}

function lookupAttributeProp(attributeName: string, elementClass: InternalClass): [propName: string, propDefinition: CustomElementReactivePropConfig] | undefined {
    const props = elementClass[reactivePropsProp];
    return Object.entries(props).find(([propName, prop]) => propName === attributeName || (prop as CustomElementReactivePropConfig).attribute === attributeName);
}

function initReactiveProps(element: HTMLElement & CustomElementInterface & InternalInstance, elementClass: InternalClass) {

    const reactiveProps = elementClass[reactivePropsProp];
    const names = [childrenProp, ...Object.keys(reactiveProps ?? {})];
    const preValues = element[preValuesProp];

    function firePropChange(propName: string, newVal: any, oldVal: any) {

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

    function reflectAttribute(prop: CustomElementReactivePropConfig, value: any) {

        const attr = prop.attribute!;
        value = toAttributeValue(value, prop);

        if (value === undefined || value === null || value === false) {
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

        let initialValue = undefined;
        if (preValues && propName in preValues) {
            initialValue = preValues[propName];
        } else {
            initialValue = (element as any)[propName];
        }

        if (propConfig?.reflect) {
            reflectAttribute(propConfig, initialValue);
        }

        const [get, set] = createSignal(initialValue);

        Object.defineProperty(element, propName, {
            get,
            set(newVal: any) {
                set((oldVal: any) => {

                    if (propName !== childrenProp) {

                        if (propConfig?.reflect) {
                            reflectAttribute(propConfig, newVal);
                        }

                        firePropChange(propName, newVal, oldVal);
                    }

                    return newVal;
                })
            },
            enumerable: true,
            configurable: true
        })
    }


}
