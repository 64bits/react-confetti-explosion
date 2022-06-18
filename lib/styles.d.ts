export interface IStyleClasses {
    container: string;
    particle: string;
}
export interface IParticle {
    color: string;
    degree: number;
}
interface IParticlesProps {
    particles: IParticle[];
    duration: number;
    particleSize: number;
    force: number;
    floorHeight: number;
    floorWidth: number;
}
declare const useStyles: ({ particles, duration, floorHeight, floorWidth, force, particleSize }: IParticlesProps) => (props?: any) => Record<"container" | "particle" | "@keyframes y-axis", string>;
export default useStyles;
