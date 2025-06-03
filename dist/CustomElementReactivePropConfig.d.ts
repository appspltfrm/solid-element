import { Type } from "@appspltfrm/js-utils/core";
import { Serializer } from "@appspltfrm/js-utils/json";
export interface CustomElementReactivePropConfig {
    attribute?: string;
    type?: Type<String> | Type<Number> | Type<Boolean> | Serializer;
    reflect?: boolean;
}
