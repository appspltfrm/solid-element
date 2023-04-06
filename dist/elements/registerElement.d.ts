import { AssignableType } from "@co.mmons/js-utils/core";
import { CustomElement } from "./CustomElement";
export declare function registerElement<ElementType extends CustomElement>(tagName: string, elementConstructor: AssignableType<ElementType>): void;
