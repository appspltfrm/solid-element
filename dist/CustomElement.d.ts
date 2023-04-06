import { AssignableType } from "@co.mmons/js-utils/core";
import { CustomElementInterface } from "./CustomElementInterface";
import { CustomElementOptions } from "./CustomElementOptions";
export declare function CustomElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions): {
    new (): (Type & CustomElementInterface);
};
