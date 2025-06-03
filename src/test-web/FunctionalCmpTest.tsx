import {Component} from "solid-js";

export interface FunctionalCmpProps {
    /**
     * test
     * @param e
     */
    onChange?: (e: CustomEvent<string>) => void;
}

export const FunctionalCmpTest: Component<FunctionalCmpProps> = (props: FunctionalCmpProps) => {
    return <div>Functional component</div>
}
