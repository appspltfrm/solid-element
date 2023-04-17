import {defineLazyCustomElement} from "@appspltfrm/solid-element";

defineLazyCustomElement("test-element", () => import("./TestElement"))

export default function() {

    return <>
        <button onClick={() => {
            const test = document.createElement("test-element");
            document.body.appendChild(test);
        }}>add test</button>
    </>
}
