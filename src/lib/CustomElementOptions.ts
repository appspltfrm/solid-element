import {CustomElementReactivePropConfig} from "./CustomElementReactivePropConfig";

export interface CustomElementOptions extends Partial<ShadowRootInit> {
    reactive?: {[propName: string]: boolean | CustomElementReactivePropConfig};
    renderRoot?: "shadow" | "element";
    classes?: string[],
    styles?: string | string[];
    globalStyles?: string | string[];
}
