var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, transporters) {
	    if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.source));
            }
        } else {

			// se não tem transportadores - carrega para spawn
			if (transporters == 0){
				var targets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
								structure.energy < structure.energyCapacity;

						}
				});

			if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}

			// se tiver tranportadores - carrega para a bandeira
            } else {
                var flag = _.filter(creep.room.find(FIND_FLAGS), (flag) => flag.name == creep.memory.flag);

				if(flag.length > 0) {
					if(creep.pos.isEqualTo(flag[0])) {
						creep.drop(RESOURCE_ENERGY);

					} else {
						creep.moveTo(flag[0]);
					}
				}
			}
        }
	}
};

module.exports = roleHarvester;
