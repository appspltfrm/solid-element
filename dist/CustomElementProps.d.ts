import { CustomElementInterface } from "./CustomElementInterface";
export type CustomElementProps<Element extends CustomElementInterface> = Omit<{
    [P in keyof Element]: Element[P];
}, keyof CustomElementInterface | "template" | "renderRoot" | "connectedCallback" | "disconnectedCallback">;
