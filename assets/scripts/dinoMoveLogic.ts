import { _decorator, Component, Node, director, Vec3, view, ProgressBar, tween, Prefab, instantiate, Tween } from 'cc';
import { hurdle } from './hurdle';
const { ccclass, property } = _decorator;

@ccclass('dinoMoveLogic')
export class dinoMoveLogic extends Component {

    @property({ type: Node })
    dinoImg: Node | null = null;

    @property({ type: Prefab })
    nodePrefab: Prefab | null = null;

    private nodeArr: Node[] = [];
    private isFirsttime: boolean = false;
    private isAnimating: boolean = false;
    private startGame: boolean = false;

    onLoad() {
        console.log("load function");
        if (!this.nodePrefab || !this.dinoImg) {
            console.error("Prefab or dinoImg is not assigned!");
            return;
        }

        for (let i = 0; i < 5; i++) {
            
            const newNode = instantiate(this.nodePrefab);
            this.node.parent.addChild(newNode);
            this.nodeArr.push(newNode);
            // newNode.getComponent(hurdle).sethurdle();
            newNode.setPosition(new Vec3(1000 * (i+1), 0, 0));
            // console.log("newNode: ", newNode.getPosition())
        }
    }

    start() {}

    update(deltaTime: number) {
        if (this.startGame) {
            this.moveSurface();
        }
    }

    startDinoMovement() {
        this.startGame = true;
        console.log("Start dino movement");
        this.movedino();
        this.moveSurface();
    }

    restartGame()
    {
        console.log( "restart game " ) ; 
        director.loadScene("mainScene");
    }

    moveSurface() {
        console.log("move surface");
        for (let i = 0; i < 5; i++) {
            const node = this.nodeArr[i];
            if (!node) {
                console.error("Node in nodeArr is null!");
                return;
            }

            

            let x = node.position.x;
            node.setPosition(new Vec3(x - 10, 0, 0));

            
            let canvasX : number  = this.node.parent.position.x - 1920  ;
            
            if( node.position.x <= canvasX  )
            {
                node.setPosition(new Vec3( 4000, 0, 0));
            }
            // Add null check for this.dinoImg
            if (this.dinoImg) {
                let xhurdles = node.position.x;
                let yhurdles = node.position.y;
                let dinoX = this.dinoImg.position.x;
                let dinoY = this.dinoImg.position.y;
                let dinoHeight = this.dinoImg.position.y;
                if (xhurdles - 40 <= dinoX + 70 && dinoX - 75 <= xhurdles + 45 && dinoHeight - 60 <= yhurdles + 65) {
                    console.log("Game over!");
                    // if (window.confirm("Game Over! Play Again ")) {
                    //     this.destroy();
                    //     Tween.stopAll();
                    //     director.loadScene("mainScene");
                    // }
                    this.destroy();
                    Tween.stopAll();                    
                    return;
                }
            }
        }
    }
    
    movedino() {
        if (this.isFirsttime) {
            return;
        }
        this.isFirsttime = true;
        console.log("moveDino moveDino  ");
        let x = this.dinoImg.position.x;
        let y = this.dinoImg.position.y;
        let newPos = new Vec3(x + 200, y, 0);
        tween(this.dinoImg.position).to(0.8, newPos, {
            onUpdate: (target: Vec3, ratio: number) => {
                this.dinoImg.position = target;
            }
        }).start();
    }

    jumpDino() {
        if (this.isAnimating || !this.dinoImg) {
            return;
        }
        
        console.log("jump jump");
        this.isAnimating = true;
        let x = this.dinoImg.position.x;
        let y = this.dinoImg.position.y;
        let newPos = new Vec3(x, y + 400, 0);
        tween(this.dinoImg.position).to(0.5, newPos, {
            onUpdate: (target: Vec3, ratio: number) => {
                if (this.dinoImg) {
                    this.dinoImg.position = target;
                }
            },
            onComplete: () => {
                let originalPos = new Vec3(x, y, 0);
                tween(this.dinoImg.position).to(0.5, originalPos, {
                    onUpdate: (target: Vec3, ratio: number) => {
                        if (this.dinoImg) {
                            this.dinoImg.position = target;
                        }
                    },
                    onComplete: () => {
                        this.isAnimating = false;
                        if ( ! this.isFirsttime) {
                            this.startDinoMovement() ;
                        }
                    }
                }).start();
            }
        }).start();
        
    }
    
}
