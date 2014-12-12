var Component = require('./component');

var TreasureGraphicsComponent = Component.extend({
    render: function(entity, ctx, delta){
        ctx.fillStyle = 'gold';
        if (!entity.collected){
            ctx.fillRect(entity.x, entity.y + 32/3, 32, 32*2/3);
        }
    }
});


module.exports = new TreasureGraphicsComponent();
