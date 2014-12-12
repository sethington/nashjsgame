var Component = require('./component');
var Utils = require('../utils');


var Squishable = Component.extend({
    tick: function(entity, step){
        var player = entity.engine.getEntitiesByType('player')[0];

        if (!entity.dead) {
          if (Utils.collides(player.x, player.y, 32, 32,
                            entity.x, entity.y, 32, 32)) {

            if ((player.dy > 0) && (entity.y - player.y > 32/2)){
              this._killEntity(player, entity);
            }
            else {
              this._killPlayer(player);
            }
          }
        }
    },

    _killEntity: function(player, entity) {
        player.killed++;
        entity.dead = true;
    },

    _killPlayer: function (player) {
        player.x = player.start.x;
        player.y = player.start.y;
        player.dx = player.dy = 0;
    }
});


module.exports = new Squishable();
