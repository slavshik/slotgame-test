import gsap from "gsap/gsap-core";
import {Container} from "@pixi/display";
import {BitmapText} from "pixi.js";
import {WinType} from "../../shared/WinType";

export class StatusText extends Container {
    private readonly label = new BitmapText("", {fontName: "Casino Flat"});
    constructor() {
        super();
        this.label.anchor.set(0.5);
        this.addChild(this.label);
    }
    set text(value: string) {
        this.label.text = value;
    }
    public async animateWinType(winType?: WinType): Promise<void> {
        switch (winType) {
            case WinType.BIG:
                this.text = "BIG WIN";
                await this.bump(1.5);
                break;
            case WinType.SMALL:
                this.text = "SMALL WIN";
                await this.bump(1);
                break;
        }
    }
    public async animateBonus(): Promise<void> {
        this.text = "BONUS GAME";
        await this.bump(1.5);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    public async clear(): Promise<void> {
        this.text = "";
    }
    public async bump(scale: number): Promise<void> {
        return gsap
            .timeline()
            .fromTo(
                this.label.scale,
                {x: 0, y: 0},
                {x: scale, y: scale, ease: "back.out", duration: 0.5}
            )
            .then();
    }
}
