class Cell{
	constructor(rowIndex, colIndex, Accessibility){
		this.row = rowIndex;
		this.col = colIndex;

		this.playerOnCell = 0;
		this.weaponOnCell = 0;
		this.cellNearPlayer = false;

		this.wallOnCell = Math.random() < Accessibility ? false : true;
	}

	getWallOnCell(){
		return this.wallOnCell;
	}

	getWeaponOnCell(){
		return this.weaponOnCell;
	}

	getPlayerOnCell(){
		return this.playerOnCell;
	}
	getRow(){
		return this.row;
	}
	getCol(){
		return this.col;
	}

	setPlayerOnCell(value){
		this.playerOnCell = value;
	}
	setWeaponOnCell(value){
		this.weaponOnCell = value;
	}

	setCellNearPlayer(value){
		this.cellNearPlayer = value;
	}
}