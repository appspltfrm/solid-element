export * from "./vars";
export type { CustomElementComponent, ElementComponent, ElementComponentOptions } from "./defineElementComponent";
export type { CustomElementJSXIntrinsic } from "./CustomElementJSXIntrinsic";
export type { CustomElementReactiveProp } from "./CustomElementReactiveProp";
export type { CustomElementTemplate } from "./CustomElementTemplate";
export type { CustomElementEventMap } from "./CustomElementEventMap";
export { CustomElement } from "./CustomElement";
export { customElement } from "./decorators/customElement";
export { defineElementComponent } from "./defineElementComponent";
export { reactive } from "./decorators/reactive";
export { renderRoot } from "./decorators/renderRoot";
declare module "solid-js" {
    namespace JSX {
        interface ExplicitAttributes {
            [key: string]: string;
        }
    }
}
