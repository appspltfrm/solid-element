import type { Observable, Subscription } from "rxjs";
import { Signal } from "solid-js";
export type SignalFromObservable<T> = [...Signal<T>, Subscription];
interface InitialValueOption<T> {
    value: T;
}
export interface Options {
    onError?: (error: any) => void | any;
    autoUnsubscribe?: boolean;
}
interface CreateSignalFromOption<T> extends Options, Partial<InitialValueOption<T>> {
}
export declare function createSignalFrom<T = any>(observable: Observable<T>, options: InitialValueOption<T> & Options): SignalFromObservable<T>;
export declare function createSignalFrom<T = any>(observable: Observable<T>, options: CreateSignalFromOption<T | undefined>): SignalFromObservable<T | undefined>;
export {};
