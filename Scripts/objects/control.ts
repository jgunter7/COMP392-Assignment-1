module objects {
	export class Control {
		rotationSpeed: number;
		rotationToggle: boolean;
		constructor(rotationSpeed: number, rotationToggle: boolean) {
			this.rotationSpeed = rotationSpeed;
			this.rotationToggle = rotationToggle;
		}
	}
}
