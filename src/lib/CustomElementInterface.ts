import {JSXElement} from "solid-js";
import {birthmarkProp} from "./internals/birthmarkProp";

export interface CustomElementInterface extends HTMLElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    template?(args: CustomElementTemplate): JSXElement;
    get renderRoot(): this | ShadowRoot;
    readonly [birthmarkProp]: true;

    addDisconnectedCallback(callback: CustomElementDisconnectedCallback): VoidFunction;
    addPropertyValueChangeCallback(callback: CustomElementPropertyValueChangeCallback): VoidFunction;
}

export interface CustomElementTemplate {
    children: JSXElement;
}

export type CustomElementDisconnectedCallback = (element: HTMLElement) => void | any;
export type CustomElementPropertyValueChangeCallback = (element: HTMLElement, propName: string, newVal: any, oldVal: any) => void | any;
