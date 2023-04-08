import { AssignableType } from "@co.mmons/js-utils/core";
import { CustomElementInterface } from "./CustomElementInterface";
import { customElementBirthmark } from "./customElementBirthmark";
export declare function defineCustomElement(tagName: string, ElementClass: AssignableType<HTMLElement & CustomElementInterface> & {
    [customElementBirthmark]: true;
}): void;
