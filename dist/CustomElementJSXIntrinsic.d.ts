import { JSX } from "solid-js/h/jsx-runtime";
import { CustomElementInterface } from "./CustomElementInterface";
import { CustomElementJSXAttributes } from "./CustomElementJSXAttributes";
import { CustomElementJSXEvents } from "./CustomElementJSXEvents";
import { CustomElementProps } from "./CustomElementProps";
type KebabCasePropName<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCasePropName<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;
export type CustomElementJSXIntrinsic<Element extends CustomElementInterface, Props = CustomElementProps<Element>, Events extends {
    [P in keyof Events]: Event;
} = any> = JSX.HTMLAttributes<Element> & {
    [P in keyof Props as (P extends string ? KebabCasePropName<P> : never)]: Props[P];
} & CustomElementJSXEvents<Element, Events> & CustomElementJSXAttributes;
export {};
