
import 'reflect-metadata';

const descriptionMetadataKey = Symbol('Description');

export function Description(desc: string) {
    return Reflect.metadata(descriptionMetadataKey, desc);
}

export function getDescription(target: any, propertyKey: string) {
    return Reflect.getMetadata(descriptionMetadataKey, target, propertyKey);
}
