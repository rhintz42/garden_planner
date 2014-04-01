/*
    * Should have Object class that contains _geometry, _material, and _obj
        that all objects inherit from
*/
function Plant(x, y, z) {
    var _geometry,
        _material,
        _obj;

    this.init = function(x, y, z) {
        _geometry = new THREE.CubeGeometry(50,50,50);
        _material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        _obj = new THREE.Mesh( _geometry, _material );

        this.setPosition(x, y, z);
    }

    this.getObj = function() {
        return _obj;
    }

    this.animate = function() {
        _obj.rotation.x += 0.01;
        _obj.rotation.y += 0.01;
    }

    this.setX = function(x) {
        _obj.position.setX(x);
    }

    this.setY = function(y) {
        _obj.position.setY(y);
    }

    this.setZ = function(z) {
        _obj.position.setZ(z);
    }

    this.setPosition = function(x, y, z) {
        _obj.position.set(x, y, z);
    }

    this.init(x, y, z);
}
