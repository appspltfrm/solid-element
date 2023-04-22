import {AssignableType} from "@co.mmons/js-utils/core";
import type {JSX, ParentProps} from "solid-js";
import {children, Component, createMemo, mergeProps, sharedConfig, splitProps} from "solid-js";
import {getNextElement, spread} from "solid-js/web";
import {CustomElement} from "./customElement";
import {CustomElementInterface} from "./CustomElementInterface";
import {CustomElementJSXAttributes} from "./CustomElementJSXAttributes";
import {CustomElementJSXEvents} from "./CustomElementJSXEvents";
import {CustomElementProps} from "./CustomElementProps";
import {defineCustomElement} from "./defineCustomElement";
import {childrenProp} from "./internals/childrenProp";
import {InternalClass} from "./internals/InternalClass";
import {reactivePropsProp} from "./internals/reactivePropsProp";

type DefineElementFn = () => void;

export type CustomElementComponent<TagName extends string, ElementType extends CustomElement, ComponentProps = CustomElementProps<ElementType>> = Component<ComponentProps & CustomElementJSXAttributes> & {
    tagName: TagName;
    element: ElementType;
    defineCustomElement(): void;
}

export interface CustomElementComponentOptions<Props = any, Events = any> {
    props?: Props,
    events?: Events
}

export type ElementComponent<TagName extends string, ComponentElement extends HTMLElement, Props> = Component<Partial<Props> & JSX.HTMLAttributes<ComponentElement> & CustomElementJSXAttributes> & {tagName: TagName, register: () => void};

export interface ElementComponentOptions {
    define?: DefineElementFn | DefineElementFn[];
    initialProps?: {[key: string]: any};
    propsHandler?: (props: {[key: string]: any}) => void;
}

export function defineComponent<TagName extends string, ElementType extends CustomElement, Props = CustomElementProps<ElementType>, Events extends {[P in keyof Events]: Event} = any>(tagName: TagName, elementType: AssignableType<ElementType>, options?: CustomElementComponentOptions<Props, Events>): CustomElementComponent<TagName, ElementType, Props & CustomElementJSXEvents<ElementType, Events> & Omit<JSX.HTMLAttributes<ElementType>, keyof CustomElementJSXEvents<ElementType, Events>>>;

export function defineComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, elementType: ComponentElement, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;

export function defineComponent<TagName extends string, ComponentElement extends HTMLElement, Props>(tagName: TagName, options?: ElementComponentOptions): ElementComponent<TagName, ComponentElement, Props>;

export function defineComponent(tagName: string, elementTypeOrOptions?: AssignableType | ElementComponentOptions, componentOptions?: ElementComponentOptions | CustomElementComponentOptions): any {

    const solidElementType = typeof elementTypeOrOptions === "function" && elementTypeOrOptions as any;
    const options: Partial<ElementComponentOptions & CustomElementComponentOptions> | undefined = typeof elementTypeOrOptions === "object" ? elementTypeOrOptions as ElementComponentOptions : componentOptions;

    function define() {

        if (customElements.get(tagName)) {
            return;

        } else if (solidElementType) {
            defineCustomElement(tagName, solidElementType);

        } else if (options?.define) {
            for (const d of Array.isArray(options.define) ? options.define : [options.define]) {
                d();
            }
        }
    }

    let cmp: any;

    if (solidElementType) {

        const internalClass: InternalClass = solidElementType as any;

        cmp = (rawProps: ParentProps<any>) => {
            define();

            const rawChildren = children(() => rawProps.children);
            const [, uncheckedProps] = splitProps(rawProps, ["children"]);

            const props = createMemo(() => {
                const clone = {};
                const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
                for (const key of Object.keys(descriptors)) {
                    const fixed = internalClass[reactivePropsProp][key] ? `prop:${key}` : fixPropName(key);
                    Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
                }
                return clone;
            })

            return createMemo(() => {
                const el: any = sharedConfig.context ? getNextElement() : document.createElement(tagName);
                const noShadow = (el as CustomElementInterface).renderRoot === el;
                const childrenPropName = noShadow ? `prop:${childrenProp}` : "children";

                spread(el, mergeProps(props, {[childrenPropName]: rawChildren}), false, false);

                return el;
            })
        }

    } else {

        cmp = ((rawProps: any) => {

            define();

            return createMemo(() => {

                const rawChildren = children(() => rawProps.children);
                const [_, uncheckedProps] = splitProps(rawProps, ["children"]);

                const el = sharedConfig.context ? getNextElement() : document.createElement(tagName);

                const props = createMemo(() => {
                    const clone = {};
                    const descriptors = Object.getOwnPropertyDescriptors(uncheckedProps);
                    for (const key of Object.keys(descriptors)) {
                        const fixed = fixPropName(key);
                        Object.defineProperty(clone, key !== fixed ? fixed : key, descriptors[key]);
                    }

                    options?.propsHandler?.(clone);

                    return clone;
                })

                spread(el, mergeProps(options?.initialProps, props, {children: rawChildren ?? []}), false, false);

                return el;
            })
        })
    }

    cmp["tagName"] = tagName;
    cmp["defineCustomElement"] = define;

    if (solidElementType) {
        cmp["element"] = solidElementType;
    }

    return cmp;
}

const notFixableProps = ["class", "className", "classList", "ref", "style"];

function fixPropName(key: string) {

    if (key.includes(":") || key.startsWith("on") || notFixableProps.includes(key)) {
        return key;
    } else if (key.includes("-")) {
        return `attr:${key}`;
    } else {
        return `prop:${key}`;
    }
}
