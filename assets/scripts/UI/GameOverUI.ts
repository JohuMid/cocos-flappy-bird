import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    @property(Label)
    curScoreLabel:Label;
    @property(Label)
    bestScoreLabel:Label;

    @property(Node)
    newSprite:Node;

    public show(curScore:number,bestScore:number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        if (curScore > bestScore) {
            this.newSprite.active = true;
        } else {
            this.newSprite.active = false;
        }
    }

    public hide() {
        this.node.active = false;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


