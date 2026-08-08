import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShield, faBolt, faMicrochip, faWind } from '@fortawesome/free-solid-svg-icons';

export interface ProductLink {
    label: string;
    href: string;
}

export interface Product {
    title: string;
    description: string;
    href: string;
    colorClass: string;
    icon: IconDefinition;
    /** The pages people actually open first, surfaced on the card so the landing
     *  page is a way into the docs rather than a table of contents for itself. */
    links: ProductLink[];
}

export const products: Product[] = [
    {
        title: "Phoenix",
        description: "Network management suite for security, ranks, punishments, and staff tools.",
        href: "/Phoenix/Introduction",
        colorClass: "bg-primary",
        icon: faShield,
        links: [
            { label: "Installation", href: "/Phoenix/Installation" },
            { label: "Commands", href: "/Phoenix/Commands" },
            { label: "Ranks", href: "/Phoenix/Features/Ranks" },
            { label: "Punishments", href: "/Phoenix/Features/Punishments" },
            { label: "API", href: "/Phoenix/Features/API" },
        ],
    },
    {
        title: "Bolt",
        description: "PvP practice core with queues, duels, tournaments, ELO, and arena management.",
        href: "/Bolt/Introduction",
        colorClass: "bg-primary",
        icon: faBolt,
        links: [
            { label: "Commands & Permissions", href: "/Bolt/CommandsAndPermissions" },
            { label: "Arenas", href: "/Bolt/Features/Arenas" },
            { label: "Kits", href: "/Bolt/Features/Kits" },
            { label: "Queues", href: "/Bolt/Features/Queues" },
            { label: "API", href: "/Bolt/Features/API" },
        ],
    },
    {
        title: "Carbon",
        description: "Optimized Minecraft server fork for superior performance and stability.",
        href: "/Carbon/Introduction",
        colorClass: "bg-primary",
        icon: faMicrochip,
        links: [
            { label: "Installation", href: "/Carbon/Installation" },
            { label: "Commands", href: "/Carbon/Commands" },
            { label: "API", href: "/Carbon/Features/API" },
            { label: "FastAsyncWorldEdit", href: "/Carbon/Forks/FastAsyncWorldEdit" },
        ],
    },
    {
        title: "Zephyr",
        description: "Simple and modern FFA plugin with arenas, kits, and leaderboards.",
        href: "/Zephyr/Introduction",
        colorClass: "bg-primary",
        icon: faWind,
        links: [
            { label: "Arenas", href: "/Zephyr/Setup/Arenas" },
            { label: "Kits", href: "/Zephyr/Setup/Kits" },
            { label: "Leaderboards", href: "/Zephyr/Features/Leaderboards" },
            { label: "Permissions", href: "/Zephyr/Permissions" },
        ],
    },
];
