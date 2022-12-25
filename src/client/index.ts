import {Application, DisplayObject} from "pixi.js";
import {AssetsHelper} from "./utils/AssetsHelper";
import {GameView} from "./views/GameView";
import {IResizable} from "./views/IResizable";
import {ReelView} from "./views/ReelView";
import {GameModel} from "./model/GameModel";
import {Random} from "../shared/Random";

const main = async () => {
    const app = new Application({resolution: window.devicePixelRatio});
    document.body.appendChild(app.view as any);
    const resizableViews: (DisplayObject & IResizable)[] = [];
    const onResize = () => {
        const width = window.innerWidth / window.devicePixelRatio;
        const height = window.innerHeight / window.devicePixelRatio;
        app.renderer.resize(width, height);
        resizableViews.forEach(view => (view.resize ? view.resize(width, height) : void 0));
    };
    window.addEventListener("resize", onResize);
    onResize();
    await AssetsHelper.loadAll(
        [
            "spinButton.png",
            "spinButtonDisabled.png",
            "spinButtonDown.png",
            "spinButtonHover.png",
            "SYM0.png",
            "SYM1.png",
            "SYM2.png",
            "SYM3.png",
            "SYM4.png",
            "SYM5.png"
        ],
        ["casino.fnt"]
    );
    // const model = new GameModel();
    // const reel = new ReelView(model.tapes[0]);
    // reel.y = 40;
    // app.stage.addChild(reel);
    // (window as any).reel = reel;
    // let accelerating = false;
    // document.addEventListener("click", () => {
    //     if (!accelerating) {
    //         reel.accelerate();
    //     } else {
    //         reel.decelerate();
    //     }
    //     accelerating = !accelerating;
    // });
    const gameView = new GameView();
    resizableViews.push(gameView);
    app.stage.addChild(gameView);
    onResize();
};

main();
