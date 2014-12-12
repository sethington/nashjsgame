var Class = require('../core/class');

var Component = Class.extend({
    
    init: function(){},

    setup: function(entity){},

    tick: function(entity, step){},

    render: function(ctx, delta){},

    publish: function(entity, message){
        entity.publish(message);
    },

    receive: function(entity, message){}
});

module.exports = Component;
