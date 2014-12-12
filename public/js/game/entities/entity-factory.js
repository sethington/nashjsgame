var Entity = require('./entity');
var Utils = require('../utils');

// Components

var PlayerInputComponent = require('../components/player-input');
var PlayerGraphicsComponent = require('../components/player-graphics');
var SquishableComponent = require('../components/squishable');
var Collectible = require('../components/collectible');
var MonsterGraphicsComponent = require('../components/monster-graphics');
var TreasureGraphicsComponent = require('../components/treasure-graphics');


var EntityFactory = function(){
    this.entityTypes = {
        player: [PlayerInputComponent, PlayerGraphicsComponent],
        monster: [SquishableComponent, MonsterGraphicsComponent],
        treasure: [Collectible, TreasureGraphicsComponent]
    }
};

EntityFactory.prototype.create = function(type, engine, obj){
    var entity = new Entity(this.entityTypes[type], engine, obj);

    if(engine.entities[obj.type] === undefined) {
        engine.entities[obj.type] = [];
    }
    engine.entities[obj.type].push(entity);

    return entity;
};

module.exports = new EntityFactory();


