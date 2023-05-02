import {
    Object3D,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Color,
    CanvasTexture,
    Vector2,
    MeshStandardMaterial,
    Camera
} from 'three';
import { IRenderable } from './IRenderable';

export class Rectangle {
    position: Vector2;
    width: number;
    height: number;

    constructor(position: Vector2, width: number, height: number) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    contains(point: Vector2): boolean {
        return point.x >= this.position.x &&
            point.x <= this.position.x + this.width &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.height;
    }
}


export class BuildingBlock implements IRenderable {
    private objects: Object3D[];

    constructor(public enabled: boolean = true) {
        this.objects = [];
    }

    update(camera: Camera): void {
        // Update the background environment here, if needed.
    }

    create(): Object3D<Event>[] | Object3D<Event> | Object3D[] {
        const mainArea = new Rectangle(new Vector2(-16, -16), 32, 32);
        const restrictedArea = new Rectangle(new Vector2(-5, -5), 24, 24);
        this.generateBuildingBlock(mainArea, undefined, restrictedArea);

        return this.objects;
    }

    private generateBuildingBlock(
        area: Rectangle,
        numBuildings?: number,
        restrictedArea?: Rectangle
    ): void {
        const defaultNumBuildings = Math.floor(Math.sqrt(area.width * area.height));
        numBuildings = numBuildings || defaultNumBuildings;
        const buildingColor = new Color(0x8b4513);

        for (let i = 0; i < numBuildings; i++) {
            let buildingPosition: Vector2;

            do {
                buildingPosition = new Vector2(
                    area.position.x + Math.random() * area.width,
                    area.position.y + Math.random() * area.height
                );
            } while (restrictedArea && restrictedArea.contains(buildingPosition));

            const buildingHeight = Math.random() * 30;
            this.objects.push(
                this.generateBuilding(
                    buildingPosition,
                    1,
                    buildingHeight,
                    1,
                    buildingColor
                )
            );
        }
    }

    private generateBuilding(
        position: Vector2,
        width: number,
        height: number,
        depth: number,
        color: Color
    ): Object3D {
        const geometry = new BoxGeometry(width, height, depth);

        // Create a simple checkerboard pattern for the building texture.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        if (ctx) {
            ctx.fillStyle = color.getStyle();
            ctx.fillRect(0, 0, 64, 64);
            ctx.fillStyle = color.clone().offsetHSL(0, 0, -0.1).getStyle();
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillRect(32, 32, 32, 32);
        }

        const texture = new CanvasTexture(canvas);
        const material = new MeshStandardMaterial({ map: texture });

        const building = new Mesh(geometry, material);
        building.position.set(position.x, height / 2, position.y);

        return building;
    }
}
