function GardenPlanner() {
    var _environment;

    this.init = function() {
        _environment = new Environment();
        render();
    }

    this.getEnvironment = function() {
        return this._environment;
    }
    
    function render() {
        var self = this,
            environment = _environment,
            i,
            intersector;


        requestAnimationFrame(render);

        environment.animate();
        environment.setIntersectorCurrent();
        environment.setRolloverObj();

        environment.render();
        environment.updateStats();
    }

    this.init();
}
