var Entity = require('./entity');
var Utils = require('../utils');
var EntityFactory = require('./entity-factory');

var Level = Entity.extend({

    init: function(components, engine, obj){
        this.COLORS = [
            '#76e461',
            '#895f33',
            '#7b243a',
            '#30213b',
            '#1a888d'
        ];

        this._parent(components, engine, obj);
    },

    setup: function(map) {
        var data = map.layers[0].data,
        objects = map.layers[1].objects,
        n, obj, entity;

        for(n = 0 ; n < objects.length ; n++) {
            obj = objects[n];
            EntityFactory.create(obj.type, this.engine, obj);
        }
        this.engine.cells = data;
        this.engine.entities['level'] = [this];
    },

    render: function(ctx) {
        var x, y, cell;

        for(y = 0 ; y < 48 ; y++) {
            for(x = 0 ; x < 64 ; x++) {
                cell = this.engine.tcell(x, y);
                if (cell) {
                    ctx.fillStyle = this.COLORS[cell - 1];
                    ctx.fillRect(x * 32, y * 32, 32, 32);
                }
            }
        }
    },

    load: function(path, callback){
        var self = this;
        Utils.loadJSON(path, function(map){
            self.setup(map);
            callback();
        });
    }
});


module.exports = Level;
