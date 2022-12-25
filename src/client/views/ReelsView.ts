import {Container} from "@pixi/display";
import {GameModel} from "../model/GameModel";
import {ReelView} from "./ReelView";
import {Random} from "../../shared/Random";

export class ReelsView extends Container {
    private readonly reels: ReelView[] = [];
    constructor(private readonly model: GameModel) {
        super();
        let sx = 0;
        for (const tape of this.model.tapes) {
            const reel = new ReelView(tape, Random.from(tape));
            this.reels.push(reel);
            reel.x = sx;
            sx += ReelView.REEL_WIDTH;
            this.addChild(reel);
        }
    }

    public async startSpin() {
        return Promise.all(
            this.reels.map(
                reel =>
                    new Promise(resolve => {
                        reel.spin();
                        reel.once(ReelView.ON_ACCELERATED, resolve);
                    })
            )
        );
    }

    public async stopSpin(offsets: number[]) {
        return Promise.all(
            offsets.map((offset, index) => {
                const reel = this.reels[index];
                const promise = new Promise(resolve => reel.once(ReelView.ON_STOP, resolve));
                reel.stopAt(offset);
                return promise;
            })
        );
    }
}
