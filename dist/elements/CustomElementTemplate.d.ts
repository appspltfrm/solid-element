import { JSXElement } from "solid-js";
import { CustomElement } from "./CustomElement";
import { CustomElementProps } from "./CustomElementProps";
export type CustomElementTemplate<PropsOrElement extends (CustomElement | {
    [key: string]: any;
})> = {
    props: (PropsOrElement extends CustomElement ? CustomElementProps<PropsOrElement> : PropsOrElement);
    children?: JSXElement;
};
