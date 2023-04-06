interface ShadowOptions {
    styles?: string | string[];
}
export declare function renderRoot(root: "shadow", options?: ShadowOptions): (elementConstructor: any) => void;
export declare function renderRoot(root: "element"): (elementConstructor: any) => void;
export {};
