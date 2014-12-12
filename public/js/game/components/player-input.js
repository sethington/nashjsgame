var Component = require('./component');

var KEY = {
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

var PlayerInputComponent = Component.extend({
    setup: function(entity){
        function onkey(ev, key, down) {
            switch(key) {
              case KEY.LEFT:
                entity.left  = down;
                ev.preventDefault();
                return false;
              case KEY.RIGHT:
                entity.right = down;
                ev.preventDefault();
                return false;
              case KEY.SPACE:
                entity.jump = down;
                ev.preventDefault();
                return false;
              case KEY.UP:
                entity.jump = down;
                ev.preventDefault();
                return false;
            }
        };

        document.addEventListener('keydown', function(ev) {
            return onkey(ev, ev.keyCode, true);
        }, false);
        
        document.addEventListener('keyup', function(ev) {
                return onkey(ev, ev.keyCode, false);
        }, false);
    }
});


module.exports = new PlayerInputComponent();
