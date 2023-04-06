import { AssignableType } from "@co.mmons/js-utils/core";
import { CustomElementInterface } from "./CustomElementInterface";
import { birthmarkProp } from "./internals/birthmarkProp";
export declare function defineCustomElement(tagName: string, ElementClass: AssignableType<HTMLElement & CustomElementInterface> & {
    [birthmarkProp]: true;
}): void;
