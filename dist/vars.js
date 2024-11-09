var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
const allVars = /* @__PURE__ */ new WeakMap();
class VarValue {
  constructor() {
    __publicField(this, "value");
    __publicField(this, "onDelete");
  }
}
function assertNotExists(vars, name) {
  if (vars && name in vars) {
    throw new Error(`Element var ${String(name)} already exists`);
  }
}
function assertExists(vars, name) {
  if (vars && !(name in vars)) {
    throw new Error(`Element var ${String(name)} not exists`);
  }
}
function getElementVar(element, name) {
  var _a;
  const v = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (v instanceof VarValue) {
    return v.value;
  } else {
    return v;
  }
}
function createElementVar(element, name, value, options) {
  assertNotExists(allVars.get(element), name);
  setElementVar(element, name, value, options);
  return value;
}
function setElementVar(element, name, value, options) {
  let vars = allVars.get(element);
  if (!vars) {
    vars = {};
    allVars.set(element, vars);
    element.addDisconnectedCallback(() => {
      var _a;
      const vars2 = allVars.get(element);
      if (vars2) {
        for (const v of Object.values(vars2)) {
          if (v instanceof VarValue) {
            (_a = v.onDelete) == null ? void 0 : _a.call(v);
          }
        }
      }
      allVars.delete(element);
    });
  }
  let varValue = value;
  if (options == null ? void 0 : options.onDelete) {
    varValue = new VarValue();
    varValue.value = value;
    varValue.onDelete = options.onDelete;
  }
  vars[name] = varValue;
}
function deleteElementVar(element, name) {
  var _a;
  const vars = allVars.get(element);
  if (vars) {
    let v = vars[name];
    if (v instanceof VarValue) {
      (_a = v.onDelete) == null ? void 0 : _a.call(v);
      v = v.value;
    }
    delete vars[name];
    return v;
  }
}
function createElementMemo(element, name, fn, value, options) {
  const vars = allVars.get(element);
  assertNotExists(vars, name);
  const memo = createMemo(fn, value, options);
  setElementVar(element, name, memo);
  return memo;
}
function useElementMemo(element, name) {
  const vars = allVars.get(element);
  assertExists(vars, name);
  let value = vars[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  const memo = value;
  if (typeof memo === "function") {
    return memo;
  }
  return () => {
    throw new Error(`Element var ${String(name)} is not a memo`);
  };
}
function getElementMemo(element, name) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  const memo = value;
  if (typeof memo === "function") {
    return memo();
  }
  throw new Error(`Element var ${String(name)} is not a memo`);
}
function createElementSignal(element, name, value) {
  const vars = allVars.get(element);
  assertNotExists(vars, name);
  const signal = createSignal(value);
  setElementVar(element, name, signal);
  return signal;
}
function useElementSignal(element, name) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  let signal = value;
  if (!signal) {
    signal = createElementSignal(element, name);
  }
  return signal;
}
function getElementSignal(element, name) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  let signal = value;
  if (!signal) {
    signal = createElementSignal(element, name);
  }
  return signal[0]();
}
function setElementSignal(element, name, value) {
  var _a;
  let current = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (current instanceof VarValue) {
    current = current.value;
  }
  let signal = current;
  if (!signal) {
    signal = createElementSignal(element, name);
  }
  signal[1](value);
}
function deleteElementSignal(element, name) {
  deleteElementVar(element, name);
}
function loadElementSignal(element, name, observable, options) {
  const vars = allVars.get(element);
  assertNotExists(vars, name);
  const signal = createSignal();
  const unsub = observable.subscribe({
    next: (data) => signal[1](() => data),
    error: (error) => {
      if (options == null ? void 0 : options.onError) {
        options.onError(error);
      } else {
        throw error;
      }
    }
  });
  setElementVar(element, name, signal, { onDelete: "unsubscribe" in unsub ? unsub.unsubscribe : unsub });
  return signal[0];
}
function deleteElementStore(element, name) {
  deleteElementVar(element, name);
}
function useElementStore(element, name) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  const store = value;
  if (store && Array.isArray(store)) {
    return store;
  } else {
    return [
      void 0,
      (v) => {
        const [, setStore] = createElementStore(element, name);
        return setStore(v);
      }
    ];
  }
}
function setElementStore(element, name, newValue) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  const store = value;
  if (store && Array.isArray(store)) {
    return store[1](newValue);
  } else {
    createElementStore(element, name, newValue);
  }
}
function getElementStore(element, name) {
  var _a;
  let value = (_a = allVars.get(element)) == null ? void 0 : _a[name];
  if (value instanceof VarValue) {
    value = value.value;
  }
  const store = value;
  if (store && Array.isArray(store)) {
    return store[0];
  } else {
    return void 0;
  }
}
function createElementStore(element, name, value) {
  const vars = allVars.get(element);
  assertNotExists(vars, name);
  const store = createStore(value);
  setElementVar(element, name, store);
  return store;
}
function loadElementStore(element, name, value, options) {
  const vars = allVars.get(element);
  assertNotExists(vars, name);
  const store = createStore({});
  const unsub = value.subscribe({
    next: (data) => store[1](data),
    error: (error) => {
      if (options == null ? void 0 : options.onError) {
        options.onError(error);
      } else {
        throw error;
      }
    }
  });
  setElementVar(element, name, store, { onDelete: () => {
    if ("unsubscribe" in unsub) {
      unsub.unsubscribe();
    }
  } });
  return store[0];
}
export {
  createElementMemo,
  createElementSignal,
  createElementStore,
  createElementVar,
  deleteElementSignal,
  deleteElementStore,
  deleteElementVar,
  getElementMemo,
  getElementSignal,
  getElementStore,
  getElementVar,
  loadElementSignal,
  loadElementStore,
  setElementSignal,
  setElementStore,
  setElementVar,
  useElementMemo,
  useElementSignal,
  useElementStore
};
//# sourceMappingURL=vars.js.map
