import { Vector3, MathUtils } from 'three';
import { Particle } from './Particle';

export function createCollection<T extends Particle>(
    count: number,
    positionBounds: { min: Vector3; max: Vector3 },
    speedBounds?: { min: Vector3; max: Vector3 },
    accelerationBounds?: { min: Vector3; max: Vector3 }
): T[] {
    const particles: T[] = [];

    for (let i = 0; i < count; i++) {
        const position = new Vector3(
            MathUtils.randFloat(positionBounds.min.x, positionBounds.max.x),
            MathUtils.randFloat(positionBounds.min.y, positionBounds.max.y),
            MathUtils.randFloat(positionBounds.min.z, positionBounds.max.z)
        );

        const speed = speedBounds
            ? new Vector3(
                MathUtils.randFloat(speedBounds.min.x, speedBounds.max.x),
                MathUtils.randFloat(speedBounds.min.y, speedBounds.max.y),
                MathUtils.randFloat(speedBounds.min.z, speedBounds.max.z)
            )
            : undefined;

        const acceleration = accelerationBounds
            ? new Vector3(
                MathUtils.randFloat(accelerationBounds.min.x, accelerationBounds.max.x),
                MathUtils.randFloat(accelerationBounds.min.y, accelerationBounds.max.y),
                MathUtils.randFloat(accelerationBounds.min.z, accelerationBounds.max.z)
            )
            : undefined;

    }

    return particles;
}
