import { CustomElement } from "./CustomElement";
export type CustomElementProps<Element extends CustomElement> = Omit<{
    [P in keyof Element]: Element[P];
}, keyof CustomElement | "template" | "renderRoot" | "connectedCallback" | "disconnectedCallback">;
