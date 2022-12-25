import {gsap} from "gsap/gsap-core";
import {Button} from "./Button";
import {FederatedPointerEvent} from "pixi.js";

export class SpinButton extends Button {
    constructor() {
        super({
            textures: {
                normal: "spinButton.png",
                disabled: "spinButtonDisabled.png",
                down: "spinButtonDown.png",
                hover: "spinButtonHover.png"
            }
        });
    }

    protected onUp(e: FederatedPointerEvent) {
        super.onUp(e);
        this.emit("spin");
    }
    public async spinAnimation(): Promise<void> {
        return gsap
            .timeline()
            .to(this, {
                rotation: Math.PI * 2,
                duration: 0.5,
                onComplete: () => (this.rotation = 0)
            })
            .then();
    }
}
