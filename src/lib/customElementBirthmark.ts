export const customElementBirthmark = Symbol("CustomElement");

export interface CustomElementBirthmark {
    readonly [customElementBirthmark]: true;
}
