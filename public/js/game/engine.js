var utils = require('./utils');

var Engine = function(options){
    this.options = options;
    this._canvas = options.canvas;
    this._canvas.width  = 64 * 32;
    this._canvas.height  = 48 * 32
    this._ctx = this._canvas.getContext('2d')

    this.entities = {};
    this.time = Date.now();
};

Engine.prototype = {
    render: function(){
      throw new Error('You must implement a render method in your game class.');
    },

    tick: function(){
      throw new Error('You must implement a tick method in your game class.');
    },

    stop: function(){
      throw new Error('You must implement a stop method in your game class.');
    },


    run: function(){
        // loop
        var self = this,
            now,
            fps = 60,
            delta = 0,
            last = utils.timestamp(),
            slow = 1, // slow motion scaling factor
            step = 1 / fps,
            slowStep = slow * step,
            fpsmeter = new FPSMeter({
                decimals: 0,
                graph: true,
                theme: 'dark',
                left: '5px'
            });

        function frame() {
          // Start measuring the time it takes to render a frame
          fpsmeter.tickStart();

          // store the current frame time
          now = utils.timestamp();

          // calculate the delta between the last frame time and this frame
          delta = delta + Math.min(1, (now - last) / 1000);

          while(delta > slowStep) {
            delta = delta - slowStep;
            self.tick(step);
          }

          // render our game objects
          // passing in the calcualted delta offset for rendering
          
          self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);
          self.render(self._ctx, delta / slow);

          // store the frametime for the next tick
          last = now;

          // mark this frame as complete
          fpsmeter.tick();

          // do the loop all over again
          requestAnimationFrame(frame);
        }

        // kick off the render / update loop
        requestAnimationFrame(frame);
    },

    getEntitiesByType: function(type){
      return this.entities[type];
    },

    t2p: function(t){
        return t * 32;
    },

    p2t: function(p){
      return Math.floor(p / 32);
    },

    cell: function(x,y){
      return this.tcell(this.p2t(x), this.p2t(y));
    },

    tcell: function(tx,ty) {
      return this.cells[tx + (ty * 64)];
    }
};

module.exports = Engine;
