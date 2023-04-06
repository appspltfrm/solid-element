export type CustomElementEventMap<EventMap extends Record<string, Event>> = Omit<HTMLElementEventMap, keyof EventMap> & EventMap;
