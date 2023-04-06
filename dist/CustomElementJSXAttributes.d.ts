export type CustomElementJSXAttributes = {
    [Key in keyof any as `attr:${string & Key}`]?: string;
};
