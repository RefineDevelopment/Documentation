import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
    title: "Refine Development",
    tagline: "Quality products without breaking the bank",
    favicon: "logo.png",

    url: "https://docs.refinedev.org",
    trailingSlash: true,
    baseUrl: "/",

    onBrokenLinks: "warn",
    onBrokenAnchors: "ignore",

    markdown: {
        mermaid: true,
    },

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
                    exclude: [
                        "README.md",
                        "**/_*",
                        "Template",
                        "Phoenix/Phoenix.mdx",
                        "Carbon/Carbon.mdx",
                        "Zephyr/Zephyr.mdx",
                        "Bolt/Bolt.mdx"
                    ],
                    editUrl: (params) => `https://github.com/RefineDevelopment/Documentation/blob/master/docs/${params.docPath}`
                },
                blog: false,
                theme: {
                    customCss: "./src/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],

    plugins: [
        async function tailwindPlugin(context, options) {
            return {
                name: "docusaurus-tailwindcss",
                configurePostCss(postcssOptions) {
                    return postcssOptions
                }
            }
        }
    ],



    themeConfig: {
        image: "banner.png",
        colorMode: {
            disableSwitch: true,
            defaultMode: "dark",
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: "Refine Development",
            logo: {
                alt: "Refine Logo",
                src: "logo.png"
            },
            style: "dark",
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
                    activeBaseRegex: "^/Bolt/"
                },
                {
                    to: "Carbon/Introduction",
                    position: "left",
                    label: "Carbon",
                    activeBaseRegex: "/Carbon"
                },
                {
                    to: "Zephyr/Introduction/",
                    position: "left",
                    label: "Zephyr",
                    activeBaseRegex: "/Zephyr/Introduction"
                },
                // {
                //     to: "BoltWebAddon/Introduction/",
                //     position: "left",
                //     label: "Bolt Web Addon",
                //     activeBaseRegex: "/BoltWebAddon/Introduction"
                // },
                {
                    type: 'search',
                    position: 'right'
                },
                {
                    href: 'https://refinedev.org',
                    label: 'Main Website',
                    position: 'right',
                    className: 'button button--primary navbar-button',
                    target: '_blank'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [],
            copyright: `
        <a 
          href="https://shedux.dev" 
          target="_blank"
          class="inline-block transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] opacity-60 hover:opacity-100"
        >
          <img src="/signature.png" alt="shedux" class="h-10 w-auto" />
        </a>
            `,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ["java", "bash"]
        }
    } satisfies Preset.ThemeConfig
}

export default config