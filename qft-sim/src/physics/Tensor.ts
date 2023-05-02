import * as THREE from 'three';

export class Tensor {
    private readonly data: THREE.Matrix3;

    constructor(data: THREE.Matrix3) {
        this.data = data;
    }

    public get(i: number, j: number): number {
        return this.data.elements[3 * i + j];
    }

    public set(i: number, j: number, value: number): void {
        this.data.elements[3 * i + j] = value;
    }
}
