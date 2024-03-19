import { App } from "../system/App";
import * as Matter from "matter-js";

export class Diamond {
    constructor(x, y) {
        this.createSprite(x, y);
        App.app.ticker.add(this.update, this);
    }


    destroy() {
        if (this.sprite) {
            App.app.ticker.remove(this.update, this);
            Matter.World.remove(App.physics.world, this.body);
            this.sprite.destroy();
            this.sprite = null;
        }
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }

    update() {
        if (this.sprite) {
            Matter.Body.setPosition(this.body, {x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y});
        }
    }

    
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, {friction: 0, isStatic: true});
        this.body.gameDiamond = this;
        this.body.isSensor = true;
        Matter.World.add(App.physics.world, this.body);
        this.body.render.fillStyle = "#000000";

    }


}