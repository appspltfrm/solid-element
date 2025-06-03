import {A} from "@solidjs/router";
import type {Component} from "solid-js";

const App: Component = () => {

    return <ul>
        <li>
            <A href="/lazy">lazy</A>
        </li>
        <li>
            <A href="/elements/">Elements</A>
        </li>
        <li>
            <A href="/ext-element-component">External elements</A>
        </li>
        <li>
            <A href="/literal-templates">Literal templates</A>
        </li>
        <li>
            <A href="/vars">Vars</A>
        </li>
        <li>
            <A href="/light-dom-element">light dom</A>
        </li>
        <li>
            <A href="/custom-element/">custom element</A>
        </li>
        <li>
            <A href="/reactivity">reactivity</A>
        </li>
    </ul>
};

export default App;
