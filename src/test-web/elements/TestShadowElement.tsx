import {CustomElement, CustomElementTemplate, defineComponent} from "@appspltfrm/solidx";
import {JSXElement} from "solid-js";

export class TestShadowElement extends CustomElement {

    template({children}: CustomElementTemplate<this>): JSXElement {
        return <slot/>;
    }
}

export const TestShadow = defineComponent("test-shadow", TestShadowElement);
