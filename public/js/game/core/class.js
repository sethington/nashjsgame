var se = {};

var initializing = false, fnTest = /xyz/.test(function() { xyz; }) ? /\b_parent\b/ : /.*/;
// The base Class implementation (does nothing)
se.Class = function() {};

// Create a new Class that inherits from this class
se.Class.extend = function(prop) {
    var _parent = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for(var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" && typeof _parent[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
            return function() {
                var tmp = this._parent;

                // Add a new ._parent() method that is the same method
                // but on the parent-class
                this._parent = _parent[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._parent = tmp;

                return ret;
            };
        })(name, prop[name]) : prop[name];
    }

    // The dummy class constructor
    function Class() {
        if(!initializing){
            //if singleton, only allow one instance of this class               
            if(this.singleton){
                var instance = this.singleton.apply(this, arguments);
                if (instance) {
                    return instance;
                }
            }
            
            if(this.init){
                this.init.apply(this, arguments);
            }
        }
            
        return this;
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
};


module.exports = se.Class;
