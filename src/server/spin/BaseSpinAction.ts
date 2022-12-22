import {WinType} from "../../shared/WinType";
import {SpinResult} from "../../shared/SpinResult";

export abstract class BaseSpinAction<Result extends SpinResult, Params = never> {
    public abstract run(params: Params): Result | Promise<Result>;
    protected abstract getStopPositions(): number[];
    protected abstract getWinType(positions: number[]): WinType;
    protected abstract getBonus(): boolean;
}
