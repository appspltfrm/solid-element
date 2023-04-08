import {defineComponent, CustomElementTemplate, customElement} from "@appspltfrm/solidx";
import {createSignal} from "solid-js";
import Test2 from "./TestElement2";

export default defineComponent("test-reactivity1", class extends customElement() {

    template({children}: CustomElementTemplate) {

        const [error, setError] = createSignal<any>("yes");

        return <div>
            <button onClick={() => setError(new Error())}>trigger error</button>
            <Test2 errors={error()}/>
        </div>
    }
})
