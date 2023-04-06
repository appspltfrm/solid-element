import { globalStylesProp } from "./globalStylesProp";
import { ReactivePropsMap } from "./ReactivePropsMap";
import { birthmarkProp } from "./birthmarkProp";
import { reactivePropsProp } from "./reactivePropsProp";
import { renderRootProp } from "./renderRootProp";
import { stylesProp } from "./stylesProp";
export interface InternalClass {
    readonly [birthmarkProp]: true;
    readonly [renderRootProp]: "element" | "shadow";
    readonly [stylesProp]: string[];
    readonly [globalStylesProp]: string[];
    readonly [reactivePropsProp]: ReactivePropsMap;
}
