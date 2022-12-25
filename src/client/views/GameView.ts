import {Container} from "@pixi/display";
import {SpinButton} from "./SpinButton";
import {GameModel} from "../model/GameModel";
import {ReelsView} from "./ReelsView";
import {IResizable} from "./IResizable";
import {StatusText} from "./StatusText";

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
            this.reels.animateSpinStart(),
            this.spinButton.spinAnimation()
        ]);
        const spinResult = await spinPromise;
        await this.reels.animateSpinStop(spinResult.reels);
        await this.status.animateWinType(spinResult.winType);
        if (spinResult.bonusGame) {
            await this.status.animateBonus();
            return this.onSpinButtonClick();
        }
        this.spinButton.enabled = true;
    }

    resize(width: number, height: number): void {
        this.status.x = width / 2;
        this.status.y = 50;
        this.reels.x = (width - this.reels.width) / 2;
        this.reels.y = (height - this.reels.height) / 2;
        this.spinButton.x = width / 2;
        this.spinButton.y = height / 2;
    }
}
