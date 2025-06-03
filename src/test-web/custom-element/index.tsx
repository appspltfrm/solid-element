import {defineCustomElement} from "@appspltfrm/solid-element";
import {createEffect, createSignal} from "solid-js";
import {TestElement} from "./TestElement";

defineCustomElement("test-element", TestElement);

export default function Index() {

    const [el, setEl] = createSignal<HTMLElement>();

    const [propValue, setPropValue] = createSignal<string>("123")
    setInterval(() => setPropValue(Date.now() + ""), 1000);

    createEffect(() => {
        if (el()) {
            el()!.setAttribute("some-prop", propValue())
        }
    })

    return <>
        <test-element ref={setEl} state={false}/>
    </>
}
