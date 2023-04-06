import { Signal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { Accessor, EffectFunction, MemoOptions, NoInfer } from "solid-js/types/reactive/signal";
import { Observer, Unsubscribable } from "type-fest";
import { CustomElementInterface } from "./CustomElementInterface";
type VarName = string | symbol;
export interface ObservableLike<ValueType = unknown> {
    subscribe(observer?: Partial<Observer<ValueType>>): Unsubscribable;
}
export declare function getElementVar<T>(element: CustomElementInterface, name: VarName): T | undefined;
export declare function setElementVar(element: CustomElementInterface, name: VarName, value: any, options?: {
    onDelete?: (() => any | void);
}): void;
export declare function deleteElementVar<T>(element: CustomElementInterface, name: VarName): T | undefined;
export declare function createElementMemo<Next extends Prev, Prev = Next>(element: CustomElementInterface, name: VarName, fn: EffectFunction<undefined | NoInfer<Prev>, Next>): Accessor<Next>;
export declare function createElementMemo<Next extends Prev, Init = Next, Prev = Next>(element: CustomElementInterface, name: VarName, fn: EffectFunction<Init | Prev, Next>, value: Init, options?: MemoOptions<Next>): Accessor<Next>;
export declare function useElementMemo<T = any>(element: CustomElementInterface, name: VarName): Accessor<T>;
export declare function getElementMemo<T = any>(element: CustomElementInterface, name: VarName): T;
export declare function createElementSignal<T = any>(element: CustomElementInterface, name: VarName, value?: T): Signal<T | undefined>;
export declare function useElementSignal<T = any>(element: CustomElementInterface, name: VarName): Signal<T | undefined>;
export declare function getElementSignal<T = any>(element: CustomElementInterface, name: VarName): T | undefined;
export declare function setElementSignal<T = any>(element: CustomElementInterface, name: VarName, value: (prev: T | undefined) => T): void;
export declare function deleteElementSignal(element: CustomElementInterface, name: VarName): void;
export declare function loadElementSignal<T = any>(element: CustomElementInterface, name: VarName, observable: ObservableLike<T>, options?: {
    onError?: (error: any) => void;
}): Accessor<T | undefined>;
export declare function deleteElementStore(element: CustomElementInterface, name: VarName): void;
export declare function useElementStore<S extends {
    [key: string]: any;
}>(element: CustomElementInterface, name: VarName): ReturnType<typeof createStore<S>>;
export declare function setElementStore<S extends {
    [key: string]: any;
}>(element: CustomElementInterface, name: VarName, newValue: S): void;
export declare function getElementStore<S extends {
    [key: string]: any;
}>(element: CustomElementInterface, name: VarName): Store<S>;
export declare function createElementStore<S extends {
    [key: string]: any;
}>(element: CustomElementInterface, name: VarName, value?: S): [get: object, set: import("solid-js/store").SetStoreFunction<object>];
export declare function loadElementStore<S extends {
    [key: string]: any;
}>(element: CustomElementInterface, name: VarName, value: ObservableLike<S>, options?: {
    onError?: (error: any) => void;
}): S;
export {};
