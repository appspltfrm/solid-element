import {CustomElement} from "./customElement";
import {InternalInstance} from "./internals/InternalInstance";
import {ownerProp} from "./internals/ownerProp";

export function getCustomElementOwner(el: CustomElement) {
    return (el as any as InternalInstance)[ownerProp];
}
