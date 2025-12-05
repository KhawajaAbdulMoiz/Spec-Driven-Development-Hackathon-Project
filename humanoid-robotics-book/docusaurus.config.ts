import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline: 'Learn robotics from first principles with real-world examples',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://humanoid-robotics-book.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SpecDrivenDevelopment', // Usually your GitHub org/user name.
  projectName: 'humanoid-robotics-book', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Edit this page links point to GitHub
          editUrl:
            'https://github.com/SpecDrivenDevelopment/humanoid-robotics-book/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit blog post links point to GitHub
          editUrl:
            'https://github.com/SpecDrivenDevelopment/humanoid-robotics-book/tree/main/',
          // Enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Robotics Textbook',
      logo: {
        alt: 'Robotics Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Modules',
        },
        {to: '/about', label: 'About', position: 'left'},
        {to: '/how-to-use', label: 'How to Use', position: 'left'},
        {
          href: 'https://github.com/SpecDrivenDevelopment/humanoid-robotics-book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules',
          items: [
            {
              label: 'Module 1: Foundations',
              to: '/docs/module-01-foundations/intro',
            },
            {
              label: 'Module 2: Perception',
              to: '/docs/module-02-perception/intro',
            },
            {
              label: 'Module 3: Control',
              to: '/docs/module-03-control/intro',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'How to Use',
              to: '/how-to-use',
            },
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/SpecDrivenDevelopment/humanoid-robotics-book',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Report Issue',
              href: 'https://github.com/SpecDrivenDevelopment/humanoid-robotics-book/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SpecDrivenDevelopment. Learn Physical AI & Humanoid Robotics. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
