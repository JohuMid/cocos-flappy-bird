import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _inst: GameManager = null;
    public static inst(){
        return this._inst;
    }
    @property
    moveSpeed:number = 100;

    @property({type:Prefab})
    pipePrefab: Prefab = null;

    @property({type:Node})
    pipeManager:Node = null;

    private createTime:number = 0;

    protected onLoad(): void {
        GameManager._inst = this;
    }
    start() {
        
    }

    update(deltaTime: number) {
        // 计算经过的时间，每隔1秒创建一个管道
        this.createTime += deltaTime;
        if (this.createTime > 3) {
            this.createTime = 0;
            // 创建一个管道
            const pipe = instantiate(this.pipePrefab);
            this.pipeManager.addChild(pipe);
        }
    }
}


