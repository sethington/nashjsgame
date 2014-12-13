var Component = require('./component');

var TimerGraphicsComponent = Component.extend({
    render: function(entity, ctx, delta){
        var diff = window.Game.calcGameTime(),
            seconds = Math.floor((diff%60));

        var clock = Math.floor((diff/60))+":"+(seconds<10?("0"+seconds):seconds);

        ctx.fillStyle = '#ffffff';
        ctx.font = "40pt Calibri";
        ctx.fillText(clock, entity.engine._canvas.width - 150, 100);
    }
});

module.exports = new TimerGraphicsComponent();

