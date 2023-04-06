import { Type } from "@co.mmons/js-utils/core";
import { Serializer } from "@co.mmons/js-utils/json";
export interface CustomElementReactivePropConfig {
    attribute?: string;
    type?: Type<String> | Type<Number> | Type<Boolean> | Serializer;
    reflect?: boolean;
}
