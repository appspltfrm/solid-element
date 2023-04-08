import {customElement, CustomElementTemplate, defineComponent} from "@appspltfrm/solidx";
import {JSXElement} from "solid-js";

export class TestShadowElement extends customElement() {

    template({children}: CustomElementTemplate): JSXElement {
        return <slot/>;
    }
}

export const TestShadow = defineComponent("test-shadow", TestShadowElement);
