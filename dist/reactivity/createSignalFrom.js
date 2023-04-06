import { createSignal as f, getOwner as g, onCleanup as m } from "solid-js";
function x(b, e) {
  const [l, u] = f(e == null ? void 0 : e.value), a = b.subscribe({
    next: (r) => u(() => r),
    error: (r) => {
      var c;
      return (c = e == null ? void 0 : e.onError) == null ? void 0 : c.call(e, r);
    }
  });
  return g() && (e == null ? void 0 : e.autoUnsubscribe) !== !1 && m(() => a.unsubscribe()), [l, u, a];
}
export {
  x as createSignalFrom
};
//# sourceMappingURL=createSignalFrom.js.map
