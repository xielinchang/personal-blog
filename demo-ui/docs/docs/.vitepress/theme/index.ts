// import { jButton, jIcon, jQueryPage, jMessage, jTooltip, jDialog, jSelect, jBackTop, jCard, jCounter } from '@joy'
// const components = {jButton, jIcon, jQueryPage, jMessage, jTooltip, jDialog, jSelect, jBackTop, jCard,jCounter}
// import { JLayout } from "../../../../examples/components"

import JoydDesign from 'joyd-design'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'
import IconList from '../../examples/icon/IconList.vue'
import { globals } from '../vitepress'
import '../../../../examples/assets/scss/index.scss'
import '../../../node_modules/joyd-design/style.css';

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  ...Theme,
  enhanceApp: ({ app }) => {
    // Object.entries(components).forEach(([key, value]) => {
    //   app.component(key, value);
    // });
    app.use(JoydDesign)
    // JoydDemo?.install(app);
    app.component('IconList', IconList);
    globals.forEach(([name, comp]) => app.component(name, comp))
  }
})
