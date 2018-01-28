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
		if((this.grid[pos[0]][pos[1]].getWeaponOnCell() > 0) || (this.grid[pos[0]][pos[1]].getPlayerOnCell() > 0) || (this.grid[pos[0]][pos[1]].getWallOnCell() === false)) {
			return false;
		} else {
			return true;
		}
	}

	putWeaponOnBoard(id, pos){
		this.grid[pos[0]][pos[1]].setWeaponOnCell(id);
	}

	isPosPlayerSuitable(pos){
		if(this.grid[pos[0]][pos[1]].getWallOnCell() === true || this.grid[pos[0]][pos[1]].getWeaponOnCell() > 0){
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
			if(lastPos[0] > 0){
			this.grid[lastPos[0] - 1][lastPos[1]].toggleTrigger();	
			}
			if(lastPos[0] < this.height - 1){
				this.grid[lastPos[0] + 1][lastPos[1]].toggleTrigger();	
			}
			if(lastPos[1] > 0){
				this.grid[lastPos[0]][lastPos[1] - 1].toggleTrigger();	
			}
			if(lastPos[1] < this.width - 1){
				this.grid[lastPos[0]][lastPos[1] + 1].toggleTrigger();	
			}
		}
		this.grid[newPos[0]][newPos[1]].setPlayerOnCell(id);
		
	}


}