import { Accessor, EffectFunction, MemoOptions, NoInfer, Signal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { Observer, Unsubscribable } from "type-fest";
import { CustomElement } from "./customElement";
type VarName = string | symbol;
export interface ObservableLike<ValueType = unknown> {
    subscribe(observer?: Partial<Observer<ValueType>>): Unsubscribable;
}
export declare function getElementVar<T>(element: CustomElement, name: VarName): T | undefined;
export declare function createElementVar<T>(element: CustomElement, name: VarName, value: T, options?: {
    onDelete?: (() => any | void);
}): T;
export declare function setElementVar(element: CustomElement, name: VarName, value: any, options?: {
    onDelete?: (() => any | void);
}): void;
export declare function deleteElementVar<T>(element: CustomElement, name: VarName): T | undefined;
export declare function createElementMemo<Next extends Prev, Prev = Next>(element: CustomElement, name: VarName, fn: EffectFunction<undefined | NoInfer<Prev>, Next>): Accessor<Next>;
export declare function createElementMemo<Next extends Prev, Init = Next, Prev = Next>(element: CustomElement, name: VarName, fn: EffectFunction<Init | Prev, Next>, value: Init, options?: MemoOptions<Next>): Accessor<Next>;
export declare function useElementMemo<T = any>(element: CustomElement, name: VarName): Accessor<T>;
export declare function getElementMemo<T = any>(element: CustomElement, name: VarName): T;
export declare function createElementSignal<T = any>(element: CustomElement, name: VarName, value?: T): Signal<T | undefined>;
export declare function useElementSignal<T = any>(element: CustomElement, name: VarName): Signal<T | undefined>;
export declare function getElementSignal<T = any>(element: CustomElement, name: VarName): T | undefined;
export declare function setElementSignal<T = any>(element: CustomElement, name: VarName, value: (prev: T | undefined) => T): void;
export declare function deleteElementSignal(element: CustomElement, name: VarName): void;
export declare function loadElementSignal<T = any>(element: CustomElement, name: VarName, observable: ObservableLike<T>, options?: {
    onError?: (error: any) => void;
}): Accessor<T | undefined>;
export declare function deleteElementStore(element: CustomElement, name: VarName): void;
export declare function useElementStore<S extends {
    [key: string]: any;
}>(element: CustomElement, name: VarName): ReturnType<typeof createStore<S>>;
export declare function setElementStore<S extends {
    [key: string]: any;
}>(element: CustomElement, name: VarName, newValue: S): void;
export declare function getElementStore<S extends {
    [key: string]: any;
}>(element: CustomElement, name: VarName): Store<S>;
export declare function createElementStore<S extends {
    [key: string]: any;
}>(element: CustomElement, name: VarName, value?: S): [get: object, set: import("solid-js/store").SetStoreFunction<object>];
export declare function loadElementStore<S extends {
    [key: string]: any;
}>(element: CustomElement, name: VarName, value: ObservableLike<S>, options?: {
    onError?: (error: any) => void;
}): S;
export {};
