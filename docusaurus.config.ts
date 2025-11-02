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
          href: "https://docs.ratel.foundation/admin/",
          label: "Admin",
          position: "right",
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
