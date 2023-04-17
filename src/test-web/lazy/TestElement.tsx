import {customElement, defineComponent} from "@appspltfrm/solid-element";

class TestElement extends customElement() {
    template() {
        return <div>I'm lazy</div>
    }
}

export default defineComponent("test-element", TestElement)
