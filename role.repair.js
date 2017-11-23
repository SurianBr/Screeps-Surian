var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;

	    }
	    
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;

	    }
	    
	    if(creep.memory.repairing) {

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
        });
    
        console.log(targets.length);

        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

	    } else {

	        if (totalHarvester >= maxHarvesters && totalTransporters >= maxTransporters){
	            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN) &&
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

module.exports = roleRepair;
