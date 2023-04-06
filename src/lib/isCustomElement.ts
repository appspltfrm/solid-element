import {CustomElementInterface} from "./CustomElementInterface";
import {customElementBirthmark} from "./customElementBirthmark";

export function isCustomElement(element: HTMLElement): element is HTMLElement & CustomElementInterface {
    return (element as any)[customElementBirthmark] === true;
}
