import { AssignableType } from "@appspltfrm/js-utils/core";
import { CustomElement } from "./customElement";
import { CustomElementBirthmark } from "./customElementBirthmark";
export declare function defineCustomElement(tagName: string, ElementClass: AssignableType<CustomElement> & CustomElementBirthmark): void;
