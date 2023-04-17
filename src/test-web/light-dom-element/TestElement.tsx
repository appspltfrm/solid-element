import {
    customElement,
    CustomElementJSXIntrinsic,
    CustomElementTemplate,
    defineComponent
} from "@appspltfrm/solid-element";
import {JSXElement} from "solid-js";

export class TestLightElement extends customElement({renderRoot: "element"}) {

    template({children}: CustomElementTemplate): JSXElement {
        return <>{children}</>;
    }
}

export const Test = defineComponent("test-light-element", TestLightElement);

declare global {
    interface HTMLElementTagNameMap {
        "test-light-element": TestLightElement;
    }
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "test-light-element": CustomElementJSXIntrinsic<TestLightElement>
        }
    }
}
