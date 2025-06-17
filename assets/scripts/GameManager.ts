import { _decorator, Component, Prefab, instantiate, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { MoveBg } from './MoveBg';
import { PipeManager } from './PipeManager';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { GameOverUI } from './UI/GameOverUI';

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

    @property({type:Node})
    gamingUI:Node = null;

    @property({type:Label})
    scoreLabel:Label = null;

    @property({ type: GameOverUI })
    gameOverUI: GameOverUI = null;

    protected onLoad(): void {
        GameManager._inst = this;
    }
    transitionToReady() {
        this.curGS = GameState.Ready;
        this.bird.disableControl()
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause()
        this.gameReadyUI.node.active = true;
        this.gamingUI.active = false;
    }
    transitionToGaming() {
        this.curGS = GameState.Gaming;
        this.bird.enableControl()
        this.bgMoving.enableMoving();
        this.landMoving.enableMoving();
        this.pipeSpawner.play()
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = true;
        this.gameOverUI.hide();
    }
    transitionToGameOver() {
        this.curGS = GameState.GameOver;

        this.bird.disableControlNotRigidBody()
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause()
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = false;

        this.gameOverUI.show(0,0);
    }
    start() {
        this.transitionToReady();
    }

    update(deltaTime: number) {
    }

    addScore(count:number = 1){
        GameData.addScore(count);
        this.scoreLabel.string = GameData.getScore().toString();
    }
}


