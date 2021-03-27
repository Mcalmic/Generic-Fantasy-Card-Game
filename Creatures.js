//this class is to store the massive amount of cases for the switch
class Creature {

    constructor(cardID, owner){

        switch(cardID){

            case 1:
                //Fireblast
                new CreatureClass(10, 5, 8, "../Assets/Card_Art/Fireblast.png", 1, owner);
                break;
            case 2:
                //Lightning Bolt
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Lightning_Bolt.png", 2, owner);
                break;
            case 3:
                //Ice Shards
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Ice_Shards.png", 3, owner);
                break;
            case 4:
                //Phalanx
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Phalanx.png", 4, owner);
                break;
            case 5:
                //Swordsman
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Swordsman.png", 5, owner);
                break;
            case 6:
                //Stormcaller
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Stormcaller.png", 6, owner);
                break;
            case 7:
                //Miner
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Miner.png", 7, owner);
                break;
            case 8:
                //Scholar
                new CreatureClass(1, 5, 8, "../Assets/Card_Art/Scholar.png", 8, owner);
                break;
        }

    }

}