import {Application} from "pixi.js";
import {AssetsHelper} from "./utils/AssetsHelper";
import {SpinButton} from "./views/SpinButton";

const main = async () => {
    const app = new Application({resolution: window.devicePixelRatio});
    document.body.appendChild(app.view as any);
    await AssetsHelper.loadAll([
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
    ]);

    let spinButton = new SpinButton();
    spinButton.x = spinButton.width * 0.5;
    spinButton.y = spinButton.height * 0.5;
    app.stage.addChild(spinButton);
};

main();
