import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
    title: "Refine Documentation",
    tagline: "Quality products without breaking the bank",
    favicon: "logo.png",

    url: "https://docs.refinedev.xyz",
    trailingSlash: true,
    baseUrl: "/",

    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.ts",
                    exclude: ["README.md", "**/_*", "Template"],
                    editUrl: (params) => `https://github.com/RefineDevelopment/Documentation/edit/master/${params.docPath}`
                },
                blog: false,
                theme: {
                    customCss: "./src/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        image: "banner.png",
        colorMode: {
            defaultMode: "dark",
            respectPrefersColorScheme: true
        },
        navbar: {
            title: "Refine Development",
            logo: {
                alt: "Refine Logo",
                src: "logo.png"
            },
            items: [
                {
                    to: "/",
                    position: "left",
                    label: "Home",
                    activeBaseRegex: "^/$"
                },
                {
                    to: "Phoenix/Introduction",
                    position: "left",
                    label: "Phoenix",
                    activeBaseRegex: "/Phoenix"
                },
                {
                    to: "Bolt/Introduction",
                    position: "left",
                    label: "Bolt",
                    activeBaseRegex: "/Bolt"
                },
                {
                    to: "CarbonSpigot/Introduction",
                    position: "left",
                    label: "CarbonSpigot",
                    activeBaseRegex: "/CarbotSpigot"
                },
                {
                    to: "Zephyr/Introduction/",
                    position: "left",
                    label: "Zephyr",
                    activeBaseRegex: "/Zephyr/Introduction"
                },
                {
                    to: "Bolt%20Web%20Addon/Introduction/",
                    position: "left",
                    label: "Bolt Web Addon",
                    activeBaseRegex: "/Bolt%20Web%20Addon/Introduction"
                },
                {
                    href: "https://refinedev.xyz",
                    label: "Main Website",
                    position: "right"
                }
            ]
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Community",
                    items: [
                        {
                            label: "Discord",
                            href: "https://discord.refinedev.xyz"
                        }
                    ]
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Main Site",
                            href: "https://refinedev.xyz"
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Refine Development. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ["java", "bash"]
        }
    } satisfies Preset.ThemeConfig
}

export default config
