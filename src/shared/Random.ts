export class Random {
    /**
     * Generates random from start to end. Or from 0 to start (if end is undefined)
     * @param start - from or until (if end is undefined)
     * @param end - end of range
     */
    static rangeFloat = (start: number, end = 0): number => start + Math.random() * (end - start);

    static range = (start: number, end?: number): number =>
        Math.floor(Random.rangeFloat(start, end));

    /**
     * true or false
     */
    static bool = (probability = 0.5): boolean => Math.random() <= probability;
    /**
     * 1 or -1
     */
    static sign = (probability = 0.5): number => (Random.bool(probability) ? 1 : -1);

    /**
     * randomize from all passed args or from the first one if it is an array
     * @param args
     */
    static from: {
        <T = any>(arg: T[]): T;
        <T = any>(...args: T[][]): T[];
        <T = any>(...args: T[]): T;
    } = (...args) => {
        if (args.length > 1) {
            return args[Math.floor(args.length * Math.random())];
        }
        const first = args[0];
        if (Array.isArray(first)) {
            return first[Math.floor(first.length * Math.random())];
        }
        return first;
    };
}
