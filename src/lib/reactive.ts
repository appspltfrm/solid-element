import {CustomElementReactivePropConfig} from "./CustomElementReactivePropConfig";
import {InternalClass} from "./internals/InternalClass";
import {reactivePropsProp} from "./internals/reactivePropsProp";
import {isCustomElement} from "./isCustomElement";

export function reactive(options?: CustomElementReactivePropConfig) {
    return (element: HTMLElement, propName: string, propertyDescriptor?: PropertyDescriptor) => {
        if (isCustomElement(element)) {
            const constructor = element.constructor as unknown as InternalClass;
            const reactive = constructor[reactivePropsProp];
            reactive[propName] = options ?? {};
        }
    }
}
