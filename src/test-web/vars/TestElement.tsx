import {
    createElementSignal,
    CustomElement,
    CustomElementTemplate,
    defineComponent,
    getElementSignal,
    setElementSignal
} from "@appspltfrm/solidx";
import {JSXElement} from "solid-js";

export default defineComponent("test-vars-element", class extends CustomElement() {

    protected testVars() {
        setElementSignal<number>(this, "test", (prev) => (prev || 0) + 1)
    }

    template({children}: CustomElementTemplate): JSXElement {

        const [test] = createElementSignal(this, "test", undefined);

        return <>
            <button onClick={() => this.testVars()}>test {getElementSignal(this, "test")}</button>
            <slot/>
        </>;
    }
})
