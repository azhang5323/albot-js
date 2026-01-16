load_code("upgrade");
load_code("maiItems");
load_code("pontyBuy");
load_code("bank draft");
load_code("Wizardfishing");
load_code("mluck work");
load_code("Lucky Slot Tracker");
map_key("4","massproductionpp");
map_key("5","snowball");
map_key("6","scare");
map_key("7","fishing");
map_key("8","mining");
map_key("B","mcourage");
//https://aldata.earthiverse.ca/upgrade/mittens/30000 !!!!!!! VERY USEFUL TO CHECK PRICES

var monster_targets = ["ejr"];
var goFish = 21;
//var checkPonty = 21;

//accept_party_invite("trololol");
accept_magiport("YTFAN");
use_skill("mluck","Bonjour");

//var checkInv = 0;
const slot = locate_item("tristone")
var trueIceWizard = 21;




function IceWizard() {
        // Don't use if on cooldown
        if (trueIceWizard != 1 || character.slots.mainhand?.name != "froststaff" || is_on_cooldown("snowball") || character.mp <= 500) return;

        let targets = [];
        for (let id in parent.entities) {
            let entity = parent.entities[id];
            if ((entity.target === "earthPri" || entity.target ==="derped" || entity.target === "Jhlwarrior" || entity.target === "trololol" || entity.target === "YTFAN" || entity.target === character.name ) && (entity.type === "monster" || entity.skin === "grinch")) {
                targets.push(entity);
            }
        }

        //if (targets.length > 2) {
            let chosen = targets[0];
            use_skill("snowball", chosen);
     //   }
	if(character.hp < (character.max_hp - 400) && !is_on_cooldown("use_hp")){use_skill("hp");}
		if(character.mp < character.map_mp - 500 &&!is_on_cooldown("use_mp")){
		use_skill("mp");
	}
	loot();
    }


function find_viable_targets() {
    var monsters = Object.values(parent.entities).filter(
        mob => (mob.target == null
                    || parent.party_list.includes(mob.target)
                    || mob.target == character.name)
                && (mob.type == "monster"
                    && (parent.party_list.includes(mob.target)
                        || mob.target == character.name))
                    || monster_targets.includes(mob.mtype));

    for (id in monsters) {
        var monster = monsters[id];

        if (parent.party_list.includes(monster.target)
                    || monster.target == character.name) {
            monster.targeting_party = 1;
        }
        else {
            monster.targeting_party = 0;
        }
    }

    //Order monsters by whether they're attacking us, then by distance.
    monsters.sort(function (current, next) {
        if (current.targeting_party > next.targeting_party) {
            return -1;
        }
        var dist_current = distance(character, current);
        var dist_next = distance(character, next);
        // Else go to the 2nd item
        if (dist_current < dist_next) {
            return -1;
        }
        else if (dist_current > dist_next) {
            return 1
        }
        else {
            return 0;
        }
    });
    return monsters;
}




setInterval(function() {
//	trueIceWizard = 1;
IceWizard();
returnToLeader();
	loot();
		if(character.hp < (character.max_hp - 400) && !is_on_cooldown("use_hp")){use_skill("hp");}
	var target = find_viable_targets()[0];

	//Attack or move to target

    if (target != null) {
 if (trueIceWizard == 1 && character.slots.mainhand?.name == "froststaff" && !is_on_cooldown("snowball") && character.mp >= 500){
 		use_skill("snowball",target);
	 set_message("Attacking");
 	
 }

            
        }

//	}
	else{
		if (!smart.moving && character.slots.mainhand?.name == "froststaff" && trueIceWizard == 1) {
			//game_log("finding a target");
         //   smart_move({ to: monster_targets[0] });
        }
	}
}, 200);			
function returnToLeader() {
	if (trueIceWizard != 1 || character.slots.mainhand?.name != "froststaff") return;
    let leader = get_player("trololol");

    if (!leader) {
        set_message("Leader not found");
        return null;
    }

    if (distance(character, leader) > 100) { return; }
    const target = get_targeted_monster();
    let offsetX = 0;
    let offsetY = 0;

    // Collect points to avoid: mob + leader
    const avoidPoints = [];
    if (target && !target.dead) {
        avoidPoints.push({ x: target.x, y: target.y });
    }

    avoidPoints.push({ x: leader.x, y: leader.y });

    for (const point of avoidPoints) {
        const dx = character.x - point.x;
        const dy = character.y - point.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

        const awayFactor = 30;
        offsetX += (dx / dist) * awayFactor;
        offsetY += (dy / dist) * awayFactor;
    }

    let safeX = leader.x + offsetX;
    let safeY = leader.y + offsetY;

    const dxLeader = safeX - leader.x;
    const dyLeader = safeY - leader.y;

    const dist = 40;
    if (Math.abs(dxLeader) < dist && Math.abs(dyLeader) < dist) {
        // Push further along whichever axis has more room
        if (Math.abs(dxLeader) >= Math.abs(dyLeader)) {
            safeX = leader.x + (dxLeader >= 0 ? dist : -dist);
        } else {
            safeY = leader.y + (dyLeader >= 0 ? dist : -dist);
        }
    }
//	if(teleportwithMage = 1){
    move(safeX, safeY);
	//}
}
setInterval(function() {
if(character.skin != "tm_yellow"){
	parent.socket.emit("activate", {slot: "ring2"});
}

}, 300);
setInterval(function() {
	if(this.fishing == false || character.esize < 3){
	 if(character.slots.mainhand?.name !== "broom" && trueIceWizard !=1){
						equip(locate_item("broom"));
					   equip(locate_item("wbookhs"));

					}	
	}
	if(character.esize >= 3 && trueIceWizard !=1 && goFish == 1){
	WizardFish();
	
	}
	if(character.esize < 3 &&trueIceWizard != 1){
		this.fishing == false;	
		this.clearInv == true;
	}
//	if(this.fishing == false && this.clearInv == true){
		if(trueIceWizard != 1 && character.esize < 3){
			this.banking = true;
bankItems();}
		if(character.map == "main" && character.x > -500 && character.x < 100 && character.y > -500 && 				character.y < 150 && parent.socket != null){
			
			if(character.map == "main" && !is_on_cooldown("massproductionpp") && !character.s.massproductionpp && character.mp > 1000){
			   use_skill("massproductionpp");
			}
			if(character.map == "main" && !is_on_cooldown("massproduction") && !character.s.massproductionpp && !character.s.massproduction){
			   use_skill("massproduction");
			}
			
					upgrade();
					compound_items();

		}


	
//	}
		if(character.x == -175 && character.y == -150 && character.map == "main"){
				open_stand();
		}
		else{
				close_stand();
		}
	if(character.hp < character.max - 400){
				if(!is_on_cooldown("use_hp")){
		use("hp");
		}
		if(!is_on_cooldown("scare")){
			equip(locate_item("jacko"));
		use("scare");
		}
	}
	if(character.mp < character.max_mp - 500 && !is_on_cooldown("use_mp")){
		use("mp");
	}
	
}, 300);


setInterval(function(){
//smart_move(1200, 476);
//		game_log("pickup hawks");
	if((character.map != "main" || character.x != -175 || character.y != -150 ||character.esize <1) && trueIceWizard != 1 && this.fishing == false){
		if(!smart.moving ){use_skill("town");game_log("e");}
		//&& (character.x > 300 || character.x < -300 || character.y > 100 || character.y < -300)
		if(!smart.moving && character. esize >= 4 && trueIceWizard != 1 && this.fishing == false){smart_move({ map: "main", x: -175, y: -150 });}
	}
	
},10000);


setInterval(function(){
buffPartyWithMLuck();
},1000);

setInterval(function(){

if(character.gold > 10000000 && character.esize > 10){
//	parent.buy("wand");
}
},3000);

setInterval(function(){

use_skill("mluck","Bonjour");
},3000000);
setInterval(function(){
		if (!parent.party_list.includes("trololol") &&trueIceWizard != 1){
			accept_party_invite("trololol");
	}

	if(character.esize > 1 && trueIceWizard != 1 && this.fishing == false){
	accept_magiport("YTFAN");
	}
//	if(this.fishing == true && parent.
	maiItems();

	if(character.esize > 3 && trueIceWizard != 1 && parent.distance(character,{ map: "main", x: -175, y: -150 }) < 300){
		buySecondaries();
//		exchangeItems();
	}
			

//	auto_craft("wingedboots");
//	auto_craft("firestars");
	
},1000);
performance_trick();


setInterval(function(){
	if(trueIceWizard != 1 && this.fishing == false){
		this.banking = true;
bankItems();
	}

},120000);
