import { _decorator, Component, Prefab, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { MoveBg } from './MoveBg';
import { PipeManager } from './PipeManager';
import { GameReadyUI } from './UI/GameReadyUI';

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

    @property({ type: PipeManager })
    pipeSpawner: PipeManager = null;

    @property({type:GameReadyUI})
    gameReadyUI:GameReadyUI = null;

    protected onLoad(): void {
        GameManager._inst = this;
    }
    transitionToReady() {
        this.curGS = GameState.Ready;
        this.bird.disableControl()
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause()
    }
    transitionToGaming() {
        this.curGS = GameState.Gaming;
        this.bird.enableControl()
        this.bgMoving.enableMoving();
        this.landMoving.enableMoving();
        this.pipeSpawner.play()
        this.gameReadyUI.node.active = false;
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


