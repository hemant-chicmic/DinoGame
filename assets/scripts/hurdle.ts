import { _decorator, Component, Node, randomRangeInt, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hurdle')
export class hurdle extends Component {

    @property({type : [SpriteFrame] })
    hurdleimg : [SpriteFrame]|[] = [];
    

    sethurdle(){
        console.log("Hello world"); 
        let randomIndex = randomRangeInt(0, 3) ;
        console.log("random index  " , randomIndex );
        this.getComponent(Sprite).spriteFrame = this.hurdleimg[randomRangeInt(0, 3)];
    }
}

