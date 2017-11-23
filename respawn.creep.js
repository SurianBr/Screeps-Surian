var respawn = {
	run: function(energyTotalCapacity, builder, upgrader,
		repair, towerTransporters, totalHarvester, totalTransporters, maxHarvesters, maxTransporters) {

		// verifica se tem total de creeps criticos
	  if (totalHarvester >= maxHarvesters && totalTransporters >= maxTransporters){

			var body = undefined;
			var transporterBody = undefined;

			if (energyTotalCapacity >= 300 && energyTotalCapacity < 500 ) {
				body = [WORK,WORK,CARRY,MOVE];
				transporterBody = [CARRY,CARRY,MOVE,MOVE];

			} else if (energyTotalCapacity >= 500 && energyTotalCapacity < 900){
				body = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
				transporterBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];

			} else {
				body = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
				transporterBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			}

			// respawn upgrader
      if(upgrader.length < 2) {
	    	var newName = Game.spawns.Spawn1.createCreep(body, undefined,
					{role: 'upgrader'});
		  	console.log('Spawning new upgrader: ' + newName);

			// respawn builder
		} else if(builder.length < 2) {
			  var newName = Game.spawns.Spawn1.createCreep(body, undefined,
					{role: 'builder'});
			  	console.log('Spawning new repair: ' + newName);

		  } else if(repair.length < 1) {
			  var newName = Game.spawns.Spawn1.createCreep(body, undefined,
					{role: 'repair'});
			  	console.log('Spawning new builder: ' + newName);

		  } else if(towerTransporters.length < 1) {
			  var newName = Game.spawns.Spawn1.createCreep(transporterBody, undefined,
					{role: 'towerTransporter', carrying: false});
			  	console.log('Spawning new tower transporter: ' + newName);
		  }
    }
	}
};

module.exports = respawn;