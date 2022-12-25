import {IReelConfig} from "./IReelConfig";

export interface IGameConfig {
    host: string;
    port: number;
    tapes: number[][];
    reel: IReelConfig;
}
