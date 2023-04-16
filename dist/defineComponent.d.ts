import { AssignableType } from "@co.mmons/js-utils/core";
import type { JSX } from "solid-js";
import { Component } from "solid-js";
import { CustomElement } from "./customElement";
import { CustomElementJSXAttributes } from "./CustomElementJSXAttributes";
import { CustomElementJSXEvents } from "./CustomElementJSXEvents";
import { CustomElementProps } from "./CustomElementProps";
type DefineElementFn = () => void;
export type CustomElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = CustomElementProps<ElementType>> = Component<ComponentProps & CustomElementJSXAttributes> & {
    tagName: TagName;
    element: ElementType;
    defineCustomElement(): void;
};
export interface CustomElementComponentOptions<Props = any, Events = any> {
    props?: Props;
    events?: Events;
}
export type ElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {
    tagName: TagName;
    register: () => void;
};
export interface ElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {
        [key: string]: any;
    };
    propsHandler?: (props: {
        [key: string]: any;
    }) => void;
}
export declare function defineComponent<TagName extends string, ElementType extends CustomElement, Props = CustomElementProps<ElementType>, Events extends {
    [P in keyof Events]: Event;
} = any>(tagName: TagName, elementType: AssignableType<ElementType>, options?: CustomElementComponentOptions<Props, Events>): CustomElementComponent<TagName, ElementType, Props & CustomElementJSXEvents<ElementType, Events> & Omit<JSX.HTMLAttributes<ElementType>, keyof CustomElementJSXEvents<ElementType, Events>>>;
export declare function defineComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, elementType: ComponentElement, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;
export declare function defineComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;
export {};
