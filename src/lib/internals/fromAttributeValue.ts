import {Serializer, unserialize} from "@co.mmons/js-utils/json";
import {CustomElementReactivePropConfig} from "../CustomElementReactivePropConfig";

export function fromAttributeValue(value: any, propDefinition: CustomElementReactivePropConfig) {

    if (value === null || value === undefined) {
        return value;
    }

    if (propDefinition.type instanceof Serializer) {
        return propDefinition.type.unserialize(value);

    } else if (typeof value === "string") {

        if (propDefinition.type !== String && value === "") {
            return undefined;
        }

        return unserialize(value, propDefinition.type, {notStrict: true});
    }
}
