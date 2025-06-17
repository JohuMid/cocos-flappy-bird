import { _decorator, Component, Node,UITransform } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    @property
    private moveSpeed = 150;


    start() {
        // node的y设置到-300到正300之间
        const randomY = Math.random() * 600 - 300;
        this.node.setPosition(this.node.position.x, randomY);
    }

    update(deltaTime: number) {
        const p =this.node.position;
        this.node.setPosition(p.x - this.moveSpeed *deltaTime, p.y);

        // 超出屏幕，销毁管道
        if (this.node.position.x < (-730)) {
            this.node.destroy();
        }
    }
}


