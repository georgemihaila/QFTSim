import {
    Object3D,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Color,
    Vector2,
    MeshStandardMaterial,
    Camera
} from 'three';
import { BuildingBlock } from './BuildingBlock';
import { I3DObject } from './I3DObject';

export class City implements I3DObject {
    private BuildingBlock: BuildingBlock;
    private objects: Object3D[];
    public enabled: boolean;

    constructor() {
        this.BuildingBlock = new BuildingBlock();
        this.objects = [];
        this.enabled = true;
    }

    update(camera: Camera): void {
        if (this.enabled) {
            this.BuildingBlock.update(camera);
        }
    }

    create(): Object3D<Event>[] | Object3D<Event> | Object3D[] {
        const backgroundObjects = this.BuildingBlock.create();

        // Create a ground plane
        const groundGeometry = new PlaneGeometry(100, 100);
        const groundMaterial = new MeshStandardMaterial({
            color: new Color(0x101010),
            side: DoubleSide
        });
        const groundPlane = new Mesh(groundGeometry, groundMaterial);
        groundPlane.rotation.x = Math.PI / 2;
        groundPlane.position.y = 0;

        this.objects.push(groundPlane);
        this.objects = this.objects.concat(backgroundObjects);

        return this.objects;
    }
}
