import { Object3D, Event, Camera } from "three";
import { IRenderable } from './IRenderable'
import * as THREE from "three"
import { I3DObject } from "./I3DObject";

const DEFAULT_MIN_DOMAIN = 0
const DEFAULT_MAX_DOMAIN = 10

export interface ICoordinateSystemProps {
    minDomain: number
    maxDomain: number
    enabled: boolean
}

export class _3DCoordinateSystem implements I3DObject, ICoordinateSystemProps {
    constructor({ minDomain, maxDomain, enabled }: Partial<ICoordinateSystemProps> = {}) {
        this.minDomain = minDomain ?? DEFAULT_MIN_DOMAIN
        this.maxDomain = maxDomain ?? DEFAULT_MAX_DOMAIN
        this.enabled = enabled ?? true
    }
    public minDomain: number = DEFAULT_MIN_DOMAIN;
    public maxDomain: number = DEFAULT_MAX_DOMAIN;
    public enabled: boolean = true;

    update(camera: Camera): void {
    }

    create(): Object3D<Event> | Object3D<Event>[] {
        const axes = this.getAxes()
        const material = new THREE.LineBasicMaterial({ color: 0xf0000f })
        const geometry = new THREE.BufferGeometry().setFromPoints(axes)
        const line = new THREE.Line(geometry, material)
        //Draw arrow tips
        const arrowX = this.getArrowTip(this.getAxisX())
        const arrowY = this.getArrowTip(this.getAxisY())
        const arrowZ = this.getArrowTip(this.getAxisZ())
        return [
            line,
            arrowX,
            arrowY,
            arrowZ
        ]
    }

    getArrowTip = (axis: THREE.Vector3) => {
        const material = new THREE.MeshBasicMaterial({ color: 0xf0000f })
        const geometry = new THREE.ConeGeometry(0.1, 0.3, 32)
        const cone = new THREE.Mesh(geometry, material)
        cone.position.copy(axis)
        //Rotate cone to point in the direction of the axis
        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.clone().normalize())
        cone.applyQuaternion(quaternion)

        return cone
    }

    getOrigin = () => new THREE.Vector3(this.minDomain, this.minDomain, this.minDomain)
    getAxisX = () => new THREE.Vector3(this.maxDomain, this.minDomain, this.minDomain)
    getAxisY = () => new THREE.Vector3(this.minDomain, this.maxDomain, this.minDomain)
    getAxisZ = () => new THREE.Vector3(this.minDomain, this.minDomain, this.maxDomain)
    getAxes = () => [
        this.getOrigin(),
        this.getAxisX(),
        this.getOrigin(),
        this.getAxisY(),
        this.getOrigin(),
        this.getAxisZ()
    ]
}