import { CustomElement } from "./customElement";
import { CustomElementComponent } from "./defineComponent";
type LazyType = Promise<CustomElementConstructor | {
    default: CustomElementConstructor;
} | CustomElementComponent<any, CustomElement> | {
    default: CustomElementComponent<any, CustomElement>;
}>;
export declare function defineLazyCustomElement(tagName: string, loader: () => LazyType): void;
export {};
