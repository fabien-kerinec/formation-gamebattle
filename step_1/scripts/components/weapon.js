class Weapon{
	constructor(id, name, damages){
		this.id = id;
		this.name = name,
		this.damages = damages;

		this.position = 0; 
	}

	getPosition(){
		return this.position;
	}



	initializePosOnPlayer(player){
		this.position = "player" + player.id;
	}

	initializePosOnBoard(board){
		let rndPos, suitable=false;
		while(suitable === false){
			rndPos = [Math.floor(Math.random() * board.width), Math.floor(Math.random() * board.height)];
			suitable = board.isPosWeaponSuitable(rndPos);
		}
		board.putWeaponOnBoard(this.id, rndPos);
		this.position = rndPos;
	}
}