var GameOverScreen = function(){
    this.title = 'Game Over';
    this.x = this.y = 160;
};


GameOverScreen.prototype.setContext = function(ctx){
    this.ctx = ctx;
};

GameOverScreen.prototype.tick = function(delta) {
    this.x += Math.sin(Date.now() / 200 * 2.5);
    this.y += Math.cos(Date.now() / 200 * 2.5);
};

GameOverScreen.prototype.render = function() {
    this.ctx.font='60px Verdana';
    this.ctx.fillText(this.title, this.y, this.x);
    
    this.ctx.font='24px Verdana';
    this.ctx.fillText('you lose.', this.y + 50, this.x + 50);
};

module.exports = GameOverScreen;
