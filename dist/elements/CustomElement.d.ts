import { JSXElement } from "solid-js";
import { CustomElementReactiveProp } from "./CustomElementReactiveProp";
import { CustomElementTemplate } from "./CustomElementTemplate";
export declare abstract class CustomElement extends HTMLElement {
    addDisconnectedCallback(callback: () => void): void;
    /**
     * Returns definition of reactive props.
     */
    protected static readonly reactive: {
        [propName: string]: boolean | CustomElementReactiveProp;
    };
    protected abstract template(args: CustomElementTemplate<this>): JSXElement;
    protected get renderRoot(): this | ShadowRoot;
    protected connectedCallback?(): void;
    protected disconnectedCallback?(): void;
}
