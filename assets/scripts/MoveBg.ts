import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from './GameManager';

@ccclass('bg')
export class bg extends Component {
    @property({ type: Node })
    bg1: Node = null;
    @property({ type: Node })
    bg2: Node = null;

    // 背景移动速度
    @property
    private speed: number = 100;

    start() {
        this.speed = GameManager.inst().moveSpeed;
    }

    update(deltaTime: number) {
        // bg1和bg2的x坐标相同，随着游戏的进行，bg1和bg2的x坐标减少，当bg1的x坐标小于-bg1的高度时，bg1的x坐标重置为0
        this.bg1.setPosition(this.bg1.position.x - this.speed * deltaTime, this.bg1.position.y);
        this.bg2.setPosition(this.bg2.position.x - this.speed * deltaTime, this.bg2.position.y);

        const moveDisance = this.bg1.getComponent(UITransform).contentSize.width
        if (this.bg1.position.x < -moveDisance) {
            this.bg1.setPosition(this.bg2.position.x + moveDisance - 10, this.bg1.position.y);
        }
        if (this.bg2.position.x < -moveDisance) {
            this.bg2.setPosition(this.bg1.position.x + moveDisance - 10, this.bg2.position.y);
        }
    }
}


