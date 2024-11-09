import { AssignableType } from "@appspltfrm/js-utils/core";
import { CustomElementBirthmark } from "./customElementBirthmark";
import { CustomElementInterface } from "./CustomElementInterface";
import { CustomElementOptions } from "./CustomElementOptions";
export type CustomElement = HTMLElement & CustomElementInterface;
export declare function customElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions): {
    new (): Type & CustomElementInterface;
} & CustomElementBirthmark;
