import {CustomElementReactivePropConfig} from "./CustomElementReactivePropConfig";

export interface CustomElementOptions extends Partial<ShadowRootInit> {
    reactive?: {[propName: string]: boolean | CustomElementReactivePropConfig};
    renderRoot?: "shadow" | "element";
    styles?: string | string[];
    globalStyles?: string | string[];
}
