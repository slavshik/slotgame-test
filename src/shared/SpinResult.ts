import {WinType} from "./WinType";
export interface SpinResult {
    reels: number[];
    winType?: WinType;
    bonusGame: boolean;
}
