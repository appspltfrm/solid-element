import {classesProp} from "./classesProp";
import {globalStylesProp} from "./globalStylesProp";
import {ReactivePropsMap} from "./ReactivePropsMap";
import {customElementBirthmark} from "../customElementBirthmark";
import {reactivePropsProp} from "./reactivePropsProp";
import {renderRootProp} from "./renderRootProp";
import {stylesProp} from "./stylesProp";

export interface InternalClass {
    readonly [customElementBirthmark]: true;
    readonly [renderRootProp]: "element" | "shadow";
    readonly [stylesProp]: string[];
    readonly [classesProp]: string[];
    readonly [globalStylesProp]: string[];
    readonly [reactivePropsProp]: ReactivePropsMap;
}
