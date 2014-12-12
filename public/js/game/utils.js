module.exports = {
    timestamp: function() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    },

    loadImage: function(src, callback) {
        var img = document.createElement('img');
        
        img.addEventListener('load', function() { callback(img); } , false);
        img.src = src;
    },

    loadImages: function(names, callback) {
        var n, name,
            result = {},
            count  = names.length;

        for(n = 0 ; n < names.length ; n++) {
            name = names[n];
            result[name] = document.createElement('img');

            result[name].addEventListener('load', function(){
                if (--count == 0) {
                    callback(result);
                }
            });

            result[name].src = name;
        }
    },

    loadJSON: function(url, onsuccess) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if ((request.readyState == 4) && (request.status == 200))
          onsuccess(JSON.parse(request.responseText));
      }
      request.open("GET", url + ".json", true);
      request.send();
    },

    bound: function(x, min, max) {
        return Math.max(min, Math.min(max, x));
    },

    collides: function(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(((x1 + w1 - 1) < x2) ||
                ((x2 + w2 - 1) < x1) ||
                ((y1 + h1 - 1) < y2) ||
                ((y2 + h2 - 1) < y1))
    }
}
