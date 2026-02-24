import type { IUser } from "@/types/user";
interface HeroContentProps {
    user: IUser;
    showCTA?: boolean;
    className?: string;
}
export declare function HeroContent({ user, showCTA, className, }: HeroContentProps): import("react/jsx-runtime").JSX.Element;
export {};
