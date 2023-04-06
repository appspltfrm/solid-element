import { Accessor } from "solid-js";
export type AccessorOfSignal<S> = Accessor<S extends [Accessor<infer T>, ...any] ? T : never>;
