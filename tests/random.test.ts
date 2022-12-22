import {Random} from "../src/shared/Random";

describe("Random", () => {
    it("from range", () => {
        expect([0, 1, 2, 3, 4, 5]).toContain(Random.range(5));
        expect([-2, -1, 0, 1, 2]).toContain(Random.range(-2, 2));
        expect([-4, -3, -2]).toContain(Random.range(-4, -2));
    });
    it("true or false", () => {
        expect([true, false]).toContain(Random.bool());
        expect(Random.bool(0)).toBeFalsy();
        expect(Random.bool(1)).toBeTruthy();
    });

    it("-1 or 1", () => expect([-1, 1]).toContain(Random.sign()));

    it("from array or params", () => {
        const arr = [1, 2, 3];
        expect(arr).toContain(Random.from(arr));
        expect(arr).toContain(Random.from(...arr));
        expect(["one", "two", "three"]).toContain(Random.from(["one", "two", "three"]));
        expect(["one", "two", "three"]).toContain(Random.from("one", "two", "three"));
        const arr3 = [3, 4, 5];
        expect([arr, arr3]).toContain(Random.from(arr, arr3));
        expect([arr, arr3]).toContain(Random.from([arr, arr3]));
    });
    it("from single param", () => {
        let dummyObject = {a: 1, b: 2, c: 3};
        expect(Random.from(dummyObject)).toStrictEqual(dummyObject);
        expect(Random.from([])).toBeUndefined();
        expect(Random.from()).toBeUndefined();
    });
});
