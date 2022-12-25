import gsap from "gsap/gsap-core";
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

    public async animateSpinStart() {
        // return Promise.all(
        //     this.reels.map(reel => {
        //         const offset1 = reel.offset + 1;
        //         const duration1 = this.model.spinSpeed;
        //         const offset2 = reel.offset + 10;
        //         const duration2 = 10 * this.model.spinSpeed;
        //         return gsap
        //             .timeline()
        //             .to(reel, {offset: offset1, duration: duration1, ease: "sine.in"})
        //             .to(reel, {offset: offset2, duration: duration2, ease: "linear"})
        //             .then(() => reel.fixPosition());
        //     })
        // );
    }

    public async animateSpinStop(offsets: number[]) {
        return Promise.all(
            offsets.map((offset, index) => {
                const reel = this.reels[index];
                // reel.fixPosition();
                const offsetDiff = offset - reel.offset;
                if (offsetDiff < 0) {
                    offset += this.model.tapes[index].length;
                }
                const duration = (offset - reel.offset) * this.model.spinSpeed;
                return gsap
                    .timeline()
                    .to(reel, {offset, duration, ease: "sine.out"})
                    .then(() => reel.fixPosition());
            })
        );
    }
}
