import type {JSX} from "solid-js";
import {CustomElement} from "./customElement";


// aaaa...
export type CustomElementJSXEvents<Element extends CustomElement, Type extends {[P in keyof Type]: Event}> = {
    [P in keyof Type as `on${Capitalize<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>
} & {
    [P in keyof Type as `on${Lowercase<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>
} & {
    [P in keyof Type as `on:${string & P}`]?: JSX.EventHandlerWithOptions<Element, Type[P], JSX.EventHandler<Element, Type[P]>>
} & {
    [P in keyof Type as `on:${Lowercase<string & P>}`]?: JSX.EventHandlerWithOptions<Element, Type[P], JSX.EventHandler<Element, Type[P]>>
} & {
    [P in keyof Type as `oncapture:${string & P}`]?: JSX.EventHandlerWithOptions<Element, Type[P]>
} & {
    [P in keyof Type as `oncapture:${Lowercase<string & P>}`]?: JSX.EventHandlerWithOptions<Element, Type[P]>
}
