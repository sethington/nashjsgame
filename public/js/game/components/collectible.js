var Component = require('./component');
var Utils = require('../utils');

var Collectible = Component.extend({
    setup: function(entity){
        entity.collected = 0;
    },

    tick: function(entity, step){
        var player = entity.engine.getEntitiesByType('player')[0];

        if (!entity.collected && Utils.collides(player.x, player.y, 32, 32,
                                               entity.x, entity.y, 32, 32)){
            player.collected++;
            entity.collected = true;
        }
    }
});


module.exports = new Collectible();
