import {createSignal, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import Test from "./TestElement";
import TestNoDecorator from "./TestElementNoDecorator";
import {TestShadow} from "./TestShadowElement";

export default function() {

    const [state, setState] = createSignal("a")
    const [items, setItems] = createSignal(["a", "b", "c"]);
    const [test, setTest] = createSignal(false);
    const [props, setProps] = createSignal({state: "test"});

    setTimeout(() => setProps({state: "olalal", readonly: true}), 1000);

    return <>

        <Test readonly={true} state={false}/>

        <Show when={false}>
            <Test state={state()} class="aaa" classList={{test: true}} tabIndex="-1" items={items()} readonly={true}>
                <span>jakiś test solid</span>
            </Test>

            <button onClick={(ev) => setItems(["1", "2", "3"])}>change items</button>
            <button onClick={(ev) => setState("b")}>change state</button>

            <fieldset>
                <legend>Test custom element</legend>
                <test-element readonly={true} state="test" attr:argh="true" camel-case-prop="sdsd"/>
            </fieldset>

            <fieldset>
                <legend>Test element component</legend>
                <Test state={state()} items={items()} tabindex="-1" readonly={true} onStateChange={(ev) => console.log(ev)} on:statechange={(ev) => console.log("args", ev)}>
                    <span>jakiś test</span>
                </Test>
            </fieldset>

            <fieldset>
                <legend>Test element no decorator</legend>
                <TestNoDecorator test="false"/>

                <Dynamic component={TestNoDecorator} test="false" test-some-id="yes"/>
            </fieldset>

            <fieldset>
                <legend>Test shadow</legend>
                <TestShadow>ulalla</TestShadow>
            </fieldset>
        </Show>

    </>
}
