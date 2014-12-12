var Component = require('./component');

var PlayerGraphicsComponent = Component.extend({
    render: function(entity, ctx, delta){

        ctx.fillStyle = '#ECD078';
        ctx.fillRect(entity.x + (entity.dx * delta), entity.y + (entity.dy * delta), 32, 32);

        var n, max;

        // draw the score
        ctx.fillStyle = 'gold';
        for(n = 0, max = entity.collected ; n < max ; n++){
            ctx.fillRect(entity.engine.t2p(2 + n), entity.engine.t2p(2), 32/2, 32/2);
        }

        ctx.fillStyle = '#53777A';
        for(n = 0, max = entity.killed ; n < max ; n++) {
            ctx.fillRect(entity.engine.t2p(2 + n), entity.engine.t2p(3), 32/2, 32/2);
        }
    }
});


module.exports = new PlayerGraphicsComponent();
