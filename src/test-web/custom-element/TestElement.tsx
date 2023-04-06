import {CustomElement, CustomElementTemplate, reactive} from "@appspltfrm/solidx";

export class TestElement extends CustomElement({reactive: {otherProp: true}}) {

    @reactive({type: Number})
    someProp?: number;

    otherProp?: number = 123;

    template({children}: CustomElementTemplate) {
        return <div>
            <div>{this.someProp}+{this.otherProp}</div>
            <div>children:</div>
            {children}
        </div>
    }
}
