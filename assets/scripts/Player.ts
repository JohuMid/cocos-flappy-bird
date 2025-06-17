import { _decorator, Collider2D, Component, Contact2DType, ERigidBody2DType, input, Input, Animation, IPhysics2DContact, Node, RigidBody2D, Vec2 } from 'cc';
import { Tags } from './Tags';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private rigidBody: RigidBody2D = null;

    // 小鸟的旋转角度
    @property
    private rotateSpeed: number = 60;

    private _canControl: boolean = false;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

        this.rigidBody = this.getComponent(RigidBody2D);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onTouchStart(){
        if (!this._canControl) {
            return
        }
        // 点击后，给刚体一个向上的力
        if (this.rigidBody) {
            this.rigidBody.linearVelocity = new Vec2(0, 10);
        }
        // 点击后，给节点一个旋转角度
        this.node.angle = this.rotateSpeed;

    }

    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    public enableControl(){
        this._canControl = true;
        // 启用刚体组件
        if (this.rigidBody) {
            this.rigidBody.enabled = true;
        }
        // 启用动画
        let anim = this.getComponent(Animation);
        if (anim) {
            anim.enabled = true;
        }
    }
    public disableControl(){
        this._canControl = false;
        // 禁用刚体组件
        if (this.rigidBody) {
            this.rigidBody.enabled = false;
        }

        // 禁用动画
        let anim = this.getComponent(Animation);
        if (anim) {
            anim.enabled = false;
        }
    }

    public disableControlNotRigidBody(){
        let anim = this.getComponent(Animation);
        if (anim) {
            anim.enabled = false;
        }
        this._canControl = false;
    }
    
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log(otherCollider.tag);
        if (otherCollider.tag == Tags.PIPE || otherCollider.tag == Tags.LAND) {
            GameManager.inst().transitionToGameOver();
        }
    }

    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log(otherCollider.tag);
        if (otherCollider.tag == Tags.PIPE_MIDDLE) {
            GameManager.inst().addScore();
        }
    }


    update(deltaTime: number) {
        if (!this._canControl) {
            return
        }
        // 小鸟的旋转角度
        this.node.angle -= deltaTime * this.rotateSpeed;
        if (this.node.angle < -60) {
            this.node.angle = -60;
        }
        
    }
}


