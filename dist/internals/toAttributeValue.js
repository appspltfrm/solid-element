import { Serializer, serialize } from "@appspltfrm/js-utils/json";
function toAttributeValue(value, propDefinition) {
  if (value === null || value === void 0) {
    return value;
  }
  if (propDefinition.type instanceof Serializer) {
    return propDefinition.type.serialize(value);
  } else {
    return serialize(value, propDefinition.type);
  }
}
export {
  toAttributeValue
};
//# sourceMappingURL=toAttributeValue.js.map
