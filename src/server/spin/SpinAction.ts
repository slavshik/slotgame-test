import {SpinResult} from "../../shared/SpinResult";
import {Random} from "../../shared/Random";
import {WinType} from "../../shared/WinType";
import {BaseSpinAction} from "./BaseSpinAction";
import {SpinActionConfig} from "./SpinActionConfig";
import {SpinActionParams} from "./SpinActionParams";

export class SpinAction extends BaseSpinAction<SpinResult, SpinActionParams | undefined> {
    constructor(private config: SpinActionConfig) {
        super();
    }
    public run(params?: SpinActionParams): SpinResult {
        const positions = this.getStopPositions();
        const winType = this.getWinType(positions);
        const values = positions.map((position, reel) => this.config.tapes[reel][position]);
        return {reels: values, winType, bonusGame: this.getBonus()};
    }
    protected getStopPositions(): number[] {
        return this.config.tapes.map(tape => Random.range(tape.length - 1));
    }
    protected getWinType(positions: number[]): WinType {
        const symLengths: number[] = [];
        positions.forEach((position, reel) => {
            const symValue = this.config.tapes[reel][position];
            symLengths[symValue] ||= 0;
            symLengths[symValue]++;
        });
        const max = Math.max(...symLengths.filter(v => !isNaN(v)));
        switch (max) {
            case 2:
                return WinType.SMALL;
            case 3:
                return WinType.BIG;
            default:
                return WinType.NONE;
        }
    }
    protected getBonus(): boolean {
        return Random.bool(this.config.bonusProbability);
    }
}
