import {AssignableType} from "@co.mmons/js-utils/core";
import {CustomElement} from "./customElement";
import {CustomElementBirthmark} from "./customElementBirthmark";
import {globalStylesProp} from "./internals/globalStylesProp";
import {InternalClass} from "./internals/InternalClass";

export function customElementGlobalStyles(elementClass: (AssignableType<CustomElement> & CustomElementBirthmark)) {
    const internal = elementClass as unknown as InternalClass;
    return internal[globalStylesProp]?.slice() ?? [];
}
