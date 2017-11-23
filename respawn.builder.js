var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;

	    } else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;

	    } else if(creep.memory.building) {

	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
	            if(creep.memory.building) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
	    } else {

	        if (totalHarvester >= maxHarvesters && totalTransporters >= maxTransporters){
	            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                               structure.energy >= 50;
                       }
               });

                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
	        }
	    }
	}
};

module.exports = roleBuilder;