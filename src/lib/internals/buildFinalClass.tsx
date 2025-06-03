import {AssignableType} from "@appspltfrm/js-utils/core";
import {createRoot, createSignal, getOwner} from "solid-js";
import {insert} from "solid-js/web";
import {CustomElement} from "../customElement";
import {CustomElementBirthmark} from "../customElementBirthmark";
import {CustomElementInterface} from "../CustomElementInterface";
import {CustomElementReactivePropConfig} from "../CustomElementReactivePropConfig";
import {CallbackName} from "./CallbackName";
import {callbacksProp} from "./callbacksProp";
import {childrenProp} from "./childrenProp";
import {classesProp} from "./classesProp";
import {fromAttributeValue} from "./fromAttributeValue";
import {globalStylesProp} from "./globalStylesProp";
import {InternalClass} from "./InternalClass";
import {InternalInstance} from "./InternalInstance";
import {ownerProp} from "./ownerProp";
import {parentOwnerProp} from "./parentOwnerProp";
import {preValuesProp} from "./preValuesProp";
import {reactivePropsProp} from "./reactivePropsProp";
import {stylesProp} from "./stylesProp";
import {toAttributeName} from "./toAttributeName";
import {toAttributeValue} from "./toAttributeValue";

export function buildFinalClass(ElementClass: AssignableType<CustomElement> & CustomElementBirthmark): typeof ElementClass {

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

            if (internalClass[classesProp]) {
                for (const c of internalClass[classesProp]) {
                    this.classList.add(c);
                }
            }

            super.connectedCallback!();

            createRoot((dispose: Function) => {

                this.addDisconnectedCallback(() => {
                    this.renderRoot.textContent = "";
                    dispose();
                    delete internalThis[ownerProp];
                    delete internalThis[parentOwnerProp];
                })

                let template = super.template!({children: internalThis[childrenProp]});
                if (template && internalClass[stylesProp] && this.renderRoot !== this) {
                    template = <><style innerHTML={internalClass[stylesProp].join("\n")}/>{template}</>
                }

                internalThis[ownerProp] = getOwner()!;
                internalThis[ownerProp]!.name = this.tagName;

                return insert(this.renderRoot, template);
            }, lookupContext(this) || internalThis[parentOwnerProp]);
        }

        async disconnectedCallback() {

            // prevent premature releasing when element is only temporarily removed from DOM
            await Promise.resolve();

            if (this.isConnected) {
                return;
            }

            const callbacks = (this as unknown as InternalInstance)[callbacksProp];

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

    if (internalClass[globalStylesProp]) {
        for (const css of internalClass[globalStylesProp]) {
            if (css) {
                const head = document.head ?? document.querySelector("head");
                const style = document.createElement("style")
                style.appendChild(document.createTextNode(css));
                head.appendChild(style);
            }
        }
    }

    return finalClass;
}

function lookupContext(el: HTMLElement) {

    if (el.assignedSlot && (el.assignedSlot as any as InternalInstance)[ownerProp]) {
        return (el.assignedSlot as any as InternalInstance)[ownerProp];
    }

    let next = el.parentNode;
    while (next && !(next as any as InternalInstance)[ownerProp] && !((next as Element).assignedSlot && ((next as Element).assignedSlot as any as InternalInstance)[ownerProp])) {
        next = next.parentNode;
    }

    return next && (next as Element).assignedSlot ? ((next as Element).assignedSlot as any as InternalInstance)[ownerProp] : (el as any as InternalInstance)[ownerProp];
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
