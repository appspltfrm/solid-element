import {CustomElementInterface} from "./CustomElementInterface";
import {birthmarkProp} from "./internals/birthmarkProp";

export function isCustomElement(element: HTMLElement): element is HTMLElement & CustomElementInterface {
    return (element as any)[birthmarkProp] === true;
}
