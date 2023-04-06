import {Component} from "solid-js";
import {JSX} from "solid-js/h/jsx-runtime";

export interface FunctionalCmpProps {
    /**
     * test
     * @param e
     */
    onChange?: (e: CustomEvent<string>) => void;
}

export const FunctionalCmpTest: Component<FunctionalCmpProps> = function(props: FunctionalCmpProps): JSX.Element {
    return <div>Functional component</div>
}
