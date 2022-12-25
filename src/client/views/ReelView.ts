import gsap from "gsap/gsap-core";
import {Container} from "@pixi/display";
import {AssetsHelper} from "../utils/AssetsHelper";
import {Graphics, Sprite} from "pixi.js";
import {SpinningReelView} from "./SpinningReelView";
import {IReelConfig} from "../interfaces/IReelConfig";

export class ReelView extends SpinningReelView {
    static readonly ON_START = "onStart";
    static readonly ON_ACCELERATED = "accelerationEnded";
    static readonly ON_DECELERATED = "decelerationEnded";
    static readonly ON_STOP = "onStop";
    public static REEL_WIDTH = 260;
    private static SYMBOL_HEIGHT = 155;
    private readonly reelCont = new Container();
    private readonly symbols: Sprite[] = [];
    private readonly maskCont = new Graphics()
        .beginFill(0xff0000)
        .drawRect(0, 0, ReelView.REEL_WIDTH, ReelView.SYMBOL_HEIGHT)
        .endFill();
    private readonly tapeHeight = this.tape.length * ReelView.SYMBOL_HEIGHT;
    constructor(private readonly tape: number[], offset = 0, config: IReelConfig) {
        super(offset * ReelView.SYMBOL_HEIGHT, config);
        this.tape.forEach((id, index) => {
            const sprite = AssetsHelper.createSymbolSprite(id);
            this.symbols.push(sprite);
            sprite.x = (ReelView.REEL_WIDTH - sprite.width) * 0.5;
            sprite.y = index * ReelView.SYMBOL_HEIGHT;
            this.reelCont.addChild(sprite);
        });
        this.reelCont.y = -this.tapeHeight * 0.5;
        this.reelCont.mask = this.maskCont;
        this.addChild(this.maskCont);
        this.addChild(this.reelCont);
        this.updateShift(this.shiftY);
    }
    protected updateShift(value: number): void {
        const reelOffset = value - this.reelCont.y;
        this.symbols.forEach((symbol, index) => {
            symbol.y = (reelOffset - index * ReelView.SYMBOL_HEIGHT) % this.tapeHeight;
        });
    }

    protected onAccelerationEnded(): void {
        this.emit(ReelView.ON_ACCELERATED);
    }

    protected onDecelerationEnded(shiftY: number): void {
        this.emit(ReelView.ON_DECELERATED, shiftY);
        const onComplete = () => {
            const offset = this.shiftY / ReelView.SYMBOL_HEIGHT;
            if (offset >= this.tape.length) {
                this.shiftY = this.shiftY % this.tapeHeight;
            }
            this.emit(ReelView.ON_STOP);
        };
        // onComplete();
        gsap.to(this, {shiftY, duration: 0.5, ease: "elastic.out", onComplete});
    }

    public spin(): void {
        this.emit(ReelView.ON_START);
        this.accelerate();
    }
    public stop(offset: number): void {
        let diff = offset - this.shiftY / ReelView.SYMBOL_HEIGHT;
        if (diff < 0) {
            diff += Math.ceil(Math.abs(diff) / this.tape.length) * this.tape.length;
        }
        this.decelerate(diff * ReelView.SYMBOL_HEIGHT);
    }
}
