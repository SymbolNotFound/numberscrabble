import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Number Scrabble",
  description: "play a classic mathematics game against the computer",
  base: "/number-scrabble/",
  lang: "en-US",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    nav: [],
    sidebar: [
      {
        text: 'About',
        items: [
          { text: 'Rules', link: '/rules' },
          { text: 'Exercises', link: '/exercises' },
          { text: 'Author', link: 'https://github.com/kevindamm/'}
        ]
      },
      {
        text: 'How To',
        items: [
          { text: 'ToC', link: 'howto' },
          { text: 'Setup', link: 'howto.step1' },
          { text: 'Game Logic', link: 'howto.step2' },
          { text: 'CSS Style', link: 'howto.step3' },
          { text: 'Interaction', link: 'howto.step4' },
          { text: 'Game AI', link: 'howto.step5' },
          { text: 'LocalStorage', link: 'howto.step6' },
          { text: 'Commenting', link: 'howto.step7' },
          { text: 'Epilogue', link: 'howto.epilogue' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kevindamm/number-scrabble' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/kevindamm'}
    ],
    footer: {
      message: 'Released under the Apache 2.0 License',
      copyright: 'Copyright © 2024 Kevin Damm'
    }
  }
})
