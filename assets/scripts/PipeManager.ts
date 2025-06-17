import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;

@ccclass('PipeManager')
export class PipeManager extends Component {

    @property({ type: Prefab })
    pipePrefab: Prefab = null;
    @property
    private spawnRate: number = 2;

    private timer: number = 2

    private isSpawning: boolean = false;

    start() {

    }

    update(deltaTime: number) {
        if (!this.isSpawning) {
            return
        }
        this.timer += deltaTime;
        if (this.timer > this.spawnRate) {
            this.timer = 0;
            // 创建一个管道
            const pipe = instantiate(this.pipePrefab);
            this.node.addChild(pipe);
            pipe.setWorldPosition(this.node.getWorldPosition())

            // 给管道添加随机高度
            const randomY = Math.random() * 200 - 100;
            pipe.setPosition(pipe.position.x, randomY);
        }
    }

    public pause() {
        this.isSpawning = false

        const nodeArr = this.node.children

        for (let i = 0; i < nodeArr.length; i++) {
            const pipe = nodeArr[i].getComponent(Pipe)
            if (pipe) {
                pipe.enabled = false;
            }
        }
    }
    public play() {
        this.isSpawning = true

    }
}


