import {SpinResult} from "../../shared/SpinResult";
import * as config from "./client-config.json";
import {IGameConfig} from "../interfaces/IGameConfig";

export class GameModel {
    public async spin(): Promise<SpinResult> {
        const response = await fetch(`${location.protocol}//${config.host}:${config.port}/spin`, {
            method: "POST"
        });
        const spinResult = await response.json();
        console.log("Response:", spinResult.reels.map(this.symbolToEmoji).join(" "));
        return spinResult;
    }
    public get tapes(): number[][] {
        return config.tapes;
    }
    public get config(): IGameConfig {
        return config;
    }
    private symbolToEmoji(reel: number): string {
        switch (reel) {
            case 0:
                return "🟫";
            case 1:
                return "🍓";
            case 2:
                return "🍍";
            case 3:
                return "🍇";
            case 4:
                return "🍉";
            case 5:
                return "🍋";
        }
        return "?";
    }
}
