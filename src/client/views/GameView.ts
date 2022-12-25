import {Container} from "@pixi/display";
import {SpinButton} from "./SpinButton";
import {GameModel} from "../model/GameModel";
import {ReelsView} from "./ReelsView";
import {IResizable} from "./IResizable";
import {StatusText} from "./StatusText";
import {ReelView} from "./ReelView";

export class GameView extends Container implements IResizable {
    private readonly model = new GameModel();
    private readonly status = new StatusText();
    private readonly spinButton = new SpinButton();
    private readonly reels: ReelsView;
    constructor() {
        super();
        this.reels = new ReelsView(this.model);
        this.spinButton.on("spin", this.onSpinButtonClick, this);
        this.addChild(this.reels);
        this.addChild(this.status);
        this.addChild(this.spinButton);
    }

    protected async onSpinButtonClick(): Promise<void> {
        this.spinButton.enabled = false;
        const spinPromise = this.model.spin();
        await Promise.all([
            this.status.clear(),
            this.reels.startSpin(),
            this.spinButton.spinAnimation()
        ]);
        const spinResult = await spinPromise;
        await this.reels.stopSpin(spinResult.reels);
        await this.status.animateWinType(spinResult.winType);
        if (spinResult.bonusGame) {
            await this.status.animateBonus();
            return this.onSpinButtonClick();
        }
        this.spinButton.enabled = true;
    }

    resize(width: number, height: number): void {
        const scale = width / Math.max(width, ReelView.REEL_WIDTH * this.model.tapes.length + 20);
        [this.reels, this.spinButton, this.status].forEach(view => view.scale.set(scale));
        this.reels.x = (width - this.reels.width) * 0.5;
        this.status.x = this.spinButton.x = width * 0.5;
        this.reels.y = (height - this.reels.height) * 0.5;
        this.status.y = this.reels.y - this.status.height - 20;
        this.spinButton.y = this.reels.y + this.reels.height + this.spinButton.height / 2 + 20;
    }
}
