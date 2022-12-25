import {SpinResult} from "../../shared/SpinResult";
import * as config from "./game-config.json";

export class GameModel {
    public async spin(): Promise<SpinResult> {
        const port = 3000;
        const response = await fetch(`http://localhost:${port}/spin`, {method: "POST"});
        const spinResult = await response.json();
        console.log("Response:", spinResult.reels.map(this.symbolToEmoji).join(" "));
        return spinResult;
    }
    public get tapes(): number[][] {
        return config.tapes;
    }
    public get reelsCount(): number {
        return this.tapes.length;
    }
    public get spinSpeed(): number {
        return config.spinSpeed;
    }
    private symbolToEmoji(reel: number) {
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
    }
}
