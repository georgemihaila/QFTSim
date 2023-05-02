import { BoxGeometry, Camera, Mesh, MeshStandardMaterial, Object3D } from 'three';

export type Renderable =
    | Object3D
    | Object3D[]
    | Mesh
    | Mesh[]
    | (Mesh<BoxGeometry, MeshStandardMaterial>);

export interface IRenderable {
    /// Called by the renderer to update the object properties before rendering. This is where the object should update its position, rotation, etc. The camera is passed in so that the object can adjust its properties based on the camera position if needed
    update(camera: Camera): void;

    /// Called by the renderer to create the object and add it to the scene - the renderer abstracts away the camera, scene and lighting
    create(): Renderable;
}
