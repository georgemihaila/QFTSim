import { Vector3 } from 'three';
import { _3DCoordinateSystem } from "./_3DCoordinateSystem";
import { createCollection } from '../physics';

const randomParticles = createCollection(100,
    { min: new Vector3(0, 0, 0), max: new Vector3(2, 2, 2) },
    {
        min: new Vector3(-0.1, 0.1, -0.1),
        max: new Vector3(0.1, 0.1, 0.1)
    })
