
import { hurdle } from './hurdle';
import { _decorator, Component, Node, director, Vec3, view, ProgressBar, tween, SpriteFrame, Sprite, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('canvasLogic')
export class canvasLogic extends Component {

    @property({type : Prefab})
    nodePrefab : Prefab = null;




    start() {

    }

    update(deltaTime: number) {
        
    }


    moveSurface()
    {
        let nodeArr = [];
        console.log("move surface");
        // const node = instantiate(this.nodePrefab);
        for (let index = 0; index <5; index++) 
        {
            const node = instantiate(this.nodePrefab);
            this.node.addChild(node);
            nodeArr.push(node);
        }
        // this.node.getComponent(hurdle).sethurdle();
        // node.position.y = 200 * i;
    }





}

