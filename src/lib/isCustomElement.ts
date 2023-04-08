import {CustomElement} from "./customElement";
import {customElementBirthmark} from "./customElementBirthmark";

export function isCustomElement(element: HTMLElement): element is CustomElement {
    return (element as any)[customElementBirthmark] === true;
}
