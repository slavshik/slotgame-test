import {AssetsHelper} from "../utils/AssetsHelper";
import {FederatedPointerEvent, IDestroyOptions, Sprite} from "pixi.js";
type ButtonProps = {
    textures: {
        normal: string;
        disabled: string;
        hover: string;
        down: string;
    };
};
type ButtonState = keyof ButtonProps["textures"];
export class Button extends Sprite {
    private _enabled = true;
    constructor(private props: ButtonProps) {
        super();
        this.on("pointerdown", this.onDown, this);
        this.on("pointerup", this.onUp, this);
        this.on("pointerover", this.onHover, this);
        this.on("pointerout", this.onOut, this);
        this.anchor.set(0.5);
        this.updateEnabled();
    }
    protected onUp(e: FederatedPointerEvent) {
        this.state = "normal";
    }
    protected onDown(e: FederatedPointerEvent) {
        this.state = "down";
    }
    private onHover(e: FederatedPointerEvent) {
        this.state = "hover";
    }
    private onOut(e: FederatedPointerEvent) {
        this.state = "normal";
    }

    set state(state: ButtonState) {
        this.texture = AssetsHelper.getTexture(this.props.textures[state]);
    }
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        if (this._enabled !== value) {
            this._enabled = value;
            this.updateEnabled();
        }
    }

    private updateEnabled() {
        this.state = this._enabled ? "normal" : "disabled";
        this.cursor = this._enabled ? "pointer" : "default";
        this.interactive = this._enabled;
    }
    destroy(_options?: IDestroyOptions | boolean) {
        this.off("pointerdown", this.onDown, this);
        this.off("pointerup", this.onUp, this);
        this.off("pointerover", this.onHover, this);
        this.off("pointerout", this.onOut, this);
        super.destroy(_options);
    }
}
