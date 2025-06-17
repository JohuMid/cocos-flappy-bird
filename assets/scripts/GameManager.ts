import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { MoveBg } from './MoveBg';

enum GameState {
    Ready,
    Gaming,
    GameOver,
}

@ccclass('GameManager')
export class GameManager extends Component {
    private static _inst: GameManager = null;
    public static inst(){
        return this._inst;
    }
    @property
    moveSpeed:number = 100;

    @property({ type: Player })
    bird: Player = null

    @property({ type: MoveBg })
    bgMoving: MoveBg = null;
    @property({ type: MoveBg })
    landMoving: MoveBg = null;

    curGS: GameState = GameState.Ready

    protected onLoad(): void {
        GameManager._inst = this;
    }
    transitionToReady() {
        this.curGS = GameState.Ready;
        this.bird.disableControl()
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
    }
    transitionToGaming() {
        this.curGS = GameState.Gaming;
    }
    transitionToGameOver() {
        this.curGS = GameState.GameOver;
    }
    start() {
        this.transitionToReady();
    }

    update(deltaTime: number) {
    }
}


