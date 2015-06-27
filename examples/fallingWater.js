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
            if (neighbors[world.BOTTOM] !== null && this.water && neighbors[world.BOTTOM].water < 9) {
                var amt = Math.min(this.water, 9 - neighbors[world.BOTTOM].water);
                this.water-= amt;
                neighbors[world.BOTTOM].water += amt;
                return;
            }

            // bottom two corners take half of what I have
            for (var i=5; i<=7; i++) {
                if (i!=world.BOTTOM && neighbors[i] !== null && this.water && neighbors[i].water < 9) {
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
