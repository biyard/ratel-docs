import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Ratel Docs",
  url: "https://docs.ratel.foundation",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "biyard",
  projectName: "ratel-docs",
  onBrokenLinks: "warn",
  i18n: { defaultLocale: "en", locales: ["en", "ko"] },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.ts"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
    navbar: {
      title: "Ratel Docs",
      items: [
        {
          type: "html",
          position: "right",
          value:
            '<a href="/admin/" target="_blank" rel="noopener noreferrer" class="navbar__item navbar__link">Admin</a>',
        },
        {
          href: "https://github.com/biyard/ratel-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};

export default config;
