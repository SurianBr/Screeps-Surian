var tower = {

  /** @param {Creep} creep **/
  run: function(room) {
    var hostiles = room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      var towers = room.find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
     towers.forEach(tower => tower.attack(hostiles[0]));
    }
  }
}
module.exports = tower;
