class Player{
	constructor(id, weapon, board){
		this.id = id;
		this.hp = 100;
		this.weapon = weapon;

		this.lastPosition = 0;
		this.position = (function(id, last, board){
			let rndPos, suitable=false;
			while(suitable === false){
				rndPos = [Math.floor(Math.random() * board.width), Math.floor(Math.random() * board.height)];
				suitable = board.isPosPlayerSuitable(rndPos);
			}
			board.movePlayerOnBoard(id, last, rndPos);
			return rndPos;
		})(this.id, this.lastPosition, board);
	}

	getLastPosition(){
		return this.lastPosition;
	}
}