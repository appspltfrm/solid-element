import { HtmlString as t } from "@co.mmons/js-utils/core";
function e(r) {
  return r instanceof t ? { innerHTML: r.toString() } : { innerText: r };
}
export {
  e as innerProp
};
//# sourceMappingURL=innerProp.js.map
