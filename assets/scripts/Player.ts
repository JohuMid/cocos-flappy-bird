import { _decorator, Component, ERigidBody2DType, input, Input, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private rigidBody: RigidBody2D = null;
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(){
        // 点击后，给刚体一个向上的力
        const rigidBody = this.getComponent(RigidBody2D);
        if (rigidBody) {
            rigidBody.linearVelocity = new Vec2(0, 10);
        }
    }

    start() {
        
    }

    update(deltaTime: number) {
    }
}


