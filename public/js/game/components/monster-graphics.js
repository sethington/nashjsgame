var Component = require('./component');

var MonsterGraphicsComponent = Component.extend({
    render: function(entity, ctx, delta){
        ctx.fillStyle = '#2e777a';
        if (!entity.dead){
            ctx.fillRect(entity.x + (entity.dx * delta),
                         entity.y + (entity.dy * delta), 32, 32);
        }
    }
});


module.exports = new MonsterGraphicsComponent();

