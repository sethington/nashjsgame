var Component = require('./component');
var Utils = require('../utils');

var CollectAllTreasure = Component.extend({
    tick: function(entity, step){
        var treasure = entity.engine.getEntitiesByType('treasure');
        var player = entity.engine.getEntitiesByType('player')[0];

        if (player.collected === treasure.length){
            // emit a message that all of the treasure was collected
            // possibly load a new level
        }
    }
});


module.exports = new CollectAllTreasure();
