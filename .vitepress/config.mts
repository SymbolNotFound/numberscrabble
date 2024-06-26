import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Number Scrabble",
  description: "play a classic mathematics game against the computer",
  lang: "en-US",
  cleanUrls: true,
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
          { text: 'Introduction', link: 'howto' },
          { text: 'Setup & Deploy', link: 'howto.deploy' },
          { text: 'Game Logic', link: 'howto.logic' },
          { text: 'CSS Style', link: 'howto.style' },
          { text: 'Interaction', link: 'howto.interact' },
          { text: 'Game AI', link: 'howto.think' },
          { text: 'LocalStorage', link: 'howto.persist' },
          { text: 'Commenting', link: 'howto.discuss' },
          { text: 'Epilogue', link: 'howto.epilogue' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kevindamm/number-scrabble' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FF6D00" d="M42,42H6V6h36V42z"></path><path fill="#FFF" d="M28 14L24 22.1 19.9 14 16 14 21.9 26 22 26 22 34 26 34 26 26 31.9 14z"></path></svg>' },
        link: 'https://news.ycombinator.com/threads?id=kevindamm' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/kevindamm'}
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2024 Symbol Not Found'
    }
  }
})
