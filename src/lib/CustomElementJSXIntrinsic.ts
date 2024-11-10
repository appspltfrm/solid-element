import type {JSX} from "solid-js";
import {CustomElement} from "./customElement";
import {CustomElementJSXAttributes} from "./CustomElementJSXAttributes";
import {CustomElementJSXEvents} from "./CustomElementJSXEvents";
import {CustomElementProps} from "./CustomElementProps";

type KebabCasePropName<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCasePropName<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;

export type CustomElementJSXIntrinsic<Element extends CustomElement, Props = CustomElementProps<Element>, Events extends {[P in keyof Events]: Event} = any> =
    JSX.HTMLAttributes<Element> & {[P in keyof Props as (P extends string ? KebabCasePropName<P> : never)]: Props[P]} & CustomElementJSXEvents<Element, Events> & CustomElementJSXAttributes;
