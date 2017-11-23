var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransporter = require('role.transporter');
var respawn = require('respawn.creep');
var respawnSources = require('respawn.sources');
var roleRepair = require('role.repair');
var tower = require('tower');
var roleTowerTransporter = require('role.TowerTransporter');

module.exports.loop = function () {

    // Always place this memory cleaning code at the very top of your main loop!
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

  // numero de sources
  var sources = ["5873beb911e3e4361b4db5d1", "5873beb911e3e4361b4db5d2"];
  // numero de harvesters por source
  var harvestersNumber = [2,2];
  // bandeira de cada source para dropar energy
  var flag = ["Flag1", "Flag2"];
  // numero de transporters por source
  var transportersNumber = [3,3];
  // bandeira transporters
  var flagTransport = ["Carry1", "Carry2"];

  var creep;
  var harvesters;
  var transporters;
  var x;
  var maxHarvesters = 0;
  var totalHarvester = 0;
  var maxTransporters = 0;
  var totalTransporters = 0;
  var energyTotalCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;
  var havestersTotal =  _.filter(Game.creeps,(creep) => creep.memory.role == 'harvester');

  console.log("Total energy capacity: " + energyTotalCapacity);


    for(i = 0; i < sources.length; i++) {
        // pega numero de creeps por source
        creep = _.filter(Game.creeps,(creep) => creep.memory.source == sources[i]);
        harvesters = _.filter(creep, (creep2) => creep2.memory.role == 'harvester');
        transporters = _.filter(creep, (creep2) => creep2.memory.role == "transporter");

        // respawn de creeps
        respawnSources.run(energyTotalCapacity, harvesters, transporters, sources[i],
          harvestersNumber[i], transportersNumber[i], flag[i], flagTransport[i], havestersTotal);

        totalHarvester += harvesters.length;
        maxHarvesters += harvestersNumber[i];
        totalTransporters += transporters.length;
        maxTransporters += transportersNumber[i];

        x = 0;
        for(x; x < creep.length; x++) {
            if(creep[x].memory.role == 'harvester') {
                roleHarvester.run(creep[x], transporters.length);
            }
        }
    }


    // respawn creeps
    var builder =  _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
    var upgrader =  _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
    var repair =  _.filter(Game.creeps,(creep) => creep.memory.role == 'repair');
    var towerTransporters =  _.filter(Game.creeps,(creep) => creep.memory.role == 'towerTransporter');
    respawn.run(energyTotalCapacity, builder, upgrader, repair, towerTransporters,
      totalHarvester, totalTransporters, maxHarvesters, maxTransporters);


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }

        if(creep.memory.role == 'upgrader') {
           roleUpgrader.run(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters);
        }

        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters);
        }

        if(creep.memory.role == 'towerTransporter') {
            roleTowerTransporter.run(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters);
        }
        
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep, totalHarvester, totalTransporters, maxHarvesters, maxTransporters);
        }
    }

    // controla as torres
    //tower.run(Game.rooms.W48S48);

    console.log(Game.cpu.getUsed());
}
