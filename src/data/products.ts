import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShield, faBolt, faMicrochip, faWind, faGlobe } from '@fortawesome/free-solid-svg-icons';

export interface Product {
    title: string;
    description: string;
    href: string;
    colorClass: string;
    icon: IconDefinition;
}

export const products: Product[] = [
    {
        title: "Phoenix",
        description: "The ultimate network management suite for security, ranks, and staff tools.",
        href: "/Phoenix/Introduction",
        colorClass: "bg-primary",
        icon: faShield,
    },
    {
        title: "Bolt",
        description: "High-performance PvP practice plugin with advanced ELO and match tracking.",
        href: "/Bolt/Introduction",
        colorClass: "bg-primary",
        icon: faBolt,
    },
    {
        title: "Carbon",
        description: "Optimized Minecraft server fork for superior performance and stability.",
        href: "/Carbon/Introduction",
        colorClass: "bg-primary",
        icon: faMicrochip,
    },
    {
        title: "Zephyr",
        description: "Simple and modern FFA plugin.",
        href: "/Zephyr/Introduction",
        colorClass: "bg-primary",
        icon: faWind,
    },

];
