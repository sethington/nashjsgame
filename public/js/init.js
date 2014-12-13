var Engine = require('./game/engine');

var Game = new Engine({
    canvas: document.getElementById('c')
});

var Level = require('./game/entities/level');
var CollectAllTreasure = require('./game/components/collect-all-treasure');

Game.start = function(){
    // should add a scene manager here for loading screens,
    // etc to invoke level load
    this.level = new Level([CollectAllTreasure], this);
    this.level.load('/public/js/game/levels/level', function(){
        Game.run();
    });

    this.timeStarted = Date.now();
    this.timeFinished = this.timeStarted;
    this.playing = true;
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

Game.endGame = function(){
    if (this.playing){
        this.playing = false;
        this.timeFinished = Date.now();
    }
};

Game.calcGameTime = function(){
    if (!this.playing){
        return (this.timeFinished-this.timeStarted) / 1000;
    }
    return (Date.now() - this.timeStarted) / 1000;
};

Game.start();

window.Game = Game;
