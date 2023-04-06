import {lazy} from "solid-js";
import html from "solid-js/html";
import TestElement from "../elements/TestElement";

const LazyTestElement = lazy(async () => import("../elements/TestElement"));

export default function() {
    return <>

        <fieldset>
            <legend>Template literal solid web component</legend>
            {html`<${TestElement} state="Test" style=${{color: "green"}}/>`}
        </fieldset>

        <fieldset>
            <legend>Template literal lazy solid web component</legend>
            {html`<${LazyTestElement} state="Lazy button"/>`}
        </fieldset>

    </>
}
