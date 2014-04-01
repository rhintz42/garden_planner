// This functions gives us the ability to subclass
function extend(baseClass, subClass) {
    var prototype = new Function();
    prototype.prototype = baseClass.prototype;
    subClass.prototype = new prototype();
    subClass.prototype.subClass = subClass;
}
