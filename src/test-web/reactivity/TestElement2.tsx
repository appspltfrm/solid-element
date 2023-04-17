import {customElement, CustomElementTemplate, defineComponent} from "@appspltfrm/solid-element";
import {JSXElement, onCleanup} from "solid-js";

export default defineComponent("test-reactivity2", class extends customElement({reactive: {errors: true}}) {

    errors: any;

    template({children}: CustomElementTemplate): JSXElement {
        onCleanup(() => console.log("cleanup2"));
        return <>{this.errors ? this.errors.toString() : "no error"}</>;
    }
})
