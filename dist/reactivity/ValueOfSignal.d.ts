import { Accessor } from "solid-js";
export type ValueOfSignal<S> = S extends [Accessor<infer T>, ...any] ? T : never;
