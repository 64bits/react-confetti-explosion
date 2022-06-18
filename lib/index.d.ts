interface IConfetti {
    particleCount?: number;
    duration?: number;
    colors?: string[];
    particleSize?: number;
    force?: number;
    floorHeight?: number;
    floorWidth?: number;
}
declare function ConfettiExplosion({ particleCount, duration, colors, particleSize, force, floorHeight, floorWidth }: IConfetti): JSX.Element;
export default ConfettiExplosion;
