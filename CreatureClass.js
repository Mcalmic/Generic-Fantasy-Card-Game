class CreatureClass{
    constructor(cost, power, defense, image, id, owner){
        //owner is 1 if it's you and 2 if it's your opponent
        //this class automatically puts the card into your deck
        this.cost = cost;
        this.power = power;
        this.defense = defense;
        this.owner = owner;
        // the id is used to identify which effect to use when this is cast.
        this.id = id;
        this.image = loadImage(image);
        this.hasAttacked = false;
        if(owner === 1){
            cardsInDeck.push(this);
        } else {
            player2CardsInDeck.push(this);
        }
    }

    cast(){
        console.log(this.image);
        if(cardsInHand.includes(this)){
            if(creaturesOnBoard.length < 6){
                    console.log("You just casted a card") 
                    if(turn === 1){
                        player.mana -= this.cost;
                    } else if(turn === 2){
                        player2.mana -= this.cost;
                    }
                    this.sprite.remove();
                    cardsInHand.splice(cardsInHand.indexOf(this), 1);
                    checkIDEffect(this.id);
                    this.sprite.addImage(this.image);
                    this.sprite.scale = 3;
                    creaturesOnBoard.push(this);
                    hasCasted = true;
            } else {

                    console.log("The board is out of space.")

            }
        }
    }

    displayOnBoard(){
        if(turn === 1){
            if(this.owner === 1){
                this.sprite = createSprite((creaturesOnBoard.indexOf(this)*200) + 100, 500, 100, 150);
            } else if(this.owner === 2){
                this.sprite = createSprite((player2CreaturesOnBoard.indexOf(this)*200) + 100, 100, 100, 150);
            }
            this.sprite.addImage(this.image);
            this.sprite.scale = 3;

        } else if (turn === 2) {
            if(this.owner === 1){
                this.sprite = createSprite((player2CreaturesOnBoard.indexOf(this)*200) + 100, 100, 100, 150);
            } else if(this.owner === 2){
                this.sprite = createSprite((creaturesOnBoard.indexOf(this)*200) + 100, 500, 100, 150);
            }
            this.sprite.addImage(this.image);
            this.sprite.scale = 3;

        }

    }

    displayInHand(){
        this.sprite = createSprite((cardsInHand.indexOf(this)*200) + 100, 800, 100, 150);
        //this.sprite.debug = true;
        this.sprite.addImage(this.image);
        this.sprite.scale = 3;
    }

    takeDamage(amountDamage){

        this.defense -= amountDamage;

    }

    die(){

        creaturesOnBoardInt -= 1;
        this.sprite.remove();
        if((this.owner === 2 && turn === 1) || (this.owner === 1 && turn === 2)){
            player2CreaturesOnBoard.splice(player2CreaturesOnBoard.indexOf(this), 1);
        } else {
            creaturesOnBoard.splice(creaturesOnBoard.indexOf(this), 1);
        }

    }

    checkCasted(){
        if(turn === 1){
            if(this.sprite != null){
                if(mouseWentDownOver(this.sprite) && cardsInHand.includes(this) && notInAction() && player.mana >= this.cost){

                    this.cast();

                }
            }
        } else if (turn === 2){
            if(this.sprite != null){
                if(mouseWentDownOver(this.sprite) && cardsInHand.includes(this) && notInAction() && player2.mana >= this.cost){

                    this.cast();

                }
            }
        }
    }

    checkInitiatedCombat(){
        // change the player2CreaturesOnBoardthing
        if(mouseWentDownOver(this.sprite) && isOnBoard(this)
        && notInAction() === true && this.hasAttacked === false){
      
          attacker = this;
          attackInitiated = true;
          this.hasAttacked = true;
      
        }

    }

    checkTargetedCombat(){
        if(mousePressedOver(this.sprite) && isOnBoard(this) && attackInitiated === true && attacker != this){
      
          Combat.attack(attacker, this);
          attackInitiated = false;
      
        }

    }

    checkDie(){

        if(this.defense <= 0){

            this.die();

        }

    }
}