import { _decorator, Color, Component, EditBox, EventKeyboard, Input, input, KeyCode, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

const MaxNumber = 100;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Label})
    lblContent: Label = null!;
    @property({type: Label})
    lblTips: Label = null!;
    @property({type: EditBox})
    editBox: EditBox = null!;

    private isPlaying: boolean = false;
    private targetNumber: number = 0;
    private minNumber: number = 1;
    private maxNumber: number = MaxNumber;

    start() {
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.restart();
    }

    restart(){
        this.isPlaying = true;
        this.lblTips.string = '';
        this.editBox.string = '';
        this.minNumber = 1;
        this.maxNumber = MaxNumber;
        this.editBox.setFocus();

        this.lblContent.string = `Please enter the number: 1 - ${MaxNumber}`;
        this.targetNumber = Math.floor(Math.random() * MaxNumber) + 1;
        console.log('Target number:', this.targetNumber);
    }

    onKeyUp (event: EventKeyboard) {
        console.log('Key up', event.keyCode);
        switch(event.keyCode) {
            case KeyCode.ENTER:
                console.log('Release a key');
                this.checkResult();
                break;
        }
    }

    checkResult() {
        this.lblTips.string = '';
        this.lblTips.color = Color.RED;

        if(!this.isPlaying) {
            this.lblTips.string = 'Game over, please restart!';
            this.editBox.string = '';
            return;
        }

        setTimeout(() => {
            this.editBox.setFocus();
        }, 0.01);

        let inputNumber = parseInt(this.editBox.string);
        if (isNaN(inputNumber)) {
            this.lblTips.string = 'Please enter a number';
            this.editBox.string = '';
            return;
        }
        if(inputNumber <= this.minNumber || inputNumber >= this.maxNumber) {
            this.lblTips.string = `Please enter the number:1 - ${this.maxNumber}`;
            this.editBox.string = '';
            return;
        }
        if(inputNumber == this.targetNumber) {
            this.lblTips.string = 'Congratulations!';
            this.lblTips.color = new Color(137, 38, 245);
            this.isPlaying = false;
        } else if(inputNumber < this.targetNumber) {
            this.minNumber = inputNumber;
            this.lblContent.string = `Please enter the number: ${this.minNumber} - ${this.maxNumber}`;
            this.editBox.string = '';
        } else {
            this.maxNumber = inputNumber;
            this.lblContent.string = `Please enter the number: ${this.minNumber} - ${this.maxNumber}`;
            this.editBox.string = '';
        }
    }

    onClickRestart() {  
        this.restart();
    }
}


