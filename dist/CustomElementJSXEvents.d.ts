import { JSX } from "solid-js/h/jsx-runtime";
import { CustomElement } from "./customElement";
export type CustomElementJSXEvents<Element extends CustomElement, Type extends {
    [P in keyof Type]: Event;
}> = {
    [P in keyof Type as `on${Capitalize<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
} & {
    [P in keyof Type as `on:${Lowercase<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
} & {
    [P in keyof Type as `oncapture:${Lowercase<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
};
