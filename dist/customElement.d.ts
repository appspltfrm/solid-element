import { AssignableType } from "@co.mmons/js-utils/core";
import { CustomElementBirthmark } from "./customElementBirthmark";
import { CustomElementInterface } from "./CustomElementInterface";
import { CustomElementOptions } from "./CustomElementOptions";
export type CustomElement<Type extends HTMLElement = HTMLElement> = Type & CustomElementInterface;
export declare function customElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions): {
    new (): CustomElement<Type & CustomElementInterface>;
} & CustomElementBirthmark;
