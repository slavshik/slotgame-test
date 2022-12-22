import FontFaceObserver = require("fontfaceobserver");
import {Assets, BitmapFont, Sprite, Texture} from "pixi.js";

export class AssetsHelper {
    static async loadAll(images: string[], fonts?: string[]): Promise<void> {
        await Promise.all(images.map(asset => Assets.load(`public/images/${asset}`)));
    }
    private static async loadFont(fontFamily: string) {
        const observer = new FontFaceObserver(fontFamily);
        try {
            await observer.load(null, 10000);
        } catch (e) {
            console.error(e);
        }
        BitmapFont.from(
            fontFamily,
            {fontSize: 96, fontFamily, fill: 0xffffff},
            {chars: BitmapFont.ALPHANUMERIC, resolution: window.devicePixelRatio}
        );
    }

    static getTexture(textureId: string): Texture {
        return Assets.get(`public/images/${textureId}`) as Texture;
    }
}
