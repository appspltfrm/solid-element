import {
    customElement,
    CustomElementJSXIntrinsic,
    CustomElementTemplate,
    defineComponent,
    reactive
} from "@appspltfrm/solidx";
import {createEffect, onCleanup} from "solid-js";
import styles from "./TestElement.scss?inline";

export interface TestElementProps {

    /**
     * state
     */
    state: any;
    items?: string[];
    camelCaseProp?: string;

    /**
     * jakiś komentarz
     */
    stateProvider?: () => string;

    readonly?: boolean;
}

export class TestElement extends customElement({renderRoot: "element", styles}) implements TestElementProps {

    @reactive()
    state!: any;

    @reactive()
    items?: string[];

    @reactive()
    camelCaseProp?: string;

    @reactive()
    readonly?: boolean;

    @reactive()
    stateProvider?: () => string;

    private test?: string;

    template({children}: CustomElementTemplate) {

        onCleanup(() => console.log("cleanup"))

        createEffect(() => console.log("shit:" + this.state))

        return <>
            <div class="extra">state: {this.state}</div>
            <div>readonly: {typeof this.readonly}</div>
            <span class="extra">{this.state} {this.camelCaseProp}</span>
            {children}

            <div>{this.items?.join(", ")}</div>
        </>
    }

    addEventListener<K extends keyof TestElementEventMap>(type: K, listener: (this: TestElement, ev: TestElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        return super.addEventListener(type, listener, options);
    }

    removeEventListener<K extends keyof TestElementEventMap>(type: K, listener: (this: TestElement, ev: TestElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        return super.removeEventListener(type, listener, options);
    }
}

interface TestElementEventMap extends HTMLElementEventMap {
    stateChange: CustomEvent<any>;
}

export const Test = defineComponent<"test-element", TestElement, TestElementProps, TestElementEventMap>("test-element", TestElement);

export default Test;

declare global {
    interface HTMLElementTagNameMap {
        "test-element": TestElement
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "test-element": CustomElementJSXIntrinsic<TestElement, TestElementProps, TestElementEventMap>
        }
    }
}
