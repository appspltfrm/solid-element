import { AssignableType } from "@appspltfrm/js-utils/core";
import { CustomElementBirthmark } from "./customElementBirthmark";
import { CustomElementInterface } from "./CustomElementInterface";
import { CustomElementOptions } from "./CustomElementOptions";
export type CustomElement = HTMLElement & CustomElementInterface;
export type CustomElementClass<Type extends HTMLElement> = {
    new (): Type & CustomElementInterface;
} & CustomElementBirthmark;
export declare function customElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions): CustomElementClass<Type>;
