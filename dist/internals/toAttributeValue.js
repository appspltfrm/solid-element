import { Serializer as t, serialize as i } from "@co.mmons/js-utils/json";
function s(e, r) {
  return e == null ? e : r.type instanceof t ? r.type.serialize(e) : i(e, r.type);
}
export {
  s as toAttributeValue
};
//# sourceMappingURL=toAttributeValue.js.map
