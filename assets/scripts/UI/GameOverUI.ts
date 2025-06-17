import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    public show(curScore:number,bestScore:number) {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


