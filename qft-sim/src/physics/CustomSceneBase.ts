import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Color, DirectionalLight, Euler, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer } from "three";
import { I3DObject, ICustomScene } from '../infra';

export abstract class CustomSceneBase implements ICustomScene {
    protected _renderer = new WebGLRenderer()
    protected _scene = new Scene()
    protected _camera: PerspectiveCamera
    protected _initialCameraPosition: Vector3
    protected _initialCameraLookAt: Vector3
    protected _initialCameraRotation: Euler
    protected _controls: OrbitControls
    protected _raycaster: Raycaster = new Raycaster();
    protected _mouse: Vector2 = new Vector2(0, 0);
    _trackedObject: THREE.Object3D | null = null
    _trackObjects = false
    private sunLight?: DirectionalLight;
    private sunMesh?: Mesh;

    constructor(
        protected _3dObjects: I3DObject[]
    ) {
        this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        this._camera.position.x = 15
        this._camera.position.y = 15
        this._camera.position.z = 15
        this._camera.lookAt(5, 5, 5)

        this._initialCameraPosition = this._camera.position.clone()
        this._initialCameraLookAt = this._camera.getWorldDirection(new Vector3()).clone()
        this._initialCameraRotation = this._camera.rotation.clone()

        this._renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._renderer.domElement)

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)
        this._scene.fog = new THREE.Fog(0x111111, 0.4, 50)
        this._scene.add(...this._3dObjects.filter(x => x.enabled).map(x => x.create()).flat())
        window.addEventListener('resize', this._onWindowResize, false)
        window.addEventListener('click', this._onMouseClick, false);
        window.addEventListener('keydown', this._onKeyDown, false);

        this.createSun();
    }

    private _onMouseClick(event: MouseEvent) {
        event.preventDefault();
        if (!this._mouse)
            return;

        // Calculate the mouse position in normalized device coordinates (-1 to +1) for both components
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this._raycaster.setFromCamera(this._mouse, this._camera);

        // Find intersected objects
        const intersects = this._raycaster.intersectObjects(this._scene.children, true);

        if (intersects.length > 0) {
            // If an object was clicked, set it as the tracked object
            this._trackedObject = intersects[0].object;
            console.log("Clicked on object: " + this._trackedObject.name);
        } else {
            // If the user clicked away from objects, stop tracking
            this._trackedObject = null;
            console.log("Clicked on empty space");
        }
    }

    private _onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // If the user presses Escape, stop tracking
            this._trackedObject = null;
        }
    }

    private createSun(): void {
        const sunColor = new Color(0xffeeee);
        const sunPosition = new Vector3(20, 20, 20);

        // Create directional light to simulate sunlight
        this.sunLight = new DirectionalLight(sunColor, 5);
        this.sunLight.position.copy(sunPosition);
        this.sunLight.castShadow = true;
        this._scene.add(this.sunLight);

        // Create a sphere geometry to represent the sun
        const sunGeometry = new SphereGeometry(2, 10, 32);
        const sunMaterial = new MeshStandardMaterial({ color: sunColor });
        this.sunMesh = new Mesh(sunGeometry, sunMaterial);
        this.sunMesh.position.copy(sunPosition);
        this._scene.add(this.sunMesh);
    }
    public render = (): void => {
        this._renderer.render(this._scene, this._camera)
        this._3dObjects.filter(x => x.enabled).forEach(x => x.update(this._camera))
    }
    public update = (): void => {
        requestAnimationFrame(this.update)
        this._controls.update()
        this.render()
        if (this._camera.position.y < 0.5) {
            // Set the camera's y position to the ground height
            this._camera.position.y = 0.5;
        }
    }

    _onWindowResize = (): void => {
        this._camera.aspect = window.innerWidth / window.innerHeight
        this._camera.updateProjectionMatrix()
        this._renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }
}

