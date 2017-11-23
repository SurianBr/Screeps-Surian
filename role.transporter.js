var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

      // se tiver carregando < que 50 energy, vai pegar mais
      if (creep.carry.energy < 50){
        creep.memory.carring = false;
      }


      if(!creep.memory.carring) {
          var flag = _.filter(creep.room.find(FIND_FLAGS), (flag) => flag.name == creep.memory.flag);

          if(creep.pos.isEqualTo(flag[0].pos)){
            var source = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (source != undefined){
              creep.pickup(source)
              if (creep.carry.energy == creep.carryCapacity)
                creep.memory.carring = true;
            }

          } else{
            creep.moveTo(flag[0]);
          }

      } else {

        // se não tem um alvo para guardar a energy, procura o mais proximo
        if(!creep.memory.targetFound){
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                  structure.energy < structure.energyCapacity;
              }
            });

          if (targets.length > 0){
            var spawnStorage = creep.pos.findClosestByPath(targets);

            creep.memory.targetFound = true;
            creep.memory.targetId = spawnStorage.id;
          }

        // deposita energy
        } else {

          var spawnStorage = Game.getObjectById(creep.memory.targetId);

          if(creep.transfer(spawnStorage, RESOURCE_ENERGY) == OK ||
              creep.transfer(spawnStorage, RESOURCE_ENERGY) == ERR_FULL) {
            creep.memory.targetFound = false;

          } else if (creep.transfer(spawnStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(spawnStorage);
          }
        }
      }
    }
};

module.exports = roleTransporter;
