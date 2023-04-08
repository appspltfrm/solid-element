import { JSXElement } from "solid-js";
import { CustomElementBirthmark } from "./customElementBirthmark";
export interface CustomElementInterface extends CustomElementBirthmark {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    template?(args: CustomElementTemplate): JSXElement;
    get renderRoot(): this | ShadowRoot;
    addDisconnectedCallback(callback: CustomElementDisconnectedCallback): VoidFunction;
    addPropertyValueChangeCallback(callback: CustomElementPropertyValueChangeCallback): VoidFunction;
}
export interface CustomElementTemplate {
    children: JSXElement;
}
export type CustomElementDisconnectedCallback = (element: HTMLElement) => void | any;
export type CustomElementPropertyValueChangeCallback = (element: HTMLElement, propName: string, newVal: any, oldVal: any) => void | any;
