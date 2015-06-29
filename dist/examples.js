function example_caves() {

	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('wall', {
		getColor: function () {
			return this.open ? '255, 255, 255, 1' : '68, 36, 52, 1';
		},
		process: function (neighbors) {
			var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasOpen');
			this.open = (this.wasOpen && surrounding >= 4) || surrounding >= 6;
		},
		reset: function () {
			this.wasOpen = this.open;
		}
	}, function () {
		//init
		this.open = Math.random() > 0.40;
	});

	world.initialize([
		{ name: 'wall', distribution: 100 }
	]);

	return world;
};

function example_cavesWithWater() {

	// FIRST CREATE CAVES
	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('wall', {
		getColor: function () {
			return this.open ? '255, 255, 255, 1' : '68, 36, 52, 1';
		},
		process: function (neighbors) {
			var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasOpen');
			this.open = (this.wasOpen && surrounding >= 4) || surrounding >= 6;
		},
		reset: function () {
			this.wasOpen = this.open;
		}
	}, function () {
		//init
		this.open = Math.random() > 0.40;
	});

	world.initialize([
		{ name: 'wall', distribution: 100 }
	]);

	// generate our cave, 10 steps aught to do it
	for (var i=0; i<10; i++) {
		world.step();
	}

	var grid = world.createGridFromValues([
		{ cellType: 'wall', hasProperty: 'open', value: 0 }
	], 1);

	// NOW USE OUR CAVES TO CREATE A NEW WORLD CONTAINING WATER
	world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('water', {
		getColor: function() {
			return '89, 125, 206, ' + (this.water ? Math.max(0.3, this.water/9) : 0);
		},
		process: function(neighbors) {
			if (this.water === 0) {
				// already empty
				return;
			}
			// push my water out to my available neighbors

			// cell below me will take all it can
			if (neighbors[world.BOTTOM.index] !== null && this.water && neighbors[world.BOTTOM.index].water < 9) {
				var amt = Math.min(this.water, 9 - neighbors[world.BOTTOM.index].water);
				this.water-= amt;
				neighbors[world.BOTTOM.index].water += amt;
				return;
			}

			// bottom two corners take half of what I have
			for (var i=5; i<=7; i++) {
				if (i!=world.BOTTOM.index && neighbors[i] !== null && this.water && neighbors[i].water < 9) {
					var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/2));
					this.water-= amt;
					neighbors[i].water += amt;
					return;
				}
			}
			// sides take a third of what I have
			for (i=3; i<=4; i++) {
				if (neighbors[i] !== null && neighbors[i].water < this.water) {
					var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/3));
					this.water-= amt;
					neighbors[i].water += amt;
					return;
				}
			}
		}
	}, function() {
		//init
		this.water = Math.floor(Math.random() * 9);
	});

	world.registerCellType('rock', {
		isSolid: true,
		getColor: function() {
			return this.lighted ? '109, 170, 44, 1' : '68, 36, 52, 1';
		},
		process: function(neighbors) {
			this.lighted = neighbors[world.TOP.index] && !(neighbors[world.TOP.index].water === 9) && !neighbors[world.TOP.index].isSolid
				&& neighbors[world.BOTTOM.index] && neighbors[world.BOTTOM.index].isSolid;
		}
	});

	// pass in our generated cave data
	world.initializeFromGrid([
		{ name: 'rock', gridValue: 1 },
		{ name: 'water', gridValue: 0 }
	], grid);

	return world;
}
function example_cyclic() {
	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('cyclic', {
		colors: [
			'255,0,0,1', '255,96,0,1', '255,191,0,1', '223,255,0,1',
			'128,255,0,1', '32,255,0,1', '0,255,64,1', '0,255,159,1',
			'0,255,255,1', '0,159,255,1', '0,64,255,1', '32,0,255,1',
			'127,0,255,1', '223,0,255,1', '255,0,191,1', '255,0,96,1'
		],
		getColor: function () {
			return this.colors[this.state];
		},
		process: function (neighbors) {
			var next = (this.state + 1) % 16;

			var changing = false;
			for (var i = 0; i < neighbors.length; i++) {
				if (neighbors[i] !== null) {
					changing = changing || neighbors[i].state === next;
				}
			}
			if (changing) this.state = next;
			return true;
		}
	}, function () {
		//init
		this.state = Math.floor(Math.random() * 16);
	});

	world.initialize([
		{ name: 'cyclic', distribution: 100 }
	]);

	return world;
}
function example_fallingWater() {

    var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

    world.registerCellType('water', {
        getColor: function() {
            return '89, 125, 206, ' + (this.water ? Math.max(0.3, this.water/9) : 0);
        },
        process: function(neighbors) {
            if (this.water === 0) {
                // already empty
                return;
            }
	        // push my water out to my available neighbors

            // cell below me will take all it can
            if (neighbors[world.BOTTOM.index] !== null && this.water && neighbors[world.BOTTOM.index].water < 9) {
                var amt = Math.min(this.water, 9 - neighbors[world.BOTTOM.index].water);
                this.water-= amt;
                neighbors[world.BOTTOM.index].water += amt;
                return;
            }

            // bottom two corners take half of what I have
            for (var i=5; i<=7; i++) {
                if (i!=world.BOTTOM.index && neighbors[i] !== null && this.water && neighbors[i].water < 9) {
                    var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/2));
                    this.water-= amt;
                    neighbors[i].water += amt;
                    return;
                }
            }
            // sides take a third of what I have
            for (i=3; i<=4; i++) {
                if (neighbors[i] !== null && neighbors[i].water < this.water) {
                    var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/3));
                    this.water-= amt;
                    neighbors[i].water += amt;
                    return;
                }
            }
        }
    }, function() {
        //init
        this.water = Math.floor(Math.random() * 9);
    });

    world.registerCellType('rock', {
        getColor: function() {
            return '68, 36, 52, 1';
        }
    });

    world.initialize([
        { name: 'water', distribution: 70 },
        { name: 'rock', distribution: 30 }
    ]);

	return world;
}

function example_gameOfLife() {

	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('living', {
		getColor: function () {
			return this.alive ? '68, 36, 52, 1' : '255, 255, 255, 1';
		},
		process: function (neighbors) {
			var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasAlive');
			this.alive = surrounding === 3 || surrounding === 2 && this.alive;
		},
		reset: function () {
			this.wasAlive = this.alive;
		}
	}, function () {
		//init
		this.alive = Math.random() > 0.5;
	});

	world.initialize([
		{ name: 'living', distribution: 100 }
	]);

	return world;
};

function example_rain() {

	// FIRST CREATE CAVES
	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('wall', {
		getColor: function () {
			return this.open ? '255, 255, 255, 1' : '68, 36, 52, 1';
		},
		process: function (neighbors) {
			var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasOpen');
			this.open = (this.wasOpen && surrounding >= 4) || surrounding >= 6;
		},
		reset: function () {
			this.wasOpen = this.open;
		}
	}, function () {
		//init
		this.open = Math.random() > 0.40;
	});

	world.initialize([
		{ name: 'wall', distribution: 100 }
	]);

	// generate our cave, 10 steps aught to do it
	for (var i=0; i<10; i++) {
		world.step();
	}

	var grid = world.createGridFromValues([
		{ cellType: 'wall', hasProperty: 'open', value: 0 }
	], 1);

	// cut the top half of the caves off
	for (var y=0; y<Math.floor(world.height/2); y++) {
		for (var x=0; x<world.width; x++) {
			grid[y][x] = 0;
		}
	}

	// NOW USE OUR CAVES TO CREATE A NEW WORLD CONTAINING WATER
	world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	world.registerCellType('air', {
		getColor: function() {
			return '89, 125, 206, ' + (this.water ? Math.max(0.3, this.water/9) : 0);
		},
		process: function(neighbors) {
			// rain on the top row
			if (neighbors[world.TOP.index] === null && Math.random() < 0.02) {
				this.water = 5;
			}
			else if (this.water === 0) {
				// already empty
				return;
			}

			// push my water out to my available neighbors

			// cell below me will take all it can
			if (neighbors[world.BOTTOM.index] !== null && this.water && neighbors[world.BOTTOM.index].water < 9) {
				var amt = Math.min(this.water, 9 - neighbors[world.BOTTOM.index].water);
				this.water-= amt;
				neighbors[world.BOTTOM.index].water += amt;
				return;
			}

			// bottom two corners take half of what I have
			for (var i=5; i<=7; i++) {
				if (i!=world.BOTTOM.index && neighbors[i] !== null && this.water && neighbors[i].water < 9) {
					var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/2));
					this.water-= amt;
					neighbors[i].water += amt;
					return;
				}
			}
			// sides take a third of what I have
			for (i=3; i<=4; i++) {
				if (neighbors[i] !== null && neighbors[i].water < this.water) {
					var amt = Math.min(this.water, Math.ceil((9 - neighbors[i].water)/3));
					this.water-= amt;
					neighbors[i].water += amt;
					return;
				}
			}
		}
	}, function() {
		//init
		this.water = 0;
	});

	world.registerCellType('rock', {
		isSolid: true,
		getColor: function() {
			return this.lighted ? '109, 170, 44, 1' : '68, 36, 52, 1';
		},
		process: function(neighbors) {
			this.lighted = neighbors[world.TOP.index] && !(neighbors[world.TOP.index].water === 9) && !neighbors[world.TOP.index].isSolid
				&& neighbors[world.BOTTOM.index] && neighbors[world.BOTTOM.index].isSolid;
		}
	});

	// pass in our generated cave data
	world.initializeFromGrid([
		{ name: 'rock', gridValue: 1 },
		{ name: 'air', gridValue: 0 }
	], grid);

	return world;
}
function example_trees() {


	// NOW USE OUR CAVES TO CREATE A NEW WORLD CONTAINING WATER
	var world = new CAWorld({
		width: 96,
		height: 64,
		cellSize: 6
	});

	// create ground
	var grid = [];
	for (var y=0; y<world.height; y++) {
		grid[y] = [];
		for (var x=0; x<world.width; x++) {
			grid[y][x] = y > world.height - world.height/8 ? 1 : 0;
			if (y == world.height - world.height/8 && x % 32 === 16) {
				grid[y][x] = 2;
			}
		}
	}


	world.registerCellType('air', {
		color: '109, 194, 202, 1',
		getColor: function() {
			return this.color;
		},
		process: function(neighbors) {
		}
	});

	world.registerCellType('earth', {
		isSolid: true,
		getColor: function() {
			return this.lighted ? '109, 170, 44, 1' : '68, 36, 52, 1';
		},
		process: function(neighbors) {
			this.lighted = neighbors[world.TOP.index] && !neighbors[world.TOP.index].isSolid
				&& neighbors[world.BOTTOM.index] && neighbors[world.BOTTOM.index].isSolid;
		}
	});

	world.registerCellType('tree', {
		potential: 16,
		direction: { x: 0, y: -1},
		getColor: function() {
			return this.hasSprouted && this.isTrunk ? '60, 78, 44, 1' : (this.hasSprouted ? '52, 101, 36, 1' : '68, 36, 52, 1');
		},
		sprout: function() {
			this.isTrunk = true;
			for (var y=-1; y<=0; y++) {
				for (var x=-1; x<=1; x++) {
					if (Math.random() < 0.5) {
						if (world.grid[this.y + y] && world.grid[this.y + y][this.x + x]) {
							if (world.grid[this.y + y][this.x + x].cellType === 'tree') {
							}
							else {
								world.grid[this.y + y][this.x + x] = new world.cellTypes.tree(this.x, this.y);
							}
						}
						world.grid[this.y + y][this.x + x].potential = 0;
						world.grid[this.y + y][this.x + x].hasSprouted = true;
					}
				}
			}
		},
		process: function() {
			if (!this.potential) {
				return;
			}

			var newX = this.x + this.direction.x;
			var newY = this.y + this.direction.y;
			var cellInDirection;
			try {
				cellInDirection = world.grid[newY][newX];
			} catch(ex) {}

			if (cellInDirection && !cellInDirection.isSolid) {
				world.grid[newY][newX] = new world.cellTypes.tree(newX, newY);
				world.grid[newY][newX].potential = this.potential - 1;
				world.grid[newY][newX].direction.x = this.direction.x;
				world.grid[newY][newX].direction.y = this.direction.y;
				if (world.grid[newY][newX].potential < 12) {
					world.grid[newY][newX].delay(10, function (cell) {
						cell.sprout();
					});
				}
				// branch?
				if (this.potential < 14 && Math.random() < 0.3) {
					this.direction.x = Math.random() > 0.5 ? 1 : -1;
					this.direction.y = Math.random() > 0.5 ? 0 : -1;
					this.potential -= Math.ceil(this.potential/4);
				}
				else {
					this.potential = 0;
				}
			}
		}
	});

	// pass in our generated cave data
	world.initializeFromGrid([
		{ name: 'earth', gridValue: 1 },
		{ name: 'tree', gridValue: 2 },
		{ name: 'air', gridValue: 0 }
	], grid);

	return world;
}