import {SpinResult} from "../../shared/SpinResult";

export class GameModel {
    public async spin(): Promise<SpinResult> {
        const port = 3000;
        const result = await fetch(`http://localhost:${port}/spin`, {method: "POST"});
        return await result.json();
    }
}
