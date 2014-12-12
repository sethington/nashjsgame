var Utils = require('../utils');
var Class = require('../core/class');
var Entity = Class.extend({

    init: function(components, engine, obj){
        this.engine    = engine;
        this.components = components;

        if(obj){

            this.x = obj.x;
            this.y = obj.y;
            this.type = obj.type;
            this.gravity = 32 * (obj.properties.gravity || 9.8 * 6);
            this.maxdx = 32 * (obj.properties.maxdx   || 15);
            this.maxdy = 32 * (obj.properties.maxdy   || 60);
            this.impulse = 32 * (obj.properties.impulse || 1500);

            this.accel = this.maxdx / (obj.properties.accel    || 1/2);
            this.friction = this.maxdx / (obj.properties.friction || 1/6);

            this.left = obj.properties.left;
            this.right = obj.properties.right;
            this.start = { x: obj.x, y: obj.y };
        }

        this.dx = 0;
        this.dy = 0;

        this.killed = 0;
        this.collected = 0;
        
        var self = this;

        this.components.forEach(function(component){
            component.setup(self);
        });
    },

    publish: function(message){
        this.components.forEach(function(component){
            component.receive(this, message);
        });
    },

    render: function(ctx, delta){
        var entity = this;

        this.components.forEach(function(component){
            component.render(entity, ctx, delta);
        });
    },

    tick: function(step){
        var entity = this,
            wasleft    = entity.dx  < 0,
            wasright   = entity.dx  > 0,
            falling    = entity.falling,
            friction   = entity.friction * (falling ? 0.5 : 1),
            accel      = entity.accel    * (falling ? 0.5 : 1);

        if (entity.type != 'treasure'){
            entity.ddx = 0;
            entity.ddy = entity.gravity;
          
            if (entity.left)
              entity.ddx = entity.ddx - accel;
            else if (wasleft)
              entity.ddx = entity.ddx + friction;
          
            if (entity.right)
              entity.ddx = entity.ddx + accel;
            else if (wasright)
              entity.ddx = entity.ddx - friction;
          
            if (entity.jump && !entity.jumping && !falling) {
              entity.ddy = entity.ddy - entity.impulse; // an instant big force impulse
              entity.jumping = true;
            }
          
            entity.x  = entity.x  + (step * entity.dx);
            entity.y  = entity.y  + (step * entity.dy);
            entity.dx = Utils.bound(entity.dx + (step * entity.ddx), -entity.maxdx, entity.maxdx);
            entity.dy = Utils.bound(entity.dy + (step * entity.ddy), -entity.maxdy, entity.maxdy);
          
            if ((wasleft  && (entity.dx > 0)) ||
                (wasright && (entity.dx < 0))) {
              entity.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
            }
          
            var tx        = this.engine.p2t(entity.x),
                ty        = this.engine.p2t(entity.y),
                nx        = entity.x % 32,
                ny        = entity.y % 32,
                cell      = this.engine.tcell(tx, ty),
                cellright = this.engine.tcell(tx + 1, ty),
                celldown  = this.engine.tcell(tx, ty + 1),
                celldiag  = this.engine.tcell(tx + 1, ty + 1);
          
            if (entity.dy > 0) {
              if ((celldown && !cell) ||
                  (celldiag && !cellright && nx)) {
                entity.y = this.engine.t2p(ty);
                entity.dy = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;
              }
            }
            else if (entity.dy < 0) {
              if ((cell      && !celldown) ||
                  (cellright && !celldiag && nx)) {
                entity.y = this.engine.t2p(ty + 1);
                entity.dy = 0;
                cell      = celldown;
                cellright = celldiag;
                ny        = 0;
              }
            }
          
            if (entity.dx > 0) {
              if ((cellright && !cell) ||
                  (celldiag  && !celldown && ny)) {
                entity.x = this.engine.t2p(tx);
                entity.dx = 0;
              }
            }
            else if (entity.dx < 0) {
              if ((cell     && !cellright) ||
                  (celldown && !celldiag && ny)) {
                entity.x = this.engine.t2p(tx + 1);
                entity.dx = 0;
              }
            }

            if (entity.type === 'monster') {
              if (entity.left && (cell || !celldown)) {
                entity.left = false;
                entity.right = true;
              }      
              else if (entity.right && (cellright || !celldiag)) {
                entity.right = false;
                entity.left  = true;
              }
            }
          
            entity.falling = ! (celldown || (nx && celldiag));
        }

        this.components.forEach(function(component){
            component.tick(entity, step);
        });
    }
});

module.exports = Entity;
