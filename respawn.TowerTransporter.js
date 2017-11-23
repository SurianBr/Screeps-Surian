var roleTowerTransporter = {

    /** @param {Creep} creep **/
    run: function(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters) {

	    if(creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;

	    } else if(!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.carrying = true;
	    }

      // se creep estiver cheio de enegia, vai regarregar a torre
      if(creep.memory.carrying) {

	        var tower = _.filter(creep.room.find(FIND_MY_STRUCTURES), (t) => t.structureType == STRUCTURE_TOWER && t.energy < t.energyCapacity
          );


            if(tower.length > 0) {
                if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0]);
                }
            }

      //se estiver vazio e se tiver todos os crreps criticos, busca energia
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

module.exports = roleTowerTransporter;