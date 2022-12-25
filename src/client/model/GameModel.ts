import {SpinResult} from "../../shared/SpinResult";
import * as config from "../client-config.json";
import {IGameConfig} from "../interfaces/IGameConfig";
const symbolToEmoji = (index: number): string => ["🟫", "🍓", "🍍", "🍇", "🍉", "🍋"][index] || "?";
export class GameModel {
    public async spin(bonus = false): Promise<SpinResult> {
        const url = `${location.protocol}//${config.host}:${config.port}/spin`;
        const response = await fetch(`${url}/${bonus ? "bonus" : ""}`, {
            method: "POST"
        });
        const spinResult = await response.json();
        console.log(
            "Response:",
            spinResult.reels.map(symbolToEmoji).join(" ") + (spinResult.bonusGame ? " + BONUS" : "")
        );
        return spinResult;
    }
    public get tapes(): number[][] {
        return config.tapes;
    }
    public get config(): IGameConfig {
        return config;
    }
}
