import { JSX } from "solid-js/h/jsx-runtime";
export type CustomElementJSXEvents<Element extends HTMLElement, Type extends {
    [P in keyof Type]: Event;
}> = {
    [P in keyof Type as `on${Capitalize<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
} & {
    [P in keyof Type as `on:${Lowercase<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
} & {
    [P in keyof Type as `oncapture:${Lowercase<string & P>}`]?: JSX.EventHandlerUnion<Element, Type[P]>;
};
