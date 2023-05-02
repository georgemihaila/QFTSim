import { Vector3 } from "three";

export class Coob {
    public ref: any
    public speed: Vector3 = new Vector3(0, 0, 0)
    public rotation: Vector3 = new Vector3(0, 0, 0)
    constructor(
        public position: Vector3,
        public acceleration: Vector3 = new Vector3(0.0, 0.0, 0),
        public rotationSpeed: Vector3 = new Vector3(0, 0, 0),
        public rotationAcceleration: Vector3 = new Vector3(Math.random() * 0.01, Math.random() * 0.001 - 0.0005, Math.random() * 0.01),
        public speedLimit: number = 0.01,
        public isAccelerating: boolean = true,
    ) {

    }

    public tick() {
        const ml = Math.sqrt(this.rotationSpeed.lengthSq())
        if (ml < -0.01)
            this.isAccelerating = true
        if (ml > 0.01)
            this.isAccelerating = false
        if (ml > this.speedLimit) {
            this.rotationSpeed.normalize()
            this.rotationSpeed.multiplyScalar(this.speedLimit)
        }


        if (this.isAccelerating) {
            this.rotationSpeed.add(this.rotationAcceleration)
            this.rotation.add(this.rotationSpeed)
        }
        else {
            this.rotationSpeed.sub(this.rotationAcceleration)
            this.rotation.sub(this.rotationSpeed)
        }

        this.speed.add(this.acceleration)
        this.position.add(this.speed)

        if (this.ref) {
            this.ref.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
            this.ref.position.set(this.position.x, this.position.y, this.position.z)
        }
    }
}