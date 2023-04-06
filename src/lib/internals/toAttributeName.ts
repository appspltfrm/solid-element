export function toAttributeName(propName: string) {
    return propName
        .replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase())
        .replace("_", "-")
        .replace(/^-/, "");
}
