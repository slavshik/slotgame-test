import {SpinAction} from "../src/server/spin/SpinAction";
import {SpinResult} from "../src/shared/SpinResult";
import {WinType} from "../src/shared/WinType";

class MockedSpinAction extends SpinAction {
    constructor() {
        super({
            tapes: [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3]
            ],
            bonusProbability: 0.5
        });
    }
    run(mocked?: Partial<SpinResult>): SpinResult {
        const reels = mocked?.reels || this.getStopPositions();
        const bonusGame = mocked?.bonusGame || this.getBonus();
        return {reels, bonusGame, winType: this.getWinType(reels)};
    }
}
describe("spin", () => {
    it("returns 3 reels", () => {
        const results = new MockedSpinAction().run();
        expect(results.reels.length).toBe(3);
    });
    it("returns small win", () => {
        const action = new MockedSpinAction();
        expect(action.run({reels: [1, 1, 2]}).winType).toBe(WinType.SMALL);
    });
    it("returns big win", () => {
        const action = new MockedSpinAction();
        expect(action.run({reels: [2, 2, 2]}).winType).toBe(WinType.BIG);
    });
    it("returns no win", () => {
        const action = new MockedSpinAction();
        expect(action.run({reels: [1, 3, 2]}).winType).toBe(WinType.NONE);
    });
});
