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

    protected onDown(e: FederatedPointerEvent) {
        super.onDown(e);
        this.enabled = false;
        gsap.to(this, {
            rotation: Math.PI * 2,
            duration: 0.5,
            onComplete: () => {
                this.enabled = true;
                this.rotation = 0;
            }
        });
    }
}
