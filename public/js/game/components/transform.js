var Component = require('./component');

var TransformComponent = Component.extend({

    setup: function(entity){
        entity.x = entity.x || 0;
        entity.y = entity.y || 0;
    },

    tick: function(entity, step){

    }
});

module.exports = new TransformComponent();
