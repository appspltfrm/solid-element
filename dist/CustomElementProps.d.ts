import { CustomElement } from "./customElement";
import { CustomElementInterface } from "./CustomElementInterface";
export type CustomElementProps<Element extends CustomElement> = Omit<{
    [P in keyof Element]: Element[P];
}, keyof CustomElementInterface | keyof HTMLElement>;
