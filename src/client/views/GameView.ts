import {Container} from "@pixi/display";
import {SpinButton} from "./SpinButton";
import {GameModel} from "../model/GameModel";
import {ReelsView} from "./ReelsView";
import {IResizable} from "../interfaces/IResizable";
import {StatusText} from "./StatusText";
import {ReelView} from "./ReelView";

export class GameView extends Container implements IResizable {
    private readonly status = new StatusText();
    private readonly spinButton = new SpinButton();
    private readonly reels: ReelsView;

    constructor(private readonly model: GameModel) {
        super();
        this.reels = new ReelsView(this.model);
        this.spinButton.on("spin", this.onSpinButtonClick, this);
        this.addChild(this.reels);
        this.addChild(this.status);
        this.addChild(this.spinButton);
    }

    protected async onSpinButtonClick(bonus = false): Promise<void> {
        this.spinButton.enabled = false;
        const spinPromise = this.model.spin(bonus);
        await Promise.all([
            this.status.clear(),
            this.reels.startSpin(), //.then(() => new Promise(resolve => setTimeout(resolve, 1000))),
            this.spinButton.spinAnimation()
        ]);
        const spinResult = await spinPromise;
        await this.reels.stopSpin(spinResult.reels);
        await this.status.animateWinType(spinResult.winType);
        if (spinResult.bonusGame) {
            await this.status.animateBonus();
            return this.onSpinButtonClick(true);
        }
        this.spinButton.enabled = true;
    }

    public resize(width: number, height: number): void {
        const reelsWidth = ReelView.REEL_WIDTH * this.model.tapes.length;
        const scale = width / Math.max(width, reelsWidth + 20);
        [this.reels, this.spinButton, this.status].forEach(view => view.scale.set(scale));
        this.reels.position.set(
            (width - reelsWidth * scale) * 0.5,
            (height - this.reels.height) * 0.5
        );
        this.status.position.set(
            width * 0.5,
            (this.status.y = this.reels.y - this.status.height - 20)
        );
        this.spinButton.position.set(
            width * 0.5,
            this.reels.y + this.reels.height + this.spinButton.height / 2 + 20
        );
    }
}
