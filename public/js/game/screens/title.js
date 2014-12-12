var TitleScreen = function(){
    this.title = 'Start Game';
    this.x = this.y = 160;
    this.remaining = 600;
};

TitleScreen.prototype.setContext = function(ctx){
    this.ctx = ctx;
};

TitleScreen.prototype.tick = function(delta) {
    this.x += Math.sin(Date.now() / 200 * 2.5);
    this.y += Math.cos(Date.now() / 200 * 2.5);

    this.remaining--;
};

TitleScreen.prototype.render = function(delta) {
    this.ctx.font='30px Verdana';
    this.ctx.fillText(this.title, this.y, this.x);

    this.ctx.fillText((this.remaining / 60).toFixed(2) + ' seconds remaining', 150, 100);
};

module.exports = TitleScreen;
