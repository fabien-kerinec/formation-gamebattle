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

		this.movement = 3
	}

	getID(){
		return this.id;
	}
	getLastPosition(){
		return this.lastPosition;
	}
	getMovement(){
		return this.movement;
	}
	getPosition(){
		return this.position;
	}

	setLastPosition(value){
		this.lastPosition = value;
	}
	setPosition(value){
		this.position = value;
	}
	setWeapon(value){
		this.weapon = value;
	}


	makeMovement(newPos, board){
		this.lastPosition = this.position;
		board.movePlayerOnBoard(this.id,this.lastPosition, newPos);
		this.position = newPos;
	}

	lastMovementCells(){
		var lastMovement = new Array(new Array()), deltaRow, deltaCol;
		deltaRow = this.position[0] - this.lastPosition[0];
		deltaCol = this.position[1] - this.lastPosition[1];

		if(deltaRow > 0){
			for (var right = 1; right <= deltaRow; right++){
				lastMovement[right-1] = [this.lastPosition[0] + right, this.lastPosition[1]]
			}
		}else if (deltaRow < 0) {
			for (var left = 1; left <= Math.abs(deltaRow); left += 1) {
				lastMovement[left - 1] = [this.lastPosition[0] - left, this.lastPosition[1]];	
			}
		}else if (deltaCol > 0) {
			for (var bottom = 1; bottom <= deltaCol; bottom += 1) {
				lastMovement[bottom - 1] = [this.lastPosition[0], this.lastPosition[1] + bottom];	
			}
		}else if (deltaCol < 0) {
			for (var top = 1; top <= Math.abs(deltaCol); top += 1) {
				lastMovement[top - 1] = [this.lastPosition[0], this.lastPosition[1] - top];	
			}
		}
		return lastMovement;
	}
}