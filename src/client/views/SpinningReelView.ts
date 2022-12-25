import {Container} from "@pixi/display";
import {Ticker} from "pixi.js";
import {IReelConfig} from "../interfaces/IReelConfig";

export abstract class SpinningReelView extends Container {
    private speed = 0;
    private acceleration = 0;
    private stopY = 0;
    protected abstract onAccelerationEnded(): void;
    protected abstract onDecelerationEnded(shiftY: number): void;
    protected abstract updateShift(shift: number): void;
    protected constructor(private _shiftY: number = 0, private config: IReelConfig) {
        super();
    }

    public accelerate(): void {
        const time = this.config.accelerationTime * 1000 * this.config.maxSpeed;
        this.acceleration = (this.config.maxSpeed ** 2 - this.speed ** 2) / time;
        Ticker.shared.remove(this.update, this);
        Ticker.shared.add(this.update, this);
    }
    protected update(): void {
        const delta = Ticker.shared.elapsedMS;

        if (this.speed > this.config.maxSpeed) {
            this.speed = this.config.maxSpeed;
            this.acceleration = 0;
            this.onAccelerationEnded();
        }

        if (this.speed < 0) {
            this.speed = 0;
            this.acceleration = 0;
            Ticker.shared.remove(this.update, this);
            this.onDecelerationEnded(this.stopY);
        }
        this.speed += this.acceleration * delta;
        this.shiftY += this.speed * delta;
    }
    public decelerate(distance: number): void {
        this.acceleration = -(this.speed ** 2) / (2 * distance);
        this.stopY = this._shiftY + distance;
    }

    get shiftY(): number {
        return this._shiftY;
    }
    set shiftY(value: number) {
        this._shiftY = value;
        this.updateShift(this._shiftY);
    }
}
