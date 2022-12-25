import {Container} from "@pixi/display";
import {Ticker} from "pixi.js";

export abstract class SpinningReelView extends Container {
    private speed = 0;
    private acceleration = 0;
    private stopY = 0;

    constructor(private _shiftY: number = 0, private maxSpeed = 1, private accelerationTime = 1) {
        super();
    }

    public accelerate() {
        const time = (this.accelerationTime * 1000) / Ticker.shared.elapsedMS;
        const distance = this.maxSpeed * time;
        this.acceleration = (this.maxSpeed * this.maxSpeed - this.speed * this.speed) / distance;
        Ticker.shared.remove(this.update, this);
        Ticker.shared.add(this.update, this);
    }
    protected update() {
        const delta = Ticker.shared.elapsedMS;
        this.speed += this.acceleration * delta;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
            this.acceleration = 0;
            this.onAccelerationEnded();
        }
        this.shiftY += this.speed * delta;
        if (this.speed < 0) {
            this.speed = 0;
            this.acceleration = 0;
            Ticker.shared.remove(this.update, this);
            this.onDecelerationEnded(this.stopY);
        }
    }
    protected abstract onAccelerationEnded(): void;
    protected abstract onDecelerationEnded(shiftY: number): void;
    protected abstract updateShift(shift: number): void;
    public decelerate(distance: number) {
        this.acceleration = -(this.speed * this.speed) / (distance * 2);
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
