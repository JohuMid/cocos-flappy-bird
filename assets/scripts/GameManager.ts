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

    protected onLoad(): void {
        GameManager._inst = this;
    }
    start() {
        
    }

    update(deltaTime: number) {
    }
}


