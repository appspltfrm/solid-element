import {createMemo, createSignal, Signal} from "solid-js";
import {createStore, Store} from "solid-js/store";
import {Accessor, EffectFunction, MemoOptions, NoInfer} from "solid-js/types/reactive/signal";
import {Observer, Unsubscribable} from "type-fest";
import {CustomElement} from "./CustomElement";

type Vars = {[key: string | symbol]: any};
type VarName = string | symbol;

export interface ObservableLike<ValueType = unknown> {
    subscribe(observer?: Partial<Observer<ValueType>>): Unsubscribable;
}

const allVars = new WeakMap<CustomElement, Vars>()

class VarValue {
    value: any;
    onDelete?: () => void;
}

function assertNotExists(vars: Vars | undefined, name: VarName) {
    if (vars && name in vars) {
        throw new Error(`Element var ${String(name)} already exists`);
    }
}

function assertExists(vars: Vars | undefined, name: VarName) {
    if (vars && !(name in vars)) {
        throw new Error(`Element var ${String(name)} not exists`);
    }
}

export function getElementVar<T>(element: CustomElement, name: VarName): T | undefined {
    const v = allVars.get(element)?.[name];
    if (v instanceof VarValue) {
        return v.value;
    } else {
        return v;
    }
}

export function setElementVar(element: CustomElement, name: VarName, value: any, options?: {onDelete?: (() => any | void)}) {

    let vars = allVars.get(element);
    if (!vars) {
        vars = {};
        allVars.set(element, vars);

        element.addDisconnectedCallback(() => {

            const vars = allVars.get(element);
            if (vars) {
                for (const v of Object.values(vars)) {
                    if (v instanceof VarValue) {
                        v.onDelete?.();
                    }
                }
            }

            allVars.delete(element)
        });
    }

    let varValue = value;
    if (options?.onDelete) {
        varValue = new VarValue();
        varValue.value = value;
        varValue.onDelete = options.onDelete;
    }

    vars[name] = varValue;
}

export function deleteElementVar<T>(element: CustomElement, name: VarName): T | undefined {
    const vars = allVars.get(element);
    if (vars) {

        let v = vars[name];
        if (v instanceof VarValue) {
            v.onDelete?.();
            v = v.value;
        }

        delete vars[name];
        return v;
    }
}

export function createElementMemo<Next extends Prev, Prev = Next>(element: CustomElement, name: VarName, fn: EffectFunction<undefined | NoInfer<Prev>, Next>): Accessor<Next>;
export function createElementMemo<Next extends Prev, Init = Next, Prev = Next>(element: CustomElement, name: VarName, fn: EffectFunction<Init | Prev, Next>, value: Init, options?: MemoOptions<Next>): Accessor<Next>;

export function createElementMemo<Next extends Prev, Init = Next, Prev = Next>(element: CustomElement, name: VarName, fn?: any, value?: Init, options?: MemoOptions<Next>): Accessor<Next> {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const memo = createMemo<Next, Init, Prev>(fn, value!, options);

    setElementVar(element, name, memo);

    return memo;
}

export function useElementMemo<T = any>(element: CustomElement, name: VarName): Accessor<T> {

    const vars = allVars.get(element);
    assertExists(vars, name)

    let value = vars![name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const memo = value as Accessor<T>;
    if (typeof memo === "function") {
        return memo;
    }

    return () => {
        throw new Error(`Element var ${String(name)} is not a memo`);
    }
}

export function getElementMemo<T = any>(element: CustomElement, name: VarName): T {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const memo = value as Accessor<T>;
    if (typeof memo === "function") {
        return memo();
    }

    throw new Error(`Element var ${String(name)} is not a memo`);
}

export function createElementSignal<T = any>(element: CustomElement, name: VarName, value?: T) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const signal = createSignal(value);

    setElementVar(element, name, signal);

    return signal;
}

export function useElementSignal<T = any>(element: CustomElement, name: VarName): Signal<T | undefined> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    let signal = value as Signal<T | undefined>;
    if (!signal) {
        signal = createElementSignal<T>(element, name);
    }

    return signal;
}

export function getElementSignal<T = any>(element: CustomElement, name: VarName): T | undefined {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    let signal = value as Signal<T | undefined>;
    if (!signal) {
        signal = createElementSignal(element, name);
    }

    return signal[0]();
}

export function setElementSignal<T = any>(element: CustomElement, name: VarName, value: (prev: T | undefined) => T) {

    let current = allVars.get(element)?.[name];
    if (current instanceof VarValue) {
        current = current.value;
    }

    let signal = current as Signal<T | undefined>;
    if (!signal) {
        signal = createElementSignal(element, name);
    }

    signal[1](value);
}

export function deleteElementSignal(element: CustomElement, name: VarName) {
    deleteElementVar(element, name);
}

export function loadElementSignal<T = any>(element: CustomElement, name: VarName, observable: ObservableLike<T>, options?: {onError?: (error: any) => void}) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const signal = createSignal<T>();

    const unsub = observable.subscribe({
        next: (data) => signal[1](() => data),
        error: (error) => {
            if (options?.onError) {
                options.onError(error);
            } else {
                throw error;
            }
        }
    })

    setElementVar(element, name, signal, {onDelete: ("unsubscribe" in unsub ? unsub.unsubscribe : unsub)});

    return signal[0];
}

export function deleteElementStore(element: CustomElement, name: VarName) {
    deleteElementVar(element, name);
}

export function useElementStore<S extends {[key: string]: any}>(element: CustomElement, name: VarName): ReturnType<typeof createStore<S>> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store;
    } else {
        return [
            undefined as unknown as S,
            (v: any) => {
                const [, setStore] = createElementStore(element, name);
                return setStore(v);
            }
        ] as ReturnType<typeof createStore<S>>;
    }
}

export function setElementStore<S extends {[key: string]: any}>(element: CustomElement, name: VarName, newValue: S){

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store[1](newValue);
    } else {
        createElementStore(element, name, newValue);
    }
}

export function getElementStore<S extends {[key: string]: any}>(element: CustomElement, name: VarName): Store<S> {

    let value = allVars.get(element)?.[name];
    if (value instanceof VarValue) {
        value = value.value;
    }

    const store = value as ReturnType<typeof createStore<S>>;
    if (store && Array.isArray(store)) {
        return store[0];
    } else {
        return undefined as unknown as Store<S>;
    }
}

export function createElementStore<S extends {[key: string]: any}>(element: CustomElement, name: VarName, value?: S) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore(value);

    setElementVar(element, name, store);

    return store;
}

export function loadElementStore<S extends {[key: string]: any}>(element: CustomElement, name: VarName, value: ObservableLike<S>, options?: {onError?: (error: any) => void}) {

    const vars = allVars.get(element);
    assertNotExists(vars, name);

    const store = createStore<S>({} as any);

    const unsub = value.subscribe({
        next: (data) => store[1](data),
        error: (error) => {
            if (options?.onError) {
                options.onError(error);
            } else {
                throw error;
            }
        }
    })

    setElementVar(element, name, store, {onDelete: ("unsubscribe" in unsub ? unsub.unsubscribe : unsub)});

    return store[0];
}
