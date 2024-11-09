import {serialize, Serializer} from "@appspltfrm/js-utils/json";
import {CustomElementReactivePropConfig} from "../CustomElementReactivePropConfig";

export function toAttributeValue(value: any, propDefinition: CustomElementReactivePropConfig) {

    if (value === null || value === undefined) {
        return value;
    }

    if (propDefinition.type instanceof Serializer) {
        return propDefinition.type.serialize(value);
    } else {
        return serialize(value, propDefinition.type);
    }
}
