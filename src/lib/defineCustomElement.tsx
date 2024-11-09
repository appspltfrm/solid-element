import {AssignableType} from "@appspltfrm/js-utils/core";
import {CustomElement} from "./customElement";
import {CustomElementBirthmark} from "./customElementBirthmark";
import {buildFinalClass} from "./internals/buildFinalClass";

export function defineCustomElement(tagName: string, ElementClass: AssignableType<CustomElement> & CustomElementBirthmark) {
    customElements.define(tagName, buildFinalClass(ElementClass))
}
