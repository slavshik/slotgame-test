import {Container} from "@pixi/display";
import {AssetsHelper} from "../utils/AssetsHelper";
import {Graphics, Sprite} from "pixi.js";

export class ReelView extends Container {
    public static REEL_WIDTH = 260;
    private static SYMBOL_HEIGHT = 150;
    private readonly reelCont = new Container();
    private readonly symbols: Sprite[] = [];
    private readonly maskCont = new Graphics()
        .beginFill(0xff0000)
        .drawRect(0, 0, ReelView.REEL_WIDTH, ReelView.SYMBOL_HEIGHT)
        .endFill();
    private readonly tapeHeight = this.tape.length * ReelView.SYMBOL_HEIGHT;
    private readonly bg = new Graphics()
        .beginFill(0xffffff, 0.5)
        .drawRoundedRect(0, 0, ReelView.REEL_WIDTH, ReelView.SYMBOL_HEIGHT, 20)
        .endFill();
    private readonly border = new Graphics()
        .lineStyle(5, 0xffffff)
        .drawRoundedRect(0, 0, ReelView.REEL_WIDTH, ReelView.SYMBOL_HEIGHT, 20)
        .endFill();

    constructor(private readonly tape: number[], private _offset: number = 0) {
        super();
        this.tape.forEach((id, index) => {
            const sprite = AssetsHelper.createSymbolSprite(id);
            this.symbols.push(sprite);
            sprite.x = (ReelView.REEL_WIDTH - sprite.width) * 0.5;
            sprite.y = index * ReelView.SYMBOL_HEIGHT;
            this.reelCont.addChild(sprite);
        });
        this.reelCont.y = this.tapeHeight * 0.5;
        this.reelCont.mask = this.maskCont;
        this.addChild(this.bg);
        this.addChild(this.maskCont);
        this.addChild(this.reelCont);
        this.addChild(this.border);
        this.alignSymbols();
    }
    get offset(): number {
        return this._offset;
    }

    set offset(value: number) {
        this._offset = value;
        this.alignSymbols();
    }
    public fixPosition() {
        this.offset = this._offset % this.tapeHeight;
    }
    private alignSymbols() {
        const reelOffset = -this._offset * ReelView.SYMBOL_HEIGHT - this.reelCont.y;
        this.symbols.forEach((symbol, index) => {
            symbol.y = (reelOffset + index * ReelView.SYMBOL_HEIGHT) % this.tapeHeight;
        });
    }
}
