function GardenPlanner() {
    var _environment;

    this.init = function() {
        _environment = new Environment();
        _objects = [];
    }

    this.getEnvironment = function() {
        return _environment;
    }

    this.addPlant = function(x, y, z) {
        _environment.addPlant(x, y, z);
    }

    this.init();
}
