import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tags')
export class Tags extends Component {
    public static readonly LAND:number = 10;
    public static readonly PIPE:number = 20;
    public static readonly PIPE_MIDDLE:number = 30;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


