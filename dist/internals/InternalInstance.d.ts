import { JSXElement } from "solid-js";
import { CustomElementDisconnectedCallback, CustomElementPropertyValueChangeCallback } from "../CustomElementInterface";
import { CallbackName } from "./CallbackName";
import { callbacksProp } from "./callbacksProp";
import { childrenProp } from "./childrenProp";
import { preValuesProp } from "./preValuesProp";
export interface InternalInstance {
    [childrenProp]?: JSXElement;
    [preValuesProp]?: {
        [propName: string | symbol]: any;
    };
    [callbacksProp]: Array<[
        event: CallbackName.disconnected,
        callback: CustomElementDisconnectedCallback
    ] | [
        event: CallbackName.propertyValueChange,
        callback: CustomElementPropertyValueChangeCallback
    ]>;
}
