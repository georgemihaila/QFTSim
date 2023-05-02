import { Object3D, Event } from "three";
import { IRenderable } from './IRenderable'

export class _2DCoordinateSystem implements IRenderable {
    update(): void {
        throw new Error("Method not implemented.");
    }
    create(): Object3D<Event> | Object3D<Event>[] {
        throw new Error("Method not implemented.");
    }

}