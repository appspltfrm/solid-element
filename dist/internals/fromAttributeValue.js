import { Serializer as e, unserialize as i } from "@co.mmons/js-utils/json";
function f(t, r) {
  if (t == null)
    return t;
  if (r.type instanceof e)
    return r.type.unserialize(t);
  if (typeof t == "string")
    return r.type !== String && t === "" ? void 0 : i(t, r.type, { notStrict: !0 });
}
export {
  f as fromAttributeValue
};
//# sourceMappingURL=fromAttributeValue.js.map
