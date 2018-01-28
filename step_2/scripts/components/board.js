class Board{
	constructor(width, height, accessibility){
		this.width = width;
		this.height = height;

		this.grid = (function(width, height){
			let grid = new Array(new Array());
			for(var i = 1; i<= height; i++){
				grid[i-1] = [];
				for(var j=1; j<= width; j++){
					grid[i-1][j-1] = new Cell(i-1, j-1, accessibility)
				}
			}
			return grid
		})(width, height)
	}

	isPosWeaponSuitable(pos){
		if((this.grid[pos[0]][pos[1]].getWeaponOnCell() > 0) || (this.grid[pos[0]][pos[1]].getWallOnCell() === true)) {
			return false;
		} else {
			return true;
		}
	}

	putWeaponOnBoard(id, pos){
		this.grid[pos[0]][pos[1]].setWeaponOnCell(id);
	}

	isPosPlayerSuitable(pos){
		if(this.grid[pos[0]][pos[1]].getWallOnCell() === true || this.grid[pos[0]][pos[1]].getWeaponOnCell() > 0 || (this.grid[pos[0]][pos[1]].getPlayerOnCell() > 0) || (this.grid[pos[0]][pos[1]].getCellNearPlayer() === true)){
			return false;
		}else{
			if((pos[0] > 1 && pos[0] < 9) && (pos[1] > 1 && pos[1] < 9)){
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}else if(pos[0] == 0 && pos[1] == 0){
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
			}else if(pos[0] == 9 && pos[1] == 9){
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}else if(pos[0] == 0 && pos[1] == 9){
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}else if(pos[0] == 9 && pos[1] == 0){
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
			}else if(pos[0] == 0 && (pos[1] > 1 && pos[1] < 9)){
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}else if(pos[0] == 9 && (pos[1] > 1 && pos[1] < 9)){
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}else if((pos[0]> 1 && pos[0] < 9) && pos[1] == 0){
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] + 1].setCellNearPlayer(true);
			}
			else if((pos[0] > 1 && pos[0] < 9) && pos[1] == 9){
				this.grid[pos[0] + 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0] - 1][pos[1]].setCellNearPlayer(true);
				this.grid[pos[0]][pos[1] - 1].setCellNearPlayer(true);
			}
			return true;
		}
	}

	movePlayerOnBoard(id, lastPos, newPos){
		if(lastPos !== 0){
			this.grid[lastPos[0]][lastPos[1]].setPlayerOnCell(0);
		}
		this.grid[newPos[0]][newPos[1]].setPlayerOnCell(id);
		
	}

	checkPlayerMovementOptions(pos, movement){
		let movementOptions = new Array(new Array()), nbOptions = 0;
		for(var top=pos[0]-1; top >= Math.max(pos[0] - movement, 0); top--){
			if(top>=0 && (this.grid[top][pos[1]].getWallOnCell() === false) && (this.grid[top][pos[1]].getPlayerOnCell() === 0)){
				movementOptions[nbOptions] = [top, pos[1]];
				nbOptions++;
			}else{
				break;
			}
		}
		for(var bottom=pos[0]+1; bottom <= Math.max(pos[0] + movement, 0); bottom++){
			if(bottom <= 9 && (this.grid[bottom][pos[1]].getWallOnCell() === false) && (this.grid[bottom][pos[1]].getPlayerOnCell() === 0)){
				movementOptions[nbOptions] = [bottom, pos[1]];
				nbOptions++;
			}else{
				break;
			}
		}
		for(var left=pos[1]-1; left >= Math.max(pos[1] - movement, 0); left--){
			if(left >= 0 &&(this.grid[pos[0]][left].getWallOnCell() === false) && (this.grid[pos[0]][left].getPlayerOnCell() === 0)){
				movementOptions[nbOptions] = [pos[0] ,left];
				nbOptions++;
			}else{
				break;
			}
		}
		for(var right=pos[1]+1; right <= Math.max(pos[1] + movement, 0); right++){
			if(right <= 9 && (this.grid[pos[0]][right].getWallOnCell() === false) && (this.grid[pos[0]][right].getPlayerOnCell() === 0)){
				movementOptions[nbOptions] = [pos[0] ,right];
				nbOptions++;
			}else{
				break;
			}
		}
		return movementOptions;
	}
}