var respawnSources = {
	run: function(energyTotalCapacity, harvesters, transporters, sourceId,
		harvestersNumber, transportersNumber, flagHarvesters, flagTransporters, havestersTotal) {

			var harvesterBody = undefined;
			var transporterBody = undefined;

			if ((energyTotalCapacity >= 300 && energyTotalCapacity < 500 ) || havestersTotal.length == 0){
				harvesterBody = [WORK,WORK,CARRY,MOVE];
				transporterBody = [CARRY,CARRY,MOVE,MOVE];

			} else if (energyTotalCapacity >= 500 && energyTotalCapacity < 900){
				harvesterBody = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
				transporterBody = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];

			} else {
				harvesterBody = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
				transporterBody = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
			}

			if(harvesters.length < harvestersNumber) {
			var newName = Game.spawns.Spawn1.createCreep(harvesterBody, undefined, {role: 'harvester', source: sourceId, flag: flagHarvesters});
			console.log('Spawning new harvester: ' + newName);

			} else if(transporters.length < transportersNumber && harvesters.length >= harvestersNumber) {
			var newName = Game.spawns.Spawn1.createCreep(transporterBody, undefined, {role: 'transporter',
				source: sourceId, flag: flagTransporters, carring: false, targetFound: false});
			console.log('Spawning new transporter: ' + newName);
			}
    }
};

module.exports = respawnSources;