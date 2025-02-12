declare type Rotate3dTransform = [number, number, number];
export declare const mapRange: (value: number, x1: number, y1: number, x2: number, y2: number) => number;
export declare const rotate: (degree: number, amount: number) => number;
export declare const coinFlip: () => boolean;
export declare const rotationTransforms: Rotate3dTransform[];
export declare const shouldBeCircle: (rotationIndex: number) => boolean;
export {};
