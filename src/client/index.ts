import {Application, DisplayObject} from "pixi.js";
import {AssetsHelper} from "./utils/AssetsHelper";
import {GameView} from "./views/GameView";
import {IResizable} from "./interfaces/IResizable";
import {GameModel} from "./model/GameModel";

const main = async () => {
    console.time("load");
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
    const gameView = new GameView(new GameModel());
    resizableViews.push(gameView);
    app.stage.addChild(gameView);
    onResize();
    console.timeEnd("load");
};

main();
