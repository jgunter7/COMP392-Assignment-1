var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationSpeed, rotationToggle) {
            this.colourChangeMgr = 0;
            this.rotationSpeed = rotationSpeed;
            this.rotationToggleX = rotationToggle;
            this.rotationToggleY = rotationToggle;
            this.rotationToggleZ = rotationToggle;
        }
        Control.prototype.changeColour = function () {
            group.remove(cube3);
            group.remove(cube8);
            group.remove(cube9);
            switch (this.colourChangeMgr) {
                case 0:
                    cube3.material = new LambertMaterial({ color: 0xffee66 });
                    cube8.material = new LambertMaterial({ color: 0xffee66 });
                    cube9.material = new LambertMaterial({ color: 0xffee66 });
                    break;
                case 1:
                    cube3.material = new LambertMaterial({ color: 0xfbb666 });
                    cube8.material = new LambertMaterial({ color: 0xfbb666 });
                    cube9.material = new LambertMaterial({ color: 0xfbb666 });
                    break;
                case 2:
                    cube3.material = new LambertMaterial({ color: 0xf00556 });
                    cube8.material = new LambertMaterial({ color: 0xf00556 });
                    cube9.material = new LambertMaterial({ color: 0xf00556 });
                    break;
                case 3:
                    cube3.material = new LambertMaterial({ color: 0x000ff9 });
                    cube8.material = new LambertMaterial({ color: 0x000ff9 });
                    cube9.material = new LambertMaterial({ color: 0x000ff9 });
                    break;
                default:
                    this.colourChangeMgr = 0;
                    break;
            }
            this.colourChangeMgr++;
            if (this.colourChangeMgr == 4) {
                this.colourChangeMgr = 0;
            }
            group.add(cube3);
            group.add(cube8);
            group.add(cube9);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map