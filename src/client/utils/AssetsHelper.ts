import {Assets, Sprite, Texture} from "pixi.js";

export class AssetsHelper {
    static async loadAll(images: string[], fonts?: string[]): Promise<void> {
        const imagesPromises = images.map(asset => Assets.load(`public/images/${asset}`));
        const fontsPromises = fonts?.map(font => Assets.load(`public/fonts/${font}`)) || [];
        await Promise.all(imagesPromises.concat(fontsPromises));
    }

    static getTexture(textureId: string): Texture {
        return Assets.get(`public/images/${textureId}`) as Texture;
    }
    static createSymbolSprite(index: number): Sprite {
        const texture = AssetsHelper.getTexture(`SYM${index}.png`);
        return new Sprite(texture);
    }
}
