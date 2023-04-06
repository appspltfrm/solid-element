import { AssignableType } from "@co.mmons/js-utils/core";
import type { JSX, ParentProps } from "solid-js";
import { Component } from "solid-js";
import { CustomElement } from "./CustomElement";
import { CustomElementJSXAttributes } from "./CustomElementJSXAttributes";
import { CustomElementJSXEvents } from "./CustomElementJSXEvents";
import { CustomElementProps } from "./CustomElementProps";
type DefineElementFn = () => void;
export type CustomElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = CustomElementProps<ElementType>> = Component<ComponentProps & CustomElementJSXAttributes> & {
    tagName: TagName;
    register(): void;
};
export type ElementComponent<TagName extends string, Props, ComponentElement extends HTMLElement> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement>> & {
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
export declare function defineElementComponent<TagName extends string, ElementType extends CustomElement, Props = CustomElementProps<ElementType>, Events extends {
    [P in keyof Events]: Event;
} = any>(tagName: TagName, elementType: AssignableType<ElementType>, props?: Props, events?: Events): CustomElementComponent<TagName, ElementType, Props & CustomElementJSXEvents<ElementType, Events> & Omit<JSX.HTMLAttributes<ElementType>, keyof CustomElementJSXEvents<ElementType, Events>>>;
export declare function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: true, options?: ElementComponentOptions): ElementComponent<TagName, Props & ParentProps, ComponentElement>;
export declare function defineElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, childrenAllowed: false, options?: ElementComponentOptions): ElementComponent<TagName, Props, ComponentElement>;
export {};
