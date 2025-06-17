import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameData extends Component {

    private static readonly BESTSCORE = "bestScore1";
    private static _score: number = 0;

    public static addScore(count: number = 1) {
        this._score += count;
    }

    public static getScore():number{
        return this._score;
    }

    public static getBestScore():number{
        let bestScore = localStorage.getItem(this.BESTSCORE);
        if (bestScore) {
            return parseInt(bestScore);
        } else {
            return 0;
        }
    }

    public static saveScore(){
        let curScore = this.getScore();
        let bestScore = this.getBestScore();
        if (curScore > bestScore) {
            localStorage.setItem(this.BESTSCORE, curScore.toString());
        }
    }

}


