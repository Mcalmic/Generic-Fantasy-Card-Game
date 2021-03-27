var cardsInHand = [];
var cardsInDeck = [];
var player2CardsInHand = [];
var player2CardsInDeck = [];
var creaturesOnBoardInt = 0;
var creaturesOnBoard = [];
var player2CreaturesOnBoard = [];
var tempCreaturesOnBoard = [];
var tempCardsInHand = [];
var tempCardsInDeck = [];
//var cardsInExile = [];
var attackInitiated = false;
var targetingInitiated = false;
var attacker = null;
var hasCasted = false;
//this is the local multiplayer system
var turn = 1;
var turnsElapsed = 0;

function preload(){

  playerImage = loadImage("../Assets/Card_Art/Player.png");
  
}

function setup() {
  createCanvas(displayWidth, displayHeight - displayHeight/7.5);
  for(i = 0; i < 11; i++){

    card = new Creature(round(random(1, 8)), 1);

  }
  for(i = 0; i < 11; i++){

    card = new Creature(round(random(1, 8)), 2);

  }
  player2 = new Player("../Assets/Card_Art/Player.png");
  player = new Player("../Assets/Card_Art/Player.png");
  player.scale = 3;
  Deck.shuffle(cardsInDeck);
  Deck.drawCard(1);
  //player.sprite.debug = true;
  //console.log(cardsInHand + "cards in hand");
  //console.log(creaturesOnBoard + "cards on board");
}

function draw() { 
  background(255);  
  //creaturesOnBoard[creaturesOnBoard.length - 1].displayOnBoard();
  if(keyWentDown("F")){

    console.log(cardsInHand);
    console.log(player2CardsInHand)

  }
  if(keyWentDown("E")){

    newTurn();
    attackInitiated = false;

  }
  if(keyWentDown("R")){
    console.log("you are drawing a card")
    console.log(cardsInDeck.length)
    Deck.drawCard(1);

  }
  if(attackInitiated){

    console.log("attack")

  }
  player.display(1750, 800, 1700, 720, 1705, 670);
  player.checkTargetedCombat();
  player2.display(1750, 100, 1700, 200, 1705, 250);
  player2.checkTargetedCombat();
  displayHand(); 
  removeBoardSprites(); 
  displayBoard();
  drawSprites();
  checkCastedInHand();
  checkInitiatedCombatBoard();
  checkDie();
  if(hasCasted === true){

    attackInitiated = false;
    hasCasted = false;

  }

}

function newTurn(){
  if(turn === 1){
    player2.maxMana++;
    player2.mana = player2.maxMana;
    Deck.drawCard(1);
    for(i = 0; i < creaturesOnBoard.length; i++){
    
      creaturesOnBoard[creaturesOnBoard.length - (i + 1)].hasAttacked = false;

    }

    turn = 2;
  } else if (turn === 2){

    player.maxMana++;
    player.mana = player.maxMana;
    Deck.drawCard(1);
    for(i = 0; i < player2CardsInHand.length; i++){
    
      player2CardsInHand[player2CardsInHand.length - (i + 1)].hasAttacked = false;

    }

    turn = 1;
  }
  swapPlayers();
}

function displayHand(){
  for(i = 0; i < cardsInHand.length; i++){

    if(cardsInHand[cardsInHand.length - (i + 1)].sprite != null){
      
      cardsInHand[cardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < cardsInHand.length; i++){
    
    cardsInHand[cardsInHand.length - (i + 1)].displayInHand();

  }
}
function displayBoard(){
  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].displayOnBoard();

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].displayOnBoard();

  }
}
//these are basically the same ones
function checkCastedInHand(){

  for(i = 0; i < cardsInHand.length; i++){

    cardsInHand[cardsInHand.length - (i + 1)].checkCasted();

  }

}

function checkDie(){

  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkDie();

  }

  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].checkDie();

  }
}

function checkInitiatedCombatBoard(){

  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkInitiatedCombat();

  }
  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkTargetedCombat();

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].checkTargetedCombat();

  }

}

function notInAction(){

  //this is just a shorthand function that returns a boolean figuring out if you're in the middle of attacking or something similar.
  // returning true means that no action is currently waiting to be resolved and it is your turn. 
  //this function is an all in one for every if function
  if(targetingInitiated === false && attackInitiated === false){
    
    return true;

  } else {

    return false;

  }

}

function mouseWentDownOver(sprite){

  if(World.mouseX < sprite.x + 0.5*sprite.width && World.mouseX > sprite.x - 0.5*sprite.width 
    && World.mouseY < sprite.y + 0.5*sprite.height && World.mouseY > sprite.y - 0.5*sprite.height 
    && mouseWentDown()){
      return true;

  }
}

function swapPlayers(){

  for(i = 0; i < player2CardsInHand.length; i++){

    if(player2CardsInHand[player2CardsInHand.length - (i + 1)].sprite != null){
      
      player2CardsInHand[player2CardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < cardsInHand.length; i++){

  if(cardsInHand[cardsInHand.length - (i + 1)].sprite != null){
      
      cardsInHand[cardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  tempCreaturesOnBoard = player2CreaturesOnBoard;
  player2CreaturesOnBoard = creaturesOnBoard;
  creaturesOnBoard = tempCreaturesOnBoard;
  tempCreaturesOnBoard = [];

  tempCardsInHand = player2CardsInHand;
  player2CardsInHand = cardsInHand; 
  cardsInHand = tempCardsInHand;
  tempCardsInHand = [];

  tempCardsInDeck = player2CardsInDeck;
  player2CardsInDeck = cardsInDeck; 
  cardsInDeck = tempCardsInDeck;
  tempCardsInDeck = [];

}
function isOnBoard(creature){

  if(creaturesOnBoard.includes(creature) || player2CreaturesOnBoard.includes(creature)){

    return true;

  }

}
function removeBoardSprites(){

  for(i = 0; i < creaturesOnBoard.length; i++){

    if(creaturesOnBoard[creaturesOnBoard.length - (i + 1)].sprite != null){
      
      creaturesOnBoard[creaturesOnBoard.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){

    if(player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].sprite != null){
      
      player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].sprite.remove();

    }

  }

}
function checkIDEffect(cardID){
  //if this works because the owner is checked when this is called
  switch(cardID){

      case 1:
          //Fireblast
          break;
      case 2:
          //Lightning Bolt
          break;
      case 3:
          //Ice Shards
          break;
      case 4:
          //Phalanx
          break;
      case 5:
          //Swordsman
          break;
      case 6:
          //Stormcaller
          card = new Creature(2);
          Deck.drawCard(1);
          break;
      case 7:
          //Miner
          player.maxMana++;
          break;
      case 8:
          //Scholar
          Deck.drawCard(1);
          break;
  }

}