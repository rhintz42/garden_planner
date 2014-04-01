function Terrain() {
    var _geometry,
        _material,
        _lines,
        _obj;

    this.init = function() {
        var size = 500, step = 50;
        var i;

        _geometry = new THREE.Geometry();

        for (i = - size; i <= size; i += step) {
            _geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
            _geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

            _geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
            _geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
        }

        _material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );

        _lines = new THREE.Line( _geometry, _material );
        _lines.type = THREE.LinePieces;
        
        
        _obj = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshBasicMaterial() );
        _obj.rotation.x = - Math.PI / 2;
        _obj.visible = false;
    }

    this.getObj = function() {
        return _obj;
    }

    this.getLines = function() {
        return _lines;
    }

    this.init();
}
