import {defineComponent} from "@appspltfrm/solid-element";
import type {JSX} from "@ionic/core/components";
import {defineCustomElement} from "@ionic/core/components/ion-button";
import {onCleanup, ParentProps} from "solid-js";
import h from "solid-js/h";

const ExtTest = defineComponent<"ion-button", HTMLIonButtonElement, ParentProps<JSX.IonButton>>("ion-button", {define: defineCustomElement});

const OtherComp = () => {
    onCleanup(() => console.log("cleanup"));
    return <div>yehhh</div>;
}

export default function() {

    const h1 = h(ExtTest, ["aaa"]);

    return <>
        <div>{h1}</div>
        <ExtTest>
            <OtherComp/>
        </ExtTest>
    </>
}
