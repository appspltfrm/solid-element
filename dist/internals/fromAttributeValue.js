import { Serializer, unserialize } from "@appspltfrm/js-utils/json";
function fromAttributeValue(value, propDefinition) {
  if (value === null || value === void 0) {
    return value;
  }
  if (propDefinition.type instanceof Serializer) {
    return propDefinition.type.unserialize(value);
  } else if (typeof value === "string") {
    if (propDefinition.type !== String && value === "") {
      return void 0;
    }
    return unserialize(value, propDefinition.type, { notStrict: true });
  }
}
export {
  fromAttributeValue
};
//# sourceMappingURL=fromAttributeValue.js.map
