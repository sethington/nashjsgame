var Engine = require('./game/engine');

var Game = new Engine({
    canvas: document.getElementById('c')
});

var Level = require('./game/entities/level');

Game.start = function(){
    // should add a scene manager here for loading screens,
    // etc to invoke level load
    this.level = new Level([], this);
    this.level.load('/public/js/game/levels/level', function(){
        Game.run();
    });
};

Game.tick = function(step){
    for(group in Game.entities){
        Game.entities[group].forEach(function(entity){
            entity.tick(step);
        });
    }
};

Game.render = function(ctx, delta){
    for(group in Game.entities){
        Game.entities[group].forEach(function(entity){
            entity.render(ctx, delta);
        });
    }
};

Game.start();

window.Game = Game;
