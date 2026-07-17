import type { UserConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import { sidebar } from './config/sidebars'
import { nav } from './config/nav'
const isProd = process.env.NODE_ENV === 'production'
export const config: UserConfig = {
  base: '',
  title: 'Joy',
  description: 'a Vue 3 based component library for designers and developers',
  themeConfig: {
    logo: '/images/logo.png',
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xielinchang/demo-ui' }],
    nav,
    sidebar
  },
  markdown: {
    config: md => mdPlugin(md)
  }
}

export default config
